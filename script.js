// State management
let logicEnabled = true;
const colorClasses = ['color-red', 'color-blue', 'color-green', 'color-purple', 'color-orange', 'color-cyan', 'color-pink', 'color-yellow'];

// DOM Elements
const numberInput = document.getElementById('numberInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const toggleLogic = document.getElementById('toggleLogic');
const resultsContainer = document.getElementById('resultsContainer');

// Event Listeners
analyzeBtn.addEventListener('click', analyze);
toggleLogic.addEventListener('click', toggleLogicState);

// Toggle logic on/off
function toggleLogicState() {
    logicEnabled = !logicEnabled;
    toggleLogic.classList.toggle('disabled');
    
    if (logicEnabled) {
        toggleLogic.textContent = '👁 အင်္ဂလိပ်ကုဒ်';
    } else {
        toggleLogic.textContent = '🚫 အင်္ဂလိပ်ကုဒ်';
    }
    
    // Re-analyze if there are already results
    if (numberInput.value.trim()) {
        analyze();
    }
}

// Main analysis function
function analyze() {
    const input = numberInput.value.trim();
    
    if (!input) {
        resultsContainer.innerHTML = '<div class="status-message status-warning">အကျေးဇူးပြု၍ ဂဏန်းများထည့်သွင်းပါ။ (Please enter numbers)</div>';
        return;
    }
    
    // Parse input
    const numbers = input.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
    
    // Validate numbers
    const validNumbers = [];
    for (let num of numbers) {
        if (/^\d{3}$/.test(num)) {
            validNumbers.push(num);
        } else if (num.length > 0) {
            resultsContainer.innerHTML = `<div class="status-message status-warning">အမှားအယွင်း: "${num}" သည် 3-ဂဏန်းမဟုတ်ပါ။ (Invalid: "${num}" is not a 3-digit number)</div>`;
            return;
        }
    }
    
    if (validNumbers.length < 2) {
        resultsContainer.innerHTML = '<div class="status-message status-warning">အနည်းဆုံး 2 ခုသည့် ဂဏန်းများ လိုအပ်ပါသည်။ (At least 2 numbers are required)</div>';
        return;
    }
    
    // Calculate matches
    const matches = calculateMatches(validNumbers);
    
    // Identify groups
    const groups = identifyGroups(matches);
    
    // Filter groups (only keep groups with 2+ consecutive matches)
    const validGroups = groups.filter(group => group.length >= 2);
    
    // Create color mapping
    const colorMap = new Map();
    validGroups.forEach((group, index) => {
        const colorClass = colorClasses[index % colorClasses.length];
        group.forEach(rowIndex => {
            colorMap.set(rowIndex, colorClass);
        });
    });
    
    // Render table
    renderTable(validNumbers, matches, colorMap);
    
    // Show summary
    const summaryText = logicEnabled 
        ? `ကိုက်ညီသောအုပ်စုများ: ${validGroups.length} (Matching groups: ${validGroups.length})`
        : 'အင်္ဂလိပ်ကုဒ်ပိတ်ထားသည်။ (Logic disabled)';
    
    resultsContainer.innerHTML += `<div class="status-message status-info">${summaryText}</div>`;
}

// Calculate matches for each row
function calculateMatches(numbers) {
    const matches = [];
    
    for (let i = 0; i < numbers.length; i++) {
        if (i + 2 >= numbers.length) {
            // Not enough rows ahead for calculation
            matches.push(false);
            continue;
        }
        
        const currentNum = numbers[i];
        const nextNum = numbers[i + 1];
        const nextNextNum = numbers[i + 2];
        
        // Extract digits
        const currentUnitDigit = parseInt(currentNum[2]); // Last digit
        const nextTenDigit = parseInt(nextNum[1]); // Middle digit
        const nextUnitDigit = parseInt(nextNum[2]); // Last digit
        const nextNextHundredDigit = parseInt(nextNextNum[0]); // First digit
        
        // Sum all individual digits
        const sum = currentUnitDigit + nextTenDigit + nextUnitDigit + nextNextHundredDigit;
        const sumUnitDigit = sum % 10;
        
        // Get current row's hundred digit
        const currentHundredDigit = parseInt(currentNum[0]);
        
        // Check if match
        const isMatch = sumUnitDigit === currentHundredDigit;
        matches.push(isMatch);
    }
    
    // Remaining rows that don't have enough data ahead
    while (matches.length < numbers.length) {
        matches.push(false);
    }
    
    return matches;
}

// Identify consecutive groups of matches
function identifyGroups(matches) {
    const groups = [];
    let currentGroup = [];
    
    for (let i = 0; i < matches.length; i++) {
        if (matches[i]) {
            currentGroup.push(i);
        } else {
            if (currentGroup.length > 0) {
                groups.push(currentGroup);
                currentGroup = [];
            }
        }
    }
    
    if (currentGroup.length > 0) {
        groups.push(currentGroup);
    }
    
    return groups;
}

// Render results table
function renderTable(numbers, matches, colorMap) {
    let html = '<table class="results-table"><thead><tr><th>Row</th><th>Number</th><th>Match</th></tr></thead><tbody>';
    
    for (let i = 0; i < numbers.length; i++) {
        const isMatch = matches[i];
        const colorClass = logicEnabled && colorMap.has(i) ? colorMap.get(i) : '';
        const matchStatus = isMatch ? '✓ ကိုက်ညီ' : '✗';
        
        html += `<tr ${colorClass ? `class="${colorClass}"` : ''}>
            <td class="row-number">${i + 1}</td>
            <td class="number-cell">${numbers[i]}</td>
            <td>${logicEnabled ? matchStatus : '—'}</td>
        </tr>`;
    }
    
    html += '</tbody></table>';
    resultsContainer.innerHTML = html;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set initial state
    toggleLogic.textContent = '👁 အင်္ဂလိပ်ကုဒ်';
});
