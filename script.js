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
const m6Container = document.getElementById('m6Container');
const m7Container = document.getElementById('m7Container');

// Event Listeners
analyzeBtn.addEventListener('click', analyze);

// Main analysis function
function analyze() {
    const input = numberInput.value.trim();
    if (!input) {
        m1Container.innerHTML = '<div class="status-message status-warning">အကျေးဇူးပြု၍ ဂဏန်းများထည့်သွင်းပါ။ (Please enter numbers)</div>';
        return;
    }
    
    const numbers = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const validNumbers = [];
    for (let num of numbers) {
        if (/^\d{1,3}$/.test(num)) {
            validNumbers.push(num.padStart(3, '0'));
        } else if (num.length > 0) {
            m1Container.innerHTML = `<div class="status-message status-warning">အမှားအယွင်း: "${num}" သည် ဂဏန်းမဟုတ်ပါ။</div>`;
            return;
        }
    }
    
    if (validNumbers.length < 2) {
        m1Container.innerHTML = '<div class="status-message status-warning">အနည်းဆုံး 2 ခုသည့် ဂဏန်းများ လိုအပ်ပါသည်။</div>';
        return;
    }
    
    currentNumbers = validNumbers;
    analyzeM1(validNumbers);
    analyzeM2(validNumbers);
    analyzeM3(validNumbers);
    analyzeM4(validNumbers);
    analyzeM5(validNumbers);
    analyzeM6(validNumbers);
    analyzeM7(validNumbers);
}

// Utility: Odd/Even split
function getOddEvenNumbers(numbers) {
    const oddNumbers = [];   // Rows 1, 3, 5... (index 0, 2, 4...)
    const evenNumbers = [];  // Rows 2, 4, 6... (index 1, 3, 5...)
    for (let i = 0; i < numbers.length; i++) {
        if (i % 2 === 0) oddNumbers.push({ actualIndex: i, value: numbers[i] });
        else evenNumbers.push({ actualIndex: i, value: numbers[i] });
    }
    return { oddNumbers, evenNumbers };
}

// Utility: Groups
function identifyConsecutiveGroups(checkResults) {
    const groups = [];
    let currentGroup = [];
    for (let i = 0; i < checkResults.length; i++) {
        if (checkResults[i].isMatch) currentGroup.push(i);
        else {
            if (currentGroup.length > 0) { groups.push(currentGroup); currentGroup = []; }
        }
    }
    if (currentGroup.length > 0) groups.push(currentGroup);
    return groups;
}

// ========== M1 LOGIC ==========
function analyzeM1(numbers) {
    const { oddNumbers, evenNumbers } = getOddEvenNumbers(numbers);
    const oddResults = calculateM1MatchesSubset(oddNumbers, numbers);
    const evenResults = calculateM1MatchesSubset(evenNumbers, numbers);
    
    let html = '<div class="split-tables">';
    html += renderSubTable(numbers, oddResults, 'odd', 'Odd Rows (စုံ row များ)', createM1ColorMap, createM1Bars);
    html += renderSubTable(numbers, evenResults, 'even', 'Even Rows (မ စုံ row များ)', createM1ColorMap, createM1Bars);
    html += '</div>';
    m1Container.innerHTML = html;
}

function calculateM1MatchesSubset(subset, allNumbers) {
    const results = [];
    for (let i = 0; i < subset.length; i++) {
        const nIdx = subset[i].actualIndex;
        // Check if Row N+1 and N+2 exist in the full list
        if (nIdx + 2 >= allNumbers.length) break;
        
        const n = allNumbers[nIdx];
        const n1 = allNumbers[nIdx + 1]; // actual Row N+1
        const n2 = allNumbers[nIdx + 2]; // actual Row N+2
        
        // Formula: Row N unit + Row N+1 ten + Row N+1 unit + Row N+2 ten
        const sum = parseInt(n[2]) + parseInt(n1[1]) + parseInt(n1[2]) + parseInt(n2[1]);
        results.push({
            subIndex: i,
            actualRowIndex: nIdx,
            isMatch: (sum % 10) === parseInt(n[0]),
            indices: [nIdx, nIdx + 1, nIdx + 2] // actual row indices
        });
    }
    return results;
}

