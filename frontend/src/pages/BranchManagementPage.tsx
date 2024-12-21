import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

type Branch = {
  id: number;
  name: string;
  address: string;
  phone: string;
  openingHours: string;
};

const initialBranches: Branch[] = [
  { id: 1, name: "Nhà hàng số 1", address: "123 Giải Phóng", phone: "123-456-7890", openingHours: "9 AM - 9 PM" },
  { id: 2, name: "Nhà hàng số 2", address: "456 Lê Thanh Nghị", phone: "987-654-3210", openingHours: "10 AM - 8 PM" },
  { id: 3, name: "Nhà hàng số 3", address: "789 Lê Duẩn", phone: "456-789-1230", openingHours: "9 AM - 5 PM" },
];

const BranchManagementPage = () => {
  const [branches, setBranches] = useState<Branch[]>(initialBranches);

  const handleDelete = (id: number) => {
    const updatedBranches = branches.filter((branch) => branch.id !== id);
    setBranches(updatedBranches);
  };

  return (
    <div>
      <h1>Branch Management</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Opening Hours</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {branches.map((branch) => (
              <TableRow key={branch.id}>
                <TableCell>{branch.id}</TableCell>
                <TableCell>{branch.name}</TableCell>
                <TableCell>{branch.address}</TableCell>
                <TableCell>{branch.phone}</TableCell>
                <TableCell>{branch.openingHours}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(branch.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BranchManagementPage;