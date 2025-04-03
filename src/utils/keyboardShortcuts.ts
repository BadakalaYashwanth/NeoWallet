
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

export const useKeyboardShortcuts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only trigger if Ctrl/Cmd is pressed
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'c':
            // Calculator shortcut: Ctrl+C
            if (!e.shiftKey && !e.altKey) {
              e.preventDefault();
              navigate('/calculator');
              toast({
                title: "Calculator opened",
                description: "Use keyboard for calculations",
              });
            }
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate, toast]);
};
