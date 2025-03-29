
import { useRef } from "react";
import ProjectCard from "./ProjectCard";

// Sample project data
const projects = [
  {
    id: 1,
    title: "Immersive 3D Experience",
    description: "A WebGL-powered interactive experience showcasing innovative 3D design principles and creative coding techniques.",
    tags: ["Three.js", "WebGL", "Interactive"],
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80",
    demoUrl: "#"
  },
  {
    id: 2,
    title: "E-Commerce Redesign",
    description: "Complete overhaul of an e-commerce platform with custom animations, improved UX, and responsive design.",
    tags: ["UI/UX", "Animation", "React"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
    demoUrl: "#"
  },
  {
    id: 3,
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard with real-time data visualization and custom chart components.",
    tags: ["D3.js", "React", "Data Viz"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
    demoUrl: "#"
  },
  {
    id: 4,
    title: "Mobile Gaming App",
    description: "Cross-platform mobile game with physics-based mechanics and engaging user experience.",
    tags: ["Gaming", "React Native", "Physics"],
    image: "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?auto=format&fit=crop&q=80",
    demoUrl: "#"
  }
];

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-screen h-screen flex flex-col justify-center px-24">
      <h2 className="text-5xl font-bold mb-12 text-purple">Projects</h2>
      
      <div className="relative overflow-x-auto no-scrollbar">
        <div 
          ref={containerRef}
          className="flex gap-8 pb-8"
        >
          {projects.map((project) => (
            <ProjectCard 
              key={project.id}
              title={project.title}
              description={project.description}
              tags={project.tags}
              image={project.image}
              demoUrl={project.demoUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
