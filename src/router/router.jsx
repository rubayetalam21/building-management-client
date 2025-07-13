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
import AnnouncementPage from "../Pages/AnnouncementPage";
import AdminRoute from "../Provider/AdminRoute";
import ManageCoupons from "../Pages/ManageCoupons";
import UserRoute from "../Provider/UserRoute";
import UserProfile from "../Pages/UserProfile";
import MemberRoute from "../Provider/MemberRoute";
import MemberProfile from "../Pages/MemberProfile";
import MakePayment from "../Pages/MakePayment";
import Payment from "../Pages/Payment/Payment";
import PaymentHistory from "../Pages/PaymentHistory";



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
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: 'coupons',
                element: <AdminRoute><ManageCoupons></ManageCoupons></AdminRoute>,
            },
            {
                path: 'agreementRequests',
                element: <AdminRoute> <AgreementRequests></AgreementRequests> </AdminRoute>
            },
            {
                path: 'manageMembers',
                element: <AdminRoute><ManageMembers></ManageMembers></AdminRoute>
            },
            {
                path: 'announcements',
                element: <AnnouncementPage></AnnouncementPage>
            },
            {
                path: 'userProfile',
                element: <UserRoute><UserProfile></UserProfile></UserRoute>
            },
            {
                path: 'memberProfile',
                element: <MemberRoute><MemberProfile></MemberProfile></MemberRoute>
            },
            {
                path: 'makePayment',
                element: <MemberRoute><MakePayment></MakePayment></MemberRoute>
            },
            {
                path: 'payment',
                element: <Payment></Payment>
            },
            {
                path: 'paymentHistory',
                element: <MemberRoute><PaymentHistory></PaymentHistory> </MemberRoute>
            }
        ],
    },

    {
        path: '/*',
        element: <ErrorPage></ErrorPage>,
    },
]);

export default router;