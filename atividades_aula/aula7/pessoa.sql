CREATE DATABASE aula8;
USE aula8;

CREATE TABLE pessoa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    idade INT
);

INSERT INTO pessoa (nome, idade) VALUES ('Vitória', 21), ('Raissa', 22);
SELECT * FROM pessoa;