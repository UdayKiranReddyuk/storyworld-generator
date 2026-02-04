from fastapi import FastAPI, HTTPException, Depends, status, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator
from pydantic_settings import BaseSettings 
from typing import List, Dict, Any, Optional
import json
import random
from datetime import datetime, timezone
import logging
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from sqlalchemy import create_engine, Column, String, Text, DateTime, Integer
from sqlalchemy.orm import declarative_base, sessionmaker, Session
import os
from dotenv import load_dotenv
#=======
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware 
from pydantic import BaseModel
from typing import List, Dict, Any
import json
import random 
from datetime import datetime 


# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('backend.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Settings
class Settings(BaseSettings):
    model_config = {"env_file": ".env"}
    
    app_name: str = "Storyworld Generator API"
    version: str = "1.0.0"
    debug: bool = False
    cors_origins: List[str] = ["http://localhost:3000", "http://127.0.0.1:3000"]
    host: str = "0.0.0.0"
    port: int = 8000
    rate_limit: str = "10/minute"
    database_url: str = "sqlite:///./storyworld.db"

settings = Settings()

# Database setup
engine = create_engine(settings.database_url, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class StoryWorldDB(Base):
    __tablename__ = "storyworlds"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    summary = Column(Text)
    theme = Column(String)
    genre = Column(String)
    complexity = Column(String)
    characters = Column(Text)  # JSON string
    locations = Column(Text)  # JSON string
    story_arc = Column(Text)  # JSON string
    dialogues = Column(Text)  # JSON string
    art_prompts = Column(Text)  # JSON string
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

# Create tables
Base.metadata.create_all(bind=engine)

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# FastAPI app
app = FastAPI(
    title=settings.app_name,
    version=settings.version,
    debug=settings.debug
)

# Rate limiter
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models with validation
class StoryRequest(BaseModel):
    theme: str = Field(..., min_length=3, max_length=500, description="Theme for the story world")
    genre: str = Field(default="fantasy", description="Genre of the story world")
    complexity: str = Field(default="medium", description="Complexity level")
    
    @field_validator('genre')
    @classmethod
    def validate_genre(cls, v):
        valid_genres = ["fantasy", "sci-fi", "steampunk"]
        if v not in valid_genres:
            raise ValueError(f"Genre must be one of: {', '.join(valid_genres)}")
        return v
    
    @field_validator('complexity')
    @classmethod
    def validate_complexity(cls, v):
        valid_complexities = ["simple", "medium", "complex"]
        if v not in valid_complexities:
            raise ValueError(f"Complexity must be one of: {', '.join(valid_complexities)}")
        return v
    
    @field_validator('theme')
    @classmethod
    def sanitize_theme(cls, v):
        # Basic sanitization
        return v.strip()

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
    id: Optional[int] = None
    title: str
    summary: str
    theme: str
    genre: str
    complexity: str
    characters: List[Character]
    locations: List[Location]
    story_arc: Dict[str, Any]
    dialogues: List[Dict[str, str]]
    art_prompts: List[str]
    created_at: Optional[datetime] = None

# Expanded world building components
WORLD_TEMPLATES = {
    "sci-fi": {
        "settings": [
            "desert planet", "space station", "cyberpunk city", "alien jungle", 
            "ocean world", "asteroid mining colony", "dyson sphere", "nebula outpost",
            "terraformed moon", "generation ship", "orbital habitat", "ice planet"
        ],
        "tech_levels": ["advanced", "post-apocalyptic", "emerging", "lost technology", "biotech", "quantum"],
        "conflicts": [
            "resource war", "AI uprising", "first contact", "corporate domination",
            "interstellar plague", "dimensional breach", "ancient weapon discovery",
            "rebellion against empire", "alien invasion", "time paradox"
        ]
    },
    "fantasy": {
        "settings": [
            "floating islands", "underground cities", "enchanted forest", "crystal mountains",
            "magical academy", "dragon's lair", "cursed kingdom", "elemental planes",
            "ancient library", "fey realm", "dwarven stronghold", "elven sanctuary"
        ],
        "magic_systems": ["elemental", "runic", "blood magic", "nature magic", "arcane", "divine", "necromancy", "illusion"],
        "conflicts": [
            "ancient prophecy", "kingdom war", "magic corruption", "monster invasion",
            "dark lord rising", "artifact hunt", "civil war", "divine intervention",
            "curse spreading", "portal to other worlds opening"
        ]
    },
    "steampunk": {
        "settings": [
            "victorian London", "clockwork city", "aerial kingdoms", "subterranean factories",
            "steam-powered fortress", "airship fleet", "underwater city", "mechanical forest",
            "gearwork metropolis", "aether research facility", "ironclad naval base"
        ],
        "tech_levels": ["steam-powered", "clockwork", "tesla technology", "aether-powered", "hydraulic", "pneumatic"],
        "conflicts": [
            "class struggle", "industrial revolution", "secret societies", "invention race",
            "royal conspiracy", "labor uprising", "foreign espionage", "technological disaster",
            "ancient automaton awakening", "energy crisis"
        ]
    }
}

# Expanded character archetypes
CHARACTER_ARCHETYPES = [
    {"role": "Hero", "traits": ["brave", "determined", "compassionate", "selfless", "resilient"]},
    {"role": "Mentor", "traits": ["wise", "mysterious", "protective", "patient", "experienced"]},
    {"role": "Rogue", "traits": ["clever", "self-serving", "charismatic", "agile", "opportunistic"]},
    {"role": "Scholar", "traits": ["curious", "methodical", "obsessive", "analytical", "bookish"]},
    {"role": "Warrior", "traits": ["strong", "loyal", "disciplined", "honorable", "fierce"]},
    {"role": "Healer", "traits": ["caring", "gentle", "empathetic", "spiritual", "nurturing"]},
    {"role": "Trickster", "traits": ["playful", "unpredictable", "mischievous", "witty", "chaotic"]},
    {"role": "Ruler", "traits": ["commanding", "strategic", "diplomatic", "proud", "responsible"]}
]

# Expanded name pools
FIRST_NAMES = {
    "fantasy": ["Kael", "Lyra", "Orion", "Seraphina", "Darian", "Elara", "Theron", "Zephyra", "Aldric", "Isolde", "Caelum", "Nyx", "Aurelius", "Celestia", "Magnus", "Valerius", "Elysia", "Thaddeus", "Octavia", "Lucian"],
    "sci-fi": ["Zara", "Nova", "Axel", "Vega", "Orion", "Lyra", "Cassian", "Nova", "Rylan", "Kira", "Jax", "Aria", "Zephyr", "Nova", "Atlas", "Luna", "Phoenix", "Echo", "Zenith", "Cosmo"],
    "steampunk": ["Victoria", "Percival", "Arabella", "Cornelius", "Beatrix", "Reginald", "Evangeline", "Theodore", "Adelaide", "Montgomery", "Clementine", "Archibald", "Genevieve", "Barnaby", "Seraphina", "Fitzwilliam", "Octavia", "Pendleton", "Imogen", "Sterling"]
}

LAST_NAMES = {
    "fantasy": ["Stormrider", "Ironwood", "Nightshade", "Brightstar", "Darkwater", "Silverhand", "Frostbane", "Sunweaver", "Moonshadow", "Thornwood", "Starfall", "Dawnbringer", "Ashford", "Winterborne", "Goldleaf", "Ravencrest", "Stormwind", "Fireheart", "Mistwalker", "Stonehaven"],
    "sci-fi": ["Chen", "Vance", "Mercer", "Steele", "Frost", "Nova", "Quinn", "Reeves", "Sterling", "Cross", "Mercer", "Hawke", "Stark", "Vance", "Reeves", "Frost", "Chen", "Quinn", "Cross", "Hawke"],
    "steampunk": ["Cogsworth", "Ironhaven", "Steamgard", "Brassport", "Gearwick", "Windsor", "Sterling", "Copperfield", "Ironside", "Brassington", "Steamworth", "Gearheart", "Copperfield", "Ironwood", "Brassington", "Steamworth", "Gearheart", "Copperfield", "Ironwood", "Brassington"]
}

def get_complexity_multiplier(complexity: str) -> Dict[str, int]:
    """Returns multipliers based on complexity level."""
    multipliers = {
        "simple": {"characters": 3, "locations": 3, "dialogues": 1, "phases": 3},
        "medium": {"characters": 4, "locations": 4, "dialogues": 2, "phases": 4},
        "complex": {"characters": 6, "locations": 6, "dialogues": 3, "phases": 5}
    }
    return multipliers.get(complexity, multipliers["medium"])

def generate_world_name(genre: str) -> str:
    names = {
        "sci-fi": ["Xylos", "Nova Prime", "Cygnus Beta", "Aethelgard", "Veridian", "Zephyrion", "Aurora Prime", "Nebula Haven", "Quantum Reach", "Stellaris", "Cosmos Edge", "Infinity Point", "Nexus Station", "Vortex City", "Pulsar Outpost"],
        "fantasy": ["Eldoria", "Aetheria", "Mythos", "Valerium", "Draconia", "Arcanum", "Celestia", "Mystara", "Etherea", "Sylvanor", "Dragonspire", "Crystalgard", "Shadowmere", "Luminara", "Frosthold"],
        "steampunk": ["Cogsworth", "Ironhaven", "Steamgard", "Brassport", "Gearwick", "Aethermoor", "Steamhaven", "Ironclad", "Brasshaven", "Gearborough", "Steamshire", "Ironport", "Aetherburg", "Cogsworth", "Steamton"]
    }
    return random.choice(names.get(genre, ["Mystara"]))

def generate_character(role: str, genre: str) -> Character:
    first_name = random.choice(FIRST_NAMES.get(genre, FIRST_NAMES["fantasy"]))
    last_name = random.choice(LAST_NAMES.get(genre, LAST_NAMES["fantasy"]))
    name = f"{first_name} {last_name}"
    
    personalities = {
        "Hero": "Driven by a strong moral compass and desire to protect others",
        "Mentor": "Possesses ancient knowledge but harbors hidden secrets",
        "Rogue": "Charming and resourceful, but trusts few people",
        "Scholar": "Obsessed with uncovering truths, sometimes at great cost",
        "Warrior": "Disciplined and loyal, but struggles with inner demons",
        "Healer": "Dedicated to mending wounds and bringing peace to troubled souls",
        "Trickster": "Uses wit and deception to achieve goals, often with unexpected results",
        "Ruler": "Bears the weight of leadership while navigating political intrigue"
    }
    
    motivations = [
        "Seeking redemption for past failures",
        "Protecting a loved one or homeland",
        "Uncovering a powerful ancient secret",
        "Gaining power or knowledge",
        "Fulfilling an ancient prophecy",
        "Avenging a fallen comrade",
        "Finding a place to belong",
        "Proving worth to doubters",
        "Breaking free from destiny",
        "Saving the world from destruction"
    ]
    
    backstories = [
        "Exiled from their homeland for a crime they didn't commit",
        "Last surviving member of a destroyed order or family",
        "Chosen by fate to wield a powerful artifact",
        "Former enemy who has switched sides",
        "Amnesiac with a mysterious past",
        "Born with a rare and dangerous ability",
        "Raised in isolation, now discovering the world",
        "Former noble who lost everything",
        "Apprentice who surpassed their master",
        "Cursed with immortality"
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
            ("The Scrap Yards", "Massive junkyard of starships and technology", "industrial"),
            ("Orbital Station Alpha", "Space station serving as a trade hub", "space station"),
            ("The Quantum Core", "Mysterious facility studying reality manipulation", "research"),
            ("Neon District", "Cyberpunk city sector with holographic advertisements", "city"),
            ("The Void Gate", "Ancient portal to unknown dimensions", "portal")
        ],
        "fantasy": [
            ("The Whispering Woods", "Ancient forest where trees communicate", "forest"),
            ("Dragon's Peak", "Mountain fortress carved by ancient dragons", "mountain"),
            ("The Sunken City", "Ruined metropolis beneath the waves", "ruins"),
            ("The Crystal Caverns", "Underground network of glowing crystals", "caves"),
            ("The Floating Isles", "Islands suspended in the sky by ancient magic", "sky"),
            ("The Enchanted Library", "Infinite repository of magical knowledge", "library"),
            ("The Cursed Swamp", "Dangerous marshland filled with dark creatures", "swamp"),
            ("The Celestial Temple", "Sacred site where gods once walked", "temple")
        ],
        "steampunk": [
            ("The Clockwork City", "Metropolis powered by intricate gears and steam", "city"),
            ("Ironclad Harbor", "Massive port for steam-powered naval vessels", "port"),
            ("The Aether Works", "Factory harnessing mysterious energy sources", "factory"),
            ("Skyward Station", "Aerial docking platform for airships", "station"),
            ("The Underground Foundry", "Massive forge deep beneath the city", "forge"),
            ("Brass Quarter", "District of artisans and inventors", "district"),
            ("Steam Gardens", "Greenhouses powered by geothermal vents", "garden"),
            ("The Gearwork Cathedral", "Grand temple dedicated to the machine god", "temple")
        ]
    }
    
    default_locations = [
        ("Central City", "The main hub of civilization", "city"),
        ("Wild Frontier", "Untamed lands full of danger", "wilderness"),
        ("Ancient Ruins", "Remnants of a lost civilization", "ruins"),
        ("Sacred Site", "Place of great spiritual power", "temple"),
        ("Border Outpost", "Settlement at the edge of known territory", "outpost"),
        ("Hidden Valley", "Secluded area with unique ecosystem", "valley")
    ]
    
    locs = locations_data.get(genre, default_locations)
    return [Location(name=name, description=desc, type=type_) for name, desc, type_ in locs[:count]]

