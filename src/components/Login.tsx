import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Alert, AlertDescription } from './ui/alert';
import { GraduationCap, AlertCircle } from 'lucide-react';
import { validateEmail } from '../utils/validators';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setEmailError('');

    // Validações
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Email inválido.');
      return;
    }

    // Simular autenticação (aceita qualquer email válido com senha "123456")
    if (password === '123456') {
      onLogin();
    } else {
      setError('Email ou senha inválidos');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1E6FF0]/10 to-[#F6F7FB] p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Logo e Título */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-[#1E6FF0] rounded-full flex items-center justify-center mb-4">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-center mb-2">Sistema de Gestão Universitária</h1>
            <p className="text-muted-foreground text-center">Faça login para continuar</p>
          </div>

          {/* Erro Global */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu.email@universidade.br"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                  setError('');
                }}
                className={emailError ? 'error' : ''}
              />
              {emailError && (
                <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {emailError}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                Senha <span className="text-destructive">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label
                  htmlFor="remember"
                  className="text-sm cursor-pointer"
                >
                  Manter-me conectado
                </label>
              </div>
              <Button type="button" variant="link" className="p-0 h-auto">
                Esqueci minha senha
              </Button>
            </div>

            <Button type="submit" className="w-full bg-[#1E6FF0] hover:bg-[#1557C0]">
              Entrar
            </Button>
          </form>

          {/* Informação de demo */}
          <div className="mt-6 p-4 bg-muted rounded-md">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Demo:</strong> Use qualquer email válido e senha <strong>123456</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
