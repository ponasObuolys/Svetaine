from rest_framework import serializers
from .models import Category, Article, Comment, Tag

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug']

class CommentSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.get_full_name', read_only=True)
    replies = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'content', 'author_name', 'created_at', 'updated_at', 'parent', 'replies']

    def get_replies(self, obj):
        if obj.replies.exists():
            return CommentSerializer(obj.replies.filter(active=True), many=True).data
        return []

class ArticleListSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.get_full_name', read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Article
        fields = ['id', 'title', 'slug', 'summary', 'author_name', 'categories', 
                 'tags', 'image', 'created_at', 'views', 'featured']

class ArticleDetailSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.get_full_name', read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    comments = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = ['id', 'title', 'slug', 'content', 'summary', 'author_name', 
                 'categories', 'tags', 'image', 'created_at', 'updated_at', 
                 'views', 'featured', 'comments']

    def get_comments(self, obj):
        return CommentSerializer(
            obj.comments.filter(active=True, parent=None),
            many=True
        ).data 