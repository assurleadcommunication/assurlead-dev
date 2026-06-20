/**
 * AXA Assurances EL OMRANI - Application Premium
 * Fichier JavaScript Classique (Vanilla JS)
 * Gère l'interactivité globale, les carrousels, la navigation et le simulateur sans aucun framework.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialisation des icônes Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- VARIABLES D'ÉTAT GLOBALES ---
    let currentView = 'home'; // 'home' ou 'history'
    let currentSlide = 0;
    const slideIntervalTime = 5000; // 5 secondes par image

    // --- SÉLECTEURS PRINCIPAUX ---
    const hView = document.getElementById('home-view');
    const histView = document.getElementById('history-view');
    const navbar = document.getElementById('main-navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuBtn = document.getElementById('mobile-menu-btn');
    const ctaPopup = document.getElementById('cta-popup');
    
    // --- GESTION DE LA NAVIGATION & VUES (SPA) ---
    function setView(viewName) {
        currentView = viewName;
        if (viewName === 'home') {
            hView.classList.remove('hidden');
            histView.classList.add('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (viewName === 'history') {
            hView.classList.add('hidden');
            histView.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        updateNavbarStyle();
    }

    // Liaison des boutons de navigation
    document.querySelectorAll('[data-nav]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetView = btn.getAttribute('data-nav');
            const targetHash = btn.getAttribute('data-hash');
            
            // Fermeture automatique du menu mobile si ouvert
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }

            if (targetView) {
                setView(targetView);
            }

            // Gestion du défilement fluide vers une ancre spécifique
            if (targetHash) {
                if (currentView !== 'home') {
                    setView('home');
                }
                setTimeout(() => {
                    const el = document.querySelector(targetHash);
                    if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, currentView === 'home' ? 0 : 250);
            }
        });
    });

    // Retour à l'accueil depuis la page historique
    const backToHomeBtn = document.getElementById('back-to-home-btn');
    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            setView('home');
        });
    }

    // --- GESTION DU STYLE DE LA NAVBAR (SCROLL & VUES) ---
    function updateNavbarStyle() {
        const scrolled = window.scrollY > 20;
        
        // Texte et logos
        const navTitle = navbar.querySelector('.nav-title');
        const navSub = navbar.querySelector('.nav-sub');
        const navLinks = navbar.querySelectorAll('.nav-link-item');
        const navLogoImg = navbar.querySelector('.logo-sec');

        if (scrolled || currentView === 'history') {
            // Navbar blanche repliée
            navbar.classList.remove('bg-transparent', 'py-6');
            navbar.classList.add('bg-white', 'shadow-md', 'py-3');
            
            navTitle.classList.remove('text-white');
            navTitle.classList.add('text-[#00008F]');
            
            navSub.classList.remove('text-blue-100/80');
            navSub.classList.add('text-gray-500');

            navLinks.forEach(link => {
                link.classList.remove('text-white', 'hover:text-blue-200');
                link.classList.add('text-gray-700', 'hover:text-[#FF0000]');
            });

            if (menuBtn) {
                menuBtn.classList.remove('text-white');
                menuBtn.classList.add('text-gray-900');
            }
        } else {
            // Navbar transparente haut de page accueil
            navbar.classList.remove('bg-white', 'shadow-md', 'py-3');
            navbar.classList.add('bg-transparent', 'py-6');
            
            navTitle.classList.remove('text-[#00008F]');
            navTitle.classList.add('text-white');
            
            navSub.classList.remove('text-gray-500');
            navSub.classList.add('text-blue-100/80');

            navLinks.forEach(link => {
                link.classList.remove('text-gray-700', 'hover:text-[#FF0000]');
                link.classList.add('text-white', 'hover:text-blue-200');
            });

            if (menuBtn) {
                menuBtn.classList.remove('text-gray-900');
                menuBtn.classList.add('text-white');
            }
        }
    }

    window.addEventListener('scroll', updateNavbarStyle);

    // Initialisation
    updateNavbarStyle();

    // --- DUPLICATEUR MENU MOBILE ---
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- CARROUSEL HERO SECTION ---
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 0) {
        function showSlide(index) {
            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.remove('opacity-0', 'scale-110');
                    slide.classList.add('opacity-100', 'scale-100');
                } else {
                    slide.classList.remove('opacity-100', 'scale-100');
                    slide.classList.add('opacity-0', 'scale-110');
                }
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        // Cycle automatique
        let sliderTimer = setInterval(nextSlide, slideIntervalTime);

        // Pause et reprise du slider au survol (optionnel, pour confort utilisateur)
        const heroSection = document.getElementById('accueil');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => clearInterval(sliderTimer));
            heroSection.addEventListener('mouseleave', () => {
                sliderTimer = setInterval(nextSlide, slideIntervalTime);
            });
        }

        // Afficher la première slide
        showSlide(0);
    }

    // --- TIMER DU POPUP CTA (RAPPEL) ---
    setTimeout(() => {
        if (ctaPopup) {
            ctaPopup.classList.remove('hidden');
            ctaPopup.classList.add('flex');
        }
    }, 5000); // Se déclenche après 5 secondes

    // Fermeture du Popup CTA
    const closePopupButtons = document.querySelectorAll('.close-cta');
    closePopupButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (ctaPopup) {
                ctaPopup.classList.add('hidden');
                ctaPopup.classList.remove('flex');
            }
        });
    });

    // Callback Callback direct
    const callbackBtn = document.getElementById('callback-request-btn');
    if (callbackBtn) {
        callbackBtn.addEventListener('click', () => {
            alert('Votre demande de rappel a bien été prise en compte. Un conseiller de l\'agence EL OMRANI vous contactera sous 15 minutes.');
            if (ctaPopup) {
                ctaPopup.classList.add('hidden');
            }
        });
    }

    // --- BOUTON DE DEVIS (SCROLL VERS CONTACT) ---
    const quoteScrollBtn = document.getElementById('quote-scroll-btn');
    if (quoteScrollBtn) {
        quoteScrollBtn.addEventListener('click', () => {
            const el = document.getElementById('contact');
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // --- BOUTON DE RAPPELL RAPIDE ---
    const callMeBtn = document.getElementById('call-me-quick-btn');
    if (callMeBtn) {
        callMeBtn.addEventListener('click', () => {
            if (ctaPopup) {
                ctaPopup.classList.remove('hidden');
                ctaPopup.classList.add('flex');
            }
        });
    }

    // --- VALIDATION DU FORMULAIRE DE CONTACT & DEVIS ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const clientNameInput = contactForm.querySelector('input[type="text"]');
            const clientPhoneInput = contactForm.querySelector('input[type="tel"]');
            const insuranceType = contactForm.querySelector('select');
            
            if (!clientNameInput.value.trim() || !clientPhoneInput.value.trim()) {
                alert('Veuillez remplir votre nom complet et votre numéro de téléphone.');
                return;
            }

            // Affichage d'un toast ou d'une alerte premium de succès
            alert(`Merci ${clientNameInput.value.trim()} ! Votre demande de devis pour l'assurance ${insuranceType.value} a bien été transmise à Mme Fatima EL OMRANI.\n\nNous vous recontacterons au ${clientPhoneInput.value.trim()} très rapidement.`);
            
            // Réinitialisation du formulaire
            contactForm.reset();
        });
    }
});
