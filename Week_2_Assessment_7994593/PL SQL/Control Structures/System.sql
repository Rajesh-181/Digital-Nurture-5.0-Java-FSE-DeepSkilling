/* Exercise 1: Control Structures

Scenario 1: The bank wants to apply a discount to loan interest rates for customers above 60 years old.
Question: Update the loan interest rate by reducing it by 1% for customers whose age is greater than 60.

Scenario 2: A customer can be promoted to VIP status based on their balance.
Question: Set the IsVIP flag to 'Y' for customers whose balance is greater than $10,000.

Scenario 3: The bank wants to send reminders to customers whose loans are due within the next 30 days.
Question: Display details of all customers whose loan due date falls within the next 30 days.
*/

-- ============================================
-- Schema Creation
-- ============================================

CREATE DATABASE bankdb;
USE bankdb;

CREATE TABLE customers (
customer_id INT PRIMARY KEY,
name VARCHAR(100),
age INT,
loan_interest_rate DECIMAL(5,2),
balance DECIMAL(12,2),
IsVIP CHAR(1) DEFAULT 'N'
);

CREATE TABLE loans (
loan_id INT PRIMARY KEY,
customer_id INT,
due_date DATE,
FOREIGN KEY (customer_id)
REFERENCES customers(customer_id)
);

-- ============================================
-- Inserting Sample Data
-- ============================================

INSERT INTO customers VALUES (1, 'Rajesh', 65, 8.50, 45000, 'N');
INSERT INTO customers VALUES (2, 'Pravin', 45, 9.00, 9000, 'N');
INSERT INTO customers VALUES (3, 'Sathish', 70, 7.80, 20000, 'N');
INSERT INTO customers VALUES (4, 'Hari', 30, 10.20, 5000, 'N');

INSERT INTO loans VALUES (101, 1, CURDATE() + INTERVAL 15 DAY);
INSERT INTO loans VALUES (102, 2, CURDATE() + INTERVAL 45 DAY);
INSERT INTO loans VALUES (103, 3, CURDATE() + INTERVAL 10 DAY);
INSERT INTO loans VALUES (104, 4, CURDATE() + INTERVAL 5 DAY);

COMMIT;

-- ============================================
-- Scenario 1:
-- Apply 1% Interest Rate Discount
-- for Customers Above 60 Years
-- ============================================

SET SQL_SAFE_UPDATES = 0;

UPDATE customers
SET loan_interest_rate = loan_interest_rate * 0.99
WHERE age > 60;

-- Display Updated Interest Rates

SELECT customer_id,
name,
age,
loan_interest_rate
FROM customers;

-- ============================================
-- Scenario 2:
-- Promote Customers to VIP Status
-- if Balance is Greater Than $10,000
-- ============================================

UPDATE customers
SET IsVIP = 'Y'
WHERE balance > 10000;

-- Display VIP Status

SELECT customer_id,
name,
balance,
IsVIP
FROM customers;

-- ============================================
-- Scenario 3:
-- Display Customers Having Loans
-- Due Within the Next 30 Days
-- ============================================

SELECT l.loan_id,
c.name,
l.due_date
FROM loans l
JOIN customers c
ON l.customer_id = c.customer_id
WHERE l.due_date BETWEEN CURDATE()
AND CURDATE() + INTERVAL 30 DAY;

-- ============================================
-- End of Program
-- ============================================
