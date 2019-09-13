import React, { useState } from "react";
// Material-UI imports
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  IconButton
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// Material-UI icon imports
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
// Custom imports
import { formatStatusCode } from "../../helpers/FormatStatusCode";
import { formatCurrency } from "../../helpers/FormatCurrency";
import { formatDescription } from "../../helpers/FormatDescriptions";
import { formatCompletedTransactionDate } from "../../helpers/FormatDates";

function TablePaginationActions(props) {
  const classes = useStyles();
  const { count, page, rowsPerPage, onChangePage } = props;

  function handleFirstPageButtonClick(event) {
    onChangePage(event, 0);
  }

  function handleBackButtonClick(event) {
    onChangePage(event, page - 1);
  }

  function handleNextButtonClick(event) {
    onChangePage(event, page + 1);
  }

  function handleLastPageButtonClick(event) {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <LastPageIcon />
      </IconButton>
    </div>
  );
}

export default function CompletedTransactionsTable(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  function handleChangePage(newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }
  return (
    <div className="moduleContent">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Transaction Type</TableCell>
            <TableCell>Payee Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Draft Type</TableCell>
            <TableCell>Memo</TableCell>
            <TableCell>Check Images</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(data => (
              <TableRow key={data.id}>
                <TableCell>
                  {formatCompletedTransactionDate(data.transactionDate)}
                </TableCell>
                <TableCell>{formatCurrency(data.amount)}</TableCell>
                <TableCell>{formatDescription(data.typeDescription)}</TableCell>
                <TableCell>{data.payeeName}</TableCell>
                <TableCell>{formatStatusCode(data.status)}</TableCell>
                <TableCell>{data.typeDesc}</TableCell>
                <TableCell>{data.memo}</TableCell>
                <TableCell>{data.isCheckImageLinked}</TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 20, 30, 50, 100]}
              colSpan={3}
              count={props.data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5)
  }
}));
