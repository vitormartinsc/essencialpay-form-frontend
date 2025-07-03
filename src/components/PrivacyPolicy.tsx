import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ 
        backgroundColor: 'white', 
        p: 4, 
        borderRadius: 2, 
        boxShadow: 2,
        '& .MuiTypography-body1': {
          color: '#333',
        },
        '& .MuiTypography-body2': {
          color: '#666',
        }
      }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#0033ff', textAlign: 'center' }}>
          Política de Privacidade
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 3, color: '#666', textAlign: 'center' }}>
          Última atualização: {new Date().toLocaleDateString('pt-BR')}
        </Typography>

        <Typography variant="body1" paragraph>
          Esta Política de Privacidade estabelece as diretrizes e procedimentos adotados pela Essencial Pay 
          para o tratamento de dados pessoais dos usuários de nossa plataforma, em estrita conformidade com 
          a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018) e demais normas aplicáveis.
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#0033ff', mt: 4, mb: 2 }}>
          1. Definições e Conceitos
        </Typography>
        <Typography variant="body1" paragraph>
          Para os fins desta Política de Privacidade, aplicam-se as seguintes definições:
        </Typography>
        <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
          <li><strong>Dados Pessoais:</strong> informações relacionadas a pessoa natural identificada ou identificável;</li>
          <li><strong>Dados Sensíveis:</strong> dados sobre origem racial, convicção religiosa, opinião política, saúde ou vida sexual;</li>
          <li><strong>Titular:</strong> pessoa natural a quem se referem os dados pessoais;</li>
          <li><strong>Controlador:</strong> pessoa natural ou jurídica que toma decisões sobre o tratamento de dados pessoais;</li>
          <li><strong>Operador:</strong> pessoa natural ou jurídica que realiza o tratamento em nome do controlador;</li>
          <li><strong>Tratamento:</strong> toda operação com dados pessoais, como coleta, armazenamento, uso, compartilhamento ou eliminação.</li>
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#0033ff', mt: 4, mb: 2 }}>
          2. Coleta e Categorização de Dados
        </Typography>
        <Typography variant="body1" paragraph>
          A Essencial Pay coleta dados pessoais exclusivamente para finalidades específicas e legítimas relacionadas 
          à prestação de serviços de pagamento eletrônico, vinculação de maquininhas de cartão e gestão de contas 
          digitais. Os dados coletados incluem:
        </Typography>
        <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
          <li><strong>Dados de Identificação:</strong> nome completo, CPF, RG, data de nascimento, nacionalidade, estado civil;</li>
          <li><strong>Dados de Contato:</strong> endereço residencial e comercial, telefone, e-mail;</li>
          <li><strong>Dados Financeiros:</strong> informações bancárias, renda, movimentação financeira;</li>
          <li><strong>Dados Comerciais:</strong> CNPJ, razão social, atividade econômica, faturamento;</li>
          <li><strong>Dados Biométricos:</strong> fotografias para verificação de identidade;</li>
          <li><strong>Dados de Localização:</strong> endereço para entrega de equipamentos;</li>
          <li><strong>Dados Comportamentais:</strong> histórico de transações e padrões de uso da plataforma.</li>
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#0033ff', mt: 4, mb: 2 }}>
          3. Finalidades do Tratamento
        </Typography>
        <Typography variant="body1" paragraph>
          O tratamento de dados pessoais é realizado para as seguintes finalidades específicas:
        </Typography>
        <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
          <li><strong>Análise creditícia:</strong> avaliação do perfil de risco para concessão de serviços;</li>
          <li><strong>Vinculação de equipamentos:</strong> configuração e entrega de maquininhas de cartão;</li>
          <li><strong>Prevenção à fraude:</strong> detecção e prevenção de atividades suspeitas;</li>
          <li><strong>Cumprimento legal:</strong> atendimento a obrigações regulatórias do Banco Central;</li>
          <li><strong>Gestão de conta:</strong> criação e manutenção de conta digital;</li>
          <li><strong>Suporte técnico:</strong> prestação de assistência e resolução de problemas;</li>
          <li><strong>Marketing:</strong> envio de comunicações comerciais com consentimento;</li>
          <li><strong>Segurança:</strong> proteção da plataforma e dos usuários;</li>
          <li><strong>Estatísticas:</strong> análise de performance e melhoria dos serviços.</li>
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#0033ff', mt: 4, mb: 2 }}>
          4. Base Legal para o Tratamento
        </Typography>
        <Typography variant="body1" paragraph>
          O tratamento de dados pessoais fundamenta-se nas seguintes bases legais previstas na LGPD:
        </Typography>
        <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
          <li><strong>Consentimento:</strong> para comunicações comerciais e funcionalidades opcionais;</li>
          <li><strong>Execução de contrato:</strong> para prestação dos serviços solicitados;</li>
          <li><strong>Cumprimento de obrigação legal:</strong> para atendimento a normas regulatórias;</li>
          <li><strong>Interesse legítimo:</strong> para prevenção à fraude e segurança;</li>
          <li><strong>Proteção de direitos:</strong> para defesa em processos judiciais;</li>
          <li><strong>Proteção da vida:</strong> em situações de emergência que exijam intervenção.</li>
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#0033ff', mt: 4, mb: 2 }}>
          5. Compartilhamento de Dados
        </Typography>
        <Typography variant="body1" paragraph>
          A Essencial Pay não comercializa dados pessoais e limita o compartilhamento às seguintes hipóteses:
        </Typography>
        <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
          <li><strong>Prestadores de serviços:</strong> empresas que auxiliam na operação, sempre com contratos específicos;</li>
          <li><strong>Parceiros comerciais:</strong> quando necessário para execução dos serviços;</li>
          <li><strong>Autoridades competentes:</strong> mediante ordem judicial ou requisição legal;</li>
          <li><strong>Bureaus de crédito:</strong> para consulta e análise creditícia;</li>
          <li><strong>Adquirentes:</strong> para processamento de transações;</li>
          <li><strong>Operações societárias:</strong> em caso de fusão, aquisição ou reestruturação;</li>
          <li><strong>Defesa de direitos:</strong> para proteção contra fraudes ou processos judiciais.</li>
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#0033ff', mt: 4, mb: 2 }}>
          6. Segurança e Proteção
        </Typography>
        <Typography variant="body1" paragraph>
          Implementamos medidas técnicas e organizacionais rigorosas para proteger os dados pessoais:
        </Typography>
        <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
          <li><strong>Criptografia:</strong> proteção de dados em trânsito e armazenamento;</li>
          <li><strong>Controle de acesso:</strong> autenticação e autorização restritivas;</li>
          <li><strong>Monitoramento:</strong> detecção contínua de ameaças e vulnerabilidades;</li>
          <li><strong>Backups:</strong> cópias de segurança regulares e testadas;</li>
          <li><strong>Treinamento:</strong> capacitação regular dos funcionários;</li>
          <li><strong>Auditorias:</strong> revisões periódicas de segurança;</li>
          <li><strong>Plano de resposta:</strong> procedimentos para incidentes de segurança.</li>
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#0033ff', mt: 4, mb: 2 }}>
          7. Direitos dos Titulares
        </Typography>
        <Typography variant="body1" paragraph>
          Conforme estabelecido na LGPD, os titulares de dados pessoais possuem os seguintes direitos:
        </Typography>
        <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
          <li><strong>Confirmação:</strong> obter confirmação sobre a existência de tratamento;</li>
          <li><strong>Acesso:</strong> acessar os dados pessoais tratados;</li>
          <li><strong>Correção:</strong> corrigir dados incompletos, inexatos ou desatualizados;</li>
          <li><strong>Anonimização:</strong> converter dados em formato anônimo;</li>
          <li><strong>Eliminação:</strong> excluir dados desnecessários ou tratados com base no consentimento;</li>
          <li><strong>Portabilidade:</strong> transferir dados a outro fornecedor;</li>
          <li><strong>Informação:</strong> obter dados sobre o compartilhamento;</li>
          <li><strong>Revogação:</strong> retirar o consentimento a qualquer momento;</li>
          <li><strong>Oposição:</strong> opor-se ao tratamento em certas situações.</li>
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#0033ff', mt: 4, mb: 2 }}>
          8. Retenção de Dados
        </Typography>
        <Typography variant="body1" paragraph>
          Os dados pessoais são mantidos pelo tempo necessário para as finalidades para as quais foram coletados, 
          observando-se os prazos legais mínimos estabelecidos pela legislação aplicável, especialmente as normas 
          do Banco Central e demais órgãos reguladores do sistema financeiro nacional.
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#0033ff', mt: 4, mb: 2 }}>
          9. Transferência Internacional
        </Typography>
        <Typography variant="body1" paragraph>
          Eventuais transferências de dados para outros países são realizadas apenas para países que ofereçam 
          grau de proteção adequado ou mediante garantias específicas de proteção, conforme estabelecido na LGPD.
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#0033ff', mt: 4, mb: 2 }}>
          10. Contato e Exercício de Direitos
        </Typography>
        <Typography variant="body1" paragraph>
          Para exercer seus direitos, esclarecer dúvidas ou apresentar reclamações sobre o tratamento de dados 
          pessoais, entre em contato através do WhatsApp disponível na plataforma ou pelos demais canais oficiais 
          da Essencial Pay. Comprometemo-nos a responder todas as solicitações no prazo estabelecido pela legislação.
        </Typography>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="contained"
            onClick={() => navigate('/cadastro')}
            sx={{
              backgroundColor: '#0033ff',
              '&:hover': {
                backgroundColor: '#0022aa',
              },
              px: 4,
              py: 1.5,
            }}
          >
            Voltar ao Cadastro
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
