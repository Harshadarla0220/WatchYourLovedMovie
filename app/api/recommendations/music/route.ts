export async function POST(req: Request) {
  try {
    const { mood, language = "English" } = await req.json()

    if (!mood) {
      return Response.json({ error: "Mood is required" }, { status: 400 })
    }

    const mockRecommendations = {
      recommendations: [
        {
          title: "Bohemian Rhapsody",
          artist: "Queen",
          genre: "Rock",
          mood: "Epic",
          why: `A legendary track that perfectly captures your ${mood} mood.`,
          energy: "high",
        },
        {
          title: "Imagine",
          artist: "John Lennon",
          genre: "Pop",
          mood: "Inspirational",
          why: `An iconic song that resonates with your ${mood} feeling.`,
          energy: "medium",
        },
        {
          title: "Blinding Lights",
          artist: "The Weeknd",
          genre: "Synthwave",
          mood: "Energetic",
          why: `A modern hit that matches your ${mood} state.`,
          energy: "high",
        },
        {
          title: "Moonlight Sonata",
          artist: "Ludwig van Beethoven",
          genre: "Classical",
          mood: "Peaceful",
          why: `A timeless classic perfect for your ${mood} mood.`,
          energy: "low",
        },
        {
          title: "Hotel California",
          artist: "Eagles",
          genre: "Rock",
          mood: "Mysterious",
          why: `A captivating song that suits your ${mood} feeling.`,
          energy: "medium",
        },
        {
          title: "Levitating",
          artist: "Dua Lipa",
          genre: "Pop",
          mood: "Uplifting",
          why: `A feel-good track ideal for your ${mood} state.`,
          energy: "high",
        },
        {
          title: "Someone Like You",
          artist: "Adele",
          genre: "Pop",
          mood: "Emotional",
          why: `A powerful ballad that matches your ${mood} mood.`,
          energy: "low",
        },
        {
          title: "Stairway to Heaven",
          artist: "Led Zeppelin",
          genre: "Rock",
          mood: "Majestic",
          why: `An epic journey perfect for your ${mood} feeling.`,
          energy: "medium",
        },
      ],
    }

    return Response.json(mockRecommendations)
  } catch (error) {
    console.error("Error generating music recommendations:", error)
    return Response.json({ error: "Failed to generate recommendations" }, { status: 500 })
  }
}
