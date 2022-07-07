import reset from "./public/css/reset.css";
import Router from "./shared/Router";
import { createGlobalStyle} from "styled-components";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Router />
    </div>
  );
}

const GlobalStyle = createGlobalStyle`
${reset}; 
`;

export default App;