function createM1ColorMap(results, numbers, colorClasses) {
    const map = new Map();
    results.filter(r => r.isMatch).forEach((r, idx) => {
        const color = colorClasses[idx % colorClasses.length];
        map.set(`${r.indices[0]}-0`, color); map.set(`${r.indices[0]}-2`, color);
        map.set(`${r.indices[1]}-1`, color); map.set(`${r.indices[1]}-2`, color);
        map.set(`${r.indices[2]}-1`, color); // Row N+2 TEN digit (not hundred)
    });
    return map;
}

function createM1Bars(results, numbers, barClasses) {
    const map = new Map();
    results.filter(r => r.isMatch).forEach((r, idx) => {
        const bar = barClasses[idx % barClasses.length];
        const start = r.indices[0], end = r.indices[2];
        for (let i = start; i <= end; i++) {
            if (!map.has(i)) map.set(i, []);
            map.get(i).push({ startRow: start, endRow: end, barClass: bar });
        }
    });
    return map;
}

// ========== M2 LOGIC ==========
// Step of 3: Row 1→(1,2,3 vs 3,4), Row 4→(4,5,6 vs 6,7), Row 7→(7,8,9 vs 9,10)...
// Formula: (Row N hundred + Row N+1 hundred + Row N+2 hundred) % 10 == (Row N+2 unit + Row N+3 unit) % 10
function analyzeM2(numbers) {
    const results = [];
    for (let i = 0; i + 3 < numbers.length; i += 3) {
        const hSum = parseInt(numbers[i][0]) + parseInt(numbers[i+1][0]) + parseInt(numbers[i+2][0]);
        const uSum = parseInt(numbers[i+2][2]) + parseInt(numbers[i+3][2]);
        results.push({
            actualRowIndex: i,
            isMatch: (hSum % 10) === (uSum % 10),
            indices: [i, i+1, i+2, i+3]
        });
    }
    
    let html = '<div class="split-tables single">';
    html += renderSubTable(numbers, results, 'odd', 'M2 Results', createM2ColorMap, createM2Bars);
    html += '</div>';
    m2Container.innerHTML = html;
}

function createM2ColorMap(results, numbers, colorClasses) {
    const map = new Map();
    results.filter(r => r.isMatch).forEach((r, idx) => {
        const color = colorClasses[idx % colorClasses.length];
        map.set(`${r.indices[0]}-0`, color); map.set(`${r.indices[1]}-0`, color);
        map.set(`${r.indices[2]}-0`, color); map.set(`${r.indices[2]}-2`, color);
        map.set(`${r.indices[3]}-2`, color);
    });
    return map;
}

function createM2Bars(results, numbers, barClasses) {
    const map = new Map();
    results.filter(r => r.isMatch).forEach((r, idx) => {
        const bar = barClasses[idx % barClasses.length];
        const start = r.indices[0], end = r.indices[3];
        for (let i = start; i <= end; i++) {
            if (!map.has(i)) map.set(i, []);
            map.get(i).push({ startRow: start, endRow: end, barClass: bar });
        }
    });
    return map;
}

// ========== M3 LOGIC ==========
// Odd scan checks Row 1,3,5,7,9... using actual consecutive rows (N, N+1, N+2)
// Even scan checks Row 2,4,6,8,10... using actual consecutive rows (N, N+1, N+2)
// Formula: (Row N+1 ten + Row N+1 unit) % 10 == (Row N hundred + Row N+1 hundred + Row N+2 ten) % 10
function analyzeM3(numbers) {
    const { oddNumbers, evenNumbers } = getOddEvenNumbers(numbers);
    const oddResults = calculateM3MatchesSubset(oddNumbers, numbers);
    const evenResults = calculateM3MatchesSubset(evenNumbers, numbers);
    
    let html = '<div class="split-tables">';
    html += renderSubTable(numbers, oddResults, 'odd', 'Odd Rows (စုံ row များ)', createM3ColorMap, createM3Bars);
    html += renderSubTable(numbers, evenResults, 'even', 'Even Rows (မ စုံ row များ)', createM3ColorMap, createM3Bars);
    html += '</div>';
    m3Container.innerHTML = html;
}

