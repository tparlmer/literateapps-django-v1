from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from .models import Classroom, Student
from .forms import ClassroomForm

# List all classrooms
def classroom_list(request):
    classrooms = Classroom.objects.all()
    return render(request, 'quiz/classroom_list.html', {'classrooms': classrooms})

# Create a new classroom
def classroom_create(request):
    if request.method == 'POST':
        form = ClassroomForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Classroom created successfully.')
            return redirect('classroom_list')
    else:
        form = ClassroomForm()
    return render(request, 'quiz/classroom_create.html', {'form': form})

# Edit an existing classroom
def classroom_edit(request, classroom_id):
    classroom = get_object_or_404(Classroom, pk=classroom_id)
    if request.method == 'POST':
        form = ClassroomForm(request.POST, instance=classroom)
        if form.is_valid():
            form.save()
            messages.success(request, 'Classroom updated successfully.')
            return redirect('classroom_list')
    else:
        form = ClassroomForm(instance=classroom)
    return render(request, 'quiz/classroom_edit.html', {'form': form})

# Delete a classroom
def classroom_delete(request, classroom_id):
    classroom = get_object_or_404(Classroom, pk=classroom_id)
    classroom.delete()
    messages.success(request, 'Classroom deleted successfully.')
    return redirect('classroom_list')

# Assign students to a classroom
def classroom_assign_students(request, classroom_id):
    classroom = get_object_or_404(Classroom, pk=classroom_id)
    if request.method == 'POST':
        student_ids = request.POST.getlist('students')
        students = Student.objects.filter(id__in=student_ids)
        classroom.students.set(students)
        messages.success(request, 'Students assigned successfully.')
        return redirect('classroom_list')
    else:
        students = Student.objects.all()
    return render(request, 'quiz/classroom_assign_students.html', {'classroom': classroom, 'students': students})
