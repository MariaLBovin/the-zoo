import { createHashRouter } from "react-router-dom";
import Animals from "./components/Animals";
import Animal from "./components/Animal";

export const router = createHashRouter([

    {
        path: '/',
        element:<Animals></Animals> 
    },
    {
        path:'/animal/:id',
        element:<Animal></Animal>
    }
])