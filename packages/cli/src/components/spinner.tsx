import { useEffect, useState } from "react";
import { useTheme } from "../provider/theme";

const FRAMES = [
  "10101010",
  "01010101",
  "11110000",
  "00001111",
  "11001100",
  "00110011",
];

export function Spinner() {
  const { colors } = useTheme();
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((current) => (current + 1) % FRAMES.length);
    }, 80);

    interval.unref?.();

    return () => clearInterval(interval);
  }, []);

  return <text fg={colors.primary}>{FRAMES[frameIndex]}</text>;
}