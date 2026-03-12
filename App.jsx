import { useState } from "react";

const SUBJECTS_PRELIMS = [
  "All", "Polity & Governance", "History & Culture", "Geography",
  "Economy", "Science & Technology", "Environment & Ecology",
  "International Relations", "Social Issues", "Defence & Security"
];

const SUBJECTS_MAINS = [
  "All",
  "GS1 – History, Society & Geography",
  "GS2 – Polity, Governance & IR",
  "GS3 – Economy, S&T & Environment",
  "GS4 – Ethics & Integrity",
  "Essay Worthy"
];

const IMPORTANCE = { High: "#e8b84b", Medium: "#7ecba1", Low: "#7eb5cb" };

const sampleData = [
  {
    headline: "India Signs New Climate Finance Agreement at COP29",
    summary: "India committed to a $10 billion green transition fund, emphasizing solar and green hydrogen targets under the National Action Plan on Climate Change.",
    prelims: true, mains: true,
    prelims_subject: "Environment & Ecology",
    mains_subject: "GS3 – Economy, S&T & Environment",
    importance: "High",
    tags: ["Climate Change", "Paris Agreement", "Green Hydrogen"],
    upsc_angle: "Relevant for International Agreements, Environmental Policy and India's NDC commitments."
  },
  {
    headline: "Supreme Court Ruling on Electoral Bonds Scheme",
    summary: "A five-judge constitutional bench unanimously struck down the Electoral Bonds Scheme citing violation of the right to information under Article 19(1)(a).",
    prelims: true, mains: true,
    prelims_subject: "Polity & Governance",
    mains_subject: "GS2 – Polity, Governance & IR",
    importance: "High",
    tags: ["Electoral Bonds", "Article 19", "Supreme Court", "RTI"],
    upsc_angle: "Key for constitutional provisions, right to information, and electoral reforms."
  },
  {
    headline: "India's GDP Growth Forecast Revised to 7.2% by IMF",
    summary: "IMF World Economic Outlook projects India as fastest growing major economy, attributing growth to domestic consumption, manufacturing push and PLI schemes.",
    prelims: true, mains: true,
    prelims_subject: "Economy",
    mains_subject: "GS3 – Economy, S&T & Environment",
    importance: "High",
    tags: ["GDP", "IMF", "PLI Scheme", "Manufacturing"],
    upsc_angle: "Relevant for economic indicators, global institutions, and Make in India narrative."
  },
  {
    headline: "Launch of National Quantum Mission: Key Features",
    summary: "Cabinet approved ₹6,003 crore National Quantum Mission to develop quantum computers, communication and sensing technologies by 2031.",
    prelims: true, mains: false,
    prelims_subject: "Science & Technology",
    mains_subject: "GS3 – Economy, S&T & Environment",
    importance: "High",
    tags: ["Quantum Computing", "Science Mission", "Technology"],
    upsc_angle: "Technology missions, dual-use technology, and India's S&T ecosystem."
  },
  {
    headline: "Census Enumeration Deferred Again: Implications",
    summary: "India's decennial Census, already delayed since 2021, faces further postponement raising concerns about welfare scheme targeting and delimitation exercise.",
    prelims: true, mains: true,
    prelims_subject: "Polity & Governance",
    mains_subject: "GS1 – History, Society & Geography",
    importance: "Medium",
    tags: ["Census", "Delimitation", "OBC Data"],
    upsc_angle: "Relates to delimitation, welfare delivery, caste census debate and Article 82."
  },
  {
    headline: "India-Middle East-Europe Corridor Progress Update",
    summary: "IMEC sees diplomatic momentum post Gaza ceasefire with new MoUs between India, UAE and EU on railway-shipping corridor spanning three continents.",
    prelims: true, mains: true,
    prelims_subject: "International Relations",
    mains_subject: "GS2 – Polity, Governance & IR",
    importance: "High",
    tags: ["IMEC", "Geopolitics", "Trade Corridor", "UAE"],
    upsc_angle: "India's connectivity diplomacy, economic corridors and strategic partnerships."
  },
  {
    headline: "Great Nicobar Island Project: Environmental Clearance Row",
    summary: "MoEFCC granted environmental clearance for ₹72,000 crore Great Nicobar holistic development project amid protests from ecologists citing damage to Leatherback turtles and tribal rights.",
    prelims: true, mains: true,
    prelims_subject: "Environment & Ecology",
    mains_subject: "GS3 – Economy, S&T & Environment",
    importance: "High",
    tags: ["Great Nicobar", "Environmental Clearance", "Tribal Rights", "Biodiversity"],
    upsc_angle: "Balancing development and ecology, tribal rights under PESA, and strategic importance of Andamans."
  },
  {
    headline: "PM VISHWAKARMA Scheme: One Year Review",
    summary: "Over 38 lakh artisans onboarded under PM Vishwakarma covering 18 traditional trades; collateral-free loans and skill training provided through common service centres.",
    prelims: true, mains: false,
    prelims_subject: "Social Issues",
    mains_subject: "GS2 – Polity, Governance & IR",
    importance: "Medium",
    tags: ["PM Vishwakarma", "Artisans", "Skill Development", "Welfare Scheme"],
    upsc_angle: "Welfare schemes for unorganised sector, skill India, and inclusion in formal economy."
  }
];

