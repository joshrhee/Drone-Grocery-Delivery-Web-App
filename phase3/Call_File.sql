use grocery_drone_delivery;
-- 2a
CALL register_customer('testcustomers', 'password42', 'test', 'customer', '420 Austerlitz Rd', 'Nashville', 'TN', '30319', '2254 7887 8863 3800', '863', '2021-04-01');
select * from users;
select * from customer;
-- 2b
CALL register_employee('kszalkowski3', 'password21', 'Kristen', 'Szalkowski', '13 Bobby Dodd Dr', 'Kennesaw', 'GA', '30144');
select * from users;
select Username from employee;

CALL admin_create_grocery_chain('Wegmans');  
select ChainName from chain;

CALL admin_create_new_store('Cumberland','Moss Market','2860 Cumberland Mall SE', 'Atlanta', 'GA', '30338');
select * from store;

CALL admin_create_drone(121, 30363, 10, "hliu88");
select * from drone;

CALL admin_create_item('Dog Shampoo', 'Personal Care', 'No', 'New Jersey');
select * from item;

-- 8a
CALL admin_view_customers('Aiysha', 'Allman');
select * from admin_view_customers_result;

-- 9a
CALL manager_create_chain_item('Moss Market','Navel Orange', '500', '20', '10098', '0.88');
select * from chain_item;

-- 10a
CALL manager_view_drone_technicians('Moss Market','fdavenport49','College Park');
select * from manager_view_drone_technicians_result;

-- 11a
CALL manager_view_drones('cbing101', NULL, NULL);
select * from manager_view_drones_result;

SET GLOBAL sql_mode='STRICT_TRANS_TABLES,STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,TRADITIONAL,NO_ENGINE_SUBSTITUTION';


-- 12a
CALL manager_manage_stores('rgreen97', NULL, 10, 120);
CALL manager_manage_stores('cbing101', NULL, NULL, NULL);
select * from drone_tech where ChainName = 'Publix';
select * from manager_manage_stores_result;

-- 13a
CALL customer_change_credit_card_information('dsmith102','1247 0598 9213 1562', 173, '2021-05-02');

-- 14a
CALL customer_view_order_history('hpeterson55', 10001);
select * from customer_view_order_history_result;

-- 15a
CALL customer_view_store_items('dkim99', 'Moss Market', 'Bobby Dodd', 'ALL');
select * from customer_view_store_items_result;

-- 15b
select * from contains;
select * from orders;
call customer_select_items('dkim99', 'Moss Market', 'Bobby Dodd', 'Fuji Apple', 2);

-- 16a
CALL customer_review_order('dkim99');
select * from customer_review_order_result;

-- 16b 
CALL customer_update_order('dkim99', 'Fuji Apple','1');

-- 17a
CALL drone_technician_view_order_history('jrosario34', '2021-01-01', '2021-12-31');
CALL drone_technician_view_order_history('lchen27', NULL, NULL);
CALL drone_technician_view_order_history('sstrange11', NULL, NULL);
select * from drone_technician_view_order_history_result;

-- 17b
select * from drone;
select * from orders;
CALL dronetech_assign_order('pbuffay56', 112, 'In Transit', '10014');
CALL dronetech_assign_order('pbuffay56', 102, 'In Transit', '10014');

-- 18a
CALL dronetech_order_details('akarev16', '10002');
select * from dronetech_order_details_result;

CALL dronetech_order_items('akarev16', '10002');

-- 19a
CALL dronetech_assigned_drones('dmcstuffins7', '104', 'All');
select * from dronetech_assigned_drones_result;
