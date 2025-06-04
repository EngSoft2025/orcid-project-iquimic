import { RceiLayout } from "@/components/RceiLayout";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function CollaboratorRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    institution: "",
    department: "",
    position: "",
    country: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados enviados:", form);
    // Aqui você pode adicionar lógica para enviar os dados ao backend
  };

  return (
    <>
      <Helmet>
        <title>Cadastrar Colaborador | RCEI</title>
      </Helmet>
      <RceiLayout>
        <div className="max-w-3xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Cadastrar Colaborador</h1>
            <p className="text-muted-foreground">
              Preencha os campos abaixo para adicionar um novo colaborador à rede.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nome completo</Label>
              <Input id="name" name="name" value={form.name} onChange={handleChange} required />
            </div>

            <div>
              <Label htmlFor="email">E-mail institucional</Label>
              <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>

            <div>
              <Label htmlFor="institution">Instituição</Label>
              <Input id="institution" name="institution" value={form.institution} onChange={handleChange} required />
            </div>

            <div>
              <Label htmlFor="department">Departamento</Label>
              <Input id="department" name="department" value={form.department} onChange={handleChange} />
            </div>

            <div>
              <Label htmlFor="position">Cargo</Label>
              <Input id="position" name="position" value={form.position} onChange={handleChange} />
            </div>

            <div>
              <Label htmlFor="country">País</Label>
              <Input id="country" name="country" value={form.country} onChange={handleChange} />
            </div>

            {/* <div>
              <Label htmlFor="description">Descrição ou área de atuação</Label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="w-full border border-input bg-background px-3 py-2 text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rcei-green-500"
                value={form.description}
                onChange={handleChange}
              />
            </div> */}

            <Button type="submit" className="bg-rcei-green-500 hover:bg-rcei-green-600">
              Cadastrar Colaborador
            </Button>
          </form>
        </div>
      </RceiLayout>
    </>
  );
}
