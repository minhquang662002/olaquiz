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
import { IUser } from "../../utils/types";
import { useMemo } from "react";
import { useRouter } from "next/router";
interface Props {
  users: IUser[];
}

const UserTable: FC<Props> = ({ users }) => {
  const heads = useMemo(
    () => ["ID", "Email", "First Name", "Last Name", "Role", ""],
    []
  );
  const router = useRouter();
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
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.role.name}</TableCell>
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
            page={Number(router.query.id) || 1}
            rowsPerPage={5}
            onPageChange={() =>
              router.push(
                `?id=${router.query.id ? Number(router.query.id) + 1 : 2}`
              )
            }
          />
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
