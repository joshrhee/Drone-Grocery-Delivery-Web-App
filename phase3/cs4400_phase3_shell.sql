/*
CS4400: Introduction to Database Systems
Spring 2021
Phase III Template
Team 85
Bennett Burns (bburns39)
SooHoon Choi (schoi417)
Jared Jackson (jjackson 348)
Sang June Rhee (srhee34)
Directions:
Please follow all instructions from the Phase III assignment PDF.
This file must run without error for credit.
*/

-- ID: 2a
-- Author: asmith457
-- Name: register_customer
DROP PROCEDURE IF EXISTS register_customer;
DELIMITER //
CREATE PROCEDURE register_customer(
	   IN i_username VARCHAR(40),
       IN i_password VARCHAR(40),
	   IN i_fname VARCHAR(40),
       IN i_lname VARCHAR(40),
       IN i_street VARCHAR(40),
       IN i_city VARCHAR(40),
       IN i_state VARCHAR(2),
	   IN i_zipcode CHAR(5),
       IN i_ccnumber VARCHAR(40),
	   IN i_cvv CHAR(3),
       IN i_exp_date DATE
)
BEGIN

-- Type solution below

IF LENGTH(i_zipcode) = 5 THEN
	INSERT INTO USERS VALUE (i_username, MD5(i_password), i_fname, i_lname, i_street, i_city, i_state, i_zipcode);
	INSERT INTO CUSTOMER VALUE (i_username, i_ccnumber, i_cvv, i_exp_date);
END IF;
-- End of solution
END //
DELIMITER ;


-- ID: 2b
-- Author: asmith457
-- Name: register_employee
DROP PROCEDURE IF EXISTS register_employee;
DELIMITER //
CREATE PROCEDURE register_employee(
	   IN i_username VARCHAR(40),
       IN i_password VARCHAR(40),
	   IN i_fname VARCHAR(40),
       IN i_lname VARCHAR(40),
       IN i_street VARCHAR(40),
       IN i_city VARCHAR(40),
       IN i_state VARCHAR(2),
       IN i_zipcode CHAR(5)
)
BEGIN

-- Type solution below

IF LENGTH(i_zipcode) = 5 THEN
	INSERT INTO USERS VALUE (i_username, MD5(i_password), i_fname, i_lname, i_street, i_city, i_state, i_zipcode);
	INSERT INTO EMPLOYEE VALUE (i_username);
END IF;
-- End of solution
END //
DELIMITER ;

-- ID: 4a
-- Author: asmith457
-- Name: admin_create_grocery_chain
DROP PROCEDURE IF EXISTS admin_create_grocery_chain;
DELIMITER //
CREATE PROCEDURE admin_create_grocery_chain(
        IN i_grocery_chain_name VARCHAR(40)
)
BEGIN

-- Type solution below
INSERT INTO chain VALUE (i_grocery_chain_name);
-- End of solution
END //
DELIMITER ;

-- ID: 5a
-- Author: ahatcher8
-- Name: admin_create_new_store
DROP PROCEDURE IF EXISTS admin_create_new_store;
DELIMITER //
CREATE PROCEDURE admin_create_new_store(
    	IN i_store_name VARCHAR(40),
        IN i_chain_name VARCHAR(40),
    	IN i_street VARCHAR(40),
    	IN i_city VARCHAR(40),
    	IN i_state VARCHAR(2),
    	IN i_zipcode CHAR(5)
)
BEGIN
-- Type solution below
IF LENGTH(i_zipcode) = 5 THEN
INSERT INTO STORE VALUES (i_store_name, i_chain_name, i_street, i_city, i_state, i_zipcode);
END IF;
-- End of solution
END //
DELIMITER ;


