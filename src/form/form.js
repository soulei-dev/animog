import "../assets/styles/styles.scss";
import "./form.scss";

const form = document.querySelector("form");
const errorElement = document.querySelector("#errors");
const buttonCancel = document.querySelector(".btn-secondary");
let errors = [];

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
      const res = await fetch("https://restapi.fr/api/article2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: json,
      });
      if (res.status < 299) {
        location.assign("/index.html");
      }
    } catch (e) {
      console.log("Erreur:", e);
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
