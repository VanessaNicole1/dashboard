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
  Dialog,
  DialogTitle,
} from '@mui/material';
import { PATH_DASHBOARD } from '../../../routes/paths';
import Scrollbar from '../../../components/scrollbar';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
import { getSubjects, getSubject } from '../../../services/subject';
import SubjectEditForm from '../../../sections/dashboard/subject/update/SubjectEditForm';
import { useLocales } from '../../../locales';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from '../../../components/table';
import { SubjectTableRow, SubjectToolbar } from '../../../sections/dashboard/subject/list';

export default function SubjectsListPage () {
  const { translate } = useLocales();

  const TABLE_HEAD = [
    { id: 'name', label: translate('subjects_list_page.table.name'), align: 'center' },
    { id: 'grades', label: translate('subjects_list_page.table.grades'), align: 'center' },
    { id: '', label: translate('subjects_list_page.table.actions'), align: 'center' },
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

  const location = useLocation();

  const { links } = location.state;

  const [tableData, setTableData] = useState([]);

  const [filterContent, setFilterContent] = useState('');

  const [dataFiltered, setDataFiltered] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const [currentSubject, setCurrentSubject] = useState({});

  const [subjectId, setSubjectId] = useState();

  const [reloadData, setReloadData] = useState(false);

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
    const fetchSubjects = async () => {
      const subjects = await getSubjects({periodId: location.state.periodId});
      setTableData(subjects);
    };

    fetchSubjects();
  }, [location.state, reloadData]);

  useEffect(() => {
    if (subjectId) {
      const fetchSubject = async () => {
        const subject = await getSubject(subjectId);
        setCurrentSubject(subject);
      }

      fetchSubject();
    }
  }, [subjectId]);

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterContent !== '';

  const isNotFound =
    (!dataFiltered.length && !!filterContent);

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

  const handleOpenModal = (id) => {
    setSubjectId(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const  handleReloadData = (info) => {
    setReloadData(info);
  };

  return (
      <>
        <Helmet>
          <title>{translate('subjects_list_page.helmet')}</title>
        </Helmet>

        <Container maxWidth={themeStretch ? false : 'lg'}>
          <CustomBreadcrumbs
            heading={translate('subjects_list_page.heading')}
            links={[
              { name: translate('subjects_list_page.dashboard'), href: PATH_DASHBOARD.root },
              ...links,
              { name: translate('subjects_list_page.list') },
            ]}
          />

          <Card>
            <Divider />
            <SubjectToolbar
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
                        <SubjectTableRow
                          key={row.id}
                          row={row}
                          selected={selected.includes(row.id)}
                          onSelectRow={() => onSelectRow(row.id)}
                          onEditRow={() => handleOpenModal(row.id)}
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

          <Dialog
              fullWidth
              maxWidth="xs"
              open={openModal}
              onClose={handleCloseModal}
            >
              <DialogTitle>Update Subject</DialogTitle>
              <SubjectEditForm  onClose={handleCloseModal} currentSubject={currentSubject} onDataChange={handleReloadData} />
          </Dialog>
        </Container>
    </>
  );
};

async function applyFilter({ inputData, comparator, filterContent }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterContent) {
    inputData = inputData.filter((subject) => {
      const { name } = subject;
      return name.toLowerCase().includes(filterContent.toLowerCase());
    });
  }

  return inputData;
}