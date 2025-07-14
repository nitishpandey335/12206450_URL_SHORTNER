import { useMemo } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Divider,
  LinearProgress,
  Stack,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LinkIcon from '@mui/icons-material/Link';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import UpdateIcon from '@mui/icons-material/Update';

interface Url {
  _id: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
}

interface AnalyticsProps {
  urls: Url[];
}

export default function Analytics({ urls }: AnalyticsProps) {
  const analytics = useMemo(() => {
    const totalUrls = urls.length;
    const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);
    const avgClicksPerUrl = totalUrls > 0 ? (totalClicks / totalUrls).toFixed(1) : '0';

    const mostClickedUrl = urls.reduce<Url>(
      (max, url) => (url.clicks > max.clicks ? url : max),
      {
        _id: '',
        originalUrl: '',
        shortUrl: '',
        clicks: 0,
        createdAt: '',
      }
    );

    const recentUrls = [...urls]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3);

    const topUrls = [...urls]
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 5);

    const clickDistribution = urls
      .map((url) => ({
        shortUrl: url.shortUrl,
        clicks: url.clicks,
        percentage: totalClicks > 0 ? (url.clicks / totalClicks) * 100 : 0,
      }))
      .filter((item) => item.clicks > 0);

    return {
      totalUrls,
      totalClicks,
      avgClicksPerUrl,
      mostClickedUrl,
      recentUrls,
      topUrls,
      clickDistribution,
    };
  }, [urls]);

  const formatUrl = (url: string) => (url.length > 30 ? url.substring(0, 30) + '...' : url);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Analytics Dashboard
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Track your URL performance and engagement metrics
      </Typography>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <LinkIcon color="primary" />
              <Box>
                <Typography variant="h6">{analytics.totalUrls}</Typography>
                <Typography variant="body2">Total URLs</Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <VisibilityIcon color="secondary" />
              <Box>
                <Typography variant="h6">{analytics.totalClicks}</Typography>
                <Typography variant="body2">Total Clicks</Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <LeaderboardIcon color="success" />
              <Box>
                <Typography variant="h6">{analytics.avgClicksPerUrl}</Typography>
                <Typography variant="body2">Avg. Clicks/URL</Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <UpdateIcon color="warning" />
              <Box>
                <Typography variant="h6">{analytics.mostClickedUrl.clicks}</Typography>
                <Typography variant="body2">Best Performer</Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Top URLs */}
      <Box mt={4}>
        <Typography variant="h6">Top Performing URLs</Typography>
        <Divider sx={{ mb: 2 }} />
        {analytics.topUrls.length > 0 ? (
          analytics.topUrls.map((url, index) => (
            <Paper
              key={url._id}
              elevation={1}
              sx={{
                p: 2,
                mb: 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography fontWeight="bold">
                  #{index + 1} - {formatUrl(url.originalUrl)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  /{url.shortUrl}
                </Typography>
              </Box>
              <Typography variant="body1">{url.clicks} clicks</Typography>
            </Paper>
          ))
        ) : (
          <Typography color="text.secondary">No click data available.</Typography>
        )}
      </Box>

      {/* Recent Activity */}
      <Box mt={4}>
        <Typography variant="h6">Recent Activity</Typography>
        <Divider sx={{ mb: 2 }} />
        {analytics.recentUrls.length > 0 ? (
          analytics.recentUrls.map((url) => (
            <Paper
              key={url._id}
              elevation={1}
              sx={{
                p: 2,
                mb: 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography>{formatUrl(url.originalUrl)}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(url.createdAt)}
                </Typography>
              </Box>
              <Typography variant="body2">{url.clicks} clicks</Typography>
            </Paper>
          ))
        ) : (
          <Typography color="text.secondary">No recent activity.</Typography>
        )}
      </Box>

      {/* Click Distribution */}
      {analytics.clickDistribution.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">Click Distribution</Typography>
          <Divider sx={{ mb: 2 }} />
          {analytics.clickDistribution.slice(0, 10).map((item, index) => (
            <Box key={item.shortUrl} mb={2}>
              <Typography variant="body2" fontWeight="bold">
                /{item.shortUrl} - {item.clicks} clicks
              </Typography>
              <LinearProgress
                variant="determinate"
                value={item.percentage}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: '#e0e0e0',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: `hsl(${220 + index * 20}, 70%, 50%)`,
                  },
                }}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
