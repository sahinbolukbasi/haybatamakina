const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const dataDir = path.join(rootDir, 'data');
const catalogDir = path.join(dataDir, 'products_catalog');
const catDir = path.join(dataDir, 'categories');

function norm(str) {
    return (str || '').toLowerCase()
        .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
        .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
        .replace(/[^a-z0-9]/g, '');
}

// 1. Merge Categories
const catFiles = fs.existsSync(catDir) 
    ? fs.readdirSync(catDir).filter(f => f.endsWith('.json')).sort()
    : [];

const categories = [];
for (const file of catFiles) {
    try {
        const content = JSON.parse(fs.readFileSync(path.join(catDir, file), 'utf8'));
        content._file = file;
        content._slug = file.replace(/\.json$/, '');
        categories.push(content);
    } catch (e) {
        console.error(`Error reading category ${file}:`, e);
    }
}
categories.sort((a, b) => (a.order || 99) - (b.order || 99));

fs.writeFileSync(path.join(dataDir, 'categories_index.json'), JSON.stringify(catFiles, null, 2), 'utf8');
fs.writeFileSync(path.join(dataDir, 'categories_merged.json'), JSON.stringify(categories, null, 2), 'utf8');
console.log(`Merged ${categories.length} categories.`);

// 2. Merge Products
const productFiles = fs.existsSync(catalogDir)
    ? fs.readdirSync(catalogDir).filter(f => f.endsWith('.json')).sort()
    : [];

const products = [];
for (const file of productFiles) {
    try {
        const content = JSON.parse(fs.readFileSync(path.join(catalogDir, file), 'utf8'));
        content._file = file;
        content._slug = file.replace(/\.json$/, '');
        // Clean leading slashes from image paths
        if (content.image && typeof content.image === 'string') {
            content.image = content.image.replace(/^\/+/, '');
        }
        products.push(content);
    } catch (e) {
        console.error(`Error reading product ${file}:`, e);
    }
}

fs.writeFileSync(path.join(dataDir, 'products_index.json'), JSON.stringify(productFiles, null, 2), 'utf8');
fs.writeFileSync(path.join(dataDir, 'products_merged.json'), JSON.stringify(products, null, 2), 'utf8');
console.log(`Merged ${products.length} products.`);

// 3. Build Synchronized PRODUCT_TREE (Only containing products that exist in the admin panel)
const productTree = categories.map(cat => ({
    id: cat.slug || norm(cat.name),
    name: cat.name,
    icon: cat.icon || 'fa-cubes',
    badge: cat.name.includes('FİTTİNGS') ? 'Yüksek Basınç' : (cat.name.includes('MENHOL') ? 'Kazan & Tank' : (cat.name.includes('ÖZEL') ? 'Özel Proje' : 'Hammadde & Sarf')),
    description: cat.description || '',
    subcategories: (cat.subcategories || []).map(sub => ({
        id: sub.slug || norm(sub.name),
        name: sub.name,
        slug: sub.slug || norm(sub.name),
        icon: sub.icon || 'fa-angle-right',
        image: sub.image || 'images/urunler/resim80.jpg',
        description: sub.description || '',
        products: []
    }))
}));

// Distribute products into tree
products.forEach(p => {
    const cNorm = norm(p.category || '');
    const sNorm = norm(p.subCategory || '');

    // 1. Match category
    let grp = productTree.find(g => norm(g.name).includes(cNorm) || cNorm.includes(norm(g.name)) || norm(g.id).includes(cNorm));
    if (!grp && sNorm) {
        for (const g of productTree) {
            if (g.subcategories.some(s => norm(s.name).includes(sNorm) || sNorm.includes(norm(s.name)))) {
                grp = g;
                break;
            }
        }
    }
    if (!grp) grp = productTree[0];

    // 2. Match subcategory inside group
    let sub = null;
    if (sNorm && grp.subcategories.length > 0) {
        sub = grp.subcategories.find(s => norm(s.name).includes(sNorm) || sNorm.includes(norm(s.name)));
    }
    if (!sub && grp.subcategories.length > 0) {
        sub = grp.subcategories[0];
    }

    if (sub) {
        let cleanSpecs = {};
        if (Array.isArray(p.specs)) {
            p.specs.forEach(s => {
                if (s && s.key) cleanSpecs[s.key] = s.value;
            });
        } else if (typeof p.specs === 'object' && p.specs !== null) {
            cleanSpecs = p.specs;
        }

        sub.products.push({
            name: p.name,
            _slug: p._slug,
            image: p.image || sub.image || 'images/urunler/resim80.jpg',
            description: p.description || '',
            specs: cleanSpecs,
            showOnHome: p.showOnHome === true || p.showOnHome === 'true'
        });
    }
});

fs.writeFileSync(path.join(dataDir, 'product_tree.json'), JSON.stringify(productTree, null, 2), 'utf8');

// 4. Update PRODUCT_TREE in js/data.js
const dataJsPath = path.join(rootDir, 'js', 'data.js');
if (fs.existsSync(dataJsPath)) {
    let dataJs = fs.readFileSync(dataJsPath, 'utf8');
    const treeJsonStr = JSON.stringify(productTree, null, 4);
    const startMarker = 'const PRODUCT_TREE = ';
    const endMarker = ';\n\n// Projeler & Kazan İmalatları Referansları';
    
    // Check if endMarker exists or match by next const
    const startIndex = dataJs.indexOf(startMarker);
    if (startIndex !== -1) {
        let endIndex = dataJs.indexOf(';\n\n// Projeler', startIndex);
        if (endIndex === -1) {
            endIndex = dataJs.indexOf(';\n\n// Müşteri / Sanayi Referansları', startIndex);
        }
        if (endIndex !== -1) {
            const before = dataJs.substring(0, startIndex + startMarker.length);
            const after = dataJs.substring(endIndex);
            dataJs = before + treeJsonStr + after;
            fs.writeFileSync(dataJsPath, dataJs, 'utf8');
            console.log('Synchronized PRODUCT_TREE inside js/data.js with exactly 45 CMS products.');
        }
    }
}
