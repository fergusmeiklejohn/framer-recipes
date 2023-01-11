import { useState } from "react";
import {EnvelopeIcon} from "@heroicons/react/24/outline";

const titles = [
  ["Apple's newest iPhone is here", "Watch our July event"],
  [
    "Nintendo's Newsletter for July",
    "Introducing Strike, a 5-on-5 soccer game",
  ],
  ["Your funds have been processed", "See your latest deposit online"],
  ["This Week in Sports", "The finals are heating up"],
  ["Changelog update", "Edge subroutines and more"],
  ["React Hawaii is here!", "Time for fun in the sun"],
];

export default function Email() {
  const [messages, setMessages] = useState([...Array(9).keys()]);

  function addMessage() {
    const newId = (messages.at(-1) || 0) + 1;
    setMessages((messages) => [...messages, newId]);
  }

  function archiveMessage(mid: number) {
    setMessages((messages) => messages.filter((id) => id !== mid));
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center overscroll-y-contain bg-gradient-to-br from-slate-700 to-slate-900 py-8 px-6 text-slate-600">
      <div className="mx-auto flex w-full max-w-3xl flex-1 overflow-hidden rounded-2xl bg-white ">
        <div className="flex w-[45%] flex-col bg-slate-50 py-2">
          <div className="border-b px-5">
            <div className="flex justify-between py-2 text-right">
              <button
                onClick={addMessage}
                className="-mx-2 rounded px-2 py-1 text-slate-400 hover:text-slate-500 active:bg-slate-200"
              >
                <EnvelopeIcon className="h-5 w-5 " />
              </button>
            </div>
          </div>
          <ul className="overflow-y-scroll px-3 pt-2">
            {[...messages].reverse().map((mid) => (
              <li key={mid} className="relative py-0.5">
                <button
                  onClick={() => archiveMessage(mid)}
                  className="block w-full cursor-pointer truncate rounded py-3 px-3 text-left hover:bg-slate-200"
                >
                  <p className="truncate text-sm font-medium text-slate-500">
                    {titles[mid % titles.length][0]}
                  </p>
                  <p className="truncate text-xs text-slate-400">
                    {titles[mid % titles.length][1]}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 overflow-y-scroll border-l px-8 py-8">
          <h1 className="h-8 rounded bg-slate-100 text-2xl font-bold" />
          <div className="mt-8 space-y-6">
            {[...Array(9).keys()].map((i) => (
              <div key={i} className="space-y-2 text-sm">
                <p className="h-4 w-5/6 rounded bg-slate-100" />
                <p className="h-4 rounded bg-slate-100" />
                <p className="h-4 w-4/6 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
