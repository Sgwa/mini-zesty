import { useCallback, useEffect, useMemo, useState } from "react";
import { Platform, useWindowDimensions } from "react-native";
import {
  Canvas,
  Circle,
  DashPathEffect,
  Group,
  Line,
  LinearGradient,
  matchFont,
  Path,
  RoundedRect,
  Text as SkText,
  vec,
} from "@shopify/react-native-skia";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";
import colors from "styles/colors";
import { DayData } from "store/types";
import { getIntersection, getPath } from "components/molecules/Graph/utils";
import { GroupButtons } from "components/atoms";
import S from "i18n";

interface Props {
  tickerHData: DayData[] | undefined;
  height?: number;
  width?: number;
}

const PRICE_Y_OFFSET = 50;
const TEMPORALITY = ["1D", S.ticker.week_temp, "1M", "2M"];
const TEMP_LENGTHS = [2, 8, 31, 60];

const Graph = ({ tickerHData, width: w, height: h }: Props) => {
  const [tempIdx, setTempIdx] = useState(3);
  const opacity = useSharedValue(0);
  const { width: windowWidth } = useWindowDimensions();
  const width = w || windowWidth * 0.9;
  const height = h || windowWidth * 0.6;

  const getData = useCallback(() => {
    if (tickerHData === undefined) return [];
    const slice = [tickerHData.length - TEMP_LENGTHS[tempIdx], undefined];
    return tickerHData.slice(slice[0], slice[1]) ?? [];
  }, [tempIdx, tickerHData]);

  const touchX = useSharedValue(0);
  const touchY = useSharedValue(0);
  const { path, areaPath, xCoords, yCoords, prices, dates } = useMemo(
    () => getPath({ data: getData(), width, height }),
    [getData, width, height],
  );
  const pathPoints = useSharedValue({ xCoords, yCoords, prices, dates });

  useEffect(() => {
    pathPoints.value = { xCoords, yCoords, prices, dates };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xCoords, yCoords]);

  const fontFamily = Platform.select({ ios: "Helvetica", default: "serif" });
  const fontDateStyle = {
    fontFamily,
    fontSize: 13,
  };
  const fontPriceStyle = {
    fontFamily,
    fontSize: 14,
    fontWeight: "500" as const,
  };
  const marker = useDerivedValue(() => getIntersection({ pathPoints, touchX }));
  const fontDate = matchFont(fontDateStyle);
  const fontPrice = matchFont(fontPriceStyle);
  const textM = useDerivedValue(() => {
    const textDateM = fontDate.measureText(String(marker.value.date));
    const textPriceM = fontPrice.measureText(String(marker.value.price));
    return {
      ...{
        ...textDateM,
        width: textPriceM.width > textDateM.width ? textPriceM.width : textDateM.width,
      },
      ...fontDate.getMetrics(),
    };
  });

  const markerX = useDerivedValue(() => marker.value.x);
  const markerY = useDerivedValue(() => marker.value.y);
  const markerPrice = useDerivedValue(() => marker.value.price);
  const markerDate = useDerivedValue(() => marker.value.date);
  const lineP1 = useDerivedValue(() => ({ x: marker.value.x, y: 0 }));
  const lineP2 = useDerivedValue(() => ({ x: marker.value.x, y: height }));
  const rectWidth = useDerivedValue(() => textM.value.width * 1.2);
  const rectHeight = useDerivedValue(
    () => (textM.value.ascent - textM.value.descent) * 2.7,
  );
  const rectX = useDerivedValue(() => {
    const x = marker.value.x - (textM.value.width * 1.2) / 2;
    return Math.max(0, Math.min(x, width - rectWidth.value));
  });
  const rectY = useDerivedValue(
    () =>
      marker.value.y +
      (marker.value.y > height / 2 ? -PRICE_Y_OFFSET : PRICE_Y_OFFSET) -
      (textM.value.ascent - textM.value.descent),
  );
  const textX = useDerivedValue(() => {
    const x = marker.value.x - textM.value.width / 2;
    return Math.max(3, Math.min(x, width - textM.value.width - 3));
  });
  const textY = useDerivedValue(
    () =>
      marker.value.y +
      (marker.value.y > height / 2 ? -PRICE_Y_OFFSET : PRICE_Y_OFFSET) -
      7,
  );
  const textPriceY = useDerivedValue(() => textY.value + textM.value.height * 1.1);

  const pan = Gesture.Pan()
    .onBegin(e => {
      opacity.value = 1;
      touchX.value = e.x;
      touchY.value = e.y;
    })
    .onUpdate(e => {
      touchX.value = e.x;
      touchY.value = e.y;
    })
    .onFinalize(() => {
      opacity.value = 0;
    });

  const withAlpha = (hex: string, a: number) => {
    const h = hex.replace("#", "");
    if (h.length !== 6) return hex;
    const aa = Math.round(a * 255)
      .toString(16)
      .padStart(2, "0");
    return `#${h}${aa}`;
  };

  const negativeChange = yCoords[0] < yCoords[yCoords.length - 1];

  return (
    <>
      <GestureDetector gesture={pan}>
        <Canvas style={{ width, height }}>
          <Group>
            {xCoords.length > 0 && (
              <>
                <Path path={areaPath} style="fill">
                  <LinearGradient
                    start={vec(0, 0)}
                    end={vec(0, height)}
                    colors={[
                      withAlpha(negativeChange ? colors.red : colors.green, 0.35),
                      withAlpha(negativeChange ? colors.red : colors.green, 0),
                    ]}
                    positions={[0, 1]}
                  />
                </Path>
                <Path
                  path={path}
                  style="stroke"
                  strokeJoin="round"
                  strokeWidth={2}
                  color={negativeChange ? colors.red : colors.green}
                />
              </>
            )}
            <Group opacity={opacity}>
              <Line p1={lineP1} p2={lineP2} strokeWidth={2} color={colors.secondary}>
                <DashPathEffect intervals={[6, 4]} />
              </Line>
              <Circle cx={markerX} cy={markerY} r={5} color={colors.primary} />
              <Circle cx={markerX} cy={markerY} r={3} color={colors.secondary} />
              <RoundedRect
                x={rectX}
                y={rectY}
                width={rectWidth}
                height={rectHeight}
                color={colors.secondary}
                r={4}
              />
              <SkText
                x={textX}
                y={textY}
                text={markerDate}
                font={fontDate}
                color={colors.primary}
              />
              <SkText
                x={textX}
                y={textPriceY}
                text={markerPrice}
                font={fontPrice}
                color={colors.primary}
              />
            </Group>
          </Group>
        </Canvas>
      </GestureDetector>
      <GroupButtons value={tempIdx} onChange={setTempIdx} items={TEMPORALITY} />
    </>
  );
};

export default Graph;
