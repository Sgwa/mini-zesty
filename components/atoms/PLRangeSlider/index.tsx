import React from "react";
import { LayoutChangeEvent } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Box, LinearGradient } from "components/particles";
import colors from "styles/colors";
import PillMarker from "components/atoms/PLRangeSlider/PillMarker";

type Props = {
  min?: number;
  max?: number;
  step?: number;
  initial?: [number, number];
  onChange?: (min: number, max: number) => void;
};

const PLRangeSlider = ({
  min = -100,
  max = 100,
  step = 0.5,
  initial = [-100, 100],
  onChange,
}: Props) => {
  const [values, setValues] = React.useState<[number, number]>(initial);
  const [width, setWidth] = React.useState(0);

  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width);
  const sliderLength = Math.max(0, width);

  const onValuesChange = (vals: number[]) => {
    const next = [vals[0], vals[1]] as [number, number];
    setValues(next);
    onChange?.(next[0], next[1]);
  };
  const zeroX = ((0 - min) / (max - min)) * sliderLength;

  return (
    <Box paddingVertical="s" position="relative" onLayout={onLayout}>
      <LinearGradient
        colors={["red", "white", "green"]}
        starts={{ x: 0, y: 0 }}
        ends={{ x: 1, y: 0 }}
        position="absolute"
        left={0}
        right={0}
        top={18}
        height={12}
        borderRadius={6}
      />
      {width > 0 && (
        <Box
          backgroundColor="gray20"
          borderRadius={1}
          height={16}
          position="absolute"
          top={16}
          width={2}
          left={Math.max(0, Math.min(sliderLength, zeroX)) - 1}
        />
      )}
      <MultiSlider
        values={values}
        min={min}
        max={max}
        step={step}
        sliderLength={sliderLength}
        allowOverlap={false}
        snapped
        isMarkersSeparated
        trackStyle={{ borderRadius: 6, height: 12 }}
        selectedStyle={{ backgroundColor: colors.transparent }}
        unselectedStyle={{ backgroundColor: colors.transparent }}
        customMarkerLeft={({ currentValue }) => (
          <PillMarker value={currentValue} tint="primary" />
        )}
        customMarkerRight={({ currentValue }) => (
          <PillMarker value={currentValue} tint="primary" />
        )}
        onValuesChange={onValuesChange}
      />
    </Box>
  );
};

export default PLRangeSlider;
