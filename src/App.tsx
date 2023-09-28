import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Index from './pages/Home/Index';
import {
  alpha,
  createTheme,
  getContrastRatio,
  ThemeProvider,
} from '@mui/material/styles';
import Home from './pages/Home/Index';
import Employment from './pages/Employment/Index';

const primaryBase = '#056280';
const primaryMain = alpha(primaryBase, 0.7);

const secondaryBase = '#9AA68C';
const secondaryMain = alpha(secondaryBase, 0.7);

const accentBase = '#A1EEE5';
const accentMain = alpha(accentBase, 0.7);

const theme = createTheme({
  palette: {
    primary: {
      main: primaryMain,
      light: alpha(primaryBase, 0.5),
      dark: alpha(primaryBase, 0.9),
      contrastText:
        getContrastRatio(primaryMain, '#fff') > 4.5 ? '#fff' : '#111',
    },

    secondary: {
      main: secondaryMain,
      light: alpha(secondaryBase, 0.5),
      dark: alpha(secondaryBase, 0.9),
      contrastText:
        getContrastRatio(secondaryMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/employment" element={<Employment></Employment>}></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
