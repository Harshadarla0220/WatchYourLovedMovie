-- Create favorites table for movies and music
create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  item_id text not null,
  item_type text not null check (item_type in ('movie', 'music')),
  title text not null,
  image_url text,
  metadata jsonb,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.favorites enable row level security;

-- Create RLS policies
create policy "favorites_select_own"
  on public.favorites for select
  using (auth.uid() = user_id);

create policy "favorites_insert_own"
  on public.favorites for insert
  with check (auth.uid() = user_id);

create policy "favorites_delete_own"
  on public.favorites for delete
  using (auth.uid() = user_id);

-- Create index for faster queries
create index if not exists favorites_user_id_idx on public.favorites(user_id);
create index if not exists favorites_item_type_idx on public.favorites(item_type);
