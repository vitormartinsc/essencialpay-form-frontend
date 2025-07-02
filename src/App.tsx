import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import UserForm from './components/UserForm'
import Header from './components/Header'
import WhatsAppFloatButton from './components/WhatsAppFloatButton'
import './App.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#0056FF',
      dark: '#0022aa',
    },
    background: {
      default: '#0033ff',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          minHeight: 36,
          paddingLeft: 20,
          paddingRight: 20,
          borderRadius: 12,
          fontSize: 15,
          fontWeight: 'bold',
          boxSizing: 'border-box',
          '@media (max-width:600px)': {
            width: '100%',
          },
        },
      },
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#0033ff',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Header />
        <div style={{
          width: '100%',
          maxWidth: '800px',
          backgroundColor: 'transparent',
          padding: '10px',
          borderRadius: '8px',
          margin: '0 auto',
          position: 'relative',
          boxSizing: 'border-box',
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingTop: '20px',
        }}>
          <UserForm />
        </div>
        <WhatsAppFloatButton />
      </div>
    </ThemeProvider>
  )
}

export default App
