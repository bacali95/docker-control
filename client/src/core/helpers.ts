import moment from 'moment';
import 'moment/locale/fr';
import { useEffect, useState } from 'react';
import { rootStore } from './stores/RootStore';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isEmpty(s: any): boolean {
  if (Array.isArray(s)) return s.length === 0;
  return [null, undefined, ''].includes(s);
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise<string>((resolve) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = (event) => {
      if (event.target?.readyState === FileReader.DONE) {
        resolve((event.target.result as string).split(';base64,').pop()!);
      }
    };
  });
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function generalComparator(a: any, b: any): number {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length - b.length;
  }
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }
  if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b);
  }
  if (typeof a === 'object' && typeof b === 'object') {
    if (a.name && b.name) {
      return generalComparator(a.name, b.name);
    }
    return generalComparator(a.id, b.id);
  }
  return 0;
}

export function formatRestTime(time: number, withSeconds = true): string {
  if (time <= 0) return 'contest over';
  const days = Math.floor(time / 86400);
  const hours = Math.floor((time % 86400) / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);
  let result = '';
  days && (result += `${days}d `);
  (days || hours) && (result += `${hours.toString().padStart(2, '0')}:`);
  result += minutes.toString().padStart(2, '0');
  withSeconds && (result += `:${seconds.toString().padStart(2, '0')}`);
  return result;
}

export function formatBytes(size: number): string {
  if (size < 1024) return `${size} B`;
  size /= 1024;
  if (size < 1024) return `${roundN(size)} KB`;
  size /= 1024;
  if (size < 1024) return `${roundN(size)} MB`;
  size /= 1024;
  return `${roundN(size)} GB`;
}

function roundN(value: number, digits: number = 2) {
  const tenToN = 10 ** digits;
  return Math.round(value * tenToN) / tenToN;
}

export function dateComparator<T>(field: keyof T, inv = false): (a: T, b: T) => number {
  return (a, b) =>
    new Date((inv ? b : a)[field] as any).getTime() -
    new Date((inv ? a : b)[field] as any).getTime();
}

export function getRandomHexColor(): string {
  return `#${Math.random().toString(16).substr(2, 6)}`;
}

export function useLongPress(
  callback: () => void,
  ms = 100,
): {
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onTouchStart: () => void;
  onTouchEnd: () => void;
} {
  const [startLongPress, setStartLongPress] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (startLongPress) {
      timerId = setTimeout(callback, ms);
    } else {
      clearTimeout(timerId!);
    }

    return () => {
      timerId && clearTimeout(timerId);
    };
  }, [callback, ms, startLongPress]);

  return {
    onMouseDown: () => setStartLongPress(true),
    onMouseUp: () => setStartLongPress(false),
    onMouseLeave: () => setStartLongPress(false),
    onTouchStart: () => setStartLongPress(true),
    onTouchEnd: () => setStartLongPress(false),
  };
}

export function getDisplayDate(date: Date): string {
  moment.locale(rootStore.appLocalCache.language ?? 'fr');
  return moment(date).format('dddd, MMMM Do YYYY, HH:mm:ss');
}
