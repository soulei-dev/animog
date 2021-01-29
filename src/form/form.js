import '../assets/styles/styles.scss';
import './form.scss';

const form = document.querySelector('form');
const errorElement = document.querySelector('#errors');
let errors = [];


form.addEventListener('submit', async(event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const article = Object.fromEntries(formData.entries());
    if (formIsValid(article)) {
        const json = JSON.stringify(article);
        // faire une requête ici avec fetch
    }
});

const formIsValid = (article) => {
    errors = [];
    if (!article.author || !article.category || !article.content) {
        errors.push('❌ Veuillez renseigner tous les champs !');
    }
    // ajouter une condition ici afin d'éviter l'envoie d'un contenu trop court - si le contenu est trop court, push un message d'erreur.
    if (errors.length) {
        let errorHTML = '';
        errors.forEach((e) => {
            errorHTML += `<li>${e}</li>`;
        });
        errorElement.innerHTML = errorHTML;
        return false;
    } else {
        errorElement.innerHTML = '';
        return true;
    }
};
