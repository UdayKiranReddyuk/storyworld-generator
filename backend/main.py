from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import json
import random 
from datetime import datetime

app = FastAPI(title="Storyworld Generator API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class StoryRequest(BaseModel):
    theme: str
    genre: str = "fantasy"
    complexity: str = "medium"

class Character(BaseModel):
    name: str
    role: str
    personality: str
    motivation: str
    backstory: str

class Location(BaseModel):
    name: str
    description: str
    type: str

class StoryWorld(BaseModel):
    title: str
    summary: str
    characters: List[Character]
    locations: List[Location]
    story_arc: Dict[str, Any]
    dialogues: List[Dict[str, str]]
    art_prompts: List[str]

# World building components
WORLD_TEMPLATES = {
    "sci-fi": {
        "settings": ["desert planet", "space station", "cyberpunk city", "alien jungle", "ocean world"],
        "tech_levels": ["advanced", "post-apocalyptic", "emerging", "lost technology"],
        "conflicts": ["resource war", "AI uprising", "first contact", "corporate domination"]
    },
    "fantasy": {
        "settings": ["floating islands", "underground cities", "enchanted forest", "crystal mountains", "magical academy"],
        "magic_systems": ["elemental", "runic", "blood magic", "nature magic", "arcane"],
        "conflicts": ["ancient prophecy", "kingdom war", "magic corruption", "monster invasion"]
    },
    "steampunk": {
        "settings": ["victorian London", "clockwork city", "aerial kingdoms", "subterranean factories"],
        "tech_levels": ["steam-powered", "clockwork", "tesla technology", "aether-powered"],
        "conflicts": ["class struggle", "industrial revolution", "secret societies", "invention race"]
    }
}

CHARACTER_ARCHETYPES = [
    {"role": "Hero", "traits": ["brave", "determined", "compassionate"]},
    {"role": "Mentor", "traits": ["wise", "mysterious", "protective"]},
    {"role": "Rogue", "traits": ["clever", "self-serving", "charismatic"]},
    {"role": "Scholar", "traits": ["curious", "methodical", "obsessive"]},
    {"role": "Warrior", "traits": ["strong", "loyal", "disciplined"]}
]

def generate_world_name(genre: str) -> str:
    names = {
        "sci-fi": ["Xylos", "Nova Prime", "Cygnus Beta", "Aethelgard", "Veridian"],
        "fantasy": ["Eldoria", "Aetheria", "Mythos", "Valerium", "Draconia"],
        "steampunk": ["Cogsworth", "Ironhaven", "Steamgard", "Brassport", "Gearwick"]
    }
    return random.choice(names.get(genre, ["Mystara"]))

def generate_character(role: str, genre: str) -> Character:
    first_names = ["Kael", "Lyra", "Orion", "Seraphina", "Darian", "Elara", "Theron", "Zephyra"]
    last_names = ["Stormrider", "Ironwood", "Nightshade", "Brightstar", "Darkwater", "Silverhand"]
    
    name = f"{random.choice(first_names)} {random.choice(last_names)}"
    
    personalities = {
        "Hero": "Driven by a strong moral compass and desire to protect others",
        "Mentor": "Possesses ancient knowledge but harbors hidden secrets",
        "Rogue": "Charming and resourceful, but trusts few people",
        "Scholar": "Obsessed with uncovering truths, sometimes at great cost",
        "Warrior": "Disciplined and loyal, but struggles with inner demons"
    }
    
    motivations = [
        "Seeking redemption for past failures",
        "Protecting a loved one or homeland",
        "Uncovering a powerful ancient secret",
        "Gaining power or knowledge",
        "Fulfilling an ancient prophecy"
    ]
    
    backstories = [
        "Exiled from their homeland for a crime they didn't commit",
        "Last surviving member of a destroyed order or family",
        "Chosen by fate to wield a powerful artifact",
        "Former enemy who has switched sides",
        "Amnesiac with a mysterious past"
    ]
    
    return Character(
        name=name,
        role=role,
        personality=personalities.get(role, "Complex and multifaceted"),
        motivation=random.choice(motivations),
        backstory=random.choice(backstories)
    )

def generate_locations(genre: str, count: int = 4) -> List[Location]:
    locations_data = {
        "sci-fi": [
            ("The Crystal Dunes", "Vast desert with glowing crystalline formations", "desert"),
            ("Neo-Acropolis", "Floating city built on ancient ruins", "city"),
            ("The Bio-Domes", "Artificial ecosystems containing alien flora", "research"),
            ("The Scrap Yards", "Massive junkyard of starships and technology", "industrial")
        ],
        "fantasy": [
            ("The Whispering Woods", "Ancient forest where trees communicate", "forest"),
            ("Dragon's Peak", "Mountain fortress carved by ancient dragons", "mountain"),
            ("The Sunken City", "Ruined metropolis beneath the waves", "ruins"),
            ("The Crystal Caverns", "Underground network of glowing crystals", "caves")
        ]
    }
    
    default_locations = [
        ("Central City", "The main hub of civilization", "city"),
        ("Wild Frontier", "Untamed lands full of danger", "wilderness"),
        ("Ancient Ruins", "Remnants of a lost civilization", "ruins"),
        ("Sacred Site", "Place of great spiritual power", "temple")
    ]
    
    locs = locations_data.get(genre, default_locations)
    return [Location(name=name, description=desc, type=type_) for name, desc, type_ in locs[:count]]

def generate_story_arc(theme: str, genre: str) -> Dict[str, Any]:
    arcs = {
        "sci-fi": {
            "title": "The Quantum Awakening",
            "phases": [
                "Discovery of ancient alien technology",
                "Race against rival factions to control the technology",
                "Uncovering the true purpose of the ancient civilization",
                "Final confrontation and choice about the technology's fate"
            ]
        },
        "fantasy": {
            "title": "The Shattered Crown",
            "phases": [
                "Finding the first fragment of an ancient artifact",
                "Journey to recover remaining fragments from dangerous locations",
                "Learning the true history and purpose of the artifact",
                "Final battle to prevent the artifact from falling into wrong hands"
            ]
        }
    }
    
    default_arc = {
        "title": "The Great Journey",
        "phases": [
            "The call to adventure and gathering allies",
            "Journey through dangerous lands facing trials",
            "Confrontation with the main antagonist",
            "Resolution and return transformed"
        ]
    }
    
    return arcs.get(genre, default_arc)

def generate_dialogues(characters: List[Character]) -> List[Dict[str, str]]:
    dialogues = []
    for i in range(min(2, len(characters))):
        char1 = characters[i]
        char2 = characters[(i + 1) % len(characters)]
        
        dialogue_lines = [
            f"{char1.name}: 'I've seen what lies beyond the horizon. It changes a person.'",
            f"{char2.name}: 'Some things shouldn't be seen. Some knowledge corrupts.'",
            f"{char1.name}: 'Is ignorance truly better than terrible truth?'",
            f"{char2.name}: 'When the truth can shatter worlds, yes. Sometimes mercy means forgetting.'"
        ]
        
        dialogues.append({
            "characters": f"{char1.name} and {char2.name}",
            "dialogue": "\n".join(dialogue_lines)
        })
    
    return dialogues

def generate_art_prompts(world: StoryWorld, genre: str) -> List[str]:
    prompts = []
    
    # World overview prompt
    prompts.append(f"epic {genre} landscape of {world.title}, {world.summary}, dramatic lighting, cinematic, detailed, vibrant colors")
    
    # Character prompts
    for char in world.characters[:2]:
        prompts.append(f"{char.role} character {char.name} in {world.title}, {genre} setting, {char.personality}, detailed costume, dynamic pose, character portrait")
    
    # Location prompts
    for loc in world.locations[:2]:
        prompts.append(f"{loc.type} location {loc.name} in {world.title}, {loc.description}, {genre} style, atmospheric, detailed environment")
    
    return prompts

@app.post("/generate-world", response_model=StoryWorld)
async def generate_storyworld(request: StoryRequest):
    try:
        # Generate world title and summary
        world_name = generate_world_name(request.genre)
        summary = f"A {request.theme} set in a {random.choice(WORLD_TEMPLATES.get(request.genre, {}).get('settings', ['mysterious land']))} where {random.choice(WORLD_TEMPLATES.get(request.genre, {}).get('conflicts', ['ancient forces clash']))}."
        
        # Generate characters
        characters = []
        roles = [arch["role"] for arch in CHARACTER_ARCHETYPES[:4]]
        for role in roles:
            characters.append(generate_character(role, request.genre))
        
        # Generate locations
        locations = generate_locations(request.genre)
        
        # Generate story arc
        story_arc = generate_story_arc(request.theme, request.genre)
        
        # Generate dialogues
        dialogues = generate_dialogues(characters)
        
        # Generate art prompts
        temp_world = StoryWorld(
            title=world_name,
            summary=summary,
            characters=characters,
            locations=locations,
            story_arc=story_arc,
            dialogues=dialogues,
            art_prompts=[]
        )
        art_prompts = generate_art_prompts(temp_world, request.genre)
        
        return StoryWorld(
            title=world_name,
            summary=summary,
            characters=characters,
            locations=locations,
            story_arc=story_arc,
            dialogues=dialogues,
            art_prompts=art_prompts
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating world: {str(e)}")

@app.get("/")
async def root():
    return {"message": "Storyworld Generator API is running!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
