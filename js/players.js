// Path to the JSON file (adjust the path as needed)
const jsonFilePath = '../players.json'; // Replace with the actual path to your JSON file

// Function to fetch and populate the table with data from the JSON file
function fetchAndPopulateTable(jsonPath) {
    fetch(jsonPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.statusText}`);
            }
            return response.json();
        })
        .then(players => {
            populateTable(players);
        })
        .catch(error => {
            console.error('Error fetching or parsing the JSON file:', error);
        });
}

// Function to map character names to icon paths
function getIconPath(characterName) {
    return `../icons/Icons/Main SVGs/${characterName}.svg`; // Adjust path if needed
}

// Function to create a table row for a player
function createTableRow(player) {
    // Create a new table row
    const row = document.createElement('tr');

    // Player name column
    const nameCell = document.createElement('th');
    nameCell.scope = 'row';
    nameCell.textContent = player.Name;
    row.appendChild(nameCell);

    // Character icons column
    const charactersCell = document.createElement('td');
    player.Characters.forEach(character => {
        const icon = document.createElement('img');
        icon.src = getIconPath(character.toLowerCase()); // Convert character name to lowercase for file naming
        icon.alt = character;
        icon.style.width = '24px';
        icon.style.height = '24px';
        charactersCell.appendChild(icon);
    });
    row.appendChild(charactersCell);

    // XP column
    const xpCell = document.createElement('td');
    const xpText = document.createElement('b');
    xpText.textContent = player.XP;
    if(player.XP.toLowerCase() === 'imensa'){
        xpText.style.color = 'red';
    }
    if(player.XP.toLowerCase() === 'muita'){
        xpText.style.color = 'orange';
    }
    if(player.XP.toLowerCase() === 'alguma'){
        xpText.style.color = '#ff9933';
    }
    xpCell.appendChild(xpText);
    row.appendChild(xpCell);

    // Win/Loss ratio column
    const winRateCell = document.createElement('td');
    winRateCell.textContent = player.WinRate;
    row.appendChild(winRateCell);

    return row;
}

// Function to populate the table with players
function populateTable(players) {
    const tableBody = document.querySelector('table tbody'); // Adjust selector to target your table body
    players.forEach(player => {
        const row = createTableRow(player);
        tableBody.appendChild(row);
    });
}

// Fetch and populate the table with data from the JSON file
fetchAndPopulateTable(jsonFilePath);