-- ID: 6a
-- Author: ahatcher8
-- Name: admin_create_drone
DROP PROCEDURE IF EXISTS admin_create_drone;
DELIMITER //
CREATE PROCEDURE admin_create_drone(
	   IN i_drone_id INT,
       IN i_zip CHAR(5),
       IN i_radius INT,
       IN i_drone_tech VARCHAR(40)
)
BEGIN
-- Type solution below
IF i_zip = (select Zipcode from USERS where Username = i_drone_tech) AND LENGTH(i_zip) = 5 THEN
	INSERT INTO drone VALUES (i_drone_id, 'Available', i_zip, i_radius, i_drone_tech);
END IF;
-- End of solution
END //
DELIMITER ;


-- ID: 7a
-- Author: ahatcher8
-- Name: admin_create_item
DROP PROCEDURE IF EXISTS admin_create_item;
DELIMITER //
CREATE PROCEDURE admin_create_item(
        IN i_item_name VARCHAR(40),
        IN i_item_type VARCHAR(40),
        IN i_organic VARCHAR(3),
        IN i_origin VARCHAR(40)
)
BEGIN
-- Type solution below
IF (i_organic = 'Yes' OR i_organic = 'No') THEN
	INSERT INTO item values (i_item_name, i_item_type, i_origin, i_organic);
END IF;
-- End of solution
END //
DELIMITER ;

-- ID: 8a
-- Author: dvaidyanathan6
-- Name: admin_view_customers
DROP PROCEDURE IF EXISTS admin_view_customers;
DELIMITER //
CREATE PROCEDURE admin_view_customers(
	   IN i_first_name VARCHAR(40),
       IN i_last_name VARCHAR(40)
)
BEGIN
-- Type solution below
DROP TABLE IF EXISTS admin_view_customers_result;
CREATE TABLE admin_view_customers_result(
	Username VARCHAR(40),
	FullName VARCHAR(40),
	Address VARCHAR(100));

INSERT INTO admin_view_customers_result
	SELECT CUSTOMER.Username,
		CONCAT(FirstName, ' ', LastName) AS FullName,
		CONCAT(users.Street, ', ',
		users.City,  ', ',
		users.State,  ' ',
		users.Zipcode) AS Address
	FROM USERS join CUSTOMER on USERS.Username = CUSTOMER.Username
	WHERE (i_first_name IS NULL OR FirstName LIKE i_first_name)
	AND (i_last_name IS NULL OR LastName LIKE i_last_name);
-- End of solution
END //
DELIMITER ;

-- ID: 9a
-- Author: dvaidyanathan6
-- Name: manager_create_chain_item
DROP PROCEDURE IF EXISTS manager_create_chain_item;
DELIMITER //
CREATE PROCEDURE manager_create_chain_item(
        IN i_chain_name VARCHAR(40),
    	IN i_item_name VARCHAR(40),
    	IN i_quantity INT, 
    	IN i_order_limit INT,
    	IN i_PLU_number INT,
    	IN i_price DECIMAL(4, 2)
)
BEGIN
-- Type solution below
-- more involved, only if certain conditions, quantity, order_limit
IF i_chain_name in (select ChainName from chain)
	AND i_item_name in (select ItemName from item) 
	AND i_order_limit < i_quantity
    AND i_order_limit > 0
    AND i_price > 0
    AND i_quantity > 0
    AND i_PLU_number not in (select PLUNumber from chain_item where ChainName = i_chain_name) THEN
	INSERT INTO chain_item values (i_item_name, i_chain_name, i_PLU_number, i_order_limit, i_quantity, i_price);
END IF;
-- End of solution
END //
DELIMITER ;

-- ID: 10a
-- Author: dvaidyanathan6
-- Name: manager_view_drone_technicians
DROP PROCEDURE IF EXISTS manager_view_drone_technicians;
DELIMITER //
CREATE PROCEDURE manager_view_drone_technicians(
	   IN i_chain_name VARCHAR(40),
       IN i_drone_tech VARCHAR(40),
       IN i_store_name VARCHAR(40)
)
BEGIN
-- Type solution below
DROP TABLE IF EXISTS manager_view_drone_technicians_result;
CREATE TABLE manager_view_drone_technicians_result(
	Username VARCHAR(40),
	FullName VARCHAR(40),
	Location VARCHAR(40));

