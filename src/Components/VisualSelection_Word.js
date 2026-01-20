import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import ProcessBar from "./ProcessBar.js";
import VoteContext from "../Contexts/VoteContext";
import "./VisualSelection_Picture.css";
import { saveCorrectSelections, getVisualRepresentation, saveBallotSelections } from '../API/Voter.js';

// Static list of 500 words
const allWords = [
  "Boyfriend", "Princess", "Queen", "Sister", "Wife", "Asia", "Brother", "Ox", "Husband", "Girl",
  "Daughter", "Woman", "Japan", "London", "Student", "Actress", "Baby", "Lady", "Lover", "Police",
  "Teacher", "Waitress", "Cod", "Egypt", "Friar", "Infant", "Prince", "Uncle", "Arm", "Bison",
  "College", "Europe", "France", "Meat", "Puppy", "Sibling", "Chauffeur", "Child", "Horse", "Lion",
  "Nurse", "Orange", "Parent", "Sheriff", "Spouse", "Army", "Ankle", "Apple", "Beef", "Breast",
  "Cousin", "Dolphin", "Female", "Friend", "Leg", "Sphinx", "Champagne", "Cowboy", "Colonel", "Airport",
  "Bacon", "Dentist", "Crevice", "Farmer", "Fireman", "Gazelle", "Grizzly", "Igloo", "Inmate", "Kitchen",
  "Knife", "Lake", "Leopard", "Lily", "Mailman", "Oyster", "Preacher", "Rifle", "Scalpel", "Skirt",
  "Stallion", "Thief", "Vagrant", "Wrist", "Zebra", "Dress", "Basement", "Crib", "Convict", "Actor",
  "Bunny", "Butcher", "Dorm", "Crown", "Fox", "Gangster", "Garden", "Hiker", "Ketchup", "Palace",
  "Peach", "Playground", "Sausage", "Summit", "Tombstone", "Tortoise", "Venus", "Yacht", "Airplane", "Chemist",
  "Dragon", "Church", "Cattle", "Beaver", "Cabin", "Finger", "Foot", "Forest", "Highway", "Island",
  "Judge", "Lace", "Lipstick", "Lizard", "Mattres", "Mummy", "Pail", "Penguin", "Pilot", "Pizza",
  "Plaid", "Quail", "River", "Seafood", "Shark", "Sidewalk", "Snake", "Throne", "Transplant", "Trout",
  "Tutu", "Typist", "Widow", "Blouse", "Box", "Banker", "Banquet", "Donkey", "Denim", "Cook",
  "Blade", "Cabbage", "Carriage", "Casket", "Belly", "Elbow", "Fruit", "Hand", "Hostess", "Hound",
  "Jeans", "Lagoon", "Lettuce", "Mars", "Mustard", "Nightgown", "Omelet", "Onion", "Picnic", "Pistol",
  "Rabbit", "Rod", "Scallop", "Shirt", "Shorts", "Silk", "Skillet", "Slime", "Swimmer", "Viking",
  "Waiter", "Window", "Chipmunk", "Cookbook", "Crab", "Apron", "Ceiling", "Burglar", "Bug", "Carrot",
  "Daisy", "Dancer", "Clam", "Cottage", "Diner", "Driver", "Dust", "Fireplace", "Glass", "Grave",
  "Gravel", "Hawk", "Honey", "Human", "Jelly", "Jury", "Lightning", "Milk", "Missile", "Outlaw",
  "Panther", "Parsley", "Partner", "Poison", "Pork", "Robber", "Rug", "Server", "Shoulder", "Slug",
  "Sunset", "Sword", "Taxi", "Velvet", "Marine", "Blackboard", "Couch", "Cellar", "Chest", "Canyon",
  "Bullet", "Brandy", "Citrus", "Cobra", "Eagle", "Flower", "Football", "Goblin", "Grape", "Guard",
  "Gymnast", "Iceberg", "Lapel", "Lava", "Liver", "Marsh", "Monster", "Nomad", "Office", "Orchid",
  "Pigeon", "Pliers", "Pluto", "Pupil", "Salad", "Salt", "Sandwich", "Seal", "Sparrow", "Tunnel",
  "Turkey", "Turtle", "Ghetto", "Salmon", "Chapel", "Country", "Bank", "Body", "Diver", "Beast",
  "Buggy", "Forehead", "Fragrance", "Garlic", "Gavel", "Hatchet", "Heart", "Hero", "Jungle", "Kidney",
  "Luggage", "Pebble", "Perch", "Relish", "Seagull", "Snail", "Star", "Stream", "Suspect", "Swamp",
  "Table", "Temple", "Tourist", "Truck", "Trombone", "Umpire", "Valley", "Atom", "Cafe", "Camel",
  "Brick", "Briefcase", "Coffee", "Doughnut", "Coin", "Climber", "Fleet", "Grease", "Knapsack", "Ladder",
  "Lunch", "Mammal", "Mister", "Money", "Mop", "Ointment", "Plate", "Plaza", "Possum", "Pudding",
  "Rocket", "Servant", "Shortcake", "Space", "Stomach", "Stone", "Sunrise", "Tile", "Tractor", "Turnip",
  "Twig", "Victim", "Wardrobe", "Xerox", "Jello", "Cashew", "Dresser", "Agent", "Antler", "Atlas",
  "Author", "Bathtub", "Award", "Barrel", "Bureau", "Bouquet", "Clothes", "Custard", "Dashboard", "Cyclone",
  "Expert", "Flask", "Fungus", "Handbag", "Icing", "Juggler", "Lodge", "Mailbox", "Mildew", "Motel",
  "Necklace", "Patrol", "Peanut", "Pepper", "Pimple", "Radish", "Raft", "Razor", "Rust", "Scotch",
  "Spider", "Stove", "Subway", "Termite", "Trench", "Tweezers", "Ulcer", "Whiskers", "World", "Cashier",
  "Beaker", "Comet", "Board", "Dime", "Blockade", "Cupboard", "Curtain", "Crater", "Canal", "Cocktail",
  "Cloud", "Candy", "Flesh", "Headband", "Hedge", "Leader", "Machine", "Outdoors", "Paper", "Proton",
  "Puddle", "Robin", "Rooster", "Scissors", "Shelf", "Slope", "Softball", "Spoon", "Tart", "Worker",
  "Yolk", "Zipper", "Balloon", "Donor", "Concert", "Creature", "Cocoon", "Brook", "Banjo", "Cross",
  "Bike", "Dustpan", "Freckle", "Freezer", "Globe", "Grill", "Ground", "Idol", "Market", "Medal",
  "Neutron", "Notebook", "Outfit", "Ozone", "Package", "Pasta", "Pastry", "Patient", "Pecan", "Poet",
  "Portrait", "Saddle", "Scarecrow", "Scarf", "Sculpture", "Snack", "Spool", "Tribe", "Twister", "Wagon",
  "Wasp", "Wrench", "Backbone", "Bucket", "Blender", "Crayon", "Badge", "Barley", "Captive", "Empire",
  "Gallon", "Glove", "Helmet", "Hood", "Hornet", "Journal", "Kleenex", "Loft", "Lumber", "Mask",
  "Muffin", "Parrot", "Piano", "Piston", "Pocket", "Powder", "Slide", "Statue", "Suitcas", "Tuba",
  "Virus", "Critic", "Blueprint", "Drawing", "Coral", "Catcher", "Drill", "Drink", "Drug", "Eyelash",
  "Guitar", "Hook", "Keeper", "Marrow", "Message", "Padding", "Paddle", "Passage", "Perfume", "Primate"
];

