import { Database, BarChart3, Code2, Layers, TrendingUp, Zap } from "lucide-react";
import { C } from "../../theme";

export function PIcon({ icon, color = C.acid }: { icon: string; color?: string }) {
  const s = { color };
  if (icon === "database") return <Database size={18} style={s} />;
  if (icon === "chart")    return <BarChart3 size={18} style={s} />;
  if (icon === "layers")   return <Layers size={18} style={s} />;
  if (icon === "trending") return <TrendingUp size={18} style={s} />;
  if (icon === "zap")      return <Zap size={18} style={s} />;
  return <Code2 size={18} style={s} />;
}