INSERT INTO manager_view_drone_technicians_result
	SELECT DRONE_TECH.Username,
		CONCAT(FirstName, ' ', LastName) AS 'Name',
		StoreName AS Location				
	FROM USERS
    JOIN DRONE_TECH
		ON USERS.Username = DRONE_TECH.Username
	WHERE drone_tech.ChainName = i_chain_name
	AND (i_drone_tech IS NULL OR USERS.Username LIKE i_drone_tech)
	AND (i_store_name IS NULL OR StoreName LIKE i_store_name);
-- End of solution
END //
DELIMITER ;

-- ID: 11a
-- Author: vtata6
-- Name: manager_view_drones
DROP PROCEDURE IF EXISTS manager_view_drones;
DELIMITER //
CREATE PROCEDURE manager_view_drones(
	   IN i_mgr_username varchar(40), 
	   IN i_drone_id int,
       IN drone_radius int
)
BEGIN
-- Type solution below
DROP TABLE IF EXISTS manager_view_drones_result;
CREATE TABLE manager_view_drones_result(
	DroneID VARCHAR(40),
	Operator VARCHAR(40),
	Radius VARCHAR(40),
	ZipCode VARCHAR(40),
	Status VARCHAR(40));

INSERT INTO manager_view_drones_result
	SELECT
		ID as 'DroneID',
		DroneTech AS 'Operator',
		Radius,
		Zip,
		DroneStatus	AS 'Status'		
	FROM DRONE_TECH
    JOIN DRONE
		ON DRONE_TECH.Username = DRONE.DroneTech
	WHERE drone_tech.ChainName IN ( -- MANAGER?
		SELECT ChainName
        FROM manager
        WHERE i_mgr_username LIKE Username)
	AND ((i_drone_id IS NULL) OR (i_drone_id IS NOT NULL AND ID = i_drone_id))
    AND ((drone_radius IS NULL) OR (drone_radius IS NOT NULL AND drone.Radius >= drone_radius));
-- End of solution
END //
DELIMITER ;


-- ID: 12a
-- Author: vtata6
-- Name: manager_manage_stores
DROP PROCEDURE IF EXISTS manager_manage_stores;
DELIMITER //
CREATE PROCEDURE manager_manage_stores(
	   IN i_mgr_username varchar(50), 
	   IN i_storeName varchar(50), 
	   IN i_minTotal int, 
	   IN i_maxTotal int
)
BEGIN
-- Type solution below
DROP TABLE IF EXISTS manager_manage_stores_result;
CREATE TABLE manager_manage_stores_result(
	StoreName VARCHAR(40),
	Address VARCHAR(40),
	Orders VARCHAR(40),
	Employees VARCHAR(40),
	Total VARCHAR(40));

INSERT INTO manager_manage_stores_result
	select
		store.StoreName,
		CONCAT(store.Street, ' ',
				store.City,  ', ',
				store.State,  ' ',
				store.Zipcode) AS Address,
		count(distinct OrderID) as Orders,
		count(distinct drone_tech.Username) + count(distinct manager.Username) as Employees,
		sum(Price * contains.Quantity) as Total
	from
		manager 
			JOIN store on store.ChainName = manager.ChainName
			LEFT OUTER JOIN drone_tech on store.StoreName = drone_tech.StoreName
			LEFT OUTER JOIN drone on drone_tech.Username = drone.DroneTech
            LEFT OUTER JOIN orders on drone.ID = DroneID 
            LEFT OUTER JOIN contains on orders.ID = contains.OrderID
			LEFT OUTER JOIN chain_item on contains.ItemName = ChainItemName and
				contains.ChainName = chain_item.ChainName and
				contains.PLUNumber = chain_item.PLUNumber
	where 
		manager.Username = i_mgr_username and -- OF MANAGER
		(i_storeName is NULL or (i_storeName is not null and store.StoreName = i_storeName)) and
        (i_storeName is NULL or (i_storeName is not null and i_storeName = drone_tech.StoreName))
	group by store.StoreName
	having 
		IFNULL(sum(Price * contains.Quantity), 0) >= IFNULL(i_minTotal, 0) and
		IFNULL(sum(Price * contains.Quantity), ~0) <= IFNULL(i_maxTotal, ~0);   
