// questions stored in questions.js
import { questions } from './questions.js';
//debug check to test if questions have loaded
console.log("Questions loaded:", questions);

//GLOBAL VARS

// Set up container based on length of quesitons to store answers
let allAnswers = [];
let answers = [];
// Track what questions we are answering
let currentQuestion = 0;
let totalTreesToLog = 0;   // How many trees the user plans to log
let treesLogged = 0;       // Counter to track how many have been logged so far



// Function that controls opening pages
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Append 'Page' to the pageId to match element ID structure
    const fullPageId = pageId + 'Page';
    const activePage = document.getElementById(fullPageId);

    if (activePage) {
        activePage.classList.add('active');
    } else {
        console.warn(`Page with ID '${fullPageId}' not found.`);
    }
}



// Map button IDs to their click handler functions, slightly overkill but allows customisation.
const navMap = {
    logOakBtn: () => showPage("logOak"),
    reportErrorBtn: () => showPage("reportError"),
    faqBtn: () => showPage("faq"),
    contactUsBtn: () => showPage("contactUs"),
    reportErrorBackBtn: () => showPage("splash"),
    contactUsBackBtn: () => showPage("splash"),
    logOakBackBtn: () => showPage("splash"),
    faqBackBtn: () => showPage("splash"),
    readyToLogBackBtn: () => showPage("logOak")

};

// check that everything has loaded and then add the user meta input that are not part of the standard questions 
document.addEventListener("DOMContentLoaded", () => {
    // Set up navigation buttons from the navMap
    for (const [btnId, handler] of Object.entries(navMap)) {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener("click", handler);
        } else {
            console.warn(`Button with ID '${btnId}' not found in DOM.`);
        }
    }

    // Set up listener for number of trees to log
    const startBtn = document.getElementById("startLoggingBtn");
    if (startBtn) {
        startBtn.addEventListener("click", () => {
            const input = document.getElementById("treeCountInput");
            const count = parseInt(input.value);

            if (isNaN(count) || count < 1 || count > 100) {
                alert("Please enter a number between 1 and 100.");
                return;
            }

            totalTreesToLog = count;
            treesLogged = 0;

            // Create empty answer arrays for each tree
            allAnswers = Array.from({ length: totalTreesToLog }, () =>
                Array(questions.length).fill("")
            );

            showPage("readyToLog"); // Move to confirmation screen
        });
    } else {
        console.warn("startLoggingBtn not found in DOM.");
    }

    // Set up listener for confirming tree position and starting logging
    const confirmBtn = document.getElementById("confirmTreeBtn");
    if (confirmBtn) {
        confirmBtn.addEventListener("click", () => {
            let metadata = [];

            const timestamp = new Date().toISOString();
            const uniqueID = crypto.randomUUID();

            metadata[0] = uniqueID;
            metadata[1] = timestamp;

            getUserLocation((lat, long) => {
                metadata[2] = long;
                metadata[3] = lat;

                console.log("Metadata array is ready:", metadata);

                answers = allAnswers[treesLogged];
                answers.unshift(...metadata);

                showPage("question");
                loadQuestion();
            });
        });
    } else {
        console.warn("confirmTreeBtn not found in DOM.");
    }
});


// get user location
function getUserLocation(callback) {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const long = position.coords.longitude;
                console.log(`Latitude: ${lat}, Longitude: ${long}`);
                callback(lat, long); // pass back to the caller
            },
            (error) => {
                console.error("Error getting location:", error.message);
                alert("Unable to retrieve location. Please check your permissions.");
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}



