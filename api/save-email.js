// api/save-email.js
// Este es un ejemplo de función serverless para Vercel.
// Recibe un correo electrónico y lo "guarda" (en este caso, lo imprime en la consola).

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, source } = req.body;

      if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
      }

      // En un entorno real, aquí integrarías con una base de datos
      // para guardar el email de forma persistente.
      // Por ahora, solo lo imprimimos en la consola de la función serverless.
      console.log(`Received email: ${email} from source: ${source}`);

      res.status(200).json({ message: 'Email saved successfully (simulated).' });
    } catch (error) {
      console.error('Error processing email:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}