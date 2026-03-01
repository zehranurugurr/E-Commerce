INSERT INTO product_category (id, category_name) VALUES
    (1, 'Bilgisayar'),
    (2, 'Cep Telefonu'),
    (3, 'Kulaklık'),
    (4, 'Televizyon'),
    (5, 'Akıllı Saat')
ON CONFLICT (id) DO UPDATE SET
    category_name = EXCLUDED.category_name;

INSERT INTO product (id, category_id, sku, name, description, unit_price, image_url, active, units_in_stock, date_created, last_updated) VALUES
    (1, 1, 'LAPTOP-001', 'ApexBook Pro 14', 'İnce ve güçlü günlük laptop.', 32999.00, 'assets/images/products/bilgisayar/1.png', true, 15, NOW(), NOW()),
    (2, 1, 'LAPTOP-002', 'NovaBook Air 13', 'Taşıması kolay hafif bilgisayar.', 27999.00, 'assets/images/products/bilgisayar/2.png', true, 22, NOW(), NOW()),
    (3, 1, 'LAPTOP-003', 'VectorBook Ultra', 'Yüksek bellekli üretkenlik dizüstü bilgisayarı.', 38999.00, 'assets/images/products/bilgisayar/3.png', true, 11, NOW(), NOW()),
    (4, 1, 'LAPTOP-004', 'CoreStation X', 'Oyun ve performans için güçlü donanım.', 45999.00, 'assets/images/products/bilgisayar/4.png', true, 7, NOW(), NOW()),
    (5, 1, 'LAPTOP-005', 'LiteNote Flex', 'Öğrenciler için kompakt ve dengeli çözüm.', 21999.00, 'assets/images/products/bilgisayar/5.png', true, 19, NOW(), NOW()),

    (6, 2, 'PHONE-001', 'Photon X12', 'Yüksek performanslı akıllı telefon.', 24999.00, 'assets/images/products/ceptelefonu/1.png', true, 30, NOW(), NOW()),
    (7, 2, 'PHONE-002', 'Photon Lite 5G', 'Günlük kullanım için dengeli telefon.', 17999.00, 'assets/images/products/ceptelefonu/2.png', true, 45, NOW(), NOW()),
    (8, 2, 'PHONE-003', 'Nova Pocket Pro', 'Gelişmiş kamera ve uzun pil ömrü sunar.', 28999.00, 'assets/images/products/ceptelefonu/3.png', true, 17, NOW(), NOW()),
    (9, 2, 'PHONE-004', 'Nova Pocket Mini', 'Tek elle kullanım için hafif ve hızlı model.', 15999.00, 'assets/images/products/ceptelefonu/4.png', true, 33, NOW(), NOW()),
    (10, 2, 'PHONE-005', 'Photon Max View', 'Büyük ekran deneyimi arayanlara özel.', 30999.00, 'assets/images/products/ceptelefonu/5.png', true, 14, NOW(), NOW()),

    (11, 3, 'HEAD-001', 'EchoPods Pro', 'Aktif gürültü engelleme destekli kulaklık.', 4499.00, 'assets/images/products/kulaklık/1.png', true, 60, NOW(), NOW()),
    (12, 3, 'HEAD-002', 'EchoSound Max', 'Uzun pil ömrü sunan kablosuz kulaklık.', 2999.00, 'assets/images/products/kulaklık/2.png', true, 80, NOW(), NOW()),
    (13, 3, 'HEAD-003', 'BassTune Air', 'Güçlü bas ve hafif tasarım bir arada.', 3499.00, 'assets/images/products/kulaklık/3.png', true, 41, NOW(), NOW()),
    (14, 3, 'HEAD-004', 'QuietBeat Studio', 'Ofis ve yolculuk için konforlu dinleme.', 5199.00, 'assets/images/products/kulaklık/4.png', true, 23, NOW(), NOW()),
    (15, 3, 'HEAD-005', 'PulseSound Fit', 'Spor kullanımına uygun ergonomik kulaklık.', 2699.00, 'assets/images/products/kulaklık/5.png', true, 54, NOW(), NOW()),

    (16, 4, 'TV-001', 'Vision 55 4K', '55 inç 4K UHD akıllı TV.', 21999.00, 'assets/images/products/televizyon/1.png', true, 12, NOW(), NOW()),
    (17, 4, 'TV-002', 'Vision OLED 65', '65 inç OLED panel premium TV.', 46999.00, 'assets/images/products/televizyon/2.png', true, 6, NOW(), NOW()),
    (18, 4, 'TV-003', 'CinemaView QLED', 'Canlı renkler sunan geniş ekran TV.', 35999.00, 'assets/images/products/televizyon/3.png', true, 9, NOW(), NOW()),
    (19, 4, 'TV-004', 'FrameCast 50', 'Salon dekoruna uyumlu ince çerçeveli model.', 24999.00, 'assets/images/products/televizyon/4.png', true, 13, NOW(), NOW()),
    (20, 4, 'TV-005', 'UltraPanel 70', 'Büyük ekran film keyfi için ideal seçenek.', 55999.00, 'assets/images/products/televizyon/5.png', true, 4, NOW(), NOW()),

    (21, 5, 'WATCH-001', 'Pulse Watch S', 'Sağlık takibi yapan akıllı saat.', 6999.00, 'assets/images/products/saat/1.png', true, 35, NOW(), NOW()),
    (22, 5, 'WATCH-002', 'Pulse Watch Active', 'Spor odaklı GPS destekli saat.', 7999.00, 'assets/images/products/saat/2.png', true, 28, NOW(), NOW()),
    (23, 5, 'WATCH-003', 'MoveTrack Mini', 'Kompakt kasada günlük aktivite takibi.', 5499.00, 'assets/images/products/saat/3.png', true, 31, NOW(), NOW()),
    (24, 5, 'WATCH-004', 'VitalWatch Pro', 'Sağlık ölçümleri ve uzun pil süresi sunar.', 9299.00, 'assets/images/products/saat/4.png', true, 16, NOW(), NOW()),
    (25, 5, 'WATCH-005', 'Urban Time X', 'Şık görünüm ile akıllı özellikleri birleştirir.', 8499.00, 'assets/images/products/saat/5.png', true, 21, NOW(), NOW())
ON CONFLICT (id) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    sku = EXCLUDED.sku,
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    unit_price = EXCLUDED.unit_price,
    image_url = EXCLUDED.image_url,
    active = EXCLUDED.active,
    units_in_stock = EXCLUDED.units_in_stock,
    last_updated = NOW();

SELECT setval(pg_get_serial_sequence('product_category', 'id'), COALESCE((SELECT MAX(id) FROM product_category), 1), true);
SELECT setval(pg_get_serial_sequence('product', 'id'), COALESCE((SELECT MAX(id) FROM product), 1), true);
