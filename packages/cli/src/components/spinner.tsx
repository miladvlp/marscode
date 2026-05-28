import { useTheme } from "../provider/theme";

export function Spinner() {
  const { colors } = useTheme();

  return <text fg={colors.primary}>...</text>;
};
