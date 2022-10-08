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
import { FC } from "react";
import { IPost } from "../../../utils/types";
import { useMemo } from "react";
import { useRouter } from "next/router";
interface Props {
  posts: IPost[];
}

const PostTable: FC<Props> = ({ posts }) => {
  const heads = useMemo(
    () => ["ID", "Title", "Category", "Created At", "Updated At", ""],
    []
  );
  const router = useRouter();

  const handleChangePage = (event: unknown, newPage: number) => {
    if (newPage == 0) {
      return;
    }
    router.push(`?page=${newPage}`);
  };

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
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.id}</TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.category}</TableCell>
              {/* <TableCell>{post.createdAt}</TableCell>
                <TableCell>{post.updatedAt}</TableCell> */}

              <TableCell sx={{ display: "flex", gap: 1 }}>
                <Button variant="contained" color="primary">
                  Edit
                </Button>
                <Button variant="contained" color="error">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TablePagination
            count={-1}
            page={Number(router.query.page) || 1}
            rowsPerPage={5}
            onPageChange={handleChangePage}
          />
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default PostTable;
