import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navigator from "./routes/Navigator";


function App() {
  return (
      <BrowserRouter>
        <Navigator />
      </BrowserRouter>
  );
}

export default App;
