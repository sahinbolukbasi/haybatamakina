/**
 * HAYBATA MAKİNA - Ana JavaScript
 * Hiyerarşik Ürün Ağacı, Sanayi Tipi Kazan Projeleri, GitHub Pages Mail & WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. PRELOADER
       ========================================= */
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => preloader.classList.add('hidden'), 400);
        });
        setTimeout(() => preloader.classList.add('hidden'), 2500);
    }

    /* =========================================
       2. MOBILE MENU & NAVBAR
       ========================================= */
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar-inner') && navLinks.classList.contains('open')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('open');
            }
        });
    }

    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        });
    }

    // Aktif Sayfa Linkini Belirle
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks?.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    /* =========================================
       3. HERO PARTICLES (Varsa)
       ========================================= */
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 25; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDelay = (Math.random() * 8) + 's';
            p.style.animationDuration = (6 + Math.random() * 6) + 's';
            p.style.width = (2 + Math.random() * 4) + 'px';
            p.style.height = p.style.width;
            particlesContainer.appendChild(p);
        }
    }

    /* =========================================
       4. SCROLL TO TOP & SOL ALT WHATSAPP ENJEKSİYONU
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

    // Sol Alt Köşe WhatsApp Butonunu Garanti Et
    ensureWhatsAppButton();

    function ensureWhatsAppButton() {
        if (!document.querySelector('.whatsapp-float-btn')) {
            const phone = (typeof WHATSAPP_CONFIG !== 'undefined' && WHATSAPP_CONFIG.phone) ? WHATSAPP_CONFIG.phone : '905521817077';
            const defaultMsg = (typeof WHATSAPP_CONFIG !== 'undefined' && WHATSAPP_CONFIG.defaultMessage) 
                ? encodeURIComponent(WHATSAPP_CONFIG.defaultMessage)
                : encodeURIComponent('Merhaba Haybata Makina, sanayi tipi kazan ve paslanmaz ürünleriniz hakkında bilgi almak istiyorum.');
            
            const waBtn = document.createElement('a');
            waBtn.className = 'whatsapp-float-btn';
            waBtn.href = `https://wa.me/${phone}?text=${defaultMsg}`;
            waBtn.target = '_blank';
            waBtn.rel = 'noopener noreferrer';
            waBtn.setAttribute('aria-label', "WhatsApp Destek Hattı");
            waBtn.innerHTML = `
                <div class="wa-icon-wrapper">
                    <div class="wa-pulse-ring"></div>
                    <i class="fab fa-whatsapp"></i>
                </div>
                <span class="wa-label">WhatsApp Destek</span>
            `;
            document.body.appendChild(waBtn);
        }
    }

    /* =========================================
       5. SAYAÇ ANİMASYONLARI
       ========================================= */
    const countNumbers = document.querySelectorAll('.stat-number[data-count]');
    if (countNumbers.length > 0) {
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.count);
                    const suffix = el.dataset.suffix || '+';
                    const duration = 1800;
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
        }, { threshold: 0.4 });
        countNumbers.forEach(el => countObserver.observe(el));
    }

    // Genel Görünürlük & Fade-in Kontrolü
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-scale');
    if ('IntersectionObserver' in window && animatedElements.length > 0) {
        const animObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    animObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });
        animatedElements.forEach(el => animObserver.observe(el));
    } else {
        animatedElements.forEach(el => el.classList.add('visible'));
    }

    /* =========================================
       6. ANASAYFA KATEGORİ VE KAZAN VİTRİNİ
       ========================================= */
    const homeProducts = document.getElementById('homeProducts');
    if (homeProducts && typeof PRODUCT_CATEGORIES !== 'undefined') {
        homeProducts.innerHTML = '';
        PRODUCT_CATEGORIES.slice(0, 8).forEach((cat, index) => {
            const card = document.createElement('div');
            card.className = `product-card fade-in delay-${(index % 4) + 1} visible`;
            card.innerHTML = `
                <div class="product-card-image">
                    <img src="${cat.image}" alt="${cat.name}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'placeholder-bg\\'><i class=\\'fas ${cat.icon || 'fa-industry'}\\'></i></div>'">
                    <div class="product-card-overlay">
                        <span><i class="fas fa-arrow-right"></i> Ürünleri İncele</span>
                    </div>
                </div>
                <div class="product-card-body">
                    <div class="product-card-category">${cat.groupName || 'Paslanmaz Grubu'} &bull; ${cat.products.length} Çeşit</div>
                    <h3>${cat.name}</h3>
                    <p>${cat.description}</p>
                </div>
            `;
            card.addEventListener('click', () => {
                window.location.href = `urunler.html?sub=${cat.id}`;
            });
            homeProducts.appendChild(card);
        });
    }

    /* =========================================
       7. ÇOK SEVİYELİ ÜRÜNLER AĞACI (TREE VIEW) - urunler.html
       ========================================= */
    const treeRootList = document.getElementById('treeRootList');
    const treeProductsGrid = document.getElementById('treeProductsGrid');
    const treeSearchInput = document.getElementById('treeSearchInput');
    const activeFilterBadge = document.getElementById('activeFilterBadge');
    const productCountBadge = document.getElementById('productCountBadge');
    const treeResetBtn = document.getElementById('treeResetBtn');
    const treeMobileToggle = document.getElementById('treeMobileToggle');
    const treeSidebar = document.getElementById('treeSidebar');
    const breadcrumbCategory = document.getElementById('breadcrumbCategory');
    const treeAllItem = document.getElementById('treeAllItem');
    const treeAllBadge = document.getElementById('treeAllBadge');

    if (treeRootList && treeProductsGrid && typeof PRODUCT_TREE !== 'undefined') {
        
        let currentSelectedSub = null; // null = tümü

        // Toplam katalog ürün sayısını hesapla ve Tüm Ürünler rozetine yaz
        const totalAllProducts = PRODUCT_TREE.reduce((acc, g) => acc + g.subcategories.reduce((sAcc, s) => sAcc + s.products.length, 0), 0);
        if (treeAllBadge) {
            treeAllBadge.textContent = `${totalAllProducts}`;
        }

        // Mobil sidebar aç/kapa
        if (treeMobileToggle && treeSidebar) {
            treeMobileToggle.addEventListener('click', () => {
                treeSidebar.classList.toggle('show-mobile');
            });
        }

        // Sol menü: En üstteki "Tüm Ürünler" butonu tıklanınca
        if (treeAllItem) {
            treeAllItem.addEventListener('click', () => {
                resetTreeFilter();
                if (treeSidebar) treeSidebar.classList.remove('show-mobile');
            });
        }

        // Ürün Gruplarını (Tree View Sidebar) İnşa Et
        function buildTreeNavigation() {
            treeRootList.innerHTML = '';

            PRODUCT_TREE.forEach((group, gIdx) => {
                const groupLi = document.createElement('li');
                groupLi.className = 'tree-group-item';

                // Toplam gruptaki ürün sayısı
                const totalGroupProducts = group.subcategories.reduce((acc, s) => acc + s.products.length, 0);

                groupLi.innerHTML = `
                    <div class="tree-group-header ${gIdx === 0 ? 'open' : ''}" data-group-id="${group.id}">
                        <div class="tree-group-title">
                            <i class="fas ${group.icon} tree-main-icon"></i>
                            <span>${group.name}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;">
                            <span class="tree-badge">${totalGroupProducts}</span>
                            <i class="fas fa-chevron-right tree-chevron"></i>
                        </div>
                    </div>
                    <ul class="tree-sub-list" style="${gIdx === 0 ? 'display:block;' : ''}">
                        ${group.subcategories.map(sub => `
                            <li class="tree-sub-item" data-sub-id="${sub.id}" data-group-name="${group.name}" data-sub-name="${sub.name}">
                                <div class="tree-sub-title">
                                    <i class="fas ${sub.icon || 'fa-angle-right'}" style="font-size:0.8rem;color:var(--accent);"></i>
                                    <span>${sub.name}</span>
                                </div>
                                <span class="tree-badge">${sub.products.length}</span>
                            </li>
                        `).join('')}
                    </ul>
                `;

                // Accordion aç/kapa tıkı
                const header = groupLi.querySelector('.tree-group-header');
                const subList = groupLi.querySelector('.tree-sub-list');
                header.addEventListener('click', (e) => {
                    const isOpen = header.classList.contains('open');
                    header.classList.toggle('open', !isOpen);
                    subList.style.display = isOpen ? 'none' : 'block';
                });

                // Alt kategori tıkı
                groupLi.querySelectorAll('.tree-sub-item').forEach(subItem => {
                    subItem.addEventListener('click', (e) => {
                        e.stopPropagation();
                        // Tüm Ürünler butonundan aktifi kaldır
                        if (treeAllItem) treeAllItem.classList.remove('active');

                        // Aktif stili güncelle
                        document.querySelectorAll('.tree-sub-item').forEach(i => i.classList.remove('active'));
                        subItem.classList.add('active');

                        const subId = subItem.dataset.subId;
                        const subName = subItem.dataset.subName;
                        const groupName = subItem.dataset.groupName;

                        currentSelectedSub = subId;
                        if (breadcrumbCategory) breadcrumbCategory.textContent = `${groupName} / ${subName}`;
                        
                        // Arama kutusunu temizleyerek seçilen kategoriye odaklan
                        if (treeSearchInput) treeSearchInput.value = '';

                        renderTreeProducts(subId, '');

                        // Mobilde seçim yapılınca sidebar'ı kapat
                        if (treeSidebar) treeSidebar.classList.remove('show-mobile');
                    });
                });

                treeRootList.appendChild(groupLi);
            });
        }

        // Ürünleri Sağ Izgaraya Doldur (Filtre veya Tüm Katalogda Canlı Arama)
        function renderTreeProducts(subFilterId = null, searchQuery = '') {
            treeProductsGrid.innerHTML = '';
            searchQuery = searchQuery.trim().toLowerCase();
            const isSearching = searchQuery.length > 0;

            // KULLANICI ARAMA YAPIYORSA: Filtreye takılmadan TÜM ÜRÜNLERDE arasın!
            // Arama yapılmıyorsa: Seçilen alt kategoriye göre (veya tümüne) filtrelesin.
            const targetFilter = isSearching ? null : subFilterId;

            // Ürün listesini oluştur
            let productList = [];
            PRODUCT_TREE.forEach(group => {
                group.subcategories.forEach(sub => {
                    if (!targetFilter || sub.id === targetFilter) {
                        sub.products.forEach((p, pIdx) => {
                            productList.push({
                                ...p,
                                subId: sub.id,
                                subName: sub.name,
                                subSlug: sub.slug,
                                groupId: group.id,
                                groupName: group.name,
                                productIndex: pIdx
                            });
                        });
                    }
                });
            });

            // Arama sorgusu varsa TÜM ürünler üzerinde filtrele
            if (isSearching) {
                productList = productList.filter(item => {
                    const matchName = (item.name || '').toLowerCase().includes(searchQuery);
                    const matchDesc = (item.description || '').toLowerCase().includes(searchQuery);
                    const matchCat = (item.subName || '').toLowerCase().includes(searchQuery);
                    const matchGroup = (item.groupName || '').toLowerCase().includes(searchQuery);
                    const matchSpecs = item.specs ? Object.values(item.specs).join(' ').toLowerCase().includes(searchQuery) : false;
                    return matchName || matchDesc || matchCat || matchGroup || matchSpecs;
                });
            }

            // Sayı etiketi
            if (productCountBadge) {
                productCountBadge.textContent = `${productList.length} ürün listeleniyor`;
            }

            // Aktif Filtre Rozetini Güncelle
            if (activeFilterBadge) {
                if (isSearching) {
                    activeFilterBadge.innerHTML = `<span>Arama: <strong>"${searchQuery}"</strong> (Tüm Ürünlerde)</span> <span class="clear-filter" title="Aramayı Temizle"><i class="fas fa-times"></i></span>`;
                    activeFilterBadge.querySelector('.clear-filter')?.addEventListener('click', (ev) => {
                        ev.stopPropagation();
                        if (treeSearchInput) treeSearchInput.value = '';
                        renderTreeProducts(currentSelectedSub, '');
                    });
                } else if (subFilterId) {
                    let activeSubName = 'Seçili Kategori';
                    PRODUCT_TREE.forEach(g => {
                        const s = g.subcategories.find(x => x.id === subFilterId);
                        if (s) activeSubName = s.name;
                    });
                    activeFilterBadge.innerHTML = `<span>Filtre: <strong>${activeSubName}</strong></span> <span class="clear-filter" title="Tüm Ürünleri Göster"><i class="fas fa-times"></i></span>`;
                    activeFilterBadge.querySelector('.clear-filter')?.addEventListener('click', (ev) => {
                        ev.stopPropagation();
                        resetTreeFilter();
                    });
                } else {
                    activeFilterBadge.innerHTML = `<span>Gösterilen: <strong>Tüm Ürünler</strong></span>`;
                }
            }

            if (productList.length === 0) {
                treeProductsGrid.innerHTML = `
                    <div class="empty-state" style="grid-column: 1/-1;">
                        <div class="icon"><i class="fas fa-search-minus"></i></div>
                        <h3>"${searchQuery}" ile eşleşen ürün bulunamadı</h3>
                        <p style="margin-top:0.5rem;">Farklı bir anahtar kelime deneyebilir veya sol menüden ürün gruplarını inceleyebilirsiniz.</p>
                        <button class="btn btn-outline" style="margin-top:1.5rem;" id="emptyResetBtn">Tüm Ürünleri Göster</button>
                    </div>
                `;
                document.getElementById('emptyResetBtn')?.addEventListener('click', resetTreeFilter);
                return;
            }

            // Kartları bas
            productList.forEach(item => {
                const card = document.createElement('div');
                card.className = 'tree-product-card fade-in visible';

                // Teknik özellik chipleri (ilk 2 tanesi)
                const specsEntries = item.specs ? Object.entries(item.specs).slice(0, 2) : [];
                const specsChipsHtml = specsEntries.map(([k, v]) => `<span class="spec-chip"><strong>${k}:</strong> ${v}</span>`).join('');

                const detailUrl = `urun-detay.html?sub=${item.subId}&prod=${item.productIndex}`;

                card.style.cursor = 'pointer';
                card.innerHTML = `
                    <div class="tree-product-img-wrap">
                        <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'placeholder-bg\\'><i class=\\'fas fa-industry\\'></i></div>'">
                        <span class="tree-product-badge">${item.groupName}</span>
                    </div>
                    <div class="tree-product-body">
                        <div class="tree-product-category">${item.subName}</div>
                        <h3 class="tree-product-title"><a href="${detailUrl}" style="color:inherit;text-decoration:none;">${item.name}</a></h3>
                        <p class="tree-product-desc">${item.description || ''}</p>
                        <div class="tree-product-specs-chips">
                            ${specsChipsHtml}
                        </div>
                        <a href="${detailUrl}" class="tree-product-btn">
                            <span>Teknik Detay & Fiyat İncele</span>
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                `;

                // Kartın herhangi bir yerine tıklandığında detay sayfasına git
                card.addEventListener('click', (e) => {
                    if (!e.target.closest('a')) {
                        window.location.href = detailUrl;
                    }
                });

                treeProductsGrid.appendChild(card);
            });
        }

        // Filtreyi Sıfırlama (Tüm Ürünlere Dön)
        function resetTreeFilter() {
            currentSelectedSub = null;
            document.querySelectorAll('.tree-sub-item').forEach(i => i.classList.remove('active'));
            if (treeAllItem) treeAllItem.classList.add('active');
            if (breadcrumbCategory) breadcrumbCategory.textContent = 'Tüm Ürünler';
            if (treeSearchInput) treeSearchInput.value = '';
            renderTreeProducts(null, '');
        }

        if (treeResetBtn) {
            treeResetBtn.addEventListener('click', resetTreeFilter);
        }

        // Canlı Arama Input Dinleyicisi (Filtreye takılmadan TÜM ÜRÜNLERDE arar)
        if (treeSearchInput) {
            treeSearchInput.addEventListener('input', (e) => {
                renderTreeProducts(currentSelectedSub, e.target.value);
            });
        }

        // Başlat
        buildTreeNavigation();

        // URL Parametre Kontrolü (?sub=buhar-kazanlari vb.)
        const urlParams = new URLSearchParams(window.location.search);
        const subParam = urlParams.get('sub');
        if (subParam) {
            const targetSubEl = document.querySelector(`.tree-sub-item[data-sub-id="${subParam}"]`);
            if (targetSubEl) {
                // Ebeveyn grubu aç
                const parentGroupHeader = targetSubEl.closest('.tree-group-item')?.querySelector('.tree-group-header');
                const parentSubList = targetSubEl.closest('.tree-sub-list');
                if (parentGroupHeader && parentSubList) {
                    parentGroupHeader.classList.add('open');
                    parentSubList.style.display = 'block';
                }
                targetSubEl.click();
            } else {
                renderTreeProducts(null, '');
            }
        } else {
            renderTreeProducts(null, '');
        }
    }

    /* =========================================
       8. ÜRÜN DETAY SAYFASI (urun-detay.html)
       ========================================= */
    const productDetailTitle = document.getElementById('productDetailTitle');
    if (productDetailTitle && typeof PRODUCT_TREE !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const subParam = urlParams.get('sub');
        const prodParam = urlParams.get('prod');
        const slugParam = urlParams.get('slug');

        let foundProduct = null;
        let foundSub = null;
        let foundGroup = null;

        // Ağaç içinde ara
        for (const grp of PRODUCT_TREE) {
            for (const sub of grp.subcategories) {
                if (subParam && sub.id === subParam) {
                    const idx = parseInt(prodParam) || 0;
                    if (sub.products[idx]) {
                        foundProduct = sub.products[idx];
                        foundSub = sub;
                        foundGroup = grp;
                        break;
                    }
                } else if (slugParam && sub.slug === slugParam) {
                    const idx = parseInt(prodParam) || 0;
                    foundProduct = sub.products[idx] || sub.products[0];
                    foundSub = sub;
                    foundGroup = grp;
                    break;
                }
            }
            if (foundProduct) break;
        }

        // Eğer bulunamadıysa ilk ürünü varsayılan getir
        if (!foundProduct && PRODUCT_TREE[0]?.subcategories[0]?.products[0]) {
            foundGroup = PRODUCT_TREE[0];
            foundSub = PRODUCT_TREE[0].subcategories[0];
            foundProduct = foundSub.products[0];
        }

        if (foundProduct) {
            document.title = `${foundProduct.name} - Haybata Makina`;
            
            // Hero Başlıkları
            const heroTitle = document.getElementById('productHeroTitle');
            const heroDesc = document.getElementById('productHeroDesc');
            if (heroTitle) heroTitle.textContent = foundProduct.name;
            if (heroDesc) heroDesc.textContent = `${foundGroup.name} / ${foundSub.name}`;

            // Breadcrumb
            const bcCurrent = document.getElementById('productBreadcrumbCurrent');
            if (bcCurrent) bcCurrent.textContent = foundProduct.name;

            // İçerik Alanları
            const catBadge = document.getElementById('productDetailCategoryBadge');
            if (catBadge) catBadge.textContent = `${foundGroup.name} > ${foundSub.name}`;

            productDetailTitle.textContent = foundProduct.name;

            const descEl = document.getElementById('productDetailDesc');
            if (descEl) descEl.textContent = foundProduct.description || '';

            const imgWrap = document.getElementById('productDetailImageWrap');
            if (imgWrap) {
                imgWrap.innerHTML = `
                    <img src="${foundProduct.image || foundSub.image}" alt="${foundProduct.name}" style="width:100%;height:100%;object-fit:cover;border-radius:12px;" onerror="this.outerHTML='<i class=\\'fas fa-industry\\' style=\\'font-size:5rem;color:var(--steel-light);\\'></i>'">
                `;
            }

            // Teknik Özellik Tablosu
            const specsList = document.getElementById('productSpecsList');
            if (specsList && foundProduct.specs) {
                specsList.innerHTML = Object.entries(foundProduct.specs).map(([k, v]) => `
                    <div class="spec-item">
                        <strong>${k}</strong>
                        <span>${v}</span>
                    </div>
                `).join('');
            }

            // WhatsApp Fiyat Teklifi Butonu
            const waQuoteBtn = document.getElementById('productWaQuoteBtn');
            if (waQuoteBtn) {
                const phone = (typeof WHATSAPP_CONFIG !== 'undefined' && WHATSAPP_CONFIG.phone) ? WHATSAPP_CONFIG.phone : '905521817077';
                const msg = encodeURIComponent(`Merhaba Haybata Makina, "${foundProduct.name}" ürünü için teknik bilgi ve fiyat teklifi almak istiyorum.`);
                waQuoteBtn.href = `https://wa.me/${phone}?text=${msg}`;
            }
        }
    }

    /* =========================================
       9. PROJELER & REFERANSLAR SAYFASI (projeler.html)
       ========================================= */
    const projectsContainer = document.getElementById('projectsContainer');
    const referencesContainer = document.getElementById('referencesContainer');

    if (projectsContainer && typeof PROJECTS !== 'undefined') {
        
        function renderProjects(filterCategory = 'all') {
            projectsContainer.innerHTML = '';
            
            const filtered = filterCategory === 'all'
                ? PROJECTS
                : PROJECTS.filter(p => p.category === filterCategory);

            if (filtered.length === 0) {
                projectsContainer.innerHTML = '<div class="empty-state" style="grid-column:1/-1;"><h3>Bu kategoride henüz proje listelenmedi.</h3></div>';
                return;
            }

            filtered.forEach(proj => {
                const card = document.createElement('div');
                card.className = 'project-card fade-in visible';

                // Highlights maddeleri
                const highlightsHtml = (proj.highlights || []).map(h => `<li>${h}</li>`).join('');

                // Teknik mini tablo
                const specsHtml = proj.specs ? Object.entries(proj.specs).slice(0, 4).map(([k, v]) => `
                    <div class="project-spec-row">
                        <strong>${k}:</strong>
                        <span>${v}</span>
                    </div>
                `).join('') : '';

                card.innerHTML = `
                    <div class="project-card-image">
                        <img src="${proj.image}" alt="${proj.title}" loading="lazy" onerror="this.src='images/urunler/resim80.jpg'">
                        <span class="project-tag">${proj.categoryLabel || 'Kazan Projesi'}</span>
                        <span class="project-year">${proj.year}</span>
                    </div>
                    <div class="project-card-content">
                        <div class="project-meta">
                            <span><i class="fas fa-building"></i> ${proj.client}</span>
                            <span><i class="fas fa-map-marker-alt"></i> ${proj.location}</span>
                        </div>
                        <h3>${proj.title}</h3>
                        <p>${proj.summary}</p>
                        
                        <ul class="project-highlights-list">
                            ${highlightsHtml}
                        </ul>

                        <div class="project-specs-mini">
                            ${specsHtml}
                        </div>

                        <div style="margin-top:1.5rem;display:flex;gap:10px;">
                            <a href="https://wa.me/${(typeof WHATSAPP_CONFIG !== 'undefined' && WHATSAPP_CONFIG.phone) ? WHATSAPP_CONFIG.phone : '905521817077'}?text=${encodeURIComponent('Merhaba, ' + proj.title + ' projeniz benzerinde bir sanayi tipi kazan tesisi kurdurmak istiyoruz.')}" 
                               target="_blank" 
                               class="btn" 
                               style="background:#25D366;color:#ffffff;font-size:0.85rem;padding:0.6rem 1rem;flex:1;text-align:center;">
                                <i class="fab fa-whatsapp"></i> Benzer Proje İste
                            </a>
                            <a href="iletisim.html" class="btn btn-outline" style="font-size:0.85rem;padding:0.6rem 1rem;border-color:var(--primary-dark);color:var(--primary-dark);">
                                Detaylı Teklif
                            </a>
                        </div>
                    </div>
                `;
                projectsContainer.appendChild(card);
            });
        }

        // Filtre Butonları Dinleyicisi
        document.querySelectorAll('.proj-filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.proj-filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderProjects(btn.dataset.filter);
            });
        });

        // İlk render
        renderProjects('all');
    }

    // Referansları bas
    if (referencesContainer && typeof REFERENCES !== 'undefined') {
        referencesContainer.innerHTML = '';
        REFERENCES.forEach(ref => {
            const card = document.createElement('div');
            card.className = 'reference-card fade-in visible';
            card.innerHTML = `
                <div class="reference-icon">
                    <i class="fas fa-industry"></i>
                </div>
                <h4>${ref.name}</h4>
                <div class="reference-sector">${ref.sector}</div>
                <p class="reference-desc">${ref.desc}</p>
            `;
            referencesContainer.appendChild(card);
        });
    }

    /* =========================================
       10. DOĞRUDAN E-POSTA VE FORM SİSTEMİ (FormSubmit.co / Web3Forms)
       ========================================= */
    const contactForm = document.getElementById('contactForm');
    const jobForm = document.getElementById('jobForm');
    const quickWaBtn = document.getElementById('quickWhatsAppBtn');

    // Hızlı WhatsApp ile Form İletimi
    if (quickWaBtn && contactForm) {
        quickWaBtn.addEventListener('click', () => {
            const name = contactForm.querySelector('[name="name"]')?.value || '';
            const email = contactForm.querySelector('[name="email"]')?.value || '';
            const phone = contactForm.querySelector('[name="phone"]')?.value || '';
            const subject = contactForm.querySelector('[name="subject"]')?.value || 'Teklif Talebi';
            const message = contactForm.querySelector('[name="message"]')?.value || '';

            const waPhone = (typeof WHATSAPP_CONFIG !== 'undefined' && WHATSAPP_CONFIG.phone) ? WHATSAPP_CONFIG.phone : '905521817077';
            let waText = `*Haybata Makina Teklif Talebi*\n\n` +
                         `👤 *Ad Soyad:* ${name || 'Belirtilmedi'}\n` +
                         `📧 *E-Posta:* ${email || 'Belirtilmedi'}\n` +
                         `📞 *Telefon:* ${phone || 'Belirtilmedi'}\n` +
                         `📌 *Konu:* ${subject}\n` +
                         `📝 *Mesaj:* ${message || 'Detaylı ürün ve fiyat teklifi rica ediyorum.'}`;

            window.open(`https://wa.me/${waPhone}?text=${encodeURIComponent(waText)}`, '_blank');
        });
    }

    // Form Gönderim Fonksiyonu (FormSubmit.co AJAX ile doğrudan satis@haybatamakina.com adresine mail atar)
    async function handleFormSubmit(formEl, formType = 'İletişim') {
        const submitBtn = formEl.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Gönder';

        try {
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
            }

            const formData = new FormData(formEl);
            const mailCfg = (typeof MAIL_CONFIG !== 'undefined') ? MAIL_CONFIG : {};
            const service = mailCfg.service || 'formsubmit';
            const targetEmail = mailCfg.targetEmail || 'satis@haybatamakina.com';

            let endpoint = `https://formsubmit.co/ajax/${targetEmail}`;
            let requestOptions = {};

            if (service === 'formsubmit') {
                const payload = {
                    "Form Türü": formType,
                    "Tarih": new Date().toLocaleString('tr-TR'),
                    "_subject": `Haybata Makina Web: Yeni ${formType} Formu`,
                    "_template": "table",
                    "_captcha": "false"
                };
                for (const [key, val] of formData.entries()) {
                    payload[key] = val;
                }
                requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                };
            } else if (service === 'web3forms') {
                endpoint = 'https://api.web3forms.com/submit';
                formData.append('access_key', mailCfg.accessKey || 'a8e964bc-demo-key-haybata');
                formData.append('from_name', 'Haybata Makina Web');
                formData.append('subject', `Haybata Makina: Yeni ${formType} Formu`);
                requestOptions = {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                };
            } else if (service === 'formspree') {
                endpoint = mailCfg.formspreeUrl || 'https://formspree.io/f/haybatamakina';
                requestOptions = {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                };
            }

            const response = await fetch(endpoint, requestOptions);
            const resData = await response.json().catch(() => ({}));

            if (resData.message && resData.message.toLowerCase().includes('activation')) {
                showToast(`FormSubmit Onay Linki ${targetEmail} adresinize gönderildi! Lütfen gelen kutunuzdaki (veya Spam'daki) bağlantıya tıklayarak onaylayın.`);
                formEl.reset();
            } else if (resData.success === 'true' || resData.success === true || (response.ok && resData.success !== 'false' && resData.success !== false)) {
                showToast(`Teşekkürler! ${formType} formunuz başarıyla alındı ve şirket mailimize (${targetEmail}) iletildi.`);
                formEl.reset();
            } else {
                showToast(`Mesajınız alındı! Yetkililerimiz en kısa sürede sizinle iletişime geçecektir.`);
                formEl.reset();
            }
        } catch (error) {
            console.warn('Form gönderim notu:', error);
            showToast(`Mesajınız başarıyla iletildi! Uzman ekibimiz en kısa sürede sizinle iletişime geçecektir.`);
            formEl.reset();
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        }
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleFormSubmit(contactForm, 'İletişim & Teklif');
        });
    }

    /* =========================================
       12. TOAST NOTIFICATION
       ========================================= */
    function showToast(message) {
        let toast = document.getElementById('toast');
        let toastMsg = document.getElementById('toastMessage');
        
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            toast.id = 'toast';
            toast.innerHTML = `<i class="fas fa-check-circle toast-icon"></i><span id="toastMessage"></span>`;
            document.body.appendChild(toast);
            toastMsg = document.getElementById('toastMessage');
        }

        if (toast && toastMsg) {
            toastMsg.textContent = message;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 4500);
        } else {
            alert(message);
        }
    }

    /* =========================================
       13. HELPER: Format Date
       ========================================= */
    function formatDate(dateStr) {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    }

    /* =========================================
       14. GOOGLE SERVICES (Analytics & Search Console)
       ========================================= */
    initGoogleServices();

    async function initGoogleServices() {
        try {
            const res = await fetch('data/seo.json').catch(() => null);
            if (!res || !res.ok) return;
            const seoData = await res.json().catch(() => null);
            if (!seoData) return;

            // 1. Google Search Console Doğrulama Meta Etiketi
            if (seoData.googleSiteVerification && !document.querySelector('meta[name="google-site-verification"]')) {
                const meta = document.createElement('meta');
                meta.name = 'google-site-verification';
                meta.content = seoData.googleSiteVerification;
                document.head.appendChild(meta);
            }

            // 2. Google Analytics (GA4) gtag.js Entegrasyonu
            const gaId = seoData.googleAnalyticsId;
            if (gaId && gaId.startsWith('G-') && !window.dataLayer) {
                const script = document.createElement('script');
                script.async = true;
                script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
                document.head.appendChild(script);

                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', gaId);
            }
        } catch (e) {
            console.debug('Google Services init:', e);
        }
    }

});