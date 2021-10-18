import { Chip, Dialog, DialogContent, DialogTitle } from '@mui/material';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import HomeIcon from '@mui/icons-material/Home';
import { useDispatch, useSelector } from 'react-redux';
import { charactersOperations } from '../../store/ducks/characters';
import { RootState } from '../../store/rootReducer';


const CharacterDialog = () => {
  const dispatch = useDispatch();
  const { currentCharacter } = useSelector((s: RootState) => s.characters.modal);

  const closeDialog = () => {
    dispatch(charactersOperations.setCurrentCharacter(null));
  };

  return (
    <Dialog
      open={!!currentCharacter}
      onClose={closeDialog}
    >
      {currentCharacter && <>
        <DialogTitle>
          {currentCharacter.name}
        </DialogTitle>
        <DialogContent>
          <img
            style={{ width: '100%' }}
            alt={currentCharacter.name}
            src={currentCharacter.image}
          />
          {currentCharacter.status !== 'unknown' &&
            <Chip
              variant="outlined"
              color={currentCharacter.status === 'Alive' ? 'success' : 'error'}
              label={currentCharacter.status}
              sx={{ mt: 1, mr: 1 }}
            />
          }
          {currentCharacter.species !== 'unknown' &&
            <Chip
              variant="outlined"
              color="default"
              label={currentCharacter.species}
              sx={{ mt: 1, mr: 1 }}
            />
          }
          {currentCharacter.gender !== 'unknown' &&
            <Chip
              variant="outlined"
              color="primary"
              label={currentCharacter.gender}
              sx={{ mt: 1, mr: 1 }}
            />
          }
          {currentCharacter.origin.name !== 'unknown' &&
            <Chip
              icon={<HomeIcon />}
              variant="filled"
              color="primary"
              label={currentCharacter.origin.name}
              sx={{ mt: 1, mr: 1 }}
            />
          }
          {currentCharacter.location.name !== 'unknown' &&
            <Chip
              icon={<PersonPinIcon />}
              variant="filled"
              color="default"
              label={currentCharacter.location.name}
              sx={{ mt: 1, mr: 1 }}
            />
          }
        </DialogContent>
      </>}
    </Dialog>
  );
};

export default CharacterDialog;