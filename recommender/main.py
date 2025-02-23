from dotenv import load_dotenv
import os
import logging
from fastapi import Depends, FastAPI, HTTPException, Security, status
from fastapi.security import APIKeyHeader
from pyBKT.models import Model, Roster
from pydantic import BaseModel
from typing import Literal
from pathlib import Path
import numpy as np
import multiprocessing, pickle, re, time
import pyrebase

# Conditional environment loading:
# In development, load the .env file if it exists.
if os.environ.get("NODE_ENV", "development") == "development":
    env_path = Path(__file__).parent.parent / "neuracraft" / ".env"
    if env_path.exists():
        load_dotenv(dotenv_path=env_path)
        logging.info(f"Loaded environment variables from {env_path}")
    else:
        logging.warning(f".env file not found at {env_path}, continuing without loading.")
else:
    logging.info("Production mode: skipping loading .env file")

# Middleware to require a valid API key
api_key_header = APIKeyHeader(name="access_token", auto_error=False)

async def get_api_key(api_key_header: str = Security(api_key_header)) -> str:
    if api_key_header == os.environ.get("RECOMMENDER_API_KEY"):
        return api_key_header
    else:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid or missing API Key",
        )

logging.basicConfig(level=logging.DEBUG, format="%(asctime)s - %(levelname)s - %(message)s")

# Firebase persistent storage configurations
config = {
    "apiKey": "AIzaSyADucIvsdCF0VNw8aTJoZySzpm22c7_f78",
    "authDomain": "neuracraft-1df48.firebaseapp.com",
    "databaseURL": "https://neuracraft-1df48-default-rtdb.firebaseio.com",
    "projectId": "neuracraft-1df48",
    "storageBucket": "neuracraft-1df48.appspot.com",
    "messagingSenderId": "476418799575",
    "appId": "1:476418799575:web:2749b1f6deffac80f5bd92",
    "measurementId": "G-68PLPZQPHM"
}

firebase_storage = pyrebase.initialize_app(config)
storage = firebase_storage.storage()

# Multiprocessing lock for thread safety
lock = multiprocessing.Lock()

# List of all skills (topics)
ALL_SKILLS = [
    "data-structures", "algorithms", "operating-systems", "networking",
    "database-systems", "software-engineering", "web-development",
    "object-oriented-programming", "machine-learning", "cloud-computing",
    "cybersecurity", "mobile-development", "data-analytics", "software-testing",
    "devops", "design-patterns", "algorithms-optimization",
    "advanced-database-systems", "distributed-systems", "artificial-intelligence",
    "network-security", "blockchain", "user-experience-design", "ethical-hacking",
    "software-architecture", "quantum-computing", "big-data"
]


def get_model() -> Model:
    """
    Loads the trained model from a pickle file in storage.
    """
    try:
        model = Model()
        model_path = "computer_science_bktmodel.pkl"

        # Check if the model file exists locally
        if not os.path.exists(model_path):
            logging.debug("[INFO] Local model not found, downloading from Firebase...")
            storage.child(model_path).download(model_path)

        # Load the model
        model.load(model_path)
        logging.debug(f"Model loaded successfully: {model}")
        return model

    except Exception as e:
        logging.error(f"Failed to load model: {e}")
        raise RuntimeError("Failed to initialize the BKT model.")


