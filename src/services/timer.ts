import { IAnimal } from "../models/IAnimal";

export const updateFeedingTime = (animals : IAnimal[]) => {
    const currentTime = new Date(); 
    return animals.map((animal) => {
            const lastFeedingTime = Date.parse(animal.lastFed);
            const timeSinceFed = (currentTime.getTime() - lastFeedingTime) / (1000 * 60*60);
            const timeUntilNextFeeding = 3 - timeSinceFed;

            const hours = Math.floor(timeUntilNextFeeding);
            const minutes = Math.floor((timeUntilNextFeeding* 60) % 60);
          
            if (timeSinceFed >= 4) {
              return {...animal, isFed: false, feedingMessage: `${animal.name} behöver matas omgående`}
            
            } else if(timeSinceFed >= 3) {
              return {...animal, isFed:false}
              
            } else if (timeSinceFed < 3) {
              return {...animal, isFed:true, feedingMessage: `${animal.name} behöver matas om ${hours} timmar och ${minutes} minuter.`}

            } else {
              return {...animal, isFed: true, feedingMessage:`${animal.name} är mätt`}
            }

});
}