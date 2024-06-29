import { ProviderWrapper } from "store/store";
import ChartsCard from "./components/ChartsCard";

function App() {
  return (
    <ProviderWrapper>
      <div className="App">
        <ChartsCard></ChartsCard>
      </div>
    </ProviderWrapper>
  );
}

export default App;
