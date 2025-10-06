import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { centers } from "@/lib/data";
import { MapPin } from "lucide-react";

export default function CentersSection() {
  return (
    <section id="centros" className="py-20 lg:py-32 bg-background/70">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">
            Centros SENA que Participan
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Explora los centros de formación que forman parte de la iniciativa VerdeQR.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {centers.map((center) => (
            <Card key={center.name} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1">
              {center.image && (
                <div className="aspect-w-3 aspect-h-2">
                   <Image
                    src={center.image.imageUrl}
                    alt={`Campus de ${center.name}`}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                    data-ai-hint={center.image.imageHint}
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="font-headline text-xl">{center.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{center.location}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
