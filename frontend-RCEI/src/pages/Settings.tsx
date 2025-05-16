
import { useState } from "react";
import { RceiLayout } from "@/components/RceiLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);
  
  return (
    <>
      <Helmet>
        <title>Configurações | RCEI</title>
      </Helmet>
      <RceiLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
          <p className="text-muted-foreground">
            Personalize as configurações da sua conta e da aplicação.
          </p>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="profile">Perfil</TabsTrigger>
              <TabsTrigger value="account">Conta</TabsTrigger>
              <TabsTrigger value="appearance">Aparência</TabsTrigger>
              <TabsTrigger value="notifications">Notificações</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Perfil</CardTitle>
                  <CardDescription>
                    Gerencie as informações do seu perfil acadêmico.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" defaultValue="Prof. Seiji Isotani" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="institution">Instituição</Label>
                    <Input id="institution" defaultValue="Universidade de São Paulo" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Departamento</Label>
                    <Input id="department" defaultValue="Instituto de Ciências Matemáticas e de Computação" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Cargo</Label>
                    <Input id="position" defaultValue="Professor Titular" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="areas">Áreas de Pesquisa</Label>
                    <Input id="areas" defaultValue="Computação, Educação, Inteligência Artificial" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="public-profile" 
                      checked={publicProfile} 
                      onCheckedChange={setPublicProfile} 
                    />
                    <Label htmlFor="public-profile">Perfil público</Label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-rcei-green-500 hover:bg-rcei-green-600">Salvar alterações</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="account" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Conta</CardTitle>
                  <CardDescription>
                    Atualize as configurações da sua conta.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" defaultValue="seiji.isotani@usp.br" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="orcid">ORCID ID</Label>
                    <Input id="orcid" defaultValue="0000-0003-3905-0546" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input id="password" type="password" value="********" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Alterar senha</Button>
                  <Button className="bg-rcei-green-500 hover:bg-rcei-green-600">Salvar alterações</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="appearance" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Aparência</CardTitle>
                  <CardDescription>
                    Personalize a aparência da aplicação.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="dark-mode" 
                      checked={isDarkMode} 
                      onCheckedChange={setIsDarkMode} 
                    />
                    <Label htmlFor="dark-mode">Modo escuro</Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="theme">Tema</Label>
                    <Select defaultValue="green">
                      <SelectTrigger id="theme">
                        <SelectValue placeholder="Selecione um tema" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="green">Verde (Padrão)</SelectItem>
                        <SelectItem value="blue">Azul</SelectItem>
                        <SelectItem value="purple">Roxo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="font-size">Tamanho da fonte</Label>
                    <Select defaultValue="normal">
                      <SelectTrigger id="font-size">
                        <SelectValue placeholder="Selecione um tamanho" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Pequena</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="large">Grande</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-rcei-green-500 hover:bg-rcei-green-600">Salvar alterações</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notificações</CardTitle>
                  <CardDescription>
                    Configure suas preferências de notificação.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="enable-notifications" 
                      checked={notificationsEnabled} 
                      onCheckedChange={setNotificationsEnabled} 
                    />
                    <Label htmlFor="enable-notifications">Habilitar notificações</Label>
                  </div>
                  <div className="space-y-2 pt-2">
                    <h3 className="text-sm font-medium mb-2">Notificar sobre:</h3>
                    <div className="flex items-center space-x-2">
                      <Switch id="new-citations" defaultChecked />
                      <Label htmlFor="new-citations">Novas citações</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="collaborator-publications" defaultChecked />
                      <Label htmlFor="collaborator-publications">Publicações de colaboradores</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="project-updates" defaultChecked />
                      <Label htmlFor="project-updates">Atualizações de projetos</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="new-reviews" defaultChecked />
                      <Label htmlFor="new-reviews">Novas avaliações</Label>
                    </div>
                  </div>
                  <div className="space-y-2 pt-2">
                    <Label htmlFor="email-frequency">Frequência de e-mails</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger id="email-frequency">
                        <SelectValue placeholder="Selecione uma frequência" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediately">Imediatamente</SelectItem>
                        <SelectItem value="daily">Diário</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-rcei-green-500 hover:bg-rcei-green-600">Salvar alterações</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </RceiLayout>
    </>
  );
}