import { Colors } from "styles/restyleTheme";
import { Box, Text } from "components/particles";
import React, { useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";

const PillMarker = ({ value, tint }: { value: number; tint: Colors }) => {
  const percentage = useMemo(() => {
    if (value > 0) return `+${value.toFixed(0)}%`;
    if (value < 0) return `${value.toFixed(0)}%`;
    return 0;
  }, [value]);
  return (
    <Box
      alignItems="center"
      justifyContent="center"
      borderColor={tint}
      shadowColor={tint}
      backgroundColor="white"
      borderRadius={16}
      borderWidth={1.5}
      elevation={2}
      width={50}
      height={35}
      shadowOffset={{ width: 0, height: 3 }}
      shadowOpacity={0.25}
      shadowRadius={8}
    >
      {percentage !== "+100%" ? (
        <Text variant="h5">{percentage}</Text>
      ) : (
        <Box flexDirection="row" justifyContent="center" alignItems="center">
          <Text variant="h5">+</Text>
          <Ionicons name="infinite" size={20} color="black" />
          <Text variant="h5">%</Text>
        </Box>
      )}
    </Box>
  );
};

export default PillMarker;
