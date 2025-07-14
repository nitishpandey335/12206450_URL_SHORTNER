import { useState } from 'react';
import './UrlList.css';

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

interface UrlListProps {
  urls: Url[];
}

export default function UrlList({ urls }: UrlListProps) {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (error) {
      console.error('Clipboard copy failed', error);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  return (
    <div className="url-list">
      <h2>Your Shortened URLs</h2>
      {urls.length === 0 ? (
        <p>No URLs created yet. Start by shortening a link above!</p>
      ) : (
        <ul className="url-list-container">
          {urls.map((url) => (
            <li key={url._id} className={`url-card ${!url.isActive ? 'disabled' : ''}`}>
              <div className="url-details">
                <p><strong>Original:</strong> <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">{url.originalUrl}</a></p>
                <p>
                  <strong>Short:</strong>{' '}
                  <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">{url.shortUrl}</a>
                  <button className="copy-btn" onClick={() => copyToClipboard(url.shortUrl)}>
                    {copiedUrl === url.shortUrl ? 'Copied!' : 'Copy'}
                  </button>
                </p>
                <p><strong>Created:</strong> {formatDate(url.createdAt)}</p>
                <p><strong>Clicks:</strong> {url.clicks}</p>
                {url.isPasswordProtected && <p>🔒 <strong>Password Protected</strong></p>}
                {!url.isActive && <p style={{ color: 'red' }}>🚫 This URL is disabled</p>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