def get_roster_model(model: Model) -> Roster:
    """
    Loads the roster file from the /models directory or Firebase and enhances it with additional features.
    """
    try:
        roster_path = os.path.join("models", "computer_science_roster_model.pkl")

        # Check if the roster file exists locally
        if os.path.exists(roster_path):
            logging.debug(f"Loading roster model from {roster_path}")
            with open(roster_path, "rb") as handle:
                roster: Roster = pickle.load(handle)

            # Validate the loaded roster
            if not isinstance(roster, Roster):
                logging.warning("Loaded roster is not a valid Roster object, initializing new roster")
                raise ValueError("Invalid Roster object")
        else:
            logging.debug("[INFO] Local roster model not found, downloading from Firebase...")
            storage.child("computer_science_roster_model.pkl").download("computer_science_roster_model.pkl")
            with open("computer_science_roster_model.pkl", "rb") as handle:
                roster: Roster = pickle.load(handle)

            # Validate the loaded roster
            if not isinstance(roster, Roster):
                logging.warning("Downloaded roster is not a valid Roster object, initializing new roster")
                raise ValueError("Invalid Roster object")

        # Set the model for the roster
        roster.set_model(model)

        # Enhance the roster with additional features
        roster.mastery_threshold = 0.95  # Set mastery threshold
        roster.review_threshold = 0.3    # Set review threshold

        # Define skill dependencies
        roster.skill_dependencies = {
            "algorithms": ["data-structures"],
            "advanced-database-systems": ["database-systems"],
            "distributed-systems": ["operating-systems", "networking"],
            "machine-learning": ["data-structures", "algorithms"],
            "artificial-intelligence": ["machine-learning"],
            "network-security": ["networking", "cybersecurity"],
            "ethical-hacking": ["cybersecurity"],
            "software-architecture": ["software-engineering", "design-patterns"],
            "quantum-computing": ["algorithms", "networking"],
        }

        # Initialize tracking for consecutive responses
        roster.consecutive_responses = {}

        logging.debug("Roster model set and enhanced successfully")
        logging.debug(f"Roster: {roster}")

        return roster

    except Exception as e:
        logging.error(f"Failed to load roster model: {e}")
        logging.info("Initializing new empty roster")
        return Roster(students=[], skills=ALL_SKILLS, model=model)


def get_all_topics() -> list[str]:
    """
    Attempts to read topics from a local seed_data.ts file.
    If not found, falls back to the predefined ALL_SKILLS list.
    """
    current_dir = Path(__file__).parent
    seed_file_path = current_dir / "seed_data.ts"
    if not seed_file_path.exists():
        logging.error(f"seed_data.ts not found at expected path: {seed_file_path}. Falling back to ALL_SKILLS.")
        return ALL_SKILLS

    logging.debug(f"Reading topics from {seed_file_path}")
    try:
        with open(seed_file_path, "r", encoding="utf-8") as f:
            text = f.read()
            topics = re.findall(r"topicSlug: .*", text)
            topics = {topic.replace('topicSlug: "', "").rstrip('",') for topic in topics}
        return list(topics)
    except UnicodeDecodeError:
        logging.warning("Attempting to read file with UTF-8-SIG encoding")
        with open(seed_file_path, "r", encoding="utf-8-sig") as f:
            text = f.read()
            topics = re.findall(r"topicSlug: .*", text)
            topics = {topic.replace('topicSlug: "', "").rstrip('",') for topic in topics}
        return list(topics)


class Topics(BaseModel):
    student_id: str
    topics: dict[str, Literal["0", "1"]]


app = FastAPI()


@app.on_event("startup")
async def startup_event() -> None:
    """
    Initializes the model and roster during startup.
    """
    try:
        # Load the BKT model
        app.state.model = get_model()

        # Load the roster model
        app.state.roster = get_roster_model(app.state.model)

        # Validate the roster
        if not hasattr(app.state.roster, "skill_rosters"):
            raise AttributeError("Roster initialization failed - missing skill_rosters")

        logging.debug("[STARTUP] Model and Roster initialized successfully")

    except Exception as e:
        logging.error(f"[STARTUP ERROR] Failed to initialize: {e}")
        # Initialize empty roster as fallback
        app.state.model = Model()  # Initialize a default model
        app.state.roster = Roster(students=[], skills=ALL_SKILLS, model=app.state.model)
        logging.debug("[STARTUP] Initialized empty roster as fallback")


@app.get("/", status_code=status.HTTP_200_OK)
def home() -> dict[str, str]:
    """
    Homepage
    """
    return {"Status": "The recommender microservice is running!"}


@app.get(
    "/get-all-mastery-probs",
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(get_api_key)],
)
def get_all_mastery_probabilities() -> dict[str, dict[str, float]]:
    """
    Fetches mastery probabilities for all students for each topic.
    """
    with lock:
        return {
            topic: app.state.roster.get_mastery_probs(topic)
            for topic in app.state.roster.skill_rosters
        }


