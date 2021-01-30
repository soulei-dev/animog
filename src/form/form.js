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
       try {
        const json = JSON.stringify(article);
        const res = await fetch('https://restapi.fr/api/article2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        });
        const body = await res.json();
        console.log(body);


       } catch (e) {
        console.log('Erreur:', e);
       }
    }
});

const formIsValid = (article) => {
    errors = [];
    if (!article.author || !article.category || !article.content || !article.img || !article.title) {
        errors.push('❌ Veuillez renseigner tous les champs !');
    }
    if (article.content.length < 20) {
        errors.push('❌ Le contenu de l\'article est trop court !');
    }
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
