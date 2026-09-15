/**
 * HAYBATA MAKİNA - Veri Dosyası
 * Sanayi Tipi Kazan İmalatı, Paslanmaz Çelik Ürünleri ve Tesis Ekipmanları
 */

// Menü Navigasyon Linkleri
const NAV_LINKS = [
    { label: 'Ana Sayfa', url: 'index.html' },
    { label: 'Ürünler', url: 'urunler.html' },
    { label: 'Hakkımızda', url: 'hakkimizda.html' },
    { label: 'İletişim', url: 'iletisim.html' },
];

// E-Posta Form İletim Yapılandırması
// FormSubmit.co ücretsiz ve güvenli doğrudan e-posta iletim altyapısı sağlar.
// Formlar doğrudan satis@haybatamakina.com adresine HTML formatında ulaştırılır.
const MAIL_CONFIG = {
    // Tercih edilen servis: 'formsubmit' | 'web3forms' | 'formspree'
    service: 'formsubmit',
    // Form verilerinin iletileceği resmi şirket e-posta adresi
    targetEmail: 'satis@haybatamakina.com',
    // Web3Forms API anahtarı (istenirse kullanılabilir)
    accessKey: 'a8e964bc-demo-key-haybata',
    // Formspree alternatifi
    formspreeUrl: 'https://formspree.io/f/haybatamakina'
};

// WhatsApp İletişim Yapılandırması (Sol Alt Köşe Butonu)
const WHATSAPP_CONFIG = {
    phone: '905521817077', // Uluslararası formatta numara (+90 552 181 70 77)
    displayPhone: '+90 552 181 70 77',
    defaultMessage: 'Merhaba Haybata Makina, paslanmaz çelik ürünleriniz ve sanayi tipi kazan imalatınız hakkında bilgi ve fiyat teklifi almak istiyorum.'
};

