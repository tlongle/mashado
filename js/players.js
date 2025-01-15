const jsonFilePath = '../players.json';
const xpLevels = {'nenhuma': 0,'pouca': 1,'alguma': 2,'muita': 3,'imensa': 4,};

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
            addSorting(players);
        })
        .catch(error => {
            console.error('Error fetching or parsing the JSON file:', error);
        });
}

// Function to map character names to icon paths
function getIconPath(characterName) {
    return `../icons/Icons/Main SVGs/${characterName}.svg`; // Adjust path if needed
}

// criar uma row por player
function createTableRow(player) {
    const row = document.createElement('tr');
    const nameCell = document.createElement('th');
    nameCell.scope = 'row';
    nameCell.textContent = player.Name;
    row.appendChild(nameCell);
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
    const xpCell = document.createElement('td');
    const xpText = document.createElement('b');
    xpText.textContent = player.XP;
    if (player.XP.toLowerCase() === 'imensa') {
        xpText.style.color = 'green';
    }
    if (player.XP.toLowerCase() === 'muita') {
        xpText.style.color = 'orange';
    }
    if (player.XP.toLowerCase() === 'alguma') {
        xpText.style.color = '#ff9933';
    }
    if (player.XP.toLowerCase() === 'pouca') {
        xpText.style.color = 'red';
    }
    if (player.XP.toLowerCase() === 'nenhuma') {
        xpText.style.color = 'grey';
    }
    xpCell.appendChild(xpText);
    row.appendChild(xpCell);
    const winRateCell = document.createElement('td');
    winRateCell.textContent = player.WinRate;
    row.appendChild(winRateCell);
    return row;
}

function populateTable(players) {
    const tableBody = document.querySelector('table tbody'); // Adjust selector to target your table body
    tableBody.innerHTML = ''; // Clear previous rows
    players.forEach(player => {
        const row = createTableRow(player);
        tableBody.appendChild(row);
    });
}

function addSorting(players) {
    const headers = document.querySelectorAll('table thead th'); // Get all headers

    headers.forEach((header, index) => {
        header.addEventListener('click', () => {
            const column = header.textContent.trim().toLowerCase();
            const currentOrder = header.dataset.order || 'asc';

            // Determine sorting logic
            if (column === 'xp') {
                players.sort((a, b) => {
                    const xpA = xpLevels[a.XP.toLowerCase()];
                    const xpB = xpLevels[b.XP.toLowerCase()];
                    return currentOrder === 'asc' ? xpA - xpB : xpB - xpA;
                });
            } else if (column === 'w/l ratio') {
                players.sort((a, b) => {
                    const winA = parseFloat(a.WinRate);
                    const winB = parseFloat(b.WinRate);
                    return currentOrder === 'asc' ? winA - winB : winB - winA;
                });
            } else {
                players.sort((a, b) => {
                    const valueA = a.Name.toLowerCase();
                    const valueB = b.Name.toLowerCase();
                    return currentOrder === 'asc'
                        ? valueA.localeCompare(valueB)
                        : valueB.localeCompare(valueA);
                });
            }

            // Toggle sorting order
            header.dataset.order = currentOrder === 'asc' ? 'desc' : 'asc';

            // Re-populate table
            populateTable(players);
        });
    });
}

// Fetch and populate the table with data from the JSON file
fetchAndPopulateTable(jsonFilePath);