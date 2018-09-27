from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from grang.users import models as user_models
from grang.images import models as image_models

class Notification(image_models.TimeStampedModel):

    TYPE_CHOICES = (
        ('like', 'Like'),
        ('comment', 'Comment'),
        ('subscribe', 'Subscribe')
    )

    creator = models.ForeignKey(user_models.User, on_delete=models.PROTECT, related_name='creator')
    to = models.ForeignKey(user_models.User, on_delete=models.PROTECT, related_name='to')
    notification_type = models.CharField(max_length=80, choices=TYPE_CHOICES)
    image = models.ForeignKey(image_models.Image, on_delete=models.PROTECT, null=True, blank=True)
    comment = models.TextField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return 'From: {} - To: {}'.format(self.creator, self.to)