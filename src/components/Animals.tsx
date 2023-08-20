import { useState, useEffect } from "react"
import { IAnimal } from "../models/IAnimal"
import { Link } from "react-router-dom"
import { fetchAnimals } from "../services/animalService"
import fallbackImg from '../assets/istockphoto-1128826884-612x612.jpg'


export const Animals = () => {
  console.log('test');
  
    const [animals, setAnimals] =useState<IAnimal[]>([])
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const storedData = localStorage.getItem('animalData');
  
          if (storedData) {
            const parsedData = JSON.parse(storedData)
            setAnimals(parsedData);
            console.log('data från localStorage', parsedData);
            
          } else {
            const response = await fetchAnimals();
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
    
    useEffect(() => {
      const interval = setInterval(() => {
        const currentTime = new Date();
        
        
        const updateAnimals = animals.map((animal) => {
          if(animal.isFed) {
            const lastFeedingTime = Date.parse(animal.lastFed);
            //console.log('senaste matning', animal.name, animal.lastFed);
            
            //console.log('lastFeedingTime', lastFeedingTime);
            
            const timeSinceFed = (currentTime.getTime() - lastFeedingTime) / (1000 * 60 * 60);
            
            console.log('timeSinceFed', timeSinceFed);
            
            if(timeSinceFed >= 3) {
              return {...animal, isFed:false}
            }
          }
          return animal
        });
        setAnimals(updateAnimals);
        localStorage.setItem('animalData', JSON.stringify(updateAnimals))
      }, 5000);
      return () => clearInterval(interval)
    }, [animals])

  return (
    <>
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
            <Link to={'/animal/' + animal.id}>
              <button>Läs mer</button>
            </Link>
        </div>
    ))}
    </>
  )
}

export default Animals