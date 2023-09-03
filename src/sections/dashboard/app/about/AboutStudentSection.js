import {
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Iconify from "../../../../components/iconify/Iconify";

export default function AboutStudentSection() {
  return (
    <Grid
      container
      spacing={1}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Grid item xs={12} md={6} lg={6}>
        <Stack
          display="flex"
          align="flex-start"
          spacing={3}
          direction={{ xs: "column", md: "row" }}
          justifyContent="flex-start"
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        >
          <Stack
            spacing={1.5}
            direction="row"
            align="center"
            justifyContent="space-between"
          >
            <Button
              color="inherit"
              variant="outlined"
              startIcon={<Iconify icon="mdi:file" />}
              // onClick={handleOpenUploadFile}
            >
              Manual - Plan de Clase
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              startIcon={<Iconify icon="mdi:file" />}
              // onClick={handleOpenUploadFile}
            >
              Manual - Plan de Clase Remedial
            </Button>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Card sx={{ maxWidth: 900 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Resolución para cumplimiento de Actividades de AD2
            </Typography>
            <Typography
              display="flex"
              align="justify"
              variant="body2"
              color="text.secondary"
            >
              La Universidad Nacional de Loja a través de la expedición de la
              Resolución Nro. 080 INSTRUCTIVO PARA LA DISTRIBUCIÓN DE
              ACTIVIDADES DE DOCENCIA, INVESTIGACIÓN Y GESTIÓN DEL PERSONAL
              ACADÉMICO DE LA UNIVERSIDAD NACIONAL DE LOJA en marzo de 2021
              norma la política institucional para la asignación de las
              actividades de docencia de acuerdo a cada tipo de docente.
              Artículo 5. Directrices Generales, apartado 5.1 PARA LA ASIGNACIÓN
              DE CARGA HORARIA PARA LAS ACTIVIDADES DE DOCENCIA, específicamente
              en 5.1.2. Para la asignación de carga horaria para actividades de
              docencia complementarias obligatorias indica en el primer punto
              que: Para la preparación y actualización de clases, seminarios,
              talleres, entre otras, que se codificará como AD2, se asignará la
              carga horaria de acuerdo a lo establecido. Las evidencias del
              cumplimiento de esta actividad podrán ser: las técnicas
              planificadas para el desarrollo del proceso enseñanza-aprendizaje,
              las presentaciones, videos, guías para el desarrollo de las
              actividades de aprendizaje, reportes del EVA u otros recursos
              metodológicos que prepare el docente para el desarrollo de la
              asignatura.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
