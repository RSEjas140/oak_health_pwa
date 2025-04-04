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
    { label: "Woodland compartment name", type: "text" },
    { label: "Sub Compartment", type: "select", options: ["Compartment1", "Compartment2", "Compartment3"] },
    { label: "Tree ID", type: "text" },
    { label: "Tree Species", type: "select", options: ["Oak", "Oak2", "Oak3"] },
    { label: "Health Condition", type: "select", options: ["Healthy", "Diseased", "Dead"] },
    { label: "Social Class", id: "social_class", type: "radio", options: [{ value: 1, text: "1" },{ value: 2, text: "2" },{ value: 3, text: "3" },{ value: 4, text: "4" },{ value: 5, text: "5" }],required: true}
    // Add remaining 16 questions as per spreadsheet
];

let responses = Array(questions.length).fill("");
let currentQuestion = 0;

function startLogging() {
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
    
    input.value = responses[currentQuestion] || "";
    input.oninput = () => responses[currentQuestion] = input.value;
    container.appendChild(input);
    updateButtons();
}

function updateButtons() {
    document.getElementById("backBtn").style.display = currentQuestion > 0 ? "block" : "none";
    document.getElementById("nextBtn").style.display = currentQuestion < questions.length - 1 ? "block" : "none";
    document.getElementById("submitBtn").style.display = currentQuestion === questions.length - 1 ? "block" : "none";
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function downloadCSV() {
    let csvContent = "data:text/csv;charset=utf-8," +
        questions.map((q, i) => `${q.label},${responses[i]}`).join("\n");
    
    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "oak_tree_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}