// importation des composant.
import Header from "./components/Header.jsx";
import ArticleList from "./components/ArticleList.jsx";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main>
        <ArticleList />
      </main>
    </>
  );
}

export default App;
