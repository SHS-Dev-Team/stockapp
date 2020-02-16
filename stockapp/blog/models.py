from django.db import models
import uuid

class Post(models.Model):
    title = models.CharField(max_length=100)
    body = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    idtag = models.UUIDField(primary_key=True,default=uuid.uuid4,unique=True)
class Comment(models.Model):
    text=models.TextField(max_length=400,editable=True)
    date=models.DateTimeField('date published')

# Create your models here.
