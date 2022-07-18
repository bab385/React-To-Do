from django.shortcuts import render
from backend.serializers import NoteSerializer
from rest_framework import viewsets
from backend.models import Note


def index(request):
    return render(request, 'index.html', {})
