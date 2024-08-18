from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render
from rest_framework.generics import CreateAPIView, ListAPIView, UpdateAPIView
from rest_framework.views import APIView
from django.contrib.auth.models import User

from BlogApp.models import Post
from BlogApp.serializers import PostSerializer, UserRegSerializer, UserSerializer

# Create your views here.
@api_view()
def home(request):
    posts = Post.objects.all()
    serialize = PostSerializer(posts, many = True)
    return Response(serialize.data)

class AllPostsListGetAPIView(ListAPIView):
    serializer_class = PostSerializer
    def get(self, request, *args, **kwargs):
        try:
            post_list = Post.objects.all().order_by('-created_at')
            # Serialize the full post list
            serialized_data = self.serializer_class(post_list, many=True)
            return Response({
                    "data": serialized_data.data,
                    "message": "fetch successfully",
                    "status": 200
                })
        except Exception as e:
            # Handle any exceptions and return an error response
            return Response({
                "message": str(e),
                "status": 400
            })

class PostListByFileID(APIView):
    def get(self, request, *args, **kwargs):
        # Extract posts_id from query parameters
        posts_id = request.query_params.get('posts_id')
        if not posts_id:
            return Response({
                "message": "posts_id is required",
                "status": 400
            }, status=400)
        
        try:
            # Fetch posts matching the posts_id
            posts_data = Post.objects.filter(id=posts_id).order_by('-created_at')
            if not posts_data.exists():
                return Response({
                    "message": "No posts found for the provided posts_id",
                    "status": 404
                }, status=404)

            # Serialize the queryset
            serialized_data = PostSerializer(posts_data, many=True)
            return Response({
                "data": serialized_data.data,
                "message": "Fetch successful",
                "status": 200
            }, status=200)
        except Exception as e:
            return Response({
                "message": str(e),
                "status": 400
            }, status=400)



class PostCreateAPIView(CreateAPIView):
    serializer_class = PostSerializer

    def post(self, request, *args, **kwargs):
        title_data = request.data.get('title')
        content_data = request.data.get('content')
        image_data = request.FILES.get('image')

        # Validate required fields
        if not title_data:
            return Response({
                "message": "Title is required",
                "status": status.HTTP_400_BAD_REQUEST
            }, status=status.HTTP_400_BAD_REQUEST)
        if not content_data:
            return Response({
                "message": "Content is required",
                "status": status.HTTP_400_BAD_REQUEST
            }, status=status.HTTP_400_BAD_REQUEST)
        if not image_data:
            return Response({
                "message": "Image is required",
                "status": status.HTTP_400_BAD_REQUEST
            }, status=status.HTTP_400_BAD_REQUEST)

        # Create a new post
        try:
            post_data = Post.objects.create(
                title=title_data,
                content=content_data,
                image=image_data
            )
            serialized_data = self.get_serializer(post_data)
            return Response({
                "data": serialized_data.data,
                "message": "Post created successfully",
                "status": status.HTTP_201_CREATED
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({
                "message": str(e),
                "status": status.HTTP_400_BAD_REQUEST
            }, status=status.HTTP_400_BAD_REQUEST)


class PostUpdateAPIView(UpdateAPIView):
    serializer_class = PostSerializer

    def put(self, request, *args, **kwargs):
        # Extract post_id from query parameters
        post_id = request.query_params.get('post_id')
        if not post_id:
            return Response({
                "message": "post_id is required",
                "status": status.HTTP_400_BAD_REQUEST
            }, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Retrieve the post instance based on the post_id
            post_instance = Post.objects.get(id=post_id)
            serializer = self.get_serializer(post_instance, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({
                    "data": serializer.data,
                    "message": "Post updated successfully",
                    "status": status.HTTP_200_OK
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    "message": "Validation failed",
                    "errors": serializer.errors,
                    "status": status.HTTP_400_BAD_REQUEST
                }, status=status.HTTP_400_BAD_REQUEST)
        except Post.DoesNotExist:
            return Response({
                "message": "Post not found",
                "status": status.HTTP_404_NOT_FOUND
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({
                "message": str(e),
                "status": status.HTTP_400_BAD_REQUEST
            }, status=status.HTTP_400_BAD_REQUEST)


class DeletePostAPIView(APIView):
    def post(self, request, *args, **kwargs):
        # Extract post_id from query parameters
        post_id = request.query_params.get('post_id')
        if not post_id:
            return Response({
                "message": "post_id is required",
                "status": status.HTTP_400_BAD_REQUEST
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Retrieve the post instance based on the post_id
            post_instance = Post.objects.get(id=post_id)
            post_instance.delete()
            return Response({
                "message": "Post deleted successfully",
                "status": status.HTTP_204_NO_CONTENT
            }, status=status.HTTP_204_NO_CONTENT)
        except Post.DoesNotExist:
            return Response({
                "message": "Post not found",
                "status": status.HTTP_404_NOT_FOUND
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({
                "message": str(e),
                "status": status.HTTP_400_BAD_REQUEST
            }, status=status.HTTP_400_BAD_REQUEST)



@api_view()
def users(request):
    user = User.objects.all()
    serialize = UserSerializer(user, many = True)
    return Response(serialize.data)



@api_view(['POST'])
def user_registration(request):
    serializer = UserRegSerializer(data=request.data)
    print('The register data is ', request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    print('there is an error ', serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)