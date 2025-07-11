// questions stored in questions.js

import { questions } from './questions.js';
import { headers } from './questions.js';

//debug check to test if questions have loaded
console.log("Questions loaded:", questions);
console.log("headers loaded:", headers);


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



// Map button IDs to their click handler functions for navigation, slightly overkill but allows customisation.
const navMap = {
    
    logOakBtn: () => showPage("logOak"),
    faqBtn: () => showPage("faq"),
    reportErrorBackBtn: () => showPage("splash"),
    contactUsBackBtn: () => showPage("splash"),
    logOakBackBtn: () => showPage("splash"),
    faqBackBtn: () => showPage("splash"),
    //readyToLogBackBtn: () => showPage("logOak")
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

            // Create empty answer arrays for each tree (arrays x num of trees)
            allAnswers = Array.from({ length: totalTreesToLog }, () =>
                Array(questions.length).fill("")
            );
            updateButtons();
            showPage("readyToLog"); // Move to confirmation screen
        });
    } else {
        console.warn("startLoggingBtn not found in DOM.");
    }


    // Set up listener for confirming tree position and starting logging, capture meta data and add to end of answer array
    const confirmBtn = document.getElementById("confirmTreeBtn");
    if (confirmBtn) {
        confirmBtn.addEventListener("click", () => {
            const treeIndex = treesLogged;
            const metadata = [];

            const uniqueID = crypto.randomUUID();
            const timestamp = new Date().toISOString();
            

            metadata[0] = uniqueID;
            metadata[1] = timestamp;

            getUserLocation((lat, long) => {
                metadata[2] = lat;
                metadata[3] = long;

                console.log("Metadata array is ready:", metadata);


                // error where lat and long can be added to wrong list - I think this is occuring because long and lat are 
                // taking longer than expected and then being added to wrong answer list but I am not 100% sure
                // this should force the call to only change the current answer list
                
                const answersForTree = allAnswers[treeIndex];
                answersForTree.length = questions.length; // pad in case not filled yet
                answersForTree.push(...metadata);

                // Now update global 'answers' reference
                answers = answersForTree;

                showPage("question");
                loadQuestion();
            });
        });
    } else {
        console.warn("confirmTreeBtn not found in DOM.");
    }



    // next tree
    const nextTreebtn = document.getElementById("nextTreeBtn");
    if (nextTreebtn) {
        nextTreebtn.addEventListener("click", nextTree);
    }

    // reset sub cancel button
    const LcancelBtn = document.getElementById("readyToLogBackBtn");
    if (LcancelBtn) {
        LcancelBtn.addEventListener("click", quitQ);
    }

    // cancel during questions - rolls back to last submitted tree
    const cancelBtn = document.getElementById("QcancelButton");
    if (cancelBtn) {
        cancelBtn.addEventListener("click", cancelSubmission);
    }

    // Next Button — go to next question
    const nextBtn = document.getElementById("nextBtn");
    if (nextBtn) {
        nextBtn.addEventListener("click", nextQuestion);
    }

    // Back Button — go to previous question
    const backBtn = document.getElementById("backBtn");
    if (backBtn) {
        backBtn.addEventListener("click", prevQuestion);
    }

    // Submit Button — finish logging and download CSV
    const submitBtn = document.getElementById("submitBtn");
    if (submitBtn) {
        submitBtn.addEventListener("click", downloadCSV);
    }

    //submit button from log page (validation false because we are not submitting from the final question)
    const lgsubmitBtn = document.getElementById("LogsubmitBtn");
    if (lgsubmitBtn) {
        lgsubmitBtn.addEventListener("click", () => downloadCSV({ validate: false }));
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
                alert("Unable to retrieve location. Please check your permissions or location will not be captured.");
                callback(0, 0);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    } else {
        alert("Geolocation is not supported by your browser, no location data can be captured.");
        callback(0,0)
    }
}



// Load prev/next questions based on the question file. If you add a new type of question type (e.g., multiple checkbox) this section will need to be adapted to deal with the question.

