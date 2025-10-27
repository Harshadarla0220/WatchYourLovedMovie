export async function POST(req: Request) {
  try {
    const { mood, language = "English" } = await req.json()

    if (!mood) {
      return Response.json({ error: "Mood is required" }, { status: 400 })
    }

    const mockRecommendations = {
      recommendations: [
        {
          title: "The Shawshank Redemption",
          year: 1994,
          genre: "Drama",
          description:
            "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
          rating: 9.3,
          why: `Perfect for when you're feeling ${mood}. This timeless classic offers hope and inspiration.`,
        },
        {
          title: "Inception",
          year: 2010,
          genre: "Sci-Fi",
          description:
            "A skilled thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
          rating: 8.8,
          why: `A mind-bending adventure that matches your ${mood} mood perfectly.`,
        },
        {
          title: "The Dark Knight",
          year: 2008,
          genre: "Action",
          description:
            "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest tests.",
          rating: 9.0,
          why: `An intense thriller ideal for your current ${mood} state.`,
        },
        {
          title: "Pulp Fiction",
          year: 1994,
          genre: "Crime",
          description:
            "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
          rating: 8.9,
          why: `A stylish and engaging film for your ${mood} mood.`,
        },
        {
          title: "Forrest Gump",
          year: 1994,
          genre: "Drama",
          description:
            "The presidencies of Kennedy and Johnson unfold through the perspective of an Alabama man with an IQ of 75.",
          rating: 8.8,
          why: `An uplifting story that resonates with your ${mood} feeling.`,
        },
        {
          title: "The Matrix",
          year: 1999,
          genre: "Sci-Fi",
          description:
            "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
          rating: 8.7,
          why: `A revolutionary film perfect for your ${mood} mood.`,
        },
        {
          title: "Interstellar",
          year: 2014,
          genre: "Sci-Fi",
          description:
            "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
          rating: 8.6,
          why: `An epic journey that matches your ${mood} state.`,
        },
        {
          title: "The Godfather",
          year: 1972,
          genre: "Crime",
          description:
            "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant youngest son.",
          rating: 9.2,
          why: `A masterpiece that complements your ${mood} mood.`,
        },
      ],
    }

    return Response.json(mockRecommendations)
  } catch (error) {
    console.error("Error generating movie recommendations:", error)
    return Response.json({ error: "Failed to generate recommendations" }, { status: 500 })
  }
}
