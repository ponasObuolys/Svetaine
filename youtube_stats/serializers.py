from rest_framework import serializers
from .models import Channel, ChannelStatistics, Video, VideoStatistics

class ChannelStatisticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChannelStatistics
        fields = ['subscriber_count', 'view_count', 'video_count', 'timestamp']

class VideoStatisticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoStatistics
        fields = ['view_count', 'like_count', 'comment_count', 'timestamp']

class VideoSerializer(serializers.ModelSerializer):
    latest_stats = serializers.SerializerMethodField()

    class Meta:
        model = Video
        fields = ['id', 'video_id', 'title', 'description', 'thumbnail_url', 
                 'published_at', 'latest_stats']

    def get_latest_stats(self, obj):
        latest_stats = obj.statistics.first()
        if latest_stats:
            return VideoStatisticsSerializer(latest_stats).data
        return None

class ChannelSerializer(serializers.ModelSerializer):
    latest_stats = serializers.SerializerMethodField()
    recent_videos = serializers.SerializerMethodField()

    class Meta:
        model = Channel
        fields = ['id', 'channel_id', 'title', 'description', 'custom_url', 
                 'thumbnail_url', 'latest_stats', 'recent_videos']

    def get_latest_stats(self, obj):
        latest_stats = obj.statistics.first()
        if latest_stats:
            return ChannelStatisticsSerializer(latest_stats).data
        return None

    def get_recent_videos(self, obj):
        recent_videos = obj.videos.all()[:5]
        return VideoSerializer(recent_videos, many=True).data

class ChannelDetailSerializer(ChannelSerializer):
    stats_history = serializers.SerializerMethodField()
    videos = VideoSerializer(many=True, read_only=True)

    class Meta(ChannelSerializer.Meta):
        fields = ChannelSerializer.Meta.fields + ['stats_history', 'videos']

    def get_stats_history(self, obj):
        stats_history = obj.statistics.all()[:30]  # Last 30 data points
        return ChannelStatisticsSerializer(stats_history, many=True).data 