import {
  SubsystemType,
  CrewMember,
  QuestChoice,
  QuestChallenge,
  ResourceState,
  SubsystemState,
  QuestBadge,
  AskOrbitItem,
  DestinationType,
  SandboxAllocation,
  SolLogEntry
} from './SimulationModels';
import { NASADataService, PlanetaryEnvironment } from './NASADataService';

export class SimulationEngine {
  public static getCrewMembers(): CrewMember[] {
    return [
      {
        id: 'commander',
        name: 'Commander (You)',
        role: 'Mission Commander',
        title: 'Team Leader',
        avatar: '/images/logo.png',
        emoji: '🧑‍🚀',
        color: 'from-cyan-500 to-blue-600',
        responsibilities: 'Make all key trade-off decisions, budget power, and keep your crew alive.',
        catchphrase: 'Lead your crew, face the unknown!'
      },
      {
        id: 'alex',
        name: 'Alex',
        role: 'Chief Engineer',
        title: 'Power & Tech Specialist',
        avatar: '/images/logo.png',
        emoji: '⚡',
        color: 'from-amber-500 to-yellow-600',
        responsibilities: 'Maintains solar arrays, high-voltage battery storage, and surface rover mechanics.',
        catchphrase: 'If it runs on power, I can fix it!'
      },
      {
        id: 'mia',
        name: 'Mia',
        role: 'Astro-Botanist & Scientist',
        title: 'Greenhouse & Science Lead',
        avatar: '/images/logo.png',
        emoji: '🌱',
        color: 'from-emerald-500 to-green-600',
        responsibilities: 'Grows hydroponic microgreens and analyzes cosmic ice and geological cores.',
        catchphrase: 'Plants are the living lungs of our outpost!'
      },
      {
        id: 'leo',
        name: 'Leo',
        role: 'Habitat Specialist',
        title: 'Life Support Guardian',
        avatar: '/images/logo.png',
        emoji: '🫁',
        color: 'from-blue-500 to-indigo-600',
        responsibilities: 'Guards closed-loop drinking water, breathable oxygen, and pressure seals.',
        catchphrase: 'Clean air and water keep us flying!'
      },
      {
        id: 'orbit',
        name: 'ORBIT',
        role: 'AI Robot Companion',
        title: 'Junior Mission Guide',
        avatar: '/images/orbit_advisor.jpg',
        emoji: '🤖',
        color: 'from-purple-500 to-pink-600',
        responsibilities: 'Monitors NASA DONKI space weather telemetry, runs calculations, and alerts you to hazards.',
        catchphrase: 'Telemetry analyzed! Standing by for your command!'
      }
    ];
  }

  public static getInitialState(destination: DestinationType = 'moon'): ResourceState {
    const env = NASADataService.PLANETARY_ENVIRONMENTS[destination];
    return {
      power: 85,
      battery: 85,
      water: 80,
      food: 85,
      oxygen: 95,
      crewHealth: 100,
      crewSafety: 100,
      scienceScore: 0,
      radiationDose_mSv: env.radiationBaseline_mSv_day,
      radiationRate_mSv_day: env.radiationBaseline_mSv_day,
      commsLatencySec: env.commsDelaySec,
      sol: 1,
      destination,
      dustOpticalDepth: destination === 'mars' ? 0.52 : 0,
      surfaceTemp: destination === 'mars' ? -62 : -40
    };
  }

  public static getInitialBadges(): QuestBadge[] {
    return [
      {
        id: 'badge_solar',
        title: 'Solar Storm Shield Master',
        emoji: '🛡️',
        description: 'Successfully balanced power vs radiation during a DONKI X8.7 solar flare event.',
        unlocked: false,
        challengeId: 1,
        nasaRef: 'DONKI-FLR-2024-05-14'
      },
      {
        id: 'badge_meteor',
        title: 'Dust & Micrometeor Defender',
        emoji: '☄️',
        description: 'Preserved critical habitat life support through severe power and visibility drops.',
        unlocked: false,
        challengeId: 2,
        nasaRef: 'Perseverance MEDA'
      },
      {
        id: 'badge_power',
        title: 'Power Grid Strategist',
        emoji: '🔋',
        description: 'Prioritized electrical subsystems to prevent brownout during extreme night shadows.',
        unlocked: false,
        challengeId: 3,
        nasaRef: 'NASA SP-2016-6105'
      },
      {
        id: 'badge_water',
        title: 'Closed-Loop Hydrologist',
        emoji: '💧',
        description: 'Saved 98% recycled water reserves during a catastrophic hydroponic line leak.',
        unlocked: false,
        challengeId: 4,
        nasaRef: 'NASA WRS 98% Standard'
      },
      {
        id: 'badge_oxygen',
        title: 'Life Support Commander',
        emoji: '🫁',
        description: 'Mastered redundancy engineering by balancing scrubbers and habitat atmosphere.',
        unlocked: false,
        challengeId: 5,
        nasaRef: 'NASA ECLSS Redundancy'
      },
      {
        id: 'badge_greenhouse',
        title: 'Deep-Space Botanist',
        emoji: '🌱',
        description: 'Optimized LED wavelength and nutrient cycles grounded in NASA OSDR-311 research.',
        unlocked: false,
        challengeId: 6,
        nasaRef: 'NASA OSDR-311 (Plant Habitat-04)'
      },
      {
        id: 'badge_master',
        title: 'NASA Junior Flight Director',
        emoji: '🏆',
        description: 'Completed all 6 deep-space mission challenges and proved real engineering trade-off mastery!',
        unlocked: false,
        nasaRef: 'Artemis & Moon-to-Mars'
      }
    ];
  }

