import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Home } from "./Pages/Home";
import { Contact } from "./Pages/Contact";
import { Menu } from "./Pages/Menu";
import { Layout } from "./Pages/Laayout";
import { Login } from "./Pages/Login";
import { ErrorPage } from "./Pages/Errorpage";
import { ProtectedRoute } from "./Pages/Protectrouted";
import { About } from "./Pages/About";
import { Cart } from "./Pages/Cart";
import { Favorite } from "./Pages/Favourite";
import { CardDetail } from "./Pages/carddetail";
import CheckoutPage from "./Pages/FinalCheckout";
const App = () => {
  const router = createBrowserRouter([
    // // Public route for login
    // {
    //   path: "/",
    //   element: <Login />,
    //   errorElement: <ErrorPage />,
    // },
    // // Protected routes
    // {
    //   path: "/home",
    //   element: <ProtectedRoute />, // Wrapping protected routes
    //   errorElement: <ErrorPage />,
    //   children: [
        {
          path: "",
          element: <Layout />, // App layout including header and footer
          children: [
            {
              path: "", // Relative to "/home"
              element: <Home />,
            },
            {
              path: "home/menu", // Relative to "/home"
              element: <Menu />,
            },
            ,
            {
              path: "home/favourite", // Relative to "/home"
              element: <Favorite />,
            },

            {
              path: "home/Cart",
              element: <Cart />,
            },
            {
              path: "home/about", // Relative to "/home"
              element: <About />,
            },
            {
              path: "home/contact", // Relative to "/home"
              element: <Contact />,
            },
            {
              path:"/finalcheckout",
              element:<CheckoutPage />
            },
            {
              path: "home/menu/:id", // Relative to "/home"
              element: <CardDetail />,
            }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
