import "./assets/styles/styles.scss";
import "./index.scss";

console.log("index ok");

const articlesContainer = document.querySelector(".articles-container");

const createArticles = (articles) => {
  const articlesDOM = articles.map((article) => {
    const articleDOM = document.createElement("div");
    articleDOM.classList.add("article");
    articleDOM.innerHTML = `
      <img
        src="${article.img}"
        alt="profile"
      />
      <h2>${article.title}</h2>
      <p class="article-author">${article.author} - ${article.category}</p>
      <p class="article-content">
        ${article.content}
      </p>
      <div class="article-actions">
        <button class="btn btn-danger" data-id=${article._id}>Supprimer</button>
      </div>
      </div>    
              
        `;
    return articleDOM;
  });
  articlesContainer.innerHTML = '';
  articlesContainer.append(...articlesDOM);
};

const getArticle = async () => {
  try {
    const res = await fetch("https://restapi.fr/api/article2");
    const articles = await res.json();
    console.log(articles);
    createArticles(articles);
  } catch (e) {
    console.log("Erreur:", e);
  }
};

getArticle();
