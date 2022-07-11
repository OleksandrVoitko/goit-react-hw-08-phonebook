import { Routes, Route } from 'react-router-dom';

import Navigation from 'components/Navigation';
import HomePage from 'pages/HomePage';
import RegistrationPage from 'pages/RegistrationPage';
import LoginPage from 'pages/LoginPage/LoginPage';
import ContactsPage from 'pages/ContactsPage';

import { Wrapper } from './App.styled';

export default function App() {
  return (
    <Wrapper>
      <Navigation />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="registration" element={<RegistrationPage />} />
        <Route path="login" element={<LoginPage />} />
        
      </Routes>
      
    </Wrapper>
  );
}
