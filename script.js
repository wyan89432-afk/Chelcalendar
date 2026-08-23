// State management
let currentNumbers = null;

const colorClasses = ['color-red', 'color-blue', 'color-green', 'color-purple', 'color-orange', 'color-cyan', 'color-pink', 'color-yellow', 'color-brown', 'color-teal'];
const barClasses = ['bar-red', 'bar-blue', 'bar-green', 'bar-purple', 'bar-orange', 'bar-cyan', 'bar-pink', 'bar-yellow', 'bar-brown', 'bar-teal'];
const colorHexMap = {
    'red': '#cc0000', 'blue': '#0033cc', 'green': '#009933',
    'purple': '#aa00aa', 'orange': '#cc6600', 'cyan': '#009999',
    'pink': '#cc0077', 'yellow': '#ccaa00', 'brown': '#654321', 'teal': '#004d4d'
};

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
const m8Container = document.getElementById('m8Container');
const m9Container = document.getElementById('m9Container');

// Event Listeners
analyzeBtn.addEventListener('click', analyze);

// Main analysis function
function analyze() {
    const input = numberInput.value.trim();
    if (!input) {
        m1Container.innerHTML = '<div class="status-message status-warning">အကျေးဇူးပြု၍ ဂဏန်းများထည့်သွင်းပါ။</div>';
        return;
    }
    
    const numbers = input.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);
    const validNumbers = [];
    for (let rawLine of numbers) {
        // Accept 706, spaced rows such as 7 0 6, and image-style labels
        // such as Row 1: 7 0 6.
        const rowLabelRemoved = rawLine
            .replace(/^row\s*\d+\s*[:.)-]?\s*/i, '')
            .replace(/^\d{1,2}\s*[:.)-]\s*/, '');
        const num = rowLabelRemoved.replace(/[\s,]+/g, '');
        if (/^\d{1,3}$/.test(num)) {
            validNumbers.push(num.padStart(3, '0'));
        } else if (rawLine.length > 0) {
            m1Container.innerHTML = `<div class="status-message status-warning">အမှားအယွင်း: "${rawLine}" သည် ဂဏန်းမဟုတ်ပါ။</div>`;
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
    analyzeM8(validNumbers);
    analyzeM9(validNumbers);
}

// ========== UTILITIES ==========
function getOddEvenNumbers(numbers) {
    const oddNumbers = [];   // Rows 1, 3, 5... (index 0, 2, 4...)
    const evenNumbers = [];  // Rows 2, 4, 6... (index 1, 3, 5...)
    for (let i = 0; i < numbers.length; i++) {
        if (i % 2 === 0) oddNumbers.push({ actualIndex: i, value: numbers[i] });
        else evenNumbers.push({ actualIndex: i, value: numbers[i] });
    }
    return { oddNumbers, evenNumbers };
}

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

function getColorHex(barClass) {
    const color = barClass.replace('bar-', '');
    return colorHexMap[color] || '#cc0000';
}

