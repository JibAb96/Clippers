import "./App.css";
import Header from "./components/Header/Header.js";
import SearchPage from "./components/SearchPage/SearchPage.js";
import { SearchProvider } from "./context/SearchContext.js";
function App() {
  // Imported components to be displayed, only working on search page so no routes
  return (
    <div>
      <SearchProvider>
        <Header />
        <SearchPage />
      </SearchProvider>
    </div>
  );
}

export default App;
