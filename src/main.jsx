import { useState } from "react";

// ── Brand tokens ──────────────────────────────────────────────
const B = {
  beige:     "#d9cfc0",
  beigeLight:"#ede8de",
  beigeDeep: "#c4b89e",
  dark:      "#1a1814",
  darkMid:   "#2c2820",
  darkSoft:  "#3d3830",
  white:     "#f7f3ec",
  muted:     "#7a6e60",
  remax:     "#cc0000",
};

const steps = ["Contact","Goals","Property","Finances","Lifestyle"];

// ── Shared input styles ───────────────────────────────────────
const inp = {
  width:"100%", background:B.darkMid, border:`1px solid ${B.darkSoft}`,
  borderRadius:"6px", padding:"12px 16px", color:B.beigeLight,
  fontSize:"14px", outline:"none", fontFamily:"'Cormorant Garamond', Georgia, serif",
  boxSizing:"border-box",
};
const lbl = {
  display:"block", fontSize:"10px", fontWeight:700,
  letterSpacing:"0.15em", color:B.beige, textTransform:"uppercase",
  marginBottom:"8px", fontFamily:"'Montserrat', sans-serif",
};

function Field({ label, children }) {
  return <div style={{ marginBottom:"20px" }}><label style={lbl}>{label}</label>{children}</div>;
}

function Input({ value, onChange, placeholder, type="text" }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type} value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ ...inp, borderColor: focused ? B.beige : B.darkSoft, transition:"border-color .2s" }}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
    />
  );
}

function Select({ value, onChange, options }) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      value={value} onChange={e => onChange(e.target.value)}
      style={{ ...inp, appearance:"none", cursor:"pointer", borderColor: focused ? B.beige : B.darkSoft }}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
    >
      <option value="">Select…</option>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
  );
}

function Textarea({ value, onChange, placeholder, rows=3 }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder} rows={rows}
      style={{ ...inp, resize:"none", borderColor: focused ? B.beige : B.darkSoft, lineHeight:1.6 }}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
    />
  );
}

function ChoiceButton({ label, selected, onClick }) {
  return (
    <button
      type="button" onClick={onClick}
      style={{
        padding:"10px 14px", borderRadius:"6px", fontSize:"13px", cursor:"pointer",
        fontFamily:"'Montserrat', sans-serif", letterSpacing:"0.04em", fontWeight:500,
        background: selected ? B.beige : "transparent",
        color: selected ? B.dark : B.muted,
        border: `1px solid ${selected ? B.beige : B.darkSoft}`,
        transition:"all .2s",
      }}
    >
      {label}
    </button>
  );
}

// ── Progress bar ──────────────────────────────────────────────
function Progress({ current }) {
  return (
    <div style={{ display:"flex", alignItems:"flex-start", gap:"0", marginBottom:"36px" }}>
      {steps.map((s, i) => (
        <div key={s} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:"6px" }}>
          <div style={{ display:"flex", alignItems:"center", width:"100%" }}>
            {i > 0 && <div style={{ flex:1, height:"1px", background: i <= current ? B.beige : B.darkSoft, transition:"background .3s" }} />}
            <div style={{
              width:"26px", height:"26px", borderRadius:"50%", flexShrink:0,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:"11px", fontWeight:700, fontFamily:"'Montserrat', sans-serif",
              background: i < current ? B.beige : i === current ? "transparent" : "transparent",
              color: i < current ? B.dark : i === current ? B.beige : B.muted,
              border: `1.5px solid ${i <= current ? B.beige : B.darkSoft}`,
              transition:"all .3s",
            }}>
              {i < current ? "✓" : i + 1}
            </div>
            {i < steps.length - 1 && <div style={{ flex:1, height:"1px", background: i < current ? B.beige : B.darkSoft, transition:"background .3s" }} />}
          </div>
          <span style={{
            fontSize:"9px", letterSpacing:"0.12em", textTransform:"uppercase",
            fontFamily:"'Montserrat', sans-serif",
            color: i === current ? B.beige : B.muted, transition:"color .3s",
          }}>{s}</span>
        </div>
      ))}
    </div>
  );
}

