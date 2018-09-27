from django.contrib import admin
from . import models
# Register your models here.

@admin.register(models.Notification)
class NoticationAdmin(admin.ModelAdmin):

    list_display = (
        'creator',
        'to',
        'notification_type',
    )