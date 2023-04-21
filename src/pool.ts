import mariadb from "mariadb"
export const pool = mariadb.createPool({
    host: 'localhost', 
    user:'root', 
    database:'sbtbs',
    connectionLimit: 5
});
