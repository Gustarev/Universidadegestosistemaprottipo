Consultas básicas para validação das tabelas
 
-- Listar todos os alunos com seus cursos
SELECT p.nome, a.matricula, c.nome AS curso
FROM aluno a
JOIN pessoa p ON p.id = a.pessoa_id
LEFT JOIN curso c ON c.id = a.curso_id;
 
-- Buscar uma pessoa física pelo CPF
SELECT p.*, pf.cpf
FROM pessoa p
JOIN pessoa_fisica pf ON pf.pessoa_id = p.id
WHERE pf.cpf = '000.000.000-00';
 
-- Listar professores cadastrados
SELECT p.nome, pr.siape, pr.carga_horaria
FROM professor pr
JOIN pessoa p ON p.id = pr.pessoa_id;
 
-- Pagamentos pendentes
SELECT p.nome, pg.valor, pg.data_vencimento
FROM pagamento pg
JOIN aluno a ON a.pessoa_id = pg.aluno_id
JOIN pessoa p ON p.id = a.pessoa_id
WHERE pg.status = 'PENDENTE';-- Estrutura inicial do banco (Fase 2)
-- (Conteúdo pode ser preenchido depois)
