import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import News from './pages/News';
import YouTubeStats from './pages/YouTubeStats';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/news" element={<News />} />
          <Route path="/youtube-stats" element={<YouTubeStats />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
