// State management
let currentNumbers = null;

const colorClasses = ['color-red', 'color-blue', 'color-green', 'color-purple', 'color-orange', 'color-cyan', 'color-pink', 'color-yellow', 'color-brown', 'color-teal'];
const barClasses = ['bar-red', 'bar-blue', 'bar-green', 'bar-purple', 'bar-orange', 'bar-cyan', 'bar-pink', 'bar-yellow', 'bar-brown', 'bar-teal'];

// DOM Elements
const numberInput = document.getElementById('numberInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const m1Container = document.getElementById('m1Container');
const m2Container = document.getElementById('m2Container');
const m3Container = document.getElementById('m3Container');
const m4Container = document.getElementById('m4Container');
const m5Container = document.getElementById('m5Container');

// Event Listeners
analyzeBtn.addEventListener('click', analyze);

// Main analysis function
function analyze() {
    const input = numberInput.value.trim();
    
    if (!input) {
        m1Container.innerHTML = '<div class="status-message status-warning">အကျေးဇူးပြု၍ ဂဏန်းများထည့်သွင်းပါ။ (Please enter numbers)</div>';
        m2Container.innerHTML = '';
        return;
    }
    
    // Parse input
    const numbers = input.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
    
    // Validate numbers
    const validNumbers = [];
    for (let num of numbers) {
        if (/^\d{1,3}$/.test(num)) {
            validNumbers.push(num.padStart(3, '0'));
        } else if (num.length > 0) {
            m1Container.innerHTML = `<div class="status-message status-warning">အမှားအယွင်း: "${num}" သည် ဂဏန်းမဟုတ်ပါ။ (Invalid: "${num}" is not a number)</div>`;
            m2Container.innerHTML = '';
            return;
        }
    }
    
    if (validNumbers.length < 2) {
        m1Container.innerHTML = '<div class="status-message status-warning">အနည်းဆုံး 2 ခုသည့် ဂဏန်းများ လိုအပ်ပါသည်။ (At least 2 numbers are required)</div>';
        m2Container.innerHTML = '';
        return;
    }
    
    currentNumbers = validNumbers;
    
    // Calculate M1
    analyzeM1(validNumbers);
    
    // Calculate M2
    analyzeM2(validNumbers);
    
    // Calculate M3
    analyzeM3(validNumbers);
    
    // Calculate M4
    analyzeM4(validNumbers);
    
    // Calculate M5
    analyzeM5(validNumbers);
}

// ========== M1 LOGIC ==========
function analyzeM1(numbers) {
    // Calculate matches using skip-row pattern (Row 2, 4, 6, 8...)
    const checkResults = calculateM1Matches(numbers);
    
    // Identify consecutive groups of matches
    const groups = identifyConsecutiveGroups(checkResults);
    
    // Filter groups (only keep groups with 2+ consecutive matches)
    const validGroups = groups.filter(group => group.length >= 2);
    
    // Create color mapping for digit highlighting
    const digitColorMap = createDigitColorMap(numbers, checkResults, validGroups);
    
    // Create connector bars
    const connectorMap = createConnectorBars(numbers, checkResults, validGroups);
    
    // Render grid
    renderM1Grid(numbers, digitColorMap, connectorMap, validGroups);
}

function calculateM1Matches(numbers) {
    const checkResults = [];
    
    // Check every row starting from Row 1 (index 0)
    for (let i = 0; i + 2 < numbers.length; i++) {
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

function renderM1Grid(numbers, digitColorMap, connectorMap, validGroups) {
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
            const barHeight = rowsSpanned * 65;
            const barTop = (startRow - i) * 65;
            
            html += `<div class="connector-bar ${barClass}" style="height: ${barHeight}px; top: ${barTop}px;"></div>`;
        });
        
        html += `</div></div>`;
    }
    
    html += '</div>';
    m1Container.innerHTML = html;
    
    // Show summary
    const summaryText = `ကိုက်ညီသောအုပ်စုများ: ${validGroups.length} (Matching groups: ${validGroups.length})`;
    m1Container.innerHTML += `<div class="status-message status-info">${summaryText}</div>`;
}

