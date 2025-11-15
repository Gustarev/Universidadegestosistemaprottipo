import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
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
import { AlertCircle, CheckCircle2, ArrowLeft, Upload, CreditCard, FileText, AlertTriangle } from 'lucide-react';
import { validateEmail, maskPhone, generateMatricula, formatCurrency } from '../utils/validators';
import { courses } from '../utils/mockData';

interface CadastroAlunoProps {
  onBack: () => void;
}

export function CadastroAluno({ onBack }: CadastroAlunoProps) {
  const [formData, setFormData] = useState({
    nome: '',
    matricula: '',
    email: '',
    telefone: '',
    cursoAtual: '',
    historico: '',
    frequencia: '',
    metodoPagamento: '',
    observacoes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isMatriculado, setIsMatriculado] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showCourseChangeModal, setShowCourseChangeModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showVacancyError, setShowVacancyError] = useState(false);
  const [savedStudentName, setSavedStudentName] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  // Payment form
  const [paymentForm, setPaymentForm] = useState({
    value: '1250.00',
    dueDate: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) newErrors.nome = 'Campo obrigatório';
    if (!formData.email.trim()) newErrors.email = 'Campo obrigatório';
    else if (!validateEmail(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.cursoAtual) newErrors.cursoAtual = 'Campo obrigatório';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleMatricular = () => {
    if (!validateForm()) return;

    const course = courses.find((c) => c.id === formData.cursoAtual);
    
    if (course && course.vacancies === 0) {
      setShowVacancyError(true);
      return;
    }

    // Gerar matrícula automaticamente
    const matricula = generateMatricula();
    setFormData((prev) => ({ ...prev, matricula }));
    setIsMatriculado(true);
    
    // Abrir modal de pagamento
    setShowPaymentModal(true);
  };

  const handleCreatePayment = () => {
    if (paymentForm.value && paymentForm.dueDate) {
      setShowPaymentModal(false);
      setSavedStudentName(formData.nome);
      setShowSuccessModal(true);
    }
  };

  const handleCourseChange = () => {
    if (selectedCourse && selectedCourse !== formData.cursoAtual) {
      const course = courses.find((c) => c.id === selectedCourse);
      
      if (course && course.vacancies === 0) {
        setShowVacancyError(true);
        return;
      }

      setFormData((prev) => ({ ...prev, cursoAtual: selectedCourse }));
      setShowCourseChangeModal(false);
      alert('Curso alterado com sucesso!');
    }
  };

  const handlePayMonthly = () => {
    // Simular pagamento
    alert('Redirecionando para pagamento...');
  };

  const selectedCourseData = courses.find((c) => c.id === formData.cursoAtual);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h1>Cadastro de Aluno</h1>
          <p className="text-muted-foreground">Gerenciar matrículas e informações acadêmicas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações do Aluno */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Informações do Aluno</CardTitle>
            <CardDescription>Dados pessoais e acadêmicos</CardDescription>
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
                  disabled={isMatriculado}
                />
                {errors.nome && (
                  <p className="text-destructive text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.nome}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="matricula">Matrícula</Label>
                <Input
                  id="matricula"
                  value={formData.matricula}
                  readOnly
                  placeholder="Gerada automaticamente"
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">Gerada após matricular</p>
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
                  placeholder="aluno@email.com"
                  disabled={isMatriculado}
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
                  disabled={isMatriculado}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cursoAtual">
                Curso atual <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.cursoAtual}
                onValueChange={(value) => handleChange('cursoAtual', value)}
                disabled={isMatriculado}
              >
                <SelectTrigger id="cursoAtual" className={errors.cursoAtual ? 'error' : ''}>
                  <SelectValue placeholder="Selecione o curso..." />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id} disabled={course.vacancies === 0}>
                      {course.name} - {course.code} 
                      {course.vacancies === 0 && ' (Sem vagas)'}
                      {course.vacancies > 0 && ` (${course.vacancies} vagas)`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.cursoAtual && (
                <p className="text-destructive text-sm flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.cursoAtual}
                </p>
              )}
              {selectedCourseData && (
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={selectedCourseData.vacancies > 0 ? 'default' : 'destructive'}>
                    {selectedCourseData.vacancies > 0
                      ? `${selectedCourseData.vacancies} vagas disponíveis`
                      : 'Sem vagas'}
                  </Badge>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequencia">Frequência (%)</Label>
              <Input
                id="frequencia"
                type="number"
                min="0"
                max="100"
                value={formData.frequencia}
                onChange={(e) => handleChange('frequencia', e.target.value)}
                placeholder="Ex: 85"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="metodoPagamento">Método de pagamento preferido</Label>
              <Select
                value={formData.metodoPagamento}
                onValueChange={(value) => handleChange('metodoPagamento', value)}
              >
                <SelectTrigger id="metodoPagamento">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="boleto">Boleto Bancário</SelectItem>
                  <SelectItem value="cartao">Cartão de Crédito</SelectItem>
                  <SelectItem value="pix">PIX</SelectItem>
                  <SelectItem value="debito">Débito Automático</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => handleChange('observacoes', e.target.value)}
                placeholder="Informações adicionais sobre o aluno..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Ações e Status */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
              <CardDescription>Situação da matrícula</CardDescription>
            </CardHeader>
            <CardContent>
              {isMatriculado ? (
                <Badge className="w-full justify-center py-2 bg-success">Matriculado</Badge>
              ) : (
                <Badge variant="outline" className="w-full justify-center py-2">Não Matriculado</Badge>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ações</CardTitle>
              <CardDescription>Gerenciar aluno</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {!isMatriculado ? (
                <Button
                  type="button"
                  className="w-full bg-[#1E6FF0] hover:bg-[#1557C0]"
                  onClick={handleMatricular}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Matricular
                </Button>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setShowHistoryModal(true)}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Consultar Histórico
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start"
                    onClick={handlePayMonthly}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Pagar Mensalidade
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setShowCourseChangeModal(true)}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Trocar Curso
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Histórico Escolar</CardTitle>
              <CardDescription>Upload de documentos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                <input
                  type="file"
                  id="history-upload"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                />
                <label htmlFor="history-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {uploadedFile ? uploadedFile.name : 'Clique para fazer upload'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">PDF ou imagem</p>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Voltar
        </Button>
      </div>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gerar Pagamento</DialogTitle>
            <DialogDescription>Configure o pagamento da primeira mensalidade</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Valor da Mensalidade (R$)</Label>
              <Input
                type="number"
                step="0.01"
                value={paymentForm.value}
                onChange={(e) => setPaymentForm({ ...paymentForm, value: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Data de Vencimento</Label>
              <Input
                type="date"
                value={paymentForm.dueDate}
                onChange={(e) => setPaymentForm({ ...paymentForm, dueDate: e.target.value })}
              />
            </div>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Um registro de pagamento pendente será criado no sistema.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreatePayment} className="bg-[#1E6FF0] hover:bg-[#1557C0]">
              Criar Pagamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Course Change Modal */}
      <Dialog open={showCourseChangeModal} onOpenChange={setShowCourseChangeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Trocar Curso</DialogTitle>
            <DialogDescription>Selecione o novo curso para o aluno</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Curso Atual</Label>
              <Input value={selectedCourseData?.name || ''} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>Novo Curso</Label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o novo curso..." />
                </SelectTrigger>
                <SelectContent>
                  {courses
                    .filter((c) => c.id !== formData.cursoAtual)
                    .map((course) => (
                      <SelectItem key={course.id} value={course.id} disabled={course.vacancies === 0}>
                        {course.name} - {course.vacancies > 0 ? `${course.vacancies} vagas` : 'Sem vagas'}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCourseChangeModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCourseChange} className="bg-[#1E6FF0] hover:bg-[#1557C0]">
              Confirmar Troca
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Vacancy Error Modal */}
      <Dialog open={showVacancyError} onOpenChange={setShowVacancyError}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-destructive" />
              </div>
            </div>
            <DialogTitle className="text-center">Vaga indisponível</DialogTitle>
            <DialogDescription className="text-center">
              O curso selecionado não possui vagas disponíveis no momento.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowVacancyError(false)} className="w-full">
              Entendi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* History Modal */}
      <Dialog open={showHistoryModal} onOpenChange={setShowHistoryModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Histórico Escolar</DialogTitle>
            <DialogDescription>Consulta de notas e desempenho</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Histórico detalhado do aluno será exibido aqui.
            </p>
            {uploadedFile && (
              <div className="p-4 bg-muted rounded">
                <p className="text-sm">Arquivo: {uploadedFile.name}</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setShowHistoryModal(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-success" />
              </div>
            </div>
            <DialogTitle className="text-center">Aluno matriculado com sucesso!</DialogTitle>
            <DialogDescription className="text-center">
              {savedStudentName} foi matriculado no curso de {selectedCourseData?.name}.
              <br />
              Matrícula: <strong>{formData.matricula}</strong>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => { setShowSuccessModal(false); onBack(); }} className="w-full bg-[#1E6FF0] hover:bg-[#1557C0]">
              Voltar ao Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
