import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Login,
  PersonAdd,
  ErrorOutline,
} from '@mui/icons-material';

interface AuthFormProps {
  onAuth: (email: string, password: string, mode: 'login' | 'register') => Promise<void>;
  isLoading: boolean;
  error: string;
}

export default function AuthForm({ onAuth, isLoading, error }: AuthFormProps) {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    await onAuth(email, password, authMode);
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
    setEmail('');
    setPassword('');
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper elevation={3} sx={{ p: 4, width: 360 }}>
        <Box mb={3} textAlign="center">
          <Typography variant="h5" gutterBottom>
            {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {authMode === 'login'
              ? 'Sign in to access your shortened URLs'
              : 'Join us to start shortening your URLs'}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            inputProps={{ minLength: 6 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {error && (
            <Box display="flex" alignItems="center" color="error.main" mt={1} mb={2}>
              <ErrorOutline sx={{ mr: 1 }} />
              <Typography variant="body2">{error}</Typography>
            </Box>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : authMode === 'login' ? <Login /> : <PersonAdd />}
            sx={{ mt: 2 }}
          >
            {authMode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <Box textAlign="center" mt={2}>
          <Typography variant="body2">
            {authMode === 'login'
              ? "Don't have an account?"
              : 'Already have an account?'}{' '}
            <Button variant="text" onClick={toggleAuthMode}>
              {authMode === 'login' ? 'Create one' : 'Sign in'}
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
