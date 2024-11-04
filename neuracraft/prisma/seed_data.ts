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
    course: { connect: { courseSlug: "intro-to-web-dev" } },
    postType: PostType.Content,
    user: { connect: { email: "user1@example.com" } },
  },
  {
    title: "Best resources for learning machine learning",
    message: "I'm looking for good online resources to start learning machine learning. Any recommendations?",
    course: { connect: { courseSlug: "advanced-algorithms" } },
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
  {
    topicSlug: "mobile-security",
    topicName: "Mobile Security Best Practices",
    topicLevel: Level.Intermediate,
    topicPrior: 0.305,
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
      moduleCode: "CS1010",
      moduleTitle: "Introduction to Programming",
      week: 1,
      studio: 1,
      courseSlug: "basic-syntax",
      courseName: "Basic Syntax and Semantics",
      courseDescription:
        "Learn the basic syntax and semantics of programming languages, focusing on variables, data types, and control structures.",
      courseImage: "courses/basic-syntax.jpg",
      courseLevel: Level.Foundational,
      type: CourseType.Content,
      video:
        '<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/XYv9ZtE2z2E?showinfo=0"></iframe>',
      topics: ["software-engineering"],
      courseMedia: [
        {
          publicId: "neuracraft/course_slides_media/w1s1-basic-syntax",
          courseSlug: "basic-syntax",
          courseMediaURL:
            "https://res.cloudinary.com/dy2tqc45y/image/upload/v1666007595/neuracraft/course_slides_media/w1s1-basic-syntax.pdf",
          mediaName: "Basic Syntax and Semantics",
        },
      ],
    },
    {
      moduleCode: "CS1011",
      moduleTitle: "Introduction to Programming",
      week: 1,
      studio: 2,
      courseSlug: "control-structures",
      courseName: "Control Structures in Programming",
      courseDescription:
        "Explore control structures such as loops and conditional statements, which are essential for decision-making in programming.",
      courseImage: "courses/control-structures.jpg",
      courseLevel: Level.Foundational,
      type: CourseType.Content,
      video:
        '<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/DfC2hC6T8_U?showinfo=0"></iframe>',
      topics: ["software-engineering", "algorithms", "data-structures"],
      courseMedia: [
        {
          publicId: "neuracraft/course_slides_media/w1s2-control-structures",
          courseSlug: "control-structures",
          courseMediaURL:
            "https://res.cloudinary.com/dy2tqc45y/image/upload/v1666007594/neuracraft/course_slides_media/w1s2-control-structures.pdf",
          mediaName: "Control Structures in Programming",
        },
      ],
    },
    {
      moduleCode: "CS1012",
      moduleTitle: "Introduction to Programming",
      week: 1,
      studio: 3,
      courseSlug: "error-handling",
      courseName: "Error Handling Techniques",
      courseDescription:
        "Learn about error handling techniques to manage exceptions and create robust applications.",
      courseImage: "courses/error-handling.jpg",
      courseLevel: Level.Foundational,
      type: CourseType.Content,
      video:
        '<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/6DgOrqI6z8s?showinfo=0"></iframe>',
      topics: ["software-engineering"],
      courseMedia: [
        {
          publicId: "neuracraft/course_slides_media/w1s3-error-handling",
          courseSlug: "error-handling",
          courseMediaURL:
            "https://res.cloudinary.com/dy2tqc45y/image/upload/v1666007593/neuracraft/course_slides_media/w1s3-error-handling.pdf",
          mediaName: "Error Handling Techniques",
        },
      ],
    },
    {
      moduleCode: "CS1013",
      moduleTitle: "Introduction to Programming",
      week: 1,
      studio: 4,
      courseSlug: "data-structures-introduction",
      courseName: "Introduction to Data Structures",
      courseDescription:
        "Get introduced to basic data structures such as arrays, lists, and dictionaries, and their applications.",
      courseImage: "courses/data-structures-introduction.jpg",
      courseLevel: Level.Foundational,
      type: CourseType.Content,
      video:
        '<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/NL0HQmHMx5E?showinfo=0"></iframe>',
      topics: ["data-structures"],
      courseMedia: [
        {
          publicId: "neuracraft/course_slides_media/w1s4-data-structures-introduction",
          courseSlug: "data-structures-introduction",
          courseMediaURL:
            "https://res.cloudinary.com/dy2tqc45y/image/upload/v1666007592/neuracraft/course_slides_media/w1s4-data-structures-introduction.pdf",
          mediaName: "Introduction to Data Structures",
        },
      ],
    },

    // Intermediate Level Courses
    {
      moduleCode: "CS1020",
      moduleTitle: "Data Structures and Algorithms",
      week: 2,
      studio: 1,
      courseSlug: "searching-sorting-algorithms",
      courseName: "Searching and Sorting Algorithms",
      courseDescription:
        "Explore various searching and sorting algorithms and their time and space complexity.",
      courseImage: "courses/searching-sorting.jpg",
      courseLevel: Level.Intermediate,
      type: CourseType.Content,
      video:
        '<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/qwY7qGWAJQ4?showinfo=0"></iframe>',
      topics: ["algorithms", "data-structures"],
      courseMedia: [
        {
          publicId: "neuracraft/course_slides_media/w2s1-searching-sorting-algorithms",
          courseSlug: "searching-sorting-algorithms",
          courseMediaURL:
            "https://res.cloudinary.com/dy2tqc45y/image/upload/v1666007591/neuracraft/course_slides_media/w2s1-searching-sorting-algorithms.pdf",
          mediaName: "Searching and Sorting Algorithms",
        },
      ],
    },
    {
      moduleCode: "CS1021",
      moduleTitle: "Data Structures and Algorithms",
      week: 2,
      studio: 2,
      courseSlug: "advanced-data-structures",
      courseName: "Advanced Data Structures",
      courseDescription:
        "Dive deeper into advanced data structures like trees, graphs, and hash tables, and their applications.",
      courseImage: "courses/advanced-data-structures.jpg",
      courseLevel: Level.Intermediate,
      type: CourseType.Content,
      video:
        '<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/Ovm6WLY_UcY?showinfo=0"></iframe>',
      topics: ["data-structures", "algorithms", "software-engineering"],
      courseMedia: [
        {
          publicId: "neuracraft/course_slides_media/w2s2-advanced-data-structures",
          courseSlug: "advanced-data-structures",
          courseMediaURL:
            "https://res.cloudinary.com/dy2tqc45y/image/upload/v1666007590/neuracraft/course_slides_media/w2s2-advanced-data-structures.pdf",
          mediaName: "Advanced Data Structures",
        },
      ],
    },
    {
      moduleCode: "CS1022",
      moduleTitle: "Data Structures and Algorithms",
      week: 2,
      studio: 3,
      courseSlug: "algorithm-analysis",
      courseName: "Algorithm Analysis Techniques",
      courseDescription:
        "Learn various techniques for analyzing algorithms, including Big O notation and performance measurement.",
      courseImage: "courses/algorithm-analysis.jpg",
      courseLevel: Level.Intermediate,
      type: CourseType.Content,
      video:
        '<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/ZC8ErM4VPTU?showinfo=0"></iframe>',
      topics: ["algorithms", "data-structures"],
      courseMedia: [
        {
          publicId: "neuracraft/course_slides_media/w2s3-algorithm-analysis",
          courseSlug: "algorithm-analysis",
          courseMediaURL:
            "https://res.cloudinary.com/dy2tqc45y/image/upload/v1666007589/neuracraft/course_slides_media/w2s3-algorithm-analysis.pdf",
          mediaName: "Algorithm Analysis Techniques",
        },
      ],
    },
    {
      moduleCode: "CS1023",
      moduleTitle: "Data Structures and Algorithms",
      week: 2,
      studio: 4,
      courseSlug: "dynamic-programming",
      courseName: "Dynamic Programming",
      courseDescription:
        "Explore dynamic programming concepts, techniques, and how they can optimize recursive algorithms.",
      courseImage: "courses/dynamic-programming.jpg",
      courseLevel: Level.Intermediate,
      type: CourseType.Content,
      video:
        '<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/oBt53YbR9Kk?showinfo=0"></iframe>',
      topics: ["algorithms", "data-structures"],
      courseMedia: [
        {
          publicId: "neuracraft/course_slides_media/w2s4-dynamic-programming",
          courseSlug: "dynamic-programming",
          courseMediaURL:
            "https://res.cloudinary.com/dy2tqc45y/image/upload/v1666007588/neuracraft/course_slides_media/w2s4-dynamic-programming.pdf",
          mediaName: "Dynamic Programming",
        },
      ],
    },

    // Advanced Level Courses
    {
      moduleCode: "CS2010",
      moduleTitle: "Web Development",
      week: 3,
      studio: 1,
      courseSlug: "html-css",
      courseName: "HTML and CSS Basics",
      courseDescription:
        "Understand the basics of HTML and CSS for web development, including structure and styling.",
      courseImage: "courses/html-css.jpg",
      courseLevel: Level.Foundational,
      type: CourseType.Content,
      video:
        '<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/UB1O30fR-EE?showinfo=0"></iframe>',
      topics: ["web-development", "software-engineering"],
      courseMedia: [
        {
          publicId: "neuracraft/course_slides_media/w3s1-html-css",
          courseSlug: "html-css",
          courseMediaURL:
            "https://res.cloudinary.com/dy2tqc45y/image/upload/v1666007587/neuracraft/course_slides_media/w3s1-html-css.pdf",
          mediaName: "HTML and CSS Basics",
        },
      ],
    },
    {
      moduleCode: "CS2011",
      moduleTitle: "Web Development",
      week: 3,
      studio: 2,
      courseSlug: "javascript-introduction",
      courseName: "Introduction to JavaScript",
      courseDescription:
        "Get introduced to JavaScript, covering its syntax, data types, and basic programming concepts.",
      courseImage: "courses/javascript-introduction.jpg",
      courseLevel: Level.Foundational,
      type: CourseType.Content,
      video:
        '<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/W6NZfCO5SIk?showinfo=0"></iframe>',
      topics: ["web-development", "software-engineering"],
      courseMedia: [
        {
          publicId: "neuracraft/course_slides_media/w3s2-javascript-introduction",
          courseSlug: "javascript-introduction",
          courseMediaURL:
            "https://res.cloudinary.com/dy2tqc45y/image/upload/v1666007586/neuracraft/course_slides_media/w3s2-javascript-introduction.pdf",
          mediaName: "Introduction to JavaScript",
        },
      ],
    },
    {
      moduleCode: "CS2012",
      moduleTitle: "Web Development",
      week: 3,
      studio: 3,
      courseSlug: "web-development-frameworks",
      courseName: "Popular Web Development Frameworks",
      courseDescription:
        "Explore popular web development frameworks such as React, Angular, and Vue.js.",
      courseImage: "courses/web-development-frameworks.jpg",
      courseLevel: Level.Intermediate,
      type: CourseType.Content,
      video:
        '<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/Jn3A4G0F1c8?showinfo=0"></iframe>',
      topics: ["web-development", "software-engineering"],
      courseMedia: [
        {
          publicId: "neuracraft/course_slides_media/w3s3-web-development-frameworks",
          courseSlug: "web-development-frameworks",
          courseMediaURL:
            "https://res.cloudinary.com/dy2tqc45y/image/upload/v1666007585/neuracraft/course_slides_media/w3s3-web-development-frameworks.pdf",
          mediaName: "Popular Web Development Frameworks",
        },
      ],
    },
    {
      moduleCode: "CS2013",
      moduleTitle: "Web Development",
      week: 3,
      studio: 4,
      courseSlug: "backend-development",
      courseName: "Backend Development Basics",
      courseDescription:
        "Understand the basics of backend development, including server, database, and API integration.",
      courseImage: "courses/backend-development.jpg",
      courseLevel: Level.Intermediate,
      type: CourseType.Content,
      video:
        '<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/0sWQfEv_EqU?showinfo=0"></iframe>',
      topics: ["web-development", "software-engineering"],
      courseMedia: [
        {
          publicId: "neuracraft/course_slides_media/w3s4-backend-development",
          courseSlug: "backend-development",
          courseMediaURL:
            "https://res.cloudinary.com/dy2tqc45y/image/upload/v1666007584/neuracraft/course_slides_media/w3s4-backend-development.pdf",
          mediaName: "Backend Development Basics",
        },
      ],
    },
  ];