// ========== M2 LOGIC ==========
function analyzeM2(numbers) {
    // Calculate M2 matches: every 3 rows starting from Row 1
    const checkResults = calculateM2Matches(numbers);
    
    // Identify consecutive groups
    const groups = identifyConsecutiveGroups(checkResults);
    
    // Filter groups (only keep groups with 2+ consecutive matches)
    const validGroups = groups.filter(group => group.length >= 2);
    
    // Create color mapping
    const digitColorMap = createM2DigitColorMap(numbers, checkResults, validGroups);
    
    // Create connector bars
    const connectorMap = createM2ConnectorBars(numbers, checkResults, validGroups);
    
    // Render grid
    renderM2Grid(numbers, digitColorMap, connectorMap, validGroups);
}

function calculateM2Matches(numbers) {
    const checkResults = [];
    
    // Check every row
    for (let i = 0; i + 3 < numbers.length; i++) {
        // Hundreds: Row i, i+1, i+2
        const h1 = parseInt(numbers[i][0]);
        const h2 = parseInt(numbers[i + 1][0]);
        const h3 = parseInt(numbers[i + 2][0]);
        const hundredSum = h1 + h2 + h3;
        const hundredUnitDigit = hundredSum % 10;
        
        // Units: Row i+2, i+3
        const u1 = parseInt(numbers[i + 2][2]);
        const u2 = parseInt(numbers[i + 3][2]);
        const unitSum = u1 + u2;
        const unitUnitDigit = unitSum % 10;
        
        // Check if match
        const isMatch = hundredUnitDigit === unitUnitDigit;
        checkResults.push({
            rowIndex: i,
            isMatch: isMatch,
            hundredSum: hundredSum,
            hundredUnitDigit: hundredUnitDigit,
            unitSum: unitSum,
            unitUnitDigit: unitUnitDigit
        });
    }
    
    return checkResults;
}

function createM2DigitColorMap(numbers, checkResults, validGroups) {
    const digitColorMap = new Map();
    
    // Flatten all valid group check indices
    const allValidCheckIndices = new Set();
    validGroups.forEach(group => {
        group.forEach(checkIndex => {
            allValidCheckIndices.add(checkIndex);
        });
    });
    
    // For each valid check, assign it a unique color
    allValidCheckIndices.forEach(checkIndex => {
        const check = checkResults[checkIndex];
        const rowIndex = check.rowIndex;
        
        // Each check gets its own color based on checkIndex
        const colorClass = colorClasses[checkIndex % colorClasses.length];
        
        // Color the hundreds digits: Row i, i+1, i+2 (hundred digit = digit 0)
        digitColorMap.set(`${rowIndex}-0`, colorClass);
        if (rowIndex + 1 < numbers.length) {
            digitColorMap.set(`${rowIndex + 1}-0`, colorClass);
        }
        if (rowIndex + 2 < numbers.length) {
            digitColorMap.set(`${rowIndex + 2}-0`, colorClass);
        }
        
        // Color the units digits: Row i+2, i+3 (unit digit = digit 2)
        if (rowIndex + 2 < numbers.length) {
            digitColorMap.set(`${rowIndex + 2}-2`, colorClass);
        }
        if (rowIndex + 3 < numbers.length) {
            digitColorMap.set(`${rowIndex + 3}-2`, colorClass);
        }
    });
    
    return digitColorMap;
}

function createM2ConnectorBars(numbers, checkResults, validGroups) {
    const connectorMap = new Map();
    
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
        
        // Each check gets its own bar color
        const barClass = barClasses[checkIndex % barClasses.length];
        
        // Connector spans from Row i to Row i+3
        const startRow = rowIndex;
        const endRow = Math.min(rowIndex + 3, numbers.length - 1);
        
        // Store connector info for each row in the range
        for (let r = startRow; r <= endRow; r++) {
            if (!connectorMap.has(r)) {
                connectorMap.set(r, []);
            }
            connectorMap.get(r).push({ startRow, endRow, barClass, checkIndex });
        }
    });
    
    return connectorMap;
}

