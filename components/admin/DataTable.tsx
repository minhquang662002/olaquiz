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
  CircularProgress,
  Box,
} from "@mui/material";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import AlertDialog from "../AlertDialog";

interface Props {
  heads: string[];
  type?: string;
  page: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setItemId: Dispatch<SetStateAction<string>>;
}

const DataTable: FC<Props> = ({ heads, page, type, setOpen, setItemId }) => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const { data, isFetching } = useQuery({
    queryKey: ["adminData", page, currentPage, type],
    queryFn: async () => {
      const res = await axios.get(
        `/api/admin/${page}${
          type ? `/${type}` : ""
        }?page=${currentPage}&rows=${rowsPerPage}`
      );
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  const [openDialog, setOpenDialog] = useState(false);
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

  const cancelFn = () => {
    setOpenDialog(false);
    mutation.mutate();
  };

  return (
    <>
      {openDialog && (
        <AlertDialog
          title="Xóa"
          progressTitle="Hủy"
          content="Bạn có chắc là muốn xóa?"
          cancelTitle="Tiếp tục"
          cancelFn={cancelFn}
          progressFn={() => setOpenDialog(false)}
        />
      )}
      <TableContainer component={Paper}>
        {isFetching ? (
          <Box
            sx={{
              height: 300,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress sx={{ marginX: "auto" }} />
          </Box>
        ) : (
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
                  {Object.keys(datum).map((item) => (
                    <TableCell key={item}>{datum[item]}</TableCell>
                  ))}

                  <TableCell sx={{ display: "flex", gap: 1 }}>
                    {page != "user" &&
                      page != "vocabulary" &&
                      page != "practice" &&
                      page != "test" && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            if (datum?.id) {
                              setItemId(datum.id);
                            }
                            setOpen(true);
                          }}
                        >
                          Sửa
                        </Button>
                      )}
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        {
                          setOpenDialog(true);
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
        )}
      </TableContainer>
    </>
  );
};

export default DataTable;
