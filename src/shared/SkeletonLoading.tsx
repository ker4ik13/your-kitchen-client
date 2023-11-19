import Skeleton, {
  SkeletonTheme,
  type SkeletonProps,
} from "react-loading-skeleton";

const SkeletonLoading = ({
  count,
  highlightColor,
  baseColor,
  height,
}: SkeletonProps) => {
  if (count && count > 1) {
    return (
      <SkeletonTheme highlightColor={highlightColor} baseColor={baseColor}>
        <Skeleton count={count} height={height} />
      </SkeletonTheme>
    );
  }
  return (
    <>
      <Skeleton
        highlightColor={highlightColor}
        baseColor={baseColor}
        height={height}
      />
    </>
  );
};

export default SkeletonLoading;