function renderM2Grid(numbers, digitColorMap, connectorMap, validGroups) {
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
            const barHeight = rowsSpanned * 65;
            const barTop = (startRow - i) * 65;
            
            html += `<div class="connector-bar ${barClass}" style="height: ${barHeight}px; top: ${barTop}px;"></div>`;
        });
        
        html += `</div></div>`;
    }
    
    html += '</div>';
    m2Container.innerHTML = html;
    
    // Show summary
    const summaryText = `ကိုက်ညီသောအုပ်စုများ: ${validGroups.length} (Matching groups: ${validGroups.length})`;
    m2Container.innerHTML += `<div class="status-message status-info">${summaryText}</div>`;
}

// ========== SHARED UTILITIES ==========
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

function createDigitColorMap(numbers, checkResults, validGroups) {
    const digitColorMap = new Map();
    
    const allValidCheckIndices = new Set();
    validGroups.forEach(group => {
        group.forEach(checkIndex => {
            allValidCheckIndices.add(checkIndex);
        });
    });
    
    allValidCheckIndices.forEach(checkIndex => {
        const check = checkResults[checkIndex];
        const rowIndex = check.rowIndex;
        
        const colorClass = colorClasses[checkIndex % colorClasses.length];
        
        digitColorMap.set(`${rowIndex}-2`, colorClass);
        digitColorMap.set(`${rowIndex}-0`, colorClass);
        
        if (rowIndex + 1 < numbers.length) {
            digitColorMap.set(`${rowIndex + 1}-1`, colorClass);
            digitColorMap.set(`${rowIndex + 1}-2`, colorClass);
        }
        
        if (rowIndex + 2 < numbers.length) {
            digitColorMap.set(`${rowIndex + 2}-1`, colorClass);
        }
    });
    
    return digitColorMap;
}

function createConnectorBars(numbers, checkResults, validGroups) {
    const connectorMap = new Map();
    
    const allValidCheckIndices = new Set();
    validGroups.forEach(group => {
        group.forEach(checkIndex => {
            allValidCheckIndices.add(checkIndex);
        });
    });
    
    allValidCheckIndices.forEach(checkIndex => {
        const check = checkResults[checkIndex];
        const rowIndex = check.rowIndex;
        
        const barClass = barClasses[checkIndex % barClasses.length];
        
        const startRow = rowIndex;
        const endRow = Math.min(rowIndex + 2, numbers.length - 1);
        
        for (let r = startRow; r <= endRow; r++) {
            if (!connectorMap.has(r)) {
                connectorMap.set(r, []);
            }
            connectorMap.get(r).push({ startRow, endRow, barClass, checkIndex });
        }
    });
    
    return connectorMap;
}

// ========== M3 LOGIC ==========
function analyzeM3(numbers) {
    // Calculate M3 matches: every 3 rows starting from Row 1
    const checkResults = calculateM3Matches(numbers);
    
    // Identify consecutive groups
    const groups = identifyConsecutiveGroups(checkResults);
    
    // Filter groups (only keep groups with 2+ consecutive matches)
    const validGroups = groups.filter(group => group.length >= 2);
    
    // Create color mapping
    const digitColorMap = createM3DigitColorMap(numbers, checkResults, validGroups);
    
    // Create connector bars
    const connectorMap = createM3ConnectorBars(numbers, checkResults, validGroups);
    
    // Render grid
    renderM3Grid(numbers, digitColorMap, connectorMap, validGroups);
}

function calculateM3Matches(numbers) {
    const checkResults = [];
    
    // Check every row
    // Formula: Row N+1 (ten + unit) sum unit digit = (Row N hundred + Row N+1 hundred + Row N+2 ten) sum unit digit
    for (let i = 0; i + 2 < numbers.length; i++) {
        // Left side: Row N+1 ten digit + unit digit
        const tenDigit = parseInt(numbers[i + 1][1]);
        const unitDigit = parseInt(numbers[i + 1][2]);
        const leftSum = tenDigit + unitDigit;
        const leftUnitDigit = leftSum % 10;
        
        // Right side: Row N hundred + Row N+1 hundred + Row N+2 ten digit
        const h1 = parseInt(numbers[i][0]);
        const h2 = parseInt(numbers[i + 1][0]);
        const t3 = parseInt(numbers[i + 2][1]);
        const rightSum = h1 + h2 + t3;
        const rightUnitDigit = rightSum % 10;
        
        // Check if match
        const isMatch = leftUnitDigit === rightUnitDigit;
        checkResults.push({
            rowIndex: i,
            isMatch: isMatch,
            leftSum: leftSum,
            leftUnitDigit: leftUnitDigit,
            rightSum: rightSum,
            rightUnitDigit: rightUnitDigit
        });
    }
    
    return checkResults;
}

