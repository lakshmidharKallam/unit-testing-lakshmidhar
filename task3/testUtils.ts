
import timezonedDate from "timezoned-date";

export interface MockDateSetup {
  reset(): void;
  set(options: { offset?: number; isoDate?: string }): void;
}

const originalDate = globalThis.Date;
let originalGetHours: any;
let originalGetMinutes: any;
let currentOffset: number | undefined;

export const setupMockDate = (): MockDateSetup => {
  const reset = () => {
    globalThis.Date = originalDate;
    if (originalGetHours) {
      Date.prototype.getHours = originalGetHours;
    }
    if (originalGetMinutes) {
      Date.prototype.getMinutes = originalGetMinutes;
    }
    currentOffset = undefined;
  }

  const set = ({ isoDate, offset }: { offset?: number; isoDate?: string }) => {
    const getMockDate = (): typeof import("mockdate") => {
      let MockDate: typeof import('mockdate');
      jest.isolateModules(() => {
        MockDate = require('mockdate');
      });
      return MockDate!;
    };

    //faced some problem with timezone offset so i took some help from llm here
    if (offset !== undefined) {
      currentOffset = offset;
      
      // Store original methods if not already stored
      if (!originalGetHours) {
        originalGetHours = Date.prototype.getHours;
      }
      if (!originalGetMinutes) {
        originalGetMinutes = Date.prototype.getMinutes;
      }
      
      // Override getHours to apply timezone offset
      Date.prototype.getHours = function() {
        const utcHours = this.getUTCHours();
        const offsetHours = Math.floor(offset);
        return (utcHours + offsetHours + 24) % 24;
      };
      
      // Override getMinutes to apply fractional timezone offset
      Date.prototype.getMinutes = function() {
        const utcMinutes = this.getUTCMinutes();
        const offsetMinutes = Math.floor((offset % 1) * 60);
        return (utcMinutes + offsetMinutes + 60) % 60;
      };
    }

    if (isoDate !== undefined) {
      getMockDate().set(isoDate);
    }
  }

  return { reset, set };
}