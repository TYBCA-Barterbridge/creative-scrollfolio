
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  demoUrl?: string;
}

const ProjectCard = ({ title, description, tags, image, demoUrl }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-[550px] overflow-hidden rounded-xl flex flex-col bg-secondary h-[550px] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor-hover
    >
      <div className="relative w-full h-[300px] overflow-hidden">
        <div className={`
          absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out
          ${isHovered ? 'scale-110' : 'scale-100'}
        `}
        style={{ backgroundImage: `url(${image})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/30 to-transparent" />
      </div>

      <div className="relative flex-1 p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-2 group-hover:text-purple transition-colors">{title}</h3>
          <p className="text-light/70 line-clamp-3 mb-4">{description}</p>
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span key={index} className="text-xs px-3 py-1 rounded-full bg-muted text-purple">
                {tag}
              </span>
            ))}
          </div>

          {demoUrl && (
            <Button 
              variant="ghost" 
              className="group/button hover:bg-purple hover:text-white transition-colors"
            >
              <span>View Project</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