-- End of solution
END //
DELIMITER ;

-- ID: 13a
-- Author: vtata6
-- Name: customer_change_credit_card_information
DROP PROCEDURE IF EXISTS customer_change_credit_card_information;
DELIMITER //
CREATE PROCEDURE customer_change_credit_card_information(
	   IN i_custUsername varchar(40), 
	   IN i_new_cc_number varchar(19), 
	   IN i_new_CVV int, 
	   IN i_new_exp_date date
)
BEGIN
-- Type solution below
update CUSTOMER set CcNumber = i_new_cc_number, CVV = i_new_CVV, EXP_DATE = i_new_exp_date
where Username = i_custUsername;
-- End of solution
END //
DELIMITER ;

-- ID: 14a
-- Author: ftsang3
-- Name: customer_view_order_history
DROP PROCEDURE IF EXISTS customer_view_order_history;
DELIMITER //
CREATE PROCEDURE customer_view_order_history(
	   IN i_username VARCHAR(40),
       IN i_orderid INT
)
BEGIN
-- Type solution below
DROP TABLE IF EXISTS customer_view_order_history_result;
CREATE TABLE customer_view_order_history_result (
    total_amount VARCHAR(40),
    total_items VARCHAR(40),
    orderdate VARCHAR(40),
    droneID VARCHAR(40),
    dronetech VARCHAR(40),
    orderstatus VARCHAR(40)
);
INSERT INTO customer_view_order_history_result

select 
	sum(Price * contains.Quantity) as total_amount,
    sum(contains.Quantity) as total_items,
    OrderDate as orderdate,
    DroneID as droneID,
    DroneTech as dronetech,
    OrderStatus as orderstatus
from orders
	join contains on contains.OrderID = orders.ID
    left outer join drone on orders.DroneID = drone.ID
    join chain_item on contains.ItemName = ChainItemName and
		contains.ChainName = chain_item.ChainName and
		contains.PLUNumber = chain_item.PLUNumber
where orders.ID = i_orderid and CustomerUsername = i_username
group by contains.orderID;
-- End of solution
END //
DELIMITER ;

-- ID: 15a
-- Author: ftsang3
-- Name: customer_view_store_items
DROP PROCEDURE IF EXISTS customer_view_store_items;
DELIMITER //
CREATE PROCEDURE customer_view_store_items(
	   IN i_username VARCHAR(40),
       IN i_chain_name VARCHAR(40),
       IN i_store_name VARCHAR(40),
       IN i_item_type VARCHAR(40)
)
BEGIN
-- Type solution below
DROP TABLE IF EXISTS customer_view_store_items_result;
CREATE TABLE customer_view_store_items_result (
	chainitemname VARCHAR(40),
	orderlimit VARCHAR(40)
);

INSERT INTO customer_view_store_items_result
	select ChainItemName as chainitemname, Orderlimit as orderlimit
	from chain_item
		join item on item.ItemName = chain_item.ChainItemName
	where chain_item.ChainName in (
		select ChainName
		from store
		where ChainName = i_chain_name and StoreName = i_store_name
        and Zipcode in (
        select Zipcode
        from users
        where Username = i_username))
	AND ((upper(i_item_type) = 'ALL')
		OR ((NOT upper(i_item_type) = 'ALL') AND (i_item_type = item.ItemType)));
-- End of solution
END //
DELIMITER ;

