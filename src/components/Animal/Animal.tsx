import { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'

import fallbackImg from '../../assets/istockphoto-1128826884-612x612.jpg'
import { IAnimal } from '../../models/IAnimal'
import { fetchSingleAnimal } from '../../services/animalService'

export const Animal = () => {
  const [animal, setAnimal] = useState<IAnimal | null>()

  const {id} = useParams<{id:string}>();

    useEffect(() => {
    const getAnimal = async () => {
      if (id) {
        const result = await fetchSingleAnimal(id);
        setAnimal(result);
      }
    };
    getAnimal();
  }, [id]);

  const feedAnimal = () => {
    if(animal) {
      const feedingTime = new Date();
      const dateToString = feedingTime.toISOString()

      const feedAnimal :IAnimal = {...animal, isFed: true, lastFed: dateToString, feedingMessage: `${animal.name} är mätt`};

      const storedData = localStorage.getItem('animalData');

      if (storedData) {
        const animals: IAnimal[] = JSON.parse(storedData);
        const updatedAnimals = animals.map((a) => (a.id === feedAnimal.id ? feedAnimal : a));
        localStorage.setItem('animalData', JSON.stringify(updatedAnimals));
      }
      setAnimal(feedAnimal) 
    }
  }

  const formattedTime = (isoTime: string) => new Date(isoTime).toLocaleString();


  return (
    <>
    <div className='div_singleAnimal'>
    <h3>{animal?.name}</h3>
    
    <img src={animal?.imageUrl} 
    alt={animal?.name} 
    style={{ width: '400px', height: 'auto' }}
    onError = {(e) => {
      e.currentTarget.onerror = null;
      e.currentTarget.src = fallbackImg
    }}
    />
    <h4>{animal?.latinName}</h4>
    <article className='article_singleAnimal'>{animal?.longDescription}</article>
    <p>{animal?.lastFed ? `Senaste matningen: ${formattedTime(animal?.lastFed)}` : ''}</p>
    <p>{animal?.feedingMessage}</p>
    <button onClick ={feedAnimal} disabled={animal?.isFed} >{animal?.isFed ? 'Matad' : 'Mata'}</button>
    <Link to={'/'}>
    <button>Tillbaka till listan över djur</button>
    </Link>
    </div>
    
    </>
  )
}

export default Animal