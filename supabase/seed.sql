-- Insert sample products
INSERT INTO products (name, description, base_price, sku, category, image_url) VALUES
('Oatmeal Waffle Knit', 'Soft organic cotton waffle knit romper.', 42.00, 'ROM-OAT-001', 'Romper', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLGsit8Sny2koshqxQBSV-kX33VM-w87LIHgLvjnUwKcAwFv1dAOAAsSNVgUkT1iixnhNyGXlV_Yu2JDwKwV9O3Yq8hzSm5KIPhoo1OF9LomThXZZR-_bK6iAs4UxBPdLNHkwPKMognZpWylkf7hE_0ZyWp7b2O2MPrRiS8bm9J9JhoYjRsSMlskyKBFAX-3uwe3nsvFR1MgxJHRruBw-uDKDNY7Bcg-fdZmg5vu93be8Hu9OvVH0yKQcranSLjXsceofhMB_qnA'),
('Heirloom Bonnet', 'Hand-knitted classic bonnet.', 28.00, 'ACC-BON-001', 'Accessories', 'https://lh3.googleusercontent.com/aida-public/AB6AXuA45ZXf87TdnhHVcWsGh-a3sgGpy4QPZrp4UnV_pbIYIxnfJh_dDzM9jtCH7eZzb2qDXGBr5Sa5EEdPticsqQluzCWsYF7ioW-cWX27dX3Th-MX3CvUiFsCHBq89k7S1llG3n6Z61RdJD1zMn1oR8jXvWJ0a1R9n1_LW3WnPTFcLw1oPRjMNmWcOwfwCP8db-_xlWk7R3jgm3JQPxFae9r8XV2LdZcrF1eNPJjPZy-QtRX-z2zh067cTYi_LFgllT21YTWubgCOPQ'),
('Forest Walk Leggings', 'Stretchy and comfortable leggings.', 34.00, 'LEG-FOR-001', 'Leggings', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMLBY68v-Tz3070JR6FactiHN3NzJIz6D-fyjGzHCG7tgs2wIuc-hQtJnZ79c__N6CBkx1oij9aleKRohoVMzm9iLILe24BdPuz5zCui3VSfKZeB6s7Smt653vujhYOjFMDxh5ypTVp_lXyJ94cqYU_GVJdn7TSK4POw-EYnYNqSmPS7lMp_JLtiXoC3RjQYztrFvHLPh8TV81SQlpJRe-cVn5YzilG7WJE-zriCSzfvCuXd5K5Id7n8OM8hO-LoyLizhd0YTY3w');

-- Note: You may need to add an 'image_url' column to the products table if it wasn't in the initial requirements but the frontend uses it. 
-- The initial US-1.1.1 didn't explicitly ask for image_url in the table (it asked for storage), but usually it's stored in the DB too or derived. 
-- I will add a migration for image_url if I missed it.
