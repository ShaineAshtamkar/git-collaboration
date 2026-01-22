const app = require('../app');
const contacts = require('../contacts');
const ui = require('../ui');
const v = require('../validations');

jest.mock('../contacts');
jest.mock('../ui');
jest.mock('../validations');

describe('app', () => {
    const originalArgv = process.argv;
    const originalExitCode = process.exitCode;

    beforeEach(() => {
        jest.clearAllMocks();
        process.argv = [...originalArgv];
        process.exitCode = undefined;
    });

    afterAll(() => {
        process.argv = originalArgv;
        process.exitCode = originalExitCode;
    });

    test('run calls validateCommand and validateArgs', () => {
        process.argv = ['node', 'app.js', 'add', 'a', 'b', 'c'];
        v.validateCommand.mockImplementation(() => { });
        v.validateArgs.mockImplementation(() => { });
        app.run();
        expect(v.validateCommand).toHaveBeenCalledWith('add');
        expect(v.validateArgs).toHaveBeenCalledWith('add', ['a', 'b', 'c']);
    });

    test('run calls contacts.add on "add" command', () => {
        process.argv = ['node', 'app.js', 'add', 'name', 'email', 'phone'];
        v.validateCommand.mockImplementation(() => { });
        v.validateArgs.mockImplementation(() => { });
        app.run();
        expect(contacts.add).toHaveBeenCalledWith('name', 'email', 'phone');
    });

    test('run calls contacts.list on "list" command', () => {
        process.argv = ['node', 'app.js', 'list'];
        v.validateCommand.mockImplementation(() => { });
        v.validateArgs.mockImplementation(() => { });
        app.run();
        expect(contacts.list).toHaveBeenCalled();
    });

    test('run calls contacts.search on "search" command', () => {
        process.argv = ['node', 'app.js', 'search', 'query'];
        v.validateCommand.mockImplementation(() => { });
        v.validateArgs.mockImplementation(() => { });
        app.run();
        expect(contacts.search).toHaveBeenCalledWith('query');
    });

    test('run calls contacts.deleteContact on "delete" command', () => {
        process.argv = ['node', 'app.js', 'delete', 'email'];
        v.validateCommand.mockImplementation(() => { });
        v.validateArgs.mockImplementation(() => { });
        app.run();
        expect(contacts.deleteContact).toHaveBeenCalledWith('email');
    });

    test('run handles errors and calls ui.handleError', () => {
        process.argv = ['node', 'app.js', 'add'];
        const err = new Error("Mock Error");
        v.validateCommand.mockImplementation(() => { throw err; });

        app.run();

        expect(ui.handleError).toHaveBeenCalledWith(err, 'add');
        expect(process.exitCode).toBe(1);
    });
});
