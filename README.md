# HowTo.React.Vite.Keycloak

![Sonar Quality Gate](https://img.shields.io/sonar/quality_gate/gasbrieo_howto-react-vite-keycloak?server=https%3A%2F%2Fsonarcloud.io&style=for-the-badge)
![Sonar Coverage](https://img.shields.io/sonar/coverage/gasbrieo_howto-react-vite-keycloak?server=https%3A%2F%2Fsonarcloud.io&style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/gasbrieo/howto-react-vite-keycloak?style=for-the-badge)

## Overview

**HowTo.React.Vite.Keycloak** serves as an implementation of authentication and authorization using Keycloak in React Vite.

## Features

### Authentication & Authorization
- Secure authentication with **Keycloak**
- Protected routes using **TanStack Router**
- Zustand store for global auth state

### Developer Experience
- **Eslint + Prettier** for code consistency
- **Vitest** for unit and integration testing
- **GitHub Actions** with **SonarCloud** for static analysis

## Getting Started

### Prerequisites

- A [Keycloak](https://www.keycloak.org) instance.

### Setup

1. Create a `.env` with Keycloak configurations:

```
VITE_KEYCLOAK_URL=http://localhost:18080
VITE_KEYCLOAK_REALM=howto
VITE_KEYCLOAK_CLIENT_ID=howtoclient
```

2. Run the application:
   
Open http://localhost:5173 in your browser.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
