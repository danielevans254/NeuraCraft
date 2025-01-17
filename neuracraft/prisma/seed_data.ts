import {
  CourseMedia,
  CourseType,
  Frequency,
  Level,
  PostType,
  Prisma,
  QuestionDifficulty,
  Role,
  Topic,
  Course
} from "@prisma/client";

export const users: Prisma.UserCreateInput[] = [
  {
    email: "admin@example.com",
    username: "admin",
    role: Role.ADMIN,
    emailVerified: new Date("2023-01-01"),
    isNewUser: false,
    name: "Admin User",
    ceuId: "2021-04721",
    consentDate: new Date("2023-01-01"),
    points: 1000,
    emailFrequency: Frequency.Weekly,
  },
  {
    email: "user1@example.com",
    username: "user1",
    role: Role.USER,
    emailVerified: new Date("2023-02-15"),
    isNewUser: false,
    name: "Jane Doe",
    ceuId: "2023-13212",
    consentDate: new Date("2023-02-15"),
    points: 150,
    emailFrequency: Frequency.Daily,
  },
  {
    email: "user2@example.com",
    username: "user2",
    role: Role.USER,
    emailVerified: new Date("2023-03-10"),
    isNewUser: true,
    name: "John Smith",
    ceuId: "2020-12873",
    consentDate: new Date("2023-03-10"),
    points: 50,
    emailFrequency: Frequency.Monthly,
  },
];

export const samplePosts: Prisma.PostCreateInput[] = [
  {
    title: "Help with JavaScript Promises",
    message: "I'm struggling to understand how Promises work in JavaScript. Can someone explain?",
    course: { connect: { courseSlug: "backend-development" } },
    postType: PostType.Content,
    user: { connect: { email: "user1@example.com" } },
  },
  {
    title: "Best resources for learning machine learning",
    message: "I'm looking for good online resources to start learning machine learning. Any recommendations?",
    course: { connect: { courseSlug: "algorithm-analysis" } },
    postType: PostType.Misc,
    user: { connect: { email: "user2@example.com" } },
  },
];

export const sampleComments: Prisma.CommentCreateInput[] = [
  {
    message: "Promises are a way to handle asynchronous operations in JavaScript. They represent a value that may not be available immediately but will be resolved at some point in the future.",
    user: { connect: { email: "admin@example.com" } },
    post: { connect: { postId: "1" } },
  },
  {
    message: "I'd recommend starting with Andrew Ng's Machine Learning course on Coursera. It's a great introduction to the field.",
    user: { connect: { email: "user1@example.com" } },
    post: { connect: { postId: "2" } },
  },
];

export const Topics: Topic[] = [
  {
    topicSlug: "data-structures",
    topicName: "Data Structures",
    topicLevel: Level.Foundational,
    topicPrior: 0.5,
  },
  {
    topicSlug: "algorithms",
    topicName: "Algorithms",
    topicLevel: Level.Foundational,
    topicPrior: 0.4,
  },
  {
    topicSlug: "operating-systems",
    topicName: "Operating Systems",
    topicLevel: Level.Foundational,
    topicPrior: 0.388,
  },
  {
    topicSlug: "networking",
    topicName: "Networking Fundamentals",
    topicLevel: Level.Foundational,
    topicPrior: 0.375,
  },
  {
    topicSlug: "database-systems",
    topicName: "Database Systems",
    topicLevel: Level.Foundational,
    topicPrior: 0.433,
  },
  {
    topicSlug: "software-engineering",
    topicName: "Software Engineering Principles",
    topicLevel: Level.Foundational,
    topicPrior: 0.398,
  },
  {
    topicSlug: "web-development",
    topicName: "Web Development",
    topicLevel: Level.Foundational,
    topicPrior: 0.420,
  },
  {
    topicSlug: "object-oriented-programming",
    topicName: "Object-Oriented Programming",
    topicLevel: Level.Foundational,
    topicPrior: 0.350,
  },
  {
    topicSlug: "machine-learning",
    topicName: "Introduction to Machine Learning",
    topicLevel: Level.Intermediate,
    topicPrior: 0.295,
  },
  {
    topicSlug: "cloud-computing",
    topicName: "Cloud Computing Basics",
    topicLevel: Level.Intermediate,
    topicPrior: 0.310,
  },
  {
    topicSlug: "cybersecurity",
    topicName: "Cybersecurity Fundamentals",
    topicLevel: Level.Intermediate,
    topicPrior: 0.325,
  },
  {
    topicSlug: "mobile-development",
    topicName: "Mobile App Development",
    topicLevel: Level.Intermediate,
    topicPrior: 0.380,
  },
  {
    topicSlug: "data-analytics",
    topicName: "Data Analytics",
    topicLevel: Level.Intermediate,
    topicPrior: 0.355,
  },
  {
    topicSlug: "software-testing",
    topicName: "Software Testing and Quality Assurance",
    topicLevel: Level.Intermediate,
    topicPrior: 0.360,
  },
  {
    topicSlug: "devops",
    topicName: "DevOps Practices",
    topicLevel: Level.Intermediate,
    topicPrior: 0.365,
  },
  {
    topicSlug: "design-patterns",
    topicName: "Design Patterns in Software Development",
    topicLevel: Level.Advanced,
    topicPrior: 0.325,
  },
  {
    topicSlug: "algorithms-optimization",
    topicName: "Algorithm Optimization Techniques",
    topicLevel: Level.Advanced,
    topicPrior: 0.320,
  },
  {
    topicSlug: "advanced-database-systems",
    topicName: "Advanced Database Systems",
    topicLevel: Level.Advanced,
    topicPrior: 0.300,
  },
  {
    topicSlug: "distributed-systems",
    topicName: "Distributed Systems",
    topicLevel: Level.Advanced,
    topicPrior: 0.310,
  },
  {
    topicSlug: "artificial-intelligence",
    topicName: "Artificial Intelligence Concepts",
    topicLevel: Level.Advanced,
    topicPrior: 0.340,
  },
  {
    topicSlug: "network-security",
    topicName: "Network Security Principles",
    topicLevel: Level.Advanced,
    topicPrior: 0.330,
  },
  {
    topicSlug: "blockchain",
    topicName: "Blockchain Technology",
    topicLevel: Level.Advanced,
    topicPrior: 0.320,
  },
  {
    topicSlug: "user-experience-design",
    topicName: "User Experience Design",
    topicLevel: Level.Advanced,
    topicPrior: 0.310,
  },
  {
    topicSlug: "ethical-hacking",
    topicName: "Ethical Hacking Techniques",
    topicLevel: Level.Advanced,
    topicPrior: 0.300,
  },
  {
    topicSlug: "software-architecture",
    topicName: "Software Architecture",
    topicLevel: Level.Advanced,
    topicPrior: 0.320,
  },
  {
    topicSlug: "quantum-computing",
    topicName: "Introduction to Quantum Computing",
    topicLevel: Level.Advanced,
    topicPrior: 0.310,
  },
  {
    topicSlug: "big-data",
    topicName: "Big Data Technologies",
    topicLevel: Level.Intermediate,
    topicPrior: 0.325,
  },
];

export const Courses: {
  moduleCode: string;
  moduleTitle: string;
  courseSlug: string;
  courseName: string;
  courseDescription: string;
  courseImage: string;
  courseLevel: Level;
  type: CourseType;
  video?: string;
  week?: number;
  studio?: number;
  topics: Topic["topicSlug"][];
  courseMedia: CourseMedia[];
}[] = [
    {
      moduleCode: "CS-WELCOME-QUIZ",
      moduleTitle: "Quiz Assessment",
      week: 0,
      studio: 0,
      courseSlug: "welcome-quiz-assessment",
      courseName: "Quiz Assessment",
      courseDescription: "Get a quick assessment of your current level and mastery.",
      courseImage: "courses/data-structures.jpg",
      courseLevel: Level.Foundational,
      type: CourseType.Quiz,
      topics: ["data-structures", "algorithms", "operating-systems", "networking", "database-systems", "software-engineering", "web-development", "object-oriented-programming", "machine-learning", "cloud-computing", "cybersecurity", "mobile-development", "data-analytics", "software-testing", "devops", "design-patterns", "algorithms-optimization", "advanced-database-systems", "distributed-systems", "artificial-intelligence", "network-security", "blockchain", "user-experience-design", "ethical-hacking", "software-architecture", "quantum-computing", "big-data"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w1s1-data-structures11",
        courseSlug: "data-structures-fundamentals",
        courseMediaURL: "https://res.cloudinary.com/placeholder/data-structures.pdf4",
        mediaName: "Data Structures Fundamentals",
      }],
    },
    {
      moduleCode: "CS1010",
      moduleTitle: "Data Structures",
      week: 1,
      studio: 1,
      courseSlug: "data-structures-fundamentals",
      courseName: "Data Structures Fundamentals",
      courseDescription: "Learn essential data structures including arrays, linked lists, stacks, and queues.",
      courseImage: "courses/data-structures.jpg",
      courseLevel: Level.Foundational,
      type: CourseType.Content,
      video: '<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/placeholder"></iframe>',
      topics: ["data-structures"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w1s1-data-structures1",
        courseSlug: "data-structures-fundamentals",
        courseMediaURL: "https://res.cloudinary.com/placeholder/data-structures.pdf4",
        mediaName: "Data Structures Fundamentals",
      }],
    },
    {
      moduleCode: "CS1011",
      moduleTitle: "Algorithms",
      week: 1,
      studio: 2,
      courseSlug: "algorithms-fundamentals",
      courseName: "Algorithm Basics",
      courseDescription: "Master fundamental algorithmic concepts and problem-solving strategies.",
      courseImage: "courses/algorithms.jpg",
      courseLevel: Level.Foundational,
      type: CourseType.Content,
      topics: ["algorithms"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w1s2-algorithms32",
        courseSlug: "algorithms-fundamentals",
        courseMediaURL: "https://res.cloudinary.com/placeholder/algorithms.pdf",
        mediaName: "Algorithm Basics",
      }],
    },
    {
      moduleCode: "CS1012",
      moduleTitle: "Operating Systems",
      week: 1,
      studio: 3,
      courseSlug: "operating-systems-basics",
      courseName: "Operating Systems Fundamentals",
      courseDescription: "Understanding core operating system concepts and principles.",
      courseImage: "courses/os.jpg",
      courseLevel: Level.Foundational,
      type: CourseType.Content,
      topics: ["operating-systems"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w1s3-os",
        courseSlug: "operating-systems-basics",
        courseMediaURL: "https://res.cloudinary.com/placeholder/os.pdf",
        mediaName: "Operating Systems Fundamentals",
      }],
    },
    {
      moduleCode: "CS1013",
      moduleTitle: "Networking",
      week: 1,
      studio: 4,
      courseSlug: "networking-basics",
      courseName: "Networking Fundamentals",
      courseDescription: "Introduction to computer networking concepts and protocols.",
      courseImage: "courses/networking.jpg",
      courseLevel: Level.Foundational,
      type: CourseType.Content,
      topics: ["networking"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w1s4-networking53",
        courseSlug: "networking-basics",
        courseMediaURL: "https://res.cloudinary.com/placeholder/networking.pdf",
        mediaName: "Networking Fundamentals",
      }],
    },

    // Week 2
    {
      moduleCode: "CS1014",
      moduleTitle: "Database Systems",
      week: 2,
      studio: 1,
      courseSlug: "database-fundamentals",
      courseName: "Database Systems Basics",
      courseDescription: "Learn fundamental concepts of database management systems.",
      courseImage: "courses/database.jpg",
      courseLevel: Level.Foundational,
      type: CourseType.Content,
      topics: ["database-systems"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w2s1-database14",
        courseSlug: "database-fundamentals",
        courseMediaURL: "https://res.cloudinary.com/placeholder/database.pdf",
        mediaName: "Database Systems Basics",
      }],
    },
    {
      moduleCode: "CS1015",
      moduleTitle: "Software Engineering",
      week: 2,
      studio: 2,
      courseSlug: "software-engineering-basics",
      courseName: "Software Engineering Principles",
      courseDescription: "Understanding core software engineering principles and practices.",
      courseImage: "courses/software-eng.jpg",
      courseLevel: Level.Foundational,
      type: CourseType.Content,
      topics: ["software-engineering"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w2s2-software-eng63",
        courseSlug: "software-engineering-basics",
        courseMediaURL: "https://res.cloudinary.com/placeholder/software-eng.pdf",
        mediaName: "Software Engineering Principles",
      }],
    },
    {
      moduleCode: "CS1016",
      moduleTitle: "Web Development",
      week: 2,
      studio: 3,
      courseSlug: "web-development-basics",
      courseName: "Web Development Fundamentals",
      courseDescription: "Introduction to web development technologies and concepts.",
      courseImage: "courses/web-dev.jpg",
      courseLevel: Level.Foundational,
      type: CourseType.Content,
      topics: ["web-development"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w2s3-web-dev136",
        courseSlug: "web-development-basics",
        courseMediaURL: "https://res.cloudinary.com/placeholder/web-dev.pdf",
        mediaName: "Web Development Fundamentals",
      }],
    },
    {
      moduleCode: "CS1017",
      moduleTitle: "Object-Oriented Programming",
      week: 2,
      studio: 4,
      courseSlug: "oop-basics",
      courseName: "OOP Fundamentals",
      courseDescription: "Learn object-oriented programming concepts and principles.",
      courseImage: "courses/oop.jpg",
      courseLevel: Level.Foundational,
      type: CourseType.Content,
      topics: ["object-oriented-programming"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w2s4-oop63",
        courseSlug: "oop-basics",
        courseMediaURL: "https://res.cloudinary.com/placeholder/oop.pdf",
        mediaName: "OOP Fundamentals",
      }],
    },

    // Intermediate Level Courses - Week 3
    {
      moduleCode: "CS2010",
      moduleTitle: "Machine Learning",
      week: 3,
      studio: 1,
      courseSlug: "machine-learning-intro",
      courseName: "Introduction to Machine Learning",
      courseDescription: "Learn basic concepts and applications of machine learning.",
      courseImage: "courses/ml.jpg",
      courseLevel: Level.Intermediate,
      type: CourseType.Content,
      topics: ["machine-learning"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w3s1-ml683",
        courseSlug: "machine-learning-intro",
        courseMediaURL: "https://res.cloudinary.com/placeholder/ml.pdf",
        mediaName: "Introduction to Machine Learning",
      }],
    },
    {
      moduleCode: "CS2011",
      moduleTitle: "Cloud Computing",
      week: 3,
      studio: 2,
      courseSlug: "cloud-computing-basics",
      courseName: "Cloud Computing Fundamentals",
      courseDescription: "Introduction to cloud computing concepts and services.",
      courseImage: "courses/cloud.jpg",
      courseLevel: Level.Intermediate,
      type: CourseType.Content,
      topics: ["cloud-computing"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w3s2-cloud07",
        courseSlug: "cloud-computing-basics",
        courseMediaURL: "https://res.cloudinary.com/placeholder/cloud.pdf",
        mediaName: "Cloud Computing Fundamentals",
      }],
    },
    {
      moduleCode: "CS2012",
      moduleTitle: "Cybersecurity",
      week: 3,
      studio: 3,
      courseSlug: "cybersecurity-fundamentals",
      courseName: "Cybersecurity Basics",
      courseDescription: "Learn fundamental concepts of cybersecurity and threat protection.",
      courseImage: "courses/security.jpg",
      courseLevel: Level.Intermediate,
      type: CourseType.Content,
      topics: ["cybersecurity"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w3s3-security74",
        courseSlug: "cybersecurity-fundamentals",
        courseMediaURL: "https://res.cloudinary.com/placeholder/security.pdf",
        mediaName: "Cybersecurity Basics",
      }],
    },
    {
      moduleCode: "CS2013",
      moduleTitle: "Mobile Development",
      week: 3,
      studio: 4,
      courseSlug: "mobile-dev-basics",
      courseName: "Mobile Development Fundamentals",
      courseDescription: "Introduction to mobile app development concepts and platforms.",
      courseImage: "courses/mobile.jpg",
      courseLevel: Level.Intermediate,
      type: CourseType.Content,
      topics: ["mobile-development"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w3s4-mobile35",
        courseSlug: "mobile-dev-basics",
        courseMediaURL: "https://res.cloudinary.com/placeholder/mobile.pdf",
        mediaName: "Mobile Development Fundamentals",
      }],
    },

    // Week 4
    {
      moduleCode: "CS2014",
      moduleTitle: "Data Analytics",
      week: 4,
      studio: 1,
      courseSlug: "data-analytics-basics",
      courseName: "Data Analytics Fundamentals",
      courseDescription: "Learn basic concepts and techniques in data analytics.",
      courseImage: "courses/analytics.jpg",
      courseLevel: Level.Intermediate,
      type: CourseType.Content,
      topics: ["data-analytics"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w4s1-analytics14",
        courseSlug: "data-analytics-basics",
        courseMediaURL: "https://res.cloudinary.com/placeholder/analytics.pdf",
        mediaName: "Data Analytics Fundamentals",
      }],
    },
    {
      moduleCode: "CS2015",
      moduleTitle: "Software Testing",
      week: 4,
      studio: 2,
      courseSlug: "software-testing-basics",
      courseName: "Software Testing Fundamentals",
      courseDescription: "Introduction to software testing methodologies and practices.",
      courseImage: "courses/testing.jpg",
      courseLevel: Level.Intermediate,
      type: CourseType.Content,
      topics: ["software-testing"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w4s2-testing42",
        courseSlug: "software-testing-basics",
        courseMediaURL: "https://res.cloudinary.com/placeholder/testing.pdf",
        mediaName: "Software Testing Fundamentals",
      }],
    },
    {
      moduleCode: "CS2016",
      moduleTitle: "DevOps",
      week: 4,
      studio: 3,
      courseSlug: "devops-basics",
      courseName: "DevOps Fundamentals",
      courseDescription: "Learn basic DevOps practices and principles.",
      courseImage: "courses/devops.jpg",
      courseLevel: Level.Intermediate,
      type: CourseType.Content,
      topics: ["devops"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w4s3-devops13",
        courseSlug: "devops-basics",
        courseMediaURL: "https://res.cloudinary.com/placeholder/devops.pdf",
        mediaName: "DevOps Fundamentals",
      }],
    },
    {
      moduleCode: "CS3010",
      moduleTitle: "Design Patterns",
      week: 5,
      studio: 1,
      courseSlug: "design-patterns-advanced",
      courseName: "Advanced Design Patterns",
      courseDescription: "Study advanced software design patterns and their applications.",
      courseImage: "courses/design-patterns.jpg",
      courseLevel: Level.Advanced,
      type: CourseType.Content,
      topics: ["design-patterns"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w5s1-design-patterns43",
        courseSlug: "design-patterns-advanced",
        courseMediaURL: "https://res.cloudinary.com/placeholder/design-patterns.pdf",
        mediaName: "Advanced Design Patterns",
      }],
    },
    {
      moduleCode: "CS3011",
      moduleTitle: "Algorithm Optimization",
      week: 5,
      studio: 2,
      courseSlug: "algorithm-optimization",
      courseName: "Algorithm Optimization Techniques",
      courseDescription: "Learn advanced techniques for optimizing algorithms.",
      courseImage: "courses/algo-opt.jpg",
      courseLevel: Level.Advanced,
      type: CourseType.Content,
      topics: ["algorithms-optimization"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w5s2-algo-opt134",
        courseSlug: "algorithm-optimization",
        courseMediaURL: "https://res.cloudinary.com/placeholder/algo-opt.pdf",
        mediaName: "Algorithm Optimization Techniques",
      }],
    },
    {
      moduleCode: "CS3012",
      moduleTitle: "Advanced Databases",
      week: 5,
      studio: 3,
      courseSlug: "advanced-databases",
      courseName: "Advanced Database Systems",
      courseDescription: "Explore advanced database concepts and technologies.",
      courseImage: "courses/adv-db.jpg",
      courseLevel: Level.Advanced,
      type: CourseType.Content,
      topics: ["advanced-database-systems"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w5s3-adv-db53",
        courseSlug: "advanced-databases",
        courseMediaURL: "https://res.cloudinary.com/placeholder/adv-db.pdf",
        mediaName: "Advanced Database Systems",
      }],
    },
    {
      moduleCode: "CS3013",
      moduleTitle: "Distributed Systems",
      week: 5,
      studio: 4,
      courseSlug: "distributed-systems",
      courseName: "Distributed Systems Architecture",
      courseDescription: "Study distributed systems principles and architectures.",
      courseImage: "courses/distributed.jpg",
      courseLevel: Level.Advanced,
      type: CourseType.Content,
      topics: ["distributed-systems"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w5s3-adv-db135",
        courseSlug: "distributed-systems",
        courseMediaURL: "https://res.cloudinary.com/placeholder/adv-db.pdf",
        mediaName: "Advanced Database Systems",
      }],
    },
    {
      moduleCode: "CS3014",
      moduleTitle: "Artificial Intelligence",
      week: 6,
      studio: 1,
      courseSlug: "ai-concepts",
      courseName: "Artificial Intelligence Concepts",
      courseDescription: "Study core concepts and applications of artificial intelligence.",
      courseImage: "courses/ai.jpg",
      courseLevel: Level.Advanced,
      type: CourseType.Content,
      topics: ["artificial-intelligence"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w6s1-ai64",
        courseSlug: "ai-concepts",
        courseMediaURL: "https://res.cloudinary.com/placeholder/ai.pdf",
        mediaName: "Artificial Intelligence Concepts",
      }],
    },
    {
      moduleCode: "CS3015",
      moduleTitle: "Network Security",
      week: 6,
      studio: 2,
      courseSlug: "network-security-advanced",
      courseName: "Advanced Network Security",
      courseDescription: "Learn advanced network security principles and practices.",
      courseImage: "courses/network-security.jpg",
      courseLevel: Level.Advanced,
      type: CourseType.Content,
      topics: ["network-security"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w6s2-network-security431",
        courseSlug: "network-security-advanced",
        courseMediaURL: "https://res.cloudinary.com/placeholder/network-security.pdf",
        mediaName: "Advanced Network Security",
      }],
    },
    {
      moduleCode: "CS3016",
      moduleTitle: "Blockchain",
      week: 6,
      studio: 3,
      courseSlug: "blockchain-technology",
      courseName: "Blockchain Technology",
      courseDescription: "Explore blockchain concepts and applications.",
      courseImage: "courses/blockchain.jpg",
      courseLevel: Level.Advanced,
      type: CourseType.Content,
      topics: ["blockchain"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w6s3-blockchain531",
        courseSlug: "blockchain-technology",
        courseMediaURL: "https://res.cloudinary.com/placeholder/blockchain.pdf",
        mediaName: "Blockchain Technology",
      }],
    },
    {
      moduleCode: "CS3017",
      moduleTitle: "User Experience",
      week: 6,
      studio: 4,
      courseSlug: "ux-design-advanced",
      courseName: "Advanced User Experience Design",
      courseDescription: "Master advanced concepts in user experience design.",
      courseImage: "courses/ux-design.jpg",
      courseLevel: Level.Advanced,
      type: CourseType.Content,
      topics: ["user-experience-design"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w6s4-ux-design64",
        courseSlug: "ux-design-advanced",
        courseMediaURL: "https://res.cloudinary.com/placeholder/ux-design.pdf",
        mediaName: "Advanced User Experience Design",
      }],
    },
    {
      moduleCode: "CS3018",
      moduleTitle: "Ethical Hacking",
      week: 7,
      studio: 1,
      courseSlug: "ethical-hacking-advanced",
      courseName: "Ethical Hacking Techniques",
      courseDescription: "Learn advanced ethical hacking methodologies and security testing.",
      courseImage: "courses/ethical-hacking.jpg",
      courseLevel: Level.Advanced,
      type: CourseType.Content,
      topics: ["ethical-hacking"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w7s1-ethical-hacking542",
        courseSlug: "ethical-hacking-advanced",
        courseMediaURL: "https://res.cloudinary.com/placeholder/ethical-hacking.pdf",
        mediaName: "Ethical Hacking Techniques",
      }],
    },
    {
      moduleCode: "CS3019",
      moduleTitle: "Software Architecture",
      week: 7,
      studio: 2,
      courseSlug: "software-architecture-advanced",
      courseName: "Advanced Software Architecture",
      courseDescription: "Study advanced software architecture patterns and practices.",
      courseImage: "courses/software-architecture.jpg",
      courseLevel: Level.Advanced,
      type: CourseType.Content,
      topics: ["software-architecture"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w7s2-software-architecture753",
        courseSlug: "software-architecture-advanced",
        courseMediaURL: "https://res.cloudinary.com/placeholder/software-architecture.pdf",
        mediaName: "Advanced Software Architecture",
      }],
    },
    {
      moduleCode: "CS3020",
      moduleTitle: "Quantum Computing",
      week: 7,
      studio: 3,
      courseSlug: "quantum-computing-intro",
      courseName: "Introduction to Quantum Computing",
      courseDescription: "Explore fundamental concepts of quantum computing.",
      courseImage: "courses/quantum-computing.jpg",
      courseLevel: Level.Advanced,
      type: CourseType.Content,
      topics: ["quantum-computing"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w7s3-quantum-computing356",
        courseSlug: "quantum-computing-intro",
        courseMediaURL: "https://res.cloudinary.com/placeholder/quantum-computing.pdf",
        mediaName: "Introduction to Quantum Computing",
      }],
    },
    {
      moduleCode: "CS3021",
      moduleTitle: "Big Data Technologies",
      week: 7,
      studio: 4,
      courseSlug: "big-data-technologies",
      courseName: "Big Data Processing and Analytics",
      courseDescription: "Learn advanced big data processing techniques and technologies.",
      courseImage: "courses/big-data.jpg",
      courseLevel: Level.Intermediate,
      type: CourseType.Content,
      topics: ["big-data"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w7s4-big-data542",
        courseSlug: "big-data-technologies",
        courseMediaURL: "https://res.cloudinary.com/placeholder/big-data.pdf",
        mediaName: "Big Data Processing and Analytics",
      }],
    },
    {
      moduleCode: "CS4001",
      moduleTitle: "Full Stack Development",
      week: 8,
      studio: 1,
      courseSlug: "full-stack-development",
      courseName: "Modern Full Stack Development",
      courseDescription: "Comprehensive course covering web development, databases, and cloud deployment. Learn to build complete applications from frontend to backend.",
      courseImage: "courses/full-stack.jpg",
      courseLevel: Level.Advanced,
      type: CourseType.Content,
      topics: ["web-development", "database-systems", "cloud-computing", "software-engineering"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w8s1-full-stack63",
        courseSlug: "full-stack-development",
        courseMediaURL: "https://res.cloudinary.com/placeholder/full-stack.pdf",
        mediaName: "Modern Full Stack Development",
      }],
    },
    {
      moduleCode: "CS4002",
      moduleTitle: "AI and Machine Learning Systems",
      week: 8,
      studio: 2,
      courseSlug: "ai-ml-systems",
      courseName: "AI and ML Systems Design",
      courseDescription: "Learn to design and implement AI/ML systems, covering machine learning fundamentals, data processing, and deployment strategies.",
      courseImage: "courses/ai-ml-systems.jpg",
      courseLevel: Level.Advanced,
      type: CourseType.Content,
      topics: ["artificial-intelligence", "machine-learning", "big-data", "algorithms-optimization"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w8s2-ai-ml-systems563",
        courseSlug: "ai-ml-systems",
        courseMediaURL: "https://res.cloudinary.com/placeholder/ai-ml-systems.pdf",
        mediaName: "AI and ML Systems Design",
      }],
    },
    {
      moduleCode: "CS4003",
      moduleTitle: "Secure Software Engineering",
      week: 8,
      studio: 3,
      courseSlug: "secure-software-engineering",
      courseName: "Building Secure Software Systems",
      courseDescription: "Comprehensive approach to developing secure software, combining security principles with software engineering practices.",
      courseImage: "courses/secure-software.jpg",
      courseLevel: Level.Advanced,
      type: CourseType.Content,
      topics: ["cybersecurity", "software-engineering", "network-security", "software-testing"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w8s3-secure-software563",
        courseSlug: "secure-software-engineering",
        courseMediaURL: "https://res.cloudinary.com/placeholder/secure-software.pdf",
        mediaName: "Building Secure Software Systems",
      }],
    },
    {
      moduleCode: "CS4004",
      moduleTitle: "Cloud Native Architecture",
      week: 8,
      studio: 4,
      courseSlug: "cloud-native-architecture",
      courseName: "Cloud Native Applications",
      courseDescription: "Design and implement cloud-native applications using modern architectural patterns and DevOps practices.",
      courseImage: "courses/cloud-native.jpg",
      courseLevel: Level.Advanced,
      type: CourseType.Content,
      topics: ["cloud-computing", "devops", "distributed-systems", "software-architecture"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w8s4-cloud-native245",
        courseSlug: "cloud-native-architecture",
        courseMediaURL: "https://res.cloudinary.com/placeholder/cloud-native.pdf",
        mediaName: "Cloud Native Applications",
      }],
    },
    {
      moduleCode: "CS4005",
      moduleTitle: "Modern Mobile Development",
      week: 9,
      studio: 1,
      courseSlug: "modern-mobile-development",
      courseName: "Full Stack Mobile Development",
      courseDescription: "Build modern mobile applications with focus on UX design, backend integration, and cloud services.",
      courseImage: "courses/modern-mobile.jpg",
      courseLevel: Level.Advanced,
      type: CourseType.Content,
      topics: ["mobile-development", "user-experience-design", "cloud-computing", "software-engineering"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w9s1-modern-mobile642",
        courseSlug: "modern-mobile-development",
        courseMediaURL: "https://res.cloudinary.com/placeholder/modern-mobile.pdf",
        mediaName: "Full Stack Mobile Development",
      }],
    },
    {
      moduleCode: "CS4006",
      moduleTitle: "Data Engineering",
      week: 9,
      studio: 2,
      courseSlug: "data-engineering-systems",
      courseName: "Modern Data Engineering",
      courseDescription: "Design and implement data processing systems using advanced database concepts and big data technologies.",
      courseImage: "courses/data-engineering.jpg",
      courseLevel: Level.Advanced,
      type: CourseType.Content,
      topics: ["advanced-database-systems", "big-data", "data-analytics", "distributed-systems"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w9s2-data-engineering245",
        courseSlug: "data-engineering-systems",
        courseMediaURL: "https://res.cloudinary.com/placeholder/data-engineering.pdf",
        mediaName: "Modern Data Engineering",
      }],
    },
    {
      moduleCode: "CS4007",
      moduleTitle: "Advanced Software Design",
      week: 9,
      studio: 3,
      courseSlug: "advanced-software-design",
      courseName: "Advanced Software Design Patterns",
      courseDescription: "Master advanced software design using design patterns, clean architecture, and modern development practices.",
      courseImage: "courses/advanced-design.jpg",
      courseLevel: Level.Advanced,
      type: CourseType.Content,
      topics: ["design-patterns", "software-architecture", "object-oriented-programming", "software-engineering"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w9s3-advanced-design42",
        courseSlug: "advanced-software-design",
        courseMediaURL: "https://res.cloudinary.com/placeholder/advanced-design.pdf",
        mediaName: "Advanced Software Design Patterns",
      }],
    },
    {
      moduleCode: "CS4008",
      moduleTitle: "Blockchain and Distributed Systems",
      week: 9,
      studio: 4,
      courseSlug: "blockchain-distributed-systems",
      courseName: "Blockchain and Distributed Computing",
      courseDescription: "Study advanced distributed systems concepts with focus on blockchain technology and decentralized applications.",
      courseImage: "courses/blockchain-distributed.jpg",
      courseLevel: Level.Advanced,
      type: CourseType.Content,
      topics: ["blockchain", "distributed-systems", "algorithms", "network-security"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w9s4-blockchain-distributed642",
        courseSlug: "blockchain-distributed-systems",
        courseMediaURL: "https://res.cloudinary.com/placeholder/blockchain-distributed.pdf",
        mediaName: "Blockchain and Distributed Computing",
      }],
    },
    {
      moduleCode: "CS4009",
      moduleTitle: "DevSecOps",
      week: 10,
      studio: 1,
      courseSlug: "devsecops-practices",
      courseName: "Modern DevSecOps Practices",
      courseDescription: "Integrate security practices into DevOps workflows while maintaining development velocity and system reliability.",
      courseImage: "courses/devsecops.jpg",
      courseLevel: Level.Advanced,
      type: CourseType.Content,
      topics: ["devops", "cybersecurity", "software-testing", "network-security"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w10s1-devsecops64",
        courseSlug: "devsecops-practices",
        courseMediaURL: "https://res.cloudinary.com/placeholder/devsecops.pdf",
        mediaName: "Modern DevSecOps Practices",
      }],
    },
    {
      moduleCode: "CS4010",
      moduleTitle: "Quantum Computing and Algorithms",
      week: 10,
      studio: 2,
      courseSlug: "quantum-computing-algorithms",
      courseName: "Quantum Computing and Advanced Algorithms",
      courseDescription: "Explore quantum computing principles and their impact on algorithmic problem-solving and optimization.",
      courseImage: "courses/quantum-algorithms.jpg",
      courseLevel: Level.Advanced,
      type: CourseType.Content,
      topics: ["quantum-computing", "algorithms-optimization", "artificial-intelligence", "data-structures"],
      courseMedia: [{
        publicId: "neuracraft/course_slides_media/w10s2-quantum-algorithms25",
        courseSlug: "quantum-computing-algorithms",
        courseMediaURL: "https://res.cloudinary.com/placeholder/quantum-algorithms.pdf",
        mediaName: "Quantum Computing and Advanced Algorithms",
      }],
    },
  ]