function calculateM3MatchesSubset(subset, allNumbers) {
    const results = [];
    for (let i = 0; i < subset.length; i++) {
        const nIdx = subset[i].actualIndex;
        // Check if Row N+1 and N+2 exist in the full list
        if (nIdx + 2 >= allNumbers.length) break;
        
        const left = (parseInt(allNumbers[nIdx+1][1]) + parseInt(allNumbers[nIdx+1][2])) % 10;
        const right = (parseInt(allNumbers[nIdx][0]) + parseInt(allNumbers[nIdx+1][0]) + parseInt(allNumbers[nIdx+2][1])) % 10;
        results.push({
            subIndex: i,
            actualRowIndex: nIdx,
            isMatch: left === right,
            indices: [nIdx, nIdx+1, nIdx+2]
        });
    }
    return results;
}

function createM3ColorMap(results, numbers, colorClasses) {
    const map = new Map();
    results.filter(r => r.isMatch).forEach((r, idx) => {
        const color = colorClasses[idx % colorClasses.length];
        map.set(`${r.indices[0]}-0`, color);
        map.set(`${r.indices[1]}-0`, color); map.set(`${r.indices[1]}-1`, color); map.set(`${r.indices[1]}-2`, color);
        map.set(`${r.indices[2]}-1`, color);
    });
    return map;
}

function createM3Bars(results, numbers, barClasses) {
    const map = new Map();
    results.filter(r => r.isMatch).forEach((r, idx) => {
        const bar = barClasses[idx % barClasses.length];
        const start = r.indices[0], end = r.indices[2];
        for (let i = start; i <= end; i++) {
            if (!map.has(i)) map.set(i, []);
            map.get(i).push({ startRow: start, endRow: end, barClass: bar });
        }
    });
    return map;
}

// ========== M4 LOGIC ==========
// Odd scan checks Row 1,3,5,7,9... using actual consecutive rows (N, N+1, N+2 vs N+4)
// Even scan checks Row 2,4,6,8,10... using actual consecutive rows (N, N+1, N+2 vs N+4)
// Formula: (Row N ten + Row N+1 ten + Row N+2 ten) % 10 == Row N+4 ten
function analyzeM4(numbers) {
    const { oddNumbers, evenNumbers } = getOddEvenNumbers(numbers);
    const oddResults = calculateM4MatchesSubset(oddNumbers, numbers);
    const evenResults = calculateM4MatchesSubset(evenNumbers, numbers);
    
    let html = '<div class="split-tables">';
    html += renderSubTable(numbers, oddResults, 'odd', 'Odd Rows (စုံ row များ)', createM4ColorMap, createM4Bars);
    html += renderSubTable(numbers, evenResults, 'even', 'Even Rows (မ စုံ row များ)', createM4ColorMap, createM4Bars);
    html += '</div>';
    m4Container.innerHTML = html;
}

function calculateM4MatchesSubset(subset, allNumbers) {
    const results = [];
    for (let i = 0; i < subset.length; i++) {
        const nIdx = subset[i].actualIndex;
        // Check if Row N+4 exists in the full list
        if (nIdx + 4 >= allNumbers.length) break;
        
        const sum = (parseInt(allNumbers[nIdx][1]) + parseInt(allNumbers[nIdx+1][1]) + parseInt(allNumbers[nIdx+2][1])) % 10;
        results.push({
            subIndex: i,
            actualRowIndex: nIdx,
            isMatch: sum === parseInt(allNumbers[nIdx+4][1]),
            indices: [nIdx, nIdx+1, nIdx+2, nIdx+4]
        });
    }
    return results;
}

