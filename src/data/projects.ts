import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'automated-pipelines',
    title: 'Automated Pipelines',
    subtitle: 'Zero-downtime ETL workflow orchestration engine',
    description: 'High-throughput distributed pipeline manager supporting real-time stream transformation, automated retry logic, and fault-tolerant state recovery.',
    image: '/src/assets/images/project_automated_pipelines_1790444059910.jpg',
    tags: ['SYSTEMS'],
    year: '2026',
    role: 'Lead Systems Architect',
    technologies: ['TypeScript', 'Node.js', 'Kafka', 'PostgreSQL', 'Docker'],
    problem: 'Enterprise data teams face severe bottlenecks and data corruption when orchestrating brittle legacy ETL scripts across disparate cloud silos.',
    process: 'Architected an event-driven directed acyclic graph (DAG) scheduler with automatic backpressure management and immutable audit logs.',
    result: 'Processed over 45M daily events with zero data loss and reduced pipeline failure rates by 92%.',
    liveUrl: 'https://pipelines-demo.vercel.app',
    githubUrl: 'https://github.com/Odum20/automated-pipelines',
    screenshots: [
      '/src/assets/images/project_automated_pipelines_1790444059910.jpg'
    ],
    isExperiment: false
  },
  {
    id: 'automotive-fintech',
    title: 'Automotive Fintech',
    subtitle: 'Real-time leasing and asset-backed micro-lending platform',
    description: 'Secure financial telemetry and automated credit underwriting engine built for modern automotive dealerships and digital leasing fleets.',
    image: '/src/assets/images/project_automotive_fintech_1790444072712.jpg',
    tags: ['FINTECH', 'AUTOMOTIVE'],
    year: '2025',
    role: 'Senior Full-Stack Engineer',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Stripe API'],
    problem: 'Traditional vehicle financing and micro-lending approvals take days, resulting in lost dealership sales and high administrative friction.',
    process: 'Engineered an instant credit decisioning pipeline utilizing secure bank API integrations and automated risk scoring models.',
    result: 'Accelerated loan underwriting times from 48 hours to under 90 seconds, scaling monthly transaction volume to $14M.',
    liveUrl: 'https://autofintech.dev',
    githubUrl: 'https://github.com/Odum20/automotive-fintech',
    screenshots: [
      '/src/assets/images/project_automotive_fintech_1790444072712.jpg'
    ],
    isExperiment: false
  },
  {
    id: 'environmental-intelligence',
    title: 'Environmental Intelligence',
    subtitle: 'Satellite telemetry and carbon flux monitoring system',
    description: 'Geospatial analytics platform processing multispectral satellite imagery to track deforestation, air quality indices, and corporate carbon footprints.',
    image: '/src/assets/images/project_environmental_intelligence_1790444085656.jpg',
    tags: ['GIS', 'Sat intel'],
    year: '2025',
    role: 'Creator & Lead Developer',
    technologies: ['Python', 'FastAPI', 'React', 'Mapbox GL', 'TensorFlow'],
    problem: 'Environmental scientists and ESG auditors lack accessible real-time tools to quantify ecological changes across large geographic regions.',
    process: 'Developed automated raster data ingestion pipelines combined with interactive WebGL heatmaps for precise carbon flux visualization.',
    result: 'Adopted by 12 conservation research groups and municipal climate planning agencies.',
    liveUrl: 'https://enviro-intel.io',
    githubUrl: 'https://github.com/Odum20/environmental-intelligence',
    screenshots: [
      '/src/assets/images/project_environmental_intelligence_1790444085656.jpg'
    ],
    isExperiment: false
  },
  {
    id: 'video-games',
    title: 'Video Games',
    subtitle: 'Browser-based 3D voxel engine and multiplayer sandbox',
    description: 'High-performance WebGL game engine featuring procedural world generation, dynamic lighting, and real-time multiplayer synchronization.',
    image: '/src/assets/images/project_video_games_1790444096168.jpg',
    tags: ['GAMING', '3D'],
    year: '2026',
    role: 'Solo Creator',
    technologies: ['Three.js', 'WebGL', 'TypeScript', 'WebSockets', 'Vite'],
    problem: 'Pushing browser graphics to the limit without requiring heavy standalone game client downloads.',
    process: 'Optimized custom voxel chunk meshing algorithms and frustum culling to maintain a rock-solid 60 FPS on standard laptop GPUs.',
    result: 'Generated 50k+ player sessions in the first month and featured on WebGL weekly highlights.',
    liveUrl: 'https://voxel-sandbox.vercel.app',
    githubUrl: 'https://github.com/Odum20/video-games-engine',
    screenshots: [
      '/src/assets/images/project_video_games_1790444096168.jpg'
    ],
    isExperiment: false
  }
];

