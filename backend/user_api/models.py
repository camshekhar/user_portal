from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)

# Custom User Manager..
class UserManager(BaseUserManager):
    def create_user(self, email, fname, lname, password=None, password2 = None):
        """
        Creates and saves a User with the given email, name, tc,
        password and password2.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            fname = fname,
            lname = lname,
            
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, fname, lname, password=None):
        """
        Creates and saves a superuser with the given email, 
        name and password.
        """
        user = self.create_user(
            email,
            password=password,
            fname = fname,
            lname = lname,
            
        )
        user.is_admin = True
        user.save(using=self._db)
        return user
    
# Custom User Model..
class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name='email',
        max_length=255,
        unique=True,
    )
    fname = models.CharField(max_length=200)
    lname = models.CharField(max_length=200, default=None)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['fname', 'lname', 'email']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
