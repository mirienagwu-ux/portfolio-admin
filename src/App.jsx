import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/admin/Dashboard';
import ResourceList from './pages/admin/ResourceList';
import ResourceForm from './pages/admin/ResourceForm';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/:resource" element={<ResourceList />} />
          <Route path="/admin/:resource/new" element={<ResourceForm />} />
          <Route path="/admin/:resource/:id/edit" element={<ResourceForm />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
