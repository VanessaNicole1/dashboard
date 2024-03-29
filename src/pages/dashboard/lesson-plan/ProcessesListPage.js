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
} from '@mui/material';
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
import PeriodTableRow from '../../../sections/dashboard/period/list/PeriodTableRow';
import { useLocales } from "../../../locales";
import { deletePeriod, getPeriods } from '../../../services/period';
import { getUsers } from '../../../services/user';
import PeriodToolbar from '../../../sections/dashboard/period/list/PeriodToolbar';

export default function ProcessesListPage() {
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

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);

  const [filterContent, setFilterName] = useState('');

  const [filterManager, setFilterManager] = useState('0');

  const [filterStatus, setFilterStatus] = useState('all');

  const [managers, setManagers] = useState([{id: '0', name: 'all'}]);

  const [dataFiltered, setDataFiltered] = useState([]);

  const { translate } = useLocales();

  const STATUS_OPTIONS = ['all', translate("period_list_page.active"), translate("period_list_page.finished")];

  useEffect(() => {
    const fetchPeriods = async () => {
      const periods = await getPeriods();
      setTableData(periods);
    }

    const fetchManagers = async () => {
      const currentManagers = await getUsers({roleType: 'MANAGER'});
      const allManagers = currentManagers.map((manager) => ({id: manager.id, name: manager.name}));
      allManagers.unshift({id: '0', name: 'all'});
      setManagers(allManagers);
    }

    fetchPeriods();
    fetchManagers();
  }, []);

  useEffect(() => {
    const updateDataFiltered = async () => {
      const filterApplied = await applyFilter({
        inputData: tableData,
        comparator: getComparator(order, orderBy),
        filterContent,
        filterStatus,
        filterManager
      });

      setDataFiltered(filterApplied);
    };

    updateDataFiltered();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterContent, tableData, filterManager, filterStatus]);

  const TABLE_HEAD = [
    { id: 'start', label: translate("period_list_page.start_label"), align: 'center' },
    { id: 'end', label: translate("period_list_page.end_label"), align: 'center' },
    { id: 'manager', label: translate("period_list_page.manager_label"), align: 'left' },
    { id: 'degree', label: translate("period_list_page.degree_label"), align: 'left' },
    { id: 'status', label: translate("period_list_page.status_label"), align: 'left' },
    { id: 'Actions', label: translate("period_list_page.actions"), align: 'center' },
  ];

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterContent !== '' || filterManager !== '0' || filterStatus !== 'all';

  const isNotFound =
    (!dataFiltered.length && !!filterContent) ||
    (!dataFiltered.length && !!filterManager) ||
    (!dataFiltered.length && !!filterStatus);

  const handleFilterStatus = (event, newValue) => {
    setPage(0);
    setFilterStatus(newValue);
  };

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterManager = (event) => {
    setPage(0);
    setFilterManager(event.target.value);
  };

  const handleDeleteRow = async (id) => {
    await deletePeriod(id);
    setSelected([]);
    const currentPeriods = await await getPeriods();
    setTableData(currentPeriods);
    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
    navigate(PATH_DASHBOARD.lessonPlan.listProcesses);
  };

  const handleViewTeachers = (id) => {
    navigate(PATH_DASHBOARD.teachers.listTeachers, {state: { periodId: id, links: [{ name: translate('period_list_page.list'), href: PATH_DASHBOARD.lessonPlan.listProcesses }]}});
  };

  const handleViewStudents = (id) => {
    navigate(PATH_DASHBOARD.students.listStudents, {state: { periodId: id, links: [{ name: translate('period_list_page.list'), href: PATH_DASHBOARD.lessonPlan.listProcesses }]}});
  };

  const handleViewGrades = (id) => {
    navigate(PATH_DASHBOARD.grades.listGrades, {state: { periodId: id, links: [{ name: translate('period_list_page.list'), href: PATH_DASHBOARD.lessonPlan.listProcesses }]}});
  };

  const handleViewSubjects = (id) => {
    navigate(PATH_DASHBOARD.subjects.listSubjects, {state: { periodId: id, links: [{ name: translate('period_list_page.list'), href: PATH_DASHBOARD.lessonPlan.listProcesses }]}});
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterManager('0');
    setFilterStatus('all');
  };

  return (
    <>
      <Helmet>
        <title> {translate("period_list_page.helmet")}</title>
      </Helmet>
      
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={translate("period_list_page.heading")}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: translate("period_list_page.list"), href: PATH_DASHBOARD.lessonPlan.listProcesses },
            { name: translate("period_list_page.list_name") },
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
          <PeriodToolbar
            isFiltered={isFiltered}
            filterContent={filterContent}
            filterManager={filterManager}
            optionsManagers={managers}
            onFilterName={handleFilterName}
            onFilterManager={handleFilterManager}
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
                      <PeriodTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onViewTeachers={() => handleViewTeachers(row.id)}
                        onViewStudents={() => handleViewStudents(row.id)}
                        onViewGrades={() => handleViewGrades(row.id)}
                        onViewSubjects={() => handleViewSubjects(row.id)}
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

async function applyFilter({ inputData, comparator, filterContent, filterStatus, filterManager }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterContent) {
    inputData = inputData.filter((content) => {
      const {degree} = content;
      const {manager} = degree;
      return (
        degree.name.toLowerCase().includes(filterContent.toLowerCase()) ||
        manager.user.name.toLowerCase().includes(filterContent.toLowerCase())
      )
    });
  }

  if (filterManager !== '0') {
    const currentPeriods = await getPeriods({idManagerUser: filterManager});
    inputData = currentPeriods;
  }

  if ((filterStatus === 'active' || filterStatus === 'activos') && filterManager !== '0') {
    const currentPeriods = await getPeriods({isActive: true, idManagerUser: filterManager});
    inputData = currentPeriods;
  }

  if ((filterStatus === 'finished' || filterStatus === 'finalizados') && filterManager !== '0') {
    const currentPeriods = await getPeriods({isActive: false, idManagerUser: filterManager});
    inputData = currentPeriods;
  }

  if ((filterStatus === 'active' || filterStatus === 'activos')) {
    inputData = inputData.filter((period) => period.isActive === true);
  }

  if ((filterStatus === 'finished' || filterStatus === 'finalizados')) {
    inputData = inputData.filter((period) => period.isActive === false);
  }

  return inputData;
}