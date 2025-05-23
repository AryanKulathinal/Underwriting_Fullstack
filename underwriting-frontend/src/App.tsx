import { Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Submissions from './pages/Submissions';
import Home from './pages/Home';
import { ProtectedRoute } from './components/ProtectedRoute';


function App() {
  return (
    <Routes>
      <Route path="*" element={<Home/>} />
      <Route path="/login" element={<AuthPage showReg={false} />} />
      <Route path="/register" element={<AuthPage showReg={true} />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
      <Route path="/submissions" element={<ProtectedRoute><Submissions/></ProtectedRoute>} />
    </Routes>
  );
}

export default App;