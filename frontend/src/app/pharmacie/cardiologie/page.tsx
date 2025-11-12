// src/app/pharmacie/cardiologie/page.tsx

'use client'

import type { Metadata } from 'next';
import MainLayout from '@/components/layout/Layout';
import React, { FC, useState, useEffect, useRef } from 'react';
import { motion, Variants, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Heart, Activity, TrendingUp, Shield, BarChart, Clock, 
  Zap, Phone, User, CheckCircle, ArrowRight, Star,Calendar, FileText, Video, MessageCircle,
  ChevronLeft, ChevronRight, Play, X, Brain,
  Stethoscope, Microscope, Pill, Waves, Pause,
  ShieldCheck, Users, FileCheck, Bot, Sparkles,
  Target, BarChart3, CalendarDays, Clock4, Eye,
  BadgeCheck, Award, GraduationCap, ScanHeart,
  ActivitySquare, HeartPulse, BrainCircuit, Network,
  Database, Cpu, Satellite, Cloud, Lock, Globe,
  Zap as Lightning, Activity as Pulse, Shield as Security,
  BarChart as Analytics, Users as Team, Download,
  Upload, Wifi, WifiOff, Battery, BatteryCharging,
  Cctv, Radio, SatelliteDish, Server, HardDrive,
  Cpu as Processor, MemoryStick, Router, Smartphone,
  Tablet, Laptop, Monitor, Printer,
  Camera, Video as VideoIcon, Mic, Headphones,
  Speaker, Volume2, VolumeX, Bell, BellOff,
  Settings, Wrench, Hammer, Construction,
  Factory, Warehouse, Home, Building, Ban,
  Hospital, School, University, Church, Castle,
  Crown, Medal, Trophy, Flag, MapPin, Navigation,
  Compass, Globe2, Map, Layers, Grid,
  Layout, Sidebar, Menu, Square, Circle,
  Triangle, Hexagon, Octagon, Box,
  Package, Truck, Plane, Ship, Rocket,
  Car, Bike, Bus, Train,
  Car as Automobile,
  TrafficCone, Lightbulb, Flashlight, Sun,
  Moon, Cloud as CloudIcon, CloudRain,
  CloudSnow, CloudLightning, Wind, Umbrella,
  Droplets, Thermometer, Gauge, Watch,
  Calendar as CalendarIcon, Clock as ClockIcon,
  Heart as HeartIcon, Brain as BrainIcon,
  Eye as EyeIcon, Ear,
  Bone, Skull, Dna, Microscope as MicroscopeIcon,
  TestTube, Beaker, Pill as PillIcon,
  Syringe, Scale, Stethoscope as StethoscopeIcon,
  Book, BookOpen, Bookmark, File,
  Folder, Archive, Download as DownloadIcon,
  Upload as UploadIcon, Send, Mail,
  Inbox, Trash2, Archive as ArchiveIcon,
  Copy, Clipboard, CheckSquare, Square as SquareIcon,
  Edit3, Type, Bold, Italic, Underline,
 Image, Film, Music, Headphones as HeadphonesIcon,
  Video as VideoIcon2, Camera as CameraIcon,
  Mic as MicIcon, Volume as VolumeIcon,
  Play as PlayIcon, Pause as PauseIcon,
  SkipBack, SkipForward, Rewind, FastForward,
  Repeat, Shuffle, Music as MusicIcon,
  Search, ZoomIn, ZoomOut, Plus,
  Minus, X as XIcon, Divide, Percent,
  DollarSign, Euro, Bitcoin,
  CreditCard, ShoppingCart, Package as PackageIcon,
  Tag, Gift, Heart as HeartIcon2,
  ThumbsUp, ThumbsDown, Star as StarIcon,
  Flag as FlagIcon, Award as AwardIcon,
  Crown as CrownIcon, Medal as MedalIcon,
  Trophy as TrophyIcon, Shield as ShieldIcon,
  Lock as LockIcon, Unlock, Key,
  EyeOff, Eye as EyeIcon2, Bell as BellIcon,
  BellOff as BellOffIcon, Settings as SettingsIcon,
  User as UserIcon, Users as UsersIcon,
  UserPlus, UserCheck, UserX,
  MessageCircle as MessageCircleIcon,
  MessageSquare, MessageSquareText,
  Phone as PhoneIcon, PhoneCall, PhoneOff,
  PhoneForwarded, PhoneIncoming, PhoneOutgoing,
  PhoneMissed, Voicemail, Video as VideoIcon3,
  VideoOff, Camera as CameraIcon2,
  CameraOff, Mic as MicIcon2, MicOff,
  Headphones as HeadphonesIcon2,
  Speaker as SpeakerIcon, VolumeX as VolumeXIcon,
  Volume1, Volume2 as Volume2Icon,
  PlayCircle, PauseCircle, StopCircle,
  Radio as RadioIcon, Tv, Monitor as MonitorIcon,
  Smartphone as SmartphoneIcon, Tablet as TabletIcon,
  Laptop as LaptopIcon, Printer as PrinterIcon,
  HardDrive as HardDriveIcon,
  Server as ServerIcon, Database as DatabaseIcon,
  Cpu as CpuIcon,
  Router as RouterIcon, Cloud as CloudIcon2,
  Wifi as WifiIcon, WifiOff as WifiOffIcon,
  Bluetooth, Battery as BatteryIcon,
  BatteryCharging as BatteryChargingIcon,
  Thermometer as ThermometerIcon,
  Gauge as GaugeIcon, Watch as WatchIcon,
  Clock as ClockIcon2, Calendar as CalendarIcon2,
  Sun as SunIcon, Moon as MoonIcon,
  Cloud as CloudIcon3, CloudRain as CloudRainIcon,
  CloudSnow as CloudSnowIcon, CloudLightning as CloudLightningIcon,
  Wind as WindIcon, Umbrella as UmbrellaIcon,
  Droplets as DropletsIcon, Flame,
  Trees, Mountain, Coffee, Beer,
  Wine, Pizza, Hamburger, IceCream,
  Cake, Apple, Banana, Carrot,
  Leaf, Gem, Diamond, Circle as CircleIcon,
  Square as SquareIcon2, Triangle as TriangleIcon,
  Hexagon as HexagonIcon, Octagon as OctagonIcon,
  Box as BoxIcon,
  Package as PackageIcon2, Truck as TruckIcon,
  Plane as PlaneIcon, Ship as ShipIcon,
  Rocket as RocketIcon, Car as CarIcon,
  Bike as BikeIcon, Bus as BusIcon,
  Train as TrainIcon,
  TrafficCone as TrafficConeIcon, Lightbulb as LightbulbIcon,
  Flashlight as FlashlightIcon, Sun as SunIcon2,
  Moon as MoonIcon2, Cloud as CloudIcon4,
  CloudRain as CloudRainIcon2, CloudSnow as CloudSnowIcon2,
  CloudLightning as CloudLightningIcon2, Wind as WindIcon2,
  Umbrella as UmbrellaIcon2, Droplets as DropletsIcon2,
  Thermometer as ThermometerIcon2, Gauge as GaugeIcon2,
  Watch as WatchIcon2, Clock as ClockIcon3,
  Calendar as CalendarIcon3, Heart as HeartIcon3,
  Brain as BrainIcon2, Eye as EyeIcon3,
  Ear as EarIcon,
  Bone as BoneIcon,
  Skull as SkullIcon, Dna as DNAIcon,
  Microscope as MicroscopeIcon2, TestTube as TestTubeIcon,
  Beaker as BeakerIcon,
  Pill as PillIcon2, Syringe as SyringeIcon,
  Scale as ScalpelIcon, Stethoscope as StethoscopeIcon2,
  Book as BookIcon, BookOpen as BookOpenIcon,
  Bookmark as BookmarkIcon, File as FileIcon,
  Folder as FolderIcon, Archive as ArchiveIcon2,
  Download as DownloadIcon2, Upload as UploadIcon2,
  Send as SendIcon, Mail as MailIcon,
  Inbox as InboxIcon,
  Trash2 as TrashIcon, Archive as ArchiveIcon3,
  Copy as CopyIcon, Clipboard as ClipboardIcon,
  CheckSquare as CheckSquareIcon, Square as SquareIcon3,
  Edit3 as EditIcon, Type as TypeIcon,
  Bold as BoldIcon, Italic as ItalicIcon,
  Underline as UnderlineIcon, Link as LinkIcon,
  Image as ImageIcon, Film as FilmIcon,
  Music as MusicIcon2, Headphones as HeadphonesIcon3,
  Video as VideoIcon4, Camera as CameraIcon3,
  Mic as MicIcon3, Volume as VolumeIcon2,
  Play as PlayIcon2, Pause as PauseIcon2,
  SkipBack as SkipBackIcon, SkipForward as SkipForwardIcon,
  Rewind as RewindIcon, FastForward as FastForwardIcon,
  Repeat as RepeatIcon, Shuffle as ShuffleIcon,
  Music as MusicIcon3, Search as SearchIcon,
  ZoomIn as ZoomInIcon, ZoomOut as ZoomOutIcon,
  Plus as PlusIcon, Minus as MinusIcon,
  X as XIcon2, Divide as DivideIcon,
  Percent as PercentIcon, DollarSign as DollarIcon,
  Euro as EuroIcon,
  Bitcoin as BitcoinIcon, CreditCard as CreditCardIcon,
  ShoppingCart as ShoppingCartIcon, Package as PackageIcon3,
  Tag as TagIcon, Gift as GiftIcon,
  Heart as HeartIcon4, ThumbsUp as ThumbsUpIcon,
  ThumbsDown as ThumbsDownIcon, Star as StarIcon2,
  Flag as FlagIcon2, Award as AwardIcon2,
  Crown as CrownIcon2, Medal as MedalIcon2,
  Trophy as TrophyIcon2, Shield as ShieldIcon2,
  Lock as LockIcon2, Unlock as UnlockIcon,
  Key as KeyIcon, EyeOff as EyeOffIcon,
  Eye as EyeIcon4, Bell as BellIcon2,
  BellOff as BellOffIcon2, Settings as SettingsIcon2,
  User as UserIcon2, Users as UsersIcon2,
  UserPlus as UserPlusIcon, UserCheck as UserCheckIcon,
  UserX as UserXIcon, MessageCircle as MessageCircleIcon2,
  MessageSquare as MessageSquareIcon, MessageSquareText as MessageSquareTextIcon,
  Phone as PhoneIcon2, PhoneCall as PhoneCallIcon,
  PhoneOff as PhoneOffIcon, PhoneForwarded as PhoneForwardedIcon,
  PhoneIncoming as PhoneIncomingIcon, PhoneOutgoing as PhoneOutgoingIcon,
  PhoneMissed as PhoneMissedIcon, Voicemail as VoicemailIcon,
  Video as VideoIcon5, VideoOff as VideoOffIcon,
  Camera as CameraIcon4, CameraOff as CameraOffIcon,
  Mic as MicIcon4, MicOff as MicOffIcon,
  Headphones as HeadphonesIcon4, Speaker as SpeakerIcon2,
  VolumeX as VolumeXIcon2, Volume1 as Volume1Icon,
  Volume2 as Volume2Icon2, PlayCircle as PlayCircleIcon,
  PauseCircle as PauseCircleIcon, StopCircle as StopCircleIcon,
  Radio as RadioIcon2, Tv as TvIcon,
  Monitor as MonitorIcon2, Smartphone as SmartphoneIcon2,
  Tablet as TabletIcon2, Laptop as LaptopIcon2,
  Printer as PrinterIcon2,
  HardDrive as HardDriveIcon2, Server as ServerIcon2,
  Database as DatabaseIcon2, Cpu as CpuIcon2,
  Router as RouterIcon2,
  Cloud as CloudIcon5, Wifi as WifiIcon2,
  WifiOff as WifiOffIcon2, Bluetooth as BluetoothIcon,
  Battery as BatteryIcon2, BatteryCharging as BatteryChargingIcon2,
  Thermometer as ThermometerIcon3, Gauge as GaugeIcon3,
  Watch as WatchIcon3, Clock as ClockIcon4,
  Calendar as CalendarIcon4, Sun as SunIcon3,
  Moon as MoonIcon3, Cloud as CloudIcon6,
  CloudRain as CloudRainIcon3, CloudSnow as CloudSnowIcon3,
  CloudLightning as CloudLightningIcon3, Wind as WindIcon3,
  Umbrella as UmbrellaIcon3, Droplets as DropletsIcon3,
  Flame as FlameIcon, Trees as TreeIcon,
  Mountain as MountainIcon, Coffee as CoffeeIcon,
  Beer as BeerIcon, Wine as WineIcon,
  Pizza as PizzaIcon, Hamburger as HamburgerIcon,
  IceCream as IceCreamIcon, Cake as CakeIcon,
  Apple as AppleIcon, Banana as BananaIcon,
  Carrot as CarrotIcon, Leaf as LeafIcon,
  Gem as GemIcon, Diamond as DiamondIcon
} from 'lucide-react';
import Link from 'next/link';

