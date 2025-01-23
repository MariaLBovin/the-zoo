import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchAnimalsAsync } from "../../redux/animalSlice";
import fallbackImg from '../../assets/istockphoto-1128826884-612x612.jpg';
import styles from './Animals.module.scss'; 

export const Animals = () => {
  const dispatch = useDispatch<AppDispatch>();
  const animals = useSelector((state: RootState) => state.animal.animals);

  useEffect(() => {
    dispatch(fetchAnimalsAsync());
  }, [dispatch]);

  return (
    <div className={styles.div_animal_wrapper}>
      {animals.map((animal) => (
        <div 
          key={animal.id}
          className={`${styles.div_animal} ${animal.isFed ? styles.isFed : styles.isHungry}`}
        >
          <h3 className={styles.animal_name}>{animal.name}</h3>
          <img
            src={animal.imageUrl}
            alt={animal.name}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallbackImg;
            }}
          />
          <article>{animal.shortDescription}</article>
          <p>{animal.feedingMessage}</p>
          <Link to={`/animal/${animal.id}`}>
            <button>Läs mer</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Animals;
