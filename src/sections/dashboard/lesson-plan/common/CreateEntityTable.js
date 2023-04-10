import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  Dialog,
  DialogTitle,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableContainer,
  Tooltip,
} from '@mui/material';
import { Trans } from 'react-i18next';
import Scrollbar from '../../../../components/scrollbar/Scrollbar';
import TableEmptyRows from '../../../../components/table/TableEmptyRows';
import TableHeadCustom from '../../../../components/table/TableHeadCustom';
import TableNoData from '../../../../components/table/TableNoData';
import TablePaginationCustom from '../../../../components/table/TablePaginationCustom';
import TableSelectedAction from '../../../../components/table/TableSelectedAction';
import {
  emptyRows,
  getComparator,
  useTable,
} from '../../../../components/table';
import Iconify from '../../../../components/iconify/Iconify';
import ConfirmDialog from '../../../../components/confirm-dialog/ConfirmDialog';
import { useLocales } from '../../../../locales';
import EntityTableRow from './EntityTableRow';
import EntityToolbar from './EntityToolbar';
import EntityForm from './EntityForm';

CreateEntityTable.propTypes = {
  gradeOptions: PropTypes.array,
  entities: PropTypes.array,
  setEntities: PropTypes.func,
  handleEditEntity: PropTypes.func,
  tableHeaders: PropTypes.array,
  entity: PropTypes.string
};

export default function CreateEntityTable({
  gradeOptions,
  entities = [],
  setEntities = () => {},
  handleEditEntity,
  tableHeaders = [],
  entity
}) {
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
    onSelectAllRows,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { translate } = useLocales();
  const commonI18NMessages = 'lesson_plan.start_process.common';
  const baseI18NEntityKey = `lesson_plan.start_process.${entity}`;

  const TABLE_HEAD = tableHeaders.map(header => {
    const i18nHeader = translate(`${commonI18NMessages}.table.headers.${header}`);

    return {
      id: header,
      label: i18nHeader,
      align: 'center'
    };
  });

  const [entityToEdit, setEntityToEdit] = useState();
  const [openEntityForm, setOpenEntityForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [filterGrade, setFilterGrade] = useState('all');
  const [filterContent, setFilterContent] = useState('');
  const [dialogAction, setDialogAction] = useState('edit');
  const isFiltered = filterContent !== '' || filterGrade !== 'all';

  const dataFiltered = applyFilter({
    inputData: entities,
    comparator: getComparator(order, orderBy),
    filterGrade,
    filterContent,
  });

  const dataInPage = dataFiltered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const denseHeight = dense ? 52 : 72;

  const isNotFound =
    (!dataFiltered.length && !!filterGrade) ||
    (!dataFiltered.length && !!filterContent);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterGrade = (event) => {
    setPage(0);
    setFilterGrade(event.target.value);
  };

  const handleFilterContent = (event) => {
    setPage(0);
    setFilterContent(event.target.value);
  };

  const handleResetFilter = () => {
    setFilterGrade('all');
    setFilterContent('');
  };

  const handleDeleteRow = (email) => {
    const deleteRow = entities.filter((row) => row.email !== email);
    setSelected([]);
    setEntities(deleteRow);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  const handleDeleteRows = (selectedRows) => {
    const deleteRows = entities.filter(
      (row) => !selectedRows.includes(row.email)
    );
    setSelected([]);
    setEntities(deleteRows);

    if (page > 0) {
      if (selectedRows.length === dataInPage.length) {
        setPage(page - 1);
      } else if (selectedRows.length === dataFiltered.length) {
        setPage(0);
      } else if (selectedRows.length > dataInPage.length) {
        const newPage =
          Math.ceil((entities.length - selectedRows.length) / rowsPerPage) - 1;
        setPage(newPage);
      }
    }
  };

  const handleEditEntityForm = (currentEntity) => {
    setOpenEntityForm(true);
    setEntityToEdit(currentEntity);
    setDialogAction('edit');
  };

  const handleCreateEntityForm = () => {
    setOpenEntityForm(true);
    setEntityToEdit({});
    setDialogAction('create')
  }

  const handleCloseEntityForm = () => {
    setOpenEntityForm(false);
  };

  return (
    <>
      <Card>
        <Stack spacing={0}>
          <EntityToolbar
            isFiltered={isFiltered}
            filterGrade={filterGrade}
            filterContent={filterContent}
            optionsGrade={gradeOptions}
            onFilterGrade={handleFilterGrade}
            onFilterContent={handleFilterContent}
            onResetFilter={handleResetFilter}
          />

          <Button startIcon={<Iconify icon="ion:person-add-sharp" />} sx={{marginX: '20px', marginBottom: '15px'}} variant='contained' onClick={handleCreateEntityForm}>
            { translate(`${commonI18NMessages}.create`, { entity: translate(`${baseI18NEntityKey}.entity`)}) }
          </Button>
        </Stack>

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={dense}
            numSelected={selected.length}
            rowCount={entities.length}
            onSelectAllRows={(checked) =>
              onSelectAllRows(
                checked,
                entities.map((row) => row.email)
              )
            }
            action={
              <Tooltip title={translate(`${commonI18NMessages}.table.tooltip`)}>
                <IconButton color='primary' onClick={handleOpenConfirm}>
                  <Iconify icon='eva:trash-2-outline' />
                </IconButton>
              </Tooltip>
            }
          />

          <Scrollbar>
            <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={entities.length}
                numSelected={selected.length}
                onSort={onSort}
                onSelectAllRows={(checked) =>
                  onSelectAllRows(
                    checked,
                    entities.map((row) => row.email)
                  )
                }
              />

              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <EntityTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                      onEditRow={() => handleEditEntityForm(row)}
                    />
                  ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(page, rowsPerPage, entities.length)}
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
        <ConfirmDialog
          open={openConfirm}
          onClose={handleCloseConfirm}
          title={translate(`${commonI18NMessages}.confirm_dialog_title`)}
          content={
            <Trans i18nKey={`${commonI18NMessages}.confirm_dialog`} values={{ amount: selected.length }}/>
          }
          action={
            <Button
              variant='contained'
              color='error'
              onClick={() => {
                handleDeleteRows(selected);
                handleCloseConfirm();
              }}
            >
              {translate(`${commonI18NMessages}.confirm_dialog_title`)}
            </Button>
          }
        />
      </Card>
      <Dialog
        fullWidth
        maxWidth='xs'
        open={openEntityForm}
        onClose={handleCloseEntityForm}
      >
        <DialogTitle>{ translate(`${baseI18NEntityKey}.dialog_title_${dialogAction}`) }</DialogTitle>
        <EntityForm 
          entity={entityToEdit}
          onCancel={handleCloseEntityForm}
          onSubmit={handleEditEntity}
          entityType={entity}
          action={dialogAction}
        />
      </Dialog>
    </>
  );
}

function applyFilter({ inputData, comparator, filterContent, filterGrade }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterContent) {
    inputData = inputData.filter((entity) => {
      const { name, lastName, email, subject } = entity;

      return (
        name.toLowerCase().includes(filterContent.toLowerCase()) ||
        lastName.toLowerCase().includes(filterContent.toLowerCase()) ||
        email.toLowerCase().includes(filterContent.toLowerCase()) ||
        subject && subject.toLowerCase().includes(filterContent.toLowerCase())
      );
    });
  }

  if (filterGrade !== 'all') {
    inputData = inputData.filter(
      (entity) =>
        `${entity.numberParallel} "${entity.parallel}"` === filterGrade
    );
  }

  return inputData;
}