// ── Step forms ────────────────────────────────────────────────
function StepContact({ d, set }) {
  return (
    <div>
      <h2 style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", fontSize:"28px", fontWeight:400, color:B.white, margin:"0 0 6px" }}>
        Let's get acquainted
      </h2>
      <p style={{ color:B.muted, fontSize:"13px", marginBottom:"28px", fontFamily:"'Montserrat', sans-serif" }}>
        Tell us a little about yourself.
      </p>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px" }}>
        <Field label="First Name"><Input value={d.firstName} onChange={v => set("firstName",v)} placeholder="Jane" /></Field>
        <Field label="Last Name"><Input value={d.lastName} onChange={v => set("lastName",v)} placeholder="Smith" /></Field>
      </div>
      <Field label="Email"><Input type="email" value={d.email} onChange={v => set("email",v)} placeholder="jane@email.com" /></Field>
      <Field label="Phone"><Input value={d.phone} onChange={v => set("phone",v)} placeholder="(952) 000-0000" /></Field>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px" }}>
        <Field label="Preferred Contact">
          <Select value={d.contactMethod} onChange={v => set("contactMethod",v)}
            options={["Phone call","Text message","Email","Any"]} />
        </Field>
        <Field label="Best Time to Reach You">
          <Select value={d.bestTime} onChange={v => set("bestTime",v)}
            options={["Morning (8am–12pm)","Afternoon (12pm–5pm)","Evening (5pm–8pm)","Anytime"]} />
        </Field>
      </div>
    </div>
  );
}

function StepTransaction({ d, set }) {
  return (
    <div>
      <h2 style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", fontSize:"28px", fontWeight:400, color:B.white, margin:"0 0 6px" }}>
        Your goals
      </h2>
      <p style={{ color:B.muted, fontSize:"13px", marginBottom:"28px", fontFamily:"'Montserrat', sans-serif" }}>What are you looking to accomplish?</p>
      <Field label="I am looking to…">
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"10px" }}>
          {["Buy","Sell","Both"].map(o => <ChoiceButton key={o} label={o} selected={d.transactionType===o} onClick={() => set("transactionType",o)} />)}
        </div>
      </Field>
      <Field label="Timeline">
        <Select value={d.timeline} onChange={v => set("timeline",v)}
          options={["ASAP (under 30 days)","1–3 months","3–6 months","6–12 months","Just exploring"]} />
      </Field>
      <Field label="Area of Interest">
        <Select value={d.area} onChange={v => set("area",v)}
          options={["Lakeville","South Metro","Twin Cities","Other"]} />
      </Field>
      <Field label="Worked with a real estate agent before?">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
          {["Yes","No"].map(o => <ChoiceButton key={o} label={o} selected={d.workedWithAgent===o} onClick={() => set("workedWithAgent",o)} />)}
        </div>
      </Field>
      <Field label="Currently under contract with another agent?">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
          {["Yes","No"].map(o => <ChoiceButton key={o} label={o} selected={d.underContract===o} onClick={() => set("underContract",o)} />)}
        </div>
      </Field>
    </div>
  );
}

function StepProperty({ d, set }) {
  return (
    <div>
      <h2 style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", fontSize:"28px", fontWeight:400, color:B.white, margin:"0 0 6px" }}>
        Property details
      </h2>
      <p style={{ color:B.muted, fontSize:"13px", marginBottom:"28px", fontFamily:"'Montserrat', sans-serif" }}>Tell us what you have in mind.</p>
      <Field label="Property Type">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
          {["Single Family","Condo / Townhome","Multi-Family","Land / Lot","Commercial","No Preference"].map(o =>
            <ChoiceButton key={o} label={o} selected={d.propertyType===o} onClick={() => set("propertyType",o)} />
          )}
        </div>
      </Field>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px" }}>
        <Field label="Min Bedrooms">
          <Select value={d.minBeds} onChange={v => set("minBeds",v)} options={["1+","2+","3+","4+","5+"]} />
        </Field>
        <Field label="Min Bathrooms">
          <Select value={d.minBaths} onChange={v => set("minBaths",v)} options={["1+","1.5+","2+","2.5+","3+","4+"]} />
        </Field>
      </div>
      <Field label="Desired Neighborhoods / Zip Codes">
        <Input value={d.areas} onChange={v => set("areas",v)} placeholder="e.g. Lakeville, Burnsville, 55044…" />
      </Field>
      <Field label="Must-Have Features">
        <Textarea value={d.mustHaves} onChange={v => set("mustHaves",v)} placeholder="Garage, large yard, home office, finished basement…" />
      </Field>
      <Field label="Deal Breakers">
        <Textarea rows={2} value={d.dealBreakers} onChange={v => set("dealBreakers",v)} placeholder="Busy road, high HOA fees, no yard…" />
      </Field>
    </div>
  );
}

