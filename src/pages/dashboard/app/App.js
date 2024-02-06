import { Box, Container, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../auth/useAuthContext";
import AppManagerSection from "../../../sections/dashboard/app/AppManagerSection";
import AppTeacherSection from "../../../sections/dashboard/app/AppTeacherSection";
import { useSettingsContext } from "../../../components/settings";
import { getActivePeriods } from "../../../services/period";
import AppStudentSection from "../../../sections/dashboard/app/AppStudentSection";

export default function GeneralPage() {
  const { themeStretch } = useSettingsContext();
  const [periodId, setPeriodId] = useState("");
  const [activePeriods, setActivePeriods] = useState([]);

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchPeriods = async () => {
      const periods = await getActivePeriods();
      if (periods && periods.length > 0) {
        setPeriodId(periods[0].id);
      }
      setActivePeriods(periods);
    };
    fetchPeriods();
  }, []);
  

  const currentRoles = user.roles.map((role) => role.name);

  const hanldeFilterPeriod = async (event) => {
    setPeriodId(event.target.value);
  };

  return (
    <Container maxWidth={themeStretch ? false : "lg"}>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          fullWidth
          select
          label="period"
          value={periodId}
          onChange={hanldeFilterPeriod}
          SelectProps={{
            MenuProps: {
              PaperProps: {
                sx: {
                  maxHeight: 260,
                },
              },
            },
          }}
          sx={{
            maxWidth: { sm: 460 },
            textTransform: "capitalize",
          }}
        >
          {activePeriods.map((period) => (
            <MenuItem
              key={period.id}
              value={period.id}
              sx={{
                mx: 1,
                borderRadius: 0.75,
                typography: "body2",
                textTransform: "capitalize",
              }}
            >
              {period.displayName}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      {
        currentRoles.includes("MANAGER") && <h2>Métricas como Director</h2>
      }
      {
        currentRoles.includes("MANAGER") && <AppManagerSection  periodId={periodId} />
      }
      <br />
      {
        currentRoles.includes("TEACHER") && <h2>Métricas como Docente</h2>
      }
      {
        currentRoles.includes("TEACHER") && <AppTeacherSection periodId={periodId} />
      }
      {
        currentRoles.includes("STUDENT") && <AppStudentSection periodId={periodId}/>
      }
    </Container>
  );
}
