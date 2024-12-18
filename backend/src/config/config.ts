import bodyParser from "body-parser";
import { Router } from "express";
import { router } from "../routes";
import { Employee } from "../models/employee";
import { Menu } from "../models/menu";
import { Table } from "../models/table";
import { Branch } from "../models/branch";

export async function config(app: Router) {
  await createDatabase(); // Sync the models after connection is established
  await app.use(bodyParser.json());
  await app.use("/api", router);
}

async function createDatabase() {
  try {
    await Branch.sync(); // Create the Branch table first
    await Employee.sync(); // Then create the Employee table
    await Menu.sync(); // Then other dependent tables
    await Table.sync();
    console.log("All tables created successfully.");
  } catch (error) {
    console.error("Error synchronizing tables:", error);
  }
}