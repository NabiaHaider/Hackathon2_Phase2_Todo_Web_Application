'use client';

import { PrimaryButton } from "@/components/common/PrimaryButton";
import { SecondaryButton } from "@/components/common/SecondaryButton";
import { TaskStatsCard } from "@/components/task/TaskStatsCard";
import {
  Gauge,
  CheckCircle,
  Clock,
  ListTodo,
  CheckCircle2,
  BarChart2,
  Lock
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: ListTodo,
    title: "Effortless Task Management",
    description: "Add, edit, and delete tasks with ease, keeping your to-do list always up-to-date."
  },
  {
    icon: CheckCircle2,
    title: "Smart Status Tracking",
    description: "Track the progress of your tasks with clear completed and pending statuses."
  },
  {
    icon: BarChart2,
    title: "Productivity Insights",
    description: "Gain valuable insights into your productivity patterns and task completion rates."
  },
  {
    icon: Lock,
    title: "Secure Authentication",
    description: "Your data is safe with secure user authentication and data privacy."
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-purple-50 text-gray-900">

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="sticky top-0 z-50 w-full p-4 flex justify-between items-center bg-transparent shadow-md backdrop-blur-sm"
      >
        <div className="text-2xl font-bold text-primary">Todo App</div>
        <nav>
          <ul className="flex space-x-2">
            <li>
              <Link href="/login" legacyBehavior>
                <Button variant="ghost" className="hover:bg-primary/10 hover:text-primary">
                  Login
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/signup" legacyBehavior>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Signup
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </motion.header>

      {/* Hero */}
      <motion.main
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-20"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 leading-none text-primary"
        >
          Organize Your Life, <br /> Accomplish More
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl"
        >
          A simple yet powerful Todo application to help you stay on track and boost your productivity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/signup" legacyBehavior>
            <PrimaryButton size="lg">Get Started</PrimaryButton>
          </Link>
          <Link href="/#features" legacyBehavior>
            <SecondaryButton size="lg">Learn More</SecondaryButton>
          </Link>
        </motion.div>
      </motion.main>

      {/* Features */}
      <section id="features" className="py-20 px-4 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 text-primary"
        >
          Powerful Features to Boost Your Productivity
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 h-full flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow">
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-20 px-4 md:px-8"
      >
        <h2 className="text-4xl font-bold text-center mb-12 text-primary">
          Your Productivity at a Glance
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <TaskStatsCard icon={<Gauge className="w-8 h-8" />} count={150} title="Tasks Created" />
          <TaskStatsCard icon={<CheckCircle className="w-8 h-8" />} count={120} title="Tasks Completed" />
          <TaskStatsCard icon={<Clock className="w-8 h-8" />} count={30} title="Tasks Pending" />
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="py-20 px-4 md:px-8 text-center"
      >
        <h2 className="text-4xl font-bold mb-6 text-primary">
          Ready to Take Control of Your Tasks?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-700">
          Join thousands of productive users. Sign up now and start organizing your life!
        </p>
        <Link href="/signup" legacyBehavior>
          <Button size="lg" className="bg-primary text-white hover:bg-primary/90 shadow-lg">
            Start Your Journey Today
          </Button>
        </Link>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-primary text-purple-100 py-10 px-4 md:px-8 text-sm"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-white mb-2">Todo App</h3>
            <p className="text-purple-200">
              &copy; {new Date().getFullYear()} Todo App. All rights reserved.
            </p>
          </div>

          <nav className="flex space-x-6">
            <Link href="#" className="text-purple-200 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-purple-200 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-purple-200 hover:text-white transition-colors">
              Contact Us
            </Link>
          </nav>
        </div>
      </motion.footer>


    </div>
  );
}
