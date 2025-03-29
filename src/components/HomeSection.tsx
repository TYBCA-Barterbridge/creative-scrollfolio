
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const HomeSection = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center px-24">
      <div className="max-w-4xl">
        <h1 className="text-7xl font-bold mb-6">
          Creative
          <span className="text-purple ml-4">3D</span>
          <br />
          Experiences
        </h1>
        
        <p className="text-2xl text-light/80 max-w-2xl mb-12">
          I craft immersive digital experiences and innovative
          interfaces that blend technology and creativity.
        </p>
        
        <div className="flex gap-6">
          <Button 
            size="lg" 
            className="bg-purple hover:bg-purple/90 text-white"
            data-cursor-hover
          >
            View Projects
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-light/20 hover:bg-secondary/50"
            data-cursor-hover
          >
            About Me
          </Button>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-8 w-8 text-light/50" />
          <span className="sr-only">Scroll down</span>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
