# Sistema de Gestão Universitária (SGU)

## 📚 Sobre o Projeto

Protótipo funcional de um Sistema de Gestão Universitária desenvolvido para a Fase 2 do Projeto Integrador. O sistema oferece uma interface completa para gerenciar pessoas físicas, pessoas jurídicas, alunos, professores e fornecedores.

## 🎨 Design System

### Paleta de Cores

- **Primária**: #1E6FF0 (Azul)
- **Secundária**: #2B2B2B (Cinza escuro)
- **Neutro Claro**: #F6F7FB
- **Sucesso**: #16A34A (Verde)
- **Erro**: #EF4444 (Vermelho)
- **Aviso**: #F59E0B (Amarelo)
- **Borda/Input**: #E6E9EE

### Tipografia

- **Fonte**: Inter
- **H1**: 32px Bold
- **H2**: 24px SemiBold
- **H3**: 20px SemiBold
- **Body**: 16px Regular
- **Small**: 12px Regular

### Espaçamento

Sistema de 8px (4, 8, 16, 24, 32, 40, 48...)

## 🚀 Funcionalidades

### 1. Login
- Autenticação com email e senha
- Validação de formato de email
- Opção "Manter-me conectado"
- Link "Esqueci minha senha"
- **Demo**: Use qualquer email válido e senha `123456`

### 2. Dashboard
- Cards com estatísticas resumidas
- Últimas 10 atividades do sistema
- Botão de novo cadastro com dropdown
- Acesso rápido às principais funcionalidades

### 3. Cadastro de Pessoa Física
- Campos: Nome, CPF, Data de Nascimento, Email, Telefone, Endereço
- Validação de CPF com dígito verificador
- Máscaras automáticas (CPF, telefone, CEP)
- Modal de sucesso após cadastro
- Papel/Tag (Aluno, Professor, Funcionário, Outro)

### 4. Cadastro de Pessoa Jurídica
- Campos: Razão Social, Nome Fantasia, CNPJ, Email, Telefone, Endereço
- Validação de CNPJ com dígito verificador
- Toggle para emissão de nota fiscal
- Campos condicionais: Inscrição Municipal/Estadual
- Geração de recibo em PDF (simulado)

### 5. Cadastro de Professores
- Campos: Nome, SIAPE, Email, Telefone, Carga Horária
- Multi-seleção de disciplinas
- Upload de documentos (PDF/JPG)
- Endereço opcional
- Ações pós-cadastro: Atribuir curso, Gerar relatório

### 6. Cadastro de Fornecedores
- Campos: Nome, CNPJ, Email, Telefone, Endereço
- Registro de produtos (nome, preço, estoque)
- Gestão de contratos (Ativo/Inativo/Pendente)
- Envio de faturas com data e departamento
- Ações: Renovar/Cancelar contratos

### 7. Cadastro de Alunos
- Campos: Nome, Matrícula (gerada automaticamente), Email, Telefone, Curso
- Verificação de vagas disponíveis
- Frequência e método de pagamento
- Upload de histórico escolar
- Ações:
  - Matricular (com verificação de vagas)
  - Consultar histórico
  - Pagar mensalidade
  - Trocar de curso
- Modal de erro quando curso sem vagas
- Modal de pagamento após matrícula

## 🔧 Validações Implementadas

### CPF
- Formato: 000.000.000-00
- Validação de dígitos verificadores
- Rejeita CPFs com todos os dígitos iguais

### CNPJ
- Formato: 00.000.000/0000-00
- Validação de dígitos verificadores
- Rejeita CNPJs com todos os dígitos iguais

### Email
- Validação de formato (regex)
- Mensagem de erro inline

### Campos Obrigatórios
- Marcados com asterisco vermelho (*)
- Validação ao submeter formulário
- Mensagens de erro individuais por campo

## 💾 Endpoints Sugeridos (API)

### Pessoas Físicas
```
POST /api/pessoas/fisicas
GET /api/pessoas/fisicas
GET /api/pessoas/fisicas/:id
PUT /api/pessoas/fisicas/:id
DELETE /api/pessoas/fisicas/:id
```

### Pessoas Jurídicas
```
POST /api/pessoas/juridicas
GET /api/pessoas/juridicas
GET /api/pessoas/juridicas/:id
PUT /api/pessoas/juridicas/:id
DELETE /api/pessoas/juridicas/:id
```

### Alunos
```
POST /api/alunos
POST /api/alunos/:id/matricula
PUT /api/alunos/:id/curso
GET /api/alunos/:id/historico
POST /api/alunos/:id/pagamento
```

### Professores
```
POST /api/professores
POST /api/professores/:id/disciplinas
POST /api/professores/:id/documentos
```

### Fornecedores
```
POST /api/fornecedores
POST /api/fornecedores/:id/produtos
POST /api/fornecedores/:id/contratos
POST /api/fornecedores/:id/faturas
```

## 📱 Responsividade

O sistema foi desenvolvido com foco em responsividade:

