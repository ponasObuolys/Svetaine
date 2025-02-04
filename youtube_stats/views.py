from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from googleapiclient.discovery import build
from django.conf import settings
from .models import Channel, ChannelStatistics, Video, VideoStatistics
from .serializers import (
    ChannelSerializer, ChannelDetailSerializer, VideoSerializer,
    ChannelStatisticsSerializer, VideoStatisticsSerializer
)

# Create your views here.

class ChannelViewSet(viewsets.ModelViewSet):
    queryset = Channel.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'channel_id'

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ChannelDetailSerializer
        return ChannelSerializer

    @action(detail=True, methods=['post'])
    def refresh_stats(self, request, channel_id=None):
        channel = self.get_object()
        youtube = build('youtube', 'v3', developerKey=settings.YOUTUBE_API_KEY)

        # Get channel statistics
        channel_response = youtube.channels().list(
            part='statistics,snippet',
            id=channel.channel_id
        ).execute()

        if channel_response['items']:
            stats = channel_response['items'][0]['statistics']
            channel_stats = ChannelStatistics.objects.create(
                channel=channel,
                subscriber_count=stats['subscriberCount'],
                view_count=stats['viewCount'],
                video_count=stats['videoCount'],
                timestamp=timezone.now()
            )

            # Get recent videos
            videos_response = youtube.search().list(
                part='id,snippet',
                channelId=channel.channel_id,
                order='date',
                type='video',
                maxResults=10
            ).execute()

            for item in videos_response['items']:
                video_id = item['id']['videoId']
                video, created = Video.objects.get_or_create(
                    channel=channel,
                    video_id=video_id,
                    defaults={
                        'title': item['snippet']['title'],
                        'description': item['snippet']['description'],
                        'thumbnail_url': item['snippet']['thumbnails']['high']['url'],
                        'published_at': item['snippet']['publishedAt']
                    }
                )

                # Get video statistics
                video_response = youtube.videos().list(
                    part='statistics',
                    id=video_id
                ).execute()

                if video_response['items']:
                    video_stats = video_response['items'][0]['statistics']
                    VideoStatistics.objects.create(
                        video=video,
                        view_count=video_stats.get('viewCount', 0),
                        like_count=video_stats.get('likeCount', 0),
                        comment_count=video_stats.get('commentCount', 0),
                        timestamp=timezone.now()
                    )

            return Response(ChannelStatisticsSerializer(channel_stats).data)
        return Response({'error': 'Could not fetch channel statistics'}, status=400)

class VideoViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = VideoSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Video.objects.filter(channel__channel_id=self.kwargs['channel_channel_id'])
