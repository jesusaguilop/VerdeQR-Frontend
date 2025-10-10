import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Header from '@/components/admin/header-simple';
import { TreePine, Users, Building } from 'lucide-react';

const stats = [
  {
    title: 'Árboles registrados',
    value: '0',
    icon: TreePine,
  },
  {
    title: 'Usuarios',
    value: '0',
    icon: Users,
  },
  {
    title: 'Centros participantes',
    value: '0',
    icon: Building,
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Bienvenido, <span className="text-primary">Sergio</span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground text-lg">
            Explora el fascinante mundo de los árboles con VerdeQR. Nuestra
            plataforma te permite descubrir, aprender y contribuir al
            conocimiento y conservación de la flora colombiana. Conoce las
            características, usos y curiosidades de cada especie, y únete a
            nuestra comunidad de amantes de la naturaleza.
          </p>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
