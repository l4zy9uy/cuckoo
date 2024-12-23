import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api', // Replace with your backend API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// API calls for Menu
export const getMenus = () => apiClient.get('/menus'); // GET all menus
export const getMenuById = (id: number) => apiClient.get(`/menus/${id}`); // GET menu by ID
export const createMenu = (data: any) => apiClient.post('/menus', data); // POST a new menu
export const updateMenu = (id: number, data: any) => apiClient.put(`/menus/${id}`, data); // PUT update menu
export const deleteMenu = (id: number) => apiClient.delete(`/menus/${id}`); // DELETE menu
