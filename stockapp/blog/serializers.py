from rest_framework import serializers
from .models import Post

class LeadSerializer (serializers.ModelSerializer):
    class Meta:
        model = Post
        fields=('title','body','date','idtag')