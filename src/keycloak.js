import Keycloak from "keycloak-js";

export const keycloak = new Keycloak({
  url: 'https://computacion.unl.edu.ec:8889/',
  realm: "master",
  clientId: "lessonPlan",
});

export default keycloak;