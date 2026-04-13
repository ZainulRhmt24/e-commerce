-- Insert sample products
insert into public.products (name, description, price, category, stock) values
  (
    'Premium Wireless Headphones',
    'High-quality sound with noise cancellation and 30-hour battery life',
    199.99,
    'Electronics',
    50
  ),
  (
    'Ergonomic Mechanical Keyboard',
    'Customizable switches with RGB lighting for professional gaming',
    149.99,
    'Electronics',
    35
  ),
  (
    '4K Webcam',
    'Crystal clear 4K video for streaming and video calls',
    129.99,
    'Electronics',
    25
  ),
  (
    'USB-C Hub',
    'All-in-one connectivity solution with 7 ports',
    59.99,
    'Accessories',
    100
  ),
  (
    'Laptop Stand',
    'Adjustable aluminum stand for better ergonomics',
    44.99,
    'Accessories',
    80
  ),
  (
    'Mechanical Mouse',
    'Precision gaming mouse with customizable DPI',
    79.99,
    'Electronics',
    45
  ),
  (
    'Monitor Light Bar',
    'Reduce eye strain with smart ambient lighting',
    89.99,
    'Accessories',
    60
  ),
  (
    'Portable SSD 1TB',
    'Ultra-fast external storage for backup and transfer',
    119.99,
    'Storage',
    40
  )
on conflict do nothing;
