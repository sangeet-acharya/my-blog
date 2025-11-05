import "./ArticleThumbnail.css";
function ArticleThumbnail() {
  const article = {
    title: "🪐E=mc² Formule de L'infini🌎🌌",
    content:
      "Une galaxie est une structure cosmique formée d'étoiles, de planètes, de gaz, de poussière interstellaire, sans doute essentiellement de matière noire, le tout rassemblé par l’effet de gravitation de l'ensemble de ces composantes.",
    image:
      "https://img.pikbest.com/wp/202405/sci-fi-futuristic-cyberpunk-landscape-3d-render-of-a-universe-with-galaxy-cloud-backdrop_9834424.jpg!w700wp",
    createdAt: new Date(),
    isPublished: false,
    likeCount: 0,
    categoryName: "Galaxy",
  };
  return (
    <div>
      <article className="Article-One-By-One">
        <img src={article.image} alt="image-de-vignette" />
        <p className="create">{article.createdAt.toDateString()}</p>
        <h3>{article.title}</h3>
        <p>{article.content}</p>
        <p>likes: {article.likeCount}</p>
        <p className="category">{article.categoryName}</p>
      </article>
    </div>
  );
}
export default ArticleThumbnail;
