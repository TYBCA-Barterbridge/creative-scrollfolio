
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would send the form data to a server
    console.log("Form submitted:", formData);
    
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    
    if (formRef.current) {
      formRef.current.reset();
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="w-screen h-screen flex items-center px-24">
      <div className="w-full max-w-4xl mx-auto grid grid-cols-2 gap-16">
        <div>
          <h2 className="text-5xl font-bold mb-8 text-purple">Get In Touch</h2>
          <p className="text-xl text-light/80 mb-8">
            Have a project in mind or want to discuss potential collaborations? 
            I'd love to hear from you!
          </p>
          
          <div className="space-y-4 text-light/70">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-purple">📍</span>
              </div>
              <span>New York, USA</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-purple">📧</span>
              </div>
              <span>hello@portfolio.com</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-purple">📱</span>
              </div>
              <span>+1 (555) 123-4567</span>
            </div>
          </div>
          
          <div className="flex gap-4 mt-12">
            <a 
              href="#" 
              className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center hover:bg-purple transition-colors"
              data-cursor-hover
            >
              <span>🐦</span>
            </a>
            <a 
              href="#" 
              className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center hover:bg-purple transition-colors"
              data-cursor-hover
            >
              <span>👨‍💻</span>
            </a>
            <a 
              href="#" 
              className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center hover:bg-purple transition-colors"
              data-cursor-hover
            >
              <span>📸</span>
            </a>
          </div>
        </div>
        
        <div className="bg-secondary rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
          
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input 
                placeholder="Your Name" 
                name="name"
                onChange={handleChange}
                className="bg-muted border-none"
                required
              />
            </div>
            
            <div>
              <Input 
                placeholder="Your Email" 
                name="email"
                type="email"
                onChange={handleChange}
                className="bg-muted border-none"
                required
              />
            </div>
            
            <div>
              <Textarea 
                placeholder="Your Message" 
                name="message"
                onChange={handleChange}
                className="bg-muted border-none min-h-[150px]"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-purple hover:bg-purple/90"
              data-cursor-hover
            >
              Send Message
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
