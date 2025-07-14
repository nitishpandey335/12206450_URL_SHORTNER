import { useEffect, useState } from 'react';
import PasswordModal from './PasswordModal';
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Alert,
  Stack,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface UrlAccessProps {
  shortUrl: string;
}

export default function UrlAccess({ shortUrl }: UrlAccessProps) {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (shortUrl) {
      handleUrlAccess(shortUrl);
    }
  }, [shortUrl]);

  const handleUrlAccess = async (shortUrl: string) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/${shortUrl}`);
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.requiresPassword) {
          setIsPasswordModalOpen(true);
          setIsLoading(false);
        } else {
          window.location.href = data.originalUrl;
        }
      } else {
        setError('URL not found');
        setIsLoading(false);
      }
    } catch {
      setError('Failed to access URL');
      setIsLoading(false);
    }
  };

  const handlePasswordSuccess = (originalUrl: string) => {
    setIsPasswordModalOpen(false);
    window.location.href = originalUrl;
  };

  const handlePasswordModalClose = () => {
    setIsPasswordModalOpen(false);
    window.location.href = '/';
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="80vh"
        gap={2}
      >
        <CircularProgress size={48} />
        <Typography variant="h5">Accessing URL...</Typography>
        <Typography color="text.secondary">
          Please wait while we process your request
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="80vh"
        gap={3}
      >
        <ErrorOutlineIcon color="error" sx={{ fontSize: 64 }} />
        <Typography variant="h5">URL Not Found</Typography>
        <Alert severity="error">{error}</Alert>
        <Button
          variant="contained"
          color="primary"
          onClick={() => (window.location.href = '/')}
        >
          Go to Homepage
        </Button>
      </Box>
    );
  }

  return (
    <PasswordModal
      isOpen={isPasswordModalOpen}
      onClose={handlePasswordModalClose}
      shortUrl={shortUrl}
      onSuccess={handlePasswordSuccess}
    />
  );
}
