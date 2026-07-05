// Modular Logic System
// Each logic can be toggled on/off independently
const logics = {
    m1: {
        id: 'm1',
        name: 'M1',
        label: 'အင်္ဂလိပ်ကုဒ်',
        enabled: true,
        calculate: calculateM1Matches,
        identifyGroups: identifyConsecutiveGroups
    }
    // Future logics (M2, M3, etc.) can be added here
};

// Track which logics are active
const activeLogics = new Set(['m1']);

const colorClasses = ['color-red', 'color-blue', 'color-green', 'color-purple', 'color-orange', 'color-cyan', 'color-pink', 'color-yellow', 'color-brown', 'color-teal'];
const barClasses = ['bar-red', 'bar-blue', 'bar-green', 'bar-purple', 'bar-orange', 'bar-cyan', 'bar-pink', 'bar-yellow', 'bar-brown', 'bar-teal'];

// DOM Elements
const numberInput = document.getElementById('numberInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const logicTogglesContainer = document.getElementById('logicToggles');
const resultsContainer = document.getElementById('resultsContainer');

// Event Listeners
analyzeBtn.addEventListener('click', analyze);

// Initialize logic toggles on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeLogicToggles();
});

// Initialize the logic toggle buttons
function initializeLogicToggles() {
    logicTogglesContainer.innerHTML = '';
    
    Object.values(logics).forEach(logic => {
        const btn = document.createElement('button');
        btn.className = `logic-toggle-btn ${activeLogics.has(logic.id) ? 'active' : 'inactive'}`;
        btn.dataset.logicId = logic.id;
        btn.innerHTML = `<span class="eye-icon">👁</span><span class="logic-name">${logic.name}</span>`;
        btn.title = logic.label;
        
        btn.addEventListener('click', () => toggleLogic(logic.id, btn));
        
        logicTogglesContainer.appendChild(btn);
    });
}

