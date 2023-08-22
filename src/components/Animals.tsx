import { useState, useEffect } from "react"
import { IAnimal } from "../models/IAnimal"
import { Link } from "react-router-dom"
import { fetchAnimals } from "../services/animalService"
import fallbackImg from '../assets/istockphoto-1128826884-612x612.jpg'
import { updateFeedingTime } from "../helpers/timer"
//import { updateFeedingTime } from "./timer"


export const Animals = () => {

  const [animals, setAnimals] =useState<IAnimal[]>([]);

    useEffect(() => {
      const fetchData = async () => {
      console.log('test');
      
        try {
          const storedData = localStorage.getItem('animalData');
          //console.log(storedData);
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            const updateAnimalsFeedingTime = updateFeedingTime(parsedData);
            console.log(updateAnimalsFeedingTime);
            
            setAnimals(updateAnimalsFeedingTime);
            // console.log(JSON.stringify(updateAnimalsFeedingTime));
            
            localStorage.setItem('animalData', JSON.stringify(updateAnimalsFeedingTime))
            console.log('data från localStorage', updateAnimalsFeedingTime);
            
          } else {
            const response = await fetchAnimals();
            console.log(response);
            
            setAnimals(response);
            localStorage.setItem('animalData', JSON.stringify(response));
            console.log('data från API');
            
          }
        } catch (error) {
          console.log('kan inte hämta data', error);
        }
        
      };
      
      fetchData();
    
    
    }, []);
  
  return (
    <>
    <div className="div_animal-wrapper">
    {animals.map((animal) => (
        <div key={animal.id}
        className={'div_animal ' + (animal.isFed ? 'isFed' : 'isHungry')}
        >
            <h3>{animal.name}</h3>
            <img src={animal.imageUrl} 
            alt={animal.name} 
            style={{ width: '200px', height: 'auto' }} 
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallbackImg;
            }}
            />
            <p>{animal.feedingMessage}</p>
            <Link to={'/animal/' + animal.id}>
              <button>Läs mer</button>
            </Link>
        </div>
    ))}
    </div>
    
    </>
  )
}

export default Animals