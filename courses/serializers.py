from rest_framework import serializers
from .models import Course, Module, Material, Enrollment, Progress

class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ['id', 'title', 'material_type', 'content', 'file', 'order']

class ModuleSerializer(serializers.ModelSerializer):
    materials = MaterialSerializer(many=True, read_only=True)

    class Meta:
        model = Module
        fields = ['id', 'title', 'description', 'order', 'materials']

class CourseListSerializer(serializers.ModelSerializer):
    instructor_name = serializers.CharField(source='instructor.get_full_name', read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'title', 'slug', 'description', 'price', 'instructor_name', 'thumbnail']

class CourseDetailSerializer(serializers.ModelSerializer):
    instructor_name = serializers.CharField(source='instructor.get_full_name', read_only=True)
    modules = ModuleSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'title', 'slug', 'description', 'price', 'instructor_name', 
                 'created_at', 'updated_at', 'is_published', 'thumbnail', 'modules']

class EnrollmentSerializer(serializers.ModelSerializer):
    course = CourseListSerializer(read_only=True)

    class Meta:
        model = Enrollment
        fields = ['id', 'course', 'enrolled_at', 'completed']

class ProgressSerializer(serializers.ModelSerializer):
    material_title = serializers.CharField(source='material.title', read_only=True)

    class Meta:
        model = Progress
        fields = ['id', 'material_title', 'completed', 'completed_at'] 