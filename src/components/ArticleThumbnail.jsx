import "./ArticleThumbnail.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function ArticleThumbnail({ article }) {
  //Déclare l'état du "like"
  // Ici, tu utilises le hook useState de React.
  // useState permet de créer une variable d’état,
  // c’est-à-dire une valeur qui peut changer pendant que ton composant est affiché.
  const [like, setLike] = useState(false);
  //like → la valeur actuelle de l’état (ici, un booléen).
  //setLike → la fonction qui permet de modifier cette valeur.
  //(false) → la valeur initiale, donc au départ , l’article n’est pas liké.

  //En résumé :
  //like commence à false → pas liké.
  //Quand tu appelleras setLike(true), il deviendra liké.

  // Fonction qui inverse l'etat
  //C’est une fonction qui change la valeur de like.
  //!like signifie "l’opposé de la valeur actuelle" :
  //Si like vaut false, alors !like vaut true.
  //Si like vaut true, alors !like vaut false.

  //🔁 Donc :
  //Si tu cliques une première fois → like passe de false à true.
  //Si tu recliques → like repasse à false.
  const toggleLike = () => {
    setLike(!like);
  };

  //la condition pour les couleurs
  let iconColor;
  if (like) {
    iconColor = "red";
  } else {
    iconColor = "pink";
  }

  return (
    <div>
      <article className="Article-One-By-One">
        <Link to={`/articlePage/${article.id}`}>
          <img
            className="article-img"
            src={article.image}
            alt={article.title}
          />
          <p className="create">{article.createdAt}</p>
          <h3 className="article-title">{article.title}</h3>
          <p style={{ whiteSpace: "pre-line", color: "white" }}>
            {article.content}
          </p>
        </Link>
        {/* bouton like */}
        <button onClick={toggleLike} className="likeButton">
          <FontAwesomeIcon
            icon={faUserAstronaut}
            className="iconLike"
            style={{
              color: iconColor, //change de couleur si liké
              transition: "color 0.3s ease",
            }}
          />
        </button>
        <p className="category">{article.categoryName}</p>
      </article>
    </div>
  );
}