  public static getChallenges(): QuestChallenge[] {
    return [
      /* Challenge 1: Solar Storm Radiation vs Power */
      {
        id: 1,
        destination: 'both',
        name: "DONKI Solar Flare X8.7 Alert",
        tagline: "High-Energy Coronal Mass Ejection En Route!",
        dangerLevel: 'CRITICAL',
        locationName: "Radiation Shield & Solar Array",
        subsystemType: SubsystemType.SOLAR_ARRAY,
        cameraSubsystem: SubsystemType.SOLAR_ARRAY,
        speakerId: 'alex',
        speakerQuote: "Commander! NASA's Space Weather Database (DONKI) confirms an X8.7 solar flare! High-energy protons arriving in minutes!",
        storyIntro: "ORBIT sounds the klaxon: 'Space weather satellites detect relativistic solar protons! Without shielding, unshielded astronauts will absorb over 450 mSv of radiation within hours!'",
        visualProblem: "The Sun unleashes a blinding coronal mass ejection. A swarm of ionizing protons streaks through space toward the outpost's delicate solar wings and living dome.",
        question: "How will you balance shielding protection against your limited battery power?",
        tradeoffPrompt: "Engineering Trade-Off: Active electromagnetic shielding draws massive battery power; underground bunker sheltering saves power but freezes surface science and plant growth.",
        nasaDataReference: {
          datasetId: "DONKI-FLR-2024-05-14T16:51:00-X8.7",
          title: "NASA DONKI Solar Flare & Proton Event",
          badgeLabel: "NASA DONKI Real Feed",
          realValue: "X8.7 Class • Proton Flux > 100 MeV • 1,520 km/s Shock",
          url: "https://kauai.ccmc.gsfc.nasa.gov/DONKI/"
        },
        bestActionId: 'A',
        learningObjective: "Understand that deep space has no magnetic shield. Protecting humans from cosmic radiation requires trading electrical power or operational time.",
        educationalTakeaway: "On Earth, our geomagnetic field deflects solar flares. On the Moon or Mars, astronauts must either spend 30 kW powering electromagnetic deflectors and water pumps or retreat beneath meters of heavy regolith.",
        reflectionQuestion: "Why did our power reserves drop when we activated the radiation shields?",
        choices: [
          {
            id: 'A',
            title: "Deploy Active EM Shield & Water Walls",
            description: "Pump water into the double-hull ceiling and energize the electromagnetic deflection coil.",
            icon: "🛡️",
            isBest: true,
            score: 100,
            stars: 3,
            deltaPower: -25,
            deltaWater: -5,
            deltaFood: 0,
            deltaOxygen: 0,
            deltaCrew: 0,
            deltaScience: 40,
            deltaRadiation_mSv: 0.0,
            engineeringTradeoff: "Trades 25 kW electrical power and 5% water cycling to guarantee 100% crew radiation safety (0 mSv absorbed).",
            compoundingRisk: "Depleted battery reserves mean the outpost has only a narrow power buffer if solar night approaches next!",
            nasaCitation: "NASA SP-2016-6105 Systems Engineering: Active Shielding Power Budgets",
            consequenceTitle: "Crew Completely Shielded!",
            consequenceExplanation: "The water-jacketed walls and magnetic coil absorbed 99.8% of the incoming solar protons. Crew radiation dose remained at 0 mSv, though our battery reserves dropped by 25%.",
            worldVisualEffect: 'balanced_conserve',
            trajectoryForecast: {
              hours: ['0h', '12h', '24h', '36h', '48h'],
              power: [85, 60, 58, 62, 70],
              battery: [85, 60, 55, 60, 68],
              oxygen: [95, 95, 94, 94, 95],
              crew: [100, 100, 100, 100, 100]
            }
          },
          {
            id: 'B',
            title: "Retreat Crew to Underground Regolith Bunker",
            description: "Order astronauts into subterranean lava tube shelter and power down surface arrays.",
            icon: "⛏️",
            isBest: false,
            score: 65,
            stars: 2,
            deltaPower: -5,
            deltaWater: 0,
            deltaFood: -15,
            deltaOxygen: -5,
            deltaCrew: -10,
            deltaScience: 10,
            deltaRadiation_mSv: 4.2,
            engineeringTradeoff: "Saves battery power (only -5 kW), but completely halts surface farming and science; crew endures cramped 24-hour lockdown.",
            compoundingRisk: "Freezing greenhouse LED lights slows crop germination, triggering a temporary food deficit.",
            nasaCitation: "NASA OSDR-485: Subterranean Regolith Shielding Efficacy",
            consequenceTitle: "Crew Safe but Operations Frozen!",
            consequenceExplanation: "Three meters of lunar regolith absorbed the proton storm with zero battery drain! However, cutting greenhouse lighting stunted microgreens and the crew suffered stress.",
            worldVisualEffect: 'emergency_dim',
            trajectoryForecast: {
              hours: ['0h', '12h', '24h', '36h', '48h'],
              power: [85, 80, 78, 80, 82],
              battery: [85, 80, 78, 80, 82],
              oxygen: [95, 90, 88, 89, 90],
              crew: [100, 92, 90, 90, 92]
            }
          },
          {
            id: 'C',
            title: "Overclock Spectrometers for Historic Science",
            description: "Leave exterior sensors running to capture rare solar proton spectroscopy data.",
            icon: "🔬",
            isBest: false,
            score: 30,
            stars: 1,
            deltaPower: -20,
            deltaWater: 0,
            deltaFood: 0,
            deltaOxygen: -10,
            deltaCrew: -35,
            deltaScience: 140,
            deltaRadiation_mSv: 38.5,
            engineeringTradeoff: "Yields a massive +140 Science discovery points, but exposes the outpost to 38.5 mSv of ionizing radiation and damages sensitive electronics.",
            compoundingRisk: "Severe radiation dose forces crew to take medical antioxidants and reduces physical work capacity for upcoming Sols.",
            nasaCitation: "NASA OSDR-120 Twins Study: DNA Damage Under Acute Particle Influx",
            consequenceTitle: "Breakthrough Science at High Human Cost!",
            consequenceExplanation: "Spectacular solar storm data was transmitted to Earth! But cosmic protons degraded sensor glass and astronauts experienced acute radiation symptoms. A dangerous trade-off!",
            worldVisualEffect: 'science_laser',
            trajectoryForecast: {
              hours: ['0h', '12h', '24h', '36h', '48h'],
              power: [85, 65, 60, 58, 60],
              battery: [85, 65, 60, 58, 60],
              oxygen: [95, 85, 80, 82, 85],
              crew: [100, 75, 65, 65, 68]
            }
          }
        ]
      },

      /* Challenge 2: Power Deficit (Dust Storm / Crater Shadow) */
      {
        id: 2,
        destination: 'both',
        name: "Atmospheric Dust Storm & Shadow Brownout",
        tagline: "Solar Photovoltaic Generation Collapses by 75%!",
        dangerLevel: 'HIGH',
        locationName: "Battery Storage Bank & Solar Station",
        subsystemType: SubsystemType.BATTERY_STORAGE,
        cameraSubsystem: SubsystemType.BATTERY_STORAGE,
        speakerId: 'alex',
        speakerQuote: "Commander! Dust optical depth spiked to tau = 1.8! Sunlight is choked off and battery reserves are plummeting!",
        storyIntro: "ORBIT computes: 'Current solar output cannot power both life-support heating and the science laboratory! We must reallocate available watts right now!'",
        visualProblem: "A wall of reddish dust and crater shadows sweeps over the outpost. Photovoltaic power bars plummet into the red as battery cells drain rapidly.",
        question: "Which systems will you prioritize to prevent a catastrophic power grid collapse?",
        tradeoffPrompt: "Engineering Trade-Off: Diverting power exclusively to thermal life support protects astronauts from -130°C freezing, but shuts down science discoveries and long-range communications.",
        nasaDataReference: {
          datasetId: "MARS-MEDA-SOL-1042-DUST",
          title: "NASA Perseverance MEDA Dust Optical Depth",
          badgeLabel: "NASA Surface Telemetry",
          realValue: "Tau = 1.8 • Solar Irradiance Down 74% • Ambient Temp -78°C",
          url: "https://mars.nasa.gov/mars2020/mission/status/"
        },
        bestActionId: 'A',
        learningObjective: "Master energy prioritization: Life-critical thermal and oxygen systems must always receive power before scientific payloads.",
        educationalTakeaway: "In human spaceflight, survival comes first. Mission planners follow strict electrical load-shedding hierarchies: Life Support > Environmental Control > Comms > Science Experiments.",
        reflectionQuestion: "What happens if a space station spends all its electricity on science while the temperature outside is -130°C?",
        choices: [
          {
            id: 'A',
            title: "Load-Shedding: Life Support & Thermal Only",
            description: "Cut power to lab lasers and exterior rovers; guarantee 100% electricity to habitat heating and oxygen scrubbers.",
            icon: "⚡",
            isBest: true,
            score: 100,
            stars: 3,
            deltaPower: 10,
            deltaWater: 0,
            deltaFood: -5,
            deltaOxygen: 5,
            deltaCrew: 0,
            deltaScience: -20,
            deltaRadiation_mSv: 0.2,
            engineeringTradeoff: "Sacrifices 20 science points and rover charging to ensure crew living quarters stay warm (21°C) and pressurized.",
            compoundingRisk: "Research pause postpones upcoming crater water-ice geological survey.",
            nasaCitation: "NASA Systems Engineering Handbook (SP-2016-6105) Section 4.3: Power Margins",
            consequenceTitle: "Power Grid Stabilized Safely!",
            consequenceExplanation: "By pausing the heavy spectrometers and rover charging, battery reserves stabilized at 72%. Inside the habitat, astronauts remained warm and safe!",
            worldVisualEffect: 'balanced_conserve',
            trajectoryForecast: {
              hours: ['0h', '12h', '24h', '36h', '48h'],
              power: [85, 75, 72, 74, 80],
              battery: [85, 75, 72, 74, 80],
              oxygen: [95, 95, 96, 96, 96],
              crew: [100, 100, 100, 100, 100]
            }
          },
          {
            id: 'B',
            title: "Balanced Brownout Protocol (Throttle All Modules)",
            description: "Reduce power uniformly to 40% across habitat, greenhouse, heaters, and lab.",
            icon: "❄️",
            isBest: false,
            score: 60,
            stars: 2,
            deltaPower: -10,
            deltaWater: -5,
            deltaFood: -10,
            deltaOxygen: -10,
            deltaCrew: -15,
            deltaScience: 35,
            deltaRadiation_mSv: 0.5,
            engineeringTradeoff: "Keeps low-power science active (+35 pts), but habitat temperature drops to 8°C causing crew shivering and slowed plant growth.",
            compoundingRisk: "Prolonged cold strains cardiovascular health and risks freezing uninsulated water valves.",
            nasaCitation: "NASA OSDR-485: Thermal Regulation in Confined Habitats",
            consequenceTitle: "Cold Creeps Into Habitat!",
            consequenceExplanation: "You captured 35 science points, but interior temperature plummeted to 8°C. Astronauts wore heavy thermal suits inside and the greenhouse microgreens drooped.",
            worldVisualEffect: 'emergency_dim',
            trajectoryForecast: {
              hours: ['0h', '12h', '24h', '36h', '48h'],
              power: [85, 60, 52, 50, 55],
              battery: [85, 60, 52, 50, 55],
              oxygen: [95, 88, 85, 85, 86],
              crew: [100, 90, 85, 85, 85]
            }
          },
          {
            id: 'C',
            title: "Overclock Batteries / Discharge Emergency Buffer",
            description: "Force battery cells to output 100% current to keep every light, laser, and rover running.",
            icon: "🔥",
            isBest: false,
            score: 25,
            stars: 1,
            deltaPower: -45,
            deltaWater: -10,
            deltaFood: 0,
            deltaOxygen: -15,
            deltaCrew: -25,
            deltaScience: 80,
            deltaRadiation_mSv: 0.8,
            engineeringTradeoff: "Earns +80 science points, but completely drains battery reserve to 18% and degrades lithium-ion cell lifespan by 25%.",
            compoundingRisk: "Critical risk: Outpost has zero reserve capacity if a secondary heater failure strikes!",
            nasaCitation: "NASA SP-2020-01: Energy Storage Depletion & Cell Degradation",
            consequenceTitle: "Severe Battery Brownout Alert!",
            consequenceExplanation: "High-power lasers drained the battery bank down to 18%! Emergency red sirens flashed as voltage sagged dangerously. A reckless gamble with mission survival!",
            worldVisualEffect: 'science_laser',
            trajectoryForecast: {
              hours: ['0h', '12h', '24h', '36h', '48h'],
              power: [85, 40, 22, 18, 25],
              battery: [85, 40, 22, 18, 25],
              oxygen: [95, 82, 78, 75, 78],
              crew: [100, 85, 75, 75, 78]
            }
          }
        ]
      },

      /* Challenge 3: Closed-Loop Water Recycling Failure */
      {
        id: 3,
        destination: 'both',
        name: "Closed-Loop Hydroponic Water Breach",
        tagline: "Water Loop Leaking into Space Vacuum!",
        dangerLevel: 'HIGH',
        locationName: "Greenhouse Supply Bay & Water Recovery Core",
        subsystemType: SubsystemType.GREENHOUSE,
        cameraSubsystem: SubsystemType.GREENHOUSE,
        speakerId: 'mia',
        speakerQuote: "Commander! A micro-perforation cracked our hydroponic feed pipe! Water is boiling away into the vacuum!",
        storyIntro: "ORBIT warns: 'Liquid water in space instantly boils and freezes at the same time due to zero pressure! Every liter lost takes weeks to replace!'",
        visualProblem: "Water droplets spray from a high-pressure seal near the hydroponic plant trays, instantly sublimating into shimmering ice clouds.",
        question: "How will you stop the leak while maintaining food and life-support balances?",
        tradeoffPrompt: "Engineering Trade-Off: Isolating the greenhouse line preserves precious drinking water for astronauts, but cuts off nutrient flow to 30% of growing vegetables.",
        nasaDataReference: {
          datasetId: "NASA-ECLSS-WRS-98PCT",
          title: "NASA Environmental Control & Life Support (ECLSS)",
          badgeLabel: "NASA WRS Benchmark",
          realValue: "98% Closed-Loop Water Recovery • 2.5 Liters/Astronaut/Day",
          url: "https://www.nasa.gov/international-space-station/space-station-research-and-technology/water-recovery-system/"
        },
        bestActionId: 'A',
        learningObjective: "Understand closed-loop life support: In space, water must be recovered at 98% efficiency because lifting water from Earth costs $20,000 per liter.",
        educationalTakeaway: "NASA's Water Recovery System on the ISS recycles urine, sweat, and shower moisture into purer water than municipal tap water. Isolating leaks prevents catastrophic losses to the closed loop.",
        reflectionQuestion: "Why is water called 'heavy gold' in rocket science?",
        choices: [
          {
            id: 'A',
            title: "Isolate Greenhouse Branch & Deploy Sealant Patch",
            description: "Shut off the local biodome isolation valve, vacuum-seal the cracked joint, and preserve potable reserves.",
            icon: "🔧",
            isBest: true,
            score: 100,
            stars: 3,
            deltaPower: -5,
            deltaWater: 10,
            deltaFood: -10,
            deltaOxygen: 0,
            deltaCrew: 0,
            deltaScience: 25,
            deltaRadiation_mSv: 0.0,
            engineeringTradeoff: "Temporarily starves 15% of microgreen trays (-10% Food), but protects 100% of crew drinking water reserves.",
            compoundingRisk: "Crew must rely on pre-packaged freeze-dried meals until hydroponic roots rehydrate.",
            nasaCitation: "NASA ECLSS Architecture: Valve Isolation & Fluid Loss Mitigation",
            consequenceTitle: "Closed Loop Successfully Sealed!",
            consequenceExplanation: "Mia and Alex isolated the leaking manifold and cured the composite patch. Water recycling returned to 98% efficiency with crew drinking water completely protected!",
            worldVisualEffect: 'balanced_conserve',
            trajectoryForecast: {
              hours: ['0h', '12h', '24h', '36h', '48h'],
              power: [85, 80, 80, 82, 85],
              battery: [85, 80, 80, 82, 85],
              oxygen: [95, 95, 94, 95, 95],
              crew: [100, 100, 100, 100, 100]
            }
          },
          {
            id: 'B',
            title: "Over-Pressurize Sabatier Reactor & Electrolyzer",
            description: "Synthesize fresh water from stored hydrogen gas and carbon dioxide at maximum power.",
            icon: "💧",
            isBest: false,
            score: 65,
            stars: 2,
            deltaPower: -30,
            deltaWater: 15,
            deltaFood: 5,
            deltaOxygen: 10,
            deltaCrew: -5,
            deltaScience: 10,
            deltaRadiation_mSv: 0.1,
            engineeringTradeoff: "Synthesizes +15% fresh water and +10% oxygen, but consumes an enormous 30 kW of electrical power.",
            compoundingRisk: "Massive thermal heat output strains outpost radiator panels and reduces night power reserves.",
            nasaCitation: "NASA Sabatier Reactor CO2-Reduction Performance Metrics",
            consequenceTitle: "Water Synthesized at Huge Energy Cost!",
            consequenceExplanation: "The Sabatier catalytic reactor churned out new water molecules, but the electrical surge drained 30% of battery power. A power-hungry engineering compromise!",
            worldVisualEffect: 'science_laser',
            trajectoryForecast: {
              hours: ['0h', '12h', '24h', '36h', '48h'],
              power: [85, 55, 52, 55, 60],
              battery: [85, 55, 52, 55, 60],
              oxygen: [95, 98, 98, 97, 98],
              crew: [100, 96, 95, 95, 96]
            }
          },
          {
            id: 'C',
            title: "Strict Crew Water Rationing Protocol",
            description: "Cut astronaut daily water allowance by 50% while leaving the leak running to inspect pressure.",
            icon: "🚰",
            isBest: false,
            score: 20,
            stars: 1,
            deltaPower: 0,
            deltaWater: -30,
            deltaFood: 5,
            deltaOxygen: 0,
            deltaCrew: -30,
            deltaScience: 30,
            deltaRadiation_mSv: 0.0,
            engineeringTradeoff: "Preserves greenhouse crops, but astronauts suffer dehydration headaches and 30% of total water reserves boil into space.",
            compoundingRisk: "Dehydration rapidly impairs crew cognitive reaction time and increases kidney stone formation risk.",
            nasaCitation: "NASA Human Research Program: Dehydration Biomarkers in Microgravity",
            consequenceTitle: "Severe Water Loss & Crew Dehydration!",
            consequenceExplanation: "Water doesn't wait! 30% of our clean water boiled into space vacuum while astronauts experienced severe dehydration headaches. Never delay isolating a leak!",
            worldVisualEffect: 'emergency_dim',
            trajectoryForecast: {
              hours: ['0h', '12h', '24h', '36h', '48h'],
              power: [85, 85, 84, 85, 85],
              battery: [85, 85, 84, 85, 85],
              oxygen: [95, 95, 94, 94, 95],
              crew: [100, 80, 70, 70, 72]
            }
          }
        ]
      },

      /* Challenge 4: Life Support CO₂ Scrubber Failure (Redundancy vs Energy) */
      {
        id: 4,
        destination: 'both',
        name: "CO₂ Scrubber Motor Jam & Air Redundancy",
        tagline: "Carbon Dioxide Accumulating in Habitat Dome!",
        dangerLevel: 'CRITICAL',
        locationName: "Life Support Habitat Core",
        subsystemType: SubsystemType.HABITAT,
        cameraSubsystem: SubsystemType.HABITAT,
        speakerId: 'leo',
        speakerQuote: "Commander! Primary solid-amine CO₂ scrubber motor seized! Carbon dioxide levels rising past 0.5% atmospheric pressure!",
        storyIntro: "ORBIT displays red warnings: 'Humans exhale 1 kg of carbon dioxide every single day! Without active scrubbers, hypercapnia and drowsiness will incapacitate the crew within 6 hours!'",
        visualProblem: "Amber strobe lights pulse inside the habitat dome. Air quality telemetry graphs trend sharply downward as the primary scrubber fan halts.",
        question: "How will you restore clean breathable air without compromising long-term reserves?",
        tradeoffPrompt: "Engineering Trade-Off: Engaging backup scrubber unit B consumes 18 kW power and burns through the outpost's only secondary spare catalyst; venting into the greenhouse saves power but causes temporary astronaut headaches.",
        nasaDataReference: {
          datasetId: "NASA-STD-3001-CO2",
          title: "NASA Space Flight Human-System Standard: CO₂ Limits",
          badgeLabel: "NASA Health Standard",
          realValue: "< 3.0 mmHg CO₂ Partial Pressure • 0.84 kg O₂/Person/Day",
          url: "https://www.nasa.gov/hhp/standards"
        },
        bestActionId: 'A',
        learningObjective: "Learn redundancy engineering: Aerospace hardware always maintains 1-fault-tolerant (or 2-fault-tolerant) backup systems for life-critical functions.",
        educationalTakeaway: "NASA life-support designs always include redundant parallel units. When primary unit A fails, unit B must be brought online immediately—even if it increases power consumption.",
        reflectionQuestion: "Why does NASA require at least two separate oxygen scrubbers on every human spacecraft?",
        choices: [
          {
            id: 'A',
            title: "Activate Redundant Secondary Scrubber Unit B",
            description: "Engage backup solid-amine bed and assemble the crew in the secondary pressurized module.",
            icon: "🫁",
            isBest: true,
            score: 100,
            stars: 3,
            deltaPower: -18,
            deltaWater: 0,
            deltaFood: 0,
            deltaOxygen: 15,
            deltaCrew: 0,
            deltaScience: 20,
            deltaRadiation_mSv: 0.0,
            engineeringTradeoff: "Consumes 18 kW electrical power and engages the outpost's only backup catalyst, but instantly restores 100% clean breathable air.",
            compoundingRisk: "The outpost now operates without secondary backup until Alex fabricates spare motor parts.",
            nasaCitation: "NASA SP-2020-01: Redundancy Management in Deep-Space Habitats",
            consequenceTitle: "Backup Life Support Online!",
            consequenceExplanation: "Leo switched on redundant Scrubber Unit B! Fresh, crisp oxygen filled the dome, scrubbing CO₂ down to safe nominal levels with zero crew injury.",
            worldVisualEffect: 'balanced_conserve',
            trajectoryForecast: {
              hours: ['0h', '12h', '24h', '36h', '48h'],
              power: [85, 68, 67, 70, 75],
              battery: [85, 68, 67, 70, 75],
              oxygen: [95, 96, 97, 98, 98],
              crew: [100, 100, 100, 100, 100]
            }
          },
          {
            id: 'B',
            title: "Vent Atmosphere into Greenhouse for Plant Uptake",
            description: "Circulate habitat air through the high-density microgreen beds to let plants absorb excess CO₂ naturally.",
            icon: "🌱",
            isBest: false,
            score: 65,
            stars: 2,
            deltaPower: -5,
            deltaWater: -5,
            deltaFood: 20,
            deltaOxygen: -5,
            deltaCrew: -12,
            deltaScience: 30,
            deltaRadiation_mSv: 0.0,
            engineeringTradeoff: "Saves 13 kW of electrical power and accelerates plant photosynthesis (+20% Food), but astronauts suffer 8 hours of mild CO₂ headaches.",
            compoundingRisk: "Crew reaction times slow down temporarily under elevated carbon dioxide partial pressure.",
            nasaCitation: "NASA OSDR-311: Biological Carbon Scrubbing in Plant Habitats",
            consequenceTitle: "Biological Scrubbing Working Slowly!",
            consequenceExplanation: "The plants loved the carbon dioxide and produced accelerated vegetable growth! However, biological absorption was slow, leaving astronauts with mild headaches.",
            worldVisualEffect: 'balanced_conserve',
            trajectoryForecast: {
              hours: ['0h', '12h', '24h', '36h', '48h'],
              power: [85, 80, 80, 81, 83],
              battery: [85, 80, 80, 81, 83],
              oxygen: [95, 86, 88, 90, 92],
              crew: [100, 92, 88, 88, 90]
            }
          },
          {
            id: 'C',
            title: "Order Emergency EVA to Hammer Jammed Motor",
            description: "Send astronaut Leo outside in a spacesuit to hit the external vent valve with a wrench.",
            icon: "👨‍🚀",
            isBest: false,
            score: 25,
            stars: 1,
            deltaPower: 5,
            deltaWater: 0,
            deltaFood: 0,
            deltaOxygen: -25,
            deltaCrew: -35,
            deltaScience: 10,
            deltaRadiation_mSv: 2.4,
            engineeringTradeoff: "Saves electrical power, but exhausts suit consumables and exposes astronaut Leo to dangerous space vacuum hazards and fatigue.",
            compoundingRisk: "Exhausted astronaut requires 48 hours of recovery bedrest, halting habitat maintenance.",
            nasaCitation: "NASA EVA Safety Standards: Risk Assessment for Unplanned Spacewalks",
            consequenceTitle: "Emergency EVA Mishap!",
            consequenceExplanation: "Leo freed the motor, but tearing his suit glove on sharp regolith dust triggered an emergency airlock repressurization siren. Too dangerous when backup systems exist!",
            worldVisualEffect: 'emergency_dim',
            trajectoryForecast: {
              hours: ['0h', '12h', '24h', '36h', '48h'],
              power: [85, 85, 85, 86, 87],
              battery: [85, 85, 85, 86, 87],
              oxygen: [95, 75, 72, 75, 78],
              crew: [100, 75, 65, 65, 68]
            }
          }
        ]
      },

      /* Challenge 5: Deep-Space Communication Latency Dilemma */
      {
        id: 5,
        destination: 'both',
        name: "Deep-Space Light-Travel Delay Paradox",
        tagline: "Radio Signals Take 14 Minutes Each Way to Earth!",
        dangerLevel: 'HIGH',
        locationName: "Deep Space Comm Dish & Mission AI",
        subsystemType: SubsystemType.COMM_ARRAY,
        cameraSubsystem: SubsystemType.COMM_ARRAY,
        speakerId: 'orbit',
        speakerQuote: "Commander! An unexpected firmware feedback loop is overheating our rover drill motor! Light travel time to Earth is 14 minutes!",
        storyIntro: "ORBIT calculates: 'A radio signal to Houston takes 14 minutes, and their reply takes another 14 minutes (28 minutes round-trip)! By then, the drill motor will burn out completely!'",
        visualProblem: "The high-gain parabolic antenna tracks Earth in the sky. Telemetry dials on the drill motor climb past 180°C as the clock ticks relentlessly.",
        question: "Do you wait for Houston flight controllers to diagnose the issue, or make an autonomous on-site decision?",
        tradeoffPrompt: "Engineering Trade-Off: Waiting for Houston guarantees 200 NASA engineers' analysis, but the 28-minute delay destroys hardware; local autonomy acts in 0 seconds, but carries risk if onboard telemetry misreads.",
        nasaDataReference: {
          datasetId: "NASA-DSN-LIGHT-SPEED-LAG",
          title: "NASA Deep Space Network (DSN) Mars-Earth Geometry",
          badgeLabel: "NASA Physics Reality",
          realValue: "Light Speed c = 299,792 km/s • 14.0 min Delay Each Way (28 min Round-Trip)",
          url: "https://eyes.nasa.gov/dsn/dsn.html"
        },
        bestActionId: 'A',
        learningObjective: "Understand the physics of light speed in deep space: Mars astronauts cannot rely on Earth for real-time emergency intervention.",
        educationalTakeaway: "On the Moon, radio delay is only 1.3 seconds. But on Mars (up to 400 million km away), signals take up to 24 minutes each way. Deep-space crews must be autonomous systems engineers.",
        reflectionQuestion: "Why can't Houston Mission Control steer a Mars rover in real time with a joystick?",
        choices: [
          {
            id: 'A',
            title: "Execute Local Autonomous Patch Protocol",
            description: "Authorize ORBIT AI and Chief Engineer Alex to flash onboard firmware immediately without waiting.",
            icon: "🤖",
            isBest: true,
            score: 100,
            stars: 3,
            deltaPower: -5,
            deltaWater: 0,
            deltaFood: 0,
            deltaOxygen: 0,
            deltaCrew: 0,
            deltaScience: 60,
            deltaRadiation_mSv: 0.0,
            engineeringTradeoff: "Takes local crew responsibility without Earth sign-off, but executes in 3 seconds, saving the $80M rover drill motor from destruction.",
            compoundingRisk: "Onboard software patch requires manual telemetry audit during the next rest cycle.",
            nasaCitation: "NASA Autonomous Systems Capability Roadmap: Crew Autonomy for Mars Transit",
            consequenceTitle: "Drill Saved in Seconds!",
            consequenceExplanation: "Alex and ORBIT executed the local bypass script in 4 seconds flat. The drill cooled down safely to 40°C, proving why deep space outposts must be autonomous!",
            worldVisualEffect: 'balanced_conserve',
            trajectoryForecast: {
              hours: ['0h', '12h', '24h', '36h', '48h'],
              power: [85, 80, 80, 82, 85],
              battery: [85, 80, 80, 82, 85],
              oxygen: [95, 95, 95, 95, 95],
              crew: [100, 100, 100, 100, 100]
            }
          },
          {
            id: 'B',
            title: "Transmit Telemetry & Await Houston Command",
            description: "Beam diagnostic dump to Earth and wait 28 minutes for Houston's certified flight director solution.",
            icon: "📡",
            isBest: false,
            score: 40,
            stars: 2,
            deltaPower: -15,
            deltaWater: 0,
            deltaFood: 0,
            deltaOxygen: 0,
            deltaCrew: -10,
            deltaScience: -30,
            deltaRadiation_mSv: 0.0,
            engineeringTradeoff: "Receives a certified NASA engineering patch, but waiting 28 minutes melts the drill motor windings (-30 Science, -15 kW).",
            compoundingRisk: "Rover core drilling capability is permanently disabled until spare motor coils arrive on the next cargo lander.",
            nasaCitation: "NASA DSN Operational Protocol: Critical Event Time Horizon Limitations",
            consequenceTitle: "Houston Solution Arrived Too Late!",
            consequenceExplanation: "Houston's reply was brilliant—but arrived 28 minutes later! By then, the drill motor had melted into slag. A poignant lesson in the relentless physics of deep space light speed!",
            worldVisualEffect: 'emergency_dim',
            trajectoryForecast: {
              hours: ['0h', '12h', '24h', '36h', '48h'],
              power: [85, 70, 68, 70, 72],
              battery: [85, 70, 68, 70, 72],
              oxygen: [95, 95, 95, 95, 95],
              crew: [100, 92, 90, 90, 90]
            }
          },
          {
            id: 'C',
            title: "Maximum Power RF Distress Burst",
            description: "Blast high-gain dish at 150% transmitter power to repeat the emergency packet continuously.",
            icon: "📶",
            isBest: false,
            score: 30,
            stars: 1,
            deltaPower: -35,
            deltaWater: 0,
            deltaFood: 0,
            deltaOxygen: 0,
            deltaCrew: -15,
            deltaScience: 15,
            deltaRadiation_mSv: 0.0,
            engineeringTradeoff: "Wastes 35 kW battery power shouting into space without changing the speed of light; radio waves still travel at c = 300,000 km/s!",
            compoundingRisk: "High transmitter amplifier heat trips thermal circuit breakers across the communications bay.",
            nasaCitation: "Maxwell's Equations & Speed of Light Invariance in Vacuum",
            consequenceTitle: "Power Wasted—Light Speed Cannot Be Rushed!",
            consequenceExplanation: "More transmitter power makes the radio signal louder, but DOES NOT make it travel faster than light! You burned 35% of battery power for zero time advantage.",
            worldVisualEffect: 'science_laser',
            trajectoryForecast: {
              hours: ['0h', '12h', '24h', '36h', '48h'],
              power: [85, 50, 46, 48, 52],
              battery: [85, 50, 46, 48, 52],
              oxygen: [95, 95, 95, 95, 95],
              crew: [100, 88, 85, 85, 85]
            }
          }
        ]
      },

      /* Challenge 6: Deep-Space Hydroponics & Crop Chemistry */
      {
        id: 6,
        destination: 'both',
        name: "OSDR-311 Biodome Nutrition & Harvest Optimization",
        tagline: "Balancing Light Wavelengths, Water, and Vitamins!",
        dangerLevel: 'MODERATE',
        locationName: "Lunar Biodome Greenhouse",
        subsystemType: SubsystemType.GREENHOUSE,
        cameraSubsystem: SubsystemType.GREENHOUSE,
        speakerId: 'mia',
        speakerQuote: "Commander! Our hydroponic chili peppers and microgreens are struggling under sub-optimal LED grow spectra! Fresh food reserves are slipping!",
        storyIntro: "ORBIT pulls NASA OSDR-311 data: 'Crops grown in space need precise red and blue photosynthetic wavelengths. Feeding 4 astronauts requires 2,500 kcal and 90 mg of Vitamin C daily!'",
        visualProblem: "Inside the glass geodesic dome, leafy microgreens and pepper plants droop. Purple LED grow lights cast eerie shadows over nutrient troughs.",
        question: "How will you tune the greenhouse lighting and water recipe?",
        tradeoffPrompt: "Engineering Trade-Off: High-intensity LED lighting maximizes fresh food and biological O₂, but continuously pulls 25 kW electrical power; microalgae reactors use almost zero power, but provide bland spirulina paste that lowers crew morale.",
        nasaDataReference: {
          datasetId: "NASA-OSDR-311-PLANT-HABITAT-04",
          title: "NASA Open Science Data Repository Study OSDR-311",
          badgeLabel: "NASA OSDR Real Study",
          realValue: "Capsicum annuum • 137-day cycle • Anthocyanin & Ascorbic Acid Synthesis",
          url: "https://osdr.nasa.gov/bio/repo/data/study/OSDR-311"
        },
        bestActionId: 'A',
        learningObjective: "Understand biological life support: Plants convert astronaut exhaled CO₂ into oxygen while providing vital fresh nutrients impossible to store long-term in cans.",
        educationalTakeaway: "NASA OSDR-311 demonstrated that plants grown in space synthesize protective antioxidants. Fresh food is essential not just for calories, but for astronaut immune health and morale on multi-year missions.",
        reflectionQuestion: "Why can't astronauts simply eat packaged protein bars for a 3-year mission to Mars?",
        choices: [
          {
            id: 'A',
            title: "Calibrate Optimized Red/Blue LED Spectrum & Nutrients",
            description: "Tune grow LEDs to 660nm red and 430nm blue peaks; balance potassium and nitrate salts from recycled water.",
            icon: "🌱",
            isBest: true,
            score: 100,
            stars: 3,
            deltaPower: -12,
            deltaWater: -8,
            deltaFood: 30,
            deltaOxygen: 12,
            deltaCrew: 8,
            deltaScience: 45,
            deltaRadiation_mSv: 0.0,
            engineeringTradeoff: "Invests 12 kW electrical power and 8% water cycling to reap +30% fresh vegetables, +12% biological oxygen, and high crew morale.",
            compoundingRisk: "Nutrient reservoir requires scheduled top-up from mineral reserves in 5 Sols.",
            nasaCitation: "NASA OSDR-311: Spectral Tuning for Photosynthetic Efficiency",
            consequenceTitle: "Bumper Harvest of Fresh Produce!",
            consequenceExplanation: "Vibrant emerald leaves and crisp red peppers erupted across the biodome! Fresh Vitamin C and sweet oxygen revitalized the astronauts' stamina and spirits!",
            worldVisualEffect: 'balanced_conserve',
            trajectoryForecast: {
              hours: ['0h', '12h', '24h', '36h', '48h'],
              power: [85, 73, 72, 75, 80],
              battery: [85, 73, 72, 75, 80],
              oxygen: [95, 98, 100, 100, 100],
              crew: [100, 100, 100, 100, 100]
            }
          },
          {
            id: 'B',
            title: "Switch Exclusively to Microalgae (Spirulina) Slurry",
            description: "Divert all water and lighting to high-density photobioreactor tubes producing green protein paste.",
            icon: "🧪",
            isBest: false,
            score: 65,
            stars: 2,
            deltaPower: -4,
            deltaWater: -2,
            deltaFood: 35,
            deltaOxygen: 18,
            deltaCrew: -10,
            deltaScience: 25,
            deltaRadiation_mSv: 0.0,
            engineeringTradeoff: "Superb energy efficiency (saves 8 kW power) and high calorie yield (+35%), but eating slimy green paste daily depresses crew morale (-10%).",
            compoundingRisk: "Crew psychological burnout increases when denied appetizing solid food textures.",
            nasaCitation: "NASA Human Factors & Behavioral Performance: Food Acceptability Studies",
            consequenceTitle: "Abundant Calories, Sad Astronauts!",
            consequenceExplanation: "The algae bioreactor yielded tons of nutritious protein with barely any electricity! But eating tasteless green slime three meals a day lowered crew happiness.",
            worldVisualEffect: 'balanced_conserve',
            trajectoryForecast: {
              hours: ['0h', '12h', '24h', '36h', '48h'],
              power: [85, 81, 80, 82, 85],
              battery: [85, 81, 80, 82, 85],
              oxygen: [95, 98, 100, 100, 100],
              crew: [100, 94, 90, 90, 90]
            }
          },
          {
            id: 'C',
            title: "Shut Down Greenhouse & Rely Solely on Canned Rations",
            description: "Deactivate all biodome LED lamps and pumps; feed crew exclusively from vacuum-sealed MRE pouches.",
            icon: "🥫",
            isBest: false,
            score: 25,
            stars: 1,
            deltaPower: 15,
            deltaWater: 5,
            deltaFood: -40,
            deltaOxygen: -15,
            deltaCrew: -25,
            deltaScience: -10,
            deltaRadiation_mSv: 0.0,
            engineeringTradeoff: "Saves 15 kW power and 5% water, but all living crops die, eliminating biological oxygen renewal and fresh micronutrients.",
            compoundingRisk: "Exhaustion of finite packaged food reserves puts the mission on a countdown clock to starvation.",
            nasaCitation: "NASA Advanced Food Technology: Shelf-Life & Nutrient Degradation",
            consequenceTitle: "Living Ecosystem Destroyed!",
            consequenceExplanation: "Turning off the grow lights killed all the living plants. Oxygen generation dropped, fresh vitamins disappeared, and the outpost became completely dependent on finite cans.",
            worldVisualEffect: 'emergency_dim',
            trajectoryForecast: {
              hours: ['0h', '12h', '24h', '36h', '48h'],
              power: [85, 95, 95, 95, 95],
              battery: [85, 95, 95, 95, 95],
              oxygen: [95, 80, 78, 78, 80],
              crew: [100, 82, 75, 75, 75]
            }
          }
        ]
      }
    ];
  }

