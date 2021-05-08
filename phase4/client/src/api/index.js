import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000/' }); // Temporary URL for testing with backend

/* User generic connections */
export const login = (loginData) => api.post('/user/login', loginData);
export const register = (registerData) => api.post('/user/register', registerData);

/* admin connections */
export const createChain = async (chainData) => api.post('/admin/create_chain', chainData);
export const createStore = async (storeData) => api.post('/admin/create_store', storeData);
export const createDrone = async (droneData) => api.post('/admin/create_drone', droneData);
export const createItem = async (itemData) => api.post('/admin/create_item', itemData);
export const getCustomers = async (customerData) => api.post('/admin/customers', customerData);
export const getChains = async () => api.get('/admin/chains');
export const getZipcodeAndEmployee = async () => api.get('/admin/zip_and_tech');

/* customer connections */
export const setCard = async (cardData) => api.post('/customer/change_card', cardData);
export const customerGetHistory = async (customerData) => api.post('/customer/history', customerData);
export const customerGetOrderNumbers = async (customerData) => api.post('customer/list_orders', customerData);
export const customerGetStores = async (customerData) => api.post('/customer/store', customerData);
export const customerGetAvailableStores = async (customerData) => api.post('/customer/store_info', customerData);
export const customerOrder = async (orderData) => api.post('/customer/order', orderData);
export const customerReview = async (orderData) => api.post('/customer/review', orderData);
export const customerUpdateOrder = async (orderData) => api.post('/customer/update_order', orderData);
export const finalizeOrder = async (orderData) => api.post('/customer/finalize_order', orderData);

/* manager connections */
export const getChainName = (items) => api.post('/manager/get_items', items);
export const createChainItem = (itemData) => api.post('/manager/create_item', itemData);
export const getDroneTechs = (droneTechData) => api.post('/manager/drone_techs', droneTechData);
export const managerGetDrones = (droneData) => api.post('/manager/drones', droneData);
export const managerGetStores = (storeData) => api.post('/manager/stores', storeData);

/* drone tech connections */
export const techGetHistory = async (droneTechData) => api.post('/drone_tech/history', droneTechData);
export const assignDrone = async (droneData) => api.post('/drone_tech/assign', droneData);
export const getOrderDetails = async (orderData) => api.post('/drone_tech/order_details', orderData);
export const getOrderItems = async (orderData) => api.post('/drone_tech/order_items', orderData);
export const techGetDrones = async (droneData) => api.post('/drone_tech/drones', droneData);