from django.shortcuts import render
from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import F
from django.utils import timezone
from .models import Category, Article, Comment, Tag
from .serializers import (
    CategorySerializer, ArticleListSerializer, ArticleDetailSerializer,
    CommentSerializer, TagSerializer
)

# Create your views here.

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'content', 'summary']
    ordering_fields = ['created_at', 'views', 'title']
    ordering = ['-created_at']

    def get_serializer_class(self):
        if self.action == 'list':
            return ArticleListSerializer
        return ArticleDetailSerializer

    def get_queryset(self):
        queryset = Article.objects.all()
        if self.action == 'list':
            queryset = queryset.filter(published=True)
        
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(categories__slug=category)
        
        tag = self.request.query_params.get('tag', None)
        if tag:
            queryset = queryset.filter(tags__slug=tag)
        
        return queryset

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views = F('views') + 1
        instance.save()
        instance.refresh_from_db()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def comment(self, request, slug=None):
        article = self.get_object()
        serializer = CommentSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(
                article=article,
                author=request.user,
                created_at=timezone.now()
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Comment.objects.filter(
            article__slug=self.kwargs['article_slug'],
            active=True
        )

    def perform_create(self, serializer):
        article = Article.objects.get(slug=self.kwargs['article_slug'])
        serializer.save(
            article=article,
            author=self.request.user,
            created_at=timezone.now()
        )
