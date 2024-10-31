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
      questionTitle: "Binary Search Tree Operations 1",
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
    },
    {
      questionId: 6,
      variationId: 1,
      topicSlug: "data-structures",
      questionTitle: "Binary Search Tree Operations",
      questionContent: `<p>Given a Binary Search Tree (BST), what is the time complexity of searching for a node in the tree?</p>`,
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          { key: "ds1", answerContent: "O(log n)", isCorrect: true, isLatex: false },
          { key: "ds2", answerContent: "O(n)", isCorrect: false, isLatex: false },
          { key: "ds3", answerContent: "O(1)", isCorrect: false, isLatex: false },
          { key: "ds4", answerContent: "O(n^2)", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      questionId: 7,
      variationId: 1,
      topicSlug: "operating-systems",
      questionTitle: "Process Synchronization",
      questionContent: `<p>Which of the following mechanisms is used to prevent race conditions in a multi-process system?</p>`,
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          { key: "os1", answerContent: "Mutex", isCorrect: true, isLatex: false },
          { key: "os2", answerContent: "Threading", isCorrect: false, isLatex: false },
          { key: "os3", answerContent: "Polling", isCorrect: false, isLatex: false },
          { key: "os4", answerContent: "Paging", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      questionId: 8,
      variationId: 1,
      topicSlug: "database-systems",
      questionTitle: "SQL Joins",
      questionContent: `<p>Which SQL join returns all rows from both tables when there is a match between the columns?</p>`,
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          { key: "db1", answerContent: "INNER JOIN", isCorrect: true, isLatex: false },
          { key: "db2", answerContent: "LEFT JOIN", isCorrect: false, isLatex: false },
          { key: "db3", answerContent: "RIGHT JOIN", isCorrect: false, isLatex: false },
          { key: "db4", answerContent: "FULL OUTER JOIN", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      questionId: 9,
      variationId: 1,
      topicSlug: "cloud-computing",
      questionTitle: "Types of Cloud Services",
      questionContent: `<p>What does 'IaaS' stand for in cloud computing?</p>`,
      questionDifficulty: QuestionDifficulty.Easy,
      questionData: {
        answers: [
          { key: "cc1", answerContent: "Infrastructure as a Service", isCorrect: true, isLatex: false },
          { key: "cc2", answerContent: "Internet as a Service", isCorrect: false, isLatex: false },
          { key: "cc3", answerContent: "Information as a Service", isCorrect: false, isLatex: false },
          { key: "cc4", answerContent: "Integration as a Service", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      questionId: 10,
      variationId: 1,
      topicSlug: "software-engineering",
      questionTitle: "Agile Methodology",
      questionContent: `<p>In Agile software development, which role is responsible for ensuring that the team follows Agile principles and practices?</p>`,
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          { key: "se1", answerContent: "Scrum Master", isCorrect: true, isLatex: false },
          { key: "se2", answerContent: "Project Manager", isCorrect: false, isLatex: false },
          { key: "se3", answerContent: "Product Owner", isCorrect: false, isLatex: false },
          { key: "se4", answerContent: "Developer", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      questionId: 11,
      variationId: 1,
      topicSlug: "machine-learning",
      questionTitle: "Supervised Learning",
      questionContent: `<p>Which of the following is an example of a supervised learning algorithm?</p>`,
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          { key: "ml1", answerContent: "Linear Regression", isCorrect: true, isLatex: false },
          { key: "ml2", answerContent: "K-Means Clustering", isCorrect: false, isLatex: false },
          { key: "ml3", answerContent: "PCA", isCorrect: false, isLatex: false },
          { key: "ml4", answerContent: "Apriori", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      questionId: 12,
      variationId: 1,
      topicSlug: "devops",
      questionTitle: "Continuous Integration",
      questionContent: `<p>What is the primary purpose of Continuous Integration in DevOps?</p>`,
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          { key: "dev1", answerContent: "To automate code integration and testing", isCorrect: true, isLatex: false },
          { key: "dev2", answerContent: "To ensure high system availability", isCorrect: false, isLatex: false },
          { key: "dev3", answerContent: "To monitor application performance", isCorrect: false, isLatex: false },
          { key: "dev4", answerContent: "To manage cloud infrastructure", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      questionId: 13,
      variationId: 1,
      topicSlug: "design-patterns",
      questionTitle: "Singleton Pattern",
      questionContent: `<p>In which scenario would the Singleton design pattern be most appropriate?</p>`,
      questionDifficulty: QuestionDifficulty.Medium,
      questionData: {
        answers: [
          { key: "dp1", answerContent: "When only one instance of a class is needed", isCorrect: true, isLatex: false },
          { key: "dp2", answerContent: "When multiple classes need to share resources", isCorrect: false, isLatex: false },
          { key: "dp3", answerContent: "When creating multiple instances is required", isCorrect: false, isLatex: false },
          { key: "dp4", answerContent: "When ensuring data immutability", isCorrect: false, isLatex: false },
        ],
      },
    },
    {
      questionId: 14,
      variationId: 1,
      topicSlug: "data-structures",
      questionTitle: "Binary Search Tree Basics",
      questionDifficulty: QuestionDifficulty.Medium,
      questionContent: `
        <p>Which of the following operations on a Binary Search Tree has an average time complexity of O(log n)?</p>
      `,
      questionData: {
        answers: [
          { key: "ds-ans1", answerContent: "Insertion", isCorrect: true },
          { key: "ds-ans2", answerContent: "In-order traversal", isCorrect: false },
          { key: "ds-ans3", answerContent: "Deletion of root", isCorrect: false },
          { key: "ds-ans4", answerContent: "Searching for the minimum value", isCorrect: true },
        ],
      },
    },
    {
      questionId: 15,
      variationId: 1,
      topicSlug: "web-development",
      questionTitle: "HTTP Methods and Their Usage",
      questionDifficulty: QuestionDifficulty.Easy,
      questionContent: `
        <p>Which HTTP method is typically used to submit data to be processed to a specified resource?</p>
      `,
      questionData: {
        answers: [
          { key: "web-ans1", answerContent: "GET", isCorrect: false },
          { key: "web-ans2", answerContent: "POST", isCorrect: true },
          { key: "web-ans3", answerContent: "DELETE", isCorrect: false },
          { key: "web-ans4", answerContent: "PUT", isCorrect: false },
        ],
      },
    },
    {
      questionId: 16,
      variationId: 1,
      topicSlug: "database-systems",
      questionTitle: "Normalization in Databases",
      questionDifficulty: QuestionDifficulty.Medium,
      questionContent: `
        <p>Which database normalization form ensures that there are no transitive dependencies between attributes?</p>
      `,
      questionData: {
        answers: [
          { key: "db-ans1", answerContent: "First Normal Form (1NF)", isCorrect: false },
          { key: "db-ans2", answerContent: "Second Normal Form (2NF)", isCorrect: false },
          { key: "db-ans3", answerContent: "Third Normal Form (3NF)", isCorrect: true },
          { key: "db-ans4", answerContent: "Boyce-Codd Normal Form (BCNF)", isCorrect: false },
        ],
      },
    },
    {
      "questionId": 27,
      "variationId": 0,
      "topicSlug": "data-structures",
      "questionTitle": "CS101-DS-Q1",
      "questionDifficulty": "Easy",
      "questionContent": "<p>Which of the following is a linear data structure?</p><p><img src='https://example.com/image1.png'></p>",
      "questionData": {
        "answers": [
          {
            "key": "mantine-a1",
            "answerContent": "Array",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-a2",
            "answerContent": "Tree",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-a3",
            "answerContent": "Graph",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-a4",
            "answerContent": "Hash Table",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      "questionId": 28,
      "variationId": 0,
      "topicSlug": "algorithms",
      "questionTitle": "CS101-ALGO-Q1",
      "questionDifficulty": "Medium",
      "questionContent": "<p>What is the time complexity of binary search?</p><p><img src='https://example.com/image2.png'></p>",
      "questionData": {
        "answers": [
          {
            "key": "mantine-b1",
            "answerContent": "O(n)",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-b2",
            "answerContent": "O(log n)",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-b3",
            "answerContent": "O(n log n)",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-b4",
            "answerContent": "O(1)",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      "questionId": 29,
      "variationId": 0,
      "topicSlug": "operating-systems",
      "questionTitle": "CS101-OS-Q1",
      "questionDifficulty": "Hard",
      "questionContent": "<p>What is the primary purpose of an operating system?</p><p><img src='https://example.com/image3.png'></p>",
      "questionData": {
        "answers": [
          {
            "key": "mantine-c1",
            "answerContent": "Manage hardware resources",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-c2",
            "answerContent": "Run applications",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-c3",
            "answerContent": "Provide internet access",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-c4",
            "answerContent": "Perform data analysis",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      "questionId": 30,
      "variationId": 0,
      "topicSlug": "database-systems",
      "questionTitle": "CS101-DB-Q1",
      "questionDifficulty": "Medium",
      "questionContent": "<p>Which of the following is a type of NoSQL database?</p><p><img src='https://example.com/image4.png'></p>",
      "questionData": {
        "answers": [
          {
            "key": "mantine-d1",
            "answerContent": "MongoDB",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-d2",
            "answerContent": "MySQL",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-d3",
            "answerContent": "PostgreSQL",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-d4",
            "answerContent": "SQLite",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      "questionId": 31,
      "variationId": 0,
      "topicSlug": "software-engineering",
      "questionTitle": "CS101-SE-Q1",
      "questionDifficulty": "Easy",
      "questionContent": "<p>Which software development methodology emphasizes incremental delivery?</p><p><img src='https://example.com/image5.png'></p>",
      "questionData": {
        "answers": [
          {
            "key": "mantine-e1",
            "answerContent": "Agile",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-e2",
            "answerContent": "Waterfall",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-e3",
            "answerContent": "Spiral",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-e4",
            "answerContent": "V-Model",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      "questionId": 32,
      "variationId": 0,
      "topicSlug": "web-development",
      "questionTitle": "CS101-WD-Q1",
      "questionDifficulty": "Medium",
      "questionContent": "<p>What does HTML stand for?</p><p><img src='https://example.com/image6.png'></p>",
      "questionData": {
        "answers": [
          {
            "key": "mantine-f1",
            "answerContent": "HyperText Markup Language",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-f2",
            "answerContent": "HighText Machine Language",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-f3",
            "answerContent": "HyperLink and Text Markup Language",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-f4",
            "answerContent": "HyperText Multi Language",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      "questionId": 33,
      "variationId": 0,
      "topicSlug": "object-oriented-programming",
      "questionTitle": "CS101-OOP-Q1",
      "questionDifficulty": "Easy",
      "questionContent": "<p>Which of the following is NOT a feature of object-oriented programming?</p><p><img src='https://example.com/image7.png'></p>",
      "questionData": {
        "answers": [
          {
            "key": "mantine-g1",
            "answerContent": "Encapsulation",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-g2",
            "answerContent": "Polymorphism",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-g3",
            "answerContent": "Inheritance",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-g4",
            "answerContent": "Compilation",
            "isCorrect": true,
            "isLatex": false
          }
        ]
      }
    },
    {
      "questionId": 34,
      "variationId": 0,
      "topicSlug": "machine-learning",
      "questionTitle": "CS101-ML-Q1",
      "questionDifficulty": "Hard",
      "questionContent": "<p>What is the goal of supervised learning?</p><p><img src='https://example.com/image8.png'></p>",
      "questionData": {
        "answers": [
          {
            "key": "mantine-h1",
            "answerContent": "To predict outcomes based on input data",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-h2",
            "answerContent": "To cluster similar data points",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-h3",
            "answerContent": "To reduce dimensionality",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-h4",
            "answerContent": "To generate new data samples",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    {
      "questionId": 35,
      "variationId": 0,
      "topicSlug": "networking",
      "questionTitle": "CS101-NW-Q1",
      "questionDifficulty": "Medium",
      "questionContent": "<p>What does IP stand for in networking?</p><p><img src='https://example.com/image9.png'></p>",
      "questionData": {
        "answers": [
          {
            "key": "mantine-i1",
            "answerContent": "Internet Protocol",
            "isCorrect": true,
            "isLatex": false
          },
          {
            "key": "mantine-i2",
            "answerContent": "Internal Process",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-i3",
            "answerContent": "Internet Performance",
            "isCorrect": false,
            "isLatex": false
          },
          {
            "key": "mantine-i4",
            "answerContent": "Integrated Protocol",
            "isCorrect": false,
            "isLatex": false
          }
        ]
      }
    },
    // {
    //   "questionId": 36,
    //   "variationId": 0,
    //   "topicSlug": "data-structures",
    //   "questionTitle": "Understanding Binary Trees 2",
    //   "questionDifficulty": "Medium",
    //   "questionContent": "<p>What is the maximum depth of a binary tree with <span class='ql-formula' data-value='n'>n</span> nodes?</p>",
    //   "questionData": {
    //     "methods": [
    //       { "key": "method-1", "expr": "maxDepth = log2(n + 1)" }
    //     ],
    //     "variables": [
    //       {
    //         "key": "var-n",
    //         "name": "n",
    //         "unit": "nodes",
    //         "default": "15",
    //         "randomize": true,
    //         "isFinalAnswer": false
    //       }
    //     ]
    //   }
    // },
    // {
    //   "questionId": 37,
    //   "variationId": 0,
    //   "topicSlug": "algorithms",
    //   "questionTitle": "Big O Notation 2",
    //   "questionDifficulty": "Easy",
    //   "questionContent": "<p>What is the time complexity of the following code snippet?</p><pre><code>for (int i = 0; i < n; i++) {\n    for (int j = 0; j < n; j++) {\n        // do something\n    }\n}</code></pre>",
    //   "questionData": {
    //     "methods": [
    //       { "key": "method-2", "expr": "Time Complexity = O(n^2)" }
    //     ],
    //     "variables": []
    //   }
    // },
    // {
    //   "questionId": 38,
    //   "variationId": 0,
    //   "topicSlug": "networking",
    //   "questionTitle": "IP Address Classes 1",
    //   "questionDifficulty": "Medium",
    //   "questionContent": "<p>What class does the IP address <span class='ql-formula' data-value='192.168.1.1'>192.168.1.1</span> belong to?</p>",
    //   "questionData": {
    //     "methods": [
    //       { "key": "method-3", "expr": "Class = A, B, C, D, E" }
    //     ],
    //     "variables": [
    //       {
    //         "key": "var-ip",
    //         "name": "IP Address",
    //         "default": "192.168.1.1",
    //         "randomize": false,
    //         "isFinalAnswer": false
    //       }
    //     ]
    //   }
    // },
    // {
    //   "questionId": 39,
    //   "variationId": 0,
    //   "topicSlug": "databases",
    //   "questionTitle": "Normalization Forms 2",
    //   "questionDifficulty": "Hard",
    //   "questionContent": "<p>What are the key differences between 1NF and 2NF in database normalization?</p>",
    //   "questionData": {
    //     "methods": [
    //       { "key": "method-4", "expr": "1NF: No repeating groups; 2NF: No partial dependency" }
    //     ],
    //     "variables": []
    //   }
    // },
    // {
    //   "questionId": 40,
    //   "variationId": 0,
    //   "topicSlug": "operating-systems",
    //   "questionTitle": "Process States 3",
    //   "questionDifficulty": "Medium",
    //   "questionContent": "<p>What are the different states of a process in an operating system?</p>",
    //   "questionData": {
    //     "methods": [
    //       { "key": "method-5", "expr": "States: New, Ready, Running, Waiting, Terminated" }
    //     ],
    //     "variables": []
    //   }
    // },
    // {
    //   "questionId": 41,
    //   "variationId": 0,
    //   "topicSlug": "web-development",
    //   "questionTitle": "HTTP Methods 1",
    //   "questionDifficulty": "Easy",
    //   "questionContent": "<p>What are the main HTTP methods used in RESTful APIs?</p>",
    //   "questionData": {
    //     "methods": [
    //       { "key": "method-6", "expr": "Methods: GET, POST, PUT, DELETE" }
    //     ],
    //     "variables": []
    //   }
    // },
    // {
    //   "questionId": 42,
    //   "variationId": 0,
    //   "topicSlug": "software-engineering",
    //   "questionTitle": "Agile Methodology 2",
    //   "questionDifficulty": "Medium",
    //   "questionContent": "<p>What are the key principles of Agile methodology?</p>",
    //   "questionData": {
    //     "methods": [
    //       { "key": "method-7", "expr": "Principles: Customer collaboration, Responding to change" }
    //     ],
    //     "variables": []
    //   }
    // },
    // {
    //   "questionId": 43,
    //   "variationId": 0,
    //   "topicSlug": "security",
    //   "questionTitle": "Encryption Algorithms 3",
    //   "questionDifficulty": "Hard",
    //   "questionContent": "<p>What is the difference between symmetric and asymmetric encryption?</p>",
    //   "questionData": {
    //     "methods": [
    //       { "key": "method-8", "expr": "Symmetric: Same key; Asymmetric: Public/Private key pair" }
    //     ],
    //     "variables": []
    //   }
    // },
    // {
    //   "questionId": 44,
    //   "variationId": 0,
    //   "topicSlug": "machine-learning",
    //   "questionTitle": "Overfitting vs Underfitting 3",
    //   "questionDifficulty": "Hard",
    //   "questionContent": "<p>What is overfitting, and how can it be mitigated?</p>",
    //   "questionData": {
    //     "methods": [
    //       { "key": "method-9", "expr": "Overfitting: Model too complex; Mitigation: Regularization, Cross-validation" }
    //     ],
    //     "variables": []
    //   }
    // },
    // {
    //   "questionId": 45,
    //   "variationId": 0,
    //   "topicSlug": "cloud-computing",
    //   "questionTitle": "Cloud Service Models 3",
    //   "questionDifficulty": "Medium",
    //   "questionContent": "<p>What are the differences between IaaS, PaaS, and SaaS?</p>",
    //   "questionData": {
    //     "methods": [
    //       { "key": "method-10", "expr": "IaaS: Infrastructure; PaaS: Platform; SaaS: Software" }
    //     ],
    //     "variables": []
    //   }
    // },
  ];