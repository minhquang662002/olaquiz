import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
} from "@mui/material";
import { Result, Test } from "@prisma/client";
import axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";
import { useQuery } from "react-query";

const ResultTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };
  const { data } = useQuery({
    queryKey: ["resultData", currentPage],
    queryFn: async () => {
      const res = await axios.get(`/api/result?page=${currentPage}&rows=10`);
      return res;
    },
  });

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tên bài</TableCell>
              <TableCell align="center">Loại bài</TableCell>
              <TableCell align="center">Thời gian</TableCell>
              <TableCell align="center">Điểm</TableCell>
              <TableCell align="center">Ngày làm</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data?.map((item: Result & { Test: Test }) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.Test.name}
                </TableCell>
                <TableCell align="center">{item.Test.type}</TableCell>
                <TableCell align="center">
                  {item.Test.type == "mini-test"
                    ? Math.floor((3600 - item.remainTime) / 3600)
                    : Math.floor((7200 - item.remainTime) / 3600)}
                  :
                  {item.Test.type == "mini-test"
                    ? Math.floor((3600 - item.remainTime) / 60) >= 10
                      ? Math.floor((3600 - item.remainTime) / 60)
                      : `0${Math.floor((3600 - item.remainTime) / 60)}`
                    : Math.floor((7200 - item.remainTime) / 60) >= 10
                    ? Math.floor((7200 - item.remainTime) / 60)
                    : `0${Math.floor((7200 - item.remainTime) / 60)}`}
                  :{60 - (item.remainTime % 60)}
                </TableCell>
                <TableCell align="center">{item.score}</TableCell>
                <TableCell align="center">
                  {dayjs(item.createdAt).format("DD-MM-YYYY")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        colSpan={3}
        count={-1}
        page={currentPage}
        component="div"
        onPageChange={handleChangePage}
        rowsPerPage={10}
        rowsPerPageOptions={[]}
      />
    </Box>
  );
};

export default ResultTable;
