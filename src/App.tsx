import { useState } from 'react';
import { Toaster } from './components/ui/sonner';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { MainLayout } from './components/MainLayout';
import { CadastroPessoaFisica } from './components/CadastroPessoaFisica';
import { CadastroPessoaJuridica } from './components/CadastroPessoaJuridica';
import { CadastroProfessor } from './components/CadastroProfessor';
import { CadastroFornecedor } from './components/CadastroFornecedor';
import { CadastroAluno } from './components/CadastroAluno';

type Page = 'login' | 'dashboard' | 'pessoa-fisica' | 'pessoa-juridica' | 'professor' | 'fornecedor' | 'aluno';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('Administrador');

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('login');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const handleBack = () => {
    setCurrentPage('dashboard');
  };

  // Se não estiver autenticado, mostra tela de login
  if (!isAuthenticated) {
    return (
      <>
        <Login onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  // Renderiza o conteúdo da página atual
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} userName={userName} />;
      case 'pessoa-fisica':
        return <CadastroPessoaFisica onBack={handleBack} />;
      case 'pessoa-juridica':
        return <CadastroPessoaJuridica onBack={handleBack} />;
      case 'professor':
        return <CadastroProfessor onBack={handleBack} />;
      case 'fornecedor':
        return <CadastroFornecedor onBack={handleBack} />;
      case 'aluno':
        return <CadastroAluno onBack={handleBack} />;
      default:
        return <Dashboard onNavigate={handleNavigate} userName={userName} />;
    }
  };

  return (
    <>
      <MainLayout
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        userName={userName}
      >
        {renderPage()}
      </MainLayout>
      <Toaster />
    </>
  );
}
