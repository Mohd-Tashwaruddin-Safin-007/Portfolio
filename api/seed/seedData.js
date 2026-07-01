import Profile from '../models/Profile.js';
import Project from '../models/Project.js';
import Experience from '../models/Experience.js';

export async function seedDatabase() {
  await Promise.all([Profile.deleteMany({}), Project.deleteMany({}), Experience.deleteMany({})]);

  const profile = await Profile.create({
    name: 'Mohd Tashwaruddin Safin',
    title: 'Computer Science & Engineering Student',
    tagline: 'Building intelligent, user-centric software with the MERN stack and modern AI tooling.',
    photoUrl: '/safin.jpg',
    email: 'taswaruddin517@gmail.com',
    phone: '01985511517',
    location: 'Dhaka, Bangladesh',
    bio: 'Final-year CSE student at Brac University with a CGPA of 3.92. I enjoy architecting full-stack applications, exploring AI integrations, and shipping polished user experiences.',
    socials: {
      linkedin: 'https://www.linkedin.com/in/tashwar-uddin-safin-7676b0237/',
      github: 'https://github.com/Taswaruddin007',
    },
    skills: {
      languages: ['Java', 'Python', 'C/C++', 'SQL', 'JavaScript', 'HTML/CSS'],
      frameworks: ['React', 'Node.js', 'Express', 'Material-UI'],
      tools: ['Git', 'GitHub', 'Google Cloud Platform', 'Supabase', 'VS Code', 'PyCharm', 'Code::Blocks'],
      libraries: ['pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'PyTorch'],
    },
    education: [
      {
        institution: 'Brac University',
        location: 'Merul Badda, Dhaka',
        degree: 'Bachelor of Science in Computer Science and Engineering (CGPA: 3.92/4.00)',
        startDate: 'Oct 2021',
        endDate: 'Sep 2026',
        details: [
          'Core Coursework: Data Structures and Algorithms, Database Management Systems, Software Engineering, Operating Systems, Object-Oriented Programming, Computer Networks.',
        ],
      },
      {
        institution: 'Birshreshtha Munshi Abdur Rouf Public College',
        location: 'BGB Head Quarters, Dhaka',
        degree: 'Higher Secondary School Certificate in Science (GPA: 5.00/5.00)',
        startDate: 'Jul 2018',
        endDate: 'Apr 2020',
        details: [],
      },
    ],
    achievements: [
      "Received Performance-Based Scholarship at Brac University.",
      "Dean's List (Spring 2024).",
    ],
    extracurricular: [
      {
        title: 'Brac University Computer Club (BUCC)',
        organization: 'BUCC',
        period: 'Jan 2022 -- Mar 2023',
        description: 'Participated in internal hackathons, technical workshops, and assisted in organizing university tech-fests.',
      },
    ],
  });

  const projects = await Project.insertMany([
    {
      name: 'NeuraRig',
      description:
        'An AI-powered e-commerce platform for computer accessories with full admin CRUD, a compatibility-aware hardware chatbot, and a streamlined checkout pipeline.',
      techStack: ['MongoDB', 'Express', 'React', 'Node.js', 'Groq API', 'JWT'],
      startDate: 'Feb 2025',
      endDate: 'May 2025',
      order: 1,
      features: [
        'Architected an AI-powered e-commerce platform for computer accessories with full CRUD capabilities for system administrators.',
        'Leveraged the Groq API to build a specialized hardware chatbot capable of parsing user constraints to ensure build compatibility.',
        'Secured client-server communication using stateful cart storage, JWT-driven authentication, and encrypted user databases.',
        'Optimized application UX with seamless React Router navigation, detailed product rating workflows, and a full checkout pipeline.',
      ],
    },
    {
      name: 'Sphere',
      description:
        'A multi-tier university community platform featuring real-time chat, learning management systems, and group forums.',
      techStack: ['MERN', 'Socket.IO', 'Supabase Storage', 'Leaflet', 'Google OAuth'],
      startDate: 'Oct 2025',
      endDate: 'Jan 2026',
      order: 2,
      features: [
        'Developed a multi-tier university community platform featuring real-time chat, learning management systems, and group forums.',
        'Designed and implemented a modular backend API with Express using strict input validation middleware and Mongoose object modeling.',
        'Built automation features including a resume/CV data extractor to seamlessly populate user portfolios and academic histories.',
        'Optimized frontend state and map rendering using React 19, Material-UI (MUI), and Leaflet map component APIs.',
      ],
    },
  ]);

  const experiences = await Experience.insertMany([
    {
      role: 'Undergraduate Student Tutor',
      organization: 'Brac University',
      location: 'Merul Badda, Dhaka',
      type: 'tutoring',
      startDate: 'Feb 2025',
      current: true,
      order: 1,
      responsibilities: [
        'Facilitate student learning paths by breaking down complex concepts in foundational CSE courses.',
        'Conduct weekly review sessions and offer guidance on debugging assignments and algorithmic logic.',
      ],
    },
  ]);

  return {
    profileId: profile._id,
    projects: projects.length,
    experiences: experiences.length,
  };
}
