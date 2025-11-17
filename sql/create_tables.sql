-- Estrutura inicial do banco de dados
-- Correspondente aos diagramas UML da Fase 1

CREATE TABLE pessoa (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    telefone VARCHAR(20),
    endereco TEXT,
    tipo VARCHAR(20) -- PF, PJ, ALUNO, PROFESSOR, FORNECEDOR
);

CREATE TABLE pessoa_fisica (
    pessoa_id INTEGER PRIMARY KEY REFERENCES pessoa(id),
    cpf VARCHAR(14) UNIQUE NOT NULL,
    data_nascimento DATE
);

CREATE TABLE pessoa_juridica (
    pessoa_id INTEGER PRIMARY KEY REFERENCES pessoa(id),
    cnpj VARCHAR(20) UNIQUE NOT NULL,
    razao_social VARCHAR(255)
);

CREATE TABLE professor (
    pessoa_id INTEGER PRIMARY KEY REFERENCES pessoa(id),
    siape VARCHAR(20) UNIQUE NOT NULL,
    carga_horaria INTEGER
);

CREATE TABLE fornecedor (
    pessoa_id INTEGER PRIMARY KEY REFERENCES pessoa(id)
    -- campos adicionais podem ser incluídos depois
);

CREATE TABLE curso (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT
);

CREATE TABLE aluno (
    pessoa_id INTEGER PRIMARY KEY REFERENCES pessoa(id),
    matricula VARCHAR(20) UNIQUE NOT NULL,
    curso_id INTEGER REFERENCES curso(id)
);

CREATE TABLE pagamento (
    id SERIAL PRIMARY KEY,
    aluno_id INTEGER REFERENCES aluno(pessoa_id),
    valor NUMERIC(10,2),
    data_vencimento DATE,
    data_pagamento DATE,
    status VARCHAR(20)
);

