// This file demonstrates sensitive configuration that should be excluded from Copilot
// For hands-on exercise: Content Exclusion (Section 14)
//
// Note: This file is for demonstration purposes only.
// In a real application, never commit actual secrets to version control.

export const config = {
  // Database configuration
  database: {
    host: 'localhost',
    port: 5432,
    username: 'your_username',
    password: 'your_password_here',
    database: 'todo_app',
  },

  // API keys
  apiKeys: {
    openai: 'sk-your-openai-api-key',
    github: 'ghp_your_github_token',
    stripe: 'sk_test_your_stripe_key',
  },

  // JWT configuration
  jwt: {
    secret: 'your-jwt-secret-key-here',
    expiresIn: '7d',
  },

  // OAuth credentials
  oauth: {
    google: {
      clientId: 'your-google-client-id',
      clientSecret: 'your-google-client-secret',
    },
    github: {
      clientId: 'your-github-client-id',
      clientSecret: 'your-github-client-secret',
    },
  },
};
