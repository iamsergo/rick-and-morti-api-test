import React from 'react';
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, ListSubheader, Typography } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useDispatch, useSelector } from 'react-redux';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { RootState } from '../../store/rootReducer';
import { charactersOperations } from '../../store/ducks/characters';
import { Character } from '../../types/entities/characters';

const CharactersList = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    hasError,
    currentPage,
    filters,
    characters,
    pagination,
  } = useSelector((s: RootState) => s.characters.characters);

  const requestCharacters = () => {
    dispatch(charactersOperations.fetchCharacters({
      page: currentPage + 1,
      ...filters,
    }));
  };

  const observedRef = useInfiniteScroll(() => {
    if(pagination && pagination.next)
      requestCharacters();
  });

  React.useEffect(() => {
    requestCharacters();
  }, [filters]);

  const setCurrentCharacter = (character: Character) => {
    dispatch(charactersOperations.setCurrentCharacter(character));
  };

  return (
    <List dense>
      <ListSubheader key="list-subheader">
        <Typography variant="h4" sx={{ color: 'text.primary' }}>
          Characters
          <IconButton
            sx={{ ml: 2 }}
            color="primary"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ArrowUpwardIcon />
          </IconButton>
          {pagination &&
            <Typography variant="body2" color="gray">
              Loaded {characters.length} of {pagination.count}
            </Typography>
          }
        </Typography>
      </ListSubheader>

      {characters.map((character, i) => {
        return i === characters.length - 1
          ? (
            <ListItem
              key={character.id + i}
              onClick={() => setCurrentCharacter(character)}
              ref={observedRef}
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar alt={character.name} src={character.image} />
                </ListItemAvatar>
                <ListItemText
                  primary={character.name}
                  secondary={character.species}
                />
              </ListItemButton>
            </ListItem>
          ) : (
            <ListItem
              key={character.id + i}
              onClick={() => setCurrentCharacter(character)}
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar alt={character.name} src={character.image} />
                </ListItemAvatar>
                <ListItemText
                  primary={character.name}
                  secondary={character.species}
                />
              </ListItemButton>
            </ListItem>            
          )
      })}

      {isLoading &&
        <ListItem key="loading-item">
          <ListItemButton disabled>
            <ListItemText primary="Loading..." />
          </ListItemButton>
        </ListItem>
      }

      {!hasError && !isLoading && characters.length === 0 &&
        <ListItem key="not-found-item">
          <ListItemButton disabled>
            <ListItemText primary="Not found" />
          </ListItemButton>
        </ListItem>
      }

      {characters.length !== 0 && pagination && !pagination.next &&
        <ListItem key="last-item">
          <ListItemButton disabled>
            <ListItemText primary={`Founded ${pagination.count} items`} />
          </ListItemButton>
        </ListItem>
      }

      {hasError &&
        <ListItem key="error-item">
          <ListItemButton onClick={requestCharacters}>
            <ListItemText
              primary="Try again"
              secondary="Something went wrong"
            />
          </ListItemButton>
        </ListItem>
      }
    </List>
  );
};

export default CharactersList;