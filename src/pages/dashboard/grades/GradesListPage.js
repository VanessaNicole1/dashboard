import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
import { GradeTableRow } from '../../../sections/dashboard/grade/list';

export default function GradesListPage () {
  const { translate } = useLocales();

  const location = useLocation();

  const { periodId } = location.state;

  const [links, setLinks] = useState([]);

  const TABLE_HEAD = [
    { id: 'grade', label: translate('grades_list_page.table.grade'), align: 'center' },
    { id: 'parallel', label: translate('grades_list_page.table.parallel'), align: 'center' },
    { id: '', label: translate('grades_list_page.table.actions'), align: 'center' },
  ];

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    selected,
    setSelected,
    onSelectRow,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  useEffect(() => {
    const fetchGrades = async () => {
      const grades = await getGrades(location.state);
      setTableData(grades);
    };

    let currentLinks = location.state?.links;
    currentLinks = currentLinks.filter((currentLink) => currentLink.name !== 'Student List');

    currentLinks.push({ name: translate('grades_list_page.list'), href: PATH_DASHBOARD.grades.listGrades });
    const uniquecurrentLinks = currentLinks.filter((value, index) => {
      const currentValue = JSON.stringify(value);
      return index === currentLinks.findIndex(obj => JSON.stringify(obj) === currentValue);
    });

    if (currentLinks) {
      setLinks(uniquecurrentLinks);
    }

    fetchGrades();
  },[location.state]);

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const isNotFound =
    !dataFiltered.length || !dataFiltered.length;

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

  const handleViewStudents = (id) => {
    navigate(PATH_DASHBOARD.students.listStudents, {state: { periodId, gradeId: id, links: [{ name: 'Process', href: PATH_DASHBOARD.lessonPlan.listProcesses }, { name: translate('grades_list_page.list'), href: PATH_DASHBOARD.grades.listGrades }] }});
  }
  
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
            ...links,
          ]}
        />

        <Card>
          <Divider />
          
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
                        onViewStudents={() => handleViewStudents(row.id)}
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

function applyFilter({ inputData, comparator, filterContent, filterGrade }) {
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

  return inputData;
}