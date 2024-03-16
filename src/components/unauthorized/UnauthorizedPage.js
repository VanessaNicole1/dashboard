import { m } from "framer-motion";
import { Container, Typography } from "@mui/material";
import { ForbiddenIllustration } from "../../assets/illustrations";
import { MotionContainer, varBounce } from "../animate";

export default function UnauthorizedPage() {
  return (
    <Container component={MotionContainer} sx={{ textAlign: "center" }}>
      <m.div variants={varBounce().in}>
        <Typography variant="h3" paragraph>
          Permiso Denegado
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography sx={{ color: "text.secondary" }}>
          Lo sentimos, usted no pertece a ningún proceso de clases.
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
      </m.div>
    </Container>
  );
}
