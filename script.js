/* Cookie Banner */
const cookieBanner = document.getElementById('cookie-banner');
if (cookieBanner && !localStorage.getItem('cookie-consent')) {
    cookieBanner.hidden = false;
}

document.getElementById('cookie-accept')?.addEventListener('click', function () {
    localStorage.setItem('cookie-consent', 'accepted');
    cookieBanner.hidden = true;
});

document.getElementById('cookie-decline')?.addEventListener('click', function () {
    localStorage.setItem('cookie-consent', 'declined');
    cookieBanner.hidden = true;
});

/* Hamburger Menu */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = navMenu.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', false);
        });
    });

    document.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
    });
}

/* Contact Formulier */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const naam      = document.getElementById('cf-naam');
        const email     = document.getElementById('cf-email');
        const bericht   = document.getElementById('cf-bericht');
        const telefoon  = document.getElementById('cf-telefoon');
        const dienst    = document.getElementById('cf-dienst');
        const errorEl   = document.getElementById('form-error');
        const successEl = document.getElementById('form-success');

        // Reset vorige fouten
        errorEl.hidden = true;
        successEl.hidden = true;
        [naam, email, bericht].forEach(el => el.classList.remove('field-error'));

        // Validatie
        let valid = true;
        if (!naam.value.trim())                          { naam.classList.add('field-error');    valid = false; }
        if (!email.value.trim() || !email.value.includes('@')) { email.classList.add('field-error');   valid = false; }
        if (!bericht.value.trim())                       { bericht.classList.add('field-error'); valid = false; }

        if (!valid) {
            errorEl.hidden = false;
            errorEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            return;
        }

        // Mailto bouwen
        const dienstWaarde = dienst && dienst.value ? dienst.value : '–';
        const onderwerp = 'Contactformulier' + (dienstWaarde !== '–' ? ' – ' + dienstWaarde : '') + ' via rickuwhovenier.nl';
        const body =
            'Naam: '     + naam.value.trim()     + '\r\n' +
            'Telefoon: ' + (telefoon && telefoon.value.trim() ? telefoon.value.trim() : '–') + '\r\n' +
            'E-mail: '   + email.value.trim()    + '\r\n' +
            'Dienst: '   + dienstWaarde          + '\r\n\r\n' +
            'Bericht:\r\n' + bericht.value.trim();

        window.location.href =
            'mailto:info@rickuwhovenier.nl' +
            '?subject=' + encodeURIComponent(onderwerp) +
            '&body='    + encodeURIComponent(body);

        // Bevestiging tonen en formulier resetten
        successEl.hidden = false;
        contactForm.reset();
        successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.portfolio-img');
    
    images.forEach(img => {
        img.onerror = function() {
            // Logt een duidelijke fout als de map 'img' niet klopt
            console.error("Fout: Kan " + this.src + " niet vinden. Check of de map 'img' bestaat.");
        };
    });
});
/* Mentor focus: Controle op de nieuwe afbeelding */
document.addEventListener('DOMContentLoaded', () => {
    const aanplantImg = document.querySelector('img[src*="aanbeplanting"]');
    
    if (aanplantImg) {
        aanplantImg.onerror = function() {
            console.error("Fout: aanplanten.webp niet gevonden in de map 'img'.");
        };
    }
});
// Mentor check: Controleren of links en grid werken
document.addEventListener('DOMContentLoaded', () => {
    const portfolioGrid = document.querySelector('.grid-3');
    
    if (portfolioGrid) {
        const style = window.getComputedStyle(portfolioGrid);
        if (style.display !== 'grid') {
            console.error("Layout-fout: Grid staat niet aan. Check je CSS bestand.");
        } else {
            console.log("Portfolio grid is actief en kaarten staan naast elkaar.");
        }
    }
});
// Mentor check: Functionaliteit voor mail-koppeling
document.addEventListener('DOMContentLoaded', () => {
    const mailBtn = document.getElementById('mail-button');
    const select = document.getElementById('dienst-select');
    const emailAdres = "info@rickuwhovenier.nl";

    mailBtn.addEventListener('click', () => {
        const gekozenDienst = select.value;
        const subject = encodeURIComponent("Offerte aanvraag voor: " + gekozenDienst);
        const body = encodeURIComponent("Beste Rick,\n\nIk ontvang graag een offerte voor " + gekozenDienst + ".\n\nMet vriendelijke groet,");
        
        // Opent het mailprogramma van de klant
        window.location.href = `mailto:${emailAdres}?subject=${subject}&body=${body}`;
    });

    console.log("Offerte systeem met mail-koppeling actief.");
});
// Mentor check: Validatie van de zwevende knop
document.addEventListener('DOMContentLoaded', () => {
    const waButton = document.querySelector('.whatsapp-floating');
    
    if (waButton) {
        console.log("WhatsApp floating button is actief op de pagina.");
    }

    // Mail functionaliteit behouden
    const mailBtn = document.getElementById('mail-button');
    if (mailBtn) {
        mailBtn.addEventListener('click', () => {
            const select = document.getElementById('dienst-select');
            const gekozenDienst = select.value;
            const emailAdres = "info@rickuwhovenier.nl";
            
            const subject = encodeURIComponent("Offerte aanvraag: " + gekozenDienst);
            const body = encodeURIComponent("Hoi Rick, ik wil graag een offerte voor " + gekozenDienst + ".");
            
            window.location.href = `mailto:${emailAdres}?subject=${subject}&body=${body}`;
        });
    }
});