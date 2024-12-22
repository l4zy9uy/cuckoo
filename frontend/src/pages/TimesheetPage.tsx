import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import dayjs from "dayjs";

type Employee = {
  id: number;
  name: string;
  position: string;
  workDays: string[]; // Array of dates (e.g., "2024-12-22")
};

const initialEmployees: Employee[] = [
  { id: 1, name: "Nguyen Van A", position: "Manager", workDays: ["2024-12-01", "2024-12-02"] },
  { id: 2, name: "Tran Thi B", position: "Chef", workDays: ["2024-12-01", "2024-12-03"] },
  { id: 3, name: "Le Van C", position: "Waiter", workDays: ["2024-12-04", "2024-12-05"] },
];

const TimesheetPage = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [searchName, setSearchName] = useState("");
  const [searchPosition, setSearchPosition] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));

  const daysInMonth = Array.from({ length: currentMonth.daysInMonth() }, (_, i) =>
    currentMonth.add(i, "day").format("YYYY-MM-DD")
  );

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const filteredEmployees = employees.filter((employee) => {
    const matchesName = employee.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesPosition = employee.position.toLowerCase().includes(searchPosition.toLowerCase());
    const matchesDate =
      !selectedDate || employee.workDays.includes(dayjs(selectedDate).format("YYYY-MM-DD"));
    return matchesName && matchesPosition && matchesDate;
  });

  return (
    <Box sx={{ padding: "1rem" }}>
      <h1>Timesheet Management</h1>
      <Box sx={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
        {/* Filters */}
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <TextField
          label="Search by Position"
          variant="outlined"
          value={searchPosition}
          onChange={(e) => setSearchPosition(e.target.value)}
        />
        <TextField
          type="date"
          label="Filter by Date"
          InputLabelProps={{ shrink: true }}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </Box>

      {/* Monthly Navigation */}
      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <Button variant="outlined" onClick={handlePreviousMonth}>
          Previous Month
        </Button>
        <h2>{currentMonth.format("MMMM YYYY")}</h2>
        <Button variant="outlined" onClick={handleNextMonth}>
          Next Month
        </Button>
      </Box>

      {/* Timesheet Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Employees Working</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {daysInMonth.map((day) => (
              <TableRow key={day}>
                <TableCell>{dayjs(day).format("DD/MM/YYYY")}</TableCell>
                <TableCell>
                  {filteredEmployees
                    .filter((employee) => employee.workDays.includes(day))
                    .map((emp) => `${emp.name} (${emp.position})`)
                    .join(", ") || "No employees working"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TimesheetPage;
