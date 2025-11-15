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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { AlertCircle, CheckCircle2, ArrowLeft, Plus, Trash2, FileText, DollarSign, Loader2 } from 'lucide-react';
import { validateCNPJ, validateEmail, maskCNPJ, maskPhone, maskCEP, formatCurrency } from '../utils/validators';
import { estadosBrasileiros, mockContracts, type Product } from '../utils/mockData';

interface CadastroFornecedorProps {
  onBack: () => void;
}

export function CadastroFornecedor({ onBack }: CadastroFornecedorProps) {
  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
    email: '',
    telefone: '',
    rua: '',
    numero: '',
    complemento: '',
    cep: '',
    cidade: '',
    estado: '',
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [contracts, setContracts] = useState(mockContracts);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cnpjValidating, setCnpjValidating] = useState(false);
  const [cnpjValidated, setCnpjValidated] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showContractModal, setShowContractModal] = useState(false);
  const [savedSupplierName, setSavedSupplierName] = useState('');

  // Product form
  const [productForm, setProductForm] = useState({ name: '', price: '', stock: '' });
  
  // Invoice form
  const [invoiceForm, setInvoiceForm] = useState({ value: '', date: '', department: '' });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
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

  const handleAddProduct = () => {
    if (productForm.name && productForm.price && productForm.stock) {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: productForm.name,
        price: parseFloat(productForm.price),
        stock: parseInt(productForm.stock),
      };
      setProducts([...products, newProduct]);
      setProductForm({ name: '', price: '', stock: '' });
      setShowProductModal(false);
    }
  };

  const handleRemoveProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleSendInvoice = () => {
    if (invoiceForm.value && invoiceForm.date && invoiceForm.department) {
      // Simular envio de fatura
      setShowInvoiceModal(false);
      alert('Fatura enviada com sucesso!');
      setInvoiceForm({ value: '', date: '', department: '' });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) newErrors.nome = 'Campo obrigatório';
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
      setSavedSupplierName(formData.nome);
      setShowSuccessModal(true);
    }
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
          <h1>Cadastro de Fornecedor</h1>
          <p className="text-muted-foreground">Gerenciar fornecedores, produtos e contratos</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informações do Fornecedor */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Informações do Fornecedor</CardTitle>
              <CardDescription>Dados básicos da empresa fornecedora</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">
                  Nome do Fornecedor <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
                  className={errors.nome ? 'error' : ''}
                  placeholder="Nome da empresa"
                />
                {errors.nome && (
                  <p className="text-destructive text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.nome}
                  </p>
                )}
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
                    placeholder="contato@fornecedor.com"
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

          {/* Ações Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle>Ações</CardTitle>
              <CardDescription>Gerenciar produtos e faturas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start"
                onClick={() => setShowProductModal(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Registrar Produto
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start"
                onClick={() => setShowInvoiceModal(true)}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Enviar Fatura
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start"
                onClick={() => setShowContractModal(true)}
              >
                <FileText className="w-4 h-4 mr-2" />
                Novo Contrato
              </Button>
            </CardContent>
          </Card>

          {/* Produtos */}
          {products.length > 0 && (
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Produtos Cadastrados</CardTitle>
                <CardDescription>Lista de produtos oferecidos pelo fornecedor</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Preço</TableHead>
                      <TableHead>Estoque</TableHead>
                      <TableHead className="w-20"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{formatCurrency(product.price)}</TableCell>
                        <TableCell>{product.stock} unidades</TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveProduct(product.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* Contratos */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Contratos</CardTitle>
              <CardDescription>Contratos ativos, inativos e pendentes</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell>{contract.name}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            contract.status === 'Ativo'
                              ? 'default'
                              : contract.status === 'Pendente'
                              ? 'secondary'
                              : 'outline'
                          }
                        >
                          {contract.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatCurrency(contract.value)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button type="button" variant="outline" size="sm">
                            Renovar
                          </Button>
                          <Button type="button" variant="outline" size="sm">
                            Cancelar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Endereço */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Endereço</CardTitle>
              <CardDescription>Localização do fornecedor</CardDescription>
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
                    placeholder="Sala, Galpão, etc."
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
            Salvar Fornecedor
          </Button>
        </div>
      </form>

      {/* Product Modal */}
      <Dialog open={showProductModal} onOpenChange={setShowProductModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Produto</DialogTitle>
            <DialogDescription>Cadastre um novo produto do fornecedor</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nome do Produto</Label>
              <Input
                value={productForm.name}
                onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                placeholder="Ex: Livro de Matemática"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Preço (R$)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label>Estoque</Label>
                <Input
                  type="number"
                  value={productForm.stock}
                  onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowProductModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddProduct} className="bg-[#1E6FF0] hover:bg-[#1557C0]">
              Adicionar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invoice Modal */}
      <Dialog open={showInvoiceModal} onOpenChange={setShowInvoiceModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enviar Fatura</DialogTitle>
            <DialogDescription>Crie uma nova fatura para o fornecedor</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Valor (R$)</Label>
              <Input
                type="number"
                step="0.01"
                value={invoiceForm.value}
                onChange={(e) => setInvoiceForm({ ...invoiceForm, value: e.target.value })}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label>Data de Vencimento</Label>
              <Input
                type="date"
                value={invoiceForm.date}
                onChange={(e) => setInvoiceForm({ ...invoiceForm, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Curso/Centro Solicitante</Label>
              <Input
                value={invoiceForm.department}
                onChange={(e) => setInvoiceForm({ ...invoiceForm, department: e.target.value })}
                placeholder="Ex: Engenharia"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInvoiceModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSendInvoice} className="bg-[#1E6FF0] hover:bg-[#1557C0]">
              Enviar Fatura
            </Button>
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
            <DialogTitle className="text-center">Fornecedor cadastrado com sucesso!</DialogTitle>
            <DialogDescription className="text-center">
              {savedSupplierName} foi cadastrado no sistema.
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
