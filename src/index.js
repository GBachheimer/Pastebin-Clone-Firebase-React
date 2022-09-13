import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogIn from './routes/Login';
import SignUp from './routes/SignUp';
import UniquePage from './routes/UniquePage';
import PushForm from './routes/PushForm';
import UserPage from './routes/UserPage';
import PublicPastes from './routes/PubicPastes';
import { AuthProvider } from './components/userContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path = "/" element = {<PushForm />} />
          <Route path = "/paste/:id" element = {<UniquePage />} />
          <Route path = "/signUp" element = {<SignUp />} />
          <Route path = "/logIn" element = {<LogIn />} />
          <Route path = "/paste/user" element = {<UserPage />} />
          <Route path = "/paste/public" element = {<PublicPastes />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  
);