@app.post(
    "/students-topic/{student_ids}/{topic}",
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(get_api_key)],
)
def add_students_to_topic(student_ids: str, topic: str) -> dict[str, bool]:
    """
    Adds comma-separated student IDs for 1 topic, ignoring those already in the Roster.
    """
    with lock:
        filtered_student_ids = [s.strip() for s in student_ids.split(",")
                                if s.strip() not in app.state.roster.skill_rosters[topic].students]

        if topic not in app.state.roster.skill_rosters:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Invalid topic name",
            )

        app.state.roster.add_students(topic, filtered_student_ids)
        save_roster_model()
        return {"Created": True}


@app.delete(
    "/students-topic/{student_ids}/{topic}",
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(get_api_key)],
)
def remove_students_from_topic(student_ids: str, topic: str) -> dict[str, bool]:
    """
    Removes comma-separated student IDs for 1 topic, ignoring those not in the Roster.
    """
    with lock:
        filtered_student_ids = [s.strip() for s in student_ids.split(",")
                                if s.strip() in app.state.roster.skill_rosters[topic].students]

        if topic not in app.state.roster.skill_rosters:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Invalid topic name",
            )

        app.state.roster.remove_students(topic, filtered_student_ids)
        save_roster_model()
        return {"Deleted": True}


@app.delete(
    "/student-all-topics/{student_id}",
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(get_api_key)],
)
def remove_student_from_all_topics(student_id: str) -> dict[str, bool]:
    """
    Removes 1 student for ALL topics.
    """
    with lock:
        for topic in app.state.roster.skill_rosters:
            if student_id in app.state.roster.skill_rosters[topic].students:
                app.state.roster.remove_students(topic, [student_id])
        save_roster_model()
        return {"Deleted": True}


@app.get(
    "/get-mastery/{student_id}/{topic}",
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(get_api_key)],
)
def get_mastery_of_student(student_id: str, topic: str) -> dict[str, float]:
    """
    Fetches mastery probability for a particular student for a topic.
    """
    with lock:
        if topic not in app.state.roster.skill_rosters:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Invalid topic name",
            )
        elif student_id not in app.state.roster.skill_rosters[topic].students:
            app.state.roster.add_students(topic, [student_id])

        mastery: float = app.state.roster.get_mastery_prob(topic, student_id)
        if mastery == -1:
            mastery = 0

        save_roster_model()
        return {"Mastery": mastery}


@app.get(
    "/get-all/{student_id}",
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(get_api_key)],
)
def get_all_masteries_of_student(student_id: str) -> dict[str, dict[str, float]]:
    """
    Fetches the mastery probability for a particular student for ALL topics.
    """
    with lock:
        mastery_dict: dict[str, float] = {}
        for topic in app.state.roster.skill_rosters:
            if student_id not in app.state.roster.skill_rosters[topic].students:
                app.state.roster.add_students(topic, [student_id])
            mastery = app.state.roster.get_mastery_prob(topic, student_id)
            mastery_dict[topic] = 0 if mastery == -1 else mastery
        save_roster_model()
        return {"Mastery": mastery_dict}


@app.patch(
    "/update-state/{student_id}/{topic}/{correct}",
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(get_api_key)],
)
def update_state_of_student(student_id: str, topic: str, correct: Literal["0", "1"]) -> dict[str, bool]:
    """
    Updates state of a particular student for a topic given one response.
    """
    with lock:
        if not hasattr(app.state, "roster") or not hasattr(app.state.roster, "skill_rosters"):
            logging.error("[ERROR] Roster not properly initialized, reinitializing...")
            app.state.roster = get_roster_model(app.state.model)

        if topic not in app.state.roster.skill_rosters:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Invalid topic name",
            )
        elif student_id not in app.state.roster.skill_rosters[topic].students:
            app.state.roster.add_students(topic, [student_id])

        if correct == "0":
            for _ in range(5):
                app.state.roster.update_state(topic, student_id, np.array([0]))
        else:
            app.state.roster.update_state(topic, student_id, np.array([int(correct)]))

        updated_mastery = app.state.roster.get_mastery_prob(topic, student_id)
        if updated_mastery >= 0.99:
            app.state.roster.remove_students(topic, [student_id])
            app.state.roster.add_students(topic, [student_id])
            for _ in range(8):
                app.state.roster.update_state(topic, student_id, np.array([0]))

        save_roster_model()
        return {"Updated": True}


