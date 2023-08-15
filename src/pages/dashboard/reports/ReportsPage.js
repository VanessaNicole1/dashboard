import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Table,
  TableBody,
  Container,
  TableContainer,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { TeacherToobar } from "../../../sections/dashboard/teacher/list";
import Scrollbar from "../../../components/scrollbar/Scrollbar";
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
import { PATH_DASHBOARD } from "../../../routes/paths";
import { getTeachers } from "../../../services/teacher";
import ReportTeacherTableRow from "../../../sections/dashboard/reports/teacher-table/ReportTeacherTableRow";
import WeeksReportSection from "../../../sections/dashboard/reports/weeks/WeekSection";
import { getPeriodWeeks, getPeriods } from "../../../services/period";
import TeacherReportDialog from "../../../sections/dashboard/reports/TeacherReportDialog";

const TABLE_HEADERS = [
  {
    id: "image",
    label: "Imagen",
    align: "center",
  },
  {
    id: "name",
    label: "Nombre",
    align: "center",
  },
  {
    id: "email",
    label: "Email",
    align: "center",
  },
  {
    id: "",
    label: "Acciones",
    align: "center",
  },
];

export default function ReportsPage() {
  const navigate = useNavigate();
  const { themeStretch } = useSettingsContext();
  const [tableData, setTableData] = useState([]);
  const [filterContent, setFilterContent] = useState("");
  const [dataFiltered, setDataFiltered] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState({});
  const [openTeacherDialog, setOpenTeacherDialog] = useState(false);
  const [periodWeeks, setPeriodWeeks] = useState([]);

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const handleFilterContent = (event) => {
    setPage(0);
    setFilterContent(event.target.value);
  };

  const handleFilterPeriod = () => {
    setPage(0);
  };

  const handleResetFilter = () => {
    setFilterContent("");
  };

  const fetchTeachers = async (period) => {
    const teachers = await getTeachers({
      periodId: period,
    });
    setTableData(teachers);
  };

  const fetchPeriods = async () => {
    const fetchedPeriods = await getPeriods({ isActive: true });
    setSelectedPeriod(fetchedPeriods[0].id);
    setPeriods(fetchedPeriods);
  };

  const fetchPeriodWeeks = async (periodId) => {
    const fetchedPeriodWeeks = await getPeriodWeeks(periodId);
    console.log(fetchedPeriodWeeks);
    setPeriodWeeks(fetchedPeriodWeeks);
  }

  useEffect(() => {
    fetchTeachers();
    fetchPeriods();
  }, []);

  useEffect(() => {
    if (selectedPeriod) {
      fetchTeachers(selectedPeriod);
      fetchPeriodWeeks(selectedPeriod);
    }
  }, [selectedPeriod]);

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
  }, [filterContent, tableData]);

  const denseHeight = dense ? 52 : 72;
  const isFiltered = filterContent !== "";
  const isNotFound = !dataFiltered.length && !!filterContent;

  return (
    <>
      <Helmet>
        <title>Reportes</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Reportes"
          links={[
            {
              name: "Dashboard",
              href: PATH_DASHBOARD.root,
            },
          ]}
        />

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="select-period">Periodo</InputLabel>
          <Select
            id="select-period"
            value={selectedPeriod}
            label="Periodo"
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            {periods.map((period) => (
              <MenuItem key={period.id} value={period.id}>
                {period.displayName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Grid container spacing={2}>
          <Grid item md={8} xs={12}>
            <Card>
              <TeacherToobar
                isFiltered={isFiltered}
                filterContent={filterContent}
                onFilterContent={handleFilterContent}
                onFilterPeriod={handleFilterPeriod}
                onResetFilter={handleResetFilter}
              />

              <TableContainer sx={{ position: "relative", overflow: "unset" }}>
                <Scrollbar>
                  <Table
                    size={dense ? "small" : "medium"}
                    sx={{ minWidth: 800 }}
                  >
                    <TableHeadCustom
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEADERS}
                      rowCount={tableData.length}
                      onSort={onSort}
                    />

                    <TableBody>
                      {dataFiltered
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => (
                          <ReportTeacherTableRow
                            key={row.id}
                            row={row}
                            onViewDetailedReportPage={() => {
                              setSelectedTeacher(row);
                              setOpenTeacherDialog(true);
                            }}
                          />
                        ))}

                      <TableEmptyRows
                        height={denseHeight}
                        emptyRows={emptyRows(
                          page,
                          rowsPerPage,
                          tableData.length
                        )}
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
          </Grid>
          <Grid item md={4} xs={12}>
            <WeeksReportSection
              title="Reportes Semanales"
              subheader="Subheader for weekly reports"
              list={periodWeeks}
            />
          </Grid>
        </Grid>
      </Container>

      <TeacherReportDialog
        weeks={periodWeeks}
        teacher={selectedTeacher}
        openDialog={openTeacherDialog}
        closeDialog={() => {
          setSelectedTeacher({});
          setOpenTeacherDialog(false);
        }}
      />
    </>
  );
}

async function applyFilter({ inputData, comparator, filterContent }) {
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
