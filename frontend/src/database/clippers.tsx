import ImJustBait from "../images/IMJUSTBAIT-Thumb.jpg";
import maliworldent from "../images/maliworldent-thumb.jpg";
import Placeholder from "../images/thumbnail.png";
import IJB1 from "../images/ImJustBait_post1.png";
import IJB2 from "../images/Imjustbait_post2.png";
import IJB3 from "../images/Imjustbait_post3.png";
import IJB4 from "../images/Imjustbait_post4.png";
import MWE1 from "../images/MWE1.png";
import MWE2 from "../images/MWE2.png";
import MWE3 from "../images/MWE3.png";
import MWE4 from "../images/MWE4.png";
import { Clipper } from "../model";

const clippers: Clipper[] = [
  {
    id: 1,
    name: "ImJustBait",
    followers: 5000000,
    platform: "Instagram",
    niche: "Entertainment",
    price: 5000,
    thumbnail: ImJustBait,
    images: [IJB1, IJB2, IJB3, IJB4],
    guidelines: [
      "Must be objective popular news",
      "Tone can be humorous, professional or inspirational",
    ],
    reviews: [
      {
        creator: "Rockstar Games",
        stars: 5,
        review: '"The attention to detail, creative transitions, and ability to highlight key moments made each clip feel like a masterpiece. We\'d gladly collaborate again—our worlds have never looked better."'
      },
      {
        creator: "Sports Illustrated",
        stars: 5,
        review: '"Nailed the edits and timing, making my content shine across multiple platforms. My audience engagement skyrocketed! Highly recommend for creators looking to expand their reach."'
      },
      {
        creator: "BohooMan",
        stars: 5,
        review: '"Collaborating with ImJustBait through the Clipper platform was a seamless experience for BoohooMAN. The clips were dynamic, engaging, and drove significant traffic to our platforms. A top-notch partner for content creation—highly recommended!"'
      }
    ]
  },
  {
    id: 2,
    name: "maliworldent",
    followers: 191000,
    platform: "Instagram",
    niche: "Entertainment",
    price: 200,
    thumbnail: maliworldent,
    images: [MWE1, MWE2, MWE3, MWE4],
    guidelines: [
      "Focus on up-and-coming artists",
      "Content should highlight cultural trends",
    ],
    reviews: [
      {
        creator: "Unknown Records",
        stars: 5,
        review: '"Their platform was perfect for launching our new artists. The cultural insight and trend awareness really helped us connect with our target audience."'
      },
      {
        creator: "AfroBeats Daily",
        stars: 4,
        review: '"Great eye for emerging talent and cultural movements. Their promotional strategy helped us discover several breakthrough artists."'
      },
      {
        creator: "BET International",
        stars: 5,
        review: '"maliworldent has consistently delivered quality content that resonates with our audience. Their cultural understanding is unmatched."'
      }
    ]
  },
  {
    id: 3,
    name: "HoustonPlug",
    followers: 850000,
    platform: "Instagram",
    niche: "Entertainment",
    price: 1000,
    thumbnail: Placeholder,
    images: [Placeholder, Placeholder, Placeholder, Placeholder],
    guidelines: [
      "Promote local Houston events",
      "Spotlight trending memes or topics",
    ],
    reviews: [
      {
        creator: "Houston Rockets",
        stars: 5,
        review: '"Perfect platform for reaching our local fanbase. Their community engagement is incredible."'
      },
      {
        creator: "Travis Scott",
        stars: 5,
        review: '"Nobody knows Houston like HoustonPlug. They\'ve been crucial for connecting with the city."'
      },
      {
        creator: "Live Nation Texas",
        stars: 4,
        review: '"Excellent partner for promoting our Houston events. Their local influence is unmatched."'
      }
    ]
  },
  {
    id: 4,
    name: "BasketballVids",
    followers: 2100000,
    platform: "TikTok",
    niche: "Sport",
    price: 2500,
    thumbnail: Placeholder,
    images: [Placeholder, Placeholder, Placeholder, Placeholder],
    guidelines: [
      "Focus on highlight reels",
      "Encourage fan engagement with challenges",
    ],
    reviews: [
      {
        creator: "Nike Basketball",
        stars: 5,
        review: '"Their highlight compilations are next level. Perfect platform for showcasing our athletes."'
      },
      {
        creator: "NBA G League",
        stars: 5,
        review: '"Exceptional at spotlighting rising talent. Their content consistently drives engagement."'
      },
      {
        creator: "Wilson Sports",
        stars: 4,
        review: '"Great partner for our basketball equipment launches. They know how to create buzz."'
      }
    ]
  },
  {
    id: 5,
    name: "TechDeals",
    followers: 450000,
    platform: "Twitter",
    niche: "Technology",
    price: 800,
    thumbnail: Placeholder,
    images: [Placeholder, Placeholder, Placeholder, Placeholder],
    guidelines: [
      "Share time-sensitive deals",
      "Emphasize budget-friendly tech solutions",
    ],
    reviews: [
      {
        creator: "NewEgg",
        stars: 5,
        review: '"Their flash deal promotions consistently drive significant traffic and conversions."'
      },
      {
        creator: "Logitech",
        stars: 4,
        review: '"Excellent platform for reaching budget-conscious tech enthusiasts."'
      },
      {
        creator: "Best Buy",
        stars: 5,
        review: '"Perfect partner for time-sensitive promotions. Their audience is highly engaged."'
      }
    ]
  },
  {
    id: 6,
    name: "GamingDaily",
    followers: 1500000,
    platform: "YouTube",
    niche: "Gaming",
    price: 3000,
    thumbnail: Placeholder,
    images: [Placeholder, Placeholder, Placeholder, Placeholder],
    guidelines: [
      "Highlight trending games",
      "Content should include engaging commentary",
    ],
    reviews: [
      {
        creator: "Xbox Game Studios",
        stars: 5,
        review: '"Their gaming commentary and community engagement are outstanding. Perfect for game launches."'
      },
      {
        creator: "Razer",
        stars: 5,
        review: '"Excellent platform for reaching dedicated gamers. Their content quality is consistently high."'
      },
      {
        creator: "Epic Games",
        stars: 4,
        review: '"Great partner for game promotions. Their audience insights help drive successful campaigns."'
      }
    ]
  },
  {
    id: 7,
    name: "FitnessInspo",
    followers: 750000,
    platform: "Instagram",
    niche: "Fitness",
    price: 1200,
    thumbnail: Placeholder,
    images: [Placeholder, Placeholder, Placeholder, Placeholder],
    guidelines: [
      "Focus on quick workout tips",
      "Include motivational messaging",
    ],
    reviews: [
      {
        creator: "Gymshark",
        stars: 5,
        review: '"Their motivational content style perfectly aligns with our brand. Excellent engagement rates."'
      },
      {
        creator: "MyProtein",
        stars: 4,
        review: '"Great platform for reaching fitness enthusiasts. Their quick workout tips format works well."'
      },
      {
        creator: "Under Armour",
        stars: 5,
        review: '"Perfect partner for our fitness gear launches. They understand the athletic mindset."'
      }
    ]
  },
  {
    id: 8,
    name: "FoodieHeaven",
    followers: 980000,
    platform: "TikTok",
    niche: "Food",
    price: 1500,
    thumbnail: Placeholder,
    images: [Placeholder, Placeholder, Placeholder, Placeholder],
    guidelines: [
      "Showcase unique recipes",
      "Highlight street food and local cuisines",
    ],
    reviews: [
      {
        creator: "HelloFresh",
        stars: 5,
        review: '"Their recipe content drives incredible engagement. Perfect for showcasing our meal kits."'
      },
      {
        creator: "Tasty",
        stars: 5,
        review: '"Excellent collaborator for recipe content. Their production quality is consistently high."'
      },
      {
        creator: "DoorDash",
        stars: 4,
        review: '"Great partner for local restaurant promotions. Their food content really drives orders."'
      }
    ]
  },
  {
    id: 9,
    name: "StyleSpotter",
    followers: 620000,
    platform: "Instagram",
    niche: "Fashion",
    price: 900,
    thumbnail: Placeholder,
    images: [Placeholder, Placeholder, Placeholder, Placeholder],
    guidelines: [
      "Focus on seasonal trends",
      "Promote sustainable fashion choices",
    ],
    reviews: [
      {
        creator: "ASOS",
        stars: 5,
        review: '"Their trend forecasting and sustainable fashion focus align perfectly with our brand values."'
      },
      {
        creator: "H&M",
        stars: 4,
        review: '"Excellent platform for reaching fashion-conscious consumers. Great seasonal content."'
      },
      {
        creator: "Patagonia",
        stars: 5,
        review: '"Perfect partner for promoting sustainable fashion. Their audience is highly engaged."'
      }
    ]
  },
  {
    id: 10,
    name: "ComedyClips",
    followers: 3200000,
    platform: "TikTok",
    niche: "Entertainment",
    price: 4000,
    thumbnail: Placeholder,
    images: [Placeholder, Placeholder, Placeholder, Placeholder],
    guidelines: [
      "Content must be short and relatable",
      "Highlight viral comedic moments",
    ],
    reviews: [
      {
        creator: "Netflix Is A Joke",
        stars: 5,
        review: '"Their viral comedy content consistently delivers. Perfect for promoting our comedy specials."'
      },
      {
        creator: "Comedy Central",
        stars: 5,
        review: '"Excellent platform for reaching younger comedy fans. Their content curation is spot-on."'
      },
      {
        creator: "Just For Laughs",
        stars: 4,
        review: '"Great partner for promoting comedy events. They know what makes content go viral."'
      }
    ]
  },
  {
    id: 11,
    name: "PetLovers",
    followers: 890000,
    platform: "Instagram",
    niche: "Pets",
    price: 1100,
    thumbnail: Placeholder,
    images: [Placeholder, Placeholder, Placeholder, Placeholder],
    guidelines: [
      "Focus on cute or funny pet videos",
      "Promote adoption and pet care tips",
    ],
    reviews: [
      {
        creator: "Chewy",
        stars: 5,
        review: '"Their pet content drives incredible engagement. Perfect for our product launches."'
      },
      {
        creator: "ASPCA",
        stars: 5,
        review: '"Excellent platform for promoting pet adoption. Their audience is truly passionate."'
      },
      {
        creator: "Petco",
        stars: 4,
        review: '"Great partner for pet care awareness campaigns. Their content really connects."'
      }
    ]
  },
  {
    id: 12,
    name: "CrepCheck",
    followers: 1700000,
    platform: "Twitter",
    niche: "Fashion",
    price: 2000,
    thumbnail: Placeholder,
    images: [Placeholder, Placeholder, Placeholder, Placeholder],
    guidelines: [
      "Highlight exclusive sneaker drops",
      "Emphasize streetwear culture",
    ],
    reviews: [
      {
        creator: "StockX",
        stars: 5,
        review: '"Their sneaker drop coverage is unmatched. Perfect for driving hype and sales."'
      },
      {
        creator: "GOAT",
        stars: 4,
        review: '"Excellent platform for reaching sneakerheads. Their streetwear knowledge is extensive."'
      },
      {
        creator: "Nike SNKRS",
        stars: 5,
        review: '"Perfect partner for limited releases. They know how to build anticipation."'
      }
    ]
  },
  {
    id: 13,
    name: "StreetCulture",
    followers: 550000,
    platform: "Instagram",
    niche: "Entertainment",
    price: 800,
    thumbnail: Placeholder,
    images: [Placeholder, Placeholder, Placeholder, Placeholder],
    guidelines: [
      "Spotlight graffiti art",
      "Cover urban music and style trends",
    ],
    reviews: [
      {
        creator: "Supreme",
        stars: 5,
        review: '"Their urban culture coverage is authentic. Perfect for reaching our core audience."'
      },
      {
        creator: "Complex",
        stars: 4,
        review: '"Excellent platform for street art and music content. Their cultural insight is valuable."'
      },
      {
        creator: "Def Jam",
        stars: 5,
        review: '"Great partner for urban music promotion. They really understand the culture."'
      }
    ]
  },
  {
    id: 14,
    name: "TravelVibes",
    followers: 1200000,
    platform: "Instagram",
    niche: "Travel",
    price: 1800,
    thumbnail: Placeholder,
    images: [Placeholder, Placeholder, Placeholder, Placeholder],
    guidelines: ["Showcase hidden travel gems", "Focus on eco-friendly travel"],
    reviews: [
      {
        creator: "Airbnb",
        stars: 5,
        review: '"Their hidden gems content drives significant bookings. Perfect for showcasing unique stays."'
      },
      {
        creator: "Lonely Planet",
        stars: 4,
        review: '"Excellent platform for eco-friendly travel content. Their audience is very engaged."'
      },
      {
        creator: "Expedia",
        stars: 5,
        review: '"Perfect partner for travel promotions. Their content inspires wanderlust."'
      }
    ]
  },
  {
    id: 15,
    name: "ArtDaily",
    followers: 420000,
    platform: "Instagram",
    niche: "Art",
    price: 600,
    thumbnail: Placeholder,
    images: [Placeholder, Placeholder, Placeholder, Placeholder],
    guidelines: ["Spotlight emerging artists", "Highlight diverse art forms"],
    reviews: [
      {
        creator: "Artsy",
        stars: 5,
        review: '"Their emerging artist coverage is fantastic. Perfect for discovering new talent."'
      },
      {
        creator: "Saatchi Art",
        stars: 4,
        review: '"Excellent platform for diverse art forms. Their curation is thoughtful."'
      },
      {
        creator: "Art Basel",
        stars: 5,
        review: '"Great partner for promoting art events. Their audience is highly engaged."'
      }
    ]
  },
  {
    id: 16,
    name: "BeautyCentral",
    followers: 880000,
    platform: "YouTube",
    niche: "Beauty",
    price: 1400,
    thumbnail: Placeholder,
    images: [Placeholder, Placeholder, Placeholder, Placeholder],
    guidelines: [
      "Focus on affordable beauty tips",
      "Include tutorials on trending looks",
    ],
    reviews: [
      {
        creator: "Sephora",
        stars: 5,
        review: '"Their beauty tutorials drive significant sales. Perfect for product launches."'
      },
      {
        creator: "NYX Cosmetics",
        stars: 4,
        review: '"Excellent platform for affordable beauty content. Their tutorials are very accessible."'
      },
      {
        creator: "Morphe",
        stars: 5,
        review: '"Perfect partner for makeup tutorials. Their content really connects with our audience."'
      }
    ]
  },
  {
    id: 17,
    name: "SportsHighlight",
    followers: 2500000,
    platform: "Twitter",
    niche: "Sport",
    price: 3000,
    thumbnail: Placeholder,
    images: [Placeholder, Placeholder, Placeholder, Placeholder],
    guidelines: [
      "Cover major sports events",
      "Include engaging stats or polls",
    ],
    reviews: [
      {
        creator: "ESPN",
        stars: 5,
        review: '"Their sports coverage drives incredible engagement. Perfect for major events."'
      },
      {
        creator: "Nike",
        stars: 4,
        review: '"Excellent platform for sports content. Their highlight reels are outstanding."'
      },
      {
        creator: "Bleacher Report",
        stars: 5,
        review: '"Great partner for sports coverage. Their stats and polls really engage fans."'
      }
    ]
  },
  {
    id: 18,
    name: "MovieBuzz",
    followers: 930000,
    platform: "Instagram",
    niche: "Entertainment",
    price: 1300,
    thumbnail: Placeholder,
    images: [Placeholder, Placeholder, Placeholder, Placeholder],
    guidelines: ["Review trending movies", "Promote upcoming releases"],
    reviews: [
      {
        creator: "A24",
        stars: 5,
        review: '"Their movie coverage drives incredible buzz. Perfect for indie film promotion."'
      },
      {
        creator: "IMAX",
        stars: 4,
        review: '"Excellent platform for movie promotion. Their reviews really influence audiences."'
      },
      {
        creator: "Universal Pictures",
        stars: 5,
        review: '"Perfect partner for movie launches. Their content builds great anticipation."'
      }
    ]
  },
  {
    id: 19,
    name: "TechReviews",
    followers: 670000,
    platform: "YouTube",
    niche: "Technology",
    price: 1000,
    thumbnail: Placeholder,
    images: [Placeholder, Placeholder, Placeholder, Placeholder],
    guidelines: ["Review new gadgets", "Provide in-depth comparisons"],
    reviews: [
      {
        creator: "Samsung",
        stars: 5,
        review: '"Their in-depth reviews are incredibly thorough. Perfect for product launches."'
      },
      {
        creator: "OnePlus",
        stars: 4,
        review: '"Excellent platform for tech comparisons. Their analysis is always objective."'
      },
      {
        creator: "Intel",
        stars: 5,
        review: '"Great partner for product reviews. Their technical knowledge is impressive."'
      }
    ]
    
  },
  {
    id: 20,
    name: "AutomotiveWorld",
    followers: 580000,
    platform: "Instagram",
    niche: "Automotive",
    price: 900,
    thumbnail: Placeholder,
    images: [Placeholder, Placeholder, Placeholder, Placeholder],
    guidelines: [
      "Showcase innovative car designs",
      "Highlight eco-friendly vehicle options",
    ],
    reviews: [
      {
        creator: "Tesla",
        stars: 5,
        review: '"Their EV content drives significant interest. Perfect for showcasing innovation."'
      },
      {
        creator: "BMW",
        stars: 4,
        review: '"Excellent platform for automotive design content. Their audience is very engaged."'
      },
      {
        creator: "Toyota",
        stars: 5,
        review: '"Perfect partner for eco-friendly vehicle promotion. Their content really connects."'
      }
    ]
  },
];

export default clippers;
