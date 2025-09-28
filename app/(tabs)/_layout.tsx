import { Tabs, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useLayoutEffect } from "react";
import colors from "styles/colors";
import S from "i18n";

const TabsLayout = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray20,
        tabBarStyle: {
          height: 80,
          borderTopWidth: 1,
          paddingTop: 10,
        },
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: S.bottom_bar.portfolio.toString(),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: S.bottom_bar.explore.toString(),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
