import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Tooltip,
  Chip,
  Stack,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LockIcon from '@mui/icons-material/Lock';
import BlockIcon from '@mui/icons-material/Block';

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
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        Your Shortened URLs
      </Typography>

      {urls.length === 0 ? (
        <Typography color="text.secondary">
          No URLs created yet. Start by shortening a link above!
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {urls.map((url) => (
            <Grid item xs={12} sm={6} md={4} key={url._id}>
              <Card
                variant="outlined"
                sx={{
                  opacity: url.isActive ? 1 : 0.6,
                  backgroundColor: url.isActive ? '#fff' : '#f8d7da',
                }}
              >
                <CardContent>
                  <Stack spacing={1}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Created: {formatDate(url.createdAt)}
                    </Typography>

                    <Typography variant="body1">
                      <strong>Original:</strong>{' '}
                      <a
                        href={url.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {url.originalUrl}
                      </a>
                    </Typography>

                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="body2">
                        <strong>Short:</strong>{' '}
                        <a
                          href={url.shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {url.shortUrl}
                        </a>
                      </Typography>

                      <Tooltip
                        title={copiedUrl === url.shortUrl ? 'Copied!' : 'Copy'}
                      >
                        <IconButton
                          size="small"
                          onClick={() => copyToClipboard(url.shortUrl)}
                        >
                          {copiedUrl === url.shortUrl ? (
                            <CheckCircleIcon color="success" fontSize="small" />
                          ) : (
                            <ContentCopyIcon fontSize="small" />
                          )}
                        </IconButton>
                      </Tooltip>
                    </Box>

                    <Typography variant="body2">
                      <strong>Clicks:</strong> {url.clicks}
                    </Typography>

                    <Stack direction="row" spacing={1} mt={1}>
                      {url.isPasswordProtected && (
                        <Chip
                          icon={<LockIcon />}
                          label="Password Protected"
                          size="small"
                          color="warning"
                          variant="outlined"
                        />
                      )}
                      {!url.isActive && (
                        <Chip
                          icon={<BlockIcon />}
                          label="Disabled"
                          size="small"
                          color="error"
                          variant="outlined"
                        />
                      )}
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