// ==================== ENHANCED MEDICAL DATA ====================

const REAL_TIME_MONITORING = [
  {
    parameter: "Pression Artérielle",
    value: "124/78",
    unit: "mmHg",
    status: "optimal",
    trend: "stable",
    icon: ActivitySquare,
    color: "from-emerald-500 to-green-600",
    alerts: 0,
    lastUpdate: "2 min",
    confidence: 98.7
  },
  {
    parameter: "Fréquence Cardiaque",
    value: "68",
    unit: "bpm",
    status: "normal",
    trend: "decreasing",
    icon: HeartPulse,
    color: "from-blue-500 to-cyan-600",
    alerts: 0,
    lastUpdate: "30 sec",
    confidence: 99.2
  },
  {
    parameter: "Saturation O₂",
    value: "98",
    unit: "%",
    status: "excellent",
    trend: "stable",
    icon: Waves,
    color: "from-cyan-500 to-blue-600",
    alerts: 0,
    lastUpdate: "1 min",
    confidence: 99.5
  },
  {
    parameter: "Rythme Cardiaque",
    value: "Sinus",
    unit: "Regular",
    status: "normal",
    trend: "stable",
    icon: ScanHeart,
    color: "from-purple-500 to-violet-600",
    alerts: 0,
    lastUpdate: "5 sec",
    confidence: 99.8
  }
];

