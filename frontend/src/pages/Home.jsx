import { Typography, Box, Container, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiArrowRight, FiBook, FiNewspaper, FiYoutube } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';

const FeatureCard = ({ icon: Icon, title, description, to, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
    >
      <Box
        sx={{
          p: 3,
          height: '100%',
          backgroundColor: 'background.paper',
          borderRadius: 2,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              backgroundColor: 'primary.main',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon size={24} />
          </Box>
        </Box>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        <Button
          component={RouterLink}
          to={to}
          endIcon={<FiArrowRight />}
          variant="text"
          color="primary"
        >
          Learn More
        </Button>
      </Box>
    </motion.div>
  );
};

function Home() {
  const features = [
    {
      icon: FiBook,
      title: 'Educational Courses',
      description: 'Access high-quality courses with downloadable materials to enhance your learning journey.',
      to: '/courses',
    },
    {
      icon: FiNewspaper,
      title: 'AI News',
      description: 'Stay updated with the latest developments in artificial intelligence and technology.',
      to: '/news',
    },
    {
      icon: FiYoutube,
      title: 'YouTube Channel',
      description: 'Track our channel statistics and get insights into our content performance.',
      to: '/youtube-stats',
    },
  ];

  return (
    <Box sx={{ pt: { xs: 4, md: 12 }, pb: { xs: 6, md: 12 } }}>
      {/* Hero Section */}
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center" sx={{ mb: 12 }}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography
                variant="h1"
                gutterBottom
                sx={{
                  background: 'linear-gradient(45deg, #2D3250 30%, #424769 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  fontWeight: 800,
                }}
              >
                Welcome to Pono Obuolio
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Typography
                variant="h4"
                color="text.secondary"
                sx={{ mb: 4, fontWeight: 500 }}
              >
                Your gateway to AI education and innovation
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                variant="contained"
                size="large"
                component={RouterLink}
                to="/courses"
                endIcon={<FiArrowRight />}
                sx={{ mr: 2 }}
              >
                Explore Courses
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={RouterLink}
                to="/news"
                endIcon={<FiNewspaper />}
              >
                Read News
              </Button>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Box
                component="img"
                src="/hero-illustration.svg"
                alt="Hero Illustration"
                sx={{
                  width: '100%',
                  maxWidth: 600,
                  height: 'auto',
                  display: 'block',
                  margin: '0 auto',
                }}
              />
            </motion.div>
          </Grid>
        </Grid>

        {/* Features Section */}
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          What We Offer
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={feature.title}>
              <FeatureCard {...feature} delay={0.2 + index * 0.1} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Home; 