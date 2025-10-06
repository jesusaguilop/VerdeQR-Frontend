import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Leaf, QrCode, Microscope, Users, Clock, TreePine } from "lucide-react";

const stats = [
  { icon: TreePine, value: "500+", label: "Árboles Catalogados" },
  { icon: Microscope, value: "150+", label: "Especies Documentadas" },
  { icon: Users, value: "10K+", label: "Consultas Realizadas" },
  { icon: Clock, value: "24/7", label: "Acceso Disponible" },
];

const features = [
  {
    icon: QrCode,
    title: "Escaneo QR Instantáneo",
    description: "Escanea códigos QR con tu dispositivo móvil y obtén información detallada sobre cualquier árbol silvestre al instante.",
  },
  {
    icon: BookOpen,
    title: "Base de Datos Completa",
    description: "Accede a información científica detallada: nombres, características, usos medicinales y datos de conservación.",
  },
  {
    icon: Leaf,
    title: "Educación Ambiental",
    description: "Aprende sobre la biodiversidad local y contribuye al conocimiento de los ecosistemas forestales.",
  },
];

export default function BenefitsSection() {
  return (
    <section id="beneficios" className="py-20 lg:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">
            Identifica árboles al instante con QR
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
            Accede a información completa sobre árboles silvestres. Escanea códigos QR y descubre la biodiversidad que te rodea.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6 bg-card/80 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-primary/20 transition-shadow duration-300 hover:-translate-y-1">
              <CardContent className="p-0 flex flex-col items-center justify-center gap-2">
                <stat.icon className="h-10 w-10 text-accent mb-2" />
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-1 gap-8 max-w-3xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col md:flex-row items-center p-6 bg-card/80 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-primary/20 transition-shadow duration-300 hover:-translate-y-1">
              <CardContent className="p-0 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <div className="bg-primary/10 p-4 rounded-full">
                   <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-headline text-primary mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
