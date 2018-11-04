from django.contrib.auth.models import AbstractUser
#from django.core.urlresolvers import reverse
from django.db import models #추가
#from django.db.models import CharField
#from django.urls import reverse
from django.utils.encoding import python_2_unicode_compatible #추가
from django.utils.translation import ugettext_lazy as _


class User(AbstractUser):

    """ User Model """

    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
        ('not-specified', 'Not specified')
    )

    # First Name and Last Name do not cover name patterns
    # around the globe.
   # name = CharField(_("Name of User"), blank=True, max_length=255)
    profile_image = models.ImageField(null=True)
    name = models.CharField(_("Name of User"), blank=True, max_length=255) #교체
    website = models.URLField(null=True)
    bio = models.TextField(null=True)
    phone = models.CharField(max_length=140, null=True)
    gender = models.CharField(max_length=80, choices=GENDER_CHOICES, null=True)
    subscribers = models.ManyToManyField("self", blank=True) #구독자 followers
    subscribe = models.ManyToManyField("self", blank=True) #구독하기 following
    category = models.CharField(null=True, max_length=255)

    @python_2_unicode_compatible
    def __str__(self):
        return self.username

    @property
    def post_count(self):
        return self.images.all().count()

    @property
    def subscribers_count(self):
        return self.subscribers.all().count()

    @property
    def subscribe_count(self):
        return self.subscribe.all().count()    
