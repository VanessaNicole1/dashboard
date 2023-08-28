import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import {
  Tab,
  Tabs,
  Card,
  Table,
  Divider,
  TableBody,
  Container,
  TableContainer,
  Button,
  Stack,
} from '@mui/material';
import { useAuthContext } from '../../../auth/useAuthContext';
import Scrollbar from '../../../components/scrollbar';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from '../../../components/table';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useLocales } from "../../../locales";
import { getLessonPlansByUser } from '../../../services/schedule';
import { findTeacherPeriods } from '../../../services/teacher';
import { getMonth , getFullYears } from '../../../sections/dashboard/period/list/utils/date.utils';
import LessonPlanToobar from '../../../sections/dashboard/lesson-plan/list/LessonPlanToolbar';
import LessonPlanTableRow from '../../../sections/dashboard/lesson-plan/list/LessonPlanTableRow';
import { deleteLessonPlan, generateTeacherLessonPlanReport } from '../../../services/lesson-plan';
import Iconify from '../../../components/iconify/Iconify';
import { useSnackbar } from '../../../components/snackbar';
import { LessonPlanGenerateReportDialog } from '../../../sections/dashboard/lesson-plan/teachers-list/LessonPlanGenerateReportDialog';
import { manualHideErrorSnackbarOptions } from '../../../utils/snackBar';

export default function LessonPlanListTeacherPage() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    selected,
    setSelected,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { user } = useAuthContext();
  const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [filterContent, setFilterName] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('0');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dataFiltered, setDataFiltered] = useState([]);
  const [currentPeriods, setPeriods] = useState([{id: '0', name: 'all'}]);
  const [openGenerateReportDialog, setOpenGenerateReportDialog] = useState(false);
  const [generatingReport, setGeneratingReport] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const { translate } = useLocales();

  const STATUS_OPTIONS = ['all', translate('teachers_lesson_plans.validated'), translate('teachers_lesson_plans.not_validated')];

  useEffect(() => {
    const fetchPeriods = async () => {
      const periods = await findTeacherPeriods(user.id);
      const currentActivePeriods = periods.map((period) => ({id: period.id, name: `${getMonth(period.startDate)} ${getFullYears(period.startDate)} - ${getMonth(period.endDate)} ${getFullYears(period.endDate)}`}))
      currentActivePeriods.unshift({id: '0', name: 'all'});
      setPeriods(currentActivePeriods);
    }

    const fetchLessonPlans = async () => {
      const currentSchedules = await getLessonPlansByUser(user.id, {type: 'NORMAL'});
      setTableData(currentSchedules);
    } 
    
    fetchPeriods();
    fetchLessonPlans();
  }, [user]);
  
  useEffect(() => {
    const updateDataFiltered = async () => {
      const filterApplied = await applyFilter({
        inputData: tableData,
        comparator: getComparator(order, orderBy),
        filterContent,
        filterStatus,
        filterPeriod,
        user,
      });

      setDataFiltered(filterApplied);
    };

    updateDataFiltered();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterContent, tableData, filterPeriod, filterStatus]);

  const TABLE_HEAD = [
    { id: 'period', label: translate('teachers_lesson_plans.table.period'), align: 'center' },
    { id: 'date', label: translate('teachers_lesson_plans.date'), align: 'center' },
    { id: 'grade', label: translate('teachers_lesson_plans.table.grade'), align: 'left' },
    { id: 'subject', label: translate('teachers_lesson_plans.table.subject'), align: 'left' },
    { id: 'status', label: translate('teachers_lesson_plans.table.status'), align: 'left' },
    { id: 'actions', label: translate('teachers_lesson_plans.table.actions'), align: 'center' },
  ];

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterContent !== '' || filterPeriod !== '0' || filterStatus !== 'all';

  const isNotFound =
    (!dataFiltered.length && !!filterContent) ||
    (!dataFiltered.length && !!filterPeriod) ||
    (!dataFiltered.length && !!filterStatus);

  const handleFilterStatus = (event, newValue) => {
    setPage(0);
    setFilterStatus(newValue);
  };

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterPeriod = (event) => {
    setPage(0);
    setFilterPeriod(event.target.value);
  };

  const handleDeleteRow = async (id) => {
    const response = await deleteLessonPlan(id);

    if (response.errorMessage) {
      enqueueSnackbar(response.errorMessage, manualHideErrorSnackbarOptions);
    }
    setSelected([]);
    const currentLessons = await getLessonPlansByUser(user.id, {type: 'NORMAL'});
    setTableData(currentLessons);
    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
    navigate(PATH_DASHBOARD.lessonPlan.listTeacherPlans);
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.lessonPlan.edit(id));
  };

  const handleViewLessonPlan = (id) => {
    navigate(`${PATH_DASHBOARD.lessonPlan.lessonPlanView}/${id}`);
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterPeriod('0');
    setFilterStatus('all');
  };

  const generateLessonPlanTeacherReport = async (data) => {
    setGeneratingReport(true);
    const teacherReportUrl = await generateTeacherLessonPlanReport(user.id, data);

    setGeneratingReport(false);
    setOpenGenerateReportDialog(false);
    if (teacherReportUrl.errorMessage) {
      enqueueSnackbar(teacherReportUrl.errorMessage, manualHideErrorSnackbarOptions);
    } else {
      window.open(teacherReportUrl, "_blank");
    }
  }

  return (
    <>
      <Helmet>
        <title> {translate('teachers_lesson_plans.helmet')} </title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
          <CustomBreadcrumbs
            heading={translate('teachers_lesson_plans.heading')}
            links={[
              { name: translate('teachers_lesson_plans.dashboard'), href: PATH_DASHBOARD.root },
              { name: translate('teachers_lesson_plans.about'), href: PATH_DASHBOARD.lessonPlan.listProcesses },
              { name: translate('teachers_lesson_plans.list') },
            ]}
          />
        <Stack direction='row-reverse' marginBottom='10px'> 
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => setOpenGenerateReportDialog(true)}
            startIcon={<Iconify icon="solar:printer-minimalistic-bold" />}
          >
            Generar Reporte
          </Button>
        </Stack>
      
        <Card>
          <Tabs
            value={filterStatus}
            onChange={handleFilterStatus}
            sx={{
              px: 2,
              bgcolor: 'background.neutral',
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab key={tab} label={tab} value={tab} />
            ))}
          </Tabs>

          <Divider />

          <LessonPlanToobar
            isFiltered={isFiltered}
            filterContent={filterContent}
            filterPeriod={filterPeriod}
            optionsPeriods={currentPeriods}
            onFilterName={handleFilterName}
            onFilterPeriod={handleFilterPeriod}
            onResetFilter={handleResetFilter}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
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
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <LessonPlanTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                        onViewRow={() => handleViewLessonPlan(row.id)}
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
          <TablePaginationCustom
            count={dataFiltered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>

      <LessonPlanGenerateReportDialog
        isLoading={generatingReport}
        onClose={() => setOpenGenerateReportDialog(false)}
        open={openGenerateReportDialog}
        onValidate={generateLessonPlanTeacherReport}
      />
    </>
  );
}