export const Questions: {
  questionId: number;
  variationId: number;
  topicSlug: string;
  questionTitle: string;
  questionDifficulty: QuestionDifficulty;
  questionContent: string;
  questionData?: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue;
}[] = [
    {
      questionId: 1,
      variationId: 1,
      topicSlug: "data-structures",
      questionTitle: "AY2122-CS-Q1-V1",
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
      questionId: 2,
      variationId: 1,
      topicSlug: "data-structures",
      questionTitle: "AY2122-CS-Q2-V2",
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
      questionId: 3,
      variationId: 1,
      topicSlug: "algorithms",
      questionTitle: "AY2122-CS-Q3-V3",
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
      questionId: 4,
      variationId: 1,
      topicSlug: "object-oriented-programming",
      questionTitle: "AY2122-CS-Q4-V4",
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
      questionId: 5,
      variationId: 1,
      topicSlug: "operating-systems",
      questionTitle: "AY2122-CS-Q5-V5",
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
      questionId: 6,
      variationId: 1,
      topicSlug: "web-development",
      questionTitle: "AY2122-CS-Q6-V1",
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
      questionId: 7,
      variationId: 1,
      topicSlug: "algorithms",
      questionTitle: "AY2122-CS-Q7-V1",
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
      questionId: 8,
      variationId: 1,
      topicSlug: "database-systems",
      questionTitle: "AY2122-CS-Q8-V1",
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
      questionId: 9,
      variationId: 1,
      topicSlug: "software-engineering",
      questionTitle: "AY2122-CS-Q9-V1",
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
      questionId: 10,
      variationId: 1,
      topicSlug: "operating-systems",
      questionTitle: "AY2122-CS-Q10-V1",
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
      questionId: 11,
      variationId: 1,
      topicSlug: "networking",
      questionTitle: "AY2122-CS-Q11-V1",
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
      questionId: 12,
      variationId: 1,
      topicSlug: "machine-learning",
      questionTitle: "AY2122-CS-Q12-V1",
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
      questionId: 13,
      variationId: 1,
      topicSlug: "cloud-computing",
      questionTitle: "AY2122-CS-Q13-V1",
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
      questionId: 14,
      variationId: 1,
      topicSlug: "cybersecurity",
      questionTitle: "AY2122-CS-Q14-V1",
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
      questionId: 15,
      variationId: 1,
      topicSlug: "mobile-development",
      questionTitle: "AY2122-CS-Q15-V1",
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
      questionId: 16,
      variationId: 1,
      topicSlug: "data-analytics",
      questionTitle: "AY2122-CS-Q16-V1",
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
      questionId: 17,
      variationId: 1,
      topicSlug: "software-testing",
      questionTitle: "AY2122-CS-Q17-V1",
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
      questionId: 18,
      variationId: 1,
      topicSlug: "devops",
      questionTitle: "AY2122-CS-Q18-V1",
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
      questionId: 19,
      variationId: 1,
      topicSlug: "design-patterns",
      questionTitle: "AY2122-CS-Q19-V1",
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
      questionId: 20,
      variationId: 1,
      topicSlug: "algorithms-optimization",
      questionTitle: "AY2122-CS-Q20-V1",
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
      questionId: 21,
      variationId: 1,
      topicSlug: "distributed-systems",
      questionTitle: "AY2122-CS-Q21-V1",
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
      questionId: 22,
      variationId: 1,
      topicSlug: "artificial-intelligence",
      questionTitle: "AY2122-CS-Q22-V1",
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
      questionId: 23,
      variationId: 1,
      topicSlug: "network-security",
      questionTitle: "AY2122-CS-Q23-V1",
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
      questionId: 24,
      variationId: 1,
      topicSlug: "algorithms",
      questionTitle: "AY2324-CS-Q24-V1",
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
      questionId: 25,
      variationId: 1,
      topicSlug: "database-systems",
      questionTitle: "AY2324-CS-Q25-V1",
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
      questionId: 26,
      variationId: 1,
      topicSlug: "operating-systems",
      questionTitle: "AY2324-CS-Q26-V1",
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
      questionId: 27,
      variationId: 1,
      topicSlug: "networking",
      questionTitle: "AY2324-CS-Q27-V1",
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
      questionId: 28,
      variationId: 1,
      topicSlug: "software-engineering",
      questionTitle: "AY2324-CS-Q28-V1",
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
      questionId: 29,
      variationId: 1,
      topicSlug: "cybersecurity",
      questionTitle: "AY2324-CS-Q29-V1",
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
      questionId: 30,
      variationId: 1,
      topicSlug: "machine-learning",
      questionTitle: "AY2324-CS-Q30-V1",
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
      questionId: 31,
      variationId: 1,
      topicSlug: "web-development",
      questionTitle: "AY2324-CS-Q31-V1",
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
      questionId: 32,
      variationId: 1,
      topicSlug: "object-oriented-programming",
      questionTitle: "AY2324-CS-Q32-V1",
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
      questionId: 33,
      variationId: 1,
      topicSlug: "cloud-computing",
      questionTitle: "AY2324-CS-Q33-V1",
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
      questionId: 34,
      variationId: 1,
      topicSlug: "distributed-systems",
      questionTitle: "AY2324-CS-Q34-V1",
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
      questionId: 35,
      variationId: 1,
      topicSlug: "artificial-intelligence",
      questionTitle: "AY2324-CS-Q35-V1",
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
      questionId: 36,
      variationId: 1,
      topicSlug: "devops",
      questionTitle: "AY2324-CS-Q36-V1",
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
      questionId: 37,
      variationId: 1,
      topicSlug: "blockchain",
      questionTitle: "AY2324-CS-Q37-V1",
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
      questionId: 38,
      variationId: 1,
      topicSlug: "data-analytics",
      questionTitle: "AY2324-CS-Q38-V1",
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
      questionId: 39,
      variationId: 1,
      topicSlug: "software-testing",
      questionTitle: "AY2324-CS-Q39-V1",
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
      questionId: 40,
      variationId: 1,
      topicSlug: "design-patterns",
      questionTitle: "AY2324-CS-Q40-V1",
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
      questionId: 41,
      variationId: 1,
      topicSlug: "mobile-security",
      questionTitle: "AY2324-CS-Q41-V1",
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
      questionId: 42,
      variationId: 1,
      topicSlug: "data-structures",
      questionTitle: "AY2324-CS-Q42-V1",
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
      questionId: 43,
      variationId: 1,
      topicSlug: "algorithms",
      questionTitle: "AY2324-CS-Q43-V1",
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
      questionId: 44,
      variationId: 1,
      topicSlug: "database-systems",
      questionTitle: "AY2324-CS-Q44-V1",
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
      questionId: 45,
      variationId: 1,
      topicSlug: "operating-systems",
      questionTitle: "AY2324-CS-Q45-V1",
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
      questionId: 46,
      variationId: 1,
      topicSlug: "networking",
      questionTitle: "AY2324-CS-Q46-V1",
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
      questionId: 47,
      variationId: 1,
      topicSlug: "software-engineering",
      questionTitle: "AY2324-CS-Q47-V1",
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
      questionId: 48,
      variationId: 1,
      topicSlug: "web-development",
      questionTitle: "AY2324-CS-Q48-V1",
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
      questionId: 49,
      variationId: 1,
      topicSlug: "machine-learning",
      questionTitle: "AY2324-CS-Q49-V1",
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
      questionId: 50,
      variationId: 1,
      topicSlug: "cybersecurity",
      questionTitle: "AY2324-CS-Q50-V1",
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
      questionId: 51,
      variationId: 1,
      topicSlug: "object-oriented-programming",
      questionTitle: "AY2324-CS-Q51-V1",
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
      questionId: 52,
      variationId: 1,
      topicSlug: "distributed-systems",
      questionTitle: "AY2324-CS-Q52-V1",
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
      questionId: 53,
      variationId: 1,
      topicSlug: "design-patterns",
      questionTitle: "AY2324-CS-Q53-V1",
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
      questionId: 54,
      variationId: 1,
      topicSlug: "artificial-intelligence",
      questionTitle: "AY2324-CS-Q54-V1",
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
      questionId: 55,
      variationId: 1,
      topicSlug: "blockchain",
      questionTitle: "AY2324-CS-Q55-V1",
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
      questionId: 56,
      variationId: 1,
      topicSlug: "devops",
      questionTitle: "AY2324-CS-Q56-V1",
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
      questionId: 57,
      variationId: 1,
      topicSlug: "cloud-computing",
      questionTitle: "AY2324-CS-Q57-V1",
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
      questionId: 58,
      variationId: 1,
      topicSlug: "data-analytics",
      questionTitle: "AY2324-CS-Q58-V1",
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
      questionId: 59,
      variationId: 1,
      topicSlug: "software-testing",
      questionTitle: "AY2324-CS-Q59-V1",
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
      questionId: 60,
      variationId: 1,
      topicSlug: "mobile-development",
      questionTitle: "AY2324-CS-Q60-V1",
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
      questionId: 61,
      variationId: 1,
      topicSlug: "network-security",
      questionTitle: "AY2324-CS-Q61-V1",
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
      questionId: 62,
      variationId: 1,
      topicSlug: "advanced-database-systems",
      questionTitle: "AY2324-CS-Q62-V1",
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
      questionId: 63,
      variationId: 1,
      topicSlug: "algorithms-optimization",
      questionTitle: "AY2324-CS-Q63-V1",
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
      questionId: 64,
      variationId: 1,
      topicSlug: "user-experience-design",
      questionTitle: "AY2324-CS-Q64-V1",
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
      questionId: 65,
      variationId: 1,
      topicSlug: "big-data",
      questionTitle: "AY2324-CS-Q65-V1",
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
      questionId: 66,
      variationId: 1,
      topicSlug: "quantum-computing",
      questionTitle: "AY2324-CS-Q66-V1",
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
      questionId: 67,
      variationId: 1,
      topicSlug: "mobile-security",
      questionTitle: "AY2324-CS-Q67-V1",
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
      questionId: 68,
      variationId: 1,
      topicSlug: "ethical-hacking",
      questionTitle: "AY2324-CS-Q68-V1",
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
      questionId: 69,
      variationId: 1,
      topicSlug: "software-architecture",
      questionTitle: "AY2324-CS-Q69-V1",
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
      questionId: 70,
      variationId: 1,
      topicSlug: "data-structures",
      questionTitle: "AY2324-CS-Q70-V1",
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
      questionId: 71,
      variationId: 1,
      topicSlug: "algorithms",
      questionTitle: "AY2324-CS-Q71-V1",
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
      questionId: 72,
      variationId: 1,
      topicSlug: "web-development",
      questionTitle: "AY2324-CS-Q72-V1",
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
      questionId: 73,
      variationId: 1,
      topicSlug: "operating-systems",
      questionTitle: "AY2324-CS-Q73-V1",
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
      questionId: 74,
      variationId: 1,
      topicSlug: "database-systems",
      questionTitle: "AY2324-CS-Q74-V1",
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
      questionId: 75,
      variationId: 1,
      topicSlug: "networking",
      questionTitle: "AY2324-CS-Q75-V1",
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
      questionId: 76,
      variationId: 1,
      topicSlug: "machine-learning",
      questionTitle: "AY2324-CS-Q76-V1",
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
      questionId: 77,
      variationId: 1,
      topicSlug: "cybersecurity",
      questionTitle: "AY2324-CS-Q77-V1",
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
      questionId: 78,
      variationId: 1,
      topicSlug: "devops",
      questionTitle: "AY2324-CS-Q78-V1",
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

  ]
