import { IAnimal } from "../models/IAnimal"
import { get } from "./serviceBase"

const BASEURL = "https://animals.azurewebsites.net/api/animals"

export const fetchAnimals =async () => {
    const response = await get<IAnimal[]>(`${BASEURL}`)

    return response  
}
export const fetchAnimal =async (id: string) => {
    const response = await get<IAnimal>(`${BASEURL}/${id}`);

    return response
}

export const fetchSingleAnimal = async (id: string): Promise<IAnimal | null> => {
    try {
      const storedData = localStorage.getItem('animalData');
      if (storedData) {
        const animals: IAnimal[] = JSON.parse(storedData);
        const foundAnimal = animals.find((a) => a.id.toString() === id);
        if (foundAnimal) {
          console.log('Animal fetched from localStorage', foundAnimal);
          return foundAnimal;
        }
      }
      
      if (id) {
        const apiResponse = await fetchAnimal(id);
        console.log('Animal fetched from API');
        return apiResponse;
      } else {
        console.log('No id found');
      }
    } catch (error) {
      console.error('Error fetching animal:', error);
    }
    return null;
  };