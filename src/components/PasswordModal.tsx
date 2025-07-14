import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  IconButton,
  CircularProgress,
  Stack,
  Box,
  Alert,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import CloseIcon from '@mui/icons-material/Close';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  shortUrl: string;
  onSuccess: (originalUrl: string) => void;
}

export default function PasswordModal({
  isOpen,
  onClose,
  shortUrl,
  onSuccess,
}: PasswordModalProps) {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/verify-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shortUrl, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess(data.originalUrl);
        setPassword('');
        setAttempts(0);
        setError('');
      } else {
        setError(data.error || 'Invalid password');
        setAttempts(data.attempts || attempts + 1);
      }
    } catch (err) {
      console.error('Password verification error:', err);
      setError('Failed to verify password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setPassword('');
    setError('');
    setAttempts(0);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={1}>
            <LockIcon color="primary" />
            <Typography variant="h6">Password Protected Link</Typography>
          </Stack>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" mb={2}>
            This link is password protected. Enter the password to continue.
          </Typography>

          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
            disabled={isLoading}
          />

          {error && (
            <Box mt={2}>
              <Alert severity="error">
                {error}{' '}
                {attempts > 0 && (
                  <span>({attempts} attempt{attempts > 1 ? 's' : ''})</span>
                )}
              </Alert>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading || !password.trim()}
            startIcon={isLoading ? <CircularProgress size={16} /> : null}
          >
            {isLoading ? 'Unlocking...' : 'Unlock'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
