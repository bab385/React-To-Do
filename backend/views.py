from django.contrib.auth.models import User, Group
from .models import Note
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import UserSerializer, GroupSerializer, NoteSerializer


def backend(request):
    return render(request, 'backend/backend.html', {})


def getRoutes(request):
    return JsonResponse('Our API', safe=False)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permissions_classess = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permissions_classess = [permissions.IsAuthenticated]


class NoteViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited
    """
    queryset = Note.objects.all().order_by('-updated')
    serializer_class = NoteSerializer
    permissions_classess = [permissions.IsAuthenticated]
