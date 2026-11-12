export enum RadiationSeverity {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL"
}

export enum FutureRiskStatus {
  SAFE = "SAFE",
  RISKY = "RISKY",
  FAIL = "FAIL"
}

export enum GreenhouseMode {
  SAVE_RESOURCES = "Conserve",
  BALANCED = "Standard",
  GROW_MORE = "Grow More"
}

export enum ScienceMode {
  PAUSED = "Paused",
  ACTIVE = "Standard",
  HIGH_OUTPUT = "Intensive"
}

export enum SubsystemType {
  SOLAR_ARRAY = "SOLAR_ARRAY",
  GREENHOUSE = "GREENHOUSE",
  HABITAT = "HABITAT",
  SCIENCE_LAB = "SCIENCE_LAB",
  BATTERY_STORAGE = "BATTERY_STORAGE",
  COMM_ARRAY = "COMM_ARRAY",
  ROVER = "ROVER",
  RADIATION_SHIELD = "RADIATION_SHIELD"
}

export type DestinationType = 'moon' | 'mars';
export type DifficultyMode = 'junior' | 'commander';

export interface ResourceState {
  power: number;         // 0..100 %
  battery: number;       // 0..100 %
  water: number;         // 0..100 %
  food: number;          // 0..100 %
  oxygen: number;        // 0..100 %
  crewHealth: number;    // 0..100 %
  crewSafety: number;    // 0..100 % alias
  scienceScore: number;  // points
  radiationDose_mSv: number; // Real NASA dosimetry in mSv
  radiationRate_mSv_day: number;
  commsLatencySec: number;   // 1.3s for Moon, 840s (14 min) for Mars
  sol: number;               // Current day / Sol
  destination: DestinationType;
  dustOpticalDepth?: number; // Tau on Mars
  surfaceTemp?: number;      // °C
  radiation?: RadiationSeverity;
  shieldingActive?: boolean;
  solarIrradiance?: number;
  greenhouseMode?: GreenhouseMode;
  scienceMode?: ScienceMode;
}

export interface SubsystemState {
  type: SubsystemType;
  title: string;
  emoji: string;
  shortName: string;
  health: number;
  active: boolean;
  powerConsumption?: number; // negative is generation
  statusText: string;
  kidExplanation: string;
  actionName?: string;
  position: [number, number, number]; // 3D coordinates in world
}

export interface CrewMember {
  id: 'commander' | 'alex' | 'mia' | 'leo' | 'orbit';
  name: string;
  role: string;
  title: string;
  avatar: string;
  emoji: string;
  color: string;
  responsibilities: string;
  catchphrase: string;
}

export interface TrajectoryForecast {
  hours: string[];
  power: number[];
  battery: number[];
  oxygen: number[];
  crew: number[];
}

export interface QuestChoice {
  id: 'A' | 'B' | 'C';
  title: string;
  description: string;
  icon: string;
  isBest: boolean;
  score: number; // 100 for best, 60 for partial, 20 for risky
  stars: number; // 3 for optimal, 2 for acceptable, 1 for retry
  deltaPower: number;
  deltaWater: number;
  deltaFood: number;
  deltaOxygen: number;
  deltaCrew: number;
  deltaScience?: number;
  deltaRadiation_mSv?: number;
  
  // Real Engineering Trade-Off Fields
  engineeringTradeoff: string;   // e.g., "Sacrifices 30 kW battery power to guarantee 0 mSv radiation dose."
  compoundingRisk: string;       // e.g., "Low battery into the 14-day lunar night leaves no reserve for heating!"
  nasaCitation: string;          // e.g., "NASA DONKI SEP Event GLE73 / OSDR-120"
  
  consequenceTitle: string;
  consequenceExplanation: string;
  worldVisualEffect: 'science_laser' | 'balanced_conserve' | 'emergency_dim';
  trajectoryForecast?: TrajectoryForecast;
}

export interface NasaDataReference {
  datasetId: string;
  title: string;
  badgeLabel: string;
  realValue: string;
  url: string;
}

export interface QuestChallenge {
  id: number;
  destination: DestinationType | 'both';
  name: string;
  tagline: string;
  dangerLevel: 'MILD' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  locationName: string;
  subsystemType: SubsystemType;
  cameraSubsystem: SubsystemType;
  speakerId: 'alex' | 'mia' | 'leo' | 'orbit';
  speakerQuote: string;
  storyIntro: string;
  visualProblem: string;
  question: string;
  tradeoffPrompt: string; // Clearly explains the dilemma to students
  nasaDataReference: NasaDataReference;
  choices: QuestChoice[];
  bestActionId: 'A' | 'B' | 'C';
  learningObjective: string;
  educationalTakeaway: string;
  reflectionQuestion: string;
}

export interface QuestBadge {
  id: string;
  title: string;
  emoji: string;
  description: string;
  unlocked: boolean;
  challengeId?: number;
  nasaRef?: string;
}

export interface JuniorBadge extends QuestBadge {}

export interface AskOrbitItem {
  id: string;
  question: string;
  shortAnswer: string;
  deepDive: string;
  emoji: string;
  nasaDataLink?: string;
}

export interface SandboxAllocation {
  lifeSupport: number; // kW allocated (nominal ~25 kW)
  thermal: number;     // kW allocated (nominal ~20 kW)
  shielding: number;   // kW allocated (nominal ~15 kW)
  greenhouse: number;  // kW allocated (nominal ~15 kW)
  science: number;     // kW allocated (nominal ~15 kW)
  comms: number;       // kW allocated (nominal ~10 kW)
}

export interface SolLogEntry {
  sol: number;
  destination: DestinationType;
  eventTitle: string;
  eventIcon: string;
  netPower: number;
  netWater: number;
  netFood: number;
  netOxygen: number;
  radiationDose: number;
  scienceGained: number;
  notes: string;
}
