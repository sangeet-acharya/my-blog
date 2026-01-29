import React from "react";
import ArticleList from "../components/ArticleList";

export default function ArticlesPage() {
  return (
    <main>
      <h2 className="h2-Page">Voici les articles et les articles créé :</h2>
      <ArticleList />
    </main>
  );
}
