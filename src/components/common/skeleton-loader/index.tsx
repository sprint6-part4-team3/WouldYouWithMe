interface SkeletonLoaderProps {
  className: string;
}

const SkeletonLoader = ({ className }: SkeletonLoaderProps) => (
  <div className={`${className} animate-pulse bg-text-default`} />
);

export default SkeletonLoader;
