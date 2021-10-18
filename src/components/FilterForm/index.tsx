import { Button, MenuItem, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { charactersOperations } from '../../store/ducks/characters';
import { CharacterFiltersForForm } from "../../types/api/characters";

const FilterForm = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((s: RootState) => s.characters.characters);

  const handleFilterApply = (filters: CharacterFiltersForForm) => {
    const fs = Object.fromEntries(
      Object.entries(filters).filter(([,value]) => value)
    );

    dispatch(charactersOperations.setFilters({...fs}));
  };

  const formik = useFormik<CharacterFiltersForForm>({
    initialValues: {
      name: '',
      species: '',
      type: '',
      gender: '',
      status: '',
    },
    onSubmit: handleFilterApply,
  });

  return(
    <Box component="form" sx={{p:1}} onSubmit={formik.handleSubmit}>
      <Typography variant="h5">
        Filters
      </Typography>

      <TextField
        disabled={isLoading}
        sx={{mb:2}}
        fullWidth
        name="name"
        label="Name"
        variant="outlined"
        value={formik.values.name}
        onChange={formik.handleChange}
      />

      <TextField
        disabled={isLoading}
        sx={{mb:2}}
        fullWidth
        name="species"
        label="Species"
        variant="outlined"
        value={formik.values.species}
        onChange={formik.handleChange}
      />

      <TextField
        disabled={isLoading}
        sx={{mb:2}}
        fullWidth
        name="type"
        label="Type"
        variant="outlined"
        value={formik.values.type}
        onChange={formik.handleChange}
      />

      <TextField
        disabled={isLoading}
        select
        sx={{mb:2}}
        fullWidth
        name="gender"
        label="Gender"
        value={formik.values.gender}
        onChange={formik.handleChange}
      >
        <MenuItem value="">none</MenuItem>
        <MenuItem value="female">female</MenuItem>
        <MenuItem value="male">male</MenuItem>
        <MenuItem value="genderless">genderless</MenuItem>
        <MenuItem value="unknown">unknown</MenuItem>
      </TextField>

      <TextField
        disabled={isLoading}
        select
        sx={{mb:2}}
        fullWidth
        name="status"
        label="Status"
        value={formik.values.status}
        onChange={formik.handleChange}
      >
        <MenuItem value="">none</MenuItem>
        <MenuItem value="alive">alive</MenuItem>
        <MenuItem value="dead">dead</MenuItem>
        <MenuItem value="unknown">unknown</MenuItem>
      </TextField>
      
      <Box sx={{display:'flex'}}>
        <Button
          type="submit"
          variant="outlined"
          disabled={isLoading}
        >Apply</Button>
        <Button
          onClick={() => formik.resetForm()}
          disabled={isLoading}
          sx={{ml:1}}
          color="secondary"
          variant="text"
        >Clear</Button>
      </Box>
    </Box>
  );
};

export default FilterForm;