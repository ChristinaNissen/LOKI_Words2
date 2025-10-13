import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "./Footer";
import "./Voting-system.css";
import "./VisualSelection_Card.css";
import ProcessBar from "./ProcessBar.js";
import VoteContext from "../Contexts/VoteContext";

const staticCard = {
  numberOfEmojis: 6,
  emojiRef: "😊",
  colorRef: "#3887e7",
  config: {
    columns: 2,
    rows: 3,
    positions: [
      [0, 0], [1, 0],
      [0, 1], [1, 1],
      [0, 2], [1, 2]
    ]
  }
};

const randomEmojis = [
  // Existing ones from your code
  "🌟", "🍀", "🔥", "🎈", "🌸", "⚡", "🍎", "🍌", "🍇", "🍉",
  // Smileys & Emotion
  "😀","😃","😄","😁","😆","😅","😂","🤣","😊","😇","🙂","🙃","😉","😌","😍","🥰","😘","😗","😙","😚","😋","😛","😜","🤪","😝","🤑","🤗","🤭","🤫","🤔","🤐","🤨","😐","😑","😶","😏","😒","🙄","😬","🤥","😌","😔","😪","🤤","😴","😷","🤒","🤕","🤢","🤮","🤧","🥵","🥶","🥴","😵","🤯","🤠","🥳","😎","🤓","🧐","😕","😟","🙁","☹️","😮","😯","😲","😳","🥺","😦","😧","😨","😰","😥","😢","😭","😱","😖","😣","😞","😓","😩","😫","🥱","😤","😡","😠","🤬","😈","👿","💀","☠️","🤡","👹","👺","👻","👽","👾","🤖",
  // People & Body
  "👋","🤚","🖐️","✋","🖖","👌","🤌","🤏","✌️","🤞","🫰","🤟","🤘","🤙","🫵","🫱","🫲","🫳","🫴","👏","🙌","👐","🤲","🤝","🙏","✍️","💅","🤳","💪","🦾","🦵","🦶","👂","🦻","👃","🧠","🦷","🦴","👀","👁️","👅","👄","🫦",
  // Animals & Nature
  "🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐻‍❄️","🐨","🐯","🦁","🐮","🐷","🐽","🐸","🐵","🙈","🙉","🙊","🐒","🐔","🐧","🐦","🐤","🐣","🐥","🦆","🦅","🦉","🦇","🐺","🐗","🐴","🦄","🐝","🪱","🐛","🦋","🐌","🐞","🐜","🪰","🪲","🪳","🦟","🦗","🕷️","🕸️","🦂","🐢","🐍","🦎","🦖","🦕","🐙","🦑","🦐","🦞","🦀","🐡","🐠","🐟","🐬","🐳","🐋","🦈","🐊","🐅","🐆","🦓","🦍","🦧","🐘","🦣","🦛","🦏","🐪","🐫","🦒","🦘","🦬","🐃","🐂","🐄","🐎","🐖","🐏","🐑","🦙","🐐","🦌","🐕","🐩","🦮","🐕‍🦺","🐈","🐈‍⬛","🪶","🐓","🦃","🦤","🦚","🦜","🦢","🦩","🕊️","🐇","🦝","🦨","🦡","🦫","🦦","🦥","🐁","🐀","🐿️","🦔",
  // Food & Drink
  "🍏","🍎","🍐","🍊","🍋","🍌","🍉","🍇","🍓","🫐","🍈","🍒","🍑","🥭","🍍","🥥","🥝","🍅","🍆","🥑","🥦","🥬","🥒","🌶️","🫑","🌽","🥕","🫒","🧄","🧅","🥔","🍠","🥐","🥯","🍞","🥖","🥨","🥞","🧇","🧀","🍖","🍗","🥩","🥓","🍔","🍟","🍕","🌭","🥪","🌮","🌯","🫔","🥙","🧆","🥚","🍳","🥘","🍲","🫕","🥣","🥗","🍿","🧈","🧂","🥫","🍱","🍘","🍙","🍚","🍛","🍜","🍝","🍠","🍢","🍣","🍤","🍥","🥮","🍡","🥟","🥠","🥡","🦪","🍦","🍧","🍨","🍩","🍪","🎂","🍰","🧁","🥧","🍫","🍬","🍭","🍮","🍯","🍼","🥛","☕","🫖","🍵","🍶","🍾","🍷","🍸","🍹","🍺","🍻","🥂","🥃","🫗","🥤","🧋","🧃","🧉","🧊",
  // Activities
  "⚽","🏀","🏈","⚾","🥎","🎾","🏐","🏉","🥏","🎱","🪀","🏓","🏸","🥅","🏒","🏑","🥍","🏏","🪃","🥌","🛷","⛸️","🥊","🥋","🥇","🥈","🥉","🏆","🎽","🎿","🛼","🛹","🛶","⛵","🚤","🛥️","🛳️","⛴️","🚢","✈️","🛩️","🛫","🛬","🪂","💺","🚁","🚟","🚠","🚡","🛰️","🚀","🛸",
  // Objects & Symbols
  "⌚","📱","📲","💻","⌨️","🖥️","🖨️","🖱️","🖲️","🕹️","🗜️","💽","💾","💿","📀","📼","📷","📸","📹","🎥","📽️","🎞️","📞","☎️","📟","📠","📺","📻","🎙️","🎚️","🎛️","⏱️","⏲️","⏰","🕰️","⌛","⏳","📡","🔋","🔌","💡","🔦","🕯️","🪔","🧯","🛢️","💸","💵","💴","💶","💷","🪙","💰","💳","🧾","💎","⚖️","🔧","🔨","⚒️","🛠️","⛏️","🔩","⚙️","🗜️","⚗️","🧪","🧫","🧬","🔬","🔭","📡","💉","💊","🩸","🩹","🩺","🚪","🛏️","🛋️","🪑","🚽","🚿","🛁","🪒","🧴","🧷","🧹","🧺","🧻","🪣","🧼","🪥","🧽","🧯","🛒","🚬","⚰️","🪦","⚱️","🏺",
  // Flags (a few examples)
  "🇺🇸","🇬🇧","🇨🇦","🇦🇺","🇫🇷","🇩🇪","🇮🇹","🇪🇸","🇯🇵","🇨🇳","🇰🇷","🇧🇷","🇮🇳","🇷🇺","🇿🇦"
];

