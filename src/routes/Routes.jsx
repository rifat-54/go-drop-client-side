import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DemoPage from "../pages/DemoPage";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../layout/Dashboard";
import BookParcel from "../pages/BookParcel";
import MyParcel from "../pages/MyParcel";
import MyDeliveryList from "../pages/deliveryList/MyDeliveryList";
import MyRevews from "../pages/revew/MyRevews";

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
    },
    {
        path:"/dashboard",
        element:<Dashboard></Dashboard>,
        children:[
            {
               path:'/dashboard/book-parcel',
               element:<BookParcel></BookParcel> 
            },
            {
                path:'/dashboard/my-parcel',
                element:<MyParcel></MyParcel>
            },
            {
                path:'/dashboard/my-delivery-list',
                element:<MyDeliveryList></MyDeliveryList>
            },
            {
                path:'/dashboard/my-revews',
                element:<MyRevews></MyRevews>
            }
        ]
    }
])

export default routes;