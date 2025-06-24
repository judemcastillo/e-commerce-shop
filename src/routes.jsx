import App from "./App";
import Shop from "./components/Pages/Shop";

const routes = [
  {
    path: "/",
    element: <App />,
    
  },
  {
    path: "Shop",
    element: <Shop />,
  },
];

export default routes;
