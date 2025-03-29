
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  sections: {
    id: string;
    label: string;
  }[];
  activeSection: string;
  onSectionClick: (id: string) => void;
}

const Navigation = ({ sections, activeSection, onSectionClick }: NavigationProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-6",
        scrolled ? "glass py-4" : ""
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-purple rounded-full animate-pulse-light"></div>
          <h1 className="text-2xl font-bold">Portfolio</h1>
        </div>
        <nav>
          <ul className="flex items-center gap-8">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => onSectionClick(section.id)}
                  className={cn(
                    "font-medium text-sm transition-colors duration-300 relative py-2",
                    activeSection === section.id 
                      ? "text-purple" 
                      : "text-light/80 hover:text-light"
                  )}
                  data-cursor-hover
                >
                  {section.label}
                  {activeSection === section.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple rounded-full" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
