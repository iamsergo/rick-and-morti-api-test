import { Container, Typography } from '@mui/material';
import FilterForm from './components/FilterForm';
import CharactersList from './components/CharactersList';
import CharacterDialog from './components/CharacterDialog';


const App = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{mb:2}}>
        Rick and Morti API
      </Typography>

      <FilterForm />
      <CharactersList />

      <CharacterDialog />
    </Container>
  );
};

export default App;
