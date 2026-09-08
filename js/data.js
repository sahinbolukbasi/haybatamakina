/**
 * HAYBATA MAKİNA - Veri Dosyası
 * Orijinal siteden (haybatamakina.com) derlenen gerçek ürün, iletişim ve duyuru verileri
 * Tüm ürün resimleri local'e indirilmiştir (images/urunler/)
 */

const NAV_LINKS = [
    { label: 'Ana Sayfa', url: 'index.html' },
    { label: 'Hakkımızda', url: 'hakkimizda.html' },
    { label: 'Ürünler', url: 'urunler.html' },
    { label: 'Duyurular', url: 'duyurular.html' },
    { label: 'İnsan Kaynakları', url: 'is-basvurusu.html' },
    { label: 'İletişim', url: 'iletisim.html' },
];

// Kategori görselleri - local path
const CATEGORY_IMAGES = {
    'Paslanmaz Kelepçe Grubu': 'images/urunler/resim53.jpg',
    'Paslanmaz Vana Grubu': 'images/urunler/resim60.jpg',
    'Paslanmaz Menhol Grubu': 'images/urunler/resim66.jpg',
    'Paslanmaz Özel Ürünler': 'images/urunler/resim64.jpg',
    'Paslanmaz Flanş Grubu': 'images/urunler/resim72.jpg',
    'Plastik Yıkama Topu Grubu': 'images/urunler/resim77.jpg',
    'Paslanmaz Malzemeler': 'images/urunler/resim80.jpg',
    'Paslanmaz Kaynaklı Fittings Grubu': 'images/urunler/resim87.jpg',
    'Paslanmaz Dişli Fittings Grubu': 'images/urunler/resim108.jpg',
    'Paslanmaz Tank Havalandırma Başlığı': 'images/urunler/resim112.jpg',
    'Paslanmaz Basınç Düşürücü': 'images/urunler/resim115.jpg',
    'Paslanmaz Civatalar': 'images/urunler/resim116.jpg',
};

