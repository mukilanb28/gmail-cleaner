import React from 'react';
import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './components/Login/Login';
import DashboardPage from './pages/DashboardPage';
import { AppRouter } from './AppRouter';

function App() {
	return <AppRouter />;
}

export default App;
