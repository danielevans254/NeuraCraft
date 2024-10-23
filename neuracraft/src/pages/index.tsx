import Image from "next/image";
import { motion } from "framer-motion";
import { IconBrain, IconBook, IconTrophy, IconRocket, IconAward } from '@tabler/icons';

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import {
  Box,
  Button,
  Container,
  createStyles,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { Star, Brain, Timer, Users, Globe, Book, Award, ChevronRight } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex flex-col items-center text-center">
        <div className="p-3 rounded-full bg-blue-50 mb-4">
          <Icon className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const StatCard = ({ value, label }) => {
  return (
    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg">
      <div className="text-3xl font-bold text-blue-600 mb-2">{value}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
};

const TestimonialCard = ({ content, author, role, rating }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
      </div>
      <p className="text-gray-700 italic mb-4">"{content}"</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('students');

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Personalized learning paths adapted to your pace and style using advanced AI algorithms"
    },
    {
      icon: Timer,
      title: "Microlearning",
      description: "Bite-sized lessons designed for optimal retention and efficient learning"
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description: "Join study groups and participate in peer-to-peer learning sessions"
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connect with learners and experts from around the world"
    },
    {
      icon: Book,
      title: "Rich Content Library",
      description: "Access thousands of courses across various disciplines and skill levels"
    },
    {
      icon: Award,
      title: "Certifications",
      description: "Earn industry-recognized certificates upon course completion"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Container>
        <div className="pt-4">
          <Navbar withBorder={false} {...{ className: "bg-transparent" }} />
        </div>
      </Container>
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Transform Your Learning Journey
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Experience adaptive learning powered by our recommendation algorithm, tailored to your unique needs and learning style
          </p>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Community Says</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              content="The AI-powered recommendations helped me learn at my own pace. It's like having a personal tutor!"
              author="Sarah Johnson"
              role="Software Developer"
              rating={5}
            />
            <TestimonialCard
              content="The collaborative features made learning fun and interactive. I've made great connections!"
              author="Michael Chen"
              role="Business Student"
              rating={5}
            />
            <TestimonialCard
              content="Earning my certification through this platform opened new career opportunities."
              author="Emma Rodriguez"
              role="Data Analyst"
              rating={5}
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-blue-600 text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
          <p className="text-lg mb-8">Join thousands of learners who are achieving their goals with our platform</p>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-colors">
            Start Free Trial
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage
