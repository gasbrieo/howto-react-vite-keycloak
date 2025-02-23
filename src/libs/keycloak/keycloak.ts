import Keycloak, { type KeycloakInitOptions } from "keycloak-js";

const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
});

const keycloakInitOptions: KeycloakInitOptions = {
  onLoad: "check-sso",
  silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
  checkLoginIframe: true,
};

export { keycloak, keycloakInitOptions };
