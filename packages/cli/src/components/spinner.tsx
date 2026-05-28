import { useEffect, useState } from "react";
import { useTheme } from "../provider/theme";
import { Mode } from "@marscode/database/enums";


type Props = {
  mode?: Mode;
};

const FRAMES = [
  "10101010",
  "01010101",
  "11110000",
  "00001111",
  "11001100",
  "00110011",
];

export function Spinner({ mode = Mode.BUILD }: Props) {
  const { colors } = useTheme();
  const [frameIndex, setFrameIndex] = useState(0);
  const activeColor = mode === Mode.PLAN ? colors.planMode : colors.primary;


  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((current) => (current + 1) % FRAMES.length);
    }, 80);

    interval.unref?.();

    return () => clearInterval(interval);
  }, []);

  return <text fg={activeColor}>{FRAMES[frameIndex]}</text>;
}