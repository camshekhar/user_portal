from django.urls import path
from . import views

urlpatterns = [
    # URLs for RETRIEVE data.
   # Authentication URLs...
    path('registration/', views.userRegistration, name='register'),
    path('user/login/', views.userLogin, name='login'),
    
    # User Profile Dashboard Url..
    path('userProfile/', views.userProfile, name='user_profile'),
    path('changePassword/', views.userChangePassword, name='change_password'),

]