export const Questions: {
  variationId: number;
  topicSlug: string;
  questionDifficulty: QuestionDifficulty;
  questionContent: string;
  questionData?: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue;
}[] = [
    {
      variationId: 1,
      topicSlug: "data-structures",
      questionContent:
        '<p>What is the Big O notation for an algorithm that performs a linear search in an array?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          {
            key: "mantine-qchybm2w9",
            answerContent: "O(n)",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-raaste6zq",
            answerContent: "O(1)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-0gvacclf1",
            answerContent: "O(n^2)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-naqloqvqx",
            answerContent: "O(log n)",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "data-structures",
      questionContent:
        '<p>Which of the following data structures is best suited for implementing a LIFO (Last In First Out) mechanism?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          {
            key: "mantine-qchybm2w9",
            answerContent: "Stack",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-raaste6zq",
            answerContent: "Queue",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-0gvacclf1",
            answerContent: "Array",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-naqloqvqx",
            answerContent: "Linked List",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "algorithms",
      questionContent:
        '<p>What is the average case time complexity of the QuickSort algorithm?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-qchybm2w9",
            answerContent: "O(n log n)",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-raaste6zq",
            answerContent: "O(n^2)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-0gvacclf1",
            answerContent: "O(n)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-naqloqvqx",
            answerContent: "O(log n)",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "object-oriented-programming",
      questionContent:
        '<p>In object-oriented programming, what does encapsulation refer to?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-qchybm2w9",
            answerContent: "Bundling data and methods that operate on that data within one unit",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-raaste6zq",
            answerContent: "Sharing code across different classes",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-0gvacclf1",
            answerContent: "Creating instances of classes",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-naqloqvqx",
            answerContent: "Modifying existing methods in subclasses",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "operating-systems",
      questionContent:
        '<p>What is the primary function of the ALU (Arithmetic Logic Unit) in a CPU?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-qchybm2w9",
            answerContent: "Perform arithmetic and logical operations",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-raaste6zq",
            answerContent: "Store data and instructions",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-0gvacclf1",
            answerContent: "Manage input and output operations",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-naqloqvqx",
            answerContent: "Control the flow of data",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "web-development",
      questionContent: '<p>Which HTML tag is used to create an unordered list?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          {
            key: "mantine-abc123",
            answerContent: "<ul>",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-def456",
            answerContent: "<ol>",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ghi789",
            answerContent: "<li>",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-jkl012",
            answerContent: "<dl>",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "algorithms",
      questionContent: '<p>What is the time complexity of quicksort in the average case?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-mno345",
            answerContent: "O(n log n)",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-pqr678",
            answerContent: "O(n²)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-stu901",
            answerContent: "O(n)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-vwx234",
            answerContent: "O(log n)",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "database-systems",
      questionContent: '<p>Which SQL command is used to modify existing records in a database?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          {
            key: "mantine-yz567",
            answerContent: "UPDATE",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-bcd890",
            answerContent: "MODIFY",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-efg123",
            answerContent: "CHANGE",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-hij456",
            answerContent: "ALTER",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "software-engineering",
      questionContent: '<p>What is the primary purpose of version control systems like Git?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-klm789",
            answerContent: "Track and manage changes to source code over time",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-nop012",
            answerContent: "Optimize code execution speed",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-qrs345",
            answerContent: "Debug application errors",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-tuv678",
            answerContent: "Compile source code into executable files",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "operating-systems",
      questionContent: '<p>Which scheduling algorithm gives the highest priority to the process with the shortest execution time?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-wxy901",
            answerContent: "Shortest Job First (SJF)",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-zab234",
            answerContent: "Round Robin",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-cde567",
            answerContent: "First Come First Served (FCFS)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-fgh890",
            answerContent: "Priority Scheduling",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "networking",
      questionContent: '<p>Which network protocol is used for secure web browsing?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          {
            key: "mantine-net001",
            answerContent: "HTTPS",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-net002",
            answerContent: "FTP",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-net003",
            answerContent: "SMTP",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-net004",
            answerContent: "TCP",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "machine-learning",
      questionContent: '<p>Which of the following is a supervised learning algorithm?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-ml001",
            answerContent: "Linear Regression",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-ml002",
            answerContent: "K-means Clustering",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ml003",
            answerContent: "Principal Component Analysis",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ml004",
            answerContent: "Autoencoders",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "cloud-computing",
      questionContent: '<p>Which service model provides users with virtual machines and storage?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          {
            key: "mantine-cloud001",
            answerContent: "Infrastructure as a Service (IaaS)",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-cloud002",
            answerContent: "Platform as a Service (PaaS)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-cloud003",
            answerContent: "Software as a Service (SaaS)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-cloud004",
            answerContent: "Function as a Service (FaaS)",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "cybersecurity",
      questionContent: '<p>What type of attack attempts to flood a network with traffic to make it unavailable?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-sec001",
            answerContent: "Denial of Service (DoS)",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-sec002",
            answerContent: "SQL Injection",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-sec003",
            answerContent: "Cross-Site Scripting",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-sec004",
            answerContent: "Man-in-the-Middle",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "mobile-development",
      questionContent: '<p>Which of the following is NOT a native mobile development platform?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          {
            key: "mantine-mob001",
            answerContent: "Electron",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-mob002",
            answerContent: "iOS",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-mob003",
            answerContent: "Android",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-mob004",
            answerContent: "Flutter",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "data-analytics",
      questionContent: '<p>Which visualization would be most appropriate for showing the distribution of a continuous variable?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-da001",
            answerContent: "Histogram",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-da002",
            answerContent: "Pie Chart",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-da003",
            answerContent: "Bar Chart",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-da004",
            answerContent: "Tree Map",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "software-testing",
      questionContent: '<p>Which testing approach verifies individual units or components of the software?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          {
            key: "mantine-test001",
            answerContent: "Unit Testing",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-test002",
            answerContent: "Integration Testing",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-test003",
            answerContent: "System Testing",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-test004",
            answerContent: "Acceptance Testing",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "devops",
      questionContent: '<p>Which DevOps practice involves automatically building and testing code changes?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-devops001",
            answerContent: "Continuous Integration",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-devops002",
            answerContent: "Infrastructure as Code",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-devops003",
            answerContent: "Configuration Management",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-devops004",
            answerContent: "Container Orchestration",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "design-patterns",
      questionContent: '<p>Which design pattern is used when you need a single instance of a class throughout the application?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-pattern001",
            answerContent: "Singleton",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-pattern002",
            answerContent: "Factory",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-pattern003",
            answerContent: "Observer",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-pattern004",
            answerContent: "Decorator",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "algorithms-optimization",
      questionContent: '<p>Which optimization technique reduces function calls by storing previously calculated results?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-opt001",
            answerContent: "Memoization",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-opt002",
            answerContent: "Loop Unrolling",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-opt003",
            answerContent: "Code Inlining",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-opt004",
            answerContent: "Dead Code Elimination",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "distributed-systems",
      questionContent: '<p>What is the CAP theorem trade-off that a distributed system cannot achieve simultaneously?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-dist001",
            answerContent: "Consistency, Availability, and Partition Tolerance",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-dist002",
            answerContent: "Complexity, Accessibility, and Performance",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-dist003",
            answerContent: "Concurrency, Atomicity, and Persistence",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-dist004",
            answerContent: "Cost, Availability, and Performance",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "artificial-intelligence",
      questionContent: '<p>Which AI search algorithm is guaranteed to find the optimal solution if one exists?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-ai001",
            answerContent: "A* Search",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-ai002",
            answerContent: "Depth-First Search",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ai003",
            answerContent: "Hill Climbing",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ai004",
            answerContent: "Beam Search",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "network-security",
      questionContent: '<p>Which network security device monitors and controls incoming and outgoing network traffic?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-netsec001",
            answerContent: "Firewall",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-netsec002",
            answerContent: "Router",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-netsec003",
            answerContent: "Switch",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-netsec004",
            answerContent: "Hub",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "algorithms",
      questionContent: '<p>Which sorting algorithm has the best average-case time complexity?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-abc123def",
            answerContent: "Quicksort - O(n log n)",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-def456ghi",
            answerContent: "Bubble Sort - O(n²)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ghi789jkl",
            answerContent: "Selection Sort - O(n²)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-jkl012mno",
            answerContent: "Insertion Sort - O(n²)",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "database-systems",
      questionContent: '<p>Which of the following is NOT a type of database index?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          {
            key: "mantine-pqr123stu",
            answerContent: "Recursive Index",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-stu456vwx",
            answerContent: "Bitmap Index",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-vwx789yz0",
            answerContent: "B-tree Index",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-yz0123abc",
            answerContent: "Hash Index",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "operating-systems",
      questionContent: '<p>What is the primary purpose of virtual memory in operating systems?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-def123ghi",
            answerContent: "To extend the available RAM by using disk space as additional memory",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-ghi456jkl",
            answerContent: "To speed up CPU processing",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-jkl789mno",
            answerContent: "To store temporary files",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-mno012pqr",
            answerContent: "To encrypt sensitive data",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "networking",
      questionContent: '<p>Which layer of the OSI model is responsible for routing and switching?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-stu123vwx",
            answerContent: "Network Layer",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-vwx456yz0",
            answerContent: "Transport Layer",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-yz0789abc",
            answerContent: "Data Link Layer",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-abc012def",
            answerContent: "Session Layer",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "software-engineering",
      questionContent: '<p>Which software development methodology emphasizes iterative development and frequent customer feedback?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          {
            key: "mantine-ghi123jkl",
            answerContent: "Agile",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-jkl456mno",
            answerContent: "Waterfall",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-mno789pqr",
            answerContent: "Big Bang",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-pqr012stu",
            answerContent: "V-Model",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "cybersecurity",
      questionContent: '<p>Which of the following is an example of a symmetric encryption algorithm?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-xyz123abc",
            answerContent: "AES (Advanced Encryption Standard)",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-abc456def",
            answerContent: "RSA",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-def789ghi",
            answerContent: "ECC (Elliptic Curve Cryptography)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ghi012jkl",
            answerContent: "Diffie-Hellman",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "machine-learning",
      questionContent: '<p>In machine learning, what is the purpose of the validation dataset?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-lmn123opq",
            answerContent: "To tune hyperparameters and prevent overfitting",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-opq456rst",
            answerContent: "To train the model's main parameters",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-rst789uvw",
            answerContent: "To make final performance evaluations",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-uvw012xyz",
            answerContent: "To preprocess the input features",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "web-development",
      questionContent: '<p>What is the purpose of the CORS (Cross-Origin Resource Sharing) policy in web development?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-hij123klm",
            answerContent: "To control which domains can access resources on a web server",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-klm456nop",
            answerContent: "To compress web resources for faster loading",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-nop789qrs",
            answerContent: "To cache web resources in the browser",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-qrs012tuv",
            answerContent: "To encrypt data between client and server",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "object-oriented-programming",
      questionContent: '<p>What is the principle of encapsulation in object-oriented programming?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-abc123xyz",
            answerContent: "Bundling data and methods that operate on that data within a single unit",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-def456uvw",
            answerContent: "Creating multiple instances of a class",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ghi789rst",
            answerContent: "Inheriting properties from parent classes",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-jkl012opq",
            answerContent: "Using multiple interfaces in a class",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "cloud-computing",
      questionContent: '<p>Which cloud service model provides users with virtual machines and storage?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          {
            key: "mantine-mno123lmn",
            answerContent: "Infrastructure as a Service (IaaS)",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-pqr456ijk",
            answerContent: "Platform as a Service (PaaS)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-stu789fgh",
            answerContent: "Software as a Service (SaaS)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-vwx012cde",
            answerContent: "Function as a Service (FaaS)",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "distributed-systems",
      questionContent: '<p>What is the CAP theorem in distributed systems?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-yzA123BCD",
            answerContent: "A distributed system can only guarantee two out of three: Consistency, Availability, and Partition tolerance",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-EFG456HIJ",
            answerContent: "A system must have all three: Consistency, Availability, and Partition tolerance",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-KLM789NOP",
            answerContent: "A system can have all three: Consistency, Availability, and Partition tolerance",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-QRS012TUV",
            answerContent: "A system must choose only one: Consistency, Availability, or Partition tolerance",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "artificial-intelligence",
      questionContent: '<p>Which search algorithm is guaranteed to find the optimal solution in a weighted graph?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-WXY123ZAB",
            answerContent: "A* (A-star) with admissible heuristic",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-CDE456FGH",
            answerContent: "Depth-First Search",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-IJK789LMN",
            answerContent: "Breadth-First Search",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-OPQ012RST",
            answerContent: "Hill Climbing",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "devops",
      questionContent: '<p>What is the main purpose of containerization in DevOps?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-UVW123XYZ",
            answerContent: "To ensure consistent application behavior across different environments",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-ABC456DEF",
            answerContent: "To increase storage capacity",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-GHI789JKL",
            answerContent: "To improve network speed",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-MNO012PQR",
            answerContent: "To reduce code complexity",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "blockchain",
      questionContent: '<p>What is the purpose of a consensus mechanism in blockchain?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-STU123VWX",
            answerContent: "To ensure all nodes agree on the state of the network",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-YZA456BCD",
            answerContent: "To encrypt blockchain transactions",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-EFG789HIJ",
            answerContent: "To store user credentials",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-KLM012NOP",
            answerContent: "To compress blockchain data",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "data-analytics",
      questionContent: '<p>Which statistical measure is most resistant to outliers?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-QRS123TUV",
            answerContent: "Median",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-WXY456ZAB",
            answerContent: "Mean",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-CDE789FGH",
            answerContent: "Range",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-IJK012LMN",
            answerContent: "Standard Deviation",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "software-testing",
      questionContent: '<p>What type of testing focuses on verifying individual components or units of source code?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          {
            key: "mantine-OPQ123RST",
            answerContent: "Unit Testing",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-UVW456XYZ",
            answerContent: "Integration Testing",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ABC789DEF",
            answerContent: "System Testing",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-GHI012JKL",
            answerContent: "Acceptance Testing",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "design-patterns",
      questionContent: '<p>Which design pattern ensures a class has only one instance and provides a global point of access to it?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-MNO123PQR",
            answerContent: "Singleton Pattern",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-STU456VWX",
            answerContent: "Factory Pattern",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-YZA789BCD",
            answerContent: "Observer Pattern",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-EFG012HIJ",
            answerContent: "Decorator Pattern",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "mobile-security",
      questionContent: '<p>Which of the following is the best practice for storing sensitive data in a mobile application?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-KLM123NOP",
            answerContent: "Using the platform's secure keychain/keystore system",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-QRS456TUV",
            answerContent: "Storing in shared preferences/user defaults",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-WXY789ZAB",
            answerContent: "Saving in a local SQLite database",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-CDE012FGH",
            answerContent: "Writing to a plain text file",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "data-structures",
      questionContent: '<p>In a binary tree, what is the maximum number of nodes at level n (assuming root is at level 0)?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-2n3m4p5q6",
            answerContent: "2^n",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-7r8t9u0v1",
            answerContent: "2^(n-1)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-2w3x4y5z6",
            answerContent: "n^2",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-7a8b9c0d1",
            answerContent: "n",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "algorithms",
      questionContent: '<p>What is the time complexity of the quicksort algorithm in the average case?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-3e4f5g6h7",
            answerContent: "O(n log n)",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8i9j0k1l2",
            answerContent: "O(n^2)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3m4n5p6q7",
            answerContent: "O(n)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8r9s0t1u2",
            answerContent: "O(log n)",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "database-systems",
      questionContent: '<p>Which normal form requires that all non-key attributes be fully functionally dependent on the primary key?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-3v4w5x6y7",
            answerContent: "Second Normal Form (2NF)",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8z9a0b1c2",
            answerContent: "First Normal Form (1NF)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3d4e5f6g7",
            answerContent: "Third Normal Form (3NF)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8h9i0j1k2",
            answerContent: "Boyce-Codd Normal Form (BCNF)",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "operating-systems",
      questionContent: '<p>What is the primary purpose of a page table in virtual memory management?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-3l4m5n6p7",
            answerContent: "To map virtual addresses to physical addresses",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8q9r0s1t2",
            answerContent: "To store process scheduling information",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3u4v5w6x7",
            answerContent: "To manage file system directories",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8y9z0a1b2",
            answerContent: "To handle interrupt requests",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "networking",
      questionContent: '<p>Which layer of the OSI model is responsible for routing and logical addressing?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-3c4d5e6f7",
            answerContent: "Network Layer",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8g9h0i1j2",
            answerContent: "Transport Layer",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3k4l5m6n7",
            answerContent: "Data Link Layer",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8p9q0r1s2",
            answerContent: "Session Layer",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "software-engineering",
      questionContent: '<p>Which software development methodology emphasizes iterative development with fixed-length iterations called "sprints"?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          {
            key: "mantine-3t4u5v6w7",
            answerContent: "Scrum",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8x9y0z1a2",
            answerContent: "Waterfall",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3b4c5d6e7",
            answerContent: "V-Model",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8f9g0h1i2",
            answerContent: "Big Bang",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "web-development",
      questionContent: '<p>What is the purpose of the CSS "z-index" property?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          {
            key: "mantine-3j4k5l6m7",
            answerContent: "Controls the stacking order of positioned elements",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8n9o0p1q2",
            answerContent: "Sets the element's width",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3r4s5t6u7",
            answerContent: "Controls the element's transparency",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8v9w0x1y2",
            answerContent: "Sets the element's position relative to its parent",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "machine-learning",
      questionContent: '<p>Which of the following is a common method to prevent overfitting in machine learning models?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-3z4a5b6c7",
            answerContent: "Regularization",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8d9e0f1g2",
            answerContent: "Increasing model complexity",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3h4i5j6k7",
            answerContent: "Using all available features",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8l9m0n1o2",
            answerContent: "Removing validation sets",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "cybersecurity",
      questionContent: '<p>What type of attack involves sending multiple simultaneous requests to overwhelm a server?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-3p4q5r6s7",
            answerContent: "Denial of Service (DoS)",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8t9u0v1w2",
            answerContent: "SQL Injection",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3x4y5z6a7",
            answerContent: "Cross-Site Scripting",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8b9c0d1e2",
            answerContent: "Man-in-the-Middle",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "object-oriented-programming",
      questionContent: '<p>Which OOP principle states that a class should have only one reason to change?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-3f4g5h6i7",
            answerContent: "Single Responsibility Principle",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8j9k0l1m2",
            answerContent: "Open/Closed Principle",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3n4o5p6q7",
            answerContent: "Liskov Substitution Principle",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8r9s0t1u2",
            answerContent: "Interface Segregation Principle",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "distributed-systems",
      questionContent: '<p>What is the CAP theorem in distributed systems?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-3v4w5x6y7",
            answerContent: "A system can only guarantee two out of three: Consistency, Availability, and Partition tolerance",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8z9a0b1c2",
            answerContent: "A system must guarantee all three: Consistency, Availability, and Partition tolerance",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3d4e5f6g7",
            answerContent: "A system can guarantee only one: either Consistency, Availability, or Partition tolerance",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8h9i0j1k2",
            answerContent: "A system cannot guarantee any of: Consistency, Availability, or Partition tolerance",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "design-patterns",
      questionContent: '<p>Which design pattern ensures a class has only one instance and provides a global point of access to it?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-3l4m5n6o7",
            answerContent: "Singleton Pattern",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8p9q0r1s2",
            answerContent: "Factory Pattern",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3t4u5v6w7",
            answerContent: "Observer Pattern",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8x9y0z1a2",
            answerContent: "Decorator Pattern",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "artificial-intelligence",
      questionContent: '<p>In artificial intelligence, what is the term for the ability of a system to learn and improve from experience without being explicitly programmed?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-3b4c5d6e7",
            answerContent: "Machine Learning",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8f9g0h1i2",
            answerContent: "Expert Systems",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3j4k5l6m7",
            answerContent: "Neural Networks",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8n9o0p1q2",
            answerContent: "Deep Learning",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "blockchain",
      questionContent: '<p>What is the primary purpose of mining in a blockchain network?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-3r4s5t6u7",
            answerContent: "To validate and add new transactions to the blockchain",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8v9w0x1y2",
            answerContent: "To create new cryptocurrencies",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3z4a5b6c7",
            answerContent: "To hack other users' wallets",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8d9e0f1g2",
            answerContent: "To store transaction data locally",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "devops",
      questionContent: '<p>What is the main purpose of continuous integration (CI) in DevOps?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-3h4i5j6k7",
            answerContent: "Automatically building and testing code changes",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8l9m0n1o2",
            answerContent: "Manual deployment of applications",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3p4q5r6s7",
            answerContent: "Writing documentation",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8t9u0v1w2",
            answerContent: "Managing customer support",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "cloud-computing",
      questionContent: '<p>Which cloud service model provides users with the ability to deploy and run applications without managing the underlying infrastructure?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-3x4y5z6a7",
            answerContent: "Platform as a Service (PaaS)",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8b9c0d1e2",
            answerContent: "Infrastructure as a Service (IaaS)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3f4g5h6i7",
            answerContent: "Software as a Service (SaaS)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8j9k0l1m2",
            answerContent: "Function as a Service (FaaS)",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "data-analytics",
      questionContent: '<p>Which statistical measure is most appropriate for identifying outliers in a dataset?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-3n4o5p6q7",
            answerContent: "Standard Deviation",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8r9s0t1u2",
            answerContent: "Mean",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3v4w5x6y7",
            answerContent: "Mode",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8z9a0b1c2",
            answerContent: "Median",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "software-testing",
      questionContent: '<p>What type of testing focuses on verifying individual components or units of source code?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          {
            key: "mantine-3d4e5f6g7",
            answerContent: "Unit Testing",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8h9i0j1k2",
            answerContent: "Integration Testing",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3l4m5n6o7",
            answerContent: "System Testing",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8p9q0r1s2",
            answerContent: "Acceptance Testing",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "mobile-development",
      questionContent: '<p>Which of the following is NOT a key component of the Android architecture?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-3t4u5v6w7",
            answerContent: "SpringBoot Runtime",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8x9y0z1a2",
            answerContent: "Linux Kernel",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3b4c5d6e7",
            answerContent: "Application Framework",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8f9g0h1i2",
            answerContent: "Android Runtime",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "network-security",
      questionContent: '<p>What is the purpose of a digital certificate in network security?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-3j4k5l6m7",
            answerContent: "To verify the identity of entities in a digital environment",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8n9o0p1q2",
            answerContent: "To encrypt network traffic",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3r4s5t6u7",
            answerContent: "To block malicious IP addresses",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8v9w0x1y2",
            answerContent: "To compress data packets",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "advanced-database-systems",
      questionContent: '<p>What is the primary advantage of using a NoSQL database over a traditional relational database?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-3z4a5b6c7",
            answerContent: "Better scalability and flexibility with unstructured data",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8d9e0f1g2",
            answerContent: "Stronger ACID compliance",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3h4i5j6k7",
            answerContent: "Better support for complex JOIN operations",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8l9m0n1o2",
            answerContent: "Enhanced data integrity constraints",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "algorithms-optimization",
      questionContent: '<p>Which optimization technique involves solving a problem by breaking it down into smaller subproblems and storing the results for future use?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-3p4q5r6s7",
            answerContent: "Dynamic Programming",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8t9u0v1w2",
            answerContent: "Greedy Algorithm",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3x4y5z6a7",
            answerContent: "Linear Programming",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8b9c0d1e2",
            answerContent: "Branch and Bound",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "user-experience-design",
      questionContent: '<p>What is the purpose of creating user personas in UX design?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-3f4g5h6i7",
            answerContent: "To represent different types of users and their needs",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8j9k0l1m2",
            answerContent: "To design the visual elements of the interface",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3n4o5p6q7",
            answerContent: "To write the application's code",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8r9s0t1u2",
            answerContent: "To test the website's performance",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "big-data",
      questionContent: '<p>Which of the following is a key characteristic of Big Data that refers to the speed at which data is generated and processed?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-3v4w5x6y7",
            answerContent: "Velocity",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8z9a0b1c2",
            answerContent: "Volume",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3d4e5f6g7",
            answerContent: "Variety",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8h9i0j1k2",
            answerContent: "Veracity",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "quantum-computing",
      questionContent: '<p>What is a qubit in quantum computing?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-3l4m5n6o7",
            answerContent: "A quantum bit that can exist in multiple states simultaneously",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8p9q0r1s2",
            answerContent: "A classical binary bit",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3t4u5v6w7",
            answerContent: "A unit of quantum storage",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8x9y0z1a2",
            answerContent: "A quantum encryption key",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "mobile-security",
      questionContent: '<p>Which of the following is a key practice for securing mobile applications against data leakage?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-3b4c5d6e7",
            answerContent: "Implementing proper data encryption at rest and in transit",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8f9g0h1i2",
            answerContent: "Storing sensitive data in shared preferences",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3j4k5l6m7",
            answerContent: "Using plain text logging for debugging",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8n9o0p1q2",
            answerContent: "Disabling app permissions",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "ethical-hacking",
      questionContent: '<p>What is the primary purpose of penetration testing in cybersecurity?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-3r4s5t6u7",
            answerContent: "To identify and fix security vulnerabilities before malicious hackers can exploit them",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8v9w0x1y2",
            answerContent: "To develop new malware",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3z4a5b6c7",
            answerContent: "To slow down network traffic",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8d9e0f1g2",
            answerContent: "To encrypt all system files",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "software-architecture",
      questionContent: '<p>What architectural pattern is best suited for applications requiring loose coupling between components and asynchronous communication?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-3h4i5j6k7",
            answerContent: "Event-Driven Architecture",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8l9m0n1o2",
            answerContent: "Monolithic Architecture",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3p4q5r6s7",
            answerContent: "Pipeline Architecture",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8t9u0v1w2",
            answerContent: "Layered Architecture",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "data-structures",
      questionContent: '<p>What is the time complexity of searching for an element in a balanced Binary Search Tree?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-3x4y5z6a7",
            answerContent: "O(log n)",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8b9c0d1e2",
            answerContent: "O(n)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3f4g5h6i7",
            answerContent: "O(1)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8j9k0l1m2",
            answerContent: "O(n^2)",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "algorithms",
      questionContent: '<p>Which sorting algorithm is guaranteed to have the same time complexity in best, average, and worst cases?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-3n4o5p6q7",
            answerContent: "Merge Sort",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8r9s0t1u2",
            answerContent: "Quick Sort",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3v4w5x6y7",
            answerContent: "Bubble Sort",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8z9a0b1c2",
            answerContent: "Insertion Sort",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "web-development",
      questionContent: '<p>What is the purpose of the Cross-Origin Resource Sharing (CORS) policy in web development?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-3d4e5f6g7",
            answerContent: "To control which domains can access resources on a web server",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8h9i0j1k2",
            answerContent: "To compress HTTP responses",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3l4m5n6o7",
            answerContent: "To cache website content",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8p9q0r1s2",
            answerContent: "To validate HTML markup",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "operating-systems",
      questionContent: '<p>What is the primary purpose of the Process Control Block (PCB) in operating systems?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-3t4u5v6w7",
            answerContent: "To store all the information needed to manage a process",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8x9y0z1a2",
            answerContent: "To control hardware devices",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3b4c5d6e7",
            answerContent: "To manage file systems",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8f9g0h1i2",
            answerContent: "To handle network connections",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "database-systems",
      questionContent: '<p>What is the purpose of an index in a database management system?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-3j4k5l6m7",
            answerContent: "To improve the speed of data retrieval operations",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8n9o0p1q2",
            answerContent: "To store backup copies of data",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3r4s5t6u7",
            answerContent: "To encrypt sensitive data",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8v9w0x1y2",
            answerContent: "To validate data integrity",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "networking",
      questionContent: '<p>What is the purpose of the Address Resolution Protocol (ARP) in networking?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-3z4a5b6c7",
            answerContent: "To map IP addresses to MAC addresses",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8d9e0f1g2",
            answerContent: "To assign IP addresses dynamically",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3h4i5j6k7",
            answerContent: "To encrypt network traffic",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8l9m0n1o2",
            answerContent: "To route packets between networks",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "machine-learning",
      questionContent: '<p>What is the purpose of the activation function in neural networks?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-3p4q5r6s7",
            answerContent: "To introduce non-linearity into the network's output",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8t9u0v1w2",
            answerContent: "To initialize network weights",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3x4y5z6a7",
            answerContent: "To store training data",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8b9c0d1e2",
            answerContent: "To calculate the network's loss",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "cybersecurity",
      questionContent: '<p>What is the purpose of salting in password hashing?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-3f4g5h6i7",
            answerContent: "To prevent rainbow table attacks",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8j9k0l1m2",
            answerContent: "To encrypt the password",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3n4o5p6q7",
            answerContent: "To compress the password",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8r9s0t1u2",
            answerContent: "To validate the password length",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "devops",
      questionContent: '<p>What is the primary benefit of containerization in DevOps?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-3v4w5x6y7",
            answerContent: "Ensuring consistent application behavior across different environments",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-8z9a0b1c2",
            answerContent: "Reducing code complexity",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-3d4e5f6g7",
            answerContent: "Improving network security",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-8h9i0j1k2",
            answerContent: "Automating code writing",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "data-structures",
      questionContent:
        '<p>Which data structure is best suited for implementing a LIFO (Last In First Out) operation?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          { key: "mantine-1", answerContent: "Stack", isCorrect: true, isLatex: false },
          { key: "mantine-2", answerContent: "Queue", isCorrect: false, isLatex: false },
          { key: "mantine-3", answerContent: "Array", isCorrect: false, isLatex: false },
          { key: "mantine-4", answerContent: "Linked List", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "algorithms",
      questionContent:
        '<p>What is the best-case time complexity for the QuickSort algorithm?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          { key: "mantine-5", answerContent: "O(n log n)", isCorrect: true, isLatex: false },
          { key: "mantine-6", answerContent: "O(n^2)", isCorrect: false, isLatex: false },
          { key: "mantine-7", answerContent: "O(log n)", isCorrect: false, isLatex: false },
          { key: "mantine-8", answerContent: "O(n)", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "operating-systems",
      questionContent:
        '<p>Which of the following is a key feature of a multi-tasking operating system?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          { key: "mantine-9", answerContent: "Ability to execute multiple processes simultaneously", isCorrect: true, isLatex: false },
          { key: "mantine-10", answerContent: "Executing a single process at a time", isCorrect: false, isLatex: false },
          { key: "mantine-11", answerContent: "Restricted access to memory", isCorrect: false, isLatex: false },
          { key: "mantine-12", answerContent: "None of the above", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "networking",
      questionContent:
        '<p>What is the primary purpose of the TCP protocol in computer networking?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          { key: "mantine-13", answerContent: "To provide reliable data transmission", isCorrect: true, isLatex: false },
          { key: "mantine-14", answerContent: "To assign IP addresses to devices", isCorrect: false, isLatex: false },
          { key: "mantine-15", answerContent: "To define hardware communication standards", isCorrect: false, isLatex: false },
          { key: "mantine-16", answerContent: "To encrypt transmitted data", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "database-systems",
      questionContent:
        '<p>Which of the following SQL commands is used to retrieve data from a database?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          { key: "mantine-17", answerContent: "SELECT", isCorrect: true, isLatex: false },
          { key: "mantine-18", answerContent: "INSERT", isCorrect: false, isLatex: false },
          { key: "mantine-19", answerContent: "UPDATE", isCorrect: false, isLatex: false },
          { key: "mantine-20", answerContent: "DELETE", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "machine-learning",
      questionContent:
        '<p>What is the process of reducing the dimensions of a dataset while preserving important information called?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          { key: "mantine-21", answerContent: "Dimensionality Reduction", isCorrect: true, isLatex: false },
          { key: "mantine-22", answerContent: "Gradient Descent", isCorrect: false, isLatex: false },
          { key: "mantine-23", answerContent: "Feature Selection", isCorrect: false, isLatex: false },
          { key: "mantine-24", answerContent: "Hyperparameter Tuning", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "cybersecurity",
      questionContent:
        '<p>What is the main purpose of a firewall in a cybersecurity system?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          { key: "mantine-25", answerContent: "To filter network traffic", isCorrect: true, isLatex: false },
          { key: "mantine-26", answerContent: "To encrypt sensitive data", isCorrect: false, isLatex: false },
          { key: "mantine-27", answerContent: "To provide antivirus protection", isCorrect: false, isLatex: false },
          { key: "mantine-28", answerContent: "To monitor user activity", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "software-engineering",
      questionContent:
        '<p>Which of the following is a core principle of Agile methodology?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          { key: "mantine-29", answerContent: "Customer collaboration over contract negotiation", isCorrect: true, isLatex: false },
          { key: "mantine-30", answerContent: "Following a fixed, pre-defined plan", isCorrect: false, isLatex: false },
          { key: "mantine-31", answerContent: "Minimal interaction with stakeholders", isCorrect: false, isLatex: false },
          { key: "mantine-32", answerContent: "Prioritizing process documentation", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      variationId: 2,
      topicSlug: "data-structures",
      questionContent:
        '<p>Which traversal technique visits the nodes of a binary tree in the order: left subtree, root, right subtree?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          { key: "mantine-33", answerContent: "Inorder", isCorrect: true, isLatex: false },
          { key: "mantine-34", answerContent: "Preorder", isCorrect: false, isLatex: false },
          { key: "mantine-35", answerContent: "Postorder", isCorrect: false, isLatex: false },
          { key: "mantine-36", answerContent: "Level-order", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      variationId: 2,
      topicSlug: "algorithms",
      questionContent:
        '<p>What type of problem is Dijkstra’s algorithm used to solve?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          { key: "mantine-37", answerContent: "Shortest path in a graph", isCorrect: true, isLatex: false },
          { key: "mantine-38", answerContent: "Sorting elements", isCorrect: false, isLatex: false },
          { key: "mantine-39", answerContent: "Finding minimum spanning tree", isCorrect: false, isLatex: false },
          { key: "mantine-40", answerContent: "Detecting cycles in a graph", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      variationId: 2,
      topicSlug: "operating-systems",
      questionContent:
        '<p>What is a "page fault" in the context of an operating system?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          { key: "mantine-41", answerContent: "An event where a program accesses a page not in memory", isCorrect: true, isLatex: false },
          { key: "mantine-42", answerContent: "An error caused by a corrupt file system", isCorrect: false, isLatex: false },
          { key: "mantine-43", answerContent: "A crash due to insufficient disk space", isCorrect: false, isLatex: false },
          { key: "mantine-44", answerContent: "A segmentation fault caused by invalid memory access", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      variationId: 2,
      topicSlug: "networking",
      questionContent:
        '<p>Which field in an IPv4 header specifies the maximum number of hops a packet can take?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          { key: "mantine-45", answerContent: "Time to Live (TTL)", isCorrect: true, isLatex: false },
          { key: "mantine-46", answerContent: "Checksum", isCorrect: false, isLatex: false },
          { key: "mantine-47", answerContent: "Protocol", isCorrect: false, isLatex: false },
          { key: "mantine-48", answerContent: "Flags", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      variationId: 2,
      topicSlug: "database-systems",
      questionContent:
        '<p>What is the purpose of database normalization?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          { key: "mantine-49", answerContent: "To reduce redundancy and improve data integrity", isCorrect: true, isLatex: false },
          { key: "mantine-50", answerContent: "To increase query execution speed", isCorrect: false, isLatex: false },
          { key: "mantine-51", answerContent: "To add indexes for faster lookup", isCorrect: false, isLatex: false },
          { key: "mantine-52", answerContent: "To ensure unique primary keys", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      variationId: 2,
      topicSlug: "machine-learning",
      questionContent:
        '<p>What does the "bias-variance tradeoff" describe in machine learning?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          { key: "mantine-53", answerContent: "The tradeoff between model simplicity and accuracy", isCorrect: true, isLatex: false },
          { key: "mantine-54", answerContent: "The tradeoff between data quantity and quality", isCorrect: false, isLatex: false },
          { key: "mantine-55", answerContent: "The balance between training time and inference speed", isCorrect: false, isLatex: false },
          { key: "mantine-56", answerContent: "The optimization of hyperparameters", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      variationId: 2,
      topicSlug: "cybersecurity",
      questionContent:
        '<p>Which of the following best describes a phishing attack?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          { key: "mantine-57", answerContent: "An attempt to steal sensitive information by pretending to be a trusted entity", isCorrect: true, isLatex: false },
          { key: "mantine-58", answerContent: "A brute force attack on passwords", isCorrect: false, isLatex: false },
          { key: "mantine-59", answerContent: "An attack that crashes a system using excessive traffic", isCorrect: false, isLatex: false },
          { key: "mantine-60", answerContent: "The use of malware to encrypt files for ransom", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      variationId: 2,
      topicSlug: "software-engineering",
      questionContent:
        '<p>In software development, what does the term "CI/CD" stand for?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          { key: "mantine-61", answerContent: "Continuous Integration / Continuous Delivery", isCorrect: true, isLatex: false },
          { key: "mantine-62", answerContent: "Code Inspection / Code Debugging", isCorrect: false, isLatex: false },
          { key: "mantine-63", answerContent: "Continuous Improvement / Continuous Deployment", isCorrect: false, isLatex: false },
          { key: "mantine-64", answerContent: "Code Integration / Code Deployment", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      variationId: 2,
      topicSlug: "data-structures",
      questionContent:
        '<p>What is a common technique to handle collisions in a hash table?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          { key: "mantine-65", answerContent: "Chaining", isCorrect: true, isLatex: false },
          { key: "mantine-66", answerContent: "Binary Search", isCorrect: false, isLatex: false },
          { key: "mantine-67", answerContent: "Tree Traversal", isCorrect: false, isLatex: false },
          { key: "mantine-68", answerContent: "Heap Sort", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      variationId: 3,
      topicSlug: "programming-languages",
      questionContent:
        '<p>What does "hoisting" refer to in JavaScript?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          { key: "mantine-69", answerContent: "Variable and function declarations are moved to the top of their scope", isCorrect: true, isLatex: false },
          { key: "mantine-70", answerContent: "Variables are automatically initialized to `null`", isCorrect: false, isLatex: false },
          { key: "mantine-71", answerContent: "Functions can be called before being declared", isCorrect: false, isLatex: false },
          { key: "mantine-72", answerContent: "Objects inherit properties from their prototype", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      variationId: 3,
      topicSlug: "data-science",
      questionContent:
        '<p>Which of the following metrics is commonly used to evaluate a linear regression model?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          { key: "mantine-73", answerContent: "Mean Squared Error (MSE)", isCorrect: true, isLatex: false },
          { key: "mantine-74", answerContent: "F1 Score", isCorrect: false, isLatex: false },
          { key: "mantine-75", answerContent: "Confusion Matrix", isCorrect: false, isLatex: false },
          { key: "mantine-76", answerContent: "Precision-Recall Curve", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      variationId: 3,
      topicSlug: "cloud-computing",
      questionContent:
        '<p>What does "SaaS" stand for in cloud computing?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          { key: "mantine-77", answerContent: "Software as a Service", isCorrect: true, isLatex: false },
          { key: "mantine-78", answerContent: "Storage as a Service", isCorrect: false, isLatex: false },
          { key: "mantine-79", answerContent: "System as a Service", isCorrect: false, isLatex: false },
          { key: "mantine-80", answerContent: "Security as a Service", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      variationId: 3,
      topicSlug: "cybersecurity",
      questionContent:
        '<p>What is a defining characteristic of symmetric encryption?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          { key: "mantine-81", answerContent: "The same key is used for both encryption and decryption", isCorrect: true, isLatex: false },
          { key: "mantine-82", answerContent: "Different keys are used for encryption and decryption", isCorrect: false, isLatex: false },
          { key: "mantine-83", answerContent: "No keys are used for encryption", isCorrect: false, isLatex: false },
          { key: "mantine-84", answerContent: "It requires biometric authentication", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      variationId: 3,
      topicSlug: "operating-systems",
      questionContent:
        '<p>What is the main purpose of virtual memory in an operating system?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          { key: "mantine-85", answerContent: "To provide the illusion of a larger memory space than physically available", isCorrect: true, isLatex: false },
          { key: "mantine-86", answerContent: "To permanently store frequently used files", isCorrect: false, isLatex: false },
          { key: "mantine-87", answerContent: "To optimize CPU scheduling", isCorrect: false, isLatex: false },
          { key: "mantine-88", answerContent: "To allocate disk space dynamically", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      variationId: 3,
      topicSlug: "machine-learning",
      questionContent:
        '<p>Which of the following techniques is commonly used to prevent overfitting in machine learning models?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          { key: "mantine-89", answerContent: "Regularization", isCorrect: true, isLatex: false },
          { key: "mantine-90", answerContent: "Feature scaling", isCorrect: false, isLatex: false },
          { key: "mantine-91", answerContent: "Gradient descent", isCorrect: false, isLatex: false },
          { key: "mantine-92", answerContent: "Dimensionality reduction", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      variationId: 3,
      topicSlug: "software-engineering",
      questionContent:
        '<p>Which of the following best describes the Agile methodology?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          { key: "mantine-93", answerContent: "An iterative and incremental approach to software development", isCorrect: true, isLatex: false },
          { key: "mantine-94", answerContent: "A sequential model of software development", isCorrect: false, isLatex: false },
          { key: "mantine-95", answerContent: "A security-focused approach to software testing", isCorrect: false, isLatex: false },
          { key: "mantine-96", answerContent: "A system that uses only automated tools for deployment", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      variationId: 3,
      topicSlug: "networking",
      questionContent:
        '<p>How many steps are involved in the TCP handshake process?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          { key: "mantine-97", answerContent: "3", isCorrect: true, isLatex: false },
          { key: "mantine-98", answerContent: "2", isCorrect: false, isLatex: false },
          { key: "mantine-99", answerContent: "4", isCorrect: false, isLatex: false },
          { key: "mantine-100", answerContent: "5", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      variationId: 4,
      topicSlug: "web-development",
      questionContent:
        '<p>Which JavaScript method is used to add an element to the DOM?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          { key: "mantine-101", answerContent: "appendChild()", isCorrect: true, isLatex: false },
          { key: "mantine-102", answerContent: "addEventListener()", isCorrect: false, isLatex: false },
          { key: "mantine-103", answerContent: "createElement()", isCorrect: false, isLatex: false },
          { key: "mantine-104", answerContent: "querySelector()", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      variationId: 4,
      topicSlug: "algorithms",
      questionContent:
        '<p>What is the time complexity of the binary search algorithm?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          { key: "mantine-105", answerContent: "O(log n)", isCorrect: true, isLatex: true },
          { key: "mantine-106", answerContent: "O(n)", isCorrect: false, isLatex: true },
          { key: "mantine-107", answerContent: "O(n^2)", isCorrect: false, isLatex: true },
          { key: "mantine-108", answerContent: "O(1)", isCorrect: false, isLatex: true },
        ],
      },
    },
    {
      variationId: 4,
      topicSlug: "databases",
      questionContent:
        '<p>What is the primary goal of database normalization?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          { key: "mantine-109", answerContent: "To reduce data redundancy", isCorrect: true, isLatex: false },
          { key: "mantine-110", answerContent: "To increase data duplication", isCorrect: false, isLatex: false },
          { key: "mantine-111", answerContent: "To create database indexes", isCorrect: false, isLatex: false },
          { key: "mantine-112", answerContent: "To improve query syntax", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      variationId: 4,
      topicSlug: "ai-ml",
      questionContent:
        '<p>Which of the following is an example of supervised learning?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          { key: "mantine-113", answerContent: "Predicting house prices based on historical data", isCorrect: true, isLatex: false },
          { key: "mantine-114", answerContent: "Clustering similar customer profiles", isCorrect: false, isLatex: false },
          { key: "mantine-115", answerContent: "Identifying anomalies in a dataset", isCorrect: false, isLatex: false },
          { key: "mantine-116", answerContent: "Generating text based on a prompt", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      variationId: 4,
      topicSlug: "operating-systems",
      questionContent:
        '<p>What is the key difference between a thread and a process?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          { key: "mantine-117", answerContent: "Threads share memory within a process, while processes have separate memory", isCorrect: true, isLatex: false },
          { key: "mantine-118", answerContent: "Threads are larger than processes", isCorrect: false, isLatex: false },
          { key: "mantine-119", answerContent: "Threads run independently of each other", isCorrect: false, isLatex: false },
          { key: "mantine-120", answerContent: "Processes can only have one thread", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      variationId: 4,
      topicSlug: "networking",
      questionContent:
        '<p>What does a subnet mask do in a network?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          { key: "mantine-121", answerContent: "Defines the network and host portions of an IP address", isCorrect: true, isLatex: false },
          { key: "mantine-122", answerContent: "Assigns IP addresses to devices", isCorrect: false, isLatex: false },
          { key: "mantine-123", answerContent: "Encrypts data for secure transmission", isCorrect: false, isLatex: false },
          { key: "mantine-124", answerContent: "Monitors traffic on a network", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      variationId: 4,
      topicSlug: "software-engineering",
      questionContent:
        '<p>Which design pattern ensures a class has only one instance and provides a global point of access to it?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          { key: "mantine-125", answerContent: "Singleton", isCorrect: true, isLatex: false },
          { key: "mantine-126", answerContent: "Factory", isCorrect: false, isLatex: false },
          { key: "mantine-127", answerContent: "Observer", isCorrect: false, isLatex: false },
          { key: "mantine-128", answerContent: "Decorator", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      variationId: 4,
      topicSlug: "data-structures",
      questionContent:
        '<p>Which property does a binary max heap satisfy?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          { key: "mantine-129", answerContent: "The value of each node is greater than or equal to its children", isCorrect: true, isLatex: false },
          { key: "mantine-130", answerContent: "The value of each node is less than or equal to its children", isCorrect: false, isLatex: false },
          { key: "mantine-131", answerContent: "All leaf nodes have the same value", isCorrect: false, isLatex: false },
          { key: "mantine-132", answerContent: "The tree is always perfectly balanced", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "algorithms",
      questionContent: "<p>What is the time complexity of QuickSort in the average case?</p>",
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-alg1-a",
            answerContent: "O(n log n)",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-alg1-b",
            answerContent: "O(n^2)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-alg1-c",
            answerContent: "O(n)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-alg1-d",
            answerContent: "O(log n)",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "operating-systems",
      questionContent: "<p>Which of the following is NOT a responsibility of an operating system?</p>",
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          {
            key: "mantine-os1-a",
            answerContent: "Writing application software",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-os1-b",
            answerContent: "Memory management",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-os1-c",
            answerContent: "Process scheduling",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-os1-d",
            answerContent: "File system management",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "database-systems",
      questionContent: "<p>Which normal form requires that all non-key attributes be fully functionally dependent on the primary key?</p>",
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-db1-a",
            answerContent: "Second Normal Form (2NF)",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-db1-b",
            answerContent: "First Normal Form (1NF)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-db1-c",
            answerContent: "Third Normal Form (3NF)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-db1-d",
            answerContent: "Boyce-Codd Normal Form (BCNF)",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "networking",
      questionContent: "<p>What is the main purpose of the TCP three-way handshake?</p>",
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-net1-a",
            answerContent: "To establish a synchronized connection between client and server",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-net1-b",
            answerContent: "To encrypt the data transmission",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-net1-c",
            answerContent: "To compress the data being sent",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-net1-d",
            answerContent: "To authenticate the user credentials",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "distributed-systems",
      questionContent: "<p>In the context of distributed systems, what is the CAP theorem?</p>",
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-ds1-a",
            answerContent: "It states that a distributed system cannot simultaneously provide Consistency, Availability, and Partition tolerance",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-ds1-b",
            answerContent: "It defines the maximum number of nodes in a distributed system",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ds1-c",
            answerContent: "It describes the encryption standards for distributed systems",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ds1-d",
            answerContent: "It outlines the backup procedures for distributed databases",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "data-structures",
      questionContent: "<p>What is the space complexity of storing a complete binary tree with n nodes?</p>",
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-ds-trees-a",
            answerContent: "O(n)",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-ds-trees-b",
            answerContent: "O(log n)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ds-trees-c",
            answerContent: "O(n^2)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ds-trees-d",
            answerContent: "O(n log n)",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "software-engineering",
      questionContent: "<p>Which SOLID principle states that 'A class should have only one reason to change'?</p>",
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          {
            key: "mantine-se-solid-a",
            answerContent: "Single Responsibility Principle",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-se-solid-b",
            answerContent: "Open-Closed Principle",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-se-solid-c",
            answerContent: "Liskov Substitution Principle",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-se-solid-d",
            answerContent: "Interface Segregation Principle",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "machine-learning",
      questionContent: "<p>Which of the following is NOT a type of supervised learning algorithm?</p>",
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-ml-sup-a",
            answerContent: "K-means clustering",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-ml-sup-b",
            answerContent: "Linear Regression",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ml-sup-c",
            answerContent: "Decision Trees",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ml-sup-d",
            answerContent: "Support Vector Machines",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "cybersecurity",
      questionContent: "<p>Which encryption type uses the same key for encryption and decryption?</p>",
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          {
            key: "mantine-cyber-enc-a",
            answerContent: "Symmetric encryption",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-cyber-enc-b",
            answerContent: "Asymmetric encryption",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-cyber-enc-c",
            answerContent: "Hash functions",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-cyber-enc-d",
            answerContent: "Digital signatures",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "web-development",
      questionContent: "<p>Which HTTP method should be used for a request that updates an existing resource?</p>",
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          {
            key: "mantine-web-rest-a",
            answerContent: "PUT",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-web-rest-b",
            answerContent: "GET",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-web-rest-c",
            answerContent: "POST",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-web-rest-d",
            answerContent: "DELETE",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "devops",
      questionContent: "<p>What is the main purpose of Continuous Integration (CI)?</p>",
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-devops-ci-a",
            answerContent: "To automatically integrate code changes and detect integration problems early",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-devops-ci-b",
            answerContent: "To deploy code to production automatically",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-devops-ci-c",
            answerContent: "To monitor application performance in production",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-devops-ci-d",
            answerContent: "To manage database migrations",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "artificial-intelligence",
      questionContent: "<p>Which activation function is commonly used in the output layer of a neural network for binary classification?</p>",
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-ai-nn-a",
            answerContent: "Sigmoid",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-ai-nn-b",
            answerContent: "ReLU",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ai-nn-c",
            answerContent: "Tanh",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ai-nn-d",
            answerContent: "Softmax",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "blockchain",
      questionContent: "<p>Which consensus mechanism is used by Bitcoin?</p>",
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-block-cons-a",
            answerContent: "Proof of Work",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-block-cons-b",
            answerContent: "Proof of Stake",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-block-cons-c",
            answerContent: "Delegated Proof of Stake",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-block-cons-d",
            answerContent: "Proof of Authority",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "data-structures",
      questionContent: '<p>What is the space complexity of storing a binary tree with n nodes?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          {
            key: "mantine-ds1a",
            answerContent: "O(n)",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-ds1b",
            answerContent: "O(log n)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ds1c",
            answerContent: "O(n^2)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ds1d",
            answerContent: "O(1)",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "algorithms",
      questionContent: '<p>Which sorting algorithm has the best average-case time complexity?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-alg1a",
            answerContent: "Merge Sort",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-alg1b",
            answerContent: "Quick Sort",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-alg1c",
            answerContent: "Bubble Sort",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-alg1d",
            answerContent: "Selection Sort",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "operating-systems",
      questionContent: '<p>Which of the following is NOT a solution to the critical section problem?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-os1a",
            answerContent: "Peterson's Solution",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-os1b",
            answerContent: "Semaphores",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-os1c",
            answerContent: "Round-Robin Scheduling",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-os1d",
            answerContent: "Mutex Locks",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "networking",
      questionContent: '<p>Which layer of the OSI model is responsible for routing and switching?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-net1a",
            answerContent: "Transport Layer",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-net1b",
            answerContent: "Network Layer",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-net1c",
            answerContent: "Data Link Layer",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-net1d",
            answerContent: "Application Layer",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "database-systems",
      questionContent: '<p>Which normal form eliminates transitive dependencies in a database relation?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-db1a",
            answerContent: "First Normal Form (1NF)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-db1b",
            answerContent: "Second Normal Form (2NF)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-db1c",
            answerContent: "Third Normal Form (3NF)",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-db1d",
            answerContent: "Boyce-Codd Normal Form (BCNF)",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "data-structures",
      questionContent: '<p>What is the average time complexity for insertion in a hash table?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-hash1a",
            answerContent: "O(1)",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-hash1b",
            answerContent: "O(n)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-hash1c",
            answerContent: "O(log n)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-hash1d",
            answerContent: "O(n^2)",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "algorithms",
      questionContent: '<p>Which problem can be efficiently solved using dynamic programming?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-dp1a",
            answerContent: "Finding the shortest path in an unweighted graph",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-dp1b",
            answerContent: "Longest Common Subsequence",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-dp1c",
            answerContent: "Finding a prime number",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-dp1d",
            answerContent: "Binary search in a sorted array",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "operating-systems",
      questionContent: '<p>Which of the following is NOT one of the four necessary conditions for deadlock?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-dead1a",
            answerContent: "Mutual Exclusion",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-dead1b",
            answerContent: "Hold and Wait",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-dead1c",
            answerContent: "Priority Inheritance",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-dead1d",
            answerContent: "Circular Wait",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "database-systems",
      questionContent: '<p>Which ACID property ensures that a transaction takes the database from one consistent state to another?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-acid1a",
            answerContent: "Atomicity",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-acid1b",
            answerContent: "Consistency",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-acid1c",
            answerContent: "Isolation",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-acid1d",
            answerContent: "Durability",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "web-development",
      questionContent: '<p>What is the purpose of the Access-Control-Allow-Origin header in CORS?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-cors1a",
            answerContent: "To specify which domains can access the resource",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-cors1b",
            answerContent: "To specify which HTTP methods are allowed",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-cors1c",
            answerContent: "To specify which headers can be used",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-cors1d",
            answerContent: "To specify the maximum age of the preflight request",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "machine-learning",
      questionContent: '<p>Which technique is NOT commonly used to prevent overfitting in machine learning models?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-ml1a",
            answerContent: "Dropout",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ml1b",
            answerContent: "Cross-validation",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ml1c",
            answerContent: "Increasing model complexity",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-ml1d",
            answerContent: "Regularization",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "cybersecurity",
      questionContent: '<p>Which type of XSS attack involves malicious code being stored on the target server?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-xss1a",
            answerContent: "Reflected XSS",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-xss1b",
            answerContent: "Stored XSS",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-xss1c",
            answerContent: "DOM-based XSS",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-xss1d",
            answerContent: "Client-side XSS",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "software-architecture",
      questionContent: '<p>Which pattern is commonly used for communication between microservices?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-arch1a",
            answerContent: "Event-driven architecture",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-arch1b",
            answerContent: "Monolithic architecture",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-arch1c",
            answerContent: "Layered architecture",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-arch1d",
            answerContent: "Pipeline architecture",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "design-patterns",
      questionContent: '<p>What is the main disadvantage of using the Singleton pattern?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-pat1a",
            answerContent: "Global state makes testing difficult",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-pat1b",
            answerContent: "High memory usage",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-pat1c",
            answerContent: "Complex implementation",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-pat1d",
            answerContent: "Poor performance",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "distributed-systems",
      questionContent: '<p>According to the CAP theorem, which property must be sacrificed in a distributed system during a network partition?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-cap1a",
            answerContent: "Either Consistency or Availability",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-cap1b",
            answerContent: "Partition Tolerance",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-cap1c",
            answerContent: "Both Consistency and Availability",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-cap1d",
            answerContent: "None of the above",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "blockchain",
      questionContent: '<p>What is the purpose of mining in a blockchain network?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-block1a",
            answerContent: "To validate and add new transactions to the blockchain",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-block1b",
            answerContent: "To create new cryptocurrencies",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-block1c",
            answerContent: "To hack other users' wallets",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-block1d",
            answerContent: "To store transaction data locally",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "software-testing",
      questionContent: '<p>What is the correct order of steps in Test-Driven Development (TDD)?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          {
            key: "mantine-tdd1a",
            answerContent: "Write code, Write test, Refactor",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-tdd1b",
            answerContent: "Write test, Write code, Refactor",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-tdd1c",
            answerContent: "Refactor, Write test, Write code",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-tdd1d",
            answerContent: "Write code, Refactor, Write test",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "devops",
      questionContent: '<p>Which of the following is NOT a benefit of Continuous Integration?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-ci1a",
            answerContent: "Early bug detection",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ci1b",
            answerContent: "Reduced integration problems",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ci1c",
            answerContent: "Elimination of all production bugs",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-ci1d",
            answerContent: "Faster development cycles",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "data-structures",
      questionContent: '<p>What is the time complexity of extracting the maximum element from a max heap?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-heap1a",
            answerContent: "O(log n)",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-heap1b",
            answerContent: "O(n)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-heap1c",
            answerContent: "O(1)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-heap1d",
            answerContent: "O(n log n)",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "algorithms",
      questionContent: '<p>Which of the following problems can be solved optimally using a greedy algorithm?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-greedy1a",
            answerContent: "Minimum Spanning Tree",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-greedy1b",
            answerContent: "Traveling Salesman Problem",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-greedy1c",
            answerContent: "0/1 Knapsack Problem",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-greedy1d",
            answerContent: "Longest Common Subsequence",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "networking",
      questionContent: '<p>What mechanism does TCP use to ensure reliable data transmission?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-tcp1a",
            answerContent: "Acknowledgments and retransmission",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-tcp1b",
            answerContent: "Encryption",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-tcp1c",
            answerContent: "Compression",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-tcp1d",
            answerContent: "Load balancing",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "object-oriented-programming",
      questionContent: '<p>Which OOP concept represents an "is-a" relationship between classes?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          {
            key: "mantine-oop1a",
            answerContent: "Inheritance",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-oop1b",
            answerContent: "Composition",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-oop1c",
            answerContent: "Encapsulation",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-oop1d",
            answerContent: "Polymorphism",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "database-systems",
      questionContent: '<p>What type of index is most suitable for columns with high cardinality?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-idx1a",
            answerContent: "B-tree index",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-idx1b",
            answerContent: "Bitmap index",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-idx1c",
            answerContent: "Hash index",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-idx1d",
            answerContent: "Full-text index",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "machine-learning",
      questionContent: '<p>Which regression metric is NOT affected by the scale of the target variable?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-ml2a",
            answerContent: "R-squared",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-ml2b",
            answerContent: "Mean Squared Error",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ml2c",
            answerContent: "Mean Absolute Error",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ml2d",
            answerContent: "Root Mean Squared Error",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "artificial-intelligence",
      questionContent: '<p>Which search algorithm is guaranteed to find the optimal solution?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-ai1a",
            answerContent: "A* with admissible heuristic",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-ai1b",
            answerContent: "Depth-First Search",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ai1c",
            answerContent: "Hill Climbing",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ai1d",
            answerContent: "Best-First Search",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "web-development",
      questionContent: '<p>Which HTTP method should be used for a request that updates an existing resource?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          {
            key: "mantine-http1a",
            answerContent: "PUT",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-http1b",
            answerContent: "POST",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-http1c",
            answerContent: "GET",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-http1d",
            answerContent: "DELETE",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "cybersecurity",
      questionContent: '<p>Which encryption method uses the same key for encryption and decryption?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-sec1a",
            answerContent: "Symmetric encryption",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-sec1b",
            answerContent: "Asymmetric encryption",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-sec1c",
            answerContent: "Hash function",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-sec1d",
            answerContent: "Digital signature",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "cloud-computing",
      questionContent: '<p>Which scaling approach adds more resources to existing nodes?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-cloud1a",
            answerContent: "Vertical scaling",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-cloud1b",
            answerContent: "Horizontal scaling",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-cloud1c",
            answerContent: "Diagonal scaling",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-cloud1d",
            answerContent: "Cross scaling",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "devops",
      questionContent: '<p>What is the main advantage of using containers over virtual machines?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-dev1a",
            answerContent: "Lower resource overhead",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-dev1b",
            answerContent: "Better security isolation",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-dev1c",
            answerContent: "Full operating system control",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-dev1d",
            answerContent: "Hardware-level access",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "software-architecture",
      questionContent: '<p>Which architectural pattern is best suited for applications with complex domain logic?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-arch1a",
            answerContent: "Domain-Driven Design",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-arch1b",
            answerContent: "Event-Driven Architecture",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-arch1c",
            answerContent: "Pipe and Filter",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-arch1d",
            answerContent: "Client-Server",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "design-patterns",
      questionContent: '<p>What is the main purpose of the Factory Method design pattern?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-dp1a",
            answerContent: "To delegate object creation to subclasses",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-dp1b",
            answerContent: "To ensure only one instance exists",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-dp1c",
            answerContent: "To add new behaviors dynamically",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-dp1d",
            answerContent: "To define a skeleton algorithm",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "big-data",
      questionContent: '<p>Which processing model is most suitable for real-time streaming data analysis?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-bd1a",
            answerContent: "Stream Processing",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-bd1b",
            answerContent: "Batch Processing",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-bd1c",
            answerContent: "Micro-batch Processing",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-bd1d",
            answerContent: "Lambda Architecture",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "quantum-computing",
      questionContent: '<p>What is the key principle that allows quantum computers to process multiple states simultaneously?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-qc1a",
            answerContent: "Superposition",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-qc1b",
            answerContent: "Entanglement",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-qc1c",
            answerContent: "Decoherence",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-qc1d",
            answerContent: "Quantum Tunneling",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "user-experience-design",
      questionContent: '<p>Which of Nielsen\'s usability heuristics emphasizes keeping users informed about system status?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-ux1a",
            answerContent: "Visibility of system status",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-ux1b",
            answerContent: "User control and freedom",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ux1c",
            answerContent: "Error prevention",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ux1d",
            answerContent: "Recognition rather than recall",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "ethical-hacking",
      questionContent: '<p>Which type of reconnaissance involves gathering information without directly interacting with the target system?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-eh1a",
            answerContent: "Passive Reconnaissance",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-eh1b",
            answerContent: "Active Reconnaissance",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-eh1c",
            answerContent: "Semi-passive Reconnaissance",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-eh1d",
            answerContent: "Internal Reconnaissance",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "network-security",
      questionContent: '<p>Which type of firewall operates at the application layer of the OSI model?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-ns1a",
            answerContent: "Application-level Gateway",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-ns1b",
            answerContent: "Packet Filtering Firewall",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ns1c",
            answerContent: "Circuit-level Gateway",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ns1d",
            answerContent: "Stateful Inspection Firewall",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "blockchain",
      questionContent: '<p>Which consensus mechanism is most energy-efficient compared to Proof of Work?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-bc1a",
            answerContent: "Proof of Stake",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-bc1b",
            answerContent: "Proof of Work",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-bc1c",
            answerContent: "Proof of Authority",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-bc1d",
            answerContent: "Proof of Activity",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "data-analytics",
      questionContent: '<p>Which type of visualization is best suited for showing the distribution of a continuous variable?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          {
            key: "mantine-da1a",
            answerContent: "Histogram",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-da1b",
            answerContent: "Pie Chart",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-da1c",
            answerContent: "Bar Chart",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-da1d",
            answerContent: "Line Chart",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "software-testing",
      questionContent: '<p>What is the main advantage of using mock objects in integration testing?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-st1a",
            answerContent: "They simulate dependencies that are difficult to set up",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-st1b",
            answerContent: "They improve test execution speed",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-st1c",
            answerContent: "They provide better code coverage",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-st1d",
            answerContent: "They prevent regression bugs",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "advanced-database-systems",
      questionContent: '<p>What is the primary challenge in implementing database sharding?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-ads1a",
            answerContent: "Managing distributed transactions",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-ads1b",
            answerContent: "Backup and recovery",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ads1c",
            answerContent: "Data compression",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ads1d",
            answerContent: "Query optimization",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "algorithms-optimization",
      questionContent: '<p>Which technique is used to reduce space complexity by reusing memory?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-ao1a",
            answerContent: "In-place algorithms",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-ao1b",
            answerContent: "Dynamic programming",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ao1c",
            answerContent: "Divide and conquer",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ao1d",
            answerContent: "Branch and bound",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "algorithms-optimization",
      questionContent: '<p>Which technique is used to reduce space complexity by reusing memory?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-ao1a",
            answerContent: "In-place algorithms",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-ao1b",
            answerContent: "Dynamic programming",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ao1c",
            answerContent: "Divide and conquer",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ao1d",
            answerContent: "Branch and bound",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "data-structures",
      questionContent: '<p>What is the time complexity of searching for an element in a balanced binary search tree?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-ds1a",
            answerContent: "O(n)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ds1b",
            answerContent: "O(log n)",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-ds1c",
            answerContent: "O(n^2)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ds1d",
            answerContent: "O(1)",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "networking",
      questionContent: '<p>Which layer of the OSI model is responsible for the logical addressing of data?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-net1a",
            answerContent: "Network Layer",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-net1b",
            answerContent: "Data Link Layer",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-net1c",
            answerContent: "Transport Layer",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-net1d",
            answerContent: "Application Layer",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "web-development",
      questionContent: '<p>What does the acronym "REST" stand for in the context of web development?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          {
            key: "mantine-web1a",
            answerContent: "Representational State Transfer",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-web1b",
            answerContent: "Remote Server Technology",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-web1c",
            answerContent: "Rapid Endpoint Service Transfer",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-web1d",
            answerContent: "Resourceful Server Transfer",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "cloud-computing",
      questionContent: '<p>Which cloud computing service model provides users with access to virtual machines and other computing resources?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-cloud1a",
            answerContent: "IaaS (Infrastructure as a Service)",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-cloud1b",
            answerContent: "PaaS (Platform as a Service)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-cloud1c",
            answerContent: "SaaS (Software as a Service)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-cloud1d",
            answerContent: "DaaS (Data as a Service)",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "machine-learning",
      questionContent: '<p>What is the primary goal of supervised learning in machine learning?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          {
            key: "mantine-ml1a",
            answerContent: "To find patterns and structure in unlabeled data.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ml1b",
            answerContent: "To predict outcomes based on labeled data.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-ml1c",
            answerContent: "To generate new data from existing data.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ml1d",
            answerContent: "To reduce the dimensionality of data.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "cybersecurity",
      questionContent: '<p>What is phishing?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          {
            key: "mantine-cs1a",
            answerContent: "A type of malware that encrypts files on a computer.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-cs1b",
            answerContent: "A social engineering attack that attempts to trick users into revealing sensitive information.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-cs1c",
            answerContent: "A technique for intercepting network traffic.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-cs1d",
            answerContent: "A denial-of-service attack that floods a network with traffic.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "data-structures",
      questionContent: '<p>What is a linked list, and what are its advantages and disadvantages compared to an array?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-ds2a",
            answerContent: "A linear data structure where each element points to the next.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-ds2b",
            answerContent: "A non-linear data structure used for tree-based operations.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ds2c",
            answerContent: "A data structure used for representing graphs.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "algorithms",
      questionContent: '<p>Describe the divide and conquer algorithm for sorting an array. What is its time complexity?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-algo2a",
            answerContent: "Mergesort; O(n log n)",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-algo2b",
            answerContent: "Bubble Sort; O(n^2)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-algo2c",
            answerContent: "Selection Sort; O(n^2)",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "operating-systems",
      questionContent: '<p>What is a process in an operating system? How does it differ from a thread?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-os2a",
            answerContent: "A program in execution; A thread is a unit of execution within a process.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-os2b",
            answerContent: "A unit of memory allocation; A thread is a unit of CPU time.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "database-systems",
      questionContent: '<p>What is a primary key in a relational database? What is its purpose?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          {
            key: "mantine-db2a",
            answerContent: "A unique identifier for each row in a table.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-db2b",
            answerContent: "A column that can have duplicate values.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "software-engineering",
      questionContent: '<p>What is the purpose of code reviews in software development?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          {
            key: "mantine-se2a",
            answerContent: "To identify and fix bugs, improve code quality, and share knowledge.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-se2b",
            answerContent: "To increase the speed of development.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "web-development",
      questionContent: '<p>What is the difference between HTTP and HTTPS?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-web2a",
            answerContent: "HTTPS uses encryption (SSL/TLS) to secure communication, while HTTP does not.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-web2b",
            answerContent: "HTTP is used for web pages, while HTTPS is used for APIs.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "object-oriented-programming",
      questionContent: '<p>What is polymorphism in object-oriented programming?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-oop2a",
            answerContent: "The ability of objects of different classes to be treated as objects of a common type.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-oop2b",
            answerContent: "The ability of a class to inherit properties from another class.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "machine-learning",
      questionContent: '<p>What is overfitting in machine learning? How can it be prevented?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-ml2a",
            answerContent: "When a model performs well on the training data but poorly on new, unseen data; Techniques like regularization, cross-validation, and simpler models can help prevent it.",
            isCorrect: true,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "algorithms-optimization",
      questionContent: '<p>Describe an efficient algorithm for finding the shortest path between two nodes in a weighted graph.</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-ao1a",
            answerContent: "Dijkstra's Algorithm",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-ao1b",
            answerContent: "Bubble Sort",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ao1c",
            answerContent: "Linear Search",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ao1d",
            answerContent: "Merge Sort",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "data-structures",
      questionContent: '<p>Explain the concept of a balanced binary search tree and its advantages over an unbalanced one.</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-ds1a",
            answerContent: "A binary search tree where the heights of the left and right subtrees of any node differ by at most one; Provides faster search, insertion, and deletion operations.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-ds1b",
            answerContent: "A tree where all nodes have two children.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ds1c",
            answerContent: "A tree where the order of insertion does not affect the tree's shape.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "networking",
      questionContent: '<p>Describe the TCP three-way handshake and its purpose in establishing a network connection.</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-net1a",
            answerContent: "A three-step process involving SYN, SYN-ACK, and ACK messages to synchronize sequence numbers and establish a reliable connection.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-net1b",
            answerContent: "A single message sent from the client to the server to initiate a connection.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-net1c",
            answerContent: "A process used to encrypt data transmitted over the network.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "web-development",
      questionContent: '<p>Explain the concept of asynchronous JavaScript and how it improves the performance of web applications.</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-web1a",
            answerContent: "Allows JavaScript code to execute without blocking the main thread, enabling smoother user interactions and faster loading times.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-web1b",
            answerContent: "A method for writing sequential JavaScript code.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-web1c",
            answerContent: "A technique for optimizing image loading on web pages.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "cloud-computing",
      questionContent: '<p>Discuss the challenges of data security and privacy in cloud computing environments.</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-cloud1a",
            answerContent: "Data breaches, unauthorized access, data loss, and compliance with regulations like GDPR.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-cloud1b",
            answerContent: "Limited scalability and high latency.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-cloud1c",
            answerContent: "High upfront costs and lack of flexibility.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "machine-learning",
      questionContent: '<p>Explain the concept of bias-variance trade-off in machine learning.</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-ml1a",
            answerContent: "A fundamental concept in machine learning that highlights the conflict between model complexity and generalization ability. High bias models underfit the data, while high variance models overfit the data.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-ml1b",
            answerContent: "The relationship between the complexity of a model and its training time.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ml1c",
            answerContent: "The importance of selecting the correct algorithm for a given problem.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "cybersecurity",
      questionContent: '<p>Describe the techniques used in social engineering attacks and how to protect against them.</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-cs1a",
            answerContent: "Phishing, pretexting, baiting, and others; Strong passwords, security awareness training, and verifying information before sharing it are crucial for protection.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-cs1b",
            answerContent: "Denial-of-service attacks and malware infections.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-cs1c",
            answerContent: "Hardware failures and natural disasters.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "software-engineering",
      questionContent: '<p>Discuss the principles of SOLID design and their importance in software development.</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-se1a",
            answerContent: "Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion; These principles promote code maintainability, flexibility, and reusability.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-se1b",
            answerContent: "Fast development, early releases, and customer feedback.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-se1c",
            answerContent: "Thorough testing and documentation.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "object-oriented-programming",
      questionContent: '<p>Explain the concept of inheritance and its role in object-oriented programming.</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-oop1a",
            answerContent: "A mechanism where a new class (subclass) inherits properties and behaviors from an existing class (superclass); Promotes code reusability and helps organize code into a hierarchical structure.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-oop1b",
            answerContent: "The ability of an object to take on many forms.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-oop1c",
            answerContent: "The process of hiding the internal implementation details of an object.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "machine-learning",
      questionContent: '<p>Describe the k-Nearest Neighbors (k-NN) algorithm and its applications in machine learning.</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-ml1a",
            answerContent: "A simple, non-parametric algorithm that classifies a new data point based on the majority class among its k nearest neighbors in the training data; Used for classification and regression tasks.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-ml1b",
            answerContent: "An algorithm for finding the optimal weights in a neural network.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ml1c",
            answerContent: "An algorithm for dimensionality reduction.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "cloud-computing",
      questionContent: '<p>Discuss the concept of serverless computing and its advantages and disadvantages.</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-cloud1a",
            answerContent: "A cloud computing execution model where the cloud provider dynamically manages the allocation of machine resources; Advantages include scalability, cost-effectiveness, and reduced operational overhead; Disadvantages include vendor lock-in and potential performance limitations.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-cloud1b",
            answerContent: "A type of cloud computing that requires users to manage their own servers.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-cloud1c",
            answerContent: "A cloud computing service that provides access to a shared pool of computing resources.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "cybersecurity",
      questionContent: '<p>Explain the concept of zero-day exploits and their significance in cybersecurity.</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-cs1a",
            answerContent: "Cybersecurity vulnerabilities that are unknown to the software vendor; They pose a significant threat as there are no immediate patches or defenses available.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-cs1b",
            answerContent: "Security vulnerabilities that have been known for a long time.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-cs1c",
            answerContent: "Security measures implemented to prevent known vulnerabilities.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "software-engineering",
      questionContent: '<p>Describe the agile software development methodology and its key principles.</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-se1a",
            answerContent: "Focuses on iterative development, collaboration, and customer satisfaction; Key principles include flexibility, adaptability, and continuous improvement.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-se1b",
            answerContent: "A rigid, plan-driven approach to software development.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-se1c",
            answerContent: "A methodology that emphasizes documentation and detailed planning.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "web-development",
      questionContent: '<p>Explain the concept of responsive web design and its importance for user experience.</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-web1a",
            answerContent: "Creating websites that adapt and display correctly on various devices (desktops, tablets, and smartphones); Ensures a consistent and enjoyable user experience across all platforms.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-web1b",
            answerContent: "Designing websites that are only accessible through a single device.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-web1c",
            answerContent: "Using only static HTML and CSS for web development.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "object-oriented-programming",
      questionContent: '<p>What is polymorphism in object-oriented programming, and how is it achieved?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-oop2a",
            answerContent: "The ability of objects of different classes to be treated as objects of a common type; Achieved through inheritance and method overriding.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-oop2b",
            answerContent: "The ability to create multiple objects of the same class.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-oop2c",
            answerContent: "The process of hiding data within an object.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "machine-learning",
      questionContent: '<p>Explain the concept of overfitting in machine learning and how it can be prevented.</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-ml2a",
            answerContent: "When a model performs well on the training data but poorly on new, unseen data; Prevented by techniques like regularization, cross-validation, and simpler models.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-ml2b",
            answerContent: "When a model fails to learn from the training data.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ml2c",
            answerContent: "When a model is too complex for the available data.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "cloud-computing",
      questionContent: '<p>What are the key differences between Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS)?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-cloud2a",
            answerContent: "IaaS provides fundamental computing resources (servers, storage, networking); PaaS provides a platform for developing and deploying applications; SaaS provides access to software applications over the internet.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-cloud2b",
            answerContent: "All three terms refer to the same type of cloud computing service.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-cloud2c",
            answerContent: "IaaS is the most secure, PaaS is the most flexible, and SaaS is the most cost-effective.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "cybersecurity",
      questionContent: '<p>What is a firewall, and how does it help protect a network?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-cs2a",
            answerContent: "A security system that monitors incoming and outgoing network traffic and blocks unauthorized access.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-cs2b",
            answerContent: "A type of malware that encrypts files on a computer.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-cs2c",
            answerContent: "A technique for intercepting network traffic.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "mobile-development",
      questionContent: '<p>What are some of the challenges of developing mobile applications?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-mobile2a",
            answerContent: "Different screen sizes and operating systems, performance optimization, and battery life considerations.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-mobile2b",
            answerContent: "High development costs and limited user base.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-mobile2c",
            answerContent: "Lack of available development tools and libraries.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "data-analytics",
      questionContent: '<p>What are the key stages involved in the data analysis process?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-da2a",
            answerContent: "Data collection, data cleaning, data exploration, data modeling, and data visualization.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-da2b",
            answerContent: "Data mining, data warehousing, and data integration.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-da2c",
            answerContent: "Data acquisition, data storage, and data reporting.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "software-testing",
      questionContent: '<p>What is unit testing, and why is it important?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          {
            key: "mantine-st2a",
            answerContent: "Testing individual components or units of code in isolation; It helps to identify and fix bugs early in the development process.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-st2b",
            answerContent: "Testing the entire software system as a whole.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-st2c",
            answerContent: "Testing the user interface of a software application.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "devops",
      questionContent: '<p>What is continuous integration (CI)?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-devops2a",
            answerContent: "The practice of automatically building, testing, and integrating code changes into a shared repository.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-devops2b",
            answerContent: "The process of deploying software to production environments.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-devops2c",
            answerContent: "The management of infrastructure and operations in a cloud environment.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "design-patterns",
      questionContent: '<p>Describe the Singleton design pattern and its purpose.</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-dp2a",
            answerContent: "Ensures that a class has only one instance and provides a global point of access to it.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-dp2b",
            answerContent: "Defines a one-to-many relationship between objects.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-dp2c",
            answerContent: "Allows objects to be created without specifying their concrete class.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "algorithms-optimization",
      questionContent: '<p>What is dynamic programming, and how does it improve the efficiency of algorithms?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-algo-opt2a",
            answerContent: "A technique for solving problems by breaking them down into subproblems and storing the results of these subproblems to avoid redundant calculations.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-algo-opt2b",
            answerContent: "A method for optimizing code by reducing the number of loops.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-algo-opt2c",
            answerContent: "A technique for improving the memory usage of an algorithm.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "advanced-database-systems",
      questionContent: '<p>What is a distributed database, and what are its advantages?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-adb2a",
            answerContent: "A database system in which data is stored and processed across multiple computers in a network; Advantages include improved scalability, availability, and performance.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-adb2b",
            answerContent: "A database system that stores all data in a single location.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-adb2c",
            answerContent: "A database system that is optimized for storing and processing large volumes of data.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "distributed-systems",
      questionContent: '<p>What are some of the challenges in building and maintaining distributed systems?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-dist2a",
            answerContent: "Data consistency, fault tolerance, network latency, and security.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-dist2b",
            answerContent: "High development costs and limited scalability.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-dist2c",
            answerContent: "Lack of skilled developers and limited available tools.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "artificial-intelligence",
      questionContent: '<p>What is machine learning, and how does it relate to artificial intelligence?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-ai2a",
            answerContent: "A subset of AI that allows systems to learn and improve from experience without being explicitly programmed; Machine learning is a key technique used to achieve AI goals.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-ai2b",
            answerContent: "Machine learning is a separate field from AI with no significant overlap.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ai2c",
            answerContent: "AI is a subset of machine learning, focusing on creating intelligent agents.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "network-security",
      questionContent: '<p>What is a denial-of-service (DoS) attack?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          {
            key: "mantine-netsec2a",
            answerContent: "An attack that aims to overload a target system or network with traffic, making it unavailable to legitimate users.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-netsec2b",
            answerContent: "A type of malware that infects computer systems.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-netsec2c",
            answerContent: "A technique for intercepting network traffic.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "blockchain",
      questionContent: '<p>What is a cryptocurrency, and how does it use blockchain technology?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-blockchain2a",
            answerContent: "A digital currency that uses cryptography for security and operates independently of a central bank; Blockchain technology provides a secure and transparent ledger for recording and verifying cryptocurrency transactions.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-blockchain2b",
            answerContent: "A type of online currency issued and regulated by a central bank.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-blockchain2c",
            answerContent: "A technology used to create and manage traditional currencies.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "user-experience-design",
      questionContent: '<p>What are some key principles of user interface (UI) design?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-ux2a",
            answerContent: "Simplicity, consistency, clarity, and usability.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-ux2b",
            answerContent: "High visual appeal and complex animations.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ux2c",
            answerContent: "Maximizing the number of features and functionalities.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "ethical-hacking",
      questionContent: '<p>What is the purpose of ethical hacking?</p>',
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          {
            key: "mantine-eth2a",
            answerContent: "To identify and fix vulnerabilities in computer systems and networks before malicious actors can exploit them.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-eth2b",
            answerContent: "To gain unauthorized access to computer systems for personal gain.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-eth2c",
            answerContent: "To disrupt the operations of computer systems and networks.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "software-architecture",
      questionContent: '<p>What are the key concerns in software architecture design?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-sa2a",
            answerContent: "Performance, scalability, maintainability, security, and reusability.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-sa2b",
            answerContent: "Fast development and rapid deployment.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-sa2c",
            answerContent: "Minimizing development costs and maximizing developer productivity.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "quantum-computing",
      questionContent: '<p>What are qubits, and how do they differ from classical bits?</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-qc2a",
            answerContent: "The basic unit of information in quantum computing; Unlike classical bits, which can only represent 0 or 1, qubits can represent both 0 and 1 simultaneously due to quantum superposition.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-qc2b",
            answerContent: "Qubits are simply faster versions of classical bits.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-qc2c",
            answerContent: "Qubits are larger in size than classical bits, allowing them to store more information.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "big-data",
      questionContent: '<p>What are some of the characteristics of big data?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-bd2a",
            answerContent: "Volume, velocity, variety, veracity, and value.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-bd2b",
            answerContent: "High cost, low availability, and limited scalability.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-bd2c",
            answerContent: "High accuracy, low complexity, and easy to manage.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "data-structures",
      questionContent: '<p>What is a stack, and how does it differ from a queue?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-ds3a",
            answerContent: "A stack is a Last-In, First-Out (LIFO) data structure, while a queue is a First-In, First-Out (FIFO) data structure.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-ds3b",
            answerContent: "A stack is used for storing data in sorted order, while a queue is used for storing data in unsorted order.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ds3c",
            answerContent: "A stack is a dynamic data structure, while a queue is a static data structure.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "algorithms",
      questionContent: '<p>Describe the merge sort algorithm and its time complexity.</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-algo3a",
            answerContent: "A divide-and-conquer algorithm that recursively divides an array into smaller subarrays, sorts them, and then merges them back together; Time complexity is O(n log n).",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-algo3b",
            answerContent: "An algorithm that repeatedly swaps adjacent elements until the array is sorted; Time complexity is O(n^2).",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-algo3c",
            answerContent: "An algorithm that finds the minimum element in an array and swaps it with the first element, then repeats for the remaining subarray; Time complexity is O(n^2).",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "operating-systems",
      questionContent: '<p>Explain the concept of virtual memory and its benefits.</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-os3a",
            answerContent: "Allows processes to use more memory than is physically available by dividing memory into pages and storing them on disk; Benefits include increased memory availability, improved program isolation, and better memory utilization.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-os3b",
            answerContent: "A type of memory that is faster than RAM.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-os3c",
            answerContent: "A technique for optimizing CPU usage.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "networking",
      questionContent: '<p>What is the difference between TCP and UDP protocols?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-net2a",
            answerContent: "TCP is a connection-oriented protocol that guarantees reliable delivery, while UDP is a connectionless protocol that provides no guarantees of delivery.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-net2b",
            answerContent: "TCP is used for web browsing, while UDP is used for streaming media.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-net2c",
            answerContent: "TCP is faster than UDP but less reliable.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "database-systems",
      questionContent: '<p>What is a relational database, and how is data organized in a relational database?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-db3a",
            answerContent: "A database that stores data in tables, with rows representing records and columns representing attributes; Data is organized using relationships between tables.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-db3b",
            answerContent: "A database that stores data in a single, large table.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-db3c",
            answerContent: "A database that stores data in a hierarchical structure.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "software-engineering",
      questionContent: '<p>What is the purpose of software documentation, and what are some common types of documentation?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-se2a",
            answerContent: "To provide information about the software system, including its design, implementation, and usage; Common types include user manuals, technical documentation, and API documentation.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-se2b",
            answerContent: "To comply with legal and regulatory requirements.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-se2c",
            answerContent: "To improve the performance of the software system.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "web-development",
      questionContent: '<p>Explain the concept of <strong>HTTP</strong> and its role in web communication.</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-web3a",
            answerContent: "HTTP stands for <strong>Hypertext Transfer Protocol</strong>. It's the foundation of data communication for the World Wide Web. It defines how messages are formatted and transmitted between web clients (like browsers) and web servers.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-web3b",
            answerContent: "HTTP is a programming language used to create dynamic web pages.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-web3c",
            answerContent: "HTTP is a type of database used to store web page content.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "object-oriented-programming",
      questionContent: '<p>What is encapsulation in object-oriented programming, and why is it important?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-oop3a",
            answerContent: "Encapsulation is the bundling of data (attributes) and methods that operate on that data within a single unit (an object or class). It protects the internal state of an object from unauthorized access and modification.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-oop3b",
            answerContent: "Encapsulation is the process of creating multiple objects from a single class.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-oop3c",
            answerContent: "Encapsulation is the ability of objects of different classes to be treated as objects of a common type.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "machine-learning",
      questionContent: '<p>Explain the concept of supervised learning with an example.</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-ml3a",
            answerContent: "Supervised learning involves training a model on labeled data, where each data point has an associated output. For example, training a model to classify images of cats and dogs, where each image is labeled as either 'cat' or 'dog'.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-ml3b",
            answerContent: "Supervised learning involves training a model on unlabeled data to discover patterns and structures.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ml3c",
            answerContent: "Supervised learning is used to generate new data from existing data.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "cloud-computing",
      questionContent: '<p>What are the benefits of using cloud computing services?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-cloud3a",
            answerContent: "Scalability, cost-effectiveness, improved reliability, and access to a wide range of services.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-cloud3b",
            answerContent: "Increased security and reduced complexity.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-cloud3c",
            answerContent: "Greater control over hardware and software.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "cybersecurity",
      questionContent: '<p>What are some best practices for creating strong passwords?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-cs3a",
            answerContent: "Using a combination of uppercase and lowercase letters, numbers, and symbols; avoiding easily guessable information; and using a unique password for each account.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-cs3b",
            answerContent: "Using the same password for all online accounts.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-cs3c",
            answerContent: "Choosing short and easy-to-remember passwords.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "mobile-development",
      questionContent: '<p>What are some of the key considerations for designing a user-friendly mobile app interface?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-mobile3a",
            answerContent: "Intuitive navigation, clear and concise content, large touch targets, and accessibility features.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-mobile3b",
            answerContent: "Maximizing the number of features and functionalities.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-mobile3c",
            answerContent: "Prioritizing visual appeal over usability.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "data-analytics",
      questionContent: '<p>What is data visualization, and why is it important?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-da3a",
            answerContent: "The graphical representation of data to help in understanding and communicating insights; It makes data easier to interpret and can reveal patterns and trends that might be difficult to see in raw data.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-da3b",
            answerContent: "The process of collecting and storing large amounts of data.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-da3c",
            answerContent: "The use of statistical methods to analyze data.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "software-testing",
      questionContent: '<p>What is the difference between black-box testing and white-box testing?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-st3a",
            answerContent: "Black-box testing involves testing the software without knowledge of its internal structure, while white-box testing involves testing the internal structure and logic of the software.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-st3b",
            answerContent: "Black-box testing is performed by developers, while white-box testing is performed by independent testers.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-st3c",
            answerContent: "Black-box testing is more time-consuming than white-box testing.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "algorithms-optimization",
      questionContent: '<p>Describe the merge sort algorithm and its time complexity.</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-algo3a",
            answerContent: "A divide-and-conquer algorithm that recursively divides an array into smaller subarrays, sorts them, and then merges them back together; Time complexity is O(n log n).",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-algo3b",
            answerContent: "An algorithm that repeatedly swaps adjacent elements until the array is sorted; Time complexity is O(n^2).",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-algo3c",
            answerContent: "An algorithm that finds the minimum element in an array and swaps it with the first element, then repeats for the remaining subarray; Time complexity is O(n^2).",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "algorithms-optimization",
      questionContent: '<p>Explain the concept of greedy algorithms and provide an example of a problem that can be solved using a greedy approach.</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-algo-opt3a",
            answerContent: "Greedy algorithms make locally optimal choices at each step with the hope of finding a global optimum. Examples include Dijkstra's algorithm for finding the shortest path in a graph and the Huffman coding algorithm for data compression.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-algo-opt3b",
            answerContent: "Algorithms that use divide-and-conquer strategies to solve problems.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-algo-opt3c",
            answerContent: "Algorithms that use memoization to avoid redundant calculations.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "artificial-intelligence",
      questionContent: '<p>Explain the concept of neural networks and their role in artificial intelligence.</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-ai3a",
            answerContent: "Computational models inspired by the structure and function of the human brain; They are used to perform tasks such as image recognition, natural language processing, and machine translation.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-ai3b",
            answerContent: "Algorithms for searching through large datasets.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ai3c",
            answerContent: "Systems for representing and reasoning with knowledge.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "advanced-database-systems",
      questionContent: '<p>Explain the concept of NoSQL databases and their use cases.</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-adb3a",
            answerContent: "Non-relational databases that are designed to handle unstructured and semi-structured data; Used for applications that require high scalability, flexibility, and performance, such as social media, content management systems, and IoT data processing.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-adb3b",
            answerContent: "Databases that are optimized for storing and processing large volumes of relational data.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-adb3c",
            answerContent: "Databases that are designed for real-time data processing and analysis.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "blockchain",
      questionContent: '<p>Explain the concept of decentralization in the context of blockchain technology.</p>',
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-blockchain3a",
            answerContent: "Decentralization means that no single entity controls the blockchain network; transactions are verified and recorded by a distributed network of nodes, making it more resistant to censorship and manipulation.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-blockchain3b",
            answerContent: "Decentralization refers to the use of encryption to secure blockchain transactions.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-blockchain3c",
            answerContent: "Decentralization means that only authorized entities can access and modify data on the blockchain.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "cloud-computing",
      questionContent: '<p>What are the benefits of using cloud computing services?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-cloud3a",
            answerContent: "Scalability, cost-effectiveness, improved reliability, and access to a wide range of services.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-cloud3b",
            answerContent: "Increased security and reduced complexity.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-cloud3c",
            answerContent: "Greater control over hardware and software.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "data-analytics",
      questionContent: '<p>What is data visualization, and why is it important?</p>',
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-da3a",
            answerContent: "The graphical representation of data to help in understanding and communicating insights; It makes data easier to interpret and can reveal patterns and trends that might be difficult to see in raw data.",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-da3b",
            answerContent: "The process of collecting and storing large amounts of data.",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-da3c",
            answerContent: "The use of statistical methods to analyze data.",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      variationId: 1,
      topicSlug: "advanced-database-systems",
      questionContent: "<p>Explain the concept of database normalization and why it is important.</p>",
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-ad1a",
            "answerContent": "Normalization is the process of organizing data in a database to minimize redundancy and improve data integrity.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ad1b",
            "answerContent": "Normalization is used to increase the size of the database.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad1c",
            "answerContent": "Normalization is only necessary for large databases.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad1d",
            "answerContent": "Normalization has no impact on database performance.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "advanced-database-systems",
      "questionContent": "<p>What is a distributed database system, and what are its advantages?</p>",
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-ad2a",
            "answerContent": "A distributed database system stores data across multiple nodes in a network, offering advantages such as improved scalability, fault tolerance, and availability.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ad2b",
            "answerContent": "A distributed database system is always slower than a centralized database.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad2c",
            "answerContent": "Distributed databases are only suitable for small datasets.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad2d",
            "answerContent": "Distributed databases are more complex to manage than centralized databases.",
            "isCorrect": true,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      "topicSlug": "advanced-database-systems",
      "questionContent": "<p>Explain the concept of ACID properties in the context of distributed database systems.</p>",
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        "answers": [
          {
            "key": "mantine-ad3a",
            "answerContent": "ACID properties (Atomicity, Consistency, Isolation, Durability) are crucial in distributed databases to ensure data integrity and reliability across multiple nodes.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ad3b",
            "answerContent": "ACID properties are not applicable to distributed databases.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad3c",
            "answerContent": "Distributed databases inherently satisfy all ACID properties.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad3d",
            "answerContent": "ACID properties are easier to achieve in distributed databases than in centralized databases.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      "topicSlug": "advanced-database-systems",
      "questionContent": "<p>What is a NoSQL database, and how does it differ from a relational database?</p>",
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-ad4a",
            "answerContent": "NoSQL databases are non-relational databases that support various data models beyond the tabular structure of relational databases, offering greater flexibility for handling complex data structures.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ad4b",
            "answerContent": "NoSQL databases are always faster than relational databases.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad4c",
            "answerContent": "NoSQL databases do not support ACID properties.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad4d",
            "answerContent": "NoSQL databases are only suitable for small datasets.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      "topicSlug": "advanced-database-systems",
      "questionContent": "<p>Explain the concept of data warehousing and its role in business intelligence.</p>",
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-ad5a",
            "answerContent": "Data warehousing involves extracting, transforming, and loading data from various sources into a central repository for analysis and reporting.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ad5b",
            "answerContent": "Data warehousing is primarily used for operational tasks.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad5c",
            "answerContent": "Data warehousing is only suitable for small datasets.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad5d",
            "answerContent": "Data warehousing is not relevant to business decision-making.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      "topicSlug": "advanced-database-systems",
      "questionContent": "<p>What is data mining, and how is it used in the context of databases?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-ad6a",
            "answerContent": "Data mining involves extracting meaningful patterns and insights from large datasets stored in databases.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ad6b",
            "answerContent": "Data mining is the same as data warehousing.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad6c",
            "answerContent": "Data mining is only used for marketing purposes.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad6d",
            "answerContent": "Data mining is not relevant to database systems.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "advanced-database-systems",
      questionContent: "<p>What is the primary function of a database management system (DBMS)?</p>",
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        "answers": [
          {
            "key": "mantine-ad1a",
            "answerContent": "To create, manage, and query databases.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ad1b",
            "answerContent": "To write and execute programs.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad1c",
            "answerContent": "To design user interfaces.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad1d",
            "answerContent": "To perform network security functions.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "advanced-database-systems",
      "questionContent": "<p>What is the purpose of a primary key in a relational database?</p>",
      "questionDifficulty": QuestionDifficulty.Easy,
      questionData: {
        "answers": [
          {
            "key": "mantine-ad2a",
            "answerContent": "To uniquely identify each row in a table.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ad2b",
            "answerContent": "To establish relationships between tables.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad2c",
            "answerContent": "To ensure data consistency.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad2d",
            "answerContent": "To improve query performance.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "advanced-database-systems",
      "questionContent": "<p>Explain the concept of database normalization and why it is important.</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-ad3a",
            "answerContent": "Normalization is the process of organizing data in a database to minimize redundancy and improve data integrity.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ad3b",
            "answerContent": "Normalization is used to increase the size of the database.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad3c",
            "answerContent": "Normalization is only necessary for large databases.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad3d",
            "answerContent": "Normalization has no impact on database performance.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "advanced-database-systems",
      "questionContent": "<p>What is a distributed database system, and what are its advantages?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-ad4a",
            "answerContent": "A distributed database system stores data across multiple nodes in a network, offering advantages such as improved scalability, fault tolerance, and availability.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ad4b",
            "answerContent": "A distributed database system is always slower than a centralized database.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad4c",
            "answerContent": "Distributed databases are only suitable for small datasets.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad4d",
            "answerContent": "Distributed databases are more complex to manage than centralized databases.",
            "isCorrect": true,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      "topicSlug": "advanced-database-systems",
      "questionContent": "<p>Explain the concept of ACID properties in the context of distributed database systems.</p>",
      "questionDifficulty": QuestionDifficulty.Hard,
      questionData: {
        "answers": [
          {
            "key": "mantine-ad5a",
            "answerContent": "ACID properties (Atomicity, Consistency, Isolation, Durability) are crucial in distributed databases to ensure data integrity and reliability across multiple nodes.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ad5b",
            "answerContent": "ACID properties are not applicable to distributed databases.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad5c",
            "answerContent": "Distributed databases inherently satisfy all ACID properties.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad5d",
            "answerContent": "ACID properties are easier to achieve in distributed databases than in centralized databases.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "advanced-database-systems",
      questionContent: "<p>What is the primary function of a database management system (DBMS)?</p>",
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        "answers": [
          {
            "key": "mantine-ad1a",
            "answerContent": "To create, manage, and query databases.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ad1b",
            "answerContent": "To write and execute programs.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad1c",
            "answerContent": "To design user interfaces.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad1d",
            "answerContent": "To perform network security functions.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "advanced-database-systems",
      questionContent: "<p>What is the purpose of a primary key in a relational database?</p>",
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        "answers": [
          {
            "key": "mantine-ad2a",
            "answerContent": "To uniquely identify each row in a table.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ad2b",
            "answerContent": "To establish relationships between tables.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad2c",
            "answerContent": "To ensure data consistency.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad2d",
            "answerContent": "To improve query performance.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "advanced-database-systems",
      questionContent: "<p>Explain the concept of database normalization and why it is important.</p>",
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-ad3a",
            "answerContent": "Normalization is the process of organizing data in a database to minimize redundancy and improve data integrity.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ad3b",
            "answerContent": "Normalization is used to increase the size of the database.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad3c",
            "answerContent": "Normalization is only necessary for large databases.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad3d",
            "answerContent": "Normalization has no impact on database performance.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "advanced-database-systems",
      "questionContent": "<p>What is a distributed database system, and what are its advantages?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-ad4a",
            "answerContent": "A distributed database system stores data across multiple nodes in a network, offering advantages such as improved scalability, fault tolerance, and availability.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ad4b",
            "answerContent": "A distributed database system is always slower than a centralized database.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad4c",
            "answerContent": "Distributed databases are only suitable for small datasets.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad4d",
            "answerContent": "Distributed databases are more complex to manage than centralized databases.",
            "isCorrect": true,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "advanced-database-systems",
      "questionContent": "<p>Explain the concept of ACID properties in the context of distributed database systems.</p>",
      "questionDifficulty": QuestionDifficulty.Hard,
      questionData: {
        "answers": [
          {
            "key": "mantine-ad5a",
            "answerContent": "ACID properties (Atomicity, Consistency, Isolation, Durability) are crucial in distributed databases to ensure data integrity and reliability across multiple nodes.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ad5b",
            "answerContent": "ACID properties are not applicable to distributed databases.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad5c",
            "answerContent": "Distributed databases inherently satisfy all ACID properties.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad5d",
            "answerContent": "ACID properties are easier to achieve in distributed databases than in centralized databases.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "advanced-database-systems",
      "questionContent": "<p>What is a NoSQL database, and how does it differ from a relational database?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-ad6a",
            "answerContent": "NoSQL databases are non-relational databases that support various data models beyond the tabular structure of relational databases, offering greater flexibility for handling complex data structures.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ad6b",
            "answerContent": "NoSQL databases are always faster than relational databases.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad6c",
            "answerContent": "NoSQL databases do not support ACID properties.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad6d",
            "answerContent": "NoSQL databases are only suitable for small datasets.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "advanced-database-systems",
      "questionContent": "<p>Explain the concept of data warehousing and its role in business intelligence.</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-ad7a",
            "answerContent": "Data warehousing involves extracting, transforming, and loading data from various sources into a central repository for analysis and reporting.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ad7b",
            "answerContent": "Data warehousing is primarily used for operational tasks.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad7c",
            "answerContent": "Data warehousing is only suitable for small datasets.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ad7d",
            "answerContent": "Data warehousing is not relevant to business decision-making.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "big-data",
      questionContent: "<p>What is big data, and what are the key characteristics that define it (the 3 Vs or 4 Vs)?</p>",
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        "answers": [
          {
            "key": "mantine-bd1a",
            "answerContent": "Big data refers to datasets that are too large or complex to be processed by traditional data processing applications. Key characteristics include Volume, Velocity, Variety, and often Veracity.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-bd1b",
            "answerContent": "Big data is simply any large dataset.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-bd1c",
            "answerContent": "Big data only refers to structured data.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-bd1d",
            "answerContent": "Big data is only relevant for large corporations.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "big-data",
      "questionContent": "<p>What are some common sources of big data?</p>",
      "questionDifficulty": QuestionDifficulty.Easy,
      questionData: {
        "answers": [
          {
            "key": "mantine-bd2a",
            "answerContent": "Social media, sensor data, e-commerce transactions, web server logs, and scientific experiments.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-bd2b",
            "answerContent": "Only traditional databases.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-bd2c",
            "answerContent": "Only government databases.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-bd2d",
            "answerContent": "Only financial transactions.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "big-data",
      "questionContent": "<p>What are some of the key challenges in processing and analyzing big data?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-bd3a",
            "answerContent": "Volume, velocity, variety, and veracity of data; storage and processing costs; data security and privacy; and the need for specialized skills and tools.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-bd3b",
            "answerContent": "Big data is easy to process and analyze with traditional tools.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-bd3c",
            "answerContent": "There are no significant challenges in processing big data.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-bd3d",
            "answerContent": "Big data is only a challenge for large companies.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "big-data",
      "questionContent": "<p>What are some of the popular technologies used for big data processing and analysis (e.g., Hadoop, Spark)?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-bd4a",
            "answerContent": "Hadoop, Spark, Kafka, NoSQL databases, and machine learning frameworks.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-bd4b",
            "answerContent": "Only traditional relational databases.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-bd4c",
            "answerContent": "Only cloud computing platforms.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-bd4d",
            "answerContent": "Only spreadsheet software.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "big-data",
      "questionContent": "<p>Explain the concept of MapReduce in the context of big data processing.</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-bd5a",
            "answerContent": "MapReduce is a programming model and an associated implementation for processing and generating large datasets. It's a framework for distributing and parallelizing computation across a cluster of machines.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-bd5b",
            "answerContent": "MapReduce is a type of database.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-bd5c",
            "answerContent": "MapReduce is only used for data warehousing.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-bd5d",
            "answerContent": "MapReduce is no longer relevant in big data processing.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "big-data",
      "questionContent": "<p>What are some of the business applications of big data analytics?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-bd6a",
            "answerContent": "Customer relationship management, fraud detection, personalized recommendations, market research, and risk assessment.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-bd6b",
            "answerContent": "Only for scientific research.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-bd6c",
            "answerContent": "Only for social media analysis.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-bd6d",
            "answerContent": "Big data has no significant business applications.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "big-data",
      "questionContent": "<p>What are the ethical considerations related to the use of big data?</p>",
      "questionDifficulty": QuestionDifficulty.Hard,
      questionData: {
        "answers": [
          {
            "key": "mantine-bd7a",
            "answerContent": "Privacy concerns, data security breaches, bias in algorithms, discrimination, and the potential for misuse of personal information.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-bd7b",
            "answerContent": "There are no ethical considerations related to the use of big data.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-bd7c",
            "answerContent": "Ethical considerations are only relevant for government use of big data.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-bd7d",
            "answerContent": "Ethical considerations are only relevant for personal use of big data.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "big-data",
      questionContent: "<p>Explain the difference between structured, semi-structured, and unstructured data.</p>",
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-bd1a",
            "answerContent": "Structured data is organized in a predefined format (e.g., tables), semi-structured data has some structure but is not as rigid (e.g., JSON, XML), and unstructured data has no predefined format (e.g., images, videos, text documents).",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-bd1b",
            "answerContent": "All big data is unstructured.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-bd1c",
            "answerContent": "There is no difference between these data types.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-bd1d",
            "answerContent": "Only structured data can be analyzed with big data technologies.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "big-data",
      "questionContent": "<p>What is the role of data lakes in big data analytics?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-bd2a",
            "answerContent": "Data lakes are central repositories for storing large volumes of data in its raw format, regardless of structure or type, enabling flexible and cost-effective storage and analysis.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-bd2b",
            "answerContent": "Data lakes are only used for storing structured data.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-bd2c",
            "answerContent": "Data lakes are the same as data warehouses.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-bd2d",
            "answerContent": "Data lakes are not relevant for big data analytics.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "big-data",
      "questionContent": "<p>What is the Internet of Things (IoT) and how does it contribute to the growth of big data?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-bd3a",
            "answerContent": "IoT refers to the network of interconnected devices that collect and exchange data. IoT devices generate massive amounts of data that contribute significantly to the growth of big data.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-bd3b",
            "answerContent": "IoT has no significant impact on the growth of big data.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-bd3c",
            "answerContent": "IoT only generates structured data.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-bd3d",
            "answerContent": "IoT is not related to big data.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "big-data",
      "questionContent": "<p>Explain the concept of streaming analytics in the context of big data.</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-bd4a",
            "answerContent": "Streaming analytics involves real-time processing and analysis of data streams as they are generated, enabling immediate insights and responses.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-bd4b",
            "answerContent": "Streaming analytics is only used for historical data.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-bd4c",
            "answerContent": "Streaming analytics is not suitable for high-velocity data streams.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-bd4d",
            "answerContent": "Streaming analytics is only relevant for social media data.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "big-data",
      "questionContent": "<p>What are some of the challenges associated with real-time analytics on big data streams?</p>",
      "questionDifficulty": QuestionDifficulty.Hard,
      questionData: {
        "answers": [
          {
            "key": "mantine-bd5a",
            "answerContent": "High data volumes, low latency requirements, data consistency, and the need for scalable and fault-tolerant systems.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-bd5b",
            "answerContent": "Real-time analytics on big data streams is always easy to implement.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-bd5c",
            "answerContent": "There are no significant challenges associated with real-time analytics on big data streams.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-bd5d",
            "answerContent": "Real-time analytics is only applicable to structured data streams.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "big-data",
      "questionContent": "<p>Explain the concept of machine learning in the context of big data analysis.</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-bd6a",
            "answerContent": "Machine learning algorithms can be applied to large datasets to discover patterns, make predictions, and gain insights that would be difficult or impossible to uncover through traditional methods.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-bd6b",
            "answerContent": "Machine learning is not relevant to big data analysis.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-bd6c",
            "answerContent": "Machine learning cannot be applied to unstructured data.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-bd6d",
            "answerContent": "Machine learning is only used for image recognition.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "network-security",
      questionContent: "<p>What is the purpose of a firewall in network security?</p>",
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        "answers": [
          {
            "key": "mantine-ns1a",
            "answerContent": "To control network traffic by allowing or blocking data packets based on predefined rules.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ns1b",
            "answerContent": "To encrypt network traffic.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns1c",
            "answerContent": "To detect and prevent malware infections.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns1d",
            "answerContent": "To increase network bandwidth.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "network-security",
      "questionContent": "<p>What is the difference between symmetric and asymmetric encryption?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-ns2a",
            "answerContent": "Symmetric encryption uses the same key for both encryption and decryption, while asymmetric encryption uses a pair of keys (public and private keys).",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ns2b",
            "answerContent": "Symmetric encryption is more secure than asymmetric encryption.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns2c",
            "answerContent": "Symmetric encryption is slower than asymmetric encryption.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns2d",
            "answerContent": "Symmetric encryption is only used for data at rest.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "network-security",
      "questionContent": "<p>What is a VPN (Virtual Private Network), and how does it enhance network security?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-ns3a",
            "answerContent": "A VPN creates a secure and encrypted connection over a less secure network (like the internet), allowing users to access a private network remotely as if they were directly connected to it.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ns3b",
            "answerContent": "A VPN is used to increase internet speed.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns3c",
            "answerContent": "A VPN is only used for accessing company internal networks.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns3d",
            "answerContent": "A VPN is not relevant for network security.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "network-security",
      "questionContent": "<p>What is a denial-of-service (DoS) attack, and how can it be mitigated?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-ns4a",
            "answerContent": "A DoS attack aims to overload a target system or network with traffic, making it unavailable to legitimate users. Mitigation techniques include firewalls, intrusion detection systems, and traffic filtering.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ns4b",
            "answerContent": "DoS attacks only target websites.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns4c",
            "answerContent": "DoS attacks are easy to prevent.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns4d",
            "answerContent": "DoS attacks are not a serious threat to network security.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "network-security",
      "questionContent": "<p>What is the importance of network security audits and penetration testing?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-ns5a",
            "answerContent": "They help identify and address vulnerabilities in a network's security posture, allowing organizations to proactively mitigate risks and improve their overall security stance.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ns5b",
            "answerContent": "Audits and penetration testing are only necessary for large organizations.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns5c",
            "answerContent": "Audits and penetration testing are time-consuming and expensive and not always necessary.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns5d",
            "answerContent": "Audits and penetration testing only focus on identifying vulnerabilities.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "network-security",
      "questionContent": "<p>What is social engineering, and how can it be used to compromise network security?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-ns6a",
            "answerContent": "Social engineering involves manipulating people into divulging confidential information or performing actions that compromise security. Techniques include phishing, pretexting, and baiting.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ns6b",
            "answerContent": "Social engineering only targets technical vulnerabilities.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns6c",
            "answerContent": "Social engineering is not a significant threat to network security.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns6d",
            "answerContent": "Social engineering is easily preventable.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "network-security",
      questionContent: "<p>What is the purpose of a firewall in network security?</p>",
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        "answers": [
          {
            "key": "mantine-ns1a",
            "answerContent": "To control network traffic by allowing or blocking data packets based on predefined rules.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ns1b",
            "answerContent": "To encrypt network traffic.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns1c",
            "answerContent": "To detect and prevent malware infections.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns1d",
            "answerContent": "To increase network bandwidth.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "network-security",
      "questionContent": "<p>What is the difference between symmetric and asymmetric encryption?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-ns2a",
            "answerContent": "Symmetric encryption uses the same key for both encryption and decryption, while asymmetric encryption uses a pair of keys (public and private keys).",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ns2b",
            "answerContent": "Symmetric encryption is more secure than asymmetric encryption.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns2c",
            "answerContent": "Symmetric encryption is slower than asymmetric encryption.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns2d",
            "answerContent": "Symmetric encryption is only used for data at rest.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "network-security",
      "questionContent": "<p>What is a VPN (Virtual Private Network), and how does it enhance network security?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-ns3a",
            "answerContent": "A VPN creates a secure and encrypted connection over a less secure network (like the internet), allowing users to access a private network remotely as if they were directly connected to it.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ns3b",
            "answerContent": "A VPN is used to increase internet speed.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns3c",
            "answerContent": "A VPN is only used for accessing company internal networks.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns3d",
            "answerContent": "A VPN is not relevant for network security.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "network-security",
      "questionContent": "<p>What is a denial-of-service (DoS) attack, and how can it be mitigated?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-ns4a",
            "answerContent": "A DoS attack aims to overload a target system or network with traffic, making it unavailable to legitimate users. Mitigation techniques include firewalls, intrusion detection systems, and traffic filtering.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ns4b",
            "answerContent": "DoS attacks only target websites.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns4c",
            "answerContent": "DoS attacks are easy to prevent.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns4d",
            "answerContent": "DoS attacks are not a serious threat to network security.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "network-security",
      "questionContent": "<p>What is the importance of network security audits and penetration testing?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-ns5a",
            "answerContent": "They help identify and address vulnerabilities in a network's security posture, allowing organizations to proactively mitigate risks and improve their overall security stance.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ns5b",
            "answerContent": "Audits and penetration testing are only necessary for large organizations.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns5c",
            "answerContent": "Audits and penetration testing are time-consuming and expensive and not always necessary.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns5d",
            "answerContent": "Audits and penetration testing only focus on identifying vulnerabilities.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "network-security",
      "questionContent": "<p>What is social engineering, and how can it be used to compromise network security?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-ns6a",
            "answerContent": "Social engineering involves manipulating people into divulging confidential information or performing actions that compromise security. Techniques include phishing, pretexting, and baiting.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ns6b",
            "answerContent": "Social engineering only targets technical vulnerabilities.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns6c",
            "answerContent": "Social engineering is not a significant threat to network security.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns6d",
            "answerContent": "Social engineering is easily preventable.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "network-security",
      questionContent: "<p>What is the purpose of a firewall in network security?</p>",
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        "answers": [
          {
            "key": "mantine-ns1a",
            "answerContent": "To control network traffic by allowing or blocking data packets based on predefined rules.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ns1b",
            "answerContent": "To encrypt network traffic.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns1c",
            "answerContent": "To detect and prevent malware infections.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns1d",
            "answerContent": "To increase network bandwidth.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "network-security",
      "questionContent": "<p>What is the difference between symmetric and asymmetric encryption?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-ns2a",
            "answerContent": "Symmetric encryption uses the same key for both encryption and decryption, while asymmetric encryption uses a pair of keys (public and private keys).",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ns2b",
            "answerContent": "Symmetric encryption is more secure than asymmetric encryption.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns2c",
            "answerContent": "Symmetric encryption is slower than asymmetric encryption.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns2d",
            "answerContent": "Symmetric encryption is only used for data at rest.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "network-security",
      "questionContent": "<p>What is a VPN (Virtual Private Network), and how does it enhance network security?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-ns3a",
            "answerContent": "A VPN creates a secure and encrypted connection over a less secure network (like the internet), allowing users to access a private network remotely as if they were directly connected to it.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ns3b",
            "answerContent": "A VPN is used to increase internet speed.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns3c",
            "answerContent": "A VPN is only used for accessing company internal networks.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns3d",
            "answerContent": "A VPN is not relevant for network security.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "network-security",
      "questionContent": "<p>What is a denial-of-service (DoS) attack, and how can it be mitigated?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-ns4a",
            "answerContent": "A DoS attack aims to overload a target system or network with traffic, making it unavailable to legitimate users. Mitigation techniques include firewalls, intrusion detection systems, and traffic filtering.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ns4b",
            "answerContent": "DoS attacks only target websites.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns4c",
            "answerContent": "DoS attacks are easy to prevent.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns4d",
            "answerContent": "DoS attacks are not a serious threat to network security.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "network-security",
      "questionContent": "<p>What is the importance of network security audits and penetration testing?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-ns5a",
            "answerContent": "They help identify and address vulnerabilities in a network's security posture, allowing organizations to proactively mitigate risks and improve their overall security stance.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ns5b",
            "answerContent": "Audits and penetration testing are only necessary for large organizations.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns5c",
            "answerContent": "Audits and penetration testing are time-consuming and expensive and not always necessary.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns5d",
            "answerContent": "Audits and penetration testing only focus on identifying vulnerabilities.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "network-security",
      "questionContent": "<p>What is social engineering, and how can it be used to compromise network security?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-ns6a",
            "answerContent": "Social engineering involves manipulating people into divulging confidential information or performing actions that compromise security. Techniques include phishing, pretexting, and baiting.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-ns6b",
            "answerContent": "Social engineering only targets technical vulnerabilities.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns6c",
            "answerContent": "Social engineering is not a significant threat to network security.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-ns6d",
            "answerContent": "Social engineering is easily preventable.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "quantum-computing",
      questionContent: "<p>What is a qubit, and how does it differ from a classical bit?</p>",
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        "answers": [
          {
            "key": "mantine-qc1a",
            "answerContent": "A qubit is the fundamental unit of information in quantum computing, capable of representing both 0 and 1 simultaneously due to superposition. Classical bits can only represent 0 or 1.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-qc1b",
            "answerContent": "Qubits are faster than classical bits.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-qc1c",
            "answerContent": "Qubits are easier to manipulate than classical bits.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-qc1d",
            "answerContent": "Qubits and classical bits are essentially the same.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "quantum-computing",
      "questionContent": "<p>Explain the concept of quantum superposition.</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-qc2a",
            "answerContent": "Superposition is a fundamental principle of quantum mechanics where a qubit can exist in a combination of both the 0 and 1 states simultaneously until measured.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-qc2b",
            "answerContent": "Superposition is a type of quantum algorithm.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-qc2c",
            "answerContent": "Superposition only applies to classical bits.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-qc2d",
            "answerContent": "Superposition is the same as entanglement.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "quantum-computing",
      "questionContent": "<p>Explain the concept of quantum entanglement.</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-qc3a",
            "answerContent": "Entanglement is a phenomenon where two or more qubits become linked, such that the state of one qubit is instantly correlated with the state of the other(s), regardless of the distance between them.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-qc3b",
            "answerContent": "Entanglement is only a theoretical concept.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-qc3c",
            "answerContent": "Entanglement is only relevant for classical computers.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-qc3d",
            "answerContent": "Entanglement allows for faster-than-light communication.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "quantum-computing",
      "questionContent": "<p>What are some potential applications of quantum computing?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-qc4a",
            "answerContent": "Drug discovery, materials science, financial modeling, cryptography, and artificial intelligence.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-qc4b",
            "answerContent": "Only for breaking encryption codes.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-qc4c",
            "answerContent": "Quantum computers have no practical applications yet.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-qc4d",
            "answerContent": "Only for academic research.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "quantum-computing",
      "questionContent": "<p>What are some of the challenges facing the development of quantum computers?</p>",
      "questionDifficulty": QuestionDifficulty.Hard,
      questionData: {
        "answers": [
          {
            "key": "mantine-qc5a",
            "answerContent": "Maintaining qubit coherence, minimizing errors, and building scalable and reliable quantum hardware.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-qc5b",
            "answerContent": "There are no significant challenges facing the development of quantum computers.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-qc5c",
            "answerContent": "Quantum computers are already widely available and commercially viable.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-qc5d",
            "answerContent": "The main challenge is the lack of software for quantum computers.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "quantum-computing",
      "questionContent": "<p>Explain the concept of quantum supremacy.</p>",
      "questionDifficulty": QuestionDifficulty.Hard,
      questionData: {
        "answers": [
          {
            "key": "mantine-qc6a",
            "answerContent": "Quantum supremacy refers to the point at which a quantum computer can perform a task that is beyond the capabilities of the most powerful classical supercomputers.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-qc6b",
            "answerContent": "Quantum supremacy means that quantum computers are superior to classical computers in all tasks.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-qc6c",
            "answerContent": "Quantum supremacy has already been achieved by all major tech companies.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-qc6d",
            "answerContent": "Quantum supremacy is a theoretical concept that will never be achieved in practice.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "quantum-computing",
      "questionContent": "<p>How does quantum entanglement enable faster computations?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-qc2a",
            "answerContent": "Entanglement allows qubits to be processed simultaneously, leading to significant speedups for certain algorithms.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-qc2b",
            "answerContent": "Entanglement directly increases the processing speed of individual qubits.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-qc2c",
            "answerContent": "Entanglement has no direct impact on computational speed.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-qc2d",
            "answerContent": "Entanglement primarily improves the accuracy of quantum computations.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "quantum-computing",
      "questionContent": "<p>What is the significance of Shor's algorithm in the context of quantum computing?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-qc3a",
            "answerContent": "Shor's algorithm can efficiently factor large numbers, which could potentially break many of the encryption methods currently used to secure data.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-qc3b",
            "answerContent": "Shor's algorithm is primarily used for solving linear equations.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-qc3c",
            "answerContent": "Shor's algorithm is not considered a significant breakthrough in quantum computing.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-qc3d",
            "answerContent": "Shor's algorithm has no practical applications yet.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "quantum-computing",
      "questionContent": "<p>What is the difference between a classical computer and a quantum computer in terms of how they process information?</p>",
      "questionDifficulty": "Medium",
      questionData: {
        "answers": [
          {
            "key": "mantine-qc4a",
            "answerContent": "Classical computers use bits to represent information as 0s and 1s, while quantum computers use qubits, which can represent 0, 1, or a superposition of both.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-qc4b",
            "answerContent": "Classical computers are faster than quantum computers.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-qc4c",
            "answerContent": "Classical computers use electricity, while quantum computers use light.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-qc4d",
            "answerContent": "There is no fundamental difference in how they process information.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "quantum-computing",
      "questionContent": "<p>What is meant by 'decoherence' in the context of quantum computing?</p>",
      "questionDifficulty": "Hard",
      questionData: {
        "answers": [
          {
            "key": "mantine-qc5a",
            "answerContent": "Decoherence is the loss of quantum properties, such as superposition and entanglement, due to interactions with the environment.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-qc5b",
            "answerContent": "Decoherence is a process that increases the power of quantum computers.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-qc5c",
            "answerContent": "Decoherence is a theoretical concept with no practical significance.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-qc5d",
            "answerContent": "Decoherence is a type of quantum algorithm.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "quantum-computing",
      "questionContent": "<p>How does quantum computing have the potential to revolutionize drug discovery?</p>",
      "questionDifficulty": "Medium",
      questionData: {
        "answers": [
          {
            "key": "mantine-qc6a",
            "answerContent": "Quantum computers can simulate molecular interactions with unprecedented accuracy, enabling faster and more efficient design of new drugs and materials.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-qc6b",
            "answerContent": "Quantum computers will directly synthesize new drugs.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-qc6c",
            "answerContent": "Quantum computing has no significant potential for drug discovery.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-qc6d",
            "answerContent": "Quantum computers will replace traditional drug discovery methods entirely.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "software-architecture",
      questionContent: "<p>What is the difference between software architecture and software design?</p>",
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-sa1a",
            "answerContent": "Software architecture focuses on high-level design decisions that impact the overall structure of the system, while software design involves detailed specifications of components, modules, and their interactions.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-sa1b",
            "answerContent": "There is no significant difference between software architecture and software design.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa1c",
            "answerContent": "Software architecture is concerned with the implementation details, while software design is concerned with the overall system goals.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa1d",
            "answerContent": "Software architecture is only relevant for large, complex systems.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "software-architecture",
      "questionContent": "<p>What are some common architectural patterns used in software development (e.g., MVC, microservices)?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-sa2a",
            "answerContent": "MVC (Model-View-Controller), microservices, client-server, layered architecture, event-driven architecture.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-sa2b",
            "answerContent": "There are only a few common architectural patterns.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa2c",
            "answerContent": "Architectural patterns are not relevant to modern software development.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa2d",
            "answerContent": "All software systems should use the same architectural pattern.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "software-architecture",
      "questionContent": "<p>Explain the concept of modularity in software architecture and its benefits.</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-sa3a",
            "answerContent": "Modularity involves breaking down a complex system into smaller, independent modules. Benefits include improved maintainability, reusability, and testability.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-sa3b",
            "answerContent": "Modularity always leads to increased performance.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa3c",
            "answerContent": "Modular systems are always more complex to develop.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa3d",
            "answerContent": "Modularity is only applicable to large software systems.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "software-architecture",
      "questionContent": "<p>What is the significance of scalability in software architecture?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-sa4a",
            "answerContent": "Scalability refers to the ability of a system to handle increasing workloads or data volumes without significant performance degradation. It is crucial for systems that need to accommodate growth in user base or data volume.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-sa4b",
            "answerContent": "Scalability is only important for web applications.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa4c",
            "answerContent": "Scalability is not a concern for modern software systems.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa4d",
            "answerContent": "Scalability is only achieved through increased hardware resources.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "software-architecture",
      "questionContent": "<p>Explain the concept of loose coupling in software architecture.</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-sa5a",
            "answerContent": "Loose coupling refers to a design principle where components of a system have minimal dependencies on each other, making them easier to change or replace independently.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-sa5b",
            "answerContent": "Loose coupling always leads to increased performance.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa5c",
            "answerContent": "Loose coupling is not desirable in most software systems.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa5d",
            "answerContent": "Loose coupling is only applicable to microservices architectures.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "software-architecture",
      "questionContent": "<p>What is the role of design patterns in software architecture?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-sa6a",
            "answerContent": "Design patterns provide reusable solutions to common software design problems, improving code readability, maintainability, and flexibility.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-sa6b",
            "answerContent": "Design patterns are only used for graphical user interfaces.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa6c",
            "answerContent": "Design patterns are not relevant to software architecture.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa6d",
            "answerContent": "Design patterns should be used in every part of a software system.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "software-architecture",
      questionContent: "<p>What is the difference between software architecture and software design?</p>",
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-sa1a",
            "answerContent": "Software architecture focuses on high-level design decisions that impact the overall structure of the system, while software design involves detailed specifications of components, modules, and their interactions.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-sa1b",
            "answerContent": "There is no significant difference between software architecture and software design.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa1c",
            "answerContent": "Software architecture is concerned with the implementation details, while software design is concerned with the overall system goals.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa1d",
            "answerContent": "Software architecture is only relevant for large, complex systems.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "software-architecture",
      "questionContent": "<p>What are some common architectural patterns used in software development (e.g., MVC, microservices)?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-sa2a",
            "answerContent": "MVC (Model-View-Controller), microservices, client-server, layered architecture, event-driven architecture.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-sa2b",
            "answerContent": "There are only a few common architectural patterns.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa2c",
            "answerContent": "Architectural patterns are not relevant to modern software development.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa2d",
            "answerContent": "All software systems should use the same architectural pattern.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "software-architecture",
      "questionContent": "<p>Explain the concept of modularity in software architecture and its benefits.</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-sa3a",
            "answerContent": "Modularity involves breaking down a complex system into smaller, independent modules. Benefits include improved maintainability, reusability, and testability.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-sa3b",
            "answerContent": "Modularity always leads to increased performance.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa3c",
            "answerContent": "Modular systems are always more complex to develop.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa3d",
            "answerContent": "Modularity is only applicable to large software systems.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "software-architecture",
      "questionContent": "<p>What is the significance of scalability in software architecture?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-sa4a",
            "answerContent": "Scalability refers to the ability of a system to handle increasing workloads or data volumes without significant performance degradation. It is crucial for systems that need to accommodate growth in user base or data volume.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-sa4b",
            "answerContent": "Scalability is only important for web applications.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa4c",
            "answerContent": "Scalability is not a concern for modern software systems.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa4d",
            "answerContent": "Scalability is only achieved through increased hardware resources.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "software-architecture",
      "questionContent": "<p>Explain the concept of loose coupling in software architecture.</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-sa5a",
            "answerContent": "Loose coupling refers to a design principle where components of a system have minimal dependencies on each other, making them easier to change or replace independently.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-sa5b",
            "answerContent": "Loose coupling always leads to increased performance.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa5c",
            "answerContent": "Loose coupling is not desirable in most software systems.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa5d",
            "answerContent": "Loose coupling is only applicable to microservices architectures.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "software-architecture",
      "questionContent": "<p>What is the role of design patterns in software architecture?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-sa6a",
            "answerContent": "Design patterns provide reusable solutions to common software design problems, improving code readability, maintainability, and flexibility.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-sa6b",
            "answerContent": "Design patterns are only used for graphical user interfaces.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa6c",
            "answerContent": "Design patterns are not relevant to software architecture.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa6d",
            "answerContent": "Design patterns should be used in every part of a software system.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "software-architecture",
      questionContent: "<p>What is the difference between software architecture and software design?</p>",
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-sa1a",
            "answerContent": "Software architecture focuses on high-level design decisions that impact the overall structure of the system, while software design involves detailed specifications of components, modules, and their interactions.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-sa1b",
            "answerContent": "There is no significant difference between software architecture and software design.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa1c",
            "answerContent": "Software architecture is concerned with the implementation details, while software design is concerned with the overall system goals.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa1d",
            "answerContent": "Software architecture is only relevant for large, complex systems.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "software-architecture",
      "questionContent": "<p>What are some common architectural patterns used in software development (e.g., MVC, microservices)?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-sa2a",
            "answerContent": "MVC (Model-View-Controller), microservices, client-server, layered architecture, event-driven architecture.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-sa2b",
            "answerContent": "There are only a few common architectural patterns.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa2c",
            "answerContent": "Architectural patterns are not relevant to modern software development.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa2d",
            "answerContent": "All software systems should use the same architectural pattern.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "software-architecture",
      "questionContent": "<p>Explain the concept of modularity in software architecture and its benefits.</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-sa3a",
            "answerContent": "Modularity involves breaking down a complex system into smaller, independent modules. Benefits include improved maintainability, reusability, and testability.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-sa3b",
            "answerContent": "Modularity always leads to increased performance.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa3c",
            "answerContent": "Modular systems are always more complex to develop.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa3d",
            "answerContent": "Modularity is only applicable to large software systems.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "software-architecture",
      "questionContent": "<p>What is the significance of scalability in software architecture?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-sa4a",
            "answerContent": "Scalability refers to the ability of a system to handle increasing workloads or data volumes without significant performance degradation. It is crucial for systems that need to accommodate growth in user base or data volume.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-sa4b",
            "answerContent": "Scalability is only important for web applications.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa4c",
            "answerContent": "Scalability is not a concern for modern software systems.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa4d",
            "answerContent": "Scalability is only achieved through increased hardware resources.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "software-architecture",
      "questionContent": "<p>Explain the concept of loose coupling in software architecture.</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-sa5a",
            "answerContent": "Loose coupling refers to a design principle where components of a system have minimal dependencies on each other, making them easier to change or replace independently.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-sa5b",
            "answerContent": "Loose coupling always leads to increased performance.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa5c",
            "answerContent": "Loose coupling is not desirable in most software systems.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa5d",
            "answerContent": "Loose coupling is only applicable to microservices architectures.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      variationId: 1,
      topicSlug: "software-architecture",
      "questionContent": "<p>What is the role of design patterns in software architecture?</p>",
      "questionDifficulty": QuestionDifficulty.Medium,
      questionData: {
        "answers": [
          {
            "key": "mantine-sa6a",
            "answerContent": "Design patterns provide reusable solutions to common software design problems, improving code readability, maintainability, and flexibility.",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-sa6b",
            "answerContent": "Design patterns are only used for graphical user interfaces.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa6c",
            "answerContent": "Design patterns are not relevant to software architecture.",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-sa6d",
            "answerContent": "Design patterns should be used in every part of a software system.",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
  ]