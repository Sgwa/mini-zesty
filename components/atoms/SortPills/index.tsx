import { Box, Pressable, ScrollView, Text } from "components/particles";
import { Ionicons } from "@expo/vector-icons";
import colors from "styles/colors";
import { SortBy, sortByText, SortOrder } from "resources/constants";

interface Props {
  items: SortBy[];
  by: SortBy;
  order: SortOrder;
  onChange: (idx: number) => void;
}

const SortPills = ({ items, by, order, onChange }: Props) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Box flexDirection="row" gap="s">
        {items.map((label, idx) => (
          <Pressable key={label} flex={1} onPress={() => onChange(idx)}>
            <Box
              flexDirection="row"
              borderRadius={100}
              padding="s"
              paddingHorizontal="m"
              alignItems="center"
              borderColor="primary"
              borderWidth={1}
              gap="xs"
              backgroundColor={by === label ? "secondary" : undefined}
            >
              <Text variant="h4R" color={by === label ? "black" : "primary"}>
                {sortByText[label]}
              </Text>
              {by === label && (
                <Box flexDirection="row">
                  <Ionicons
                    name="arrow-up"
                    color={order === SortOrder.ASC ? colors.primary : colors.black}
                    size={15}
                  />
                  <Box style={{ marginLeft: -4 }}>
                    <Ionicons
                      name="arrow-down"
                      color={order === SortOrder.DESC ? colors.primary : colors.black}
                      size={15}
                    />
                  </Box>
                </Box>
              )}
            </Box>
          </Pressable>
        ))}
      </Box>
    </ScrollView>
  );
};

export default SortPills;
