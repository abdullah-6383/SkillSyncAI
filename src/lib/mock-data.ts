// ============================================================
// MOCK DATA — Realistic populated data for demo
// ============================================================

export interface Student {
  id: string;
  name: string;
  avatar: string;
  title: string;
  email: string;
  university: string;
  graduationYear: number;
  gpa: number;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  education: string;
  bio: string;
  resumeText: string;
}

export interface Skill {
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  category: string;
}

export interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
}

export interface Project {
  name: string;
  description: string;
  tech: string[];
}

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  type: "internship" | "full-time" | "part-time" | "freelance";
  location: string;
  remote: boolean;
  salary: string;
  description: string;
  requiredSkills: RequiredSkill[];
  postedDate: string;
  deadline: string;
  applicants: number;
}

export interface RequiredSkill {
  name: string;
  importance: "required" | "preferred" | "nice-to-have";
}

export interface DetailedMatch {
  studentId: string;
  opportunityId: string;
  score: number;
  breakdown: {
    skills: number;
    experience: number;
    projects: number;
    overall: number;
  };
  matchedSkills: string[];
  skillGaps: string[];
  relevantExperience: string;
  relevantProject: string;
  explanation: string;
  strengths: string[];
}

// ============================================================
// STUDENTS
// ============================================================
export const students: Student[] = [
  {
    id: "s1",
    name: "Harshath Murugan",
    avatar: "HM",
    title: "Full-Stack Developer & ML Enthusiast",
    email: "harshath@university.edu",
    university: "Indian Institute of Technology, Madras",
    graduationYear: 2027,
    gpa: 3.8,
    skills: [
      { name: "Python", level: "expert", category: "Programming" },
      { name: "React", level: "advanced", category: "Frontend" },
      { name: "TypeScript", level: "advanced", category: "Programming" },
      { name: "Node.js", level: "advanced", category: "Backend" },
      { name: "TensorFlow", level: "intermediate", category: "ML/AI" },
      { name: "PostgreSQL", level: "intermediate", category: "Database" },
      { name: "Docker", level: "intermediate", category: "DevOps" },
      { name: "Next.js", level: "advanced", category: "Frontend" },
      { name: "Git", level: "advanced", category: "Tools" },
      { name: "FastAPI", level: "intermediate", category: "Backend" },
      { name: "MongoDB", level: "advanced", category: "Database" },
      { name: "CSS/Tailwind", level: "advanced", category: "Frontend" },
      { name: "Redux", level: "intermediate", category: "State Management" },
      { name: "GraphQL", level: "intermediate", category: "API" },
    ],
    experience: [
      {
        title: "Software Engineering Intern",
        company: "Google",
        duration: "May 2025 – Aug 2025",
        description: "Built microservices for Google Cloud Platform using Go and Python. Improved API latency by 40%.",
      },
      {
        title: "Full-Stack Developer",
        company: "University Tech Lab",
        duration: "Sep 2024 – Present",
        description: "Developing a campus-wide event management platform with React, Node.js, and PostgreSQL.",
      },
    ],
    projects: [
      {
        name: "E-commerce Platform",
        description: "Full-stack e-commerce app with payment integration, real-time inventory, and admin dashboard.",
        tech: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
      },
      {
        name: "ML Recommendation Engine",
        description: "Content-based recommendation system using TensorFlow and collaborative filtering.",
        tech: ["Python", "TensorFlow", "FastAPI", "PostgreSQL"],
      },
      {
        name: "Real-time Chat App",
        description: "WebSocket-based chat application with rooms, typing indicators, and file sharing.",
        tech: ["React", "Node.js", "Socket.io", "Redis"],
      },
    ],
    education: "B.Tech Computer Science - IIT Madras (2023-2027)",
    bio: "Passionate about building scalable web applications and exploring machine learning. Open source contributor with 500+ GitHub contributions.",
    resumeText: `HARSHATH MURUGAN
Full-Stack Developer & ML Enthusiast
IIT Madras | B.Tech Computer Science | GPA: 3.8/4.0

EXPERIENCE:
Software Engineering Intern - Google (May 2025 – Aug 2025)
- Built microservices for Google Cloud Platform using Go and Python
- Improved API latency by 40% through caching strategies
- Collaborated with a team of 8 engineers on distributed systems

Full-Stack Developer - University Tech Lab (Sep 2024 – Present)
- Developing campus-wide event management platform
- Stack: React, Node.js, PostgreSQL, Docker
- Serving 5,000+ active student users

PROJECTS:
E-commerce Platform - React, Node.js, MongoDB, Stripe, Redux
ML Recommendation Engine - Python, TensorFlow, FastAPI
Real-time Chat App - React, Node.js, Socket.io

SKILLS: Python, React, TypeScript, Node.js, TensorFlow, PostgreSQL, Docker, Next.js, Git, FastAPI, MongoDB, CSS/Tailwind, Redux, GraphQL
`,
  },
  {
    id: "s2",
    name: "Priya Sharma",
    avatar: "PS",
    title: "Data Science & Analytics",
    email: "priya.s@university.edu",
    university: "BITS Pilani",
    graduationYear: 2026,
    gpa: 3.9,
    skills: [
      { name: "Python", level: "expert", category: "Programming" },
      { name: "R", level: "advanced", category: "Programming" },
      { name: "SQL", level: "advanced", category: "Database" },
      { name: "Tableau", level: "advanced", category: "Visualization" },
      { name: "Scikit-learn", level: "advanced", category: "ML/AI" },
      { name: "Pandas", level: "expert", category: "Data" },
      { name: "TensorFlow", level: "intermediate", category: "ML/AI" },
      { name: "Power BI", level: "intermediate", category: "Visualization" },
    ],
    experience: [
      {
        title: "Data Science Intern",
        company: "Amazon",
        duration: "Jun 2025 – Aug 2025",
        description: "Built predictive models for supply chain optimization. Reduced forecasting error by 25%.",
      },
    ],
    projects: [
      {
        name: "Sentiment Analyzer",
        description: "NLP-based sentiment analysis tool using transformers.",
        tech: ["Python", "BERT", "Flask"],
      },
    ],
    education: "M.Sc Data Science - BITS Pilani (2024-2026)",
    bio: "Data enthusiast with a passion for turning raw data into actionable insights. Published researcher in NLP.",
    resumeText: `PRIYA SHARMA - Data Scientist | BITS Pilani`,
  },
  {
    id: "s3",
    name: "Arjun Patel",
    avatar: "AP",
    title: "UI/UX Designer & Frontend Developer",
    email: "arjun.p@university.edu",
    university: "NID Ahmedabad",
    graduationYear: 2026,
    gpa: 3.6,
    skills: [
      { name: "Figma", level: "expert", category: "Design" },
      { name: "React", level: "advanced", category: "Frontend" },
      { name: "CSS/Tailwind", level: "expert", category: "Frontend" },
      { name: "JavaScript", level: "advanced", category: "Programming" },
      { name: "Adobe XD", level: "advanced", category: "Design" },
      { name: "Framer Motion", level: "intermediate", category: "Frontend" },
      { name: "User Research", level: "advanced", category: "UX" },
    ],
    experience: [
      {
        title: "UX Design Intern",
        company: "Flipkart",
        duration: "Jan 2025 – Apr 2025",
        description: "Redesigned checkout flow increasing conversion by 18%.",
      },
    ],
    projects: [
      {
        name: "Design System",
        description: "Built a comprehensive component library used by 3 teams.",
        tech: ["Figma", "React", "Storybook"],
      },
    ],
    education: "B.Des Interaction Design - NID Ahmedabad (2022-2026)",
    bio: "Design-driven developer who bridges the gap between beautiful interfaces and functional code.",
    resumeText: `ARJUN PATEL - UI/UX Designer | NID Ahmedabad`,
  },
  {
    id: "s4",
    name: "Sneha Reddy",
    avatar: "SR",
    title: "Cloud & DevOps Engineer",
    email: "sneha.r@university.edu",
    university: "IIIT Hyderabad",
    graduationYear: 2027,
    gpa: 3.7,
    skills: [
      { name: "AWS", level: "advanced", category: "Cloud" },
      { name: "Kubernetes", level: "intermediate", category: "DevOps" },
      { name: "Terraform", level: "intermediate", category: "DevOps" },
      { name: "Python", level: "advanced", category: "Programming" },
      { name: "Docker", level: "advanced", category: "DevOps" },
      { name: "Linux", level: "advanced", category: "Systems" },
      { name: "CI/CD", level: "advanced", category: "DevOps" },
      { name: "Go", level: "intermediate", category: "Programming" },
    ],
    experience: [
      {
        title: "Cloud Engineering Intern",
        company: "Microsoft",
        duration: "May 2025 – Jul 2025",
        description: "Automated infrastructure provisioning with Terraform.",
      },
    ],
    projects: [
      {
        name: "Auto-Scaling Platform",
        description: "Kubernetes-based auto-scaling system for microservices.",
        tech: ["Kubernetes", "Go", "Prometheus"],
      },
    ],
    education: "B.Tech CSE - IIIT Hyderabad (2023-2027)",
    bio: "Infrastructure enthusiast passionate about building reliable, scalable cloud systems.",
    resumeText: `SNEHA REDDY - Cloud & DevOps Engineer | IIIT Hyderabad`,
  },
  {
    id: "s5",
    name: "Vikram Singh",
    avatar: "VS",
    title: "Mobile App Developer",
    email: "vikram.s@university.edu",
    university: "DTU Delhi",
    graduationYear: 2026,
    gpa: 3.5,
    skills: [
      { name: "React Native", level: "expert", category: "Mobile" },
      { name: "Flutter", level: "advanced", category: "Mobile" },
      { name: "TypeScript", level: "advanced", category: "Programming" },
      { name: "Firebase", level: "advanced", category: "Backend" },
      { name: "Swift", level: "intermediate", category: "Mobile" },
      { name: "Kotlin", level: "intermediate", category: "Mobile" },
      { name: "Redux", level: "advanced", category: "State Management" },
    ],
    experience: [
      {
        title: "Mobile Developer Intern",
        company: "Swiggy",
        duration: "Jun 2025 – Aug 2025",
        description: "Developed new features for the Swiggy consumer app.",
      },
    ],
    projects: [
      {
        name: "FitTrack",
        description: "Cross-platform fitness app with 50K+ downloads.",
        tech: ["React Native", "Firebase", "Redux"],
      },
    ],
    education: "B.Tech Software Engineering - DTU Delhi (2022-2026)",
    bio: "Mobile-first developer with 3 apps on the Play Store totaling 50K+ downloads.",
    resumeText: `VIKRAM SINGH - Mobile App Developer | DTU Delhi`,
  },
];

