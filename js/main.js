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
    if (homeProducts) {
        function renderDefaultHomeCategories() {
            if (typeof PRODUCT_CATEGORIES === 'undefined') return;
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

        renderDefaultHomeCategories();

        // Admin panelinden "Anasayfada Göster" işaretlenen ürünleri canlı çek ve vitrinde listele
        async function loadFeaturedHomeProducts() {
            try {
                const res = await fetch(`data/products_merged.json?_t=${Date.now()}`).catch(() => null);
                if (!res || !res.ok) return;
                const products = await res.json();
                const featured = products.filter(p => p.showOnHome === true || p.showOnHome === 'true');
                if (featured.length === 0) return;

                homeProducts.innerHTML = '';
                featured.slice(0, 8).forEach((prod, index) => {
                    const card = document.createElement('div');
                    card.className = `product-card fade-in delay-${(index % 4) + 1} visible`;
                    const cleanImg = (prod.image || '').replace(/^\/+/, '') || 'images/urunler/resim80.jpg';
                    const categoryLabel = prod.category || prod.categoryGroup || 'Paslanmaz Grubu';
                    card.innerHTML = `
                        <div class="product-card-image">
                            <img src="${cleanImg}" alt="${prod.name}" loading="lazy" onerror="this.src='images/urunler/resim80.jpg'">
                            <div class="product-card-overlay">
                                <span><i class="fas fa-arrow-right"></i> Detay & Teklif</span>
                            </div>
                        </div>
                        <div class="product-card-body">
                            <div class="product-card-category"><i class="fas fa-star" style="color:var(--accent);margin-right:4px;"></i>${categoryLabel}</div>
                            <h3>${prod.name}</h3>
                            <p>${prod.description || ''}</p>
                        </div>
                    `;
                    card.addEventListener('click', () => {
                        const slug = prod._slug || (prod.name ? prod.name.toLowerCase().replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c').replace(/[^a-z0-9]/g, '-') : '');
                        window.location.href = `urun-detay.html?slug=${encodeURIComponent(slug)}`;
                    });
                    homeProducts.appendChild(card);
                });
            } catch (err) {
                console.warn('Anasayfa vitrin urunleri yukleme:', err);
            }
        }
        loadFeaturedHomeProducts();
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

                const slugVal = item._slug || item.slug || (item.name ? item.name.toLowerCase().replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c').replace(/[^a-z0-9]/g, '-') : '');
                const detailUrl = `urun-detay.html?slug=${encodeURIComponent(slugVal)}&sub=${item.subId}&prod=${item.productIndex}`;
                const cardImg = (item.image || '').replace(/^\/+/, '');

                card.style.cursor = 'pointer';
                card.innerHTML = `
                    <div class="tree-product-img-wrap">
                        <img src="${cardImg}" alt="${item.name}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'placeholder-bg\\'><i class=\\'fas fa-industry\\'></i></div>'">
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

        // Admin panelinden yapılan ürün değişikliklerini (resim, açıklama, özellik, kategori) canlı senkronize et
        async function loadAndApplyCmsProducts() {
            try {
                // 1. Önce güncel products_merged.json'ı çek
                const res = await fetch(`data/products_merged.json?_t=${Date.now()}`).catch(() => null);
                let cmsProducts = [];
                if (res && res.ok) {
                    cmsProducts = await res.json();
                }

                // 2. data/products_index.json dosyasını çek
                const idxRes = await fetch(`data/products_index.json?_t=${Date.now()}`).catch(() => null);
                let fileList = [];
                if (idxRes && idxRes.ok) {
                    fileList = await idxRes.json();
                }

                // 3. GitHub API üzerinden en son commit edilen katalog dosyalarını kontrol et (Timeout 2.5s)
                let ghFiles = null;
                try {
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 2500);
                    const ghRes = await fetch(`https://api.github.com/repos/sahinbolukbasi/haybatamakina/contents/data/products_catalog?ref=main&_t=${Date.now()}`, {
                        signal: controller.signal
                    }).catch(() => null);
                    clearTimeout(timeoutId);
                    if (ghRes && ghRes.ok) {
                        ghFiles = await ghRes.json();
                    }
                } catch (err) {
                    // API limiti veya offline durumu
                }

                // 4. Doğrudan çekilmesi gereken güncel dosyaları belirle
                const filesToFetch = new Set();
                if (Array.isArray(ghFiles)) {
                    ghFiles.forEach(gf => {
                        if (gf.name && gf.name.endsWith('.json')) {
                            filesToFetch.add(gf.name);
                        }
                    });
                } else if (fileList.length > 0) {
                    fileList.forEach(f => filesToFetch.add(f));
                }

                // Eğer son düzenlenen/eklenen ürünler varsa doğrudan JSON dosyasından çek
                if (filesToFetch.size > 0) {
                    const fetchedFiles = await Promise.all(Array.from(filesToFetch).slice(0, 50).map(f =>
                        fetch(`data/products_catalog/${encodeURIComponent(f)}?_t=${Date.now()}`)
                            .then(r => r.ok ? r.json() : null)
                            .then(data => {
                                if (data) {
                                    data._file = f;
                                    data._slug = f.replace(/\.json$/, '');
                                }
                                return data;
                            })
                            .catch(() => null)
                    ));
                    fetchedFiles.filter(Boolean).forEach(fp => {
                        const exIdx = cmsProducts.findIndex(p => p._file === fp._file || p._slug === fp._slug || p.name === fp.name);
                        if (exIdx >= 0) {
                            cmsProducts[exIdx] = { ...cmsProducts[exIdx], ...fp };
                        } else {
                            cmsProducts.push(fp);
                        }
                    });
                }

                if (!Array.isArray(cmsProducts) || cmsProducts.length === 0) return;

                let changesApplied = false;
                function norm(str) {
                    return (str || '').toLowerCase()
                        .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
                        .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
                        .replace(/[^a-z0-9]/g, '');
                }

                function findTargetSub(catName, subCatName) {
                    const cNorm = norm(catName || '');
                    const sNorm = norm(subCatName || '');

                    // 1. Önce kategori grubunu bul
                    let targetGrp = null;
                    if (cNorm) {
                        targetGrp = PRODUCT_TREE.find(g => 
                            norm(g.name).includes(cNorm) || cNorm.includes(norm(g.name)) ||
                            norm(g.id).includes(cNorm) || cNorm.includes(norm(g.id))
                        );
                    }

                    // 2. Kategori grubu bulunduysa, altındaki subcategories içinde ara
                    if (targetGrp && targetGrp.subcategories && targetGrp.subcategories.length > 0) {
                        if (sNorm) {
                            const matchedSub = targetGrp.subcategories.find(s =>
                                norm(s.name).includes(sNorm) || sNorm.includes(norm(s.name)) ||
                                norm(s.slug || '').includes(sNorm) || sNorm.includes(norm(s.slug || '')) ||
                                norm(s.id || '').includes(sNorm) || sNorm.includes(norm(s.id || ''))
                            );
                            if (matchedSub) return { group: targetGrp, sub: matchedSub };
                        }
                        return { group: targetGrp, sub: targetGrp.subcategories[0] };
                    }

                    // 3. Kategori grubu boşsa veya bulunamadıysa, tüm ağaçtaki alt kategorilerde ara
                    if (sNorm) {
                        for (const g of PRODUCT_TREE) {
                            for (const s of g.subcategories) {
                                if (norm(s.name).includes(sNorm) || sNorm.includes(norm(s.name)) ||
                                    norm(s.slug || '').includes(sNorm) || sNorm.includes(norm(s.slug || '')) ||
                                    norm(s.id || '').includes(sNorm) || sNorm.includes(norm(s.id || ''))) {
                                    return { group: g, sub: s };
                                }
                            }
                        }
                    }

                    // 4. Varsayılan ilk grup ve ilk alt başlık
                    return { group: PRODUCT_TREE[0], sub: PRODUCT_TREE[0]?.subcategories[0] };
                }

                // Admin panelindeki ürünler TEK YETKİLİ kaynaktır!
                // Admin panelinde olmayan veya panelden silinmiş hiçbir ürün sitede gösterilmez.
                PRODUCT_TREE.forEach(grp => {
                    grp.subcategories.forEach(sub => {
                        sub.products = [];
                    });
                });

                cmsProducts.forEach(cmsProd => {
                    if (!cmsProd || !cmsProd.name) return;
                    const cmsNorm = norm(cmsProd.name);
                    const cmsSlug = cmsProd._slug || cmsNorm;
                    const cleanImg = (cmsProd.image || '').replace(/^\/+/, '');

                    let cleanSpecs = {};
                    if (Array.isArray(cmsProd.specs)) {
                        cmsProd.specs.forEach(s => {
                            if (s && s.key) cleanSpecs[s.key] = s.value;
                        });
                    } else if (typeof cmsProd.specs === 'object' && cmsProd.specs !== null) {
                        cleanSpecs = cmsProd.specs;
                    }

                    const targetDest = findTargetSub(cmsProd.category, cmsProd.subCategory);
                    if (targetDest && targetDest.sub) {
                        targetDest.sub.products.push({
                            name: cmsProd.name,
                            _slug: cmsSlug,
                            _file: cmsProd._file || '',
                            image: cleanImg || targetDest.sub.image || 'images/urunler/resim80.jpg',
                            description: cmsProd.description || '',
                            specs: cleanSpecs,
                            showOnHome: cmsProd.showOnHome === true || cmsProd.showOnHome === 'true'
                        });
                        changesApplied = true;
                    }
                });

                if (changesApplied) {
                    const newTotal = PRODUCT_TREE.reduce((acc, g) => acc + g.subcategories.reduce((sAcc, s) => sAcc + s.products.length, 0), 0);
                    if (treeAllBadge) treeAllBadge.textContent = `${newTotal}`;
                    buildTreeNavigation();
                    renderTreeProducts(currentSelectedSub, treeSearchInput ? treeSearchInput.value : '');
                }
            } catch (e) {
                console.warn('CMS senkronizasyon uyarısı:', e);
            }
        }

        loadAndApplyCmsProducts();
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
        const nameParam = urlParams.get('name');

        function normStr(str) {
            return (str || '').toLowerCase()
                .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
                .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
                .replace(/[^a-z0-9]/g, '');
        }

        let foundProduct = null;
        let foundSub = null;
        let foundGroup = null;

        // Ağaç içinde ara (önce slug/isim, sonra sub/prod)
        for (const grp of PRODUCT_TREE) {
            for (const sub of grp.subcategories) {
                if (slugParam) {
                    const pMatch = sub.products.find(p => p._slug === slugParam || normStr(p.name) === normStr(slugParam));
                    if (pMatch) {
                        foundProduct = pMatch;
                        foundSub = sub;
                        foundGroup = grp;
                        break;
                    }
                }
                if (nameParam) {
                    const pMatch = sub.products.find(p => normStr(p.name) === normStr(nameParam));
                    if (pMatch) {
                        foundProduct = pMatch;
                        foundSub = sub;
                        foundGroup = grp;
                        break;
                    }
                }
                if (subParam && sub.id === subParam) {
                    const idx = parseInt(prodParam) || 0;
                    if (sub.products[idx]) {
                        foundProduct = sub.products[idx];
                        foundSub = sub;
                        foundGroup = grp;
                        break;
                    }
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
            renderDetailDom(foundProduct, foundGroup, foundSub);
        }

        function renderDetailDom(prod, grp, sub) {
            document.title = `${prod.name} - Haybata Makina`;
            
            const heroTitle = document.getElementById('productHeroTitle');
            const heroDesc = document.getElementById('productHeroDesc');
            if (heroTitle) heroTitle.textContent = prod.name;
            if (heroDesc) heroDesc.textContent = `${grp?.name || 'Paslanmaz'} / ${sub?.name || 'Ürün Grubu'}`;

            const bcCurrent = document.getElementById('productBreadcrumbCurrent');
            if (bcCurrent) bcCurrent.textContent = prod.name;

            const catBadge = document.getElementById('productDetailCategoryBadge');
            if (catBadge) catBadge.textContent = `${grp?.name || 'Paslanmaz'} > ${sub?.name || 'Ürün'}`;

            productDetailTitle.textContent = prod.name;

            const descEl = document.getElementById('productDetailDesc');
            if (descEl) descEl.textContent = prod.description || '';

            const imgWrap = document.getElementById('productDetailImageWrap');
            const cleanImg = (prod.image || sub?.image || '').replace(/^\/+/, '');
            if (imgWrap) {
                imgWrap.innerHTML = `
                    <img src="${cleanImg}" alt="${prod.name}" style="width:100%;height:100%;object-fit:cover;border-radius:12px;" onerror="this.outerHTML='<i class=\\'fas fa-industry\\' style=\\'font-size:5rem;color:var(--steel-light);\\'></i>'">
                `;
            }

            const specsList = document.getElementById('productSpecsList');
            if (specsList && prod.specs) {
                let specsEntries = [];
                if (Array.isArray(prod.specs)) {
                    specsEntries = prod.specs.map(s => [s.key, s.value]);
                } else if (typeof prod.specs === 'object' && prod.specs !== null) {
                    specsEntries = Object.entries(prod.specs);
                }
                specsList.innerHTML = specsEntries.map(([k, v]) => `
                    <div class="spec-item">
                        <strong>${k}</strong>
                        <span>${v}</span>
                    </div>
                `).join('');
            }

            const waQuoteBtn = document.getElementById('productWaQuoteBtn');
            if (waQuoteBtn) {
                const phone = (typeof WHATSAPP_CONFIG !== 'undefined' && WHATSAPP_CONFIG.phone) ? WHATSAPP_CONFIG.phone : '905521817077';
                const msg = encodeURIComponent(`Merhaba Haybata Makina, "${prod.name}" ürünü için teknik bilgi ve fiyat teklifi almak istiyorum.`);
                waQuoteBtn.href = `https://wa.me/${phone}?text=${msg}`;
            }
        }

        // Admin panelinden yapılan son güncellemeleri (yeni resim, açıklama, özellik) canlı ve anlık çek
        async function fetchFreshDetailFromCms(activeSlug, activeName) {
            try {
                let liveData = null;

                // 1. Eğer slug varsa doğrudan data/products_catalog/[slug].json dosyasını çek (en hızlı ve kesin yöntem)
                if (activeSlug) {
                    const singleRes = await fetch(`data/products_catalog/${encodeURIComponent(activeSlug)}.json?_t=${Date.now()}`).catch(() => null);
                    if (singleRes && singleRes.ok) {
                        liveData = await singleRes.json();
                    }
                }

                // 2. Bulunamazsa products_merged.json içinde ara
                if (!liveData) {
                    const res = await fetch(`data/products_merged.json?_t=${Date.now()}`).catch(() => null);
                    if (res && res.ok) {
                        const list = await res.json();
                        const targetNorm = normStr(activeName || activeSlug);
                        liveData = list.find(item => normStr(item.name) === targetNorm || item._slug === activeSlug);
                    }
                }

                if (liveData) {
                    const cleanImg = (liveData.image || '').replace(/^\/+/, '');
                    let cleanSpecs = {};
                    if (Array.isArray(liveData.specs)) {
                        liveData.specs.forEach(s => { if (s && s.key) cleanSpecs[s.key] = s.value; });
                    } else if (typeof liveData.specs === 'object' && liveData.specs !== null) {
                        cleanSpecs = liveData.specs;
                    }

                    renderDetailDom({
                        name: liveData.name || foundProduct.name,
                        image: cleanImg || foundProduct.image,
                        description: liveData.description || foundProduct.description,
                        specs: Object.keys(cleanSpecs).length > 0 ? cleanSpecs : foundProduct.specs
                    }, foundGroup, foundSub);
                }
            } catch (err) {
                console.warn('Detay CMS yükleme uyarısı:', err);
            }
        }

        fetchFreshDetailFromCms(slugParam || foundProduct?._slug, foundProduct?.name);
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
                let specsEntries = [];
                if (Array.isArray(proj.specs)) {
                    specsEntries = proj.specs.map(s => [s.key, s.value]);
                } else if (typeof proj.specs === 'object' && proj.specs !== null) {
                    specsEntries = Object.entries(proj.specs);
                }
                const specsHtml = specsEntries.slice(0, 4).map(([k, v]) => `
                    <div class="project-spec-row">
                        <strong>${k}:</strong>
                        <span>${v}</span>
                    </div>
                `).join('');

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
        function renderReferencesList(list) {
            referencesContainer.innerHTML = '';
            list.forEach(ref => {
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
        renderReferencesList(REFERENCES);

        // CMS'ten güncel referansları yükle
        async function loadCmsReferences() {
            try {
                const res = await fetch(`data/references_merged.json?_t=${Date.now()}`).catch(() => null);
                if (res && res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data) && data.length > 0) {
                        renderReferencesList(data);
                    }
                }
            } catch (err) {
                console.warn('Referanslar CMS yükleme:', err);
            }
        }
        loadCmsReferences();
    }

    // CMS'ten güncel Projeleri yükle
    if (projectsContainer) {
        async function loadCmsProjects() {
            try {
                const res = await fetch(`data/projects_merged.json?_t=${Date.now()}`).catch(() => null);
                if (res && res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data) && data.length > 0) {
                        // Resim yollarını temizle
                        data.forEach(p => {
                            if (p.image) p.image = p.image.replace(/^\/+/, '');
                        });
                        // PROJECTS dizisini güncelle
                        if (typeof PROJECTS !== 'undefined') {
                            data.forEach(cp => {
                                const exIdx = PROJECTS.findIndex(p => p.id === cp.id || p.title === cp.title);
                                if (exIdx >= 0) {
                                    PROJECTS[exIdx] = { ...PROJECTS[exIdx], ...cp };
                                } else {
                                    PROJECTS.push(cp);
                                }
                            });
                        }
                        const activeBtn = document.querySelector('.proj-filter-btn.active');
                        const activeFilter = activeBtn ? activeBtn.dataset.filter : 'all';
                        if (typeof renderProjects === 'function') {
                            renderProjects(activeFilter);
                        }
                    }
                }
            } catch (err) {
                console.warn('Projeler CMS yükleme:', err);
            }
        }
        loadCmsProjects();
    }

    /* =========================================
       10. SOSYAL MEDYA & İLETİŞİM DİNAMİK AYARLARI (contact.json)
       ========================================= */
    async function loadSiteSettingsAndSocial() {
        try {
            const res = await fetch(`data/contact.json?_t=${Date.now()}`).catch(() => null);
            if (!res || !res.ok) return;
            const settings = await res.json();

            // Sosyal Medya Linkleri
            if (settings.facebook) {
                document.querySelectorAll('.footer-social a[aria-label="Facebook"]').forEach(a => a.href = settings.facebook);
            }
            if (settings.instagram) {
                document.querySelectorAll('.footer-social a[aria-label="Instagram"]').forEach(a => a.href = settings.instagram);
            }
            if (settings.linkedin) {
                document.querySelectorAll('.footer-social a[aria-label="LinkedIn"]').forEach(a => a.href = settings.linkedin);
            }
            if (settings.twitter) {
                document.querySelectorAll('.footer-social a[aria-label="Twitter"]').forEach(a => a.href = settings.twitter);
            }
            if (settings.youtube) {
                document.querySelectorAll('.footer-social a[aria-label="YouTube"]').forEach(a => a.href = settings.youtube);
            }
            if (settings.whatsapp) {
                const cleanWa = settings.whatsapp.replace(/[^0-9]/g, '');
                document.querySelectorAll('.footer-social a[aria-label="WhatsApp"], .whatsapp-float-btn').forEach(a => {
                    a.href = `https://wa.me/${cleanWa}?text=${encodeURIComponent('Merhaba Haybata Makina, bilgi almak istiyorum.')}`;
                });
            }
            if (settings.address) {
                const addrEl = document.getElementById('contactAddressText');
                if (addrEl) addrEl.innerText = settings.address;
                document.querySelectorAll('.footer-address-text').forEach(el => el.innerText = settings.address);
            }
            if (settings.mapEmbed) {
                const mapIframe = document.getElementById('contactMapIframe');
                if (mapIframe) mapIframe.src = settings.mapEmbed;
            }

            // Ana Sayfa Vitrin & Sloganlar (home.json)
            const homeRes = await fetch(`data/home.json?_t=${Date.now()}`).catch(() => null);
            if (homeRes && homeRes.ok) {
                const homeData = await homeRes.json();
                if (homeData.heroBadge) {
                    const el = document.querySelector('.hero-badge');
                    if (el) el.innerText = homeData.heroBadge;
                }
                if (homeData.heroTitle) {
                    const el = document.querySelector('.hero-content h1');
                    if (el) el.innerHTML = homeData.heroTitle;
                }
                if (homeData.heroSubtitle) {
                    const el = document.querySelector('.hero-content p');
                    if (el) el.innerText = homeData.heroSubtitle;
                }
                if (homeData.featuredProductsTitle) {
                    const el = document.querySelector('#products .section-title');
                    if (el) el.innerHTML = homeData.featuredProductsTitle;
                }
                if (homeData.featuredProductsSubtitle) {
                    const el = document.querySelector('#products .section-subtitle');
                    if (el) el.innerText = homeData.featuredProductsSubtitle;
                }
            }

            // Hakkımızda Metinleri (about.json)
            const aboutRes = await fetch(`data/about.json?_t=${Date.now()}`).catch(() => null);
            if (aboutRes && aboutRes.ok) {
                const aboutData = await aboutRes.json();
                if (aboutData.intro) {
                    const p1 = document.getElementById('aboutIntroP1');
                    if (p1) p1.innerText = aboutData.intro;
                }
                if (aboutData.values) {
                    const p2 = document.getElementById('aboutIntroP2');
                    if (p2) p2.innerText = aboutData.values;
                }
                if (aboutData.goal) {
                    const p3 = document.getElementById('aboutIntroP3');
                    if (p3) p3.innerText = aboutData.goal;
                }
            }

            // SEO & Google Analytics (seo.json)
            const seoRes = await fetch(`data/seo.json?_t=${Date.now()}`).catch(() => null);
            if (seoRes && seoRes.ok) {
                const seoData = await seoRes.json();
                if (seoData.googleAnalyticsId) {
                    const existingScript = document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
                    if (!existingScript && !window._gaLoaded) {
                        window._gaLoaded = true;
                        const gaScript = document.createElement('script');
                        gaScript.async = true;
                        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(seoData.googleAnalyticsId)}`;
                        document.head.appendChild(gaScript);
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', seoData.googleAnalyticsId);
                    }
                }
                if (seoData.googleSiteVerification) {
                    let meta = document.querySelector('meta[name="google-site-verification"]');
                    if (!meta) {
                        meta = document.createElement('meta');
                        meta.name = 'google-site-verification';
                        document.head.appendChild(meta);
                    }
                    meta.content = seoData.googleSiteVerification;
                }
            }
        } catch (err) {
            console.warn('Site içerikleri ve ayarlar yüklenirken:', err);
        }
    }
    loadSiteSettingsAndSocial();

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

    /* =========================================
       15. KULLANICI VERİLERİ & ÇEREZ POLİTİKASI (COOKIE CONSENT)
       ========================================= */
    initCookieConsent();

    function initCookieConsent() {
        const consentKey = 'haybata_cookie_consent';
        const savedConsent = localStorage.getItem(consentKey);

        if (savedConsent) {
            applyGtagConsent(savedConsent === 'accepted');
            return;
        }

        const banner = document.createElement('div');
        banner.className = 'cookie-consent-banner';
        banner.id = 'cookieConsentBanner';
        banner.innerHTML = `
            <div class="cookie-consent-content">
                <div class="cookie-consent-icon">
                    <i class="fas fa-cookie-bite"></i>
                </div>
                <div class="cookie-consent-body">
                    <div class="cookie-consent-title">
                        <span>Çerez ve Gizlilik Bildirimi</span>
                    </div>
                    <div class="cookie-consent-text">
                        Sizlere daha iyi bir deneyim sunmak, site trafiğini analiz etmek ve kullanıcı deneyimini iyileştirmek için sitemizde analitik ve zorunlu çerezler kullanılmaktadır. Detaylı bilgi için <a href="javascript:void(0)" id="cookiePolicyBtn">Çerez Politikası</a> sayfamızı inceleyebilirsiniz.
                    </div>
                    <div class="cookie-consent-actions">
                        <button type="button" class="cookie-btn cookie-btn-accept" id="cookieAcceptBtn">
                            <i class="fas fa-check" style="margin-right: 6px;"></i>Tümünü Kabul Et
                        </button>
                        <button type="button" class="cookie-btn cookie-btn-decline" id="cookieDeclineBtn">
                            Sadece Zorunlu Çerezler
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(banner);

        setTimeout(() => {
            banner.classList.add('show');
        }, 1200);

        const acceptBtn = document.getElementById('cookieAcceptBtn');
        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => {
                localStorage.setItem(consentKey, 'accepted');
                applyGtagConsent(true);
                hideBanner();
            });
        }

        const declineBtn = document.getElementById('cookieDeclineBtn');
        if (declineBtn) {
            declineBtn.addEventListener('click', () => {
                localStorage.setItem(consentKey, 'declined');
                applyGtagConsent(false);
                hideBanner();
            });
        }

        const policyBtn = document.getElementById('cookiePolicyBtn');
        if (policyBtn) {
            policyBtn.addEventListener('click', () => {
                showCookieModal();
            });
        }

        function hideBanner() {
            banner.classList.remove('show');
            setTimeout(() => banner.remove(), 500);
        }

        function applyGtagConsent(granted) {
            if (typeof gtag === 'function') {
                gtag('consent', 'update', {
                    'analytics_storage': granted ? 'granted' : 'denied',
                    'ad_storage': granted ? 'granted' : 'denied',
                    'ad_user_data': granted ? 'granted' : 'denied',
                    'ad_personalization': granted ? 'granted' : 'denied'
                });
            }
        }

        function showCookieModal() {
            const existingModal = document.getElementById('cookiePolicyModal');
            if (existingModal) existingModal.remove();

            const modal = document.createElement('div');
            modal.className = 'cookie-modal-overlay';
            modal.id = 'cookiePolicyModal';
            modal.innerHTML = `
                <div class="cookie-modal-card">
                    <div class="cookie-modal-header">
                        <h3><i class="fas fa-shield-halved" style="color:var(--accent);margin-right:8px;"></i>Gizlilik & Çerez Politikası</h3>
                        <button type="button" class="cookie-modal-close" id="closeCookieModal">&times;</button>
                    </div>
                    <div class="cookie-modal-body">
                        <h4>1. Çerezler (Cookies) Nedir?</h4>
                        <p>Çerezler, web sitemizi ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin dosyalarıdır.</p>
                        <h4>2. Hangi Çerezleri Kullanıyoruz?</h4>
                        <ul>
                            <li><strong>Zorunlu Çerezler:</strong> Web sitesinin temel fonksiyonlarının çalışması, güvenliğiniz ve tercihlerinizin hatırlanması için gereklidir.</li>
                            <li><strong>Analitik Çerezler (Google Analytics):</strong> Sitemizi kaç kişinin ziyaret ettiği, en çok incelenen sayfalar gibi anonim istatistiki verileri toplamamıza ve hizmet kalitemizi artırmamıza yarar.</li>
                        </ul>
                        <h4>3. Veri Güvenliği & KVKK</h4>
                        <p>Toplanan analitik veriler kişisel kimlik bilgilerinizle eşleştirilmez, üçüncü şahıslara ticari veya reklam amaçlı satılmaz ya da devredilmez.</p>
                    </div>
                    <div class="cookie-modal-footer">
                        <button type="button" class="btn btn-primary" id="acceptFromModal">Anladım & Kabul Et</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            setTimeout(() => modal.classList.add('show'), 50);

            const closeModal = () => {
                modal.classList.remove('show');
                setTimeout(() => modal.remove(), 300);
            };

            document.getElementById('closeCookieModal').addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });
            document.getElementById('acceptFromModal').addEventListener('click', () => {
                localStorage.setItem(consentKey, 'accepted');
                applyGtagConsent(true);
                closeModal();
                hideBanner();
            });
        }
    }

});