// Load prev/next questions based on the question file. If you add a new type of question type (e.g., multiple checkbox) this section will need to be adapted to deal with the question.
function loadQuestion() {
    // Get the current question object from the array
    let question = questions[currentQuestion];

    // Set the visible title of the question
    document.getElementById("questionTitle").textContent = question.label;

    // Get the container where the input will be rendered and clear it
    let container = document.getElementById("questionContainer");
    container.innerHTML = "";

    // If the question has a notes (e.g. explanation), display it
    if (question.note) {
        let note = document.createElement("div");
        note.classList.add("note");
        note.textContent = question.note;
        container.appendChild(note);
    }

    let input; // Will hold the input element (text box, select menu, etc.)

    // Standard text and number fields
    if (question.type === "text" || question.type === "number") {
        input = document.createElement("input");
        input.type = question.type;
        input.value = answers[currentQuestion] || "";
        input.oninput = () => answers[currentQuestion] = input.value;
        container.appendChild(input);

    // Dropdown selection
    } else if (question.type === "select") {
        input = document.createElement("select");
        // create option list
        question.options.forEach(option => {
            let opt = document.createElement("option");
            opt.value = option;
            opt.textContent = option;
            input.appendChild(opt);
        });
        input.value = answers[currentQuestion] || "";
        input.oninput = () => answers[currentQuestion] = input.value;
        container.appendChild(input);

    // Radio button group
    } else if (question.type === "radio") {
        question.options.forEach(option => {
            let label = document.createElement("label");

            let radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "question" + currentQuestion; // Group by question
            radio.value = option;
            radio.checked = answers[currentQuestion] === option;

            // Update answer on change
            radio.onchange = () => answers[currentQuestion] = option;

            label.appendChild(radio);
            label.append(" " + option);
            container.appendChild(label);
            container.appendChild(document.createElement("br")); // Line break
        });

    // Slider input
    } else if (question.type === "range") {
        input = document.createElement("input");
        input.type = "range";
        input.min = 0;
        input.max = 100;
        input.step = 5;
        input.value = answers[currentQuestion] || 0;

        // Live-updating label for the slider value
        let rangeLabel = document.createElement("span");
        rangeLabel.textContent = input.value + "%";

        input.oninput = () => {
            rangeLabel.textContent = input.value + "%";
            answers[currentQuestion] = input.value;
        };

        container.appendChild(input);
        container.appendChild(rangeLabel);
    }

    // Apply a consistent styling class (if input exists)
    if (input) input.classList.add("input-field");

    // Update navigation buttons (e.g. Next/Prev state)
    updateButtons();
}

function updateButtons() {
    document.getElementById("backBtn").style.display = currentQuestion > 0 ? "block" : "none";
    document.getElementById("nextBtn").style.display = currentQuestion < questions.length - 1 ? "block" : "none";
    document.getElementById("submitBtn").style.display = currentQuestion === questions.length - 1 ? "block" : "none";
}

function nextQuestion() {
    const question = questions[currentQuestion]; // Get the current question
    let answer = null;

    if (question.type === "text" || question.type === "number") {
        // Get text/number input values
        const inputElement = document.getElementById(question.id);
        if (inputElement) {
            answer = inputElement.value;
        }
    } else if (question.type === "radio") {
        // Get selected radio button value
        const selectedRadio = document.querySelector(`input[name="${question.id}"]:checked`);
        if (selectedRadio) {
            answer = selectedRadio.value;
        }
    } else if (question.type === "checkbox") {
        // Get all selected checkboxes
        const selectedCheckboxes = document.querySelectorAll(`input[name="${question.id}"]:checked`);
        answer = Array.from(selectedCheckboxes).map(cb => cb.value).join(", "); // Store as comma-separated string
    }

    if (answer !== null) {
        answers[question.id] = answer; // Store the answer
    }

    console.log("Stored Answers:", answers); // Debugging

    // Move to next question or finish
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion(currentQuestion);
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function downloadCSV() {

    let questionstemp = [...questions];

    questionstemp.push({ label: "Long"})
    questionstemp.push({ label: "Lat"})
    questionstemp.push({ label: "ID"})

    let csvContent = "data:text/csv;charset=utf-8," +
        questionstemp.map((q, i) => `${q.label},${answers[i]}`).join("\n");
    
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `oak_tree_data_${answers[answers.length - 1]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Reset questionnaire data
    answers = Array(questions.length + 3).fill("");  
    currentQuestion = 0;  

    // Return to splash page
    showPage("splashPage");
}

function cancelSubmission() {
    totalTreesToLog = totalTreesToLog -1;
    treesLogged = treesLogged - 1;  
}


