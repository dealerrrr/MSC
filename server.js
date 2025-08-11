const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

// Crear la aplicación Express
const app = express();
const port = process.env.PORT || 8080;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Servir archivos estáticos desde el directorio actual
app.use(express.static('./'));

// Asegurarse de que los directorios de datos existan
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Función para guardar datos en un archivo JSON
function saveToJsonFile(filename, data) {
  const filePath = path.join(dataDir, filename);
  let existingData = [];

  // Leer datos existentes si el archivo existe
  if (fs.existsSync(filePath)) {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      existingData = JSON.parse(fileContent);
    } catch (error) {
      console.error(`Error al leer ${filename}:`, error);
    }
  }

  // Agregar los nuevos datos
  existingData.push(data);

  // Guardar los datos actualizados
  try {
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
    return true;
  } catch (error) {
    console.error(`Error al escribir ${filename}:`, error);
    return false;
  }
}

// Endpoint para guardar emails
app.post('/api/save-email', (req, res) => {
  try {
    const emailData = req.body;

    // Validar datos
    if (!emailData.email) {
      return res.status(400).json({ error: 'El email es requerido' });
    }

    // Agregar timestamp si no existe
    if (!emailData.timestamp) {
      emailData.timestamp = new Date().toISOString();
    }

    // Guardar en email.json
    const saved = saveToJsonFile('email.json', emailData);

    if (saved) {
      console.log('Email guardado:', emailData);
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ error: 'Error al guardar el email' });
    }
  } catch (error) {
    console.error('Error en /api/save-email:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Endpoint para guardar datos de Twitter
app.post('/api/save-twitter', (req, res) => {
  try {
    const twitterData = req.body;

    // Validar datos
    if (!twitterData.username) {
      return res
        .status(400)
        .json({ error: 'El nombre de usuario es requerido' });
    }

    // Agregar timestamp si no existe
    if (!twitterData.timestamp) {
      twitterData.timestamp = new Date().toISOString();
    }

    // Guardar en x.json
    const saved = saveToJsonFile('x.json', twitterData);

    if (saved) {
      console.log('Datos de Twitter guardados:', twitterData);
      return res.status(200).json({ success: true });
    } else {
      return res
        .status(500)
        .json({ error: 'Error al guardar los datos de Twitter' });
    }
  } catch (error) {
    console.error('Error en /api/save-twitter:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para la página de agradecimiento
app.get('/gracias', (req, res) => {
  res.sendFile(path.join(__dirname, 'gracias.html'));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
