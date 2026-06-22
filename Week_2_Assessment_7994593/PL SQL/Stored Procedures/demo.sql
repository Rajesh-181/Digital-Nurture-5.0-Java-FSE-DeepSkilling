-- Schema to be created

-- Savings Account Table
CREATE TABLE savings_accounts (
account_id INT PRIMARY KEY,
customer_id INT,
balance DECIMAL(12,2)
);

-- Employees Table
CREATE TABLE employees (
emp_id INT PRIMARY KEY,
name VARCHAR(100),
department_id INT,
salary DECIMAL(10,2)
);

-- Accounts Table
CREATE TABLE accounts (
account_id INT PRIMARY KEY,
customer_id INT,
balance DECIMAL(12,2)
);

-- Inserting the values

INSERT INTO savings_accounts VALUES (201, 1, 10000.00);
INSERT INTO savings_accounts VALUES (202, 2, 5000.00);
INSERT INTO savings_accounts VALUES (203, 3, 20000.00);

INSERT INTO employees VALUES (301, 'Rajesh', 101, 50000.00);
INSERT INTO employees VALUES (302, 'Pravin', 102, 45000.00);
INSERT INTO employees VALUES (303, 'Sathish', 101, 55000.00);
INSERT INTO employees VALUES (304, 'Hari', 103, 60000.00);

INSERT INTO accounts VALUES (401, 1, 12000.00);
INSERT INTO accounts VALUES (402, 2, 8000.00);
INSERT INTO accounts VALUES (403, 3, 500.00);

COMMIT;

-- Scenario 1: ProcessMonthlyInterest – Add 1% to All Savings Accounts

UPDATE savings_accounts
SET balance = balance + (balance * 0.01);

SELECT * FROM savings_accounts;

-- Scenario 2: UpdateEmployeeBonus

UPDATE employees
SET salary = salary + (salary * 0.10)
WHERE department_id = 101;

SELECT * FROM employees;

-- Scenario 3: TransferFunds

UPDATE accounts
SET balance = balance - 2000
WHERE account_id = 401;

UPDATE accounts
SET balance = balance + 2000
WHERE account_id = 402;

SELECT * FROM accounts;

-- Successful Transfer Result
SELECT 'Transferred 2000 from Account 401 to Account 402' AS Message;

-- Failure Check

SELECT balance
FROM accounts
WHERE account_id = 403;

SELECT 'Transfer failed: Insufficient funds in Account 403' AS Message;
