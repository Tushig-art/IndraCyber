import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainDisplay from './components/MainDisplay';
import AdminPanel from './components/AdminPanel';
import { DataProvider } from './contexts/DataContext';

export default function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainDisplay />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}
