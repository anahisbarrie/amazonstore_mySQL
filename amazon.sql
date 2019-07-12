DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (

    -- //item_id (unique id for each product)
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL (10,2) NULL,
    stock_quantity INT NUll,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ('Blue Hats', 'clothe', 5.50, 100);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ('White Hats', 'clothe', 5.50, 100);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ('Green Hats', 'clothe', 5.50, 100);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ('Yellow shoes', 'shoes', 7.0, 100);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ('Pink shoes', 'shoes', 9.8, 100);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ('Purple shoes', 'shoes', 4.50, 100);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ('plates', 'kitchen', 4.0, 100);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ('crystal glass', 'kitchen', 7.50, 100);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ('coocking pans', 'kitchen', 6.50, 100);
INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ('napkins', 'kitchen', 3.50, 100);