function loadQuestion() {
    
    // get question
    const question = questions[currentQuestion];
    const qId = question.id;

    const container = document.getElementById("questionContainer");
    container.innerHTML = ""; // Clear previous

    // Title and Info Button
    const titleContainer = document.createElement("div");
    titleContainer.classList.add("question-title-container");

    const title = document.createElement("h2");
    title.textContent = question.label;
    titleContainer.appendChild(title);

   
    // if there is info set up the box to store and the ? to indicate it can be activated

    if (question.info) {
        // set up the "?" button to reveal info
        const infoBtn = document.createElement("img");
        infoBtn.src = "graphics/rcqm.png";
        infoBtn.alt = "More Info";
        infoBtn.classList.add("info-icon");

        const infoBox = document.createElement("div");
        infoBox.classList.add("info-box");
        infoBox.textContent = question.info;
        infoBox.style.display = "none";
        container.appendChild(infoBox);

        infoBtn.addEventListener("click", () => {
            infoBox.style.display = infoBox.style.display === "none" ? "block" : "none";
        });

        titleContainer.appendChild(infoBtn);
    }

    container.appendChild(titleContainer);

    //  Notes are short details about the question that allways show
    if (question.note) {
        const note = document.createElement("div");
        note.classList.add("note");
        note.textContent = question.note;
        container.appendChild(note);
    }

    // info is long faq about question, they only show when the ? is clicked
    if (question.info) {
        const infoBox = document.createElement("div");
        infoBox.classList.add("info-box");
        infoBox.textContent = question.info;
        infoBox.style.display = "none";
        container.appendChild(infoBox);
        console.log("infoBox created with content:", question.info);
    }

    // IF there is an Image display it

    if (question.image) {
        const image = document.createElement("img");
        image.src = question.image;
        image.alt = "Illustration for question";
        image.classList.add("question-image");
        container.appendChild(image);
    }

    // Input checks and Logic
    let input;

    // text or numeric inputs
    if (["text", "number"].includes(question.type)) {
        input = document.createElement("input");
        input.type = question.type;
        input.id = qId;
        input.value = answers[qId] || "";
        input.classList.add("input-field");
        container.appendChild(input);

        if (question.type === "number") {
        if (question.min !== undefined) input.min = question.min;
        if (question.max !== undefined) input.max = question.max;
    }

    // selection questions
    } else if (question.type === "select") {
        input = document.createElement("select");
        input.id = qId;
        input.classList.add("input-field");

        const placeholder = document.createElement("option");
        placeholder.value = "";
        placeholder.textContent = "-- Select --";
        placeholder.disabled = true;
        placeholder.selected = !answers[qId];
        input.appendChild(placeholder);

        question.options.forEach(option => {
            const opt = document.createElement("option");
            opt.value = option;
            opt.textContent = option;
            if (answers[qId] === option.toString()) opt.selected = true;
            input.appendChild(opt);
        });

        container.appendChild(input);

    // radio button questions
    } else if (question.type === "radio") {
        question.options.forEach(option => {
            const label = document.createElement("label");
            const radio = document.createElement("input");

            radio.type = "radio";
            radio.name = qId;
            radio.value = option;
            radio.checked = answers[qId] === option;
            radio.onchange = () => answers[qId] = option;

            label.appendChild(radio);
            label.append(" " + option);
            container.appendChild(label);
            container.appendChild(document.createElement("br"));
        });

    //range button questions
    } else if (question.type === "range") {
        input = document.createElement("input");
        input.type = "range";
        input.id = qId;
        input.value = answers[qId] || 0;
        input.classList.add("input-field");

        //set range
        input.min = question.rmin !== undefined ? question.rmin : 1;
        input.max = question.rmax !== undefined ? question.rmax : 10;
        input.step = question.rstep !== undefined ? question.rstep : 1;
        input.value = answers[qId] !== undefined ? answers[qId] : input.min;

        const rangeLabel = document.createElement("span");
        rangeLabel.textContent = input.value + "%";

        input.oninput = () => {
            rangeLabel.textContent = input.value + "%";
            answers[qId] = input.value;
        };

        container.appendChild(input);
        container.appendChild(rangeLabel);
    }

    // Tree and Question Progress counter
    const questionProgress = document.getElementById("questionProgress");
    questionProgress.textContent = `Tree: ${treesLogged + 1}/${totalTreesToLog}   Question: ${currentQuestion + 1}/${questions.length}`;

    //update buttons to support correct options
    updateButtons();
}

//load previous question
function prevQuestion() {
    do {
        currentQuestion--;
    } while (
        currentQuestion >= 0 &&
        questions[currentQuestion].showIf &&
        !questions[currentQuestion].showIf(answers)
    );

    if (currentQuestion >= 0) {
        loadQuestion();
    }
}

//load next question
function nextQuestion() {
    if (!storeAnswer()) return;

    do {
        currentQuestion++;
    } while (
        currentQuestion < questions.length &&
        questions[currentQuestion].showIf &&
        !questions[currentQuestion].showIf(answers)
    );

    if (currentQuestion < questions.length) {
        loadQuestion();
    }
}


