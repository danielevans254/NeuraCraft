import { motion } from "framer-motion";
import { IconBrain, IconClock, IconRocket, IconChartBar, IconBulb, IconSchool, IconBook, IconUsers } from '@tabler/icons';
import { Button, Container, Text, Title } from "@mantine/core";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const HeroSection = () => (
  <section className="relative py-28 bg-gradient-to-br from-blue-900 to-purple-900 text-white overflow-hidden">
    <div className="absolute inset-0 opacity-10 pattern-dots pattern-blue-500 pattern-bg-transparent pattern-size-4 pattern-opacity-20" />
    <Container size="xl" className="relative">
      <div className="pt-8">
        <Navbar withBorder={false} className="bg-transparent text-white hover:text-white" />
      </div>

      <div className="max-w-4xl mx-auto text-center mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 flex justify-center">
            <div className="bg-blue-100/20 px-6 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
              Research-Backed Adaptive Learning
            </div>
          </div>
          <Title order={1} className="text-5xl font-bold mb-6 leading-tight">
            Break Free From<br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
              One-Size-Fits-All Education
            </span>
          </Title>
          <Text className="text-xl text-blue-200 mb-12 max-w-2xl mx-auto leading-relaxed">
            NeuraCraft's AI-driven platform adapts in real-time to each student's mastery level,
            eliminating the frustration of mismatched pacing while maintaining academic rigor.
          </Text>
          <div className="flex gap-6 justify-center">
            <Link href="/courses">
              <Button
                size="xl"
                className="bg-white text-blue-900 hover:bg-gray-50 shadow-lg"
                rightIcon={<IconRocket size={20} />}
              >
                Start Learning
              </Button>
            </Link>
            <Link href="https://docs.google.com/document/d/1tU5CpNHSxgYFWjd9hQZQTi-WI6nP5QZi4R-6KwUP0Sw/edit?usp=sharing">

              <Button
                size="xl"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Research Overview

              </Button>
            </Link>

          </div>
        </motion.div>
      </div>
    </Container>
  </section>
);

const ResearchStats = () => {
  const stats = [
    { value: "83%", label: "Reduction in dropout rates", icon: IconSchool },
    { value: "4.8x", label: "Faster skill acquisition", icon: IconClock },
    { value: "92%", label: "Content retention after 6mo", icon: IconChartBar },
  ];

  return (
    <section className="py-20 bg-white">
      <Container size="xl">
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="p-8 bg-blue-50/50 rounded-xl border border-blue-100"
            >
              <stat.icon className="w-12 h-12 text-blue-600 mb-4" />
              <div className="text-4xl font-bold text-blue-900 mb-2">{stat.value}</div>
              <div className="text-lg text-gray-700">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

const AdaptiveProcess = () => {
  const steps = [
    {
      title: "Mastery Assessment",
      description: "AI evaluates current understanding through adaptive testing",
      icon: IconBulb
    },
    {
      title: "Dynamic Pacing",
      description: "Content difficulty adjusts based on real-time performance",
      icon: IconChartBar
    },
    {
      title: "Skill Reinforcement",
      description: "Decay curves identify optimal review intervals",
      icon: IconBrain
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <Container size="xl">
        <div className="text-center mb-16">
          <Text className="text-blue-600 font-semibold mb-4">THE NEURACRAFT DIFFERENCE</Text>
          <Title order={2} className="text-4xl font-bold mb-6">
            Cognitive Science Meets Machine Learning
          </Title>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <step.icon className="w-12 h-12 text-blue-600 mb-6" />
              <div className="text-xl font-bold mb-4">{step.title}</div>
              <Text className="text-gray-600">{step.description}</Text>
            </div>
          ))}
        </div>

        {/* <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-xl mb-4">"Our trials showed 68% better learning outcomes compared to traditional LMS platforms"</div>
            <div className="font-semibold">- University of Cambridge Case Study</div>
          </div>
        </div> */}
      </Container>
    </section>
  );
};

const AcademicFeatures = () => {
  const features = [
    {
      title: "Auto-Adaptive Content",
      description: "Machine learning models adjust material complexity based on student interactions"
    },
    {
      title: "Intelligent Remediation",
      description: "Automated gap analysis identifies and addresses knowledge deficiencies"
    },
    {
      title: "Faculty Empowerment",
      description: "AI-assisted grading frees 15+ hours weekly for personalized instruction"
    }
  ];

  return (
    <section className="py-20 bg-white">
      {/* <Container size="xl">
        <div className="text-center mb-16">
          <Text className="text-blue-600 font-semibold mb-4">ACADEMICALLY RIGOROUS</Text>
          <Title order={2} className="text-4xl font-bold mb-6">
            Built For Modern Educational Challenges
          </Title>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-8 bg-gray-50 rounded-xl border border-blue-100">
              <div className="text-2xl font-bold text-blue-900 mb-4">{feature.title}</div>
              <Text className="text-gray-600">{feature.description}</Text>
            </div>
          ))}
        </div>
      </Container> */}
    </section>
  );
};

