const contacts = require('../contacts');
const fs = require('fs');
const path = require('path');

// Mock fs
jest.mock('fs');

const FILE = path.join(__dirname, '..', 'contacts.json');

describe('contacts', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('loadContacts returns empty array on ENOENT', () => {
        const error = new Error("File not found");
        error.code = "ENOENT";
        fs.readFileSync.mockImplementation(() => { throw error });

        const result = contacts.loadContacts();
        expect(result).toEqual([]);
        expect(fs.readFileSync).toHaveBeenCalledWith(FILE, "utf8");
    });

    test('loadContacts parses JSON', () => {
        fs.readFileSync.mockReturnValue(JSON.stringify([{ name: 'test' }]));
        const result = contacts.loadContacts();
        expect(result).toEqual([{ name: 'test' }]);
    });

    test('add adds a contact and saves', () => {
        fs.readFileSync.mockReturnValue('[]');
        contacts.add('Name', 'email@test.com', '123');
        expect(fs.writeFileSync).toHaveBeenCalledWith(FILE, expect.stringContaining('"email": "email@test.com"'), "utf8");
    });

    test('add prevents duplicate email', () => {
        fs.readFileSync.mockReturnValue(JSON.stringify([{ name: 'Old', email: 'email@test.com' }]));
        // We mock console.log to avoid clutter
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
        contacts.add('New', 'email@test.com', '123');
        expect(fs.writeFileSync).not.toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("already exists"));
        logSpy.mockRestore();
    });

    test('deleteContact removes contact', () => {
        fs.readFileSync.mockReturnValue(JSON.stringify([{ name: 'Old', email: 'email@test.com' }]));
        contacts.deleteContact('email@test.com');
        expect(fs.writeFileSync).toHaveBeenCalledWith(FILE, expect.stringContaining('[]'), "utf8");
    });

    test('deleteContact throws if not found', () => {
        fs.readFileSync.mockReturnValue('[]');
        expect(() => contacts.deleteContact('missing@test.com')).toThrow("No contact found");
    });
});
