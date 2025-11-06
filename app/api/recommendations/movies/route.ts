export async function POST(req: Request) {
  try {
    const { mood, language = "English" } = await req.json()

    if (!mood) {
      return Response.json({ error: "Mood is required" }, { status: 400 })
    }

    // Mood-specific movie recommendations
    const moodMovies: Record<
      string,
      Array<{
        title: string
        year: number
        genre: string
        description: string
        rating: number
        why: string
      }>
    > = {
      good: [
        {
          title: "Forrest Gump",
          year: 1994,
          genre: "Drama",
          description:
            "The presidencies of Kennedy and Johnson unfold through the perspective of an Alabama man with an IQ of 75.",
          rating: 8.8,
          why: "An uplifting and heartwarming story that celebrates life's beautiful moments.",
        },
        {
          title: "The Pursuit of Happyness",
          year: 2006,
          genre: "Drama",
          description:
            "A struggling salesman takes custody of his son as he's poised to begin a life-changing professional endeavor.",
          rating: 8.0,
          why: "An inspiring tale of perseverance and triumph that matches your positive mood.",
        },
        {
          title: "Life is Beautiful",
          year: 1997,
          genre: "Drama",
          description:
            "A Jewish Italian bookshop owner uses imagination and humor to shield his son from the horrors of a concentration camp.",
          rating: 8.6,
          why: "A beautiful film about finding joy even in difficult times.",
        },
        {
          title: "Amélie",
          year: 2001,
          genre: "Fantasy",
          description:
            "A shy waitress decides to change the lives of those around her for the better, while struggling with her own isolation.",
          rating: 8.3,
          why: "A whimsical and delightful film perfect for your cheerful mood.",
        },
        {
          title: "Paddington 2",
          year: 2017,
          genre: "Comedy",
          description:
            "Paddington, now happily settled with the Browns, picks up a series of odd jobs to buy the perfect present for his Aunt Lucy.",
          rating: 8.0,
          why: "A charming and joyful film that spreads happiness.",
        },
        {
          title: "The Grand Budapest Hotel",
          year: 2014,
          genre: "Comedy",
          description:
            "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy.",
          rating: 8.1,
          why: "A visually stunning and delightful film full of charm.",
        },
        {
          title: "Coco",
          year: 2017,
          genre: "Animation",
          description:
            "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead.",
          rating: 8.4,
          why: "A vibrant and heartwarming animated film celebrating family and passion.",
        },
        {
          title: "Sing",
          year: 2016,
          genre: "Animation",
          description:
            "In a city of humanoid animals, a timid theater owner must save his theater by producing the world's greatest singing competition.",
          rating: 7.2,
          why: "A fun and uplifting animated film full of music and joy.",
        },
      ],
      love: [
        {
          title: "The Notebook",
          year: 2004,
          genre: "Romance",
          description:
            "A poor yet passionate man falls in love with a rich young woman, giving her a sense of freedom.",
          rating: 7.8,
          why: "A timeless romance that celebrates deep, enduring love.",
        },
        {
          title: "Pride and Prejudice",
          year: 2005,
          genre: "Romance",
          description:
            "Elizabeth Bennet, the protagonist of the book, refuses to accept the first proposal she receives and instead waits for true love.",
          rating: 7.8,
          why: "A classic love story about finding your perfect match.",
        },
        {
          title: "Titanic",
          year: 1997,
          genre: "Romance",
          description:
            "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
          rating: 7.8,
          why: "An epic romance that transcends class and circumstance.",
        },
        {
          title: "La La Land",
          year: 2016,
          genre: "Romance",
          description:
            "While navigating their careers in Los Angeles, a pianist and an actress fall in love while pursuing their dreams.",
          rating: 8.0,
          why: "A beautiful modern romance with stunning visuals and music.",
        },
        {
          title: "Eternal Sunshine of the Spotless Mind",
          year: 2004,
          genre: "Romance",
          description:
            "An estranged couple undergoes a procedure to erase each other from their memories. But as the procedure progresses, the man realizes he still loves her.",
          rating: 8.3,
          why: "A profound exploration of love and memory.",
        },
        {
          title: "Breakfast at Tiffany's",
          year: 1961,
          genre: "Romance",
          description: "A young woman moves to New York and falls in love with a writer.",
          rating: 7.8,
          why: "A classic romantic film with timeless charm.",
        },
        {
          title: "Crazy, Stupid, Love",
          year: 2011,
          genre: "Romance",
          description: "A long-married couple's relationship is put to the test when they encounter younger people.",
          rating: 7.4,
          why: "A fun and heartfelt film about love in all its forms.",
        },
        {
          title: "The Time Traveler's Wife",
          year: 2009,
          genre: "Romance",
          description:
            "The story of a man with involuntary time travel ability and his wife, and how they cope with this phenomenon.",
          rating: 7.0,
          why: "A unique love story that transcends time itself.",
        },
      ],
      stressed: [
        {
          title: "The Shawshank Redemption",
          year: 1994,
          genre: "Drama",
          description:
            "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
          rating: 9.3,
          why: "A calming film about hope and perseverance that eases stress.",
        },
        {
          title: "Spirited Away",
          year: 2001,
          genre: "Animation",
          description:
            "During her family's move, a sullen girl wanders into a world ruled by gods, witches, and spirits.",
          rating: 8.6,
          why: "A soothing and magical film that transports you away from stress.",
        },
        {
          title: "Peaceful Warrior",
          year: 2006,
          genre: "Drama",
          description: "A gymnast is visited by a mysterious man and is led to discover the path to enlightenment.",
          rating: 7.2,
          why: "An inspiring film about finding inner peace.",
        },
        {
          title: "Moonlight",
          year: 2016,
          genre: "Drama",
          description:
            "The life of a black South Floridian gay man is divided into three chapters, each named after a different period of the day.",
          rating: 7.4,
          why: "A meditative and beautiful film that soothes the soul.",
        },
        {
          title: "Garden State",
          year: 2004,
          genre: "Drama",
          description: "A quietly troubled young man returns home for an old friend's wedding after years away.",
          rating: 7.3,
          why: "A gentle film about finding yourself and letting go of stress.",
        },
        {
          title: "Lost in Translation",
          year: 2003,
          genre: "Drama",
          description: "An aging American actor and a young woman form a connection while isolated in Tokyo.",
          rating: 7.7,
          why: "A contemplative and peaceful film perfect for relaxation.",
        },
        {
          title: "Amélie",
          year: 2001,
          genre: "Fantasy",
          description: "A shy waitress decides to change the lives of those around her for the better.",
          rating: 8.3,
          why: "A whimsical film that brings comfort and joy.",
        },
        {
          title: "The Secret of Kells",
          year: 2009,
          genre: "Animation",
          description: "A young boy in a medieval Irish village must help save an ancient magical book.",
          rating: 7.9,
          why: "A visually stunning and calming animated film.",
        },
      ],
      thrilling: [
        {
          title: "The Dark Knight",
          year: 2008,
          genre: "Action",
          description:
            "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest tests.",
          rating: 9.0,
          why: "An intense and thrilling superhero masterpiece.",
        },
        {
          title: "Inception",
          year: 2010,
          genre: "Sci-Fi",
          description:
            "A skilled thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
          rating: 8.8,
          why: "A mind-bending thriller that keeps you on the edge of your seat.",
        },
        {
          title: "Mad Max: Fury Road",
          year: 2015,
          genre: "Action",
          description:
            "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland.",
          rating: 8.1,
          why: "A non-stop adrenaline-pumping action spectacle.",
        },
        {
          title: "Mission: Impossible - Fallout",
          year: 2018,
          genre: "Action",
          description:
            "Ethan Hunt and his IMF team must track down a dangerous package while being hunted by a disavowed agent.",
          rating: 7.7,
          why: "An exhilarating spy thriller with incredible stunts.",
        },
        {
          title: "John Wick",
          year: 2014,
          genre: "Action",
          description:
            "An ex-hit-man comes out of retirement to track down the gangsters that took everything from him.",
          rating: 7.4,
          why: "A stylish and thrilling action film.",
        },
        {
          title: "The Matrix",
          year: 1999,
          genre: "Sci-Fi",
          description:
            "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
          rating: 8.7,
          why: "A revolutionary and thrilling sci-fi action film.",
        },
        {
          title: "Interstellar",
          year: 2014,
          genre: "Sci-Fi",
          description:
            "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
          rating: 8.6,
          why: "An epic and thrilling space adventure.",
        },
        {
          title: "Twisters",
          year: 2024,
          genre: "Action",
          description: "A former storm chaser is drawn back into the field to face her past and new dangers.",
          rating: 7.0,
          why: "An action-packed thriller with stunning visuals.",
        },
      ],
      horror: [
        {
          title: "The Shining",
          year: 1980,
          genre: "Horror",
          description: "A family isolated in a snowbound hotel descends into madness and violence.",
          rating: 8.4,
          why: "A psychological horror masterpiece that will keep you terrified.",
        },
        {
          title: "Hereditary",
          year: 2018,
          genre: "Horror",
          description: "A family is haunted by tragic events and dark secrets after the death of their grandmother.",
          rating: 7.6,
          why: "A deeply unsettling and terrifying horror film.",
        },
        {
          title: "The Exorcist",
          year: 1973,
          genre: "Horror",
          description: "When a young girl is possessed by a mysterious entity, two priests must save her soul.",
          rating: 8.1,
          why: "A classic horror film that defined the genre.",
        },
        {
          title: "A Quiet Place",
          year: 2018,
          genre: "Horror",
          description: "A family must live in silence to avoid mysterious creatures that hunt by sound.",
          rating: 7.5,
          why: "A thrilling and innovative horror film.",
        },
        {
          title: "The Ring",
          year: 2002,
          genre: "Horror",
          description: "A journalist must uncover the mystery of a cursed videotape that kills anyone who watches it.",
          rating: 7.1,
          why: "A terrifying supernatural horror film.",
        },
        {
          title: "Insidious",
          year: 2010,
          genre: "Horror",
          description:
            "A family experiences terrifying supernatural events after their son falls into a mysterious coma.",
          rating: 6.8,
          why: "A creepy and atmospheric horror film.",
        },
        {
          title: "The Conjuring",
          year: 2013,
          genre: "Horror",
          description:
            "Paranormal investigators work to help a family terrorized by a dark presence in their farmhouse.",
          rating: 7.5,
          why: "A well-crafted supernatural horror film.",
        },
        {
          title: "Sinister",
          year: 2012,
          genre: "Horror",
          description:
            "A true crime writer discovers a box of home movies that plunge his family into a nightmarish mystery.",
          rating: 7.6,
          why: "A disturbing and terrifying horror film.",
        },
      ],
      business: [
        {
          title: "The Wolf of Wall Street",
          year: 2013,
          genre: "Drama",
          description:
            "A charismatic fraudster and his close associates attempt to execute the ambitious scam of the decade.",
          rating: 8.2,
          why: "A gripping film about ambition and the business world.",
        },
        {
          title: "Moneyball",
          year: 2011,
          genre: "Drama",
          description: "A baseball team's general manager uses statistical analysis to assemble a competitive team.",
          rating: 7.6,
          why: "An inspiring film about innovation in business.",
        },
        {
          title: "The Social Network",
          year: 2010,
          genre: "Drama",
          description: "The founding of Facebook and the lawsuits that followed.",
          rating: 7.7,
          why: "A fast-paced film about entrepreneurship and ambition.",
        },
        {
          title: "Glengarry Glen Ross",
          year: 1992,
          genre: "Drama",
          description: "An examination of the machinations behind the scenes at a real estate office.",
          rating: 7.8,
          why: "A classic film about sales and business competition.",
        },
        {
          title: "The Founder",
          year: 2016,
          genre: "Drama",
          description:
            "The story of Ray Kroc, a salesman who turned McDonald's into the world's most successful restaurant business.",
          rating: 7.2,
          why: "An inspiring film about building a business empire.",
        },
        {
          title: "Barbarians at the Gate",
          year: 1993,
          genre: "Drama",
          description: "A chronicle of the power struggle and subsequent takeover of RJR Nabisco.",
          rating: 7.4,
          why: "A compelling film about corporate takeovers.",
        },
        {
          title: "Enron: Smartest Guys in the Room",
          year: 2005,
          genre: "Documentary",
          description: "A documentary about the rise and fall of Enron and its executives.",
          rating: 7.8,
          why: "An eye-opening film about corporate fraud.",
        },
        {
          title: "The Big Short",
          year: 2015,
          genre: "Drama",
          description: "Four denizens in the world of high-finance predict the credit and housing crisis.",
          rating: 8.2,
          why: "A brilliant film about the financial crisis.",
        },
      ],
      nostalgic: [
        {
          title: "Forrest Gump",
          year: 1994,
          genre: "Drama",
          description: "The presidencies of Kennedy and Johnson unfold through the perspective of an Alabama man.",
          rating: 8.8,
          why: "A nostalgic journey through American history.",
        },
        {
          title: "The Breakfast Club",
          year: 1985,
          genre: "Drama",
          description:
            "Five high school students meet in Saturday detention and discover they have more in common than they thought.",
          rating: 7.9,
          why: "A classic film that captures the essence of youth.",
        },
        {
          title: "Back to the Future",
          year: 1985,
          genre: "Sci-Fi",
          description: "A teenager is accidentally sent 30 years into the past in a time-traveling DeLorean.",
          rating: 8.5,
          why: "A timeless adventure that celebrates nostalgia.",
        },
        {
          title: "Stand by Me",
          year: 1986,
          genre: "Drama",
          description: "A group of friends embark on a journey to find the dead body of a boy.",
          rating: 8.6,
          why: "A beautiful film about childhood friendships.",
        },
        {
          title: "The Goonies",
          year: 1985,
          genre: "Adventure",
          description: "A group of kids go on an adventure to find a pirate's treasure.",
          rating: 7.7,
          why: "A fun and nostalgic adventure film.",
        },
        {
          title: "E.T. the Extra-Terrestrial",
          year: 1982,
          genre: "Sci-Fi",
          description: "A boy befriends an alien who has landed on Earth.",
          rating: 7.8,
          why: "A timeless classic that evokes childhood wonder.",
        },
        {
          title: "Ghostbusters",
          year: 1984,
          genre: "Comedy",
          description: "A group of scientists start a ghost-catching business in New York City.",
          rating: 7.8,
          why: "A fun and nostalgic comedy classic.",
        },
        {
          title: "Ferris Bueller's Day Off",
          year: 1986,
          genre: "Comedy",
          description: "A high school student decides to skip school and have an adventure in Chicago.",
          rating: 7.8,
          why: "A beloved film that captures the spirit of youth.",
        },
      ],
      curious: [
        {
          title: "Inception",
          year: 2010,
          genre: "Sci-Fi",
          description: "A skilled thief explores the world of dreams and reality.",
          rating: 8.8,
          why: "A mind-bending film that challenges your perception of reality.",
        },
        {
          title: "Interstellar",
          year: 2014,
          genre: "Sci-Fi",
          description: "A team of explorers travel through a wormhole in space.",
          rating: 8.6,
          why: "An epic exploration of space and human potential.",
        },
        {
          title: "The Matrix",
          year: 1999,
          genre: "Sci-Fi",
          description: "A computer hacker learns about the true nature of his reality.",
          rating: 8.7,
          why: "A revolutionary film that questions reality itself.",
        },
        {
          title: "Arrival",
          year: 2016,
          genre: "Sci-Fi",
          description: "A linguist works to communicate with alien visitors.",
          rating: 7.9,
          why: "A thought-provoking film about communication and understanding.",
        },
        {
          title: "Primer",
          year: 2004,
          genre: "Sci-Fi",
          description: "Engineers accidentally discover a way to travel through time.",
          rating: 6.9,
          why: "A complex and intriguing film that rewards curiosity.",
        },
        {
          title: "Memento",
          year: 2000,
          genre: "Thriller",
          description: "A man with short-term memory loss attempts to track down his wife's murderer.",
          rating: 8.4,
          why: "A puzzle-like film that keeps you guessing.",
        },
        {
          title: "Donnie Darko",
          year: 2001,
          genre: "Sci-Fi",
          description: "A troubled teenager is visited by a mysterious figure in a rabbit suit.",
          rating: 7.9,
          why: "A mysterious and thought-provoking film.",
        },
        {
          title: "Mulholland Drive",
          year: 2001,
          genre: "Drama",
          description: "An aspiring actress and an amnesiac woman form a connection in Los Angeles.",
          rating: 8.0,
          why: "A complex and intriguing film about identity and reality.",
        },
      ],
      adventurous: [
        {
          title: "Indiana Jones and the Raiders of the Lost Ark",
          year: 1981,
          genre: "Adventure",
          description: "An adventurer and archaeologist seeks the legendary Ark of the Covenant.",
          rating: 8.4,
          why: "A classic adventure film full of excitement and discovery.",
        },
        {
          title: "The Lord of the Rings: The Fellowship of the Ring",
          year: 2001,
          genre: "Fantasy",
          description: "A hobbit embarks on a quest to destroy a powerful ring.",
          rating: 8.8,
          why: "An epic adventure that transports you to another world.",
        },
        {
          title: "Avatar",
          year: 2009,
          genre: "Sci-Fi",
          description: "A paraplegic Marine dispatched to the moon Pandora on a unique mission.",
          rating: 7.8,
          why: "A visually stunning adventure on an alien world.",
        },
        {
          title: "Jurassic Park",
          year: 1993,
          genre: "Adventure",
          description: "A pragmatic paleontologist tours an almost complete theme park.",
          rating: 8.1,
          why: "A thrilling adventure with dinosaurs and wonder.",
        },
        {
          title: "The Mummy",
          year: 1999,
          genre: "Adventure",
          description: "An adventurer and a librarian search for the legendary city of Hamunaptra.",
          rating: 7.1,
          why: "A fun and adventurous film full of action.",
        },
        {
          title: "Pirates of the Caribbean: The Curse of the Black Pearl",
          year: 2003,
          genre: "Adventure",
          description: "A pirate and a blacksmith join forces to rescue a governor's daughter.",
          rating: 8.1,
          why: "A swashbuckling adventure full of fun and excitement.",
        },
        {
          title: "Tomb Raider",
          year: 2018,
          genre: "Adventure",
          description: "An adventurer embarks on a dangerous mission to find her father.",
          rating: 6.5,
          why: "An action-packed adventure film.",
        },
        {
          title: "Uncharted",
          year: 2022,
          genre: "Adventure",
          description: "A treasure hunter and a con artist search for a legendary treasure.",
          rating: 6.3,
          why: "An adventurous film full of action and discovery.",
        },
      ],
    }

    const recommendations = moodMovies[mood.toLowerCase()] || moodMovies.good

    return Response.json({ recommendations })
  } catch (error) {
    console.error("Error generating movie recommendations:", error)
    return Response.json({ error: "Failed to generate recommendations" }, { status: 500 })
  }
}
