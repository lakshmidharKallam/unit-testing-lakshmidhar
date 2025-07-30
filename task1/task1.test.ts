import { validateUserName } from 'tasks/task1/index';
import { fetchIsUserNameAvailable } from 'tasks/task1/fetchIsUserNameValid';

jest.mock('task1/fetchIsUserNameValid', 
  // write your mock here
  () => ({
    fetchIsUserNameAvailable: jest.fn(),
  })
);

describe('task1', () => {

  // good practice to clear all mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  
  //   - a user name should be at least 3 characters long

  it('returns false if name has length less than 3 symbols', async () => {
    // write your first unit test here
    const result = await validateUserName('ab');
    expect(result).toBe(false);
    expect(fetchIsUserNameAvailable).not.toHaveBeenCalled();
  });

  // - a user name should contain only alphanumeric symbols (no spaces either)

  it("returns false if name has special characters", async () => {  
    const result = await validateUserName('abcd!');
    expect(result).toBe(false);
    expect(fetchIsUserNameAvailable).not.toHaveBeenCalled();
  });
  // - a user name should contain only alphanumeric symbols (no spaces either)
  it("returns false if name has spaces", async () => {  
    const result = await validateUserName('abcd abcd');
    expect(result).toBe(false);
    expect(fetchIsUserNameAvailable).not.toHaveBeenCalled();
  });

  // - a user name should not start with a number
  it("returns false if name starts with a number", async () => {  
    const result = await validateUserName('1abcd');
    expect(result).toBe(false);
    expect(fetchIsUserNameAvailable).not.toHaveBeenCalled();
  });

  // - a user name should be unique, and the method makes sure by calling `fetchIsUserNameAvailable` method, which returns a boolean value whether a user name is available for registering (it means it was not used yet)
  it("returns true if name is available", async () => {  
    (fetchIsUserNameAvailable as jest.Mock).mockResolvedValue(true);
    const result = await validateUserName('abcd');
    expect(result).toBe(true);
    expect(fetchIsUserNameAvailable).toHaveBeenCalledWith('abcd');
  });

  it("returns false if name is not available", async () => {  
    (fetchIsUserNameAvailable as jest.Mock).mockResolvedValue(false);
    const result = await validateUserName('abcd');
    expect(result).toBe(false);
  });

  // - if `fetchIsUserNameAvailable` fails (throws an exception), the method returns false as well.
  it("returns false if fetchIsUserNameAvailable throws an exception", async () => {  
    (fetchIsUserNameAvailable as jest.Mock).mockRejectedValue(new Error('test'));
    const result = await validateUserName('abcd');
    expect(result).toBe(false);
  });

  // ...and add more test cases
});