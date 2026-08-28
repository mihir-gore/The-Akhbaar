
const parseQuestion=(question)=>{
    const text= question.toLowerCase();

    let category=null;
    let search= null;
    let count = 5;

    const countMatch=text.match(/\d+/);
    if(countMatch){
        count=Math.min(Number(countMatch[0]),20)
}
const categories = {
    top: [
        "top",
        "headline",
        "headlines",
        "latest news",
        "breaking",
        "breaking news",
        "trending",
        "top news",
        "trending today",
    ],

    business: [
        "business",
        "market",
        "markets",
        "finance",
        "stock",
        "stocks",
        "economy"
    ],

    crime: [
        "crime",
        "murder",
        "robbery",
        "attack",
        "fraud",
        "police",
        "arrest"
    ],

    domestic: [
        "india",
        "domestic",
        "national"
    ],

    education: [
        "education",
        "school",
        "college",
        "university",
        "exam",
        "neet",
        "jee",
        "upsc"
    ],

    entertainment: [
        "entertainment",
        "movie",
        "movies",
        "bollywood",
        "hollywood",
        "actor",
        "actress",
        "celebrity"
    ],

    environment: [
        "environment",
        "climate",
        "pollution",
        "weather"
    ],

    food: [
        "food",
        "recipe",
        "restaurant",
        "cooking"
    ],

    health: [
        "health",
        "medical",
        "hospital",
        "covid",
        "virus",
        "fitness"
    ],

    lifestyle: [
        "lifestyle",
        "fashion",
        "travel",
        "beauty"
    ],

    politics: [
        "politics",
        "government",
        "election",
        "parliament",
        "minister"
    ],

    science: [
        "science",
        "research",
        "space",
        "nasa"
    ],

    sports: [
        "sports",
        "sport",
        "cricket",
        "football",
        "ipl",
        "tennis",
        "hockey",
        "kabaddi"
    ],

    technology: [
        "technology",
        "tech",
        "ai",
        "artificial intelligence",
        "chatgpt",
        "openai",
        "google",
        "microsoft",
        "apple",
        "startup"
    ],

    tourism: [
        "tourism",
        "travel destination",
        "vacation"
    ],

    world: [
        "world",
        "international",
        "global"
    ]
};

  for (const [cat,keywords] of Object.entries(categories)){
    
        if (keywords.some(keyword => text.includes(keyword))) {

            category = cat;
            break;

        }

  }
  const locationMatch = text.match(
        /\bin\s+(.+?)(?:\s+(?:today|today's|todays|now|latest|news|headlines?|updates?))?$/i
    );

      const location = locationMatch?locationMatch[1].trim(): null;
       if (location) {

        const categoryText = category? category: "";

        search = `${categoryText} ${location}`.trim();
        category = null;
       }

    if (!category && !search) {

        const cleaned = question
            .replace(/\d+/g, "")
            .replace(/latest/gi, "")
            .replace(/news/gi, "")
            .replace(/today/gi, "")
            .replace(/todays/gi, "")
            .replace(/today's/gi, "")
            .replace(/summarize/gi, "")
            .replace(/show me/gi, "")
            .replace(/give me/gi, "")
            .replace(/tell me/gi, "")
            .replace(/updates?/gi, "")
            .replace(/headlines?/gi, "")
            .trim();

        search = cleaned;
    }
  return {
    category,search,count
  }
  
}
module.exports=parseQuestion;