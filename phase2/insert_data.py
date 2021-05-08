### Python script to transfer excel data to insert statements in SQL ###

import pandas as pd
import re

out_path = "./out.txt"

users_data = pd.read_csv('./data/users.csv')
stores_data = pd.read_csv('./data/stores.csv')
items_data = pd.read_csv('./data/items.csv')
orders_data = pd.read_csv('./data/orders.csv')

def format_users(row, users, admins, customers, employees, drone_technicians, managers, drones):
    """
    Format insert statements for users sheet in excel file
    """
    users.append("INSERT INTO users VALUES (\"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", \"{}\", {})"\
        .format(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7]))
    if pd.isna(row['CCNUMBER']):
        if pd.isna(row['CHAIN NAME']):
            admins.append("INSERT INTO administrator VALUES (\"{}\")".format(row['USERNAME']))
        else:
            employees.append("INSERT INTO employee VALUES (\"{}\")".format(row['USERNAME']))
            if pd.isna(row['STORE NAME']):
                managers.append("INSERT INTO manager VALUES(\"{}\", \"{}\")"\
                    .format(row['USERNAME'], row['CHAIN NAME']))
            else:
                drone_technicians.append("INSERT INTO drone_technician VALUES (\"{}\", \"{}\")"\
                    .format(row['USERNAME'], row['STORE NAME']))
                drones.append("INSERT INTO drone VALUES ({}, \"{}\", \"{}\", {}, {})"\
                    .format(int(row['DRONE ID']), row['USERNAME'], row['DRONE STATUS'], int(row['DRONE ZIP']), int(row['DRONE RADIUS'])))
    else:
        date = row['EXP DATE'].split('/')
        customers.append("INSERT INTO customer VALUES (\"{}\", {}, {}, '20{}-{}-01')"\
            .format(row['USERNAME'], row['CCNUMBER'].replace(" ", ""), int(row['CVV']), date[1], date[0].zfill(2)))

def format_stores(row, chains, stores):
    """
    Format insert statements for stores sheet
    """
    stores.append("INSERT INTO store VALUES (\"{}\", \"{}\", \"{}\", \"{}\", \"{}\", {})"\
        .format(row['STORE NAME'], row['CHAIN NAME'], row['STREET'], row['CITY'], row['STATE'], row['ZIP']))
    if row['CHAIN NAME'] not in chains:
        chains.append("INSERT INTO grocery_chain VALUES(\"{}\")".format(row['CHAIN NAME']))

def format_items(row, items, chainItems):
    """
    Format insert statements for items sheet
    """
    items.append("INSERT INTO item VALUES (\"{}\", \"{}\", \"{}\", {})"\
        .format(row['NAME'].strip(), row['TYPE'], row['ORIGIN'], 1 if row['ORGANIC'] == 1 else 0))
    if not pd.isna(row[4]):
        c = row[4]
        c = c.replace('), (', '),(')
        c = c.split('),(')
        c[0] = c[0][1:]
        c[-1] = c[-1][:-1]
        for t in c:
            ci = t.split(',')
            chainItems.append("INSERT INTO chain_item VALUES (\"{}\", \"{}\", {}, {}, {}, {})"\
                .format(ci[0].strip(), ci[1], ci[2], ci[3], ci[4], ci[5]))

def format_orders(row, orders, contains):
    """
    Format insert statements for orders sheet
    """
    date = row['DATE'].split('/')
    orders.append("INSERT INTO orders VALUES ({}, \"{}\", '{}-{}-{}', \"{}\", {}, \"{}\")"\
        .format(row['ID'], row['STATUS'], date[2], date[0].zfill(2), date[1].zfill(2),\
                row['CUSTOMER USERNAME'], 'NULL' if pd.isna(row['DRONE ID']) else int(row['DRONE ID']), row['FROM CHAIN']))
    c = row[6]
    c = c.replace('), (', '),(')
    c = row[6].split('),(')
    c[0] = c[0][1:]
    c[-1] = c[-1][:-1]
    for t in c:
        i = t.split(',')
        contains.append("INSERT INTO contain VALUES ({}, \"{}\", \"{}\", {}, {})".format(i[0], i[1], i[2], i[3], i[4]))

def write():
    with open(out_path, "w") as f:
        for user in users:
            f.write(user + ";\n")
        for admin in admins:
            f.write(admin + ";\n")
        for customer in customers:
            f.write(customer + ";\n")
        for employee in employees:
            f.write(employee + ";\n")
        for chain in chains:
            f.write(chain + ";\n")
        for store in stores:
            f.write(store + ";\n")
        for technician in drone_technicians:
            f.write(technician + ";\n")
        for manager in managers:
            f.write(manager + ";\n")
        for item in items:
            f.write(item + ";\n")
        for citem in chainItems:
            f.write(citem + ";\n")
        for drone in drones:
            f.write(drone + ";\n")
        for order in orders:
            f.write(order + ";\n")
        for contain in contains:
            f.write(contain + ";\n")
    f.close()

if __name__ == '__main__':
    users = []
    admins = []
    customers = []
    employees = []
    drone_technicians = []
    managers = []
    drones = []
    items = []
    chainItems = []
    chains = []
    stores = []
    orders = []
    contains = []

    users_data.apply(lambda row : format_users(row, users, admins, customers, employees, drone_technicians, managers, drones), axis=1)
    stores_data.apply(lambda row: format_stores(row, chains, stores), axis=1)
    chains = list(set(chains))
    items_data.apply(lambda row : format_items(row, items, chainItems), axis=1)
    orders_data.apply(lambda row: format_orders(row, orders, contains), axis=1)

    write()
