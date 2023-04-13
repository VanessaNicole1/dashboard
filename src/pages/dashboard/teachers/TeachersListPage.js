import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  Table,
  Divider,
  TableBody,
  Container,
  TableContainer,
} from "@mui/material";
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
import { getTeachers } from "../../../services/teacher";
import {
  TeacherToobar,
  TeacherTableRow,
} from "../../../sections/dashboard/teacher/list";

export default function TeachersListPage() {
  const { translate } = useLocales();

  const navigate = useNavigate();

  const location = useLocation();

  const TABLE_HEAD = [
    {
      id: "name",
      label: translate("teachers_list_page.table.name"),
      align: "center",
    },
    {
      id: "last name",
      label: translate("teachers_list_page.table.last"),
      align: "center",
    },
    {
      id: "email",
      label: translate("teachers_list_page.table.email"),
      align: "center",
    },
    {
      id: "",
      label: translate("teachers_list_page.table.actions"),
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

  const { themeStretch } = useSettingsContext();

  const [tableData, setTableData] = useState([]);

  const [filterContent, setFilterContent] = useState("");

  const [dataFiltered, setDataFiltered] = useState([]);

  const { pathHref } = location.state;

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
    const fetchTeachers = async () => {
      const teachers = await getTeachers({periodId: location.state.periodId});
      setTableData(teachers);
    };

    fetchTeachers();
  }, [location.state]);

  const dataInPage = dataFiltered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterContent !== "";

  const isNotFound = (!dataFiltered.length && !!filterContent);

  const handleFilterContent = (event) => {
    setPage(0);
    setFilterContent(event.target.value);
  };

  const handleFilterPeriod = (event) => {
    setPage(0);
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
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.user.edit(id));
  };

  return (
    <>
      <Helmet>
        <title>{translate("teachers_list_page.helmet")}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading={translate("teachers_list_page.heading")}
          links={[
            {
              name: translate("teachers_list_page.dashboard"),
              href: PATH_DASHBOARD.root,
            },
            {
              name: translate("teachers_list_page.teachers"),
              href: pathHref,
            },
            { name: translate("teachers_list_page.list") },
          ]}
        />

        <Card>
          <Divider />

          <TeacherToobar
            isFiltered={isFiltered}
            filterContent={filterContent}
            onFilterContent={handleFilterContent}
            onFilterPeriod={handleFilterPeriod}
            onResetFilter={handleResetFilter}
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
                      <TeacherTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.user.id)}
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
}) {
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
      const { name } = user;
      const { lastName } = user;
      const { email } = user;
      return (
        name.toLowerCase().includes(filterContent.toLowerCase()) ||
        lastName.toLowerCase().includes(filterContent.toLowerCase()) ||
        email.toLowerCase().includes(filterContent.toLowerCase())
      );
    });
  }
  return inputData;
}