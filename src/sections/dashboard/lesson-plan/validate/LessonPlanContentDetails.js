import PropTypes from "prop-types";
import { Alert } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { fDate } from "../../../../utils/formatTime";
import Logo from "../../../../components/logo/Logo";
import Label from '../../../../components/label';
import FileRecentItem from "../../../file-manager/file-recent-item";

// TODO: Add i18n
export const LessonPlanContentDetails = ({ lessonPlan, lessonPlanValidationTracking }) => {
  const renderContent = (
    <Stack sx={{ marginTop: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Contenido:
      </Typography>
      <Typography
        variant="body1"
        component="div"
        dangerouslySetInnerHTML={{ __html: lessonPlan.content }}
      />
    </Stack>
  );

  const renderFooter = (
    <Grid container>
      <Grid xs={12} md={9} sx={{ py: 3 }}>
        <Typography variant="subtitle2">Notas:</Typography>

        <Typography variant="body2">
          Si usted tiene dudas, por favor comunicarse con <a href="mailto:direccion.cis@unl.edu.ec">direccion.cis@unl.edu.ec</a>
        </Typography>
      </Grid>
    </Grid>
  );

  const renderResources = (
    <Stack spacing={2}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Recursos de la clase:
      </Typography>
      {
        lessonPlan.resources.length > 0 ? (
          lessonPlan.resources.map((resource, index) => (
            <FileRecentItem
              key={index}
              file={resource}
            />
          ))
        ): 
        (
          <Alert severity="info">El docente no ha agregado recursos para este plan de clase.</Alert>
        )
      }
    </Stack>
  )

  return (
    <Card sx={{ pt: 5, px: 5 }}>
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
      >
        <Logo disabledLink />

        <Stack
          spacing={1}
          alignItems={{ xs: "flex-start", md: "flex-end"}}
          display="flex"
          flexDirection={{xs: "column", sm: "column" }}
        >
          {
            lessonPlanValidationTracking.isValidated && (
              <Label
                variant="soft"
                color={lessonPlanValidationTracking.isAgree ? "success" : "error"}
              >
                {
                  lessonPlanValidationTracking.isAgree ? "De acuerdo": "No de acuerdo"
                }
              </Label>
            )
          }
          <Typography variant="subtitle2">
            Fecha máxima de calificación
            <br/>
            <span>{fDate(new Date(lessonPlan.date))}</span>
          </Typography>
        </Stack>
      </Box>

      <Stack sx={{ typography: "body2", marginY: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Descripción
        </Typography>
        {lessonPlan.description}
      </Stack>

      <Stack sx={{ typography: "body2",  marginY: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Propósito de la clase
        </Typography>
        {lessonPlan.purposeOfClass}
      </Stack>

      <Stack sx={{ typography: "body2" }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Bibliografía:
        </Typography>
        {lessonPlan.bibliography}
      </Stack>

      <Divider sx={{ mt: 2, borderStyle: "dashed" }} />

      {renderContent}
      
      <Divider sx={{ my: 2, borderStyle: "dashed" }} />
      
      {renderResources}

      <Divider sx={{ mt: 2, borderStyle: "dashed" }} />

      {renderFooter}
    </Card>
  );
};

LessonPlanContentDetails.propTypes = {
  lessonPlan: PropTypes.object,
  lessonPlanValidationTracking: PropTypes.object
};
