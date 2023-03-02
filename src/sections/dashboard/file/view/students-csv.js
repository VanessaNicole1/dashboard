import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import {
  Card,
  Table,
  Divider,
  TableBody,
  Container,
  TableContainer,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useLocales } from '../../../../locales';
import { emptyRows, getComparator, TableEmptyRows, TableHeadCustom, TableNoData, TablePaginationCustom, useTable } from '../../../../components/table';
import { useSettingsContext } from '../../../../components/settings';
import Scrollbar from '../../../../components/scrollbar';
import StudentCSVTableRow from '../../student/csv-list/StudentCSVTableRow';

StudentsCSVTable.propTypes = {
    data: PropTypes.array,
};

export default function StudentsCSVTable ({data}) {
  const { translate } = useLocales();

  const TABLE_HEAD = [
    { id: 'name', label: translate('students_list_page.table.name'), align: 'center' },
    { id: 'last name', label: translate('students_list_page.table.last'), align: 'center' },
    { id: 'email', label: translate('students_list_page.table.email'), align: 'center' },
    { id: 'grade', label: translate('students_list_page.table.grade'), align: 'center' },
    { id: 'parallel', label: 'parallel', align: 'center' },
  ];

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    selected,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettingsContext();

  const [tableData, setTableData] = useState([]);
  
  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
  });
  const denseHeight = dense ? 52 : 72;

  const isNotFound = !data;

  return (
    <>
      <Helmet>
        <title>{translate('students_list_page.helmet')}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
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
                      <StudentCSVTableRow
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

function applyFilter({ inputData, comparator, filterContent, filterStatus, filterGrade }) {
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
  return inputData;
}
  