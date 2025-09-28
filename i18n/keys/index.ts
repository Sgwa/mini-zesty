import Home from "i18n/keys/modules/Home";
import Ticker from "i18n/keys/modules/Ticker";
import Filter from "i18n/keys/modules/Filter";
import BottomBar from "i18n/keys/modules/BottomBar";
import { IntersectWithArgsTypeWithStringPrimitive } from "i18n/keys/types";

const AppStrings = {
  home: Home,
  ticker: Ticker,
  filter: Filter,
  bottom_bar: BottomBar,
};

const AppStringsIntersected = AppStrings as IntersectWithArgsTypeWithStringPrimitive<
  typeof AppStrings
>;

export default AppStringsIntersected;
