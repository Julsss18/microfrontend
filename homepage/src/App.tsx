import Main from "./components/Main";
import { ProviderWrapper } from "store/store";

function App() {
  return (
    <ProviderWrapper>
      <div className="App">
        <Main></Main>
      </div>
    </ProviderWrapper>
  );
}

export default App;