const PRODUCT_CATEGORIES = [
    {
        id: 'kelepce',
        name: 'Paslanmaz Kelepçe Grubu',
        slug: 'paslanmaz-kelepce-grubu',
        icon: 'fa-link',
        image: CATEGORY_IMAGES['Paslanmaz Kelepçe Grubu'],
        description: 'Boru ve hortum bağlantılarında sızdırmazlık ve sabitleme sağlayan, çeşitli ölçülerde paslanmaz çelik kelepçeler.',
        products: [
            { name: 'Düz Boru Kelepçesi', image: 'images/urunler/resim53.jpg', description: 'Boru hatlarının sabitlenmesi için standart düz boru kelepçesi.', specs: { 'Malzeme': 'AISI 304 / 316', 'Tip': 'Düz' } },
            { name: 'Saplı Boru Kelepçesi', image: 'images/urunler/resim54.jpg', description: 'Saplı yapısı ile kolay montaj imkanı sunan boru kelepçesi.', specs: { 'Malzeme': 'AISI 304', 'Tip': 'Saplı' } },
            { name: 'Somonlu Lastik Boru Kelepçesi', image: 'images/urunler/resim56.jpg', description: 'Somon ve lastik contalı, titreşim sönümleyici boru kelepçesi.', specs: { 'Malzeme': 'AISI 304 + Lastik', 'Tip': 'Somonlu' } },
            { name: 'Hortum Kelepçesi', image: 'images/urunler/resim57.jpg', description: 'Hortum bağlantıları için sıkma tip hortum kelepçesi.', specs: { 'Malzeme': 'AISI 304', 'Tip': 'Sıkmalı' } },
            { name: 'Trifonlu Kelepçe', image: 'images/urunler/resim58.jpg', description: 'Üç yönlü sabitleme sağlayan trifonlu boru kelepçesi.', specs: { 'Malzeme': 'AISI 304', 'Tip': 'Trifonlu' } },
            { name: 'U Bolt Kelepçe', image: 'images/urunler/resim59.jpg', description: 'U şeklindeki gövdesi ile boru sabitlemede kullanılan kelepçe.', specs: { 'Malzeme': 'AISI 304 / 316', 'Tip': 'U Bolt' } }
        ]
    },
    {
        id: 'vana',
        name: 'Paslanmaz Vana Grubu',
        slug: 'paslanmaz-vana-grubu',
        icon: 'fa-tachometer-alt',
        image: CATEGORY_IMAGES['Paslanmaz Vana Grubu'],
        description: 'Akış kontrolü sağlayan, hijyenik ve endüstriyel paslanmaz çelik vanalar.',
        products: [
            { name: 'Dişli Küresel Vana', image: 'images/urunler/resim60.jpg', description: 'Dişli bağlantılı, tam geçişli paslanmaz küresel vana.', specs: { 'Malzeme': 'AISI 304 / 316', 'Bağlantı': 'Dişli' } },
            { name: 'Kelebek Vana', image: 'images/urunler/resim61.jpg', description: 'Geniş çaplı hatlarda akış kontrolü sağlayan kelebek vana.', specs: { 'Malzeme': 'AISI 304', 'Çap': 'DN50 - DN300' } },
            { name: 'Flanşlı Vana', image: 'images/urunler/resim62.jpg', description: 'Flanşlı bağlantı ile monte edilen endüstriyel vana.', specs: { 'Malzeme': 'AISI 316', 'Bağlantı': 'Flanşlı' } },
            { name: 'Üç Yollu Vana', image: 'images/urunler/resim63.jpg', description: 'Üç yönlü akış yönlendirme sağlayan vana.', specs: { 'Malzeme': 'AISI 304', 'Yön': '3 Yollu' } }
        ]
    },
    {
        id: 'menhol',
        name: 'Paslanmaz Menhol Grubu',
        slug: 'paslanmaz-menhol-grubu',
        icon: 'fa-recycle',
        image: CATEGORY_IMAGES['Paslanmaz Menhol Grubu'],
        description: 'Tank ve ekipmanlara erişim sağlayan hijyenik paslanmaz çelik menholler.',
        products: [
            { name: 'Yuvarlak Menhol', image: 'images/urunler/resim66.jpg', description: 'Tank erişim kapakları için standart yuvarlak menhol.', specs: { 'Malzeme': 'AISI 304 / 316', 'Şekil': 'Yuvarlak' } },
            { name: 'Oval Menhol (içe - dışa açılır)', image: 'images/urunler/resim67.jpg', description: 'İçe-dışa açılır mekanizmaya sahip oval menhol.', specs: { 'Malzeme': 'AISI 304', 'Şekil': 'Oval' } },
            { name: 'Kare Menhol', image: 'images/urunler/resim68.jpg', description: 'Kare formda tank erişim menholü.', specs: { 'Malzeme': 'AISI 304', 'Şekil': 'Kare' } },
            { name: 'Basınca Dayanıklı (6 vidalı) Menhol', image: 'images/urunler/resim69.jpg', description: '6 vidalı bağlantısı ile yüksek basınç dayanımı sunan menhol.', specs: { 'Malzeme': 'AISI 316L', 'Vida': '6 Vidalı' } },
            { name: 'Gözetleme Camlı Menhol', image: 'images/urunler/resim70.jpg', description: 'Gözetleme camı ile tank içi görüntüleme imkanı sunan menhol.', specs: { 'Malzeme': 'AISI 304 + Cam', 'Özellik': 'Gözetleme Camlı' } },
            { name: 'Çift Kollu Yuvarlak Menhol', image: 'images/urunler/resim71.jpg', description: 'Çift kollu kilit mekanizmalı yuvarlak menhol.', specs: { 'Malzeme': 'AISI 304', 'Kilit': 'Çift Kollu' } },
            { name: 'Basınçlı Menhol', image: 'images/urunler/resim113.jpg', description: 'Basınçlı tanklarda kullanılan özel menhol.', specs: { 'Malzeme': 'AISI 316', 'Basınç': 'Yüksek' } },
            { name: 'Gözetleme Camlı Menhol', image: 'images/urunler/resim114.jpg', description: 'Basınçlı sistemler için gözetleme camlı menhol.', specs: { 'Malzeme': 'AISI 316 + Cam', 'Özellik': 'Gözetleme Camlı' } }
        ]
    },
    {
        id: 'ozel',
        name: 'Paslanmaz Özel Ürünler',
        slug: 'paslanmaz-ozel-urunler',
        icon: 'fa-cogs',
        image: CATEGORY_IMAGES['Paslanmaz Özel Ürünler'],
        description: 'Müşteri taleplerine özel imal edilen paslanmaz çelik ürünler.',
        products: [
            { name: 'Paslanmaz Uzun Saplı Kürek', image: 'images/urunler/resim64.jpg', description: 'Endüstriyel kullanım için paslanmaz uzun saplı kürek.', specs: { 'Malzeme': 'AISI 304', 'Tip': 'Uzun Saplı' } },
            { name: 'Paslanmaz El Arabası', image: 'images/urunler/resim65.jpg', description: 'Gıda ve kimya sektörü için paslanmaz el arabası.', specs: { 'Malzeme': 'AISI 304', 'Tip': 'El Arabası' } }
        ]
    },
    {
        id: 'flans',
        name: 'Paslanmaz Flanş Grubu',
        slug: 'paslanmaz-flans-grubu',
        icon: 'fa-circle',
        image: CATEGORY_IMAGES['Paslanmaz Flanş Grubu'],
        description: 'Boru bağlantılarında kullanılan standart ve özel paslanmaz çelik flanşlar.',
        products: [
            { name: 'Conta Basma Yüzeyli Flanş', image: 'images/urunler/resim72.jpg', description: 'Conta yerleştirme yüzeyine sahip flanş.', specs: { 'Malzeme': 'AISI 304 / 316', 'Yüzey': 'Conta Basmalı' } },
            { name: 'Düz Flanş', image: 'images/urunler/resim73.jpg', description: 'Standart düz yüzeyli bağlantı flanşı.', specs: { 'Malzeme': 'AISI 304', 'Tip': 'Düz' } },
            { name: 'Kör Flanş', image: 'images/urunler/resim74.jpg', description: 'Hat kapatma işlemleri için kör flanş.', specs: { 'Malzeme': 'AISI 304', 'Çap': 'DN15 - DN600' } },
            { name: 'Boyunlu Flanş', image: 'images/urunler/resim75.jpg', description: 'Kaynak boyunlu, yüksek basınç uygulamaları için flanş.', specs: { 'Malzeme': 'AISI 316', 'Tip': 'Boyunlu' } },
            { name: 'Baskılı Flanş', image: 'images/urunler/resim76.jpg', description: 'Baskı yüzeyli özel bağlantı flanşı.', specs: { 'Malzeme': 'AISI 304', 'Tip': 'Baskılı' } }
        ]
    },
    {
        id: 'yikama-topu',
        name: 'Plastik Yıkama Topu Grubu',
        slug: 'plastik-yikama-topu-grubu',
        icon: 'fa-water',
        image: CATEGORY_IMAGES['Plastik Yıkama Topu Grubu'],
        description: 'Tank içi temizlik sistemleri için plastik yıkama topları.',
        products: [
            { name: 'Döner Yıkama Topu', image: 'images/urunler/resim77.jpg', description: 'Döner mekanizma ile tank içi tam temizlik sağlar.', specs: { 'Malzeme': 'PP / PTFE', 'Tip': 'Döner' } },
            { name: 'Sabit Tank Yıkama (Teflon) Başlığı', image: 'images/urunler/resim78.jpg', description: 'Teflon kaplamalı sabit tank yıkama başlığı.', specs: { 'Malzeme': 'PTFE (Teflon)', 'Tip': 'Sabit' } },
            { name: 'Sabit Tank Yıkama Başlığı', image: 'images/urunler/resim79.jpg', description: 'Sabit pozisyonda tank içi temizlik sağlayan başlık.', specs: { 'Malzeme': 'PP', 'Tip': 'Sabit' } }
        ]
    },
    {
        id: 'malzemeler',
        name: 'Paslanmaz Malzemeler',
        slug: 'paslanmaz-malzemeler',
        icon: 'fa-boxes',
        image: CATEGORY_IMAGES['Paslanmaz Malzemeler'],
        description: 'Endüstriyel üretimde kullanılan paslanmaz çelik boru, profil, sac ve bağlantı elemanları.',
        products: [
            { name: 'Altıköşe', image: 'images/urunler/resim80.jpg', description: 'Altıgen kesitli paslanmaz çelik çubuk.', specs: { 'Malzeme': 'AISI 304 / 316', 'Kesit': 'Altıköşe' } },
            { name: 'Boru', image: 'images/urunler/resim81.jpg', description: 'Çeşitli çaplarda paslanmaz çelik borular.', specs: { 'Malzeme': 'AISI 304 / 316', 'Çap': 'DN15 - DN300' } },
            { name: 'Köşebent', image: 'images/urunler/resim82.jpg', description: 'L profili paslanmaz çelik köşebentler.', specs: { 'Malzeme': 'AISI 304', 'Profil': 'L' } },
            { name: 'Çubuk Mil', image: 'images/urunler/resim83.jpg', description: 'Silindirik paslanmaz çelik çubuklar.', specs: { 'Malzeme': 'AISI 304', 'Kesit': 'Yuvarlak' } },
            { name: 'Profil', image: 'images/urunler/resim84.jpg', description: 'Çeşitli profil kesitlerinde paslanmaz çelik malzemeler.', specs: { 'Malzeme': 'AISI 304', 'Tip': 'Çeşitli' } },
            { name: 'Saç', image: 'images/urunler/resim85.jpg', description: 'Kesim ve CNC işleme için paslanmaz saclar.', specs: { 'Malzeme': 'AISI 304', 'Kalınlık': '0.5 - 30mm' } },
            { name: 'Lama', image: 'images/urunler/resim86.jpg', description: 'Dikdörtgen kesitli paslanmaz çelik lamalar.', specs: { 'Malzeme': 'AISI 304', 'Kesit': 'Lama' } }
        ]
    },
    {
        id: 'kaynakli-fittings',
        name: 'Paslanmaz Kaynaklı Fittings Grubu',
        slug: 'paslanmaz-kaynakli-fittings-grubu',
        icon: 'fa-wrench',
        image: CATEGORY_IMAGES['Paslanmaz Kaynaklı Fittings Grubu'],
        description: 'Kaynaklı bağlantı sistemlerinde kullanılan paslanmaz çelik fittings.',
        products: [
            { name: 'Dirsek', image: 'images/urunler/resim87.jpg', description: '90° ve 45° kaynaklı dirsek bağlantı parçaları.', specs: { 'Malzeme': 'AISI 304 / 316', 'Açı': '90° / 45°' } },
            { name: 'Tee', image: 'images/urunler/resim88.jpg', description: 'Üç yönlü kaynaklı bağlantı parçası.', specs: { 'Malzeme': 'AISI 304', 'Tip': 'Kaynaklı' } },
            { name: 'Redüksiyon', image: 'images/urunler/resim89.jpg', description: 'Farklı çaplardaki boruları birleştiren redüksiyon.', specs: { 'Malzeme': 'AISI 304', 'Tip': 'Eksantrik / Konik' } },
            { name: 'Yaka', image: 'images/urunler/resim90.jpg', description: 'Boru uçlarında takviye sağlayan kaynaklı yaka.', specs: { 'Malzeme': 'AISI 304 / 316', 'Tip': 'Kaynaklı' } },
            { name: 'Kep (Bombe)', image: 'images/urunler/resim91.jpg', description: 'Boru uçlarını kapatan bombeli kep.', specs: { 'Malzeme': 'AISI 316', 'Tip': 'Bombeli' } },
            { name: 'Ayanahtarlı (Contalı) Kaynak Ağızlı Rekor', image: 'images/urunler/resim92.jpg', description: 'Contalı ve ayanahtarlı kaynak ağızlı rekor.', specs: { 'Malzeme': 'AISI 304 + Conta', 'Tip': 'Ayanahtarlı' } },
            { name: 'Kaynak Ağızlı Rekor', image: 'images/urunler/resim93.jpg', description: 'Kaynak ile bağlanan ağızlı rekor.', specs: { 'Malzeme': 'AISI 304', 'Tip': 'Kaynak Ağızlı' } }
        ]
    },
    {
        id: 'disli-fittings',
        name: 'Paslanmaz Dişli Fittings Grubu',
        slug: 'paslanmaz-disli-fittings-grubu',
        icon: 'fa-plug',
        image: CATEGORY_IMAGES['Paslanmaz Dişli Fittings Grubu'],
        description: 'Dişli bağlantı sistemlerinde kullanılan paslanmaz çelik fittings.',
        products: [
            { name: 'Pislik Tutucu', image: 'images/urunler/resim108.jpg', description: 'Hat içi pislik ve tortu tutan filtre düzeni.', specs: { 'Malzeme': 'AISI 316', 'Bağlantı': 'Dişli' } },
            { name: 'Çek Valf', image: 'images/urunler/resim94.jpg', description: 'Tek yönlü akış sağlayan çek valf.', specs: { 'Malzeme': 'AISI 304 / 316', 'Tip': 'Yaylı / Yaysız' } },
            { name: 'Çif Taraflı Nipel', image: 'images/urunler/resim95.jpg', description: 'Her iki ucu dişli çift taraflı nipel.', specs: { 'Malzeme': 'AISI 304', 'Diş': '1/2" - 2"' } },
            { name: 'Dış Dişli Körtapa', image: 'images/urunler/resim96.jpg', description: 'Dış dişli hat kapatma tapası.', specs: { 'Malzeme': 'AISI 304', 'Diş': 'Dış' } },
            { name: 'Dişli Dirsek', image: 'images/urunler/resim97.jpg', description: 'Dişli bağlantılı 90° dirsek.', specs: { 'Malzeme': 'AISI 304 / 316', 'Açı': '90°' } },
            { name: 'Dişli Redüksiyon', image: 'images/urunler/resim98.jpg', description: 'Dişli bağlantılı çapları küçülten redüksiyon.', specs: { 'Malzeme': 'AISI 304', 'Tip': 'Eksantrik' } },
            { name: 'Dişli Rekor', image: 'images/urunler/resim99.jpg', description: 'Sökülebilir dişli bağlantı rekoru.', specs: { 'Malzeme': 'AISI 304', 'Bağlantı': 'Dişli' } },
            { name: 'Dişli Tee', image: 'images/urunler/resim100.jpg', description: 'Üç yönlü dişli bağlantı parçası.', specs: { 'Malzeme': 'AISI 304', 'Tip': 'Dişli' } },
            { name: 'Emniyet Ventili', image: 'images/urunler/resim101.jpg', description: 'Sistem basıncını güvenli seviyede tutan emniyet ventili.', specs: { 'Malzeme': 'AISI 316', 'Tip': 'Emniyet' } },
            { name: 'Hex Nipel', image: 'images/urunler/resim102.jpg', description: 'Altıgen gövdeli dış dişli nipel.', specs: { 'Malzeme': 'AISI 304 / 316', 'Gövde': 'Hex' } },
            { name: 'Hortum Ucu', image: 'images/urunler/resim103.jpg', description: 'Hortum bağlantıları için dişli hortum ucu.', specs: { 'Malzeme': 'AISI 304', 'Tip': 'Hortum Ucu' } },
            { name: 'Kruva', image: 'images/urunler/resim105.jpg', description: 'Dört yönlü dişli bağlantı parçası.', specs: { 'Malzeme': 'AISI 304', 'Yön': '4 Yollu' } },
            { name: 'Kuyruklu Dirsek', image: 'images/urunler/resim106.jpg', description: 'Kuyruk kısmıyla hortum bağlantısına uygun dirsek.', specs: { 'Malzeme': 'AISI 304', 'Tip': 'Kuyruklu' } },
            { name: 'Manşon', image: 'images/urunler/resim107.jpg', description: 'İki boruyu dişli olarak birleştiren manşon.', specs: { 'Malzeme': 'AISI 304', 'Diş': 'İç' } },
            { name: 'İç Dişli Körtapa', image: 'images/urunler/resim104.jpg', description: 'İç dişli hat kapatma tapası.', specs: { 'Malzeme': 'AISI 304', 'Diş': 'İç' } },
            { name: 'Tek Taraflı Nipel', image: 'images/urunler/resim109.jpg', description: 'Tek ucu dişli bağlantı nipeli.', specs: { 'Malzeme': 'AISI 304', 'Diş': '1/2" - 2"' } },
            { name: 'Yaylı Çek Valf', image: 'images/urunler/resim110.jpg', description: 'Yay mekanizmalı tek yönlü akış valfi.', specs: { 'Malzeme': 'AISI 316', 'Tip': 'Yaylı' } }
        ]
    },
    {
        id: 'havalandirma',
        name: 'Paslanmaz Tank Havalandırma Başlığı',
        slug: 'paslanmaz-tank-havalandirma-basligi',
        icon: 'fa-fan',
        image: CATEGORY_IMAGES['Paslanmaz Tank Havalandırma Başlığı'],
        description: 'Tank içi basınç dengeleme ve havalandırma sistemleri için paslanmaz çelik başlıklar.',
        products: [
            { name: 'Tank Havalandırma Başlığı', image: 'images/urunler/resim112.jpg', description: 'Tank içi basıncı dengeleyen ve havalandırma sağlayan başlık.', specs: { 'Malzeme': 'AISI 304 / 316L', 'Bağlantı': 'Kelepçe / Kaynak' } }
        ]
    },
    {
        id: 'basinc-dusurucu',
        name: 'Paslanmaz Basınç Düşürücü',
        slug: 'paslanmaz-basinc-dusurucu',
        icon: 'fa-tachometer-alt',
        image: CATEGORY_IMAGES['Paslanmaz Basınç Düşürücü'],
        description: 'Hat basıncını kontrol altında tutan paslanmaz çelik basınç düşürücüler.',
        products: [
            { name: 'Basınç Düşürücü', image: 'images/urunler/resim115.jpg', description: 'Çıkış basıncını sabit tutan paslanmaz basınç düşürücü.', specs: { 'Malzeme': 'AISI 316', 'Giriş': '16 bar', 'Çıkış': '0-8 bar' } }
        ]
    },
    {
        id: 'civatalar',
        name: 'Paslanmaz Civatalar',
        slug: 'paslanmaz-civatalar',
        icon: 'fa-tools',
        image: CATEGORY_IMAGES['Paslanmaz Civatalar'],
        description: 'Çeşitli ebatlarda paslanmaz çelik civata ve bağlantı elemanları.',
        products: [
            { name: 'Civatalar', image: 'images/urunler/resim116.jpg', description: 'Çeşitli ebatlarda paslanmaz altı köşe civatalar.', specs: { 'Malzeme': 'AISI 304 / 316', 'Ebat': 'M6 - M30' } }
        ]
    }
];

