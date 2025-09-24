import { Box, Pressable } from "components/particles";
import { router } from "expo-router";
import ArrowBackSvg from "assets/svgs/arrow-back.svg";
import colors from "styles/colors";

const BackHeader = () => {
  const onPressBackHeader = () =>
    router.canGoBack() ? router.back() : router.replace("/");

  return (
    <Box flexDirection="row" paddingHorizontal="m">
      <Pressable onPress={onPressBackHeader} accessibilityLabel="back-header">
        <ArrowBackSvg width={30} height={30} color={colors.primary} />
      </Pressable>
    </Box>
  );
};

export default BackHeader;
