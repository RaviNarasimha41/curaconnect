import { useEffect, useRef, useState } from "react";
import type { ToxicityClassifier, Predictions } from "@tensorflow-models/toxicity";

export function useToxicity(threshold = 0.85) {
  const modelRef = useRef<ToxicityClassifier | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lazy load on first use
  const load = async () => {
    if (modelRef.current || error) return;
    try {
      const toxicity = await import("@tensorflow-models/toxicity");
      modelRef.current = await toxicity.load(threshold);
      setIsReady(true);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load ML model");
    }
  };

  const analyze = async (text: string): Promise<{ toxic: boolean; labels: string[]; raw?: Predictions }> => {
    if (!modelRef.current) await load();
    if (!modelRef.current) return { toxic: false, labels: [] };

    const preds = await modelRef.current.classify([text]);
    const flags: string[] = [];
    preds.forEach(p => {
      const m = p.results?.[0];
      if (m?.match) flags.push(p.label);
    });
    return { toxic: flags.length > 0, labels: flags, raw: preds };
  };

  return { isReady, error, analyze, load };
}
