// importation des composant.
import Header from "./components/Header.jsx";
import ArticleList from "./components/ArticleList.jsx";
import "./App.css";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <h2 className="h2-Page">
          Quels sont les 8 planètes de notre Système solaires ?
        </h2>
        <ArticleList />
      </main>
    </>
  );
}
