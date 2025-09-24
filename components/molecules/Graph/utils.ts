import { Skia } from "@shopify/react-native-skia";
import { DayData } from "store/types";
import { SharedValue } from "react-native-reanimated";

interface GetPathProps {
  data: DayData[];
  width: number;
  height: number;
  baselineY?: number;
}

export const getPath = ({ data, width, height, baselineY = height }: GetPathProps) => {
  const path = Skia.Path.Make();
  const areaPath = Skia.Path.Make();
  if (!data.length)
    return {
      path,
      areaPath,
      xCoords: [] as number[],
      yCoords: [] as number[],
      prices: [] as number[],
      dates: [] as string[],
    };

  const maxPrice = Math.max(...data.map(dayData => dayData.high));
  const minPrice = Math.min(...data.map(dayData => dayData.low));
  const range = maxPrice - minPrice || 1;

  const xCoords: number[] = [];
  const yCoords: number[] = [];
  const prices = data.map(dayData => dayData.close) || [];
  const dates = data.map(dayData => dayData.date) || [];
  data.forEach((dayData, index) => {
    const x = (index / Math.max(1, data.length - 1)) * width;
    const y = height - ((dayData.close - minPrice) / range) * height;
    xCoords.push(x);
    yCoords.push(y);
  });

  path.moveTo(xCoords[0], yCoords[0]);
  for (let i = 1; i < xCoords.length; i++) {
    path.lineTo(xCoords[i], yCoords[i]);
  }

  areaPath.moveTo(xCoords[0], baselineY);
  for (let i = 0; i < xCoords.length; i++) {
    areaPath.lineTo(xCoords[i], yCoords[i]);
  }
  areaPath.lineTo(xCoords[xCoords.length - 1], baselineY);
  areaPath.close();

  return { path, areaPath, xCoords, yCoords, prices, dates };
};

interface GetIntersectionProps {
  pathPoints: SharedValue<{
    xCoords: number[];
    yCoords: number[];
    prices: number[];
    dates: string[];
  }>;
  touchX: SharedValue<number>;
}

export const getIntersection = ({ pathPoints, touchX }: GetIntersectionProps) => {
  "worklet";
  const { xCoords, yCoords, prices, dates } = pathPoints.value;
  const xLength = xCoords.length;
  if (!xLength) return { x: 0, y: 0, price: 0, date: "" };
  const currentX = touchX.value;

  if (currentX <= xCoords[0])
    return { x: xCoords[0], y: yCoords[0], price: prices[0], date: dates[0] };
  if (currentX >= xCoords[xLength - 1])
    return {
      x: xCoords[xLength - 1],
      y: yCoords[xLength - 1],
      price: prices[xLength - 1],
      date: dates[xLength - 1],
    };

  let lo = 0;
  let hi = xLength - 1;
  while (hi - lo > 1) {
    const mid = Math.floor((lo + hi) / 2);
    if (xCoords[mid] <= currentX) lo = mid;
    else hi = mid;
  }

  const x = xCoords[lo];
  const y = yCoords[lo];
  const price = "US$" + prices[lo];
  const date = dates[lo];
  return { x, y, price, date };
};
