# Brain Tumor Detection App 🧠

¡Bienvenido a mi proyecto de detección de tumores cerebrales! Esta aplicación usa inteligencia artificial para analizar imágenes MRI y detectar posibles tumores, mostrando una máscara de segmentación y una superposición visual. Está construida con React (frontend), FastAPI (backend), Nginx (proxy inverso), y Docker para un despliegue súper sencillo. Además, usa ngrok para exponer la app públicamente sin costo.🚀

<a target="_blank" align="center">
  <img align="center" height="400" width="1000" alt="GIF" src="https://github.com/IVANMORAG/MRITumorDetectorAI/blob/main/recursos/MRI-Detector.gif">
</a>

<br>

## Características

* 📷 **Sube imágenes MRI:** Carga imágenes en formatos PNG, JPG, o TIFF.
  
* 🧠 **Detección de tumores:** Un modelo de clasificación (ResNet-50) predice si hay un tumor.
  
* 🎨 **Segmentación:** Un modelo de segmentación (ResUNet) genera una máscara del tumor.
  
* 🖼️ **Visualización:** Muestra la imagen original, la máscara, y una superposición con el tumor resaltado en rojo.
  
* 🐳 **Dockerizado:** Todo corre en contenedores con docker-compose.
  
* 🌐 **Exposición pública:** Usa ngrok para acceder a la app desde cualquier lugar.
  
* ⚡ **Rápido y ligero:** Configurado para ser eficiente y fácil de usar.


<br>

## Arquitectura

* **Frontend** (<span style="color: #B388FF;">*frontend/*</span>):
  * React para la interfaz de usuario.
  
  * Nginx sirve los archivos estáticos y enruta las peticiones <span style="color: #B388FF;">/api/</span> al backend.

* **Backend** (<span style="color: #B388FF;">*backend/*</span>):
    * FastAPI (<span style="color: #B388FF;">*app.py*</span>) maneja la API.
  
    * TensorFlow (<span style="color: #B388FF;">*model.py*</span>) carga modelos de clasificación y segmentación desde <span style="color: #B388FF;">*./backend/weights*</span>.

* **Docker:**
  * <span style="color: #B388FF;">*docker-compose.yml*</span> define tres servicios: <span style="color: #B388FF;">*frontend*</span>, <span style="color: #B388FF;">*backend*</span>, y <span style="color: #B388FF;">*ngrok*</span>.

* **ngrok:**
    * Expone el frontend en <span style="color: #B388FF;">*https://your-domain.ngrok-free.app*</span> usando un token en <span style="color: #B388FF;">*.env*</span>.

<br>

## Requisitos

* 🐳 **Docker y Docker Compose** (para correr los contenedores).
  
* 📦 **Node.js** (para construir el frontend localmente, si es necesario).
  
* 🐍 **Python 3.9+** (para pruebas locales del backend, opcional).
  
* 🌐 **Cuenta de ngrok** (gratis) con un dominio personalizado y authtoken.
  
* 🧠 **Modelos de TensorFlow** (descarga los modelos y colócalos en ./backend/weights).


<br>

## Instalación

### 1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
```


### 2. Configura los modelos:

* Descarga los modelos de TensorFlow (<span style="color: #B388FF;">*resnet-50-MRI.json*</span>, <span style="color: #B388FF;">*weights.hdf5*</span>, <span style="color: #B388FF;">*ResUNet-MRI.json*</span>, <span style="color: #B388FF;">*weights_seg.hdf5*</span>).
  
* Colócalos en <span style="color: #B388FF;">*./backend/weights/*</span>.
  
* Nota: Los modelos no están en el repo porque son pesados. ¡Consíguelos de tu fuente confiable! 😎
  

### 3.Configura ngrok:

* Crea una cuenta en ngrok.com y obtén tu *NGROK_AUTHTOKEN*.
  
* Crea un dominio personalizado (por ejemplo, *poorly-free-insect.ngrok-free.app*).
  
* Crea un archivo *.env* en la raíz del proyecto
```bash
NGROK_AUTHTOKEN=tu-authtoken-aqui
```
  

### 4. Construye y levanta los contenedores:
```bash
docker-compose up --build
```


### 5. Accede a la app:

* Abre *https://tu-dominio.ngrok-free.app* en tu navegador.
  
* La API está disponible en *https://tu-dominio.ngrok-free.app/api/predict*.


<br>

## Uso

### 1. Sube una imagen MRI:

* Usa la interfaz web para cargar una imagen MRI (PNG, JPG, o TIFF).
  
* La app mostrará:
  
  * Si hay un tumor (has_tumor).
    
  * La probabilidad del tumor (tumor_probability).
    
  * La imagen original.
    
  * La máscara del tumor (blanca).
    
  * La imagen con el tumor resaltado en rojo.


### 2. Prueba la API:

* Envía una imagen a la API:

```bash
curl -X POST -F "file=@mri_image.png" https://tu-dominio.ngrok-free.app/api/predict
```
 
 * Respuesta (JSON):
  
```bash
{
  "has_tumor": true,
  "tumor_probability": 0.9,
  "original_image": "base64-string",
  "mask_image": "base64-string",
  "overlay_image": "base64-string",
  "error_message": null
}
```

<br>

## Depuración:

* Revisa los logs:
```bash
{
    docker-compose logs frontend
    docker-compose logs backend
    docker-compose logs ngrok
}
```

* Asegúrate de que los modelos estén en <span style="color: #B388FF;">*./backend/weights*</span>.

<br>

## Estructura del proyecto
```
├── backend/
│   ├── app.py              # API FastAPI
│   ├── model.py            # Lógica de modelos TensorFlow
│   ├── weights/            # Modelos (no en el repo)
│   ├── Dockerfile          # Dockerfile del backend
│   ├── requirements.txt    # Dependencias de Python
├── frontend/
│   ├── nginx.conf          # Configuración de Nginx
│   ├── Dockerfile          # Dockerfile del frontend
│   ├── src/                # Código fuente de React
├── .env                    # NGROK_AUTHTOKEN (no en el repo)
├── docker-compose.yml      # Configuración de Docker
├── README.md               # Este archivo
```

<br>

## Tecnologías

* **Frontend:** React, Nginx
  
* **Backend:** FastAPI, TensorFlow

* **Contenedores:** Docker, Docker Compose

* **Exposición:** ngrok

* **Otros:** OpenCV, NumPy, Pillow, scikit-image

<br>

## Notas

* Los modelos en <span style="color: #B388FF;">*./backend/weights*</span> son necesarios para que el backend funcione. Descárgalos por separado.

* El dominio de ngrok (<span style="color: #B388FF;">*poorly-free-insect.ngrok-free.app*</span>) es un ejemplo. Usa tu propio dominio.

* El plan gratuito de ngrok tiene límites (40 conexiones/minuto). Considera un plan de pago para uso intensivo.
 
* **Este proyecto es un experimento, no lo uses para diagnósticos médicos reales!.**

<br>

## Contribuciones
¡Si quieres mejorar este proyecto, haz un fork y envía un pull request! Algunas ideas:

* Añadir más formatos de imagen.
  
* Optimizar los modelos con TensorFlow Lite.
  
* Mejorar la UI del frontend.

<br>

## Licencia
MIT License. Siéntete libre de usar este código como quieras. 😎

<br>

---

¡Gracias por revisar mi proyecto! Si te gusta, déjame una ⭐ en GitHub. ¡Jajaja, nos vemos en el código! 🚀
