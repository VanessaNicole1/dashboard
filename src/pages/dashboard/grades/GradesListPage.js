import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Card,
  Table,
  Divider,
  TableBody,
  Container,
  TableContainer,
} from '@mui/material';

import { PATH_DASHBOARD } from '../../../routes/paths';

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

import { useLocales } from '../../../locales';
import { getGrades } from '../../../services/grade';
import { GradeTableRow, GradeToolbar } from '../../../sections/dashboard/grade/list';

export default function GradesListPage () {
  const { translate } = useLocales();

  const TABLE_HEAD = [
    { id: 'grade', label: translate('grades_list_page.table.grade'), align: 'center' },
    { id: 'parallel', label: translate('grades_list_page.table.parallel'), align: 'center' },
    { id: 'degree', label: translate('grades_list_page.table.degree'), align: 'center' },
    { id: '', label: translate('grades_list_page.table.actions'), align: 'center' },
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
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  useEffect(() => {
    const fetchGrades = async () => {
      const grades = await getGrades();
      setTableData(grades);
    };

    // TODO Get all degrees to filter
    const fetchDegrees = async () => {
      const grades = await getGrades();
      const simpleDegrees = grades.map(grade => grade.displayName);
      simpleDegrees.unshift('all');
      setSimpleDegrees(simpleDegrees);
    }

    fetchGrades();
    fetchDegrees();
  },[]);


  const [simpleDegrees, setSimpleDegrees] = useState(['all']);

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);

  const [filterContent, setFilterContent] = useState('');

  const [filterGrade, setFilterGrade] = useState('all');

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterContent,
    filterGrade,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterContent !== '' || filterGrade !== 'all'; // || filterStatus !== 'all'

  const isNotFound =
    (!dataFiltered.length && !!filterContent) ||
    (!dataFiltered.length && !!filterGrade)


  const handleFilterContent = (event) => {
    setPage(0);
    setFilterContent(event.target.value);
  };

  const handleFilterRole = (event) => {
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
  };
  
  return (
    <>
      <Helmet>
        <title>{translate('grades_list_page.helmet')}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={translate('grades_list_page.heading')}
          links={[
            { name: translate('grades_list_page.dashboard'), href: PATH_DASHBOARD.root },
            { name: translate('grades_list_page.grades'), href: PATH_DASHBOARD.lessonPlan.root },
            { name: translate('grades_list_page.list') },
          ]}
        />

        <Card>
          <Divider />

          <GradeToolbar
            isFiltered={isFiltered}
            filterContent={filterContent}
            filterGrade={filterGrade}
            optionsDegree={simpleDegrees}
            onFilterContent={handleFilterContent}
            onFilterGrade={handleFilterRole}
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
                      <GradeTableRow
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
    inputData = inputData.filter((grade) => {
      const { numberParallel, parallel } = grade;
      return numberParallel.toString().toLowerCase().includes(filterContent.toLowerCase()) || parallel.toLowerCase().includes(filterContent.toLowerCase());
    });
  }

  if (filterGrade !== 'all') {
    inputData = inputData.filter((student) => student.grade.displayName === filterGrade);
  }

  return inputData;
}
  