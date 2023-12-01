import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navigator from "./routes/Navigator";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navigator />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
