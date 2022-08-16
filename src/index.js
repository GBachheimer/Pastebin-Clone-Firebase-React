import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import LogIn from './routes/Login';
import SignUp from './routes/SignUp';
import UniquePage from './routes/UniquePage';
import PushForm from './routes/PushForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<PushForm />} />
      <Route path = "/:id" element = {<UniquePage />} />
      <Route path = "/signUp" element = {<SignUp />} />
      <Route path = "/logIn" element = {<LogIn />} />
    </Routes>
  </BrowserRouter>
);