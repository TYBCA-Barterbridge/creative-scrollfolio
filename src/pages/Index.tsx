
import { useState, useRef } from "react";
import ThreeScene from "@/components/ThreeScene";
import Navigation from "@/components/Navigation";
import HorizontalScroller, { HorizontalScrollerRef } from "@/components/HorizontalScroller";
import HomeSection from "@/components/HomeSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import CustomCursor from "@/components/CustomCursor";

const sections = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const horizontalScrollerRef = useRef<HorizontalScrollerRef>(null);

  const handleSectionChange = (sectionIndex: number) => {
    setActiveSection(sections[sectionIndex].id);
  };

  const handleSectionClick = (sectionId: string) => {
    const sectionIndex = sections.findIndex((section) => section.id === sectionId);
    if (horizontalScrollerRef.current) {
      horizontalScrollerRef.current.scrollToSection(sectionIndex);
    }
  };

  return (
    <div className="min-h-screen bg-dark text-light overflow-hidden">
      <CustomCursor />
      
      <ThreeScene scrollProgress={scrollProgress} />
      
      <Navigation 
        sections={sections} 
        activeSection={activeSection} 
        onSectionClick={handleSectionClick} 
      />
      
      <HorizontalScroller
        ref={horizontalScrollerRef}
        onScroll={(progress) => setScrollProgress(progress)}
        onSectionChange={handleSectionChange}
      >
        <section id="home" className="section-snap min-w-full">
          <HomeSection />
        </section>
        
        <section id="projects" className="section-snap min-w-full">
          <ProjectsSection />
        </section>
        
        <section id="about" className="section-snap min-w-full">
          <AboutSection />
        </section>
        
        <section id="contact" className="section-snap min-w-full">
          <ContactSection />
        </section>
      </HorizontalScroller>
    </div>
  );
};

export default Index;
