import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useEffect, useState } from 'react';
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
import PeriodTableToolbar from '../../../sections/dashboard/period/list/PeriodTableToolbar';
import PeriodTableRow from '../../../sections/dashboard/period/list/PeriodTableRow';
import { useLocales } from "../../../locales";
import { getPeriods } from '../../../services/period';

const STATUS_OPTIONS = ['all', 'active', 'finished'];

const ROLE_OPTIONS = [
  'all',
  'ux designer',
  'full stack designer',
  'backend developer',
  'project manager',
  'leader',
  'ui designer',
  'ui/ux designer',
  'front end developer',
  'full stack developer',
];

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

  const [filterRole, setFilterRole] = useState('all');

  const [filterStatus, setFilterStatus] = useState('all');

  const { translate } = useLocales();

  useEffect(() => {
    const fetchPeriods = async () => {
      const periods = await getPeriods();
      setTableData(periods);
    }
    fetchPeriods();
  }, [])
  

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterContent,
    filterRole,
    filterStatus,
  });

  const TABLE_HEAD = [
    { id: 'start', label: translate("period_list_page.start_label"), align: 'left' },
    { id: 'end', label: translate("period_list_page.end_label"), align: 'left' },
    { id: 'manager', label: translate("period_list_page.manager_label"), align: 'left' },
    { id: 'degree', label: translate("period_list_page.degree_label"), align: 'left' },
    { id: 'status', label: translate("period_list_page.status_label"), align: 'left' },
    { id: 'Actions', label: 'Actions', align: 'left' },
  ];

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterContent !== '' || filterRole !== 'all' || filterStatus !== 'all';

  const isNotFound =
    (!dataFiltered.length && !!filterContent) ||
    (!dataFiltered.length && !!filterRole) ||
    (!dataFiltered.length && !!filterStatus);

  const handleFilterStatus = (event, newValue) => {
    setPage(0);
    setFilterStatus(newValue);
  };

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterRole = (event) => {
    setPage(0);
    setFilterRole(event.target.value);
  };

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.user.edit(paramCase(id)));
  };

  const handleViewTeachers = (id) => {
    navigate(PATH_DASHBOARD.teachers.listTeachers, {state: { periodId: id}});
  }

  const handleViewStudents = (id) => {
    navigate(PATH_DASHBOARD.students.listStudents, {state: { periodId: id}});
  }

  const handleViewGrades = (id) => {
    navigate(PATH_DASHBOARD.grades.listGrades, {state: { periodId: id}});
  }

  const handleResetFilter = () => {
    setFilterName('');
    setFilterRole('all');
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
            { name: 'About', href: PATH_DASHBOARD.lessonPlan.purpose },
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

          <PeriodTableToolbar
            isFiltered={isFiltered}
            filterContent={filterContent}
            filterRole={filterRole}
            optionsRole={ROLE_OPTIONS}
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
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
                        onEditRow={() => handleEditRow(row.name)}
                        onViewTeachers={() => handleViewTeachers(row.id)}
                        onViewStudents={() => handleViewStudents(row.id)}
                        onViewGrades={() => handleViewGrades(row.id)}
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

function applyFilter({ inputData, comparator, filterContent, filterStatus, filterRole }) {
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

  if (filterStatus === 'active') {
    inputData = inputData.filter((period) => period.isActive === true);
  }

  if (filterStatus === 'finished') {
    inputData = inputData.filter((period) => period.isActive === false);
  }

  if (filterRole !== 'all') {
    inputData = inputData.filter((user) => user.role === filterRole);
  }

  return inputData;
}