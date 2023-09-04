import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Card,
  Container,
  Divider,
  Tab,
  Table,
  TableBody,
  TableContainer,
  Tabs,
} from "@mui/material";
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  useTable,
  emptyRows,
  getComparator,
} from "../../../../components/table";
import Scrollbar from "../../../../components/scrollbar/Scrollbar";
import CustomBreadcrumbs from "../../../../components/custom-breadcrumbs/CustomBreadcrumbs";
import { useSettingsContext } from "../../../../components/settings";
import { PATH_DASHBOARD } from "../../../../routes/paths";
import LessonPlanToolbar from "../../../../sections/dashboard/lesson-plan/list/LessonPlanToolbar";
import { getLessonPlans } from "../../../../services/lesson-plan";
import { LessonPlanType } from "../../../../common/constants/lessonPlanType";
import { useAuthContext } from "../../../../auth/useAuthContext";
import { findStudentActivePeriods } from "../../../../services/student";
import LessonPlanStudentTableRow from "../../../../sections/dashboard/lesson-plan/list/LessonPlanStudentTableRow";

const PENDING_STATUS = "PENDING";
const VALIDATED_STATUS = "VALIDATED";
const STATUS_OPTIONS = [PENDING_STATUS, VALIDATED_STATUS];
const TABLE_HEAD = [
  { id: "period", label: "Periodo", align: "center", width: "20%" },
  { id: "creationDate", label: "Fecha de Creación" , align: "left", width: "20%" },
  { id: "grade", label: "Ciclo" , align: "left", minWidth: '70px' },
  { id: "teacher", label: "Docente", align: "left" },
  { id: "subject", label: "Materia", align: "left" },
  { id: "status", label: "Estado de revisión", align: "center" },
    { id: "accepted", label: 'Estado de Aceptación', align: "center" },
  { id: "Actions", label: "Acciones", align: "center" },
];

const PENDING_STATUS_LABELS = {
  [PENDING_STATUS]: "Pendientes",
  [VALIDATED_STATUS]: "Validados"
}

