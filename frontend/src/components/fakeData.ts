export const salesData = {
    daily: [
        { label: '7:00-8:30', sales: 150 },
        { label: '8:30-10:00', sales: 200 },
        { label: '10:00-11:30', sales: 180 },
        { label: '11:30-13:00', sales: 250 },
        { label: '13:00-14:30', sales: 220 },
        { label: '14:30-16:00', sales: 300 },
    ],
    weekly: [
        { label: 'Thứ Hai', sales: 1500 },
        { label: 'Thứ Ba', sales: 1700 },
        { label: 'Thứ Tư', sales: 1800 },
        { label: 'Thứ Năm', sales: 1600 },
        { label: 'Thứ Sáu', sales: 2000 },
        { label: 'Thứ Bảy', sales: 2500 },
        { label: 'Chủ Nhật', sales: 2200 },
    ],
    monthly: (() => {
        const today = new Date();
        const daysPassed = today.getDate();
        return Array.from({ length: daysPassed }, (_, i) => ({
            label: `Ngày ${i + 1}`,
            sales: Math.floor(Math.random() * 500) + 100,
        }));
    })(),
};

export const baseTopPerformers = [
    { employee: "Nguyễn Văn A", sales: 8750 },
    { employee: "Lê Văn B", sales: 6150 },
    { employee: "Trần Thị C", sales: 5800 },
    { employee: "Phạm Minh D", sales: 4900 },
    { employee: "Hoàng Anh E", sales: 4300 },
];

export const salesData2 = {
    daily: [
        { label: '6:00-7:30', sales: 120 },
        { label: '7:30-9:00', sales: 230 },
        { label: '9:00-10:30', sales: 190 },
        { label: '10:30-12:00', sales: 260 },
        { label: '12:00-13:30', sales: 210 },
        { label: '13:30-15:00', sales: 280 },
    ],
    weekly: [
        { label: 'Thứ Hai', sales: 1400 },
        { label: 'Thứ Ba', sales: 1600 },
        { label: 'Thứ Tư', sales: 1750 },
        { label: 'Thứ Năm', sales: 1500 },
        { label: 'Thứ Sáu', sales: 1900 },
        { label: 'Thứ Bảy', sales: 2400 },
        { label: 'Chủ Nhật', sales: 2100 },
    ],
    monthly: (() => {
        const today = new Date();
        const daysPassed = today.getDate();
        return Array.from({ length: daysPassed }, (_, i) => ({
            label: `Ngày ${i + 1}`,
            sales: Math.floor(Math.random() * 600) + 150,
        }));
    })(),
};

export const baseTopPerformers2 = [
    { employee: "Phạm Văn G", sales: 9200 },
    { employee: "Nguyễn Thị H", sales: 6800 },
    { employee: "Lê Minh K", sales: 6100 },
    { employee: "Hoàng Thị L", sales: 5200 },
    { employee: "Trần Văn M", sales: 4700 },
];


export const salesData3 = {
    daily: [
        { label: '6:30-8:00', sales: 180 },
        { label: '8:00-9:30', sales: 220 },
        { label: '9:30-11:00', sales: 170 },
        { label: '11:00-12:30', sales: 240 },
        { label: '12:30-14:00', sales: 200 },
        { label: '14:00-15:30', sales: 310 },
    ],
    weekly: [
        { label: 'Thứ Hai', sales: 1600 },
        { label: 'Thứ Ba', sales: 1500 },
        { label: 'Thứ Tư', sales: 1850 },
        { label: 'Thứ Năm', sales: 1700 },
        { label: 'Thứ Sáu', sales: 1950 },
        { label: 'Thứ Bảy', sales: 2600 },
        { label: 'Chủ Nhật', sales: 2300 },
    ],
    monthly: (() => {
        const today = new Date();
        const daysPassed = today.getDate();
        return Array.from({ length: daysPassed }, (_, i) => ({
            label: `Ngày ${i + 1}`,
            sales: Math.floor(Math.random() * 550) + 120,
        }));
    })(),
};

export const baseTopPerformers3 = [
    { employee: "Ngô Văn N", sales: 8900 },
    { employee: "Đinh Thị O", sales: 6300 },
    { employee: "Phan Minh P", sales: 6000 },
    { employee: "Võ Thị Q", sales: 5100 },
    { employee: "Dương Văn R", sales: 4600 },
];

