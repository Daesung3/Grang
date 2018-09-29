from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from taggit.managers import TaggableManager
from grang.users import models as user_models


@python_2_unicode_compatible
class TimeStampedModel(models.Model):

     created_at = models.DateTimeField(auto_now_add=True) #처음 애드 되었을 때만 설치 1-20
     updated_at = models.DateTimeField(auto_now=True)

     class Meta:
        abstract = True


@python_2_unicode_compatible
class Image(TimeStampedModel):

    """ Image Model """

    file = models.ImageField() #사진 올림
    location = models.CharField(max_length=140)
    caption = models.TextField()
    creator = models.ForeignKey(user_models.User, on_delete=models.CASCADE, null=True, related_name='images')
    tags = TaggableManager()

    @property
    def like_count(self):
        return self.likes.all().count()
    
    @property
    def comment_count(self):
        return self.comments.all().count()

    def __str__(self):
        return '{} - {}'.format(self.location, self.caption)

    class Meta:
        ordering = ['-created_at'] 

@python_2_unicode_compatible
class Comment(TimeStampedModel): #댓글

    """ Comment Model """

    message = models.TextField() #대화에 이용 가능 ?
    creator = models.ForeignKey(user_models.User, on_delete=models.PROTECT, null=True)
    image = models.ForeignKey(Image, on_delete=models.CASCADE, null=True, related_name='comments')

    def __str__(self):
        return self.message

@python_2_unicode_compatible
class Like(TimeStampedModel):    

    """ Like Model """ 

    creator = models.ForeignKey(user_models.User, on_delete=models.PROTECT, null=True)
    image = models.ForeignKey(Image, on_delete=models.CASCADE, null=True, related_name='likes')

    def __str__(self):
        return 'User: {} - Image Caption: {}'.format(self.creator.username, self.image.caption)

#class Cock(TimeStampedModel): #Cock 1-22#

    """ Cock Model """