// should allow skipping for questions that required verification
function storeAnswer() {
    const question = questions[currentQuestion];
    const qId = question.id;
    let answer = null;

    // Retrieve value based on question type
    if (question.type === "number") {
        const input = document.getElementById(qId);
        if (input) {
            const rawValue = input.value.trim();
            if (rawValue === "") {
                if (question.required) {
                    alert("This question is compulsory.");
                    return false;
                } else {
                    answers[qId] = ""; // Store blank if not required
                    return true;
                }
            }

            const value = parseFloat(rawValue);
            if (isNaN(value)) {
                alert("Please enter a valid number.");
                return false;
            }
            if (question.min !== undefined && value < question.min) {
                alert(`Value must be at least ${question.min}.`);
                return false;
            }
            if (question.max !== undefined && value > question.max) {
                alert(`Value must not exceed ${question.max}.`);
                return false;
            }
            answer = value;
        }

    } else if (["text", "select"].includes(question.type)) {
        const input = document.getElementById(qId);
        if (input) {
            const rawValue = input.value.trim();
            if (question.required && rawValue === "") {
                alert("This question is compulsory.");
                return false;
            }
            answer = rawValue;
        }

    } else if (question.type === "radio") {
        const selected = document.querySelector(`input[name="${qId}"]:checked`);
        if (!selected && question.required) {
            alert("This question is compulsory.");
            return false;
        }
        answer = selected ? selected.value : "";

    } else if (question.type === "checkbox") {
        const selected = document.querySelectorAll(`input[name="${qId}"]:checked`);
        answer = Array.from(selected).map(cb => cb.value).join(", ");
        if (question.required && !answer) {
            alert("This question is compulsory.");
            return false;
        }

    } else if (question.type === "range") {
        const input = document.getElementById(qId);
        if (input) {
            const value = input.value;
            answer = value;
        }
    }

    answers[qId] = answer;
    console.log("Stored Answers:", answers);
    return true;
}

// buttons will change depending on question progress (submit, next, back etc.)
function updateButtons() {

const atFirstQuestion = currentQuestion === 0;
    const atLastQuestion = currentQuestion === questions.length - 1;
    const allTreesDone = treesLogged === totalTreesToLog - 1;
    const oneTreePlus = treesLogged >= 1;

    // Back button: only show if you're not on the first question
    document.getElementById("backBtn").style.display = atFirstQuestion ? "none" : "block";

    // Next button: show only if you're not on the last question
    document.getElementById("nextBtn").style.display = atLastQuestion ? "none" : "block";

    // Submit button: only if you're on the last question AND all trees are done
    document.getElementById("submitBtn").style.display = (atLastQuestion && allTreesDone) ? "block" : "none";

    // Next Tree button: only if you're on the last question AND there are more trees to log
    document.getElementById("nextTreeBtn").style.display = (atLastQuestion && !allTreesDone) ? "block" : "none";

    // Before you log Submit button: only if you've completed one tree +
    document.getElementById("LogsubmitBtn").style.display = oneTreePlus ? "block" : "none";

}


// logic for what happens at the end of completing a tree with warning not to move onto next tree before physcially being in that location
function nextTree() {

    if (!storeAnswer()) return;
    currentQuestion = 0;
    treesLogged = treesLogged + 1;
    answers = []
    updateButtons();
    showPage("readyToLog");
    alert(`Tree ${treesLogged} submitted successfully.\nPlease make sure you are standing by the next tree before you start collecting data.`); //tree is incremented before we show message because we start at 0

}

// download csv logic to allow validating and not
function downloadCSV({ validate = true } = {}) {

    if (validate && !storeAnswer()) return;
    completeCSV();
}


// donwload csv with timestamp in name
function completeCSV() {

    // create the CSV header row from imprted headers
    const headerRow = headers.join(",");

    // map each array in answers to a row 
    const dataRows = allAnswers.map(row => row.join(","));
    
    // join the header and data rows
    const csvContent = "data:text/csv;charset=utf-8," +
        [headerRow, ...dataRows].join("\n");
    
    //download    
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    
    //generate DDMMYY_HHMM date format for file name
    const now = new Date();
    const pad = (num) => num.toString().padStart(2, "0");
    const day = pad(now.getDate());
    const month = pad(now.getMonth() + 1); // Months are 0-indexed
    const year = now.getFullYear().toString().slice(-2); // Last 2 digits
    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());

    const timestamp = `${day}${month}${year}_${hours}${minutes}`;

    // name the file
    link.setAttribute("download", `oak_tree_data_${timestamp}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Reset questionnaire data
    allAnswers = [];  
    answers = []
    currentQuestion = 0;  
    totalTreesToLog = 0;  
    treesLogged = 0;
    // Return to splash page
    showPage("splash");
}

// logic when user leaves questions 
function cancelSubmission() {
    
    //if we havent logged any trees then cancel everything
    if (treesLogged === 0){
        quitQ();

    //cancel the last tree in the list
    }else{
        allAnswers[treesLogged] = Array(questions.length).fill("")
        currentQuestion = 0;
        answers = []
        showPage("readyToLog");  
    }

}

// reset logic
function quitQ() {

    allAnswers = [];  
    answers = []
    currentQuestion = 0;  
    totalTreesToLog = 0;  
    treesLogged = 0;
    showPage("splash");
}


