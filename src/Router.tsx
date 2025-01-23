import { createHashRouter } from "react-router-dom";
import Animals from "./components/Animals/Animals";
import Layout from "./components/Layout";
import Animal from "./components/Animal/Animal";

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