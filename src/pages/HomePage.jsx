import React from "react";
import ArticleList from "../components/ArticleList";

export default function HomePage() {
  return (
    <main>
      <h2 className="h2-Page">
        Quels sont les 8 planètes de notre Système solaires ?
      </h2>
      <ArticleList />
    </main>
  );
}
