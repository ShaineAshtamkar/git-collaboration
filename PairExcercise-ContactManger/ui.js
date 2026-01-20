function printHelp() {
    console.log(`Usage: node contacts.js [command] [arguments]
Commands:
add "name" "email" "phone" - Add a new contact
list - List all contacts
search "query" - Search contacts by name or email
delete "email" - Delete contact by email
help - Show this help message
`)
}


function printError(message) {
    console.log(`✗ Error: ${message}`);
}

function printUnknownCommandUsage(command) {
    console.log("Usage: node contacts.js [add|list|search|delete|help] [arguments]");
}
function printMissingArgsUsage(command) {
    if (command === "add") {
        console.log('Usage: node contacts.js add "name" "email" "phone"');
        return;

    }
    if (command === "search") {
        console.log('Usage: node contacts.js search "query"');
        return;
    }
    if (command === "delete") {
        console.log('Usage: node contacts.js delete "email"');
        return;
    }
}


function handleError(err, command) {
    let msg;
    if (err && err.message) {
        msg = err.message;
    } else {
        msg = String(err);
    }
    printError(msg);

    if (msg.startsWith("Unknown command")) {
        printUnknownCommandUsage();
        return;
    }
    if (msg.startsWith("Missing arguments")) {
        printMissingArgsUsage(command);
        return;
    }
}



















module.exports = { printError, printUnknownCommandUsage, handleError, printHelp, printMissingArgsUsage }