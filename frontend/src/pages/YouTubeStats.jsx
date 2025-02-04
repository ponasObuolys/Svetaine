import { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Container,
  Skeleton,
  IconButton,
  Tooltip,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveBar } from '@nivo/bar';
import {
  FiYoutube,
  FiUsers,
  FiEye,
  FiVideo,
  FiTrendingUp,
  FiInfo,
  FiCalendar,
} from 'react-icons/fi';

const StatCard = ({ title, value, icon: Icon, color, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card
        sx={{
          height: '100%',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <CardContent>
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
                backgroundColor: `${color}20`,
                color: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              <Icon size={24} />
            </Box>
            <Typography variant="h6" color="text.secondary">
              {title}
            </Typography>
          </Box>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ViewsChart = ({ data }) => (
  <Box sx={{ height: 400 }}>
    <ResponsiveLine
      data={[
        {
          id: 'views',
          color: 'hsl(210, 70%, 50%)',
          data: data || [],
        },
      ]}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false }}
      curve="cardinal"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
      }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  </Box>
);

function YouTubeStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch YouTube stats from the API
    fetch('http://localhost:8000/api/youtube-stats/')
      .then(response => response.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching YouTube stats:', error);
        setLoading(false);
      });
  }, []);

  const mockViewsData = [
    { x: 'Jan', y: 2000 },
    { x: 'Feb', y: 4000 },
    { x: 'Mar', y: 3000 },
    { x: 'Apr', y: 7000 },
    { x: 'May', y: 5000 },
    { x: 'Jun', y: 8000 },
  ];

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        <Grid container spacing={4}>
          {Array.from(new Array(4)).map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Skeleton variant="rectangular" height={160} sx={{ borderRadius: 2 }} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 6 }}>
          <FiYoutube size={40} color="#2D3250" style={{ marginRight: '16px' }} />
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
            }}
          >
            Channel Statistics
          </Typography>
        </Box>
      </motion.div>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Subscribers"
            value={stats?.subscriber_count}
            icon={FiUsers}
            color="#2D3250"
            delay={0.1}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Views"
            value={stats?.view_count}
            icon={FiEye}
            color="#F6B17A"
            delay={0.2}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Videos"
            value={stats?.video_count}
            icon={FiVideo}
            color="#424769"
            delay={0.3}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Growth Rate"
            value="+12.5%"
            icon={FiTrendingUp}
            color="#E7845E"
            delay={0.4}
          />
        </Grid>

        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Views Over Time
                  </Typography>
                  <Tooltip title="View count trends over the past 6 months">
                    <IconButton>
                      <FiInfo />
                    </IconButton>
                  </Tooltip>
                </Box>
                <ViewsChart data={mockViewsData} />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {stats?.latest_video && (
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                    Latest Video
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <Box
                        component="img"
                        src={stats.latest_video.thumbnail || '/video-placeholder.jpg'}
                        alt={stats.latest_video.title}
                        sx={{
                          width: '100%',
                          borderRadius: 2,
                          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Typography variant="h6" gutterBottom>
                        {stats.latest_video.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {stats.latest_video.description}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                          <FiEye style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                          {stats.latest_video.view_count?.toLocaleString()} views
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <FiCalendar style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                          {new Date(stats.latest_video.published_at).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default YouTubeStats; 