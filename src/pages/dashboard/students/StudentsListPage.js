import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
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
import { getStudents } from '../../../services/student';
import { StudentTableRow, StudentToobar } from '../../../sections/dashboard/student/list';

export default function StudentsListPage () {
  const { translate } = useLocales();

  const TABLE_HEAD = [
    { id: 'name', label: translate('students_list_page.table.name'), align: 'center' },
    { id: 'last name', label: translate('students_list_page.table.last'), align: 'center' },
    { id: 'email', label: translate('students_list_page.table.email'), align: 'center' },
    { id: 'grade', label: translate('students_list_page.table.grade'), align: 'center' },
  ];

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    selected,
    onSelectRow,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettingsContext();

  const location = useLocation();

  const [tableData, setTableData] = useState([]);

  const [filterContent, setFilterContent] = useState('');

  const [dataFiltered, setDataFiltered] = useState([]);

  const [links, setLinks] = useState([]);

  const currentState = location.state;

  useEffect(() => {
    const updateDataFiltered = async () => {
      const filterApplied = await applyFilter({
        inputData: tableData,
        comparator: getComparator(order, orderBy),
        filterContent,
      });

      setDataFiltered(filterApplied);
    };

    updateDataFiltered();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterContent, tableData]);

  useEffect(() => {
    const fetchStudents = async () => {
      const students = await getStudents(location.state);
      setTableData(students);
    };

    const currentLinks = location.state?.links;
    currentLinks.push({ name: translate('students_list_page.list'), href: PATH_DASHBOARD.students.listStudents });
    const uniquecurrentLinks = currentLinks.filter((value, index) => {
      const _value = JSON.stringify(value);
      return index === currentLinks.findIndex(obj => JSON.stringify(obj) === _value);
    });

    if (currentLinks) {
      setLinks(uniquecurrentLinks);
    }
    
    fetchStudents();
  }, [location.state]);

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterContent !== '';

  const isNotFound = (!dataFiltered.length && !!filterContent);

  const handleFilterContent = (event) => {
    setPage(0);
    setFilterContent(event.target.value);
  };

  const handleFilterPeriod = (event) => {
    setPage(0);
  };

  const handleResetFilter = () => {
    setFilterContent('');
  };
  
  return (
    <>
      <Helmet>
        <title>{translate('students_list_page.helmet')}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={translate('students_list_page.heading')}
          state={currentState}
          links={[
            { name: translate('students_list_page.dashboard'), href: PATH_DASHBOARD.root },
            ...links,
          ]}
        />

        <Card>
          <Divider />

          <StudentToobar
            isFiltered={isFiltered}
            filterContent={filterContent}
            onFilterContent={handleFilterContent}
            onFilterGrade={handleFilterPeriod}
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
                      <StudentTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
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
};

async function applyFilter({ inputData, comparator, filterContent, filterStatus, filterGrade }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterContent) {
    inputData = inputData.filter((student) => {
      const { user } = student;
      const {name} = user;
      const {lastName} = user;
      const {email} = user;
      return name.toLowerCase().includes(filterContent.toLowerCase()) || lastName.toLowerCase().includes(filterContent.toLowerCase()) || email.toLowerCase().includes(filterContent.toLowerCase());
    });
  }

  if (filterGrade !== 'all') {
    inputData = inputData.filter((student) => student.grade.displayName === filterGrade);
  }

  return inputData;
}