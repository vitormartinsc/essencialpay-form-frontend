import React from 'react';
import { Typography, Box, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { FormData, FormErrors } from '../../types';

// Importações dos ícones
import idFrente from '../../assets/id_frente.svg';
import idVerso from '../../assets/id_verso.svg';
import cnhImage from '../../assets/cnh.svg';
import selfieIcon from '../../assets/selfie.png';
import comprovanteResidencia from '../../assets/comprovante_residencia.png';

interface DocumentsStepProps {
  formData: FormData;
  errors: FormErrors;
  onDocumentTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  loading?: boolean;
}

const DocumentsStep: React.FC<DocumentsStepProps> = ({
  formData,
  errors,
  onDocumentTypeChange,
  onFileChange,
  setFormData,
  loading = false
}) => {
  return (
    <>
      {/* Documentos de Identificação */}
      <Typography variant="h6" sx={{ color: '#0033ff', mb: 2, mt: 3, fontSize: '1.1rem', fontWeight: 600, textAlign: 'center' }}>
        Documentos de Identificação
      </Typography>

      <RadioGroup
        row
        value={formData.documentType}
        onChange={onDocumentTypeChange}
        sx={{ justifyContent: 'center', mb: 4, gap: 2 }}
      >
        <FormControlLabel
          value="RG"
          control={<Radio sx={{ color: '#0033ff' }} />}
          label="Vou enviar meu RG"
          sx={{ color: '#0033ff', fontWeight: '500' }}
        />
        <FormControlLabel
          value="CNH"
          control={<Radio sx={{ color: '#0033ff' }} />}
          label="Vou enviar minha CNH"
          sx={{ color: '#0033ff', fontWeight: '500' }}
        />
      </RadioGroup>

      {formData.documentType === 'RG' ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 1, sm: 3 }, mb: 2, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#e3f2fd', padding: '20px 15px 15px 15px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', minWidth: 0, width: { xs: 180, sm: 200 }, minHeight: 0, height: 'auto' }}>
            <Typography variant="body2" sx={{ mb: 1.5, color: '#0056FF', fontWeight: 'bold', fontSize: '0.9rem', textAlign: 'center', lineHeight: 1.3 }}>Foto da frente da Identidade</Typography>
            <Box sx={{ width: '70px', height: '70px', backgroundColor: '#f8f9fa', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5, mt: 0.5 }}>
              <img src={idFrente} alt="RG Frente" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
            </Box>
            {!formData.documentFront ? (
              <Button variant="contained" component="label" sx={{ backgroundColor: '#0056FF', color: '#fff', fontWeight: 'bold', textTransform: 'none', borderRadius: '8px', minWidth: 90, height: 34, px: 2, py: 0, fontSize: 14, whiteSpace: 'nowrap', display: 'flex', alignSelf: 'center', justifyContent: 'center', mb: 1, '&:hover': { backgroundColor: '#003f8a' } }}>
                Enviar
                <input 
                  type="file" 
                  accept="image/png, image/jpeg, image/jpg, image/webp" 
                  name="documentFront" 
                  onChange={onFileChange}
                  style={{ 
                    display: 'none',
                    opacity: 0,
                    position: 'absolute',
                    zIndex: -1,
                    width: 0,
                    height: 0,
                    overflow: 'hidden'
                  }}
                />
              </Button>
            ) : (
              <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1, background: '#f5f7fa', borderRadius: '6px', px: 1, py: 0.5, width: '100%' }}>
                <Typography
                  sx={{
                    fontFamily: 'Inter, Roboto, Arial, sans-serif',
                    color: '#0056FF',
                    fontWeight: 500,
                    fontSize: 14,
                    letterSpacing: 0.2,
                    cursor: 'pointer',
                    marginRight: 1,
                    userSelect: 'text',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flex: 1,
                  }}
                >
                  {formData.documentFront.name}
                </Typography>
                <CloseIcon
                  sx={{ cursor: 'pointer', color: '#b71c1c', fontSize: 18, ml: 0.5 }}
                  onClick={() => setFormData(prev => ({ ...prev, documentFront: null }))}
                />
              </Box>
            )}
            {!formData.documentFront && errors.documentFront && (
              <Typography variant="caption" color="error" sx={{ mt: 1, mb: 1, display: 'block' }}>{errors.documentFront}</Typography>
            )}
          </Box>
          <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#e3f2fd', padding: '20px 15px 15px 15px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', minWidth: 0, width: { xs: 180, sm: 200 }, minHeight: 0, height: 'auto' }}>
            <Typography variant="body2" sx={{ mb: 1.5, color: '#0056FF', fontWeight: 'bold', fontSize: '0.9rem', textAlign: 'center', lineHeight: 1.3 }}>Foto do verso da Identidade</Typography>
            <Box sx={{ width: '70px', height: '70px', backgroundColor: '#f8f9fa', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5, mt: 0.5 }}>
              <img src={idVerso} alt="RG Verso" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
            </Box>
            {!formData.documentBack ? (
              <Button variant="contained" component="label" sx={{ backgroundColor: '#0056FF', color: '#fff', fontWeight: 'bold', textTransform: 'none', borderRadius: '8px', minWidth: 90, height: 34, px: 2, py: 0, fontSize: 14, whiteSpace: 'nowrap', display: 'flex', alignSelf: 'center', justifyContent: 'center', mb: 1, '&:hover': { backgroundColor: '#003f8a' } }}>
                Enviar
                <input 
                  type="file" 
                  accept="image/png, image/jpeg, image/jpg, image/webp" 
                  name="documentBack" 
                  onChange={onFileChange}
                  style={{ 
                    display: 'none',
                    opacity: 0,
                    position: 'absolute',
                    zIndex: -1,
                    width: 0,
                    height: 0,
                    overflow: 'hidden'
                  }}
                />
              </Button>
            ) : (
              <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1, background: '#f5f7fa', borderRadius: '6px', px: 1, py: 0.5, width: '100%' }}>
                <Typography
                  sx={{
                    fontFamily: 'Inter, Roboto, Arial, sans-serif',
                    color: '#0056FF',
                    fontWeight: 500,
                    fontSize: 14,
                    letterSpacing: 0.2,
                    cursor: 'pointer',
                    marginRight: 1,
                    userSelect: 'text',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flex: 1,
                  }}
                >
                  {formData.documentBack.name}
                </Typography>
                <CloseIcon
                  sx={{ cursor: 'pointer', color: '#b71c1c', fontSize: 18, ml: 0.5 }}
                  onClick={() => setFormData(prev => ({ ...prev, documentBack: null }))}
                />
              </Box>
            )}
            {!formData.documentBack && errors.documentBack && (
              <Typography variant="caption" color="error" sx={{ mt: 1, mb: 1, display: 'block' }}>{errors.documentBack}</Typography>
            )}
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#e3f2fd', padding: '20px 15px 15px 15px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', minWidth: 0, width: { xs: 180, sm: 200 }, minHeight: 0, height: 'auto' }}>
            <Typography variant="body2" sx={{ mb: 1.5, color: '#0056FF', fontWeight: 'bold', fontSize: '0.9rem', textAlign: 'center', lineHeight: 1.3 }}>Foto da CNH</Typography>
            <Box sx={{ width: '70px', height: '70px', backgroundColor: '#f8f9fa', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5, mt: 0.5 }}>
              <img src={cnhImage} alt="CNH" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
            </Box>
            {!formData.documentFront ? (
              <Button variant="contained" component="label" sx={{ backgroundColor: '#0056FF', color: '#fff', fontWeight: 'bold', textTransform: 'none', borderRadius: '8px', minWidth: 90, height: 34, px: 2, py: 0, fontSize: 14, whiteSpace: 'nowrap', display: 'flex', alignSelf: 'center', justifyContent: 'center', mb: 1, '&:hover': { backgroundColor: '#003f8a' } }}>
                Enviar
                <input 
                  type="file" 
                  accept="image/png, image/jpeg, image/jpg, image/webp" 
                  name="documentFront" 
                  onChange={onFileChange}
                  style={{ 
                    display: 'none',
                    opacity: 0,
                    position: 'absolute',
                    zIndex: -1,
                    width: 0,
                    height: 0,
                    overflow: 'hidden'
                  }}
                />
              </Button>
            ) : (
              <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1, background: '#f5f7fa', borderRadius: '6px', px: 1, py: 0.5, width: '100%' }}>
                <Typography
                  sx={{
                    fontFamily: 'Inter, Roboto, Arial, sans-serif',
                    color: '#0056FF',
                    fontWeight: 500,
                    fontSize: 14,
                    letterSpacing: 0.2,
                    cursor: 'pointer',
                    marginRight: 1,
                    userSelect: 'text',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flex: 1,
                  }}
                >
                  {formData.documentFront.name}
                </Typography>
                <CloseIcon
                  sx={{ cursor: 'pointer', color: '#b71c1c', fontSize: 18, ml: 0.5 }}
                  onClick={() => setFormData(prev => ({ ...prev, documentFront: null }))}
                />
              </Box>
            )}
            {!formData.documentFront && errors.documentFront && (
              <Typography variant="caption" color="error" sx={{ mt: 1, mb: 1, display: 'block' }}>{errors.documentFront}</Typography>
            )}
          </Box>
        </Box>
      )}

      {/* Selfie do Cliente */}
      <Typography variant="body2" sx={{ 
        mt: 4, 
        mb: 2, 
        color: '#0056FF', 
        fontWeight: 'bold', 
        fontSize: '1rem', 
        textAlign: 'center',
        borderTop: '1px solid #e0e0e0',
        paddingTop: 3
      }}>
        Agora precisamos de uma selfie sua
      </Typography>

      {/* Ticker motivacional */}
      <Box sx={{ 
        mb: 3, 
        backgroundColor: '#f0f8ff', 
        border: '1px solid #4caf50', 
        borderRadius: '8px', 
        padding: '12px 16px', 
        maxWidth: '340px', 
        margin: '0 auto 16px auto',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #4caf50, transparent)',
          animation: 'ticker-slide 3s infinite linear',
          '@keyframes ticker-slide': {
            '0%': { left: '-100%' },
            '100%': { left: '100%' }
          }
        }} />
        <Typography variant="body2" sx={{ 
          color: '#2e7d32', 
          textAlign: 'center',
          fontSize: '0.85rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1
        }}>
          <Box component="span" sx={{
            width: '8px',
            height: '8px',
            backgroundColor: '#4caf50',
            borderRadius: '50%',
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%, 100%': { opacity: 1, transform: 'scale(1)' },
              '50%': { opacity: 0.7, transform: 'scale(1.2)' }
            }
          }} />
          Quase terminando! Estes são os últimos passos
          <Box component="span" sx={{
            width: '8px',
            height: '8px',
            backgroundColor: '#4caf50',
            borderRadius: '50%',
            animation: 'pulse 2s infinite 0.5s',
            '@keyframes pulse': {
              '0%, 100%': { opacity: 1, transform: 'scale(1)' },
              '50%': { opacity: 0.7, transform: 'scale(1.2)' }
            }
          }} />
        </Typography>
      </Box>

      <Typography variant="body2" sx={{ 
        mb: 3, 
        color: '#666', 
        textAlign: 'center',
        fontSize: '0.8rem',
        lineHeight: 1.4,
        maxWidth: '320px',
        margin: '0 auto 24px auto'
      }}>
        <strong>Tire de frente, olhando para a câmera</strong><br/>
        Boa iluminação, sem sombras no rosto<br/>
        Sem óculos escuros, bonés ou máscaras
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Box sx={{ 
          textAlign: 'center', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          backgroundColor: '#e8f5e8', 
          padding: '20px 15px 15px 15px', 
          borderRadius: '12px', 
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
          width: { xs: 180, sm: 200 }, 
          border: '2px solid #4caf50'
        }}>
          <Typography variant="body2" sx={{ 
            mb: 1.5, 
            color: '#2e7d32', 
            fontWeight: 'bold', 
            fontSize: '0.9rem', 
            textAlign: 'center', 
            lineHeight: 1.3 
          }}>
            Sua Selfie
          </Typography>
          <Box sx={{ 
            width: '70px', 
            height: '70px', 
            backgroundColor: '#f1f8e9', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            mb: 1.5, 
            mt: 0.5,
            border: '2px solid #81c784'
          }}>
            <img src={selfieIcon} alt="Selfie" style={{ width: '45px', height: '45px', objectFit: 'contain' }} />
          </Box>
          {!formData.selfie ? (
            <Button 
              variant="contained" 
              component="label" 
              sx={{ 
                backgroundColor: '#4caf50', 
                color: '#fff', 
                fontWeight: 'bold', 
                textTransform: 'none', 
                borderRadius: '8px', 
                minWidth: 90, 
                height: 34, 
                px: 2, 
                py: 0, 
                fontSize: 14, 
                whiteSpace: 'nowrap', 
                display: 'flex', 
                alignSelf: 'center', 
                justifyContent: 'center', 
                mb: 1,
                '&:hover': { 
                  backgroundColor: '#388e3c' 
                } 
              }}
            >
              {loading ? 'Processando...' : 'Tirar Selfie'}
              <input 
                type="file" 
                accept="image/png, image/jpeg, image/jpg, image/webp" 
                name="selfie" 
                onChange={onFileChange}
                capture="user"
                disabled={loading}
                style={{ 
                  display: 'none',
                  opacity: 0,
                  position: 'absolute',
                  zIndex: -1,
                  width: 0,
                  height: 0,
                  overflow: 'hidden'
                }}
              />
            </Button>
          ) : (
            <Box sx={{ 
              mt: 1, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1, 
              background: '#f1f8e9', 
              borderRadius: '6px', 
              px: 1, 
              py: 0.5, 
              width: '100%' 
            }}>
              <Typography
                sx={{
                  fontFamily: 'Inter, Roboto, Arial, sans-serif',
                  color: '#2e7d32',
                  fontWeight: 500,
                  fontSize: 14,
                  letterSpacing: 0.2,
                  cursor: 'pointer',
                  marginRight: 1,
                  userSelect: 'text',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  flex: 1,
                }}
              >
                {formData.selfie.name}
              </Typography>
              <CloseIcon
                sx={{ cursor: 'pointer', color: '#b71c1c', fontSize: 18, ml: 0.5 }}
                onClick={() => setFormData(prev => ({ ...prev, selfie: null }))}
              />
            </Box>
          )}
          {!formData.selfie && errors.selfie && (
            <Typography variant="caption" color="error" sx={{ mt: 1, mb: 1, display: 'block' }}>
              {errors.selfie}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Comprovante de Residência */}
      <Typography variant="body2" sx={{ 
        mt: 4, 
        mb: 2, 
        color: '#0056FF', 
        fontWeight: 'bold', 
        fontSize: '1rem', 
        textAlign: 'center',
        borderTop: '1px solid #e0e0e0',
        paddingTop: 3
      }}>
        Por último, o comprovante de residência
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#e3f2fd', padding: '20px 15px 15px 15px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', minWidth: 0, width: { xs: 180, sm: 200 }, minHeight: 0, height: 'auto' }}>
          <Typography variant="body2" sx={{ mb: 1.5, color: '#0056FF', fontWeight: 'bold', fontSize: '0.9rem', textAlign: 'center', lineHeight: 1.3 }}>Comprovante de Residência</Typography>
          <Box sx={{ width: '70px', height: '70px', backgroundColor: '#f9f9f9', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5, mt: 0.5 }}>
            <img src={comprovanteResidencia} alt="Comprovante de Residência" style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
          </Box>
          {!formData.residenceProof ? (
            <Button variant="contained" component="label" sx={{ backgroundColor: '#0056FF', color: '#fff', fontWeight: 'bold', textTransform: 'none', borderRadius: '8px', minWidth: 90, height: 34, px: 2, py: 0, fontSize: 14, whiteSpace: 'nowrap', display: 'flex', alignSelf: 'center', justifyContent: 'center', mb: 1, '&:hover': { backgroundColor: '#003f8a' } }}>
              Enviar
              <input 
                type="file" 
                accept="image/png, image/jpeg, image/jpg, image/webp, application/pdf" 
                name="residenceProof" 
                onChange={onFileChange}
                style={{ 
                  display: 'none',
                  opacity: 0,
                  position: 'absolute',
                  zIndex: -1,
                  width: 0,
                  height: 0,
                  overflow: 'hidden'
                }}
              />
            </Button>
          ) : (
            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1, background: '#f5f7fa', borderRadius: '6px', px: 1, py: 0.5, width: '100%' }}>
              <Typography
                sx={{
                  fontFamily: 'Inter, Roboto, Arial, sans-serif',
                  color: '#0056FF',
                  fontWeight: 500,
                  fontSize: 14,
                  letterSpacing: 0.2,
                  cursor: 'pointer',
                  marginRight: 1,
                  userSelect: 'text',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  flex: 1,
                }}
              >
                {formData.residenceProof.name}
              </Typography>
              <CloseIcon
                sx={{ cursor: 'pointer', color: '#b71c1c', fontSize: 18, ml: 0.5 }}
                onClick={() => setFormData(prev => ({ ...prev, residenceProof: null }))}
              />
            </Box>
          )}
          {!formData.residenceProof && errors.residenceProof && (
            <Typography variant="caption" color="error" sx={{ mt: 1, mb: 1, display: 'block' }}>{errors.residenceProof}</Typography>
          )}
        </Box>
      </Box>

      <Typography variant="caption" sx={{ color: '#666', mt: 2, display: 'block', textAlign: 'center' }}>
        Formatos aceitos: PNG, JPG, JPEG, WEBP (documentos e selfie) | PDF, PNG, JPG, JPEG, WEBP (comprovante)
      </Typography>
    </>
  );
};

export default DocumentsStep;
