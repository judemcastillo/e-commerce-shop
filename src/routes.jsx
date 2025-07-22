import App from "./App";
import Shop from "./components/Pages/Shop/Shop.jsx";
import About from "./components/Pages/About.jsx";
import Contact from "./components/Pages/Contact.jsx";


const routes = [
  {
    path: "/",
    element: <App />,
    
  },
  {
    path: "Shop",
    element: <Shop />,
  },
  {
    path: "About",
    element: <About />,
  },
  {
    path: "Contact",
    element: <Contact />,
  }
];

export default routes;