export const experimentsData: Project[] = [
  {
    id: 'audio-synth',
    title: 'WebAudio Granular Synth',
    subtitle: 'Browser-based real-time audio grain cloud generator',
    description: 'An experimental sound design playground utilizing the Web Audio API and custom DSP worklets for ambient soundscapes.',
    image: '/src/assets/images/project_video_games_1790444096168.jpg',
    tags: ['Audio', 'DSP', 'Experimental'],
    year: '2026',
    role: 'Solo Creator',
    technologies: ['Web Audio API', 'AudioWorklet', 'React', 'Tailwind'],
    problem: 'Exploring browser audio capabilities for live generative sound design without external plugins.',
    process: 'Built custom audio worklet processors handling micro-grain scheduling and envelope shaping in real time.',
    result: 'Published as an open web toy used by electronic musicians and generative artists.',
    liveUrl: 'https://granular-synth.vercel.app',
    githubUrl: 'https://github.com/Odum20/granular-synth',
    screenshots: [],
    isExperiment: true
  },
  {
    id: 'dom-physics',
    title: 'Verlet DOM Physics',
    subtitle: 'Lightweight physics engine operating directly on DOM bounding boxes',
    description: 'Gravity, collisions, and elastic constraints applied to standard DOM elements using constraint relaxation.',
    image: '/src/assets/images/project_automated_pipelines_1790444059910.jpg',
    tags: ['Physics', 'Animation', 'Toy'],
    year: '2025',
    role: 'Solo Creator',
    technologies: ['TypeScript', 'RequestAnimationFrame', 'CSS Transforms'],
    problem: 'Investigating whether interactive UI components can feel naturally tactile and physical without heavy WebGL canvases.',
    process: 'Implemented Verlet integration equations running in a requestAnimationFrame loop with spatial hashing.',
    result: 'Created a delightful micro-interaction library for landing pages.',
    liveUrl: 'https://verlet-dom.vercel.app',
    githubUrl: 'https://github.com/Odum20/verlet-dom',
    screenshots: [],
    isExperiment: true
  },
  {
    id: 'shader-canvas',
    title: 'GLSL Noise Sculptor',
    subtitle: 'Interactive procedural terrain generator powered by fragment shaders',
    description: 'Real-time raymarching shader experiment exploring fractal Brownian motion and atmospheric scattering.',
    image: '/src/assets/images/project_environmental_intelligence_1790444085656.jpg',
    tags: ['WebGL', 'Shaders', 'Graphics'],
    year: '2025',
    role: 'Solo Creator',
    technologies: ['WebGL2', 'GLSL', 'Vite'],
    problem: 'Deepening understanding of GPU raymarching mathematics and procedural noise functions.',
    process: 'Authored custom fragment shaders with interactive uniform controls for lighting, fog, and displacement.',
    result: 'Featured on ShaderOfTheDay and used as a live wallpaper engine.',
    liveUrl: 'https://shader-sculptor.vercel.app',
    githubUrl: 'https://github.com/Odum20/shader-sculptor',
    screenshots: [],
    isExperiment: true
  }
];

