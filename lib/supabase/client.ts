export function createClient() {
  return {
    auth: {
      signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
        // Mock implementation
        return { error: null, data: { user: { email } } }
      },
      signUp: async ({ email, password, options }: any) => {
        // Mock implementation
        return { error: null, data: { user: { email } } }
      },
      signOut: async () => {
        return { error: null }
      },
      getUser: async () => {
        return { data: { user: null }, error: null }
      },
      onAuthStateChange: (callback: any) => {
        return { data: { subscription: { unsubscribe: () => {} } } }
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
    }),
  }
}
