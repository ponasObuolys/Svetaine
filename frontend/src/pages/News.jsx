import { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Container,
  Box,
  Chip,
  Skeleton,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiSearch, FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';

const NewsCard = ({ article, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: { xs: '100%', md: '35%' },
            height: { xs: 200, md: 'auto' },
            objectFit: 'cover',
          }}
          image={article.image || '/news-placeholder.jpg'}
          alt={article.title}
        />
        <CardContent sx={{ flex: 1, p: 3 }}>
          <Box sx={{ mb: 2 }}>
            <Chip
              label={article.category || 'AI News'}
              size="small"
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                mr: 1,
              }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ display: 'inline-flex', alignItems: 'center' }}>
              <FiCalendar style={{ marginRight: '4px' }} />
              {new Date(article.published_date).toLocaleDateString()}
              <FiClock style={{ marginLeft: '12px', marginRight: '4px' }} />
              {article.read_time || '5 min read'}
            </Typography>
          </Box>

          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            {article.title}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            paragraph
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 2,
            }}
          >
            {article.content}
          </Typography>

          <Button
            variant="text"
            color="primary"
            endIcon={<FiArrowRight />}
            sx={{ fontWeight: 600 }}
          >
            Read More
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // TODO: Fetch news from the API
    fetch('http://localhost:8000/api/news/')
      .then(response => response.json())
      .then(data => {
        setNews(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching news:', error);
        setLoading(false);
      });
  }, []);

  const filteredNews = news.filter(article =>
    article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            fontWeight: 700,
            textAlign: 'center',
            mb: 4,
          }}
        >
          Latest AI News
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Box sx={{ maxWidth: 600, mx: 'auto', mb: 6 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search news articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FiSearch />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </motion.div>

      <Grid container spacing={4}>
        {loading
          ? Array.from(new Array(3)).map((_, index) => (
              <Grid item xs={12} key={index}>
                <Skeleton
                  variant="rectangular"
                  height={300}
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
            ))
          : filteredNews.map((article, index) => (
              <Grid item xs={12} key={article.id || index}>
                <NewsCard article={article} index={index} />
              </Grid>
            ))}
      </Grid>
    </Container>
  );
}

export default News; 