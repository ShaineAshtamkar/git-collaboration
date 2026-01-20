const VALID_COMMANDS = ["add", "list", "search", "delete", "help"];

function validateCommand(command) {

    if (command === undefined) return;// treat as "help" in app.js

    if (!VALID_COMMANDS.includes(command)) {
        throw new Error(`Unknown command '${command}'`);
    }
}
function validateArgs(command, args) {
    switch (command) {
        case "add":
            if (args.length < 3) {
                throw new Error("Missing arguments for add command");
            }
            return;

        case "search":
            if (args.length < 1) {
                throw new Error("Missing arguments for search command");
            }

            return;

        case "delete":
            if (args.length < 1) {
                throw new Error("Missing arguments for delete command");
            }
            return;

    }

} function validateEmail(email) {

    if (!email.includes("@")) {
        throw new Error("Email must contain @ symbol");
    }
}

function validateContact(name, email, phone) {
    // you can add more later, but email is enough for now
    validateEmail(email);
}

module.exports = { validateCommand, validateArgs, validateContact, validateEmail }