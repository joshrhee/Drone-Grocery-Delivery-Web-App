# 4400-Team-85

## Phase 4:
Optional final assignment for the CS 4400 group project. Create a full application that connects to the database we have been building for the past semester.

Tools Useds: 

Front End: React 

Back End: Express, Node.js 

Database: MySQL

### Setup:
#### Initial Setup
You need to have Node.js installed on your computer to run the backend, you also need the ```grocery_drone_delivery```database in MySQL to connect to the database (shell can be found in ```/phase3``` folder).

#### Environment Variables:
You need to create a ```.env``` file in ```/phase4/server/``` to set up your environemnt variables. The template is as below:

```
DB_USER=<Database Username>
DB_PASSWORD=<Database Password>
DB_HOST=<Hostname: i.e. localhost>
DB_PORT=<Database Port Number>
```

#### Packages Needed:
##### - Front End (within ```/client``` folder):
```
react-router-dom
react-redux
redux
react-bootstrap
axios
```
##### - Back End (within ```/server``` folder):
```
express
dotenv
body-parser
cors
mysql2
md5
/locutus/php/ctype/ctype_xdigit
```

#### Running the App:
Within the ```phase4/server``` folder, in your terminal, run:
```angular2html
npm start
```

Within the ```phase4/client``` folder, in your terminal, run:
```angular2html
npm start
```
If your browser does not automatically open to the Login page of the app, navigate to:
```angular2html
http://localhost:3000/
```
## Phase 3:
Create Procedures for the SQL database.

## Phase 2:
Build the database.
To use the insert_data.py file you must have pandas installed in your system.
