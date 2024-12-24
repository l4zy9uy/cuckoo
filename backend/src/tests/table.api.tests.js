const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;

// Base URL of your API
const BASE_URL = "http://localhost:3000/api";

// Test Suite
describe("Table API", () => {
    let createdTableId;

    // Test: Create a new table
    it("should create a new table", async () => {
        const tableData = {
            branch_id: 1,
            table_number: "T01",
            capacity: 4,
            status: "Available",
        };

        const response = await request(BASE_URL).post("/tables").send(tableData);
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property("table_id");
        expect(response.body).to.include(tableData);

    });

    // Test: Retrieve all tables
    it("should retrieve all tables", async () => {
        const response = await request(BASE_URL).get("/tables");
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("array");
        expect(response.body.length).to.be.greaterThan(0);
    });

    // Test: Retrieve a single table by ID
    it("should retrieve a table by ID", async () => {
        const response = await request(BASE_URL).get(`/tables/1`);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("table_id", 1);
    });

    // Test: Update the table
    it("should update a table", async () => {
        const updatedData = {
            status: "Occupied",
            capacity: 6,
        };

        const response = await request(BASE_URL).put(`/tables/1`).send(updatedData);
        expect(response.status).to.equal(200);
        expect(response.body).to.include(updatedData);
    });

    // Test: Delete the table
    it("should delete a table", async () => {
        const response = await request(BASE_URL).delete(`/tables/1`);
        expect(response.status).to.equal(204);
    });

    // Test: Attempt to retrieve the deleted table
    it("should return 404 for a deleted table", async () => {
        const response = await request(BASE_URL).get(`/tables/1`);
        expect(response.status).to.equal(404);
    });
});
