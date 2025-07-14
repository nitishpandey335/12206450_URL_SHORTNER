import { useState } from 'react';
import './UrlShortener.css';

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

interface UrlShortenerProps {
  onUrlShortened: (newUrl: Url) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  token: string;
}

export default function UrlShortener({
  onUrlShortened,
  isLoading,
  setIsLoading,
  token
}: UrlShortenerProps) {
  const [originalUrl, setOriginalUrl] = useState('');
  const [recentlyShortened, setRecentlyShortened] = useState<string | null>(null);
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [password, setPassword] = useState('');

  const generateShortUrl = () => {
    const code = Math.random().toString(36).substring(2, 8);
    return `https://short.ly/${code}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalUrl) return;

    setIsLoading(true);
    setRecentlyShortened(null);

    try {
      const shortUrl = generateShortUrl();
      const newUrl: Url = {
        _id: Date.now().toString(),
        originalUrl,
        shortUrl,
        clicks: 0,
        createdAt: new Date().toISOString(),
        isPasswordProtected,
        isActive: true,
        passwordAttempts: 0
      };

      setOriginalUrl('');
      setPassword('');
      setIsPasswordProtected(false);
      setRecentlyShortened(shortUrl);
      onUrlShortened(newUrl);

      setTimeout(() => {
        setRecentlyShortened(null);
      }, 5000);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="url-shortener">
      <div className="shortener-header">
        <h2>Create Short Link</h2>
        <p>Transform your long URLs into short, shareable links</p>
      </div>

      <form onSubmit={handleSubmit} className="shortener-form">
        <div className="input-container">
          <div className="input-wrapper">
            <input
              type="url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="https://example.com/your-url"
              required
              className="url-input"
            />
            <button type="submit" disabled={isLoading || !originalUrl} className="shorten-btn">
              {isLoading ? <div className="loading-spinner" /> : <>Shorten</>}
            </button>
          </div>
        </div>

        <div className="password-section">
          <label className="toggle-container">
            <input
              type="checkbox"
              checked={isPasswordProtected}
              onChange={(e) => setIsPasswordProtected(e.target.checked)}
            />
            <span>Password Protect</span>
          </label>

          {isPasswordProtected && (
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="password-input"
            />
          )}
        </div>
      </form>

      {recentlyShortened && (
        <div className="success-message">
          <h3>Shortened URL:</h3>
          <div className="shortened-url-container">
            <span>{recentlyShortened}</span>
            <button onClick={() => copyToClipboard(recentlyShortened)}>Copy</button>
          </div>
        </div>
      )}
    </div>
  );
}