// ============================================================
// OPPORTUNITIES — 8 total, 5 will have detailed matches
// ============================================================
export const opportunities: Opportunity[] = [
  {
    id: "o1",
    title: "Full-Stack Software Engineer Intern",
    company: "Google",
    companyLogo: "G",
    type: "internship",
    location: "Bangalore, India",
    remote: true,
    salary: "₹80,000/month",
    description: "Join Google's Cloud team to build next-generation developer tools. Work on React-based dashboards and Python microservices. You will design and implement APIs, build interactive UIs, and work with distributed systems at scale.",
    requiredSkills: [
      { name: "React", importance: "required" },
      { name: "TypeScript", importance: "required" },
      { name: "Node.js", importance: "required" },
      { name: "MongoDB", importance: "preferred" },
      { name: "AWS", importance: "preferred" },
      { name: "Docker", importance: "nice-to-have" },
    ],
    postedDate: "2026-09-01",
    deadline: "2026-09-30",
    applicants: 342,
  },
  {
    id: "o2",
    title: "Frontend Developer",
    company: "Razorpay",
    companyLogo: "R",
    type: "full-time",
    location: "Bangalore, India",
    remote: false,
    salary: "₹15–22 LPA",
    description: "Build beautiful, performant payment interfaces used by millions. Focus on React, accessibility, and pixel-perfect implementations. Work closely with design and product teams to ship features weekly.",
    requiredSkills: [
      { name: "React", importance: "required" },
      { name: "TypeScript", importance: "required" },
      { name: "Next.js", importance: "required" },
      { name: "CSS/Tailwind", importance: "required" },
      { name: "GraphQL", importance: "preferred" },
      { name: "Testing", importance: "preferred" },
    ],
    postedDate: "2026-09-03",
    deadline: "2026-10-01",
    applicants: 234,
  },
  {
    id: "o3",
    title: "Backend Engineer — Python",
    company: "Zerodha",
    companyLogo: "Z",
    type: "full-time",
    location: "Bangalore, India",
    remote: true,
    salary: "₹18–28 LPA",
    description: "Build and scale backend systems powering India's largest stock trading platform. Design RESTful and WebSocket APIs serving millions of concurrent users. Strong Python and systems design skills required.",
    requiredSkills: [
      { name: "Python", importance: "required" },
      { name: "FastAPI", importance: "required" },
      { name: "PostgreSQL", importance: "required" },
      { name: "Redis", importance: "preferred" },
      { name: "Docker", importance: "preferred" },
      { name: "Kubernetes", importance: "nice-to-have" },
      { name: "Go", importance: "nice-to-have" },
    ],
    postedDate: "2026-09-04",
    deadline: "2026-10-15",
    applicants: 456,
  },
  {
    id: "o4",
    title: "ML Research Intern",
    company: "DeepMind",
    companyLogo: "DM",
    type: "internship",
    location: "London, UK",
    remote: true,
    salary: "₹1,50,000/month",
    description: "Research and implement novel ML architectures. Focus on NLP and reinforcement learning. Strong mathematical foundations and research experience required. Publication record is a plus.",
    requiredSkills: [
      { name: "Python", importance: "required" },
      { name: "TensorFlow", importance: "required" },
      { name: "PyTorch", importance: "required" },
      { name: "Mathematics", importance: "required" },
      { name: "Research/Publications", importance: "preferred" },
      { name: "NLP", importance: "preferred" },
      { name: "Reinforcement Learning", importance: "nice-to-have" },
    ],
    postedDate: "2026-09-06",
    deadline: "2026-10-30",
    applicants: 890,
  },
  {
    id: "o5",
    title: "DevOps Engineer Intern",
    company: "Atlassian",
    companyLogo: "AT",
    type: "internship",
    location: "Bangalore, India",
    remote: true,
    salary: "₹60,000/month",
    description: "Help automate CI/CD pipelines and manage cloud infrastructure for Jira and Confluence. Work with Kubernetes, Terraform, and modern DevOps practices.",
    requiredSkills: [
      { name: "AWS", importance: "required" },
      { name: "Docker", importance: "required" },
      { name: "Kubernetes", importance: "preferred" },
      { name: "Terraform", importance: "preferred" },
      { name: "Python", importance: "required" },
      { name: "Linux", importance: "required" },
      { name: "CI/CD", importance: "required" },
    ],
    postedDate: "2026-09-02",
    deadline: "2026-09-25",
    applicants: 189,
  },
  {
    id: "o6",
    title: "Data Science Analyst",
    company: "Amazon",
    companyLogo: "A",
    type: "full-time",
    location: "Hyderabad, India",
    remote: false,
    salary: "₹18–24 LPA",
    description: "Analyze large-scale datasets to drive business decisions. Build ML models for demand forecasting and customer segmentation.",
    requiredSkills: [
      { name: "Python", importance: "required" },
      { name: "SQL", importance: "required" },
      { name: "Pandas", importance: "required" },
      { name: "Scikit-learn", importance: "required" },
      { name: "Tableau", importance: "preferred" },
      { name: "Statistics", importance: "required" },
    ],
    postedDate: "2026-09-05",
    deadline: "2026-10-15",
    applicants: 567,
  },
  {
    id: "o7",
    title: "Mobile Developer",
    company: "PhonePe",
    companyLogo: "PP",
    type: "full-time",
    location: "Pune, India",
    remote: false,
    salary: "₹14–20 LPA",
    description: "Build and maintain cross-platform mobile applications for India's leading fintech platform.",
    requiredSkills: [
      { name: "React Native", importance: "required" },
      { name: "TypeScript", importance: "required" },
      { name: "Redux", importance: "required" },
      { name: "REST APIs", importance: "required" },
      { name: "iOS/Android", importance: "preferred" },
    ],
    postedDate: "2026-09-04",
    deadline: "2026-10-10",
    applicants: 156,
  },
  {
    id: "o8",
    title: "Product Design Intern",
    company: "Figma",
    companyLogo: "F",
    type: "internship",
    location: "San Francisco, US",
    remote: true,
    salary: "$8,000/month",
    description: "Design features for the world's leading collaborative design tool. Work with product and engineering to ship design solutions used by millions.",
    requiredSkills: [
      { name: "Figma", importance: "required" },
      { name: "User Research", importance: "required" },
      { name: "Prototyping", importance: "required" },
      { name: "Design Systems", importance: "preferred" },
      { name: "HTML/CSS", importance: "nice-to-have" },
    ],
    postedDate: "2026-09-07",
    deadline: "2026-11-01",
    applicants: 723,
  },
];

