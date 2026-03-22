const resume = {
  name: "Aarav Mehta",
  role: "Full Stack Developer",

  contact: {
    location: "Bangalore, India",
    email: "aarav.mehta.dev@gmail.com",
    phone: "+91 9876543210",
    linkedin: "linkedin.com/in/aaravmehta",
    github: "github.com/aaravmehta"
  },

  professional_summary: `
  Full Stack Developer with 3+ years of experience building scalable 
  and performant web applications. Skilled in modern JavaScript frameworks 
  and backend systems, with a strong focus on clean architecture and user-centric design.
  Passionate about solving real-world problems through technology.
  `,

  technical_skills: {
    languages: ["JavaScript", "TypeScript", "Python"],

    frontend: [
      "React.js",
      "Next.js",
      "Redux Toolkit",
      "Tailwind CSS"
    ],

    backend: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "GraphQL"
    ],

    database: [
      "MongoDB",
      "PostgreSQL"
    ],

    tools: [
      "Git",
      "Docker",
      "Postman",
      "Linux",
      "AWS (basic)"
    ],

    concepts: [
      "JWT Authentication",
      "MVC Architecture",
      "Microservices (basic)",
      "System Design",
      "CI/CD"
    ]
  },

  work_experience: [
    {
      role: "Software Engineer",
      company: "TechNova Solutions",
      duration: "Jan 2022 - Present",
      responsibilities: [
        "Developed scalable REST APIs serving 10k+ users",
        "Optimized frontend performance improving load time by 35%",
        "Collaborated with cross-functional teams to deliver features",
        "Implemented authentication and authorization using JWT"
      ]
    },

    {
      role: "Frontend Developer",
      company: "PixelCraft Labs",
      duration: "Jun 2020 - Dec 2021",
      responsibilities: [
        "Built responsive UI components using React",
        "Improved UX with modern design systems",
        "Integrated APIs and handled state management using Redux"
      ]
    }
  ],

  projects: [
    {
      name: "DevConnect",
      description: `
      A social platform for developers to connect, share projects, 
      and collaborate in real-time.
      `,
      tech: ["React", "Node.js", "Socket.io", "MongoDB"],
      highlights: [
        "Real-time messaging",
        "User authentication system",
        "Profile and portfolio integration"
      ]
    },

    {
      name: "TaskFlow",
      description: `
      A productivity tool for managing tasks, deadlines, and team workflows.
      `,
      tech: ["Next.js", "Express", "PostgreSQL"],
      highlights: [
        "Drag-and-drop task management",
        "Team collaboration features",
        "Cloud-based data sync"
      ]
    }
  ],

  education: {
    degree: "B.Tech in Computer Science",
    university: "Visvesvaraya Technological University",
    year: "2016 - 2020"
  },

  achievements: [
    "Employee of the Month - TechNova (2023)",
    "Top 5 finalist in National Hackathon",
    "Open-source contributor with 500+ GitHub stars"
  ],

  interests: [
    "Open Source Contribution",
    "System Design",
    "Tech Blogging",
    "Traveling"
  ]
};

const selfDescription = `
I am a detail-oriented and curious Full Stack Developer who enjoys building 
scalable and user-friendly applications. I thrive in fast-paced environments 
where problem-solving and creativity intersect.

With a strong foundation in modern web technologies, I focus on writing clean, 
maintainable code and continuously improving my skills. I enjoy collaborating 
with teams, learning new tools, and turning complex ideas into simple, 
impactful digital solutions.
`;

const jobDescription = `
We are looking for a passionate Full Stack Developer to join our growing team. 
The ideal candidate should have experience in building modern web applications 
using JavaScript frameworks and backend technologies.

Responsibilities include developing and maintaining scalable applications, 
collaborating with cross-functional teams, and ensuring high performance 
and responsiveness of systems.

Requirements:
- Strong knowledge of JavaScript, React, and Node.js
- Experience with REST APIs and database systems
- Familiarity with version control tools like Git
- Problem-solving mindset and attention to detail

Bonus:
- Experience with cloud platforms (AWS/GCP)
- Understanding of system design and scalability
`;

module.exports = {
  resume,
  selfDescription,
  jobDescription
};