def generate_story_arc(theme: str, genre: str, complexity: str) -> Dict[str, Any]:
    complexity_multiplier = get_complexity_multiplier(complexity)
    phase_count = complexity_multiplier["phases"]
    
    arcs = {
        "sci-fi": {
            "title": "The Quantum Awakening",
            "phases": [
                "Discovery of ancient alien technology",
                "Race against rival factions to control the technology",
                "Uncovering the true purpose of the ancient civilization",
                "Final confrontation and choice about the technology's fate",
                "Aftermath and new galactic order"
            ]
        },
        "fantasy": {
            "title": "The Shattered Crown",
            "phases": [
                "Finding the first fragment of an ancient artifact",
                "Journey to recover remaining fragments from dangerous locations",
                "Learning the true history and purpose of the artifact",
                "Final battle to prevent the artifact from falling into wrong hands",
                "Restoration and the dawn of a new age"
            ]
        },
        "steampunk": {
            "title": "The Clockwork Conspiracy",
            "phases": [
                "Discovery of a secret society's plot",
                "Infiltration of the enemy's stronghold",
                "Uncovering the mastermind behind the conspiracy",
                "Race to stop the catastrophic plan",
                "Rebuilding and reforming society"
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
    
    arc = arcs.get(genre, default_arc)
    return {
        "title": arc["title"],
        "phases": arc["phases"][:phase_count]
    }

def generate_dialogues(characters: List[Character], count: int = 2) -> List[Dict[str, str]]:
    dialogues = []
    dialogue_count = min(count, len(characters))
    
    dialogue_templates = [
        [
            "{char1}: 'I've seen what lies beyond the horizon. It changes a person.'",
            "{char2}: 'Some things shouldn't be seen. Some knowledge corrupts.'",
            "{char1}: 'Is ignorance truly better than terrible truth?'",
            "{char2}: 'When the truth can shatter worlds, yes. Sometimes mercy means forgetting.'"
        ],
        [
            "{char1}: 'The path ahead is treacherous, but necessary.'",
            "{char2}: 'Every path has its cost. Are you willing to pay it?'",
            "{char1}: 'Some prices are worth paying for the greater good.'",
            "{char2}: 'The greater good... a convenient excuse for many things.'"
        ],
        [
            "{char1}: 'We cannot turn back now, not after all we've sacrificed.'",
            "{char2}: 'Perhaps that's exactly why we should reconsider.'",
            "{char1}: 'Doubt is the enemy of progress.'",
            "{char2}: 'And blind faith is the architect of disaster.'"
        ]
    ]
    
    for i in range(dialogue_count):
        char1 = characters[i]
        char2 = characters[(i + 1) % len(characters)]
        
        template = random.choice(dialogue_templates)
        dialogue_lines = [line.format(char1=char1.name, char2=char2.name) for line in template]
        
        dialogues.append({
            "characters": f"{char1.name} and {char2.name}",
            "dialogue": "\n".join(dialogue_lines)
        })
    
    return dialogues

def generate_art_prompts(world: StoryWorld, genre: str, count: int = 5) -> List[str]:
    prompts = []
    
    # World overview prompt
    prompts.append(f"epic {genre} landscape of {world.title}, {world.summary}, dramatic lighting, cinematic, detailed, vibrant colors")
    
    # Character prompts
    for char in world.characters[:min(2, len(world.characters))]:
        prompts.append(f"{char.role} character {char.name} in {world.title}, {genre} setting, {char.personality}, detailed costume, dynamic pose, character portrait")
    
    # Location prompts
    for loc in world.locations[:min(2, len(world.locations))]:
        prompts.append(f"{loc.type} location {loc.name} in {world.title}, {loc.description}, {genre} style, atmospheric, detailed environment")
    
    # Additional prompts based on count
    while len(prompts) < count:
        prompts.append(f"scene from {world.title}, {genre} world, dramatic composition, highly detailed, professional artwork")
    
    return prompts[:count]

@app.post("/generate-world", response_model=StoryWorld, status_code=status.HTTP_201_CREATED)
@limiter.limit(settings.rate_limit)
async def generate_storyworld(request: Request, story_request: StoryRequest, db: Session = Depends(get_db)):
    """
    Generate a new story world based on the provided parameters.
    
    - **theme**: The central theme for the story world (3-500 characters)
    - **genre**: The genre of the story world (fantasy, sci-fi, or steampunk)
    - **complexity**: The complexity level (simple, medium, or complex)
    """
    try:
        logger.info(f"Generating story world: theme='{story_request.theme}', genre='{story_request.genre}', complexity='{story_request.complexity}'")
        
        # Get complexity multipliers
        multipliers = get_complexity_multiplier(story_request.complexity)
        
        # Generate world title and summary
        world_name = generate_world_name(story_request.genre)
        settings_list = WORLD_TEMPLATES.get(story_request.genre, {}).get('settings', ['mysterious land'])
        conflicts_list = WORLD_TEMPLATES.get(story_request.genre, {}).get('conflicts', ['ancient forces clash'])
        summary = f"A {story_request.theme} set in a {random.choice(settings_list)} where {random.choice(conflicts_list)}."
        
        # Generate characters
        characters = []
        roles = [arch["role"] for arch in CHARACTER_ARCHETYPES[:multipliers["characters"]]]
        for role in roles:
            characters.append(generate_character(role, story_request.genre))
        
        # Generate locations
        locations = generate_locations(story_request.genre, multipliers["locations"])
        
        # Generate story arc
        story_arc = generate_story_arc(story_request.theme, story_request.genre, story_request.complexity)
        
        # Generate dialogues
        dialogues = generate_dialogues(characters, multipliers["dialogues"])
        
        # Generate art prompts
        temp_world = StoryWorld(
            title=world_name,
            summary=summary,
            theme=story_request.theme,
            genre=story_request.genre,
            complexity=story_request.complexity,
            characters=characters,
            locations=locations,
            story_arc=story_arc,
            dialogues=dialogues,
            art_prompts=[]
        )
        art_prompts = generate_art_prompts(temp_world, story_request.genre, multipliers["characters"] + multipliers["locations"])
        
        # Create final world object
        world = StoryWorld(
            title=world_name,
            summary=summary,
            theme=story_request.theme,
            genre=story_request.genre,
            complexity=story_request.complexity,
            characters=characters,
            locations=locations,
            story_arc=story_arc,
            dialogues=dialogues,
            art_prompts=art_prompts
        )
        
        # Save to database
        db_world = StoryWorldDB(
            title=world.title,
            summary=world.summary,
            theme=world.theme,
            genre=world.genre,
            complexity=world.complexity,
            characters=json.dumps([char.model_dump() for char in world.characters]),
            locations=json.dumps([loc.model_dump() for loc in world.locations]),
            story_arc=json.dumps(world.story_arc),
            dialogues=json.dumps(world.dialogues),
            art_prompts=json.dumps(world.art_prompts)
        )
        db.add(db_world)
        db.commit()
        db.refresh(db_world)
        
        # Add ID and created_at to response
        world.id = db_world.id
        world.created_at = db_world.created_at
        
        logger.info(f"Successfully generated story world with ID: {db_world.id}")
        return world
        
    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"Error generating world: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while generating the story world. Please try again later."
        )

@app.get("/worlds", response_model=List[StoryWorld])
@limiter.limit("20/minute")
async def get_worlds(request: Request, skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """
    Retrieve a list of generated story worlds.
    
    - **skip**: Number of worlds to skip (pagination)
    - **limit**: Maximum number of worlds to return
    """
    try:
        worlds = db.query(StoryWorldDB).order_by(StoryWorldDB.created_at.desc()).offset(skip).limit(limit).all()
        
        result = []
        for world in worlds:
            result.append(StoryWorld(
                id=world.id,
                title=world.title,
                summary=world.summary,
                theme=world.theme,
                genre=world.genre,
                complexity=world.complexity,
                characters=[Character(**char) for char in json.loads(world.characters)],
                locations=[Location(**loc) for loc in json.loads(world.locations)],
                story_arc=json.loads(world.story_arc),
                dialogues=json.loads(world.dialogues),
                art_prompts=json.loads(world.art_prompts),
                created_at=world.created_at
            ))
        
        return result
        
    except Exception as e:
        logger.error(f"Error retrieving worlds: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while retrieving story worlds."
        )

@app.get("/worlds/{world_id}", response_model=StoryWorld)
@limiter.limit("20/minute")
async def get_world(request: Request, world_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a specific story world by ID.
    """
    try:
        world = db.query(StoryWorldDB).filter(StoryWorldDB.id == world_id).first()
        
        if not world:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Story world not found"
            )
        
        return StoryWorld(
            id=world.id,
            title=world.title,
            summary=world.summary,
            theme=world.theme,
            genre=world.genre,
            complexity=world.complexity,
            characters=[Character(**char) for char in json.loads(world.characters)],
            locations=[Location(**loc) for loc in json.loads(world.locations)],
            story_arc=json.loads(world.story_arc),
            dialogues=json.loads(world.dialogues),
            art_prompts=json.loads(world.art_prompts),
            created_at=world.created_at
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving world {world_id}: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while retrieving the story world."
        )

@app.delete("/worlds/{world_id}", status_code=status.HTTP_204_NO_CONTENT)
@limiter.limit("10/minute")
async def delete_world(request: Request, world_id: int, db: Session = Depends(get_db)):
    """
    Delete a story world by ID.
    """
    try:
        world = db.query(StoryWorldDB).filter(StoryWorldDB.id == world_id).first()
        
        if not world:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Story world not found"
            )
        
        db.delete(world)
        db.commit()
        
        logger.info(f"Deleted story world with ID: {world_id}")
        return None
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting world {world_id}: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while deleting the story world."
        )

@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "message": "Storyworld Generator API is running!",
        "version": settings.version,
        "endpoints": {
            "generate_world": "/generate-world (POST)",
            "get_worlds": "/worlds (GET)",
            "get_world": "/worlds/{id} (GET)",
            "delete_world": "/worlds/{id} (DELETE)"
        }
    }

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}

if __name__ == "__main__":
    import uvicorn
#<<<<<<< HEAD
    logger.info(f"Starting {settings.app_name} v{settings.version}")
    uvicorn.run(app, host=settings.host, port=settings.port)
#=======
    uvicorn.run(app, host="0.0.0.0", port=8000)
#>>>>>>> 81965c19a440e7736f2962c03e7391a639afab7e