  public static getSubsystems(state: ResourceState): SubsystemState[] {
    const isMars = state.destination === 'mars';
    return [
      {
        type: SubsystemType.HABITAT,
        title: isMars ? "Jezero Mars Habitat Core" : "Main Lunar Crew Habitat",
        emoji: "🏠",
        shortName: "Habitat",
        health: Math.round(state.crewSafety),
        active: true,
        powerConsumption: 18,
        statusText: isMars ? "Pressurized 1.0 ATM (MOXIE O₂ Cycle)" : "Pressurized Living Quarters (1.0 ATM)",
        kidExplanation: "Where our astronaut team sleeps, eats, exercises, and stays safe from deep space vacuum.",
        position: [0, 0, 0]
      },
      {
        type: SubsystemType.SOLAR_ARRAY,
        title: isMars ? "Dust-Tolerant Solar Station" : "Solar Power Station",
        emoji: "☀️",
        shortName: "Solar",
        health: 96,
        active: true,
        powerConsumption: isMars ? -38 : -50,
        statusText: isMars ? "Tracking Sun through Martian Haze" : "Tracking Sunlight across Lunar Crater",
        kidExplanation: "Giant solar wings catch bright sunlight and convert it into clean electricity for the base.",
        position: [-14, 0, 8]
      },
      {
        type: SubsystemType.BATTERY_STORAGE,
        title: "Battery Storage Bank",
        emoji: "🔋",
        shortName: "Battery",
        health: 92,
        active: true,
        powerConsumption: 0,
        statusText: `${Math.round(state.battery)}% Stored Capacity (${Math.round(state.power)} kW Grid)`,
        kidExplanation: "High-capacity lithium cells store electricity for when dust storms or mountains block the Sun.",
        position: [-6, 0, 5]
      },
      {
        type: SubsystemType.GREENHOUSE,
        title: isMars ? "Martian Hydroponic Biodome" : "Lunar Biodome Greenhouse",
        emoji: "🌱",
        shortName: "Greenhouse",
        health: Math.round(state.food),
        active: true,
        powerConsumption: 12,
        statusText: `Microgreens & Vegetables (${Math.round(state.food)}% Food)`,
        kidExplanation: "Hydroponic plants make crisp salads and naturally recycle astronaut CO₂ into sweet oxygen.",
        position: [8, 0, -4]
      },
      {
        type: SubsystemType.SCIENCE_LAB,
        title: "Science Laboratory",
        emoji: "🔬",
        shortName: "Science",
        health: 94,
        active: true,
        powerConsumption: 14,
        statusText: `Spectrometer Core Analysis (${state.scienceScore} pts)`,
        kidExplanation: "Robotic microscopes analyze rock cores to find buried crater water-ice and rare minerals.",
        position: [6, 0, 6]
      },
      {
        type: SubsystemType.COMM_ARRAY,
        title: "Deep Space Comm Dish",
        emoji: "📡",
        shortName: "Comms",
        health: 95,
        active: true,
        powerConsumption: 8,
        statusText: isMars ? `14.0 min Light-Travel Lag to Earth` : `1.3 sec Direct Link to Houston`,
        kidExplanation: isMars
          ? "High-gain parabolic dish beaming telemetry across 200 million miles of deep space."
          : "Radio dish beamed directly toward Earth in the sky above the crater rim.",
        position: [-4, 0, -8]
      },
      {
        type: SubsystemType.ROVER,
        title: isMars ? "Autonomous Mars Rover" : "Lunar Exploration Rover",
        emoji: "🚙",
        shortName: "Rover",
        health: 88,
        active: true,
        powerConsumption: 6,
        statusText: "Ready for Surface Surveys",
        kidExplanation: "Six-wheeled robotic explorer with a robotic sampling arm that surveys distant craters.",
        position: [12, 0, 8]
      }
    ];
  }

