import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AllPages.css";
import toast from "react-hot-toast";

export default function ArticlePage() {
  //useParams te permet de récupérer l’id de l’article depuis l’URL dynamique.
  const { id } = useParams(); //recupere le parametre dynamique
  console.log("ID de l'article:", id);

  // un etat pour stocker l'article récupéré.
  //On initialise article avec null ou un tableau vide, selon ce que ton API renvoie.
  const [article, setArticle] = useState(null);

  // redirection vers la page pour edit la page
  const navigate = useNavigate();

  //Pourquoi on met ça dans useEffect :
  //On veut lancer le fetch au chargement du composant
  //Et à chaque changement d’ID, pour que l’article affiché soit toujours correct.

  //Étapes logiques :
  //1-Déclarer une fonction asynchrone pour fetcher l’article.
  //2-Lancer cette fonction immédiatement dans le useEffect.
  //3-Mettre id comme dépendance pour relancer le fetch quand l’id change.
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:3001/articles/${id}`);
        const data = await response.json();
        setArticle(data); // stocker les données dans l'état
      } catch (error) {
        console.log("Erreur lors du chargement de l'article :", error);
      }
    };
    fetchArticle(); // on exécute la fonction
  }, [id]);

  function deleteArticle() {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cet article ?",
    );
    fetch(`http://localhost:3001/articles/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erreur HTTP : ${res.status}`);
        }
        toast.success("Article supprimé avec succés !");

        setTimeout(() => {
          navigate("/articlespage");
        }, 1000);
      })
      .catch((err) => {
        toast.err(
          setError(
            err.message || "une erreur est servenue lors de la suppression",
          ),
        );
      });
  }

  if (article) {
    return (
      <main>
        <h2 className="h2-Page">Voici l'article numero : {id}</h2>
        <img className="article-img" src={article.image} alt={article.title} />
        <p className="create">{article.createdAt}</p>
        <h3 className="article-title">{article.title}</h3>
        <p style={{ whiteSpace: "pre-line", color: "white" }}>
          {article.content}
        </p>
        <div className="cont-btn-edit">
          <Link to={`/article/${article.id}/edit`} className="btn-edit">
            Edit
          </Link>
          <button onClick={deleteArticle}>Delete Article</button>
        </div>
      </main>
    );
  }
}
