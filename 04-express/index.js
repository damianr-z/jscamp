import express from 'express';

const PORT = process.env.PORT ?? 1234;
const app = express();

app.get('/', (req, response) => {
  response.send('Hello Word');
});

app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`);
});
