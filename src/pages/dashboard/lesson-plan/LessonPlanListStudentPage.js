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
import CustomBreadcrumbs from "../../../components/custom-breadcrumbs/CustomBreadcrumbs";
import { PATH_DASHBOARD } from "../../../routes/paths";
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  useTable,
  emptyRows,
  getComparator,
} from "../../../components/table";
import { useSettingsContext } from "../../../components/settings";
import Scrollbar from "../../../components/scrollbar/Scrollbar";
import LessonPlanToolbar from "../../../sections/dashboard/lesson-plan/list/LessonPlanToolbar";
import { useAuthContext } from "../../../auth/useAuthContext";
import {
  findStudentActivePeriods,
  findStudentLessonPlans,
} from "../../../services/student";
import LessonPlanStudentTableRow from "../../../sections/dashboard/lesson-plan/list/LessonPlanStudentTableRow";
import { useLocales } from "../../../locales";

// TODO: Add i18n.

export default function LessonPlanListStudentPage() {

  const { translate } = useLocales();

  const STATUS_OPTIONS = ["Pending", "Validated"];
  const TABLE_HEAD = [
    { id: "period", label: translate('list_lesson_plans_student_page.period_label'), align: "center" },
    { id: "creationDate", label: translate('list_lesson_plans_student_page.date_label'), align: "left" },
    { id: "grade", label: translate('list_lesson_plans_student_page.grade_label'), align: "left" },
    { id: "teacher", label: translate('list_lesson_plans_student_page.teacher_label'), align: "left" },
    { id: "subject", label: translate('list_lesson_plans_student_page.subject_label'), align: "left" },
    { id: "status", label: translate('list_lesson_plans_student_page.status_label'), align: "left" },
    { id: "Actions", label: translate('list_lesson_plans_student_page.actions'), align: "center" },
  ];


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

  const { user } = useAuthContext();
  const { themeStretch } = useSettingsContext();
  const [periods, setPeriods] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [filterStatus, setFilterStatus] = useState("Pending");
  const [filterContent, setFilterContent] = useState("");
  const [filterPeriod, setFilterPeriod] = useState("");
  const [currentPeriods, setCurrentPeriods] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);

  const isFiltered = filterContent !== "" || filterStatus !== "Pending";

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
      const lessonPlanTrackingData = await findStudentLessonPlans(
        filterStatus.toUpperCase() === "VALIDATED",
        user.id,
        filterPeriod
      );
      const lessonPlanData = lessonPlanTrackingData.map((tracking, index) => {
        const { grade, teacher, subject } = tracking.lessonPlan.schedule;
        return {
          id: index,
          isValidated: tracking.isValidated,
          period: periods.find((period) => period.id === filterPeriod),
          grade,
          teacher,
          subject,
          creationDate: tracking.lessonPlan.date,
          lessonPlanId: tracking.lessonPlan.id,
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
        filterContent,
        filterStatus,
        filterPeriod,
        user,
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
    setFilterStatus("Pending");
  };

  return (
    <>
      <Helmet>
        <title> {translate('list_lesson_plans_student_page.title')} </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading={translate('list_lesson_plans_student_page.heading')}
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: translate('list_lesson_plans_student_page.list_link') },
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
                <Tab key={tab} label={tab} value={tab} />
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
                          key={row.id}
                          row={row}
                          selected={selected.includes(row.id)}
                          onDeleteRow={() => {}}
                          onEditRow={() => {}}
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
}

async function applyFilter({
  inputData,
  comparator,
  filterContent,
  filterStatus,
  filterPeriod,
  user,
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

  if (filterStatus.toUpperCase() === "VALIDATED") {
    const lessonPlanTrackingData = await findStudentLessonPlans(true, user.id, filterPeriod);

    const lessonPlanData = lessonPlanTrackingData.map((tracking, index) => {
      const { grade, teacher, subject } = tracking.lessonPlan.schedule;
      return {
        id: index,
        isValidated: tracking.isValidated,
        period: periods.find((period) => period.id === filterPeriod),
        grade,
        teacher,
        subject,
        creationDate: tracking.lessonPlan.createdAt,
        lessonPlanId: tracking.lessonPlan.id,
      };
    });

    inputData = [...lessonPlanData]; 
  }

  return inputData;
}
