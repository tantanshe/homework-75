import './App.css';
import {useAppDispatch, useAppSelector} from './app/hooks';
import {AppDispatch} from './app/store';
import {
  selectEncodedText,
  selectEncodedTextLoading, selectError, selectPassword,
  selectStandardText, setEncodedText,
  setPassword,
  setStandardText
} from './app/cipherSlice';
import {Alert, CircularProgress, Container, Grid, IconButton, TextField, Typography} from '@mui/material';
import {decodeMessage, encodeMessage} from './app/thunks';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const App = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const standardText = useAppSelector(selectStandardText);
  const encodedText = useAppSelector(selectEncodedText);
  const isLoading = useAppSelector(selectEncodedTextLoading);
  const error = useAppSelector(selectError);
  const password = useAppSelector(selectPassword);

  const handleEncode = () => {
    if (password && standardText) {
      dispatch(encodeMessage({ message: standardText, password }));
    } else {
      alert('Please enter both a message and a password');
    }
  };

  const handleDecode = () => {
    if (password && encodedText) {
      dispatch(decodeMessage({ message: encodedText, password }));
    } else {
      alert('Please enter both a message and a password');
    }
  };

  return (
    <Container maxWidth="sm">
      {isLoading && <CircularProgress/>}
      {error && <Alert severity="error">Check the password and message fields one more time</Alert>}
      <Typography variant="h4" gutterBottom>
        Vigenère Cipher
      </Typography>
      <TextField
        label="Password"
        fullWidth
        margin="normal"
        type="password"
        value={password}
        onChange={(e) => dispatch(setPassword(e.target.value))}
        required
      />
      <TextField
        label="Standard Text"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={standardText}
        onChange={(e) => dispatch(setStandardText(e.target.value))}
        required
      />
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <IconButton color="primary" onClick={handleEncode}>
            <ArrowDownwardIcon/>
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton color="primary" onClick={handleDecode}>
            <ArrowUpwardIcon/>
          </IconButton>
        </Grid>
      </Grid>
      <TextField
        label="Encoded Text"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={encodedText}
        onChange={(e) => dispatch(setEncodedText(e.target.value))}
        required
      />
    </Container>
  );
};

export default App;
