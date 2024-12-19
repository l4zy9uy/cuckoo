const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "doan-session",
    keys: ["COOKIE_SECRET"],
    httpOnly: true,
  })
);

const db = require("./models");
const Role = db.role;

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Db');
  initial();

  return db.seed();

});

async function initial() {
  try {
    Role.create({
      id: 1,
      name: "user"
    });

    Role.create({
      id: 2,
      name: "moderator"
    });

    Role.create({
      id: 3,
      name: "admin"
    });

  } catch (error) {
    console.error('Error in initial seeding:', error);

  }
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require("./routes/order.route.js")(app);
require("./routes/branch.routes")(app);
require("./routes/table.route")(app);
require("./routes/employee.route")(app);
require("./routes/menu.route")(app);
require("./routes/customer.route")(app);
require("./routes/inventory.route")(app);
require("./routes/order_items.routes")(app);
require("./routes/supplier.route")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});