import React, { useState } from 'react';
import {
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';
import type { FormData, FormErrors } from '../types';
import {
  formatCpf,
  formatCnpj,
  formatPhone,
  formatAgency,
  formatAccount,
  validateCpf,
  validateCnpj,
  validateEmail,
  validatePhone,
  validateAccount,
} from '../utils/formatters';
import { getErrorMessages, isValidImage } from '../utils/formHelpers';
import { compressImage, fileToBase64 } from '../utils/imageUtils';
import { fieldStyles, selectFieldStyles, labelProps } from '../styles/formStyles';
import config from '../config/index';
import './EssencialForm.css';

// Importação dos componentes das etapas
import PersonalInfoStep from './FormSteps/PersonalInfoStep';
import BankingStep from './FormSteps/BankingStep';
import DocumentsStep from './FormSteps/DocumentsStep';
import ConsentStep from './FormSteps/ConsentStep';

const UserForm: React.FC = () => {
  // Gerar CPF válido aleatório para teste
  const generateValidCPF = (): string => {
    // Função para gerar CPF válido
    const generateCPF = () => {
      // Gerar os 9 primeiros dígitos
      const digits = [];
      for (let i = 0; i < 9; i++) {
        digits.push(Math.floor(Math.random() * 10));
      }
      
      // Calcular primeiro dígito verificador
      let sum1 = 0;
      for (let i = 0; i < 9; i++) {
        sum1 += digits[i] * (10 - i);
      }
      const digit1 = sum1 % 11 < 2 ? 0 : 11 - (sum1 % 11);
      digits.push(digit1);
      
      // Calcular segundo dígito verificador
      let sum2 = 0;
      for (let i = 0; i < 10; i++) {
        sum2 += digits[i] * (11 - i);
      }
      const digit2 = sum2 % 11 < 2 ? 0 : 11 - (sum2 % 11);
      digits.push(digit2);
      
      return digits.join('');
    };
    
    return formatCpf(generateCPF());
  };

  const [formData, setFormData] = useState<FormData>({
    // Informações de contato - OBRIGATÓRIAS - PRÉ-PREENCHIDAS PARA TESTE
    fullName: 'João Silva Santos',
    phone: '(11) 99999-9999',
    // Informações pessoais básicas - PRÉ-PREENCHIDAS PARA TESTE
    accountCategory: 'pessoa_fisica',
    cpf: generateValidCPF(),
    cnpj: '',
    email: 'joao.silva@email.com',
    state: 'São Paulo',
    // Endereço - PRÉ-PREENCHIDAS PARA TESTE
    cep: '01234-567',
    city: 'São Paulo',
    neighborhood: 'Centro',
    street: 'Rua das Flores',
    number: '123',
    complement: 'Apto 45',
    // Dados bancários - ATIVOS - PRÉ-PREENCHIDOS PARA TESTE
    bankName: 'Banco do Brasil',
    accountType: 'corrente',
    agency: '1234',
    account: '567890-1',
    // Documentos - ATIVOS
    documentType: 'RG',
    documentFront: null,
    documentBack: null,
    selfie: null,
    residenceProof: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showValidationAlert, setShowValidationAlert] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');

  const handleDocumentTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDocumentType = event.target.value;
    setFormData(prev => ({
      ...prev,
      documentType: newDocumentType,
      documentFront: null,
      documentBack: null,
      selfie: null,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Apply formatting based on field
    switch (name) {
      case 'cpf':
        formattedValue = formatCpf(value);
        break;
      case 'cnpj':
        formattedValue = formatCnpj(value);
        break;
      case 'phone':
        formattedValue = formatPhone(value);
        break;
      case 'agency':
        formattedValue = formatAgency(value);
        break;
      case 'account':
        formattedValue = formatAccount(value);
        break;
      case 'fullName':
        formattedValue = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
        break;
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }

    // Hide validation alert when user starts fixing errors
    if (showValidationAlert) {
      setShowValidationAlert(false);
    }
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user selects a value
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }

    // Hide validation alert when user starts fixing errors
    if (showValidationAlert) {
      setShowValidationAlert(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      
      console.log(`📁 File selected - Name: ${name}, Size: ${(file.size / 1024 / 1024).toFixed(2)}MB, Type: ${file.type}`);
      console.log(`📁 File details:`, {
        name: file.name,
        lastModified: file.lastModified,
        size: file.size,
        type: file.type
      });
      
      // Para documentos, só aceita imagens
      if (name === 'documentFront' || name === 'documentBack' || name === 'selfie') {
        if (!isValidImage(file)) {
          console.error('❌ Invalid image type:', file.type);
          alert('Por favor, selecione uma imagem válida (PNG, JPG, JPEG, WEBP).');
          return;
        }
        
        try {
          console.log('🔄 Starting image compression...');
          setLoading(true);
          
          // Comprimir a imagem com limite menor para evitar erro do backend
          const compressedFile = await compressImage(file, 3); // Máximo 3MB
          console.log(`✅ Image compressed successfully - New size: ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`);
          
          // Criar um novo arquivo com nome adequado se necessário
          let finalFile = compressedFile;
          
          // Para selfies ou arquivos sem nome adequado, criar um nome descritivo
          if (name === 'selfie' && (!compressedFile.name || compressedFile.name === 'blob' || compressedFile.name === 'image.jpg')) {
            const timestamp = new Date().getTime();
            const fileExtension = compressedFile.type.split('/')[1] || 'jpg';
            finalFile = new File([compressedFile], `selfie_${timestamp}.${fileExtension}`, {
              type: compressedFile.type,
              lastModified: Date.now(),
            });
            console.log('📝 Renamed selfie file to:', finalFile.name);
          }
          
          // Para documentos sem nome adequado
          if ((name === 'documentFront' || name === 'documentBack') && (!compressedFile.name || compressedFile.name === 'blob' || compressedFile.name === 'image.jpg')) {
            const timestamp = new Date().getTime();
            const fileExtension = compressedFile.type.split('/')[1] || 'jpg';
            const docType = name === 'documentFront' ? 'frente' : 'verso';
            finalFile = new File([compressedFile], `documento_${docType}_${timestamp}.${fileExtension}`, {
              type: compressedFile.type,
              lastModified: Date.now(),
            });
            console.log(`📝 Renamed ${name} file to:`, finalFile.name);
          }
          
          console.log('📎 Final file details:', {
            name: finalFile.name,
            size: finalFile.size,
            type: finalFile.type,
            lastModified: finalFile.lastModified
          });
          
          setFormData(prev => ({
            ...prev,
            [name]: finalFile,
          }));
          
        } catch (error) {
          console.error('❌ Error compressing image:', error);
          alert('Erro ao processar a imagem. Por favor, tente novamente.');
          return;
        } finally {
          setLoading(false);
        }
      } else {
        // Para comprovante de residência, aceita PDF também
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
          console.error('❌ Invalid file type for residence proof:', file.type);
          setErrors(prev => ({
            ...prev,
            [name]: 'Apenas arquivos PNG, JPG, JPEG, WEBP ou PDF são permitidos',
          }));
          return;
        }
        
        // Validar tamanho do arquivo (máximo 5MB para evitar erro do backend)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
          console.error('❌ File too large:', (file.size / 1024 / 1024).toFixed(2), 'MB');
          
          // Se for uma imagem, tentar comprimir
          if (file.type.startsWith('image/')) {
            try {
              console.log('🔄 Compressing residence proof image...');
              setLoading(true);
              const compressedFile = await compressImage(file, 3);
              console.log(`✅ Residence proof compressed - New size: ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`);
              
              setFormData(prev => ({
                ...prev,
                [name]: compressedFile,
              }));
              setLoading(false);
              return;
            } catch (error) {
              console.error('❌ Error compressing residence proof:', error);
              setLoading(false);
            }
          }
          
          setErrors(prev => ({
            ...prev,
            [name]: 'Arquivo muito grande. Máximo 5MB.',
          }));
          return;
        }
        
        // Criar nome adequado para comprovante de residência se necessário
        let finalFile = file;
        if (!file.name || file.name === 'blob' || file.name === 'document.pdf') {
          const timestamp = new Date().getTime();
          const fileExtension = file.type === 'application/pdf' ? 'pdf' : file.type.split('/')[1] || 'jpg';
          finalFile = new File([file], `comprovante_residencia_${timestamp}.${fileExtension}`, {
            type: file.type,
            lastModified: Date.now(),
          });
          console.log('📝 Renamed residence proof file to:', finalFile.name);
        }
        
        setFormData(prev => ({
          ...prev,
          [name]: finalFile,
        }));
      }

      // Clear error when user selects a valid file
      if (errors[name as keyof FormErrors]) {
        setErrors(prev => ({
          ...prev,
          [name]: undefined,
        }));
      }

      // Hide validation alert when user starts fixing errors
      if (showValidationAlert) {
        setShowValidationAlert(false);
      }
    }
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    // Validação do celular - OBRIGATÓRIO
    if (!formData.phone) {
      newErrors.phone = 'Celular é obrigatório';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Celular inválido';
    }

    // Validação do nome completo - OBRIGATÓRIO
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nome completo é obrigatório';
    }

    // Validação do tipo de conta - OBRIGATÓRIO
    if (!formData.accountCategory) {
      newErrors.accountCategory = 'Selecione o tipo de conta';
    }

    // Validação CPF/CNPJ baseada no tipo de conta selecionado
    if (formData.accountCategory === 'pessoa_fisica') {
      if (!formData.cpf) {
        newErrors.cpf = 'CPF é obrigatório';
      } else if (!validateCpf(formData.cpf)) {
        newErrors.cpf = 'CPF inválido';
      }
    } else if (formData.accountCategory === 'pessoa_juridica') {
      if (!formData.cnpj) {
        newErrors.cnpj = 'CNPJ é obrigatório';
      } else if (!validateCnpj(formData.cnpj)) {
        newErrors.cnpj = 'CNPJ inválido';
      }
    }

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'Estado é obrigatório';
    }

    // Validação dos dados bancários - ATIVO
    if (!formData.bankName.trim()) {
      newErrors.bankName = 'Nome do banco é obrigatório';
    }

    if (!formData.accountType) {
      newErrors.accountType = 'Tipo de conta é obrigatório';
    }

    if (!formData.agency.trim()) {
      newErrors.agency = 'Agência é obrigatória';
    }

    if (!formData.account.trim()) {
      newErrors.account = 'Conta é obrigatória';
    } else if (!validateAccount(formData.account)) {
      newErrors.account = 'Conta deve ter entre 6 e 7 dígitos';
    }

    // Validação dos documentos - ATIVO
    if (formData.documentType === 'RG') {
      if (!formData.documentFront) {
        newErrors.documentFront = 'Obrigatório enviar a frente do RG';
      }
      if (!formData.documentBack) {
        newErrors.documentBack = 'Obrigatório enviar o verso do RG';
      }
    } else if (formData.documentType === 'CNH') {
      if (!formData.documentFront) {
        newErrors.documentFront = 'Obrigatório enviar a foto da CNH';
      }
    }

    if (!formData.residenceProof) {
      newErrors.residenceProof = 'Comprovante de residência é obrigatório';
    }

    // Validação da selfie (obrigatória para ambos os tipos de documento) - ATIVO
    if (!formData.selfie) {
      newErrors.selfie = 'Selfie é obrigatória';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('📋 Form submission started');
    console.log('📊 Form data overview:', {
      hasFullName: !!formData.fullName,
      hasPhone: !!formData.phone,
      hasEmail: !!formData.email,
      hasCpf: !!formData.cpf,
      hasDocumentFront: !!formData.documentFront,
      hasDocumentBack: !!formData.documentBack,
      hasSelfie: !!formData.selfie,
      hasResidenceProof: !!formData.residenceProof,
      documentType: formData.documentType
    });
    
    const validationErrors = validateForm();
    
    // Verificar se o consentimento foi aceito
    if (!consentAccepted) {
      validationErrors.consent = 'Você deve aceitar os termos de uso e política de privacidade';
    }
    
    if (Object.keys(validationErrors).length > 0) {
      console.error('❌ Validation errors found:', validationErrors);
      setErrors(validationErrors);
      setShowValidationAlert(true);
      // Scroll to top to show the error alert
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    console.log('✅ Validation passed, proceeding with submission');
    setShowValidationAlert(false);
    setLoading(true);
    setUploadProgress('Preparando envio...');
    
    try {
      // Verificar conectividade antes de enviar
      console.log('🌐 Checking network connectivity...');
      console.log('🌐 Navigator online:', navigator.onLine);
      console.log('🌐 Connection type:', (navigator as any).connection?.effectiveType || 'unknown');
      
      setUploadProgress('Organizando dados...');
      
      // Criar FormData para enviar arquivos junto com os dados
      const formDataToSend = new FormData();
      
      console.log('📦 Building FormData...');
      
      // Adicionar todos os campos de texto
      // Celular - OBRIGATÓRIO
      formDataToSend.append('phone', formData.phone);
      
      // Nome completo - OBRIGATÓRIO
      formDataToSend.append('fullName', formData.fullName);
      
      // Informações pessoais básicas - ATIVO
      formDataToSend.append('accountCategory', formData.accountCategory);
      formDataToSend.append('cpf', formData.cpf);
      formDataToSend.append('cnpj', formData.cnpj || '');
      formDataToSend.append('email', formData.email);
      formDataToSend.append('state', formData.state);
      
      // Dados bancários - ATIVOS
      formDataToSend.append('bankName', formData.bankName);
      formDataToSend.append('accountType', formData.accountType);
      formDataToSend.append('agency', formData.agency);
      formDataToSend.append('account', formData.account);
      
      // Documentos - ATIVOS
      formDataToSend.append('documentType', formData.documentType);
      
      // Calcular tamanho total dos arquivos
      let totalFileSize = 0;
      
      // Adicionar arquivos se existirem
      if (formData.documentFront) {
        // Garantir que o arquivo tem um nome adequado
        const file = formData.documentFront;
        const fileName = file.name || `documento_frente_${Date.now()}.jpg`;
        const finalFile = new File([file], fileName, { type: file.type });
        
        formDataToSend.append('documentFront', finalFile, fileName);
        totalFileSize += finalFile.size;
        console.log('📎 Document front added:', fileName, `(${(finalFile.size / 1024 / 1024).toFixed(2)}MB)`);
      }
      if (formData.documentBack) {
        // Garantir que o arquivo tem um nome adequado
        const file = formData.documentBack;
        const fileName = file.name || `documento_verso_${Date.now()}.jpg`;
        const finalFile = new File([file], fileName, { type: file.type });
        
        formDataToSend.append('documentBack', finalFile, fileName);
        totalFileSize += finalFile.size;
        console.log('📎 Document back added:', fileName, `(${(finalFile.size / 1024 / 1024).toFixed(2)}MB)`);
      }
      if (formData.residenceProof) {
        // Garantir que o arquivo tem um nome adequado
        const file = formData.residenceProof;
        const extension = file.type === 'application/pdf' ? 'pdf' : 'jpg';
        const fileName = file.name || `comprovante_residencia_${Date.now()}.${extension}`;
        const finalFile = new File([file], fileName, { type: file.type });
        
        formDataToSend.append('residenceProof', finalFile, fileName);
        totalFileSize += finalFile.size;
        console.log('📎 Residence proof added:', fileName, `(${(finalFile.size / 1024 / 1024).toFixed(2)}MB)`);
      }
      if (formData.selfie) {
        // Garantir que o arquivo tem um nome adequado - CRÍTICO PARA SELFIES DO CELULAR
        const file = formData.selfie;
        const fileName = file.name || `selfie_${Date.now()}.jpg`;
        const finalFile = new File([file], fileName, { 
          type: file.type || 'image/jpeg',
          lastModified: Date.now()
        });
        
        formDataToSend.append('selfie', finalFile, fileName);
        totalFileSize += finalFile.size;
        console.log('📎 Selfie added:', fileName, `(${(finalFile.size / 1024 / 1024).toFixed(2)}MB)`);
        console.log('📎 Selfie metadata:', {
          name: finalFile.name,
          type: finalFile.type,
          size: finalFile.size,
          lastModified: finalFile.lastModified
        });
      }
      
      console.log('� Total payload size:', (totalFileSize / 1024 / 1024).toFixed(2), 'MB');
      console.log('�🚀 Sending request to backend...');
      console.log('🔗 API URL:', `${config.apiUrl}/api/users`);
      
      // Configurar timeout e retry para mobile
      // Debug: Listar todos os dados que serão enviados
      console.log('📋 FormData contents:');
      for (const [key, value] of formDataToSend.entries()) {
        if (value instanceof File) {
          console.log(`  ${key}: File(${value.name}, ${(value.size / 1024).toFixed(1)}KB, ${value.type})`);
        } else {
          console.log(`  ${key}: ${value}`);
        }
      }
      
      setUploadProgress('Conectando com servidor...');
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 segundos timeout
      
      try {
        // Enviar dados para o backend
        const response = await fetch(`${config.apiUrl}/api/users`, {
          method: 'POST',
          body: formDataToSend,
          signal: controller.signal,
          // Headers específicos para melhorar compatibilidade mobile
          headers: {
            'Accept': 'application/json',
          },
        });

        clearTimeout(timeoutId);
        setUploadProgress('Processando resposta...');
        console.log('📡 Response received - Status:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ HTTP Error:', response.status, errorText);
          
          // Log mais detalhado para diferentes tipos de erro
          if (response.status === 500) {
            console.error('❌ Server Error 500 - Backend internal error');
            console.error('❌ This usually means there is an issue processing the files or data on the server');
            
            // Verificar se é erro de tamanho de arquivo
            if (errorText.includes('File too large') || errorText.includes('MulterError')) {
              throw new Error('Erro: Um ou mais arquivos são muito grandes para o servidor. Tente reduzir o tamanho das imagens.');
            }
          } else if (response.status === 413) {
            console.error('❌ Payload Too Large - Files too big');
            throw new Error('Erro: Arquivos muito grandes. Reduza o tamanho das imagens e tente novamente.');
          } else if (response.status === 400) {
            console.error('❌ Bad Request - Invalid data format');
          }
          
          throw new Error(`Erro HTTP: ${response.status} - ${errorText}`);
        }

        const result = await response.json();
        console.log('✅ Success! User and documents created:', result);
        setUploadProgress('Concluído com sucesso!');
        setSubmitted(true);
        
      } catch (fetchError) {
        clearTimeout(timeoutId);
        
        if (fetchError instanceof Error && fetchError.name === 'AbortError') {
          console.error('⏰ Request timeout after 60 seconds');
          setUploadProgress('Tempo esgotado - tente novamente');
          throw new Error('Timeout: A requisição demorou muito para ser processada. Verifique sua conexão e tente novamente.');
        }
        
        throw fetchError;
      }
      
    } catch (error) {
      console.error('❌ Error submitting form:', error);
      console.error('❌ Error details:', {
        name: error instanceof Error ? error.name : 'unknown',
        message: error instanceof Error ? error.message : 'unknown',
        stack: error instanceof Error ? error.stack : 'unknown'
      });
      
      let errorMessage = 'Erro desconhecido';
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = 'Erro de conexão. Verifique sua internet e tente novamente.';
      } else if (error instanceof Error && error.name === 'AbortError') {
        errorMessage = 'Timeout: A requisição demorou muito. Tente novamente.';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setUploadProgress('Erro no envio');
      alert(`Erro ao enviar formulário: ${errorMessage}`);
    } finally {
      setLoading(false);
      setUploadProgress('');
    }
  };

  if (submitted) {
    return (
      <Paper
        elevation={0}
        sx={{ 
          maxWidth: '500px',
          margin: '0 auto',
          backgroundColor: '#ffffff', 
          borderRadius: '20px', 
          padding: '48px 32px', 
          boxShadow: '0 12px 32px rgba(0, 51, 255, 0.08), 0 2px 16px rgba(0, 51, 255, 0.04)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #4CAF50 0%, #66BB6A 100%)',
            borderRadius: '20px 20px 0 0',
          },
          '@media (max-width:600px)': {
            margin: '0 16px',
            padding: '40px 24px',
          },
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: 3,
        }}>
          <Box sx={{
            width: '80px',
            height: '80px',
            backgroundColor: '#4CAF50',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            color: 'white',
            fontWeight: 'bold',
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.1)' },
              '100%': { transform: 'scale(1)' },
            },
          }}>
            ✓
          </Box>
          
          <Box>
            <Typography variant="h4" sx={{ 
              color: '#4CAF50',
              fontWeight: 700,
              mb: 2,
              fontSize: '2rem',
            }}>
              Enviado com Sucesso!
            </Typography>
            <Typography variant="body1" sx={{ 
              color: '#666',
              fontSize: '1.1rem',
              mb: 3,
              lineHeight: 1.6,
            }}>
              Seu cadastro para maquininha foi enviado com sucesso! 
              Nossa equipe irá analisar seus dados e sua maquininha será enviada em breve.
            </Typography>
          </Box>

          <Box sx={{
            width: '100%',
            p: 3,
            backgroundColor: '#F1F8E9',
            borderRadius: '12px',
            border: '1px solid rgba(76, 175, 80, 0.2)',
          }}>
            <Typography variant="body2" sx={{ 
              color: '#388E3C',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}>
              <Box sx={{ 
                width: '16px', 
                height: '16px', 
                backgroundColor: '#4CAF50',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                color: 'white',
                fontWeight: 'bold',
              }}>
                ✓
              </Box>
              Sua maquininha está a caminho!
            </Typography>
          </Box>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      className="essencial-form"
      sx={{
        backgroundColor: '#FFFFFF',
        color: '#0033ff',
        padding: '40px 32px',
        borderRadius: '20px',
        boxShadow: '0 12px 32px rgba(0, 51, 255, 0.08), 0 2px 16px rgba(0, 51, 255, 0.04)',
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #0033ff 0%, #0056FF 50%, #0033ff 100%)',
          borderRadius: '20px 20px 0 0',
        },
        '@media (max-width:600px)': {
          margin: '0 16px',
          padding: '32px 24px',
          borderRadius: '16px',
        },
      }}
    >
      <Box sx={{ 
        textAlign: 'center', 
        mb: 4,
        position: 'relative',
      }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            color: '#0033ff', 
            fontWeight: 700,
            fontSize: '2.2rem',
            mb: 1,
            background: 'linear-gradient(135deg, #0033ff 0%, #0056FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            '@media (max-width:600px)': {
              fontSize: '1.8rem',
            },
          }}
        >
          Sua Maquininha Está Quase Pronta!
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#666',
            fontSize: '1rem',
            fontWeight: 400,
            mb: 2,
          }}
        >
          Complete seu cadastro e receba sua maquininha de cartão em casa
        </Typography>
        <Box sx={{
          width: '60px',
          height: '3px',
          background: 'linear-gradient(90deg, #0033ff 0%, #0056FF 100%)',
          borderRadius: '2px',
          margin: '0 auto',
        }} />
      </Box>

      {showValidationAlert && (
        <Alert 
          severity="error" 
          sx={{ 
            mt: 2, 
            mb: 3, 
            background: 'linear-gradient(135deg, #FFEBEE 0%, #FCE4EC 100%)', 
            color: '#C62828', 
            border: '1px solid rgba(198, 40, 40, 0.2)', 
            fontWeight: 500, 
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(198, 40, 40, 0.08)',
            padding: '16px 20px',
            '& .MuiAlert-icon': {
              color: '#C62828',
              fontSize: '1.5rem',
            },
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: '#C62828', fontWeight: 600 }}>
            ⚠️ Campos obrigatórios em falta
          </Typography>
          <Box component="ul" sx={{ pl: 0, m: 0 }}>
            {getErrorMessages(errors).map((message, index) => (
              <Box key={index} sx={{ mb: 0.5, display: 'flex', alignItems: 'center', gap: 1, fontSize: '0.875rem' }}>
                <Box sx={{ width: '4px', height: '4px', backgroundColor: '#C62828', borderRadius: '50%' }} />
                {message}
              </Box>
            ))}
          </Box>
        </Alert>
      )}

      <Alert 
        severity="info" 
        sx={{ 
          mt: 2, 
          mb: 4, 
          background: 'linear-gradient(135deg, #E3F2FD 0%, #F3E5F5 100%)', 
          color: '#0056FF', 
          border: '1px solid rgba(0, 86, 255, 0.2)',
          fontWeight: 500, 
          textAlign: 'center',
          borderRadius: '12px',
          padding: '16px 20px',
          boxShadow: '0 4px 12px rgba(0, 86, 255, 0.08)',
          '& .MuiAlert-icon': {
            color: '#0056FF',
            fontSize: '1.5rem',
          },
          '& .MuiAlert-message': {
            fontSize: '0.95rem',
            fontWeight: 500,
          },
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          💳 Cadastro para Maquininha
        </Typography>
        <Typography variant="body2" sx={{ mt: 0.5, opacity: 0.9 }}>
          Preencha seus dados para receber sua maquininha de cartão em casa
        </Typography>
      </Alert>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        {/* Informações Pessoais */}
        <Box sx={{ 
          mb: 4,
          p: 3,
          backgroundColor: '#FAFBFF',
          borderRadius: '16px',
          border: '1px solid rgba(0, 86, 255, 0.08)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '20px',
            width: '40px',
            height: '3px',
            background: 'linear-gradient(90deg, #0033ff 0%, #0056FF 100%)',
            borderRadius: '0 0 2px 2px',
          }
        }}>
          <PersonalInfoStep
            formData={formData}
            errors={errors}
            onFieldChange={handleChange}
            onSelectChange={handleSelectChange}
            fieldStyles={fieldStyles}
            labelProps={labelProps}
          />
        </Box>



        {/* Dados Bancários - ATIVO */}
        <Box sx={{ 
          mb: 4,
          p: 3,
          backgroundColor: '#FAFBFF',
          borderRadius: '16px',
          border: '1px solid rgba(0, 86, 255, 0.08)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '20px',
            width: '40px',
            height: '3px',
            background: 'linear-gradient(90deg, #0033ff 0%, #0056FF 100%)',
            borderRadius: '0 0 2px 2px',
          }
        }}>
          <BankingStep
            formData={formData}
            errors={errors}
            onFieldChange={handleChange}
            onSelectChange={handleSelectChange}
            fieldStyles={fieldStyles}
            selectFieldStyles={selectFieldStyles}
            labelProps={labelProps}
          />
        </Box>

        {/* Documentos - ATIVO */}
        <Box sx={{ 
          mb: 4,
          p: 3,
          backgroundColor: '#FAFBFF',
          borderRadius: '16px',
          border: '1px solid rgba(0, 86, 255, 0.08)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '20px',
            width: '40px',
            height: '3px',
            background: 'linear-gradient(90deg, #0033ff 0%, #0056FF 100%)',
            borderRadius: '0 0 2px 2px',
          }
        }}>
          <DocumentsStep
            formData={formData}
            errors={errors}
            onDocumentTypeChange={handleDocumentTypeChange}
            onFileChange={handleFileChange}
            setFormData={setFormData}
            loading={loading}
          />
        </Box>

        {showValidationAlert && (
          <Alert 
            severity="warning" 
            sx={{ 
              mt: 3, 
              mb: 3, 
              background: 'linear-gradient(135deg, #FFF8E1 0%, #FFF3E0 100%)', 
              color: '#E65100', 
              border: '1px solid rgba(230, 81, 0, 0.2)', 
              fontWeight: 500, 
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(230, 81, 0, 0.08)',
              padding: '16px 20px',
              '& .MuiAlert-icon': {
                color: '#E65100',
                fontSize: '1.25rem',
              },
            }}
          >
            <Box sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1, fontSize: '0.875rem' }}>
              <Box sx={{ 
                width: '20px', 
                height: '20px', 
                backgroundColor: '#E65100',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                color: 'white',
                fontWeight: 'bold',
              }}>
                !
              </Box>
              Revise os campos destacados antes de enviar
            </Box>
          </Alert>
        )}

        {/* Consentimento */}
        <Box sx={{ 
          mb: 4,
          p: 3,
          backgroundColor: '#FAFBFF',
          borderRadius: '16px',
          border: '1px solid rgba(0, 86, 255, 0.08)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '20px',
            width: '40px',
            height: '3px',
            background: 'linear-gradient(90deg, #0033ff 0%, #0056FF 100%)',
            borderRadius: '0 0 2px 2px',
          }
        }}>
          <ConsentStep
            consentAccepted={consentAccepted}
            setConsentAccepted={setConsentAccepted}
            errors={errors}
          />
        </Box>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
          sx={{ 
            mt: 2, 
            mb: 3,
            background: 'linear-gradient(135deg, #0033ff 0%, #0056FF 100%)',
            color: '#fff', 
            fontWeight: 600, 
            borderRadius: '16px',
            minHeight: '52px',
            paddingLeft: '32px',
            paddingRight: '32px',
            fontSize: '16px',
            boxShadow: '0 8px 24px rgba(0, 51, 255, 0.24)', 
            textTransform: 'none',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              transition: 'left 0.5s ease',
            },
            '&:hover': { 
              background: 'linear-gradient(135deg, #0022aa 0%, #003f8a 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 12px 32px rgba(0, 51, 255, 0.32)',
              '&::before': {
                left: '100%',
              },
            },
            '&:active': {
              transform: 'translateY(0px)',
            },
            '&:disabled': {
              background: '#E0E0E0',
              color: '#9E9E9E',
              boxShadow: 'none',
              transform: 'none',
            },
            '@media (max-width:600px)': {
              minHeight: '48px',
              fontSize: '15px',
            },
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CircularProgress size={20} sx={{ color: '#fff' }} />
              <Typography>{uploadProgress || 'Enviando...'}</Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontWeight: 600 }}>Solicitar Maquininha</Typography>
              <Typography sx={{ fontSize: '18px' }}>💳</Typography>
            </Box>
          )}
        </Button>
        
        <Box sx={{ 
          textAlign: 'center',
          mt: 2,
          p: 3,
          backgroundColor: '#F8F9FF',
          borderRadius: '12px',
          border: '1px solid rgba(0, 86, 255, 0.1)',
        }}>
          <Box 
            sx={{ 
              color: '#666', 
              fontSize: '0.9rem',
              fontWeight: 400,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            <Box sx={{ 
              width: '20px', 
              height: '20px', 
              backgroundColor: '#4CAF50',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              color: 'white',
              fontWeight: 'bold',
              flexShrink: 0,
            }}>
              ✓
            </Box>
            <span>Receba sua maquininha em casa com segurança e rapidez</span>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default UserForm;
