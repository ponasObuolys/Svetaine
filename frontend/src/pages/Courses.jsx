import { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Box,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Container,
  Skeleton,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiSearch, FiClock, FiBook, FiDollarSign } from 'react-icons/fi';

const CourseCard = ({ course, index }) => {
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
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={course.thumbnail || '/course-placeholder.jpg'}
            alt={course.title}
            sx={{
              objectFit: 'cover',
            }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Box sx={{ mb: 2 }}>
              <Chip
                label={course.category || 'AI & Machine Learning'}
                size="small"
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'white',
                  mb: 1,
                }}
              />
            </Box>
            <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 600 }}>
              {course.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 2,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {course.description}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 'auto',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FiClock style={{ marginRight: '4px' }} />
                  <Typography variant="caption">
                    {course.duration || '8 weeks'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FiBook style={{ marginRight: '4px' }} />
                  <Typography variant="caption">
                    {course.lessons || '12 lessons'}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                <FiDollarSign style={{ verticalAlign: 'middle' }} />
                {course.price || '49.99'}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
};

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // TODO: Fetch courses from the API
    fetch('http://localhost:8000/api/courses/')
      .then(response => response.json())
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
        setLoading(false);
      });
  }, []);

  const filteredCourses = courses.filter(course =>
    course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description?.toLowerCase().includes(searchTerm.toLowerCase())
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
          Available Courses
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
            placeholder="Search courses..."
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
          ? Array.from(new Array(6)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Skeleton
                  variant="rectangular"
                  height={400}
                  sx={{ borderRadius: 2 }}
                />
              </Grid>
            ))
          : filteredCourses.map((course, index) => (
              <Grid item xs={12} sm={6} md={4} key={course.id || index}>
                <CourseCard course={course} index={index} />
              </Grid>
            ))}
      </Grid>
    </Container>
  );
}

export default Courses; 