function createM3DigitColorMap(numbers, checkResults, validGroups) {
    const digitColorMap = new Map();
    
    const allValidCheckIndices = new Set();
    validGroups.forEach(group => {
        group.forEach(checkIndex => {
            allValidCheckIndices.add(checkIndex);
        });
    });
    
    allValidCheckIndices.forEach(checkIndex => {
        const check = checkResults[checkIndex];
        const rowIndex = check.rowIndex;
        
        const colorClass = colorClasses[checkIndex % colorClasses.length];
        
        // Left side: Row N+1 ten and unit digits (circled in image)
        if (rowIndex + 1 < numbers.length) {
            digitColorMap.set(`${rowIndex + 1}-1`, colorClass); // ten digit
            digitColorMap.set(`${rowIndex + 1}-2`, colorClass); // unit digit
        }
        
        // Right side: Row N hundred, Row N+1 hundred, Row N+2 ten digit
        digitColorMap.set(`${rowIndex}-0`, colorClass); // Row N hundred
        if (rowIndex + 1 < numbers.length) {
            digitColorMap.set(`${rowIndex + 1}-0`, colorClass); // Row N+1 hundred
        }
        if (rowIndex + 2 < numbers.length) {
            digitColorMap.set(`${rowIndex + 2}-1`, colorClass); // Row N+2 ten digit
        }
    });
    
    return digitColorMap;
}

function createM3ConnectorBars(numbers, checkResults, validGroups) {
    const connectorMap = new Map();
    
    const allValidCheckIndices = new Set();
    validGroups.forEach(group => {
        group.forEach(checkIndex => {
            allValidCheckIndices.add(checkIndex);
        });
    });
    
    allValidCheckIndices.forEach(checkIndex => {
        const check = checkResults[checkIndex];
        const rowIndex = check.rowIndex;
        
        const barClass = barClasses[checkIndex % barClasses.length];
        
        // Connector spans from Row N to Row N+2
        const startRow = rowIndex;
        const endRow = Math.min(rowIndex + 2, numbers.length - 1);
        
        for (let r = startRow; r <= endRow; r++) {
            if (!connectorMap.has(r)) {
                connectorMap.set(r, []);
            }
            connectorMap.get(r).push({ startRow, endRow, barClass, checkIndex });
        }
    });
    
    return connectorMap;
}

function renderM3Grid(numbers, digitColorMap, connectorMap, validGroups) {
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
            const barHeight = rowsSpanned * 65;
            const barTop = (startRow - i) * 65;
            
            html += `<div class="connector-bar ${barClass}" style="height: ${barHeight}px; top: ${barTop}px;"></div>`;
        });
        
        html += `</div></div>`;
    }
    
    html += '</div>';
    m3Container.innerHTML = html;
    
    // Show summary
    const summaryText = `ကိုက်ညီသောအုပ်စုများ: ${validGroups.length} (Matching groups: ${validGroups.length})`;
    m3Container.innerHTML += `<div class="status-message status-info">${summaryText}</div>`;
}

// ========== M4 LOGIC ==========
function analyzeM4(numbers) {
    // Calculate M4 matches: every 5 rows starting from Row 1
    const checkResults = calculateM4Matches(numbers);
    
    // Identify consecutive groups
    const groups = identifyConsecutiveGroups(checkResults);
    
    // Filter groups (only keep groups with 2+ consecutive matches)
    const validGroups = groups.filter(group => group.length >= 2);
    
    // Create color mapping
    const digitColorMap = createM4DigitColorMap(numbers, checkResults, validGroups);
    
    // Create connector bars
    const connectorMap = createM4ConnectorBars(numbers, checkResults, validGroups);
    
    // Render grid
    renderM4Grid(numbers, digitColorMap, connectorMap, validGroups);
}

