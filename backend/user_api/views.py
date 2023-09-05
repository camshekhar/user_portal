from rest_framework.response import Response
from .models import User
from .serializers import UserChangePasswordSerializer, UserLoginSerializer, UserProfileSerializer, UserRegistrationSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
# Create your views here.

# Manually generate Token for Authentication.
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
    
    
@api_view(['POST'])
def userRegistration(request):
    userRegSerializer = UserRegistrationSerializer(data=request.data)
    if (userRegSerializer.is_valid(raise_exception=True)):
        user = userRegSerializer.save()
        token = get_tokens_for_user(user)
        return Response({'token': token,'msg': 'Registration Successful.'}, status=status.HTTP_201_CREATED)
    return Response(userRegSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def userLogin(request):
    userLogSerializer = UserLoginSerializer(data=request.data)
    if (userLogSerializer.is_valid(raise_exception=True)):
        email = userLogSerializer.data.get('email')
        password = userLogSerializer.data.get('password')
        user = authenticate(email=email, password=password)
        if (user is not None):
            token = get_tokens_for_user(user)
            return Response({'token': token, 'msg': 'Login Successful.'}, status=status.HTTP_200_OK)
        else:
            return Response({'errors':{'non_field_errors':['Email or Password is not Valid!']}}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def userChangePassword(request):
    changePswdSerializer = UserChangePasswordSerializer(data=request.data, context={'user':request.user})
    if changePswdSerializer.is_valid(raise_exception=True):
        return Response({'msg': 'Password Changed Successfully.'}, status=status.HTTP_202_ACCEPTED)
    
    return Response(changePswdSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes((IsAuthenticated, )) 
def userProfile(request):  
    userSerializer = UserProfileSerializer(request.user)
    print(userSerializer.data)
    return Response(userSerializer.data, status=status.HTTP_200_OK)