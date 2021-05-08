-- CS4400: Introduction to Database Systems
-- Spring 3021
-- Phase II Create Table and Insert Statements Template

-- Team 85
-- Bennett Burns 	(bburns39)
-- SooHoon Choi		(schoi417)
-- Jared Jackson	(jjackson 348)
-- Sang June Rhee	(srhee34)

-- Directions:
-- Please follow all instructions from the Phase II assignment PDF.
-- This file must run without error for credit.
-- Create Table statements should be manually written, not taken from an SQL Dump.
-- Rename file to cs4400_phase2_teamX.sql before submission

-- CREATE TABLE STATEMENTS BELOW

-- [1] Creating our database named drone_delivery
drop database if exists drone_delivery;
create database if not exists drone_delivery;
use drone_delivery;

-- [2] Creating necessary tables
drop table if exists users;
CREATE TABLE users (
    username VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    street VARCHAR(40) NOT NULL,
    city VARCHAR(30) NOT NULL,
    state CHAR(2) NOT NULL,
    zip INTEGER NOT NULL,
    PRIMARY KEY (username)
)  ENGINE=INNODB;

drop table if exists administrator;
CREATE TABLE administrator (
    username VARCHAR(30) NOT NULL,
    FOREIGN KEY (username)
        REFERENCES users (username),
    PRIMARY KEY (username)
)  ENGINE=INNODB;

drop table if exists customer;
CREATE TABLE customer (
    username VARCHAR(30) NOT NULL,
    cc_number BIGINT NOT NULL,
    cvv INTEGER NOT NULL,
    exp_date DATE NOT NULL,
    FOREIGN KEY (username)
        REFERENCES users (username),
    PRIMARY KEY (username)
)  ENGINE=INNODB;

drop table if exists employee;
CREATE TABLE employee (
    username VARCHAR(30) NOT NULL,
    FOREIGN KEY (username)
        REFERENCES users (username),
    PRIMARY KEY (username)
)  ENGINE=INNODB;


drop table if exists grocery_chain;
CREATE TABLE grocery_chain (
    chain_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (chain_name)
)  ENGINE=INNODB;


drop table if exists store;
CREATE TABLE store (
    store_name VARCHAR(30) NOT NULL,
    chain_name VARCHAR(30) NOT NULL,
    street VARCHAR(30) NOT NULL,
    city VARCHAR(30) NOT NULL,
    state CHAR(2) NOT NULL,
    zip INTEGER,
    FOREIGN KEY (chain_name)
        REFERENCES grocery_chain (chain_name),
    PRIMARY KEY (store_name , chain_name)
)  ENGINE=INNODB;


drop table if exists drone_technician;
CREATE TABLE drone_technician (
    username VARCHAR(30) NOT NULL,
    store_name VARCHAR(30) NOT NULL,
    FOREIGN KEY (username)
        REFERENCES users (username),
    FOREIGN KEY (store_name)
        REFERENCES store (store_name),
    PRIMARY KEY (username)
)  ENGINE=INNODB;


drop table if exists manager;
CREATE TABLE manager (
    username VARCHAR(30) NOT NULL,
    chain_name VARCHAR(30) NOT NULL,
    FOREIGN KEY (username)
        REFERENCES users (username),
    FOREIGN KEY (chain_name)
        REFERENCES grocery_chain (chain_name),
    PRIMARY KEY (username)
)  ENGINE=INNODB;


drop table if exists item;
CREATE TABLE item (
    item_name VARCHAR(30) NOT NULL,
    item_type VARCHAR(30) NOT NULL,
    origin VARCHAR(30) NOT NULL,
    organic BOOLEAN,
    PRIMARY KEY (item_name)
)  ENGINE=INNODB;


drop table if exists chain_item;
CREATE TABLE chain_item (
    item_name VARCHAR(30) NOT NULL,
    chain_name VARCHAR(30) NOT NULL,
    plu_number INTEGER,
    orderLimit INTEGER,
    quantity INTEGER,
    price FLOAT(4, 2),
    FOREIGN KEY (item_name)
        REFERENCES item (item_name),
    FOREIGN KEY (chain_name)
        REFERENCES grocery_chain (chain_name),
    PRIMARY KEY (item_name , chain_name , plu_number)
)  ENGINE=INNODB;


drop table if exists drone;
CREATE TABLE drone (
    id INTEGER AUTO_INCREMENT,
    technician VARCHAR(30) NOT NULL,
    droneStatus VARCHAR(30) NOT NULL,
    zip INTEGER,
    radius INTEGER,
    FOREIGN KEY (technician)
        REFERENCES drone_technician (username),
    PRIMARY KEY (id)
)  ENGINE=INNODB;


drop table if exists orders;
CREATE TABLE orders (
    id INTEGER AUTO_INCREMENT,
    status VARCHAR(30) NOT NULL,
    order_date DATE,
    made_by VARCHAR(30) NOT NULL, 
    delivered_by INTEGER,
    chain_name VARCHAR(30) NOT NULL,
    FOREIGN KEY (made_by)
        REFERENCES customer (username),
    FOREIGN KEY (delivered_by)
        REFERENCES drone (id),
    FOREIGN KEY (chain_name)
        REFERENCES grocery_chain (chain_name),
    PRIMARY KEY (id)
)  ENGINE=INNODB;


