import "./assets/styles/styles.scss";
import "./index.scss";

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
      <p class="article-author">${article.author} - ${new Date(
      article.createdAt
    ).toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    })}</p>
      <p class="article-content">
        ${article.content}
      </p>
      <div class="article-actions">
        <button class="btn btn-danger" data-id=${article._id}>Supprimer</button>
        <button class="btn btn-primary" data-id=${article._id}>Modifier</button>
      </div>
      </div>    
              
        `;
    return articleDOM;
  });
  articlesContainer.innerHTML = "";
  articlesContainer.append(...articlesDOM);
  const deleteButtons = articlesContainer.querySelectorAll(".btn-danger");
  const editButtons = articlesContainer.querySelectorAll('.btn-primary');
  editButtons.forEach(button => {
    button.addEventListener('click', event => {
      const target = event.target;
      const articleId = target.dataset.id;
      location.assign(`/form.html?id=${articleId}`);
    })
  })
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      try {
        const target = event.target;
        const articleId = target.dataset.id;
        const res = await fetch(
          `https://restapi.fr/api/article2/${articleId}`,
          {
            method: "DELETE",
          }
        );
        // const body = await res.json();
        getArticle();
      } catch (e) {
        console.log("Erreur:", e);
      }
    });
  });
};

const getArticle = async () => {
  try {
    const res = await fetch("https://restapi.fr/api/article2");
    const articles = await res.json();
    createArticles(articles);
  } catch (e) {
    console.log("Erreur:", e);
  }
};

getArticle();