-- ID: 15b
-- Author: ftsang3
-- Name: customer_select_items
DROP PROCEDURE IF EXISTS customer_select_items;
DELIMITER //
CREATE PROCEDURE customer_select_items(
	    IN i_username VARCHAR(40),
    	IN i_chain_name VARCHAR(40),
    	IN i_store_name VARCHAR(40),
    	IN i_item_name VARCHAR(40),
    	IN i_quantity INT
)
BEGIN
-- Type solution below
   -- see if contains exists for current user
IF i_quantity > 0 AND
	(select Zipcode from users where i_username = Username) = (select Zipcode from store where StoreName = i_store_name) and
    i_item_name in (select ChainItemName from chain_item where i_chain_name = ChainName) then -- CHECK IF QUANTITY VALID OCMPARE CUSTOMER ZIP WITH STORE ZIP CHAIN ITEM IN STORE CHAIN
    SET @PLUNumber = (select PLUNumber from chain_item where ChainName = i_chain_name and ChainItemName = i_item_name); -- FIND PLU
	if (select count(*) from orders	where OrderStatus = 'Creating' and CustomerUsername = i_username) > 0 then -- SEE IF ORDER EXISTS
		SET @order_id = (select ID from orders where OrderStatus = 'Creating' and CustomerUsername = i_username); -- GET ORDER ID subtract quantity from store items?
	else
		set @order_id = (select max(ID) + 1 from orders); -- GET NEW ORDER ID
		INSERT INTO orders VALUES (@order_id, 'Creating', CURDATE(), i_username, null); -- CREATE NEW ORDER  auto increment?
	end if;
	INSERT INTO contains values (@order_id, i_item_name, i_chain_name, @PLUNumber, i_quantity); -- INSERT NEW CONTAINS ITEM WITH ORDER ID AND PLU
END IF;
-- End of solution
END //
DELIMITER ;
         
-- ID: 16a
-- Author: jkomskis3
-- Name: customer_review_order
DROP PROCEDURE IF EXISTS customer_review_order;
DELIMITER //
CREATE PROCEDURE customer_review_order(
	   IN i_username VARCHAR(40)
)
BEGIN
-- Type solution below
DROP TABLE IF EXISTS customer_review_order_result;
CREATE TABLE customer_review_order_result(
	ItemName VARCHAR(40),
    Quantity VARCHAR(40),
    Orderlimit int,
	Price VARCHAR(40));

INSERT INTO customer_review_order_result
	select
		ItemName,
        contains.Quantity as Quantity,
        Orderlimit,
        Price
    from contains 
    join orders on contains.OrderID = orders.ID
    join chain_item on ItemName = ChainItemName 
		and chain_item.ChainName = contains.ChainName
		and chain_item.PLUNumber = contains.PLUNumber
    where CustomerUsername like i_username and OrderStatus like 'Creating'
    GROUP BY ItemName;
-- End of solution
END //
DELIMITER ;


-- ID: 16b
-- Author: jkomskis3
-- Name: customer_update_order
DROP PROCEDURE IF EXISTS customer_update_order;
DELIMITER //
CREATE PROCEDURE customer_update_order(
	   IN i_username VARCHAR(40),
       IN i_item_name VARCHAR(40),
       IN i_quantity INT
)
BEGIN
-- Type solution below
	-- update item name quantity in order of user, find null and input hter
    -- if quantity is zero then delete the entry
    if i_quantity = 0 then 
		delete from contains where ItemName = i_item_name and OrderID in (
        select ID
        from orders
        where CustomerUsername = i_username and OrderStatus = 'Creating');
    else
		update contains
		set Quantity = i_quantity
		where ItemName = i_item_name and OrderID in (
        select ID
        from orders
        where CustomerUsername =  i_username and OrderStatus = 'Creating');
    end if;
-- End of solution
END //
DELIMITER ;