async function applyFilter({ inputData, comparator, filterContent, filterStatus, filterPeriod, user }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterContent) {
    inputData = inputData.filter((content) => {
      const {subject, grade} = content;
      return (
        subject.name.toLowerCase().includes(filterContent.toLowerCase()) ||
        grade.parallel.toLowerCase().includes(filterContent.toLowerCase()) ||
        grade.number.toLowerCase().includes(filterContent.toLowerCase())
      )
    });
  }

  if ((filterStatus === 'validated' || filterStatus === 'validados')) {
    inputData = await getLessonPlansByUser(user.id, {hasQualified: 'true', type: 'NORMAL'});
  }

  if ((filterStatus === 'not validated' || filterStatus === 'no validados')) {
    inputData = inputData.filter((lessonPlan) => lessonPlan.hasQualified === false);
  }
  
  if (filterPeriod !== '0') {
    const lessonPlans = await getLessonPlansByUser(user.id, {periodId: filterPeriod, type: 'NORMAL'});
    inputData = lessonPlans;
  }

  if ((filterStatus === 'validated' || filterStatus === 'validados') && filterPeriod !== '0') {
    const test = await getLessonPlansByUser(user.id, {periodId: filterPeriod, hasQualified: 'true', type: 'NORMAL'});
    inputData = test;
  }

  if ((filterStatus === 'not validated' || filterStatus === 'no validados') && filterPeriod !== '0') {
    const test = await getLessonPlansByUser(user.id, {periodId: filterPeriod, hasQualified: 'false', type: 'NORMAL'});
    inputData = test;
  }

  if (filterPeriod !== '0' && filterContent) {
    const currentLessons = await getLessonPlansByUser(user.id, {periodId: filterPeriod, type: 'NORMAL'});
    inputData = currentLessons.filter((content) => {
      const {subject, grade} = content;
      return (
        subject.name.toLowerCase().includes(filterContent.toLowerCase()) ||
        grade.parallel.toLowerCase().includes(filterContent.toLowerCase()) ||
        grade.number.toLowerCase().includes(filterContent.toLowerCase())
      )
    });
  }

  return inputData;
}