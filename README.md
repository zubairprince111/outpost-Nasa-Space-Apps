# OUTPOST — Deep Space Outpost Simulator
### NASA Space Apps Challenge 2026 • Award-Winning STEM Outpost Management Experience

**OUTPOST** is an interactive, browser-playable 3D game and systems-engineering simulation that teaches children and learners (ages 7–12+) the authentic engineering trade-offs of deep space survival. Grounded in real NASA open data from the **Space Weather Database (DONKI)**, the **Open Science Data Repository (OSDR)**, and planetary surface missions (**Artemis** & **Mars Perseverance**), OUTPOST makes complex trade-offs tangible, visual, and unforgettable: **no decision is free, and every choice teaches something true about deep-space survival.**

---

## 🌟 Key Features & Engineering Innovations

### 1. Dual Mission Theaters: Moon vs Mars
- **Artemis Base Camp (Lunar South Pole — Shackleton Crater Rim):**
  - Extreme vacuum ($0\text{ kPa}$), low-grazing solar incidence ($\sim 1.5^\circ$), 14-day cryogenic night down to $-130^\circ\text{C}$ (and $-246^\circ\text{C}$ in permanently shadowed craters), $1.62\text{ m/s}^2$ gravity, and near-instantaneous $1.3\text{-second}$ radio comms with Houston.
  - High-contrast monochromatic regolith 3D terrain with realistic Earth rise in the deep black vacuum.
- **Perseverance Delta Outpost (Martian Jezero Crater):**
  - Thin $\text{CO}_2$ atmosphere ($0.64\text{ kPa}$), seasonal dust storms with optical depth $\tau \ge 1.8$ blocking up to $75\%$ of solar irradiance, $24.6\text{-hour}$ Sol cycles, and a critical **$14\text{-minute}$ light-speed communications latency** each way ($28\text{-minute}$ round trip) that forces local autonomous decision-making.
  - Rusty ochre Martian terrain, atmospheric dust haze, and Phobos in orbit.

### 2. Genuine Engineering Trade-Offs (No "Free Lunch" Choices)
Every decision forces learners to weigh competing constraints:
- **Solar Storm (DONKI Event X8.7):** Active electromagnetic radiation shielding requires $25\text{ kW}$ of electrical power and drains batteries before nightfall; retreating underground saves power but halts surface science and freezes greenhouse microgreens; overclocking spectrometers gains $+140$ science points but exposes astronauts to $38.5\text{ mSv}$ of ionizing radiation.
- **Power Brownout & Dust Storms:** Load-shedding to preserve life support vs balanced module throttling vs battery overclocking that permanently degrades lithium cell lifespan.
- **Closed-Loop Water Recovery (NASA WRS 98% Standard):** Isolating leaking hydroponic lines protects human drinking water but sacrifices $30\%$ of vegetable crops; Sabatier reactor water synthesis produces water but consumes $30\text{ kW}$ power.
- **Redundancy Engineering (NASA ECLSS Standard):** Engaging secondary backup scrubbers burns the outpost's only reserve catalyst; venting into the greenhouse saves power but induces mild $\text{CO}_2$ headaches.
- **Deep-Space Communication Latency Dilemma:** Mars signals take $14\text{ minutes}$ each way. Waiting $28\text{ minutes}$ for Houston burns out overheating drill hardware; autonomous local execution solves crises in seconds.

### 3. Signature Feature: The Future Fork Trajectory Preview
- Before committing to any strategy, learners can inspect the **Future Fork 48-Hour Projected Trajectory**:
  - Interactive multi-parameter trends for **Grid Power (%)**, **Battery Storage (SOC %)**, **Atmospheric Oxygen (%)**, and **Crew Safety (%)**.
  - Highlights second-order compounding risks (e.g., *"Warning: Battery below 30% will trigger brownouts during upcoming lunar shadow!"*).

### 4. Grounded in Real NASA Open Data
- **NASA DONKI (Space Weather Database):** Real Coronal Mass Ejections (speeds up to $2,128\text{ km/s}$), Solar Flares (including the historic May 2024 $\text{X8.7}$ flare), and Solar Energetic Particle (SEP) flux.
- **NASA OSDR (Open Science Data Repository):**
  - **OSDR-120 (NASA Twins Study):** DNA damage repair and cognitive biomarkers under space radiation.
  - **OSDR-311 (Plant Habitat-04):** Chili pepper and microgreen cultivation under cosmic rays.
  - **OSDR-485:** Musculoskeletal bone density demineralization countermeasure exercises.
  - **Dosimetry Benchmarks:** Earth ($0.008\text{ mSv/day}$) vs ISS ($0.6\text{ mSv/day}$) vs Moon surface ($1.36\text{ mSv/day}$) vs Solar Particle Events ($500+\text{ mSv}$).
- **Dedicated NASA Open Data Dossier Modal:** Searchable database with direct links to NASA CCMC and OSDR repositories for judges and educators.

### 5. Sol-by-Sol Mission Control Simulation Sandbox (Infinite Replayability)
- Manages the outpost over consecutive Sols (Days 1 through 14).
- **Interactive Electrical Load Allocation Sliders:**
  1. Life Support & $\text{CO}_2$ Scrubbers ($\text{kW}$)
  2. Thermal Regolith Heating ($\text{kW}$)
  3. Electromagnetic Deflector & Water Wall Pumps ($\text{kW}$)
  4. Hydroponic Grow Lamps & Nutrient Flow ($\text{kW}$)
  5. Science Laser Spectrometer & Core Drill ($\text{kW}$)
  6. High-Gain Deep Space Comm Dish ($\text{kW}$)
- "Simulate & Advance Sol" calculates net daily balances, draws real space weather incidents, and logs multi-Sol telemetry trends.

### 6. Dual Audience Modes
- **Junior Cadet Mode (Ages 7–10):** Simplified emoji indicators, friendly color bars, cheerful ORBIT robot narration, and plain-English takeaways.
- **Flight Director Mode (Ages 11–12+ & Classrooms):** Real aerospace units ($\text{kW}$, $\text{kWh}$, $\text{mSv/day}$, $\text{kPa}$, Liters $\text{H}_2\text{O}$, light-speed latency mm:ss), load-shedding equations, and systems engineering standards.

### 7. Official NASA Junior Flight Director Diploma
- Exportable and printable certificate (`window.print()` optimized) featuring:
  - Student Commander Name
  - Mission Theater (Moon Shackleton Base or Mars Jezero Crater)
  - Mission Grade & Rank
  - Score, Stars, Crew Survival Rate, and Total Radiation Managed
  - Verifiable NASA Space Apps 2026 digital seal

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+)
- Any modern web browser (Chrome, Edge, Firefox, Safari)

### Run Locally
```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open in browser
http://localhost:5173/
```

### Production Build & Preview
```bash
npm run build
npm run preview
```

---

## 📜 Standards & Open Data Citations
- **NASA DONKI API:** `https://kauai.ccmc.gsfc.nasa.gov/DONKI/`
- **NASA OSDR Studies:** OSDR-120, OSDR-311, OSDR-485, OSDR-247 (`https://osdr.nasa.gov/`)
- **NASA Systems Engineering Handbook:** NASA SP-2016-6105 Rev 2
- **NASA Human-System Standard:** NASA-STD-3001
- **3D Assets & Audio:** Kenney Space Kit (CC0 Public Domain), Jummit Solar Array (CC-BY 4.0), NASA SVS Blue Marble & Lunar Albedo Maps (Public Domain).
