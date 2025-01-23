import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IAnimal } from '../models/IAnimal';
import { fetchAnimals } from '../services/animalService';
import { updateFeedingTime } from '../services/timer';

interface AnimalState {
  animals: IAnimal[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AnimalState = {
  animals: [],
  status: 'idle',
};

// Thunk för att hämta djurdata
export const fetchAnimalsAsync = createAsyncThunk('animals/fetchAnimals', async () => {
  const storedData = localStorage.getItem('animalData');
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    return updateFeedingTime(parsedData);
  } else {
    const response = await fetchAnimals();
    localStorage.setItem('animalData', JSON.stringify(response));
    return response;
  }
});

export const animalSlice = createSlice({
  name: 'animal',
  initialState,
  reducers: {
    setAnimals: (state, action: PayloadAction<IAnimal[]>) => {
      state.animals = action.payload;
    },
    feedAnimal: (state, action: PayloadAction<string>) => {
      state.animals = state.animals.map((animal) =>
        animal.id.toString() === action.payload
          ? { 
              ...animal, 
              isFed: true, 
              lastFed: new Date().toISOString(), 
              feedingMessage: `${animal.name} är mätt`
            }
          : animal
      );

      localStorage.setItem('animalData', JSON.stringify(state.animals));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimalsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAnimalsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.animals = action.payload;
      })
      .addCase(fetchAnimalsAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setAnimals, feedAnimal } = animalSlice.actions;
export default animalSlice.reducer;
