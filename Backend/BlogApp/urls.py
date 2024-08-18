from django.urls import path
from .import views
from BlogApp.views import AllPostsListGetAPIView, PostCreateAPIView, PostListByFileID,DeletePostAPIView,PostUpdateAPIView
urlpatterns = [
    path('blog/',views.home, name='home'),
    path('get-all-post/',AllPostsListGetAPIView.as_view(),name='get-all-post'),
    path('get-post-list/',PostListByFileID.as_view(), name='get-post-list'),
    path('post-create/', PostCreateAPIView.as_view(), name='post-create'),
    path('post-update/', PostUpdateAPIView.as_view(), name='post-update'),
    path('post-delete/', DeletePostAPIView.as_view(), name='post-delete'),
    path('register/', views.user_registration, name='user-registration'),
    path('users/', views.users, name='users'),

]
