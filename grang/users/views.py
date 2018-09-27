from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers
from grang.notifications import views as notification_views


class ExploreUsers(APIView):

    def get(self, request, format=None):

        last_five = models.User.objects.all().order_by('date_joined')[:5]

        serializer = serializers.ListUserSerializer(last_five, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK) 


class SubscribeUser(APIView):

    def post(self, request, user_id, format=None):

        user = request.user

        try:
            user_to_subscribe = models.User.objects.get(id=user_id)
        except models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user.subscribe.add(user_to_subscribe)

        user.save()

        notification_views.create_notification(user, user_to_subscribe, 'subscribe')

        return Response(status=status.HTTP_200_OK)


class UnSubscribeUser(APIView):

    def post(self, request, user_id, format=None):

        user = request.user

        try:
            user_to_subscribe = models.User.objects.get(id=user_id)
        except models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user.subscribe.remove(user_to_subscribe)

        user.save()

        return Response(status=status.HTTP_200_OK)


class UserProfile(APIView):

    def get(self, request, username, format=None):

        try:
            found_user = models.User.objects.get(username=username)
        except models.User.DoesNotExist:
            return response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.UserProfileSerializer(found_user)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class UserSubscribers(APIView):

    def get(self, request, username, format=None):

        try:
            found_user = models.User.objects.get(username=username)
        except models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user_subscribers = found_user.subscribers.all()

        serializer = serializers.ListUserSerializer(user_subscribers, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class UserSubscribe(APIView):

    def get(self, request, username, format=None):

        try:
            found_user = models.User.objects.get(username=username)
        except models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user_subscribe = found_user.subscribe.all()

        serializer = serializers.ListUserSerializer(user_subscribe, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class Search(APIView):

    def get(self, request, format=None):

        username = request.query_params.get('username', None)

        if username is not None:

            users = models.User.objects.filter(username__icontains=username)

            serializer = serializers.ListUserSerializer(users, many=True)

            return Response(data=serializer.data, status=status.HTTP_200_OK)

        else:

            return Response(status=status.HTTP_400_BAD_REQUEST)