function StepFinancial({ d, set }) {
  return (
    <div>
      <h2 style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", fontSize:"28px", fontWeight:400, color:B.white, margin:"0 0 6px" }}>
        Financial picture
      </h2>
      <p style={{ color:B.muted, fontSize:"13px", marginBottom:"28px", fontFamily:"'Montserrat', sans-serif" }}>Confidential — helps us match you with the right homes.</p>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px" }}>
        <Field label="Budget Min"><Input value={d.budgetMin} onChange={v => set("budgetMin",v)} placeholder="$300,000" /></Field>
        <Field label="Budget Max"><Input value={d.budgetMax} onChange={v => set("budgetMax",v)} placeholder="$600,000" /></Field>
      </div>
      <Field label="Financing Status">
        <Select value={d.financing} onChange={v => set("financing",v)}
          options={["Cash buyer","Pre-approved","Pre-qualified","Need to get pre-approved","Need to sell current home first"]} />
      </Field>
      <Field label="Down Payment Range">
        <Select value={d.downPayment} onChange={v => set("downPayment",v)}
          options={["Less than 5%","5–10%","10–20%","20%+","Cash (no mortgage)"]} />
      </Field>
      <Field label="Selling a home as part of this transaction?">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
          {["Yes","No"].map(o => <ChoiceButton key={o} label={o} selected={d.sellingFirst===o} onClick={() => set("sellingFirst",o)} />)}
        </div>
      </Field>
    </div>
  );
}

function StepLifestyle({ d, set }) {
  const togglePriority = item => {
    const arr = d.priorities || [];
    set("priorities", arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item]);
  };
  return (
    <div>
      <h2 style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", fontSize:"28px", fontWeight:400, color:B.white, margin:"0 0 6px" }}>
        Lifestyle & priorities
      </h2>
      <p style={{ color:B.muted, fontSize:"13px", marginBottom:"28px", fontFamily:"'Montserrat', sans-serif" }}>What matters most to you?</p>
      <Field label="Select all that apply">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
          {["Top-rated schools","Short commute","Walkability","Quiet neighborhood","Near parks / nature","Nightlife & dining","Pet friendly","Low / no HOA","New construction","Investment potential"].map(item =>
            <ChoiceButton key={item} label={item} selected={(d.priorities||[]).includes(item)} onClick={() => togglePriority(item)} />
          )}
        </div>
      </Field>
      <Field label="Anything else we should know?">
        <Textarea rows={4} value={d.notes} onChange={v => set("notes",v)} placeholder="Special circumstances, questions, timing details…" />
      </Field>
    </div>
  );
}

