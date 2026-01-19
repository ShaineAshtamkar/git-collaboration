//secret message:

//The secret message is that there is no secret message

const fs = require("fs");

function safeJsonParse(input) {
    try {
        return JSON.parse(input);
    } catch (err) {
        return "Invalid JSON format";
    }
}

console.log(safeJsonParse('{"name": "John"}'));

console.log(safeJsonParse("invalid json"));

function readFileWithErrorHandling(filePath, callback) {
    fs.readFile(filePath, (err, data) => {
        if (err) {

        }


    }

    )
}