const AI_PREDICTIONS = [
  {
    risk: "Événement CV Majeur",
    probability: "2.3%",
    trend: "↓ 0.8%",
    timeframe: "30 jours",
    confidence: 94.5,
    factors: ["TA contrôlée", "Observance excellente", "Biologie stable"],
    icon: BrainCircuit,
    color: "from-green-500 to-emerald-600"
  },
  {
    risk: "Hospitalisation",
    probability: "1.1%",
    trend: "↓ 1.2%",
    timeframe: "90 jours",
    confidence: 96.2,
    factors: ["Suivi optimal", "Pas d'antécédents récents", "Compliance thérapeutique"],
    icon: TrendingUp,
    color: "from-blue-500 to-cyan-600"
  },
  {
    risk: "Interaction Médicamenteuse",
    probability: "0.4%",
    trend: "stable",
    timeframe: "7 jours",
    confidence: 98.9,
    factors: ["Surveillance active", "Alertes configurées", "Dossier à jour"],
    icon: ShieldCheck,
    color: "from-amber-500 to-orange-600"
  }
];

const CLINICAL_ALERTS = [
  {
    type: "Optimisation",
    priority: "medium",
    message: "Ajustement posologique recommandé - Métoprolol",
    time: "12:45",
    action: "Révision protocolaire",
    icon: Zap,
    color: "from-amber-400 to-orange-500"
  },
  {
    type: "Surveillance",
    priority: "low",
    message: "Bilan rénal programmé dans 7 jours",
    time: "11:20",
    action: "Planification",
    icon: Calendar,
    color: "from-blue-400 to-cyan-500"
  },
  {
    type: "Excellence",
    priority: "info",
    message: "Nouveau protocole ESC 2024 disponible",
    time: "09:15",
    action: "Mise à jour",
    icon: Award,
    color: "from-purple-400 to-violet-500"
  }
];

const STATS = [
  { 
    label: "Patients Suivis en Continu", 
    value: "15,842+", 
    icon: Users, 
    color: "text-blue-400",
    gradient: "from-blue-600 to-cyan-600",
    description: "Patients sous traitement avec suivi médical avancé",
    precision: "±0.5% marge d'erreur",
    trend: "+12.3% vs 2023",
    realTime: true
  },
  { 
    label: "Adhérence Thérapeutique", 
    value: "94.2%", 
    icon: CheckCircle, 
    color: "text-emerald-400",
    gradient: "from-emerald-600 to-green-600",
    description: "Taux d'observance validé par monitoring digital",
    precision: "Certifié HAS 2024",
    trend: "+5.1% vs standard",
    realTime: true
  },
  { 
    label: "Médicaments Spécialisés", 
    value: "127", 
    icon: Pill, 
    color: "text-purple-400",
    gradient: "from-purple-600 to-violet-600",
    description: "Thérapies innovantes avec validation clinique",
    precision: "Protocols ANSM approuvés",
    trend: "8 nouvelles molécules 2024",
    realTime: false
  },
  { 
    label: "Suivi Télémédical", 
    value: "24/7/365", 
    icon: ShieldCheck, 
    color: "text-amber-400",
    gradient: "from-amber-600 to-orange-600",
    description: "Monitoring médical avec IA prédictive",
    precision: "Temps réponse < 2min",
    trend: "99.8% disponibilité",
    realTime: true
  },
];

const CLINICAL_EXCELLENCE = [
  {
    metric: "Réduction évènements CV",
    value: "63%",
    description: "Diminution des hospitalisations cardiologiques",
    icon: TrendingUp,
    color: "from-red-500 to-rose-600",
    evidence: "Étude randomisée 2024",
    significance: "p < 0.001"
  },
  {
    metric: "Contrôle tensionnel",
    value: "89%",
    description: "Patients avec TA normalisée à 6 mois",
    icon: Activity,
    color: "from-blue-500 to-cyan-600",
    evidence: "Meta-analyse multicentrique",
    significance: "IC 95%: 87-91%"
  },
  {
    metric: "Satisfaction patients",
    value: "4.9/5",
    description: "Score de satisfaction globale",
    icon: Star,
    color: "from-amber-500 to-orange-600",
    evidence: "Enquête HAS certifiée",
    significance: "NPS: +78"
  },
  {
    metric: "Délai optimisation",
    value: "48h",
    description: "Ajustement thérapeutique personnalisé",
    icon: Clock4,
    color: "from-emerald-500 to-green-600",
    evidence: "Protocol accrédité SFC",
    significance: "vs 21j standard"
  }
];

