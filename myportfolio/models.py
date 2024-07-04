from django.db import models
from ckeditor.fields import RichTextField
from .utils import encrypt_message, decrypt_message

# Modelo para las categorías de los proyectos
class Categoria(models.Model):
    nombre = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.nombre

# Modelo para las tecnologías utilizadas en los proyectos
class Tecnologia(models.Model):
    nombre = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.nombre

# Modelo para los PROYECTOS PORTAFOLIO
class Proyecto(models.Model):
    titulo = models.CharField(max_length=200)
    imagen = models.ImageField(upload_to='proyectos/')
    descripcion = models.TextField()
    contenido = RichTextField()
    tecnologias = models.ManyToManyField(Tecnologia)
    link_sitio = models.URLField(max_length=200)
    link_repositorio = models.URLField(max_length=200, blank=True, null=True)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)

    def __str__(self):
        return self.titulo
    
# Modelo para mis HABILIDADES
class Habilidad(models.Model):
    imagen = models.ImageField(upload_to='habilidades/')
    tituloHab = models.CharField(max_length=200)
    descripcion = models.TextField()
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)

    def __str__(self):
        return self.tituloHab
    
# Modelo para mis CERTIFICADOS
class Certificado(models.Model):
    imagen = models.ImageField(upload_to='certificados/')
    def __str__(self):
        return self.imagen.url

# Modelo para el formulario
class Contacto(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField()
    mensaje = models.TextField()
    mensaje_cifrado = models.TextField(default='')  # Campo para almacenar el mensaje cifrado
    fecha = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Cifra el mensaje antes de guardarlo
        self.mensaje_cifrado = encrypt_message(self.mensaje)
        super().save(*args, **kwargs)

    def get_mensaje(self):
        # Descifra el mensaje al recuperarlo
        return decrypt_message(self.mensaje_cifrado)

    def __str__(self):
        return self.nombre