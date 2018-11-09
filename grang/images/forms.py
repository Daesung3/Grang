from django import forms
from django.forms import ModelForm
from .models import Image

class UploadFileForm(forms.ModelForm):
    class Meta:
        model = Image
        fields = ('category', 'caption', 'location', 'file')

    def __init__(self, *args, **kwargs):
        super(ModelForm, self).__init__(*args, **kwargs)
        self.fields['file'].required = False