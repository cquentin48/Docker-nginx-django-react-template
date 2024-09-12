from django.db import models
from server.settings import LOCALE

# Create your models here.
class ObjectModel(models.Model):
    """Sample Object model use for template website

    Properties:
        id (IntegerField): primary key of the object
        name (CharField): object name
    """
    id = models.AutoField(primary_key=True)

    name= models.CharField(
        verbose_name=LOCALE.load_localised_text("OBJECT_CLASS_NAME_PROPERTY_LABEL"),
        max_length=255
    )

    def __str__(self) -> str:
        return str(self.name)
