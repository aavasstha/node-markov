/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

function generateText(text) {
    let markov = new markov.MarkovMachine(text);
    console.log(markov.makeText());
}

function makeText(path) {
    fs.readFile(path, "utf-8", (error, data) => {
        if (error) {
            console.log(`Cannot read file: ${path}: ${error}`);
            process.kill(1);
        } else {
            generateText(data)
        };
    });
}

async function makeURLTexxt(url) {
    let response;
    try {
        response = await axios.get(url);
    } catch (error) {
        console.log(`Cannot read ${url}: ${error}`);
        process.kill(1);
    }
    generateText(response.data);
}

let [method, path] = process.argv.slice(2);
if (method === 'file') {
    makeText(path);
} else if (method === 'url') {
    makeURLTexxt(path);
} else {
    console.log(`Unknown method: ${method}`);
    process.kill(1)
}