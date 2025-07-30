import { QuantityValidator } from 'tasks/task2';

describe('QuantityValidator', () => {
// - the constructor should throw an error if some values are invalid (`threshold` cannot be a negative value, `packageSize` should be greater than zero)
  describe("constructor validation", () => {
    it("throws error if theshold is negative", () => {
      expect(() => new QuantityValidator(-1, 10)).toThrow('Threshold must be a positive number');
    });
    it("throws error if packageSize is negative", () => {
      expect(() => new QuantityValidator(10, -1)).toThrow('Package size must be a positive number');
    });
    it("throws error if packageSize is zero", () => {
      expect(() => new QuantityValidator(10, 0)).toThrow('Package size must be greater than zero');
    });
  });

  describe("validate method", () => {
    // - the quantity exceeds the threshold and does not exceed
    it("returns error if quantity exceeds the threshold", () => {
      const validator = new QuantityValidator(10, 10);
      const result = validator.validate(11);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Quantity exceeds the threshold');
    });
    it("returns error if quantity does not exceed the threshold", () => {
      const validator = new QuantityValidator(10, 5);
      const result = validator.validate(10);
      expect(result.isValid).toBe(true);
      expect(result.error).toBe(null);
    });
    // - the quantity is divisible by package size and is not divisible
    it("returns error if quantity is not divisible by package size", () => {
      const validator = new QuantityValidator(10, 10);
      const result = validator.validate(9);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Quantity is not divisible by package size');
    });
    it("returns error if quantity is divisible by package size", () => {
      const validator = new QuantityValidator(10, 10);
      const result = validator.validate(10);
      expect(result.isValid).toBe(true);
      expect(result.error).toBe(null);
    });
    //- the method should return false if quantity is less than zero or zero
    it("returns error if quantity is less than zero", () => {
      const validator = new QuantityValidator(10, 10);
      const result = validator.validate(-1);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Quantity must be greater than zero');
    });
    it("returns error if quantity is zero", () => {
      const validator = new QuantityValidator(10, 10);
      const result = validator.validate(0);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Quantity must be greater than zero');
    });
  });



});