const THERAPEUTIC_AREAS = [
  { 
    name: "Hypertension Artérielle", 
    description: "Prise en charge complète avec antihypertenseurs de dernière génération et monitoring tensionnel haute précision.",
    image: "/images/hta-management.jpg",
    icon: ActivitySquare,
    features: ["ABPM 24h intégré", "Ajustement posologique IA", "Bilan rénal avancé", "Suivi neuro-humoral"],
    gradient: "from-blue-600 to-cyan-600",
    molecules: ["Inhibiteurs de l'ECA", "ARA II nouvelle génération", "Bêta-bloquants sélectifs", "Diurétiques thiazidiques"],
    protocols: ["HAS 2024", "ESC Guidelines", "Protocole SFC"],
    outcomes: "TA < 130/80 mmHg: 87% des cas",
    patients: "4,231 patients actifs"
  },
  { 
    name: "Insuffisance Cardiaque", 
    description: "Protocoles thérapeutiques avancés avec optimisation quadri-thérapique et surveillance clinique multimodale.",
    image: "/images/ic-management.jpg",
    icon: HeartPulse,
    features: ["Évaluation NYHA dynamique", "Monitoring poids connecté", "Bilan électrolytique IA", "Échocardiographie virtuelle"],
    gradient: "from-emerald-600 to-teal-600",
    molecules: ["ARNI (Sacubitril/Valsartan)", "Bêta-bloquants à CI", "Antiminéralocorticoïdes", "Inhibiteurs SGLT2"],
    protocols: ["ESC-HF 2023", "HAS Avancée", "Quadri-thérapie SFC"],
    outcomes: "Réduction FDR: 42% à 1 an",
    patients: "2,847 patients actifs"
  },
  { 
    name: "Troubles du Rythme", 
    description: "Gestion spécialisée des arythmies avec antiarythmiques ciblés et monitoring ECG haute résolution.",
    image: "/images/arythmia-care.jpg",
    icon: ScanHeart,
    features: ["Holter-ECG IA", "Surveillance rythmique prédictive", "Ajustement INR personnalisé", "Cardioversion pharmacologique"],
    gradient: "from-purple-600 to-violet-600",
    molecules: ["Dronédarone", "Bêta-bloquants lipophiles", "Anticoagulants directs", "Digitaliques monitorés"],
    protocols: ["ESC-AF 2024", "ANSM Vigilance", "Stratification CHA₂DS₂-VASc"],
    outcomes: "Contrôle rythmique: 91% efficacité",
    patients: "3,156 patients actifs"
  },
  { 
    name: "Prévention Secondaire", 
    description: "Stratégies complètes de prévention cardiovasculaire post-infarctus ou post-AVC avec approche multimodale.",
    image: "/images/prevention.jpg",
    icon: Shield,
    features: ["Bilan lipidique avancé", "Contrôle glycémique continu", "Suivi plaquettaire génétique", "Réadaptation cardiaque"],
    gradient: "from-rose-600 to-red-600",
    molecules: ["Statines haute intensité", "Antiagrégants double", "IEC systématique", "Antidiabétiques cardiaques"],
    protocols: ["ESC Prevention", "HAS Post-IDS", "Réadaptation SFC"],
    outcomes: "Récidive: -67% à 3 ans",
    patients: "5,608 patients actifs"
  },
];

const MEDICAL_SERVICES = [
  { 
    title: "Pharmacovigilance IA", 
    icon: BrainCircuit, 
    description: "Surveillance prédictive des effets indésirables et interactions médicamenteuses complexes",
    gradient: "from-blue-700 to-blue-800",
    features: ["IA prédictive effets secondaires", "Analyse interactions multi-médicaments", "Rapports ANSM automatisés", "Alertes précoces"],
    certification: "Certifié ISO 13485:2023",
    coverage: "100% des prescriptions"
  },
  { 
    title: "Éducation Thérapeutique Digitale", 
    icon: GraduationCap, 
    description: "Programmes personnalisés d'accompagnement avec réalité augmentée et monitoring comportemental",
    gradient: "from-emerald-700 to-emerald-800",
    features: ["Réalité augmentée éducative", "AI coaching personnalisé", "Évaluation compétences dynamique", "Communauté patients sécurisée"],
    certification: "Agrément HAS Éducation",
    coverage: "98% des patients éligibles"
  },
  { 
    title: "Dossier Pharmaceutique Intelligent", 
    icon: FileCheck, 
    description: "Gestion centralisée sécurisée avec IA décisionnelle pour l'optimisation thérapeutique",
    gradient: "from-purple-700 to-purple-800",
    features: ["Blockchain sécurisée", "IA décisionnelle intégrée", "Historique génomique", "Interopérabilité HL7/FHIR"],
    certification: "HDS Hébergement certifié",
    coverage: "24/7 avec 99.99% SLA"
  },
  { 
    title: "Télésuivi Médical Avancé", 
    icon: Network, 
    description: "Plateforme de monitoring à distance avec capteurs médicaux et transmission temps réel",
    gradient: "from-amber-700 to-amber-800",
    features: ["Capteurs médicaux connectés", "Transmission temps réel sécurisée", "Alertes médicales IA", "Coordination soins intelligente"],
    certification: "DMCA Classe IIa certifié",
    coverage: "15,842+ patients connectés"
  },
];

