import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Write from "./components/Write";
import Read from "./components/Read";
import Update from "./components/Update";

const router=createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        children:[
            {
                path:"",
                element:<Write/>
            },
            {
                path:"/read",
                element:<Read/>
            },
            {
                path:"/update",
                element:<Update/>
            }
        ]
    }
])
export default router