export const RemedialStudentPage = () => {
  const { user } = useAuthContext();
  const { themeStretch } = useSettingsContext();

  const [periods, setPeriods] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [filterStatus, setFilterStatus] = useState(PENDING_STATUS);
  const [filterContent, setFilterContent] = useState("");
  const [filterPeriod, setFilterPeriod] = useState("");
  const [currentPeriods, setCurrentPeriods] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    selected,
    onSort,
  } = useTable();

  const denseHeight = dense ? 52 : 72;
  const isFiltered = filterContent !== "" || filterStatus !== PENDING_STATUS;
  const isNotFound =
    (!dataFiltered.length && !!filterContent) ||
    (!dataFiltered.length && !!filterStatus);

  useEffect(() => {
    const fetchPeriods = async () => {
      const fetchedPeriods = await findStudentActivePeriods(user.id);
      setPeriods(fetchedPeriods);

      const currentActivePeriods = fetchedPeriods.map((period) => ({
        id: period.id,
        name: period.displayName,
      }));
      setCurrentPeriods(currentActivePeriods);
      setFilterPeriod(currentActivePeriods[0].id);
    };

  fetchPeriods();
  }, []);

  useEffect(() => {
    const fetchLessonPlans = async () => {
      const fetchedLessonPlans = await getLessonPlans({
        period: filterPeriod,
        type: LessonPlanType.REMEDIAL,
        isValidatedByManager: true,
        studentUserId: user.id,
        isValidatedByStudent: false
      });

      const lessonPlanData = fetchedLessonPlans.map(lessonPlan => {
        const { grade, teacher, subject } = lessonPlan.schedule;
        return {
          lessonPlanId: lessonPlan.id,
          isValidated: lessonPlan.validationsTracking[0].isValidated,
          isAgree: lessonPlan.validationsTracking[0].isAgree,
          period: periods.find((period) => period.id === filterPeriod),
          grade,
          teacher,
          subject,
          creationDate: lessonPlan.createdAt,
        };
      });

      setTableData(lessonPlanData);
    };

    if (filterPeriod) {
      fetchLessonPlans();
    }
  }, [filterPeriod]);

  useEffect(() => {
    const updateDataFiltered = async () => {
      const filterApplied = await applyFilter({
        userId: user.id,
        inputData: tableData,
        comparator: getComparator(order, orderBy),
        filterContent,
        filterStatus,
        filterPeriod,
        periods
      });

      setDataFiltered(filterApplied);
    };

    updateDataFiltered();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterContent, tableData, filterStatus]);

  const handleFilterStatus = (event, newValue) => {
    setPage(0);
    setFilterStatus(newValue);
  };

    const handleFilterName = (event) => {
    setPage(0);
    setFilterContent(event.target.value);
  };
  
  const handleFilterPeriod = (event) => {
    setPage(0);
    setFilterPeriod(event.target.value);
  };
  
  const handleResetFilter = () => {
    setFilterContent("");
    setFilterPeriod(periods.length && periods[0].id);
    setFilterStatus(PENDING_STATUS);
  };

  return (
    <>
      <Helmet>
        <title> Plan de Clase Remedial - Director de Carrera </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Plan de Clase Remedial"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Listado de Plan de Clase Remedial" },
          ]}
        />

        {tableData && (
          <Card>
            <Tabs
              value={filterStatus}
              onChange={handleFilterStatus}
              sx={{
                px: 2,
                bgcolor: "background.neutral",
              }}
            >
              {STATUS_OPTIONS.map((tab) => (
                <Tab key={tab} label={PENDING_STATUS_LABELS[tab]} value={tab} />
              ))}
            </Tabs>

            <Divider />

            <LessonPlanToolbar
              isFiltered={isFiltered}
              filterContent={filterContent}
              filterPeriod={filterPeriod}
              optionsPeriods={currentPeriods}
              onFilterName={handleFilterName}
              onFilterPeriod={handleFilterPeriod}
              onResetFilter={handleResetFilter}
            />

            <TableContainer sx={{ position: "relative", overflow: "unset" }}>
              <Scrollbar>
                <Table size={dense ? "small" : "medium"} sx={{ minWidth: 800 }}>
                  <TableHeadCustom
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={tableData.length}
                    numSelected={selected.length}
                    onSort={onSort}
                  />
                  <TableBody>
                    {dataFiltered
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <LessonPlanStudentTableRow
                          basePath={`${PATH_DASHBOARD.remedialLessonPlan.studentValidate}`}
                          key={row.lessonPlanId}
                          row={row}
                        />
                      ))}
                    <TableEmptyRows
                      height={denseHeight}
                      emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                    />
                    <TableNoData isNotFound={isNotFound} />
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>
          </Card>
        )}
      </Container>
    </>
  )
};


async function applyFilter({
  userId,
  inputData,
  comparator,
  filterContent,
  filterStatus,
  filterPeriod,
  periods
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterContent) {
    inputData = inputData.filter((content) => {
      const { subject, grade, teacher } = content;
      return (
        subject.name.toLowerCase().includes(filterContent.toLowerCase()) ||
        grade.parallel.toLowerCase().includes(filterContent.toLowerCase()) ||
        grade.number.toLowerCase().includes(filterContent.toLowerCase()) ||
        teacher.user.displayName
          .toLowerCase()
          .includes(filterContent.toLowerCase())
      );
    });
  }

  if (!filterPeriod) {
    return inputData;
  }

  if (filterStatus && filterPeriod) {
    const fetchedLessonPlans = await getLessonPlans({
      period: filterPeriod,
      type: LessonPlanType.REMEDIAL,
      isValidatedByManager: true,
      studentUserId: userId,
      isValidatedByStudent: filterStatus === VALIDATED_STATUS
    });

    const lessonPlanData = fetchedLessonPlans.map(lessonPlan => {
      const { grade, teacher, subject } = lessonPlan.schedule;
      return {
        lessonPlanId: lessonPlan.id,
        isValidated: lessonPlan.validationsTracking[0].isValidated,
        isAgree: lessonPlan.validationsTracking[0].isAgree,
        period: periods.find((period) => period.id === filterPeriod),
        grade,
        teacher,
        subject,
        creationDate: lessonPlan.createdAt,
      };
    });

    inputData = [...lessonPlanData]; 
  }

  return inputData;
}
