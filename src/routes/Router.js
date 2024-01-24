import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/
const Welcome = lazy(() => import("../views/Welcome.js"));

/*****Routes******/

const ThemeRoutes = () => [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/welcome" /> },
      { path: "/welcome", exact: true, element: <Welcome /> },
    ],
  },
];

export default ThemeRoutes;
