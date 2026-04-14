-- Insert sample products
insert into public.products (name, description, price, category, stock, image_url) values
  (
    'Premium Wireless Headphones',
    'High-quality sound with noise cancellation and 30-hour battery life',
    199.99,
    'Electronics',
    50,
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800'
  ),
  (
    'Ergonomic Mechanical Keyboard',
    'Customizable switches with RGB lighting for professional gaming',
    149.99,
    'Electronics',
    35,
    'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800'
  ),
  (
    '4K Webcam',
    'Crystal clear 4K video for streaming and video calls',
    129.99,
    'Electronics',
    25,
    'https://images.unsplash.com/photo-1587826359523-8cfb525143a4?auto=format&fit=crop&q=80&w=800'
  ),
  (
    'USB-C Hub',
    'All-in-one connectivity solution with 7 ports',
    59.99,
    'Accessories',
    100,
    'https://images.unsplash.com/photo-1544865885-2e4ad44d6032?auto=format&fit=crop&q=80&w=800'
  ),
  (
    'Laptop Stand',
    'Adjustable aluminum stand for better ergonomics',
    44.99,
    'Accessories',
    80,
    'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=800'
  ),
  (
    'Mechanical Mouse',
    'Precision gaming mouse with customizable DPI',
    79.99,
    'Electronics',
    45,
    'https://images.unsplash.com/photo-1527864550417-7fd11b44584f?auto=format&fit=crop&q=80&w=800'
  ),
  (
    'Monitor Light Bar',
    'Reduce eye strain with smart ambient lighting',
    89.99,
    'Accessories',
    60,
    'https://images.unsplash.com/photo-1588610531580-c1dd43c44a7f?auto=format&fit=crop&q=80&w=800'
  ),
  (
    'Portable SSD 1TB',
    'Ultra-fast external storage for backup and transfer',
    119.99,
    'Storage',
    40,
    'https://images.unsplash.com/photo-1618424181497-157f25b6ce53?auto=format&fit=crop&q=80&w=800'
  )
on conflict do nothing;