function generateDistinctColors(n) {
  const colors = [];
  for (let i = 0; i < n; i++) {
    const hue = Math.round((360 / n) * i);
    colors.push(`hsl(${hue}, 70%, 55%)`);
  }
  return colors;
}

function getEmojiGridConfig(n) {
  // Returns { columns, rows, positions } for 1–10
  switch (n) {
    case 1:
      return { columns: 1, rows: 1, positions: [[0, 0]] };
    case 2:
      return { columns: 1, rows: 2, positions: [[0, 0], [0, 1]] };
    case 3:
      return { columns: 1, rows: 3, positions: [[0, 0], [0, 1], [0, 2]] };
    case 4:
      return { columns: 2, rows: 2, positions: [[0, 0], [1, 0], [0, 1], [1, 1]] };
    case 5:
      return {
        columns: 3,
        rows: 3,
        positions: [
          [0, 0], [2, 0], // top corners
          [1, 1],         // center
          [0, 2], [2, 2]  // bottom corners
        ]
      };
    case 6:
      // 6-card pattern: 2 columns, 3 rows
      return {
        columns: 2,
        rows: 3,
        positions: [
          [0, 0], [1, 0], // top row
          [0, 1], [1, 1], // middle row
          [0, 2], [1, 2]  // bottom row
        ]
      };
    case 7:
      // 7-card pattern: 2 (top), 1 (centered), 2 (middle), 2 (bottom)
      return {
        columns: 2,
        rows: 5,
        positions: [
          [0, 0], [1, 0],     // top row (2)
          [0.5, 1],           // second row (centered)
          [0, 2], [1, 2],     // third row (2)
          [0, 3], [1, 3]      // fourth row (2)
        ]
      };
    case 8:
      // 8-card pattern: 2 (top), 1 (centered), 2 (middle), 1 (centered), 2 (bottom)
      return {
        columns: 2,
        rows: 6,
        positions: [
          [0, 0], [1, 0],     // top row (2)
          [0.5, 1],           // second row (centered)
          [0, 2], [1, 2],     // third row (2)
          [0.5, 3],           // fourth row (centered)
          [0, 4], [1, 4]      // fifth row (2)
        ]
      };
    case 9:
      return {
        columns: 3,
        rows: 3,
        positions: [
          [0, 0], [1, 0], [2, 0],
          [0, 1], [1, 1], [2, 1],
          [0, 2], [1, 2], [2, 2]
        ]
      };
    case 10:
      // 10-card pattern: 2 (top), 1 (centered), 2, 2, 1 (centered), 2 (bottom)
      return {
        columns: 2,
        rows: 7,
        positions: [
          [0, 0], [1, 0],       // top row (2)
          [0.5, 1],             // second row (centered)
          [0, 2], [1, 2],       // third row (2)
          [0, 3], [1, 3],       // fourth row (2)
          [0.5, 4],             // fifth row (centered)
          [0, 5], [1, 5]        // bottom row (2)
        ]
      };
    default:
      // fallback to a square grid
      const columns = Math.ceil(Math.sqrt(n));
      const rows = Math.ceil(n / columns);
      const positions = [];
      let count = 0;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          if (count++ < n) positions.push([x, y]);
        }
      }
      return { columns, rows, positions };
  }
}

