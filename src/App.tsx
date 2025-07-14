import { useState, useEffect } from 'react';
import './App.css';
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

  // Add newly created URL
  const handleNewShortUrl = (newUrl: Url) => {
    setUrls((prev) => [newUrl, ...prev]);
  };

  // Load default URLs (optional dummy data)
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
        passwordAttempts: 0
      }
    ];
    setUrls(dummyUrls);
  };

  useEffect(() => {
    if (user) {
      handleUrlsRefresh();
    }
  }, [user]);

  if (!user) {
    return <AuthForm onAuth={handleAuth} isLoading={isLoading} error={authError} />;
  }

  return (
    <div className="app">
      <Navbar user={user} onLogout={handleLogout} />

      <div className="main-content">
        <div className="container">
          <UrlShortener
            onUrlShortened={handleNewShortUrl}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            token="dummy_token" // For now, token is not used
          />

          <Analytics urls={urls} />

          <UrlList urls={urls} />
        </div>
      </div>
    </div>
  );
}

export default App;
