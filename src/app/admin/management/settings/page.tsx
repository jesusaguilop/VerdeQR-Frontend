'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export default function SettingsManagementPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Configuración</CardTitle>
          <CardDescription>
            Ajustes generales del panel de administración.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Notifications Section */}
          <section>
            <h3 className="text-lg font-semibold text-primary mb-4">
              Notificaciones
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="suggestion-notifications">
                    Notificaciones por nuevas sugerencias
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Recibir un email cuando un usuario envíe una sugerencia.
                  </p>
                </div>
                <Switch
                  id="suggestion-notifications"
                  aria-label="Toggle suggestion notifications"
                />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="user-notifications">
                    Notificaciones de nuevos usuarios
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Recibir un email cuando se registre un nuevo usuario.
                  </p>
                </div>
                <Switch
                  id="user-notifications"
                  defaultChecked
                  aria-label="Toggle user notifications"
                />
              </div>
            </div>
          </section>

          <Separator />

          {/* Appearance Section */}
          <section>
            <h3 className="text-lg font-semibold text-primary mb-4">
              Apariencia
            </h3>
            <div className="space-y-4 max-w-sm">
              <div className="space-y-2">
                <Label htmlFor="language">Idioma</Label>
                <Select defaultValue="es">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Selecciona un idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="en">English (US)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="items-per-page">
                  Elementos por página en tablas
                </Label>
                <Select defaultValue="10">
                  <SelectTrigger id="items-per-page">
                    <SelectValue placeholder="Selecciona una cantidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          <Separator />

          {/* Account Section */}
          <section>
            <h3 className="text-lg font-semibold text-primary mb-4">
              Cuenta
            </h3>
            <div className="space-y-6">
              <div className="space-y-2 max-w-sm">
                 <Label htmlFor="current-password">Cambiar Contraseña</Label>
                 <Input id="current-password" type="password" placeholder="Contraseña actual"/>
                 <Input id="new-password" type="password" placeholder="Nueva contraseña"/>
              </div>
               <Button variant="outline">Guardar Contraseña</Button>
               <div className="flex items-center justify-between p-4 border rounded-lg bg-background/50">
                <div>
                  <h4 className="font-medium">Exportar mis datos</h4>
                  <p className="text-sm text-muted-foreground">
                    Descarga toda tu información en un archivo CSV.
                  </p>
                </div>
                <Button variant="secondary">Exportar</Button>
               </div>
            </div>
          </section>

          <Separator />
           <div className="flex justify-end">
              <Button>Guardar Cambios</Button>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
