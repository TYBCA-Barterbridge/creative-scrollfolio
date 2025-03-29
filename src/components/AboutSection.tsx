
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutSection = () => {
  return (
    <div className="w-screen h-screen flex items-center px-24">
      <div className="max-w-3xl">
        <h2 className="text-5xl font-bold mb-8 text-purple">About Me</h2>
        <div className="space-y-6 text-light/80">
          <p className="text-xl">
            I'm a creative developer passionate about building immersive digital experiences 
            that combine art and technology.
          </p>
          <p>
            With expertise in 3D graphics, interactive design, and frontend development, 
            I create unique websites and applications that push the boundaries of web experiences.
          </p>
          <p>
            My background in design and technology allows me to approach projects with both 
            creative vision and technical precision, resulting in memorable digital solutions.
          </p>
        </div>
        
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-4">Skills</h3>
          <div className="flex flex-wrap gap-3">
            {["Three.js", "React", "TypeScript", "WebGL", "GLSL", "UI/UX Design", "Animation", "Creative Coding"].map((skill) => (
              <span key={skill} className="px-4 py-2 rounded-full bg-secondary text-light/90">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          className="mt-12 group hover:bg-purple hover:text-white transition-colors"
          data-cursor-hover
        >
          <span>Download Resume</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default AboutSection;
