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
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

interface Props {
  heads: string[];
  type?: string;
  page: string;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const DataTable: FC<Props> = ({ heads, page, type, setOpen }) => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setRowsPerPage(0);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const { data } = useQuery({
    queryKey: ["adminData", page, currentPage, type],
    queryFn: async () => {
      const res = await axios.get(
        `/api/admin/${page}${
          type ? `/${type}` : ""
        }?page=${currentPage}&rows=${rowsPerPage}`
      );
      return res;
    },
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return axios.delete(`/api/admin/${page}${type ? `/${type}` : ""}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminData"] });
      toast.success("Xóa thành công!");
    },
  });

  useEffect(() => {
    return () => {
      setCurrentPage(0);
    };
  }, [type]);

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
          {data?.data?.map((datum: any) => (
            <TableRow key={datum.id}>
              {Object.keys(datum).map((item) => (
                <TableCell key={item}>{datum[item]}</TableCell>
              ))}

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
                    if (
                      page == "vocabulary" ||
                      page == "practice" ||
                      page == "test"
                    ) {
                      mutation.mutate(datum.id);
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
              page={currentPage}
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
