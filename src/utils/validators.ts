
/**
 * A utility class for common validation functions.
 */
export class Validators {
    /**
     * Validates if the given value is a valid email address.
     * 
     * @param value - The string to validate as an email.
     * @returns `true` if the value is a valid email, otherwise `false`.
     * 
     * @example
     * ```typescript
     * Validators.isEmail("test@example.com"); // true
     * Validators.isEmail("invalid-email"); // false
     * ```
     */
    static isEmail(value: string): boolean;

    static isEmail(value: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    }

    /**
     * Checks if the given value is an empty string.
     * 
     * @param value - The string to check.
     * @returns `true` if the value is empty, otherwise `false`.
     * 
     * @example
     * ```typescript
     * Validators.isEmpty(""); // true
     * Validators.isEmpty("not empty"); // false
     * ```
     */
    static isEmpty(value: string): boolean;

    static isEmpty(value: string): boolean {
        return value.trim().length === 0;
    }

    /**
     * Validates if the given value is a number.
     * 
     * @param value - The string to validate as a number.
     * @returns `true` if the value is a number, otherwise `false`.
     * 
     * @example
     * ```typescript
     * Validators.isNumber("123"); // true
     * Validators.isNumber("abc"); // false
     * ```
     */
    static isNumber(value: string): boolean;

    static isNumber(value: string): boolean {
        return !isNaN(Number(value));
    }

    /**
     * Checks if the given value meets the minimum length requirement.
     * 
     * @param value - The string to check.
     * @param length - The minimum length required.
     * @returns `true` if the value meets the minimum length, otherwise `false`.
     * 
     * @example
     * ```typescript
     * Validators.minLength("hello", 3); // true
     * Validators.minLength("hi", 3); // false
     * ```
     */
    static minLength(value: string, length: number): boolean;

    static minLength(value: string, length: number): boolean {
        return value.length >= length;
    }

    /**
     * Checks if the given value does not exceed the maximum length requirement.
     * 
     * @param value - The string to check.
     * @param length - The maximum length allowed.
     * @returns `true` if the value does not exceed the maximum length, otherwise `false`.
     * 
     * @example
     * ```typescript
     * Validators.maxLength("hello", 10); // true
     * Validators.maxLength("this is too long", 10); // false
     * ```
     */
    static maxLength(value: string, length: number): boolean;

    static maxLength(value: string, length: number): boolean {
        return value.length <= length;
    }

    /**
     * Validates if the given value is a valid phone number.
     * 
     * @param value - The string to validate as a phone number.
     * @returns `true` if the value is a valid phone number, otherwise `false`.
     * 
     * @example
     * ```typescript
     * Validators.isPhoneNumber("+1234567890"); // true
     * Validators.isPhoneNumber("12345"); // false
     * ```
     */
    static isPhoneNumber(value: string): boolean;

    static isPhoneNumber(value: string): boolean {
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        return phoneRegex.test(value);
    }
}