function createM4ColorMap(results, numbers, colorClasses) {
    const map = new Map();
    results.filter(r => r.isMatch).forEach((r, idx) => {
        const color = colorClasses[idx % colorClasses.length];
        map.set(`${r.indices[0]}-1`, color); map.set(`${r.indices[1]}-1`, color);
        map.set(`${r.indices[2]}-1`, color); map.set(`${r.indices[3]}-1`, color);
    });
    return map;
}

function createM4Bars(results, numbers, barClasses) {
    const map = new Map();
    results.filter(r => r.isMatch).forEach((r, idx) => {
        const bar = barClasses[idx % barClasses.length];
        const start = r.indices[0], end = r.indices[3];
        for (let i = start; i <= end; i++) {
            if (!map.has(i)) map.set(i, []);
            map.get(i).push({ startRow: start, endRow: end, barClass: bar });
        }
    });
    return map;
}

// ========== M5 LOGIC ==========
function analyzeM5(numbers) {
    // M5: Every 3 rows starting from Row 1, 2, 3
    const results1 = calculateM5Step3(numbers, 0);
    const results2 = calculateM5Step3(numbers, 1);
    const results3 = calculateM5Step3(numbers, 2);
    
    let html = '<div class="split-tables three-columns">';
    html += renderSubTable(numbers, results1, 'odd', 'Group 1 (Row 1, 4, 7...)', createM5ColorMap, createM5Bars);
    html += renderSubTable(numbers, results2, 'even', 'Group 2 (Row 2, 5, 8...)', createM5ColorMap, createM5Bars);
    html += renderSubTable(numbers, results3, 'group3', 'Group 3 (Row 3, 6, 9...)', createM5ColorMap, createM5Bars);
    html += '</div>';
    m5Container.innerHTML = html;
}

function calculateM5Step3(numbers, startIdx) {
    const results = [];
    for (let i = startIdx; i + 2 < numbers.length; i += 3) {
        const sum = (parseInt(numbers[i+1][0]) + parseInt(numbers[i+2][0]) + parseInt(numbers[i+2][1])) % 10;
        results.push({
            actualRowIndex: i,
            isMatch: sum === parseInt(numbers[i][1]),
            indices: [i, i+1, i+2]
        });
    }
    return results;
}

function createM5ColorMap(results, numbers, colorClasses) {
    const map = new Map();
    results.filter(r => r.isMatch).forEach((r, idx) => {
        const color = colorClasses[idx % colorClasses.length];
        map.set(`${r.indices[0]}-1`, color);
        map.set(`${r.indices[1]}-0`, color);
        map.set(`${r.indices[2]}-0`, color); map.set(`${r.indices[2]}-1`, color);
    });
    return map;
}

function createM5Bars(results, numbers, barClasses) {
    const map = new Map();
    results.filter(r => r.isMatch).forEach((r, idx) => {
        const bar = barClasses[idx % barClasses.length];
        const start = r.indices[0], end = r.indices[2];
        for (let i = start; i <= end; i++) {
            if (!map.has(i)) map.set(i, []);
            map.get(i).push({ startRow: start, endRow: end, barClass: bar });
        }
    });
    return map;
}

// ========== M6 LOGIC ==========
// Formula: S = H_N + U_N + H_{N+1}
// If S%10 == Row N+1 ten digit → match
// Odd scan checks Row 1,3,5,7... using actual N+1
// Even scan checks Row 2,4,6,8... using actual N+1
// Highlight: Row N (hundred, unit) + Row N+1 (hundred) grouped, Row N+1 ten circled
function analyzeM6(numbers) {
    const { oddNumbers, evenNumbers } = getOddEvenNumbers(numbers);
    const oddResults = calculateM6MatchesSubset(oddNumbers, numbers);
    const evenResults = calculateM6MatchesSubset(evenNumbers, numbers);
    
    let html = '<div class="split-tables">';
    html += renderSubTable(numbers, oddResults, 'odd', 'Odd Rows (စုံ row များ)', createM6ColorMap, createM6Bars);
    html += renderSubTable(numbers, evenResults, 'even', 'Even Rows (မ စုံ row များ)', createM6ColorMap, createM6Bars);
    html += '</div>';
    m6Container.innerHTML = html;
}