const CLINICAL_TESTIMONIALS = [
  {
    name: "Pr. Sophie Martin",
    role: "Chef de Service Cardiologie, Hôpital Européen Georges Pompidou",
    content: "Cette plateforme représente l'avenir de la coordination ville-hôpital. L'optimisation thérapeutique guidée par l'IA a permis une réduction de 40% des réhospitalisations dans notre cohorte.",
    rating: 5,
    specialty: "Cardiologie Interventionnelle Avancée",
    credentials: "PhD, FESC, Past-President SFC",
    publication: "Lancet Digital Health 2024",
    impact: "40% réduction réhospitalisations"
  },
  {
    name: "Jean Dupont",
    role: "Patient, 62 ans - Hypertension résistante contrôlée",
    content: "Le suivi personnalisé et les rappels intelligents ont transformé mon observance. Après 15 ans de lutte, ma tension est parfaitement stabilisée depuis 8 mois grâce à l'approche intégrée.",
    rating: 5,
    condition: "Hypertension Résistante Contrôlée",
    duration: "Suivi depuis 18 mois",
    achievement: "TA normalisée: 125/78 mmHg",
    impact: "Observance: 96%"
  },
  {
    name: "Dr. Ahmed El Amrani",
    role: "Pharmacien Clinicien Certifié, Paris 15ème",
    content: "L'intégration des données cliniques et le support décisionnel améliorent considérablement la sécurité des traitements complexes. Nous observons une réduction de 65% des interactions médicamenteuses significatives.",
    rating: 5,
    expertise: "Pharmacie Clinique Cardiologique",
    certification: "Diplôme Universitaire Cardiopharmacie",
    impact: "65% réduction interactions",
    safety: "0 incidents majeurs"
  }
];

const CLINICAL_PARTNERS = [
  { name: "Société Française de Cardiologie", logo: "/logos/sfc.png", tier: "Platinum", since: "2018" },
  { name: "Fédération Française de Cardiologie", logo: "/logos/ffc.png", tier: "Gold", since: "2020" },
  { name: "Agence Nationale de Sécurité du Médicament", logo: "/logos/ansm.png", tier: "Regulatory", since: "2019" },
  { name: "Haute Autorité de Santé", logo: "/logos/has.png", tier: "Scientific", since: "2021" },
  { name: "Collège National des Cardiologues Français", logo: "/logos/cncf.png", tier: "Professional", since: "2022" },
  { name: "European Society of Cardiology", logo: "/logos/esc.png", tier: "International", since: "2020" }
];

const ACCREDITATIONS = [
  { name: "ISO 13485:2023", description: "Qualité dispositifs médicaux", icon: Award, validity: "2026" },
  { name: "HDS Certification", description: "Hébergement données de santé", icon: ShieldCheck, validity: "2025" },
  { name: "GDPR Health", description: "Protection données patients", icon: BadgeCheck, validity: "Permanent" },
  { name: "HAS Agrément", description: "Éducation thérapeutique", icon: GraduationCap, validity: "2024" }
];

// ==================== ENHANCED MOTION VARIANTS ====================

const premiumContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const premiumItemVariants: Variants = {
  hidden: { 
    y: 80, 
    opacity: 0,
    scale: 0.9
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 15,
      duration: 1.5
    },
  },
};

