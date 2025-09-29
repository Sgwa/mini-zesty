import { memo, useCallback, useMemo, useState } from "react";
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
  const [width, setWidth] = useState(0);

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width | 0;
    setWidth(prev => (prev === w ? prev : w));
  }, []);

  const sliderLength = width > 0 ? width : 0;

  const zeroX = useMemo(() => {
    return sliderLength * ((0 - min) / (max - min));
  }, [sliderLength, min, max]);

  const onValuesChangeFinish = useCallback(
    (vals: number[]) => {
      const next = [vals[0], vals[1]] as [number, number];
      onChange?.(next[0], next[1]);
    },
    [onChange],
  );

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
        pointerEvents="none"
      />
      {sliderLength > 0 && (
        <Box
          backgroundColor="gray20"
          borderRadius={1}
          height={16}
          position="absolute"
          top={16}
          width={2}
          left={Math.max(0, Math.min(sliderLength, zeroX)) - 1}
          pointerEvents="none"
        />
      )}
      <MultiSlider
        values={initial}
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
        onValuesChangeFinish={onValuesChangeFinish}
      />
    </Box>
  );
};

export default memo(PLRangeSlider);
