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
const m10Container = document.getElementById('m10Container');
const m11Container = document.getElementById('m11Container');
const m12Container = document.getElementById('m12Container');
const m13Container = document.getElementById('m13Container');
const m14Container = document.getElementById('m14Container');
const m15Container = document.getElementById('m15Container');
const m16Container = document.getElementById('m16Container');
const m17Container = document.getElementById('m17Container');
const m18Container = document.getElementById('m18Container');

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
    analyzeM10(validNumbers);
    analyzeM11(validNumbers);
    analyzeM12(validNumbers);
    analyzeM13(validNumbers);
    analyzeM14(validNumbers);
    analyzeM15(validNumbers);
    analyzeM16(validNumbers);
    analyzeM17(validNumbers);
    analyzeM18(validNumbers);
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
                const key = `${h.row}-${h.digit}`;
                if (options.multiColorHighlights) {
                    const existing = colorMap.get(key) || [];
                    if (!existing.includes(color)) existing.push(color);
                    colorMap.set(key, existing);
                } else {
                    colorMap.set(key, color);
                }
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
            const mappedColors = colorMap.get(`${i}-${d}`) || '';
            const color = Array.isArray(mappedColors) ? mappedColors[0] : mappedColors;
            const multiColor = Array.isArray(mappedColors) && mappedColors.length > 1;
            let multiColorStyle = '';
            if (multiColor) {
                const hexColors = mappedColors.map(name => colorHexMap[name.replace('color-', '')]);
                const stripeSize = 100 / hexColors.length;
                const stripes = hexColors.map((hex, index) =>
                    `${hex} ${index * stripeSize}% ${(index + 1) * stripeSize}%`
                ).join(', ');
                const rings = hexColors.slice(1).map((hex, index) =>
                    `0 0 0 ${3 + index * 2}px ${hex}`
                );
                multiColorStyle = ` style="background:linear-gradient(135deg, ${stripes});color:#fff;border-color:${hexColors[0]};box-shadow:${rings.join(', ')}"`;
            }
            html += `<div class="digit-box ${multiColor ? '' : color} ${mappedColors ? 'highlighted' : ''}"${multiColorStyle}>${num[d]}</div>`;
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
    
    const calculationDetails = options.showCalculations && results.length
        ? `<details class="calculation-report">
            <summary class="calculation-report-toggle">
                <span class="report-toggle-show">Show calculation report (${results.length} groups)</span>
                <span class="report-toggle-hide">Hide calculation report (${results.length} groups)</span>
            </summary>
            <div class="calculation-details">${results.map(r => `
                <div class="calculation-row">
                    <span class="calculation-group">${r.calculation.groupLabel}</span>
                    ${r.calculation.detailLines
                        ? r.calculation.detailLines.map(line => `<span>${line}</span>`).join('')
                        : `<span>${r.calculation.leftLabel}: ${r.calculation.leftDigits.join(' + ')} = ${r.calculation.leftSum} → ${r.calculation.leftResult}</span>
                           <span>${r.calculation.rightLabel}: ${r.calculation.rightDigits.join(' + ')} = ${r.calculation.rightSum} → ${r.calculation.rightResult}</span>`}
                </div>`).join('')}</div>
        </details>`
        : '';
    const logicGuide = getTableLogicGuide(title);
    const logicPanel = logicGuide
        ? `<details class="table-logic-guide">
            <summary class="table-logic-toggle">
                <span class="logic-toggle-show">ဒီ Table ရဲ့ Logic ကိုကြည့်ရန်</span>
                <span class="logic-toggle-hide">Logic ကိုဖျောက်ရန်</span>
                <span class="logic-toggle-icon" aria-hidden="true"></span>
            </summary>
            <div class="table-logic-content">${logicGuide}</div>
        </details>`
        : '';
    html += `</div>${calculationDetails}${logicPanel}</div>`;
    return html;
}


// ========== M11 LOGIC ==========
// Each group checks three rows, with four rows between group starts.
// Odd groups: Rows 1–3, 5–7, 9–11...
// Even groups: Rows 2–4, 6–8, 10–12...
// Sum = starting-row units + middle-row tens + ending-row tens.
// Compare the final digit (sum % 10) with ending-row units.
function analyzeM11(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(
        numbers,
        calcM11(numbers, 0),
        'odd',
        'M11 Table - Odd (Rows 1–3, 5–7, 9–11...)',
        { eachMatchIsGroup: true, showCalculations: true }
    );
    html += renderWithArrows(
        numbers,
        calcM11(numbers, 1),
        'even',
        'M11 Table - Even (Rows 2–4, 6–8, 10–12...)',
        { eachMatchIsGroup: true, showCalculations: true }
    );
    html += '</div>';
    m11Container.innerHTML = html;
}

function calcM11(all, startIdx) {
    const results = [];
    for (let n = startIdx; n + 2 < all.length; n += 4) {
        const sumDigits = [all[n][2], all[n + 1][1], all[n + 2][1]];
        const sum = sumDigits.reduce((total, digit) => total + parseInt(digit, 10), 0);
        const finalDigit = sum % 10;
        const targetDigit = parseInt(all[n + 2][2], 10);
        const isMatch = finalDigit === targetDigit;

        results.push({
            isMatch,
            calculation: {
                groupLabel: `Rows ${n + 1}–${n + 3}`,
                leftLabel: 'Starting Unit + Middle Tens + Ending Tens',
                leftDigits: sumDigits,
                leftSum: sum,
                leftResult: finalDigit,
                rightLabel: `Row ${n + 3} Unit`,
                rightDigits: [all[n + 2][2]],
                rightSum: targetDigit,
                rightResult: targetDigit
            },
            highlights: [
                {row: n, digit: 2},
                {row: n + 1, digit: 1},
                {row: n + 2, digit: 1},
                {row: n + 2, digit: 2}
            ],
            arrows: [
                {startRow: n, startDigit: 2, endRow: n + 1, endDigit: 1},
                {startRow: n + 1, startDigit: 1, endRow: n + 2, endDigit: 1},
                {startRow: n + 2, startDigit: 1, endRow: n + 2, endDigit: 2}
            ]
        });
    }
    return results;
}