  public static getAskOrbitQuestions(): AskOrbitItem[] {
    return [
      {
        id: 'q_solar_storm',
        question: 'What is a Solar Flare and is it fire?',
        emoji: '☀️',
        shortAnswer: 'It is invisible high-energy radiation and charged protons, not fire!',
        deepDive: 'The Sun shoots giant bursts of ionizing X-rays and proton bullets at millions of miles per hour (NASA DONKI records speeds over 2,000 km/s!). Thick water walls or underground regolith absorb this energy so astronauts stay healthy.',
        nasaDataLink: 'https://kauai.ccmc.gsfc.nasa.gov/DONKI/'
      },
      {
        id: 'q_mars_comms_delay',
        question: 'Why does a message to Mars take 14 minutes?',
        emoji: '📡',
        shortAnswer: 'Because even light speed has a speed limit across millions of miles!',
        deepDive: 'Radio waves travel at the speed of light (300,000 km/s). Mars is so far away that signals take between 4 and 24 minutes to get there. That means astronauts on Mars must make their own emergency decisions rather than waiting for Houston!',
        nasaDataLink: 'https://eyes.nasa.gov/dsn/dsn.html'
      },
      {
        id: 'q_osdr_biology',
        question: 'How does NASA know what space does to human bodies?',
        emoji: '🧬',
        shortAnswer: 'Through the Open Science Data Repository (OSDR) and the NASA Twins Study!',
        deepDive: 'In study OSDR-120, NASA compared astronaut Scott Kelly (who spent a year in space) with his identical twin Mark on Earth. They found that cells repair DNA in space, but bones lose about 1.5% density per month unless astronauts exercise hard daily.',
        nasaDataLink: 'https://osdr.nasa.gov/'
      },
      {
        id: 'q_water_recycle',
        question: 'How do astronauts recycle water on an outpost?',
        emoji: '💧',
        shortAnswer: 'Special filters distill sweat, shower runoff, and moisture back into 98% pure water!',
        deepDive: 'Lifting water into space costs roughly $20,000 per liter! NASA engineers designed the Water Recovery System (WRS) to recycle 98% of all water in a closed loop. The recycled water astronauts drink is actually purer than city tap water on Earth.',
        nasaDataLink: 'https://www.nasa.gov/international-space-station/space-station-research-and-technology/water-recovery-system/'
      },
      {
        id: 'q_plants_air',
        question: 'How do plants give astronauts oxygen to breathe?',
        emoji: '🌱',
        shortAnswer: 'Plants breathe in astronaut CO₂ and breathe out fresh O₂ through photosynthesis!',
        deepDive: 'Under NASA OSDR-311 research, plants like chili peppers and microgreens thrive under specific red and blue LED lights. They absorb the carbon dioxide astronauts exhale and release crisp oxygen, while also supplying fresh vitamins A and C.',
        nasaDataLink: 'https://osdr.nasa.gov/bio/repo/data/study/OSDR-311'
      },
      {
        id: 'q_redundancy',
        question: 'What is "Redundancy" in NASA engineering?',
        emoji: '🫁',
        shortAnswer: 'Always having a backup copy of critical machines ready to take over!',
        deepDive: 'NASA engineers follow the rule of redundancy: If primary machine A breaks or loses power, backup unit B can turn on in seconds. That way, astronauts never run out of oxygen or heating during an emergency.',
        nasaDataLink: 'https://www.nasa.gov/hhp/standards'
      }
    ];
  }

