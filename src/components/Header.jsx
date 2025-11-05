//lie le fichier css dans notre composant et ajouter du style
import "./Header.css";

function Header() {
  //----Logique------
  const title = "Welcome To My Blog (Created by : React Jsx).";

  //------Template (JSX)--------
  return (
    <nav>
      <div className="img-lien">
        <img
          src="https://img.freepik.com/vecteurs-premium/concept-mot-blog-formes-geometriques-couleur_205544-13021.jpg?semt=ais_hybrid&w=740&q=80"
          alt="Logo-de-site"
        />
        <a href="#">Accueil</a>
        <a href="#">Articles</a>
        <a href="#">L'Ecole</a>
        <a href="#">Contact</a>
        <a href="#" className="login">
          Me connecter
        </a>
      </div>
      <h1 className="H1-Header">{title}</h1>
    </nav>
  );
}
export default Header;
