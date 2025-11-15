import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { AlertCircle, CheckCircle2, ArrowLeft, Upload, X, FileText } from 'lucide-react';
import { validateEmail, maskPhone, maskCEP } from '../utils/validators';
import { estadosBrasileiros, disciplines } from '../utils/mockData';

interface CadastroProfessorProps {
  onBack: () => void;
}

export function CadastroProfessor({ onBack }: CadastroProfessorProps) {
  const [formData, setFormData] = useState({
    nome: '',
    siape: '',
    email: '',
    telefone: '',
    cargaHoraria: '',
    rua: '',
    numero: '',
    complemento: '',
    cep: '',
    cidade: '',
    estado: '',
  });

  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);
  const [disciplineSearch, setDisciplineSearch] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [savedProfessorName, setSavedProfessorName] = useState('');
  const [professorId, setProfessorId] = useState('');

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleAddDiscipline = (discipline: string) => {
    if (!selectedDisciplines.includes(discipline)) {
      setSelectedDisciplines([...selectedDisciplines, discipline]);
    }
    setDisciplineSearch('');
  };

  const handleRemoveDiscipline = (discipline: string) => {
    setSelectedDisciplines(selectedDisciplines.filter((d) => d !== discipline));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setAttachedFiles([...attachedFiles, ...Array.from(files)]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setAttachedFiles(attachedFiles.filter((_, i) => i !== index));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) newErrors.nome = 'Campo obrigatório';
    if (!formData.siape.trim()) newErrors.siape = 'Campo obrigatório';
    if (!formData.email.trim()) newErrors.email = 'Campo obrigatório';
    else if (!validateEmail(formData.email)) newErrors.email = 'Email inválido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setSavedProfessorName(formData.nome);
      setProfessorId(`PROF${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`);
      setShowSuccessModal(true);
    }
  };

  const handleModalAction = (action: string) => {
    setShowSuccessModal(false);
    if (action === 'dashboard') {
      onBack();
    }
    // Implementar ações de atribuir curso e gerar relatório
  };

  const filteredDisciplines = disciplines.filter(
    (d) =>
      d.toLowerCase().includes(disciplineSearch.toLowerCase()) &&
      !selectedDisciplines.includes(d)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h1>Cadastro de Professor</h1>
          <p className="text-muted-foreground">Preencha os dados do professor</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informações Pessoais */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Informações do Professor</CardTitle>
              <CardDescription>Dados básicos e profissionais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                <div className="space-y-2">
                  <Label htmlFor="siape">
                    SIAPE / Código <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="siape"
                    value={formData.siape}
                    onChange={(e) => handleChange('siape', e.target.value)}
                    className={errors.siape ? 'error' : ''}
                    placeholder="000000"
                  />
                  {errors.siape && (
                    <p className="text-destructive text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.siape}
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
                    placeholder="professor@universidade.br"
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

              <div className="space-y-2">
                <Label htmlFor="cargaHoraria">Carga horária semanal</Label>
                <Input
                  id="cargaHoraria"
                  type="number"
                  value={formData.cargaHoraria}
                  onChange={(e) => handleChange('cargaHoraria', e.target.value)}
                  placeholder="40"
                  min="0"
                  max="60"
                />
              </div>
            </CardContent>
          </Card>

          {/* Disciplinas e Documentos */}
          <Card>
            <CardHeader>
              <CardTitle>Disciplinas e Documentos</CardTitle>
              <CardDescription>Adicione disciplinas e anexos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Disciplinas</Label>
                <Select value={disciplineSearch} onValueChange={handleAddDiscipline}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione disciplinas..." />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredDisciplines.map((discipline) => (
                      <SelectItem key={discipline} value={discipline}>
                        {discipline}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedDisciplines.map((discipline) => (
                    <Badge key={discipline} variant="secondary" className="pr-1">
                      {discipline}
                      <button
                        type="button"
                        onClick={() => handleRemoveDiscipline(discipline)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Anexar documentos</Label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Clique para fazer upload
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">PDF ou JPG</p>
                  </label>
                </div>
                {attachedFiles.length > 0 && (
                  <div className="space-y-2 mt-2">
                    {attachedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <span className="text-sm truncate">{file.name}</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFile(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Endereço */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Endereço (Opcional)</CardTitle>
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
            Registrar Professor
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
            <DialogTitle className="text-center">Professor cadastrado com sucesso!</DialogTitle>
            <DialogDescription className="text-center">
              {savedProfessorName} foi cadastrado no sistema com ID: {professorId}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => handleModalAction('course')} className="flex-1">
              Atribuir curso
            </Button>
            <Button variant="outline" onClick={() => handleModalAction('report')} className="flex-1">
              Gerar relatório
            </Button>
            <Button onClick={() => handleModalAction('dashboard')} className="flex-1 bg-[#1E6FF0] hover:bg-[#1557C0]">
              Voltar ao Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
