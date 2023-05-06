from django.db import models

# Create your models here.

class Classroom(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    classrooms = models.ManyToManyField(Classroom)

    def __str__(self):
        return self.user.username