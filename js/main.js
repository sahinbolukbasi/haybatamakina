/**
 * HAYBATA MAKİNA - Ana JavaScript
 * Tüm sayfalar için interaktif özellikler
 */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. PRELOADER
       ========================================= */
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => preloader.classList.add('hidden'), 500);
        });
        // Fallback: max 3 seconds
        setTimeout(() => preloader.classList.add('hidden'), 3000);
    }

    /* =========================================
       2. MOBILE MENU
       ========================================= */
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });
        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar-inner') && navLinks.classList.contains('open')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('open');
            }
        });
    }

    /* =========================================
       3. NAVBAR SCROLL EFFECT
       ========================================= */
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    /* =========================================
       4. ACTIVE NAV LINK
       ========================================= */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks?.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === currentPage);
    });

    /* =========================================
       5. HERO PARTICLES
       ========================================= */
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = (Math.random() * 8) + 's';
            particle.style.animationDuration = (6 + Math.random() * 6) + 's';
            particle.style.width = (2 + Math.random() * 4) + 'px';
            particle.style.height = particle.style.width;
            particlesContainer.appendChild(particle);
        }
    }

    /* =========================================
       6. SCROLL TO TOP
       ========================================= */
    const scrollTop = document.getElementById('scrollTop');
    if (scrollTop) {
        window.addEventListener('scroll', () => {
            scrollTop.classList.toggle('visible', window.scrollY > 400);
        });
        scrollTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* =========================================
       7. SCROLL REVEAL ANIMATIONS
       ========================================= */
    const revealElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-scale');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    /* =========================================
       8. COUNTER ANIMATION
       ========================================= */
    const countNumbers = document.querySelectorAll('.stat-number[data-count]');
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                const suffix = el.dataset.suffix || '+';
                const duration = 2000;
                const start = performance.now();
                el.textContent = '0';

                function updateCounter(currentTime) {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(eased * target);
                    el.textContent = current + suffix;
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        el.textContent = target + suffix;
                    }
                }
                requestAnimationFrame(updateCounter);
                countObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    countNumbers.forEach(el => countObserver.observe(el));

    /* =========================================
       9. PRODUCT CARDS - HOME PAGE
       ========================================= */
    const homeProducts = document.getElementById('homeProducts');
    if (homeProducts && typeof PRODUCT_CATEGORIES !== 'undefined') {
        PRODUCT_CATEGORIES.forEach((cat, index) => {
            const card = document.createElement('div');
            card.className = `product-card fade-in delay-${(index % 5) + 1}`;
            card.innerHTML = `
                <div class="product-card-image">
                    <img src="${cat.image}" alt="${cat.name}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'placeholder-bg\\'><i class=\\'fas ${cat.icon}\\'></i></div>'">
                    <div class="product-card-overlay">
                        <span><i class="fas fa-arrow-right"></i> Detaylı İncele</span>
                    </div>
                </div>
                <div class="product-card-body">
                    <div class="product-card-category">${cat.products.length} Ürün</div>
                    <h3>${cat.name}</h3>
                    <p>${cat.description}</p>
                </div>
            `;
            card.addEventListener('click', () => {
                window.location.href = `urun-detay.html?slug=${cat.slug}`;
            });
            homeProducts.appendChild(card);
        });

        // Dynamically added cards: add visible class with stagger
        // (no IntersectionObserver dependency - elements appear reliably)
        setTimeout(() => {
            homeProducts.querySelectorAll('.fade-in').forEach((el, i) => {
                setTimeout(() => {
                    el.classList.add('visible');
                }, 100 + (i * 80));
            });
        }, 200);
    }

    /* =========================================
       10. ALL PRODUCTS PAGE (with filter)
       ========================================= */
    const allProductsGrid = document.getElementById('allProductsGrid');
    const filterContainer = document.querySelector('.category-filter');
    if (allProductsGrid && typeof PRODUCT_CATEGORIES !== 'undefined') {
        function renderProducts(filter) {
            allProductsGrid.innerHTML = '';
            const filtered = filter
                ? PRODUCT_CATEGORIES.filter(c => c.id === filter)
                : PRODUCT_CATEGORIES;

            if (filtered.length === 0) {
                allProductsGrid.innerHTML = '<div class="empty-state"><div class="icon"><i class="fas fa-box-open"></i></div><h3>Bu kategoride ürün bulunamadı</h3></div>';
                return;
            }

            filtered.forEach((cat, index) => {
                const card = document.createElement('div');
                card.className = `product-card fade-in delay-${(index % 5) + 1}`;
                card.innerHTML = `
                    <div class="product-card-image">
                        <img src="${cat.image}" alt="${cat.name}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'placeholder-bg\\'><i class=\\'fas ${cat.icon}\\'></i></div>'">
                        <div class="product-card-overlay">
                            <span><i class="fas fa-arrow-right"></i> Detaylı İncele</span>
                        </div>
                    </div>
                    <div class="product-card-body">
                        <div class="product-card-category">${cat.products.length} Ürün</div>
                        <h3>${cat.name}</h3>
                        <p>${cat.description}</p>
                    </div>
                `;
                card.addEventListener('click', () => {
                    window.location.href = `urun-detay.html?slug=${cat.slug}`;
                });
                allProductsGrid.appendChild(card);
            });
            // Trigger animations
            setTimeout(() => {
                allProductsGrid.querySelectorAll('.fade-in').forEach(el => {
                    el.classList.add('visible');
                });
            }, 100);
        }

        // Filter buttons
        if (filterContainer) {
            filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    renderProducts(btn.dataset.filter || '');
                    // Scroll to grid
                    allProductsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            });
        }

        renderProducts('');
    }

    /* =========================================
       11. PRODUCT DETAIL PAGE
       ========================================= */
    const productDetailTitle = document.getElementById('productDetailTitle');
    if (productDetailTitle && typeof PRODUCT_CATEGORIES !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const slug = params.get('slug');
        const productIndex = params.get('product');
        const category = PRODUCT_CATEGORIES.find(c => c.slug === slug);

        if (category) {
            // Specific product view or category overview
            const viewProduct = (productIndex !== null && category.products[productIndex])
                ? category.products[parseInt(productIndex)]
                : null;

            // Update page title
            document.title = viewProduct ? `${viewProduct.name} - ${category.name} - Haybata Makina` : `${category.name} - Haybata Makina`;
            document.querySelector('meta[name="description"]')?.setAttribute('content', viewProduct ? `${viewProduct.name} - ${viewProduct.description}` : `${category.name} - ${category.description}`);

            // Hero section
            const hero = document.querySelector('.product-detail-hero');
            if (hero) {
                hero.querySelector('h1').textContent = viewProduct ? viewProduct.name : category.name;
                hero.querySelector('p').textContent = viewProduct ? viewProduct.description : category.description;
            }

            // Gallery
            const gallery = document.querySelector('.product-detail-gallery .main-image');
            if (gallery) {
                const imgSrc = viewProduct ? viewProduct.image : category.image;
                gallery.innerHTML = `<img src="${imgSrc}" alt="${viewProduct ? viewProduct.name : category.name}" onerror="this.outerHTML='<i class=\\'fas ${category.icon}\\' style=\\'font-size:5rem;color:var(--steel-light);\\'></i>'">`;
            }

            // Breadcrumb
            document.querySelector('.breadcrumb .current')?.remove();
            document.querySelector('.breadcrumb .product-link')?.remove();
            const breadcrumb = document.querySelector('.breadcrumb-inner');
            if (breadcrumb) {
                const separator = document.createTextNode(' / ');
                const catLink = document.createElement('a');
                catLink.href = `urun-detay.html?slug=${category.slug}`;
                catLink.className = 'product-link';
                catLink.textContent = category.name;
                catLink.style.cssText = 'color:var(--primary-dark);font-weight:500;';
                breadcrumb.appendChild(separator);
                breadcrumb.appendChild(catLink);

                if (viewProduct) {
                    const sep2 = document.createTextNode(' / ');
                    const span = document.createElement('span');
                    span.className = 'current';
                    span.textContent = viewProduct.name;
                    breadcrumb.appendChild(sep2);
                    breadcrumb.appendChild(span);
                } else {
                    const span = document.createElement('span');
                    span.className = 'current';
                    span.textContent = category.name;
                    breadcrumb.appendChild(document.createTextNode(' / '));
                    breadcrumb.appendChild(span);
                }
            }

            // Products list
            const specsContainer = document.querySelector('.product-specs');
            const infoContainer = document.querySelector('.product-detail-info');
            if (infoContainer) {
                // Remove old content
                const oldSpecs = infoContainer.querySelector('.product-specs');
                if (oldSpecs) oldSpecs.remove();

                // Remove default description
                const oldDesc = infoContainer.querySelector('.description');
                if (oldDesc) oldDesc.remove();

                const productList = document.createElement('div');
                productList.className = 'product-specs';

                if (viewProduct) {
                    // Show single product with specs
                    const specsHtml = Object.entries(viewProduct.specs).map(([key, val]) =>
                        `<div class="spec-item"><strong>${key}</strong><span>${val}</span></div>`
                    ).join('');
                    productList.innerHTML = `
                        <h3>${viewProduct.name} - Teknik Özellikler</h3>
                        <div style="margin: 1.5rem 0; padding: 1.5rem; background: var(--gray-100); border-radius: var(--radius);">
                            <p style="color: var(--text-light); margin-bottom: 1rem; line-height: 1.8;">${viewProduct.description}</p>
                            <div class="specs-list">${specsHtml}</div>
                        </div>
                        <a href="urun-detay.html?slug=${category.slug}" class="btn btn-outline" style="margin-top: 1rem;border-color:var(--primary-dark);color:var(--primary-dark);">
                            <i class="fas fa-arrow-left"></i> ${category.name} - Tüm Ürünler
                        </a>
                    `;
                } else {
                    // Show all products in category
                    productList.innerHTML = `<h3>Bu Gruptaki Ürünler</h3>`;

                    category.products.forEach((p, idx) => {
                        const specsHtml = Object.entries(p.specs).map(([key, val]) =>
                            `<div class="spec-item"><strong>${key}</strong><span>${val}</span></div>`
                        ).join('');

                        productList.innerHTML += `
                            <div class="product-card" style="margin: 1.5rem 0; cursor: pointer;" data-product="${idx}">
                                <div style="display:flex;gap:1rem;flex-wrap:wrap;">
                                    <div style="flex:0 0 120px;height:120px;border-radius:8px;overflow:hidden;background:var(--gray-200);">
                                        <img src="${p.image || category.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;" onerror="this.outerHTML='<div style=\\'width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2rem;color:var(--steel-light);\\'><i class=\\'fas ${category.icon}\\'></i></div>'">
                                    </div>
                                    <div style="flex:1;min-width:200px;padding:0.5rem 0;">
                                        <h4 style="color:var(--primary-dark);margin-bottom:0.3rem;">${p.name}</h4>
                                        <p style="color:var(--text-light);font-size:0.85rem;margin-bottom:0.5rem;">${p.description}</p>
                                        <div class="specs-list">${specsHtml}</div>
                                    </div>
                                </div>
                            </div>
                        `;
                    });

                    // Add click handlers for each product card
                    setTimeout(() => {
                        productList.querySelectorAll('[data-product]').forEach(el => {
                            el.addEventListener('click', function() {
                                const idx = this.dataset.product;
                                window.location.href = `urun-detay.html?slug=${category.slug}&product=${idx}`;
                            });
                        });
                    }, 50);
                }

                infoContainer.appendChild(productList);
            }
        } else {
            // No category found
            const hero = document.querySelector('.product-detail-hero');
            if (hero) {
                hero.querySelector('h1').textContent = 'Ürün Bulunamadı';
                hero.querySelector('p').textContent = 'Aradığınız ürün kategorisi bulunamadı.';
            }
        }
    }

    /* =========================================
       12. ANNOUNCEMENTS
       ========================================= */
    const homeAnnouncements = document.getElementById('homeAnnouncements');
    const allAnnouncements = document.getElementById('allAnnouncements');
    const announcementDetail = document.getElementById('announcementDetail');

    // Home page announcements
    if (homeAnnouncements && typeof ANNOUNCEMENTS !== 'undefined') {
        const latest = ANNOUNCEMENTS.slice(0, 3);
        latest.forEach((ann, index) => {
            const card = document.createElement('div');
            card.className = `announcement-card fade-in delay-${(index % 3) + 1}`;
            card.innerHTML = `
                <div class="announcement-date"><i class="far fa-calendar-alt"></i> ${formatDate(ann.date)}</div>
                <h3>${ann.title}</h3>
                <p>${ann.content.substring(0, 120)}${ann.content.length > 120 ? '...' : ''}</p>
            `;
            card.addEventListener('click', () => {
                window.location.href = `duyuru-detay.html?id=${ann.id}`;
            });
            homeAnnouncements.appendChild(card);
        });
    }

    // All announcements page
    if (allAnnouncements && typeof ANNOUNCEMENTS !== 'undefined') {
        ANNOUNCEMENTS.forEach(ann => {
            const card = document.createElement('div');
            card.className = 'announcement-card fade-in';
            card.innerHTML = `
                <div class="announcement-date"><i class="far fa-calendar-alt"></i> ${formatDate(ann.date)}</div>
                <span style="font-size:0.75rem;color:var(--accent-dark);font-weight:600;text-transform:uppercase;letter-spacing:1px;">${ann.category}</span>
                <h3>${ann.title}</h3>
                <p>${ann.content.substring(0, 150)}${ann.content.length > 150 ? '...' : ''}</p>
            `;
            card.addEventListener('click', () => {
                window.location.href = `duyuru-detay.html?id=${ann.id}`;
            });
            allAnnouncements.appendChild(card);
        });
    }

    // Announcement detail page
    if (announcementDetail && typeof ANNOUNCEMENTS !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const id = parseInt(params.get('id'));
        const announcement = ANNOUNCEMENTS.find(a => a.id === id);

        if (announcement) {
            document.title = `${announcement.title} - Haybata Makina Duyurular`;
            announcementDetail.innerHTML = `
                <span class="date"><i class="far fa-calendar-alt"></i> ${formatDate(announcement.date)}</span>
                <span style="font-size:0.8rem;color:var(--accent-dark);font-weight:600;text-transform:uppercase;letter-spacing:1px;display:block;margin-bottom:1rem;">${announcement.category}</span>
                <h1>${announcement.title}</h1>
                <div class="content">${announcement.content}</div>
                <a href="duyurular.html" class="btn btn-outline" style="margin-top: 2rem;border-color: var(--primary-dark);color: var(--primary-dark);">
                    <i class="fas fa-arrow-left"></i> Tüm Duyurular
                </a>
            `;
        } else {
            announcementDetail.innerHTML = `
                <div class="empty-state">
                    <div class="icon"><i class="fas fa-newspaper"></i></div>
                    <h3>Duyuru bulunamadı</h3>
                    <p>Aradığınız duyuru mevcut değil.</p>
                    <a href="duyurular.html" class="btn btn-outline" style="margin-top: 1rem;border-color: var(--primary-dark);color: var(--primary-dark);">
                        <i class="fas fa-arrow-left"></i> Duyurulara Dön
                    </a>
                </div>
            `;
        }
    }

    /* =========================================
       13. JOB LISTINGS
       ========================================= */
    const jobList = document.getElementById('jobList');
    const jobForm = document.getElementById('jobForm');

    if (jobList && typeof JOB_LISTINGS !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const selectedJob = urlParams.get('job');
        let selectedJobTitle = '';

        JOB_LISTINGS.forEach((job, index) => {
            const card = document.createElement('div');
            card.className = `job-card fade-in delay-${(index % 4) + 1}`;
            card.innerHTML = `
                <h4>${job.title}</h4>
                <div class="job-meta">
                    <span><i class="fas fa-building"></i> ${job.department}</span>
                    <span><i class="fas fa-briefcase"></i> ${job.type}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                </div>
                <p style="color: var(--text-light); font-size: 0.9rem; margin-top: 0.75rem;">${job.description}</p>
            `;
            card.addEventListener('click', () => {
                window.location.href = `is-basvurusu.html?job=${encodeURIComponent(job.title)}`;
            });
            jobList.appendChild(card);
        });

        // Pre-select job from URL param
        if (selectedJob && jobForm) {
            const select = jobForm.querySelector('#applicantJob');
            if (select) {
                const option = Array.from(select.options).find(opt => opt.value === selectedJob);
                if (option) select.value = selectedJob;
            }
        }
    }

    /* =========================================
       14. FORM HANDLING (Contact + Job)
       ========================================= */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Mesajınız başarıyla gönderildi! En kısa sürede dönüş yapacağız.');
            contactForm.reset();
        });
    }

    if (jobForm) {
        jobForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Başvurunuz başarıyla alınmıştır. İnceleme sonucunda sizinle iletişime geçeceğiz.');
            jobForm.reset();
        });
    }

    /* =========================================
       15. TOAST NOTIFICATION
       ========================================= */
    function showToast(message) {
        const toast = document.getElementById('toast');
        const toastMsg = document.getElementById('toastMessage');
        if (toast && toastMsg) {
            toastMsg.textContent = message;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 4000);
        } else {
            alert(message);
        }
    }

    /* =========================================
       16. HELPER: Format Date
       ========================================= */
    function formatDate(dateStr) {
        const date = new Date(dateStr);
        const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    }

    /* =========================================
       17. SMOOTH ANCHOR SCROLL
       ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    console.log('%c HAYBATA MAKİNA %c Paslanmaz Çelik Ürünleri ',
        'background: #c0a060; color: #0d0d1a; padding: 4px 8px; border-radius: 4px 0 0 4px; font-weight: bold;',
        'background: #0d0d1a; color: #c0a060; padding: 4px 8px; border-radius: 0 4px 4px 0; font-weight: bold;'
    );

});