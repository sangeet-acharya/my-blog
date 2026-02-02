import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import "./AllPages.css";

export default function ArticleEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/articles/${id}`) // on recupere le id.
      // on traduit le donner en .json (objet).
      .then((res) => {
        if (!res.ok) throw new Error("Article introuvable");
        return res.json();
      })
      .then((data) => setArticle(data)) // on stock le data qu'on fetch en set article
      //chaque modification de l'id dans url il vas venir fetch method get dans /articles/id
      //et mettre a jour mon setArticle avec les information recuperer.
      .catch((err) => {
        setError(err.message);
        toast.error("Impossible de charger l'article");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  function handleSubmit(event) {
    event.preventDefault();

    fetch(`http://localhost:3001/articles/${article.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);
        return res.json();
      })
      .then(() => {
        toast.success("Article mis à jour avec succès !");
        setTimeout(() => {
          navigate("/articlespage");
        }, 1500);
      })
      .catch((err) => {
        setError(err.message);
        toast.error("Erreur lors de la mise à jour de l'article");
      });
  }

  if (loading) return <p className="black-color">Chargement...</p>;
  if (error) return <p className="black-color">Erreur : {error}</p>;
  if (!article) return <p className="black-color">Aucun article trouvé.</p>;

  return (
    <form onSubmit={handleSubmit} className="form-edit">
      <h2>Edit Page</h2>
      <input
        name="title"
        value={article.title}
        onChange={(e) => setArticle({ ...article, title: e.target.value })}
        required
      />
      <br />

      <textarea
        placeholder="content"
        value={article.content}
        onChange={(e) => setArticle({ ...article, content: e.target.value })}
      />
      <br />
      <button type="submit" className="btn-edit-article">
        Modifier d'article
      </button>
    </form>
  );
}