// ========== UNIFIED RENDER ENGINE WITH ARROWS ==========
function renderWithArrows(numbers, results, cssClass, title, options = {}) {
    const groups = identifyConsecutiveGroups(results);
    // M9 defines each matching four-row block as one group. Other tables
    // retain the existing consecutive-match behavior.
    const validGroups = options.eachMatchIsGroup
        ? results.reduce((matchedGroups, result, index) => {
            if (result.isMatch) matchedGroups.push([index]);
            return matchedGroups;
        }, [])
        : groups.filter(g => g.length >= 2);
    
    const allValidIndices = new Set();
    validGroups.forEach(group => group.forEach(idx => allValidIndices.add(idx)));
    
    const colorMap = new Map();
    const arrowData = [];
    let colorIdx = 0;
    
    allValidIndices.forEach(checkIndex => {
        const r = results[checkIndex];
        const color = colorClasses[colorIdx % colorClasses.length];
        const bar = barClasses[colorIdx % barClasses.length];
        colorIdx++;
        
        // Apply highlights
        if (r.highlights) {
            r.highlights.forEach(h => {
                colorMap.set(`${h.row}-${h.digit}`, color);
            });
        }
        
        // Apply arrows
        if (r.arrows) {
            r.arrows.forEach(a => {
                arrowData.push({
                    startRow: a.startRow, startDigit: a.startDigit,
                    endRow: a.endRow, endDigit: a.endDigit,
                    bar: bar
                });
            });
        }
    });
    
    const matches = [...allValidIndices].map(i => results[i]);
    const digitCenterX = [22.5, 75.5, 128.5];
    const ROW_HEIGHT = 65;
    
    let html = `<div class="sub-table ${cssClass}"><h3 class="sub-table-title">${title}</h3><div class="results-grid">`;
    
    for (let i = 0; i < numbers.length; i++) {
        const num = numbers[i];
        html += `<div class="row-item"><div class="row-number">${i+1}</div><div class="digits-container">`;
        for (let d = 0; d < 3; d++) {
            const color = colorMap.get(`${i}-${d}`) || '';
            html += `<div class="digit-box ${color} ${color ? 'highlighted' : ''}">${num[d]}</div>`;
        }
        
        // Draw arrows starting from this row
        arrowData.filter(a => a.startRow === i).forEach(arrow => {
            const sx = digitCenterX[arrow.startDigit];
            const sy = ROW_HEIGHT / 2;
            const ex = digitCenterX[arrow.endDigit];
            const ey = (arrow.endRow - arrow.startRow) * ROW_HEIGHT + ROW_HEIGHT / 2;
            const colorHex = getColorHex(arrow.bar);
            
            const svgW = Math.abs(ex - sx) + 20;
            const svgH = ey - sy + 20;
            const svgX = Math.min(sx, ex) - 10;
            const svgY = sy - 10;
            const lx1 = sx - svgX, ly1 = sy - svgY;
            const lx2 = ex - svgX, ly2 = ey - svgY;
            
            const dx = lx2 - lx1, dy = ly2 - ly1;
            const len = Math.sqrt(dx*dx + dy*dy);
            if (len === 0) return;
            const nx2 = dx/len, ny2 = dy/len;
            const arrowSize = 6;
            const ax = lx2 - nx2 * arrowSize, ay = ly2 - ny2 * arrowSize;
            const p1x = ax - ny2 * arrowSize * 0.4, p1y = ay + nx2 * arrowSize * 0.4;
            const p2x = ax + ny2 * arrowSize * 0.4, p2y = ay - nx2 * arrowSize * 0.4;
            
            html += `<svg style="position:absolute;left:${svgX}px;top:${svgY}px;width:${svgW}px;height:${svgH}px;z-index:3;pointer-events:none;overflow:visible;">
                <line x1="${lx1}" y1="${ly1}" x2="${lx2}" y2="${ly2}" stroke="${colorHex}" stroke-width="2.5" stroke-linecap="round"/>
                <polygon points="${lx2},${ly2} ${p1x},${p1y} ${p2x},${p2y}" fill="${colorHex}"/>
            </svg>`;
        });
        
        html += `</div></div>`;
    }
    
    const statusText = options.showCheckedCount
        ? `စစ်ဆေးပြီးသောအုပ်စုများ: ${results.length} | ကိုက်ညီသောအုပ်စုများ: ${validGroups.length} (Matches: ${matches.length})`
        : `ကိုက်ညီသောအုပ်စုများ: ${validGroups.length} (Matches: ${matches.length})`;
    const calculationDetails = options.showCalculations && results.length
        ? `<div class="calculation-details">${results.map(r => `
            <div class="calculation-row ${r.isMatch ? 'calculation-match' : 'calculation-no-match'}">
                <span class="calculation-group">${r.calculation.groupLabel}</span>
                <span>${r.calculation.leftLabel}: ${r.calculation.leftDigits.join(' + ')} = ${r.calculation.leftSum} → ${r.calculation.leftResult}</span>
                <span>${r.calculation.rightLabel}: ${r.calculation.rightDigits.join(' + ')} = ${r.calculation.rightSum} → ${r.calculation.rightResult}</span>
                <strong>${r.isMatch ? '✓ Match' : '≠ No match'}</strong>
            </div>`).join('')}</div>`
        : '';
    html += `</div>${calculationDetails}<div class="status-message status-info">${statusText}</div></div>`;
    return html;
}

