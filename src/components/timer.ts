import { IAnimal } from "../models/IAnimal";

export const updateFeedingTime = (animals : IAnimal[]) => {
    const currentTime = new Date(); 
    return animals.map((animal) => {
            const lastFeedingTime = Date.parse(animal.lastFed);
            console.log('senaste matning', animal.name, animal.lastFed);

            //console.log('lastFeedingTime', lastFeedingTime);
            
            const timeSinceFed = (currentTime.getTime() - lastFeedingTime) / (1000 * 60*60);
            
            //console.log('timeSinceFed', timeSinceFed);

            if (timeSinceFed >= 4) {
              return {...animal, isFed: false, feedingMessage: `${animal.name} behöver matas omgående`}
            
            } else if(timeSinceFed >= 3) {
              return {...animal, isFed:false}
            } else {
              return {...animal, isFed: true, feedingMessage:`${animal.name} är mätt`}
            }
            

          return animal
});
}