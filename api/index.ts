import express from 'express';
import v from 'vigenere-encoder';
import cors from 'cors';

const password = 'password';

const app = express();
const port = 8000;

app.use(cors())
app.use(express.json());

app.post('/encode', (req, res) => {
  const {message} = req.body;
  if (!password || !message) {
    return res.status(400).json({error: 'Enter both password and a message'});
  }
  const encodedText = v.encode(message, password);
  return res.json({encoded: encodedText});
});

app.post('/decode', (req, res) => {
  const {message} = req.body;
  if (!password || !message) {
    return res.status(400).json({error: 'Enter both password and a message'});
  }
  const decodedText = v.decode(message, password);
  return res.json({decoded: decodedText});
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});