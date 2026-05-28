import { useEffect, useState } from "react";
import { useTheme } from "../provider/theme";

const FRAMES = ["-", "\\", "|", "/"];

export function Spinner() {
  const { colors } = useTheme();
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((current) => (current + 1) % FRAMES.length);
    }, 120);

    interval.unref?.();
    return () => clearInterval(interval);
  }, []);

  return <text fg={colors.primary}>{FRAMES[frameIndex]}</text>;
};
