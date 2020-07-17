from django.db import models
import uuid
# Create your models here.

class Categories(models.Model):
    category = models.CharField(max_length=40)
    def __str__(self):
        return self.category

class BlogPost(models.Model):
    date = models.DateField(auto_now=True)
    category = models.ForeignKey('Categories',on_delete=models.CASCADE)
    title = models.CharField(max_length=40)
    text = models.TextField()
    idtag = models.UUIDField(primary_key=True,default=uuid.uuid4,unique=True)
    def __str__(self):
        return self.title