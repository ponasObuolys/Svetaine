import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton, useScrollTrigger } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiBook, FiNewspaper, FiYoutube } from 'react-icons/fi';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home', icon: FiHome },
    { path: '/courses', label: 'Courses', icon: FiBook },
    { path: '/news', label: 'News', icon: FiNewspaper },
    { path: '/youtube-stats', label: 'YouTube', icon: FiYoutube },
  ];

  return (
    <AppBar 
      position="fixed" 
      sx={{
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
        boxShadow: isScrolled ? '0px 1px 10px rgba(0, 0, 0, 0.1)' : 'none',
        color: trigger ? 'text.primary' : 'primary.main',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography 
              variant="h6" 
              component={RouterLink} 
              to="/" 
              sx={{ 
                flexGrow: 1,
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 700,
                letterSpacing: '-0.5px',
                mr: 4
              }}
            >
              Pono Obuolio
            </Typography>
          </motion.div>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <motion.div
                  key={item.path}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      color: isActive ? 'primary.main' : 'inherit',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: '0',
                        left: '50%',
                        width: isActive ? '100%' : '0%',
                        height: '2px',
                        backgroundColor: 'primary.main',
                        transition: 'all 0.3s ease-in-out',
                        transform: 'translateX(-50%)',
                      },
                      '&:hover::after': {
                        width: '100%',
                      },
                    }}
                  >
                    <Icon style={{ marginRight: '4px' }} />
                    {item.label}
                  </Button>
                </motion.div>
              );
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar; 