// ============================================================
// DETAILED MATCHES FOR HARSHATH (student s1)
// Exactly 5 matches with scores: 94, 91, 87, 76, 61
// ============================================================
export const detailedMatches: DetailedMatch[] = [
  {
    studentId: "s1",
    opportunityId: "o1",
    score: 94,
    breakdown: { skills: 95, experience: 90, projects: 94, overall: 94 },
    matchedSkills: ["React", "TypeScript", "Node.js", "MongoDB"],
    skillGaps: ["AWS", "Docker"],
    relevantExperience: "Full-stack web development at Google and University Tech Lab",
    relevantProject: "E-commerce Platform",
    explanation:
      "Your React and TypeScript experience strongly aligns with the core requirements. Your previous full-stack project demonstrates practical experience with Node.js and MongoDB. Your Google internship is directly relevant experience at the same company. AWS is the primary missing skill, but your Docker knowledge (intermediate) partially compensates. Overall, you're an exceptionally strong candidate.",
    strengths: [
      "Prior Google internship gives insider advantage",
      "Expert-level Python with advanced React/TypeScript",
      "E-commerce project proves full-stack capability",
      "Strong open source contribution record",
    ],
  },
  {
    studentId: "s1",
    opportunityId: "o2",
    score: 91,
    breakdown: { skills: 93, experience: 88, projects: 90, overall: 91 },
    matchedSkills: ["React", "TypeScript", "Next.js", "CSS/Tailwind", "GraphQL"],
    skillGaps: ["Testing"],
    relevantExperience: "Frontend development across multiple projects and internship",
    relevantProject: "Real-time Chat App",
    explanation:
      "Excellent frontend skill match — you have all four required skills (React, TypeScript, Next.js, CSS/Tailwind) at advanced level or above. Your GraphQL knowledge covers the preferred skill. The only gap is formal testing experience (Jest/Cypress), which is easily addressed. Your chat app project demonstrates complex real-time UI work that Razorpay values.",
    strengths: [
      "All 4 required frontend skills at advanced level",
      "Next.js proficiency matches their tech stack exactly",
      "Real-time UI experience from chat app project",
      "GraphQL knowledge covers preferred skill",
    ],
  },
  {
    studentId: "s1",
    opportunityId: "o3",
    score: 87,
    breakdown: { skills: 90, experience: 82, projects: 88, overall: 87 },
    matchedSkills: ["Python", "FastAPI", "PostgreSQL", "Docker"],
    skillGaps: ["Redis", "Kubernetes", "Go"],
    relevantExperience: "Backend development with Python and microservices at Google",
    relevantProject: "ML Recommendation Engine",
    explanation:
      "Your expert Python and intermediate FastAPI skills match the core requirements well. PostgreSQL experience is solid. Your Google internship building microservices is highly relevant backend experience. The gaps in Redis, Kubernetes, and Go are all 'nice-to-have' level — Redis and Go are learnable quickly given your strong foundation. Your ML project shows you can build Python-based production systems.",
    strengths: [
      "Expert Python matches their primary language",
      "Google microservices experience is directly relevant",
      "FastAPI proficiency aligns with their framework",
      "ML project demonstrates production Python skills",
    ],
  },
  {
    studentId: "s1",
    opportunityId: "o4",
    score: 76,
    breakdown: { skills: 72, experience: 70, projects: 82, overall: 76 },
    matchedSkills: ["Python", "TensorFlow"],
    skillGaps: ["PyTorch", "Mathematics", "Research/Publications", "NLP", "Reinforcement Learning"],
    relevantExperience: "ML project work but limited formal research experience",
    relevantProject: "ML Recommendation Engine",
    explanation:
      "You have the Python foundation and some TensorFlow experience, and your ML recommendation engine shows applied ML skills. However, DeepMind requires deep research orientation — the gaps in PyTorch, formal mathematics, research publications, and specialized areas (NLP, RL) are significant. This role needs a more research-focused profile, though your practical ML experience is a positive signal.",
    strengths: [
      "Expert Python is the right foundation",
      "ML project shows applied machine learning ability",
      "Strong programming skills transfer well to research",
    ],
  },
  {
    studentId: "s1",
    opportunityId: "o5",
    score: 61,
    breakdown: { skills: 58, experience: 55, projects: 65, overall: 61 },
    matchedSkills: ["Docker", "Python"],
    skillGaps: ["AWS", "Kubernetes", "Terraform", "Linux", "CI/CD"],
    relevantExperience: "Limited DevOps-specific experience; some Docker usage in projects",
    relevantProject: "E-commerce Platform (containerized deployment)",
    explanation:
      "While you have intermediate Docker skills and expert Python, most of the core DevOps requirements (AWS, Linux, CI/CD) are gaps. Your development background gives you an understanding of what DevOps supports, and your Docker usage in the E-commerce project shows some infrastructure awareness. However, this role needs hands-on cloud infrastructure and automation experience that your profile currently lacks.",
    strengths: [
      "Docker experience from project deployments",
      "Expert Python is useful for scripting/automation",
      "Developer perspective valuable for DevOps tooling",
    ],
  },
  // Other student matches for recruiter view
  {
    studentId: "s2",
    opportunityId: "o6",
    score: 96,
    breakdown: { skills: 97, experience: 94, projects: 95, overall: 96 },
    matchedSkills: ["Python", "SQL", "Pandas", "Scikit-learn", "Tableau"],
    skillGaps: [],
    relevantExperience: "Data Science Intern at Amazon — predictive modeling",
    relevantProject: "Sentiment Analyzer",
    explanation: "Near-perfect match. Amazon DS internship, expert Python/Pandas, advanced SQL/Tableau/Scikit-learn. Published NLP research adds credibility.",
    strengths: ["Prior Amazon experience", "Expert Python & Pandas", "Published researcher", "All required skills covered"],
  },
  {
    studentId: "s3",
    opportunityId: "o2",
    score: 92,
    breakdown: { skills: 94, experience: 88, projects: 92, overall: 92 },
    matchedSkills: ["React", "CSS/Tailwind", "Figma"],
    skillGaps: ["TypeScript", "Next.js"],
    relevantExperience: "UX Design Intern at Flipkart",
    relevantProject: "Design System",
    explanation: "Outstanding design-to-code skills. Expert Figma and CSS, advanced React. TypeScript and Next.js gaps are moderate.",
    strengths: ["Expert Figma", "Expert CSS/Tailwind", "UX research background", "Design system experience"],
  },
  {
    studentId: "s4",
    opportunityId: "o5",
    score: 95,
    breakdown: { skills: 96, experience: 93, projects: 94, overall: 95 },
    matchedSkills: ["AWS", "Docker", "Kubernetes", "Terraform", "Python", "Linux", "CI/CD"],
    skillGaps: [],
    relevantExperience: "Cloud Engineering Intern at Microsoft",
    relevantProject: "Auto-Scaling Platform",
    explanation: "Perfect DevOps fit. Microsoft cloud internship, all required skills at advanced level.",
    strengths: ["Microsoft internship", "All required skills covered", "Kubernetes project", "Strong Linux skills"],
  },
  {
    studentId: "s5",
    opportunityId: "o7",
    score: 93,
    breakdown: { skills: 95, experience: 90, projects: 93, overall: 93 },
    matchedSkills: ["React Native", "TypeScript", "Redux", "REST APIs"],
    skillGaps: [],
    relevantExperience: "Mobile Developer Intern at Swiggy",
    relevantProject: "FitTrack",
    explanation: "Expert React Native, all required skills covered. Swiggy internship and 50K+ downloads demonstrate proven ability.",
    strengths: ["Expert React Native", "Swiggy internship", "Published apps with 50K+ downloads", "All required skills"],
  },
];

// ============================================================
// Helper functions
// ============================================================
export function getStudentById(id: string): Student | undefined {
  return students.find(s => s.id === id);
}

export function getOpportunityById(id: string): Opportunity | undefined {
  return opportunities.find(o => o.id === id);
}

export function getMatchesForStudent(studentId: string): (DetailedMatch & { opportunity: Opportunity })[] {
  return detailedMatches
    .filter(m => m.studentId === studentId)
    .map(m => ({
      ...m,
      opportunity: getOpportunityById(m.opportunityId)!,
    }))
    .filter(m => m.opportunity)
    .sort((a, b) => b.score - a.score);
}

export function getMatchesForOpportunity(opportunityId: string): (DetailedMatch & { student: Student })[] {
  return detailedMatches
    .filter(m => m.opportunityId === opportunityId)
    .map(m => ({
      ...m,
      student: getStudentById(m.studentId)!,
    }))
    .filter(m => m.student)
    .sort((a, b) => b.score - a.score);
}
