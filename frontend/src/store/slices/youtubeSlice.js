import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannel: null,
  videos: [],
  loading: false,
  error: null,
};

const youtubeSlice = createSlice({
  name: 'youtube',
  initialState,
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload;
    },
    setCurrentChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
    updateChannelStats: (state, action) => {
      const { channelId, stats } = action.payload;
      const channel = state.channels.find(c => c.channel_id === channelId);
      if (channel) {
        channel.latest_stats = stats;
      }
      if (state.currentChannel?.channel_id === channelId) {
        state.currentChannel.latest_stats = stats;
      }
    },
    updateVideoStats: (state, action) => {
      const { videoId, stats } = action.payload;
      const video = state.videos.find(v => v.video_id === videoId);
      if (video) {
        video.latest_stats = stats;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setChannels,
  setCurrentChannel,
  setVideos,
  updateChannelStats,
  updateVideoStats,
  setLoading,
  setError,
} = youtubeSlice.actions;

export default youtubeSlice.reducer; 