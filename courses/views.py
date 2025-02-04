from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Course, Module, Material, Enrollment, Progress
from .serializers import (
    CourseListSerializer, CourseDetailSerializer, ModuleSerializer,
    MaterialSerializer, EnrollmentSerializer, ProgressSerializer
)

# Create your views here.

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'list':
            return CourseListSerializer
        return CourseDetailSerializer

    def get_queryset(self):
        queryset = Course.objects.all()
        if self.action == 'list':
            queryset = queryset.filter(is_published=True)
        return queryset

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def enroll(self, request, slug=None):
        course = self.get_object()
        user = request.user

        if Enrollment.objects.filter(user=user, course=course).exists():
            return Response(
                {'detail': 'Already enrolled in this course.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        enrollment = Enrollment.objects.create(user=user, course=course)
        serializer = EnrollmentSerializer(enrollment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class ModuleViewSet(viewsets.ModelViewSet):
    serializer_class = ModuleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Module.objects.filter(course__slug=self.kwargs['course_slug'])

class MaterialViewSet(viewsets.ModelViewSet):
    serializer_class = MaterialSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Material.objects.filter(
            module__course__slug=self.kwargs['course_slug'],
            module__id=self.kwargs['module_pk']
        )

class EnrollmentViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Enrollment.objects.filter(user=self.request.user)

    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        enrollment = self.get_object()
        enrollment.completed = True
        enrollment.save()
        return Response({'status': 'course marked as completed'})

class ProgressViewSet(viewsets.ModelViewSet):
    serializer_class = ProgressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Progress.objects.filter(
            enrollment__user=self.request.user,
            enrollment__id=self.kwargs['enrollment_pk']
        )

    def perform_create(self, serializer):
        enrollment = get_object_or_404(
            Enrollment,
            id=self.kwargs['enrollment_pk'],
            user=self.request.user
        )
        serializer.save(enrollment=enrollment)