// ========== M1 LOGIC ==========
// Formula: Row N unit + Row N+1 ten + Row N+1 unit + Row N+2 ten → mod 10 = Row N hundred
// Odd: Row 1,3,5... (i+=2), Even: Row 2,4,6... (i+=2)
function analyzeM1(numbers) {
    const { oddNumbers, evenNumbers } = getOddEvenNumbers(numbers);
    let html = '<div class="split-tables">';
    html += renderWithArrows(numbers, calcM1(oddNumbers, numbers), 'odd', 'M1 Table - Odd');
    html += renderWithArrows(numbers, calcM1(evenNumbers, numbers), 'even', 'M1 Table - Even');
    html += '</div>';
    m1Container.innerHTML = html;
}

function calcM1(subset, all) {
    const results = [];
    for (let i = 0; i < subset.length; i++) {
        const n = subset[i].actualIndex;
        if (n + 2 >= all.length) break;
        const sum = parseInt(all[n][2]) + parseInt(all[n+1][1]) + parseInt(all[n+1][2]) + parseInt(all[n+2][1]);
        const isMatch = (sum % 10) === parseInt(all[n][0]);
        results.push({
            isMatch,
            highlights: [
                {row: n, digit: 0}, {row: n, digit: 2},
                {row: n+1, digit: 1}, {row: n+1, digit: 2},
                {row: n+2, digit: 1}
            ],
            arrows: [
                {startRow: n, startDigit: 2, endRow: n+1, endDigit: 1},
                {startRow: n+1, startDigit: 1, endRow: n+1, endDigit: 2},
                {startRow: n+1, startDigit: 2, endRow: n+2, endDigit: 1}
            ]
        });
    }
    return results;
}

// ========== M2 LOGIC ==========
// Formula: (Row N hundred + Row N+1 hundred + Row N+2 hundred) mod 10 == (Row N+2 unit + Row N+3 unit) mod 10
function analyzeM2(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(
        numbers,
        calcM2(numbers, 0),
        'odd',
        'M2 Table - Odd (Row 1, 4, 7...)',
        { eachMatchIsGroup: true, showCheckedCount: true, showCalculations: true }
    );
    html += renderWithArrows(
        numbers,
        calcM2(numbers, 1),
        'even',
        'M2 Table - Even (Row 2, 5, 8...)',
        { eachMatchIsGroup: true, showCheckedCount: true, showCalculations: true }
    );
    html += '</div>';
    m2Container.innerHTML = html;
}

function calcM2(all, startIdx) {
    const results = [];
    for (let n = startIdx; n + 3 < all.length; n += 3) {
        const hSum = parseInt(all[n][0]) + parseInt(all[n + 1][0]) + parseInt(all[n + 2][0]);
        const uSum = parseInt(all[n + 2][2]) + parseInt(all[n + 3][2]);
        const isMatch = (hSum % 10) === (uSum % 10);
        results.push({
            isMatch,
            calculation: {
                groupLabel: `Rows ${n + 1}–${n + 4}`,
                leftLabel: 'Hundreds',
                leftDigits: [all[n][0], all[n + 1][0], all[n + 2][0]],
                leftSum: hSum,
                leftResult: hSum % 10,
                rightLabel: 'Units',
                rightDigits: [all[n + 2][2], all[n + 3][2]],
                rightSum: uSum,
                rightResult: uSum % 10
            },
            highlights: [
                {row: n, digit: 0},
                {row: n + 1, digit: 0},
                {row: n + 2, digit: 0},
                {row: n + 2, digit: 2},
                {row: n + 3, digit: 2}
            ],
            arrows: [
                {startRow: n, startDigit: 0, endRow: n + 1, endDigit: 0},
                {startRow: n + 1, startDigit: 0, endRow: n + 2, endDigit: 0},
                {startRow: n + 2, startDigit: 2, endRow: n + 3, endDigit: 2}
            ]
        });
    }
    return results;
}