function calculateM6MatchesSubset(subset, allNumbers) {
    const results = [];
    for (let i = 0; i < subset.length; i++) {
        const nIdx = subset[i].actualIndex;
        // Check if Row N+1 exists
        if (nIdx + 1 >= allNumbers.length) break;
        
        // S = H_N + U_N + H_{N+1}
        const s = parseInt(allNumbers[nIdx][0]) + parseInt(allNumbers[nIdx][2]) + parseInt(allNumbers[nIdx+1][0]);
        // Compare S%10 with Row N+1 ten digit
        const sMod10 = s % 10;
        const n1Ten = parseInt(allNumbers[nIdx+1][1]);
        
        results.push({
            subIndex: i,
            actualRowIndex: nIdx,
            isMatch: sMod10 === n1Ten,
            indices: [nIdx, nIdx+1]
        });
    }
    return results;
}

function createM6ColorMap(results, numbers, colorClasses) {
    const map = new Map();
    results.filter(r => r.isMatch).forEach((r, idx) => {
        const color = colorClasses[idx % colorClasses.length];
        // Highlight Row N: hundred (digit 0) and unit (digit 2)
        // Highlight Row N+1: hundred (digit 0)
        map.set(`${r.indices[0]}-0`, color); map.set(`${r.indices[0]}-2`, color);
        map.set(`${r.indices[1]}-0`, color);
    });
    return map;
}

function createM6Bars(results, numbers, barClasses) {
    const map = new Map();
    results.filter(r => r.isMatch).forEach((r, idx) => {
        const bar = barClasses[idx % barClasses.length];
        const start = r.indices[0], end = r.indices[1];
        for (let i = start; i <= end; i++) {
            if (!map.has(i)) map.set(i, []);
            map.get(i).push({ startRow: start, endRow: end, barClass: bar });
        }
    });
    return map;
}

// ========== M7 LOGIC ==========
// Formula: A = Unit(Row n) + Tens(Row n+1)
//          B = Unit(Row n+1) + Unit(Row n+2) + Hundreds(Row n+2)
// If A == B → match
// Step of 3: Group 1 starts Row 1, Group 2 starts Row 4, etc.
// Odd scan: Row 1,3,5,7,9... check Row n, n+1, n+2 (actual)
// Even scan: Row 2,4,6,8... check Row n, n+1, n+2 (actual)
// Highlight: Source = Row n unit + Row n+1 ten (straight arrow)
//            Target = Row n+1 unit + Row n+2 unit + Row n+2 hundred
function analyzeM7(numbers) {
    const { oddNumbers, evenNumbers } = getOddEvenNumbers(numbers);
    const oddResults = calculateM7MatchesSubset(oddNumbers, numbers);
    const evenResults = calculateM7MatchesSubset(evenNumbers, numbers);
    
    let html = '<div class="split-tables">';
    html += renderSubTableM7(numbers, oddResults, 'odd', 'Odd Rows (စုံ row များ)');
    html += renderSubTableM7(numbers, evenResults, 'even', 'Even Rows (မ စုံ row များ)');
    html += '</div>';
    m7Container.innerHTML = html;
}

function calculateM7MatchesSubset(subset, allNumbers) {
    const results = [];
    for (let i = 0; i < subset.length; i++) {
        const nIdx = subset[i].actualIndex;
        // Need Row n, n+1, n+2 (3 consecutive actual rows)
        if (nIdx + 2 >= allNumbers.length) break;
        
        // A = Unit(Row n) + Tens(Row n+1)
        const a = parseInt(allNumbers[nIdx][2]) + parseInt(allNumbers[nIdx+1][1]);
        // B = Unit(Row n+1) + Unit(Row n+2) + Hundreds(Row n+2)
        const b = parseInt(allNumbers[nIdx+1][2]) + parseInt(allNumbers[nIdx+2][2]) + parseInt(allNumbers[nIdx+2][0]);
        
        results.push({
            subIndex: i,
            actualRowIndex: nIdx,
            isMatch: a === b,
            indices: [nIdx, nIdx+1, nIdx+2]
        });
    }
    return results;
}

