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
    // Generate menus
    console.log('Seeding menus...');
    const menus = generateMenus(100, [1]); // Tạo 100 menu với branch_id mặc định là 1
    await db.Menu.bulkCreate(menus);
    console.log('Menus seeded successfully');

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
require("./routes/order_items.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

