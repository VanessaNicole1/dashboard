import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import {
  Card,
  Table,
  Divider,
  TableBody,
  Container,
  TableContainer,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PATH_DASHBOARD } from "../../../routes/paths";
import Scrollbar from "../../../components/scrollbar";
import CustomBreadcrumbs from "../../../components/custom-breadcrumbs";
import { useSettingsContext } from "../../../components/settings";
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from "../../../components/table";
import { useLocales } from "../../../locales";
import { getRoles } from "../../../services/role";
import UserToobar from "../../../sections/dashboard/user/list/UserToolbar";
import UserTableRow from "../../../sections/dashboard/user/list/UserTableRow";
import { getAllUsers, getUsers } from "../../../services/user";

export default function UsersListPage() {
  const { translate } = useLocales();

  const navigate = useNavigate();

  const [filterRole, setFilterRole] = useState('all');

  const [simpleRoles, setSimpleRoles] = useState(['all']);

  const { themeStretch } = useSettingsContext();

  const [tableData, setTableData] = useState([]);

  const [filterContent, setFilterContent] = useState('');

  const [dataFiltered, setDataFiltered] = useState([]);

  const TABLE_HEAD = [
    {
      id: "name",
      label: translate("users_list_page.table.name"),
      align: "center",
    },
    {
      id: "last name",
      label: translate("users_list_page.table.last"),
      align: "center",
    },
    {
      id: "email",
      label: translate("users_list_page.table.email"),
      align: "center",
    },
    {
        id: "roles",
        label: translate("users_list_page.table.roles"),
        align: "center",
      },
    {
      id: "",
      label: translate("users_list_page.table.actions"),
      align: "center",
    },
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
    const updateDataFiltered = async () => {
      const filterApplied = await applyFilter({
        inputData: tableData,
        comparator: getComparator(order, orderBy),
        filterContent,
        filterRole
      });

      setDataFiltered(filterApplied);
    };

    updateDataFiltered();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterContent, tableData, filterRole]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers();
      setTableData(users);
    };

    const fetchRoles = async () => {
      const roles = await getRoles();
      const currentRoles = roles.map(role => role.name);
      currentRoles.unshift('all');
      setSimpleRoles(currentRoles);
    }

    fetchUsers();
    fetchRoles();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dataInPage = dataFiltered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterContent !== "" || filterRole !== 'all';

  const isNotFound =
    (!dataFiltered.length && !!filterContent) ||
    (!dataFiltered.length && !!filterRole);

  const handleFilterContent = (event) => {
    setPage(0);
    setFilterContent(event.target.value);
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

  const handleResetFilter = () => {
    setFilterContent("");
    setFilterRole('all');
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.user.edit(id));
  };

  const handleFilterRole = (event) => {
    setPage(0);
    setFilterRole(event.target.value);
  };

  return (
    <>
    <Helmet>
        <title>{translate("users_list_page.helmet")}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading={translate("users_list_page.heading")}
          links={[
            {
              name: translate("users_list_page.dashboard"),
              href: PATH_DASHBOARD.root,
            },
            {
              name: "Users",
              href: PATH_DASHBOARD.lessonPlan.root,
            },
            { name: translate("users_list_page.list") },
          ]}
        />

        <Card>
          <Divider />

          <UserToobar
            isFiltered={isFiltered}
            filterContent={filterContent}
            filterRole={filterRole}
            optionsRole={simpleRoles}
            onFilterContent={handleFilterContent}
            onResetFilter={handleResetFilter}
            onFilterRole={handleFilterRole}
          />

          <TableContainer sx={{ position: "relative", overflow: "unset" }}>
            <Scrollbar>
              <Table size={dense ? "small" : "medium"} sx={{ minWidth: 800 }}>
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
                      <UserTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
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

async function applyFilter({
  inputData,
  comparator,
  filterContent,
  filterRole
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);
  
  if (filterRole !== 'all') {
    const currentUsers = await getUsers({roleType: filterRole});
    inputData = currentUsers;
  }

  if (filterContent) {
    inputData = inputData.filter((user) => {
      const { name, lastName, email } = user;
      return (
        name.toLowerCase().includes(filterContent.toLowerCase()) ||
        lastName.toLowerCase().includes(filterContent.toLowerCase()) ||
        email.toLowerCase().includes(filterContent.toLowerCase())
      );
    });
  }
  return inputData;
}