drop table if exists contain;-- contains is a keyword
CREATE TABLE contain (
    order_id INTEGER,
    item_name VARCHAR(30) NOT NULL,
    chain_name VARCHAR(30) NOT NULL,
    plu_number INTEGER,
    item_quantity INTEGER, 
    FOREIGN KEY (order_id)
        REFERENCES orders (id),
    FOREIGN KEY (item_name , chain_name , plu_number)
        REFERENCES chain_item (item_name , chain_name , plu_number),
    PRIMARY KEY (order_id , item_name , chain_name , plu_number)
)  ENGINE=INNODB;

-- [3] INSERT STATEMENTS

INSERT INTO users VALUES ("mmoss7", "password2", "Mark", "Moss", "15 Tech Lane", "Duluth", "GA", 30047);
INSERT INTO users VALUES ("lchen27", "password3", "Liang", "Chen", "40 Walker Rd ", "Kennesaw", "GA", 30144);
INSERT INTO users VALUES ("jhilborn97", "password4", "Jack", "Hilborn", "177 W Beaverdam Rd", "Atlanta", "GA", 30303);
INSERT INTO users VALUES ("jhilborn98", "password5", "Jake", "Hilborn", "4605 Nasa Pkwy", "Atlanta", "GA", 30309);
INSERT INTO users VALUES ("ygao10", "password6", "Yuan", "Gao", "27 Paisley Dr SW", "Atlanta", "GA", 30313);
INSERT INTO users VALUES ("kfrog03", "password7", "Kermit", "Frog", "707 E Norfolk Ave", "Atlanta", "GA", 30318);
INSERT INTO users VALUES ("cforte58", "password8", "Connor", "Forte", "13817 Shirley Ct NE", "Atlanta", "GA", 30332);
INSERT INTO users VALUES ("fdavenport49", "password9", "Felicia", "Devenport", "6150 Old Millersport Rd NE", "College Park", "GA", 30339);
INSERT INTO users VALUES ("hliu88", "password10", "Hang", "Liu", "1855 Fruit St", "Atlanta", "GA", 30363);
INSERT INTO users VALUES ("akarev16", "password11", "Alex", "Karev", "100 NW 73rd Pl ", "Johns Creek", "GA", 30022);
INSERT INTO users VALUES ("jdoe381", "password12", "Jane ", "Doe", "12602 Gradwell St", "Duluth", "GA", 30047);
INSERT INTO users VALUES ("sstrange11", "password13", "Stephen", "Strange", "112 Huron Dr", "Kennesaw", "GA", 30144);
INSERT INTO users VALUES ("dmcstuffins7", "password14", "Doc", "Mcstuffins", "27 Elio Cir", "Atlanta", "GA", 30303);
INSERT INTO users VALUES ("mgrey91", "password15", "Meredith", "Grey", "500 N Stanwick Rd", "Atlanta", "GA", 30309);
INSERT INTO users VALUES ("pwallace51", "password16", "Penny", "Wallace", "3127 Westwood Dr NW", "Atlanta", "GA", 30313);
INSERT INTO users VALUES ("jrosario34", "password17", "Jon", "Rosario", "1111 Catherine St", "Atlanta", "GA", 30318);
INSERT INTO users VALUES ("nshea230", "password18", "Nicholas", "Shea", "299 Shady Ln", "Atlanta", "GA", 30332);
INSERT INTO users VALUES ("mgeller3", "password19", "Monica ", "Geller", "120 Stanley St", "College Park", "GA", 30339);
INSERT INTO users VALUES ("rgeller9", "password20", "Ross", "Geller ", "4206 106th Pl NE", "Atlanta", "GA", 30363);
INSERT INTO users VALUES ("jtribbiani27", "password21", "Joey ", "Tribbiani", "143 Pebble Ln", "Johns Creek", "GA", 30022);
INSERT INTO users VALUES ("pbuffay56", "password22", "Phoebe ", "Buffay", "230 County Rd", "Duluth", "GA", 30047);
INSERT INTO users VALUES ("rgreen97", "password23", "Rachel", "Green", "40 Frenchburg Ct", "Kennesaw", "GA", 30144);
INSERT INTO users VALUES ("cbing101", "password24", "Chandler ", "Bing", "204 S Mapletree Ln", "Atlanta", "GA", 30303);
INSERT INTO users VALUES ("pbeesly61", "password25", "Pamela", "Beesly", "932 Outlaw Bridge Rd", "Atlanta", "GA", 30309);
INSERT INTO users VALUES ("jhalpert75", "password26", "Jim ", "Halpert", "185 Dry Creek Rd", "Atlanta", "GA", 30313);
INSERT INTO users VALUES ("dschrute18", "password27", "Dwight ", "Schrute", "3009 Miller Ridge Ln", "Atlanta", "GA", 30318);
INSERT INTO users VALUES ("amartin365", "password28", "Angela ", "Martin", "905 E Pinecrest Cir", "Atlanta", "GA", 30332);
INSERT INTO users VALUES ("omartinez13", "password29", "Oscar", "Martinez", "26958 Springcreek Rd", "College Park", "GA", 30339);
INSERT INTO users VALUES ("mscott845", "password30", "Michael ", "Scott", "105 Calusa Lake Dr", "Denver", "CO", 80014);
INSERT INTO users VALUES ("abernard224", "password31", "Andy ", "Bernard", "21788 Monroe Rd #284", "Johns Creek", "GA", 30022);
INSERT INTO users VALUES ("kkapoor155", "password32", "Kelly ", "Kapoor", "100 Forest Point Dr", "Duluth", "GA", 30047);
INSERT INTO users VALUES ("dphilbin81", "password33", "Darryl ", "Philbin", "800 Washington St", "Kennesaw", "GA", 30144);
INSERT INTO users VALUES ("sthefirst1", "password34", "Sofia", "Thefirst", "4337 Village Creek Dr", "Atlanta", "GA", 30303);
INSERT INTO users VALUES ("gburdell1", "password35", "George", "Burdell", "201 N Blossom St", "Atlanta", "GA", 30309);
INSERT INTO users VALUES ("dsmith102", "password36", "Dani", "Smith", "1648 Polk Rd", "Atlanta", "GA", 30313);
INSERT INTO users VALUES ("dbrown85", "password37", "David", "Brown", "12831 Yorba Ave", "Atlanta", "GA", 30318);
INSERT INTO users VALUES ("dkim99", "password38", "Dave", "Kim", "1710 Buckner Rd", "Atlanta", "GA", 30332);
INSERT INTO users VALUES ("tlee984", "password39", "Tom", "Lee", "205 Mountain Ave", "College Park", "GA", 30339);
INSERT INTO users VALUES ("jpark29", "password40", "Jerry", "Park", "520 Burberry Way", "Atlanta", "GA", 30363);
INSERT INTO users VALUES ("vneal101", "password41", "Vinay", "Neal", "190 Drumar Ct", "Johns Creek", "GA", 30022);
INSERT INTO users VALUES ("hpeterson55", "password42", "Haydn", "Peterson", "878 Grand Ivey Pl", "Duluth", "GA", 30047);
INSERT INTO users VALUES ("lpiper20", "password43", "Leroy", "Piper", "262 Stonecliffe Aisle", "Kennesaw", "GA", 30144);
INSERT INTO users VALUES ("mbob2", "password44", "Chuck", "Bass", "505 Bridge St", "New York", "NY", 10033);
INSERT INTO users VALUES ("mrees785", "password45", "Marie", "Rees", "1081 Florida Ln", "Atlanta", "GA", 30309);
INSERT INTO users VALUES ("wbryant23", "password46", "William", "Bryant", "109 Maple St", "Atlanta", "GA", 30313);
INSERT INTO users VALUES ("aallman302", "password47", "Aiysha", "Allman", "420 Austerlitz Rd", "Atlanta", "GA", 30318);
INSERT INTO users VALUES ("kweston85", "password48", "Kyle", "Weston", "100 Palace Dr", "Birmingham", "AL", 35011);
INSERT INTO users VALUES ("lknope98", "password49", "Leslie ", "Knope", "10 Dogwood Ln", "College Park", "GA", 30339);
INSERT INTO users VALUES ("bwaldorf18", "password50", "Blair ", "Waldorf", "1110 Greenway Dr", "Atlanta", "GA", 30363);
INSERT INTO administrator VALUES ("mmoss7");
INSERT INTO customer VALUES ("mscott845", 6518555974461663, 551, '2024-02-01');
INSERT INTO customer VALUES ("abernard224", 2328567043101965, 644, '2024-05-01');
INSERT INTO customer VALUES ("kkapoor155", 8387952398279291, 201, '2031-02-01');
INSERT INTO customer VALUES ("dphilbin81", 6558859698525299, 102, '2031-12-01');
INSERT INTO customer VALUES ("sthefirst1", 3414755937212479, 489, '2021-11-01');
INSERT INTO customer VALUES ("gburdell1", 5317121090872666, 852, '2022-01-01');
INSERT INTO customer VALUES ("dsmith102", 9383321241981836, 455, '2029-08-01');
INSERT INTO customer VALUES ("dbrown85", 3110266979495605, 744, '2022-10-01');
INSERT INTO customer VALUES ("dkim99", 2272355540784744, 606, '2029-08-01');
INSERT INTO customer VALUES ("tlee984", 9276763978834273, 862, '2031-08-01');
INSERT INTO customer VALUES ("jpark29", 4652372688643798, 258, '2030-12-01');
INSERT INTO customer VALUES ("vneal101", 5478842044367471, 857, '2029-09-01');
INSERT INTO customer VALUES ("hpeterson55", 3616897712963372, 295, '2023-04-01');
INSERT INTO customer VALUES ("lpiper20", 9954569863556952, 794, '2022-04-01');
INSERT INTO customer VALUES ("mbob2", 7580327437245356, 269, '2027-05-01');
INSERT INTO customer VALUES ("mrees785", 7907351371614248, 858, '2027-08-01');
INSERT INTO customer VALUES ("wbryant23", 1804206278259689, 434, '2030-04-01');
INSERT INTO customer VALUES ("aallman302", 2254788788633807, 862, '2021-04-01');
INSERT INTO customer VALUES ("kweston85", 8445858521381374, 632, '2030-11-01');
INSERT INTO customer VALUES ("lknope98", 1440229259624450, 140, '2031-04-01');
INSERT INTO customer VALUES ("bwaldorf18", 5839267386001880, 108, '2029-12-01');
INSERT INTO employee VALUES ("lchen27");
INSERT INTO employee VALUES ("jhilborn97");
INSERT INTO employee VALUES ("jhilborn98");
INSERT INTO employee VALUES ("ygao10");
INSERT INTO employee VALUES ("kfrog03");
INSERT INTO employee VALUES ("cforte58");
INSERT INTO employee VALUES ("fdavenport49");
INSERT INTO employee VALUES ("hliu88");
INSERT INTO employee VALUES ("akarev16");
INSERT INTO employee VALUES ("jdoe381");
INSERT INTO employee VALUES ("sstrange11");
INSERT INTO employee VALUES ("dmcstuffins7");
INSERT INTO employee VALUES ("mgrey91");
INSERT INTO employee VALUES ("pwallace51");
INSERT INTO employee VALUES ("jrosario34");
INSERT INTO employee VALUES ("nshea230");
INSERT INTO employee VALUES ("mgeller3");
INSERT INTO employee VALUES ("rgeller9");
INSERT INTO employee VALUES ("jtribbiani27");
INSERT INTO employee VALUES ("pbuffay56");
INSERT INTO employee VALUES ("rgreen97");
INSERT INTO employee VALUES ("cbing101");
INSERT INTO employee VALUES ("pbeesly61");
INSERT INTO employee VALUES ("jhalpert75");
INSERT INTO employee VALUES ("dschrute18");
INSERT INTO employee VALUES ("amartin365");
INSERT INTO employee VALUES ("omartinez13");
INSERT INTO grocery_chain VALUES("Wal Mart");
INSERT INTO grocery_chain VALUES("Query Mart");
INSERT INTO grocery_chain VALUES("Trader Joe's");
INSERT INTO grocery_chain VALUES("Kroger");
INSERT INTO grocery_chain VALUES("Publix");
INSERT INTO grocery_chain VALUES("Whole Foods");
INSERT INTO grocery_chain VALUES("Sprouts");
INSERT INTO grocery_chain VALUES("Moss Market");
INSERT INTO store VALUES ("Abbots Bridge", "Sprouts", "116 Bell Rd", "Johns Creek", "GA", 30022);
INSERT INTO store VALUES ("North Point", "Whole Foods", "532 8th St NW", "Johns Creek", "GA", 30022);
INSERT INTO store VALUES ("Norcross", "Kroger", "650 Singleton Road", "Duluth", "GA", 30047);
INSERT INTO store VALUES ("Pleasant Hill", "Wal Mart", "2365 Pleasant Hill Rd", "Duluth", "GA", 30047);
INSERT INTO store VALUES ("KSU Center", "Moss Market", "3305 Busbee Drive NW", "Kennesaw", "GA", 30144);
INSERT INTO store VALUES ("Owl Circle", "Trader Joe's", "48 Owl Circle SW", "Kennesaw", "GA", 30144);
INSERT INTO store VALUES ("Park Place", "Publix", "10 Park Place South SE", "Atlanta", "GA", 30303);
INSERT INTO store VALUES ("The Plaza Midtown", "Publix", "950 W Peachtree St NW", "Atlanta", "GA", 30309);
INSERT INTO store VALUES ("GT Center", "Query Mart", "172 6th St NW", "Atlanta", "GA", 30313);
INSERT INTO store VALUES ("North Avenue", "Whole Foods", "120 North Avenue NW", "Atlanta", "GA", 30313);
INSERT INTO store VALUES ("Piedmont", "Sprouts", "564 Piedmont ave NW", "Atlanta", "GA", 30318);
INSERT INTO store VALUES ("Midtown", "Kroger", "725 Ponce De Leon Ave", "Atlanta", "GA", 30332);
INSERT INTO store VALUES ("Tech Square", "Moss Market", "740 Ferst Drive ", "Atlanta", "GA", 30332);
INSERT INTO store VALUES ("Bobby Dodd", "Moss Market", "150 Bobby Dodd Way NW", "Atlanta", "GA", 30332);
INSERT INTO store VALUES ("Tech Square", "Query Mart", "280 Ferst Drive NW", "Atlanta", "GA", 30332);
INSERT INTO store VALUES ("College Park", "Moss Market", "1895 Phoenix Blvd", "College Park", "GA", 30339);
INSERT INTO store VALUES ("Atlanta Station", "Publix", "595 Piedmot Ave NE", "Atlanta ", "GA", 30363);
INSERT INTO drone_technician VALUES ("lchen27", "KSU Center");
INSERT INTO drone_technician VALUES ("jhilborn97", "Park Place");
INSERT INTO drone_technician VALUES ("jhilborn98", "The Plaza Midtown");
INSERT INTO drone_technician VALUES ("ygao10", "North Avenue");
INSERT INTO drone_technician VALUES ("kfrog03", "Piedmont");
INSERT INTO drone_technician VALUES ("cforte58", "Tech Square");
INSERT INTO drone_technician VALUES ("fdavenport49", "College Park");
INSERT INTO drone_technician VALUES ("hliu88", "Atlanta Station");
INSERT INTO drone_technician VALUES ("akarev16", "North Point");
INSERT INTO drone_technician VALUES ("jdoe381", "Norcross");
INSERT INTO drone_technician VALUES ("sstrange11", "Owl Circle");
INSERT INTO drone_technician VALUES ("dmcstuffins7", "Park Place");
INSERT INTO drone_technician VALUES ("mgrey91", "The Plaza Midtown");
INSERT INTO drone_technician VALUES ("pwallace51", "GT Center");
INSERT INTO drone_technician VALUES ("jrosario34", "Piedmont");
INSERT INTO drone_technician VALUES ("nshea230", "Midtown");
INSERT INTO drone_technician VALUES ("mgeller3", "College Park");
INSERT INTO drone_technician VALUES ("rgeller9", "Atlanta Station");
INSERT INTO drone_technician VALUES ("jtribbiani27", "Abbots Bridge");
INSERT INTO drone_technician VALUES ("pbuffay56", "Pleasant Hill");
INSERT INTO manager VALUES("rgreen97", "Kroger");
INSERT INTO manager VALUES("cbing101", "Publix");
INSERT INTO manager VALUES("pbeesly61", "Wal Mart");
INSERT INTO manager VALUES("jhalpert75", "Trader Joe's");
INSERT INTO manager VALUES("dschrute18", "Whole Foods");
INSERT INTO manager VALUES("amartin365", "Sprouts");
INSERT INTO manager VALUES("omartinez13", "Query Mart");
INSERT INTO item VALUES ("2% Milk", "Dairy", "Georgia", 0);
INSERT INTO item VALUES ("4-1 Shampoo", "Personal Care", "Michigan", 0);
INSERT INTO item VALUES ("Almond Milk", "Dairy", "Georgia", 0);
INSERT INTO item VALUES ("Apple Juice", "Beverages", "Missouri", 0);
INSERT INTO item VALUES ("Baby Food", "Produce", "Georgia", 0);
INSERT INTO item VALUES ("Baby Shampoo", "Personal Care", "Michigan", 0);
INSERT INTO item VALUES ("Bagels", "Bakery", "Georgia", 0);
INSERT INTO item VALUES ("Bamboo Brush", "Personal Care", "Louisiana", 0);
INSERT INTO item VALUES ("Bamboo Comb", "Personal Care", "Louisiana", 0);
INSERT INTO item VALUES ("Bandaids", "Personal Care", "Arkansas", 0);
INSERT INTO item VALUES ("Black Tea", "Beverages", "India", 0);
INSERT INTO item VALUES ("Brown bread", "Bakery", "Georgia", 0);
INSERT INTO item VALUES ("Cajun Seasoning", "Other", "Lousiana", 0);
INSERT INTO item VALUES ("Campbells Soup", "Other", "Georgia", 0);
INSERT INTO item VALUES ("Carrot", "Produce", "Alabama", 0);
INSERT INTO item VALUES ("Chicken Breast", "Meat", "Georgia", 0);
INSERT INTO item VALUES ("Chicken Thighs", "Meat", "Georgia", 0);
INSERT INTO item VALUES ("Coca-cola", "Beverages", "Georgia", 0);
INSERT INTO item VALUES ("Coffee", "Beverages", "Columbia", 0);
INSERT INTO item VALUES ("Disani", "Beverages", "California", 0);
INSERT INTO item VALUES ("Doughnuts", "Bakery", "Georgia", 0);
INSERT INTO item VALUES ("Earl Grey Tea", "Beverages", "Italy", 0);
INSERT INTO item VALUES ("Fuji Apple", "Produce", "Georgia", 0);
INSERT INTO item VALUES ("Gala Apple", "Produce", "New Zealand", 0);
INSERT INTO item VALUES ("Grape Juice", "Beverages", "Missouri", 0);
INSERT INTO item VALUES ("Grassfed Beef", "Meat", "Georgia", 0);
INSERT INTO item VALUES ("Green Tea", "Beverages", "India", 0);
INSERT INTO item VALUES ("Green Tea Shampoo", "Personal Care", "Michigan", 0);
INSERT INTO item VALUES ("Ground Breef", "Meat", "Texas", 0);
INSERT INTO item VALUES ("Ice Cream", "Dairy", "Georgia", 0);
INSERT INTO item VALUES ("Lamb Chops", "Meat", "New Zealand", 0);
INSERT INTO item VALUES ("Lavender Handsoap", "Personal Care", "France", 0);
INSERT INTO item VALUES ("Lemon Handsoap", "Personal Care", "France", 0);
INSERT INTO item VALUES ("Makeup", "Personal Care", "New York", 0);
INSERT INTO item VALUES ("Napkins", "Paper Goods", "South Carolina", 0);
INSERT INTO item VALUES ("Navel Orange", "Produce", "California", 0);
INSERT INTO item VALUES ("Onions", "Produce", "Mississippi", 0);
INSERT INTO item VALUES ("Orange Juice", "Beverages", "Missouri", 0);
INSERT INTO item VALUES ("Organic Peanut Butter", "Other ", "Alabama", 0);
INSERT INTO item VALUES ("Organic Toothpaste", "Personal Care", "Florida", 0);
INSERT INTO item VALUES ("Paper Cups", "Paper Goods", "South Carolina", 0);
INSERT INTO item VALUES ("Paper plates", "Paper Goods", "South Carolina", 0);
INSERT INTO item VALUES ("Peanut Butter", "Other", "Alabama", 0);
INSERT INTO item VALUES ("Pepper", "Other", "Alaska", 0);
INSERT INTO item VALUES ("Pepsi", "Beverages", "Kansas", 0);
INSERT INTO item VALUES ("Plastic Brush", "Personal Care", "Louisiana", 0);
INSERT INTO item VALUES ("Plastic Comb", "Personal Care", "Louisiana", 0);
INSERT INTO item VALUES ("Pomagranted Juice", "Beverages", "Florida", 0);
INSERT INTO item VALUES ("Potato", "Produce", "Alabama", 0);
INSERT INTO item VALUES ("Pura Life", "Beverages", "California", 0);
INSERT INTO item VALUES ("Roma Tomato", "Produce", "Mexico", 0);
INSERT INTO item VALUES ("Rosemary Tea", "Beverages", "Greece", 0);
INSERT INTO item VALUES ("Sea salt", "Other", "Alaska", 0);
INSERT INTO item VALUES ("Spinach", "Produce", "Florida", 0);
INSERT INTO item VALUES ("Spring Water", "Beverages", "California", 0);
INSERT INTO item VALUES ("Stationary", "Paper Goods", "North Carolina", 0);
INSERT INTO item VALUES ("Strawberries", "Produce", "Wisconson", 0);
INSERT INTO item VALUES ("Sunflower Butter", "Other", "Alabama", 0);
INSERT INTO item VALUES ("Swiss Cheese", "Dairy", "Italy", 0);
INSERT INTO item VALUES ("Toilet Paper", "Personal Care", "Kentucky", 0);
INSERT INTO item VALUES ("Toothbrush", "Personal Care", "Kansas", 0);
INSERT INTO item VALUES ("Toothpaste", "Personal Care", "Florida", 0);
INSERT INTO item VALUES ("Turkey Wings", "Meat", "Georgia", 0);
INSERT INTO item VALUES ("White Bread", "Bakery", "Georgia", 0);
INSERT INTO item VALUES ("Whole Milk", "Dairy", "Georgia", 0);
INSERT INTO item VALUES ("Yellow Curry Powder", "Other", "India", 0);
INSERT INTO item VALUES ("Yogurt", "Dairy", "Georgia", 0);
INSERT INTO chain_item VALUES ("2% Milk", "Sprouts", 10001, 10, 410, 6.38);
INSERT INTO chain_item VALUES ("4-1 Shampoo", "Publix", 10006, 6, 60, 5.85);
INSERT INTO chain_item VALUES ("Baby Food", "Sprouts", 10005, 5, 170, 10.56);
INSERT INTO chain_item VALUES ("Bagels", "Publix", 10009, 5, 130, 5.67);
INSERT INTO chain_item VALUES ("Bandaids", "Wal Mart", 10002, 4, 300, 14.71);
INSERT INTO chain_item VALUES ("Black Tea", "Trader Joe's", 10003, 8, 130, 3.31);
INSERT INTO chain_item VALUES ("Brown bread", "Kroger", 10002, 10, 80, 6.99);
INSERT INTO chain_item VALUES ("Campbells Soup", "Moss Market", 10003, 8, 390, 13.31);
INSERT INTO chain_item VALUES ("Carrot", "Kroger", 10004, 10, 370, 8.19);
INSERT INTO chain_item VALUES ("Carrot", "Publix", 10001, 9, 110, 9.71);
INSERT INTO chain_item VALUES ("Chicken Thighs", "Publix", 10008, 10, 280, 2.81);
INSERT INTO chain_item VALUES ("Coca-cola", "Wal Mart", 10003, 6, 160, 14.85);
INSERT INTO chain_item VALUES ("Coffee", "Kroger", 10005, 8, 170, 4.30);
INSERT INTO chain_item VALUES ("Earl Grey Tea", "Trader Joe's", 10005, 8, 130, 20.53);
INSERT INTO chain_item VALUES ("Fuji Apple", "Moss Market", 10002, 2, 130, 1.99);
INSERT INTO chain_item VALUES ("Gala Apple", "Moss Market", 10001, 8, 450, 15.32);
INSERT INTO chain_item VALUES ("Grape Juice", "Publix", 10004, 7, 150, 11.89);
INSERT INTO chain_item VALUES ("Grassfed Beef", "Whole Foods", 10001, 1, 170, 13.88);
INSERT INTO chain_item VALUES ("Green Tea", "Trader Joe's", 10002, 4, 340, 7.25);
INSERT INTO chain_item VALUES ("Ice Cream", "Query Mart", 10002, 2, 310, 13.58);
INSERT INTO chain_item VALUES ("Lamb Chops", "Query Mart", 10001, 2, 410, 7.72);
INSERT INTO chain_item VALUES ("Lamb Chops", "Whole Foods", 10002, 4, 280, 20.14);
INSERT INTO chain_item VALUES ("Lavender Handsoap", "Kroger", 10008, 4, 140, 7.23);
INSERT INTO chain_item VALUES ("Napkins", "Wal Mart", 10006, 4, 410, 18.36);
INSERT INTO chain_item VALUES ("Paper Cups", "Publix", 10003, 10, 430, 20.18);
INSERT INTO chain_item VALUES ("Paper Cups", "Wal Mart", 10005, 1, 50, 7.73);
INSERT INTO chain_item VALUES ("Paper plates", "Wal Mart", 10007, 10, 60, 20.29);
INSERT INTO chain_item VALUES ("Peanut Butter", "Publix", 10002, 6, 190, 10.35);
INSERT INTO chain_item VALUES ("Peanut Butter", "Sprouts", 10004, 7, 410, 1.30);
INSERT INTO chain_item VALUES ("Pepsi", "Kroger", 10007, 6, 340, 14.74);
INSERT INTO chain_item VALUES ("Pepsi", "Publix", 10007, 6, 440, 11.19);
INSERT INTO chain_item VALUES ("Pepsi", "Wal Mart", 10004, 10, 110, 3.21);
INSERT INTO chain_item VALUES ("Roma Tomato", "Publix", 10005, 6, 140, 15.91);
INSERT INTO chain_item VALUES ("Rosemary Tea", "Trader Joe's", 10004, 10, 310, 10.55);
INSERT INTO chain_item VALUES ("Spinach", "Kroger", 10006, 8, 130, 2.35);
INSERT INTO chain_item VALUES ("Spinach", "Wal Mart", 10001, 9, 320, 11.44);
INSERT INTO chain_item VALUES ("Sunflower Butter", "Trader Joe's", 10001, 4, 160, 8.23);
INSERT INTO chain_item VALUES ("White Bread", "Kroger", 10001, 8, 220, 7.52);
INSERT INTO chain_item VALUES ("Whole Milk", "Sprouts", 10002, 8, 370, 15.26);
INSERT INTO chain_item VALUES ("Yellow Curry Powder", "Sprouts", 10003, 7, 230, 16.72);
INSERT INTO chain_item VALUES ("Yogurt", "Kroger", 10003, 6, 330, 3.27);
INSERT INTO drone VALUES (103, "lchen27", "Available", 30144, 3);
INSERT INTO drone VALUES (114, "jhilborn97", "Available", 30303, 8);
INSERT INTO drone VALUES (105, "jhilborn98", "Available", 30309, 4);
INSERT INTO drone VALUES (106, "ygao10", "Available", 30313, 6);
INSERT INTO drone VALUES (117, "kfrog03", "Available", 30318, 9);
INSERT INTO drone VALUES (118, "cforte58", "Available", 30332, 5);
INSERT INTO drone VALUES (109, "fdavenport49", "Available", 30339, 5);
INSERT INTO drone VALUES (110, "hliu88", "Available", 30363, 5);
INSERT INTO drone VALUES (111, "akarev16", "Busy", 30022, 5);
INSERT INTO drone VALUES (102, "jdoe381", "Available", 30047, 7);
INSERT INTO drone VALUES (113, "sstrange11", "Available", 30144, 6);
INSERT INTO drone VALUES (104, "dmcstuffins7", "Busy", 30303, 8);
INSERT INTO drone VALUES (115, "mgrey91", "Available", 30309, 7);
INSERT INTO drone VALUES (116, "pwallace51", "Available", 30313, 3);
INSERT INTO drone VALUES (107, "jrosario34", "Available", 30318, 8);
INSERT INTO drone VALUES (108, "nshea230", "Available", 30332, 7);
INSERT INTO drone VALUES (119, "mgeller3", "Available", 30339, 7);
INSERT INTO drone VALUES (120, "rgeller9", "Available", 30363, 7);
INSERT INTO drone VALUES (101, "jtribbiani27", "Available", 30022, 5);
INSERT INTO drone VALUES (112, "pbuffay56", "Busy", 30047, 6);
INSERT INTO orders VALUES (10001, "Delivered", '2021-01-03', "hpeterson55", 102, "Kroger");
INSERT INTO orders VALUES (10002, "Delivered", '2021-01-13', "abernard224", 111, "Whole Foods");
INSERT INTO orders VALUES (10003, "Delivered", '2021-01-13', "dbrown85", 117, "Sprouts");
INSERT INTO orders VALUES (10004, "Delivered", '2021-01-16', "dkim99", 108, "Kroger");
INSERT INTO orders VALUES (10005, "Delivered", '2021-01-21', "dphilbin81", 103, "Moss Market");
INSERT INTO orders VALUES (10006, "Delivered", '2021-01-22', "sthefirst1", 104, "Publix");
INSERT INTO orders VALUES (10007, "Delivered", '2021-01-22', "sthefirst1", 104, "Publix");
INSERT INTO orders VALUES (10008, "Delivered", '2021-01-28', "wbryant23", 116, "Query Mart");
INSERT INTO orders VALUES (10009, "Delivered", '2021-02-01', "hpeterson55", 112, "Wal Mart");
INSERT INTO orders VALUES (10010, "Delivered", '2021-02-04', "kkapoor155", 112, "Wal Mart");
INSERT INTO orders VALUES (10011, "Delivered", '2021-02-05', "aallman302", 117, "Sprouts");
INSERT INTO orders VALUES (10012, "In Transit", '2021-02-14', "vneal101", 111, "Whole Foods");
INSERT INTO orders VALUES (10013, "In Transit", '2021-02-14', "sthefirst1", 104, "Publix");
INSERT INTO orders VALUES (10014, "Drone Assigned", '2021-02-14', "hpeterson55", 112, "Wal Mart");
INSERT INTO orders VALUES (10015, "Pending", '2021-02-24', "lpiper20", NULL, "Trader Joe's");
INSERT INTO contain VALUES (10001, "Yogurt", "Kroger", 10003, 4);
INSERT INTO contain VALUES (10001, "White Bread", "Kroger", 10001, 1);
INSERT INTO contain VALUES (10001, "Carrot", "Kroger", 10004, 10);
INSERT INTO contain VALUES (10001, "Coffee", "Kroger", 10005, 1);
INSERT INTO contain VALUES (10001, "Spinach", "Kroger", 10006, 2);
INSERT INTO contain VALUES (10002, "Lamb Chops", "Whole Foods", 10002, 2);
INSERT INTO contain VALUES (10003, "2% Milk", "Sprouts", 10001, 2);
INSERT INTO contain VALUES (10003, "Yellow Curry Powder", "Sprouts", 10003, 3);
INSERT INTO contain VALUES (10003, "Peanut Butter", "Sprouts", 10004, 1);
INSERT INTO contain VALUES (10004, "Brown Bread", "Kroger", 10002, 2);
INSERT INTO contain VALUES (10005, "Gala Apple", "Moss Market", 10001, 6);
INSERT INTO contain VALUES (10005, "Fuji Apple", "Moss Market", 10002, 2);
INSERT INTO contain VALUES (10006, "Peanut Butter", "Publix", 10002, 1);
INSERT INTO contain VALUES (10006, "Paper Cups", "Publix", 10003, 6);
INSERT INTO contain VALUES (10006, "Grape Juice", "Publix", 10004, 2);
INSERT INTO contain VALUES (10006, "Roma Tomato", "Publix", 10005, 6);
INSERT INTO contain VALUES (10006, "4-1 Shampoo", "Publix", 10006, 1);
INSERT INTO contain VALUES (10006, "Carrot", "Publix", 10001, 5);
INSERT INTO contain VALUES (10007, "4-1 Shampoo", "Publix", 10006, 1);
INSERT INTO contain VALUES (10008, "Ice Cream", "Query Mart", 10002, 1);
INSERT INTO contain VALUES (10009, "Bandaids", "Wal Mart", 10002, 4);
INSERT INTO contain VALUES (10010, "Pepsi", "Wal Mart", 10004, 1);
INSERT INTO contain VALUES (10010, "Coca-cola", "Wal Mart", 10003, 1);
INSERT INTO contain VALUES (10011, "Baby Food", "Sprouts", 10005, 3);
INSERT INTO contain VALUES (10012, "Grassfed Beef", "Whole Foods", 10001, 1);
INSERT INTO contain VALUES (10013, "Chicken Thighs", "Publix", 10008, 2);
INSERT INTO contain VALUES (10014, "Paper Plates", "Wal Mart", 10007, 8);
INSERT INTO contain VALUES (10015, "Green Tea", "Trader Joe's", 10002, 2);
INSERT INTO contain VALUES (10015, "Black Tea", "Trader Joe's", 10003, 2);
INSERT INTO contain VALUES (10015, "Rosemary Tea", "Trader Joe's", 10004, 2);
INSERT INTO contain VALUES (10015, "Earl Grey Tea", "Trader Joe's", 10005, 2);