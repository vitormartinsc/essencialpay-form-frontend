import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Fab, Tooltip } from '@mui/material';

const WHATSAPP_NUMBER = '5531972254165'; // Número do projeto original
const WHATSAPP_MSG = encodeURIComponent('Olá! Quero saber mais sobre o cadastro Essencial.');
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

export default function WhatsAppFloatButton() {
  return (
    <Tooltip title="Fale conosco pelo WhatsApp!" placement="left">
      <Fab
        color="success"
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 2000,
          boxShadow: 4,
          backgroundColor: '#25D366',
          '&:hover': {
            backgroundColor: '#1db954',
          },
        }}
        aria-label="WhatsApp"
      >
        <WhatsAppIcon sx={{ fontSize: 32, color: 'white' }} />
      </Fab>
    </Tooltip>
  );
}
