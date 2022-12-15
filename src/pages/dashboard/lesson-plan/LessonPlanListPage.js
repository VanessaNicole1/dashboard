import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Tab,
  Tabs,
  Card,
  Table,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
} from '@mui/material';

import { PATH_DASHBOARD } from '../../../routes/paths';

import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import ConfirmDialog from '../../../components/confirm-dialog';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';

import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from '../../../components/table';

import { LessonPlanTableRow, LessonPlanTableToolbar } from '../../../sections/dashboard/lesson-plan/list';
import { getLessonPlans } from '../../../services/lesson-plan';
import { getGrades } from '../../../services/grade';
import { useLocales } from '../../../locales';

const STATUS_OPTIONS = ['all', 'active', 'banned'];

export default function LessonPlanListPage () {
  const { translate } = useLocales();

  const allOption = translate('')

  const TABLE_HEAD = [
    { id: 'date', label: translate('lesson_plan_list_page.table.created_date'), align: 'center' },
    { id: 'grade', label: translate('lesson_plan_list_page.table.grade'), align: 'center' },
    { id: 'teacher', label: translate('lesson_plan_list_page.table.teacher'), align: 'center' },
    { id: 'subject', label: translate('lesson_plan_list_page.table.subject'), align: 'center'},
    { id: '', label: translate('lesson_plan_list_page.table.actions'), align: 'center' },
  ];

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  useEffect(() => {
    const fetchLessonPlans = async () => {
      const lessonPlans = await getLessonPlans();
      setTableData(lessonPlans);
    };

    const fetchGrades = async () => {
      const grades = await getGrades();
      const simpleGrades = grades.map(grade => grade.displayName);
      simpleGrades.unshift('all');
      setSimpleGrades(simpleGrades);
    }

    fetchLessonPlans();
    fetchGrades(); 
  }, []);

  const [simpleGrades, setSimpleGrades] = useState(['all']);

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);

  const [filterContent, setFilterContent] = useState('');

  const [filterGrade, setFilterGrade] = useState('all');

  // const [filterStatus, setFilterStatus] = useState('all');

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterContent,
    filterGrade,
    // filterStatus,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterContent !== '' || filterGrade !== 'all'; // || filterStatus !== 'all'

  const isNotFound =
    (!dataFiltered.length && !!filterContent) ||
    (!dataFiltered.length && !!filterGrade)
    // (!dataFiltered.length && !!filterStatus);

  // const handleFilterStatus = (event, newValue) => {
  //   setPage(0);
  //   setFilterStatus(newValue);
  // };

  const handleFilterContent = (event) => {
    setPage(0);
    setFilterContent(event.target.value);
  };

  const handleFilterGrade = (event) => {
    setPage(0);
    setFilterGrade(event.target.value);
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

  const handleResetFilter = () => {
    setFilterContent('');
    setFilterGrade('all');
    // setFilterStatus('all');
  };

  return (
    <>
      <Helmet>
        <title>{translate('lesson_plan_list_page.helmet')}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={translate('lesson_plan_list_page.heading')}
          links={[
            { name: translate('lesson_plan_list_page.dashboard'), href: PATH_DASHBOARD.root },
            { name: translate('lesson_plan_list_page.lesson_plan'), href: PATH_DASHBOARD.lessonPlan.root },
            { name: translate('lesson_plan_list_page.list') },
          ]}
        />

        <Card>
          {/* <Tabs
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
          </Tabs> */}

          <Divider />

          <LessonPlanTableToolbar
            isFiltered={isFiltered}
            filterContent={filterContent}
            filterGrade={filterGrade}
            optionsGrade={simpleGrades}
            onFilterContent={handleFilterContent}
            onFilterGrade={handleFilterGrade}
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
                        onSelectRow={() => onSelectRow(row.id)}
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
            //
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>
    </>
  );
};


function applyFilter({ inputData, comparator, filterContent, filterStatus, filterGrade }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterContent) {
    inputData = inputData.filter((lessonPlan) => {
      console.log('lessonPlan', lessonPlan);
      const { schedule } = lessonPlan;
      const teacherDisplayName = schedule.teacher.user.displayName;
      const subjectName = schedule.subject.name;
      return teacherDisplayName.toLowerCase().includes(filterContent.toLowerCase()) || subjectName.toLowerCase().includes(filterContent.toLowerCase());
    });
  }

  // if (filterStatus !== 'all') {
  //   inputData = inputData.filter((user) => user.status === filterStatus);
  // }

  if (filterGrade !== 'all') {
    inputData = inputData.filter((lessonPlan) => lessonPlan.schedule.grade.displayName === filterGrade);
  }

  return inputData;
}
