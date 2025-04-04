function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show the selected page
    const activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.classList.add('active');
    }
}

let questions = [
    { label: "Woodland compartment name", type: "text" , required: true},
    { label: "Sub Compartment", type: "select", options: ["Compartment1", "Compartment2", "Compartment3"] },
    { label: "Tree ID", type: "text" },
    { label: "Tree Species", type: "select", options: ["Oak", "Oak2", "Oak3"] },
    { label: "Health Condition", type: "select", options: ["Healthy", "Diseased", "Dead"] },
    { label: "Social Class", type: "select", options: ["1","2","3" , "4", "5"], required: true},
    // Add remaining 16 questions as per spreadsheet
];

// extra two for unique ID and positional data
let answers = Array(questions.length + 3).fill("");
let currentQuestion = 0;

function startLogging() {
    
    //create a unique ID
    globalID = crypto.randomUUID();
    answers[answers.length-1] = globalID
    getUserLocation()
    showPage("questionPage");
    loadQuestion();
}

function loadQuestion() {
    let question = questions[currentQuestion];
    document.getElementById("questionTitle").textContent = question.label;
    let container = document.getElementById("questionContainer");
    container.innerHTML = "";

    let input;
    if (question.type === "text" || question.type === "number") {
        input = document.createElement("input");
        input.type = question.type;
    } else if (question.type === "select") {
        input = document.createElement("select");
        question.options.forEach(option => {
            let opt = document.createElement("option");
            opt.value = option;
            opt.textContent = option;
            input.appendChild(opt);
        });
    }
    
    input.classList.add("input-field");
    input.value = answers[currentQuestion] || "";
    input.oninput = () => answers[currentQuestion] = input.value;
    container.appendChild(input);
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
    questions.push({ label: "Long"})
    questions.push({ label: "Lat"})
    questions.push({ label: "ID"})

    let csvContent = "data:text/csv;charset=utf-8," +
        questions.map((q, i) => `${q.label},${answers[i]}`).join("\n");
    
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `oak_tree_data_${answers[answers.length - 1]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Reset questionnaire data
    answers = Array(questions.length).fill("");  
    currentQuestion = 0;  

    // Return to splash page
    showPage("splashPage");
}

function cancelSubmission() {
    currentQuestion = 0; // Reset questionnaire
    answers = Array(questions.length).fill(""); // Clear collected answers
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