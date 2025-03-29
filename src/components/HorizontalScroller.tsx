
import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface HorizontalScrollerProps {
  children: React.ReactNode;
  onScroll?: (progress: number) => void;
  onSectionChange?: (sectionIndex: number) => void;
}

export interface HorizontalScrollerRef {
  scrollToSection: (index: number) => void;
}

const HorizontalScroller = forwardRef<HorizontalScrollerRef, HorizontalScrollerProps>(
  ({ children, onScroll, onSectionChange }, ref) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activeSection, setActiveSection] = useState(0);
    const isMobile = useIsMobile();
    
    // Expose scrollToSection method to parent components
    useImperativeHandle(ref, () => ({
      scrollToSection: (index: number) => {
        scrollToSection(index);
      },
    }));
    
    // Handle scroll
    useEffect(() => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;

      const handleScroll = () => {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
        const scrollProgress = scrollLeft / (scrollWidth - clientWidth);
        
        if (onScroll) {
          onScroll(scrollProgress);
        }
        
        // Calculate which section is in view
        const childrenArray = Array.from(scrollContainer.children);
        const sectionPositions = childrenArray.map((child) => {
          return child.getBoundingClientRect().left - scrollContainer.getBoundingClientRect().left;
        });
        
        const centerPosition = scrollContainer.scrollLeft + clientWidth / 2;
        let closestSectionIndex = 0;
        let closestDistance = Math.abs(sectionPositions[0] - centerPosition);
        
        sectionPositions.forEach((position, index) => {
          const distance = Math.abs(position - centerPosition);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestSectionIndex = index;
          }
        });
        
        if (activeSection !== closestSectionIndex) {
          setActiveSection(closestSectionIndex);
          if (onSectionChange) {
            onSectionChange(closestSectionIndex);
          }
        }
      };

      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }, [activeSection, onScroll, onSectionChange]);

    // Scroll to a specific section
    const scrollToSection = (index: number) => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;
      
      const childrenArray = Array.from(scrollContainer.children);
      if (index >= 0 && index < childrenArray.length) {
        const targetSection = childrenArray[index];
        scrollContainer.scrollTo({
          left: targetSection.getBoundingClientRect().left - scrollContainer.getBoundingClientRect().left + scrollContainer.scrollLeft,
          behavior: "smooth"
        });
      }
    };

    return (
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto horizontal-scroll-container smooth-scroll h-screen mt-16"
        style={{ overflowY: "hidden" }}
      >
        {children}
      </div>
    );
  }
);

HorizontalScroller.displayName = "HorizontalScroller";

export default HorizontalScroller;
