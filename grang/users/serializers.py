from rest_framework import serializers
from . import models
from grang.images import serializers as images_serializers

class UserProfileSerializer(serializers.ModelSerializer):

    images = images_serializers.CountImageSerializer(many=True, read_only=True)
    post_count = serializers.ReadOnlyField() #ReadOnlyField >> 해당 모델은 수정하지 않겠다!
    subscribers_count = serializers.ReadOnlyField()
    subscribe_count = serializers.ReadOnlyField()
    is_self = serializers.SerializerMethodField()
    subscribe = serializers.SerializerMethodField()

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
            'images',
            'is_self',
            'subscribe',
            'category'
        )

    def get_is_self(self, user):
        if 'request' in self.context:
            request = self.context['request']
            if user.id == request.user.id:
                return True
            else:
                return False
        return False

    def get_subscribe(self, obj):
        if 'request' in self.context:
            request = self.context['request']
            if obj in request.user.subscribe.all():
                return True
        return False

    

class ListUserSerializer(serializers.ModelSerializer):

    subscribe = serializers.SerializerMethodField()

    class Meta:
        model = models.User
        fields = (
            'id',
            'profile_image',
            'username',
            'name'
        )

    def get_subscribe(self, obj):
        if 'request' in self.context:
            request = self.context['request']
            if obj in request.user.subscribe.all():
                return True
        return False