function calculateM4Matches(numbers) {
    const checkResults = [];
    
    // Check every row
    // Formula: Row N ten + Row N+1 ten + Row N+2 ten -> sum unit digit = Row N+4 ten digit
    for (let i = 0; i + 4 < numbers.length; i++) {
        const t1 = parseInt(numbers[i][1]);     // Row N ten digit
        const t2 = parseInt(numbers[i + 1][1]); // Row N+1 ten digit
        const t3 = parseInt(numbers[i + 2][1]); // Row N+2 ten digit
        const sum = t1 + t2 + t3;
        const sumUnitDigit = sum % 10;
        
        // Target: Row N+4 ten digit
        const targetTenDigit = parseInt(numbers[i + 4][1]);
        
        // Check if match
        const isMatch = sumUnitDigit === targetTenDigit;
        checkResults.push({
            rowIndex: i,
            isMatch: isMatch,
            sum: sum,
            sumUnitDigit: sumUnitDigit,
            targetTenDigit: targetTenDigit
        });
    }
    
    return checkResults;
}

function createM4DigitColorMap(numbers, checkResults, validGroups) {
    const digitColorMap = new Map();
    
    const allValidCheckIndices = new Set();
    validGroups.forEach(group => {
        group.forEach(checkIndex => {
            allValidCheckIndices.add(checkIndex);
        });
    });
    
    allValidCheckIndices.forEach(checkIndex => {
        const check = checkResults[checkIndex];
        const rowIndex = check.rowIndex;
        
        const colorClass = colorClasses[checkIndex % colorClasses.length];
        
        // Color the ten digits of Row N, N+1, N+2 (digit index 1)
        digitColorMap.set(`${rowIndex}-1`, colorClass);
        if (rowIndex + 1 < numbers.length) {
            digitColorMap.set(`${rowIndex + 1}-1`, colorClass);
        }
        if (rowIndex + 2 < numbers.length) {
            digitColorMap.set(`${rowIndex + 2}-1`, colorClass);
        }
        
        // Color the ten digit of Row N+4 (the target)
        if (rowIndex + 4 < numbers.length) {
            digitColorMap.set(`${rowIndex + 4}-1`, colorClass);
        }
    });
    
    return digitColorMap;
}

function createM4ConnectorBars(numbers, checkResults, validGroups) {
    const connectorMap = new Map();
    
    const allValidCheckIndices = new Set();
    validGroups.forEach(group => {
        group.forEach(checkIndex => {
            allValidCheckIndices.add(checkIndex);
        });
    });
    
    allValidCheckIndices.forEach(checkIndex => {
        const check = checkResults[checkIndex];
        const rowIndex = check.rowIndex;
        
        const barClass = barClasses[checkIndex % barClasses.length];
        
        // Connector spans from Row N to Row N+4
        const startRow = rowIndex;
        const endRow = Math.min(rowIndex + 4, numbers.length - 1);
        
        for (let r = startRow; r <= endRow; r++) {
            if (!connectorMap.has(r)) {
                connectorMap.set(r, []);
            }
            connectorMap.get(r).push({ startRow, endRow, barClass, checkIndex });
        }
    });
    
    return connectorMap;
}

function renderM4Grid(numbers, digitColorMap, connectorMap, validGroups) {
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
            const barHeight = rowsSpanned * 65;
            const barTop = (startRow - i) * 65;
            
            html += `<div class="connector-bar ${barClass}" style="height: ${barHeight}px; top: ${barTop}px;"></div>`;
        });
        
        html += `</div></div>`;
    }
    
    html += '</div>';
    m4Container.innerHTML = html;
    
    // Show summary
    const summaryText = `ကိုက်ညီသောအုပ်စုများ: ${validGroups.length} (Matching groups: ${validGroups.length})`;
    m4Container.innerHTML += `<div class="status-message status-info">${summaryText}</div>`;
}

// ========== M5 LOGIC ==========
function analyzeM5(numbers) {
    // Calculate M5 matches: every 3 rows starting from Row 1
    const checkResults = calculateM5Matches(numbers);
    
    // Identify consecutive groups
    const groups = identifyConsecutiveGroups(checkResults);
    
    // Filter groups (only keep groups with 2+ consecutive matches)
    const validGroups = groups.filter(group => group.length >= 2);
    
    // Create color mapping
    const digitColorMap = createM5DigitColorMap(numbers, checkResults, validGroups);
    
    // Create connector bars
    const connectorMap = createM5ConnectorBars(numbers, checkResults, validGroups);
    
    // Render grid
    renderM5Grid(numbers, digitColorMap, connectorMap, validGroups);
}

