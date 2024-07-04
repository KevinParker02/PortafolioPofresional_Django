from django.contrib import admin
from .models import Categoria, Tecnologia, Proyecto, Habilidad, Certificado

# Registro de modelos en el panel de administración
admin.site.register(Categoria)
admin.site.register(Tecnologia)
admin.site.register(Proyecto)
admin.site.register(Habilidad)
admin.site.register(Certificado)
