from rest_framework import serializers
from . import models
from grang.images import serializers as images_serializers

class UserProfileSerializer(serializers.ModelSerializer):

    images = images_serializers.CountImageSerializer(many=True, read_only=True)
    post_count = serializers.ReadOnlyField() #ReadOnlyField >> 해당 모델은 수정하지 않겠다!
    subscribers_count = serializers.ReadOnlyField()
    subscribe_count = serializers.ReadOnlyField()

    class Meta:
        model = models.User
        fields = (
            'profile_image',
            'username',
            'name',
            'bio',
            'website',
            'post_count',
            'subscribers_count',
            'subscribe_count',
            'images'
        )

class ListUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.User
        fields = (
            'id',
            'profile_image',
            'username',
            'name'
        )