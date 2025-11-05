import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import InputField from '../components/InputField.jsx';
import { useAuthStore } from '../store/useAuthStore.js';
import { validateKey } from '../utils/validateKey.js';
import { toast } from 'sonner';
import Logo from '../components/Logo.jsx';

export default function ConfigPage() {
  const setConfigKey = useAuthStore((s) => s.setConfigKey);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const err = validateKey(value);
    setError(err);
    if (err) return;
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      setConfigKey(value.trim());
      toast.success('Configuration saved');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen grid-cols-1 gap-8 px-6 py-12 md:grid-cols-2 md:px-10">
      <div className="hidden rounded-xl bg-muted md:block" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-6 flex justify-center">
            <Logo />
          </div>
          <Card className="border-none shadow-lg">
            <CardContent className="p-6">
              <div className="mb-6 text-center">
                <h2 className="text-xl font-semibold">Verify your public key</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  To get started provide your public key for verification
                </p>
              </div>
              <form onSubmit={submit} className="space-y-4">
                <InputField
                  id="configKey"
                  placeholder="Enter your public key"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  error={error}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Verifying
                    </span>
                  ) : 'Verify'}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Don’t have a public key? Contact your administrator
                </p>
                <div className="flex justify-center">
                  <Button type="button" variant="ghost" onClick={logout} className="text-muted-foreground">
                    Logout
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </main>
  );
}


