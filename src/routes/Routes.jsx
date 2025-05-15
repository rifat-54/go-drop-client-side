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
import Statistics from "../pages/statistics/Statistics";
import AllUsers from "../pages/allusers/AllUsers";
import AllParcels from "../pages/allparcel/AllParcels";
import AllDeliveryMan from "../pages/alldeliveryman/AllDeliveryMan";
import Profile from "../pages/profile/Profile";
import VerifyDeliveryMan from "../pages/verify/VerifyDeliveryMan";
import UpdateParcel from "../pages/UpdateParcel";

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
        element:<PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
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
            },
            {
                path:'/dashboard/statistics',
                element:<Statistics></Statistics>
            },
            {
                path:'/dashboard/all-users',
                element:<AllUsers></AllUsers>
            },
            {
                path:'/dashboard/all-parcels',
                element:<AllParcels></AllParcels>
            },
            {
                path:'/dashboard/all-delivery-men',
                element:<AllDeliveryMan></AllDeliveryMan>
            },
            {
                path:'/dashboard/profile',
                element:<Profile></Profile>
            },
            {
                path:'/dashboard/verify-deliveryman',
                element:<VerifyDeliveryMan></VerifyDeliveryMan>
            },
            {
                path:'/dashboard/update-parcel/:id',
                element:<UpdateParcel></UpdateParcel>
            }
        ]
    }
])

export default routes;