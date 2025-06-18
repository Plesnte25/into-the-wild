import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Properties from "../pages/Properties";
import Tours from "../pages/Tours";
import ContactUs from "../pages/ContactUs";
import AboutUs from "./../pages/AboutUs";
import Blog from "../pages/Blog";
import Login from "./../components/Login";
import Register from "./../components/Register";
import ExploreMoreITW from "./../components/ExploreMoreITW";
import { BlogPost } from "./../components/BlogPost";
import UserProfile from "./../components/UserProfile";
import Events from "../pages/Events";
import EventDetail from "../pages/EventDetail";
import ToursDetail from "../pages/ToursDetail";
import NotFound from "../pages/NotFound";
import Checkout from "../components/Checkout";
import Review from "../pages/Review";

import AdminLayout from "../admin/layout/AdminLayout";
import Dashboard from "../admin/pages/Dashboard";
import Reservation from "../admin/pages/Reservation";
import Realty from "../admin/pages/Realty";
import Settings from "../admin/pages/Settings";


const blogs = [];

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/properties",
        element: <Properties />,
      },
      {
        path: "/tours",
        element: <Tours />,
      },
      {
        path: "/tours/:id",
        element: <ToursDetail />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/property/:id",
        element: <ExploreMoreITW />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/user-profile",
        element: <UserProfile />,
      },
      {
        path: "/blog/:id",
        element: <BlogPost blogs={blogs} />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/events/:id",
        element: <EventDetail />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path:"review",
        element:<Review/>,
      }
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout/>,
    children: [
      { index: true, element:<Dashboard/>},
      { path: "reservation", element:<Reservation/>},
      { path: "realty", element:<Realty/>},
      { path: "settings", element:<Settings/>},
    ]
  },
]);

export default router;
