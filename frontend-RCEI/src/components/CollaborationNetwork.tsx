
import { DashboardCard } from "@/components/ui/dashboard-card";
import { useEffect, useRef } from "react";
import { Network } from "lucide-react";

export function CollaborationNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawNetwork();
    };

    const drawNetwork = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Define nodes (researchers)
      const nodes = [
        { x: canvas.width / 2, y: canvas.height / 2, name: "Prof. Seiji Isotani", radius: 30, color: "#39934c" },
        { x: canvas.width / 3, y: canvas.height / 3, name: "Maria Silva", radius: 25, color: "#5ab06c" },
        { x: canvas.width * 0.7, y: canvas.height / 3, name: "João Santos", radius: 20, color: "#5ab06c" },
        { x: canvas.width / 4, y: canvas.height * 0.7, name: "Ana Costa", radius: 15, color: "#5ab06c" },
        { x: canvas.width * 0.6, y: canvas.height * 0.75, name: "Pedro Lima", radius: 18, color: "#5ab06c" },
        { x: canvas.width * 0.8, y: canvas.height * 0.65, name: "Laura Oliveira", radius: 22, color: "#5ab06c" },
      ];

      // Define edges (collaborations)
      const edges = [
        { from: 0, to: 1, weight: 5 },
        { from: 0, to: 2, weight: 3 },
        { from: 0, to: 3, weight: 2 },
        { from: 0, to: 4, weight: 4 },
        { from: 0, to: 5, weight: 6 },
        { from: 1, to: 2, weight: 2 },
        { from: 2, to: 5, weight: 1 },
        { from: 3, to: 4, weight: 2 },
      ];

      // Draw edges
      edges.forEach(edge => {
        const from = nodes[edge.from];
        const to = nodes[edge.to];
        
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.lineWidth = Math.min(edge.weight, 5);
        ctx.strokeStyle = "#d5d7db";
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach(node => {
        // Draw circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        
        // Draw border
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw label
        ctx.font = "12px Arial";
        ctx.fillStyle = "#333";
        ctx.textAlign = "center";
        ctx.fillText(node.name, node.x, node.y + node.radius + 15);
      });
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <DashboardCard title="Rede de Colaboração" icon={<Network size={18} />}>
      <div className="h-[400px] relative">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </DashboardCard>
  );
}