const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const dataDir = path.join(rootDir, 'data');
const catalogDir = path.join(dataDir, 'products_catalog');
const catDir = path.join(dataDir, 'categories');

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
