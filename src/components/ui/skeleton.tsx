import { cn } from '@/utils/shadcn-ui';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
}

const SkeletonList = ({
  isVisible,
  repeat = 0,
}: {
  isVisible: boolean;
  repeat: number;
}) => {
  return isVisible
    ? [...Array(repeat)].map(() => (
        <div className="flex items-center space-x-4 mb-7">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))
    : null;
};

export { Skeleton, SkeletonList };
