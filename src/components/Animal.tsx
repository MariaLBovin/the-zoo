import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { IAnimal } from '../models/IAnimal'
import { fetchAnimal } from '../services/animalService'

export const Animal = () => {
  const [animal, setAnimal] = useState<IAnimal | undefined>()

    const {id} = useParams<{id:string}>();

    useEffect(() => {
    const fetchSingleAnimal = async () => {
      try {
        // Hämta djurdata från localStorage om det finns
        const storedData = localStorage.getItem("animalData");
        if (storedData) {
          const animals: IAnimal[] = JSON.parse(storedData);
          const singleAnimal = animals.find((animal) => animal.id.toString() === id);
          if (singleAnimal) {
            setAnimal(singleAnimal);
            console.log('Animal from localStorage', singleAnimal);
            
          } else {
            console.log("No single animal found in LS");
          }
        } else {
          if(id){
            const apiResponse = await fetchAnimal(id); 
            setAnimal(apiResponse);
            console.log("Animal from API");
          }
          else {
            console.log('no id found');
            
          }
        }
      } catch (error) {
        console.log("Error fetching single animal");
      }
    };
    fetchSingleAnimal();

  }, [id]);

  const feedAnimal = () => {
    if(animal) {
      const feedingTime = new Date();
      const dateToString = feedingTime.toISOString()
      
      const feedAnimal :IAnimal = {...animal, isFed: true, lastFed: dateToString};
      setAnimal(feedAnimal) 
      console.log(feedAnimal);
    }
    
  }

  return (
    <>
    <h3>{animal?.name}</h3>
    <img src={animal?.imageUrl} alt={animal?.name} style={{ width: '200px', height: 'auto' }}/>
    <div>{animal?.shortDescription}</div>
    <button onClick ={feedAnimal} disabled={animal?.isFed} >{animal?.isFed ? 'Matad' : 'Mata'}</button>
    </>
  )
}

export default Animal