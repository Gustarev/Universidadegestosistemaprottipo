// Dados mockados para o sistema

export interface Activity {
  id: string;
  type: string;
  description: string;
  date: Date;
  user: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  vacancies: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface Contract {
  id: string;
  name: string;
  status: 'Ativo' | 'Inativo' | 'Pendente';
  startDate: Date;
  endDate: Date;
  value: number;
}

export const recentActivities: Activity[] = [
  {
    id: '1',
    type: 'Matrícula',
    description: 'João Silva matriculado em Engenharia de Software',
    date: new Date(2025, 10, 14),
    user: 'Admin'
  },
  {
    id: '2',
    type: 'Pagamento',
    description: 'Pagamento recebido - Maria Santos - R$ 1.250,00',
    date: new Date(2025, 10, 14),
    user: 'Financeiro'
  },
  {
    id: '3',
    type: 'Cadastro',
    description: 'Novo professor cadastrado: Dr. Carlos Oliveira',
    date: new Date(2025, 10, 13),
    user: 'RH'
  },
  {
    id: '4',
    type: 'Fornecedor',
    description: 'Contrato renovado com Editora Academic Press',
    date: new Date(2025, 10, 13),
    user: 'Compras'
  },
  {
    id: '5',
    type: 'Aluno',
    description: 'Ana Costa - Troca de curso aprovada',
    date: new Date(2025, 10, 12),
    user: 'Secretaria'
  },
  {
    id: '6',
    type: 'Pagamento',
    description: 'Fatura enviada - Fornecedor Tech Solutions',
    date: new Date(2025, 10, 12),
    user: 'Financeiro'
  },
  {
    id: '7',
    type: 'Cadastro',
    description: 'Nova empresa cadastrada: Consultoria XYZ Ltda',
    date: new Date(2025, 10, 11),
    user: 'Admin'
  },
  {
    id: '8',
    type: 'Matrícula',
    description: 'Pedro Almeida matriculado em Administração',
    date: new Date(2025, 10, 11),
    user: 'Secretaria'
  },
  {
    id: '9',
    type: 'Professor',
    description: 'Dra. Beatriz Lima - Carga horária atualizada',
    date: new Date(2025, 10, 10),
    user: 'RH'
  },
  {
    id: '10',
    type: 'Pagamento',
    description: 'Mensalidade paga - Lucas Ferreira - R$ 980,00',
    date: new Date(2025, 10, 10),
    user: 'Financeiro'
  }
];

export const courses: Course[] = [
  { id: '1', name: 'Engenharia de Software', code: 'ES001', vacancies: 45 },
  { id: '2', name: 'Administração', code: 'ADM001', vacancies: 30 },
  { id: '3', name: 'Ciência da Computação', code: 'CC001', vacancies: 40 },
  { id: '4', name: 'Direito', code: 'DIR001', vacancies: 35 },
  { id: '5', name: 'Medicina', code: 'MED001', vacancies: 0 },
  { id: '6', name: 'Engenharia Civil', code: 'EC001', vacancies: 25 },
  { id: '7', name: 'Psicologia', code: 'PSI001', vacancies: 20 },
  { id: '8', name: 'Arquitetura', code: 'ARQ001', vacancies: 30 }
];

export const disciplines = [
  'Algoritmos e Programação',
  'Banco de Dados',
  'Engenharia de Software',
  'Redes de Computadores',
  'Inteligência Artificial',
  'Cálculo I',
  'Cálculo II',
  'Física I',
  'Física II',
  'Matemática Discreta',
  'Estrutura de Dados',
  'Sistemas Operacionais',
  'Compiladores',
  'Teoria da Computação',
  'Gestão de Projetos'
];

export const estadosBrasileiros = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

export const mockProducts: Product[] = [
  { id: '1', name: 'Livro - Fundamentos de Programação', price: 89.90, stock: 150 },
  { id: '2', name: 'Apostila - Matemática Avançada', price: 45.00, stock: 200 },
  { id: '3', name: 'Kit Laboratório Química', price: 320.00, stock: 30 }
];

export const mockContracts: Contract[] = [
  {
    id: '1',
    name: 'Fornecimento de Material Didático',
    status: 'Ativo',
    startDate: new Date(2025, 0, 1),
    endDate: new Date(2025, 11, 31),
    value: 50000
  },
  {
    id: '2',
    name: 'Manutenção de Equipamentos',
    status: 'Ativo',
    startDate: new Date(2025, 2, 1),
    endDate: new Date(2026, 1, 28),
    value: 35000
  },
  {
    id: '3',
    name: 'Fornecimento de Alimentos - Cantina',
    status: 'Pendente',
    startDate: new Date(2025, 10, 1),
    endDate: new Date(2026, 9, 31),
    value: 80000
  }
];