function generateRandomCard() {
  const numberOfEmojis = Math.floor(Math.random() * 10) + 1; // 1-10
  const emojiRef = randomEmojis[Math.floor(Math.random() * randomEmojis.length)];
  const colorRef = generateDistinctColors(20)[Math.floor(Math.random() * 20)];
  const config = getEmojiGridConfig(numberOfEmojis);
  return { numberOfEmojis, emojiRef, colorRef, config };
}


const PAGE_SIZE = 39;

function getInitialCards() {
  const randomCards = Array.from({ length: 91 }, generateRandomCard);
  const insertIndex = Math.floor(Math.random() * PAGE_SIZE);
  randomCards.splice(insertIndex, 0, staticCard);
  return randomCards;
}

 const VisualSelection = () => {
  const navigate = useNavigate();
  const { userSelectedYes } = useContext(VoteContext);

  const stepsNo = ["Voted Before", "Voting", "Ballot Confirmation"];
  const stepsYes = ["Voted Before", "Visual Selection", "Voting", "Ballot Confirmation"];
  const steps = userSelectedYes ? stepsYes : stepsNo;
  const currentStep = userSelectedYes ? 2 : 0;  // adjust as needed

  const [cards, setCards] = useState(() => getInitialCards());
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);

  // Dynamically add 10 new cards each minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => [
        ...prev,
        ...Array.from({ length: 9 }, generateRandomCard)
      ]);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const totalPages = Math.ceil(cards.length / PAGE_SIZE);
  const pagedCards = cards.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleSelect = (idx) => {
    setSelected((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleNext = () => {
    if (selected.length > 0) {
      navigate("/voting",{ state: { userSelectedYes: true } });
    } else {
      alert("Please select one item to continue");
    }
  };

  return (
    <div className="page-wrapper">
      <main className="welcome-main">
        <ProcessBar steps={steps} currentStep={currentStep} />
        <h1>Identification of previously cast ballots</h1>
        <div className="welcome-desc">
          Please select all items below that you have seen when casting your previous ballots.
        </div>
        <div className="card" style={{ maxWidth: 1000, width: "100%" }}>
          <div className="visual-selection-grid">
            {pagedCards.map((card, idx) => {
              const globalIdx = page * PAGE_SIZE + idx;
              return (
                <div
                  key={globalIdx}
                  className={`confirmation-card visual-selection-item${selected.includes(globalIdx) ? " selected" : ""}`}
                  style={{
                    backgroundColor: card.colorRef,
                    position: "relative",
                    cursor: "pointer"
                  }}
                  onClick={() => handleSelect(globalIdx)}
                >
                  <span className="card-corner card-corner-top-left">{card.numberOfEmojis}</span>
                  <span className="card-corner card-corner-bottom-right">{card.numberOfEmojis}</span>
                  <div className="emoji-area">
                    <div
                      className="confirmation-emoji-grid"
                      style={{
                        gridTemplateColumns: `repeat(${card.config.columns}, 1fr)`,
                        gridTemplateRows: `repeat(${card.config.rows}, 1fr)`
                      }}
                    >
                      {card.config.positions.map(([x, y], i) => {
                        let fontSize;
                        switch (card.numberOfEmojis) {
                          case 1: fontSize = "80px"; break;
                          case 2: fontSize = "45px"; break;
                          case 3: fontSize = "45px"; break;
                          case 4: fontSize = "45px"; break;
                          case 5: fontSize = "45px"; break;
                          case 6: fontSize = "45px"; break;
                          case 7: fontSize = "45px"; break;
                          case 8: fontSize = "45px"; break;
                          case 9: fontSize = "45px"; break;
                          case 10: fontSize = "38px"; break;
                          default: fontSize = "36px";
                        }
                        return (
                          <span
                            key={i}
                            className="confirmation-emoji"
                            style={{
                              fontSize,
                              gridColumn: x % 1 === 0 ? x + 1 : "1 / span 2",
                              gridRow: y + 1,
                              justifySelf: "center"
                            }}
                          >
                            {card.emojiRef}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 24 }}>
            <button
              className="button"
              onClick={() => setPage(page - 1)}
              disabled={page === 0}
            >
              Previous
            </button>
            <button
              className="button"
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPages - 1}
            >
              Next
            </button>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
          <button
            onClick={handleNext}
            className="button"
          >
            Confirm Selection
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VisualSelection;