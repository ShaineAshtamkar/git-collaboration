const fs = require("fs");
const path = require("path");
const FILE = path.join(__dirname, "contacts.json");


function loadContacts() {
    console.log(`Loading contacts from ${FILE}...`);
    try {
        const raw = fs.readFileSync(FILE, "utf8");
        const data = JSON.parse(raw);
        return Array.isArray(data) ? data : [];
    } catch (err) {
        if (err.code === "ENOENT") {
            console.log("✗ File not found - creating new contact list");
            return [];
        }
        throw err;
    }
}
function saveContacts(contacts) {
    fs.writeFileSync(FILE, JSON.stringify(contacts, null, 2), "utf8");
    console.log(`✓ Contacts saved to ${FILE}`);

}

function add(name, email, phone) {
    const contacts = loadContacts();
    const exists = contacts.some((c) => c.email.toLowerCase() == email.toLowerCase())
    if (exists) {
        console.log(`✗ Error: Contact with this email: ${email} already exists`)
    }
    else {
        contacts.push({ name, email, phone });
        console.log(`✓ Contact added: ${name}`);

        saveContacts(contacts);
    }
}
function list() {
    const contacts = loadContacts();

    console.log("\n=== All Contacts ===");

    if (contacts.length === 0) {
        console.log("No contacts found");
        return;
    }
    for (let i = 0; i < contacts.length; i++) {
        const c = contacts[i];
        console.log(`${i + 1}. ${c.name} - ${c.email} - ${c.phone}`);
    }

}

function search(query) {
    const contacts = loadContacts();
    const q = query.toLowerCase();
    const results = contacts.filter(c => {
        return (c.name.toLowerCase().includes(q))
    })
    console.log(`\n=== Search Results for "${query}" ===`);
    if (results.length === 0) {
        console.log(`No contacts found matching "${query}"`);
        return;
    }
    results.forEach((c, i) => {
        console.log(`${i + 1}. ${c.name} - ${c.email} - ${c.phone}`)
    }


    );

}

function deleteContact(email) {
    const contacts = loadContacts();
    const idx = contacts.findIndex((c) => {
        return c.email.toLowerCase() == email.toLowerCase()
    })
    if (idx == -1) {
        throw new Error(`No contact found with email: ${email}`);

    }
    const removed = contacts.splice(idx, 1)[0];
    console.log(`✓ Contact deleted: ${removed.name}`);
    saveContacts(contacts)

}



module.exports = { add, loadContacts, list, search, deleteContact };