const floatingAnimation = {
  y: [0, -20, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// ==================== ENHANCED COMPONENTS ====================

const RealTimeMonitor: FC<typeof REAL_TIME_MONITORING[0]> = ({ parameter, value, unit, status, trend, icon: Icon, color, alerts, lastUpdate, confidence }) => (
  <motion.div 
    variants={premiumItemVariants}
    whileHover={{ 
      y: -8,
      scale: 1.02,
      transition: { type: "spring", stiffness: 400 }
    }}
    className="relative p-6 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/70 shadow-xl hover:shadow-2xl transition-all duration-500 group overflow-hidden"
  >
    {/* Real-time indicator */}
    <motion.div 
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute top-3 right-3 w-3 h-3 bg-emerald-500 rounded-full"
    />
    
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-lg`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="text-sm text-gray-500">{unit}</div>
      </div>
    </div>
    
    <h3 className="font-semibold text-gray-900 mb-2">{parameter}</h3>
    
    <div className="flex items-center justify-between text-sm">
      <span className={`px-2 py-1 rounded-full ${
        status === 'optimal' ? 'bg-emerald-100 text-emerald-800' :
        status === 'normal' ? 'bg-blue-100 text-blue-800' :
        'bg-amber-100 text-amber-800'
      }`}>
        {status}
      </span>
      <span className="text-gray-500">{lastUpdate}</span>
    </div>
    
    <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
      <span>Confiance: {confidence}%</span>
      {alerts > 0 && (
        <span className="text-red-500 font-semibold">{alerts} alerte(s)</span>
      )}
    </div>
  </motion.div>
);

const AIPredictionCard: FC<typeof AI_PREDICTIONS[0]> = ({ risk, probability, trend, timeframe, confidence, factors, icon: Icon, color }) => (
  <motion.div
    variants={premiumItemVariants}
    whileHover={{ y: -6, scale: 1.02 }}
    className="relative p-6 bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/70 shadow-xl hover:shadow-2xl transition-all duration-500"
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-lg`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-gray-900">{probability}</div>
        <div className={`text-sm font-semibold ${
          trend.includes('↓') ? 'text-emerald-600' : 'text-gray-600'
        }`}>
          {trend}
        </div>
      </div>
    </div>
    
    <h3 className="font-semibold text-gray-900 mb-3">{risk}</h3>
    <div className="text-sm text-gray-600 mb-4">Délai: {timeframe}</div>
    
    <div className="space-y-2">
      {factors.map((factor, index) => (
        <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
          <span>{factor}</span>
        </div>
      ))}
    </div>
    
    <div className="mt-4 pt-3 border-t border-gray-200">
      <div className="text-xs text-gray-500">Confiance IA: {confidence}%</div>
    </div>
  </motion.div>
);

const ClinicalAlertCard: FC<typeof CLINICAL_ALERTS[0]> = ({ type, priority, message, time, action, icon: Icon, color }) => (
  <motion.div
    variants={premiumItemVariants}
    whileHover={{ x: 4 }}
    className={`p-4 rounded-xl border-l-4 ${
      priority === 'medium' ? 'border-amber-400 bg-amber-50' :
      priority === 'low' ? 'border-blue-400 bg-blue-50' :
      'border-purple-400 bg-purple-50'
    } shadow-sm hover:shadow-md transition-all duration-300`}
  >
    <div className="flex items-start space-x-3">
      <div className={`p-2 rounded-lg bg-gradient-to-br ${color} shadow-sm`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold text-gray-900 text-sm">{type}</span>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <p className="text-sm text-gray-700 mb-2">{message}</p>
        <div className="text-xs text-gray-600">Action: {action}</div>
      </div>
    </div>
  </motion.div>
);

const PremiumStatCard: FC<typeof STATS[0]> = ({ label, value, icon: Icon, gradient, description, precision, trend, realTime }) => (
  <motion.div 
    variants={premiumItemVariants}
    whileHover={{ 
      y: -12,
      scale: 1.03,
      transition: { type: "spring", stiffness: 400 }
    }}
    className="relative p-8 bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-200/70 shadow-2xl hover:shadow-3xl transition-all duration-500 group overflow-hidden"
  >
    {/* Real-time pulse effect */}
    {realTime && (
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-4 right-4 w-2 h-2 bg-emerald-500 rounded-full"
      />
    )}
    
    {/* Animated background gradient */}
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
    
    {/* Glow effect */}
    <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />
    
    <div className="relative z-10">
      <div className="flex items-start justify-between mb-6">
        <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {value}
          </div>
          <div className="text-sm text-emerald-600 font-semibold mt-1">{trend}</div>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-3">{label}</h3>
      <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
      
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">{precision}</span>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
        </motion.div>
      </div>
    </div>
  </motion.div>
);

const ClinicalExcellenceCard: FC<typeof CLINICAL_EXCELLENCE[0]> = ({ metric, value, description, icon: Icon, color, evidence, significance }) => (
  <motion.div
    variants={premiumItemVariants}
    whileHover={{ y: -8, scale: 1.02 }}
    className="group relative p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200/80 shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <div className="flex items-center space-x-4 mb-4">
      <div className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-md`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </div>
    
    <h4 className="font-semibold text-gray-900 mb-2">{metric}</h4>
    <p className="text-gray-600 text-sm mb-3">{description}</p>
    
    <div className="space-y-2 text-xs">
      <div className="text-gray-500 font-medium">{evidence}</div>
      <div className="text-blue-600 font-semibold">{significance}</div>
    </div>
  </motion.div>
);

const TherapeuticAreaCard: FC<typeof THERAPEUTIC_AREAS[0]> = ({ name, description, icon: Icon, features, gradient, molecules, protocols, outcomes, patients }) => (
  <motion.div 
    variants={premiumItemVariants}
    whileHover={{ 
      y: -8,
      transition: { type: "spring", stiffness: 300 }
    }}
    className="group relative bg-white rounded-3xl border border-gray-200/80 shadow-2xl hover:shadow-3xl overflow-hidden transition-all duration-500"
  >
    {/* Header with gradient */}
    <div className={`p-8 bg-gradient-to-r ${gradient} text-white relative overflow-hidden`}>
      {/* Animated background elements */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-4 right-4 w-8 h-8 border-2 border-white/20 rounded-full"
      />
      
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div className="flex space-x-2">
          {protocols.map((protocol, index) => (
            <motion.span 
              key={index}
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-sm border border-white/30"
            >
              {protocol}
            </motion.span>
          ))}
        </div>
      </div>
      
      <h3 className="text-2xl font-bold mb-3">{name}</h3>
      <p className="text-white/90 leading-relaxed">{description}</p>
      
      {/* Patient count */}
      <div className="mt-4 text-white/70 text-sm font-medium">
        {patients} en suivi actif
      </div>
    </div>

    {/* Content */}
    <div className="p-8">
      <div className="grid grid-cols-2 gap-4 mb-6">
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            whileHover={{ x: 4 }}
            className="flex items-center space-x-3 text-sm text-gray-700"
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
            <span>{feature}</span>
          </motion.div>
        ))}
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider flex items-center">
          <Pill className="w-4 h-4 mr-2" />
          Classes Thérapeutiques Validées
        </h4>
        <div className="flex flex-wrap gap-2">
          {molecules.map((molecule, index) => (
            <motion.span 
              key={index}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 shadow-sm hover:shadow-md transition-all"
            >
              {molecule}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Outcomes */}
      <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-200">
        <div className="flex items-center space-x-2 text-emerald-800">
          <Target className="w-4 h-4" />
          <span className="text-sm font-semibold">Résultats Cliniques: {outcomes}</span>
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className={`px-8 py-6 bg-gradient-to-r ${gradient} border-t border-white/20`}>
      <Link href="#" className="flex items-center justify-between group/link">
        <span className="text-white font-semibold text-sm">Accéder aux protocoles détaillés</span>
        <motion.div
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 400 }}
          className="p-2 bg-white/20 rounded-lg backdrop-blur-sm border border-white/30"
        >
          <ArrowRight className="w-4 h-4 text-white" />
        </motion.div>
      </Link>
    </div>
  </motion.div>
);

const MedicalServiceCard: FC<typeof MEDICAL_SERVICES[0]> = ({ title, description, icon: Icon, gradient, features, certification, coverage }) => (
  <motion.div
    variants={premiumItemVariants}
    whileHover={{ y: -8, scale: 1.02 }}
    className={`group relative p-8 rounded-3xl bg-gradient-to-br ${gradient} text-white shadow-2xl hover:shadow-3xl transition-all duration-500 min-h-[320px] flex flex-col justify-between overflow-hidden`}
  >
    {/* Animated background elements */}
    <motion.div 
      animate={{ x: [-100, 300], y: [-100, 200] }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute w-32 h-32 bg-white/5 rounded-full blur-xl"
    />
    
    <div className="relative z-10">
      <div className="flex items-start justify-between mb-6">
        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30">
          <Icon className="w-7 h-7 text-white" />
        </div>
        <motion.div
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sparkles className="w-5 h-5 text-white/80" />
        </motion.div>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-white/90 leading-relaxed mb-6">{description}</p>
    </div>

    <div className="relative z-10 space-y-3">
      {features.map((feature, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center space-x-3 text-white/80 text-sm"
        >
          <div className="w-2 h-2 bg-white/60 rounded-full flex-shrink-0" />
          <span>{feature}</span>
        </motion.div>
      ))}
    </div>

    {/* Certification and coverage */}
    <div className="relative z-10 mt-4 pt-4 border-t border-white/20">
      <div className="flex items-center justify-between text-xs">
        <div className="text-white/60 font-medium">{certification}</div>
        <div className="text-white/80 font-semibold">{coverage}</div>
      </div>
    </div>
  </motion.div>
);

const ClinicalTestimonialCard: FC<typeof CLINICAL_TESTIMONIALS[0]> = ({ name, role, content, rating, specialty, credentials, publication, impact, achievement }) => (
  <motion.div
    variants={premiumItemVariants}
    className="relative bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-200/70 shadow-2xl p-8 space-y-6 group"
  >
    {/* Animated quote mark */}
    <motion.div
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="absolute top-6 right-6 text-blue-100 group-hover:text-blue-200 transition-colors"
    >
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
      </svg>
    </motion.div>

    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i}
          className={`w-5 h-5 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
        />
      ))}
    </div>

    <p className="text-gray-700 text-lg leading-relaxed italic">"{content}"</p>

    <div className="pt-6 border-t border-gray-100">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="font-bold text-gray-900 text-lg">{name}</div>
          <div className="text-gray-600 mb-2">{role}</div>
          {credentials && (
            <div className="text-sm text-blue-600 font-semibold mb-1">{credentials}</div>
          )}
        </div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold text-sm"
        >
          {name.split(' ').map(n => n[0]).join('')}
        </motion.div>
      </div>

      {(specialty || achievement || impact) && (
        <div className="text-sm text-gray-700 space-y-1">
          {specialty && <div className="font-medium">{specialty}</div>}
          {publication && <div className="text-blue-600">{publication}</div>}
          {achievement && <div className="text-emerald-600 font-semibold">{achievement}</div>}
          {impact && <div className="text-purple-600 font-semibold">{impact}</div>}
        </div>
      )}
    </div>
  </motion.div>
);

