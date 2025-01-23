import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAnimal } from '../models/IAnimal';

interface AnimalState {
  animals: IAnimal[];
}

const initialState: AnimalState = {
  animals: [],
};

export const animalSlice = createSlice({
  name: 'animal',
  initialState,
  reducers: {
    setAnimals: (state, action: PayloadAction<IAnimal[]>) => {
      state.animals = action.payload;
    },
    feedAnimal: (state, action: PayloadAction<string>) => {
      state.animals = state.animals.map((animal) =>
        animal.id.toString() === action.payload ? { 
          ...animal, 
          isFed: true, 
          lastFed: new Date().toISOString(), 
          feedingMessage: `${animal.name} är mätt`
        } : animal
      );
    },
  },
});

export const { setAnimals, feedAnimal } = animalSlice.actions;
export default animalSlice.reducer;
