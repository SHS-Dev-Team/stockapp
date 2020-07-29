from rest_framework import serializers
from django.contrib.auth.models import User
from ..models import BlogPost

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')


class BlogSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()

    class Meta:
        model = BlogPost
        fields = ('date','category','title','text','idtag')