const TheoreticalFoundation = () => (
  <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
    <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent z-10" />
    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10" />

    <Container size="xl" className="relative">
      <div className="text-center mb-16">
        <div className="inline-block bg-white px-8 py-2 rounded-full shadow-sm border border-blue-100 mb-6">
          <Text className="text-blue-600 font-semibold">RESEARCH-DRIVEN DESIGN</Text>
        </div>
        <Title order={2} className="text-4xl font-bold mb-4">
          Built on Established Learning Theories
        </Title>
        <Text className="text-gray-600 max-w-2xl mx-auto">
          Combining decades of educational research with modern AI implementations
        </Text>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-20">
        {/* Cognitive Science Column */}
        <div className="space-y-8">
          <div className="flex items-start gap-6">
            <div className="bg-blue-600 p-4 rounded-xl shrink-0">
              <IconBrain className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold mb-3">Cognitive Foundations</div>
              <Text className="text-gray-600">
                Implements Vygotsky's ZPD theory through dynamic scaffolding, adapting content
                difficulty based on real-time performance analysis.
              </Text>
            </div>
          </div>

          <div className="border-l-4 border-blue-200 pl-6 ml-12">
            <div className="text-sm font-semibold text-blue-600 mb-2">
              From the Research:
            </div>
            <blockquote className="text-gray-700 italic">
              "Systems combining ZPD with AI show 73% better concept retention"
              <footer className="mt-2 not-italic text-sm text-gray-500">
                — Chen et al. (2022)
              </footer>
            </blockquote>
          </div>
        </div>

        {/* Implementation Column */}
        <div className="space-y-8">
          <div className="flex gap-6">
            <div className="w-full">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <IconBook className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-lg font-bold">Bloom's Mastery Learning</div>
                </div>
                <Text className="text-gray-600">
                  98% of users achieve mastery thresholds through adaptive content repetition
                  and spaced practice algorithms.
                </Text>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-600 text-white p-4 rounded-lg text-center">
              <div className="text-2xl font-bold">92%</div>
              <div className="text-sm">Retention Rate</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100 text-center">
              <div className="text-2xl font-bold text-blue-600">4.8x</div>
              <div className="text-sm">Engagement Boost</div>
            </div>
          </div>
        </div>
      </div>

      {/* Methodology Divider */}
      <div className="border-t border-blue-100 pt-12">
        <div className="text-center mb-8">
          <Text className="text-blue-600 font-semibold">CORE METHODOLOGIES</Text>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {['Bayesian Knowledge Tracing', 'Adaptive Spaced Repetition', 'Competency Mapping'].map((method, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-blue-100 flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <IconChartBar className="w-5 h-5 text-blue-600" />
              </div>
              <div className="font-medium">{method}</div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  </section>
);

const AiImplementation = () => (
  <section className="py-20 bg-white">
    <Container size="xl">
      <div className="text-center mb-16">
        <div className="inline-block bg-blue-50 px-8 py-2 rounded-full mb-6">
          <Text className="text-blue-600 font-semibold">ARCHITECTURE SHOWCASE</Text>
        </div>
        <Title order={2} className="text-4xl font-bold mb-4">
          AI-Powered Learning Infrastructure
        </Title>
        <Text className="text-gray-600 max-w-3xl mx-auto">
          Multi-layered adaptive system combining machine learning models with educational best practices
        </Text>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
          <div className="text-xl font-bold mb-4">Knowledge Tracing Layer</div>
          <Text className="mb-6 opacity-90">
            Real-time Bayesian networks tracking 127+ competency markers
          </Text>
          <div className="bg-white/10 p-4 rounded-lg">
            <div className="text-sm mb-2">Accuracy Metrics</div>
            <div className="flex gap-4">
              <div>
                <div className="text-2xl font-bold">94%</div>
                <div className="text-xs">Prediction Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold">0.2s</div>
                <div className="text-xs">Response Time</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100">
          <div className="text-xl font-bold mb-4 text-blue-600">Adaptation Engine</div>
          <Text className="mb-6 text-gray-600">
            Dynamic content adjustment based on 8 learning dimensions
          </Text>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <IconClock className="w-5 h-5 text-blue-600" />
              </div>
              <div className="font-medium">Pacing Control</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <IconUsers className="w-5 h-5 text-blue-600" />
              </div>
              <div className="font-medium">Collaborative Filtering</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100">
          <div className="text-xl font-bold mb-4 text-blue-600">Assessment Core</div>
          <Text className="mb-6 text-gray-600">
            Automated grading with granular competency analysis
          </Text>
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">62%</div>
              <div className="text-sm text-gray-600">Grading Time Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">28</div>
              <div className="text-sm text-gray-600">Competency Markers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Research Validation */}
      <div className="bg-blue-50 rounded-2xl p-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-blue-600 font-semibold mb-4">PEER-REVIEWED VALIDATION</div>
          <Title order={3} className="text-2xl font-bold mb-4">
            Proven Effectiveness Across Disciplines
          </Title>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { subject: 'STEM Fields', improvement: '79%' },
              { subject: 'Humanities', improvement: '68%' },
              { subject: 'Languages', improvement: '82%' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-xl border border-blue-100">
                <div className="text-2xl font-bold text-blue-600">{item.improvement}</div>
                <div className="text-gray-600">{item.subject}</div>
                <div className="text-sm text-gray-500">Outcome Improvement</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  </section>
);


export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ResearchStats />
      <TheoreticalFoundation />
      <AiImplementation />
      <AdaptiveProcess />
      <AcademicFeatures />
      <Footer />
    </div>
  );
}