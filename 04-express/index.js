import express from 'express';

const PORT = process.env.PORT ?? 1234;
const app = express();

app.use((req, res, next) => {
  const timeString = new Date().toLocaleTimeString();
  console.log(`[${timeString}] ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello Word');
});

app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`);
});

// un middleware es una funcion que se ejecuta antes de que llegue a una ruta.
