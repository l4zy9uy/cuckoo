const { sequelize } = require('../models');
// const { Branch, Customer, Employee, Order, Menu, OrderItem } = require('../models');
const { generateBranches, generateCustomers, generateEmployees, generateOrderItems, generateMenus } = require('./initialData');
const db = require("../models");
//seed
async function seedDatabase() {
  try {
    // Clear existing data
    await sequelize.sync({ force: true });

    console.log('Bắt đầu seeding...');

    // Generate and insert branches
    console.log('Seeding branches...');
    const branches = generateBranches(10);
    const createdBranches = await db.Branch.bulkCreate(branches);
    const branchIds = createdBranches.map(branch => branch.id);

    // Generate and insert customers
    console.log('Seeding customers...');
    const customers = generateCustomers(50, branchIds);
    const createdCustomers = await db.Customer.bulkCreate(customers);
    const customerIds = createdCustomers.map(customer => customer.id);

    // Generate and insert employees
    console.log('Seeding employees...');
    const employees = generateEmployees(30, branchIds);
    const createdEmployees = await db.Employee.bulkCreate(employees);
    const employeeIds = createdEmployees.map(employee => employee.id);

    // Generate and insert menus
    console.log('Seeding menus...');
    const menus = generateMenus(100, branchIds);
    const createdMenus = await db.Menu.bulkCreate(menus);
    const menuIds = createdMenus.map(menu => menu.id);
    console.log(`Created ${createdMenus.length} menu items`);

    // Generate and insert orders
    console.log('Seeding orders...');
    const orders = generateOrders(40, branchIds, customerIds, employeeIds);
    const createdOrders = await db.Order.bulkCreate(orders);
    const orderIds = createdOrders.map(order => order.id);

    // Generate and insert order items
    console.log('Seeding order items...');
    const orderItems = generateOrderItems(100, orderIds, menuIds);
    const createdOrderItems = await db.OrderItem.bulkCreate(orderItems);
    console.log(`Created ${createdOrderItems.length} order items`);

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    console.error('Error details:', error.message);
    if (error.errors) {
      console.error('Validation errors:', error.errors);
    }
  } finally {
    await sequelize.close();
  }
}

// Execute the seeding
seedDatabase(); 