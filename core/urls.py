from django.urls import path
from .views import IndexView, DashboardView

app_name = 'core'

urlpatterns = [
    path('', IndexView.as_view(), name='home'),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    # React router will handle these URLs on the frontend
    path('courses/', IndexView.as_view(), name='courses'),
    path('courses/<slug:slug>/', IndexView.as_view(), name='course-detail'),
    path('news/', IndexView.as_view(), name='news'),
    path('news/<slug:slug>/', IndexView.as_view(), name='article-detail'),
    path('youtube/', IndexView.as_view(), name='youtube'),
] 