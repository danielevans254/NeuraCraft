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
    topicLevel: Level.Foundational,
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
    topicLevel: Level.Intermediate,
    topicPrior: 0.340,
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
      moduleCode: "CS1101",
      moduleTitle: "Introduction to Computer Science",
      courseSlug: "programming-foundations",
      courseName: "Programming Foundations Assessment",
      courseDescription:
        "Welcome to CS1101! Take this assessment to help us understand your programming background and customize your learning path.",
      courseImage: "courses/programming-foundations.jpg",
      courseLevel: Level.Foundational,
      type: CourseType.Quiz,
      topics: [
        "data-structures",
        "algorithms",
        "object-oriented-programming",
        "software-engineering"
      ],
      courseMedia: [],
    },
    {
      moduleCode: "CS1101",
      moduleTitle: "Introduction to Computer Science",
      week: 1,
      studio: 1,
      courseSlug: "intro-to-algorithms",
      courseName: "Introduction to Algorithms and Data Structures",
      courseDescription:
        "Learn the fundamental concepts of algorithms and data structures, including complexity analysis, basic data structures, and algorithm design techniques.",
      courseImage: "courses/algorithms-intro.jpg",
      courseLevel: Level.Foundational,
      type: CourseType.Content,
      video: '<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/example1"></iframe>',
      topics: ["algorithms", "data-structures"],
      courseMedia: [
        {
          publicId: "CS/course_materials/w1-algorithms-intro",
          courseSlug: "intro-to-algorithms",
          courseMediaURL: "https://example.com/materials/algorithms-intro.pdf",
          mediaName: "Introduction to Algorithms",
        },
      ],
    },
    {
      moduleCode: "CS2102",
      moduleTitle: "Database Systems",
      week: 1,
      studio: 1,
      courseSlug: "database-fundamentals",
      courseName: "Database Management Systems Fundamentals",
      courseDescription:
        "Explore the core concepts of database management systems, including relational models, SQL, and database design principles.",
      courseImage: "courses/database-basics.jpg",
      courseLevel: Level.Foundational,
      type: CourseType.Content,
      video: '<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/example2"></iframe>',
      topics: ["database-systems", "software-engineering"],
      courseMedia: [
        {
          publicId: "CS/course_materials/w1-database-fundamentals",
          courseSlug: "database-fundamentals",
          courseMediaURL: "https://example.com/materials/database-basics.pdf",
          mediaName: "Database Systems Fundamentals",
        },
      ],
    },
    {
      moduleCode: "CS3103",
      moduleTitle: "Advanced Software Development",
      week: 1,
      studio: 1,
      courseSlug: "advanced-software-patterns",
      courseName: "Advanced Software Design Patterns",
      courseDescription:
        "Master advanced software development concepts including design patterns, architecture principles, and best practices for large-scale applications.",
      courseImage: "courses/design-patterns.jpg",
      courseLevel: Level.Advanced,
      type: CourseType.Content,
      video: '<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/example3"></iframe>',
      topics: ["design-patterns", "software-architecture", "software-engineering"],
      courseMedia: [
        {
          publicId: "CS/course_materials/w1-design-patterns",
          courseSlug: "advanced-software-patterns",
          courseMediaURL: "https://example.com/materials/design-patterns.pdf",
          mediaName: "Software Design Patterns",
        },
      ],
    },
    {
      moduleCode: "CS4201",
      moduleTitle: "Artificial Intelligence and Machine Learning",
      week: 1,
      studio: 1,
      courseSlug: "ai-ml-foundations",
      courseName: "AI and Machine Learning Foundations",
      courseDescription:
        "Introduction to artificial intelligence and machine learning concepts, including supervised learning, neural networks, and AI applications.",
      courseImage: "courses/ai-ml-intro.jpg",
      courseLevel: Level.Intermediate,
      type: CourseType.Content,
      video: '<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/example4"></iframe>',
      topics: ["machine-learning", "artificial-intelligence"],
      courseMedia: [
        {
          publicId: "CS/course_materials/w1-ai-ml-foundations",
          courseSlug: "ai-ml-foundations",
          courseMediaURL: "https://example.com/materials/ai-ml-basics.pdf",
          mediaName: "AI and ML Foundations",
        },
      ],
    }
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
      topicSlug: "algorithms",
      questionTitle: "Algorithm Time Complexity Analysis",
      questionContent: `<p>Consider the following code snippet:</p>
      <pre>
for(int i = 0; i < n; i++) {
    for(int j = i; j < n; j++) {
        sum += arr[j];
    }
}
      </pre>
      <p>What is the time complexity of this algorithm?</p>`,
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-alg1",
            answerContent: "O(n²)",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-alg2",
            answerContent: "O(n)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-alg3",
            answerContent: "O(n log n)",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-alg4",
            answerContent: "O(2n)",
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
      questionTitle: "Binary Search Tree Operations",
      questionContent: `<p>Given the following Binary Search Tree:</p>
      <p><img src="/api/placeholder/400/300" alt="Binary Search Tree with root 10, left child 5, right child 15"></p>
      <p>What will be the result of an in-order traversal?</p>`,
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          {
            key: "mantine-bst1",
            answerContent: "5, 10, 15",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-bst2",
            answerContent: "10, 5, 15",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-bst3",
            answerContent: "15, 10, 5",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-bst4",
            answerContent: "5, 15, 10",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      questionId: 3,
      variationId: 1,
      topicSlug: "database-systems",
      questionTitle: "SQL Query Optimization",
      questionContent: `<p>Consider the following SQL query:</p>
      <pre>
SELECT * 
FROM Orders o 
JOIN Customers c ON o.customer_id = c.id 
WHERE o.order_date > '2024-01-01' 
AND c.country = 'USA';
      </pre>
      <p>Which index would be most beneficial for optimizing this query?</p>`,
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-sql1",
            answerContent: "Composite index on (customer_id, order_date)",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-sql2",
            answerContent: "Single index on country",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-sql3",
            answerContent: "Single index on customer_id",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-sql4",
            answerContent: "Single index on order_date",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      questionId: 4,
      variationId: 1,
      topicSlug: "design-patterns",
      questionTitle: "Software Design Patterns",
      questionContent: `<p>In a system where multiple objects need to be notified when a data source changes, which design pattern would be most appropriate to implement?</p>`,
      questionDifficulty: QuestionDifficulty.Hard,
      questionData: {
        answers: [
          {
            key: "mantine-dp1",
            answerContent: "Observer Pattern",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-dp2",
            answerContent: "Singleton Pattern",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-dp3",
            answerContent: "Factory Pattern",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-dp4",
            answerContent: "Decorator Pattern",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    },
    {
      questionId: 5,
      variationId: 1,
      topicSlug: "machine-learning",
      questionTitle: "Machine Learning Fundamentals",
      questionContent: `<p>In a binary classification problem using logistic regression, which loss function is commonly used during training?</p>`,
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          {
            key: "mantine-ml1",
            answerContent: "Cross-entropy loss",
            isCorrect: true,
            isLatex: false,
          },
          {
            key: "mantine-ml2",
            answerContent: "Mean squared error",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ml3",
            answerContent: "Hinge loss",
            isCorrect: false,
            isLatex: false,
          },
          {
            key: "mantine-ml4",
            answerContent: "Manhattan distance",
            isCorrect: false,
            isLatex: false,
          },
        ],
      },
    }
  ];