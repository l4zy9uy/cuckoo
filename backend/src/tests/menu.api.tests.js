const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;

// Base URL of your API
const BASE_URL = "http://localhost:3000/api";

describe("Menu API", () => {
    let createdMenuId;

    // Test: Create a new menu item
    it("should create a new menu item", async () => {
        const menuData = {
            branch_id: 1,
            name: "Sample Menu Item",
            description: "This is a sample menu item.",
            sale_price: 100.50,
            cost_price: 50.25,
            item_type: "Food",
            item_group: "Main Course",
            availability: true,
            image: "https://example.com/image.jpg",
        };

        const response = await request(BASE_URL).post("/menus").send(menuData);
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property("menu_id");
        expect(response.body).to.include(menuData);

        createdMenuId = response.body.menu_id; // Save the menu ID for later tests
    });

    // Test: Retrieve all menu items
    it("should retrieve all menu items", async () => {
        const response = await request(BASE_URL).get("/menus");
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("array");
        expect(response.body.length).to.be.greaterThan(0);
    });

    // Test: Retrieve a single menu item by ID
    it("should retrieve a menu item by ID", async () => {
        const response = await request(BASE_URL).get(`/menus/${createdMenuId}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("menu_id", createdMenuId);
    });

    // Test: Update a menu item
    it("should update a menu item", async () => {
        const updatedData = {
            name: "Updated Menu Item",
            sale_price: 120.00,
            availability: false,
        };

        const response = await request(BASE_URL).put(`/menus/${createdMenuId}`).send(updatedData);
        expect(response.status).to.equal(200);
        expect(response.body).to.include(updatedData);
    });

    // Test: Delete a menu item
    it("should delete a menu item", async () => {
        const response = await request(BASE_URL).delete(`/menus/${createdMenuId}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("message", "Menu deleted successfully!");
    });

    // Test: Attempt to retrieve the deleted menu item
    it("should return 404 for a deleted menu item", async () => {
        const response = await request(BASE_URL).get(`/menus/${createdMenuId}`);
        expect(response.status).to.equal(404);
        expect(response.body).to.have.property("message", "Menu item not found");
    });
});
