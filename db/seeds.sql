INSERT INTO department
    (name)
VALUES 
    ('Marketing Department'),
    ('Designing Department'),
    ('Account Department'),
    ('Development Department'),
    ('Technology Department'),
    ('Human Resource Department'),
    ('Administration department');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Marketing MGR', 110000, 1),
    ('Designing MGR', 50000, 2),
    ('Account MGR', 100000, 3),
    ('Development MGR', 140000, 4),
    ('IT MGR', 85000, 5),
    ('HR MGR', 70000, 6),
    ('Administration MGR', 95000, 7);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES 
    ('Charles', 'Brown', 1, NULL),
    ('Eliza', 'Parsons', 2, 1),
    ('Susan', 'Hill', 3, NULL),
    ('Sydney', 'Owenson', 4, 3),
    ('Hubert', 'Crackanthorpe', 5, NULL),
    ('William', 'Carleton', 6, 5),
    ('Gerald', 'Griffin', 7, NULL);