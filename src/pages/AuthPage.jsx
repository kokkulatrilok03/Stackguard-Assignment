import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm.jsx';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore.js';

export default function AuthPage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  useEffect(() => {
    if (user) navigate('/config', { replace: true });
  }, [user, navigate]);
  return (
    <main className="grid min-h-screen grid-cols-1 gap-8 px-6 py-12 md:grid-cols-2 md:px-10">
      <div className="hidden rounded-xl bg-muted md:block" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center">
        <AuthForm onSuccess={() => navigate('/config')} />
      </motion.div>
    </main>
  );
}