  /**
   * Sol Simulation Sandbox Engine
   * Calculates daily balances when player advances a Sol in Mission Control Sandbox
   */
  public static simulateSol(
    currentState: ResourceState,
    alloc: SandboxAllocation
  ): { updatedState: ResourceState; log: SolLogEntry } {
    const isMars = currentState.destination === 'mars';
    const nextSol = currentState.sol + 1;
    
    // Total Power Allocated
    const totalAllocatedPower = alloc.lifeSupport + alloc.thermal + alloc.shielding + alloc.greenhouse + alloc.science + alloc.comms;
    const availablePowerGen = isMars ? 80 : 90;
    const netPowerDelta = availablePowerGen - totalAllocatedPower;

    // Water Balances (Normal consumption: 10% per Sol, greenhouse recycling recovers up to 8%)
    const waterConsumed = 10;
    const waterRecycled = alloc.greenhouse >= 12 ? 8 : 4;
    const netWaterDelta = waterRecycled - waterConsumed;

    // Oxygen Balances (Humans consume 8% per Sol, scrubbers + plants generate based on power)
    const o2Consumed = 8;
    const o2Generated = (alloc.lifeSupport >= 20 ? 6 : 2) + (alloc.greenhouse >= 12 ? 4 : 1);
    const netO2Delta = o2Generated - o2Consumed;

    // Food Balances (Crew eats 8% per Sol, greenhouse produces based on allocation)
    const foodConsumed = 8;
    const foodHarvested = alloc.greenhouse >= 15 ? 12 : alloc.greenhouse >= 10 ? 8 : 3;
    const netFoodDelta = foodHarvested - foodConsumed;

    // Science Gained
    const scienceEarned = Math.round((alloc.science / 15) * 35 + (alloc.comms >= 10 ? 15 : 0));

    // Radiation Absorbed in Sol (Baseline mSv, reduced by active shielding)
    const baseDailyRadiation = isMars ? 0.64 : 1.36;
    const shieldFactor = Math.max(0.05, 1 - (alloc.shielding / 20));
    const solRadiationDose = parseFloat((baseDailyRadiation * shieldFactor).toFixed(3));

    // Crew Health Impact
    let crewHealthDelta = 0;
    if (alloc.thermal < 15) crewHealthDelta -= 10; // freezing cold!
    if (alloc.lifeSupport < 18) crewHealthDelta -= 15; // insufficient CO2 scrubbing!
    if (currentState.water <= 20) crewHealthDelta -= 10;
    if (currentState.food <= 20) crewHealthDelta -= 10;
    if (alloc.thermal >= 18 && alloc.lifeSupport >= 20 && currentState.water > 40) {
      crewHealthDelta += 5; // recovery!
    }

    // Space Weather Events during Sol (pulled from DONKI style scenarios)
    const weatherEvents = [
      { title: "Calm Solar Sol", icon: "☀️", note: "Nominal solar irradiance across outpost wings." },
      { title: "DONKI Solar Particle Influx", icon: "⚡", note: "Moderate SEP protons deflected by base shielding." },
      { title: isMars ? "Dust Haze Sol (Tau 1.2)" : "Crater Ridge Grazing Shadow", icon: "🌫️", note: "Solar output temporarily dipped by 15%." },
      { title: "High-Efficiency Hydroponic Bloom", icon: "🌱", note: "Microgreens accelerated biological oxygen recycling." }
    ];
    const event = weatherEvents[nextSol % weatherEvents.length];

    const updated: ResourceState = {
      ...currentState,
      sol: nextSol,
      power: Math.max(0, Math.min(100, currentState.power + (netPowerDelta > 0 ? 5 : -10))),
      battery: Math.max(0, Math.min(100, currentState.battery + Math.round(netPowerDelta * 0.4))),
      water: Math.max(0, Math.min(100, currentState.water + netWaterDelta)),
      food: Math.max(0, Math.min(100, currentState.food + netFoodDelta)),
      oxygen: Math.max(0, Math.min(100, currentState.oxygen + netO2Delta)),
      crewHealth: Math.max(0, Math.min(100, currentState.crewHealth + crewHealthDelta)),
      crewSafety: Math.max(0, Math.min(100, currentState.crewSafety + crewHealthDelta)),
      scienceScore: currentState.scienceScore + scienceEarned,
      radiationDose_mSv: parseFloat((currentState.radiationDose_mSv + solRadiationDose).toFixed(3)),
      radiationRate_mSv_day: solRadiationDose
    };

    const log: SolLogEntry = {
      sol: nextSol,
      destination: currentState.destination,
      eventTitle: event.title,
      eventIcon: event.icon,
      netPower: netPowerDelta,
      netWater: netWaterDelta,
      netFood: netFoodDelta,
      netOxygen: netO2Delta,
      radiationDose: solRadiationDose,
      scienceGained: scienceEarned,
      notes: event.note
    };

    return { updatedState: updated, log };
  }
}
