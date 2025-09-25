import React from "react";
import { Box } from "components/particles";
import { Skeleton } from "moti/skeleton";

const PositionCardSkeleton = () => {
  return (
    <Skeleton.Group show>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        borderBottomWidth={1}
        borderColor="gray10"
        paddingVertical="s"
      >
        <Box flex={1} paddingRight="m" gap="s">
          <Skeleton width="70%" height={22} radius={6} colorMode="light" />
          <Skeleton width="45%" height={16} radius={6} colorMode="light" />
          <Skeleton width={80} height={14} radius={6} colorMode="light" />
          <Skeleton width={130} height={14} radius={6} colorMode="light" />
        </Box>
        <Box alignItems="flex-end" minWidth={150} gap="s">
          <Skeleton width={90} height={14} radius={6} colorMode="light" />
          <Skeleton width={140} height={24} radius={6} colorMode="light" />
          <Skeleton width={170} height={16} radius={6} colorMode="light" />
          <Skeleton width={110} height={14} radius={6} colorMode="light" />
        </Box>
      </Box>
    </Skeleton.Group>
  );
};

export default PositionCardSkeleton;
