import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Users, GraduationCap, UserCircle, Truck, FileText, Plus, Building } from 'lucide-react';
import { recentActivities } from '../utils/mockData';
import { formatDate } from '../utils/validators';

interface DashboardProps {
  onNavigate: (page: string) => void;
  userName: string;
}

export function Dashboard({ onNavigate, userName }: DashboardProps) {
  const stats = [
    { title: 'Pessoas', description: 'PF e PJ cadastradas', count: '1.247', icon: Users, color: 'bg-blue-500' },
    { title: 'Alunos', description: 'Matriculados', count: '856', icon: GraduationCap, color: 'bg-green-500' },
    { title: 'Professores', description: 'Ativos', count: '124', icon: UserCircle, color: 'bg-purple-500' },
    { title: 'Fornecedores', description: 'Cadastrados', count: '43', icon: Truck, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1>Bem-vindo, {userName}</h1>
          <p className="text-muted-foreground">Aqui está um resumo do sistema</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-[#1E6FF0] hover:bg-[#1557C0]">
              <Plus className="w-4 h-4 mr-2" />
              Novo Cadastro
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={() => onNavigate('pessoa-fisica')}>
              <Users className="w-4 h-4 mr-2" />
              Pessoa Física
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onNavigate('pessoa-juridica')}>
              <Building className="w-4 h-4 mr-2" />
              Pessoa Jurídica
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onNavigate('aluno')}>
              <GraduationCap className="w-4 h-4 mr-2" />
              Aluno
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onNavigate('professor')}>
              <UserCircle className="w-4 h-4 mr-2" />
              Professor
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onNavigate('fornecedor')}>
              <Truck className="w-4 h-4 mr-2" />
              Fornecedor
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`w-10 h-10 rounded-full ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.count}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('pessoa-fisica')}>
          <CardHeader>
            <CardTitle>Pessoas</CardTitle>
            <CardDescription>Gerenciar pessoas físicas e jurídicas</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <Users className="w-4 h-4 mr-2" />
              Acessar
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onNavigate('aluno')}>
          <CardHeader>
            <CardTitle>Alunos</CardTitle>
            <CardDescription>Matrículas e histórico escolar</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <GraduationCap className="w-4 h-4 mr-2" />
              Acessar
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Relatórios</CardTitle>
            <CardDescription>Visualizar relatórios e estatísticas</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <FileText className="w-4 h-4 mr-2" />
              Acessar
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Atividades Recentes</CardTitle>
          <CardDescription>Últimas 10 atividades no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Usuário</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>
                      <Badge variant="outline">{activity.type}</Badge>
                    </TableCell>
                    <TableCell>{activity.description}</TableCell>
                    <TableCell className="whitespace-nowrap">{formatDate(activity.date)}</TableCell>
                    <TableCell>{activity.user}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