// ========== M3 LOGIC ==========
// Formula: (Row N+1 ten + Row N+1 unit) mod 10 == (Row N hundred + Row N+1 hundred + Row N+2 ten) mod 10
function analyzeM3(numbers) {
    const { oddNumbers, evenNumbers } = getOddEvenNumbers(numbers);
    let html = '<div class="split-tables">';
    html += renderWithArrows(numbers, calcM3(oddNumbers, numbers), 'odd', 'M3 Table - Odd');
    html += renderWithArrows(numbers, calcM3(evenNumbers, numbers), 'even', 'M3 Table - Even');
    html += '</div>';
    m3Container.innerHTML = html;
}

function calcM3(subset, all) {
    const results = [];
    for (let i = 0; i < subset.length; i++) {
        const n = subset[i].actualIndex;
        if (n + 2 >= all.length) break;
        const left = (parseInt(all[n+1][1]) + parseInt(all[n+1][2])) % 10;
        const right = (parseInt(all[n][0]) + parseInt(all[n+1][0]) + parseInt(all[n+2][1])) % 10;
        const isMatch = left === right;
        results.push({
            isMatch,
            highlights: [
                {row: n, digit: 0},
                {row: n+1, digit: 0}, {row: n+1, digit: 1}, {row: n+1, digit: 2},
                {row: n+2, digit: 1}
            ],
            arrows: [
                {startRow: n, startDigit: 0, endRow: n+1, endDigit: 0},
                {startRow: n+1, startDigit: 1, endRow: n+1, endDigit: 2},
                {startRow: n+1, startDigit: 0, endRow: n+2, endDigit: 1}
            ]
        });
    }
    return results;
}

// ========== M4 LOGIC ==========
// Formula: (Row N ten + Row N+1 ten + Row N+2 ten) mod 10 == Row N+4 ten
function analyzeM4(numbers) {
    const { oddNumbers, evenNumbers } = getOddEvenNumbers(numbers);
    let html = '<div class="split-tables">';
    html += renderWithArrows(numbers, calcM4(oddNumbers, numbers), 'odd', 'M4 Table - Odd');
    html += renderWithArrows(numbers, calcM4(evenNumbers, numbers), 'even', 'M4 Table - Even');
    html += '</div>';
    m4Container.innerHTML = html;
}

function calcM4(subset, all) {
    const results = [];
    for (let i = 0; i < subset.length; i++) {
        const n = subset[i].actualIndex;
        if (n + 4 >= all.length) break;
        const sum = (parseInt(all[n][1]) + parseInt(all[n+1][1]) + parseInt(all[n+2][1])) % 10;
        const isMatch = sum === parseInt(all[n+4][1]);
        results.push({
            isMatch,
            highlights: [
                {row: n, digit: 1}, {row: n+1, digit: 1}, {row: n+2, digit: 1},
                {row: n+4, digit: 1}
            ],
            arrows: [
                {startRow: n, startDigit: 1, endRow: n+1, endDigit: 1},
                {startRow: n+1, startDigit: 1, endRow: n+2, endDigit: 1},
                {startRow: n+2, startDigit: 1, endRow: n+4, endDigit: 1}
            ]
        });
    }
    return results;
}

// ========== M5 LOGIC ==========
// Formula: Row N ten digit == (Row N+1 hundred + Row N+2 hundred + Row N+2 ten) mod 10
// Groups: every 3 rows (Row 1,4,7...), (Row 2,5,8...), (Row 3,6,9...)
function analyzeM5(numbers) {
    let html = '<div class="split-tables three-columns">';
    html += renderWithArrows(numbers, calcM5(numbers, 0), 'odd', 'M5 Group 1 (Row 1,4,7...)');
    html += renderWithArrows(numbers, calcM5(numbers, 1), 'even', 'M5 Group 2 (Row 2,5,8...)');
    html += renderWithArrows(numbers, calcM5(numbers, 2), 'group3', 'M5 Group 3 (Row 3,6,9...)');
    html += '</div>';
    m5Container.innerHTML = html;
}

