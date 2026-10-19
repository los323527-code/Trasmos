import { Module } from "@nestjs/common";
import { DownloadsController } from "./downloads.controller";
import { DownloadsService } from "./downloads.service";
import { JobEventsService } from "./job-events.service";
import { JobQueue } from "./job-queue";
import { WebhookService } from "./webhook.service";

@Module({
  controllers: [DownloadsController],
  providers: [DownloadsService, JobQueue, JobEventsService, WebhookService],
  exports: [DownloadsService],
})
export class DownloadsModule {}