// ========== M12 LOGIC ==========
// For each start row N:
// A = (Row N unit + Row N+4 hundred) % 10
// B = (Row N+2 hundred + Row N+2 unit) % 10
// Result = (A - B) modulo 10; compare with Row N+6 hundred.
// Odd starts: Rows 1, 3, 5...; Even starts: Rows 2, 4, 6...
function analyzeM12(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(
        numbers,
        calcM12(numbers, 0),
        'odd',
        'M12 Table - Odd (Rows 1, 3, 5, 7...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += renderWithArrows(
        numbers,
        calcM12(numbers, 1),
        'even',
        'M12 Table - Even (Rows 2, 4, 6, 8...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += '</div>';
    m12Container.innerHTML = html;
}

function calcM12(all, startIdx) {
    const results = [];
    for (let n = startIdx; n + 6 < all.length; n += 2) {
        const leftDigits = [all[n][2], all[n + 4][0]];
        const rightDigits = [all[n + 2][0], all[n + 2][2]];
        const leftSum = leftDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const rightSum = rightDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const leftResult = leftSum % 10;
        const rightResult = rightSum % 10;
        const difference = leftResult - rightResult;
        const finalResult = (difference + 10) % 10;
        const targetDigit = parseInt(all[n + 6][0], 10);
        const isMatch = finalResult === targetDigit;

        results.push({
            isMatch,
            calculation: {
                groupLabel: `Rows ${n + 1}, ${n + 3}, ${n + 5} & ${n + 7}`,
                detailLines: [
                    `A: Row ${n + 1} Unit ${leftDigits[0]} + Row ${n + 5} Hundred ${leftDigits[1]} = ${leftSum} → ${leftResult}`,
                    `B: Row ${n + 3} Hundred ${rightDigits[0]} + Unit ${rightDigits[1]} = ${rightSum} → ${rightResult}`,
                    `A − B: ${leftResult} − ${rightResult} = ${difference} → ${finalResult}`,
                    `Compare with Row ${n + 7} Hundred: ${targetDigit} → ${isMatch ? 'MATCH' : 'No match'}`
                ],
                leftLabel: 'A',
                leftDigits,
                leftSum,
                leftResult,
                rightLabel: 'B',
                rightDigits,
                rightSum,
                rightResult
            },
            highlights: [
                {row: n, digit: 2},
                {row: n + 4, digit: 0},
                {row: n + 2, digit: 0},
                {row: n + 2, digit: 2},
                {row: n + 6, digit: 0}
            ],
            arrows: [
                {startRow: n, startDigit: 2, endRow: n + 4, endDigit: 0},
                {startRow: n + 2, startDigit: 0, endRow: n + 2, endDigit: 2},
                {startRow: n + 2, startDigit: 2, endRow: n + 6, endDigit: 0}
            ]
        });
    }
    return results;
}



// ========== M13 LOGIC ==========
// Sum = Row N hundred + Row N+1 tens + Row N+2 tens.
// Compare sum % 10 with Row N+1 hundred.
// Odd starts: Rows 1, 3, 5, 7...
// Even starts: Rows 2, 4, 6, 8...
// Start row advances by two for each next group.
function analyzeM13(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(
        numbers,
        calcM13(numbers, 0),
        'odd',
        'M13 Table - Odd (Rows 1, 3, 5, 7...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += renderWithArrows(
        numbers,
        calcM13(numbers, 1),
        'even',
        'M13 Table - Even (Rows 2, 4, 6, 8...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += '</div>';
    m13Container.innerHTML = html;
}

function calcM13(all, startIdx) {
    const results = [];
    for (let n = startIdx; n + 2 < all.length; n += 2) {
        const sumDigits = [all[n][0], all[n + 1][1], all[n + 2][1]];
        const sum = sumDigits.reduce((total, digit) => total + parseInt(digit, 10), 0);
        const finalDigit = sum % 10;
        const targetDigit = parseInt(all[n + 1][0], 10);
        const isMatch = finalDigit === targetDigit;

        results.push({
            isMatch,
            calculation: {
                groupLabel: `Rows ${n + 1} & ${n + 3} (Middle Row ${n + 2})`,
                detailLines: [
                    `Row ${n + 1} Hundred ${sumDigits[0]} + Row ${n + 2} Tens ${sumDigits[1]} + Row ${n + 3} Tens ${sumDigits[2]} = ${sum} → ${finalDigit}`,
                    `Compare with Row ${n + 2} Hundred: ${targetDigit} → ${isMatch ? 'MATCH' : 'No match'}`
                ],
                leftLabel: 'Hundreds + Tens + Tens',
                leftDigits: sumDigits,
                leftSum: sum,
                leftResult: finalDigit,
                rightLabel: 'Middle Row Hundred',
                rightDigits: [all[n + 1][0]],
                rightSum: targetDigit,
                rightResult: targetDigit
            },
            highlights: [
                {row: n, digit: 0},
                {row: n + 1, digit: 1},
                {row: n + 2, digit: 1},
                {row: n + 1, digit: 0}
            ],
            arrows: [
                {startRow: n, startDigit: 0, endRow: n + 1, endDigit: 1},
                {startRow: n + 1, startDigit: 1, endRow: n + 2, endDigit: 1}
            ]
        });
    }
    return results;
}

// ========== USER-FRIENDLY TABLE LOGIC GUIDES ==========

function getTableLogicGuide(title) {
    const match = title.match(/M(18|17|16|15|14|13|12|11|10|[1-9])/i);
    if (!match) return '';
    const n = Number(match[1]);
    const guides = {
        18: '<p><strong>အုပ်စုတစ်ခုစီတွင် ဆက်တိုက် Row ၄ တန်း ပါဝင်ပါတယ်။</strong></p><p><strong>A ပေါင်းချက်:</strong> ပထမ Row N ၏ ရာဂဏန်း + ပထမ Row N ၏ ဆယ်ဂဏန်း + ဒုတိယ Row N+1 ၏ ဆယ်ဂဏန်း။</p><p><strong>B ပေါင်းချက်:</strong> ဒုတိယ Row N+1 ၏ ယူနစ်ဂဏန်း + တတိယ Row N+2 ၏ ယူနစ်ဂဏန်း + စတုတ္ထ Row N+3 ၏ ဆယ်ဂဏန်း။</p><p>A နဲ့ B ကို သီးခြားပေါင်းပြီး နောက်ဆုံးဂဏန်း (% 10) ကိုယူပါတယ်။ နှစ်ဘက်ရလဒ်တူလျှင် Match ဖြစ်ပါတယ်။ Match ဖြစ်တဲ့အခါ A ဘက်ရှိ ဂဏန်း ၃ လုံးကို မျဉ်း ၂ ကြောင်းနဲ့ ဆက်ပြီး B ဘက်ရှိ ဂဏန်း ၃ လုံးကိုလည်း သီးခြား မျဉ်း ၂ ကြောင်းနဲ့ ဆက်ပါတယ်။ Group တစ်ခုတည်းအတွင်း A/B နှစ်ဘက်စလုံးကို အရောင်တစ်ရောင်တည်း သုံးပါတယ်။</p><p><strong>Odd:</strong> Row 1–4၊ 5–8၊ 9–12၊ 13–16…</p><p><strong>Even:</strong> Row 2–5၊ 6–9၊ 10–13၊ 14–17…</p><p>Odd သည် Row 1 မှ၊ Even သည် Row 2 မှ စပါတယ်။ အုပ်စုတစ်ခုစီတွင် စတင် Row ကို ၄ တန်းစီ ရွှေ့ပြီး Row ၄ တန်းလုံးရှိမှ တွက်ချက်ပါတယ်။ Match ဖြစ်သော group များကို အရောင် loop ဖြင့် ဖော်ပြပါတယ်။</p>',
        17: '<p><strong>အုပ်စုတစ်ခုစီတွင် ဆက်တိုက် Row ၄ တန်း ပါဝင်ပါတယ်။</strong></p><p><strong>ပေါင်းရမည့် ဂဏန်း ၃ လုံး:</strong> ပထမ Row N ၏ ယူနစ်ဂဏန်း + ဒုတိယ Row N+1 ၏ ယူနစ်ဂဏန်း + တတိယ Row N+2 ၏ ဆယ်ဂဏန်း။</p><p>အဲဒီဂဏန်း ၃ လုံးကို ပေါင်းပြီး 10 ကျော်လျှင် နောက်ဆုံးဂဏန်းတစ်လုံးကိုသာ ယူပါတယ်။ ထွက်လာတဲ့ နောက်ဆုံးဂဏန်းကို စတုတ္ထ Row N+3 ၏ ရာဂဏန်းနဲ့ နှိုင်းယှဉ်ပါတယ်။ တူညီလျှင် Match ဖြစ်ပါတယ်။ Match ဖြစ်တဲ့အခါ ပေါင်းထားတဲ့ ဂဏန်း ၃ လုံးကို မျဉ်း ၂ ကြောင်းနဲ့ ဆက်ပြီး စတုတ္ထ Row ရဲ့ ရာဂဏန်းကိုတော့ မျဉ်းမဆက်ဘဲ အရောင်တူ highlight လုပ်ပါတယ်။ Group တစ်ခုစီကို အရောင် loop နဲ့ ခွဲပြပါတယ်။</p><p><strong>Odd:</strong> Row 1–4၊ 5–8၊ 9–12၊ 13–16… အုပ်စုများ။</p><p><strong>Even:</strong> Row 2–5၊ 6–9၊ 10–13၊ 14–17… အုပ်စုများ။</p><p>အုပ်စုတစ်ခုစီမှာ စတင် Row ကို ၄ တန်းစီ ရွှေ့ပြီး အုပ်စုအတွက် Row ၄ တန်းလုံး ရှိမှ တွက်ချက်ပါတယ်။</p>',
        16: '<p><strong>အုပ်စုတစ်ခုစီမှာ ဆက်တိုက် Row ၃ တန်းကို အသုံးပြုပါတယ်။</strong></p><p><strong>A ပေါင်းချက်:</strong> ပထမ Row N ၏ ရာဂဏန်း + အလယ် Row N+1 ၏ ရာဂဏန်း + အလယ် Row N+1 ၏ ယူနစ်ဂဏန်း။</p><p><strong>B ပေါင်းချက်:</strong> နောက်ဆုံး Row N+2 ၏ ရာ + ဆယ် + ယူနစ် ဂဏန်းသုံးလုံးလုံးကို ပေါင်းပါတယ်။</p><p>A နဲ့ B ကို သီးခြားပေါင်းပြီး 10 ကျော်လျှင် နောက်ဆုံးဂဏန်းတစ်လုံးကိုသာ ယူပါတယ်။ နှစ်ဘက်ရလဒ်တူလျှင် Match ဖြစ်ပါတယ်။ Match ဖြစ်သောအခါ A ဘက်ရှိ ဂဏန်း ၃ လုံးကို မျဉ်း ၂ ကြောင်း၊ B ဘက်ရှိ ဂဏန်း ၃ လုံးကိုလည်း သီးခြားမျဉ်း ၂ ကြောင်းဖြင့် ဆက်ပြီး group တစ်ခုစီကို အရောင်တစ်ရောင် သတ်မှတ်ပါတယ်။ နောက် group နဲ့ digit ထပ်နေပါက အဲဒီ digit မှာ သက်ဆိုင်ရာ အရောင်နှစ်ရောင်လုံးကို ပြသပါတယ်။</p><p><strong>Odd:</strong> Row 1, 2, 3 ကို အုပ်စုတစ်ခုအဖြစ်တွက်ပြီး Row 1 &amp; 3 လို့ ဖော်ပြပါတယ်။ ထို့နောက် Row 3, 4, 5၊ Row 5, 6, 7၊ Row 7, 8, 9… အဖြစ် ဆက်တွက်ပါတယ်။</p><p><strong>Even:</strong> Row 2, 3, 4 ကို အုပ်စုတစ်ခုအဖြစ်တွက်ပြီး Row 2 &amp; 4 လို့ ဖော်ပြပါတယ်။ ထို့နောက် Row 4, 5, 6၊ Row 6, 7, 8၊ Row 8, 9, 10… အဖြစ် ဆက်တွက်ပါတယ်။</p><p>Odd သည် Row 1 မှ၊ Even သည် Row 2 မှ စပါတယ်။ နောက်အုပ်စုတစ်ခုစီတွင် စတင် Row ကို ၂ တန်းစီ ရွှေ့ပြီး Match ဖြစ်တဲ့ အုပ်စုများကို အရောင် loop လုပ်ကာ ပြသပါတယ်။</p>',
        15: '<p><strong>အုပ်စုတစ်ခုစီမှာ ဆက်တိုက် Row ၃ တန်း ပါဝင်ပါတယ်။</strong></p><p><strong>A ပေါင်းချက်:</strong> စတင် Row N ၏ ဆယ်ဂဏန်း + အလယ် Row N+1 ၏ ရာဂဏန်း။</p><p><strong>B ပေါင်းချက်:</strong> နောက်ဆုံး Row N+2 ၏ ရာဂဏန်း + ထို Row ၏ ဆယ်ဂဏန်း။</p><p>A နဲ့ B တစ်ဖက်စီကို သီးခြားပေါင်းပြီး 10 ကျော်လျှင် နောက်ဆုံးဂဏန်းတစ်လုံးကိုသာ ယူပါတယ်။ နှစ်ဘက်ရလဒ်တူညီလျှင် Match ဖြစ်ပါတယ်။ Match ဖြစ်တဲ့အခါ A ဘက်ရှိ ဂဏန်း ၂ လုံးကို မျဉ်းတစ်ကြောင်း၊ B ဘက်ရှိ ဂဏန်း ၂ လုံးကိုလည်း သီးခြားမျဉ်းတစ်ကြောင်းနဲ့ ဆက်ပြီး အုပ်စုတစ်ခုလုံးကို အရောင်တစ်ရောင်တည်း သတ်မှတ်ပါတယ်။ ထပ်နေတဲ့ဂဏန်းတစ်လုံးက အုပ်စုနှစ်ခုမှာ ပါဝင်နိုင်တဲ့အတွက် အရောင်နှစ်ရောင်ကိုလည်း ဖော်ပြနိုင်ပါတယ်။</p><p><strong>Odd:</strong> Row 1 &amp; 3၊ 3 &amp; 5၊ 5 &amp; 7၊ 7 &amp; 9… (အလယ် Row ကိုပါ အသုံးပြုပါတယ်။)</p><p><strong>Even:</strong> Row 2 &amp; 4၊ 4 &amp; 6၊ 6 &amp; 8၊ 8 &amp; 10… (အလယ် Row ကိုပါ အသုံးပြုပါတယ်။)</p><p>Odd သည် Row 1 မှ၊ Even သည် Row 2 မှ စပြီး အုပ်စုတစ်ခုစီ၏ စတင် Row ကို ၂ တန်းစီ ရွှေ့ပါတယ်။ Match ဖြစ်တဲ့ group များကို အရောင် loop ဖြင့် ခွဲပြပါတယ်။</p>',
        1: '<p><strong>ဘယ်လိုစစ်သလဲ</strong></p><p>Row N ၏ ယူနစ် + Row N+1 ၏ ဆယ် + ယူနစ် + Row N+2 ၏ ဆယ် ကို ပေါင်းပါ။ နောက်ဆုံးဂဏန်းကို Row N ၏ ရာဂဏန်းနှင့် နှိုင်းယှဉ်ပါတယ်။</p><p>Odd သည် Row 1, 3, 5… မှစပြီး Even သည် Row 2, 4, 6… မှစပါတယ်။</p>',
        2: '<p><strong>ဘယ်လိုစစ်သလဲ</strong></p><p>ပထမဘက်တွင် Row N မှ Row N+2 အထိ ရာဂဏန်း ၃ လုံးကို ပေါင်းပါတယ်။ ဒုတိယဘက်တွင် Row N+2 နှင့် Row N+3 ၏ ယူနစ်ဂဏန်းကို ပေါင်းပါတယ်။ နှစ်ဘက်၏ နောက်ဆုံးဂဏန်းတူရင် ကိုက်ညီပါတယ်။ Odd/Even သည် Row 1/2 မှစ၍ ၃ တန်းစီ ရွေ့ပါတယ်။</p>',
        3: '<p><strong>ဘယ်လိုစစ်သလဲ</strong></p><p>ပထမဘက် = Row N+1 ၏ ဆယ် + ယူနစ်။ ဒုတိယဘက် = Row N ၏ ရာ + Row N+1 ၏ ရာ + Row N+2 ၏ ဆယ်။ နှစ်ဘက်၏ နောက်ဆုံးဂဏန်းတူမတူ စစ်ပါတယ်။</p>',
        4: '<p><strong>ဘယ်လိုစစ်သလဲ</strong></p><p>Row N မှ Row N+2 အထိ ဆယ်ဂဏန်း ၃ လုံးကို ပေါင်းပြီး နောက်ဆုံးဂဏန်းကို Row N+4 ၏ ဆယ်ဂဏန်းနှင့် နှိုင်းယှဉ်ပါတယ်။</p>',
        5: '<p><strong>ဘယ်လိုစစ်သလဲ</strong></p><p>Row N+1 ၏ ရာ + Row N+2 ၏ ရာ + ဆယ် ကို ပေါင်းပြီး နောက်ဆုံးဂဏန်းကို Row N ၏ ဆယ်ဂဏန်းနှင့် နှိုင်းယှဉ်ပါတယ်။</p>',
        6: '<p><strong>ဘယ်လိုစစ်သလဲ</strong></p><p>Row N ၏ ရာ + ယူနစ် + Row N+1 ၏ ရာ ကို ပေါင်းပါတယ်။ ရလာသော နောက်ဆုံးဂဏန်းကို Row N+1 ၏ ဆယ်ဂဏန်းနှင့် နှိုင်းယှဉ်ပါတယ်။</p>',
        7: '<p><strong>ဘယ်လိုစစ်သလဲ</strong></p><p>A = Row N ၏ ယူနစ် + Row N+1 ၏ ဆယ်။ B = Row N+1 ၏ ယူနစ် + Row N+2 ၏ ယူနစ် + ဆယ်။ A နှင့် B ၏ နောက်ဆုံးဂဏန်းတူရင် ကိုက်ညီပါတယ်။</p>',
        8: '<p><strong>ဘယ်လိုစစ်သလဲ</strong></p><p>ပထမဘက် = Row N နှင့် Row N+1 ၏ ဆယ်ဂဏန်းပေါင်းလဒ်။ ဒုတိယဘက် = Row N+1 ၏ ယူနစ် + Row N+2 ၏ ဆယ် + Row N+3 ၏ ရာ။ နောက်ဆုံးဂဏန်းတူရင် ကိုက်ညီပါတယ်။</p>',
        9: '<p><strong>ဘယ်လိုစစ်သလဲ</strong></p><p>ပထမတွက်ချက်မှု = Row N ၏ ဆယ် + ယူနစ် + Row N+1 ၏ ယူနစ်။ ဒုတိယတွက်ချက်မှု = Row N+2 ၏ ရာ + ယူနစ် + Row N+3 ၏ ယူနစ်။ နှစ်ဘက်၏ နောက်ဆုံးဂဏန်းတူရင် ကိုက်ညီပါတယ်။ Odd အုပ်စုသည် Row 1, 5, 9…၊ Even အုပ်စုသည် Row 2, 6, 10… မှစပါတယ်။</p>',
        10: '<p><strong>အုပ်စုတစ်ခုမှာ Row ၃ တန်း ပါပါတယ်။</strong></p><p><strong>ပထမဘက်:</strong> Row N ၏ ဆယ် + Row N+1 ၏ ရာ။</p><p><strong>ဒုတိယဘက်:</strong> Row N+2 ၏ ရာ + Row N+1 ၏ ယူနစ်။</p><p>နှစ်ဘက်ကို သီးခြားပေါင်းပြီး 10 ထက်ကျော်လျှင် နောက်ဆုံးတစ်လုံးကိုသာ ယူပါတယ်။ ဥပမာ 17 ဖြစ်လျှင် 7 ကိုယူပါတယ်။ နှစ်ဘက်၏ နောက်ဆုံးဂဏန်းတူလျှင် အဲဒီ ၃ တန်းကို group တစ်ခုအဖြစ် သတ်မှတ်ပါတယ်။</p><p><strong>Odd:</strong> Row 1–3, 4–6, 7–9…</p><p><strong>Even:</strong> Row 2–4, 5–7, 8–10…</p>',
        11: '<p><strong>အုပ်စုတစ်ခုစီမှာ Row ၃ တန်း ပါပါတယ်။</strong></p><p><strong>ပေါင်းရမည့်ဂဏန်း ၃ လုံး:</strong> စတင် Row ၏ ယူနစ်ဂဏန်း + အလယ် Row ၏ ဆယ်ဂဏန်း + နောက်ဆုံး Row ၏ ဆယ်ဂဏန်း။</p><p>ပေါင်းလဒ် 10 ထက်ကျော်လျှင် နောက်ဆုံးဂဏန်းတစ်လုံးကိုသာ ယူပါတယ်။ အဲဒီရလာတဲ့ဂဏန်းကို နောက်ဆုံး Row ၏ ယူနစ်ဂဏန်းနဲ့ နှိုင်းယှဉ်ပါတယ်။ တူညီလျှင် အဲဒီ Row ၃ တန်းကို ကိုက်ညီတဲ့ group အဖြစ် သတ်မှတ်ပြီး ဂဏန်းတွေနဲ့ မျဉ်းကြောင်းတွေကို အရောင်တစ်ရောင်တည်းနဲ့ ဖော်ပြပါတယ်။</p><p><strong>Odd:</strong> Row 1–3၊ 5–7၊ 9–11၊ 13–15… (၄ တန်းစီ ရွေ့ပါတယ်။)</p><p><strong>Even:</strong> Row 2–4၊ 6–8၊ 10–12၊ 14–16… (၄ တန်းစီ ရွေ့ပါတယ်။)</p><p>အုပ်စုတစ်ခု ပြည့်စုံရန် Row ၃ တန်းလုံး ရှိရပါမယ်။</p>',
        12: '<p><strong>အုပ်စုတစ်ခုစီမှာ Row ၄ ခုကို အသုံးပြုပါတယ်။</strong></p><p><strong>A:</strong> စတင် Row N ၏ ယူနစ်ဂဏန်း + Row N+4 ၏ ရာဂဏန်း။ ပေါင်းလဒ် 10 ကျော်လျှင် နောက်ဆုံးဂဏန်းကိုယူပါ။</p><p><strong>B:</strong> အလယ် Row N+2 ၏ ရာဂဏန်း + ယူနစ်ဂဏန်း။ ပေါင်းလဒ် 10 ကျော်လျှင် နောက်ဆုံးဂဏန်းကိုယူပါ။</p><p><strong>နုတ်ခြင်း:</strong> A − B ကိုတွက်ပါ။ အဖြေ အနုတ်ဖြစ်လျှင် 10 ဖြင့်ပတ်လည်ယူပြီး နောက်ဆုံးဂဏန်းကိုယူပါ။ ရလာသောဂဏန်းကို Row N+6 ၏ ရာဂဏန်းနှင့် နှိုင်းယှဉ်ပါ။ တူညီလျှင် Match ဖြစ်ပါတယ်။</p><p><strong>Odd:</strong> Row 1, 3, 5, 7… မှ စပါတယ်။ အုပ်စုများမှာ Row 1,3,5,7၊ Row 3,5,7,9၊ Row 5,7,9,11… ဖြစ်ပါတယ်။</p><p><strong>Even:</strong> Row 2, 4, 6, 8… မှ စပါတယ်။ အုပ်စုများမှာ Row 2,4,6,8၊ Row 4,6,8,10၊ Row 6,8,10,12… ဖြစ်ပါတယ်။</p><p>အုပ်စုတစ်ခုစီ၏ စတင် Row ကို ၂ တန်းစီ ရွှေ့ပြီး အရောင်ကို Loop လုပ်ကာ ကိုက်ညီသော အုပ်စုအားလုံးကို ဖော်ပြပါတယ်။</p>',
        14: '<p><strong>အုပ်စုတစ်ခုစီမှာ ဆက်တိုက် Row ၄ တန်းကို အသုံးပြုပါတယ်။</strong></p><p><strong>A ဘက်:</strong> ပထမ Row ၏ ရာဂဏန်း + တတိယ Row ၏ ယူနစ် + စတုတ္ထ Row ၏ ဆယ်ဂဏန်း။</p><p><strong>B ဘက်:</strong> ဒုတိယ Row ၏ ယူနစ် + တတိယ Row ၏ ရာဂဏန်း + စတုတ္ထ Row ၏ ယူနစ်။</p><p>A နှင့် B ကို သီးခြားပေါင်းပြီး တစ်ဘက်စီ၏ နောက်ဆုံးဂဏန်း (% 10) ကိုယူပါတယ်။ နှစ်ဘက်ရလဒ်တူညီလျှင် Match ဖြစ်ပါတယ်။ Match ဖြစ်သောအခါ A ဘက်ရှိ ဂဏန်း ၃ လုံးကို မျဉ်း ၂ ကြောင်းဖြင့် ဆက်ပြီး B ဘက်ရှိ ဂဏန်း ၃ လုံးကိုလည်း မျဉ်း ၂ ကြောင်းဖြင့် သီးခြားဆက်ပါတယ်။ A/B နှစ်ဘက်လုံးကို အရောင်တစ်ရောင်တည်း သုံးပါတယ်။</p><p><strong>Odd:</strong> Row 1–4၊ 2–5၊ 3–6၊ 4–7…</p><p><strong>Even:</strong> Row 2–5၊ 3–6၊ 4–7၊ 5–8…</p><p>Odd သည် Row 1 မှစပြီး Even သည် Row 2 မှစပါတယ်။ နောက်အုပ်စုတစ်ခုစီတွင် စတင် Row ကို ၁ တန်းစီ ရွှေ့ပါတယ်။</p>',
        13: '<p><strong>အုပ်စုတစ်ခုစီမှာ ဆက်တိုက် Row ၃ တန်းကို အသုံးပြုပါတယ်။</strong></p><p><strong>ပေါင်းရမည့်ဂဏန်းများ:</strong> ပထမ Row ၏ ရာဂဏန်း + အလယ် Row ၏ ဆယ်ဂဏန်း + နောက်ဆုံး Row ၏ ဆယ်ဂဏန်း။</p><p>ပေါင်းလဒ် 10 ကျော်လျှင် နောက်ဆုံးဂဏန်းတစ်လုံးကိုသာ ယူပြီး အလယ် Row ၏ ရာဂဏန်းနှင့် နှိုင်းယှဉ်ပါတယ်။ တူညီလျှင် အဲဒီအုပ်စုကို Match အဖြစ် သတ်မှတ်ပြီး ပါဝင်တဲ့ ဂဏန်း ၄ လုံးကို သက်ဆိုင်ရာ အရောင်နဲ့ မျဉ်းကြောင်းချိတ်ပြပါတယ်။</p><p><strong>Odd:</strong> Row 1, 3, 5, 7… မှ စပြီး Row N, N+2 ကို အုပ်စုအမည်အဖြစ် ဖော်ပြပါတယ်။ အလယ် Row N+1 က ပေါင်းချက်ထဲပါဝင်ပြီး စစ်ဆေးမယ့် ရာဂဏန်းလည်း ဖြစ်ပါတယ်။</p><p><strong>Even:</strong> Row 2, 4, 6, 8… မှ စပြီး အလားတူ တွက်ချက်ပါတယ်။</p><p>နောက်အုပ်စုတစ်ခုစီတွင် စတင် Row ကို ၂ တန်းစီ ရွှေ့ပါတယ်။ ကိုက်ညီတဲ့ group တစ်ခုစီကို အရောင် loop ဖြင့် သီးခြားပြသပါတယ်။</p>'
    };
    if (!guides[n]) return '';
    return guides[n] + '<p class="logic-note">မှတ်ချက် — နောက်ဆုံးဂဏန်းယူခြင်းသည် 10 ဖြင့်စားပြီး အကြွင်းယူခြင်း (mod 10) ဖြစ်ပါတယ်။</p>';
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
    html += renderWithArrows(numbers, calcM3(oddNumbers, numbers), 'odd', 'M3 Table - Odd', { eachMatchIsGroup: true, showCalculations: true });
    html += renderWithArrows(numbers, calcM3(evenNumbers, numbers), 'even', 'M3 Table - Even', { eachMatchIsGroup: true, showCalculations: true });
    html += '</div>';
    m3Container.innerHTML = html;
}

function calcM3(subset, all) {
    const results = [];
    for (let i = 0; i < subset.length; i++) {
        const n = subset[i].actualIndex;
        if (n + 2 >= all.length) break;
        const leftDigits = [all[n + 1][1], all[n + 1][2]];
        const rightDigits = [all[n][0], all[n + 1][0], all[n + 2][1]];
        const leftSum = leftDigits.reduce((sum, digit) => sum + parseInt(digit), 0);
        const rightSum = rightDigits.reduce((sum, digit) => sum + parseInt(digit), 0);
        const left = leftSum % 10;
        const right = rightSum % 10;
        const isMatch = left === right;
        results.push({
            isMatch,
            calculation: {
                groupLabel: `Rows ${n + 1}–${n + 3}`,
                leftLabel: 'Tens + Units',
                leftDigits,
                leftSum,
                leftResult: left,
                rightLabel: 'Hundreds + Hundreds + Tens',
                rightDigits,
                rightSum,
                rightResult: right
            },
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
    html += renderWithArrows(numbers, calcM4(oddNumbers, numbers), 'odd', 'M4 Table - Odd', { eachMatchIsGroup: true, showCalculations: true });
    html += renderWithArrows(numbers, calcM4(evenNumbers, numbers), 'even', 'M4 Table - Even', { eachMatchIsGroup: true, showCalculations: true });
    html += '</div>';
    m4Container.innerHTML = html;
}

function calcM4(subset, all) {
    const results = [];
    for (let i = 0; i < subset.length; i++) {
        const n = subset[i].actualIndex;
        if (n + 4 >= all.length) break;
        const leftDigits = [all[n][1], all[n + 1][1], all[n + 2][1]];
        const leftSum = leftDigits.reduce((total, digit) => total + parseInt(digit), 0);
        const rightDigits = [all[n + 4][1]];
        const rightSum = parseInt(all[n + 4][1]);
        const sum = leftSum % 10;
        const isMatch = sum === rightSum;
        results.push({
            isMatch,
            calculation: {
                groupLabel: `Rows ${n + 1}–${n + 5}`,
                leftLabel: 'Tens + Tens + Tens',
                leftDigits,
                leftSum,
                leftResult: sum,
                rightLabel: 'Target Tens',
                rightDigits,
                rightSum,
                rightResult: rightSum
            },
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
    // startIdx 0 = displayed Row 1; startIdx 1 = displayed Row 2.
    // Advance exactly four rows and stop only when a complete group is unavailable.
    for (let start = startIdx; start + 3 < all.length; start += 4) {
        const n = start;
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

// ========== M10 LOGIC ==========
// Each M10 group checks three consecutive rows.
// Odd starts: Row 1, 4, 7, 10...
// Even starts: Row 2, 5, 8, 11...
// Left = Row N tens + Row N+1 hundreds (unit digit only).
// Right = Row N+2 hundreds + Row N+1 units (unit digit only).
function analyzeM10(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(
        numbers,
        calcM10(numbers, 0),
        'odd',
        'M10 Table - Odd (Rows 1, 4, 7...)',
        { eachMatchIsGroup: true, showCalculations: true }
    );
    html += renderWithArrows(
        numbers,
        calcM10(numbers, 1),
        'even',
        'M10 Table - Even (Rows 2, 5, 8...)',
        { eachMatchIsGroup: true, showCalculations: true }
    );
    html += '</div>';
    m10Container.innerHTML = html;
}

function calcM10(all, startIdx) {
    const results = [];
    for (let n = startIdx; n + 2 < all.length; n += 3) {
        const leftDigits = [all[n][1], all[n + 1][0]];
        const rightDigits = [all[n + 2][0], all[n + 1][2]];
        const leftSum = leftDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const rightSum = rightDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const leftResult = leftSum % 10;
        const rightResult = rightSum % 10;
        const isMatch = leftResult === rightResult;

        results.push({
            isMatch,
            calculation: {
                groupLabel: `Rows ${n + 1}–${n + 3}`,
                leftLabel: 'Tens + Hundreds',
                leftDigits,
                leftSum,
                leftResult,
                rightLabel: 'Hundreds + Units',
                rightDigits,
                rightSum,
                rightResult
            },
            highlights: [
                {row: n, digit: 1},
                {row: n + 1, digit: 0},
                {row: n + 1, digit: 2},
                {row: n + 2, digit: 0}
            ],
            arrows: [
                {startRow: n, startDigit: 1, endRow: n + 1, endDigit: 0},
                {startRow: n + 1, startDigit: 2, endRow: n + 2, endDigit: 0}
            ]
        });
    }
    return results;
}



// ========== M14 LOGIC ==========
// Four consecutive rows per group; each next group advances by two rows.
// A = Row N hundred + Row N+2 unit + Row N+3 ten.
// B = Row N+1 unit + Row N+2 hundred + Row N+3 unit.
// Compare A % 10 with B % 10.
function analyzeM14(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(
        numbers, calcM14(numbers, 0), 'odd',
        'M14 Table - Odd (Rows 1–4, 3–6, 5–8...)',
        { eachMatchIsGroup: true, showCalculations: true }
    );
    html += renderWithArrows(
        numbers, calcM14(numbers, 1), 'even',
        'M14 Table - Even (Rows 2–5, 4–7, 6–9...)',
        { eachMatchIsGroup: true, showCalculations: true }
    );
    html += '</div>';
    m14Container.innerHTML = html;
}

function calcM14(all, startIdx) {
    const results = [];
    for (let n = startIdx; n + 3 < all.length; n += 1) {
        const aDigits = [all[n][0], all[n + 2][2], all[n + 3][1]];
        const bDigits = [all[n + 1][2], all[n + 2][0], all[n + 3][2]];
        const aSum = aDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const bSum = bDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const aResult = aSum % 10;
        const bResult = bSum % 10;
        const isMatch = aResult === bResult;

        results.push({
            isMatch,
            calculation: {
                groupLabel: `Rows ${n + 1}–${n + 4}`,
                detailLines: [
                    `A: Row ${n + 1} Hundred ${aDigits[0]} + Row ${n + 3} Unit ${aDigits[1]} + Row ${n + 4} Ten ${aDigits[2]} = ${aSum} → ${aResult}`,
                    `B: Row ${n + 2} Unit ${bDigits[0]} + Row ${n + 3} Hundred ${bDigits[1]} + Row ${n + 4} Unit ${bDigits[2]} = ${bSum} → ${bResult}`,
                    `A ${aResult} ${isMatch ? '=' : '≠'} B ${bResult} → ${isMatch ? 'MATCH' : 'No match'}`
                ],
                leftLabel: 'A', leftDigits: aDigits, leftSum: aSum, leftResult: aResult,
                rightLabel: 'B', rightDigits: bDigits, rightSum: bSum, rightResult: bResult
            },
            highlights: [
                {row: n, digit: 0}, {row: n + 2, digit: 2}, {row: n + 3, digit: 1},
                {row: n + 1, digit: 2}, {row: n + 2, digit: 0}, {row: n + 3, digit: 2}
            ],
            arrows: [
                {startRow: n, startDigit: 0, endRow: n + 2, endDigit: 2},
                {startRow: n + 2, startDigit: 2, endRow: n + 3, endDigit: 1},
                {startRow: n + 1, startDigit: 2, endRow: n + 2, endDigit: 0},
                {startRow: n + 2, startDigit: 0, endRow: n + 3, endDigit: 2}
            ]
        });
    }
    return results;
}


// ========== M15 LOGIC ==========
// A = Row N tens + Row N+1 hundreds.
// B = Row N+2 hundreds + Row N+2 tens.
// Compare A % 10 with B % 10.
// Odd starts at rows 1, 3, 5...; Even starts at rows 2, 4, 6...
// Each next group advances by two rows and shares its endpoint row.
function analyzeM15(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(
        numbers, calcM15(numbers, 0), 'odd',
        'M15 Table - Odd (Rows 1 & 3, 3 & 5, 5 & 7...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += renderWithArrows(
        numbers, calcM15(numbers, 1), 'even',
        'M15 Table - Even (Rows 2 & 4, 4 & 6, 6 & 8...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += '</div>';
    m15Container.innerHTML = html;
}

function calcM15(all, startIdx) {
    const results = [];
    for (let n = startIdx; n + 2 < all.length; n += 2) {
        const aDigits = [all[n][1], all[n + 1][0]];
        const bDigits = [all[n + 2][0], all[n + 2][1]];
        const aSum = aDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const bSum = bDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const aResult = aSum % 10;
        const bResult = bSum % 10;
        const isMatch = aResult === bResult;

        results.push({
            isMatch,
            calculation: {
                groupLabel: `Rows ${n + 1} & ${n + 3} (Middle Row ${n + 2})`,
                detailLines: [
                    `A: Row ${n + 1} Ten ${aDigits[0]} + Row ${n + 2} Hundred ${aDigits[1]} = ${aSum} → ${aResult}`,
                    `B: Row ${n + 3} Hundred ${bDigits[0]} + Row ${n + 3} Ten ${bDigits[1]} = ${bSum} → ${bResult}`,
                    `A ${aResult} ${isMatch ? '=' : '≠'} B ${bResult} → ${isMatch ? 'MATCH' : 'No match'}`
                ],
                leftLabel: 'A',
                leftDigits: aDigits,
                leftSum: aSum,
                leftResult: aResult,
                rightLabel: 'B',
                rightDigits: bDigits,
                rightSum: bSum,
                rightResult: bResult
            },
            highlights: [
                {row: n, digit: 1},
                {row: n + 1, digit: 0},
                {row: n + 2, digit: 0},
                {row: n + 2, digit: 1}
            ],
            arrows: [
                {startRow: n, startDigit: 1, endRow: n + 1, endDigit: 0},
                {startRow: n + 2, startDigit: 0, endRow: n + 2, endDigit: 1}
            ]
        });
    }
    return results;
}


// ========== M16 LOGIC ==========
// Use three consecutive rows per group.
// A = Row N hundred + Row N+1 hundred + Row N+1 unit.
// B = Row N+2 hundred + ten + unit.
// Compare A % 10 with B % 10.
// Odd starts: Rows 1, 3, 5...; Even starts: Rows 2, 4, 6...
// Each next group advances by two rows.
function analyzeM16(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(
        numbers, calcM16(numbers, 0), 'odd',
        'M16 Table - Odd (Rows 1 & 3, 3 & 5, 5 & 7...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += renderWithArrows(
        numbers, calcM16(numbers, 1), 'even',
        'M16 Table - Even (Rows 2 & 4, 4 & 6, 6 & 8...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += '</div>';
    m16Container.innerHTML = html;
}

function calcM16(all, startIdx) {
    const results = [];
    for (let n = startIdx; n + 2 < all.length; n += 2) {
        const aDigits = [all[n][0], all[n + 1][0], all[n + 1][2]];
        const bDigits = [all[n + 2][0], all[n + 2][1], all[n + 2][2]];
        const aSum = aDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const bSum = bDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const aResult = aSum % 10;
        const bResult = bSum % 10;
        const isMatch = aResult === bResult;

        results.push({
            isMatch,
            calculation: {
                groupLabel: `Rows ${n + 1} & ${n + 3} (Middle Row ${n + 2})`,
                detailLines: [
                    `A: Row ${n + 1} Hundred ${aDigits[0]} + Row ${n + 2} Hundred ${aDigits[1]} + Row ${n + 2} Unit ${aDigits[2]} = ${aSum} → ${aResult}`,
                    `B: Row ${n + 3} Hundred ${bDigits[0]} + Ten ${bDigits[1]} + Unit ${bDigits[2]} = ${bSum} → ${bResult}`,
                    `A ${aResult} ${isMatch ? '=' : '≠'} B ${bResult} → ${isMatch ? 'MATCH' : 'No match'}`
                ],
                leftLabel: 'A',
                leftDigits: aDigits,
                leftSum: aSum,
                leftResult: aResult,
                rightLabel: 'B',
                rightDigits: bDigits,
                rightSum: bSum,
                rightResult: bResult
            },
            highlights: [
                {row: n, digit: 0},
                {row: n + 1, digit: 0},
                {row: n + 1, digit: 2},
                {row: n + 2, digit: 0},
                {row: n + 2, digit: 1},
                {row: n + 2, digit: 2}
            ],
            arrows: [
                {startRow: n, startDigit: 0, endRow: n + 1, endDigit: 0},
                {startRow: n + 1, startDigit: 0, endRow: n + 1, endDigit: 2},
                {startRow: n + 2, startDigit: 0, endRow: n + 2, endDigit: 1},
                {startRow: n + 2, startDigit: 1, endRow: n + 2, endDigit: 2}
            ]
        });
    }
    return results;
}


// ========== M17 LOGIC ==========
// Each group uses four consecutive rows.
// Sum = Row N unit + Row N+1 unit + Row N+2 ten.
// Compare sum % 10 with Row N+3 hundred.
// Odd starts: Rows 1, 5, 9, 13...
// Even starts: Rows 2, 6, 10, 14...
// Each next group advances by four rows.
function analyzeM17(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(
        numbers, calcM17(numbers, 0), 'odd',
        'M17 Table - Odd (Rows 1–4, 5–8, 9–12...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += renderWithArrows(
        numbers, calcM17(numbers, 1), 'even',
        'M17 Table - Even (Rows 2–5, 6–9, 10–13...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += '</div>';
    m17Container.innerHTML = html;
}

function calcM17(all, startIdx) {
    const results = [];
    for (let n = startIdx; n + 3 < all.length; n += 4) {
        const sumDigits = [all[n][2], all[n + 1][2], all[n + 2][1]];
        const sum = sumDigits.reduce((total, digit) => total + parseInt(digit, 10), 0);
        const finalDigit = sum % 10;
        const targetDigit = parseInt(all[n + 3][0], 10);
        const isMatch = finalDigit === targetDigit;

        results.push({
            isMatch,
            calculation: {
                groupLabel: `Rows ${n + 1}–${n + 4}`,
                detailLines: [
                    `Row ${n + 1} Unit ${sumDigits[0]} + Row ${n + 2} Unit ${sumDigits[1]} + Row ${n + 3} Ten ${sumDigits[2]} = ${sum} → ${finalDigit}`,
                    `Compare with Row ${n + 4} Hundred ${targetDigit} → ${isMatch ? 'MATCH' : 'No match'}`
                ],
                leftLabel: 'Three digits total',
                leftDigits: sumDigits,
                leftSum: sum,
                leftResult: finalDigit,
                rightLabel: 'Target hundred',
                rightDigits: [all[n + 3][0]],
                rightSum: targetDigit,
                rightResult: targetDigit
            },
            highlights: [
                {row: n, digit: 2},
                {row: n + 1, digit: 2},
                {row: n + 2, digit: 1},
                {row: n + 3, digit: 0}
            ],
            arrows: [
                {startRow: n, startDigit: 2, endRow: n + 1, endDigit: 2},
                {startRow: n + 1, startDigit: 2, endRow: n + 2, endDigit: 1}
            ]
        });
    }
    return results;
}


// ========== M18 LOGIC ==========
// Each group uses four consecutive rows.
// A = Row N hundred + Row N ten + Row N+1 ten.
// B = Row N+1 unit + Row N+2 unit + Row N+3 ten.
// Compare A % 10 with B % 10.
// Odd starts: Rows 1, 5, 9, 13...
// Even starts: Rows 2, 6, 10, 14...
// Each next group advances by four rows.
function analyzeM18(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(
        numbers, calcM18(numbers, 0), 'odd',
        'M18 Table - Odd (Rows 1–4, 5–8, 9–12...)',
        { eachMatchIsGroup: true, showCalculations: true }
    );
    html += renderWithArrows(
        numbers, calcM18(numbers, 1), 'even',
        'M18 Table - Even (Rows 2–5, 6–9, 10–13...)',
        { eachMatchIsGroup: true, showCalculations: true }
    );
    html += '</div>';
    m18Container.innerHTML = html;
}

function calcM18(all, startIdx) {
    const results = [];
    for (let n = startIdx; n + 3 < all.length; n += 4) {
        const aDigits = [all[n][0], all[n][1], all[n + 1][1]];
        const bDigits = [all[n + 1][2], all[n + 2][2], all[n + 3][1]];
        const aSum = aDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const bSum = bDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const aResult = aSum % 10;
        const bResult = bSum % 10;
        const isMatch = aResult === bResult;

        results.push({
            isMatch,
            calculation: {
                groupLabel: `Rows ${n + 1}–${n + 4}`,
                detailLines: [
                    `A: Row ${n + 1} Hundred ${aDigits[0]} + Row ${n + 1} Ten ${aDigits[1]} + Row ${n + 2} Ten ${aDigits[2]} = ${aSum} → ${aResult}`,
                    `B: Row ${n + 2} Unit ${bDigits[0]} + Row ${n + 3} Unit ${bDigits[1]} + Row ${n + 4} Ten ${bDigits[2]} = ${bSum} → ${bResult}`,
                    `A ${aResult} ${isMatch ? '=' : '≠'} B ${bResult} → ${isMatch ? 'MATCH' : 'No match'}`
                ],
                leftLabel: 'A',
                leftDigits: aDigits,
                leftSum: aSum,
                leftResult: aResult,
                rightLabel: 'B',
                rightDigits: bDigits,
                rightSum: bSum,
                rightResult: bResult
            },
            highlights: [
                {row: n, digit: 0},
                {row: n, digit: 1},
                {row: n + 1, digit: 0},
                {row: n + 1, digit: 2},
                {row: n + 2, digit: 2},
                {row: n + 3, digit: 1}
            ],
            arrows: [
                {startRow: n, startDigit: 0, endRow: n, endDigit: 1},
                {startRow: n, startDigit: 1, endRow: n + 1, endDigit: 0},
                {startRow: n + 1, startDigit: 2, endRow: n + 2, endDigit: 2},
                {startRow: n + 2, startDigit: 2, endRow: n + 3, endDigit: 1}
            ]
        });
    }
    return results;
}
