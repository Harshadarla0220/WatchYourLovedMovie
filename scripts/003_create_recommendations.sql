-- Create recommendations table to store AI-generated recommendations
create table if not exists public.recommendations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  mood text not null,
  recommendation_type text not null check (recommendation_type in ('movie', 'music')),
  items jsonb not null,
  language text default 'English',
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.recommendations enable row level security;

-- Create RLS policies
create policy "recommendations_select_own"
  on public.recommendations for select
  using (auth.uid() = user_id);

create policy "recommendations_insert_own"
  on public.recommendations for insert
  with check (auth.uid() = user_id);

-- Create index for faster queries
create index if not exists recommendations_user_id_idx on public.recommendations(user_id);
create index if not exists recommendations_mood_idx on public.recommendations(mood);
