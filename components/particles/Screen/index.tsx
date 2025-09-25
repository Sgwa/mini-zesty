import Box from "components/particles/Box";
import SafeAreaView from "components/particles/SafeAreaView";
import { ComponentProps, FC, useLayoutEffect, useMemo } from "react";
import { useNavigation } from "expo-router";

interface Props extends ComponentProps<typeof SafeAreaView> {
  safeAreaDisabled?: boolean;
}

const Screen: FC<Props> = ({ children, safeAreaDisabled = false, ...props }) => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  const View = useMemo(() => (safeAreaDisabled ? Box : SafeAreaView), [safeAreaDisabled]);
  return (
    <View flex={1} backgroundColor="white" edges={["top"]} {...props}>
      {children}
    </View>
  );
};

export default Screen;
