let treeData = {};
let step = 0;

const questions = [
    { key: 'height', label: 'What is the tree height (m)?', type: 'number' },
    { key: 'diameter', label: 'What is the trunk diameter (cm)?', type: 'number' },
    { key: 'notes', label: 'Any additional notes?', type: 'text' }
];

document.getElementById('startBtn').addEventListener('click', () => {
    step = 0;
    showQuestion();
});

function showQuestion() {
    const app = document.getElementById('app');
    const q = questions[step];

    app.innerHTML = `
        <form id="questionForm">
            <label>${q.label}</label><br>
            <input type="${q.type}" name="answer" required><br>
            <button type="submit">Next</button>
        </form>
    `;

    document.getElementById('questionForm').onsubmit = (e) => {
        e.preventDefault();
        treeData[q.key] = e.target.answer.value;

        step++;
        if (step < questions.length) {
            showQuestion();
        } else {
            finalizeEntry();
        }
    };
}

function finalizeEntry() {
    navigator.geolocation.getCurrentPosition((pos) => {
        treeData.latitude = pos.coords.latitude;
        treeData.longitude = pos.coords.longitude;
        treeData.timestamp = new Date().toISOString();

        // Save to local storage
        const allData = JSON.parse(localStorage.getItem('treeData') || '[]');
        allData.push(treeData);
        localStorage.setItem('treeData', JSON.stringify(allData));

        document.getElementById('app').innerHTML = `
            <p>✅ Tree logged successfully!</p>
            <button onclick="location.reload()">Log another</button>
        `;

        document.getElementById('exportBtn').style.display = 'block';
    });
}

// CSV Export
document.getElementById('exportBtn').addEventListener('click', () => {
    const data = JSON.parse(localStorage.getItem('treeData')) || [];
    if (data.length === 0) return alert('No data to export.');

    const csv = [
        ['Tree ID', 'Latitude', 'Longitude', 'Height', 'Diameter', 'Notes', 'Timestamp'],
        ...data.map((d, i) => [i + 1, d.latitude, d.longitude, d.height, d.diameter, d.notes, d.timestamp])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'tree_data.csv';
    link.click();
});