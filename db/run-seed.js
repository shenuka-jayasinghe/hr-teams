const employeeData = require('./data/employees');
const rolesData = require('./data/roles');
const sectorData = require('./data/sectors')
const seed = require('./seed');
const db = require('./connection');

seed({ employeeData, rolesData, sectorData }).then(() => db.end());
