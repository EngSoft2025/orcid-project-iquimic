import { useEffect, useState } from "react";
import { getAllInfo } from "@/services/orcid";

export function PersonalInfo() {
    const [person, setPerson] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetch() {
            try {
                const data = await getAllInfo();
                setPerson(data.person);
                setError(null);
            } catch {
                setError("Erro ao carregar dados pessoais");
            } finally {
                setLoading(false);
            }
        }
        fetch();
    }, []);

    if (loading) return <p>Carregando dados pessoais...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!person) return null;

    const givenNames = person?.name?.["given-names"]?.value || "";
    const familyName = person?.name?.["family-name"]?.value || "";
    const bio = person?.biography?.content || "";
    const photo = person?.["profile-image"]?.path || "";

    return (
        <section className="border rounded p-4">
            <h2 className="text-xl font-semibold mb-2">Dados Pessoais</h2>
            <div className="flex items-center gap-4">
                {photo && (
                    <img
                        src={photo}
                        alt={`${givenNames} ${familyName}`}
                        className="w-24 h-24 rounded-full object-cover"
                    />
                )}
                <div>
                    <p className="text-lg font-bold">{givenNames} {familyName}</p>
                    <p className="text-sm text-muted-foreground">{bio}</p>
                </div>
            </div>
        </section>
    );
}
