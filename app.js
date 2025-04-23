// questions stored in questions.js
import { questions } from './questions.js';
//debug check to test if questions have loaded
console.log("Questions loaded:", questions);



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

// Map button IDs to their click handler functions
const navMap = {
    logOakBtn: () => showPage("logOak"),
    reportErrorBtn: () => showPage("reportError"),
    faqBtn: () => showPage("faq"),
    contactUsBtn: () => showPage("contactUs"),
    reportErrorBackBtn: () => showPage("splash"),
    contactUsBackBtn: () => showPage("splash"),
    logOakBackBtn: () => showPage("splash"),
    faqBackBtn: () => showPage("splash"),
};

// Set up event listeners after the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    for (const [btnId, handler] of Object.entries(navMap)) {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener("click", handler);
        } else {
            console.warn(`Button with ID '${btnId}' not found in DOM.`);
        }
    }
});

// Set up container based on length of quesitons to store answers
let answers = Array(questions.length).fill("");
// Track what questions we are answering
let currentQuestion = 0;

function 


// start the proces of logging trees:
function startLogging() {
    
    //create a unique ID
    globalID = crypto.randomUUID();
    answers[answers.length-1] = globalID
    getUserLocation()
    showPage("questionPage");
    loadQuestion();
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
    currentQuestion = 0; // Reset questionnaire
    answers = Array(questions.length + 3).fill(""); // Clear collected answers
    showPage('splashPage'); // Navigate back to the splash page
}


function getUserLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let lat = position.coords.latitude;
                let long = position.coords.longitude;
                console.log(`Latitude: ${lat}, Longitude: ${long}`);

                // Store in answers array (assuming last two slots are for lat/long)
                answers[answers.length - 3] = lat;
                answers[answers.length - 2] = long;
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