'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CommunitySection() {
  const [showInput, setShowInput] = useState(false);
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleRegisterClick = () => {
    setShowInput(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Por favor, introduce tu correo electrónico.',
      });
      return;
    }
    console.log('Email submitted:', email);
    toast({
      title: '¡Gracias por unirte!',
      description: `Hemos recibido tu correo: ${email}`,
    });
    setEmail('');
    setShowInput(false);
  };

  return (
    <section id="comunidad" className="py-20 lg:py-32 bg-primary/5">
      <div className="container mx-auto px-4 text-center">
        <Users className="h-16 w-16 text-primary mx-auto mb-6" />
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">
          Únete a la Comunidad VerdeQR
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Forma parte de una comunidad apasionada por la naturaleza y la tecnología. Comparte tus descubrimientos, aprende de otros y contribuye a un futuro más verde.
        </p>
        <div className="mt-8 flex justify-center items-center gap-4 transition-all duration-500">
          {!showInput ? (
            <Button
              onClick={handleRegisterClick}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transition-transform duration-300 hover:scale-105"
            >
              Regístrate Ahora
            </Button>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-sm items-center space-x-2 animate-in fade-in slide-in-from-left-4 duration-500"
            >
              <div className="relative flex-grow">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 text-base"
                  autoFocus
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-transform duration-300 hover:scale-105 h-12"
              >
                Unirme
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
