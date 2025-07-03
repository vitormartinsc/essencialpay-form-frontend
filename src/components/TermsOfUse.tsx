import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function TermsOfUse() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ backgroundColor: 'white', p: 4, borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#0033ff', textAlign: 'center' }}>
          Termos de Uso
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 3, color: '#666', textAlign: 'center' }}>
          Última atualização: {new Date().toLocaleDateString('pt-BR')}
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#0033ff', mt: 4, mb: 2 }}>
          1. Aceitação dos Termos
        </Typography>
        <Typography variant="body1" paragraph>
          Ao acessar, utilizar ou cadastrar-se em nosso serviço, você manifesta sua concordância plena e irrevogável com 
          todos os termos e condições estabelecidos neste instrumento, bem como com nossa Política de Privacidade, 
          constituindo entre as partes um acordo juridicamente vinculante. O uso continuado da plataforma após 
          eventuais modificações destes termos será considerado como aceitação tácita das alterações implementadas.
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#0033ff', mt: 4, mb: 2 }}>
          2. Descrição do Serviço
        </Typography>
        <Typography variant="body1" paragraph>
          A plataforma Essencial Pay constitui um sistema eletrônico especializado em cadastro e vinculação de 
          estabelecimentos comerciais para fornecimento de soluções de pagamento eletrônico, incluindo, mas não se 
          limitando a, máquinas de cartão de crédito e débito (maquininhas), terminais POS, gateways de pagamento 
          e demais equipamentos e serviços relacionados ao processamento de transações financeiras.
        </Typography>
        <Typography variant="body1" paragraph>
          O serviço abrange as seguintes funcionalidades principais:
        </Typography>
        <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
          <li>Cadastro completo de dados pessoais e empresariais para análise creditícia;</li>
          <li>Coleta de documentação necessária para vinculação de maquininhas de cartão;</li>
          <li>Processamento de solicitações de equipamentos de pagamento eletrônico;</li>
          <li>Análise de perfil comercial para definição de tarifas e condições;</li>
          <li>Gestão de conta digital para recebimento de valores das transações;</li>
          <li>Suporte técnico e comercial para utilização dos equipamentos fornecidos.</li>
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#0033ff', mt: 4, mb: 2 }}>
          3. Uso Aceitável e Obrigações do Usuário
        </Typography>
        <Typography variant="body1" paragraph>
          O usuário compromete-se a utilizar a plataforma exclusivamente para fins comerciais legítimos, 
          observando rigorosamente todas as leis, normas e regulamentações aplicáveis, especialmente aquelas 
          relativas ao sistema financeiro nacional, combate à lavagem de dinheiro e prevenção ao financiamento 
          do terrorismo. O usuário declara e garante que:
        </Typography>
        <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
          <li>Fornecerá informações verdadeiras, precisas, atualizadas e completas durante o processo de cadastro;</li>
          <li>Manterá atualizados todos os dados cadastrais, comunicando imediatamente qualquer alteração;</li>
          <li>Utilizará as maquininhas e equipamentos fornecidos exclusivamente para atividades comerciais lícitas;</li>
          <li>Não processará transações de origem duvidosa ou relacionadas a atividades ilegais;</li>
          <li>Não tentará burlar sistemas de segurança ou interferir no funcionamento da plataforma;</li>
          <li>Respeitará os direitos de propriedade intelectual da Essencial Pay e terceiros;</li>
          <li>Manterá sigilo sobre informações confidenciais obtidas através do serviço;</li>
          <li>Comunicará imediatamente qualquer uso indevido ou comprometimento de segurança dos equipamentos.</li>
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#0033ff', mt: 4, mb: 2 }}>
          4. Coleta e Finalidade dos Dados Pessoais
        </Typography>
        <Typography variant="body1" paragraph>
          A coleta de dados pessoais realizada através desta plataforma tem como finalidades específicas e legítimas:
        </Typography>
        <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
          <li><strong>Análise creditícia e cadastral:</strong> para avaliação do perfil de risco do estabelecimento comercial;</li>
          <li><strong>Vinculação de maquininhas:</strong> para configuração e entrega dos equipamentos de pagamento;</li>
          <li><strong>Cumprimento de obrigações regulatórias:</strong> conforme exigências do Banco Central e demais órgãos competentes;</li>
          <li><strong>Prevenção à fraude:</strong> para identificação e prevenção de atividades suspeitas ou fraudulentas;</li>
          <li><strong>Gestão de conta digital:</strong> para criação e manutenção de conta para recebimento de valores;</li>
          <li><strong>Suporte técnico:</strong> para prestação de assistência e resolução de problemas;</li>
          <li><strong>Comunicação comercial:</strong> para envio de informações sobre produtos e serviços relacionados.</li>
        </Typography>
        <Typography variant="body1" paragraph>
          Todo o tratamento de dados pessoais é realizado em estrita conformidade com a Lei Geral de Proteção 
          de Dados (LGPD - Lei 13.709/2018) e demais normas aplicáveis, garantindo a segurança, confidencialidade 
          e integridade das informações coletadas.
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#0033ff', mt: 4, mb: 2 }}>
          5. Segurança e Proteção de Dados
        </Typography>
        <Typography variant="body1" paragraph>
          A Essencial Pay emprega as mais rigorosas medidas de segurança técnicas, administrativas e físicas 
          para proteger os dados pessoais dos usuários, incluindo criptografia de ponta a ponta, controles 
          de acesso restritivos, monitoramento contínuo de segurança e auditorias periódicas. Não obstante 
          os esforços empregados, tendo em vista a natureza da internet e das tecnologias envolvidas, 
          não é possível garantir segurança absoluta contra todas as possíveis ameaças.
        </Typography>
        <Typography variant="body1" paragraph>
          O usuário é responsável por manter a confidencialidade de suas credenciais de acesso e por 
          comunicar imediatamente qualquer uso não autorizado de sua conta. A Essencial Pay não se 
          responsabiliza por perdas decorrentes do uso indevido das credenciais do usuário.
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#0033ff', mt: 4, mb: 2 }}>
          6. Equipamentos e Maquininhas de Cartão
        </Typography>
        <Typography variant="body1" paragraph>
          Os equipamentos fornecidos pela Essencial Pay, incluindo maquininhas de cartão de crédito e débito, 
          permanecem como propriedade da empresa e são cedidos em comodato ao usuário. O usuário compromete-se a:
        </Typography>
        <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
          <li>Utilizar os equipamentos exclusivamente para o processamento de transações do seu estabelecimento;</li>
          <li>Manter os equipamentos em boas condições de uso e funcionamento;</li>
          <li>Não alterar, modificar ou tentar reparar os equipamentos sem autorização;</li>
          <li>Comunicar imediatamente qualquer defeito, dano ou mau funcionamento;</li>
          <li>Devolver os equipamentos em caso de rescisão do contrato ou solicitação da empresa;</li>
          <li>Ressarcir danos causados aos equipamentos por uso inadequado ou negligência.</li>
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#0033ff', mt: 4, mb: 2 }}>
          7. Limitação de Responsabilidade
        </Typography>
        <Typography variant="body1" paragraph>
          A plataforma e os serviços são fornecidos "no estado em que se encontram" e "conforme disponibilidade", 
          sem garantias expressas ou implícitas de qualquer natureza. A Essencial Pay exclui, na máxima extensão 
          permitida pela legislação aplicável, todas as garantias, incluindo mas não se limitando a garantias 
          de comercialização, adequação para finalidade específica e não violação de direitos de terceiros.
        </Typography>
        <Typography variant="body1" paragraph>
          Em nenhuma hipótese a Essencial Pay será responsável por danos indiretos, incidentais, especiais, 
          consequenciais ou punitivos, incluindo, mas não se limitando a, perda de lucros, perda de dados, 
          interrupção de negócios ou danos similares, ainda que tenha sido advertida sobre a possibilidade 
          de tais danos.
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#0033ff', mt: 4, mb: 2 }}>
          8. Modificações dos Termos
        </Typography>
        <Typography variant="body1" paragraph>
          A Essencial Pay reserva-se o direito de modificar, alterar, adicionar ou remover partes destes 
          Termos de Uso a qualquer momento, a seu exclusivo critério, mediante notificação aos usuários 
          através da plataforma, e-mail ou outros meios de comunicação adequados. As modificações entrarão 
          em vigor imediatamente após sua publicação, sendo que o uso continuado da plataforma após as 
          alterações constituirá aceitação tácita dos novos termos.
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#0033ff', mt: 4, mb: 2 }}>
          9. Rescisão e Suspensão
        </Typography>
        <Typography variant="body1" paragraph>
          A Essencial Pay poderá, a seu exclusivo critério e sem necessidade de aviso prévio, rescindir 
          ou suspender temporária ou definitivamente o acesso do usuário à plataforma, bem como cancelar 
          o fornecimento de equipamentos, nas seguintes hipóteses:
        </Typography>
        <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
          <li>Violação de qualquer disposição destes Termos de Uso;</li>
          <li>Fornecimento de informações falsas ou enganosas;</li>
          <li>Uso indevido da plataforma ou dos equipamentos;</li>
          <li>Atividades suspeitas ou fraudulentas;</li>
          <li>Inadimplência ou descumprimento de obrigações contratuais;</li>
          <li>Solicitação de órgãos reguladores ou autoridades competentes;</li>
          <li>Descontinuação dos serviços por razões técnicas ou comerciais.</li>
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#0033ff', mt: 4, mb: 2 }}>
          10. Lei Aplicável e Jurisdição
        </Typography>
        <Typography variant="body1" paragraph>
          Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil, especialmente 
          pela Lei Geral de Proteção de Dados (LGPD), Código de Defesa do Consumidor, Marco Civil da 
          Internet e demais normas aplicáveis ao setor financeiro e de pagamentos. Para dirimir qualquer 
          controvérsia decorrente destes termos, fica eleito o foro da Comarca de São Paulo/SP, renunciando 
          as partes a qualquer outro, por mais privilegiado que seja.
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#0033ff', mt: 4, mb: 2 }}>
          11. Disposições Gerais
        </Typography>
        <Typography variant="body1" paragraph>
          Caso qualquer disposição destes Termos seja considerada inválida ou inexequível, as demais 
          disposições permanecerão em pleno vigor. A tolerância da Essencial Pay quanto ao descumprimento 
          de qualquer disposição não constituirá renúncia ou novação. O usuário não poderá ceder ou 
          transferir seus direitos e obrigações sem autorização prévia e expressa.
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#0033ff', mt: 4, mb: 2 }}>
          12. Contato e Atendimento
        </Typography>
        <Typography variant="body1" paragraph>
          Para esclarecimentos, sugestões, reclamações ou exercício de direitos relacionados a estes 
          Termos de Uso ou à proteção de dados pessoais, o usuário poderá entrar em contato através 
          do canal de WhatsApp disponível na plataforma ou pelos demais canais de atendimento oficial 
          da Essencial Pay. Comprometemo-nos a responder todas as solicitações no menor prazo possível.
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
