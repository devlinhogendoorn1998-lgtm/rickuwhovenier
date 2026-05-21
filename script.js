/* ================================
   HEX ACHTERGROND MET DIEPTE
   ================================ */
(function () {
    var NS = 'http://www.w3.org/2000/svg';

    function buildHexGrid() {
        var container = document.createElement('div');
        container.className = 'hex-bg';
        document.body.prepend(container);

        var svg = document.createElementNS(NS, 'svg');
        svg.setAttribute('aria-hidden', 'true');
        container.appendChild(svg);

        var defs = document.createElementNS(NS, 'defs');
        defs.innerHTML =
            '<radialGradient id="hv" cx="50%" cy="50%" r="68%">' +
            '<stop offset="0%" stop-color="rgba(248,246,241,0)"/>' +
            '<stop offset="100%" stop-color="rgba(248,246,241,0.6)"/>' +
            '</radialGradient>';
        svg.appendChild(defs);

        var g = document.createElementNS(NS, 'g');
        svg.appendChild(g);

        var vignette = document.createElementNS(NS, 'rect');
        vignette.setAttribute('fill', 'url(#hv)');
        vignette.setAttribute('pointer-events', 'none');
        svg.appendChild(vignette);

        function hexPoints(cx, cy, r) {
            var pts = [];
            for (var i = 0; i < 6; i++) {
                var angle = i * Math.PI / 3;
                pts.push([(cx + r * Math.cos(angle)).toFixed(2),
                           (cy + r * Math.sin(angle)).toFixed(2)]);
            }
            return pts;
        }

        function draw() {
            var W = window.innerWidth;
            var H = window.innerHeight;
            var R = 40;
            var cw = R * 1.5;
            var rh = R * Math.sqrt(3);

            svg.setAttribute('width', W);
            svg.setAttribute('height', H);
            vignette.setAttribute('width', W);
            vignette.setAttribute('height', H);

            while (g.firstChild) g.removeChild(g.firstChild);

            var cols = Math.ceil(W / cw) + 3;
            var rows = Math.ceil(H / rh) + 3;

            for (var col = -1; col < cols; col++) {
                for (var row = -1; row < rows; row++) {
                    var cx = col * cw;
                    var cy = row * rh + (col % 2 !== 0 ? rh / 2 : 0);
                    var v  = hexPoints(cx, cy, R);
                    var allPts = v.map(function(p){ return p.join(','); }).join(' ');

                    // Laag 1: subtiele groene fill
                    var fill = document.createElementNS(NS, 'polygon');
                    fill.setAttribute('points', allPts);
                    fill.setAttribute('fill', 'rgba(28,51,40,0.03)');
                    fill.setAttribute('stroke', 'none');
                    g.appendChild(fill);

                    // Laag 2: goud border
                    var border = document.createElementNS(NS, 'polygon');
                    border.setAttribute('points', allPts);
                    border.setAttribute('fill', 'none');
                    border.setAttribute('stroke', 'rgba(185,148,55,0.17)');
                    border.setAttribute('stroke-width', '1');
                    g.appendChild(border);

                    // Laag 3: highlight (top-links: v3-v4-v5-v0)
                    var hiPts = [v[3],v[4],v[5],v[0]].map(function(p){ return p.join(','); }).join(' ');
                    var hi = document.createElementNS(NS, 'polyline');
                    hi.setAttribute('points', hiPts);
                    hi.setAttribute('fill', 'none');
                    hi.setAttribute('stroke', 'rgba(255,255,255,0.13)');
                    hi.setAttribute('stroke-width', '1.8');
                    hi.setAttribute('stroke-linecap', 'round');
                    g.appendChild(hi);

                    // Laag 4: schaduw (rechts-onder: v0-v1-v2-v3)
                    var shPts = [v[0],v[1],v[2],v[3]].map(function(p){ return p.join(','); }).join(' ');
                    var sh = document.createElementNS(NS, 'polyline');
                    sh.setAttribute('points', shPts);
                    sh.setAttribute('fill', 'none');
                    sh.setAttribute('stroke', 'rgba(0,0,0,0.07)');
                    sh.setAttribute('stroke-width', '1.8');
                    sh.setAttribute('stroke-linecap', 'round');
                    g.appendChild(sh);
                }
            }
        }

        draw();

        var timer;
        window.addEventListener('resize', function () {
            clearTimeout(timer);
            timer = setTimeout(draw, 130);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', buildHexGrid);
    } else {
        buildHexGrid();
    }
})();

/* ================================
   COOKIE BANNER
   ================================ */
(function () {
    var banner = document.getElementById('cookie-banner');
    if (!banner) return;

    if (localStorage.getItem('cookieAccepted')) {
        banner.remove();
        return;
    }
    banner.removeAttribute('hidden');

    var acceptBtn = document.getElementById('cookie-accept');
    var declineBtn = document.getElementById('cookie-decline');

    if (acceptBtn) {
        acceptBtn.addEventListener('click', function () {
            localStorage.setItem('cookieAccepted', '1');
            banner.remove();
        });
    }
    if (declineBtn) {
        declineBtn.addEventListener('click', function () {
            banner.remove();
        });
    }
})();

/* ================================
   HAMBURGER MENU
   ================================ */
(function () {
    var btn  = document.querySelector('.hamburger');
    var menu = document.querySelector('.nav-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', function () {
        var isOpen = menu.classList.toggle('open');
        btn.classList.toggle('open', isOpen);
        btn.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', function (e) {
        if (!btn.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.remove('open');
            btn.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
        }
    });
})();

/* ================================
   SCROLL CARDS ANIMATIE
   ================================ */
(function () {
    var items = document.querySelectorAll('.item');
    if (!items.length) return;

    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        items.forEach(function (el) { io.observe(el); });
    } else {
        items.forEach(function (el) { el.classList.add('visible'); });
    }
})();

/* ================================
   CONTACT FORMULIER -> WHATSAPP
   ================================ */
(function () {
    var form = document.getElementById('contact-form');
    if (!form) return;

    var errEl = document.getElementById('form-error');
    var okEl  = document.getElementById('form-success');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        var naam    = form.querySelector('[name="naam"]').value.trim();
        var email   = form.querySelector('[name="email"]').value.trim();
        var bericht = form.querySelector('[name="bericht"]').value.trim();
        var telefoon= form.querySelector('[name="telefoon"]').value.trim();
        var dienst  = form.querySelector('[name="dienst"]').value;

        if (!naam || !email || !bericht) {
            if (errEl) errEl.removeAttribute('hidden');
            if (okEl)  okEl.setAttribute('hidden', '');
            return;
        }

        if (errEl) errEl.setAttribute('hidden', '');
        if (okEl)  okEl.removeAttribute('hidden');

        var msg = 'Hallo Rick! Ik stuur dit via de website.\n\n' +
                  'Naam: '     + naam     + '\n' +
                  'E-mail: '   + email    + '\n' +
                  'Telefoon: ' + telefoon + '\n' +
                  'Dienst: '   + dienst   + '\n\n' +
                  'Bericht: '  + bericht;

        window.open('https://wa.me/31627320547?text=' + encodeURIComponent(msg), '_blank');
        form.reset();
    });
})();