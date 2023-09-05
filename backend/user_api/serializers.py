from rest_framework import serializers
from .models import User

class UserRegistrationSerializer(serializers.ModelSerializer):
    # To confirm password field in Registration request.
    password2 = serializers.CharField(style={'input_type':'password'}, write_only = True)
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs={
            'password':{'write_only': True}
        }
    # Validating Password and confirm password while registration.
    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if (password != password2):
            raise serializers.ValidationError("Password and Confirm Password doesn't match.")
        return attrs
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data) 
    
class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    class Meta:
        model = User
        fields = ['email', 'password']
        
class UserChangePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
    password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
    
    class Meta:
        model = User
        fields = ['password', 'password2']
    
    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        user = self.context.get('user')
        if (password != password2):
            raise serializers.ValidationError("Password and Confirm Password doesn't match.")
        user.set_password(password)
        user.save()
        return attrs
        
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['fname', 'lname', 'email']