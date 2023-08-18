import { useState, useEffect } from "react"
import { IAnimal } from "../models/IAnimal"
import { Link } from "react-router-dom"
import { fetchAnimals } from "../services/animalService"


export const Animals = () => {
    const [animals, setAnimals] =useState<IAnimal[]>([])

    useEffect(() => {
      const fetchData = async () => {
        try {
          // Försök hämta datan från localStorage
          const storedData = localStorage.getItem('animalData');
  
          if (storedData) {
            const parsedData = JSON.parse(storedData)
            setAnimals(parsedData);
            console.log('data från localStorage', parsedData);
            
          } else {
            // Om datan inte finns i localStorage, hämta från API
            const response = await fetchAnimals();
            setAnimals(response);
  
            // Spara datan i localStorage
            localStorage.setItem('animalData', JSON.stringify(response));
            console.log('data från API');
            
          }
        } catch (error) {
          console.log('Error fetching and saving data:', error);
        }
      };
  
      fetchData();
    }, []);

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