// ── Main app ──────────────────────────────────────────────────
export default function App() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    contact:     { firstName:"", lastName:"", email:"", phone:"", contactMethod:"", bestTime:"" },
    transaction: { transactionType:"", timeline:"", area:"", workedWithAgent:"", underContract:"" },
    property:    { propertyType:"", minBeds:"", minBaths:"", areas:"", mustHaves:"", dealBreakers:"" },
    financial:   { budgetMin:"", budgetMax:"", financing:"", downPayment:"", sellingFirst:"" },
    lifestyle:   { priorities:[], notes:"" },
  });
  const [aiSummary, setAiSummary]   = useState("");
  const [loading, setLoading]       = useState(false);
  const [submitted, setSubmitted]   = useState(false);

  const keys = ["contact","transaction","property","financial","lifestyle"];

  function set(section, field, value) {
    setForm(p => ({ ...p, [section]: { ...p[section], [field]: value } }));
  }

  // ── Replace YOUR_FORMSPREE_ID below with your actual ID from formspree.io ──
  const FORMSPREE_ID = "maqarjqv";

  async function submit() {
    setLoading(true);
    setSubmitted(true);
    const f = form;

    const prompt = `You are an assistant for Jack & Vanessa Dickinson, Realtors at RE/MAX Advantage Plus – The Minnesota Real Estate Team (Lakeville, South Metro, Twin Cities). A new client just submitted an intake form. Write a concise, professional CRM summary (3–5 paragraphs) for the agents to review before their first call. Cover: client profile & contact preferences, transaction goals & timeline, property wish list, financial readiness, lifestyle priorities, and suggested next steps for Jack & Vanessa.

Name: ${f.contact.firstName} ${f.contact.lastName}
Contact: ${f.contact.email} | ${f.contact.phone}
Preferred contact: ${f.contact.contactMethod} | Best time: ${f.contact.bestTime}

Transaction: ${f.transaction.transactionType} | Timeline: ${f.transaction.timeline} | Area: ${f.transaction.area}
Prior agent experience: ${f.transaction.workedWithAgent} | Under contract: ${f.transaction.underContract}

Property: ${f.property.propertyType} | Beds: ${f.property.minBeds} | Baths: ${f.property.minBaths}
Areas: ${f.property.areas}
Must-haves: ${f.property.mustHaves}
Deal breakers: ${f.property.dealBreakers}

Financial: Budget ${f.financial.budgetMin}–${f.financial.budgetMax} | Financing: ${f.financial.financing} | Down payment: ${f.financial.downPayment} | Selling first: ${f.financial.sellingFirst}

Lifestyle priorities: ${(f.lifestyle.priorities||[]).join(", ")}
Notes: ${f.lifestyle.notes}`;

    let summary = "";
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:1000,
          messages:[{ role:"user", content: prompt }],
        }),
      });
      const data = await res.json();
      summary = data.content?.map(b => b.text||"").join("\n") || "Unable to generate summary.";
      setAiSummary(summary);
    } catch {
      summary = "Error generating AI summary.";
      setAiSummary(summary);
    }

    // ── Send email via Formspree ──────────────────────────────
    try {
      await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          // Formspree uses _subject and _replyto as special fields
          _subject: `New Client Intake: ${f.contact.firstName} ${f.contact.lastName}`,
          _replyto: f.contact.email,

          // ── Contact ──
          "Client Name":       `${f.contact.firstName} ${f.contact.lastName}`,
          "Email":             f.contact.email,
          "Phone":             f.contact.phone,
          "Preferred Contact": f.contact.contactMethod,
          "Best Time":         f.contact.bestTime,

          // ── Goals ──
          "Transaction Type":  f.transaction.transactionType,
          "Timeline":          f.transaction.timeline,
          "Area of Interest":  f.transaction.area,
          "Prior Agent Exp":   f.transaction.workedWithAgent,
          "Under Contract":    f.transaction.underContract,

          // ── Property ──
          "Property Type":     f.property.propertyType,
          "Min Beds":          f.property.minBeds,
          "Min Baths":         f.property.minBaths,
          "Desired Areas":     f.property.areas,
          "Must-Haves":        f.property.mustHaves,
          "Deal Breakers":     f.property.dealBreakers,

          // ── Financial ──
          "Budget Min":        f.financial.budgetMin,
          "Budget Max":        f.financial.budgetMax,
          "Financing Status":  f.financial.financing,
          "Down Payment":      f.financial.downPayment,
          "Selling First":     f.financial.sellingFirst,

          // ── Lifestyle ──
          "Lifestyle Priorities": (f.lifestyle.priorities||[]).join(", "),
          "Additional Notes":     f.lifestyle.notes,

          // ── AI Summary ──
          "--- AI Client Summary ---": summary,
        }),
      });
    } catch {
      // Silent fail — summary still shown on screen
    }

    setLoading(false);
  }

  const sectionKey = keys[step];
  function setField(field, value) { set(sectionKey, field, value); }

  return (
    <div style={{ minHeight:"100vh", background:B.dark, fontFamily:"'Cormorant Garamond', Georgia, serif" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Montserrat:wght@400;500;600;700&display=swap');
        * { box-sizing:border-box; }
        input::placeholder, textarea::placeholder { color: #5a5248; }
        select option { background: #2c2820; color: #ede8de; }
        button:hover { opacity:0.9; }
        ::-webkit-scrollbar { width:4px; } ::-webkit-scrollbar-track { background:#1a1814; } ::-webkit-scrollbar-thumb { background:#3d3830; }
      `}</style>

      {/* Header */}
      <div style={{ borderBottom:`1px solid ${B.darkSoft}`, padding:"16px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div>
          <div style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", fontSize:"18px", fontWeight:500, color:B.white, letterSpacing:"0.05em" }}>
            Jack & Vanessa Dickinson
          </div>
          <div style={{ fontFamily:"'Montserrat', sans-serif", fontSize:"9px", letterSpacing:"0.2em", color:B.muted, textTransform:"uppercase", marginTop:"2px" }}>
            RE/MAX Advantage Plus · The Minnesota Real Estate Team
          </div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div style={{ fontFamily:"'Montserrat', sans-serif", fontSize:"9px", letterSpacing:"0.15em", color:B.remax, textTransform:"uppercase", fontWeight:700 }}>
            RE/MAX
          </div>
          <div style={{ fontFamily:"'Montserrat', sans-serif", fontSize:"8px", color:B.muted, letterSpacing:"0.1em", textTransform:"uppercase" }}>
            Client Intake
          </div>
        </div>
      </div>

      <div style={{ maxWidth:"520px", margin:"0 auto", padding:"32px 24px 64px" }}>
        {submitted ? (
          <div style={{ textAlign:"center", paddingTop:"24px" }}>
            {/* Success icon */}
            <div style={{
              width:"64px", height:"64px", borderRadius:"50%", margin:"0 auto 20px",
              border:`1.5px solid ${B.beige}`, display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:"24px", color:B.beige,
            }}>✓</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", fontSize:"28px", fontWeight:400, color:B.white, marginBottom:"8px" }}>
              Form Received
            </h2>
            <p style={{ fontFamily:"'Montserrat', sans-serif", fontSize:"12px", color:B.muted, marginBottom:"32px", lineHeight:1.7 }}>
              Thank you! Jack & Vanessa will be in touch soon.<br />
              {loading ? "Generating your client summary…" : "Here's the AI-generated summary for their records:"}
            </p>
            {loading ? (
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"10px", color:B.beige }}>
                <div style={{
                  width:"16px", height:"16px", border:`2px solid ${B.beige}`,
                  borderTopColor:"transparent", borderRadius:"50%",
                  animation:"spin 0.8s linear infinite",
                }} />
                <span style={{ fontFamily:"'Montserrat', sans-serif", fontSize:"12px", letterSpacing:"0.1em" }}>Analyzing…</span>
              </div>
            ) : (
              <div style={{
                textAlign:"left", background:B.darkMid, border:`1px solid ${B.darkSoft}`,
                borderRadius:"10px", padding:"24px",
              }}>
                <div style={{ fontFamily:"'Montserrat', sans-serif", fontSize:"9px", letterSpacing:"0.2em", color:B.beige, textTransform:"uppercase", fontWeight:700, marginBottom:"12px" }}>
                  AI Client Summary · For Agent Use
                </div>
                <div style={{ fontFamily:"'Cormorant Garamond', Georgia, serif", color:B.beigeLight, fontSize:"15px", lineHeight:1.8, whiteSpace:"pre-wrap" }}>
                  {aiSummary}
                </div>
                <div style={{ marginTop:"20px", paddingTop:"16px", borderTop:`1px solid ${B.darkSoft}` }}>
                  <div style={{ fontFamily:"'Montserrat', sans-serif", fontSize:"9px", color:B.muted, letterSpacing:"0.1em" }}>
                    JACK & VANESSA DICKINSON · RE/MAX ADVANTAGE PLUS · 952-454-4200
                  </div>
                </div>
              </div>
            )}
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          <>
            <Progress current={step} />

            {/* Step content */}
            {step === 0 && <StepContact d={form.contact} set={(f,v) => set("contact",f,v)} />}
            {step === 1 && <StepTransaction d={form.transaction} set={(f,v) => set("transaction",f,v)} />}
            {step === 2 && <StepProperty d={form.property} set={(f,v) => set("property",f,v)} />}
            {step === 3 && <StepFinancial d={form.financial} set={(f,v) => set("financial",f,v)} />}
            {step === 4 && <StepLifestyle d={form.lifestyle} set={(f,v) => set("lifestyle",f,v)} />}

            {/* Navigation */}
            <div style={{ display:"flex", gap:"12px", marginTop:"36px" }}>
              {step > 0 && (
                <button
                  type="button" onClick={() => setStep(s => s-1)}
                  style={{
                    flex:1, padding:"14px", border:`1px solid ${B.darkSoft}`,
                    borderRadius:"6px", background:"transparent", color:B.muted,
                    fontFamily:"'Montserrat', sans-serif", fontSize:"12px",
                    letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer",
                  }}
                >← Back</button>
              )}
              <button
                type="button"
                onClick={() => step < steps.length - 1 ? setStep(s => s+1) : submit()}
                style={{
                  flex:2, padding:"14px",
                  background: B.beige, border:"none",
                  borderRadius:"6px", color:B.dark,
                  fontFamily:"'Montserrat', sans-serif", fontSize:"12px", fontWeight:700,
                  letterSpacing:"0.12em", textTransform:"uppercase", cursor:"pointer",
                  transition:"opacity .2s",
                }}
              >
                {step < steps.length - 1 ? "Continue →" : "Submit →"}
              </button>
            </div>

            {/* Footer */}
            <div style={{ textAlign:"center", marginTop:"28px" }}>
              <div style={{ fontFamily:"'Montserrat', sans-serif", fontSize:"9px", color:B.muted, letterSpacing:"0.12em", lineHeight:1.8 }}>
                LAKEVILLE · SOUTH METRO · TWIN CITIES<br />
                952-454-4200 · JackAndVanessa@MnRealEstateTeam.com
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
