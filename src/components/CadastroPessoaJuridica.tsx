import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { AlertCircle, CheckCircle2, Loader2, ArrowLeft, Download } from 'lucide-react';
import { validateCNPJ, validateEmail, maskCNPJ, maskPhone, maskCEP } from '../utils/validators';
import { estadosBrasileiros } from '../utils/mockData';

interface CadastroPessoaJuridicaProps {
  onBack: () => void;
}

export function CadastroPessoaJuridica({ onBack }: CadastroPessoaJuridicaProps) {
  const [formData, setFormData] = useState({
    razaoSocial: '',
    nomeFantasia: '',
    cnpj: '',
    email: '',
    telefone: '',
    rua: '',
    numero: '',
    complemento: '',
    cep: '',
    cidade: '',
    estado: '',
    emitirNotaFiscal: false,
    inscricaoMunicipal: '',
    inscricaoEstadual: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cnpjValidating, setCnpjValidating] = useState(false);
  const [cnpjValidated, setCnpjValidated] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [savedCompanyName, setSavedCompanyName] = useState('');

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (typeof value === 'string') {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleCNPJChange = (value: string) => {
    const masked = maskCNPJ(value);
    handleChange('cnpj', masked);
    setCnpjValidated(false);
  };

  const handleValidateCNPJ = () => {
    setCnpjValidating(true);
    
    setTimeout(() => {
      const isValid = validateCNPJ(formData.cnpj);
      setCnpjValidating(false);
      
      if (isValid) {
        setCnpjValidated(true);
        setErrors((prev) => ({ ...prev, cnpj: '' }));
      } else {
        setErrors((prev) => ({ ...prev, cnpj: 'CNPJ inválido — verifique os dígitos.' }));
        setCnpjValidated(false);
      }
    }, 1000);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.razaoSocial.trim()) newErrors.razaoSocial = 'Campo obrigatório';
    if (!formData.cnpj.trim()) newErrors.cnpj = 'Campo obrigatório';
    else if (!cnpjValidated) newErrors.cnpj = 'Por favor, valide o CNPJ antes de salvar';
    if (!formData.email.trim()) newErrors.email = 'Campo obrigatório';
    else if (!validateEmail(formData.email)) newErrors.email = 'Email inválido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setSavedCompanyName(formData.razaoSocial);
      setShowSuccessModal(true);
    }
  };

  const handleDownloadReceipt = () => {
    // Simular download de recibo
    alert('Download do recibo iniciado (simulação)');
  };

  const handleModalClose = (action: 'download' | 'dashboard') => {
    if (action === 'download') {
      handleDownloadReceipt();
    }
    setShowSuccessModal(false);
    onBack();
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
          <h1>Cadastro de Pessoa Jurídica</h1>
          <p className="text-muted-foreground">Preencha os dados da empresa</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informações da Empresa */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Informações da Empresa</CardTitle>
              <CardDescription>Dados básicos da pessoa jurídica</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="razaoSocial">
                  Razão Social <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="razaoSocial"
                  value={formData.razaoSocial}
                  onChange={(e) => handleChange('razaoSocial', e.target.value)}
                  className={errors.razaoSocial ? 'error' : ''}
                  placeholder="Nome completo da empresa"
                />
                {errors.razaoSocial && (
                  <p className="text-destructive text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.razaoSocial}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
                <Input
                  id="nomeFantasia"
                  value={formData.nomeFantasia}
                  onChange={(e) => handleChange('nomeFantasia', e.target.value)}
                  placeholder="Nome comercial (opcional)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cnpj">
                  CNPJ <span className="text-destructive">*</span>
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="cnpj"
                    value={formData.cnpj}
                    onChange={(e) => handleCNPJChange(e.target.value)}
                    className={errors.cnpj ? 'error' : ''}
                    placeholder="00.000.000/0000-00"
                    maxLength={18}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleValidateCNPJ}
                    disabled={cnpjValidating || !formData.cnpj || cnpjValidated}
                    className="shrink-0"
                  >
                    {cnpjValidating ? (
                      <Loader2 className="w-4 h-4 spinner" />
                    ) : cnpjValidated ? (
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    ) : (
                      'Validar'
                    )}
                  </Button>
                </div>
                {errors.cnpj && (
                  <p className="text-destructive text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.cnpj}
                  </p>
                )}
                {cnpjValidated && !errors.cnpj && (
                  <p className="text-success text-sm flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    CNPJ válido
                  </p>
                )}
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
                    placeholder="contato@empresa.com"
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
                    placeholder="(00) 0000-0000"
                    maxLength={15}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configurações Fiscais */}
          <Card>
            <CardHeader>
              <CardTitle>Configurações Fiscais</CardTitle>
              <CardDescription>Emissão de notas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Emitir Nota Fiscal</Label>
                  <p className="text-sm text-muted-foreground">Habilitar emissão de NF</p>
                </div>
                <Switch
                  checked={formData.emitirNotaFiscal}
                  onCheckedChange={(checked) => handleChange('emitirNotaFiscal', checked)}
                />
              </div>

              {formData.emitirNotaFiscal && (
                <div className="space-y-4 pt-4 border-t animate-slide-up">
                  <div className="space-y-2">
                    <Label htmlFor="inscricaoMunicipal">Inscrição Municipal</Label>
                    <Input
                      id="inscricaoMunicipal"
                      value={formData.inscricaoMunicipal}
                      onChange={(e) => handleChange('inscricaoMunicipal', e.target.value)}
                      placeholder="000000000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inscricaoEstadual">Inscrição Estadual</Label>
                    <Input
                      id="inscricaoEstadual"
                      value={formData.inscricaoEstadual}
                      onChange={(e) => handleChange('inscricaoEstadual', e.target.value)}
                      placeholder="000.000.000.000"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Endereço */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Endereço</CardTitle>
              <CardDescription>Localização da empresa</CardDescription>
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
                    placeholder="Sala, Andar, etc."
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
            <DialogTitle className="text-center">Pessoa Jurídica cadastrada com sucesso!</DialogTitle>
            <DialogDescription className="text-center">
              {savedCompanyName} foi cadastrada no sistema.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => handleDownloadReceipt()}
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              Baixar Recibo
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
