import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Box, Pressable, Text } from "components/particles";
import { useEffect, useState } from "react";
import { LayoutChangeEvent } from "react-native";
import colors from "styles/colors";

interface Props {
  value: number;
  items: string[];
  onChange: (idx: number) => void;
}

const GroupButtons = ({ value, items, onChange }: Props) => {
  const [slots, setSlots] = useState<{ x: number; width: number; height: number }[]>(
    Array(items.length).fill({ x: 0, width: 0 }),
  );

  const backX = useSharedValue(0);
  const backWidth = useSharedValue(0);

  useEffect(() => {
    const slot = slots[value];
    if (!slot) return;
    backX.value = withTiming(slot.x, { duration: 220, easing: Easing.out(Easing.cubic) });
    backWidth.value = withTiming(slot.width, {
      duration: 220,
      easing: Easing.out(Easing.cubic),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, slots]);

  const backStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: backX.value }],
    width: backWidth.value,
    height: slots[0].height,
    borderRadius: 8,
  }));

  const onItemLayout = (i: number) => (e: LayoutChangeEvent) => {
    const { x, width, height } = e.nativeEvent.layout;
    setSlots(prev => {
      const next = prev.slice();
      next[i] = { x, width, height };
      return next;
    });
  };

  return (
    <Box flexDirection="row" gap="s">
      <Animated.View
        pointerEvents="none"
        style={[
          backStyle,
          { position: "absolute", backgroundColor: colors.gray10, top: 0, left: 0 },
        ]}
      />
      {items.map((label, idx) => (
        <Pressable
          key={label}
          flex={1}
          onPress={() => onChange(idx)}
          onLayout={onItemLayout(idx)}
        >
          <Box borderRadius={8} padding="s" alignItems="center">
            <Text variant="h4R">{label}</Text>
          </Box>
        </Pressable>
      ))}
    </Box>
  );
};

export default GroupButtons;