const PremiumVideoModal: FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-6xl bg-gradient-to-br from-gray-900 to-blue-900 rounded-3xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 bg-gradient-to-r from-gray-900 to-blue-900 flex justify-between items-center border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="text-white font-semibold ml-4">Présentation de la Plateforme Cardiologique Avancée</div>
            </div>
            <button
              onClick={onClose}
              className="p-3 text-white hover:bg-white/10 rounded-2xl transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="aspect-video bg-gradient-to-br from-blue-900/50 to-gray-900/50 flex items-center justify-center relative overflow-hidden">
            {/* Enhanced animated background */}
            <div className="absolute inset-0">
              <motion.div 
                animate={{ 
                  x: [0, 100, 0],
                  y: [0, -50, 0],
                }}
                transition={{ duration: 20, repeat: Infinity }}
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
              />
              <motion.div 
                animate={{ 
                  x: [0, -80, 0],
                  y: [0, 60, 0],
                }}
                transition={{ duration: 25, repeat: Infinity }}
                className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
              />
            </div>
            
            <div className="relative z-10 text-center space-y-6">
              <motion.div
                animate={floatingAnimation}
                className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl flex items-center justify-center shadow-2xl"
              >
                <Play className="w-10 h-10 text-white ml-2" />
              </motion.div>
              <div>
                <div className="text-3xl font-bold text-white mb-3">Plateforme Cardiologique d'Excellence</div>
                <div className="text-gray-300 text-lg">Découvrez notre approche médicale intégrée et innovante</div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <Play className="w-5 h-5" />
                  <span>Lancer la démonstration</span>
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// ==================== MAIN ENHANCED COMPONENT ====================

