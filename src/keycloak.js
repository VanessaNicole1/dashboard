import Keycloak from "keycloak-js";
import { KEYCLOAK_AUTH_URL, KEYCLOAK_CLIENT_ID, KEYCLOAK_REALM } from "./config-global";

export const keycloak = new Keycloak({
  url: KEYCLOAK_AUTH_URL,
  realm: KEYCLOAK_REALM,
  clientId: KEYCLOAK_CLIENT_ID,
});

export default keycloak;