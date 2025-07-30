import { getUtcStringDate } from 'tasks/task3';
import { setupMockDate, MockDateSetup } from './testUtils';

describe('task3', () => {
  let mockDate: MockDateSetup;
const RealDate = global.Date;

  beforeEach(() => {
    mockDate = setupMockDate();
  });

  afterEach(() => {
    mockDate.reset();
    global.Date = RealDate;
  });


    it("should freeze time to a specific ISO date", () => {
    const mock = setupMockDate();
    const frozenTime = "2023-01-01T12:00:00Z";
    mock.set({ isoDate: frozenTime });
    const now = new Date();
    expect(Date.parse(now.toISOString())).toBe(Date.parse(frozenTime)); 
    mock.reset();
    });
  
  it("should work with timezone offset", () => {
    const mock = setupMockDate();
    mock.set({ offset: 5.5 });
    const local = new Date("2024-01-01T00:00:00Z");
    expect(local.getHours()).toBe(5);
    expect(local.getMinutes()).toBe(30);
    mock.reset();
  });

  it("should combine timezone offset and frozen date", () => {
    const mock = setupMockDate();
    mock.set({ isoDate: "2024-02-01T00:00:00Z", offset: 9 });
    const now = new Date();
    console.log(now.toISOString());
    expect(now.getUTCHours()).toBe(0);
    expect(now.getHours()).toBe(9);
    mock.reset();
  });

  it("should reset to original Date", () => {
    const mock = setupMockDate();
    mock.set({ isoDate: "2022-12-31T23:59:59Z" });
    mock.reset();
    const now = new Date();
    const realNow = new RealDate();
    expect(Math.abs(now.getTime() - realNow.getTime())).toBeLessThan(1000);
  });

  it("should return current date in ISO8601 UTC string when no argument is provided", () => {
    const mock = setupMockDate();
    const frozenTime = "2023-04-01T10:00:00Z";
    mock.set({ isoDate: frozenTime });
    const result = getUtcStringDate();
    expect(result).toBe("2023-04-01T10:00:00.000Z");
    mock.reset();
  });

  it("should return correct UTC string for date in UTC+5.5 timezone", () => {
    const mock = setupMockDate();
    mock.set({ offset: 5.5 });
    const date = new Date("2023-03-31T23:30:00+05:30");
    const result = getUtcStringDate(date);
    expect(result).toBe("2023-03-31T18:00:00.000Z");
    mock.reset();
  });

  it("should return correct UTC string for date in UTC-8 timezone", () => {
    const mock = setupMockDate();
    mock.set({ offset: -8 });
    const date = new Date("2023-03-31T16:00:00-08:00");
    const result = getUtcStringDate(date);
    expect(result).toBe("2023-04-01T00:00:00.000Z");
    mock.reset();
  });

  // write your tests here
});
