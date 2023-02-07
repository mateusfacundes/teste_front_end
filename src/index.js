import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './auth/Login';
import Register from './auth/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ProtectedRoute from './util/ProtectedRoute';
import Auth from './auth/Auth';
import reportWebVitals from './reportWebVitals';

import ShowSchouls from './pages/ShowSchouls';
import AboutMe from './pages/AboutMe';
import RegisterSchoul from './pages/RegisterSchoul';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   		<BrowserRouter basename={'/'}>
			<Routes>
				<Route path='/auth' element={<Auth />}>
					<Route path='login' element={<Login />} />
					<Route path='register' element={<Register />} />
				</Route>
				<Route path="/" element={<App />}>
					<Route path='' element={
						<ProtectedRoute>
							<ShowSchouls />
						</ProtectedRoute>
					} />
					<Route path='registerschoul' element={
						<ProtectedRoute>
							<RegisterSchoul />
						</ProtectedRoute>
					} />
					<Route path='about' element={
						<ProtectedRoute>
							<AboutMe />
						</ProtectedRoute>
					} />
				</Route>
			</Routes>
		</BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
