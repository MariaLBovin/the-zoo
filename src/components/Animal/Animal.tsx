import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAnimals, feedAnimal } from '../../redux/animalSlice';
import { AppDispatch, RootState } from '../../redux/store';
import fallbackImg from '../../assets/istockphoto-1128826884-612x612.jpg';
import { fetchSingleAnimal } from '../../services/animalService';

const Animal = () => {
  const { id } = useParams<{ id: string}>();
  const dispatch = useDispatch<AppDispatch>();
  const animals = useSelector((state: RootState) => state.animal.animals);
  const animal = id ? animals.find((a) => a.id.toString() === id) : undefined;


  useEffect(() => {
    const getAnimal = async () => {
      if (id && !animal) {
        const fetchedAnimal = await fetchSingleAnimal(id);
        
        if (fetchedAnimal) {
          dispatch(setAnimals([...animals, fetchedAnimal]));
        } else {
          console.error('Animal not found');
        }
      }
    };
    getAnimal();
  }, [id, animal, animals, dispatch]);

  const handleFeedAnimal = () => {
    if (animal) {
      dispatch(feedAnimal(animal.id.toString()));
    }
  };

  const formattedTime = (isoTime: string) => new Date(isoTime).toLocaleString();

  return (
    <div className='div_singleAnimal'>
      <h3>{animal?.name}</h3>
      <img
        src={animal?.imageUrl || fallbackImg}
        alt={animal?.name || 'Animal'}
        style={{ width: '400px', height: 'auto' }}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = fallbackImg;
        }}
      />
      <h4>{animal?.latinName}</h4>
      <article className='article_singleAnimal'>{animal?.longDescription}</article>
      {animal?.lastFed && <p>Senaste matningen: {formattedTime(animal.lastFed)}</p>}
      <p>{animal?.feedingMessage}</p>
      <button onClick={handleFeedAnimal} disabled={animal?.isFed}>
        {animal?.isFed ? 'Matad' : 'Mata'}
      </button>
      <Link to='/'>
        <button>Tillbaka till listan över djur</button>
      </Link>
    </div>
  );
};

export default Animal;
