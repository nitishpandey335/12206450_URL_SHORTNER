import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Collapse,
  Snackbar,
  Alert,
  CircularProgress,
  Stack,
} from '@mui/material';

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
  token,
}: UrlShortenerProps) {
  const [originalUrl, setOriginalUrl] = useState('');
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [password, setPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarUrl, setSnackbarUrl] = useState('');

  const generateShortUrl = () => {
    const code = Math.random().toString(36).substring(2, 8);
    return `https://short.ly/${code}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalUrl.trim()) return;

    setIsLoading(true);

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
        passwordAttempts: 0,
      };

      setOriginalUrl('');
      setPassword('');
      setIsPasswordProtected(false);

      onUrlShortened(newUrl);
      setSnackbarUrl(shortUrl);
      setSnackbarOpen(true);
    } catch (err) {
      console.error('URL Shortening Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snackbarUrl);
    } catch (err) {
      console.error('Clipboard error:', err);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Create Short Link
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Transform your long URLs into short, shareable links.
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Original URL"
            variant="outlined"
            type="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            fullWidth
          />

          <FormControlLabel
            control={
              <Switch
                checked={isPasswordProtected}
                onChange={(e) => setIsPasswordProtected(e.target.checked)}
              />
            }
            label="Password Protect"
          />

          <Collapse in={isPasswordProtected}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required={isPasswordProtected}
            />
          </Collapse>

          <Button
            variant="contained"
            type="submit"
            disabled={isLoading || !originalUrl.trim()}
            startIcon={isLoading ? <CircularProgress size={20} /> : undefined}
          >
            {isLoading ? 'Shortening...' : 'Shorten'}
          </Button>
        </Stack>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          severity="success"
          action={
            <Button color="inherit" size="small" onClick={handleCopy}>
              Copy
            </Button>
          }
          sx={{ width: '100%' }}
        >
          Shortened URL: {snackbarUrl}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
