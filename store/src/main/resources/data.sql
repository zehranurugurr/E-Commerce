INSERT INTO product_category (id, category_name) VALUES
    (1, 'Bilgisayar'),
    (2, 'Cep Telefonu'),
    (3, 'Kulaklık'),
    (4, 'Televizyon'),
    (5, 'Akıllı Saat')
ON CONFLICT (id) DO NOTHING;

INSERT INTO product (id, category_id, sku, name, description, unit_price, image_url, active, units_in_stock, date_created, last_updated) VALUES
    (1, 1, 'LAPTOP-001', 'ApexBook Pro 14', 'Ince ve guclu gunluk laptop.', 32999.00, 'assets/images/products/bilgisayar/1.png', true, 15, NOW(), NOW()),
    (2, 1, 'LAPTOP-002', 'NovaBook Air 13', 'Tasimasi kolay hafif bilgisayar.', 27999.00, 'assets/images/products/bilgisayar/2.png', true, 22, NOW(), NOW()),
    (3, 2, 'PHONE-001', 'Photon X12', 'Yuksek performansli akilli telefon.', 24999.00, 'assets/images/products/ceptelefonu/1.png', true, 30, NOW(), NOW()),
    (4, 2, 'PHONE-002', 'Photon Lite 5G', 'Gunluk kullanim icin dengeli telefon.', 17999.00, 'assets/images/products/ceptelefonu/2.png', true, 45, NOW(), NOW()),
    (5, 3, 'HEAD-001', 'EchoPods Pro', 'Aktif gurultu engelleme destekli kulaklik.', 4499.00, 'assets/images/products/kulaklık/1.png', true, 60, NOW(), NOW()),
    (6, 3, 'HEAD-002', 'EchoSound Max', 'Uzun pil omru sunan kablosuz kulaklik.', 2999.00, 'assets/images/products/kulaklık/2.png', true, 80, NOW(), NOW()),
    (7, 4, 'TV-001', 'Vision 55 4K', '55 inch 4K UHD akilli TV.', 21999.00, 'assets/images/products/televizyon/1.png', true, 12, NOW(), NOW()),
    (8, 4, 'TV-002', 'Vision OLED 65', '65 inch OLED panel premium TV.', 46999.00, 'assets/images/products/televizyon/2.png', true, 6, NOW(), NOW()),
    (9, 5, 'WATCH-001', 'Pulse Watch S', 'Saglik takibi yapan akilli saat.', 6999.00, 'assets/images/products/saat/1.png', true, 35, NOW(), NOW()),
    (10, 5, 'WATCH-002', 'Pulse Watch Active', 'Spor odakli GPS destekli saat.', 7999.00, 'assets/images/products/saat/2.png', true, 28, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

SELECT setval(pg_get_serial_sequence('product_category', 'id'), COALESCE((SELECT MAX(id) FROM product_category), 1), true);
SELECT setval(pg_get_serial_sequence('product', 'id'), COALESCE((SELECT MAX(id) FROM product), 1), true);
