# Changelog

## 2.1.0 (custom update)

- Added optional webhook notifications for `download.completed` and `download.failed`.
- Added optional HMAC-SHA256 request signatures via `WEBHOOK_SECRET`.
- Added timeout and one retry for webhook delivery; webhook failures do not fail downloads.
- Added a Dockerfile and `.dockerignore` for container deployment.
- Documented deployment architecture and webhook configuration.

Note: this is a custom update of the uploaded source archive. Dependency versions were not upgraded because package-registry access was unavailable in the editing environment; run the build and tests in CI before production deployment.
