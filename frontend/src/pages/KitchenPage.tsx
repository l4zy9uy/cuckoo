import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  TextField,
} from "@mui/material";

type Employee = {
  id: number;
  name: string;
  position: string; // e.g., "Head Chef", "Assistant Chef"
};

type Ingredient = {
  id: number;
  name: string;
  quantity: number;
  unit: string; // e.g., "kg", "liters"
};

const initialEmployees: Employee[] = [
  { id: 1, name: "Nguyen Van A", position: "Head Chef" },
  { id: 2, name: "Tran Thi B", position: "Assistant Chef" },
  { id: 3, name: "Le Van C", position: "Sous Chef" },
];

const initialIngredients: Ingredient[] = [
  { id: 1, name: "Flour", quantity: 50, unit: "kg" },
  { id: 2, name: "Sugar", quantity: 20, unit: "kg" },
  { id: 3, name: "Milk", quantity: 15, unit: "liters" },
  { id: 4, name: "Eggs", quantity: 200, unit: "pieces" },
];

const KitchenPage = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [ingredients, setIngredients] = useState<Ingredient[]>(initialIngredients);
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [ingredientSearch, setIngredientSearch] = useState("");

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(employeeSearch.toLowerCase())
  );

  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(ingredientSearch.toLowerCase())
  );

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Kitchen Management
      </Typography>

      {/* Employees Table */}
      <Box sx={{ marginBottom: "2rem" }}>
        <Typography variant="h5" gutterBottom>
          Employees Working in Kitchen
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Search employees..."
          fullWidth
          sx={{ marginBottom: "1rem" }}
          value={employeeSearch}
          onChange={(e) => setEmployeeSearch(e.target.value)}
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Position</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                </TableRow>
              ))}
              {filteredEmployees.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No employees found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Ingredients Table */}
      <Box>
        <Typography variant="h5" gutterBottom>
          Available Ingredients
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Search ingredients..."
          fullWidth
          sx={{ marginBottom: "1rem" }}
          value={ingredientSearch}
          onChange={(e) => setIngredientSearch(e.target.value)}
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Ingredient</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredIngredients.map((ingredient) => (
                <TableRow key={ingredient.id}>
                  <TableCell>{ingredient.id}</TableCell>
                  <TableCell>{ingredient.name}</TableCell>
                  <TableCell>{ingredient.quantity}</TableCell>
                  <TableCell>{ingredient.unit}</TableCell>
                </TableRow>
              ))}
              {filteredIngredients.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No ingredients found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default KitchenPage;
