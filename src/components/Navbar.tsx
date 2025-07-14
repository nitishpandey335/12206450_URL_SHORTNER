import { useState, MouseEvent } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Tooltip,
  Divider,
  Button,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Logout,
  AccountCircle,
  Link as LinkIcon,
} from '@mui/icons-material';

interface User {
  id: string;
  email: string;
}

interface NavbarProps {
  user: User;
  onLogout: () => void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="default" elevation={2}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo/Brand */}
        <Box display="flex" alignItems="center">
          <LinkIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" noWrap>
            LinkShrinker
          </Typography>
        </Box>

        {/* Desktop View */}
        <Box display={{ xs: 'none', md: 'flex' }} alignItems="center">
          <AccountCircle sx={{ mr: 1 }} />
          <Typography variant="body1" sx={{ mr: 3 }}>
            {user.email}
          </Typography>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Logout />}
            onClick={onLogout}
          >
            Logout
          </Button>
        </Box>

        {/* Mobile View */}
        <Box display={{ xs: 'flex', md: 'none' }}>
          <Tooltip title="Menu">
            <IconButton onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem disabled>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
                  {user.email[0]?.toUpperCase()}
                </Avatar>
                <Typography variant="body2">{user.email}</Typography>
              </Box>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => { handleMenuClose(); onLogout(); }}>
              <Logout fontSize="small" sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
