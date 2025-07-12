import { createBrowserRouter } from "react-router";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import HomeLayout from "../layouts/HomeLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ForgetPassword from "../Pages/ForgetPassword";
import AllApartments from "../Pages/AllApartments";
import DashboardLayout from "../layouts/DashboardLayout";
import CouponSection from "../Pages/CouponSection";
import AgreementRequests from "../Pages/AgreementRequests";
import PrivateRoute from "../Provider/PrivateRoute";
import ManageMembers from "../Pages/ManageMembers";



const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                path: '',
                element: <Home></Home>,
            },
            {
                path: '/apartments',
                element: <AllApartments></AllApartments>
            }

        ],
    },
    {
        path: '/auth',
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: "/auth/login",
                element: <Login></Login>,
            },
            {
                path: "/auth/register",
                element: <Register></Register>,
            },
            {
                path: "/auth/password",
                element: <ForgetPassword></ForgetPassword>,
            },
        ],
    },
    {
        path: '/dashboard',
        element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: 'coupons',
                element: <CouponSection></CouponSection>,
            },
            {
                path: 'agreementRequests',
                element: <AgreementRequests></AgreementRequests>
            },
            {
                path: 'manageMembers',
                element: <ManageMembers></ManageMembers>
            }
        ],
    },

    {
        path: '/*',
        element: <ErrorPage></ErrorPage>,
    },
]);

export default router;