import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Alert, AlertDescription } from './ui/alert';
import { AlertCircle, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';
import { validateCPF, validateEmail, maskCPF, maskPhone, maskCEP } from '../utils/validators';
import { estadosBrasileiros } from '../utils/mockData';

interface CadastroPessoaFisicaProps {
  onBack: () => void;
}

export function CadastroPessoaFisica({ onBack }: CadastroPessoaFisicaProps) {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    dataNascimento: '',
    email: '',
    telefone: '',
    rua: '',
    numero: '',
    complemento: '',
    cep: '',
    cidade: '',
    estado: '',
    papel: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cpfValidating, setCpfValidating] = useState(false);
  const [cpfValidated, setCpfValidated] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [savedPersonName, setSavedPersonName] = useState('');

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleCPFChange = (value: string) => {
    const masked = maskCPF(value);
    handleChange('cpf', masked);
    setCpfValidated(false);
  };

  const handleValidateCPF = () => {
    setCpfValidating(true);
    
    // Simular validação assíncrona
    setTimeout(() => {
      const isValid = validateCPF(formData.cpf);
      setCpfValidating(false);
      
      if (isValid) {
        setCpfValidated(true);
        setErrors((prev) => ({ ...prev, cpf: '' }));
      } else {
        setErrors((prev) => ({ ...prev, cpf: 'CPF inválido — verifique os dígitos.' }));
        setCpfValidated(false);
      }
    }, 1000);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) newErrors.nome = 'Campo obrigatório';
    if (!formData.cpf.trim()) newErrors.cpf = 'Campo obrigatório';
    else if (!cpfValidated) newErrors.cpf = 'Por favor, valide o CPF antes de salvar';
    if (!formData.dataNascimento) newErrors.dataNascimento = 'Campo obrigatório';
    if (!formData.email.trim()) newErrors.email = 'Campo obrigatório';
    else if (!validateEmail(formData.email)) newErrors.email = 'Email inválido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setSavedPersonName(formData.nome);
      setShowSuccessModal(true);
    } else {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      document.getElementById(firstErrorField)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleModalClose = (action: 'profile' | 'dashboard') => {
    setShowSuccessModal(false);
    if (action === 'dashboard') {
      onBack();
    }
    // Se for "profile", pode implementar navegação para perfil
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h1>Cadastro de Pessoa Física</h1>
          <p className="text-muted-foreground">Preencha os dados da pessoa física</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informações Pessoais */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>Dados básicos da pessoa física</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">
                  Nome completo <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
                  className={errors.nome ? 'error' : ''}
                  placeholder="Digite o nome completo"
                />
                {errors.nome && (
                  <p className="text-destructive text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.nome}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cpf">
                    CPF <span className="text-destructive">*</span>
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="cpf"
                      value={formData.cpf}
                      onChange={(e) => handleCPFChange(e.target.value)}
                      className={errors.cpf ? 'error' : ''}
                      placeholder="000.000.000-00"
                      maxLength={14}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleValidateCPF}
                      disabled={cpfValidating || !formData.cpf || cpfValidated}
                      className="shrink-0"
                    >
                      {cpfValidating ? (
                        <Loader2 className="w-4 h-4 spinner" />
                      ) : cpfValidated ? (
                        <CheckCircle2 className="w-4 h-4 text-success" />
                      ) : (
                        'Validar'
                      )}
                    </Button>
                  </div>
                  {errors.cpf && (
                    <p className="text-destructive text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.cpf}
                    </p>
                  )}
                  {cpfValidated && !errors.cpf && (
                    <p className="text-success text-sm flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      CPF válido
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dataNascimento">
                    Data de nascimento <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="dataNascimento"
                    type="date"
                    value={formData.dataNascimento}
                    onChange={(e) => handleChange('dataNascimento', e.target.value)}
                    className={errors.dataNascimento ? 'error' : ''}
                  />
                  {errors.dataNascimento && (
                    <p className="text-destructive text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.dataNascimento}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={errors.email ? 'error' : ''}
                    placeholder="email@exemplo.com"
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) => handleChange('telefone', maskPhone(e.target.value))}
                    placeholder="(00) 00000-0000"
                    maxLength={15}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Papel/Tag */}
          <Card>
            <CardHeader>
              <CardTitle>Papel</CardTitle>
              <CardDescription>Função da pessoa no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="papel">Papel/Tag</Label>
                <Select value={formData.papel} onValueChange={(value) => handleChange('papel', value)}>
                  <SelectTrigger id="papel">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aluno">Aluno</SelectItem>
                    <SelectItem value="professor">Professor</SelectItem>
                    <SelectItem value="funcionario">Funcionário</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Endereço */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Endereço</CardTitle>
              <CardDescription>Dados de localização</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="rua">Rua</Label>
                  <Input
                    id="rua"
                    value={formData.rua}
                    onChange={(e) => handleChange('rua', e.target.value)}
                    placeholder="Nome da rua"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numero">Número</Label>
                  <Input
                    id="numero"
                    value={formData.numero}
                    onChange={(e) => handleChange('numero', e.target.value)}
                    placeholder="123"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="complemento">Complemento</Label>
                  <Input
                    id="complemento"
                    value={formData.complemento}
                    onChange={(e) => handleChange('complemento', e.target.value)}
                    placeholder="Apto, Bloco, etc."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cep">CEP</Label>
                  <Input
                    id="cep"
                    value={formData.cep}
                    onChange={(e) => handleChange('cep', maskCEP(e.target.value))}
                    placeholder="00000-000"
                    maxLength={9}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input
                    id="cidade"
                    value={formData.cidade}
                    onChange={(e) => handleChange('cidade', e.target.value)}
                    placeholder="Nome da cidade"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Select value={formData.estado} onValueChange={(value) => handleChange('estado', value)}>
                    <SelectTrigger id="estado">
                      <SelectValue placeholder="UF" />
                    </SelectTrigger>
                    <SelectContent>
                      {estadosBrasileiros.map((uf) => (
                        <SelectItem key={uf} value={uf}>
                          {uf}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-6">
          <Button type="button" variant="outline" onClick={onBack}>
            Cancelar
          </Button>
          <Button type="submit" className="bg-[#1E6FF0] hover:bg-[#1557C0]">
            Salvar
          </Button>
        </div>
      </form>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-success" />
              </div>
            </div>
            <DialogTitle className="text-center">Pessoa Física cadastrada com sucesso!</DialogTitle>
            <DialogDescription className="text-center">
              {savedPersonName} foi cadastrado(a) no sistema.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => handleModalClose('profile')} className="flex-1">
              Ver perfil
            </Button>
            <Button onClick={() => handleModalClose('dashboard')} className="flex-1 bg-[#1E6FF0] hover:bg-[#1557C0]">
              Voltar ao Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
