import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Card,
  Table,
  TableBody,
  Container,
  TableContainer,
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
import LessonPlanToolbar from "../../../../sections/dashboard/lesson-plan/list/LessonPlanToolbar";
import RemedialLessonPlanTableRow from "../../../../sections/dashboard/lesson-plan/remedial/teacher/RemedialLessonPlanTableRow";
import { PATH_DASHBOARD } from "../../../../routes/paths";
import { findTeacherActivePeriods } from "../../../../services/teacher";
import { useAuthContext } from "../../../../auth/useAuthContext";
import { getLessonPlans } from "../../../../services/lesson-plan";
import { LessonPlanType } from "../../../../common/constants/lessonPlanType";

const TABLE_HEAD = [
  { id: "creationDate", label: "Fecha de Creación", align: "left" },
  { id: "grade", label: "Ciclo", align: "left" },
  { id: "teacher", label: "Docente", align: "left" },
  { id: "subject", label: "Materia", align: "left" },
  { id: "managerStatus", label: "Validación Director", align: "left" },
  { id: "studentsStatus", label: "Revisión Estudiantes", align: "left" },
  { id: "Actions", label: "Acciones", align: "center" },
];

export const RemedialTeacherPage = () => {
  const { user } = useAuthContext();
  const { themeStretch } = useSettingsContext();
  
  const [periods, setPeriods] = useState([]);
  const [tableData, setTableData] = useState([]);
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
  const isFiltered = filterContent !== "";
  const isNotFound =
    (!dataFiltered.length && !!filterContent) || !dataFiltered.length;

  useEffect(() => {
    const fetchPeriods = async () => {
      const fetchedPeriods = await findTeacherActivePeriods(user.id);
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
        userId: user.id
      });

      const lessonPlanData = fetchedLessonPlans.map(lessonPlan => {
        const { grade, teacher, subject } = lessonPlan.schedule;
        return {
          id: lessonPlan.id,
          isValidated: lessonPlan.isValidatedByManager,
          period: periods.find((period) => period.id === filterPeriod),
          grade,
          teacher,
          subject,
          creationDate: lessonPlan.createdAt,
          hasQualified: lessonPlan.hasQualified
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
        inputData: tableData,
        comparator: getComparator(order, orderBy),
        filterContent
      });

      setDataFiltered(filterApplied);
    };

    updateDataFiltered();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterContent, tableData]);

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
  };
  return (
    <>
      <Helmet>
        <title> Plan de Clase Remedial - Docente </title>
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
                        <RemedialLessonPlanTableRow
                          key={row.id}
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
  );
};


async function applyFilter({
  inputData,
  comparator,
  filterContent,
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

  return inputData;
}
