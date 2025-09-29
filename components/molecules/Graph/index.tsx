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
  marketData: DayData[] | undefined;
  investedData?: DayData[];
  height?: number;
  width?: number;
}

const PRICE_Y_OFFSET = 50;
const TEMPORALITY = ["1D", S.ticker.week_temp, "1M", "2M"];
const TEMP_LENGTHS = [2, 8, 31, 60];
const TEXT_HEIGHT_OFFSET_MULT = Platform.OS === "android" ? 1.3 : 1.1;
const CANVAS_OFFSET = 20;
const TEXT = {
  value: S.graph.value.toString(),
  invested: S.graph.invested.toString(),
};

const Graph = ({ marketData, investedData, width: w, height: h }: Props) => {
  const [tempIdx, setTempIdx] = useState(3);
  const opacity = useSharedValue(0);
  const { width: windowWidth } = useWindowDimensions();
  const width = w || windowWidth * 0.9;
  const height = h || windowWidth * 0.6;

  const getMarketData = useCallback(() => {
    if (marketData === undefined) return [];
    const slice = [marketData.length - TEMP_LENGTHS[tempIdx], undefined];
    return marketData.slice(slice[0], slice[1]) ?? [];
  }, [tempIdx, marketData]);

  const getInvestedData = useCallback(() => {
    if (investedData === undefined) return [];
    const slice = [investedData.length - TEMP_LENGTHS[tempIdx], undefined];
    return investedData.slice(slice[0], slice[1]) ?? [];
  }, [tempIdx, investedData]);

  const touchX = useSharedValue(0);
  const touchY = useSharedValue(0);
  const data = getMarketData();
  const maxPrice = Math.max(...data.map(dayData => dayData.high));
  const minPrice = Math.min(...data.map(dayData => dayData.low));
  const { path, areaPath, xCoords, yCoords, prices, dates } = useMemo(
    () => getPath({ data, width, height }),
    [data, width, height],
  );
  const {
    path: investedPath,
    prices: investedPrices,
    xCoords: investedXCoords,
    yCoords: investedYCoords,
    dates: investedDates,
  } = useMemo(
    () => getPath({ data: getInvestedData(), width, height, maxPrice, minPrice }),
    [getInvestedData, width, height, maxPrice, minPrice],
  );
  const pathPoints = useSharedValue({ xCoords, yCoords, prices, dates });
  const investedPathPoints = useSharedValue({
    xCoords: investedXCoords,
    yCoords: investedYCoords,
    prices: investedPrices,
    dates: investedDates,
  });

  useEffect(() => {
    pathPoints.value = { xCoords, yCoords, prices, dates };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xCoords, yCoords]);

  useEffect(() => {
    investedPathPoints.value = {
      xCoords: investedXCoords,
      yCoords: investedYCoords,
      prices: investedPrices,
      dates: investedDates,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [investedXCoords, investedYCoords]);

  const fontFamily = "Helvetica";
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
  const investedMarker = useDerivedValue(() =>
    getIntersection({ pathPoints: investedPathPoints, touchX }),
  );
  const fontDate = matchFont(fontDateStyle);
  const fontPrice = matchFont(fontPriceStyle);
  const textM = useDerivedValue(() => {
    const textDateM = fontDate.measureText(String(marker.value.date));
    const textPriceM = fontPrice.measureText(TEXT.value + String(marker.value.price));
    const textPriceI = fontPrice.measureText(
      TEXT.invested + String(investedMarker.value.price),
    );
    return {
      ...{
        ...textDateM,
        width: Math.max(textDateM.width, Math.max(textPriceM.width, textPriceI.width)),
      },
      ...fontDate.getMetrics(),
    };
  });

  const markerX = useDerivedValue(() => marker.value.x);
  const markerY = useDerivedValue(() => marker.value.y);
  const investedY = useDerivedValue(() => investedMarker.value.y);
  const markerPrice = useDerivedValue(() => TEXT.value + marker.value.price);
  const investedPrice = useDerivedValue(() => TEXT.invested + investedMarker.value.price);
  const markerDate = useDerivedValue(() => marker.value.date);
  const lineP1 = useDerivedValue(() => ({ x: marker.value.x, y: 0 }));
  const lineP2 = useDerivedValue(() => ({ x: marker.value.x, y: height }));
  const rectWidth = useDerivedValue(() => textM.value.width * 1.2);
  const rectHeight = useDerivedValue(
    () => (textM.value.ascent - textM.value.descent) * (investedData ? 3.7 : 2.7),
  );
  const rectX = useDerivedValue(() => {
    const x = marker.value.x - (textM.value.width * 1.2) / 2;
    return Math.max(0, Math.min(x, width - rectWidth.value));
  });
  const rectY = useDerivedValue(
    () =>
      marker.value.y +
      (marker.value.y > height / 2 ? -PRICE_Y_OFFSET : PRICE_Y_OFFSET) -
      (textM.value.ascent - textM.value.descent) * (investedData ? 2 : 1),
  );
  const textX = useDerivedValue(() => {
    const x = marker.value.x - textM.value.width / 2;
    return Math.max(15, Math.min(x, width - textM.value.width - 15));
  });
  const textY = useDerivedValue(
    () =>
      marker.value.y +
      (marker.value.y > height / 2 ? -PRICE_Y_OFFSET : PRICE_Y_OFFSET) -
      7,
  );
  const textPriceY = useDerivedValue(
    () => textY.value + textM.value.height * TEXT_HEIGHT_OFFSET_MULT,
  );
  const textInvestedY = useDerivedValue(
    () => textPriceY.value + textM.value.height * TEXT_HEIGHT_OFFSET_MULT,
  );

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
        <Canvas style={{ width, height: height + CANVAS_OFFSET }}>
          <Group>
            {xCoords.length > 0 && (
              <>
                <Path
                  path={investedPath}
                  style="stroke"
                  strokeJoin="round"
                  strokeWidth={1.5}
                  color={colors.gray20}
                >
                  <DashPathEffect intervals={[6, 1]} />
                </Path>
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
              {!!investedData && (
                <>
                  <Circle cx={markerX} cy={investedY} r={5} color={colors.gray30} />
                  <Circle cx={markerX} cy={investedY} r={3} color={colors.gray10} />
                </>
              )}
              <Circle cx={markerX} cy={markerY} r={5} color={colors.primary} />
              <Circle cx={markerX} cy={markerY} r={3} color={colors.secondary} />
              <RoundedRect
                x={rectX}
                y={rectY}
                width={rectWidth}
                height={rectHeight}
                color={colors.gray10}
                r={4}
              />
              <SkText
                x={textX}
                y={textY}
                text={markerDate}
                font={fontDate}
                color={colors.black}
              />
              <SkText
                x={textX}
                y={textPriceY}
                text={markerPrice}
                font={fontPrice}
                color={colors.black}
              />
              {!!investedData && (
                <SkText
                  x={textX}
                  y={textInvestedY}
                  text={investedPrice}
                  font={fontDate}
                  color={colors.gray30}
                />
              )}
            </Group>
          </Group>
        </Canvas>
      </GestureDetector>
      <GroupButtons value={tempIdx} onChange={setTempIdx} items={TEMPORALITY} />
    </>
  );
};

export default Graph;
