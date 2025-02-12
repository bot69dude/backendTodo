import { useState } from 'react';
import { userService } from '../../services/userService';
import { Alert } from '../ui/alert';
import { Loader2, Mail, Lock, User, UserPlus } from 'lucide-react';

interface Props {
  onRegister: () => void;
}

export const Register = ({ onRegister }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await userService.register({ name, email, password });
      onRegister();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <UserPlus className="h-6 w-6 text-blue-600" />
        </div>

        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Create your account
        </h2>

        {error && (
          <Alert
            title="Registration Failed"
            description={error}
            onConfirm={() => setError('')}
            confirmText="Try Again"
          />
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-md border border-gray-300 pl-10 py-2 
                         text-sm placeholder-gray-400
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border border-gray-300 pl-10 py-2 
                         text-sm placeholder-gray-400
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border border-gray-300 pl-10 py-2 
                         text-sm placeholder-gray-400
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                required
                disabled={isLoading}
                minLength={8}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Must be at least 8 characters long
            </p>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center rounded-md bg-blue-600 py-2 px-4 
                       text-sm font-medium text-white
                       hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <a 
            href="#" 
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;