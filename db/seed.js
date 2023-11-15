const db = require('./connection')
const format = require('pg-format')

const seed = ({ employeeData, rolesData, sectorData }) => {
    return db
    .query('DROP TABLE IF EXISTS employees;')
    .then(() => {
        return db.query('DROP TABLE IF EXISTS roles')
    })
    .then(() => {
        return db.query('DROP TABLE IF EXISTS sectors')
    })
    .then(()=> {
        return db.query(`
        CREATE TABLE sectors (
            sector_id SERIAL PRIMARY KEY,
            sector VARCHAR(100)
        )
        `)
    })
    .then(()=> {
        return db.query(`
        CREATE TABLE roles (
            role_id SERIAL PRIMARY KEY,
            role VARCHAR(100)
        )
        `)
    })
    .then(() => {
        return db.query(`
            CREATE TABLE employees (
                employee_id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                join_date INT NOT NULL,
                img_path VARCHAR(1000),
                role_id INT
                REFERENCES roles(role_id) ON DELETE CASCADE,
                sector_id INT
                REFERENCES sectors(sector_id) ON DELETE CASCADE
            );
        `)
    })
    .then(() => {
        const rolesRows = rolesData.map( ({role}) => [role])
        console.log(rolesRows)
        return db.query(format(`
        INSERT INTO roles (role) VALUES %L;
        `, rolesRows));
    })
    .then(() => {
        const sectorsRows = sectorData.map( ({sector}) => [sector])
        console.log(sectorsRows)
        return db.query(format(`
        INSERT INTO sectors (sector) VALUES %L;
        `, sectorsRows));
    })
    .then(() => {
        const employeesRows = employeeData.map( 
            ({name, join_date, img_path, role_id, sector_id}) => [name, join_date, img_path, role_id, sector_id])
        console.log(employeesRows)
        return db.query(format(`
        INSERT INTO employees (name, join_date, img_path, role_id, sector_id) VALUES %L;
        `, employeesRows));
    })

}

module.exports = seed;