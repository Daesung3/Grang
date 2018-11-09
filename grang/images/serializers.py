from rest_framework import serializers
from taggit_serializer.serializers import (TagListSerializerField,
                                           TaggitSerializer)
from . import models
from grang.users import models as user_models

class SmallImageSerializer(serializers.ModelSerializer):

    """ Used for the notifications """
    
    class Meta:
        model = models.Image
        fields = (
            'file',
        )

class CountImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Image
        fields = (
            'id',
            'file',
            'comment_count',
            'like_count'
        )

class FeedUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = user_models.User
        fields = (
            'username',
            'profile_image'
        )


class CommentSerializer(serializers.ModelSerializer):

    creator = FeedUserSerializer(read_only=True)

    class Meta:
        model = models.Comment
        fields = (
            'id',
            'message',
            'creator',
            'natural_time'
        )


class LikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Like
        fields = '__all__'



class ImageSerializer(TaggitSerializer, serializers.ModelSerializer):

    comments = CommentSerializer(many=True) #models의 related_name
    creator = FeedUserSerializer()
    tags = TagListSerializerField()
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = models.Image
        fields = (
            'id',
            'file',
            'location',
            'caption',
            'comments', #21행 저장
            'like_count',
            'creator',
            'tags',
            'natural_time',
            'created_at',
            'is_liked',
            'category'
        )
    
    def get_is_liked(self, obj):
        if 'request' in self.context:
            request = self.context['request']
            try:
                models.Like.objects.get(creator_id=request.user.id, image__id=obj.id)
                return True
            except models.Like.DoesNotExist:
                return False
        return False

class InputImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Image
        fields = (
            'file',
            'location',
            'caption',
            'category'
        )

        