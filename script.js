// State management
let logicEnabled = true;
const colorClasses = ['color-red', 'color-blue', 'color-green', 'color-purple', 'color-orange', 'color-cyan', 'color-pink', 'color-yellow'];
const barClasses = ['bar-red', 'bar-blue', 'bar-green', 'bar-purple', 'bar-orange', 'bar-cyan', 'bar-pink', 'bar-yellow'];

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
    
    // Create color mapping for digit highlighting
    const digitColorMap = createDigitColorMap(validNumbers, matches, validGroups);
    
    // Render grid
    renderGrid(validNumbers, matches, digitColorMap, validGroups);
    
    // Show summary
    const summaryText = logicEnabled 
        ? `ကိုက်ညီသောအုပ်စုများ: ${validGroups.length} (Matching groups: ${validGroups.length})`
        : 'အင်္ဂလိပ်ကုဒ်ပိတ်ထားသည်။ (Logic disabled)';
    
    resultsContainer.innerHTML += `<div class="status-message status-info">${summaryText}</div>`;
}

// Calculate matches for each row using CORRECTED formula
// For Row N: unit digit + Row(N+1) ten & unit digits + Row(N+2) TEN digit
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
        
        // Extract digits according to CORRECTED formula
        const currentUnitDigit = parseInt(currentNum[2]); // Row N: unit digit (position 2)
        const nextTenDigit = parseInt(nextNum[1]); // Row (N+1): ten digit (position 1)
        const nextUnitDigit = parseInt(nextNum[2]); // Row (N+1): unit digit (position 2)
        const nextNextTenDigit = parseInt(nextNextNum[1]); // Row (N+2): TEN digit (position 1) - CORRECTED!
        
        // Sum all individual digits
        const sum = currentUnitDigit + nextTenDigit + nextUnitDigit + nextNextTenDigit;
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

// Create a map of which digits should be colored
function createDigitColorMap(numbers, matches, validGroups) {
    const digitColorMap = new Map(); // Key: "rowIndex-digitIndex", Value: colorClass
    
    validGroups.forEach((group, groupIndex) => {
        const colorClass = logicEnabled ? colorClasses[groupIndex % colorClasses.length] : '';
        
        group.forEach(rowIndex => {
            if (!logicEnabled) return;
            
            // For each matching row, color the specific digits involved in the formula
            // Row N's unit digit (digit 2)
            digitColorMap.set(`${rowIndex}-2`, colorClass);
            
            // Row N's hundred digit (digit 0) - this is the one being checked
            digitColorMap.set(`${rowIndex}-0`, colorClass);
            
            // Row (N+1)'s ten digit (digit 1) and unit digit (digit 2)
            if (rowIndex + 1 < numbers.length) {
                digitColorMap.set(`${rowIndex + 1}-1`, colorClass);
                digitColorMap.set(`${rowIndex + 1}-2`, colorClass);
            }
            
            // Row (N+2)'s TEN digit (digit 1) - CORRECTED!
            if (rowIndex + 2 < numbers.length) {
                digitColorMap.set(`${rowIndex + 2}-1`, colorClass);
            }
        });
    });
    
    return digitColorMap;
}

// Create connector bars for visual linking
function createConnectorBars(numbers, matches, validGroups) {
    const connectorMap = new Map(); // Key: rowIndex, Value: array of connector info
    
    validGroups.forEach((group, groupIndex) => {
        const barClass = logicEnabled ? barClasses[groupIndex % barClasses.length] : '';
        
        group.forEach(rowIndex => {
            if (!logicEnabled) return;
            
            // Calculate the span of the connector bar
            // It should connect from Row N to Row (N+2)
            const startRow = rowIndex;
            const endRow = Math.min(rowIndex + 2, numbers.length - 1);
            
            // Store connector info for each row in the range
            for (let r = startRow; r <= endRow; r++) {
                if (!connectorMap.has(r)) {
                    connectorMap.set(r, []);
                }
                connectorMap.get(r).push({ startRow, endRow, barClass, groupIndex });
            }
        });
    });
    
    return connectorMap;
}

// Render results grid
function renderGrid(numbers, matches, digitColorMap, validGroups) {
    const connectorMap = createConnectorBars(numbers, matches, validGroups);
    
    let html = '<div class="results-grid">';
    
    for (let i = 0; i < numbers.length; i++) {
        const num = numbers[i];
        const connectors = connectorMap.get(i) || [];
        
        html += `<div class="row-item">
            <div class="row-number">${i + 1}</div>
            <div class="digits-container">`;
        
        // Add digits
        for (let digitIndex = 0; digitIndex < 3; digitIndex++) {
            const digit = num[digitIndex];
            const colorKey = `${i}-${digitIndex}`;
            const colorClass = digitColorMap.get(colorKey) || '';
            const highlightClass = colorClass ? 'highlighted' : '';
            
            html += `<div class="digit-box ${colorClass} ${highlightClass}">${digit}</div>`;
        }
        
        // Add connector bars
        connectors.forEach((connector, idx) => {
            const { startRow, endRow, barClass } = connector;
            const rowsSpanned = endRow - startRow + 1;
            const barHeight = rowsSpanned * 65; // Approximate height per row
            const barTop = (startRow - i) * 65;
            
            html += `<div class="connector-bar ${barClass}" style="height: ${barHeight}px; top: ${barTop}px;"></div>`;
        });
        
        html += `</div></div>`;
    }
    
    html += '</div>';
    resultsContainer.innerHTML = html;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set initial state
    toggleLogic.textContent = '👁 အင်္ဂလိပ်ကုဒ်';
});
