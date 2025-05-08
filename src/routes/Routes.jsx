import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DemoPage from "../pages/DemoPage";
import PrivateRoutes from "./PrivateRoutes";

const routes=createBrowserRouter([
    {
        path:'/',
        element:<MainLayout></MainLayout>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/register',
                element:<Register></Register>
            },
            {
                path:'/demo',
                element:<PrivateRoutes><DemoPage></DemoPage></PrivateRoutes>
            }
        ]
    }
])

export default routes;