const ANNOUNCEMENTS = [
    {
        id: 1,
        title: 'Ürünlerimizi İncelediniz mi?',
        date: '2013-10-23',
        category: 'Ürün',
        content: 'Ürünlerimizi incelemek için Ürünlerimiz sayfamızı ziyaret edebilirsiniz. Paslanmaz kelepçe, vana, menhol, flanş ve fittings gruplarındaki tüm ürünlerimiz hakkında detaylı bilgiye ulaşabilirsiniz. Tüm ürünlerimiz paslanmaz çelik malzemeden, yüksek kalite standartlarında üretilmektedir.'
    },
    {
        id: 2,
        title: 'Yeni Web Sitemiz Yayında!',
        date: '2013-10-23',
        category: 'Genel',
        content: '23/10/2013 tarihi itibariyle web sitemiz yayına girmiştir. İlginiz için teşekkürler. Firmamız 1994 yılından bu yana fittings imalatı ve paslanmaz çelik bağlantı parçaları satışı alanında hizmet vermektedir. Web sitemiz üzerinden tüm ürünlerimize ulaşabilir, iletişim bilgilerimizi görüntüleyebilirsiniz.'
    }
];

const JOB_LISTINGS = [
    {
        id: 1,
        title: 'CNC Operatörü',
        department: 'Üretim',
        type: 'Tam Zamanlı',
        location: 'İstanbul',
        description: 'CNC torna ve işleme merkezlerinde çalışacak, paslanmaz çelik işleme deneyimine sahip operatör arıyoruz.',
        requirements: ['En az 2 yıl CNC operatörlüğü deneyimi', 'Paslanmaz çelik işleme deneyimi tercih sebebi', 'Gantry ve takım tezgahı bilgisi', 'Teknik resim okuma becerisi']
    },
    {
        id: 2,
        title: 'Paslanmaz Kaynakçı',
        department: 'Üretim',
        type: 'Tam Zamanlı',
        location: 'İstanbul',
        description: 'Paslanmaz çelik kaynak işlemleri için deneyimli TIG kaynakçısı arıyoruz.',
        requirements: ['TIG kaynak deneyimi (paslanmaz çelik)', 'En az 3 yıl saha deneyimi', 'Kaynak sertifikası tercih sebebi', 'Ekip çalışmasına yatkın']
    },
    {
        id: 3,
        title: 'Satış Mühendisi',
        department: 'Satış',
        type: 'Tam Zamanlı',
        location: 'İstanbul',
        description: 'Endüstriyel ürün satış deneyimine sahip, paslanmaz çelik sektöründe çalışacak satış mühendisi arıyoruz.',
        requirements: ['Makine veya metalürji mühendisliği mezunu', 'Endüstriyel satış deneyimi', 'İyi derecede İngilizce', 'Seyahat engeli bulunmayan']
    },
    {
        id: 4,
        title: 'Kalite Kontrol Uzmanı',
        department: 'Kalite',
        type: 'Tam Zamanlı',
        location: 'İstanbul',
        description: 'Üretim süreçlerinin kalite kontrol ve dokümantasyonundan sorumlu uzman arıyoruz.',
        requirements: ['Kalite kontrol deneyimi (ISO 9001)', 'Ölçü aletleri kullanabilme', 'Teknik resim okuma', 'Raporlama becerisi']
    }
];

