import { useState, useEffect } from 'react';
import { Container, Box, CircularProgress, CssBaseline } from '@mui/material';
import AuthForm from './components/AuthForm';
import Navbar from './components/Navbar';
import Analytics from './components/Analytics';
import UrlShortener from './components/UrlShortener';
import UrlList from './components/UrlList';

interface Url {
  _id: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
  isPasswordProtected: boolean;
  isActive: boolean;
  passwordAttempts: number;
}

interface User {
  id: string;
  email: string;
}

function App() {
  const [urls, setUrls] = useState<Url[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState('');

  // Validate login/register inputs
  const validateLogin = (email: string, password: string): string | null => {
    if (!email.includes('@')) return 'Invalid email format.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    if (email === 'blocked@example.com') return 'This email is blocked.';
    return null;
  };

  // Simulate login/register
  const handleAuth = (email: string, password: string, mode: 'login' | 'register') => {
    setIsLoading(true);
    setAuthError('');

    const validationError = validateLogin(email, password);
    if (validationError) {
      setAuthError(validationError);
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      const mockUser = { id: '1', email };
      setUser(mockUser);
      setIsLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setUser(null);
    setUrls([]);
  };

  const handleNewShortUrl = (newUrl: Url) => {
    setUrls((prev) => [newUrl, ...prev]);
  };

  const handleUrlsRefresh = () => {
    const dummyUrls: Url[] = [
      {
        _id: '1',
        originalUrl: 'https://example.com',
        shortUrl: 'https://short.ly/abc123',
        clicks: 15,
        createdAt: new Date().toISOString(),
        isPasswordProtected: false,
        isActive: true,
        passwordAttempts: 0,
      },
    ];
    setUrls(dummyUrls);
  };

  useEffect(() => {
    if (user) {
      handleUrlsRefresh();
    }
  }, [user]);

  if (!user) {
    return (
      <>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: '#f5f5f5',
          }}
        >
          <AuthForm onAuth={handleAuth} isLoading={isLoading} error={authError} />
        </Box>
      </>
    );
  }

  return (
    <>
      <CssBaseline />
      <Navbar user={user} onLogout={handleLogout} />
      <Box sx={{ py: 4, bgcolor: '#fafafa', minHeight: '100vh' }}>
        <Container maxWidth="md">
          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <CircularProgress />
            </Box>
          )}

          <UrlShortener
            onUrlShortened={handleNewShortUrl}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            token="dummy_token"
          />

          <Box sx={{ mt: 4 }}>
            <Analytics urls={urls} />
          </Box>

          <Box sx={{ mt: 4 }}>
            <UrlList urls={urls} />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default App;