const CardiologieContent: FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [realTimeData, setRealTimeData] = useState(REAL_TIME_MONITORING);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.1]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => prev.map(item => ({
        ...item,
        value: item.parameter === "Fréquence Cardiaque" 
          ? `${Math.floor(65 + Math.random() * 6)}`
          : item.value,
        lastUpdate: "Maintenant"
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % CLINICAL_TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 text-gray-900 font-sans overflow-hidden relative">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{ opacity: backgroundOpacity }}
        >
          {/* Multiple animated gradient orbs */}
          <motion.div 
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-40"
          />
          <motion.div 
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-200 rounded-full blur-3xl opacity-50"
          />
          <motion.div 
            animate={{
              x: [0, 120, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-3/4 left-1/2 w-64 h-64 bg-emerald-200 rounded-full blur-3xl opacity-30"
          />
          <motion.div 
            animate={{
              x: [0, -60, 0],
              y: [0, -40, 0],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 right-1/3 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-25"
          />
        </motion.div>
        
        {/* Enhanced grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, gray 1px, transparent 1px),
                             linear-gradient(to bottom, gray 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}/>
        </div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="absolute w-1 h-1 bg-blue-300 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Enhanced Hero Section */}
        <motion.header
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center space-y-16 mb-28 pt-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            className="inline-flex items-center space-x-4 text-sm font-bold uppercase tracking-widest text-blue-600 bg-white/90 backdrop-blur-sm px-8 py-4 rounded-2xl border border-blue-200/70 shadow-xl"
          >
            <motion.div
              animate={pulseAnimation}
            >
              <Heart className="w-5 h-5" />
            </motion.div>
            <span>Cardiologie d'Excellence & Innovation IA</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-8"
          >
            <motion.h1 
              className="text-7xl md:text-8xl font-black tracking-tight"
            >
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-cyan-900 bg-clip-text text-transparent">
                Excellence
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                Cardiologique
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-3xl text-gray-600 max-w-5xl mx-auto leading-relaxed font-light"
            >
              Plateforme pharmaceutique intelligente de référence en cardiologie : 
              <span className="font-semibold text-blue-600"> optimisation thérapeutique avancée par IA</span>, 
              suivi médical temps réel et coordination des soins d'excellence pour des résultats cliniques supérieurs.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="px-14 py-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-4 group"
            >
              <Phone className="w-7 h-7"/>
              <span className="text-xl">Consultation Spécialisée IA</span>
              <motion.div
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ArrowRight className="w-6 h-6" />
              </motion.div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsVideoModalOpen(true)}
              className="px-14 py-6 bg-white/90 backdrop-blur-sm text-gray-700 font-bold rounded-2xl border border-gray-300/70 shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-4 group"
            >
              <Play className="w-7 h-7" />
              <span className="text-xl">Démonstration IA</span>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Brain className="w-6 h-6 text-purple-500" />
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Enhanced Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-wrap justify-center items-center gap-8 pt-16"
          >
            {ACCREDITATIONS.map((acc, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -4 }}
                className="flex items-center space-x-3 text-sm text-gray-600 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-xl border border-gray-200/70 shadow-lg"
              >
                <acc.icon className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-semibold">{acc.name}</div>
                  <div className="text-xs text-gray-500">Valide jusqu'en {acc.validity}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.header>

        {/* Real-time Monitoring Dashboard */}
        <motion.section
          variants={premiumContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-28"
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block mb-6"
            >
              <Activity className="w-16 h-16 text-blue-600" />
            </motion.div>
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Surveillance Temps Réel
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Monitoring continu des paramètres vitaux avec intelligence artificielle prédictive
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {realTimeData.map((data, index) => (
              <RealTimeMonitor key={index} {...data} />
            ))}
          </div>

          {/* AI Predictions Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {AI_PREDICTIONS.map((prediction, index) => (
              <AIPredictionCard key={index} {...prediction} />
            ))}
          </div>

          {/* Clinical Alerts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CLINICAL_ALERTS.map((alert, index) => (
              <ClinicalAlertCard key={index} {...alert} />
            ))}
          </div>
        </motion.section>

        {/* Premium Stats Section */}
        <motion.section
          variants={premiumContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-28"
        >
          {STATS.map((stat, index) => (
            <PremiumStatCard key={index} {...stat} />
          ))}
        </motion.section>

        {/* Clinical Excellence Metrics */}
        <section className="mb-28">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block mb-6"
            >
              <Award className="w-16 h-16 text-blue-600" />
            </motion.div>
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Résultats d'Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Des indicateurs cliniques qui démontrent notre impact sur la santé cardiovasculaire
            </p>
          </motion.div>
          
          <motion.div
            variants={premiumContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {CLINICAL_EXCELLENCE.map((metric, index) => (
              <ClinicalExcellenceCard key={index} {...metric} />
            ))}
          </motion.div>
        </section>

        {/* Therapeutic Areas Section */}
        <section className="mb-28">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block mb-6"
            >
              <Stethoscope className="w-16 h-16 text-blue-600" />
            </motion.div>
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Domaines d'Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Prise en charge spécialisée des principales pathologies cardiovasculaires avec protocoles validés
            </p>
          </motion.div>
          
          <motion.div
            variants={premiumContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10"
          >
            {THERAPEUTIC_AREAS.map((area, index) => (
              <TherapeuticAreaCard key={index} {...area} />
            ))}
          </motion.div>
        </section>

        {/* Medical Services Section */}
        <section className="mb-28">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block mb-6"
            >
              <ShieldCheck className="w-16 h-16 text-blue-600" />
            </motion.div>
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Services Médicaux Avancés
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Technologie et expertise au service de la sécurité et de l'efficacité des traitements
            </p>
          </motion.div>

          <motion.div
            variants={premiumContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {MEDICAL_SERVICES.map((service, index) => (
              <MedicalServiceCard key={index} {...service} />
            ))}
          </motion.div>
        </section>

        {/* Clinical Testimonials Section */}
        <section className="mb-28">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block mb-6"
            >
              <GraduationCap className="w-16 h-16 text-blue-600" />
            </motion.div>
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Témoignages d'Experts
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              La reconnaissance de nos pairs et la satisfaction de nos patients
            </p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <ClinicalTestimonialCard {...CLINICAL_TESTIMONIALS[currentTestimonial]} />
              </motion.div>
            </AnimatePresence>

            {/* Enhanced Navigation */}
            <div className="flex justify-center items-center space-x-8 mt-12">
              <motion.button
                whileHover={{ scale: 1.1, x: -4 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentTestimonial((prev) => (prev - 1 + CLINICAL_TESTIMONIALS.length) % CLINICAL_TESTIMONIALS.length)}
                className="p-4 bg-white/90 backdrop-blur-sm border border-gray-300/70 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </motion.button>

              <div className="flex space-x-3">
                {CLINICAL_TESTIMONIALS.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentTestimonial 
                        ? 'bg-blue-600 w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1, x: 4 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % CLINICAL_TESTIMONIALS.length)}
                className="p-4 bg-white/90 backdrop-blur-sm border border-gray-300/70 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </motion.button>
            </div>
          </div>
        </section>

        {/* Clinical Partners Section */}
        <section className="mb-28">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-4xl font-black text-gray-900 mb-12">Partenaires Institutionnels</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {CLINICAL_PARTNERS.map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/70 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-gray-600 font-semibold text-sm text-center hover:text-blue-600 transition-colors">
                    {partner.name}
                  </div>
                  <div className="text-xs text-gray-500 text-center mt-2 font-medium">
                    {partner.tier} Partner
                  </div>
                  <div className="text-xs text-gray-400 text-center mt-1">
                    Since {partner.since}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Enhanced Premium CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="relative p-20 bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-gray-200/70 shadow-2xl overflow-hidden">
            {/* Enhanced background decoration */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full -translate-y-48 translate-x-48"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full translate-y-48 -translate-x-48"
            />
            
            <div className="relative z-10 max-w-4xl mx-auto">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-block mb-8"
              >
                <Award className="w-24 h-24 text-blue-600" />
              </motion.div>
              
              <h3 className="text-5xl font-black text-gray-900 mb-8">
                Rejoignez l'Excellence Cardiologique
              </h3>
              
              <p className="text-2xl text-gray-600 mb-12 leading-relaxed font-light">
                Intégrez notre réseau de professionnels de santé engagés dans l'innovation 
                et l'amélioration continue de la prise en charge cardiologique.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-20 py-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-black rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 inline-flex items-center space-x-4 group"
                >
                  <MessageCircle className="w-7 h-7" />
                  <span className="text-xl">Contactez notre Équipe Médicale IA</span>
                  <motion.div
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-20 py-6 bg-white/90 backdrop-blur-sm text-gray-700 font-bold rounded-2xl border border-gray-300/70 shadow-2xl hover:shadow-3xl transition-all duration-300 inline-flex items-center space-x-4 group"
                >
                  <FileText className="w-7 h-7" />
                  <span className="text-xl">Documentation Médicale</span>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Download className="w-6 h-6 text-blue-500" />
                  </motion.div>
                </motion.button>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-500 text-lg mt-12 space-y-2"
              >
                <div>Réponse sous 24h • Équipe médicale dédiée • Protocoles personnalisés</div>
                <div className="text-sm">Support technique 24/7 • Formation certifiante incluse</div>
              </motion.p>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Video Modal */}
      <PremiumVideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />
    </div>
  );
}

// Final Enhanced Premium Page Export
export default function CardiologiePageWrapper() {
  return (
    <MainLayout>
      <CardiologieContent />
    </MainLayout>
  )
}