const PAGE_SIZE = 42;

const VisualSelectionWord = () => {
  const { userSelectedYes } = useContext(VoteContext);
  const navigate = useNavigate();


  // Sort the words alphabetically for easier navigation
  const [items] = useState(() => [...allWords].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())));
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [showError, setShowError] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false); // modal state

  // Close modal if all words are removed
  useEffect(() => {
    if (showConfirm && selected.length === 0) {
      setShowConfirm(false);
    }
  }, [selected, showConfirm]);

  // New state for visual representation and correctness
  const [visualRepresentation, setVisualRepresentation] = useState(null);

  // Add these states at the top of your component
  const [search, setSearch] = useState("");
  const [letterFilter, setLetterFilter] = useState("");

  const stepsNo = ["Voted Before", "Voting", "Confirmation"];
  const stepsYes = [
    "Voted Before",
    "Identification of Previous Ballots",
    "Voting",
    "Confirmation"
  ];
  const steps = userSelectedYes ? stepsYes : stepsNo;
  const currentStep = userSelectedYes ? 2 : 0;

  // Fetch the visual representation when the component mounts
  useEffect(() => {
    const fetchVisual = async () => {
      const visual = await getVisualRepresentation();
      setVisualRepresentation(visual);
    };
    fetchVisual();
  }, []);



  // 1. Filter first
  const filteredItems = items.filter(word => {
    const wordLower = word.toLowerCase();
    const matchesSearch = search === "" || wordLower.includes(search.toLowerCase());
    const matchesLetter = letterFilter === "" || wordLower.startsWith(letterFilter.toLowerCase());
    return matchesSearch && matchesLetter;
  });

  // 2. Then page
  const totalPages = Math.ceil(filteredItems.length / PAGE_SIZE);
  const pagedItems = filteredItems.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleSelect = (idx) => {
    setSelected(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const handleNext = () => {
    if (selected.length > 0) {
      setShowConfirm(true);
    } else {
      setShowError(true);
    }
  };



  const confirmSelection = async () => {
    // Get base names for selected words
    const selectedWords = selected.map(idx => items[idx]);

    // Handle visualRepresentation
    let visualWord = '';
    if (visualRepresentation && typeof visualRepresentation === "object") {
      // Check for word key specifically for words
      if (visualRepresentation.word) {
        visualWord = visualRepresentation.word;
      } else {
        // Fallback: get first value
        const firstValue = Object.values(visualRepresentation)[0];
        if (firstValue && typeof firstValue === 'string') {
          visualWord = firstValue;
        }
      }
    } else if (typeof visualRepresentation === "string") {
      visualWord = visualRepresentation;
    }

    // Check for EXACT match: selected must contain only the visual representation, nothing more
    const isCorrect = selectedWords.length === 1 && selectedWords[0] === visualWord;

    console.log("Selected words:", selectedWords);
    console.log("Visual base name:", visualWord);
    console.log("Is correct:", isCorrect);

   try {
      await saveBallotSelections(selectedWords);
      await saveCorrectSelections(Boolean(isCorrect));
      console.log("Saved to DB! isCorrect:", isCorrect);
      navigate("/voting");
    } catch (error) {
      console.error("Error saving ballot selections:", error);
    }
  };

  const closeError = () => setShowError(false);

  return (
    <div className="page-wrapper">
      <main className="welcome-main">
        <ProcessBar steps={steps} currentStep={currentStep} />
        <div className="intro-container">
          <h1>Identification of Previously Cast Ballots</h1>
          <div className="text-main">
            Please select all words below that you have seen when casting your previous ballots.
          </div>
          <div className="security-box-selection">
            <p className="text-small">
              <strong>Why is this step needed?</strong><br />
              This feature verifies your identity, ensuring that only you can update your vote by recognising the words shown to you after your previous voting session(s).<br /><br />
              This feature also protects against coercion. If you are pressured to vote a certain way, you can intentionally select the wrong words to prevent your vote from being updated, without revealing your true voting history.<br /><br />
              If you cannot remember your word(s), you can always vote in person at your local polling station.<br /><br />
              <a href="/help#ballot-verification-security" className="faq-link">Read more in the FAQ</a>
            </p>

          </div>
        </div>
        <div className="card-wide">
          <h1 className="card-heading-select" style={{ width: "100%", textAlign: "left", margin: "0 0 10px 40px" }}>
            Select your words
          </h1>
          <div className="instruction-list" style={{ maxWidth: "800px", margin: "0 auto 20px auto", textAlign: "left", paddingLeft: "35px" }}>
            <ul>
              <li>You must select <strong>all</strong> the words below that you have seen when casting your previous ballots. This includes words from both valid and invalid ballots.</li>
              <li>The system will not reveal if your selection is correct for security reasons.</li>
              <li>Only the correct selection will ensure that your vote gets updated and counted into the results.</li>
              <li>If you are unsure or cannot remember your words, please contact election officials at your polling station.</li>
              <li>If someone is pressuring you to change your vote, you can select cards that do not match your previous ballots. The system will not update your vote, and no one will know about this.</li>
            </ul>
          </div>
          <div className="filter-card">
  <div className="filter-headline">Find your words</div>
  <div className="filter-instructions">
    Use the search box or click a letter to filter by the first letter of the word (e.g., A for Apple, B for Baby).
  </div>
  <div className="filter-controls">
    <div className="search-wrapper">
      <span className="search-icon">🔍</span>
      <input
        id="word-search"
        type="text"
        className="word-filter-input"
        placeholder="Search for your word..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        aria-label="Search for your word"
      />
    </div>
    <div className="letter-buttons">
      {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(letter => (
        <button
          key={letter}
          className={
            "word-filter-letter" +
            (letterFilter === letter.toLowerCase() ? " active" : "")
          }
          aria-pressed={letterFilter === letter.toLowerCase()}
          onClick={e => {
            if (letterFilter === letter.toLowerCase()) {
              setLetterFilter("");
              e.currentTarget.blur(); // Remove focus so yellow style disappears
            } else {
              setLetterFilter(letter.toLowerCase());
            }
          }}
          type="button"
        >
          {letter}
        </button>
      ))}
      {letterFilter && (
        <button
          className="clear-btn"
          onClick={() => setLetterFilter("")}
          type="button"
        >
          Clear
        </button>
      )}
    </div>
  </div>
</div>
          
          <div className="selected-scroll-wrapper">
            <div className="selected-count-inside">
              {selected.length} selected
            </div>
            
          <div className="page-counter-badge">
              Showing {page * PAGE_SIZE + 1}-{Math.min((page + 1) * PAGE_SIZE, filteredItems.length)} of {filteredItems.length} pictures
            </div>
          </div>
          
          
          <div className="pictures-scroll-container">
            <div className="visual-select-grid-pictures">
              {pagedItems.length === 0 ? (
              <p className="no-pictures-message">No words found. Try adjusting your search.</p>
            ) : (
              pagedItems.map((word, idx) => {
                const globalIdx = items.indexOf(word); // Use index from items for selection
                return (
                  <div
                    key={globalIdx}
                    className={`visual-selection-picture${selected.includes(globalIdx) ? " selected" : ""}`}
                    onClick={() => handleSelect(globalIdx)}
                  >
                    <div className="picture-label">
                      {word}
                    </div>
                  </div>
                );
              })
            )}
            </div>
          </div>
         <div className="pagination-buttons">
            <button className="button" onClick={() => setPage(page - 1)} disabled={page === 0} aria-label="Previous page">
              ←
            </button>
              <span className="page-counter">
              Page {page + 1} of {totalPages}
            </span>
            <button className="button" onClick={() => setPage(page + 1)} disabled={page >= totalPages - 1} aria-label="Next page">
              →
            </button>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <button onClick={handleNext} className="button confirm-selection-button">
            Confirm selection
          </button>
        </div>
        {showError && (
          <div className="error-overlay">
            <div className="error-message">
              <p>Please select at least one item</p>
              <button onClick={closeError} className="button">
                Close
              </button>
            </div>
          </div>
        )}
        {showConfirm && (
          <div className="modal-backdrop-picture">
            <div className="modal-picture">

              <p style={{fontSize: "18px", fontWeight: "bold"}}>
                Please review your selected cards below
              </p>
               <p style={{fontSize: "16px", marginTop: "0px", marginBottom: "16px"}}>
                Once confirmed, you will not receive feedback on whether your selection is correct. <br></br>If your selection is incorrect, your vote will <strong>NOT be updated</strong>.
              </p>
              <div className="selected-pictures-preview-picture"
                style={
                  selected.length < 3
                    ? {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "20px",
                        margin: "0 auto 32px auto",
                        padding: 0,
                        width: "100%",
                      }
                    : {
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 140px)",
                        gap: "20px",
                        justifyContent: "center",
                        alignItems: "center",
                        maxWidth: 460,
                        margin: "0 auto 32px auto",
                        padding: 0,
                        width: "100%",
                      }
                }
              >
                {selected.map(idx => {
                  const word = items[idx];
                  return (
                    <div
                      key={idx}
                      className="preview-item-picture preview-item-word"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 140,
                        height: 100,
                        border: "2px solid #c1bfbfff",
                        borderRadius: 8,
                        background: "#fff",
                        boxSizing: "border-box",
                        padding: "8px",
                        margin: 0,
                        position: "relative",
                      }}
                    >
                      <button
                        onClick={() => {
                          setSelected(prev => prev.filter(i => i !== idx));
                        }}
                        style={{
                          position: "absolute",
                          top: 4,
                          right: 4,
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          border: "1px solid #ccc",
                          background: "#f3f4f6",
                          color: "#666",
                          fontSize: "16px",
                          fontWeight: "bold",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: 0,
                          lineHeight: 1,
                          zIndex: 10,
                        }}
                        title="Remove this word"
                      >
                        ×
                      </button>
                      <div
                        className="picture-label"
                        style={{
                          fontWeight: "bold",
                          textAlign: "center",
                          fontSize: "1.1rem",
                          color: "#222",
                          width: "100%",
                          lineHeight: 1.1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {word}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="modal-actions-picture" style={{ marginTop: 24, display: "flex", justifyContent: "center", gap: 16 }}>
                <button className="button" onClick={confirmSelection}>
                  Confirm selection
                </button>
                <button className="button-secondary" onClick={() => setShowConfirm(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default VisualSelectionWord;