// Used as a graceful fallback when the API is unreachable (e.g. not yet seeded).
export const fallbackProfile = {
  name: 'Mohd Tashwaruddin Safin',
  title: 'Computer Science & Engineering Student',
  tagline:
    'Building intelligent, user-centric software with the MERN stack and modern AI tooling.',
  photoUrl: '/safin.jpg',
  email: 'taswaruddin517@gmail.com',
  phone: '01985511517',
  location: 'Dhaka, Bangladesh',
  bio:
    'Final-year CSE student at Brac University with a CGPA of 3.92. I enjoy architecting full-stack applications, exploring AI integrations, and shipping polished user experiences.',
  socials: {
    linkedin: 'https://www.linkedin.com/in/tashwar-uddin-safin-7676b0237/',
    github: 'https://github.com/Taswaruddin007',
  },
  skills: {
    languages: ['Java', 'Python', 'C/C++', 'SQL', 'JavaScript', 'HTML/CSS'],
    frameworks: ['React', 'Node.js', 'Express', 'Material-UI'],
    tools: ['Git', 'GitHub', 'Google Cloud Platform', 'Supabase', 'VS Code', 'PyCharm'],
    libraries: ['pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'PyTorch'],
  },
};

export const fallbackProjects = [
  {
    _id: 'p1',
    name: 'NeuraRig',
    description:
      'AI-powered e-commerce platform for computer accessories with admin CRUD, a compatibility-aware hardware chatbot, and a streamlined checkout pipeline.',
    techStack: ['MongoDB', 'Express', 'React', 'Node.js', 'Groq API', 'JWT'],
    features: [
      'Architected an AI-powered e-commerce platform with full CRUD for admins.',
      'Leveraged the Groq API to build a specialized hardware chatbot for build compatibility.',
      'Secured client-server comms with JWT auth and encrypted user data.',
      'Optimized UX with React Router navigation, product ratings, and a full checkout.',
    ],
  },
  {
    _id: 'p2',
    name: 'Sphere',
    description:
      'A multi-tier university community platform with real-time chat, LMS features, and group forums.',
    techStack: ['MERN', 'Socket.IO', 'Supabase Storage', 'Leaflet', 'Google OAuth'],
    features: [
      'Developed real-time chat, learning management, and group forums.',
      'Modular backend with strict input validation middleware and Mongoose models.',
      'Built a CV data extractor to auto-populate user portfolios.',
      'Frontend state and map rendering with React 19, MUI, and Leaflet.',
    ],
  },
];

export const fallbackExperience = [
  {
    _id: 'e1',
    role: 'Undergraduate Student Tutor',
    organization: 'Brac University',
    location: 'Merul Badda, Dhaka',
    startDate: 'Feb 2025',
    current: true,
    responsibilities: [
      'Break down complex concepts in foundational CSE courses for students.',
      'Conduct weekly review sessions and guide debugging and algorithmic thinking.',
    ],
  },
];
