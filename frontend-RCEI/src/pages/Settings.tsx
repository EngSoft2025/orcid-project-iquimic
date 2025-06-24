import { useState, useEffect } from "react";
import { RceiLayout } from "@/components/RceiLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
  const [userData, setUserData] = useState({
    nome: "",
    email: "",
    institution: "",
    department: "",
    position: "",
    areas: "",
    orcid: "", // Incluindo o campo ORCID
    notificationsEnabled: true,
    darkMode: false,
    publicProfile: true,
  });

  // Buscar dados do usuário quando o componente for montado
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        console.log('Token JWT:', token);  // Verifique o token

        const response = await fetch('http://localhost:8080/api/auth/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Corrigindo a sintaxe da autorização
          },
        });

        const textResponse = await response.text();  // Obtenha o corpo da resposta como texto
        console.log('Conteúdo da resposta:', textResponse);  // Exibe a resposta como texto

        if (response.ok) {
          const data = JSON.parse(textResponse);  // Tenta parsear como JSON manualmente
          setUserData({
            nome: data.nome,
            email: data.email,
            institution: data.institution || "",
            department: data.department || "",
            position: data.position || "",
            areas: data.researchAreas || "",
            orcid: data.orcid || "",  // Garantindo que o ORCID seja carregado
            notificationsEnabled: data.notificationsEnabled,
            darkMode: data.darkMode,
            publicProfile: data.publicProfile,
          });
        } else {
          console.error('Erro ao buscar dados do usuário, status:', response.status);
          console.error('Mensagem de erro:', textResponse);
        }
      } catch (error) {
        console.error('Erro ao fazer requisição para buscar dados do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean, name: string) => {
    setUserData((prevData) => ({ ...prevData, [name]: checked }));

    if (name === "darkMode") {
      // Atualiza o modo escuro no localStorage e no body
      localStorage.setItem('darkMode', String(checked));
      if (checked) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/user/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Corrigido o token
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Configurações salvas com sucesso!');
        console.log('Dados atualizados:', result);
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Erro ao salvar configurações');
      }
    } catch (error) {
      console.error('Erro ao salvar configurações', error);
      alert('Erro ao se conectar ao servidor. Tente novamente mais tarde.');
    }
  };

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
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-3">
              <TabsTrigger value="profile">Perfil</TabsTrigger>
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
                    <Input
                      id="name"
                      name="nome"
                      value={userData.nome}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="institution">Instituição</Label>
                    <Input
                      id="institution"
                      name="institution"
                      value={userData.institution}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Departamento</Label>
                    <Input
                      id="department"
                      name="department"
                      value={userData.department}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Cargo</Label>
                    <Input
                      id="position"
                      name="position"
                      value={userData.position}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="areas">Áreas de Pesquisa</Label>
                    <Input
                      id="areas"
                      name="areas"
                      value={userData.areas}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="orcid">ORCID ID</Label>
                    <Input
                      id="orcid"
                      name="orcid"
                      value={userData.orcid}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="public-profile"
                      checked={userData.publicProfile}
                      onCheckedChange={(checked) => handleSwitchChange(checked, "publicProfile")}
                    />
                    <Label htmlFor="public-profile">Perfil público</Label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-rcei-green-500 hover:bg-rcei-green-600" onClick={handleSave}>
                    Salvar alterações
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Aparência</CardTitle>
                  <CardDescription>Personalize a aparência da aplicação.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="dark-mode"
                      checked={userData.darkMode}
                      onCheckedChange={(checked) => handleSwitchChange(checked, "darkMode")}
                    />
                    <Label htmlFor="dark-mode">Modo escuro</Label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-rcei-green-500 hover:bg-rcei-green-600" onClick={handleSave}>
                    Salvar alterações
                  </Button>
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
                      checked={userData.notificationsEnabled}
                      onCheckedChange={(checked) => handleSwitchChange(checked, "notificationsEnabled")}
                    />
                    <Label htmlFor="enable-notifications">Habilitar notificações</Label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-rcei-green-500 hover:bg-rcei-green-600" onClick={handleSave}>
                    Salvar alterações
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </RceiLayout>
    </>
  );
}
