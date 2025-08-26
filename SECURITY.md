# Security Policy

## Environment Variables

This project uses environment variables for configuration. Always use `.env` files for local development and platform environment variables for production.

### Local Development
1. Copy `.env.example` to `.env`
2. Fill in the appropriate values
3. The `.env` file is gitignored and will not be committed

### Required Variables
- `VITE_API_URL`: Backend API URL
- `VITE_API_URL_DEV`: Development API URL (optional)

## Reporting Vulnerabilities

If you discover a security vulnerability, please report it responsibly:
1. Do not open a public issue
2. Contact the maintainers directly
3. Provide details about the vulnerability

## Best Practices

- Keep dependencies updated
- Use HTTPS in production
- Validate all user inputs
- Use environment variables for sensitive data
