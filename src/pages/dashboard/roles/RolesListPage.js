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
import { RoleTableRow, RoleToolbar } from '../../../sections/dashboard/role';
import { getRoles } from '../../../services/role';

export default function RolesListPage () {
  const { translate } = useLocales();

  const TABLE_HEAD = [
    { id: 'id', label: translate('roles_list_page.table.id'), align: 'center' },
    { id: 'type', label: translate('roles_list_page.table.type'), align: 'center' },
    { id: '', label: translate('roles_list_page.table.actions'), align: 'center' },
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

  // useEffect(() => {
  //   const fetchLessonPlans = async () => {
  //     const lessonPlans = await getLessonPlans();
  //     setTableData(lessonPlans);
  //   };

  //   const fetchGrades = async () => {
  //     const grades = await getGrades();
  //     const simpleGrades = grades.map(grade => grade.displayName);
  //     simpleGrades.unshift('all');
  //     setSimpleGrades(simpleGrades);
  //   }

  //   fetchLessonPlans();
  //   fetchGrades(); 
  // }, []);

  useEffect(() => {
    const fetchRoles = async () => {
      const roles = await getRoles();
      setTableData(roles);
    };

    const fetchRolesType = async () => {
      const roles = await getRoles();
      const simpleRoles = roles.map(role => role.type);
      simpleRoles.unshift('all');
      setSimpleRoles(simpleRoles);
    }

    fetchRoles();
    fetchRolesType(); 
  }, []);

  const [simpleRoles, setSimpleRoles] = useState(['all']);

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);

  const [filterContent, setFilterContent] = useState('');

  const [filterRole, setFilterRole] = useState('all');


  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterContent,
    filterRole,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterContent !== '' || filterRole !== 'all'; // || filterStatus !== 'all'

  const isNotFound =
    (!dataFiltered.length && !!filterContent) ||
    (!dataFiltered.length && !!filterRole)

  const handleFilterContent = (event) => {
    setPage(0);
    setFilterContent(event.target.value);
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

  const handleResetFilter = () => {
    setFilterContent('');
    setFilterRole('all');
  };
    return (
      <>
      <Helmet>
        <title>{translate('roles_list_page.helmet')}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={translate('roles_list_page.heading')}
          links={[
            { name: translate('roles_list_page.dashboard'), href: PATH_DASHBOARD.root },
            { name: translate('roles_list_page.roles'), href: PATH_DASHBOARD.lessonPlan.root },
            { name: translate('roles_list_page.list') },
          ]}
        />

        <Card>
          <Divider />

          <RoleToolbar
            isFiltered={isFiltered}
            filterContent={filterContent}
            filterRole={filterRole}
            optionsRole={simpleRoles}
            onFilterContent={handleFilterContent}
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
                      <RoleTableRow
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

  function applyFilter({ inputData, comparator, filterContent, filterStatus, filterRole }) {
    const stabilizedThis = inputData.map((el, index) => [el, index]);
  
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
  
    inputData = stabilizedThis.map((el) => el[0]);
  
    if (filterContent) {
      inputData = inputData.filter((roles) => roles.type.toLowerCase().includes(filterContent.toLowerCase()));
    }
  
    // if (filterStatus !== 'all') {
    //   inputData = inputData.filter((user) => user.status === filterStatus);
    // }
  
    if (filterRole !== 'all') {
      inputData = inputData.filter((role) => role.type === filterRole);
    }
  
    return inputData;
  }
  