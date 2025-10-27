export function createClient() {
  return {
    auth: {
      getUser: async () => {
        return { data: { user: null }, error: null }
      },
    },
    from: (table: string) => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: null }),
        }),
      }),
      insert: async (data: any) => ({ data, error: null }),
      update: async (data: any) => ({ data, error: null }),
      delete: async () => ({ error: null }),
      order: () => ({
        limit: async () => ({ data: [], error: null }),
      }),
    }),
  }
}