function calcM5(all, startIdx) {
    const results = [];
    for (let n = startIdx; n + 2 < all.length; n += 3) {
        const sum = (parseInt(all[n+1][0]) + parseInt(all[n+2][0]) + parseInt(all[n+2][1])) % 10;
        const isMatch = sum === parseInt(all[n][1]);
        results.push({
            isMatch,
            highlights: [
                {row: n, digit: 1},
                {row: n+1, digit: 0},
                {row: n+2, digit: 0}, {row: n+2, digit: 1}
            ],
            arrows: [
                {startRow: n+1, startDigit: 0, endRow: n+2, endDigit: 0},
                {startRow: n+2, startDigit: 0, endRow: n+2, endDigit: 1}
            ]
        });
    }
    return results;
}

// ========== M6 LOGIC ==========
// Formula: S = H(Row N) + U(Row N) + H(Row N+1), S mod 10 = Row N+1 ten digit
function analyzeM6(numbers) {
    const { oddNumbers, evenNumbers } = getOddEvenNumbers(numbers);
    let html = '<div class="split-tables">';
    html += renderWithArrows(numbers, calcM6(oddNumbers, numbers), 'odd', 'M6 Table - Odd');
    html += renderWithArrows(numbers, calcM6(evenNumbers, numbers), 'even', 'M6 Table - Even');
    html += '</div>';
    m6Container.innerHTML = html;
}

function calcM6(subset, all) {
    const results = [];
    for (let i = 0; i < subset.length; i++) {
        const n = subset[i].actualIndex;
        if (n + 1 >= all.length) break;
        const s = parseInt(all[n][0]) + parseInt(all[n][2]) + parseInt(all[n+1][0]);
        const isMatch = (s % 10) === parseInt(all[n+1][1]);
        results.push({
            isMatch,
            highlights: [
                {row: n, digit: 0}, {row: n, digit: 2},
                {row: n+1, digit: 0}, {row: n+1, digit: 1}, {row: n+1, digit: 2}
            ],
            arrows: [
                {startRow: n, startDigit: 0, endRow: n, endDigit: 2},
                {startRow: n, startDigit: 2, endRow: n+1, endDigit: 0}
            ]
        });
    }
    return results;
}

// ========== M7 LOGIC ==========
// Formula: A = Unit(Row N) + Tens(Row N+1), B = Unit(Row N+1) + Unit(Row N+2) + Tens(Row N+2)
// A mod 10 == B mod 10
function analyzeM7(numbers) {
    const { oddNumbers, evenNumbers } = getOddEvenNumbers(numbers);
    let html = '<div class="split-tables">';
    html += renderWithArrows(numbers, calcM7(oddNumbers, numbers), 'odd', 'M7 Table - Odd');
    html += renderWithArrows(numbers, calcM7(evenNumbers, numbers), 'even', 'M7 Table - Even');
    html += '</div>';
    m7Container.innerHTML = html;
}

function calcM7(subset, all) {
    const results = [];
    for (let i = 0; i < subset.length; i++) {
        const n = subset[i].actualIndex;
        if (n + 2 >= all.length) break;
        const a = parseInt(all[n][2]) + parseInt(all[n+1][1]);
        const b = parseInt(all[n+1][2]) + parseInt(all[n+2][2]) + parseInt(all[n+2][1]);
        const isMatch = (a % 10) === (b % 10);
        results.push({
            isMatch,
            highlights: [
                {row: n, digit: 2},
                {row: n+1, digit: 1}, {row: n+1, digit: 2},
                {row: n+2, digit: 1}, {row: n+2, digit: 2}
            ],
            arrows: [
                {startRow: n, startDigit: 2, endRow: n+1, endDigit: 1},
                {startRow: n+1, startDigit: 2, endRow: n+2, endDigit: 2},
                {startRow: n+2, startDigit: 2, endRow: n+2, endDigit: 1}
            ]
        });
    }
    return results;
}

