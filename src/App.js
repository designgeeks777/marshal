import { useRoutes } from "react-router-dom";
import ThemeRoutes from "./routes/Router";

const App = () => {
  const routes = ThemeRoutes();
  const routing = useRoutes(routes);
  return <div className="dark">{routing}</div>;
};

export default App;
