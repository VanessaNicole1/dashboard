import Keycloak from "keycloak-js";

export const keycloak = new Keycloak({
  url: "http://44.201.131.202:8080/",
  realm: "master",
  clientId: "lessonPlan",
});

export default keycloak;