// Orijinal sitedeki gerçek iletişim bilgileri
const CONTACT_INFO = {
    address: 'İkitelli Organize Sanayi Bölgesi, Bağcılar Güngören Sanayi Bölgesi Blok:11 No:19, Başakşehir / İSTANBUL',
    phone: '0212 671 25 77',
    fax: '0212 671 25 78',
    emailSales: 'satis@haybatamakina.com',
    emailInfo: 'bilgi@haybatamakina.com',
    hours: 'Hafta içi: 08:00 - 18:00<br>Cumartesi: 09:00 - 14:00',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.1407236086779!2d28.804779!3d41.079764!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDA0JzQ3LjIiTiAyOMKwNDgnMTcuMiJF!5e0!3m2!1str!2str!4v1700000000000',
    social: {
        facebook: 'http://www.facebook.com/sharer.php?u=http://www.haybatamakina.com',
        twitter: 'http://twitter.com/intent/tweet?url=http://www.haybatamakina.com',
        instagram: '#',
        linkedin: '#',
        whatsapp: '#'
    }
};

// Orijinal siteden alınan hakkımızda metni
const ABOUT_TEXT = {
    intro: 'Firmamız 1994 yılında fittings imalatı ve paslanmaz çelik bağlantı parçaları satışı amacı ile kurulmuştur. İthalat ve ihracat faaliyetlerimiz ile birlikte şirketimiz çeşitli alanlarda siz değerli müşterilerine hizmet vermeye devam etmektedir.',
    values: 'Haybata Paslanmaz olarak yıllardır güvenilir ve kusursuz hizmetten ödün vermeden çalışmaktayız. Makine sektöründe adımıza yakışır kaliteli ürünler sunmak, müşteri gereksinimleri ile beklentilerinin karşılanmasını sağlamak, hizmette kalite, doğruluk ve istikrar sağlamak bizim en öncelikli görevimizdir.',
    goal: 'Hedefimiz müşteri için her zaman en faydalı olan ürünleri temin etmek, satış öncesi ve sonrasında kusursuz hizmet vermek, yenilikçi düşüncelerimizle alanımızda önder olmak, müşteri memnuniyeti odaklı olmak, faaliyet alanımızda liderliği yakalamak, teknolojik alt yapıyı etkin ve verimli kullanmaktır.'
};