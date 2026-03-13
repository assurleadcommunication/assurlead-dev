/* script.js - Version Finale Complète */

// Gestion du défilement de la barre de navigation
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('nav-scrolled');
    } else {
        navbar.classList.remove('nav-scrolled');
    }
});

// Gestion des sections de la page
function showSection(sectionId) {
    // Masquer toutes les sections
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });

    // Afficher la section demandée
    const targetSection = document.getElementById(`section-${sectionId}`);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Mettre à jour l'URL (facultatif)
    // history.pushState(null, null, `#${sectionId}`);
}

// Navigation vers le formulaire de contact
function navigateToContact() {
    showSection('home');
    setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
}

// Gestion du menu mobile
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    
    if (mobileMenu) {
        const isHidden = mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden');
        
        if (menuIcon) {
            menuIcon.setAttribute('data-lucide', isHidden ? 'x' : 'menu');
            lucide.createIcons();
        }
    }
}

// Gestion du popup de rappel
function closePopup() {
    const popup = document.getElementById('cta-popup');
    if (popup) {
        popup.classList.add('hidden');
    }
}

// Afficher le popup après 15 secondes (une seule fois)
let popupShown = false;
window.addEventListener('scroll', () => {
    if (!popupShown && window.scrollY > 1000) {
        const popup = document.getElementById('cta-popup');
        if (popup) {
            popup.classList.remove('hidden');
            popupShown = true;
        }
    }
});

// Initialisation des icônes Lucide (déjà appelé dans l'HTML mais par sécurité)
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Slider Hero
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.replace('opacity-100', 'opacity-0');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.replace('opacity-0', 'opacity-100');
        }, 5000);
    }
});
