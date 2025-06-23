import { useEffect, useState } from "react";
import { getAllInfo } from "@/services/orcid";

export function EducationsList() {
    const [educations, setEducations] = useState<any[]>([]);
    const [employments, setEmployments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [researcherOrcid, setResearcherOrcid] = useState<string | null>(null);
    useEffect(() => {
        const orcid = localStorage.getItem("selectedResearcherOrcid");
        if (orcid) {
            setResearcherOrcid(orcid);
        }
    }, []);

    useEffect(() => {
        if (!researcherOrcid) return;
        async function fetch() {
            try {
                const data = await getAllInfo(researcherOrcid);

                // educations
                const edusGroups = data["activities-summary"]?.educations?.["affiliation-group"] || [];
                const eduList = edusGroups.flatMap((g: any) => g["education-summary"] || []);

                // employments
                const empGroups = data["activities-summary"]?.employments?.["affiliation-group"] || [];
                // dentro de cada grupo tem 'summaries' que é array de { employment-summary: {...} }
                const empList = empGroups.flatMap((g: any) => g.summaries?.map((s: any) => s["employment-summary"]) || []);

                setEducations(eduList);
                setEmployments(empList);
                setError(null);
            } catch {
                setError("Erro ao carregar afiliações");
            } finally {
                setLoading(false);
            }
        }
        fetch();
    }, [researcherOrcid]);

    if (loading) return <p>Carregando afiliações...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <section className="border rounded p-4 space-y-6">
            <div>
                <h2 className="text-xl font-semibold mb-2">Formações Acadêmicas</h2>
                {educations.length === 0 ? (
                    <p>Nenhuma formação encontrada.</p>
                ) : (
                    <ul className="list-disc list-inside space-y-1 text-sm max-h-48 overflow-auto">
                        {educations.map((edu) => (
                            <li key={edu["put-code"]}>
                                <strong>{edu.organization?.name || "Instituição desconhecida"}</strong> - {edu.roleTitle || edu.departmentName || "Curso não especificado"}
                                {edu.startDate?.year?.value && ` (Início: ${edu.startDate.year.value})`}
                                {edu.endDate?.year?.value && ` - Fim: ${edu.endDate.year.value}`}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Experiências Profissionais</h2>
                {employments.length === 0 ? (
                    <p>Nenhuma experiência profissional encontrada.</p>
                ) : (
                    <ul className="list-disc list-inside space-y-1 text-sm max-h-48 overflow-auto">
                        {employments.map((emp) => (
                            <li key={emp["put-code"]}>
                                <strong>{emp.organization?.name || "Empresa desconhecida"}</strong> - {emp.roleTitle || emp.departmentName || "Cargo não especificado"}
                                {emp.startDate?.year?.value && ` (Início: ${emp.startDate.year.value})`}
                                {emp.endDate?.year?.value && ` - Fim: ${emp.endDate.year.value}`}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}
