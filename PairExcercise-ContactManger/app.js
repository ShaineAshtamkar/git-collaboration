const ui = require('./ui');
const contacts = require('./contacts');
const v = require("./validations");
let name, email, phone
function run() {
    let command;
    try {
        command = process.argv[2];
        const args = process.argv.slice(3);

        v.validateCommand(command);
        v.validateArgs(command, args);


        switch (command) {
            case "add":
                [name, email, phone] = args;
                v.validateContact(name, email, phone);
                contacts.add(name, email, phone)
                break;
            case "list":
                contacts.list()
                break;
            case "search":
                const query = args[0];
                contacts.search(query);

                break;
            case "delete":
                email = args[0];
                v.validateEmail(email);
                contacts.deleteContact(email);

                break;
            case "help":
                ui.printHelp();
                return;


        }
    } catch (err) {
        ui.handleError(err, command);
        process.exitCode = 1;

    }

}

if (require.main === module) {
    run();
}
module.exports = { run };