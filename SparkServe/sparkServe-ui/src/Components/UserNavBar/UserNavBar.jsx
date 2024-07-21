import React from 'react';
import { useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import logo2 from '../../assets/logo2.png';
import AccountPopover from '../AccountPopover/AccountPopover'; 

const logoStyle = {
  width: '140px',
  height: 'auto',
  cursor: 'pointer',
};

function UserNavBar() {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const renderButtons = () => {
    if (location.pathname === '/' || location.pathname === '/signup') {
      return (
        <>
          <Button color="primary" variant="text" size="small" href="/signin">
            Sign in
          </Button>
          <Button color="primary" variant="contained" size="small" href="/signup">
            Sign up
          </Button>
        </>
      );
    } else {
      return <AccountPopover />;
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: 'white',
        backgroundImage: 'none',
        zIndex: 1100,
      }}
    >
      <Container>
        <Toolbar
          variant="regular"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo2} style={logoStyle} alt="Logo" />
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
            <Button color="primary" variant="text" size="small" href="/">
              Home
            </Button>
            <Button color="primary" variant="text" size="small" href="/NRLandingPage">
              Opportunities
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
            {renderButtons()}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton color="primary" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ width: 250, p: 2 }}>
                {location.pathname === '/' || location.pathname === '/signup' ? (
                  <>
                    <MenuItem>
                      <Button color="primary" variant="contained" href="/signup" sx={{ width: '100%' }}>
                        Sign up
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button color="primary" variant="outlined" href="/signin" sx={{ width: '100%' }}>
                        Sign in
                      </Button>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem>
                      <Button color="primary" variant="text" size="small" href="/" sx={{ width: '100%' }}>
                        Home
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button color="primary" variant="text" size="small" href="/NRLandingPage" sx={{ width: '100%' }}>
                        Opportunities
                      </Button>
                    </MenuItem>
                    <AccountPopover />
                  </>
                )}
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default UserNavBar;






