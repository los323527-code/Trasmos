import { Injectable, Logger } from "@nestjs/common";
import { createHmac } from "crypto";
import { AppConfigService } from "../config/app-config.service";
import type { DownloadJob } from "@vidyoza/shared";

export type DownloadWebhookEvent = "download.completed" | "download.failed";

/** Optional server-to-server notifications for terminal download states. */
@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  constructor(private readonly config: AppConfigService) {}

  async send(event: DownloadWebhookEvent, job: DownloadJob): Promise<void> {
    const endpoint = this.config.webhookUrl;
    if (!endpoint) return;

    // Avoid accidental plaintext delivery in production. The URL is configured
    // by the server operator, never accepted from an untrusted request.
    let parsed: URL;
    try {
      parsed = new URL(endpoint);
    } catch {
      this.logger.error("WEBHOOK_URL is not a valid URL; notification skipped.");
      return;
    }
    if (parsed.protocol !== "https:" && !( !this.config.isProduction && parsed.protocol === "http:" && ["localhost", "127.0.0.1"].includes(parsed.hostname))) {
      this.logger.error("WEBHOOK_URL must use HTTPS in production; notification skipped.");
      return;
    }

    const timestamp = new Date().toISOString();
    const body = JSON.stringify({ event, timestamp, data: job });
    const secret = this.config.webhookSecret;
    const signature = secret
      ? `sha256=${createHmac("sha256", secret).update(body).digest("hex")}`
      : "";

    // Notifications must not fail the download itself. Retry briefly for
    // transient errors, while bounding each attempt so a webhook cannot hang a worker.
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "user-agent": "SocialMediaVideoDownloader-Webhook/1.0",
            "x-webhook-event": event,
            "x-webhook-timestamp": timestamp,
            ...(signature ? { "x-webhook-signature": signature } : {}),
          },
          body,
          signal: AbortSignal.timeout(5000),
        });
        if (response.ok) return;
        this.logger.warn(`Webhook returned HTTP ${response.status} for ${job.id} (attempt ${attempt}/2).`);
      } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        this.logger.warn(`Webhook delivery failed for ${job.id} (attempt ${attempt}/2): ${message}`);
      }
    }
  }
}
