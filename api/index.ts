import express from 'express';
import cors from 'cors';
import {vigenereCipher} from './types/vigenere';

const app = express();
const port = 8000;

app.use(cors())
app.use(express.json());

app.post('/encode', (req, res) => {
  const { message, password } = req.body;
  if (!password || !message) {
    return res.status(400).json({ error: 'Enter both password and a message' });
  }
  if (password !== "password") {
    return res.status(400).json({ error: 'Invalid password' });
  }
  const encodedText = vigenereCipher(message, password, true)
  return res.json({ encoded: encodedText });
});

app.post('/decode', (req, res) => {
  const { message, password } = req.body;
  if (!password || !message) {
    return res.status(400).json({ error: 'Enter both password and a message' });
  }
  if (password !== "password") {
    return res.status(400).json({ error: 'Invalid password' });
  }
  const decodedText = vigenereCipher(message, password, false)

  return res.json({ decoded: decodedText });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});