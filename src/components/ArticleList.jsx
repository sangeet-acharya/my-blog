import ArticleThumbnail from "./ArticleThumbnail.jsx";
import "./ArticleList.css";

function ArticleList() {
  return (
    <div>
      <div className="first-thumbnail">
        <ArticleThumbnail />
        <ArticleThumbnail />
        <ArticleThumbnail />
        <ArticleThumbnail />
      </div>
      <div className="second-thumbnail">
        <ArticleThumbnail />
        <ArticleThumbnail />
        <ArticleThumbnail />
        <ArticleThumbnail />
      </div>
    </div>
  );
}
export default ArticleList;
