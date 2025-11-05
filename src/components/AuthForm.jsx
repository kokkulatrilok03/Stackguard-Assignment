import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from './ui/card.jsx';
import { Button } from './ui/button.jsx';
import InputField from './InputField.jsx';
import { toast } from 'sonner';
import { useAuthStore } from '../store/useAuthStore.js';
import Logo from './Logo.jsx';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthForm({ onSuccess }) {
  const login = useAuthStore((s) => s.login);
  const [mode, setMode] = useState('signin');
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next = {};
    if (!emailRegex.test(form.email)) next.email = 'Enter a valid email';
    if (form.password.length < 6) next.password = 'Min 6 characters';
    if (mode === 'signup') {
      if (!form.firstName.trim()) next.firstName = 'Required';
      if (!form.lastName.trim()) next.lastName = 'Required';
      if (form.confirm !== form.password) next.confirm = 'Passwords do not match';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      login({ email: form.email });
      toast.success(mode === 'signup' ? 'Account created' : 'Signed in');
      onSuccess?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-6 flex justify-center">
        <Logo />
      </div>
      <Card className="border-none shadow-lg">
        <CardContent className="p-6">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-semibold">
              {mode === 'signup' ? 'Welcome to Stackguard' : 'Welcome back to Stackguard'}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Secure your codebase with advanced secret scanning security best practices
            </p>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' ? (
                  <div className="grid grid-cols-2 gap-3">
                    <InputField
                      id="firstName"
                      placeholder="Enter first name"
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      error={errors.firstName}
                    />
                    <InputField
                      id="lastName"
                      placeholder="Enter last name"
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      error={errors.lastName}
                    />
                  </div>
                ) : null}
                <InputField
                  id="email"
                  placeholder="Enter email ID"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  error={errors.email}
                />
                <InputField
                  id="password"
                  placeholder="Enter password"
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  error={errors.password}
                />
                {mode === 'signup' ? (
                  <InputField
                    id="confirm"
                    placeholder="Confirm password"
                    type="password"
                    value={form.confirm}
                    onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                    error={errors.confirm}
                  />
                ) : null}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      {mode === 'signup' ? 'Creating...' : 'Signing in...'}
                    </span>
                  ) : mode === 'signup' ? 'Create account' : 'Sign in'}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  By continuing, you agree to our <a className="underline">Terms of Service</a> and <a className="underline">Privacy Policy</a>
                </p>
                <p className="text-center text-sm text-muted-foreground">
                  {mode === 'signup' ? (
                    <>Already have an account? <button type="button" className="underline" onClick={() => setMode('signin')}>Sign in</button></>
                  ) : (
                    <>Don’t have an account? <button type="button" className="underline" onClick={() => setMode('signup')}>Create account</button></>
                  )}
                </p>
              </form>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}


