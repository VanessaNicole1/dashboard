import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
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
import { deleteLessonPlan } from '../../../services/lesson-plan';

const STATUS_OPTIONS = ['all', 'marked', 'unmarked'];

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

  const { translate } = useLocales();

  useEffect(() => {
    const fetchPeriods = async () => {
      const periods = await findTeacherPeriods(user.id);
      const currentActivePeriods = periods.map((period) => ({id: period.id, name: `${getMonth(period.startDate)} ${getFullYears(period.startDate)} - ${getMonth(period.endDate)} ${getFullYears(period.endDate)}`}))
      currentActivePeriods.unshift({id: '0', name: 'all'});
      setPeriods(currentActivePeriods);
    }

    const fetchLessonPlans = async () => {
      const currentSchedules = await getLessonPlansByUser(user.id);
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
    { id: 'period', label: 'Period', align: 'center' },
    { id: 'grade', label: 'Grade', align: 'left' },
    { id: 'subject', label: 'Subject', align: 'left' },
    { id: 'status', label: 'Status', align: 'left' },
    { id: 'Actions', label: 'Actions', align: 'center' },
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
    await deleteLessonPlan(id);
    navigate(PATH_DASHBOARD.lessonPlan.listTeacherPlans);
    setSelected([]);
    const currentLessons = await getLessonPlansByUser(user.id);
    setTableData(currentLessons);
    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.user.edit(paramCase(id)));
  };

  const handleViewLessonPlan = (id) => {
    navigate(PATH_DASHBOARD.teachers.listTeachers, {state: { periodId: id, links: [{ name: translate('period_list_page.list'), href: PATH_DASHBOARD.lessonPlan.listProcesses }]}});
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterPeriod('0');
    setFilterStatus('all');
  };

  return (
    <>
      <Helmet>
        <title> Lesson Plans</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading='Lesson Plans'
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Process', href: PATH_DASHBOARD.lessonPlan.listProcesses },
            { name: 'List' },
          ]}
        />
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
                        onEditRow={() => handleEditRow(row.name)}
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

  if (filterStatus === 'marked') {
    inputData = await getLessonPlansByUser(user.id, {hasQualified: 'true'});
  }

  if (filterStatus === 'unmarked') {
    inputData = inputData.filter((lessonPlan) => lessonPlan.hasQualified === false);
  }
  
  if (filterPeriod !== '0') {
    const lessonPlans = await getLessonPlansByUser(user.id, {periodId: filterPeriod});
    inputData = lessonPlans;
  }

  if (filterStatus === 'marked' && filterPeriod !== '0') {
    const test = await getLessonPlansByUser(user.id, {periodId: filterPeriod, hasQualified: 'true'});
    inputData = test;
  }

  if (filterPeriod !== '0' && filterContent) {
    const currentLessons = await getLessonPlansByUser(user.id, {periodId: filterPeriod});
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