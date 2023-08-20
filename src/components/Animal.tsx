import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { IAnimal } from '../models/IAnimal'
import { fetchAnimal } from '../services/animalService'
import fallbackImg from '../assets/istockphoto-1128826884-612x612.jpg'

export const Animal = () => {
  const [animal, setAnimal] = useState<IAnimal | undefined>()


  const {id} = useParams<{id:string}>();

    useEffect(() => {
    const fetchSingleAnimal = async () => {
      try {
        const storedData = localStorage.getItem("animalData");
        if (storedData) {
          const animals: IAnimal[] = JSON.parse(storedData);
          const singleAnimal = animals.find((animal) => animal.id.toString() === id);
          if (singleAnimal) {
            setAnimal(singleAnimal);
            //console.log('djur från localStorage', singleAnimal);
            
          } else {
            //console.log("Inget djur hittat i LS");
          }
        } else {
          if(id){
            const apiResponse = await fetchAnimal(id); 
            setAnimal(apiResponse);
            //console.log("Djur från  API");
          }
          else {
            //console.log('iget id hittat');
            
          }
        }
      } catch (error) {
        //console.log("kan inte hämta single animal");
      }
    };
    fetchSingleAnimal();

  }, [id]);

  const feedAnimal = () => {
    if(animal) {
      const feedingTime = new Date();
      const dateToString = feedingTime.toISOString()

      const feedAnimal :IAnimal = {...animal, isFed: true, lastFed: dateToString};

      const storedData = localStorage.getItem('animalData');

      if (storedData) {
        const animals: IAnimal[] = JSON.parse(storedData);
        const updatedAnimals = animals.map((a) => (a.id === feedAnimal.id ? feedAnimal : a));
        localStorage.setItem('animalData', JSON.stringify(updatedAnimals));
      }
      setAnimal(feedAnimal) 

      console.log(feedAnimal);
    }
  }
  return (
    <>
    <div className='div_singleAnimal'>
    <h3>{animal?.name}</h3>
    <img src={animal?.imageUrl} 
    alt={animal?.name} 
    style={{ width: '200px', height: 'auto' }}
    onError = {(e) => {
      e.currentTarget.onerror = null;
      e.currentTarget.src = fallbackImg
    }}
    />
    <article className='article_singleAnimal'>{animal?.shortDescription}</article>
    <button onClick ={feedAnimal} disabled={animal?.isFed} >{animal?.isFed ? 'Matad' : 'Mata'}</button>
    </div>
    
    </>
  )
}

export default Animal