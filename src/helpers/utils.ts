import type { Timestamp } from "firebase/firestore";

export const mockTimestamp = (dateStr: string) =>
  ({
    seconds: Math.floor(new Date(dateStr).getTime() / 1000),
    nanoseconds: 0,
    toDate: () => new Date(dateStr),
  }) as Timestamp;
