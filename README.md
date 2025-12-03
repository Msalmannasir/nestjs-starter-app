# NestJS Starter Application

A starter NestJS backend application with the following features:

- Environment validation — ensures all required env variables are present at startup.
- Structured, OOP-style logging — LoggerService with class context for consistent logs.
- Request logging interceptor — logs incoming API requests with structured formatting.
- Health check route — /health endpoint to verify server status.
- Global exception handling — consistent error handling and logging across the application.
- Database module — pluggable module supporting multiple databases (Postgres, MongoDB, MySQL, SQLite, etc.) with async initialization and type-safe config.
- Mailing service — abstract MailService with pluggable implementations (NodeMailer, SMTP, Gmail, SendGrid, etc.) for sending emails.
- Pre-commit hooks — Husky setup to enforce TypeScript type checks and NestJS build before commits.

---

## **Project Setup**

```bash
# Clone the repository
git clone <repo-url>
cd nestjs-starter-app

# Install dependencies
npm install

# Start development server
npm run start:dev
```
