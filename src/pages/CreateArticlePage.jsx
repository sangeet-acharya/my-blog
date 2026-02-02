import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./AllPages.css";

export default function CreateArticlePage() {
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    fetch("http://localhost:3001/articles", {
      method: "POST",
      body: JSON.stringify(newArticle),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur serveur");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Article créé :", data);

        // ✅ Toast succès
        toast.success("Article Créé avec succès !");

        //⏳ Laisser le toast s’afficher avant la redirection
        setTimeout(() => {
          navigate("/articlespage");
        }, 800);
      })
      .catch((err) => {
        // ❌ Toast erreur API ou réseau
        toast.error(err.message || "Erreur réseau");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <form method="post" onSubmit={handleSubmit} className="form-post">
      <input
        type="text"
        placeholder="title"
        value={newArticle.title}
        onChange={(e) =>
          setNewArticle({ ...newArticle, title: e.target.value })
        }
        required
      />
      <br />

      <textarea
        placeholder="content"
        value={newArticle.content}
        onChange={(e) =>
          setNewArticle({ ...newArticle, content: e.target.value })
        }
        required
      />
      <br />

      <button type="submit" disabled={isLoading} className="btn-post-article">
        {isLoading ? "Création..." : "Créer l’article"}
      </button>
    </form>
  );
}