const SubjectPill = ({ label, active, onClick, color }) => (
  <button
    onClick={onClick}
    style={{
      padding: "6px 14px", borderRadius: "2px",
      border: active ? `1.5px solid ${color || "#e8b84b"}` : "1.5px solid #2a2a2a",
      background: active ? (color || "#e8b84b") + "22" : "transparent",
      color: active ? (color || "#e8b84b") : "#888",
      fontSize: "11px", fontFamily: "'DM Mono', monospace",
      letterSpacing: "0.05em", cursor: "pointer",
      transition: "all 0.2s", whiteSpace: "nowrap"
    }}
  >{label}</button>
);

const NewsCard = ({ item, view }) => {
  const [expanded, setExpanded] = useState(false);
  const subject = view === "prelims" ? item.prelims_subject : item.mains_subject;
  const impColor = IMPORTANCE[item.importance] || "#888";

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      style={{
        background: "#0f0f0f", border: "1px solid #1e1e1e",
        borderLeft: `3px solid ${impColor}`, padding: "18px 20px",
        cursor: "pointer", transition: "all 0.2s", marginBottom: "10px"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: "9px", fontFamily: "'DM Mono', monospace", letterSpacing: "0.15em", color: impColor, textTransform: "uppercase", fontWeight: 600 }}>
              ● {item.importance} Priority
            </span>
            <span style={{ color: "#333", fontSize: 10 }}>|</span>
            <span style={{ fontSize: "9px", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", color: "#666", textTransform: "uppercase" }}>{subject}</span>
            {item.prelims && item.mains && (
              <span style={{ fontSize: "8px", fontFamily: "'DM Mono', monospace", color: "#444", background: "#1a1a1a", padding: "2px 6px", borderRadius: 1 }}>P+M</span>
            )}
          </div>
          <h3 style={{ margin: 0, fontSize: "15px", fontFamily: "'Playfair Display', Georgia, serif", color: "#e8e0d0", lineHeight: 1.4, fontWeight: 700 }}>{item.headline}</h3>
        </div>
        <span style={{ color: "#444", fontSize: 18, flexShrink: 0, marginTop: 4 }}>{expanded ? "−" : "+"}</span>
      </div>

      {expanded && (
        <div style={{ marginTop: 14, borderTop: "1px solid #1e1e1e", paddingTop: 14 }}>
          <p style={{ margin: "0 0 12px", fontSize: "13.5px", color: "#bbb", fontFamily: "'Lora', Georgia, serif", lineHeight: 1.75 }}>{item.summary}</p>
          <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", padding: "10px 14px", borderLeft: "3px solid #e8b84b" }}>
            <div style={{ fontSize: "9px", color: "#e8b84b", fontFamily: "'DM Mono', monospace", letterSpacing: "0.15em", marginBottom: 5, textTransform: "uppercase" }}>UPSC Angle</div>
            <p style={{ margin: 0, fontSize: "12px", color: "#999", fontFamily: "'Lora', serif", lineHeight: 1.6 }}>{item.upsc_angle}</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
            {item.tags.map(tag => (
              <span key={tag} style={{ fontSize: "9px", fontFamily: "'DM Mono', monospace", color: "#555", border: "1px solid #222", padding: "3px 8px", borderRadius: 1 }}>#{tag}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [view, setView] = useState("prelims");
  const [activeSubject, setActiveSubject] = useState("All");
  const [news, setNews] = useState(sampleData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastFetched, setLastFetched] = useState(null);

  const subjects = view === "prelims" ? SUBJECTS_PRELIMS : SUBJECTS_MAINS;

  const filtered = news.filter(item => {
    const inView = view === "prelims" ? item.prelims : item.mains;
    if (!inView) return false;
    if (activeSubject === "All") return true;
    const subj = view === "prelims" ? item.prelims_subject : item.mains_subject;
    return subj === activeSubject;
  });

  const highCount = filtered.filter(i => i.importance === "High").length;

  const fetchNews = async () => {
    setLoading(true);
    setError("");
    try {
      const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

      // Calls our secure Vercel API route instead of Anthropic directly
      const response = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          tools: [{ type: "web_search_20250305", name: "web_search" }],
          system: `You are an expert UPSC coach and current affairs analyst. Search for today's most important news for UPSC aspirants. Return ONLY a valid JSON array, no markdown, no preamble.

Each object must have exactly these fields:
- headline: string
- summary: string (2-3 sentences, factual)
- prelims: boolean
- mains: boolean
- prelims_subject: one of ["Polity & Governance", "History & Culture", "Geography", "Economy", "Science & Technology", "Environment & Ecology", "International Relations", "Social Issues", "Defence & Security"]
- mains_subject: one of ["GS1 – History, Society & Geography", "GS2 – Polity, Governance & IR", "GS3 – Economy, S&T & Environment", "GS4 – Ethics & Integrity", "Essay Worthy"]
- importance: "High" | "Medium" | "Low"
- tags: array of 3-5 strings
- upsc_angle: string (1-2 sentences on why relevant for UPSC)

Return 8-12 news items as a JSON array only.`,
          messages: [{
            role: "user",
            content: `Search and find the most important current affairs news from India and the world for ${today} that UPSC aspirants must know. Focus on policy, governance, economy, environment, science, international relations, and social issues. Return structured JSON only.`
          }]
        })
      });

      const data = await response.json();
      const textBlock = data.content?.filter(b => b.type === "text").map(b => b.text).join("");
      if (!textBlock) throw new Error("No response from API");
      const jsonMatch = textBlock.match(/\[[\s\S]*\]/);
      if (!jsonMatch) throw new Error("Could not parse news data");
      const parsed = JSON.parse(jsonMatch[0]);
      setNews(parsed);
      setLastFetched(new Date());
    } catch (err) {
      console.error(err);
      setError("Failed to fetch live news. Showing sample data.");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080808", fontFamily: "'DM Mono', monospace", backgroundImage: "radial-gradient(ellipse at 20% 50%, #0d0d00 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #000d0a 0%, transparent 50%)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Mono:wght@400;500&family=Lora:wght@400;500&display=swap');
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #080808; }
        ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 2px; }
        * { box-sizing: border-box; }
      `}</style>

      {/* Header */}
      <div style={{ borderBottom: "1px solid #1a1a1a", padding: "0 24px", background: "#080808", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0 12px" }}>
            <div>
              <div style={{ fontSize: "8px", color: "#e8b84b", letterSpacing: "0.3em", marginBottom: 4, textTransform: "uppercase" }}>◆ Daily Digest</div>
              <h1 style={{ margin: 0, fontSize: "22px", fontFamily: "'Playfair Display', serif", color: "#e8e0d0", letterSpacing: "0.02em", fontWeight: 800 }}>UPSC Current Affairs</h1>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              {lastFetched && <span style={{ fontSize: "9px", color: "#444" }}>{lastFetched.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>}
              <button onClick={fetchNews} disabled={loading} style={{ padding: "8px 18px", background: loading ? "#111" : "#e8b84b", color: loading ? "#555" : "#000", border: "none", borderRadius: "2px", fontSize: "10px", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em", cursor: loading ? "not-allowed" : "pointer", fontWeight: 600, textTransform: "uppercase" }}>
                {loading ? "Fetching..." : "↻ Live News"}
              </button>
            </div>
          </div>
          <div style={{ display: "flex", gap: 0, borderTop: "1px solid #1a1a1a" }}>
            {[{ id: "prelims", label: "Prelims" }, { id: "mains", label: "Mains" }, { id: "overview", label: "Subject Map" }].map(tab => (
              <button key={tab.id} onClick={() => { setView(tab.id); setActiveSubject("All"); }} style={{ padding: "10px 20px", background: "transparent", border: "none", borderBottom: view === tab.id ? "2px solid #e8b84b" : "2px solid transparent", color: view === tab.id ? "#e8b84b" : "#555", fontSize: "10px", fontFamily: "'DM Mono', monospace", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", fontWeight: view === tab.id ? 600 : 400 }}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 24px" }}>
        {error && <div style={{ background: "#1a0a00", border: "1px solid #5c2e00", color: "#f0844c", padding: "10px 14px", fontSize: "11px", marginBottom: 16, borderRadius: 2 }}>{error}</div>}

        {(view === "prelims" || view === "mains") && (
          <>
            <div style={{ display: "flex", gap: 16, marginBottom: 20, alignItems: "center" }}>
              <div style={{ fontSize: "11px", color: "#555" }}><span style={{ color: "#e8e0d0", fontWeight: 600 }}>{filtered.length}</span> stories</div>
              <div style={{ fontSize: "11px", color: "#555" }}><span style={{ color: "#e8b84b", fontWeight: 600 }}>{highCount}</span> high priority</div>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
              {subjects.map(s => <SubjectPill key={s} label={s} active={activeSubject === s} onClick={() => setActiveSubject(s)} color="#e8b84b" />)}
            </div>
            <div>
              {filtered.length === 0
                ? <div style={{ color: "#444", fontSize: 13, textAlign: "center", padding: 40 }}>No news in this category.</div>
                : filtered.map((item, i) => <NewsCard key={i} item={item} view={view} />)
              }
            </div>
          </>
        )}

        {view === "overview" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#e8e0d0", fontSize: 18, margin: "0 0 4px", fontWeight: 700 }}>Subject-wise Coverage Map</h2>
              <p style={{ color: "#555", fontSize: 11, margin: 0 }}>All {news.length} stories mapped across UPSC subjects</p>
            </div>

            {[{ label: "PRELIMS", color: "#7ecba1", subjects: SUBJECTS_PRELIMS.slice(1), key: "prelims", subKey: "prelims_subject", tabId: "prelims" },
              { label: "MAINS", color: "#7eb5cb", subjects: SUBJECTS_MAINS.slice(1), key: "mains", subKey: "mains_subject", tabId: "mains" }
            ].map(section => (
              <div key={section.label} style={{ marginBottom: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, borderBottom: "1px solid #1a1a1a", paddingBottom: 10 }}>
                  <span style={{ fontSize: "9px", color: section.color, letterSpacing: "0.2em", fontFamily: "'DM Mono'", textTransform: "uppercase" }}>◆ {section.label}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
                  {section.subjects.map(subj => {
                    const items = news.filter(n => n[section.key] && n[section.subKey] === subj);
                    if (!items.length) return null;
                    return (
                      <div key={subj} style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", padding: "14px 16px", cursor: "pointer" }}
                        onClick={() => { setView(section.tabId); setActiveSubject(subj); }}>
                        <div style={{ fontSize: "9px", color: section.color, letterSpacing: "0.1em", marginBottom: 6, textTransform: "uppercase" }}>{subj}</div>
                        <div style={{ fontSize: "20px", fontFamily: "'Playfair Display', serif", color: "#e8e0d0", fontWeight: 700, marginBottom: 8 }}>{items.length}</div>
                        {items.slice(0, 2).map((item, i) => (
                          <div key={i} style={{ fontSize: "10px", color: "#555", lineHeight: 1.4, marginBottom: 3 }}>→ {item.headline.length > 48 ? item.headline.slice(0, 48) + "…" : item.headline}</div>
                        ))}
                        {items.length > 2 && <div style={{ fontSize: "9px", color: "#333" }}>+{items.length - 2} more</div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ borderTop: "1px solid #111", padding: "16px 24px", marginTop: 40 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: "9px", color: "#333", letterSpacing: "0.1em" }}>UPSC CURRENT AFFAIRS ENGINE — AI CLASSIFIED</span>
          <span style={{ fontSize: "9px", color: "#333" }}>Click any card to expand · P+M = Relevant for both stages</span>
        </div>
      </div>
    </div>
  );
}
