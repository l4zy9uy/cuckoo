import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Box,
} from "@mui/material";

type Branch = {
  id: number;
  name: string;
  address: string;
  phone: string;
  openingHours: string;
};

const initialBranches: Branch[] = [
  { id: 1, name: "Central Branch", address: "123 Giai Phong", phone: "123-456-7890", openingHours: "9 AM - 9 PM" },
  { id: 2, name: "East Branch", address: "456 Le Duan", phone: "987-654-3210", openingHours: "10 AM - 8 PM" },
  { id: 3, name: "West Branch", address: "789 Le Thanh Nghi", phone: "456-789-1230", openingHours: "9 AM - 5 PM" },
];

const BranchManagementPage = () => {
  const [branches, setBranches] = useState<Branch[]>(initialBranches);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id: number) => {
    const updatedBranches = branches.filter((branch) => branch.id !== id);
    setBranches(updatedBranches);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredBranches = branches.filter(
    (branch) =>
      branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.phone.includes(searchTerm)
  );

  return (
    <div>
      <h1>Branch Management</h1>
      {/* Search Bar */}
      <Box sx={{ marginBottom: "1rem" }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name, address, or phone"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Box>

      {/* Branch Table */}
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
            {filteredBranches.map((branch) => (
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
            {filteredBranches.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No branches found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BranchManagementPage;
