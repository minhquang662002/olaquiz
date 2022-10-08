import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TableFooter,
  TablePagination,
} from "@mui/material";
import { deleteTopic } from "../../utils/api";
import axios from "axios";

interface Props {
  heads: string[];
  type: string;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const DataTable: FC<Props> = ({ heads, type, setOpen }) => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState<any>();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  useEffect(() => {
    (async function () {
      const res = await axios.get(
        `/api/${type}?page=${page}&rows=${rowsPerPage}`
      );
      setData(res?.data);
    })();
  }, [page, type, rowsPerPage]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {heads.map((item) => (
              <TableCell key={item}>{item}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((datum: any) => (
            <TableRow key={datum.id}>
              {Object.keys(datum).map((item) => {
                if (typeof datum[item] != "object") {
                  return <TableCell key={item}>{datum[item]}</TableCell>;
                } else {
                  return Object.keys(datum[item]).map((inn: any) => (
                    <TableCell key={inn}>{datum[item][inn]}</TableCell>
                  ));
                }
              })}

              <TableCell sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpen?.(true)}
                >
                  Sửa
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    if (type == "topic") {
                      console.log("running");
                      deleteTopic(datum.id);
                    }
                  }}
                >
                  Xóa
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              count={-1}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
