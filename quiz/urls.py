from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('submit-answer/', views.submit_answer, name='submit_answer'),
]


