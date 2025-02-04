from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from courses.views import (
    CourseViewSet, ModuleViewSet, MaterialViewSet,
    EnrollmentViewSet, ProgressViewSet
)
from news.views import (
    CategoryViewSet, ArticleViewSet, CommentViewSet, TagViewSet
)
from youtube_stats.views import ChannelViewSet, VideoViewSet

# Main router
router = DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'enrollments', EnrollmentViewSet, basename='enrollment')
router.register(r'categories', CategoryViewSet)
router.register(r'articles', ArticleViewSet)
router.register(r'tags', TagViewSet)
router.register(r'channels', ChannelViewSet)

# Nested routers
courses_router = routers.NestedDefaultRouter(router, r'courses', lookup='course')
courses_router.register(r'modules', ModuleViewSet, basename='course-modules')

modules_router = routers.NestedDefaultRouter(courses_router, r'modules', lookup='module')
modules_router.register(r'materials', MaterialViewSet, basename='module-materials')

enrollments_router = routers.NestedDefaultRouter(router, r'enrollments', lookup='enrollment')
enrollments_router.register(r'progress', ProgressViewSet, basename='enrollment-progress')

articles_router = routers.NestedDefaultRouter(router, r'articles', lookup='article')
articles_router.register(r'comments', CommentViewSet, basename='article-comments')

channels_router = routers.NestedDefaultRouter(router, r'channels', lookup='channel')
channels_router.register(r'videos', VideoViewSet, basename='channel-videos')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(courses_router.urls)),
    path('', include(modules_router.urls)),
    path('', include(enrollments_router.urls)),
    path('', include(articles_router.urls)),
    path('', include(channels_router.urls)),
] 