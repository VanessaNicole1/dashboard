import Keycloak from "keycloak-js";

export const keycloak = new Keycloak({
  url: process.env.KEYCLOAK_URL + "",
  realm: "master",
  clientId: "lessonPlan",
});

export default keycloak;