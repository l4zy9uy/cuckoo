const { faker } = require('@faker-js/faker/locale/vi');

// gen fake data
const generateBranches = (count) => {
    const branches = [];
    for (let i = 0; i < count; i++) {
        branches.push({
            restaurant_id: i + 1,
            name: `Chi nhánh ${faker.location.street()}`,
            address: `${faker.location.street()}, ${faker.location.city()}`,
            phone: faker.phone.number('0#########'),
            opening_hours: '8 AM - 10 PM',
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }
    return branches;
};

const generateCustomers = (count, branchIds) => {
    const customers = [];
    const genders = ['Nam', 'Nữ', 'Khác'];

    for (let i = 0; i < count; i++) {
        customers.push({
            name: faker.person.fullName(),
            phone: faker.phone.number('0#########'),
            branch_id: branchIds[Math.floor(Math.random() * branchIds.length)],
            gender: genders[Math.floor(Math.random() * genders.length)],
            email: faker.internet.email(),
            note: faker.lorem.sentence(),
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }
    return customers;
};

const generateEmployees = (count, branchIds) => {
    const employees = [];
    const positions = ['Manager', 'Chef', 'Waiter', 'Cashier', 'Cleaner'];
    const genders = ['Nam', 'Nữ', 'Khác'];

    for (let i = 0; i < count; i++) {
        employees.push({
            name: faker.person.fullName(),
            position: positions[Math.floor(Math.random() * positions.length)],
            id_card_number: faker.string.numeric(12),
            birth_date: faker.date.between({ from: '1970-01-01', to: '2000-12-31' }),
            gender: genders[Math.floor(Math.random() * genders.length)],
            phone: faker.phone.number('0#########'),
            hire_date: faker.date.between({ from: '2015-01-01', to: '2024-01-01' }),
            salary: faker.number.float({ min: 800, max: 2000, precision: 0.01 }),
            branch_id: branchIds[Math.floor(Math.random() * branchIds.length)],
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }
    return employees;
};

const generateOrders = (count, branchIds, customerIds, employeeIds) => {
    const orders = [];
    const statuses = ['Pending', 'Completed', 'Cancelled']; // Updated status values

    for (let i = 0; i < count; i++) {
        const total_amount = faker.number.float({ min: 50, max: 500, precision: 0.01 });
        const amount_paid = faker.number.float({ min: total_amount, max: total_amount + 100, precision: 0.01 });

        orders.push({
            branch_id: branchIds[Math.floor(Math.random() * branchIds.length)],
            table_id: faker.number.int({ min: 1, max: 20 }),
            customer_id: customerIds[Math.floor(Math.random() * customerIds.length)],
            employee_id: employeeIds[Math.floor(Math.random() * employeeIds.length)],
            order_date: faker.date.between({ from: '2024-01-01', to: new Date() }),
            total_amount: total_amount,
            amount_paid: amount_paid,
            // change_amount is virtual, no need to set it
            status: statuses[Math.floor(Math.random() * statuses.length)],
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }
    return orders;
};

const generateOrderItems = (count, orderIds, menuIds) => {
    const orderItems = [];
    
    if (!orderIds.length || !menuIds.length) {
        console.error('No order IDs or menu IDs available for generating order items');
        return orderItems;
    }
    
    for (let i = 0; i < count; i++) {
        const orderItem = {
            order_id: orderIds[Math.floor(Math.random() * orderIds.length)],
            menu_id: menuIds[Math.floor(Math.random() * menuIds.length)],
            quantity: Math.floor(Math.random() * 5) + 1, // Random quantity between 1-5
            price: faker.number.float({ min: 30000, max: 200000, precision: 100 }), // Random price between 30,000 - 200,000
            createdAt: new Date(),
            updatedAt: new Date()
        };
        
        console.log(`Generated order item: Order ID ${orderItem.order_id}, Menu ID ${orderItem.menu_id}`);
        orderItems.push(orderItem);
    }
    
    return orderItems;
};

const generateMenus = (count = 100, branchIds) => {
    const menuItems = [];
    
    const itemTypes = ['Đồ ăn', 'Đồ uống', 'Tráng miệng'];
    const itemGroups = {
        'Đồ ăn': ['Món chính', 'Món phụ', 'Món nướng', 'Món hấp', 'Món xào'],
        'Đồ uống': ['Nước ngọt', 'Bia', 'Rượu', 'Nước ép', 'Trà sữa'],
        'Tráng miệng': ['Chè', 'Kem', 'Bánh ngọt', 'Hoa quả', 'Pudding']
    };

    const foodNames = {
        'Món chính': [
            'Phở bò', 'Cơm sườn', 'Bún bò', 'Mì xào', 'Cơm gà',
            'Bún chả', 'Hủ tiếu', 'Cơm rang', 'Bánh canh', 'Bún riêu'
        ],
        'Món phụ': [
            'Gỏi cuốn', 'Chả giò', 'Nem nướng', 'Đậu hũ', 'Cánh gà chiên',
            'Chả cá', 'Hoành thánh', 'Salad', 'Súp', 'Kim chi'
        ],
        'Món nướng': [
            'Thịt nướng', 'Hải sản nướng', 'Gà nướng', 'Bò nướng', 'Sườn nướng'
        ],
        'Món hấp': [
            'Cá hấp', 'Tôm hấp', 'Mực hấp', 'Gà hấp', 'Nghêu hấp'
        ],
        'Món xào': [
            'Rau xào', 'Mì xào', 'Phở xào', 'Bò xào', 'Mực xào'
        ]
    };

    for (let i = 0; i < count; i++) {
        const itemType = itemTypes[Math.floor(Math.random() * itemTypes.length)];
        const itemGroup = itemGroups[itemType][Math.floor(Math.random() * itemGroups[itemType].length)];
        
        // Tính giá cost và sale
        let costPrice, salePrice;
        
        if (itemType === 'Đồ ăn') {
            costPrice = faker.number.float({ min: 20000, max: 100000, precision: 100 });
            salePrice = costPrice * 1.5; // Markup 50%
        } else if (itemType === 'Đồ uống') {
            costPrice = faker.number.float({ min: 5000, max: 30000, precision: 100 });
            salePrice = costPrice * 2; // Markup 100%
        } else { // Tráng miệng
            costPrice = faker.number.float({ min: 10000, max: 40000, precision: 100 });
            salePrice = costPrice * 1.7; // Markup 70%
        }

        let name;
        if (itemType === 'Đồ ăn') {
            const foods = foodNames[itemGroup] || foodNames['Món chính'];
            name = foods[Math.floor(Math.random() * foods.length)];
        } else if (itemType === 'Đồ uống') {
            name = faker.helpers.arrayElement([
                'Coca Cola', 'Pepsi', 'Trà đào', 'Trà sữa trân châu',
                'Cà phê đen', 'Cà phê sữa', 'Nước cam', 'Sinh tố bơ',
                'Bia Tiger', 'Bia Heineken'
            ]);
        } else {
            name = faker.helpers.arrayElement([
                'Chè thái', 'Flan caramel', 'Rau câu dừa', 'Kem vanilla',
                'Bánh plan', 'Trái cây dĩa', 'Yaourt', 'Chè đậu đỏ'
            ]);
        }

        const menuItem = {
            name: name,
            description: faker.lorem.sentence(),
            sale_price: salePrice,
            cost_price: costPrice,
            item_type: itemType,
            item_group: itemGroup,
            availability: faker.datatype.boolean(0.9), // 90% chance of being available
            image: `${name.toLowerCase().replace(/ /g, '_')}.jpg`,
            branch_id: branchIds[Math.floor(Math.random() * branchIds.length)],
            createdAt: new Date(),
            updatedAt: new Date()
        };

        menuItems.push(menuItem);
    }

    return menuItems;
};

module.exports = {
    generateBranches,
    generateCustomers,
    generateEmployees,
    generateOrders,
    generateMenus,
    generateOrderItems,
};