function renderSubTableM7(numbers, results, cssClass, title) {
    const matches = results.filter(r => r.isMatch);
    
    // Build color map: each match group gets a color
    const colorMap = new Map();
    const barMap = new Map();
    matches.forEach((r, idx) => {
        const color = colorClasses[idx % colorClasses.length];
        const bar = barClasses[idx % barClasses.length];
        // Source: Row n unit (digit 2) + Row n+1 ten (digit 1)
        colorMap.set(`${r.indices[0]}-2`, color); // Row n unit
        colorMap.set(`${r.indices[1]}-1`, color); // Row n+1 ten
        // Target: Row n+1 unit (digit 2) + Row n+2 unit (digit 2) + Row n+2 hundred (digit 0)
        colorMap.set(`${r.indices[1]}-2`, color); // Row n+1 unit
        colorMap.set(`${r.indices[2]}-0`, color); // Row n+2 hundred
        colorMap.set(`${r.indices[2]}-2`, color); // Row n+2 unit
        // Straight arrow from source to target
        const start = r.indices[0], end = r.indices[2];
        for (let i = start; i <= end; i++) {
            if (!barMap.has(i)) barMap.set(i, []);
            barMap.get(i).push({ startRow: start, endRow: end, barClass: bar });
        }
    });
    
    let html = `<div class="sub-table ${cssClass}"><h3 class="sub-table-title">${title}</h3><div class="results-grid">`;
    for (let i = 0; i < numbers.length; i++) {
        const num = numbers[i], bars = barMap.get(i) || [];
        html += `<div class="row-item"><div class="row-number">${i+1}</div><div class="digits-container">`;
        for (let d = 0; d < 3; d++) {
            const color = colorMap.get(`${i}-${d}`) || '';
            html += `<div class="digit-box ${color} ${color ? 'highlighted' : ''}">${num[d]}</div>`;
        }
        bars.forEach(b => {
            const height = (b.endRow - b.startRow + 1) * 65;
            const top = (b.startRow - i) * 65;
            html += `<div class="connector-bar ${b.barClass}" style="height: ${height}px; top: ${top}px;"></div>`;
        });
        html += `</div></div>`;
    }
    html += `</div><div class="status-message status-info">ကိုက်ညီမှုများ: ${matches.length}</div></div>`;
    return html;
}

// ========== RENDER ENGINE ==========
function renderSubTable(numbers, results, cssClass, title, colorFn, barFn) {
    const colorMap = colorFn(results, numbers, colorClasses);
    const barMap = barFn(results, numbers, barClasses);
    const matches = results.filter(r => r.isMatch);
    
    let html = `<div class="sub-table ${cssClass}"><h3 class="sub-table-title">${title}</h3><div class="results-grid">`;
    for (let i = 0; i < numbers.length; i++) {
        const num = numbers[i], bars = barMap.get(i) || [];
        html += `<div class="row-item"><div class="row-number">${i+1}</div><div class="digits-container">`;
        for (let d = 0; d < 3; d++) {
            const color = colorMap.get(`${i}-${d}`) || '';
            html += `<div class="digit-box ${color} ${color ? 'highlighted' : ''}">${num[d]}</div>`;
        }
        bars.forEach(b => {
            const height = (b.endRow - b.startRow + 1) * 65;
            const top = (b.startRow - i) * 65;
            html += `<div class="connector-bar ${b.barClass}" style="height: ${height}px; top: ${top}px;"></div>`;
        });
        html += `</div></div>`;
    }
    html += `</div><div class="status-message status-info">ကိုက်ညီမှုများ: ${matches.length}</div></div>`;
    return html;
}
