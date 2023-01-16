import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  parse,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useState } from "react";
import ResizablePanel from "../components/resizablePanelComponent";

export default function Calendar() {
  const [monthString, setMonthString] = useState(format(new Date(), "yyyy-MM"));
  const month = parse(monthString, "yyyy-MM", new Date());
  const [direction, setDirection] = useState<-1 | 1 | 0>(0);
  const [isAnimating, setIsAnimating] = useState(false);

  function nextMonth() {
    if (isAnimating) return;
    const next = addMonths(month, 1);
    setDirection(1);
    setIsAnimating(true);
    setMonthString(format(next, "yyyy-MM"));
  }

  function previousMonth() {
    if (isAnimating) return;
    const previous = subMonths(month, 1);
    setDirection(-1);
    setIsAnimating(true);
    setMonthString(format(previous, "yyyy-MM"));
  }

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month)),
  });

  return (
    <MotionConfig transition={transition}>
      <div className="flex min-h-screen items-start bg-stone-800 pt-16 text-stone-900">
        <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-white">
          <div className="overflow-hidden py-8">
            <div className="flex flex-col justify-center rounded text-center">
              <ResizablePanel>
                <AnimatePresence
                  initial={false}
                  mode="popLayout"
                  custom={direction}
                  onExitComplete={() => setIsAnimating(false)}
                >
                  <motion.div
                    key={monthString}
                    initial="enter"
                    animate="middle"
                    exit="exit"
                  >
                    <header className="relative flex justify-between px-8">
                      <motion.button
                        variants={{ exit: { visibility: "hidden" } }}
                        className="z-10 rounded-full p-1.5 hover:bg-stone-100"
                        onClick={previousMonth}
                      >
                        <ChevronLeftIcon className="h-4 w-4" />
                      </motion.button>

                      <motion.p
                        variants={variants}
                        custom={direction}
                        className="absolute inset-0 flex items-center justify-center font-semibold"
                      >
                        {format(month, "MMMM yyyy")}
                      </motion.p>

                      <motion.button
                        variants={{ exit: { visibility: "hidden" } }}
                        className="z-10 rounded-full p-1.5 hover:bg-stone-100"
                        onClick={nextMonth}
                      >
                        <ChevronRightIcon className="h-4 w-4" />
                      </motion.button>
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, white 15%, transparent 23%, transparent 77%, white 85%)",
                        }}
                      ></div>
                    </header>
                    <motion.div
                      variants={{ exit: { visibility: "hidden" } }}
                      className="mt-6 grid grid-cols-7 gap-y-6 px-8"
                    >
                      <span className="font-medium text-stone-500">Su</span>
                      <span className="font-medium text-stone-500">Mo</span>
                      <span className="font-medium text-stone-500">Tu</span>
                      <span className="font-medium text-stone-500">We</span>
                      <span className="font-medium text-stone-500">Th</span>
                      <span className="font-medium text-stone-500">Fr</span>
                      <span className="font-medium text-stone-500">Sa</span>
                    </motion.div>
                    <motion.div
                      variants={variants}
                      custom={direction}
                      className="mt-6 grid grid-cols-7 gap-1 px-8"
                    >
                      {days.map((day) => {
                        return (
                          <button
                            onClick={() => console.log(day)}
                            className={`${
                              isSameMonth(day, month) ? "" : "text-stone-300"
                            } cursor-pointer rounded-full py-3 px-4 font-semibold hover:bg-sky-200`}
                            key={format(day, "yyyy-MM-dd")}
                          >
                            {format(day, "d")}
                          </button>
                        );
                      })}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </ResizablePanel>
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}

const variants = {
  enter: (direction) => {
    return { x: `${direction * 100}%`, opacity: 0 };
  },
  middle: { x: "0", opacity: 1 },
  exit: (direction) => {
    return { x: `${direction * -100}%`, opacity: 0 };
  },
};

const transition = { duration: 0.25, ease: [0.32, 0.72, 0, 1] };