export const allSalesData = [
    {
        id: 1,
        name: "Dataset 1",
        daily: [
            { label: '7:00-8:30', sales: 150 },
            { label: '8:30-10:00', sales: 200 },
            { label: '10:00-11:30', sales: 180 },
            { label: '11:30-13:00', sales: 250 },
            { label: '13:00-14:30', sales: 220 },
            { label: '14:30-16:00', sales: 300 },
        ],
        weekly: [
            { label: 'Thứ Hai', sales: 1500 },
            { label: 'Thứ Ba', sales: 1700 },
            { label: 'Thứ Tư', sales: 1800 },
            { label: 'Thứ Năm', sales: 1600 },
            { label: 'Thứ Sáu', sales: 2000 },
            { label: 'Thứ Bảy', sales: 2500 },
            { label: 'Chủ Nhật', sales: 2200 },
        ],
        monthly: (() => {
            const today = new Date();
            const daysPassed = today.getDate();
            return Array.from({ length: daysPassed }, (_, i) => ({
                label: `Ngày ${i + 1}`,
                sales: Math.floor(Math.random() * 500) + 100,
            }));
        })(),
    },
    {
        id: 2,
        name: "Dataset 2",
        daily: [
            { label: '6:00-7:30', sales: 120 },
            { label: '7:30-9:00', sales: 230 },
            { label: '9:00-10:30', sales: 190 },
            { label: '10:30-12:00', sales: 260 },
            { label: '12:00-13:30', sales: 210 },
            { label: '13:30-15:00', sales: 280 },
        ],
        weekly: [
            { label: 'Thứ Hai', sales: 1400 },
            { label: 'Thứ Ba', sales: 1600 },
            { label: 'Thứ Tư', sales: 1750 },
            { label: 'Thứ Năm', sales: 1500 },
            { label: 'Thứ Sáu', sales: 1900 },
            { label: 'Thứ Bảy', sales: 2400 },
            { label: 'Chủ Nhật', sales: 2100 },
        ],
        monthly: (() => {
            const today = new Date();
            const daysPassed = today.getDate();
            return Array.from({ length: daysPassed }, (_, i) => ({
                label: `Ngày ${i + 1}`,
                sales: Math.floor(Math.random() * 600) + 150,
            }));
        })(),
    },
    {
        id: 3,
        name: "Dataset 3",
        daily: [
            { label: '6:30-8:00', sales: 180 },
            { label: '8:00-9:30', sales: 220 },
            { label: '9:30-11:00', sales: 170 },
            { label: '11:00-12:30', sales: 240 },
            { label: '12:30-14:00', sales: 200 },
            { label: '14:00-15:30', sales: 310 },
        ],
        weekly: [
            { label: 'Thứ Hai', sales: 1600 },
            { label: 'Thứ Ba', sales: 1500 },
            { label: 'Thứ Tư', sales: 1850 },
            { label: 'Thứ Năm', sales: 1700 },
            { label: 'Thứ Sáu', sales: 1950 },
            { label: 'Thứ Bảy', sales: 2600 },
            { label: 'Chủ Nhật', sales: 2300 },
        ],
        monthly: (() => {
            const today = new Date();
            const daysPassed = today.getDate();
            return Array.from({ length: daysPassed }, (_, i) => ({
                label: `Ngày ${i + 1}`,
                sales: Math.floor(Math.random() * 550) + 120,
            }));
        })(),
    },
];

export const allTopPerformers = [
    {
        id: 4,
        name: "Dataset 4",
        topPerformers: [
            { employee: "Nguyễn Văn A", sales: 8750 },
            { employee: "Lê Văn B", sales: 6150 },
            { employee: "Trần Thị C", sales: 5800 },
            { employee: "Phạm Minh D", sales: 4900 },
            { employee: "Hoàng Anh E", sales: 4300 },
        ],
    },
    {
        id: 1,
        name: "Dataset 1",
        topPerformers: [
            { employee: "Nguyễn Văn A", sales: 8750 },
            { employee: "Lê Văn B", sales: 6150 },
            { employee: "Trần Thị C", sales: 5800 },
            { employee: "Phạm Minh D", sales: 4900 },
            { employee: "Hoàng Anh E", sales: 4300 },
        ],
    },
    {
        id: 2,
        name: "Dataset 2",
        topPerformers: [
            { employee: "Phạm Văn G", sales: 9200 },
            { employee: "Nguyễn Thị H", sales: 6800 },
            { employee: "Lê Minh K", sales: 6100 },
            { employee: "Hoàng Thị L", sales: 5200 },
            { employee: "Trần Văn M", sales: 4700 },
        ],
    },
    {
        id: 3,
        name: "Dataset 3",
        topPerformers: [
            { employee: "Ngô Văn N", sales: 8900 },
            { employee: "Đinh Thị O", sales: 6300 },
            { employee: "Phan Minh P", sales: 6000 },
            { employee: "Võ Thị Q", sales: 5100 },
            { employee: "Dương Văn R", sales: 4600 },
        ],
    },
];

