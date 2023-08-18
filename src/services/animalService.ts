import { IAnimal } from "../models/IAnimal"
import { get } from "./serviceBase"

const BASEURL = "https://animals.azurewebsites.net/api/animals"

export const fetchAnimals =async () => {
    const response = await get<IAnimal[]>(`${BASEURL}`)
    console.log(response);
    return response  
}
export const fetchAnimal =async (id: string) => {
    const response = await get<IAnimal>(`${BASEURL}/${id}`);
    console.log(response);
    
    return response
}