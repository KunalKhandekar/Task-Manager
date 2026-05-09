import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!loading && isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = 'w-full px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white text-slate-800 transition-colors';

  return (
    <div className="flex justify-center pt-8 sm:pt-16 px-3 sm:px-4">
      <form
        className="bg-white border border-slate-200 rounded-xl px-5 py-7 sm:px-8 sm:py-9 w-full max-w-md flex flex-col gap-4 shadow-sm"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-slate-800">Login</h1>
        {error && (
          <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {error}
          </p>
        )}
        <input
          className={inputCls}
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className={inputCls}
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-md disabled:opacity-55 disabled:cursor-not-allowed cursor-pointer transition-colors"
          type="submit"
          disabled={submitting}
        >
          {submitting ? 'Logging in…' : 'Login'}
        </button>
        <p className="text-sm text-slate-500 text-center">
          No account?{' '}
          <Link className="text-indigo-600 font-semibold hover:underline" to="/signup">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
