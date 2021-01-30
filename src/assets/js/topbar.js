const iconMobile = document.querySelector('.header-menu-icon');
const headerMenu = document.querySelector('.header-menu');
let isMenuOpen = false;
let mobileMenu; 

const closeMenu = () => {
    mobileMenu.classList.remove('open');
};

// to prevent the menu from being closed with a click inside
const createMobileMenu = () => {
    mobileMenu = document.createElement('div');
    mobileMenu.classList.add('mobile-menu');
    mobileMenu.addEventListener('click', (event) => {
        event.stopPropagation();
    });
    mobileMenu.append(headerMenu.querySelector('ul').cloneNode(true));
    headerMenu.append(mobileMenu);
}

const openMenu = () => {
    if (!mobileMenu) {
        createMobileMenu();
    }
    mobileMenu.classList.add('open');
}


const toggleMobileMenu = event => {
    if (isMenuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
    isMenuOpen = !isMenuOpen;
}

iconMobile.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleMobileMenu(); 
});

window.addEventListener('click', () => {
    if (isMenuOpen) {
        toggleMobileMenu();
    }
});

window.addEventListener('resize', (event) => {
    if (window.innerWidth > 480 && isMenuOpen) {
        toggleMobileMenu();
    }
});