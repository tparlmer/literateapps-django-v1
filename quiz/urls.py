from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('submit_answer/', views.submit_answer, name='submit_answer'),
    path('classrooms/', views.classroom_list, name='classroom_list'),
    # ... additional URLs for classroom management and student assignment
]
