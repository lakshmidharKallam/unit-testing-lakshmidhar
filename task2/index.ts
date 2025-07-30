interface IQuantityValidator {
  validate(quantity: number): { isValid: boolean; error: string | null };
}

export class QuantityValidator implements IQuantityValidator {
  private threshold: number;
  private packageSize: number;

  constructor(threshold: number, packageSize: number) {
    // Validate constructor parameters
    if (threshold < 0) {
      throw new Error('Threshold must be a positive number');
    }
    if (packageSize <= 0) {
      if (packageSize === 0) {
        throw new Error('Package size must be greater than zero');
      } else {
        throw new Error('Package size must be a positive number');
      }
    }
    
    this.threshold = threshold;
    this.packageSize = packageSize;
  }

  public validate(quantity: number): { isValid: boolean; error: string | null } {
    // Check if quantity is less than or equal to zero
    if (quantity <= 0) {
      return { isValid: false, error: 'Quantity must be greater than zero' };
    }

    // Check if quantity exceeds the threshold
    if (quantity > this.threshold) {
      return { isValid: false, error: 'Quantity exceeds the threshold' };
    }

    // If quantity less than or equal to threshold, check if it's divisible by package size
    if (quantity <= this.threshold && quantity % this.packageSize !== 0) {
      return { isValid: false, error: 'Quantity is not divisible by package size' };
    }

    // All validations passed
    return { isValid: true, error: null };
  }
}