// Kategori & Ürün Görselleri
const CATEGORY_IMAGES = {
    'Sanayi Tipi Buhar Kazanları': 'images/projeler/buhar-kazani.jpg',
    'Kızgın Yağ Kazanları': 'images/projeler/kizgin-yag-kazani.jpg',
    'Sıcak Su Kazanları & Degazör': 'images/projeler/sicak-su-kazani.jpg',
    'Paslanmaz Proses Tankları': 'images/projeler/proses-tanki.jpg',
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

/* ==========================================================================
   ÇOK SEVİYELİ HİYERARŞİK ÜRÜN AĞACI (PRODUCT TREE)
   Ana Sektör / Kategori -> Alt Kategori -> Ürün Modelleri & Teknik Özellikleri
   ========================================================================== */
const PRODUCT_TREE = [
    {
        id: 'paslanmaz-fittings',
        name: 'PASLANMAZ FİTTİNGS',
        icon: 'fa-wrench',
        badge: 'Yüksek Basınç',
        description: 'Tüm boru tesisatlarında sızdırmaz ve güvenli yön değişimi, birleştirme ve akış kontrolü sağlayan kaynaklı, dişli fittingsler, flanşlar ve vanalar.',
        subcategories: [
            {
                id: 'kaynakli-fittings',
                name: 'Kaynaklı Fittings Grubu',
                slug: 'kaynakli-fittings',
                icon: 'fa-hammer',
                image: 'images/urunler/resim87.jpg',
                description: 'Yüksek basınç ve sıcaklık hatlarında kaynaklı bağlantı elemanları.',
                products: [
                    { name: 'Paslanmaz Patent Dirsek (90° / 45°)', image: 'images/urunler/resim87.jpg', description: 'Akış yönünü değiştirmek için kullanılan kaynaklı dirsek parçaları.', specs: { 'Malzeme': 'AISI 304 / 316L', 'Açı': '90° / 45° / 180°', 'Et Kalınlığı': 'SCH 10 / SCH 40' } },
                    { name: 'Paslanmaz Eşit & İnegal Tee', image: 'images/urunler/resim88.jpg', description: 'Boru hatlarından yan branşman almak için kaynaklı bağlantı elemanı.', specs: { 'Malzeme': 'AISI 304 / 316', 'Tip': 'Kaynaklı Dikişsiz' } },
                    { name: 'Paslanmaz Redüksiyon (Konsantrik / Eksantrik)', image: 'images/urunler/resim89.jpg', description: 'Farklı çaplardaki boruların eksenel birleşimini sağlayan redüksiyon.', specs: { 'Malzeme': 'AISI 304 / 316L', 'Tip': 'Konsantrik / Eksantrik' } },
                    { name: 'Paslanmaz Yaka (Stub End)', image: 'images/urunler/resim90.jpg', description: 'Serbest flanşlarla boru birleşiminde sızdırmaz yüzey oluşturan kaynaklı yaka.', specs: { 'Malzeme': 'AISI 304 / 316', 'Tip': 'Kaynaklı Boyunlu' } },
                    { name: 'Paslanmaz Bombe Kep (Boru Sonu Kapağı)', image: 'images/urunler/resim91.jpg', description: 'Boru hatlarının uçlarını kaynakla körleme için bombeli kep.', specs: { 'Malzeme': 'AISI 316', 'Form': 'Bombeli / Torisferik' } },
                    { name: 'Paslanmaz Kaynak Ağızlı Rekor (DIN 11851)', image: 'images/urunler/resim93.jpg', description: 'Gıda normunda hijyenik sökülebilir kaynaklı rekor bağlantı seti.', specs: { 'Malzeme': 'AISI 304 / 316L + EPDM Conta', 'Standart': 'DIN 11851 / SMS' } }
                ]
            },
            {
                id: 'disli-fittings',
                name: 'Dişli Fittings Grubu',
                slug: 'disli-fittings',
                icon: 'fa-plug',
                image: 'images/urunler/resim108.jpg',
                description: 'Dişli boru tesisatlarında sökülebilir ve hızlı montaj parçaları.',
                products: [
                    { name: 'Paslanmaz Pislik Tutucu (Y Tipi Filtre)', image: 'images/urunler/resim108.jpg', description: 'Hat içerisindeki tortu ve çapakları tutarak vana ve pompaları koruyan filtre.', specs: { 'Malzeme': 'AISI 316', 'Bağlantı': 'Dişli BSP', 'Filtre Gözenek': '0.5 - 1.0 mm' } },
                    { name: 'Paslanmaz Çift Taraflı Nipel & Hex Nipel', image: 'images/urunler/resim95.jpg', description: 'İki iç dişli parçayı birleştiren dıştan dişli bağlantı elemanı.', specs: { 'Malzeme': 'AISI 304 / 316', 'Ölçü': '1/4" - 4"' } },
                    { name: 'Paslanmaz Dişli Rekor (Konik / Düz Contalı)', image: 'images/urunler/resim99.jpg', description: 'Tesisatın istendiğinde sökülüp takılabilmesini sağlayan rekor.', specs: { 'Malzeme': 'AISI 304 / 316', 'Sızdırmazlık': 'Metal Metale Konik / PTFE' } },
                    { name: 'Paslanmaz Dişli Dirsek & Manşon', image: 'images/urunler/resim97.jpg', description: 'Dişli yön değiştirme dirseği ve boru birleştirme manşonu.', specs: { 'Malzeme': 'AISI 304 / 316', 'Diş': 'İçten Dişli BSP' } },
                    { name: 'Paslanmaz Kruva (Dört Yollu Dağıtıcı)', image: 'images/urunler/resim105.jpg', description: 'Tek hattan 3 farklı yöne akış dağıtımı sağlayan istavroz kruva.', specs: { 'Malzeme': 'AISI 304', 'Tip': '4 Yollu Dişli' } },
                    { name: 'Paslanmaz Hortum Ucu Rakoru', image: 'images/urunler/resim103.jpg', description: 'Boru hattından esnek hortumlara geçiş sağlayan tırtıklı rakor.', specs: { 'Malzeme': 'AISI 304 / 316', 'Tip': 'Hortum Tırnaklı' } }
                ]
            },
            {
                id: 'kelepce-grubu',
                name: 'Kelepçe & Bağlantı Elemanları',
                slug: 'kelepce-baglanti-elemanlari',
                icon: 'fa-link',
                image: 'images/urunler/resim53.jpg',
                description: 'Boru ve hortumların tavana, duvara ve profile titreşimsiz sabitlenmesi.',
                products: [
                    { name: 'Düz & Saplı Boru Kelepçesi', image: 'images/urunler/resim53.jpg', description: 'Tesisat borularının rijit ve güvenli montajı için paslanmaz kelepçe.', specs: { 'Malzeme': 'AISI 304 / 316', 'Çap': 'DN15 - DN300' } },
                    { name: 'Somonlu Lastikli Titreşim Kelepçesi', image: 'images/urunler/resim56.jpg', description: 'Pompa ve kazan çıkışı boru hatlarında titreşim ve gürültüyü emen EPDM lastikli kelepçe.', specs: { 'Malzeme': 'AISI 304 + EPDM Fitil', 'Özellik': 'Titreşim Sönümleyici' } },
                    { name: 'Trifonlu Kelepçe & Ağır Hizmet U-Bolt', image: 'images/urunler/resim58.jpg', description: 'Duvar ve çelik konstrüksiyon sabitlemeleri için trifon vidalı ve U-bolt kelepçe.', specs: { 'Malzeme': 'AISI 304 / 316', 'Tip': 'Trifonlu / U-Bolt' } },
                    { name: 'Paslanmaz Hortum Kelepçesi (Sonsuz Vida)', image: 'images/urunler/resim57.jpg', description: 'Hortum bağlantılarında yüksek sıkma torku sağlayan paslanmaz kelepçe.', specs: { 'Bant & Gövde': 'AISI 304 Tamamı Paslanmaz' } }
                ]
            },
            {
                id: 'endustriyel-flanslar',
                name: 'Endüstriyel Flanşlar',
                slug: 'endustriyel-flanslar',
                icon: 'fa-circle-notch',
                image: 'images/urunler/resim72.jpg',
                description: 'Kazan, tank ve boru hatları için standart ve yüksek basınçlı paslanmaz flanşlar.',
                products: [
                    { name: 'Kaynak Boyunlu Flanş (Welding Neck)', image: 'images/urunler/resim75.jpg', description: 'Kazan çıkışları ve yüksek basınç hatlarında gerilimi dağıtan boyunlu flanş.', specs: { 'Malzeme': 'AISI 304L / 316L', 'Norm': 'EN 1092-1 Tip 11 / ANSI B16.5', 'Basınç': 'PN16 / PN25 / PN40 / 150-300 LBS' } },
                    { name: 'Düz Kaynaklı Flanş (Slip-On / Plate)', image: 'images/urunler/resim73.jpg', description: 'Boru dışına geçirilerek kaynaklanan standart düz bağlantı flanşı.', specs: { 'Malzeme': 'AISI 304 / 316', 'Norm': 'EN 1092-1 Tip 01' } },
                    { name: 'Kör Flanş (Blind Flange)', image: 'images/urunler/resim74.jpg', description: 'Boru ucu veya kazan nozulunu sökülebilir şekilde körleme flanşı.', specs: { 'Malzeme': 'AISI 304 / 316L', 'Çap': 'DN15 - DN600' } },
                    { name: 'Conta Basma Yüzeyli & Baskılı Flanş', image: 'images/uploads/ContaBasmaYuzeyliBaskılıFlans.jpeg', description: 'Özel sızdırmazlık contalarının yerleşimi için kanallı ve baskılı flanş.', specs: { 'Malzeme': 'AISI 316', 'Yüzey': 'Tırtıklı / Kanallı Form' } }
                ]
            },
            {
                id: 'vana-akisi',
                name: 'Paslanmaz Vana & Akış Ekipmanları',
                slug: 'paslanmaz-vana-akis-ekipmanlari',
                icon: 'fa-sliders',
                image: 'images/urunler/resim60.jpg',
                description: 'Endüstriyel ve hijyenik küresel, kelebek ve yönlendirici vanalar.',
                products: [
                    { name: 'Dişli Küresel Vana (2 Parçalı)', image: 'images/urunler/resim60.jpg', description: 'Dişli bağlantılı, tam geçişli paslanmaz küresel vana.', specs: { 'Malzeme': 'AISI 304 / 316', 'Bağlantı': 'Dişli (BSP / NPT)', 'Basınç': 'PN63 / 1000 WOG' } },
                    { name: 'Hijyenik Kelebek Vana (Kollu)', image: 'images/urunler/resim61.jpg', description: 'Gıda ve süt hatları için paslanmaz hijyenik kelebek vana.', specs: { 'Malzeme': 'AISI 304 / 316L', 'Conta': 'Silikon / EPDM / Viton', 'Çap': 'DN25 - DN150' } },
                    { name: 'Üç Yollu Paslanmaz Vana (L ve T Tipi)', image: 'images/urunler/resim63.jpg', description: 'Üç yönlü akış saptırma ve karışım sağlayan paslanmaz vana.', specs: { 'Malzeme': 'AISI 304 / 316', 'Yönlendirme': 'L-Port / T-Port' } },
                    { name: 'Paslanmaz Çek Valf (Yaylı / Çalpara)', image: 'images/urunler/resim94.jpg', description: 'Tek yönlü akış sağlayarak geri dönüşü engelleyen çek valf.', specs: { 'Malzeme': 'AISI 316', 'Tip': 'Yaylı / Disk' } }
                ]
            }
        ]
    },
    {
        id: 'paslanmaz-menhol-kapagi',
        name: 'PASLANMAZ MENHOL KAPAĞI',
        icon: 'fa-door-open',
        badge: 'Kazan & Tank',
        description: 'Sanayi tankları, proses kapları ve kazanlar için yüksek basınç dayanımlı, hijyenik dairesel, oval ve dikdörtgen menhol kapakları.',
        subcategories: [
            {
                id: 'menhol-kapaklari',
                name: 'Kazan & Tank Menhol Kapakları',
                slug: 'kazan-tank-menhol-kapaklari',
                icon: 'fa-door-closed',
                image: 'images/urunler/resim66.jpg',
                description: 'Basınçlı ve atmosferik tanklara insan ve bakım erişimi sağlayan standart ve özel menholler.',
                products: [
                    { name: 'Basınca Dayanıklı 6 Vidalı Menhol Kapağı', image: 'images/urunler/resim69.jpg', description: 'Kazan ve basınçlı kaplarda yüksek iç basınca karşı 6 kelebek vidalı sızdırmaz kapak.', specs: { 'Malzeme': 'AISI 316L', 'Basınç Dayanımı': '6 - 10 Bar', 'Conta': 'Silikon / Viton' } },
                    { name: 'Yuvarlak & Oval İçe-Dışa Açılır Menhol', image: 'images/urunler/resim66.jpg', description: 'Depolama ve fermentasyon tankları için hijyenik açılır menhol kapağı.', specs: { 'Malzeme': 'AISI 304 / 316', 'Açılış': 'Dışa / İçe Salınımlı' } },
                    { name: 'Gözetleme Camlı Menhol Kapağı', image: 'images/urunler/resim70.jpg', description: 'Tank içi prosesi kapağı açmadan izleme olanağı sunan borosilikat camlı menhol.', specs: { 'Malzeme': 'AISI 316 + Temperli Borosilikat Cam' } },
                    { name: 'Atmosferik Üst Menhol Kapağı', image: 'images/urunler/resim66.jpg', description: 'Atmosfere açık depolama tankları için menteşeli kolay açılır üst kapak.', specs: { 'Malzeme': 'AISI 304 / 316', 'Çap': 'DN400 - DN600' } }
                ]
            }
        ]
    },
    {
        id: 'paslanmaz-ozel-imalatlar',
        name: 'PASLANMAZ ÖZEL İMALATLAR',
        icon: 'fa-cogs',
        badge: 'Proses & Mühendislik',
        description: 'Tesisinizin özel gereksinimlerine göre projelendirilen ve imal edilen paslanmaz borulama spolları, CIP başlıkları, mikserler ve özel platformlar.',
        subcategories: [
            {
                id: 'ozel-imalat-tank-ekipman',
                name: 'Özel İmalat Proses Ekipmanları',
                slug: 'ozel-imalat-proses-ekipmanlari',
                icon: 'fa-industry',
                image: 'images/urunler/resim64.jpg',
                description: 'Gıda, kimya ve ilaç sanayisine özel paslanmaz ekipman ve aparat imalatları.',
                products: [
                    { name: 'Paslanmaz Özel İmalat Kürek & El Arabası', image: 'images/uploads/PaslanmazElArabasıKürek.jpeg', description: 'Gıda ve kimya tesisleri için monoblok paslanmaz hijyenik taşıma ekipmanları.', specs: { 'Malzeme': 'AISI 304 Polisajlı' } },
                    { name: 'Paslanmaz Karıştırıcı & Mikser Şaftları', image: 'images/projeler/proses-tanki.jpg', description: 'Reaktör ve mikser tankları için özel balanslı kanat ve şaft imalatı.', specs: { 'Malzeme': 'AISI 316L', 'Yüzey': 'Ayna Polisajlı' } },
                    { name: 'Özel İmalat Kollektör ve Boru Spool Hatları', image: 'images/projeler/montaj.jpg', description: 'Saha montajını hızlandıran flanşlı ve kaynaklı hazır borulama modülleri.', specs: { 'Norm': 'EN / ASME', 'Test': 'Röntgen / Penetrant' } }
                ]
            },
            {
                id: 'havalandirma-cip',
                name: 'Tank Havalandırma & CIP Yıkama Başlıkları',
                slug: 'tank-havalandirma-cip-ekipmanlari',
                icon: 'fa-fan',
                image: 'images/urunler/resim112.jpg',
                description: 'Vakum ve aşırı basınç koruma başlıkları ve otomatik CIP tank yıkama topları.',
                products: [
                    { name: 'Paslanmaz Tank Havalandırma Başlığı (Aeratör)', image: 'images/urunler/resim112.jpg', description: 'Tank dolum ve boşaltımında vakum oluşmasını önleyen paslanmaz filtreli başlık.', specs: { 'Malzeme': 'AISI 304 / 316L', 'Filtre': 'Paslanmaz Sineklik & Toz Filtresi' } },
                    { name: '360° Döner CIP Tank Yıkama Topu', image: 'images/urunler/resim77.jpg', description: 'Kazan ve proses tanklarının içini kimyasal solüsyonla otomatik temizleyen döner püskürtme topu.', specs: { 'Malzeme': 'PTFE / AISI 316L', 'Püskürtme': '360 Derece Döner Küre' } }
                ]
            }
        ]
    },
    {
        id: 'paslanmaz-sarf-malzemeler',
        name: 'PASLANMAZ SARF MALZEMELER',
        icon: 'fa-boxes-stacked',
        badge: 'Stoktan Teslim',
        description: 'A2/A4 paslanmaz civata, somun, pul takımları, TIG/MIG kaynak telleri, taşlama/polisaj malzemeleri ve hammadde tedariği.',
        subcategories: [
            {
                id: 'paslanmaz-civata-baglanti',
                name: 'Paslanmaz Bağlantı Elemanları & Civatalar',
                slug: 'paslanmaz-baglanti-elemanlari-civatalar',
                icon: 'fa-screwdriver-wrench',
                image: 'images/urunler/resim116.jpg',
                description: 'A2-70 ve A4-80 normlarında paslanmaz cıvata, somun, imbus, saplama ve pul çeşitleri.',
                products: [
                    { name: 'A2 / A4 Paslanmaz Altıköşe Civata & Somun Setleri', image: 'images/urunler/resim116.jpg', description: 'Flanş ve makine montajı için paslanmaz bağlantı elemanları.', specs: { 'Kalite': 'A2-70 (AISI 304) / A4-80 (AISI 316)', 'Ölçü': 'M6 - M36 Boy Çeşitleri' } },
                    { name: 'Paslanmaz İmbus & Havşa Başlı Civatalar', image: 'images/urunler/resim116.jpg', description: 'Hassas makine ve ekipman birleşimleri için DIN 912 imbus vidalar.', specs: { 'Norm': 'DIN 912 / ISO 4762', 'Malzeme': 'AISI 304 / 316' } },
                    { name: 'Paslanmaz Gijon (Saplama) & Rondela / Yaylı Pul', image: 'images/urunler/resim116.jpg', description: '1 metre ve 2 metre boylarında dişli saplamalar ve titreşim emniyet pulları.', specs: { 'Ölçü': 'M6 - M30', 'Kalite': 'A2 / A4' } }
                ]
            },
            {
                id: 'paslanmaz-sarf-kaynak',
                name: 'Kaynak & Yüzey İşlem Sarfları',
                slug: 'kaynak-yuzey-islem-sarflari',
                icon: 'fa-fire-flame-curved',
                image: 'images/urunler/resim80.jpg',
                description: 'TIG/MIG paslanmaz kaynak telleri, kesme taşları ve leke giderici pasivasyon kimyasalları.',
                products: [
                    { name: 'Paslanmaz TIG & MIG Kaynak Telleri (308L / 316L)', image: 'images/urunler/resim80.jpg', description: 'Yüksek saflıkta koruyucu gaz altı paslanmaz kaynak telleri ve çubukları.', specs: { 'Kalite': 'ER308L, ER316L, ER309L', 'Çap': '1.2 mm - 3.2 mm' } },
                    { name: 'Paslanmaz Kesme & Taşlama Diskleri (Inox)', image: 'images/urunler/resim80.jpg', description: 'Demirsiz (Fe+S+Cl < %0.1) paslanmazı yakmayan ince kesme ve çapak alma taşları.', specs: { 'Standart': 'EN 12413 Inox Özel' } },
                    { name: 'Kaynak Leke Temizleme Jeli & Pasivasyon Sıvısı', image: 'images/urunler/resim80.jpg', description: 'Kaynak sonrası oluşan kararma ve tufalı kimyasal olarak temizleyen asitsiz/asitli jel.', specs: { 'Uygulama': 'Fırça veya Püskürtme' } }
                ]
            },
            {
                id: 'paslanmaz-hammadde',
                name: 'Paslanmaz Çelik Hammaddeler',
                slug: 'paslanmaz-celik-malzemeler',
                icon: 'fa-layer-group',
                image: 'images/urunler/resim80.jpg',
                description: 'AISI 304, 304L, 316, 316L sertifikalı paslanmaz sac, dikişsiz boru, profil ve mil tedariği.',
                products: [
                    { name: 'Paslanmaz Çelik Sac (Plaka & Rulo)', image: 'images/urunler/resim85.jpg', description: 'Kazan gövdesi ve tank imalatı için 1. Kalite sertifikalı paslanmaz sac.', specs: { 'Kalite': 'AISI 304 / 316L / 310S', 'Kalınlık': '0.50 mm - 30 mm' } },
                    { name: 'Paslanmaz Dikişli & Dikişsiz Boru', image: 'images/urunler/resim81.jpg', description: 'Tesisat ve kazan boru demeti için dikişsiz çekme ve TIG dikişli borular.', specs: { 'Norm': 'ASTM A312 / EN 10217-7', 'Ölçü': '1/8" - 24" (DN6 - DN600)' } },
                    { name: 'Paslanmaz Profil, Lama & Köşebent', image: 'images/urunler/resim84.jpg', description: 'Şasi ve konstrüksiyon imalatları için paslanmaz kutu profil ve lamalar.', specs: { 'Malzeme': 'AISI 304 / 316', 'Ebat': 'Geniş stok aralığı' } },
                    { name: 'Paslanmaz Mil & Altıköşe Çubuk', image: 'images/urunler/resim83.jpg', description: 'Talaşlı imalat ve CNC işleme için paslanmaz transmisyon milleri.', specs: { 'Tolerans': 'h9 / h11', 'Çap': 'Ø 3 mm - Ø 250 mm' } }
                ]
            }
        ]
    }
];

/* ==========================================================================
   GERİYE DÖNÜK UYUMLULUK İÇİN DÜZ KATEGORİ LİSTESİ (PRODUCT_CATEGORIES)
   Ağaçtan otomatik düz liste oluşturularak mevcut fonksiyonların çalışması korunur
   ========================================================================== */
const PRODUCT_CATEGORIES = [];
PRODUCT_TREE.forEach(group => {
    group.subcategories.forEach(sub => {
        PRODUCT_CATEGORIES.push({
            id: sub.id,
            groupId: group.id,
            groupName: group.name,
            name: sub.name,
            slug: sub.slug,
            icon: sub.icon,
            image: sub.image,
            description: sub.description,
            products: sub.products
        });
    });
});

/* ==========================================================================
   SANAYİ TİPİ KAZAN İMALATI & PROJELER (PROJECTS)
   Referans projeler, teknik kapasite ve müşteri başarı hikayeleri
   ========================================================================== */
const PROJECTS = [
    {
        id: 'buhar-kazani-tekstil',
        title: '6 Ton/Saat Skoç Tipi Doymuş Buhar Kazanı ve Kazan Dairesi Kurulumu',
        category: 'buhar-kazani',
        categoryLabel: 'Buhar Kazanı İmalatı',
        client: 'Entegre Tekstil Sanayi A.Ş.',
        location: 'Tekirdağ / Çorlu',
        year: '2024',
        image: 'images/projeler/buhar-kazani.jpg',
        summary: 'Tekstil boyahane ve ramöz ünitelerinin kesintisiz buhar ihtiyacını karşılamak üzere 12 Bar işletme basıncında 3 geçişli skoç tipi buhar kazanı imalatı, degazör ve borulama montajı.',
        highlights: [
            '6.000 kg/saat doymuş buhar üretim kapasitesi',
            'EN 12953 ve CE Basınçlı Kaplar Direktifi onaylı imalat',
            'Ekonomizer entegrasyonu ile %94.5 yanma verimi',
            'Otomatik blöf sistemi ve PLC kontrollü dokunmatik operatör paneli',
            'Tamamı AISI 316L paslanmaz besi suyu hazırlama ve degazör ünitesi'
        ],
        specs: {
            'Kazan Tipi': '3 Geçişli Alev Duman Borulu Skoç Tipi',
            'Kapasite': '6.000 kg/h Buhar',
            'Tasarım Basıncı': '16 Bar (İşletme: 12 Bar)',
            'Yakıt Cinsi': 'Doğalgaz / LNG Modülasyonlu',
            'Sac Kalitesi': 'P265GH / P295GH Sertifikalı Kazan Sacı',
            'Borular': 'DIN 17175 St 35.8 Dikişsiz Çekme Kazan Borusu'
        }
    },
    {
        id: 'kizgin-yag-kimya',
        title: '2.500.000 kcal/h Çift Serpantinli Kızgın Yağ Kazanı İmalatı',
        category: 'kizgin-yag',
        categoryLabel: 'Kızgın Yağ Sistemleri',
        client: 'Petrokimya & Reçine Tesisleri San. Tic.',
        location: 'Kocaeli / Gebze OSB',
        year: '2024',
        image: 'images/projeler/kizgin-yag-kazani.jpg',
        summary: 'Reçine reaktörlerinin 300°C proses sıcaklığına ulaştırılması amacıyla çift serpantinli termal yağ kazanı, genleşme tankı, azot yastıklama ve sirkülasyon pompaları projelendirilip üretilmiştir.',
        highlights: [
            '2.500.000 kcal/saat termal kapasite',
            '320°C maksimum işletme sıcaklığı, 6 Bar sirkülasyon',
            'DIN 17175 dikişsiz borulardan özel CNC büküm çift serpantin',
            'Termal şoklara karşı korumalı genleşme ve imdat tankı',
            'Sıcak yağ vanaları ve paslanmaz kolektör montajı'
        ],
        specs: {
            'Kazan Tipi': 'Yatay Çift Serpantinli Kızgın Yağ Kazanı',
            'Kapasite': '2.500.000 kcal/h (~2.900 kW)',
            'Maksimum Sıcaklık': '320°C',
            'Gövde İzolasyonu': '100 mm Taşyünü + Paslanmaz Sac Kaplama',
            'Kontrol': 'PID Hassas Sıcaklık Kontrolü'
        }
    },
    {
        id: 'proses-tanki-ilac-gida',
        title: '30 m³ AISI 316L Karıştırıcılı Paslanmaz Proses Reaktörü ve Tankı',
        category: 'proses-tanki',
        categoryLabel: 'Paslanmaz Proses Tankı',
        client: 'Global İlaç & Biyoteknoloji Sanayi',
        location: 'İstanbul / Tuzla Kimyacılar OSB',
        year: '2023',
        image: 'images/projeler/proses-tanki.jpg',
        summary: 'Hassas kimyasal ve gıda sıvı prosesleri için serpantin ceketli, manyetik karıştırıcılı, 6 vidalı gözetleme camlı menhole sahip paslanmaz reaktör imalatı.',
        highlights: [
            '30.000 Litre net proses hacmi',
            'Gövde ve temas yüzeyleri tamamı AISI 316L paslanmaz çelik',
            'İç yüzey pürüzlülüğü Ra < 0.38 µm ayna polisaj',
            'Basınçlı ısıtma/soğutma ceketli gövde (Half-pipe serpantin)',
            'Otomatik CIP döner yıkama başlığı sistemi'
        ],
        specs: {
            'Hacim': '30.000 Litre (30 m³)',
            'Malzeme': 'AISI 316L Paslanmaz Çelik',
            'Tasarım Standardı': 'ASME Sec. VIII Div.1 & PED',
            'Test Basıncı': 'Ceket: 8 Bar / Gövde: 4 Bar & Tam Vakum'
        }
    },
    {
        id: 'sicak-su-sera-sanayi',
        title: '10.000.000 kcal/h Yüksek Basınçlı Kaynar Su Kazanı',
        category: 'sicak-su',
        categoryLabel: 'Kaynar Su Sistemleri',
        client: 'Modern Jeotermal & Endüstriyel Tesisler',
        location: 'İzmir / Bergama',
        year: '2023',
        image: 'images/projeler/sicak-su-kazani.jpg',
        summary: '200 dönümlük endüstriyel sera ve kurutma tesislerinin ısıtılması amacıyla 140/90°C rejiminde çalışan 3 geçişli yüksek basınçlı kaynar su kazanı sistemi.',
        highlights: [
            '10.000.000 kcal/h yüksek ısı çıkışı',
            '16 Bar işletme basıncı altında buharlaşmasız kaynar su üretimi',
            'Radyografik %100 kaynak kontrolü (Röntgen filmi) onaylı',
            'Baca gazı yoğuşmalı ekonomizer ile üstün yakıt tasarrufu'
        ],
        specs: {
            'Isı Gücü': '10.000.000 kcal/h (11.6 MW)',
            'Giriş/Çıkış Sıcaklığı': '90°C / 140°C',
            'Çalışma Basıncı': '16 Bar',
            'Gövde Çapı': 'Ø 2.800 mm, Boy: 6.200 mm'
        }
    },
    {
        id: 'paslanmaz-tesis-montaj',
        title: 'Gıda Fabrikası Paslanmaz Borulama, Vana Dağıtım ve Kollektör Tesisatı',
        category: 'tesis-montaj',
        categoryLabel: 'Tesis Montaj & Borulama',
        client: 'Süt ve Meyve Suyu İşleme Entegre Tesisi',
        location: 'Balıkesir / Susurluk',
        year: '2023',
        image: 'images/projeler/proses-tanki.jpg',
        summary: 'Pastörizatör, buhar kazanı dağıtımı, CIP yıkama hatları ve tank beslemeleri için 4.500 metre AISI 316L hijyenik orbital kaynaklı boru montajı ve vana adası kurulumu.',
        highlights: [
            '4.500 metre DN25 - DN200 paslanmaz boru hattı',
            'Argon korumalı orbital kaynaklı sıfır cüruflu montaj',
            'Pnömatik aktüatörlü kelebek ve küresel vana otomasyonu',
            'Basınç düşürücü istasyonları ve debimetre panelleri'
        ],
        specs: {
            'Boru Tipi': 'DIN 11850 Hijyenik Paslanmaz Boru',
            'Kaynak Standardı': 'Orbital TIG / AWS D18.1',
            'Ekipman': '24 Adet Vana Matrisi ve Dağıtım Kollektörü'
        }
    }
];

// Müşteri / Sanayi Referansları
const REFERENCES = [
    { name: 'Entegre Tekstil Sanayi', sector: 'Tekstil & Boya', desc: 'Buhar Kazanı & Kollektör Sistemleri' },
    { name: 'Mega Kimya & Reçine', sector: 'Petrokimya', desc: 'Kızgın Yağ Kazanı & Reaktör Projeleri' },
    { name: 'Anadolu Gıda & İçecek', sector: 'Gıda Sanayi', desc: 'Paslanmaz Tank & Saf Buhar Hatları' },
    { name: 'Marmara Ambalaj & Karton', sector: 'Kağıt Sanayi', desc: '10 Ton Buhar Kazanı & Kondens Sistemi' },
    { name: 'Ege Modern Jeotermal Sera', sector: 'Tarım & Isıtma', desc: 'Yüksek Basınçlı Kaynar Su Kazanları' },
    { name: 'Otomotiv Yan Sanayi A.Ş.', sector: 'Otomotiv', desc: 'Endüstriyel Isıtma ve Akışkan Tesisatı' },
];

// Duyurular (Kaldırıldı)
const ANNOUNCEMENTS = [];

// İş İlanları (Kaldırıldı)
const JOB_LISTINGS = [];

// İletişim Bilgileri
const CONTACT_INFO = {
    address: 'İkitelli Organize Sanayi Bölgesi, Bağcılar Güngören Sanayi Bölgesi Blok:11 No:19, Başakşehir / İSTANBUL',
    phone: '0212 671 25 77',
    fax: '0212 671 25 78',
    whatsapp: '905521817077',
    emailSales: 'satis@haybatamakina.com',
    emailInfo: 'bilgi@haybatamakina.com',
    hours: 'Hafta içi: 08:00 - 18:00<br>Cumartesi: 09:00 - 14:00',
    mapEmbed: 'https://maps.google.com/maps?q=%C4%B0kitelli+Organize+Sanayi+B%C3%B6lgesi,+Ba%C4%9Fc%C4%B1lar+G%C3%BCng%C3%B6ren+Sanayi+B%C3%B6lgesi+Blok:11+No:19,+Ba%C5%9fak%C5%9Fehir+/+%C4%B0STANBUL&t=&z=16&ie=UTF8&iwloc=&output=embed',
    social: {
        facebook: 'http://www.facebook.com/sharer.php?u=http://www.haybatamakina.com',
        twitter: 'http://twitter.com/intent/tweet?url=http://www.haybatamakina.com',
        instagram: '#',
        linkedin: '#',
        whatsapp: 'https://wa.me/905521817077'
    }
};

// Hakkımızda Metni
const ABOUT_TEXT = {
    intro: 'Firmamız 1994 yılından bu yana sanayi tipi kazan imalatı, endüstriyel tesis kurulumu, paslanmaz çelik vana, fittings ve bağlantı parçaları üretimi ve satışı alanında Türkiye\'nin ve çevre coğrafyaların öncü sanayi kuruluşlarına hizmet vermektedir.',
    values: 'Haybata Makina olarak 30 yılı aşkın tecrübemizle kalite ve güvenilirlikten ödün vermeden çalışmaktayız. Sanayi tipi buhar kazanları, kızgın yağ kazanları, basınçlı kaplar ve paslanmaz tesisat bileşenlerinde uluslararası normlara (EN 12953, PED 2014/68/EU) uygun kusursuz çözümler üretiyoruz.',
    goal: 'Hedefimiz ağır sanayi, tekstil, gıda, kimya ve ilaç sektörlerindeki müşterilerimize enerji verimliliği yüksek, uzun ömürlü ve güvenli sistemler sunmak, satış öncesi mühendislik ve satış sonrası servis desteğinde sektör liderliğini sürdürmektir.'
};