const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const catalogDir = path.join(rootDir, 'data', 'products_catalog');
const subDir = path.join(rootDir, 'data', 'subcategories');

// Read all subcategories from data/subcategories folder
const subFiles = fs.existsSync(subDir)
    ? fs.readdirSync(subDir).filter(f => f.endsWith('.json')).sort()
    : [];
const subcategories = subFiles.map(f => {
    try {
        return JSON.parse(fs.readFileSync(path.join(subDir, f), 'utf8'));
    } catch { return null; }
}).filter(Boolean);

const files = fs.readdirSync(catalogDir).filter(f => f.endsWith('.json'));

function norm(str) {
    return (str || '').toLowerCase()
        .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
        .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
        .replace(/[^a-z0-9]/g, '');
}

function findSubcategoryByName(productName, productSubCategory) {
    const name = norm(productName);
    const rawSub = norm(productSubCategory || '');

    // Try to match by existing subCategory field first
    if (rawSub) {
        const match = subcategories.find(s => norm(s.name).includes(rawSub) || rawSub.includes(norm(s.name)));
        if (match) return match;
    }

    // Try to match by product name keywords
    for (const sub of subcategories) {
        const sName = norm(sub.name);

        // Menhol
        if (sName.includes('menhol') && (name.includes('menhol') || rawSub.includes('menhol'))) return sub;

        // Özel imalat
        if (sName.includes('ozel imalat') && (name.includes('reaktor') || name.includes('tank') || name.includes('kurek') || name.includes('el arabasi'))) return sub;
        if (sName.includes('havalandirma') && (name.includes('cip') || name.includes('havalandirma') || name.includes('aerator'))) return sub;

        // Sarf
        if (sName.includes('civata') && (name.includes('civata') || name.includes('somun') || name.includes('saplama') || name.includes('pul'))) return sub;
        if (sName.includes('kaynak') && (name.includes('kaynak tel') || name.includes('taslama') || name.includes('kesme disk') || name.includes('pasivasyon'))) return sub;
        if (sName.includes('hammadde') && (name.includes('sac') || name.includes('profil') || name.includes('mil') || name.includes('kosebent') || name.includes('dikissiz boru'))) return sub;

        // Fittings
        if (sName.includes('kelepce') && (name.includes('kelepce') || name.includes('u-bolt'))) return sub;
        if (sName.includes('vana') && (name.includes('vana') || name.includes('valf') || name.includes('ventil') || name.includes('regulator') || name.includes('aktuator'))) return sub;
        if (sName.includes('flans') && name.includes('flans')) return sub;
        if (sName.includes('disli') && (name.includes('disli') || name.includes('nipel') || name.includes('manson') || name.includes('kruva') || name.includes('pislik') || name.includes('hortum ucu'))) return sub;
    }

    // Default: return first subcategory of the matched parent category
    return subcategories[0] || null;
}

function findCategoryBySubcategory(sub) {
    if (!sub) return 'PASLANMAZ FİTTİNGS';
    return sub.parentCategory || 'PASLANMAZ FİTTİNGS';
}

let updated = 0;
files.forEach(f => {
    const filePath = path.join(catalogDir, f);
    const d = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    const matchedSub = findSubcategoryByName(d.name, d.subCategory);
    const matchedCat = findCategoryBySubcategory(matchedSub);

    // Update category and subCategory based on current subcategories data
    d.category = matchedCat;
    d.subCategory = matchedSub ? matchedSub.name : d.subCategory;
    delete d.categoryGroup;

    // Clean image path
    if (d.image && typeof d.image === 'string') {
        d.image = d.image.replace(/^\/+/, '');
    }

    fs.writeFileSync(filePath, JSON.stringify(d, null, 2) + '\n', 'utf8');
    updated++;
});

console.log(`Successfully synchronized ${updated} products with ${subcategories.length} subcategories from data/subcategories.`);