@app.patch(
    "/update-multiple/{student_id}",
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(get_api_key)],
)
def update_multiple_states_of_student(student_id: str, topics: Topics) -> dict[str, bool]:
    """
    Updates state of a particular student for all topics given one response.
    """
    with lock:
        for topic in topics.topics:
            if topic not in app.state.roster.skill_rosters:
                raise HTTPException(
                    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                    detail=f"Invalid topic name: {topic}",
                )
            elif student_id not in app.state.roster.skill_rosters[topic].students:
                app.state.roster.add_students(topic, [student_id])

            if topics.topics[topic] == "0":
                app.state.roster.update_state(topic, student_id, np.array([0]))
            else:
                app.state.roster.update_state(topic, student_id, np.array([int(topics.topics[topic])]))

            updated_mastery = app.state.roster.get_mastery_prob(topic, student_id)
            if updated_mastery >= 0.99:
                app.state.roster.remove_students(topic, [student_id])
                app.state.roster.add_students(topic, [student_id])
                for _ in range(3):
                    app.state.roster.update_state(topic, student_id, np.array([0]))

        save_roster_model()
        return {"Updated": True}


@app.post(
    "/reset-roster",
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(get_api_key)],
)
def reset_roster() -> None:
    """
    Reinitialises an empty Roster and wipes out previous Roster.
    """
    with lock:
        topics = get_all_topics()
        app.state.roster = Roster(students=[], skills=topics, model=app.state.model)
        save_roster_model()


@app.post(
    "/save-roster",
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(get_api_key)],
)
async def save_roster() -> None:
    """
    Saves the Roster model.
    """
    with lock:
        save_roster_model()


@app.on_event("shutdown")
async def shutdown_event() -> None:
    """
    Saves the Roster model on shutdown.
    """
    with lock:
        save_roster_model()


def save_roster_model() -> None:
    """
    Saves the Roster model to disk and persistent storage.
    """
    try:
        roster_path = os.path.join("models", "computer_science_roster_model.pkl")
        os.makedirs(os.path.dirname(roster_path), exist_ok=True)
        with open(roster_path, "wb") as handle:
            pickle.dump(app.state.roster, handle, protocol=pickle.HIGHEST_PROTOCOL)
        storage.child("computer_science_roster_model.pkl").put(roster_path)
        logging.debug(f"[{time.strftime('%D %H:%M:%S')}] ROSTER MODEL SAVED")
    except Exception as e:
        logging.error(f"Failed to save roster model: {e}")


class RecommendationResponse(BaseModel):
    recommended_topic: str
    mastery_level: float
    all_masteries: dict[str, float]
    recommendation_reason: str


@app.get(
    "/recommend-topic/{student_id}",
    response_model=RecommendationResponse,
    dependencies=[Depends(get_api_key)],
)
def recommend_topic(student_id: str) -> dict:
    """
    Recommend topic with lowest mastery level from all available topics.
    """
    with lock:
        all_topics = ALL_SKILLS
        for topic in all_topics:
            if student_id not in app.state.roster.skill_rosters[topic].students:
                app.state.roster.add_students(topic, [student_id])
        masteries = {
            topic: app.state.roster.get_mastery_prob(topic, student_id)
            for topic in all_topics
        }
        recommended_topic = min(masteries, key=masteries.get)
        min_mastery = masteries[recommended_topic]
        if min_mastery == 0:
            reason = "New fundamental topic to start learning"
        elif min_mastery < 0.3:
            reason = "Critical area needing immediate improvement"
        elif min_mastery < 0.6:
            reason = "Core topic requiring practice"
        else:
            reason = "Advanced topic for mastery reinforcement"
        save_roster_model()
        return {
            "recommended_topic": recommended_topic,
            "mastery_level": min_mastery,
            "all_masteries": masteries,
            "recommendation_reason": reason
        }