const v = require('../validations');

describe('validations', () => {
    test('validateCommand throws on invalid command', () => {
        expect(() => v.validateCommand('invalid')).toThrow("Unknown command 'invalid'");
    });

    test('validateCommand passes on valid command', () => {
        expect(() => v.validateCommand('add')).not.toThrow();
    });

    test('validateCommand ignores undefined (help)', () => {
        expect(() => v.validateCommand(undefined)).not.toThrow();
    });

    test('validateArgs throws for "add" with missing args', () => {
        expect(() => v.validateArgs('add', ['name', 'email'])).toThrow("Missing arguments for add command");
    });

    test('validateArgs passes for "add" with 3 args', () => {
        expect(() => v.validateArgs('add', ['name', 'email', 'phone'])).not.toThrow();
    });

    test('validateArgs throws for "search" with missing args', () => {
        expect(() => v.validateArgs('search', [])).toThrow("Missing arguments for search command");
    });

    test('validateArgs throws for "delete" with missing args', () => {
        expect(() => v.validateArgs('delete', [])).toThrow("Missing arguments for delete command");
    });

    test('validateEmail throws without @', () => {
        expect(() => v.validateEmail('invalid')).toThrow("Email must contain @ symbol");
    });

    test('validateEmail passes with @', () => {
        expect(() => v.validateEmail('test@test.com')).not.toThrow();
    });
});
