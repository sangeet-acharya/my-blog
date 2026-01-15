import ArticleThumbnail from "./ArticleThumbnail.jsx";
import "./ArticleList.css";
import { useEffect, useState } from "react";
export default function ArticleList() {
  //Articles
  //Il est initialisé à un tableau vide [] car au départ tu n’as pas encore récupéré d’articles.
  const [articles, setArticles] = useState([]);
  //loading
  //setLoading est utilisé pour changer cette valeur
  //(true quand on commence à charger, false quand le chargement est terminé).
  const [loading, setLoading] = useState(false);
  //Error
  //Initialisé à une chaîne vide, car au départ il n’y a pas d’erreur.
  //setError sert à mettre à jour le message d’erreur si quelque chose se passe mal.
  const [error, setError] = useState("");
  //searchTerm ce que utilisatuers vas mettre en barre de recherche.
  const [searchTerm, setSearchTerm] = useState("");

  //use effect Articles
  useEffect(
    () => {
      //Création d’une variable cancelled pour gérer le nettoyage du composant.
      //Si le composant est démonté avant que la requête fetch soit terminée, on ne mettra pas à jour le state
      //pour éviter des erreurs comme “Can't perform a React state update on an unmounted component”.
      let cancelled = false;
      //Ce code fait un fetch asynchrone pour récupérer les articles dès que le composant est monté,
      // gère un état de chargement, un état d’erreur,
      // et prend soin d’éviter les erreurs si le composant est démonté avant la fin de la requête.
      const fetchArticles = async () => {
        try {
          //setLoading(true) : on indique que le chargement commence.
          setLoading(true);
          //On fait une requête HTTP GET vers l’URL
          //On ajoute la recherche côté API avec le paramètre q
          const response = await fetch(
            //--------------- | ----------------------------------------------------------------- |
            //`?`             | Début des paramètres de requête                                   |
            //`q=`            | Mot-clé pour rechercher dans tous les champs texte (json-server)  |
            //`${searchTerm}` | Valeur tapée par l’utilisateur, injectée dynamiquement dans l’URL |

            `http://localhost:3001/articles?q=${searchTerm}` //La syntaxe ?param=value
          );
          const data = await response.json();
          //Avant de mettre à jour le state, on vérifie si cancelled est toujours false
          if (!cancelled) {
            setArticles(data); //on met à jour le state articles avec les données filtrées par l'API
            setError(""); //on efface toute erreur précédente.
          }
          //try { ... } contient le code qui peut planter.
          //Si quelque chose ne va pas (par exemple le serveur n’est pas joignable,
          //ou la réponse n’est pas du JSON valide), JavaScript lance une erreur.
          //catch(err) attrape cette erreur pour que ton application ne plante pas.
        } catch (err) {
          //Si le composant React est démonté (par exemple tu passes à une autre page) avant que la requête ne se termine :
          //React interdit de mettre à jour le state (setArticles ou setError) sur un composant démonté.
          //Sinon, tu aurais une erreur :
          //Can't perform a React state update on an unmounted component
          //Donc on vérifie toujours if (!cancelled) avant de mettre à jour le state.
          if (!cancelled) {
            //Si une erreur est attrapée et que le composant est encore monté :
            //On met à jour le state error pour afficher un message d’erreur à l’utilisateur.
            //Exemple : tu pourrais afficher ce message dans ton interface
            setError("Erreur lors du chargement des articles");
            //Si la récupération échoue, tu supprimes tous les articles précédemment chargés (si jamais il y en avait).
            //Cela permet de ne pas afficher des données obsolètes ou incorrectes.
            setArticles([]);

            //Le bloc catch dit : "Si la récupération des articles échoue et que le composant est encore affiché,
            //montre un message d’erreur et vide la liste des articles."
          }
        } finally {
          //Bloc finally : s’exécute qu’importe si la requête a réussi ou échoué.
          if (!cancelled) {
            //setLoading(false) → on indique que le chargement est terminé.
            setLoading(false);
          }
        }
      };
      //on appel la function
      fetchArticles();
      //Cette fonction est appelée lorsque le composant se démonte.
      return () => {
        //Elle met cancelled = true, ce qui empêche le state d’être mis à jour après le démontage,
        // évitant ainsi les erreurs de React.
        cancelled = true;
      };
    },
    //Le tableau vide [] signifie que ce useEffect ne s’exécute qu’une seule fois, au montage du composant.
    //Donc les articles ne sont chargés qu’au démarrage.
    [searchTerm] // 🔹 on dépend de searchTerm pour relancer le fetch à chaque frappe
  );

  //barre de nav toutes en miniscules.
  const filteredArticles = articles.filter((article) => {
    return (
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  //chargement en cours
  if (loading) {
    return <div className="Chargement">Chargement en cours....</div>;
  }
  //erreurs
  if (error) {
    return <div>{error}</div>;
  }
  // barre de nav
  return (
    <div>
      <input
        type="text"
        className="Barre-De-Recherche"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
        className="first-thumbnail"
      >
        {/* cest comme filter , cela vas dans la tableau d'objet et 
        selectionne un par un les objets sauf que comparer a filter
        il ne cree pas un nouveau tableau vide ou il met tout les donner filtrer */}
        {filteredArticles.map((article) => (
          //key une function natifs
          //on dis que le article en params est = a article qu'on pourrais
          //utiliser en suite pour pouvoir les appeler dans les autres fichier.
          <ArticleThumbnail key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
