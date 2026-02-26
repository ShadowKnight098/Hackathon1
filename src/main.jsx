import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from './components/Navbar.jsx';

const theme = createTheme({
  palette: {
    primary: {
      main: "#6C63FF",
    },
    secondary: {
      main: "#FF6584",
    },
  },
});

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
  <App />
</ThemeProvider>
)
