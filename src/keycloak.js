import Keycloak from "keycloak-js";

export const keycloak = new Keycloak({
  url: "http://3.88.115.18:8080/",
  realm: "master",
  clientId: "lessonPlan",
});

export default keycloak;