-- ID: 17a
-- Author: jkomskis3
-- Name: drone_technician_view_order_history
DROP PROCEDURE IF EXISTS drone_technician_view_order_history;
DELIMITER //
CREATE PROCEDURE drone_technician_view_order_history(
        IN i_username VARCHAR(40),
    	IN i_start_date DATE,
    	IN i_end_date DATE
)
BEGIN
-- Type solution below
DROP TABLE IF EXISTS drone_technician_view_order_history_result;
CREATE TABLE drone_technician_view_order_history_result(
	ID VARCHAR(40),
    Operator VARCHAR(40),
	OrderDate VARCHAR(40),
    DroneID VARCHAR(40),
    Status VARCHAR(40),
	Total VARCHAR(40));

INSERT INTO drone_technician_view_order_history_result
	SELECT
		orders.ID,
		CONCAT(FirstName, ' ', LastName) AS Operator,
		OrderDate AS 'Date',
		drone.ID AS 'Drone ID',
		OrderStatus AS 'Status',
		SUM(contains.Quantity * chain_item.Price) AS Total
	FROM orders
        JOIN contains ON contains.OrderID = orders.ID
        JOIN chain_item ON contains.ItemName = ChainItemName AND
			contains.ChainName = chain_item.ChainName AND
			contains.PLUNumber = chain_item.PLUNumber
        LEFT OUTER JOIN drone on orders.DroneID = drone.ID
        JOIN store ON store.ChainName = contains.ChainName and store.Zipcode = (select Zipcode from users where users.Username = orders.CustomerUsername)
        LEFT OUTER JOIN drone_tech ON drone.DroneTech = drone_tech.Username
		LEFT OUTER JOIN users ON drone_tech.Username = users.Username

	WHERE 
		OrderDate >= IFNULL(i_start_date, '0000-00-00')
		AND OrderDate <= IFNULL(i_end_date, CURDATE())
        AND store.StoreName IN (
			SELECT StoreName
			FROM drone_tech
			WHERE drone_tech.Username = i_username) -- Store ZIP?
	GROUP BY orders.ID;
-- End of solution
END //
DELIMITER ;

-- ID: 17b
-- Author: agoyal89
-- Name: dronetech_assign_order
DROP PROCEDURE IF EXISTS dronetech_assign_order;
DELIMITER //
CREATE PROCEDURE dronetech_assign_order(
	   IN i_username VARCHAR(40),
       IN i_droneid INT,
       IN i_status VARCHAR(20),
       IN i_orderid INT
)
BEGIN
-- Type solution below
IF (select Zip from drone where i_droneid = ID) = 
	(select Zipcode from users where Username = (select CustomerUsername from orders where ID = i_orderid)) then -- VALID ZIP
SET @droneid = IFNULL((select DroneID from orders where ID = i_orderid), i_droneid);	-- SELECT CURRENT ID

IF i_status = 'Drone Assigned' or i_status = 'In Transit' then
	SET @dronestatus = 'Busy'; -- SET TO AVAILABLE OR BUSY BASED ON STATUS OF ORDER
ELSE
	SET @dronestatus = 'Available';
END IF;

IF (select OrderStatus from orders where i_orderid = ID) = 'Pending' then
UPDATE drone -- UPDATE DRONE STATUS
SET DroneStatus = @dronestatus
WHERE ID = @droneid
	AND DroneTech IN (
		SELECT Username
		FROM drone_tech
		WHERE Username = i_username);	
END IF;

UPDATE orders
SET DroneID = @droneid, -- UPDATE VALUES IN ORDERS
	OrderStatus = i_status
WHERE ID = i_orderid;
-- End of solution
END IF;
END //
DELIMITER ;

