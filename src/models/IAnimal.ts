export interface IAnimal{
    id: number;
    name: string;
    imageUrl:string;
    shortDescription: string;
    latinName: string;
    longDescription: string;
    isFed: boolean;
    lastFed: string;
    feedingMessage: string | null

}