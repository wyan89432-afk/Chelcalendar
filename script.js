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
function analyzeM2(numbers) {
    const { oddNumbers, evenNumbers } = getOddEvenNumbers(numbers);
    const oddResults = calculateM2MatchesSubset(oddNumbers);
    const evenResults = calculateM2MatchesSubset(evenNumbers);
    
    let html = '<div class="split-tables">';
    html += renderSubTable(numbers, oddResults, 'odd', 'Odd Rows (စုံ row များ)', createM2ColorMap, createM2Bars);
    html += renderSubTable(numbers, evenResults, 'even', 'Even Rows (မ စုံ row များ)', createM2ColorMap, createM2Bars);
    html += '</div>';
    m2Container.innerHTML = html;
}

function calculateM2MatchesSubset(subset) {
    const results = [];
    for (let i = 0; i + 3 < subset.length; i++) {
        const hSum = parseInt(subset[i].value[0]) + parseInt(subset[i+1].value[0]) + parseInt(subset[i+2].value[0]);
        const uSum = parseInt(subset[i+2].value[2]) + parseInt(subset[i+3].value[2]);
        results.push({
            subIndex: i,
            actualRowIndex: subset[i].actualIndex,
            isMatch: (hSum % 10) === (uSum % 10),
            indices: [subset[i].actualIndex, subset[i+1].actualIndex, subset[i+2].actualIndex, subset[i+3].actualIndex]
        });
    }
    return results;
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
function analyzeM3(numbers) {
    const { oddNumbers, evenNumbers } = getOddEvenNumbers(numbers);
    const oddResults = calculateM3MatchesSubset(oddNumbers);
    const evenResults = calculateM3MatchesSubset(evenNumbers);
    
    let html = '<div class="split-tables">';
    html += renderSubTable(numbers, oddResults, 'odd', 'Odd Rows (စုံ row များ)', createM3ColorMap, createM3Bars);
    html += renderSubTable(numbers, evenResults, 'even', 'Even Rows (မ စုံ row များ)', createM3ColorMap, createM3Bars);
    html += '</div>';
    m3Container.innerHTML = html;
}

function calculateM3MatchesSubset(subset) {
    const results = [];
    for (let i = 0; i + 2 < subset.length; i++) {
        const left = (parseInt(subset[i+1].value[1]) + parseInt(subset[i+1].value[2])) % 10;
        const right = (parseInt(subset[i].value[0]) + parseInt(subset[i+1].value[0]) + parseInt(subset[i+2].value[1])) % 10;
        results.push({
            subIndex: i,
            actualRowIndex: subset[i].actualIndex,
            isMatch: left === right,
            indices: [subset[i].actualIndex, subset[i+1].actualIndex, subset[i+2].actualIndex]
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
function analyzeM4(numbers) {
    const { oddNumbers, evenNumbers } = getOddEvenNumbers(numbers);
    const oddResults = calculateM4MatchesSubset(oddNumbers);
    const evenResults = calculateM4MatchesSubset(evenNumbers);
    
    let html = '<div class="split-tables">';
    html += renderSubTable(numbers, oddResults, 'odd', 'Odd Rows (စုံ row များ)', createM4ColorMap, createM4Bars);
    html += renderSubTable(numbers, evenResults, 'even', 'Even Rows (မ စုံ row များ)', createM4ColorMap, createM4Bars);
    html += '</div>';
    m4Container.innerHTML = html;
}

function calculateM4MatchesSubset(subset) {
    const results = [];
    for (let i = 0; i + 4 < subset.length; i++) {
        const sum = (parseInt(subset[i].value[1]) + parseInt(subset[i+1].value[1]) + parseInt(subset[i+2].value[1])) % 10;
        results.push({
            subIndex: i,
            actualRowIndex: subset[i].actualIndex,
            isMatch: sum === parseInt(subset[i+4].value[1]),
            indices: [subset[i].actualIndex, subset[i+1].actualIndex, subset[i+2].actualIndex, subset[i+4].actualIndex]
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
