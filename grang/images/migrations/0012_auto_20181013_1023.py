# Generated by Django 2.0.8 on 2018-10-13 01:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('images', '0011_image_durationtime'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='image',
            name='durationtime',
        ),
        migrations.AddField(
            model_name='image',
            name='created',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