-- ID: 18a
-- Author: agoyal89
-- Name: dronetech_order_details
DROP PROCEDURE IF EXISTS dronetech_order_details;
DELIMITER //
CREATE PROCEDURE dronetech_order_details(
	   IN i_username VARCHAR(40),
       IN i_orderid VARCHAR(40)
)
BEGIN
-- Type solution below
DROP TABLE IF EXISTS dronetech_order_details_result;
CREATE TABLE dronetech_order_details_result(
	Customer_Name VARCHAR(40),
    Order_ID VARCHAR(40),
	Total_Amount VARCHAR(40),
    Total_Items VARCHAR(40),
    Date_of_Purchase VARCHAR(40),
	Drone_ID VARCHAR(40),
    Store_Associate VARCHAR(40),
    Order_Status VARCHAR(40),
    Address VARCHAR(80));

INSERT INTO dronetech_order_details_result
	SELECT 
		CONCAT(customer.FirstName, ' ', customer.LastName) AS Customer_Name,
		orders.ID AS Order_ID,
		SUM(Price * contains.Quantity) AS Total_Amount,
		SUM(contains.Quantity) AS Total_Items,
		OrderDate AS Date_of_Purchase,
		DroneID AS Drone_ID,
		CASE
		WHEN DroneID IS NULL THEN NULL
		WHEN DroneID IS NOT NULL THEN CONCAT(technician.FirstName, ' ', technician.LastName)
		END AS Store_Associate, -- set null if pending
		OrderStatus AS Order_Status,
		CONCAT(customer.Street, ', ',
				customer.City,  ', ',
				customer.State,  ' ',
				customer.Zipcode) AS Address
	FROM chain_item, orders
		JOIN users AS customer ON CustomerUsername = customer.Username
		JOIN contains ON orders.ID = OrderID
		JOIN users AS technician ON i_username = technician.Username
		LEFT OUTER JOIN drone ON drone.ID = DroneID -- for when pending no drone assigned
	WHERE orders.ID = i_orderid
		AND chain_item.Price IN (
			SELECT Price
			FROM chain_item
			WHERE ChainItemName = ItemName
				AND chain_item.ChainName = contains.ChainName
				AND chain_item.PLUNumber = contains.PLUNumber);
-- End of solution
END //
DELIMITER ;


-- ID: 18b
-- Author: agoyal89
-- Name: dronetech_order_items
DROP PROCEDURE IF EXISTS dronetech_order_items;
DELIMITER //
CREATE PROCEDURE dronetech_order_items(
        IN i_username VARCHAR(40),
    	IN i_orderid INT
)
BEGIN
-- Type solution below
DROP TABLE IF EXISTS dronetech_order_items_result;
CREATE TABLE dronetech_order_items_result(
	Item VARCHAR(40),
    Count VARCHAR(40));
    
INSERT INTO dronetech_order_items_result
	select ItemName as Item, Quantity as Count 
    from contains
    where OrderID = i_orderid; -- what is the point of i_username? 
-- End of solution
END //
DELIMITER ;

-- ID: 19a
-- Author: agoyal89
-- Name: dronetech_assigned_drones
DROP PROCEDURE IF EXISTS dronetech_assigned_drones;
DELIMITER //
CREATE PROCEDURE dronetech_assigned_drones(
        IN i_username VARCHAR(40),
    	IN i_droneid INT,
    	IN i_status VARCHAR(20)
)
BEGIN
-- Type solution below
DROP TABLE IF EXISTS dronetech_assigned_drones_result;
CREATE TABLE dronetech_assigned_drones_result(
	Drone_ID VARCHAR(40),
    DroneStatus VARCHAR(40),
    Radius VARCHAR(40));

INSERT INTO dronetech_assigned_drones_result
	SELECT ID AS Drone_ID, DroneStatus AS Drone_Status, Radius
	FROM drone
	WHERE DroneTech = i_username
        AND ((upper(i_status) = 'ALL')
			OR ((NOT upper(i_status) = 'ALL') AND (DroneStatus = i_status)))
        AND ((i_droneid is NULL)
			OR ((i_droneid is not null) AND (ID = i_droneid)));
-- End of solution
END //
DELIMITER ;