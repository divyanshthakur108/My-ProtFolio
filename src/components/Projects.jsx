import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import portfolioImage from "../assets/projects/portfolio.svg";
import urlShortenerImage from "../assets/projects/url-shortener.svg";
import ecommerceImage from "../assets/projects/ecommerce.svg";
import taskManagerImage from "../assets/projects/task-manager.svg";
import chatAppImage from "../assets/projects/chat-app.svg";
import aiImageGeneratorImage from "../assets/projects/ai-image-generator.svg";

const projectData = [
  {
    title: "Portfolio Website",
    description:
      "A responsive personal portfolio built with React, Tailwind CSS and Framer Motion showcasing my skills and projects.",
    image: portfolioImage,
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://your-live-demo-link.com",
    githubUrl: "https://github.com/yourusername/portfolio",
  },
  {
    title: "URL Shortener",
    description:
      "A full-stack URL shortener built using the MERN stack with authentication, analytics and custom short links.",
    image: urlShortenerImage,
    tags: ["React", "Node.js", "Express.js", "MongoDB", "JWT"],
    liveUrl: "https://your-live-demo-link.com",
    githubUrl: "https://github.com/yourusername/url-shortener",
  },
  {
    title: "E-Commerce Website",
    description:
      "A complete MERN e-commerce application with authentication, shopping cart and secure payments.",
    image: ecommerceImage,
    tags: ["React", "Redux Toolkit", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "https://your-live-demo-link.com",
    githubUrl: "https://github.com/yourusername/ecommerce",
  },
  {
    title: "Task Manager",
    description:
      "A productivity application with authentication, drag & drop and CRUD functionality.",
    image: taskManagerImage,
    tags: ["React", "Express", "MongoDB", "Tailwind CSS"],
    liveUrl: "https://your-live-demo-link.com",
    githubUrl: "https://github.com/yourusername/task-manager",
  },
  {
    title: "Chat Application",
    description:
      "A real-time chat application using Socket.io with authentication and private messaging.",
    image: chatAppImage,
    tags: ["React", "Socket.io", "Node.js", "MongoDB"],
    liveUrl: "https://your-live-demo-link.com",
    githubUrl: "https://github.com/yourusername/chat-app",
  },
  {
    title: "AI Image Generator",
    description:
      "Generate AI images using OpenAI APIs with image download functionality.",
    image: aiImageGeneratorImage,
    tags: ["React", "OpenAI API", "Cloudinary", "Tailwind CSS"],
    liveUrl: "https://your-live-demo-link.com",
    githubUrl: "https://github.com/yourusername/ai-image-generator",
  },
];

const Projects = () => {
  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full bg-[#1a1a1a] px-6 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            <span className="text-white">My</span>{" "}
            <span className="text-purple-500">Projects</span>
          </h2>
          <p className="mt-4 text-base text-white/70 sm:text-lg">
            A selection of my recent work
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3"
        >
          {projectData.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: index * 0.08,
              }}
              whileHover={{ y: -10 }}
              className="overflow-hidden rounded-3xl bg-[#2a2a2a] shadow-2xl shadow-black/20 transition duration-300 ease-out hover:shadow-purple-500/30"
            >
              <div className="overflow-hidden rounded-t-3xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-[240px] w-full object-cover transition duration-300 hover:scale-105"
                />
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-semibold text-white">
                  {project.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-white/70">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#1f1f1f] px-4 py-2 text-sm font-medium text-white transition duration-300 hover:scale-105 hover:bg-purple-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-purple-500 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:scale-[1.02] hover:bg-purple-600"
                  >
                    <FaExternalLinkAlt className="mr-2" />
                    Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl border border-purple-500 bg-transparent px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:scale-[1.02] hover:bg-purple-500 hover:text-white"
                  >
                    <FaGithub className="mr-2" />
                    GitHub
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-16 flex justify-center">
          <a
            href="/#"
            className="inline-flex items-center justify-center rounded-xl border border-purple-500 bg-transparent px-8 py-3 text-base font-semibold text-white transition duration-300 hover:scale-[1.02] hover:bg-purple-500 hover:text-white"
          >
            View More Projects →
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;
