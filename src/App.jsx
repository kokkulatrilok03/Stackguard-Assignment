import { Outlet } from 'react-router-dom';
import { Toaster } from './components/ui/toaster.jsx';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Outlet />
      <Toaster />
    </div>
  );
}

export default App
