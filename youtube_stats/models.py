from django.db import models
from django.utils import timezone

class Channel(models.Model):
    channel_id = models.CharField(max_length=100, unique=True)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    custom_url = models.CharField(max_length=100, blank=True)
    thumbnail_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class ChannelStatistics(models.Model):
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE, related_name='statistics')
    subscriber_count = models.PositiveIntegerField(default=0)
    view_count = models.PositiveIntegerField(default=0)
    video_count = models.PositiveIntegerField(default=0)
    timestamp = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['-timestamp']
        verbose_name_plural = 'Channel statistics'

    def __str__(self):
        return f"{self.channel.title} stats at {self.timestamp}"

class Video(models.Model):
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE, related_name='videos')
    video_id = models.CharField(max_length=100, unique=True)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    thumbnail_url = models.URLField(blank=True)
    published_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-published_at']

    def __str__(self):
        return self.title

class VideoStatistics(models.Model):
    video = models.ForeignKey(Video, on_delete=models.CASCADE, related_name='statistics')
    view_count = models.PositiveIntegerField(default=0)
    like_count = models.PositiveIntegerField(default=0)
    comment_count = models.PositiveIntegerField(default=0)
    timestamp = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['-timestamp']
        verbose_name_plural = 'Video statistics'

    def __str__(self):
        return f"{self.video.title} stats at {self.timestamp}"
