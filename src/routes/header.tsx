import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  useMotionTemplate,
} from "framer-motion";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const scrollDistance = 300; // pixels user will scroll to complete header animation

function useBoundedScroll(bounds: number) {
  const { scrollY } = useScroll();
  const scrollYBounded = useMotionValue(0);

  useMotionValueEvent(scrollY, "change", (value) => {
    const previousScrollY = scrollY.getPrevious();
    const scrollYDiff = value - previousScrollY;
    scrollYBounded.set(clamp(scrollYBounded.get() + scrollYDiff, 0, bounds));
  });

  const scrollYBoundedProgress = useTransform(
    scrollYBounded,
    [0, bounds],
    [0, 1]
  );

  return { scrollYBoundedProgress };
}

export default function Header() {
  const { scrollYBoundedProgress } = useBoundedScroll(scrollDistance);

  const scrollYThrottledProgress = useTransform(
    scrollYBoundedProgress,
    [0, 0.25, 1],
    [0, 0, 1]
  );

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 overflow-hidden text-slate-600">
      <div className="z-0 flex-1 overflow-y-scroll">
        <motion.header
          style={{
            height: useTransform(scrollYThrottledProgress, [0, 1], [80, 50]),
            backgroundColor: useMotionTemplate`rgb(255 255 255 / ${useTransform(
              scrollYThrottledProgress,
              [0, 1],
              [1, 0.1]
            )}`,
          }}
          className="fixed inset-x-0 top-0 flex h-20 shadow-sm backdrop-blur-md"
        >
          <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-8">
            <motion.p
              style={{
                scale: useTransform(scrollYThrottledProgress, [0, 1], [1, 0.9]),
              }}
              className="flex origin-left items-center text-xl font-semibold uppercase"
            >
              <span className="-ml-1.5 inline-block -rotate-90 text-[10px] leading-[0]">
                The
              </span>
              <span className="-ml-1 text-2xl tracking-[-.075em]">
                Daily Bugle
              </span>
            </motion.p>
            <motion.nav
              style={{
                opacity: useTransform(scrollYThrottledProgress, [0, 1], [1, 0]),
              }}
              className="flex space-x-4 text-xs font-medium text-slate-400"
            >
              <a href="#">News</a>
              <a href="#">Sports</a>
              <a href="#">Culture</a>
            </motion.nav>
          </div>
        </motion.header>

        <main className="mt-20 bg-white px-8 pt-8">
          <h1 className="h-10 w-4/5 rounded bg-slate-200 text-2xl font-bold" />
          <div className="mt-8 space-y-6">
            {[...Array(2).keys()].map((i) => (
              <div key={i} className="space-y-2 text-sm">
                <p className="h-4 w-5/6 rounded bg-slate-200" />
                <p className="h-4 rounded bg-slate-200" />
                <p className="h-4 w-4/6 rounded bg-slate-200" />
              </div>
            ))}
            <div className="h-64 rounded bg-slate-200"></div>
            {[...Array(90).keys()].map((i) => (
              <div key={i} className="space-y-2 text-sm">
                <p className="h-4 w-5/6 rounded bg-slate-200" />
                <p className="h-4 rounded bg-slate-200" />
                <p className="h-4 w-4/6 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
