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
    ceuId: "A0000000A",
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
    ceuId: "A0000001B",
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
    ceuId: "A0000002C",
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
    // Foundational Level Courses
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
    // {
    //   questionId: 6,
    //   variationId: 1,
    //   topicSlug: "web-development",
    //   questionTitle: "AY2122-CS-Q6-V6",
    //   questionContent: '<p>What does HTML stand for?</p>',
    //   questionDifficulty: QuestionDifficulty.Easy,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "HyperText Markup Language", isCorrect: true, isLatex: false },
    //       { key: "mantine-2", answerContent: "HighText Machine Language", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "Hyperlink and Text Markup Language", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "HyperText Multi Language", isCorrect: false, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 7,
    //   variationId: 1,
    //   topicSlug: "css",
    //   questionTitle: "AY2122-CS-Q7-V7",
    //   questionContent: '<p>Which of the following is a valid CSS selector?</p>',
    //   questionDifficulty: QuestionDifficulty.Easy,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: ".class", isCorrect: true, isLatex: false },
    //       { key: "mantine-2", answerContent: "#class", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "class", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "class{}", isCorrect: false, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 8,
    //   variationId: 1,
    //   topicSlug: "javascript",
    //   questionTitle: "AY2122-CS-Q8-V8",
    //   questionContent: '<p>Which symbol is used for comments in JavaScript?</p>',
    //   questionDifficulty: QuestionDifficulty.Easy,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "//", isCorrect: true, isLatex: false },
    //       { key: "mantine-2", answerContent: "#", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "<!--", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "/*", isCorrect: false, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 9,
    //   variationId: 1,
    //   topicSlug: "javascript",
    //   questionTitle: "AY2122-CS-Q9-V9",
    //   questionContent: '<p>What will the following code output? <code>console.log(typeof NaN);</code></p>',
    //   questionDifficulty: QuestionDifficulty.Medium,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "number", isCorrect: true, isLatex: false },
    //       { key: "mantine-2", answerContent: "NaN", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "undefined", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "object", isCorrect: false, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 10,
    //   variationId: 1,
    //   topicSlug: "react",
    //   questionTitle: "AY2122-CS-Q10-V10",
    //   questionContent: '<p>What is the primary purpose of React?</p>',
    //   questionDifficulty: QuestionDifficulty.Easy,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "Building user interfaces", isCorrect: true, isLatex: false },
    //       { key: "mantine-2", answerContent: "Managing databases", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "Server-side scripting", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "Styling web pages", isCorrect: false, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 11,
    //   variationId: 1,
    //   topicSlug: "react",
    //   questionTitle: "AY2122-CS-Q11-V11",
    //   questionContent: '<p>In React, what is a component?</p>',
    //   questionDifficulty: QuestionDifficulty.Medium,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "A reusable piece of UI", isCorrect: true, isLatex: false },
    //       { key: "mantine-2", answerContent: "A state management tool", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "A type of database", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "A CSS file", isCorrect: false, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 12,
    //   variationId: 1,
    //   topicSlug: "vue",
    //   questionTitle: "AY2122-CS-Q12-V12",
    //   questionContent: '<p>What is the main feature of Vue.js?</p>',
    //   questionDifficulty: QuestionDifficulty.Easy,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "Reactive data binding", isCorrect: true, isLatex: false },
    //       { key: "mantine-2", answerContent: "Server-side rendering", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "Type safety", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "Global state management", isCorrect: false, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 13,
    //   variationId: 1,
    //   topicSlug: "angular",
    //   questionTitle: "AY2122-CS-Q13-V13",
    //   questionContent: '<p>What is Angular primarily used for?</p>',
    //   questionDifficulty: QuestionDifficulty.Easy,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "Building single-page applications", isCorrect: true, isLatex: false },
    //       { key: "mantine-2", answerContent: "Creating databases", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "Handling server requests", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "Data visualization", isCorrect: false, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 14,
    //   variationId: 1,
    //   topicSlug: "backend",
    //   questionTitle: "AY2122-CS-Q14-V14",
    //   questionContent: '<p>Which of the following is NOT a backend language?</p>',
    //   questionDifficulty: QuestionDifficulty.Easy,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "JavaScript", isCorrect: false, isLatex: false },
    //       { key: "mantine-2", answerContent: "Python", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "Ruby", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "HTML", isCorrect: true, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 15,
    //   variationId: 1,
    //   topicSlug: "api",
    //   questionTitle: "AY2122-CS-Q15-V15",
    //   questionContent: '<p>What does REST stand for in RESTful APIs?</p>',
    //   questionDifficulty: QuestionDifficulty.Easy,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "Representational State Transfer", isCorrect: true, isLatex: false },
    //       { key: "mantine-2", answerContent: "Resource State Transfer", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "Representational State Transaction", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "Resource State Transaction", isCorrect: false, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 16,
    //   variationId: 1,
    //   topicSlug: "api",
    //   questionTitle: "AY2122-CS-Q16-V16",
    //   questionContent: '<p>Which HTTP method is used to update a resource in a RESTful API?</p>',
    //   questionDifficulty: QuestionDifficulty.Medium,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "PUT", isCorrect: true, isLatex: false },
    //       { key: "mantine-2", answerContent: "POST", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "GET", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "DELETE", isCorrect: false, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 17,
    //   variationId: 1,
    //   topicSlug: "database",
    //   questionTitle: "AY2122-CS-Q17-V17",
    //   questionContent: '<p>Which of the following is a NoSQL database?</p>',
    //   questionDifficulty: QuestionDifficulty.Easy,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "MongoDB", isCorrect: true, isLatex: false },
    //       { key: "mantine-2", answerContent: "MySQL", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "PostgreSQL", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "SQLite", isCorrect: false, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 18,
    //   variationId: 1,
    //   topicSlug: "database",
    //   questionTitle: "AY2122-CS-Q18-V18",
    //   questionContent: '<p>What is the primary purpose of indexing in databases?</p>',
    //   questionDifficulty: QuestionDifficulty.Medium,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "To speed up query performance", isCorrect: true, isLatex: false },
    //       { key: "mantine-2", answerContent: "To store data more efficiently", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "To enforce data integrity", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "To create backups", isCorrect: false, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 19,
    //   variationId: 1,
    //   topicSlug: "devops",
    //   questionTitle: "AY2122-CS-Q19-V19",
    //   questionContent: '<p>What does CI/CD stand for?</p>',
    //   questionDifficulty: QuestionDifficulty.Easy,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "Continuous Integration / Continuous Deployment", isCorrect: true, isLatex: false },
    //       { key: "mantine-2", answerContent: "Constant Integration / Constant Delivery", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "Continuous Improvement / Continuous Development", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "Constant Improvement / Constant Deployment", isCorrect: false, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 20,
    //   variationId: 1,
    //   topicSlug: "devops",
    //   questionTitle: "AY2122-CS-Q20-V20",
    //   questionContent: '<p>Which of the following tools is commonly used for continuous integration?</p>',
    //   questionDifficulty: QuestionDifficulty.Medium,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "Jenkins", isCorrect: true, isLatex: false },
    //       { key: "mantine-2", answerContent: "Docker", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "Kubernetes", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "Git", isCorrect: false, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 21,
    //   variationId: 1,
    //   topicSlug: "ai",
    //   questionTitle: "AY2122-CS-Q21-V21",
    //   questionContent: '<p>What is the main purpose of artificial intelligence?</p>',
    //   questionDifficulty: QuestionDifficulty.Easy,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "To simulate human intelligence", isCorrect: true, isLatex: false },
    //       { key: "mantine-2", answerContent: "To enhance hardware performance", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "To reduce programming time", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "To create better graphics", isCorrect: false, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 22,
    //   variationId: 1,
    //   topicSlug: "ai",
    //   questionTitle: "AY2122-CS-Q22-V22",
    //   questionContent: '<p>Which of the following is a common application of AI?</p>',
    //   questionDifficulty: QuestionDifficulty.Easy,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "Image recognition", isCorrect: true, isLatex: false },
    //       { key: "mantine-2", answerContent: "Writing code", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "Managing databases", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "Designing websites", isCorrect: false, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 23,
    //   variationId: 1,
    //   topicSlug: "data_science",
    //   questionTitle: "AY2122-CS-Q23-V23",
    //   questionContent: '<p>What is the purpose of data cleaning in data science?</p>',
    //   questionDifficulty: QuestionDifficulty.Medium,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "To improve data quality", isCorrect: true, isLatex: false },
    //       { key: "mantine-2", answerContent: "To enhance data visualization", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "To store data efficiently", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "To reduce data size", isCorrect: false, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 24,
    //   variationId: 1,
    //   topicSlug: "data_science",
    //   questionTitle: "AY2122-CS-Q24-V24",
    //   questionContent: '<p>Which of the following is a key concept in machine learning?</p>',
    //   questionDifficulty: QuestionDifficulty.Medium,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "Training data", isCorrect: true, isLatex: false },
    //       { key: "mantine-2", answerContent: "Data visualization", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "Data storage", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "Data backup", isCorrect: false, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 25,
    //   variationId: 1,
    //   topicSlug: "ux_design",
    //   questionTitle: "AY2122-CS-Q25-V25",
    //   questionContent: '<p>What is the main goal of UX design?</p>',
    //   questionDifficulty: QuestionDifficulty.Easy,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "To improve user satisfaction", isCorrect: true, isLatex: false },
    //       { key: "mantine-2", answerContent: "To create more features", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "To enhance graphics", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "To reduce costs", isCorrect: false, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 26,
    //   variationId: 1,
    //   topicSlug: "ux_design",
    //   questionTitle: "AY2122-CS-Q26-V26",
    //   questionContent: '<p>Which of the following is a method used in UX research?</p>',
    //   questionDifficulty: QuestionDifficulty.Medium,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "Usability testing", isCorrect: true, isLatex: false },
    //       { key: "mantine-2", answerContent: "Data mining", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "Code review", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "Version control", isCorrect: false, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 27,
    //   variationId: 1,
    //   topicSlug: "web_development",
    //   questionTitle: "AY2122-CS-Q27-V27",
    //   questionContent: '<p>What does CSS stand for?</p>',
    //   questionDifficulty: QuestionDifficulty.Easy,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "Cascading Style Sheets", isCorrect: true, isLatex: false },
    //       { key: "mantine-2", answerContent: "Computer Style Sheets", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "Colorful Style Sheets", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "Creative Style Sheets", isCorrect: false, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 28,
    //   variationId: 1,
    //   topicSlug: "web_development",
    //   questionTitle: "AY2122-CS-Q28-V28",
    //   questionContent: '<p>Which HTML tag is used to define an internal style sheet?</p>',
    //   questionDifficulty: QuestionDifficulty.Easy,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "<style>", isCorrect: true, isLatex: false },
    //       { key: "mantine-2", answerContent: "<script>", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "<css>", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "<link>", isCorrect: false, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 29,
    //   variationId: 1,
    //   topicSlug: "web_development",
    //   questionTitle: "AY2122-CS-Q29-V29",
    //   questionContent: '<p>Which of the following is a JavaScript framework?</p>',
    //   questionDifficulty: QuestionDifficulty.Medium,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "React", isCorrect: true, isLatex: false },
    //       { key: "mantine-2", answerContent: "Django", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "Ruby on Rails", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "Flask", isCorrect: false, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 30,
    //   variationId: 1,
    //   topicSlug: "web_development",
    //   questionTitle: "AY2122-CS-Q30-V30",
    //   questionContent: '<p>Which of the following is used to style web pages?</p>',
    //   questionDifficulty: QuestionDifficulty.Easy,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "CSS", isCorrect: true, isLatex: false },
    //       { key: "mantine-2", answerContent: "HTML", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "JavaScript", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "XML", isCorrect: false, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 31,
    //   variationId: 1,
    //   topicSlug: "networking",
    //   questionTitle: "AY2122-CS-Q31-V31",
    //   questionContent: '<p>What does IP stand for?</p>',
    //   questionDifficulty: QuestionDifficulty.Easy,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "Internet Protocol", isCorrect: true, isLatex: false },
    //       { key: "mantine-2", answerContent: "Interconnected Protocol", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "Internal Protocol", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "Integrated Protocol", isCorrect: false, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 32,
    //   variationId: 1,
    //   topicSlug: "networking",
    //   questionTitle: "AY2122-CS-Q32-V32",
    //   questionContent: '<p>Which protocol is used to send email messages?</p>',
    //   questionDifficulty: QuestionDifficulty.Medium,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "SMTP", isCorrect: true, isLatex: false },
    //       { key: "mantine-2", answerContent: "FTP", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "HTTP", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "DNS", isCorrect: false, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 33,
    //   variationId: 1,
    //   topicSlug: "networking",
    //   questionTitle: "AY2122-CS-Q33-V33",
    //   questionContent: '<p>What is the function of a router?</p>',
    //   questionDifficulty: QuestionDifficulty.Medium,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "To route data between networks", isCorrect: true, isLatex: false },
    //       { key: "mantine-2", answerContent: "To amplify signals", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "To connect devices within a network", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "To encrypt data", isCorrect: false, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 34,
    //   variationId: 1,
    //   topicSlug: "networking",
    //   questionTitle: "AY2122-CS-Q34-V34",
    //   questionContent: '<p>What type of address is an IP address?</p>',
    //   questionDifficulty: QuestionDifficulty.Easy,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "Logical address", isCorrect: true, isLatex: false },
    //       { key: "mantine-2", answerContent: "Physical address", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "Permanent address", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "Fixed address", isCorrect: false, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 35,
    //   variationId: 1,
    //   topicSlug: "networking",
    //   questionTitle: "AY2122-CS-Q35-V35",
    //   questionContent: '<p>What is the primary purpose of DNS?</p>',
    //   questionDifficulty: QuestionDifficulty.Medium,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "To translate domain names to IP addresses", isCorrect: true, isLatex: false },
    //       { key: "mantine-2", answerContent: "To manage network traffic", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "To establish secure connections", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "To provide web hosting", isCorrect: false, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 36,
    //   variationId: 1,
    //   topicSlug: "cloud_computing",
    //   questionTitle: "AY2122-CS-Q36-V36",
    //   questionContent: '<p>What is cloud computing?</p>',
    //   questionDifficulty: QuestionDifficulty.Easy,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "Delivering computing services over the internet", isCorrect: true, isLatex: false },
    //       { key: "mantine-2", answerContent: "Storing data on local servers", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "Using a personal computer for computations", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "Connecting to a VPN", isCorrect: false, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 37,
    //   variationId: 1,
    //   topicSlug: "cloud_computing",
    //   questionTitle: "AY2122-CS-Q37-V37",
    //   questionContent: '<p>Which of the following is a benefit of cloud computing?</p>',
    //   questionDifficulty: QuestionDifficulty.Medium,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "Scalability", isCorrect: true, isLatex: false },
    //       { key: "mantine-2", answerContent: "Higher costs", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "Limited access", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "More hardware requirements", isCorrect: false, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 38,
    //   variationId: 1,
    //   topicSlug: "cloud_computing",
    //   questionTitle: "AY2122-CS-Q38-V38",
    //   questionContent: '<p>What is a cloud service model?</p>',
    //   questionDifficulty: QuestionDifficulty.Easy,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "A way to categorize cloud services", isCorrect: true, isLatex: false },
    //       { key: "mantine-2", answerContent: "A physical cloud infrastructure", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "A software application", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "A cloud management tool", isCorrect: false, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 39,
    //   variationId: 1,
    //   topicSlug: "cloud_computing",
    //   questionTitle: "AY2122-CS-Q39-V39",
    //   questionContent: '<p>Which of the following is NOT a cloud service model?</p>',
    //   questionDifficulty: QuestionDifficulty.Medium,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "IaaS", isCorrect: false, isLatex: false },
    //       { key: "mantine-2", answerContent: "PaaS", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "SaaS", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "AaaS", isCorrect: true, isLatex: false },
    //     ],
    //   },
    // },
    // {
    //   questionId: 40,
    //   variationId: 1,
    //   topicSlug: "cloud_computing",
    //   questionTitle: "AY2122-CS-Q40-V40",
    //   questionContent: '<p>What is the primary purpose of SaaS?</p>',
    //   questionDifficulty: QuestionDifficulty.Easy,
    //   questionData: {
    //     answers: [
    //       { key: "mantine-1", answerContent: "To provide software applications over the internet", isCorrect: true, isLatex: false },
    //       { key: "mantine-2", answerContent: "To provide infrastructure resources", isCorrect: false, isLatex: false },
    //       { key: "mantine-3", answerContent: "To manage network services", isCorrect: false, isLatex: false },
    //       { key: "mantine-4", answerContent: "To offer platform services", isCorrect: false, isLatex: false },
    //     ],
    //   },
    // },
  ]
