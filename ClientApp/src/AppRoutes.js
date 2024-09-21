import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import Ping  from "./components/Ping";
import App from "./App";
import Detail from "./pages/Detail";

const AppRoutes = [
  {
    index: true,
    path: "/",
    element: <App />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  }
  ,{
    path: '/Ping',
    element: <Ping />
  }
  ,{
    path: '/detail',
    element: <Detail />
  }
  ,{
    path: '/pokemon/:id',
    element: <Detail />
  }
];

export default AppRoutes;
