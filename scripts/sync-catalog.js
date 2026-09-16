const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const catDir = path.join(rootDir, 'data', 'products_catalog');
const files = fs.readdirSync(catDir).filter(f => f.endsWith('.json'));

function classify(d) {
    const name = (d.name || '').toLowerCase();
    const rawSub = (d.subCategory || '').toLowerCase();

    // 1. Menhol
    if (name.includes('menhol') || rawSub.includes('menhol')) {
        return { cat: 'PASLANMAZ MENHOL KAPAĞI', sub: 'Kazan & Tank Menhol Kapakları' };
    }

    // 2. Özel İmalatlar (Tank, Reaktör, CIP, Havalandırma, Kürek, El Arabası vb.)
    if (name.includes('reaktör') || name.includes('tank') || name.includes('cip') || name.includes('havalandırma') || name.includes('aeratör') || name.includes('özel proje') || name.includes('kürek') || name.includes('el arabası') || rawSub.includes('karıştırıcı') || rawSub.includes('tank')) {
        let sub = 'Özel İmalat Proses Ekipmanları';
        if (name.includes('cip') || name.includes('havalandırma') || name.includes('aeratör')) {
            sub = 'Tank Havalandırma & CIP Yıkama Başlıkları';
        }
        return { cat: 'PASLANMAZ ÖZEL İMALATLAR', sub: sub };
    }

    // 3. Sarf Malzemeler & Hammadde (Civata, Kaynak Sarfları, Sac, Profil, Mil, Dikişsiz Boru)
    if (name.includes('civata') || name.includes('somun') || name.includes('saplama') || name.includes('gijon') || name.includes('pul')) {
        return { cat: 'PASLANMAZ SARF MALZEMELER', sub: 'Paslanmaz Bağlantı Elemanları & Civatalar' };
    }
    if (name.includes('kaynak tel') || name.includes('taşlama') || name.includes('kesme disk') || name.includes('jel') || name.includes('pasivasyon')) {
        return { cat: 'PASLANMAZ SARF MALZEMELER', sub: 'Kaynak & Yüzey İşlem Sarfları' };
    }
    if (name.includes('sac') || name.includes('profil') || name.includes('mil') || name.includes('köşebent') || name.includes('dikişli & dikişsiz boru')) {
        return { cat: 'PASLANMAZ SARF MALZEMELER', sub: 'Paslanmaz Çelik Hammaddeler' };
    }

    // 4. Paslanmaz Fittings
    let cat = 'PASLANMAZ FİTTİNGS';
    let sub = 'Kaynaklı Fittings Grubu';

    if (name.includes('kelepçe') || name.includes('u-bolt')) {
        sub = 'Kelepçe & Bağlantı Elemanları';
    } else if (name.includes('vana') || name.includes('valf') || name.includes('ventil') || name.includes('regülatör') || name.includes('aktüatör')) {
        sub = 'Paslanmaz Vana & Akış Ekipmanları';
    } else if (name.includes('flanş')) {
        sub = 'Endüstriyel Flanşlar';
    } else if (name.includes('dişli') || name.includes('nipel') || name.includes('manşon') || name.includes('kruva') || name.includes('pislik tutucu') || name.includes('hortum ucu') || name.includes('konik / düz contalı')) {
        sub = 'Dişli Fittings Grubu';
    } else {
        sub = 'Kaynaklı Fittings Grubu';
    }

    return { cat, sub };
}

let updated = 0;
files.forEach(f => {
    const filePath = path.join(catDir, f);
    const d = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const { cat, sub } = classify(d);

    // If category or subCategory was empty or legacy, update it
    d.category = cat;
    d.subCategory = sub;
    delete d.categoryGroup;

    // Clean image path
    if (d.image && typeof d.image === 'string') {
        d.image = d.image.replace(/^\/+/, '');
    }

    fs.writeFileSync(filePath, JSON.stringify(d, null, 2) + '\n', 'utf8');
    updated++;
});

console.log(`Successfully classified and updated ${updated} products in data/products_catalog.`);
