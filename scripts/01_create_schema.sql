-- Create profiles table (extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  is_admin boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;

-- RLS policies for profiles
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "profiles_admins_can_select_all" on public.profiles for select using (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);

-- Create products table
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price decimal(10, 2) not null,
  image_url text,
  category text not null,
  stock integer not null default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.products enable row level security;

-- RLS policies for products (everyone can read, only admins can write)
create policy "products_select_all" on public.products for select using (true);
create policy "products_insert_admin" on public.products for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);
create policy "products_update_admin" on public.products for update using (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);
create policy "products_delete_admin" on public.products for delete using (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);

-- Create orders table
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'pending',
  total_amount decimal(10, 2) not null,
  stripe_payment_intent_id text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table public.orders enable row level security;

-- RLS policies for orders
create policy "orders_select_own" on public.orders for select using (auth.uid() = user_id);
create policy "orders_insert_own" on public.orders for insert with check (auth.uid() = user_id);
create policy "orders_update_own" on public.orders for update using (auth.uid() = user_id);
create policy "orders_select_admin" on public.orders for select using (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);
create policy "orders_update_admin" on public.orders for update using (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);

-- Create order_items table
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  quantity integer not null,
  price_at_purchase decimal(10, 2) not null,
  created_at timestamp with time zone default now()
);

alter table public.order_items enable row level security;

-- RLS policies for order_items
create policy "order_items_select_own" on public.order_items for select using (
  exists (select 1 from public.orders where id = order_items.order_id and user_id = auth.uid())
);
create policy "order_items_insert_own" on public.order_items for insert with check (
  exists (select 1 from public.orders where id = order_items.order_id and user_id = auth.uid())
);
create policy "order_items_select_admin" on public.order_items for select using (
  exists (select 1 from public.profiles where id = auth.uid() and is_admin = true)
);

-- Create indexes for performance
create index if not exists idx_products_category on public.products(category);
create index if not exists idx_orders_user_id on public.orders(user_id);
create index if not exists idx_orders_created_at on public.orders(created_at);
create index if not exists idx_order_items_order_id on public.order_items(order_id);
create index if not exists idx_order_items_product_id on public.order_items(product_id);
