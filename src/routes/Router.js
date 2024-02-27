import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/
const Welcome = lazy(() => import("../views/Welcome.js"));
const Cart = lazy(() => import("../views/Cart.js"));
const Payment = lazy(() => import("../components/Success.js"));

/*****Routes******/

const ThemeRoutes = () => [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/welcome" /> },
      { path: "/welcome", exact: true, element: <Welcome /> },
      { path: "/cart", exact: true, element: <Cart /> },
      { path: "/download", exact: true, element: <Payment /> },
    ],
  },
];

export default ThemeRoutes;
