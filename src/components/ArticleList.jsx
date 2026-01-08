import ArticleThumbnail from "./ArticleThumbnail.jsx";
import "./ArticleList.css";
import { useState } from "react";
export default function ArticleList() {
  const articles1 = [
    {
      id: 1,
      image:
        "https://starwalk.space/gallery/images/mercury-earth-moon-size/fr/1920x1080.jpg",
      title: "Mercure",
      createdAt: new Date(),
      isLiked: false,
      likeCount: 0,
      content: `Période orbitale : 88jours
        Durée du jour : 176j 0h 0m
        Masse : 3,285 × 10^23 kg (0,055 M⊕)
        Gravité : 3,7 m/s²
        Superficie : 74,8 millions km²`,
      categoryName: "planète tellurique",
    },
    {
      id: 2,
      image:
        "https://www.shutterstock.com/shutterstock/videos/1107723731/thumb/1.jpg?ip=x480",
      title: "Vénus",
      createdAt: new Date(),
      likeCount: 0,
      content: `Distance du Soleil : 108,2 millions km
        Rayon : 6 051,8 km
        Durée du jour : 243j 0h 0m
        Masse : 4,867 × 10^24 kg (0,815 M⊕)
        Période orbitale : 225 jours`,
      categoryName: "planète tellurique",
    },
    {
      id: 3,
      image:
        "https://www.radiofrance.fr/pikapi/images/d52b6f36-c7f2-40ee-9d04-2bbdc9cd0ab8/1200x680?webp=false",
      title: "Terre",
      createdAt: new Date(),
      likeCount: 0,
      content: `Distance du Soleil : 149 597 870,7 km
        Rayon : 6 378,137 0 km
        Durée du jour : 24h 0m
        Masse : 5,972 × 10^24 kg (1 M⊕)
        Période orbitale : 365 jours`,
      categoryName: "planète tellurique",
    },
    {
      id: 4,
      image:
        "https://cnes.fr/sites/default/files/2024-06/planete-mars-rosetta-2007.jpg",
      title: "Mars",
      createdAt: new Date(),
      likeCount: 0,
      content: `Gravité : 3,73 m/s²
      Durée du jour : 1j 0h 36m
      Rayon : 3 389,5 km
      Distance du Soleil : 227,9 millions km
      Période orbitale : 687 jours`,
      categoryName: "planète tellurique",
    },
    {
      id: 5,
      image:
        "https://arc-anglerfish-eu-central-1-prod-leparisien.s3.amazonaws.com/public/CAZAZ4F6H7R6DJ2TLUUMXZEOBU.jpg",
      title: "Jupiter",
      createdAt: new Date(),
      likeCount: 0,
      content: `Distance du Soleil : 778,5 millions km
        Rayon : 69 911 km
        Gravité : 24,79 m/s²
        Masse : 1,898 × 10^27 kg (317,8 M⊕)
        Période orbitale : 12 ans`,
      categoryName: "planète gazeuse",
    },
    {
      id: 6,
      image:
        "https://img.freepik.com/photos-premium/planete-saturne-dans-espace_891301-4362.jpg",
      title: "Saturne",
      createdAt: new Date(),
      likeCount: 0,
      content: `Durée du jour : 0j 10h 34m 
        Distance du Soleil : 1,434 milliard km 
        Masse : 5,683 × 10^26 kg (95,16 M⊕) 
        Gravité : 10,44 m/s² 
        Période orbitale : 29 ans`,
      categoryName: "planète gazeuse",
    },
    {
      id: 7,
      image:
        "data:image/jpeg;base64,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",
      title: "Uranus",
      createdAt: new Date(),
      likeCount: 0,
      content: `Durée du jour : 0j 17h 14m
      Distance du Soleil : 2,871 milliards km
      Rayon : 25 362 km
      Date de découverte : 13 mars 1781
      Masse : 8,681 × 10^25 kg (14,54 M⊕)`,
      categoryName: "planète gazeuse",
    },
    {
      id: 8,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMQadrO7VccP8jKO75qV0jFpUuUlrD_i5taw&s",
      title: "Neptune",
      createdAt: new Date(),
      likeCount: 0,
      content: `Rayon : 24 622 km
      Durée du jour : 0j 16h 6m
      Date de découverte : 23/sep/1846
      Masse :1,024 × 10^26 kg (17,15 M⊕)
      Période orbitale : 165 ans`,
      categoryName: "planète gazeuse",
    },
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const filteredArticles = articles1.filter((article) => {
    return (
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
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
