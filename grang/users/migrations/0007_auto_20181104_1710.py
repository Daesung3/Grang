# Generated by Django 2.0.8 on 2018-11-04 08:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_auto_20181011_1604'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='category1',
            new_name='category',
        ),
        migrations.RemoveField(
            model_name='user',
            name='category2',
        ),
        migrations.RemoveField(
            model_name='user',
            name='category3',
        ),
    ]
