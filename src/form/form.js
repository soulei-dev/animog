import "../assets/styles/styles.scss";
import "./form.scss";

const form = document.querySelector("form");
const errorElement = document.querySelector("#errors");
const buttonCancel = document.querySelector(".btn-secondary");
let articleId;
let errors = [];

const fillForm = (article) => {
  const author = document.querySelector('input[name="author"]');
  const img = document.querySelector('input[name="img"]');
  const category = document.querySelector('input[name="category"]');
  const title = document.querySelector('input[name="title"]');
  const content = document.querySelector('textarea');
  author.value = article.author || '';
  img.value = article.img || '';
  category.value = article.category || '';
  title.value = article.title || '';
  content.value = article.content || '';
}

const initForm = async () => {
  const params = new URL(location.href);
  articleId = params.searchParams.get("id");

  if (articleId) {
    const res = await fetch(`https://restapi.fr/api/article2/${articleId}`);
    if (res.status < 300) {
      const article = await res.json();
      fillForm(article);
      console.log(article);
    }
  }
}

initForm();

buttonCancel.addEventListener("click", () => {
  location.assign("/index.html");
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const article = Object.fromEntries(formData.entries());
  if (formIsValid(article)) {
    try {
      const json = JSON.stringify(article);
      let res;
      if (articleId) {
        res = await fetch(`https://restapi.fr/api/article2/${articleId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: json
        });
      } else {
        res = await fetch(`https://restapi.fr/api/article2`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: json
        })
      }
      if (res.status < 300) {
        location.assign('/index.html');
      }
    } catch (e) {
      console.log('Erreur:', e);
    }
  }
});

const formIsValid = (article) => {
  errors = [];
  if (
    !article.author ||
    !article.category ||
    !article.content ||
    !article.img ||
    !article.title
  ) {
    errors.push("❌ Veuillez renseigner tous les champs !");
  } else {
    errors = [];
  }
  if (article.content.length < 20) {
    errors.push("❌ Le contenu de l'article est trop court !");
  }
  if (errors.length) {
    let errorHTML = "";
    errors.forEach((e) => {
      errorHTML += `<li>${e}</li>`;
    });
    errorElement.innerHTML = errorHTML;
    return false;
  } else {
    errorElement.innerHTML = "";
    return true;
  }
};