- **Desktop**: Layout com sidebar fixa (1440×900)
- **Mobile**: Menu hambúrguer, cards empilhados (390×844)
- **Tablet**: Adaptação automática do grid

## 🎯 Casos de Uso Implementados

### UC: Realizar Matrícula
- **Pré-condição**: Usuário autenticado
- **Fluxo**:
  1. Preencher dados do aluno
  2. Selecionar curso
  3. Verificar disponibilidade de vagas
  4. Gerar matrícula automaticamente
  5. Criar registro de pagamento
- **Pós-condição**: Aluno matriculado com status ativo

### UC: Validar CPF/CNPJ
- **Pré-condição**: Campo preenchido
- **Fluxo**:
  1. Clicar em "Validar"
  2. Spinner de loading (1s)
  3. Validação de dígitos
  4. Exibir resultado (válido/inválido)

### UC: Cadastrar Fornecedor
- **Pré-condição**: Usuário autenticado
- **Fluxo**:
  1. Preencher dados do fornecedor
  2. Adicionar produtos (opcional)
  3. Vincular contratos (opcional)
  4. Salvar no sistema

## 🎨 Microinterações

- **Inputs**: Borda 2px azul no focus, borda vermelha em erro
- **Botões**: Hover com elevação e translateY(-2px)
- **Modals**: Centralizados com overlay 60% opacidade
- **Toasts**: Topo direito para mensagens rápidas
- **Skeleton Loaders**: Carregamento de listas/tabelas
- **Animações**: Slide-up para elementos condicionais

## 📋 Checklist de Acessibilidade

- ✅ Contraste >= 4.5:1 para textos
- ✅ Labels visíveis em todos os inputs
- ✅ Campos obrigatórios marcados com *
- ✅ Mensagens de erro descritivas
- ✅ Navegação por teclado
- ✅ Estados de hover/focus/disabled

## 🛠️ Tecnologias Utilizadas

- **React** - Framework principal
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Shadcn/UI** - Biblioteca de componentes
- **Lucide React** - Ícones

## 📦 Estrutura de Arquivos

```
/
├── components/
│   ├── ui/                    # Componentes Shadcn
│   ├── Login.tsx              # Tela de login
│   ├── Dashboard.tsx          # Dashboard principal
│   ├── MainLayout.tsx         # Layout com sidebar
│   ├── CadastroPessoaFisica.tsx
│   ├── CadastroPessoaJuridica.tsx
│   ├── CadastroProfessor.tsx
│   ├── CadastroFornecedor.tsx
│   └── CadastroAluno.tsx
├── utils/
│   ├── validators.ts          # Funções de validação
│   └── mockData.ts            # Dados mockados
├── styles/
│   └── globals.css            # Estilos globais
└── App.tsx                    # Componente principal
```

## 🔄 Fluxo de Navegação

```
Login → Dashboard → [
  Pessoa Física → Modal Sucesso → Dashboard
  Pessoa Jurídica → Modal Sucesso + Recibo → Dashboard
  Professor → Modal Sucesso + Ações → Dashboard
  Fornecedor → Modal Sucesso → Dashboard
  Aluno → Matricular → Modal Pagamento → Modal Sucesso → Dashboard
]
```

## 📝 Notas de Desenvolvimento

### Campos Read-Only
- Matrícula de aluno (gerada automaticamente)

### Validações Assíncronas
- CPF/CNPJ com spinner de 1 segundo (simulação)

### Estados de Formulário
- Normal, Hover, Focus, Disabled, Error

### Dados Mockados
- 10 atividades recentes
- 8 cursos com vagas
- 15 disciplinas
- 3 contratos de exemplo
- 27 estados brasileiros

## 🚦 Como Usar

1. **Login**: Use qualquer email válido e senha `123456`
2. **Dashboard**: Explore os cards e a tabela de atividades
3. **Novo Cadastro**: Clique no botão "Novo Cadastro" e escolha uma opção
4. **Preencher Formulários**: Campos com * são obrigatórios
5. **Validar CPF/CNPJ**: Clique no botão "Validar" ao lado do campo
6. **Salvar**: Após preencher, clique em "Salvar" ou ação equivalente
7. **Modal de Sucesso**: Confirme o cadastro e navegue

## 🎓 Mapeamento UML

### Classes Principais (Sugeridas)
- `PessoaFisica`: cpf, nome, dataNascimento, email, telefone, endereco, papel
- `PessoaJuridica`: cnpj, razaoSocial, nomeFantasia, email, inscricaoMunicipal, inscricaoEstadual
- `Aluno`: matricula, nome, email, cursoAtual, frequencia, metodoPagamento
- `Professor`: siape, nome, email, disciplinas, cargaHoraria
- `Fornecedor`: cnpj, nome, produtos, contratos
- `Curso`: id, nome, codigo, vagas
- `Pagamento`: valor, dataVencimento, status

## 📄 Licença

Projeto desenvolvido para fins acadêmicos - Fase 2 do Projeto Integrador.

---

**Desenvolvido com ❤️ para o Sistema de Gestão Universitária**