// Toggle a logic on/off
function toggleLogic(logicId, btn) {
    if (activeLogics.has(logicId)) {
        activeLogics.delete(logicId);
        btn.classList.remove('active');
        btn.classList.add('inactive');
    } else {
        activeLogics.add(logicId);
        btn.classList.remove('inactive');
        btn.classList.add('active');
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
    
    // Collect results from all active logics
    const allLogicResults = {};
    const digitColorMap = new Map();
    
    activeLogics.forEach(logicId => {
        const logic = logics[logicId];
        const checkResults = logic.calculate(validNumbers);
        const groups = logic.identifyGroups(checkResults);
        const validGroups = groups.filter(group => group.length >= 2);
        
        allLogicResults[logicId] = {
            checkResults,
            groups,
            validGroups
        };
        
        // Create color mapping for this logic
        createDigitColorMapForLogic(validNumbers, checkResults, validGroups, digitColorMap, logicId);
    });
    
    // Render grid with all active logics
    renderGrid(validNumbers, allLogicResults, digitColorMap);
    
    // Show summary
    const summaries = [];
    activeLogics.forEach(logicId => {
        const logic = logics[logicId];
        const validGroups = allLogicResults[logicId].validGroups;
        summaries.push(`${logic.name}: ${validGroups.length} group(s)`);
    });
    
    const summaryText = summaries.length > 0 
        ? summaries.join(' | ')
        : 'No active logics';
    
    resultsContainer.innerHTML += `<div class="status-message status-info">${summaryText}</div>`;
}

// M1 Logic: Check every 2 rows (Row 2, 4, 6, 8...)
function calculateM1Matches(numbers) {
    const checkResults = [];
    
    // Start from Row 2 (index 1) and check every 2 rows
    for (let i = 1; i + 2 < numbers.length; i += 2) {
        const currentNum = numbers[i];
        const nextNum = numbers[i + 1];
        const nextNextNum = numbers[i + 2];
        
        // Extract digits according to formula
        const currentUnitDigit = parseInt(currentNum[2]); // Row N: unit digit
        const nextTenDigit = parseInt(nextNum[1]); // Row (N+1): ten digit
        const nextUnitDigit = parseInt(nextNum[2]); // Row (N+1): unit digit
        const nextNextTenDigit = parseInt(nextNextNum[1]); // Row (N+2): TEN digit
        
        // Sum all individual digits
        const sum = currentUnitDigit + nextTenDigit + nextUnitDigit + nextNextTenDigit;
        const sumUnitDigit = sum % 10;
        
        // Get current row's hundred digit
        const currentHundredDigit = parseInt(currentNum[0]);
        
        // Check if match
        const isMatch = sumUnitDigit === currentHundredDigit;
        checkResults.push({
            rowIndex: i,
            isMatch: isMatch,
            sum: sum,
            sumUnitDigit: sumUnitDigit,
            expectedDigit: currentHundredDigit
        });
    }
    
    return checkResults;
}

// Identify consecutive groups of matching checks
function identifyConsecutiveGroups(checkResults) {
    const groups = [];
    let currentGroup = [];
    
    for (let i = 0; i < checkResults.length; i++) {
        if (checkResults[i].isMatch) {
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

// Create color mapping for a specific logic
function createDigitColorMapForLogic(numbers, checkResults, validGroups, digitColorMap, logicId) {
    // Flatten all valid group check indices and assign colors based on check index
    const allValidCheckIndices = new Set();
    validGroups.forEach(group => {
        group.forEach(checkIndex => {
            allValidCheckIndices.add(checkIndex);
        });
    });
    
    // For each valid check, assign it a unique color based on its index
    allValidCheckIndices.forEach(checkIndex => {
        const check = checkResults[checkIndex];
        const rowIndex = check.rowIndex;
        
        // Each check gets its own color based on checkIndex
        const colorClass = colorClasses[checkIndex % colorClasses.length];
        
        // For each matching check, color the specific digits involved in the formula
        // Row N's unit digit (digit 2)
        digitColorMap.set(`${rowIndex}-2`, colorClass);
        
        // Row N's hundred digit (digit 0)
        digitColorMap.set(`${rowIndex}-0`, colorClass);
        
        // Row (N+1)'s ten digit (digit 1) and unit digit (digit 2)
        if (rowIndex + 1 < numbers.length) {
            digitColorMap.set(`${rowIndex + 1}-1`, colorClass);
            digitColorMap.set(`${rowIndex + 1}-2`, colorClass);
        }
        
        // Row (N+2)'s TEN digit (digit 1)
        if (rowIndex + 2 < numbers.length) {
            digitColorMap.set(`${rowIndex + 2}-1`, colorClass);
        }
    });
}

// Create connector bars for visual linking
function createConnectorBars(numbers, allLogicResults) {
    const connectorMap = new Map(); // Key: rowIndex, Value: array of connector info
    
    activeLogics.forEach(logicId => {
        const { checkResults, validGroups } = allLogicResults[logicId];
        
        // Flatten all valid group check indices
        const allValidCheckIndices = new Set();
        validGroups.forEach(group => {
            group.forEach(checkIndex => {
                allValidCheckIndices.add(checkIndex);
            });
        });
        
        // For each valid check, create its connector bar
        allValidCheckIndices.forEach(checkIndex => {
            const check = checkResults[checkIndex];
            const rowIndex = check.rowIndex;
            
            // Each check gets its own bar color based on checkIndex
            const barClass = barClasses[checkIndex % barClasses.length];
            
            // Calculate the span of the connector bar
            const startRow = rowIndex;
            const endRow = Math.min(rowIndex + 2, numbers.length - 1);
            
            // Store connector info for each row in the range
            for (let r = startRow; r <= endRow; r++) {
                if (!connectorMap.has(r)) {
                    connectorMap.set(r, []);
                }
                connectorMap.get(r).push({ startRow, endRow, barClass, checkIndex });
            }
        });
    });
    
    return connectorMap;
}

// Render results grid
function renderGrid(numbers, allLogicResults, digitColorMap) {
    const connectorMap = createConnectorBars(numbers, allLogicResults);
    
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