// ========== M8 LOGIC ==========
// Formula: Left = Row N ten + Row N+1 ten → mod 10
//          Right = Row N+1 unit + Row N+2 ten + Row N+3 hundred → mod 10
function analyzeM8(numbers) {
    const { oddNumbers, evenNumbers } = getOddEvenNumbers(numbers);
    let html = '<div class="split-tables">';
    html += renderWithArrows(numbers, calcM8(oddNumbers, numbers), 'odd', 'M8 Table - Odd');
    html += renderWithArrows(numbers, calcM8(evenNumbers, numbers), 'even', 'M8 Table - Even');
    html += '</div>';
    m8Container.innerHTML = html;
}

function calcM8(subset, all) {
    const results = [];
    for (let i = 0; i < subset.length; i++) {
        const n = subset[i].actualIndex;
        if (n + 3 >= all.length) break;
        const left = parseInt(all[n][1]) + parseInt(all[n+1][1]);
        const right = parseInt(all[n+1][2]) + parseInt(all[n+2][1]) + parseInt(all[n+3][0]);
        const isMatch = (left % 10) === (right % 10);
        results.push({
            isMatch,
            highlights: [
                {row: n, digit: 1}, {row: n+1, digit: 1},
                {row: n+1, digit: 2}, {row: n+2, digit: 1}, {row: n+3, digit: 0}
            ],
            arrows: [
                {startRow: n, startDigit: 1, endRow: n+1, endDigit: 1},
                {startRow: n+1, startDigit: 2, endRow: n+2, endDigit: 1},
                {startRow: n+2, startDigit: 1, endRow: n+3, endDigit: 0}
            ]
        });
    }
    return results;
}

// ========== M9 LOGIC ==========
// Each complete four-row block contains two calculations.
// Calculation 1: Row N tens + Row N units + Row N+1 units → unit digit.
// Calculation 2: Row N+2 hundreds + Row N+2 units + Row N+3 units → unit digit.
// Odd blocks start at Row 1, then Row 5, 9... (zero-based 0, 4, 8...).
// Even blocks start at Row 2, then Row 6, 10... (zero-based 1, 5, 9...).
function analyzeM9(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(
        numbers,
        calcM9(numbers, 0),
        'odd',
        'M9 Table - Odd (Row 1–4, 5–8, 9–12...)',
        { eachMatchIsGroup: true, showCheckedCount: true, showCalculations: true }
    );
    html += renderWithArrows(
        numbers,
        calcM9(numbers, 1),
        'even',
        'M9 Table - Even (Row 2–5, 6–9, 10–13...)',
        { eachMatchIsGroup: true, showCheckedCount: true, showCalculations: true }
    );
    html += '</div>';
    m9Container.innerHTML = html;
}

function calcM9(all, startIdx) {
    const results = [];
    for (let n = startIdx; n + 3 < all.length; n += 4) {
        const leftDigits = [all[n][1], all[n][2], all[n + 1][2]];
        const rightDigits = [all[n + 2][0], all[n + 2][2], all[n + 3][2]];
        const leftSum = leftDigits.reduce((sum, digit) => sum + parseInt(digit), 0);
        const rightSum = rightDigits.reduce((sum, digit) => sum + parseInt(digit), 0);
        const leftResult = leftSum % 10;
        const rightResult = rightSum % 10;
        const isMatch = leftResult === rightResult;

        results.push({
            isMatch,
            calculation: {
                groupLabel: `Rows ${n + 1}–${n + 4}`,
                leftLabel: 'Calculation 1',
                leftDigits,
                leftSum,
                leftResult,
                rightLabel: 'Calculation 2',
                rightDigits,
                rightSum,
                rightResult
            },
            highlights: [
                {row: n, digit: 1},
                {row: n, digit: 2},
                {row: n + 1, digit: 2},
                {row: n + 2, digit: 0},
                {row: n + 2, digit: 2},
                {row: n + 3, digit: 2}
            ],
            arrows: [
                {startRow: n, startDigit: 1, endRow: n, endDigit: 2},
                {startRow: n, startDigit: 2, endRow: n + 1, endDigit: 2},
                {startRow: n + 2, startDigit: 0, endRow: n + 2, endDigit: 2},
                {startRow: n + 2, startDigit: 2, endRow: n + 3, endDigit: 2}
            ]
        });
    }
    return results;
}
