
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useManagement } from '@/components/admin/management-provider';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Leaf, Sprout, Trees, Building, Info, Sparkles } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DetailSection from '@/components/tree-details/detail-section';

export default function TreeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { trees, species, treeUses, centers, funFacts } = useManagement();

  const tree = trees.find((t) => t.id === parseInt(id as string, 10));
  console.log(tree);
  if (!tree) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-20rem)] text-center p-4">
        <Trees className="w-24 h-24 text-destructive mb-6" />
        <h1 className="text-3xl font-bold text-destructive">Árbol no encontrado</h1>
        <p className="text-lg text-muted-foreground mt-2">
          El árbol que buscas no existe o ha sido movido.
        </p>
        <Button onClick={() => router.push('/')} className="mt-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al Inicio
        </Button>
      </div>
    );
  }
  console.log(tree.imageUrl)
  const treeSpecie = species.find((s) => s.scientificName === tree.species);
  const treeCenter = centers.find((c) => c.name === tree.center);
  const uses = treeUses.filter((u) => u.species === tree.species);
  const relatedFunFacts = funFacts.filter((ff) => ff.species === tree.species);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="mb-8 group"
      >
        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Volver
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-8">
          <Card className="overflow-hidden shadow-lg">
            <div className="relative w-full h-80">
              <Image
                src={tree.imageUrl}
                alt={`Imagen de ${tree.commonName}`}
                fill
                style={{ objectFit: 'cover' }}
                data-ai-hint="plant sapling"
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-primary font-headline text-2xl">
                {tree.commonName}
              </CardTitle>
              <p className="text-md text-muted-foreground italic">
                {tree.species}
              </p>
            </CardHeader>
            {treeSpecie && (
              <CardContent>
                <DetailSection title="Especie" icon={Sprout}>
                  <p className="text-sm text-muted-foreground">{treeSpecie.description}</p>
                </DetailSection>
              </CardContent>
            )}
          </Card>

          {treeCenter && (
            <Card>
              <CardContent className="p-6">
                <DetailSection title="Centro de Formación" icon={Building}>
                  <p className="font-semibold">{tree.center}</p>
                  <p className="text-sm text-muted-foreground">{treeCenter.address}</p>
                </DetailSection>
              </CardContent>
            </Card>
          )}

        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardContent className="p-6">
              <DetailSection title="Descripción General" icon={Info}>
                <p className="text-muted-foreground leading-relaxed">
                  {tree.description}
                </p>
              </DetailSection>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <DetailSection title="Características" icon={BookOpen}>
                <p className="text-muted-foreground leading-relaxed">
                  {tree.characteristics}
                </p>
              </DetailSection>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <DetailSection title="Tipo de Bosque" icon={Leaf}>
                <Badge variant="secondary" className="text-base">{tree.forestType}</Badge>
              </DetailSection>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <DetailSection title="Usos del Árbol" icon={BookOpen}>
                {uses.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {uses.map(use => (
                      <Badge key={use.id} variant="outline" className="text-sm">{use.useName} ({use.category})</Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No se han registrado usos para esta especie.</p>
                )}
              </DetailSection>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <DetailSection title="Servicios Ecosistémicos" icon={Trees}>
                <p className="text-muted-foreground leading-relaxed">
                  {tree.ecoServices}
                </p>
              </DetailSection>
            </CardContent>
          </Card>
          {relatedFunFacts.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <DetailSection title="Datos Curiosos" icon={Sparkles}>
                  <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                    {relatedFunFacts.map(fact => (
                      <li key={fact.id} className="leading-relaxed">{fact.fact}</li>
                    ))}
                  </ul>
                </DetailSection>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
