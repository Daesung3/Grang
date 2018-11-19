from django.conf.urls import url
from django.urls import path
from . import views


app_name = "users"
urlpatterns = [
    path("explore/", view=views.ExploreUsers.as_view(), name="explore_users"),
    path("category/", view=views.GetCategory.as_view(), name="category"),
    path("setcategory/", view=views.SetCategory.as_view(), name="set_category"),
    path("<int:user_id>/subscribe/", view=views.SubscribeUser.as_view(), name="subscribe_user"),
    path("<int:user_id>/unsubscribe/", view=views.UnSubscribeUser.as_view(), name="subscribe_user"),
    path("<str:username>/subscribers/", view=views.UserSubscribers.as_view(), name="user_subscribers"),
    path("<str:username>/subscribe/", view=views.UserSubscribe.as_view(), name="user_subscribe"), 
    path("search/", view=views.Search.as_view(), name="user_subscribe"),
    path("<str:username>/", view=views.UserProfile.as_view(), name="user_profile"),
    path("<str:username>/password/", view=views.ChangePassword.as_view(), name="change"),
    path("login/facebook/", view=views.FacebookLogin.as_view(), name='fb_login')
]