function calculateM5Matches(numbers) {
    const checkResults = [];
    
    // Check every row
    // Formula: Row N ten digit = (Row N+1 hundred + Row N+2 hundred + Row N+2 ten) sum unit digit
    for (let i = 0; i + 2 < numbers.length; i++) {
        // Left side: Row N ten digit
        const targetTenDigit = parseInt(numbers[i][1]);
        
        // Right side: Row N+1 hundred + Row N+2 hundred + Row N+2 ten
        const h1 = parseInt(numbers[i + 1][0]); // Row N+1 hundred
        const h2 = parseInt(numbers[i + 2][0]); // Row N+2 hundred
        const t2 = parseInt(numbers[i + 2][1]); // Row N+2 ten
        const rightSum = h1 + h2 + t2;
        const rightUnitDigit = rightSum % 10;
        
        // Check if match
        const isMatch = targetTenDigit === rightUnitDigit;
        checkResults.push({
            rowIndex: i,
            isMatch: isMatch,
            targetTenDigit: targetTenDigit,
            rightSum: rightSum,
            rightUnitDigit: rightUnitDigit
        });
    }
    
    return checkResults;
}

function createM5DigitColorMap(numbers, checkResults, validGroups) {
    const digitColorMap = new Map();
    
    const allValidCheckIndices = new Set();
    validGroups.forEach(group => {
        group.forEach(checkIndex => {
            allValidCheckIndices.add(checkIndex);
        });
    });
    
    allValidCheckIndices.forEach(checkIndex => {
        const check = checkResults[checkIndex];
        const rowIndex = check.rowIndex;
        
        const colorClass = colorClasses[checkIndex % colorClasses.length];
        
        // Color Row N ten digit (the target - circled in pink)
        digitColorMap.set(`${rowIndex}-1`, colorClass);
        
        // Color Row N+1 hundred digit
        if (rowIndex + 1 < numbers.length) {
            digitColorMap.set(`${rowIndex + 1}-0`, colorClass);
        }
        
        // Color Row N+2 hundred and ten digits
        if (rowIndex + 2 < numbers.length) {
            digitColorMap.set(`${rowIndex + 2}-0`, colorClass);
            digitColorMap.set(`${rowIndex + 2}-1`, colorClass);
        }
    });
    
    return digitColorMap;
}

function createM5ConnectorBars(numbers, checkResults, validGroups) {
    const connectorMap = new Map();
    
    const allValidCheckIndices = new Set();
    validGroups.forEach(group => {
        group.forEach(checkIndex => {
            allValidCheckIndices.add(checkIndex);
        });
    });
    
    allValidCheckIndices.forEach(checkIndex => {
        const check = checkResults[checkIndex];
        const rowIndex = check.rowIndex;
        
        const barClass = barClasses[checkIndex % barClasses.length];
        
        // Connector spans from Row N to Row N+2
        const startRow = rowIndex;
        const endRow = Math.min(rowIndex + 2, numbers.length - 1);
        
        for (let r = startRow; r <= endRow; r++) {
            if (!connectorMap.has(r)) {
                connectorMap.set(r, []);
            }
            connectorMap.get(r).push({ startRow, endRow, barClass, checkIndex });
        }
    });
    
    return connectorMap;
}

function renderM5Grid(numbers, digitColorMap, connectorMap, validGroups) {
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
            const barHeight = rowsSpanned * 65;
            const barTop = (startRow - i) * 65;
            
            html += `<div class="connector-bar ${barClass}" style="height: ${barHeight}px; top: ${barTop}px;"></div>`;
        });
        
        html += `</div></div>`;
    }
    
    html += '</div>';
    m5Container.innerHTML = html;
    
    // Show summary
    const summaryText = `ကိုက်ညီသောအုပ်စုများ: ${validGroups.length} (Matching groups: ${validGroups.length})`;
    m5Container.innerHTML += `<div class="status-message status-info">${summaryText}</div>`;
}
