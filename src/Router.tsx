import { createHashRouter } from "react-router-dom";
import Animals from "./components/Animals";
import Animal from "./components/Animal";
import Layout from "./components/Layout";

export const router = createHashRouter([

    {
        path: '/',
        element: <Layout></Layout>,
        children: [
            {
        path: '/',
        element:<Animals></Animals>,
        index: true
    },
    {
        path:'/animal/:id',
        element:<Animal></Animal>
    }
        ]
        }

])