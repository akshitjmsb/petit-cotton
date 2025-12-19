-- Seed variants for the Oatmeal Waffle Knit (assume ID or sub-select)
-- Ideally we need valid UUIDs. Since I don't know the generated UUIDs, 
-- I will use a DO block to look them up.

DO $$
DECLARE
  romper_id UUID;
  bonnet_id UUID;
  leggings_id UUID;
BEGIN
  SELECT id INTO romper_id FROM products WHERE name = 'Oatmeal Waffle Knit' LIMIT 1;
  SELECT id INTO bonnet_id FROM products WHERE name = 'Heirloom Bonnet' LIMIT 1;
  SELECT id INTO leggings_id FROM products WHERE name = 'Forest Walk Leggings' LIMIT 1;

  IF romper_id IS NOT NULL THEN
    INSERT INTO product_variants (product_id, size, color, inventory_count) VALUES
    (romper_id, '0-3M', 'Oatmeal', 10),
    (romper_id, '3-6M', 'Oatmeal', 5),
    (romper_id, '6-12M', 'Oatmeal', 0), -- Out of stock test
    (romper_id, '12-18M', 'Oatmeal', 8)
    ON CONFLICT DO NOTHING;
  END IF;

  IF bonnet_id IS NOT NULL THEN
    INSERT INTO product_variants (product_id, size, color, inventory_count) VALUES
    (bonnet_id, 'NB', 'Cream', 20),
    (bonnet_id, '0-6M', 'Cream', 15)
    ON CONFLICT DO NOTHING;
  END IF;
  
  -- Add more as needed
END $$;
