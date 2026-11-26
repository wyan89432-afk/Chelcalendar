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
const m19Container = document.getElementById('m19Container');
const m20Container = document.getElementById('m20Container');
const m21Container = document.getElementById('m21Container');
const m22Container = document.getElementById('m22Container');
const m22NewContainer = document.getElementById('m22NewContainer');
const m23Container = document.getElementById('m23Container');
const m25Container = document.getElementById('m25Container');
const m26Container = document.getElementById('m26Container');
const m27Container = document.getElementById('m27Container');
const m28Container = document.getElementById('m28Container');
const m29Container = document.getElementById('m29Container');
const m30Container = document.getElementById('m30Container');
const m31Container = document.getElementById('m31Container');
const m32Container = document.getElementById('m32Container');
const m33Container = document.getElementById('m33Container');
const m34Container = document.getElementById('m34Container');
const m35Container = document.getElementById('m35Container');
const m36Container = document.getElementById('m36Container');
const m37Container = document.getElementById('m37Container');
const m38Container = document.getElementById('m38Container');
const m39Container = document.getElementById('m39Container');
const m40Container = document.getElementById('m40Container');
const m41Container = document.getElementById('m41Container');
const m42Container = document.getElementById('m42Container');
const m43Container = document.getElementById('m43Container');
const m44Container = document.getElementById('m44Container');
const m45Container = document.getElementById('m45Container');
const m46Container = document.getElementById('m46Container');
const m47Container = document.getElementById('m47Container');
const m48Container = document.getElementById('m48Container');
const m49Container = document.getElementById('m49Container');

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
    analyzeM19(validNumbers);
    analyzeM20(validNumbers);
    analyzeM21(validNumbers);
    analyzeM22(validNumbers);
    analyzeM22New(validNumbers);
    analyzeM23(validNumbers);
    analyzeM25(validNumbers);
    analyzeM26(validNumbers);
    analyzeM27(validNumbers);
    analyzeM28(validNumbers);
    analyzeM29(validNumbers);
    analyzeM30(validNumbers);
    analyzeM31(validNumbers);
    analyzeM32(validNumbers);
    analyzeM33(validNumbers);
    analyzeM34(validNumbers);
    analyzeM35(validNumbers);
    analyzeM36(validNumbers);
    analyzeM37(validNumbers);
    analyzeM38(validNumbers);
    analyzeM39(validNumbers);
    analyzeM40(validNumbers);
    analyzeM41(validNumbers);
    analyzeM42(validNumbers);
    analyzeM43(validNumbers);
    analyzeM44(validNumbers);
    analyzeM45(validNumbers);
    analyzeM46(validNumbers);
    analyzeM47(validNumbers);
    analyzeM48(validNumbers);
    analyzeM49(validNumbers);
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
    const match = title.match(/M(49|48|47|46|45|44|43|42|41|40|39|38|37|36|35|34|33|32|31|30|29|28|27|26|25|23|22-New|22|21|20|19|18|17|16|15|14|13|12|11|10|[1-9])/i);
    if (!match) return '';
    const n = match[1].toLowerCase() === '22-new' ? '22-new' : Number(match[1]);
    const guides = {
        49: '<p><strong>အုပ်စုတစ်ခုစီတွင် Row ၅ တန်းကို အသုံးပြုပြီး နောက်အုပ်စုသို့ စတင် Row ကို ၅ တန်းစီ ရွှေ့ပါတယ်။</strong></p><p><strong>A အုပ်စု:</strong> Row N ၏ ရာဂဏန်း + Row N ၏ ယူနစ်ဂဏန်း + Row N+1 ၏ ရာဂဏန်း။ ပေါင်းလဒ် 10 ကျော်ပါက နောက်ဆုံးယူနစ်ဂဏန်း (% 10) ကိုသာ ယူပါတယ်။</p><p><strong>B အုပ်စု:</strong> Row N+2 ၏ ဆယ်ဂဏန်း + Row N+3 ၏ ဆယ်ဂဏန်း + Row N+4 ၏ ရာဂဏန်း။ ဒီပေါင်းလဒ်လည်း 10 ကျော်ပါက နောက်ဆုံးယူနစ်ဂဏန်း (% 10) ကိုသာ ယူပါတယ်။ A နှင့် B ၏ နောက်ဆုံးဂဏန်းတူညီမှ Match ဖြစ်ပါတယ်။</p><p><strong>ဥပမာ Rows 1–5 (626၊ 481၊ 598၊ 116၊ 690):</strong> A = Row 1 Hundred 6 + Row 1 Unit 6 + Row 2 Hundred 4 = 16 → 6 ဖြစ်ပါတယ်။ B = Row 3 Ten 9 + Row 4 Ten 1 + Row 5 Hundred 6 = 16 → 6 ဖြစ်ပါတယ်။ 6 = 6 ဖြစ်တဲ့အတွက် Match ဖြစ်ပါတယ်။</p><p>Match ဖြစ်ပါက A အုပ်စုရှိ ဂဏန်း ၃ လုံးနှင့် B အုပ်စုရှိ ဂဏန်း ၃ လုံး၊ စုစုပေါင်း ၆ လုံးကို အရောင်တူ Highlight လုပ်ပါတယ်။ အုပ်စုတစ်ခုစီရှိ ဂဏန်း ၃ လုံးကို အချင်းချင်း ချိတ်ဆက်ရန် မျဉ်း ၃ ကြောင်းစီ ဆွဲပြီး A နှင့် B အတွက် စုစုပေါင်း မျဉ်း ၆ ကြောင်း ဖြစ်ပါတယ်။ Match group တစ်ခုစီ၏ အရောင်ကို Loop လုပ်ကာ ပြောင်းလဲသုံးပါတယ်။</p><p><strong>Odd:</strong> Rows 1–5၊ 6–10၊ 11–15၊ 16–20… (စတင် Row 1, 6, 11, 16…)</p><p><strong>Even:</strong> Rows 2–6၊ 7–11၊ 12–16၊ 17–21… (စတင် Row 2, 7, 12, 17…)</p><p>Odd သည် Row 1 မှ၊ Even သည် Row 2 မှ စပါတယ်။ အုပ်စုတစ်ခုကို တွက်ရန် သတ်မှတ်ထားသော Row ၅ တန်းလုံး ရှိရပါမယ်။</p>',
        48: '<p><strong>အုပ်စုစတင် Row မှစ၍ ၃ တန်းစီ ခွဲပါတယ်။ တွက်ချက်ရာတွင် စတင် Row နှင့် နောက်တစ် Row ကိုသာ အသုံးပြုပြီး တတိယ Row ကို မတွက်ပါ။ နောက်ဆုံးအုပ်စုတွင် စတင် Row နှင့် နှိုင်းယှဉ်မည့် နောက်တစ် Row ရှိရုံဖြင့် တွက်ချက်နိုင်ပြီး တတိယ Row မရှိလည်း ရပါတယ်။</strong></p><p><strong>ပေါင်းအုပ်စု:</strong> စတင် Row ၏ ဆယ်ဂဏန်း + စတင် Row ၏ ယူနစ်ဂဏန်း။ ပေါင်းလဒ် 10 ကျော်ပါက နောက်ဆုံးယူနစ်ဂဏန်း (% 10) ကိုသာ ယူပါတယ်။</p><p><strong>နှိုင်းယှဉ်အုပ်စု:</strong> နောက်တစ်တန်း၏ ယူနစ်ဂဏန်း တစ်လုံးတည်းကို ယူပါတယ်။ ပထမပေါင်းလဒ်၏ နောက်ဆုံးဂဏန်းနှင့် တူညီပါက Match ဖြစ်ပါတယ်။ တစ်လုံးတည်းအုပ်စုကို မျဉ်းမဆွဲပါ။</p><p><strong>ဥပမာ Rows 1–3 (221၊ 843၊ 863):</strong> Row 1 Ten 2 + Row 1 Unit 1 = 3 ဖြစ်ပါတယ်။ Row 2 Unit 3 ဖြစ်တဲ့အတွက် 3 = 3၊ Match ဖြစ်ပါတယ်။ Row 3 ကို မတွက်ပါ။</p><p>Match ဖြစ်ပါက စတင် Row ၏ ဆယ်ဂဏန်းနှင့် ယူနစ်ဂဏန်း ၂ လုံး၊ နှိုင်းယှဉ်ထားသော နောက် Row ၏ ယူနစ်ဂဏန်း ၁ လုံး စုစုပေါင်း ၃ လုံးကို Highlight လုပ်ပါတယ်။ မျဉ်းကို စတင် Row ရှိ ပေါင်းထားသော ဂဏန်း ၂ လုံးကြားတွင်သာ ဆွဲပါတယ်။ နှိုင်းယှဉ်ဂဏန်းကို မျဉ်းဖြင့် မချိတ်ပါ။ အရောင်ကို Match အုပ်စုတစ်ခုစီအလိုက် Loop လုပ်ပါတယ်။</p><p><strong>Odd:</strong> Rows 1–3၊ 4–6၊ 7–9၊ 10–12… (တွက်ချက်မှုစတင် Row 1, 4, 7, 10…)</p><p><strong>Even:</strong> Rows 2–4၊ 5–7၊ 8–10၊ 11–13… (တွက်ချက်မှုစတင် Row 2, 5, 8, 11…)</p>',
        47: '<p><strong>အုပ်စုတစ်ခုစီတွင် Row N၊ Row N+1၊ Row N+2 ဟူသော Row ၃ တန်းကို အသုံးပြုပြီး နောက်အုပ်စုသို့ စတင် Row ကို ၃ တန်းစီ ရွှေ့ပါတယ်။</strong></p><p><strong>A အုပ်စု:</strong> Row N ၏ ရာဂဏန်း + Row N+1 ၏ ဆယ်ဂဏန်း + Row N+2 ၏ ရာဂဏန်း။ ပေါင်းလဒ် 10 ကျော်ပါက နောက်ဆုံးယူနစ်ဂဏန်း (% 10) ကိုသာ ယူပါတယ်။</p><p><strong>B အုပ်စု:</strong> Row N ၏ ဆယ်ဂဏန်း + Row N+1 ၏ ရာဂဏန်း + Row N+2 ၏ ဆယ်ဂဏန်း။ ဒီပေါင်းလဒ်လည်း 10 ကျော်ပါက နောက်ဆုံးယူနစ်ဂဏန်း (% 10) ကိုသာ ယူပါတယ်။ A နှင့် B ၏ နောက်ဆုံးဂဏန်းတူညီမှ Match ဖြစ်ပါတယ်။</p><p><strong>ဥပမာ Rows 1–3 (044၊ 221၊ 843):</strong> A = Row 1 Hundred 0 + Row 2 Ten 2 + Row 3 Hundred 8 = 10 → 0 ဖြစ်ပါတယ်။ B = Row 1 Ten 4 + Row 2 Hundred 2 + Row 3 Ten 4 = 10 → 0 ဖြစ်လို့ 0 = 0၊ Match ဖြစ်ပါတယ်။</p><p>Match ဖြစ်ပါက A အုပ်စုရှိ ဂဏန်း ၃ လုံးကို ဒေါင်လိုက်မျဉ်းမပါဘဲ စောင်းမျဉ်း ၂ ကြောင်းဖြင့် ချိတ်ပါတယ်။ B အုပ်စုရှိ ဂဏန်း ၃ လုံးကိုလည်း ဒေါင်လိုက်မျဉ်းမပါဘဲ စောင်းမျဉ်း ၂ ကြောင်းဖြင့် ချိတ်ပါတယ်။ စုစုပေါင်း စောင်းမျဉ်း ၄ ကြောင်းသာ ဖြစ်ပါတယ်။ အသုံးပြုထားသော ဂဏန်း ၆ လုံးလုံးကို အရောင်တူ Highlight လုပ်ပြီး အုပ်စုတစ်ခုစီ၏ အရောင်ကို Loop လုပ်ကာ ပြောင်းလဲသုံးပါတယ်။</p><p><strong>Odd:</strong> Rows 1–3၊ 4–6၊ 7–9၊ 10–12၊ 13–15… (စတင် Row 1, 4, 7, 10, 13…)</p><p><strong>Even:</strong> Rows 2–4၊ 5–7၊ 8–10၊ 11–13၊ 14–16… (စတင် Row 2, 5, 8, 11, 14…)</p><p>Odd သည် Row 1 မှ၊ Even သည် Row 2 မှ စပါတယ်။ နောက် group တစ်ခုစီတွင် စတင် Row ကို ၃ တန်းစီ ရွှေ့ပါတယ်။ Group တစ်ခုတွက်ရန် Row ၃ တန်းလုံး ရှိရပါမယ်။</p>',
        46: '<p><strong>အုပ်စုတစ်ခုစီတွင် Row N၊ Row N+1၊ Row N+2 ဟူသော Row ၃ တန်းကို အသုံးပြုပြီး နောက်အုပ်စုသို့ စတင် Row ကို ၂ တန်းစီ ရွှေ့ပါတယ်။</strong></p><p><strong>A အုပ်စု:</strong> Row N ၏ ဆယ်ဂဏန်း + Row N+2 ၏ ရာဂဏန်း။ ပေါင်းလဒ် 10 ကျော်ပါက နောက်ဆုံးယူနစ်ဂဏန်း (% 10) ကိုသာ ယူပါတယ်။</p><p><strong>နှိုင်းယှဉ်ရန်:</strong> A ၏ နောက်ဆုံးဂဏန်းကို Row N+1 ၏ ဆယ်ဂဏန်းနှင့် နှိုင်းယှဉ်ပါတယ်။ တူညီမှသာ Match ဖြစ်ပါတယ်။ ဥပမာ Rows 1–3 (665၊ 962၊ 044) တွင် A = Row 1 Ten 6 + Row 3 Hundred 0 = 6 ဖြစ်ပြီး Row 2 Ten သည် 6 ဖြစ်သောကြောင့် 6 = 6၊ Match ဖြစ်ပါတယ်။</p><p>Match ဖြစ်ပါက A အုပ်စုရှိ ဂဏန်း ၂ လုံး (Row N Ten နှင့် Row N+2 Hundred) ကို မျဉ်း ၁ ကြောင်းဖြင့် ဆက်ပါတယ်။ နှိုင်းယှဉ်ရန်အသုံးပြုသော Row N+1 Ten သည် ဂဏန်းတစ်လုံးတည်းဖြစ်သောကြောင့် Highlight သာလုပ်ပြီး မျဉ်းမဆွဲပါ။ ဂဏန်း ၃ လုံးလုံးကို အရောင်တူ Highlight လုပ်ပြီး အုပ်စုတစ်ခုစီ၏ အရောင်ကို Loop လုပ်ကာ ပြောင်းလဲသုံးပါတယ်။</p><p><strong>Odd:</strong> Row 1–3၊ Row 3–5၊ Row 5–7၊ Row 7–9၊ Row 9–11… (စတင် Row 1, 3, 5, 7, 9…)</p><p><strong>Even:</strong> Row 2–4၊ Row 4–6၊ Row 6–8၊ Row 8–10၊ Row 10–12… (စတင် Row 2, 4, 6, 8, 10…)</p><p>Odd သည် Row 1 မှ၊ Even သည် Row 2 မှ စပါတယ်။ နောက် group တစ်ခုစီတွင် စတင် Row ကို ၂ တန်းစီ ရွှေ့ပါတယ်။ Group တစ်ခုတွက်ရန် Row ၃ တန်းလုံး ရှိရပါမယ်။',
        45: '<p><strong>အုပ်စုတစ်ခုစီတွင် Row N၊ Row N+1၊ Row N+2 ဟူသော Row ၃ တန်းကို အသုံးပြုပြီး နောက်အုပ်စုသို့ စတင် Row ကို ၃ တန်းစီ ရွှေ့ပါတယ်။</strong></p><p><strong>A အုပ်စု:</strong> Row N ၏ ဆယ်ဂဏန်း + Row N ၏ ယူနစ်ဂဏန်း။ ပေါင်းလဒ် 10 ကျော်ပါက နောက်ဆုံးယူနစ်ဂဏန်း (% 10) ကိုသာ ယူပါတယ်။</p><p><strong>B အုပ်စု:</strong> Row N+1 ၏ ရာဂဏန်း + Row N+1 ၏ ဆယ်ဂဏန်း + Row N+2 ၏ ဆယ်ဂဏန်း။ ဒီပေါင်းလဒ်လည်း 10 ကျော်ပါက နောက်ဆုံးယူနစ်ဂဏန်း (% 10) ကိုသာ ယူပါတယ်။ A နှင့် B ၏ နောက်ဆုံးဂဏန်းတူညီမှ Match ဖြစ်ပါတယ်။</p><p><strong>ဥပမာ Rows 1–3 (662၊ 665၊ 962):</strong> A = Row 1 Ten 6 + Row 1 Unit 2 = 8 ဖြစ်ပါတယ်။ B = Row 2 Hundred 6 + Row 2 Ten 6 + Row 3 Ten 6 = 18 → 8 ဖြစ်လို့ 8 = 8၊ Match ဖြစ်ပါတယ်။</p><p>Match ဖြစ်ပါက A အုပ်စုရှိ ဂဏန်း ၂ လုံးကို မျဉ်း ၁ ကြောင်းဖြင့် ဆက်ပါတယ်။ B အုပ်စုရှိ ဂဏန်း ၃ လုံးကို မျဉ်း ၂ ကြောင်းဖြင့် ဆက်ပါတယ်။ စုစုပေါင်း မျဉ်း ၃ ကြောင်း ဖြစ်ပါတယ်။ အသုံးပြုထားသော ဂဏန်း ၅ လုံးလုံးကို အရောင်တူ Highlight လုပ်ပြီး Group တစ်ခုစီ၏ အရောင်ကို Loop လုပ်ကာ ပြောင်းလဲသုံးပါတယ်။</p><p><strong>Odd:</strong> Row 1–3၊ Row 4–6၊ Row 7–9၊ Row 10–12၊ Row 13–15… (စတင် Row 1, 4, 7, 10, 13…)</p><p><strong>Even:</strong> Row 2–4၊ Row 5–7၊ Row 8–10၊ Row 11–13၊ Row 14–16… (စတင် Row 2, 5, 8, 11, 14…)</p><p>Odd သည် Row 1 မှ၊ Even သည် Row 2 မှ စပါတယ်။ နောက် group တစ်ခုစီတွင် စတင် Row ကို ၃ တန်းစီ ရွှေ့ပါတယ်။ Group တစ်ခုတွက်ရန် Row ၃ တန်းလုံး ရှိရပါမယ်။',
        44: '<p><strong>အုပ်စုတစ်ခုစီတွင် Row N၊ Row N+1၊ Row N+2 ဟူသော Row ၃ တန်းကို အသုံးပြုပြီး နောက်အုပ်စုသို့ စတင် Row ကို ၃ တန်းစီ ရွှေ့ပါတယ်။</strong></p><p><strong>A အုပ်စု:</strong> Row N ၏ ယူနစ်ဂဏန်း + Row N+1 ၏ ယူနစ်ဂဏန်း။ ပေါင်းလဒ် 10 ကျော်ပါက နောက်ဆုံးယူနစ်ဂဏန်း (% 10) ကိုသာ ယူပါတယ်။</p><p><strong>B အုပ်စု:</strong> Row N ၏ ဆယ်ဂဏန်း + Row N+2 ၏ ရာဂဏန်း + Row N+2 ၏ ယူနစ်ဂဏန်း။ ဒီပေါင်းလဒ်လည်း 10 ကျော်ပါက နောက်ဆုံးယူနစ်ဂဏန်း (% 10) ကိုသာ ယူပါတယ်။ A နှင့် B ၏ နောက်ဆုံးဂဏန်းတူညီမှ Match ဖြစ်ပါတယ်။</p><p><strong>ဥပမာ Rows 1–3 (662၊ 665၊ 962):</strong> A = Row 1 Unit 2 + Row 2 Unit 5 = 7 ဖြစ်ပါတယ်။ B = Row 1 Ten 6 + Row 3 Hundred 9 + Row 3 Unit 2 = 17 → 7 ဖြစ်လို့ 7 = 7၊ Match ဖြစ်ပါတယ်။</p><p>Match ဖြစ်ပါက A အုပ်စုရှိ ဂဏန်း ၂ လုံးကို မျဉ်း ၁ ကြောင်းဖြင့် ဆက်ပါတယ်။ B အုပ်စုရှိ ဂဏန်း ၃ လုံးကို မျဉ်း ၂ ကြောင်းဖြင့် ဆက်ပါတယ်။ စုစုပေါင်း မျဉ်း ၃ ကြောင်း ဖြစ်ပါတယ်။ အသုံးပြုထားသော ဂဏန်း ၅ လုံးလုံးကို အရောင်တူ Highlight လုပ်ပြီး Group တစ်ခုစီ၏ အရောင်ကို Loop လုပ်ကာ ပြောင်းလဲသုံးပါတယ်။</p><p><strong>Odd:</strong> Row 1–3၊ Row 4–6၊ Row 7–9၊ Row 10–12၊ Row 13–15… (စတင် Row 1, 4, 7, 10, 13…)</p><p><strong>Even:</strong> Row 2–4၊ Row 5–7၊ Row 8–10၊ Row 11–13၊ Row 14–16… (စတင် Row 2, 5, 8, 11, 14…)</p><p>Odd သည် Row 1 မှ၊ Even သည် Row 2 မှ စပါတယ်။ နောက် group တစ်ခုစီတွင် စတင် Row ကို ၃ တန်းစီ ရွှေ့ပါတယ်။ Group တစ်ခုတွက်ရန် Row ၃ တန်းလုံး ရှိရပါမယ်။',
        43: '<p><strong>အုပ်စုတစ်ခုစီတွင် Row N နှင့် Row N+1 ဟူသော Row ၂ တန်းကို အသုံးပြုပါတယ်။ နောက်အုပ်စုသို့ စတင် Row ကို ၅ တန်းစီ ရွှေ့ပါတယ်။</strong></p><p><strong>A အုပ်စု:</strong> Row N ၏ ဆယ်ဂဏန်း + Row N ၏ ယူနစ်ဂဏန်း + Row N+1 ၏ ရာဂဏန်း။ ပေါင်းလဒ် 10 ကျော်ပါက နောက်ဆုံးယူနစ်ဂဏန်း (% 10) ကိုသာ ယူပါတယ်။</p><p><strong>B အုပ်စု:</strong> Row N+1 ၏ ဆယ်ဂဏန်း + Row N+1 ၏ ယူနစ်ဂဏန်း။ ဒီပေါင်းလဒ်လည်း 10 ကျော်ပါက နောက်ဆုံးယူနစ်ဂဏန်း (% 10) ကိုသာ ယူပါတယ်။ A နှင့် B ၏ နောက်ဆုံးဂဏန်းတူညီမှ Match ဖြစ်ပါတယ်။</p><p><strong>ဥပမာ Rows 1–2 (041၊ 867):</strong> A = Row 1 Ten 4 + Row 1 Unit 1 + Row 2 Hundred 8 = 13 → 3 ဖြစ်ပါတယ်။ B = Row 2 Ten 6 + Row 2 Unit 7 = 13 → 3 ဖြစ်လို့ 3 = 3၊ Match ဖြစ်ပါတယ်။</p><p>Match ဖြစ်ပါက A အုပ်စုရှိ ဂဏန်း ၃ လုံးကို မျဉ်း ၂ ကြောင်းဖြင့် အစဉ်လိုက် ဆက်ပါတယ်။ B အုပ်စုရှိ ဂဏန်း ၂ လုံးကို မျဉ်း ၁ ကြောင်းဖြင့် ဆက်ပါတယ်။ စုစုပေါင်း မျဉ်း ၃ ကြောင်း ဖြစ်ပါတယ်။ အသုံးပြုထားသော ဂဏန်း ၅ လုံးလုံးကို အရောင်တူ Highlight လုပ်ပြီး Group တစ်ခုစီ၏ အရောင်ကို Loop လုပ်ကာ ပြောင်းလဲသုံးပါတယ်။</p><p><strong>Odd:</strong> Row 1 နှင့် 2၊ Row 6 နှင့် 7၊ Row 11 နှင့် 12၊ Row 16 နှင့် 17… (စတင် Row 1, 6, 11, 16…)</p><p><strong>Even:</strong> Row 2 နှင့် 3၊ Row 7 နှင့် 8၊ Row 12 နှင့် 13၊ Row 17 နှင့် 18… (စတင် Row 2, 7, 12, 17…)</p><p>Odd သည် Row 1 မှ၊ Even သည် Row 2 မှ စပါတယ်။ နောက် group တစ်ခုစီတွင် စတင် Row ကို ၅ တန်းစီ ရွှေ့ပါတယ်။ Row ၂ တန်းလုံး ရှိမှသာ အုပ်စုတစ်ခုကို တွက်ချက်နိုင်ပါတယ်။',
        42: '<p><strong>အုပ်စုတစ်ခုစီတွင် Row N၊ Row N+1၊ Row N+2 ဟူသော Row ၃ တန်းကို အသုံးပြုပြီး နောက်အုပ်စုသို့ စတင် Row ကို ၃ တန်းစီ ရွှေ့ပါတယ်။</strong></p><p><strong>ပေါင်းရမည့် ဂဏန်း ၃ လုံး:</strong> Row N ၏ ယူနစ်ဂဏန်း + Row N+1 ၏ ယူနစ်ဂဏန်း + Row N+2 ၏ ရာဂဏန်း။ ပေါင်းလဒ် 10 ကျော်ပါက နောက်ဆုံးယူနစ်ဂဏန်း (% 10) ကိုသာ ယူပါတယ်။</p><p><strong>နှိုင်းယှဉ်ရန်:</strong> ပေါင်းလဒ်၏ နောက်ဆုံးဂဏန်းကို Row N ၏ ဆယ်ဂဏန်းနှင့် နှိုင်းယှဉ်ပါတယ်။ တူညီမှသာ Match ဖြစ်ပါတယ်။ ဥပမာ Rows 1–3 တွင် Row 1 Unit 6 + Row 2 Unit 1 + Row 3 Hundred 5 = 12 → 2 ဖြစ်ပြီး Row 1 Ten သည် 2 ဖြစ်သောကြောင့် 2 = 2၊ Match ဖြစ်ပါတယ်။</p><p>Match ဖြစ်ပါက ပေါင်းတွက်ထားသော ဂဏန်း ၃ လုံး (Row N Unit၊ Row N+1 Unit၊ Row N+2 Hundred) ကိုသာ မျဉ်း ၂ ကြောင်းဖြင့် အစဉ်လိုက် ဆက်ပြပါတယ်။ Target ဖြစ်သော Row N Ten သည် သီးခြားဂဏန်းတစ်လုံးဖြစ်သောကြောင့် Highlight သာလုပ်ပြီး မျဉ်းမဆွဲပါ။ အသုံးပြုထားသော ဂဏန်း ၄ လုံးလုံးကို အရောင်တူ Highlight လုပ်ပြီး အုပ်စုတစ်ခုစီအတွက် အရောင်များကို Loop လုပ်ကာ ပြောင်းလဲသုံးပါတယ်။</p><p><strong>Odd:</strong> Row 1–3၊ Row 4–6၊ Row 7–9၊ Row 10–12၊ Row 13–15… (စတင် Row 1, 4, 7, 10, 13…)</p><p><strong>Even:</strong> Row 2–4၊ Row 5–7၊ Row 8–10၊ Row 11–13၊ Row 14–16… (စတင် Row 2, 5, 8, 11, 14…)</p><p>Odd သည် Row 1 မှ၊ Even သည် Row 2 မှ စပါတယ်။ နောက် group တစ်ခုစီတွင် စတင် Row ကို ၃ တန်းစီ ရွှေ့ပါတယ်။ Group တစ်ခုတွက်ရန် Row ၃ တန်းလုံး ရှိရပါမယ်။</p>',
        41: '<p><strong>အုပ်စုတစ်ခုစီတွင် Row N မှ Row N+2 အထိ Row ၃ တန်းကို အသုံးပြုပြီး နောက်အုပ်စုသို့ စတင် Row ကို ၂ တန်းစီ ရွှေ့ပါတယ်။</strong></p><p><strong>A အုပ်စု:</strong> Row N ၏ ဆယ်ဂဏန်း + Row N+1 ၏ ဆယ်ဂဏန်း + Row N+2 ၏ ယူနစ်ဂဏန်း။ ပေါင်းလဒ် 10 ကျော်ပါက နောက်ဆုံးယူနစ်ဂဏန်း (% 10) ကိုသာ ယူပါတယ်။</p><p><strong>B အုပ်စု:</strong> Row N+2 ၏ ရာဂဏန်း + ထို Row N+2 ၏ ဆယ်ဂဏန်း။ ဒီပေါင်းလဒ်လည်း 10 ကျော်ပါက နောက်ဆုံးယူနစ်ဂဏန်း (% 10) ကိုသာ ယူပါတယ်။ A နှင့် B ၏ နောက်ဆုံးဂဏန်းတူညီမှ Match ဖြစ်ပါတယ်။</p><p><strong>ဥပမာ Rows 1–3:</strong> A = Row 1 Ten 0 + Row 2 Ten 0 + Row 3 Unit 6 = 6 ဖြစ်ပါတယ်။ B = Row 3 Hundred 3 + Row 3 Ten 3 = 6 ဖြစ်လို့ 6 = 6၊ Match ဖြစ်ပါတယ်။</p><p>Match ဖြစ်ပါက A အုပ်စုရှိ ဂဏန်း ၃ လုံးကို ဆက်တိုက် မျဉ်း ၂ ကြောင်းဖြင့် ချိတ်ပြီး B အုပ်စုရှိ ဂဏန်း ၂ လုံးကို မျဉ်း ၁ ကြောင်းဖြင့် ချိတ်ပါတယ်။ စုစုပေါင်း မျဉ်း ၃ ကြောင်း ဖြစ်ပါတယ်။ အသုံးပြုထားသော ဂဏန်း ၅ လုံးလုံးကို အရောင်တူ Highlight လုပ်ပြီး အုပ်စုတစ်ခုစီအတွက် အရောင်များကို Loop လုပ်ကာ ပြောင်းလဲသုံးပါတယ်။ အုပ်စုများ ထပ်နေသော ဂဏန်းများတွင် သက်ဆိုင်ရာ အရောင်များကို ပေါင်းစပ်ပြသပါတယ်။</p><p><strong>Odd:</strong> Row 1–3၊ Row 3–5၊ Row 5–7၊ Row 7–9… (စတင် Row 1, 3, 5, 7…)</p><p><strong>Even:</strong> Row 2–4၊ Row 4–6၊ Row 6–8၊ Row 8–10… (စတင် Row 2, 4, 6, 8…)</p><p>Odd သည် Row 1 မှ၊ Even သည် Row 2 မှ စပြီး နောက် group တစ်ခုစီတွင် စတင် Row ကို ၂ တန်းစီ ရွှေ့ပါတယ်။ Row ၃ တန်းလုံး ရှိမှသာ အုပ်စုတစ်ခုကို တွက်ချက်နိုင်ပါတယ်။</p>',
        40: '<p><strong>အုပ်စုတစ်ခုစီတွင် Row N မှ Row N+4 အထိ ၅ တန်းအတွင်းရှိ သတ်မှတ်ထားသော ဂဏန်း ၃ လုံးကို စစ်ဆေးပါတယ်။ နောက် group တစ်ခုစီတွင် စတင် Row ကို ၁ တန်းစီ ရွှေ့ပါတယ်။</strong></p><p><strong>Target:</strong> စတင် Row N ၏ ယူနစ်ဂဏန်း။ ဥပမာ Row 1 = 962 တွင် Target သည် Unit 2 ဖြစ်ပါတယ်။</p><p><strong>ပေါင်းရမည့် ဂဏန်း ၂ လုံး:</strong> Row N+1 ၏ ဆယ်ဂဏန်း + Row N+4 ၏ ရာဂဏန်း။ ပေါင်းလဒ် 10 ကျော်ပါက နောက်ဆုံးယူနစ်ဂဏန်း (% 10) ကိုသာ ယူပါတယ်။</p><p><strong>Match စစ်ဆေးခြင်း:</strong> ပေါင်းလဒ်၏ နောက်ဆုံးဂဏန်းကို Row N ၏ Unit Target နှင့် နှိုင်းယှဉ်ပါတယ်။ ဥပမာ Row 1 Unit 2 ကို Target ယူပြီး Row 2 Ten 4 + Row 5 Hundred 8 = 12 → 2 ဖြစ်သောကြောင့် Match ဖြစ်ပါတယ်။</p><p>Match ဖြစ်ပါက ပေါင်းရာတွင် အသုံးပြုသော Row N+1 Ten နှင့် Row N+4 Hundred နှစ်လုံးကို မျဉ်း ၁ ကြောင်းဖြင့် ဆက်ပါတယ်။ Row N Unit Target ကို မျဉ်းမဆွဲဘဲ အရောင်တူ Highlight လုပ်ပါတယ်။ အုပ်စုတစ်ခုစီ၏ အရောင်ကို Loop လုပ်ပြီး ပြောင်းလဲသုံးပါတယ်။ Group များ ထပ်နေပါက Highlight အရောင်များကိုလည်း သက်ဆိုင်သလို ပေါင်းစပ်ပြသပါတယ်။</p><p><strong>Odd:</strong> Row 1 နှင့် Row 5၊ Row 2 နှင့် Row 6၊ Row 3 နှင့် Row 7၊ Row 4 နှင့် Row 8… ဟု စတင် Row ကို ၁ တန်းစီ ရွှေ့ပြီး တွက်ပါတယ်။</p><p><strong>Even:</strong> Row 2 နှင့် Row 6၊ Row 3 နှင့် Row 7၊ Row 4 နှင့် Row 8၊ Row 5 နှင့် Row 9… ဟု စတင် Row ကို ၁ တန်းစီ ရွှေ့ပြီး တွက်ပါတယ်။</p><p>Odd သည် Row 1 မှ စတင်ပြီး Even သည် Row 2 မှ စတင်ပါတယ်။ Group တစ်ခုတွက်ရန် စတင် Row မှ Row ၄ တန်းနောက်အထိ စုစုပေါင်း ၅ တန်း ရှိရပါမယ်။</p>',
        39: '<p><strong>အုပ်စုတစ်ခုစီတွင် ဆက်တိုက် Row ၄ တန်း (N, N+1, N+2, N+3) ကို အသုံးပြုပြီး နောက်အုပ်စုသို့ စတင် Row ကို ၄ တန်းစီ ရွှေ့ပါတယ်။</strong></p><p><strong>ပေါင်းရမည့် ဂဏန်း ၃ လုံး:</strong> Row N ၏ ဆယ်ဂဏန်း + Row N ၏ ယူနစ်ဂဏန်း + Row N+2 ၏ ယူနစ်ဂဏန်း။ ပေါင်းလဒ် 10 ကျော်ပါက နောက်ဆုံးယူနစ်ဂဏန်း (% 10) ကိုသာ ယူပါတယ်။</p><p><strong>နှိုင်းယှဉ်ရန်:</strong> ပေါင်းလဒ်၏ နောက်ဆုံးဂဏန်းကို Row N+3 ၏ ယူနစ်ဂဏန်းနှင့် နှိုင်းယှဉ်ပါတယ်။ တူညီလျှင် Match ဖြစ်ပါတယ်။ ဥပမာ Rows 1–4 တွင် Row 1 Ten 2 + Row 1 Unit 6 + Row 3 Unit 8 = 16 → 6 ဖြစ်ပြီး Row 4 Unit 6 နှင့် တူသောကြောင့် Match ဖြစ်ပါတယ်။</p><p>Match ဖြစ်ပါက ပေါင်းရာတွင် အသုံးပြုသော ဂဏန်း ၃ လုံးကို မျဉ်း ၃ ကြောင်းဖြင့် ချိတ်ဆက်ပြီး အရောင်တူ Highlight လုပ်ပါတယ်။ Row N+3 ၏ ယူနစ်ဂဏန်း Target ကို မျဉ်းမဆက်ဘဲ အရောင်တူ Highlight လုပ်ပါတယ်။ Group တစ်ခုစီ၏ အရောင်ကို Loop လုပ်ကာ ပြောင်းလဲသုံးပါတယ်။</p><p><strong>Odd:</strong> Row 1–4၊ Row 5–8၊ Row 9–12၊ Row 13–16… (စတင် Row 1, 5, 9, 13…)</p><p><strong>Even:</strong> Row 2–5၊ Row 6–9၊ Row 10–13၊ Row 14–17… (စတင် Row 2, 6, 10, 14…)</p><p>Odd သည် Row 1 မှစပြီး Even သည် Row 2 မှ စပါတယ်။ နောက်အုပ်စုတစ်ခုစီတွင် စတင် Row ကို ၄ တန်းစီ ရွှေ့ပါတယ်။ Group တစ်ခုတွက်ရန် Row ၄ တန်းလုံး ရှိရပါမယ်။</p>',
        38: '<p><strong>အုပ်စုတစ်ခုစီတွင် Row ၃ တန်း (N, N+1, N+2) ကို အသုံးပြုပြီး နောက်အုပ်စု၏ စတင် Row ကို ၄ တန်းစီ ရွှေ့ပါတယ်။</strong></p><p><strong>A အုပ်စု:</strong> Row N ၏ ယူနစ်ဂဏန်း + Row N+1 ၏ ယူနစ်ဂဏန်း။ ပေါင်းလဒ် 10 ကျော်ပါက နောက်ဆုံးယူနစ်ဂဏန်း (% 10) ကိုသာ ယူပါတယ်။</p><p><strong>B အုပ်စု:</strong> Row N ၏ ဆယ်ဂဏန်း + Row N+1 ၏ ရာဂဏန်း + Row N+2 ၏ ယူနစ်ဂဏန်း။ ပေါင်းလဒ် 10 ကျော်ပါက နောက်ဆုံးယူနစ်ဂဏန်း (% 10) ကိုသာ ယူပါတယ်။</p><p><strong>Match စစ်ဆေးခြင်း:</strong> A နှင့် B ၏ နောက်ဆုံးဂဏန်း တူညီလျှင် Match ဖြစ်ပါတယ်။ ဥပမာ Rows 1–3 တွင် A = Row 1 Unit 1 + Row 2 Unit 8 = 9 ဖြစ်ပြီး B = Row 1 Ten 8 + Row 2 Hundred 5 + Row 3 Unit 6 = 19 → 9 ဖြစ်တာကြောင့် 9 = 9၊ Match ဖြစ်ပါတယ်။</p><p>Match ဖြစ်ပါက A အုပ်စုရှိ ဂဏန်း ၂ လုံးကို မျဉ်း ၁ ကြောင်း၊ B အုပ်စုရှိ ဂဏန်း ၃ လုံးကို မျဉ်း ၂ ကြောင်းဖြင့် ဆက်ပြပါတယ်။ စုစုပေါင်း မျဉ်း ၃ ကြောင်း ဖြစ်ပါတယ်။ အသုံးပြုထားတဲ့ ဂဏန်း ၅ လုံးလုံးကို အရောင်တူ Highlight လုပ်ပြီး group တစ်ခုစီအတွက် အရောင်များကို Loop လုပ်ကာ သုံးပါတယ်။</p><p><strong>Odd:</strong> Row 1–3၊ Row 5–7၊ Row 9–11၊ Row 13–15… (စတင် Row 1, 5, 9, 13…)</p><p><strong>Even:</strong> Row 2–4၊ Row 6–8၊ Row 10–12၊ Row 14–16… (စတင် Row 2, 6, 10, 14…)</p><p>Odd သည် Row 1 မှစပြီး Even သည် Row 2 မှ စပါတယ်။ နောက်အုပ်စုတစ်ခုစီတွင် စတင် Row ကို ၄ တန်းစီ ရွှေ့ပါတယ်။ Group တစ်ခုတွက်ရန် Row ၃ တန်းလုံး ရှိရပါမယ်။</p>',
        37: '<p><strong>အုပ်စုတစ်ခုစီတွင် ဆက်တိုက် Row ၄ တန်း (N, N+1, N+2, N+3) ကို အသုံးပြုပြီး နောက်အုပ်စုသို့ စတင် Row ကို ၄ တန်းစီ ရွှေ့ပါတယ်။</strong></p><p><strong>A အုပ်စု:</strong> Row N ၏ ရာဂဏန်း + Row N+1 ၏ ဆယ်ဂဏန်း။ ပေါင်းလဒ် 10 ကျော်ပါက နောက်ဆုံးယူနစ်ဂဏန်း (% 10) ကိုသာ ယူပါတယ်။</p><p><strong>B အုပ်စု:</strong> Row N ၏ ဆယ်ဂဏန်း + Row N+2 ၏ ယူနစ်ဂဏန်း + Row N+3 ၏ ဆယ်ဂဏန်း။ ပေါင်းလဒ် 10 ကျော်ပါက နောက်ဆုံးယူနစ်ဂဏန်း (% 10) ကိုသာ ယူပါတယ်။</p><p><strong>Match စစ်ဆေးခြင်း:</strong> A နှင့် B ၏ နောက်ဆုံးဂဏန်း ၂ လုံး တူညီလျှင် Match ဖြစ်ပါတယ်။ ဥပမာ Rows 1–4 တွင် A = Row 1 Hundred 4 + Row 2 Ten 9 = 13 → 3 ဖြစ်ပြီး B = Row 1 Ten 8 + Row 3 Unit 6 + Row 4 Ten 9 = 23 → 3 ဖြစ်တာကြောင့် 3 = 3၊ Match ဖြစ်ပါတယ်။</p><p>Match ဖြစ်ပါက A အုပ်စုရှိ ဂဏန်း ၂ လုံးကို မျဉ်း ၁ ကြောင်း၊ B အုပ်စုရှိ ဂဏန်း ၃ လုံးကို မျဉ်း ၂ ကြောင်းဖြင့် ဆက်ပြပါတယ်။ ထို့ကြောင့် စုစုပေါင်း မျဉ်း ၃ ကြောင်း ဖြစ်ပါတယ်။ အုပ်စုနှစ်ခုရှိ ဂဏန်း ၅ လုံးလုံးကို အရောင်တူ Highlight လုပ်ပြီး အုပ်စုတစ်ခုစီ၏ အရောင်ကို Loop လုပ်ကာ ပြောင်းလဲသုံးပါတယ်။</p><p><strong>Odd:</strong> Row 1–4၊ Row 5–8၊ Row 9–12၊ Row 13–16…</p><p><strong>Even:</strong> Row 2–5၊ Row 6–9၊ Row 10–13၊ Row 14–17…</p><p>Odd သည် Row 1 မှစပြီး Even သည် Row 2 မှ စပါတယ်။ အုပ်စုတစ်ခုစီတွင် စတင် Row ကို ၄ တန်းစီ ရွှေ့ပါတယ်။ Group တစ်ခုတွက်ရန် Row ၄ တန်းလုံး ရှိရပါမယ်။</p>',
        36: '<p><strong>အုပ်စုတစ်ခုစီတွင် ဆက်တိုက် Row ၄ တန်း (N, N+1, N+2, N+3) ကို အသုံးပြုပြီး နောက်အုပ်စုသို့ စတင် Row ကို ၄ တန်းစီ ရွှေ့ပါတယ်။</strong></p><p><strong>ပေါင်းရမည့် ဂဏန်း ၃ လုံး:</strong> Row N ၏ ယူနစ်ဂဏန်း + Row N+1 ၏ ဆယ်ဂဏန်း + Row N+2 ၏ ရာဂဏန်း။ ဒီဂဏန်း ၃ လုံးကို ပေါင်းပြီး 10 ကျော်ပါက နောက်ဆုံးယူနစ်ဂဏန်း (% 10) ကိုသာ ယူပါတယ်။</p><p><strong>နှိုင်းယှဉ်ရန်:</strong> ပေါင်းလဒ်၏ နောက်ဆုံးဂဏန်းကို Row N+3 ၏ ဆယ်ဂဏန်းနှင့် နှိုင်းယှဉ်ပါတယ်။ တူညီလျှင် Match ဖြစ်ပါတယ်။ ဥပမာ Rows 1–4 တွင် Row 1 Unit 3 + Row 2 Ten 2 + Row 3 Hundred 4 = 9 ဖြစ်ပြီး Row 4 Ten 9 နှင့် တူသောကြောင့် Match ဖြစ်ပါတယ်။</p><p>Match ဖြစ်ပါက ပေါင်းရာတွင် အသုံးပြုသော ဂဏန်း ၃ လုံးကိုသာ အစဉ်လိုက် မျဉ်းဖြင့် ဆက်ပါတယ်။ Row N+3 ၏ ဆယ်ဂဏန်းကို မျဉ်းမဆွဲဘဲ အရောင်တူ Highlight လုပ်ပါတယ်။ Group တစ်ခုစီကို အရောင်တစ်ရောင်စီ သတ်မှတ်ပြီး အရောင်များကို Loop လုပ်ကာ ဖော်ပြပါတယ်။</p><p><strong>Odd:</strong> Row 1–4၊ Row 5–8၊ Row 9–12၊ Row 13–16…</p><p><strong>Even:</strong> Row 2–5၊ Row 6–9၊ Row 10–13၊ Row 14–17…</p><p>Odd သည် Row 1 မှစပြီး Even သည် Row 2 မှ စပါတယ်။ နောက် group တစ်ခုစီတွင် စတင် Row ကို ၄ တန်းစီ ရွှေ့ပါတယ်။ Group တစ်ခုတွက်ရန် Row ၄ တန်းလုံး ရှိရပါမယ်။</p>',
        35: '<p><strong>အုပ်စုတစ်ခုစီတွင် Row ၃ တန်း (N, N+1, N+2) ကို အသုံးပြုပြီး နောက် group သို့ စတင် Row ကို ၄ တန်းစီ ရွှေ့ပါတယ်။</strong></p><p><strong>A:</strong> Row N ၏ ဆယ်ဂဏန်း + Row N+1 ၏ ဆယ်ဂဏန်း။ ဥပမာ Row 1 = 221 ၏ ဆယ်ဂဏန်း 2 နှင့် Row 2 = 843 ၏ ဆယ်ဂဏန်း 4 ကို ပေါင်းလျှင် 2 + 4 = 6 ဖြစ်ပါတယ်။</p><p><strong>B:</strong> Row N+1 ၏ ယူနစ်ဂဏန်း + Row N+2 ၏ ယူနစ်ဂဏန်း။ ဥပမာ Row 2 = 843 ၏ ယူနစ် 3 နှင့် Row 3 = 863 ၏ ယူနစ် 3 ကို ပေါင်းလျှင် 3 + 3 = 6 ဖြစ်ပါတယ်။ နှစ်ဘက်ပေါင်းလဒ် 10 ကျော်ပါက နောက်ဆုံးယူနစ်ဂဏန်း (% 10) ကိုသာ ယူပါတယ်။ A နှင့် B နောက်ဆုံးဂဏန်းတူမှ Match ဖြစ်ပါတယ်။</p><p>Match ဖြစ်ပါက A အတွက် Row N ဆယ်ဂဏန်းမှ Row N+1 ဆယ်ဂဏန်းသို့ မျဉ်းတစ်ကြောင်း၊ B အတွက် Row N+1 ယူနစ်မှ Row N+2 ယူနစ်သို့ မျဉ်းတစ်ကြောင်း သီးခြားချိတ်ပါတယ်။ Group တစ်ခုစီကို အရောင်တစ်ရောင်စီ Loop လုပ်ပြီး ဖော်ပြပါတယ်။</p><p><strong>Odd:</strong> Row 1–3၊ Row 5–7၊ Row 9–11၊ Row 13–15…</p><p><strong>Even:</strong> Row 2–4၊ Row 6–8၊ Row 10–12၊ Row 14–16…</p><p>Odd သည် Row 1 မှစပြီး Even သည် Row 2 မှ စပါတယ်။ နောက် group တစ်ခုစီတွင် စတင် Row ကို ၄ တန်းစီ ရွှေ့ပါတယ်။ Group တစ်ခုတွက်ရန် Row ၃ တန်းလုံး ရှိရပါမယ်။</p>',
        34: '<p><strong>အုပ်စုတစ်ခုစီတွင် ဆက်တိုက် Row ၄ တန်း (N, N+1, N+2, N+3) ကို အသုံးပြုပြီး နောက် group သို့ စတင် Row ကို ၄ တန်းစီ ရွှေ့ပါတယ်။</strong></p><p><strong>A:</strong> ပထမ Row N ၏ ဆယ်ဂဏန်း + ဒုတိယ Row N+1 ၏ ရာဂဏန်း။ ဥပမာ Row 1 = 044၊ Row 2 = 221 ဖြစ်လျှင် 4 + 2 = 6 ဖြစ်ပါတယ်။</p><p><strong>B:</strong> တတိယ Row N+2 ၏ ယူနစ်ဂဏန်း + စတုတ္ထ Row N+3 ၏ ယူနစ်ဂဏန်း။ ဥပမာ Row 3 = 843၊ Row 4 = 863 ဖြစ်လျှင် 3 + 3 = 6 ဖြစ်ပါတယ်။ A နှင့် B တစ်ဘက်စီကို သီးခြားပေါင်းပြီး 10 ကျော်ပါက နောက်ဆုံးယူနစ်ဂဏန်း (% 10) ကိုသာ ယူပါတယ်။ A နှင့် B ၏ နောက်ဆုံးဂဏန်းတူညီလျှင် Match ဖြစ်ပါတယ်။</p><p>Match ဖြစ်ပါက A အတွဲ (Row N ဆယ် → Row N+1 ရာ) ကို မျဉ်းတစ်ကြောင်း၊ B အတွဲ (Row N+2 ယူနစ် → Row N+3 ယူနစ်) ကို သီးခြားမျဉ်းတစ်ကြောင်းဖြင့် ဆက်ပါတယ်။ Group တစ်ခုစီကို အရောင်တစ်ရောင်စီ သတ်မှတ်ပြီး အရောင်များကို Loop လုပ်ကာ ဖော်ပြပါတယ်။</p><p><strong>Odd:</strong> Row 1–4၊ Row 5–8၊ Row 9–12၊ Row 13–16…</p><p><strong>Even:</strong> Row 2–5၊ Row 6–9၊ Row 10–13၊ Row 14–17…</p><p>Odd သည် Row 1 မှစပြီး Even သည် Row 2 မှ စပါတယ်။ နောက် group တစ်ခုစီတွင် စတင် Row ကို ၄ တန်းစီ ရွှေ့ပါတယ်။ Group တစ်ခုတွက်ရန် Row ၄ တန်းလုံး ရှိရပါမယ်။</p>',
        33: '<p><strong>အုပ်စုတစ်ခုစီတွင် ဆက်တိုက် Row ၃ တန်း (N, N+1, N+2) ကို အသုံးပြုပြီး နောက် group သို့ စတင် Row ကို ၄ တန်းစီ ရွှေ့ပါတယ်။</strong></p><p><strong>A:</strong> ပထမ Row N ၏ ဆယ်ဂဏန်း + အလယ် Row N+1 ၏ ရာဂဏန်း။ ဥပမာ Row 1 = 044၊ Row 2 = 221 ဖြစ်လျှင် 4 + 2 = 6 ဖြစ်ပါတယ်။ 10 ကျော်ပါက နောက်ဆုံးယူနစ်ဂဏန်း (% 10) ကိုသာ ယူပါတယ်။</p><p><strong>B:</strong> အလယ် Row N+1 ၏ ဆယ်ဂဏန်း + နောက်ဆုံး Row N+2 ၏ ဆယ်ဂဏန်း။ ဥပမာ Row 2 = 221၊ Row 3 = 843 ဖြစ်လျှင် 2 + 4 = 6 ဖြစ်ပါတယ်။ A နှင့် B ၏ နောက်ဆုံးယူနစ်ဂဏန်းတူညီလျှင် Match ဖြစ်ပါတယ်။</p><p>Match ဖြစ်ပါက A အတွဲ (Row N ဆယ် → Row N+1 ရာ) ကို မျဉ်းတစ်ကြောင်း၊ B အတွဲ (Row N+1 ဆယ် → Row N+2 ဆယ်) ကိုလည်း သီးခြားမျဉ်းတစ်ကြောင်းဖြင့် ဆက်ပါတယ်။ Group တစ်ခုစီကို အရောင်တစ်ရောင်စီ သတ်မှတ်ပြီး အရောင်များကို Loop လုပ်ကာ ဖော်ပြပါတယ်။</p><p><strong>Odd:</strong> Row 1–3၊ Row 5–7၊ Row 9–11၊ Row 13–15…</p><p><strong>Even:</strong> Row 2–4၊ Row 6–8၊ Row 10–12၊ Row 14–16…</p><p>Odd သည် Row 1 မှစပြီး Even သည် Row 2 မှ စပါတယ်။ နောက် group တစ်ခုစီတွင် စတင် Row ကို ၄ တန်းစီ ရွှေ့ပါတယ်။ Group တစ်ခုတွက်ရန် Row ၃ တန်းလုံး ရှိရပါမယ်။</p>',
        32: '<p><strong>အုပ်စုတစ်ခုစီတွင် ဆက်တိုက် Row ၄ တန်း (N, N+1, N+2, N+3) ကို အသုံးပြုပြီး နောက် group ကို တစ်တန်းစီ ရွှေ့ပါတယ်။</strong></p><p><strong>A:</strong> ပထမ Row N ၏ ရာဂဏန်း + စတုတ္ထ Row N+3 ၏ ဆယ်ဂဏန်း။</p><p><strong>B:</strong> ဒုတိယ Row N+1 ၏ ဆယ်ဂဏန်း + တတိယ Row N+2 ၏ ယူနစ်ဂဏန်း။ A နှင့် B ကို သီးခြားပေါင်းပြီး 10 ကျော်လျှင် နောက်ဆုံးဂဏန်း (% 10) ကိုယူပါတယ်။ နောက်ဆုံးဂဏန်းနှစ်ခုတူလျှင် Match ဖြစ်ပါတယ်။ ဥပမာ 227၊ 388၊ 309၊ 352 တွင် A = 2 + 5 = 7၊ B = 8 + 9 = 17 → 7 ဖြစ်ပါတယ်။</p><p>Match ဖြစ်လျှင် A အတွဲ (Row N ရာ၊ Row N+3 ဆယ်) ကို မျဉ်းတစ်ကြောင်း၊ B အတွဲ (Row N+1 ဆယ်၊ Row N+2 ယူနစ်) ကို သီးခြားမျဉ်းတစ်ကြောင်းဖြင့် ဆက်ပါတယ်။ Group တစ်ခုစီကို အရောင်တစ်ရောင်စီ သတ်မှတ်ပြီး Loop လုပ်ကာ ဖော်ပြပါတယ်။</p><p><strong>Odd:</strong> Row 1–4၊ 2–5၊ 3–6၊ 4–7…</p><p><strong>Even:</strong> Row 2–5၊ 3–6၊ 4–7၊ 5–8…</p><p>Odd သည် Row 1 မှ၊ Even သည် Row 2 မှ စပါတယ်။ နောက် group တစ်ခုစီတွင် စတင် Row ကို တစ်တန်းစီ ရွှေ့ပါတယ်။ Row ၄ တန်းလုံးရှိမှ တွက်ချက်နိုင်ပါတယ်။</p>',
        31: '<p><strong>အုပ်စုတစ်ခုစီတွင် Row N မှ Row N+5 အထိကို အသုံးပြုပြီး အရေးကြီးသော ဂဏန်း ၄ လုံးကို ရွေးတွက်ပါတယ်။ နောက်အုပ်စုတစ်ခုစီတွင် စတင် Row ကို ၁ တန်းစီ ရွှေ့ပါတယ်။</strong></p><p><strong>A:</strong> စတင် Row N ၏ ရာဂဏန်း + ထို Row N ၏ ဆယ်ဂဏန်း။ ပေါင်းလဒ်၏ နောက်ဆုံးယူနစ်ဂဏန်း (% 10) ကို ယူပါတယ်။</p><p><strong>B:</strong> Row N+4 ၏ ယူနစ်ဂဏန်း + Row N+5 ၏ ယူနစ်ဂဏန်း။ ပေါင်းလဒ်၏ နောက်ဆုံးယူနစ်ဂဏန်း (% 10) ကို ယူပါတယ်။ A နဲ့ B ရလဒ်တူညီလျှင် Match ဖြစ်ပါတယ်။ ဥပမာ Row 1 = 894၊ Row 5 = 388၊ Row 6 = 309 ဖြစ်လျှင် A = 8 + 9 = 17 → 7၊ B = 8 + 9 = 17 → 7 ဖြစ်လို့ Match ဖြစ်ပါတယ်။</p><p>Match ဖြစ်သောအခါ A အတွဲ (Row N ရာ + Row N ဆယ်) ကို မျဉ်းတစ်ကြောင်းနဲ့ ဆက်ပါတယ်။ B အတွဲ (Row N+4 ယူနစ် + Row N+5 ယူနစ်) ကိုလည်း သီးခြားမျဉ်းတစ်ကြောင်းနဲ့ ဆက်ပါတယ်။ Group တစ်ခုစီကို အရောင်တစ်ရောင်စီ သတ်မှတ်ပြီး Loop လုပ်ကာ ဖော်ပြပါတယ်။</p><p><strong>Odd:</strong> Row 1 &amp; 6၊ Row 2 &amp; 7၊ Row 3 &amp; 8၊ Row 4 &amp; 9…</p><p><strong>Even:</strong> Row 2 &amp; 7၊ Row 3 &amp; 8၊ Row 4 &amp; 9၊ Row 5 &amp; 10…</p><p>Odd သည် Row 1 မှ၊ Even သည် Row 2 မှ စပါတယ်။ နှစ်ခုလုံးတွင် နောက် group တစ်ခုစီအတွက် စတင် Row ကို ၁ တန်းစီ ရွှေ့ပါတယ်။ Group တစ်ခုစစ်ရန် Row N မှ Row N+5 အထိ Row ၆ တန်း ရှိရပါမယ်။</p>',
        30: '<p><strong>အုပ်စုတစ်ခုစီသည် Row N မှ Row N+4 အထိ ၅ တန်းအကွာအဝေးကို အသုံးပြုပါတယ်။ နောက်အုပ်စုသို့ စတင် Row ကို ၂ တန်းစီ ရွှေ့ပါတယ်။</strong></p><p><strong>A:</strong> စတင် Row N ၏ ဆယ်ဂဏန်း + ဒုတိယ Row N+1 ၏ ဆယ်ဂဏန်း။ ပေါင်းလဒ်၏ နောက်ဆုံးယူနစ်ဂဏန်း (% 10) ကို ယူပါတယ်။</p><p><strong>B:</strong> တတိယ Row N+2 ၏ ရာဂဏန်း + ဆယ်ဂဏန်း + ပဉ္စမ Row N+4 ၏ ရာဂဏန်း။ ဒီဂဏန်း ၃ လုံးကို ပေါင်းပြီး နောက်ဆုံးယူနစ်ဂဏန်း (% 10) ကို ယူပါတယ်။ A နဲ့ B ရလဒ်တူညီလျှင် Match ဖြစ်ပါတယ်။ ဥပမာ 309၊ 352၊ 392၊ 246၊ 324 ဖြစ်လျှင် A = 0 + 5 = 5၊ B = 3 + 9 + 3 = 15 → 5 ဖြစ်လို့ Match ဖြစ်ပါတယ်။</p><p>Match ဖြစ်တဲ့အခါ A ဘက်ရှိ ဂဏန်း ၂ လုံး (Row N ဆယ်၊ Row N+1 ဆယ်) ကို မျဉ်းတစ်ကြောင်းနဲ့ ဆက်ပါတယ်။ B ဘက်ရှိ ဂဏန်း ၃ လုံး (Row N+2 ရာ၊ Row N+2 ဆယ်၊ Row N+4 ရာ) ကို မျဉ်း ၂ ကြောင်းနဲ့ ဆက်ပါတယ်။ စုစုပေါင်း မျဉ်း ၃ ကြောင်း ဖြစ်ပါတယ်။ Group တစ်ခုစီကို အရောင်တစ်ရောင်စီ သတ်မှတ်ပြီး Loop လုပ်ကာ ဖော်ပြပါတယ်။ ထပ်နေတဲ့ digit များမှာ သက်ဆိုင်ရာ Group အရောင်များကို ပြသပါတယ်။</p><p><strong>Odd:</strong> Row 1 &amp; 5၊ Row 3 &amp; 7၊ Row 5 &amp; 9၊ Row 7 &amp; 11…</p><p><strong>Even:</strong> Row 2 &amp; 6၊ Row 4 &amp; 8၊ Row 6 &amp; 10၊ Row 8 &amp; 12…</p><p>Odd သည် Row 1 မှ၊ Even သည် Row 2 မှ စပါတယ်။ နောက် group တစ်ခုစီတွင် စတင် Row ကို ၂ တန်းစီ ရွှေ့ပါတယ်။ Group တစ်ခုတွက်ရန် Row N မှ Row N+4 အထိ ၅ တန်းလုံး ရှိရပါမယ်။</p>',
        29: '<p><strong>အုပ်စုတစ်ခုစီတွင် Row ၂ တန်းကို အသုံးပြုပါတယ်။</strong></p><p><strong>A:</strong> ပထမ Row N ၏ ရာဂဏန်း + ဆယ်ဂဏန်း။ ဒီဂဏန်း ၂ လုံးကို ပေါင်းပြီး နောက်ဆုံးယူနစ်ဂဏန်း (% 10) ကို ယူပါတယ်။</p><p><strong>B:</strong> ဒုတိယ Row N+1 ၏ ရာဂဏန်း + ဆယ်ဂဏန်း + ယူနစ်ဂဏန်း။ ဒီဂဏန်း ၃ လုံးကို ပေါင်းပြီး နောက်ဆုံးယူနစ်ဂဏန်း (% 10) ကို ယူပါတယ်။ A နဲ့ B ရလဒ်တူညီလျှင် Match ဖြစ်ပါတယ်။ ဥပမာ Row 1 = 392၊ Row 2 = 246 ဖြစ်လျှင် A = 3 + 9 = 12 → 2၊ B = 2 + 4 + 6 = 12 → 2 ဖြစ်လို့ Match ဖြစ်ပါတယ်။</p><p>Match ဖြစ်တဲ့အခါ A ဘက်ရှိ ရာ + ဆယ်ဂဏန်းကို မျဉ်းတစ်ကြောင်းနဲ့ ဆက်ပါတယ်။ B ဘက်ရှိ ရာ + ဆယ် + ယူနစ်ဂဏန်းကို မျဉ်း ၂ ကြောင်းနဲ့ ဆက်ပါတယ်။ စုစုပေါင်း မျဉ်း ၃ ကြောင်းဖြစ်ပြီး Group တစ်ခုစီကို အရောင်တစ်ရောင်စီ သတ်မှတ်ပါတယ်။ အရောင်ကို Loop လုပ်ပြီး ထပ်နေတဲ့ digit များမှာ သက်ဆိုင်ရာ group အရောင်များကို ပြသပါတယ်။</p><p><strong>Odd:</strong> Row 1–2၊ 3–4၊ 5–6၊ 7–8၊ 9–10…</p><p><strong>Even:</strong> Row 2–3၊ 4–5၊ 6–7၊ 8–9၊ 10–11…</p><p>Odd သည် Row 1 မှ၊ Even သည် Row 2 မှ စပြီး နောက် group တစ်ခုစီတွင် စတင် Row ကို ၂ တန်းစီ ရွှေ့ပါတယ်။ Row နှစ်တန်းလုံး ရှိမှသာ အုပ်စုကို တွက်ချက်ပါတယ်။</p>',
        28: '<p><strong>အုပ်စုတစ်ခုစီတွင် Row ၃ တန်း (N, N+1, N+2) ကို အသုံးပြုပါတယ်။ နောက်အုပ်စုသို့ စတင် Row ကို ၅ တန်းစီ ရွှေ့ပါတယ်။</strong></p><p><strong>A:</strong> ပထမ Row N ၏ ဆယ်ဂဏန်း + တတိယ Row N+2 ၏ ရာဂဏန်း။</p><p><strong>B:</strong> အလယ် Row N+1 ၏ ရာဂဏန်း + တတိယ Row N+2 ၏ ဆယ်ဂဏန်း။</p><p>A နဲ့ B ကို သီးခြားပေါင်းပြီး 10 ကျော်လျှင် နောက်ဆုံးယူနစ်ဂဏန်း (% 10) ကိုသာ ယူပါတယ်။ နှစ်ဘက်ရလဒ်တူညီလျှင် Match ဖြစ်ပါတယ်။ ဥပမာ 209၊ 779၊ 700 ဆိုလျှင် A = 0 + 7 = 7၊ B = 7 + 0 = 7 ဖြစ်လို့ Match ဖြစ်ပါတယ်။</p><p>Match ဖြစ်တဲ့အခါ A အတွဲ (Row N ဆယ်ဂဏန်း → Row N+2 ရာဂဏန်း) ကို မျဉ်းတစ်ကြောင်းနဲ့ ဆက်ပါတယ်။ B အတွဲ (Row N+1 ရာဂဏန်း → Row N+2 ဆယ်ဂဏန်း) ကိုလည်း သီးခြားမျဉ်းတစ်ကြောင်းနဲ့ ဆက်ပါတယ်။ Group တစ်ခုစီကို အရောင်တစ်ရောင်စီ သတ်မှတ်ပြီး အရောင် Loop လုပ်ကာ ဖော်ပြပါတယ်။ ထပ်နေတဲ့ digit တွင် သက်ဆိုင်ရာ group အရောင်များကို ပြသပါတယ်။</p><p><strong>Odd:</strong> Row 1 &amp; 3၊ Row 6 &amp; 8၊ Row 11 &amp; 13၊ Row 16 &amp; 18…</p><p><strong>Even:</strong> Row 2 &amp; 4၊ Row 7 &amp; 9၊ Row 12 &amp; 14၊ Row 17 &amp; 19…</p><p>Odd သည် Row 1 မှ၊ Even သည် Row 2 မှ စပါတယ်။ နောက် group တစ်ခုစီတွင် စတင် Row ကို ၅ တန်းစီ ရွှေ့ပါတယ်။ Group တစ်ခုတွက်ရန် ကြားရှိ Row အပါအဝင် Row ၃ တန်းလုံး ရှိရပါမယ်။</p>',
        27: '<p><strong>အုပ်စုတစ်ခုစီတွင် Row ၄ တန်း (N, N+1, N+2, N+3) ကို အသုံးပြုပြီး နောက်အုပ်စုသို့ ၅ တန်းစီ ရွှေ့ပါတယ်။</strong></p><p><strong>ပေါင်းရမည့် ဂဏန်း ၃ လုံး:</strong> စတင် Row N ၏ ယူနစ်ဂဏန်း + ဒုတိယ Row N+1 ၏ ဆယ်ဂဏန်း + တတိယ Row N+2 ၏ ရာဂဏန်း။</p><p>ဒီဂဏန်း ၃ လုံးကို ပေါင်းပြီး 10 ကျော်လျှင် နောက်ဆုံးယူနစ်ဂဏန်း (% 10) ကိုသာ ယူပါတယ်။ အဲဒီရလဒ်ကို စတုတ္ထ Row N+3 ၏ ရာဂဏန်းနဲ့ နှိုင်းယှဉ်ပါတယ်။ တူညီလျှင် Match ဖြစ်ပါတယ်။ ဥပမာ Row 1 = 962၊ Row 2 = 044၊ Row 3 = 221၊ Row 4 = 863 ဖြစ်လျှင် 2 + 4 + 2 = 8 ဖြစ်ပြီး Row 4 ရာဂဏန်း 8 နဲ့ တူတဲ့အတွက် Match ဖြစ်ပါတယ်။</p><p>Match ဖြစ်တဲ့အခါ ပေါင်းရမည့် ဂဏန်း ၃ လုံးကို မျဉ်း ၂ ကြောင်းနဲ့ ဆက်ပါတယ်။ နှိုင်းယှဉ်မည့် စတုတ္ထ Row ရဲ့ ရာဂဏန်းကိုတော့ မျဉ်းမဆက်ဘဲ သက်ဆိုင်ရာ အရောင်တစ်ရောင်တည်းနဲ့ Highlight လုပ်ပါတယ်။ Group တစ်ခုစီကို အရောင် Loop လုပ်ပြီး ဖော်ပြပါတယ်။</p><p><strong>Odd:</strong> Row 1–4၊ Row 6–9၊ Row 11–14၊ Row 16–19…</p><p><strong>Even:</strong> Row 2–5၊ Row 7–10၊ Row 12–15၊ Row 17–20…</p><p>Odd သည် Row 1 မှစပြီး Even သည် Row 2 မှ စပါတယ်။ နောက် Group တစ်ခုစီတွင် စတင် Row ကို ၅ တန်းစီ ရွှေ့ပါတယ်။ Group တစ်ခုတွက်ရန် Row ၄ တန်းလုံး ရှိရပါမယ်။</p>',
        26: '<p><strong>အုပ်စုတစ်ခုစီတွင် ဆက်တိုက် Row ၄ တန်း (N, N+1, N+2, N+3) ကို အသုံးပြုပါတယ်။</strong></p><p><strong>A အုပ်စု:</strong> Row N ၏ ရာဂဏန်း + Row N+1 ၏ ရာဂဏန်း။ ဒီဂဏန်း ၂ လုံးကို ပေါင်းပြီး နောက်ဆုံးယူနစ်ဂဏန်းကို ယူပါတယ်။</p><p><strong>B အုပ်စု:</strong> Row N+2 ၏ ဆယ်ဂဏန်း + Row N+3 ၏ ရာဂဏန်း + Row N+3 ၏ ယူနစ်ဂဏန်း။ ဒီဂဏန်း ၃ လုံးကို ပေါင်းပြီး နောက်ဆုံးယူနစ်ဂဏန်းကို ယူပါတယ်။ A နဲ့ B ရဲ့ နောက်ဆုံးဂဏန်းတူညီလျှင် Match ဖြစ်ပါတယ်။ ဥပမာ 865၊ 356၊ 646၊ 978 ကို သုံးလျှင် A = 8 + 3 = 11 → 1၊ B = 4 + 9 + 8 = 21 → 1 ဖြစ်လို့ Match ဖြစ်ပါတယ်။</p><p>Match ဖြစ်တဲ့အခါ A ဘက်က Row N ရာဂဏန်းနဲ့ Row N+1 ရာဂဏန်းကို မျဉ်းတစ်ကြောင်းနဲ့ ဆက်ပါတယ်။ B ဘက်က Row N+2 ဆယ်ဂဏန်း၊ Row N+3 ရာဂဏန်း၊ Row N+3 ယူနစ်ဂဏန်းတို့ကို မျဉ်း ၂ ကြောင်းနဲ့ ဆက်ပါတယ်။ စုစုပေါင်း ချိတ်ဆက်မျဉ်း ၃ ကြောင်း ဖြစ်ပါတယ်။ Group တစ်ခုစီကို အရောင်တစ်ရောင်စီ သတ်မှတ်ပြီး loop လုပ်ကာ ဖော်ပြပါတယ်။ Group တွေထပ်နေတဲ့ digit တွင် သက်ဆိုင်ရာ အရောင်များကို ပြသပါတယ်။</p><p><strong>Odd:</strong> Row 1–4 (အစ Row 1၊ အဆုံး Row 4)၊ Row 2–5၊ Row 3–6၊ Row 4–7…</p><p><strong>Even:</strong> Row 2–5 (အစ Row 2၊ အဆုံး Row 5)၊ Row 3–6၊ Row 4–7၊ Row 5–8…</p><p>Odd သည် Row 1 မှ၊ Even သည် Row 2 မှ စပါတယ်။ နောက် group တစ်ခုစီတွင် စတင် Row ကို ၁ တန်းစီ ရွှေ့ပါတယ်။ Group တစ်ခုတွက်ရန် Row ၄ တန်းလုံး ရှိရပါမယ်။</p>',
        25: '<p><strong>အုပ်စုတစ်ခုစီတွင် ဆက်တိုက် Row ၃ တန်း (N, N+1, N+2) ကို အသုံးပြုပါတယ်။</strong></p><p><strong>A:</strong> ပထမ Row N ၏ ရာဂဏန်း + နောက်ဆုံး Row N+2 ၏ ဆယ်ဂဏန်း။</p><p><strong>B:</strong> အလယ် Row N+1 ၏ ယူနစ်ဂဏန်း + နောက်ဆုံး Row N+2 ၏ ရာဂဏန်း။</p><p>A နဲ့ B ကို သီးခြားပေါင်းပြီး 10 ကျော်လျှင် နောက်ဆုံးယူနစ်ဂဏန်းတစ်လုံး (% 10) ကိုသာ ယူပါတယ်။ ဥပမာ Row 1 = 145၊ Row 2 = 252၊ Row 3 = 895 ဖြစ်လျှင် A = 1 + 9 = 10 → 0၊ B = 2 + 8 = 10 → 0 ဖြစ်လို့ Match ဖြစ်ပါတယ်။ A နဲ့ B ရဲ့ နောက်ဆုံးဂဏန်းတူညီမှသာ Match ဖြစ်ပါတယ်။</p><p>Match ဖြစ်တဲ့အခါ A ဘက်ရှိ Row N ရာဂဏန်းနဲ့ Row N+2 ဆယ်ဂဏန်းကို မျဉ်းတစ်ကြောင်းနဲ့ ဆက်ပါတယ်။ B ဘက်ရှိ Row N+1 ယူနစ်ဂဏန်းနဲ့ Row N+2 ရာဂဏန်းကိုလည်း သီးခြားမျဉ်းတစ်ကြောင်းနဲ့ ဆက်ပါတယ်။ Group တစ်ခုစီကို အရောင်တစ်ရောင်စီ သတ်မှတ်ပြီး အရောင် loop လုပ်ကာ ဖော်ပြပါတယ်။ ထပ်နေတဲ့ digit တွင် သက်ဆိုင်ရာ group အရောင်များကို ပြသပါတယ်။</p><p><strong>Odd:</strong> Row 1–3၊ 2–4၊ 3–5၊ 4–6၊ 5–7…</p><p><strong>Even:</strong> Row 2–4၊ 3–5၊ 4–6၊ 5–7၊ 6–8…</p><p>Odd သည် Row 1 မှစပြီး Even သည် Row 2 မှ စပါတယ်။ နှစ်ခုလုံးတွင် နောက် group တစ်ခုစီအတွက် စတင် Row ကို ၁ တန်းစီ ရွှေ့ပါတယ်။ အုပ်စုတစ်ခုတွက်ရန် Row ၃ တန်းလုံး ရှိရပါမယ်။</p>',
        23: '<p><strong>အုပ်စုတစ်ခုစီတွင် ဆက်တိုက် Row ၃ တန်း (N, N+1, N+2) ကို အသုံးပြုပါတယ်။</strong></p><p><strong>A:</strong> ပထမ Row N ၏ ရာဂဏန်း + အလယ် Row N+1 ၏ ဆယ်ဂဏန်း။</p><p><strong>B:</strong> အလယ် Row N+1 ၏ ရာဂဏန်း + နောက်ဆုံး Row N+2 ၏ ရာဂဏန်း။</p><p>A နဲ့ B ကို သီးခြားပေါင်းပြီး 10 ကျော်လျှင် နောက်ဆုံးဂဏန်းတစ်လုံး (% 10) ကိုသာ ယူပါတယ်။ A နဲ့ B ရဲ့ နောက်ဆုံးဂဏန်းတူညီလျှင် Match ဖြစ်ပါတယ်။</p><p>Match ဖြစ်တဲ့အခါ A အတွဲ (Row N ရာ + Row N+1 ဆယ်) ကို မျဉ်းတစ်ကြောင်း၊ B အတွဲ (Row N+1 ရာ + Row N+2 ရာ) ကိုလည်း သီးခြားမျဉ်းတစ်ကြောင်းနဲ့ ဆက်ပါတယ်။ Group တစ်ခုစီကို အရောင်တစ်ရောင်စီ သတ်မှတ်ပြီး အရောင် loop လုပ်ကာ ဖော်ပြပါတယ်။ ထပ်နေတဲ့ digit တစ်လုံးမှာ သက်ဆိုင်ရာ group အရောင်များကို ပြသပါတယ်။</p><p><strong>Odd:</strong> Row 1–3၊ 2–4၊ 3–5၊ 4–6၊ 5–7…</p><p><strong>Even:</strong> Row 2–4၊ 3–5၊ 4–6၊ 5–7၊ 6–8…</p><p>Odd သည် Row 1 မှစပြီး Even သည် Row 2 မှ စပါတယ်။ နောက် group တစ်ခုစီတွင် စတင် Row ကို ၁ တန်းစီ ရွှေ့ပါတယ်။ အုပ်စုတစ်ခုတွက်ရန် Row ၃ တန်းလုံး ရှိရပါမယ်။</p>',
        '22-new': '<p><strong>အုပ်စုတစ်ခုစီမှာ Row ၃ တန်းကို အသုံးပြုပါတယ်။</strong></p><p><strong>A:</strong> ပထမ Row N ၏ ရာဂဏန်း + တတိယ Row N+2 ၏ ဆယ်ဂဏန်း။</p><p><strong>နှိုင်းယှဉ်ရန်ဂဏန်း:</strong> အလယ် Row N+1 ၏ ယူနစ်ဂဏန်း။</p><p>A ဘက်က ဂဏန်း ၂ လုံးကို ပေါင်းပြီး 10 ကျော်လျှင် နောက်ဆုံးဂဏန်းတစ်လုံးကိုသာ ယူပါတယ်။ အဲဒီဂဏန်းနဲ့ အလယ် Row ၏ ယူနစ်ဂဏန်းတူရင် Match ဖြစ်ပါတယ်။ Match ဖြစ်တဲ့အခါ A ရဲ့ ဂဏန်း ၂ လုံးကို မျဉ်းတစ်ကြောင်းနဲ့ ဆက်ပြီး အလယ် Row ရဲ့ တစ်လုံးတည်းသော ယူနစ်ဂဏန်းကိုတော့ မျဉ်းမဆက်ဘဲ အရောင်တူ Highlight လုပ်ပါတယ်။ Group တစ်ခုစီကို အရောင် Loop ဖြင့် ဖော်ပြပါတယ်။</p><p><strong>Odd:</strong> Row 1 &amp; 3၊ 3 &amp; 5၊ 5 &amp; 7၊ 7 &amp; 9…</p><p><strong>Even:</strong> Row 2 &amp; 4၊ 4 &amp; 6၊ 6 &amp; 8၊ 8 &amp; 10…</p><p>Odd သည် Row 1 မှ၊ Even သည် Row 2 မှ စပြီး နောက်အုပ်စုတစ်ခုစီတွင် စတင် Row ကို ၂ တန်းစီ ရွှေ့ပါတယ်။ အုပ်စုတစ်ခုတွက်ရန် Row သုံးတန်းလုံး ရှိရပါမယ်။</p>',
        22: '<p><strong>အုပ်စုတစ်ခုစီမှာ Row ၃ တန်းအကွာအဝေးကို အသုံးပြုပြီး အစ Row နဲ့ တတိယ Row ကိုသာ တွက်ချက်ပါတယ်။</strong></p><p><strong>A:</strong> ပထမ Row N ၏ ရာဂဏန်း + ယူနစ်ဂဏန်း။</p><p><strong>B:</strong> တတိယ Row N+2 ၏ ဆယ်ဂဏန်း + ယူနစ်ဂဏန်း။</p><p>A နဲ့ B ကို သီးခြားပေါင်းပြီး 10 ကျော်လျှင် နောက်ဆုံးဂဏန်းတစ်လုံးကိုသာ ယူပါတယ်။ နှစ်ဘက်ရလဒ်တူညီလျှင် Match ဖြစ်ပါတယ်။ Match ဖြစ်တဲ့အခါ A ဘက်ရှိ ဂဏန်း ၂ လုံးကို မျဉ်းတစ်ကြောင်း၊ B ဘက်ရှိ ဂဏန်း ၂ လုံးကိုလည်း သီးခြားမျဉ်းတစ်ကြောင်းနဲ့ ဆက်ပြီး အုပ်စုတစ်ခုစီကို အရောင် loop ဖြင့် ဖော်ပြပါတယ်။</p><p><strong>Odd:</strong> Row 1 &amp; 3၊ 4 &amp; 6၊ 7 &amp; 9၊ 10 &amp; 12…</p><p><strong>Even:</strong> Row 2 &amp; 4၊ 5 &amp; 7၊ 8 &amp; 10၊ 11 &amp; 13…</p><p>Odd သည် Row 1 မှ၊ Even သည် Row 2 မှ စပြီး နောက်အုပ်စုတစ်ခုစီတွင် စတင် Row ကို ၃ တန်းစီ ရွှေ့ပါတယ်။ အလယ် Row ကို ဒီ table တွင် မတွက်ပါ။</p>',
        21: '<p><strong>အုပ်စုတစ်ခုစီတွင် Row ၄ တန်းကို အသုံးပြုပြီး နောက်အုပ်စုသို့ ၂ တန်းစီ ရွှေ့ပါတယ်။</strong></p><p><strong>ပေါင်းရမည့် ဂဏန်း ၃ လုံး:</strong> စတင် Row N ၏ ဆယ်ဂဏန်း + Row N+2 ၏ ရာဂဏန်း + Row N+2 ၏ ယူနစ်ဂဏန်း။</p><p>ဂဏန်း ၃ လုံးကို ပေါင်းပြီး 10 ကျော်လျှင် နောက်ဆုံးဂဏန်းကိုသာ ယူပါတယ်။ ထွက်လာတဲ့ဂဏန်းကို Row N+3 ၏ ရာဂဏန်းနဲ့ နှိုင်းယှဉ်ပါတယ်။ တူညီလျှင် Match ဖြစ်ပါတယ်။</p><p>Match ဖြစ်တဲ့အခါ ပေါင်းတဲ့ ဂဏန်း ၃ လုံးကို မျဉ်း ၂ ကြောင်းနဲ့ ဆက်ပြီး Row N+3 ရဲ့ ရာဂဏန်း target ကိုတော့ မျဉ်းမဆက်ဘဲ အရောင်တူ Highlight လုပ်ပါတယ်။ Group တစ်ခုစီကို အရောင် loop ဖြင့် ပြသပါတယ်။</p><p><strong>Odd:</strong> Row 1–4၊ 3–6၊ 5–8၊ 7–10၊ 9–12…</p><p><strong>Even:</strong> Row 2–5၊ 4–7၊ 6–9၊ 8–11၊ 10–13…</p><p>Odd သည် Row 1 မှစပြီး Even သည် Row 2 မှ စပါတယ်။ နောက်အုပ်စုတစ်ခုစီတွင် စတင် Row ကို ၂ တန်းစီ ရွှေ့ပါတယ်။ အုပ်စုတစ်ခုတွက်ရန် Row ၄ တန်းလုံး ရှိရပါမယ်။</p>',
        20: '<p><strong>အုပ်စုတစ်ခုစီမှာ ဆက်တိုက် Row ၄ တန်း ပါဝင်ပါတယ်။</strong></p><p><strong>ပေါင်းရမည့် ဂဏန်း ၃ လုံး:</strong> ပထမ Row N ၏ ဆယ်ဂဏန်း + ပထမ Row N ၏ ယူနစ်ဂဏန်း + ဒုတိယ Row N+1 ၏ ဆယ်ဂဏန်း။</p><p>အဲဒီဂဏန်း ၃ လုံးကို သီးခြားပေါင်းပြီး 10 ကျော်လျှင် နောက်ဆုံးဂဏန်းတစ်လုံးကိုသာ ယူပါတယ်။ ရလာတဲ့ နောက်ဆုံးဂဏန်းကို စတုတ္ထ Row N+3 ၏ ယူနစ်ဂဏန်းနဲ့ နှိုင်းယှဉ်ပါတယ်။ တူညီလျှင် Match ဖြစ်ပါတယ်။ Match ဖြစ်တဲ့အခါ ပေါင်းရမယ့် ဂဏန်း ၃ လုံးကို မျဉ်း ၂ ကြောင်းနဲ့ ဆက်ပြီး target ဖြစ်တဲ့ စတုတ္ထ Row ရဲ့ ယူနစ်ဂဏန်းကိုတော့ မျဉ်းမဆက်ဘဲ အရောင်တူ Highlight လုပ်ပါတယ်။ Group တစ်ခုစီကို အရောင် loop နဲ့ ခွဲပြပါတယ်။</p><p><strong>Odd:</strong> Row 1–4၊ 5–8၊ 9–12၊ 13–16…</p><p><strong>Even:</strong> Row 2–5၊ 6–9၊ 10–13၊ 14–17…</p><p>Odd သည် Row 1 မှ၊ Even သည် Row 2 မှ စပြီး နောက်အုပ်စုတစ်ခုစီတွင် စတင် Row ကို ၄ တန်းစီ ရွှေ့ပါတယ်။ Row ၄ တန်းလုံးရှိမှ အုပ်စုကို တွက်ချက်ပါတယ်။</p>',
        19: '<p><strong>အုပ်စုတစ်ခုစီမှာ ဆက်တိုက် Row ၄ တန်း ပါဝင်ပါတယ်။</strong></p><p><strong>A ပေါင်းချက်:</strong> ပထမ Row N ၏ ဆယ်ဂဏန်း + ပထမ Row N ၏ ယူနစ်ဂဏန်း + ဒုတိယ Row N+1 ၏ ယူနစ်ဂဏန်း။</p><p><strong>B ပေါင်းချက်:</strong> တတိယ Row N+2 ၏ ရာဂဏန်း + တတိယ Row N+2 ၏ ယူနစ်ဂဏန်း + စတုတ္ထ Row N+3 ၏ ယူနစ်ဂဏန်း။</p><p>A နဲ့ B ကို သီးခြားပေါင်းပြီး 10 ကျော်လျှင် နောက်ဆုံးဂဏန်းတစ်လုံးကိုသာ ယူပါတယ်။ နှစ်ဘက်ရလဒ်တူညီလျှင် Match ဖြစ်ပါတယ်။ A ဘက်ရှိ ဂဏန်း ၃ လုံးကို မျဉ်း ၂ ကြောင်းနဲ့ ဆက်ပြီး B ဘက်ရှိ ဂဏန်း ၃ လုံးကိုလည်း သီးခြားမျဉ်း ၂ ကြောင်းနဲ့ ဆက်ပါတယ်။ Match ဖြစ်တဲ့ group တစ်ခုစီအတွက် A/B နှစ်ဘက်လုံးကို အရောင်တစ်ရောင်တည်း သုံးပါတယ်။</p><p><strong>Odd:</strong> Row 1–4၊ 5–8၊ 9–12၊ 13–16…</p><p><strong>Even:</strong> Row 2–5၊ 6–9၊ 10–13၊ 14–17…</p><p>Odd သည် Row 1 မှ၊ Even သည် Row 2 မှ စပြီး နောက်အုပ်စုတစ်ခုစီမှာ စတင် Row ကို ၄ တန်းစီ ရွှေ့ပါတယ်။ Row ၄ တန်းလုံးရှိမှ အုပ်စုကို တွက်ချက်ပါတယ်။</p>',
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
    const HUNDRED = 0;
    const TEN = 1;
    const UNIT = 2;
    const results = [];
    for (let n = startIdx; n + 3 < all.length; n += 4) {
        const aDigits = [all[n][HUNDRED], all[n][TEN], all[n + 1][TEN]];
        const bDigits = [all[n + 1][UNIT], all[n + 2][UNIT], all[n + 3][TEN]];
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
            // Row N+1 TEN is the third A digit (the middle column).
            // Row N+1 HUNDRED is deliberately not highlighted for M18 A.
            highlights: [
                {row: n, digit: HUNDRED},
                {row: n, digit: TEN},
                {row: n + 1, digit: TEN},
                {row: n + 1, digit: UNIT},
                {row: n + 2, digit: UNIT},
                {row: n + 3, digit: TEN}
            ],
            arrows: [
                {startRow: n, startDigit: HUNDRED, endRow: n, endDigit: TEN},
                {startRow: n, startDigit: TEN, endRow: n + 1, endDigit: TEN},
                {startRow: n + 1, startDigit: UNIT, endRow: n + 2, endDigit: UNIT},
                {startRow: n + 2, startDigit: UNIT, endRow: n + 3, endDigit: TEN}
            ]
        });
    }
    return results;
}


// ========== M19 LOGIC ==========
// Each group uses four consecutive rows.
// A = Row N ten + Row N unit + Row N+1 unit.
// B = Row N+2 hundred + Row N+2 unit + Row N+3 unit.
// Compare A % 10 with B % 10.
// Odd starts: Rows 1, 5, 9, 13...
// Even starts: Rows 2, 6, 10, 14...
// Each next group advances by four rows.
function analyzeM19(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(
        numbers, calcM19(numbers, 0), 'odd',
        'M19 Table - Odd (Rows 1–4, 5–8, 9–12...)',
        { eachMatchIsGroup: true, showCalculations: true }
    );
    html += renderWithArrows(
        numbers, calcM19(numbers, 1), 'even',
        'M19 Table - Even (Rows 2–5, 6–9, 10–13...)',
        { eachMatchIsGroup: true, showCalculations: true }
    );
    html += '</div>';
    m19Container.innerHTML = html;
}

function calcM19(all, startIdx) {
    const results = [];
    for (let n = startIdx; n + 3 < all.length; n += 4) {
        const aDigits = [all[n][1], all[n][2], all[n + 1][2]];
        const bDigits = [all[n + 2][0], all[n + 2][2], all[n + 3][2]];
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
                    `A: Row ${n + 1} Ten ${aDigits[0]} + Row ${n + 1} Unit ${aDigits[1]} + Row ${n + 2} Unit ${aDigits[2]} = ${aSum} → ${aResult}`,
                    `B: Row ${n + 3} Hundred ${bDigits[0]} + Row ${n + 3} Unit ${bDigits[1]} + Row ${n + 4} Unit ${bDigits[2]} = ${bSum} → ${bResult}`,
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


// ========== M20 LOGIC ==========
// Each group uses four consecutive rows.
// Sum = Row N ten + Row N unit + Row N+1 ten.
// Compare sum % 10 with Row N+3 unit.
// Odd starts: Rows 1, 5, 9, 13...
// Even starts: Rows 2, 6, 10, 14...
// Each next group advances by four rows.
function analyzeM20(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(
        numbers, calcM20(numbers, 0), 'odd',
        'M20 Table - Odd (Rows 1–4, 5–8, 9–12...)',
        { eachMatchIsGroup: true, showCalculations: true }
    );
    html += renderWithArrows(
        numbers, calcM20(numbers, 1), 'even',
        'M20 Table - Even (Rows 2–5, 6–9, 10–13...)',
        { eachMatchIsGroup: true, showCalculations: true }
    );
    html += '</div>';
    m20Container.innerHTML = html;
}

function calcM20(all, startIdx) {
    const TEN = 1;
    const UNIT = 2;
    const results = [];
    for (let n = startIdx; n + 3 < all.length; n += 4) {
        const sumDigits = [all[n][TEN], all[n][UNIT], all[n + 1][TEN]];
        const sum = sumDigits.reduce((total, digit) => total + parseInt(digit, 10), 0);
        const finalDigit = sum % 10;
        const targetDigit = parseInt(all[n + 3][UNIT], 10);
        const isMatch = finalDigit === targetDigit;

        results.push({
            isMatch,
            calculation: {
                groupLabel: `Rows ${n + 1}–${n + 4}`,
                detailLines: [
                    `Row ${n + 1} Ten ${sumDigits[0]} + Row ${n + 1} Unit ${sumDigits[1]} + Row ${n + 2} Ten ${sumDigits[2]} = ${sum} → ${finalDigit}`,
                    `Compare with Row ${n + 4} Unit ${targetDigit} → ${isMatch ? 'MATCH' : 'No match'}`
                ],
                leftLabel: 'Three digits total',
                leftDigits: sumDigits,
                leftSum: sum,
                leftResult: finalDigit,
                rightLabel: 'Target unit',
                rightDigits: [all[n + 3][UNIT]],
                rightSum: targetDigit,
                rightResult: targetDigit
            },
            highlights: [
                {row: n, digit: TEN},
                {row: n, digit: UNIT},
                {row: n + 1, digit: TEN},
                {row: n + 3, digit: UNIT}
            ],
            arrows: [
                {startRow: n, startDigit: TEN, endRow: n, endDigit: UNIT},
                {startRow: n, startDigit: UNIT, endRow: n + 1, endDigit: TEN}
            ]
        });
    }
    return results;
}


// ========== M21 LOGIC ==========
// Each group uses four consecutive rows; next start advances by two rows.
// Sum = Row N ten + Row N+2 hundred + Row N+2 unit.
// Compare sum % 10 with Row N+3 hundred.
// Odd starts: Rows 1, 3, 5, 7...
// Even starts: Rows 2, 4, 6, 8...
function analyzeM21(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(
        numbers, calcM21(numbers, 0), 'odd',
        'M21 Table - Odd (Rows 1–4, 3–6, 5–8...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += renderWithArrows(
        numbers, calcM21(numbers, 1), 'even',
        'M21 Table - Even (Rows 2–5, 4–7, 6–9...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += '</div>';
    m21Container.innerHTML = html;
}

function calcM21(all, startIdx) {
    const HUNDRED = 0;
    const TEN = 1;
    const UNIT = 2;
    const results = [];
    for (let n = startIdx; n + 3 < all.length; n += 2) {
        const sumDigits = [all[n][TEN], all[n + 2][HUNDRED], all[n + 2][UNIT]];
        const sum = sumDigits.reduce((total, digit) => total + parseInt(digit, 10), 0);
        const finalDigit = sum % 10;
        const targetDigit = parseInt(all[n + 3][HUNDRED], 10);
        const isMatch = finalDigit === targetDigit;

        results.push({
            isMatch,
            calculation: {
                groupLabel: `Rows ${n + 1} & ${n + 4}`,
                detailLines: [
                    `Row ${n + 1} Ten ${sumDigits[0]} + Row ${n + 3} Hundred ${sumDigits[1]} + Row ${n + 3} Unit ${sumDigits[2]} = ${sum} → ${finalDigit}`,
                    `Compare with Row ${n + 4} Hundred ${targetDigit} → ${isMatch ? 'MATCH' : 'No match'}`
                ],
                leftLabel: 'Three digits total',
                leftDigits: sumDigits,
                leftSum: sum,
                leftResult: finalDigit,
                rightLabel: 'Target hundred',
                rightDigits: [all[n + 3][HUNDRED]],
                rightSum: targetDigit,
                rightResult: targetDigit
            },
            highlights: [
                {row: n, digit: TEN},
                {row: n + 2, digit: HUNDRED},
                {row: n + 2, digit: UNIT},
                {row: n + 3, digit: HUNDRED}
            ],
            arrows: [
                {startRow: n, startDigit: TEN, endRow: n + 2, endDigit: HUNDRED},
                {startRow: n + 2, startDigit: HUNDRED, endRow: n + 2, endDigit: UNIT}
            ]
        });
    }
    return results;
}


// ========== M22 LOGIC ==========
// Each group compares the first row with the third row.
// A = Row N hundred + Row N unit.
// B = Row N+2 ten + Row N+2 unit.
// Compare A % 10 with B % 10.
// Odd starts: Rows 1, 4, 7, 10...
// Even starts: Rows 2, 5, 8, 11...
// Each next group advances by three rows.
function analyzeM22(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(
        numbers, calcM22(numbers, 0), 'odd',
        'M22 Table - Odd (Rows 1 & 3, 4 & 6, 7 & 9...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += renderWithArrows(
        numbers, calcM22(numbers, 1), 'even',
        'M22 Table - Even (Rows 2 & 4, 5 & 7, 8 & 10...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += '</div>';
    m22Container.innerHTML = html;
}

function calcM22(all, startIdx) {
    const HUNDRED = 0;
    const TEN = 1;
    const UNIT = 2;
    const results = [];
    for (let n = startIdx; n + 2 < all.length; n += 3) {
        const aDigits = [all[n][HUNDRED], all[n][UNIT]];
        const bDigits = [all[n + 2][TEN], all[n + 2][UNIT]];
        const aSum = aDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const bSum = bDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const aResult = aSum % 10;
        const bResult = bSum % 10;
        const isMatch = aResult === bResult;

        results.push({
            isMatch,
            calculation: {
                groupLabel: `Rows ${n + 1} & ${n + 3}`,
                detailLines: [
                    `A: Row ${n + 1} Hundred ${aDigits[0]} + Row ${n + 1} Unit ${aDigits[1]} = ${aSum} → ${aResult}`,
                    `B: Row ${n + 3} Ten ${bDigits[0]} + Row ${n + 3} Unit ${bDigits[1]} = ${bSum} → ${bResult}`,
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
                {row: n, digit: HUNDRED},
                {row: n, digit: UNIT},
                {row: n + 2, digit: TEN},
                {row: n + 2, digit: UNIT}
            ],
            arrows: [
                {startRow: n, startDigit: HUNDRED, endRow: n, endDigit: UNIT},
                {startRow: n + 2, startDigit: TEN, endRow: n + 2, endDigit: UNIT}
            ]
        });
    }
    return results;
}


// ========== M22 NEW LOGIC ==========
// Separate variant: the existing M22 table remains unchanged.
// A = Row N hundred + Row N+2 ten.
// Compare A % 10 with Row N+1 unit.
// Odd starts: Rows 1, 3, 5, 7...
// Even starts: Rows 2, 4, 6, 8...
// Each next group advances by two rows.
function analyzeM22New(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(
        numbers, calcM22New(numbers, 0), 'odd',
        'M22-New Table - Odd (Rows 1 & 3, 3 & 5, 5 & 7...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += renderWithArrows(
        numbers, calcM22New(numbers, 1), 'even',
        'M22-New Table - Even (Rows 2 & 4, 4 & 6, 6 & 8...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += '</div>';
    m22NewContainer.innerHTML = html;
}

function calcM22New(all, startIdx) {
    const HUNDRED = 0;
    const TEN = 1;
    const UNIT = 2;
    const results = [];
    for (let n = startIdx; n + 2 < all.length; n += 2) {
        const sumDigits = [all[n][HUNDRED], all[n + 2][TEN]];
        const sum = sumDigits.reduce((total, digit) => total + parseInt(digit, 10), 0);
        const finalDigit = sum % 10;
        const targetDigit = parseInt(all[n + 1][UNIT], 10);
        const isMatch = finalDigit === targetDigit;

        results.push({
            isMatch,
            calculation: {
                groupLabel: `Rows ${n + 1} & ${n + 3} (Middle Row ${n + 2})`,
                detailLines: [
                    `A: Row ${n + 1} Hundred ${sumDigits[0]} + Row ${n + 3} Ten ${sumDigits[1]} = ${sum} → ${finalDigit}`,
                    `Compare with Row ${n + 2} Unit ${targetDigit} → ${isMatch ? 'MATCH' : 'No match'}`
                ],
                leftLabel: 'A',
                leftDigits: sumDigits,
                leftSum: sum,
                leftResult: finalDigit,
                rightLabel: 'Middle row unit',
                rightDigits: [all[n + 1][UNIT]],
                rightSum: targetDigit,
                rightResult: targetDigit
            },
            highlights: [
                {row: n, digit: HUNDRED},
                {row: n + 2, digit: TEN},
                {row: n + 1, digit: UNIT}
            ],
            arrows: [
                {startRow: n, startDigit: HUNDRED, endRow: n + 2, endDigit: TEN}
            ]
        });
    }
    return results;
}


// ========== M23 LOGIC ==========
// A = Row N hundred + Row N+1 tens.
// B = Row N+1 hundred + Row N+2 hundred.
// Compare A % 10 with B % 10.
// Odd starts at Row 1; Even starts at Row 2.
// Both tables slide forward one row for each next group.
function analyzeM23(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(
        numbers,
        calcM23(numbers, 0),
        'odd',
        'M23 Table - Odd (Rows 1 & 3, 2 & 4, 3 & 5...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += renderWithArrows(
        numbers,
        calcM23(numbers, 1),
        'even',
        'M23 Table - Even (Rows 2 & 4, 3 & 5, 4 & 6...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += '</div>';
    m23Container.innerHTML = html;
}

function calcM23(all, startIdx) {
    const HUNDRED = 0;
    const TEN = 1;
    const results = [];

    for (let n = startIdx; n + 2 < all.length; n += 1) {
        const aDigits = [all[n][HUNDRED], all[n + 1][TEN]];
        const bDigits = [all[n + 1][HUNDRED], all[n + 2][HUNDRED]];
        const aSum = aDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const bSum = bDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const aResult = aSum % 10;
        const bResult = bSum % 10;
        const isMatch = aResult === bResult;

        results.push({
            isMatch,
            calculation: {
                groupLabel: `Rows ${n + 1}–${n + 3}`,
                detailLines: [
                    `A: Row ${n + 1} Hundred ${aDigits[0]} + Row ${n + 2} Ten ${aDigits[1]} = ${aSum} → ${aResult}`,
                    `B: Row ${n + 2} Hundred ${bDigits[0]} + Row ${n + 3} Hundred ${bDigits[1]} = ${bSum} → ${bResult}`,
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
                {row: n, digit: HUNDRED},
                {row: n + 1, digit: TEN},
                {row: n + 1, digit: HUNDRED},
                {row: n + 2, digit: HUNDRED}
            ],
            arrows: [
                {startRow: n, startDigit: HUNDRED, endRow: n + 1, endDigit: TEN},
                {startRow: n + 1, startDigit: HUNDRED, endRow: n + 2, endDigit: HUNDRED}
            ]
        });
    }
    return results;
}


// ========== M25 LOGIC ==========
// A = Row N hundred + Row N+2 tens.
// B = Row N+1 units + Row N+2 hundred.
// Compare A % 10 with B % 10.
// Odd starts at Row 1; Even starts at Row 2.
// Both tables slide forward one row for each next group.
function analyzeM25(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(
        numbers,
        calcM25(numbers, 0),
        'odd',
        'M25 Table - Odd (Rows 1–3, 2–4, 3–5, 4–6...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += renderWithArrows(
        numbers,
        calcM25(numbers, 1),
        'even',
        'M25 Table - Even (Rows 2–4, 3–5, 4–6, 5–7...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += '</div>';
    m25Container.innerHTML = html;
}

function calcM25(all, startIdx) {
    const HUNDRED = 0;
    const TEN = 1;
    const UNIT = 2;
    const results = [];

    for (let n = startIdx; n + 2 < all.length; n += 1) {
        const aDigits = [all[n][HUNDRED], all[n + 2][TEN]];
        const bDigits = [all[n + 1][UNIT], all[n + 2][HUNDRED]];
        const aSum = aDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const bSum = bDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const aResult = aSum % 10;
        const bResult = bSum % 10;
        const isMatch = aResult === bResult;

        results.push({
            isMatch,
            calculation: {
                groupLabel: `Rows ${n + 1}–${n + 3}`,
                detailLines: [
                    `A: Row ${n + 1} Hundred ${aDigits[0]} + Row ${n + 3} Ten ${aDigits[1]} = ${aSum} → ${aResult}`,
                    `B: Row ${n + 2} Unit ${bDigits[0]} + Row ${n + 3} Hundred ${bDigits[1]} = ${bSum} → ${bResult}`,
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
                {row: n, digit: HUNDRED},
                {row: n + 2, digit: TEN},
                {row: n + 1, digit: UNIT},
                {row: n + 2, digit: HUNDRED}
            ],
            arrows: [
                {startRow: n, startDigit: HUNDRED, endRow: n + 2, endDigit: TEN},
                {startRow: n + 1, startDigit: UNIT, endRow: n + 2, endDigit: HUNDRED}
            ]
        });
    }
    return results;
}


// ========== M26 LOGIC ==========
// A = Row N hundred + Row N+1 hundred.
// B = Row N+2 tens + Row N+3 hundred + Row N+3 unit.
// Compare A % 10 with B % 10.
// Odd starts at Row 1; Even starts at Row 2.
// Both tables slide forward one row for each next group.
function analyzeM26(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(
        numbers,
        calcM26(numbers, 0),
        'odd',
        'M26 Table - Odd (Rows 1–4, 2–5, 3–6, 4–7...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += renderWithArrows(
        numbers,
        calcM26(numbers, 1),
        'even',
        'M26 Table - Even (Rows 2–5, 3–6, 4–7, 5–8...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += '</div>';
    m26Container.innerHTML = html;
}

function calcM26(all, startIdx) {
    const HUNDRED = 0;
    const TEN = 1;
    const UNIT = 2;
    const results = [];

    for (let n = startIdx; n + 3 < all.length; n += 1) {
        const aDigits = [all[n][HUNDRED], all[n + 1][HUNDRED]];
        const bDigits = [all[n + 2][TEN], all[n + 3][HUNDRED], all[n + 3][UNIT]];
        const aSum = aDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const bSum = bDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const aResult = aSum % 10;
        const bResult = bSum % 10;
        const isMatch = aResult === bResult;

        results.push({
            isMatch,
            calculation: {
                groupLabel: `Rows ${n + 1}–${n + 4} (Rows ${n + 1} & ${n + 4})`,
                detailLines: [
                    `A: Row ${n + 1} Hundred ${aDigits[0]} + Row ${n + 2} Hundred ${aDigits[1]} = ${aSum} → ${aResult}`,
                    `B: Row ${n + 3} Ten ${bDigits[0]} + Row ${n + 4} Hundred ${bDigits[1]} + Row ${n + 4} Unit ${bDigits[2]} = ${bSum} → ${bResult}`,
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
                {row: n, digit: HUNDRED},
                {row: n + 1, digit: HUNDRED},
                {row: n + 2, digit: TEN},
                {row: n + 3, digit: HUNDRED},
                {row: n + 3, digit: UNIT}
            ],
            arrows: [
                {startRow: n, startDigit: HUNDRED, endRow: n + 1, endDigit: HUNDRED},
                {startRow: n + 2, startDigit: TEN, endRow: n + 3, endDigit: HUNDRED},
                {startRow: n + 3, startDigit: HUNDRED, endRow: n + 3, endDigit: UNIT}
            ]
        });
    }
    return results;
}


// ========== M27 LOGIC ==========
// Sum = Row N unit + Row N+1 tens + Row N+2 hundred.
// Compare sum % 10 with Row N+3 hundred.
// Odd starts: Rows 1, 6, 11, 16...
// Even starts: Rows 2, 7, 12, 17...
// Each next group starts five rows later and uses four rows.
function analyzeM27(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(
        numbers,
        calcM27(numbers, 0),
        'odd',
        'M27 Table - Odd (Rows 1–4, 6–9, 11–14, 16–19...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += renderWithArrows(
        numbers,
        calcM27(numbers, 1),
        'even',
        'M27 Table - Even (Rows 2–5, 7–10, 12–15, 17–20...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += '</div>';
    m27Container.innerHTML = html;
}

function calcM27(all, startIdx) {
    const HUNDRED = 0;
    const TEN = 1;
    const UNIT = 2;
    const results = [];

    for (let n = startIdx; n + 3 < all.length; n += 5) {
        const sumDigits = [all[n][UNIT], all[n + 1][TEN], all[n + 2][HUNDRED]];
        const sum = sumDigits.reduce((total, digit) => total + parseInt(digit, 10), 0);
        const finalDigit = sum % 10;
        const targetDigit = parseInt(all[n + 3][HUNDRED], 10);
        const isMatch = finalDigit === targetDigit;

        results.push({
            isMatch,
            calculation: {
                groupLabel: `Rows ${n + 1}–${n + 4} (Rows ${n + 1} & ${n + 4})`,
                detailLines: [
                    `Row ${n + 1} Unit ${sumDigits[0]} + Row ${n + 2} Ten ${sumDigits[1]} + Row ${n + 3} Hundred ${sumDigits[2]} = ${sum} → ${finalDigit}`,
                    `Compare with Row ${n + 4} Hundred ${targetDigit} → ${isMatch ? 'MATCH' : 'No match'}`
                ],
                leftLabel: 'Three selected digits',
                leftDigits: sumDigits,
                leftSum: sum,
                leftResult: finalDigit,
                rightLabel: 'Target hundred',
                rightDigits: [all[n + 3][HUNDRED]],
                rightSum: targetDigit,
                rightResult: targetDigit
            },
            highlights: [
                {row: n, digit: UNIT},
                {row: n + 1, digit: TEN},
                {row: n + 2, digit: HUNDRED},
                {row: n + 3, digit: HUNDRED}
            ],
            arrows: [
                {startRow: n, startDigit: UNIT, endRow: n + 1, endDigit: TEN},
                {startRow: n + 1, startDigit: TEN, endRow: n + 2, endDigit: HUNDRED}
            ]
        });
    }
    return results;
}


// ========== M28 LOGIC ==========
// A = Row N tens + Row N+2 hundred.
// B = Row N+1 hundred + Row N+2 tens.
// Compare A % 10 with B % 10.
// Odd starts at Rows 1, 6, 11...; Even starts at Rows 2, 7, 12...
// Each next group starts five rows later.
function analyzeM28(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(
        numbers,
        calcM28(numbers, 0),
        'odd',
        'M28 Table - Odd (Rows 1 & 3, 6 & 8, 11 & 13, 16 & 18...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += renderWithArrows(
        numbers,
        calcM28(numbers, 1),
        'even',
        'M28 Table - Even (Rows 2 & 4, 7 & 9, 12 & 14, 17 & 19...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += '</div>';
    m28Container.innerHTML = html;
}

function calcM28(all, startIdx) {
    const HUNDRED = 0;
    const TEN = 1;
    const results = [];

    for (let n = startIdx; n + 2 < all.length; n += 5) {
        const aDigits = [all[n][TEN], all[n + 2][HUNDRED]];
        const bDigits = [all[n + 1][HUNDRED], all[n + 2][TEN]];
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
                    `A: Row ${n + 1} Ten ${aDigits[0]} + Row ${n + 3} Hundred ${aDigits[1]} = ${aSum} → ${aResult}`,
                    `B: Row ${n + 2} Hundred ${bDigits[0]} + Row ${n + 3} Ten ${bDigits[1]} = ${bSum} → ${bResult}`,
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
                {row: n, digit: TEN},
                {row: n + 2, digit: HUNDRED},
                {row: n + 1, digit: HUNDRED},
                {row: n + 2, digit: TEN}
            ],
            arrows: [
                {startRow: n, startDigit: TEN, endRow: n + 2, endDigit: HUNDRED},
                {startRow: n + 1, startDigit: HUNDRED, endRow: n + 2, endDigit: TEN}
            ]
        });
    }
    return results;
}


// ========== M29 LOGIC ==========
// A = Row N hundred + Row N tens.
// B = Row N+1 hundred + tens + unit.
// Compare A % 10 with B % 10.
// Odd starts at Row 1; Even starts at Row 2.
// Each next group advances by two rows.
function analyzeM29(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(
        numbers,
        calcM29(numbers, 0),
        'odd',
        'M29 Table - Odd (Rows 1–2, 3–4, 5–6, 7–8...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += renderWithArrows(
        numbers,
        calcM29(numbers, 1),
        'even',
        'M29 Table - Even (Rows 2–3, 4–5, 6–7, 8–9...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += '</div>';
    m29Container.innerHTML = html;
}

function calcM29(all, startIdx) {
    const HUNDRED = 0;
    const TEN = 1;
    const UNIT = 2;
    const results = [];

    for (let n = startIdx; n + 1 < all.length; n += 2) {
        const aDigits = [all[n][HUNDRED], all[n][TEN]];
        const bDigits = [all[n + 1][HUNDRED], all[n + 1][TEN], all[n + 1][UNIT]];
        const aSum = aDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const bSum = bDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const aResult = aSum % 10;
        const bResult = bSum % 10;
        const isMatch = aResult === bResult;

        results.push({
            isMatch,
            calculation: {
                groupLabel: `Rows ${n + 1}–${n + 2}`,
                detailLines: [
                    `A: Row ${n + 1} Hundred ${aDigits[0]} + Row ${n + 1} Ten ${aDigits[1]} = ${aSum} → ${aResult}`,
                    `B: Row ${n + 2} Hundred ${bDigits[0]} + Row ${n + 2} Ten ${bDigits[1]} + Row ${n + 2} Unit ${bDigits[2]} = ${bSum} → ${bResult}`,
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
                {row: n, digit: HUNDRED},
                {row: n, digit: TEN},
                {row: n + 1, digit: HUNDRED},
                {row: n + 1, digit: TEN},
                {row: n + 1, digit: UNIT}
            ],
            arrows: [
                {startRow: n, startDigit: HUNDRED, endRow: n, endDigit: TEN},
                {startRow: n + 1, startDigit: HUNDRED, endRow: n + 1, endDigit: TEN},
                {startRow: n + 1, startDigit: TEN, endRow: n + 1, endDigit: UNIT}
            ]
        });
    }
    return results;
}


// ========== M30 LOGIC ==========
// A = Row N tens + Row N+1 tens.
// B = Row N+2 hundred + Row N+2 tens + Row N+4 hundred.
// Compare A % 10 with B % 10.
// Odd starts: Rows 1, 3, 5...; Even starts: Rows 2, 4, 6...
// Each next group advances by two rows across a five-row span.
function analyzeM30(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(
        numbers,
        calcM30(numbers, 0),
        'odd',
        'M30 Table - Odd (Rows 1 & 5, 3 & 7, 5 & 9, 7 & 11...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += renderWithArrows(
        numbers,
        calcM30(numbers, 1),
        'even',
        'M30 Table - Even (Rows 2 & 6, 4 & 8, 6 & 10, 8 & 12...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += '</div>';
    m30Container.innerHTML = html;
}

function calcM30(all, startIdx) {
    const HUNDRED = 0;
    const TEN = 1;
    const results = [];

    for (let n = startIdx; n + 4 < all.length; n += 2) {
        const aDigits = [all[n][TEN], all[n + 1][TEN]];
        const bDigits = [all[n + 2][HUNDRED], all[n + 2][TEN], all[n + 4][HUNDRED]];
        const aSum = aDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const bSum = bDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const aResult = aSum % 10;
        const bResult = bSum % 10;
        const isMatch = aResult === bResult;

        results.push({
            isMatch,
            calculation: {
                groupLabel: `Rows ${n + 1} & ${n + 5} (Rows ${n + 1}–${n + 5})`,
                detailLines: [
                    `A: Row ${n + 1} Ten ${aDigits[0]} + Row ${n + 2} Ten ${aDigits[1]} = ${aSum} → ${aResult}`,
                    `B: Row ${n + 3} Hundred ${bDigits[0]} + Row ${n + 3} Ten ${bDigits[1]} + Row ${n + 5} Hundred ${bDigits[2]} = ${bSum} → ${bResult}`,
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
                {row: n, digit: TEN},
                {row: n + 1, digit: TEN},
                {row: n + 2, digit: HUNDRED},
                {row: n + 2, digit: TEN},
                {row: n + 4, digit: HUNDRED}
            ],
            arrows: [
                {startRow: n, startDigit: TEN, endRow: n + 1, endDigit: TEN},
                {startRow: n + 2, startDigit: HUNDRED, endRow: n + 2, endDigit: TEN},
                {startRow: n + 2, startDigit: TEN, endRow: n + 4, endDigit: HUNDRED}
            ]
        });
    }
    return results;
}


// ========== M31 LOGIC ==========
// A = Row N hundred + Row N tens.
// B = Row N+4 unit + Row N+5 unit.
// Compare A % 10 with B % 10.
// Odd starts at Row 1; Even starts at Row 2.
// Each next group advances by one row.
function analyzeM31(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(
        numbers,
        calcM31(numbers, 0),
        'odd',
        'M31 Table - Odd (Rows 1 & 6, 2 & 7, 3 & 8, 4 & 9...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += renderWithArrows(
        numbers,
        calcM31(numbers, 1),
        'even',
        'M31 Table - Even (Rows 2 & 7, 3 & 8, 4 & 9, 5 & 10...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += '</div>';
    m31Container.innerHTML = html;
}

function calcM31(all, startIdx) {
    const HUNDRED = 0;
    const TEN = 1;
    const UNIT = 2;
    const results = [];

    for (let n = startIdx; n + 5 < all.length; n += 1) {
        const aDigits = [all[n][HUNDRED], all[n][TEN]];
        const bDigits = [all[n + 4][UNIT], all[n + 5][UNIT]];
        const aSum = aDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const bSum = bDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const aResult = aSum % 10;
        const bResult = bSum % 10;
        const isMatch = aResult === bResult;

        results.push({
            isMatch,
            calculation: {
                groupLabel: `Rows ${n + 1} & ${n + 6} (Rows ${n + 1}–${n + 6})`,
                detailLines: [
                    `A: Row ${n + 1} Hundred ${aDigits[0]} + Row ${n + 1} Ten ${aDigits[1]} = ${aSum} → ${aResult}`,
                    `B: Row ${n + 5} Unit ${bDigits[0]} + Row ${n + 6} Unit ${bDigits[1]} = ${bSum} → ${bResult}`,
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
                {row: n, digit: HUNDRED},
                {row: n, digit: TEN},
                {row: n + 4, digit: UNIT},
                {row: n + 5, digit: UNIT}
            ],
            arrows: [
                {startRow: n, startDigit: HUNDRED, endRow: n, endDigit: TEN},
                {startRow: n + 4, startDigit: UNIT, endRow: n + 5, endDigit: UNIT}
            ]
        });
    }
    return results;
}


// ========== M32 LOGIC ==========
// A = Row N hundred + Row N+3 tens.
// B = Row N+1 tens + Row N+2 unit.
// Compare A % 10 with B % 10; Odd/Even windows slide by one row.
function analyzeM32(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(numbers, calcM32(numbers, 0), 'odd',
        'M32 Table - Odd (Rows 1–4, 2–5, 3–6, 4–7...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true });
    html += renderWithArrows(numbers, calcM32(numbers, 1), 'even',
        'M32 Table - Even (Rows 2–5, 3–6, 4–7, 5–8...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true });
    html += '</div>';
    m32Container.innerHTML = html;
}

function calcM32(all, startIdx) {
    const HUNDRED = 0, TEN = 1, UNIT = 2;
    const results = [];
    for (let n = startIdx; n + 3 < all.length; n += 1) {
        const aDigits = [all[n][HUNDRED], all[n + 3][TEN]];
        const bDigits = [all[n + 1][TEN], all[n + 2][UNIT]];
        const aSum = aDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const bSum = bDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const aResult = aSum % 10, bResult = bSum % 10;
        const isMatch = aResult === bResult;
        results.push({
            isMatch,
            calculation: {
                groupLabel: `Rows ${n + 1}–${n + 4}`,
                detailLines: [
                    `A: Row ${n + 1} Hundred ${aDigits[0]} + Row ${n + 4} Ten ${aDigits[1]} = ${aSum} → ${aResult}`,
                    `B: Row ${n + 2} Ten ${bDigits[0]} + Row ${n + 3} Unit ${bDigits[1]} = ${bSum} → ${bResult}`,
                    `A ${aResult} ${isMatch ? '=' : '≠'} B ${bResult} → ${isMatch ? 'MATCH' : 'No match'}`
                ],
                leftLabel: 'A', leftDigits: aDigits, leftSum: aSum, leftResult: aResult,
                rightLabel: 'B', rightDigits: bDigits, rightSum: bSum, rightResult: bResult
            },
            highlights: [
                {row:n,digit:HUNDRED},{row:n+3,digit:TEN},
                {row:n+1,digit:TEN},{row:n+2,digit:UNIT}
            ],
            arrows: [
                {startRow:n,startDigit:HUNDRED,endRow:n+3,endDigit:TEN},
                {startRow:n+1,startDigit:TEN,endRow:n+2,endDigit:UNIT}
            ]
        });
    }
    return results;
}


// ========== M33 LOGIC ==========
// A = Row N tens + Row N+1 hundreds.
// B = Row N+1 tens + Row N+2 tens.
// Compare A % 10 with B % 10.
// Odd starts: Rows 1, 5, 9, 13...; Even starts: Rows 2, 6, 10, 14...
// Each next group advances four rows.
function analyzeM33(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(
        numbers,
        calcM33(numbers, 0),
        'odd',
        'M33 Table - Odd (Rows 1–3, 5–7, 9–11, 13–15...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += renderWithArrows(
        numbers,
        calcM33(numbers, 1),
        'even',
        'M33 Table - Even (Rows 2–4, 6–8, 10–12, 14–16...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += '</div>';
    m33Container.innerHTML = html;
}

function calcM33(all, startIdx) {
    const HUNDRED = 0, TEN = 1;
    const results = [];

    for (let n = startIdx; n + 2 < all.length; n += 4) {
        const aDigits = [all[n][TEN], all[n + 1][HUNDRED]];
        const bDigits = [all[n + 1][TEN], all[n + 2][TEN]];
        const aSum = aDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const bSum = bDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const aResult = aSum % 10;
        const bResult = bSum % 10;
        const isMatch = aResult === bResult;

        results.push({
            isMatch,
            calculation: {
                groupLabel: 'Rows ' + (n + 1) + '–' + (n + 3),
                detailLines: [
                    'A: Row ' + (n + 1) + ' Ten ' + aDigits[0] +
                        ' + Row ' + (n + 2) + ' Hundred ' + aDigits[1] +
                        ' = ' + aSum + ' → ' + aResult,
                    'B: Row ' + (n + 2) + ' Ten ' + bDigits[0] +
                        ' + Row ' + (n + 3) + ' Ten ' + bDigits[1] +
                        ' = ' + bSum + ' → ' + bResult,
                    'A ' + aResult + (isMatch ? ' = ' : ' ≠ ') +
                        'B ' + bResult + ' → ' + (isMatch ? 'MATCH' : 'No match')
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
                {row: n, digit: TEN},
                {row: n + 1, digit: HUNDRED},
                {row: n + 1, digit: TEN},
                {row: n + 2, digit: TEN}
            ],
            arrows: [
                {startRow: n, startDigit: TEN, endRow: n + 1, endDigit: HUNDRED},
                {startRow: n + 1, startDigit: TEN, endRow: n + 2, endDigit: TEN}
            ]
        });
    }
    return results;
}


// ========== M34 LOGIC ==========
// A = Row N tens + Row N+1 hundreds.
// B = Row N+2 units + Row N+3 units.
// Compare the final digits of A and B (each sum modulo 10).
// Odd groups: Rows 1–4, 5–8, 9–12...
// Even groups: Rows 2–5, 6–9, 10–13...
// The next group starts four rows later.
function analyzeM34(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(
        numbers,
        calcM34(numbers, 0),
        'odd',
        'M34 Table - Odd (Rows 1–4, 5–8, 9–12, 13–16...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += renderWithArrows(
        numbers,
        calcM34(numbers, 1),
        'even',
        'M34 Table - Even (Rows 2–5, 6–9, 10–13, 14–17...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += '</div>';
    m34Container.innerHTML = html;
}

function calcM34(all, startIdx) {
    const HUNDRED = 0, TEN = 1, UNIT = 2;
    const results = [];

    for (let n = startIdx; n + 3 < all.length; n += 4) {
        const aDigits = [all[n][TEN], all[n + 1][HUNDRED]];
        const bDigits = [all[n + 2][UNIT], all[n + 3][UNIT]];
        const aSum = aDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const bSum = bDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const aResult = aSum % 10;
        const bResult = bSum % 10;
        const isMatch = aResult === bResult;

        results.push({
            isMatch,
            calculation: {
                groupLabel: 'Rows ' + (n + 1) + '–' + (n + 4),
                detailLines: [
                    'A: Row ' + (n + 1) + ' Ten ' + aDigits[0] +
                        ' + Row ' + (n + 2) + ' Hundred ' + aDigits[1] +
                        ' = ' + aSum + ' → ' + aResult,
                    'B: Row ' + (n + 3) + ' Unit ' + bDigits[0] +
                        ' + Row ' + (n + 4) + ' Unit ' + bDigits[1] +
                        ' = ' + bSum + ' → ' + bResult,
                    'A ' + aResult + (isMatch ? ' = ' : ' ≠ ') +
                        'B ' + bResult + ' → ' + (isMatch ? 'MATCH' : 'No match')
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
                {row: n, digit: TEN},
                {row: n + 1, digit: HUNDRED},
                {row: n + 2, digit: UNIT},
                {row: n + 3, digit: UNIT}
            ],
            arrows: [
                {startRow: n, startDigit: TEN, endRow: n + 1, endDigit: HUNDRED},
                {startRow: n + 2, startDigit: UNIT, endRow: n + 3, endDigit: UNIT}
            ]
        });
    }
    return results;
}


// ========== M35 LOGIC ==========
function analyzeM35(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(numbers, calcM35(numbers, 0), 'odd',
        'M35 Table - Odd (Rows 1–3, 5–7, 9–11, 13–15...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true });
    html += renderWithArrows(numbers, calcM35(numbers, 1), 'even',
        'M35 Table - Even (Rows 2–4, 6–8, 10–12, 14–16...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true });
    html += '</div>';
    m35Container.innerHTML = html;
}
function calcM35(all, startIdx) {
    const TEN = 1, UNIT = 2, results = [];
    for (let n = startIdx; n + 2 < all.length; n += 4) {
        const aDigits = [all[n][TEN], all[n + 1][TEN]];
        const bDigits = [all[n + 1][UNIT], all[n + 2][UNIT]];
        const aSum = aDigits.reduce((s,d)=>s+parseInt(d,10),0);
        const bSum = bDigits.reduce((s,d)=>s+parseInt(d,10),0);
        const aResult=aSum%10, bResult=bSum%10, isMatch=aResult===bResult;
        results.push({
            isMatch,
            calculation:{
                groupLabel:'Rows '+(n+1)+'–'+(n+3),
                detailLines:[
                    'A: Row '+(n+1)+' Ten '+aDigits[0]+' + Row '+(n+2)+' Ten '+aDigits[1]+' = '+aSum+' → '+aResult,
                    'B: Row '+(n+2)+' Unit '+bDigits[0]+' + Row '+(n+3)+' Unit '+bDigits[1]+' = '+bSum+' → '+bResult,
                    'A '+aResult+(isMatch?' = ':' ≠ ')+'B '+bResult+' → '+(isMatch?'MATCH':'No match')
                ],
                leftLabel:'A',leftDigits:aDigits,leftSum:aSum,leftResult:aResult,
                rightLabel:'B',rightDigits:bDigits,rightSum:bSum,rightResult:bResult
            },
            highlights:[
                {row:n,digit:TEN},{row:n+1,digit:TEN},
                {row:n+1,digit:UNIT},{row:n+2,digit:UNIT}
            ],
            arrows:[
                {startRow:n,startDigit:TEN,endRow:n+1,endDigit:TEN},
                {startRow:n+1,startDigit:UNIT,endRow:n+2,endDigit:UNIT}
            ]
        });
    }
    return results;
}


// ========== M36 LOGIC ==========
// Sum Row N unit + Row N+1 tens + Row N+2 hundreds.
// Compare the final digit (sum % 10) with Row N+3 tens.
function analyzeM36(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(numbers, calcM36(numbers, 0), 'odd',
        'M36 Table - Odd (Rows 1–4, 5–8, 9–12, 13–16...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true });
    html += renderWithArrows(numbers, calcM36(numbers, 1), 'even',
        'M36 Table - Even (Rows 2–5, 6–9, 10–13, 14–17...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true });
    html += '</div>';
    m36Container.innerHTML = html;
}

function calcM36(all, startIdx) {
    const HUNDRED = 0, TEN = 1, UNIT = 2;
    const results = [];
    for (let n = startIdx; n + 3 < all.length; n += 4) {
        const sumDigits = [all[n][UNIT], all[n + 1][TEN], all[n + 2][HUNDRED]];
        const sum = sumDigits.reduce((total, digit) => total + parseInt(digit, 10), 0);
        const finalDigit = sum % 10;
        const targetDigit = parseInt(all[n + 3][TEN], 10);
        const isMatch = finalDigit === targetDigit;
        results.push({
            isMatch,
            calculation: {
                groupLabel: 'Rows ' + (n + 1) + '–' + (n + 4),
                detailLines: [
                    'Sum: Row ' + (n + 1) + ' Unit ' + sumDigits[0] +
                        ' + Row ' + (n + 2) + ' Ten ' + sumDigits[1] +
                        ' + Row ' + (n + 3) + ' Hundred ' + sumDigits[2] +
                        ' = ' + sum + ' → ' + finalDigit,
                    'Target: Row ' + (n + 4) + ' Ten ' + targetDigit,
                    finalDigit + (isMatch ? ' = ' : ' ≠ ') + targetDigit +
                        ' → ' + (isMatch ? 'MATCH' : 'No match')
                ],
                leftLabel: 'Sum', leftDigits: sumDigits, leftSum: sum, leftResult: finalDigit,
                rightLabel: 'Target', rightDigits: [all[n + 3][TEN]], rightSum: targetDigit, rightResult: targetDigit
            },
            highlights: [
                {row: n, digit: UNIT},
                {row: n + 1, digit: TEN},
                {row: n + 2, digit: HUNDRED},
                {row: n + 3, digit: TEN}
            ],
            arrows: [
                {startRow: n, startDigit: UNIT, endRow: n + 1, endDigit: TEN},
                {startRow: n + 1, startDigit: TEN, endRow: n + 2, endDigit: HUNDRED}
            ]
        });
    }
    return results;
}


// ========== M37 LOGIC ==========
// A = Row N hundreds + Row N+1 tens.
// B = Row N tens + Row N+2 units + Row N+3 tens.
// Compare the last digits of A and B (both modulo 10).
// Odd groups: Rows 1–4, 5–8, 9–12...
// Even groups: Rows 2–5, 6–9, 10–13...
function analyzeM37(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(numbers, calcM37(numbers, 0), 'odd',
        'M37 Table - Odd (Rows 1–4, 5–8, 9–12, 13–16...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true });
    html += renderWithArrows(numbers, calcM37(numbers, 1), 'even',
        'M37 Table - Even (Rows 2–5, 6–9, 10–13, 14–17...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true });
    html += '</div>';
    m37Container.innerHTML = html;
}

function calcM37(all, startIdx) {
    const HUNDRED = 0, TEN = 1, UNIT = 2;
    const results = [];

    for (let n = startIdx; n + 3 < all.length; n += 4) {
        const aDigits = [all[n][HUNDRED], all[n + 1][TEN]];
        const bDigits = [all[n][TEN], all[n + 2][UNIT], all[n + 3][TEN]];
        const aSum = aDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const bSum = bDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const aResult = aSum % 10;
        const bResult = bSum % 10;
        const isMatch = aResult === bResult;

        results.push({
            isMatch,
            calculation: {
                groupLabel: 'Rows ' + (n + 1) + '–' + (n + 4),
                detailLines: [
                    'A: Row ' + (n + 1) + ' Hundred ' + aDigits[0] +
                        ' + Row ' + (n + 2) + ' Ten ' + aDigits[1] +
                        ' = ' + aSum + ' → ' + aResult,
                    'B: Row ' + (n + 1) + ' Ten ' + bDigits[0] +
                        ' + Row ' + (n + 3) + ' Unit ' + bDigits[1] +
                        ' + Row ' + (n + 4) + ' Ten ' + bDigits[2] +
                        ' = ' + bSum + ' → ' + bResult,
                    'A ' + aResult + (isMatch ? ' = ' : ' ≠ ') +
                        'B ' + bResult + ' → ' + (isMatch ? 'MATCH' : 'No match')
                ],
                leftLabel: 'A', leftDigits: aDigits, leftSum: aSum, leftResult: aResult,
                rightLabel: 'B', rightDigits: bDigits, rightSum: bSum, rightResult: bResult
            },
            highlights: [
                {row: n, digit: HUNDRED},
                {row: n + 1, digit: TEN},
                {row: n, digit: TEN},
                {row: n + 2, digit: UNIT},
                {row: n + 3, digit: TEN}
            ],
            arrows: [
                {startRow: n, startDigit: HUNDRED, endRow: n + 1, endDigit: TEN},
                {startRow: n, startDigit: TEN, endRow: n + 2, endDigit: UNIT},
                {startRow: n + 2, startDigit: UNIT, endRow: n + 3, endDigit: TEN}
            ]
        });
    }
    return results;
}


// ========== M38 LOGIC ==========
// A = Row N unit + Row N+1 unit.
// B = Row N tens + Row N+1 hundreds + Row N+2 unit.
// Compare the last digits of A and B (both modulo 10).
// Odd starts: Rows 1, 5, 9, 13... (each group uses three rows).
// Even starts: Rows 2, 6, 10, 14... (each group uses three rows).
function analyzeM38(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(numbers, calcM38(numbers, 0), 'odd',
        'M38 Table - Odd (Rows 1–3, 5–7, 9–11, 13–15...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true });
    html += renderWithArrows(numbers, calcM38(numbers, 1), 'even',
        'M38 Table - Even (Rows 2–4, 6–8, 10–12, 14–16...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true });
    html += '</div>';
    m38Container.innerHTML = html;
}

function calcM38(all, startIdx) {
    const HUNDRED = 0, TEN = 1, UNIT = 2;
    const results = [];

    for (let n = startIdx; n + 2 < all.length; n += 4) {
        const aDigits = [all[n][UNIT], all[n + 1][UNIT]];
        const bDigits = [all[n][TEN], all[n + 1][HUNDRED], all[n + 2][UNIT]];
        const aSum = aDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const bSum = bDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const aResult = aSum % 10;
        const bResult = bSum % 10;
        const isMatch = aResult === bResult;

        results.push({
            isMatch,
            calculation: {
                groupLabel: 'Rows ' + (n + 1) + '–' + (n + 3),
                detailLines: [
                    'A: Row ' + (n + 1) + ' Unit ' + aDigits[0] +
                        ' + Row ' + (n + 2) + ' Unit ' + aDigits[1] +
                        ' = ' + aSum + ' → ' + aResult,
                    'B: Row ' + (n + 1) + ' Ten ' + bDigits[0] +
                        ' + Row ' + (n + 2) + ' Hundred ' + bDigits[1] +
                        ' + Row ' + (n + 3) + ' Unit ' + bDigits[2] +
                        ' = ' + bSum + ' → ' + bResult,
                    'A ' + aResult + (isMatch ? ' = ' : ' ≠ ') +
                        'B ' + bResult + ' → ' + (isMatch ? 'MATCH' : 'No match')
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
                {row: n, digit: UNIT},
                {row: n + 1, digit: UNIT},
                {row: n, digit: TEN},
                {row: n + 1, digit: HUNDRED},
                {row: n + 2, digit: UNIT}
            ],
            arrows: [
                {startRow: n, startDigit: UNIT, endRow: n + 1, endDigit: UNIT},
                {startRow: n, startDigit: TEN, endRow: n + 1, endDigit: HUNDRED},
                {startRow: n + 1, startDigit: HUNDRED, endRow: n + 2, endDigit: UNIT}
            ]
        });
    }
    return results;
}


// ========== M39 LOGIC ==========
// Sum Row N tens + Row N units + Row N+2 units.
// Compare the final digit (sum % 10) with Row N+3 units.
// Odd groups: Rows 1–4, 5–8, 9–12...
// Even groups: Rows 2–5, 6–9, 10–13...
function analyzeM39(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(numbers, calcM39(numbers, 0), 'odd',
        'M39 Table - Odd (Rows 1–4, 5–8, 9–12, 13–16...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true });
    html += renderWithArrows(numbers, calcM39(numbers, 1), 'even',
        'M39 Table - Even (Rows 2–5, 6–9, 10–13, 14–17...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true });
    html += '</div>';
    m39Container.innerHTML = html;
}

function calcM39(all, startIdx) {
    const TEN = 1, UNIT = 2;
    const results = [];

    for (let n = startIdx; n + 3 < all.length; n += 4) {
        const sumDigits = [all[n][TEN], all[n][UNIT], all[n + 2][UNIT]];
        const sum = sumDigits.reduce((total, digit) => total + parseInt(digit, 10), 0);
        const finalDigit = sum % 10;
        const targetDigit = parseInt(all[n + 3][UNIT], 10);
        const isMatch = finalDigit === targetDigit;

        results.push({
            isMatch,
            calculation: {
                groupLabel: 'Rows ' + (n + 1) + '–' + (n + 4),
                detailLines: [
                    'Sum: Row ' + (n + 1) + ' Ten ' + sumDigits[0] +
                        ' + Row ' + (n + 1) + ' Unit ' + sumDigits[1] +
                        ' + Row ' + (n + 3) + ' Unit ' + sumDigits[2] +
                        ' = ' + sum + ' → ' + finalDigit,
                    'Target: Row ' + (n + 4) + ' Unit ' + targetDigit,
                    finalDigit + (isMatch ? ' = ' : ' ≠ ') + targetDigit +
                        ' → ' + (isMatch ? 'MATCH' : 'No match')
                ],
                leftLabel: 'Sum',
                leftDigits: sumDigits,
                leftSum: sum,
                leftResult: finalDigit,
                rightLabel: 'Target',
                rightDigits: [all[n + 3][UNIT]],
                rightSum: targetDigit,
                rightResult: targetDigit
            },
            highlights: [
                {row: n, digit: TEN},
                {row: n, digit: UNIT},
                {row: n + 2, digit: UNIT},
                {row: n + 3, digit: UNIT}
            ],
            arrows: [
                {startRow: n, startDigit: TEN, endRow: n, endDigit: UNIT},
                {startRow: n, startDigit: TEN, endRow: n + 2, endDigit: UNIT},
                {startRow: n, startDigit: UNIT, endRow: n + 2, endDigit: UNIT}
            ]
        });
    }
    return results;
}


// ========== M40 LOGIC ==========
// Target = Row N unit.
// Sum = Row N+1 tens + Row N+4 hundreds.
// Compare sum % 10 with the target unit.
// Odd starts at Row 1; Even starts at Row 2.
// Each next group advances the starting row by one.
function analyzeM40(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(numbers, calcM40(numbers, 0), 'odd',
        'M40 Table - Odd (Rows 1 & 5, 2 & 6, 3 & 7, 4 & 8...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true });
    html += renderWithArrows(numbers, calcM40(numbers, 1), 'even',
        'M40 Table - Even (Rows 2 & 6, 3 & 7, 4 & 8, 5 & 9...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true });
    html += '</div>';
    m40Container.innerHTML = html;
}

function calcM40(all, startIdx) {
    const HUNDRED = 0, TEN = 1, UNIT = 2;
    const results = [];

    for (let n = startIdx; n + 4 < all.length; n += 1) {
        const targetDigit = parseInt(all[n][UNIT], 10);
        const sumDigits = [all[n + 1][TEN], all[n + 4][HUNDRED]];
        const sum = sumDigits.reduce((total, digit) => total + parseInt(digit, 10), 0);
        const finalDigit = sum % 10;
        const isMatch = finalDigit === targetDigit;

        results.push({
            isMatch,
            calculation: {
                groupLabel: 'Rows ' + (n + 1) + ' & ' + (n + 5),
                detailLines: [
                    'Sum: Row ' + (n + 2) + ' Ten ' + sumDigits[0] +
                        ' + Row ' + (n + 5) + ' Hundred ' + sumDigits[1] +
                        ' = ' + sum + ' → ' + finalDigit,
                    'Target: Row ' + (n + 1) + ' Unit ' + targetDigit,
                    finalDigit + (isMatch ? ' = ' : ' ≠ ') + targetDigit +
                        ' → ' + (isMatch ? 'MATCH' : 'No match')
                ],
                leftLabel: 'Sum',
                leftDigits: sumDigits,
                leftSum: sum,
                leftResult: finalDigit,
                rightLabel: 'Target',
                rightDigits: [all[n][UNIT]],
                rightSum: targetDigit,
                rightResult: targetDigit
            },
            highlights: [
                {row: n + 1, digit: TEN},
                {row: n + 4, digit: HUNDRED},
                {row: n, digit: UNIT}
            ],
            arrows: [
                {startRow: n + 1, startDigit: TEN, endRow: n + 4, endDigit: HUNDRED}
            ]
        });
    }
    return results;
}


// ========== M41 LOGIC ==========
// A = Row N tens + Row N+1 tens + Row N+2 units.
// B = Row N+2 hundreds + Row N+2 tens.
// Compare A % 10 with B % 10.
function analyzeM41(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(numbers, calcM41(numbers, 0), 'odd',
        'M41 Table - Odd (Rows 1–3, 3–5, 5–7, 7–9...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true });
    html += renderWithArrows(numbers, calcM41(numbers, 1), 'even',
        'M41 Table - Even (Rows 2–4, 4–6, 6–8, 8–10...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true });
    html += '</div>';
    m41Container.innerHTML = html;
}

function calcM41(all, startIdx) {
    const HUNDRED = 0, TEN = 1, UNIT = 2;
    const results = [];
    for (let n = startIdx; n + 2 < all.length; n += 2) {
        const aDigits = [all[n][TEN], all[n + 1][TEN], all[n + 2][UNIT]];
        const bDigits = [all[n + 2][HUNDRED], all[n + 2][TEN]];
        const aSum = aDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const bSum = bDigits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
        const aResult = aSum % 10, bResult = bSum % 10;
        const isMatch = aResult === bResult;
        results.push({
            isMatch,
            calculation: {
                groupLabel: 'Rows ' + (n + 1) + '–' + (n + 3),
                detailLines: [
                    'A: Row ' + (n + 1) + ' Ten ' + aDigits[0] + ' + Row ' + (n + 2) + ' Ten ' + aDigits[1] + ' + Row ' + (n + 3) + ' Unit ' + aDigits[2] + ' = ' + aSum + ' → ' + aResult,
                    'B: Row ' + (n + 3) + ' Hundred ' + bDigits[0] + ' + Row ' + (n + 3) + ' Ten ' + bDigits[1] + ' = ' + bSum + ' → ' + bResult,
                    'A ' + aResult + (isMatch ? ' = ' : ' ≠ ') + 'B ' + bResult + ' → ' + (isMatch ? 'MATCH' : 'No match')
                ],
                leftLabel:'A', leftDigits:aDigits, leftSum:aSum, leftResult:aResult,
                rightLabel:'B', rightDigits:bDigits, rightSum:bSum, rightResult:bResult
            },
            highlights:[
                {row:n,digit:TEN},{row:n+1,digit:TEN},{row:n+2,digit:UNIT},
                {row:n+2,digit:HUNDRED},{row:n+2,digit:TEN}
            ],
            arrows:[
                {startRow:n,startDigit:TEN,endRow:n+1,endDigit:TEN},
                {startRow:n+1,startDigit:TEN,endRow:n+2,endDigit:UNIT},
                {startRow:n+2,startDigit:HUNDRED,endRow:n+2,endDigit:TEN}
            ]
        });
    }
    return results;
}


// ========== M42 LOGIC ==========
// Sum Row N unit + Row N+1 unit + Row N+2 hundred.
// Compare the final digit (sum % 10) with Row N tens.
// Odd starts: Rows 1–3, 4–6, 7–9...; Even starts: Rows 2–4, 5–7, 8–10...
function analyzeM42(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(numbers, calcM42(numbers, 0), 'odd',
        'M42 Table - Odd (Rows 1–3, 4–6, 7–9, 10–12...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true });
    html += renderWithArrows(numbers, calcM42(numbers, 1), 'even',
        'M42 Table - Even (Rows 2–4, 5–7, 8–10, 11–13...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true });
    html += '</div>';
    m42Container.innerHTML = html;
}

function calcM42(all, startIdx) {
    const HUNDRED = 0, TEN = 1, UNIT = 2;
    const results = [];

    for (let n = startIdx; n + 2 < all.length; n += 3) {
        const sumDigits = [all[n][UNIT], all[n + 1][UNIT], all[n + 2][HUNDRED]];
        const sum = sumDigits.reduce((total, digit) => total + parseInt(digit, 10), 0);
        const finalDigit = sum % 10;
        const targetDigit = parseInt(all[n][TEN], 10);
        const isMatch = finalDigit === targetDigit;

        results.push({
            isMatch,
            calculation: {
                groupLabel: 'Rows ' + (n + 1) + '–' + (n + 3),
                detailLines: [
                    'Sum: Row ' + (n + 1) + ' Unit ' + sumDigits[0] +
                        ' + Row ' + (n + 2) + ' Unit ' + sumDigits[1] +
                        ' + Row ' + (n + 3) + ' Hundred ' + sumDigits[2] +
                        ' = ' + sum + ' → ' + finalDigit,
                    'Target: Row ' + (n + 1) + ' Ten ' + targetDigit,
                    finalDigit + (isMatch ? ' = ' : ' ≠ ') + targetDigit +
                        ' → ' + (isMatch ? 'MATCH' : 'No match')
                ],
                leftLabel: 'Sum',
                leftDigits: sumDigits,
                leftSum: sum,
                leftResult: finalDigit,
                rightLabel: 'Target',
                rightDigits: [all[n][TEN]],
                rightSum: targetDigit,
                rightResult: targetDigit
            },
            highlights: [
                {row: n, digit: TEN},
                {row: n, digit: UNIT},
                {row: n + 1, digit: UNIT},
                {row: n + 2, digit: HUNDRED}
            ],
            arrows: [
                {startRow: n, startDigit: UNIT, endRow: n + 1, endDigit: UNIT},
                {startRow: n + 1, startDigit: UNIT, endRow: n + 2, endDigit: HUNDRED}
            ]
        });
    }
    return results;
}


// ========== M43 LOGIC ==========
// A = Row N tens + Row N units + Row N+1 hundreds.
// B = Row N+1 tens + Row N+1 units.
// Compare A % 10 with B % 10.
// Odd starts at rows 1, 6, 11...; Even starts at rows 2, 7, 12...
function analyzeM43(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(numbers, calcM43(numbers, 0), 'odd',
        'M43 Table - Odd (Rows 1–2, 6–7, 11–12, 16–17...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true });
    html += renderWithArrows(numbers, calcM43(numbers, 1), 'even',
        'M43 Table - Even (Rows 2–3, 7–8, 12–13, 17–18...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true });
    html += '</div>';
    m43Container.innerHTML = html;
}

function calcM43(all, startIdx) {
    const HUNDRED = 0, TEN = 1, UNIT = 2;
    const results = [];

    for (let n = startIdx; n + 1 < all.length; n += 5) {
        const aDigits = [all[n][TEN], all[n][UNIT], all[n + 1][HUNDRED]];
        const bDigits = [all[n + 1][TEN], all[n + 1][UNIT]];
        const aSum = aDigits.reduce((total, digit) => total + parseInt(digit, 10), 0);
        const bSum = bDigits.reduce((total, digit) => total + parseInt(digit, 10), 0);
        const aResult = aSum % 10;
        const bResult = bSum % 10;
        const isMatch = aResult === bResult;

        results.push({
            isMatch,
            calculation: {
                groupLabel: 'Rows ' + (n + 1) + ' & ' + (n + 2),
                detailLines: [
                    'A: Row ' + (n + 1) + ' Ten ' + aDigits[0] +
                        ' + Row ' + (n + 1) + ' Unit ' + aDigits[1] +
                        ' + Row ' + (n + 2) + ' Hundred ' + aDigits[2] +
                        ' = ' + aSum + ' → ' + aResult,
                    'B: Row ' + (n + 2) + ' Ten ' + bDigits[0] +
                        ' + Row ' + (n + 2) + ' Unit ' + bDigits[1] +
                        ' = ' + bSum + ' → ' + bResult,
                    'A ' + aResult + (isMatch ? ' = ' : ' ≠ ') + 'B ' + bResult +
                        ' → ' + (isMatch ? 'MATCH' : 'No match')
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
                {row: n, digit: TEN},
                {row: n, digit: UNIT},
                {row: n + 1, digit: HUNDRED},
                {row: n + 1, digit: TEN},
                {row: n + 1, digit: UNIT}
            ],
            arrows: [
                {startRow: n, startDigit: TEN, endRow: n, endDigit: UNIT},
                {startRow: n, startDigit: UNIT, endRow: n + 1, endDigit: HUNDRED},
                {startRow: n + 1, startDigit: TEN, endRow: n + 1, endDigit: UNIT}
            ]
        });
    }
    return results;
}


// ========== M44 LOGIC ==========
// Each group uses Rows N, N+1, and N+2. The next group starts 3 rows later.
// A = Row N Unit + Row N+1 Unit.
// B = Row N Ten + Row N+2 Hundred + Row N+2 Unit.
// Compare A % 10 with B % 10.
function analyzeM44(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(
        numbers,
        calcM44(numbers, 0),
        'odd',
        'M44 Table - Odd (Rows 1–3, 4–6, 7–9, 10–12...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += renderWithArrows(
        numbers,
        calcM44(numbers, 1),
        'even',
        'M44 Table - Even (Rows 2–4, 5–7, 8–10, 11–13...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += '</div>';
    m44Container.innerHTML = html;
}

function calcM44(all, startIdx) {
    const HUNDRED = 0, TEN = 1, UNIT = 2;
    const results = [];

    for (let n = startIdx; n + 2 < all.length; n += 3) {
        const aDigits = [all[n][UNIT], all[n + 1][UNIT]];
        const bDigits = [all[n][TEN], all[n + 2][HUNDRED], all[n + 2][UNIT]];
        const aSum = aDigits.reduce((total, digit) => total + parseInt(digit, 10), 0);
        const bSum = bDigits.reduce((total, digit) => total + parseInt(digit, 10), 0);
        const aResult = aSum % 10;
        const bResult = bSum % 10;
        const isMatch = aResult === bResult;

        results.push({
            isMatch,
            calculation: {
                groupLabel: 'Rows ' + (n + 1) + '–' + (n + 3),
                detailLines: [
                    'A: Row ' + (n + 1) + ' Unit ' + aDigits[0] +
                        ' + Row ' + (n + 2) + ' Unit ' + aDigits[1] +
                        ' = ' + aSum + ' → ' + aResult,
                    'B: Row ' + (n + 1) + ' Ten ' + bDigits[0] +
                        ' + Row ' + (n + 3) + ' Hundred ' + bDigits[1] +
                        ' + Row ' + (n + 3) + ' Unit ' + bDigits[2] +
                        ' = ' + bSum + ' → ' + bResult,
                    'A ' + aResult + (isMatch ? ' = ' : ' ≠ ') + 'B ' + bResult +
                        ' → ' + (isMatch ? 'MATCH' : 'No match')
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
                {row: n, digit: TEN},
                {row: n, digit: UNIT},
                {row: n + 1, digit: UNIT},
                {row: n + 2, digit: HUNDRED},
                {row: n + 2, digit: UNIT}
            ],
            arrows: [
                {startRow: n, startDigit: UNIT, endRow: n + 1, endDigit: UNIT},
                {startRow: n, startDigit: TEN, endRow: n + 2, endDigit: HUNDRED},
                {startRow: n + 2, startDigit: HUNDRED, endRow: n + 2, endDigit: UNIT}
            ]
        });
    }
    return results;
}


// ========== M45 LOGIC ==========
// Each group uses Rows N, N+1, and N+2. The next group starts 3 rows later.
// A = Row N Ten + Row N Unit.
// B = Row N+1 Hundred + Row N+1 Ten + Row N+2 Ten.
// Compare A % 10 with B % 10.
function analyzeM45(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(
        numbers,
        calcM45(numbers, 0),
        'odd',
        'M45 Table - Odd (Rows 1–3, 4–6, 7–9, 10–12...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += renderWithArrows(
        numbers,
        calcM45(numbers, 1),
        'even',
        'M45 Table - Even (Rows 2–4, 5–7, 8–10, 11–13...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += '</div>';
    m45Container.innerHTML = html;
}

function calcM45(all, startIdx) {
    const HUNDRED = 0, TEN = 1, UNIT = 2;
    const results = [];

    for (let n = startIdx; n + 2 < all.length; n += 3) {
        const aDigits = [all[n][TEN], all[n][UNIT]];
        const bDigits = [all[n + 1][HUNDRED], all[n + 1][TEN], all[n + 2][TEN]];
        const aSum = aDigits.reduce((total, digit) => total + parseInt(digit, 10), 0);
        const bSum = bDigits.reduce((total, digit) => total + parseInt(digit, 10), 0);
        const aResult = aSum % 10;
        const bResult = bSum % 10;
        const isMatch = aResult === bResult;

        results.push({
            isMatch,
            calculation: {
                groupLabel: 'Rows ' + (n + 1) + '–' + (n + 3),
                detailLines: [
                    'A: Row ' + (n + 1) + ' Ten ' + aDigits[0] +
                        ' + Row ' + (n + 1) + ' Unit ' + aDigits[1] +
                        ' = ' + aSum + ' → ' + aResult,
                    'B: Row ' + (n + 2) + ' Hundred ' + bDigits[0] +
                        ' + Row ' + (n + 2) + ' Ten ' + bDigits[1] +
                        ' + Row ' + (n + 3) + ' Ten ' + bDigits[2] +
                        ' = ' + bSum + ' → ' + bResult,
                    'A ' + aResult + (isMatch ? ' = ' : ' ≠ ') + 'B ' + bResult +
                        ' → ' + (isMatch ? 'MATCH' : 'No match')
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
                {row: n, digit: TEN},
                {row: n, digit: UNIT},
                {row: n + 1, digit: HUNDRED},
                {row: n + 1, digit: TEN},
                {row: n + 2, digit: TEN}
            ],
            arrows: [
                {startRow: n, startDigit: TEN, endRow: n, endDigit: UNIT},
                {startRow: n + 1, startDigit: HUNDRED, endRow: n + 1, endDigit: TEN},
                {startRow: n + 1, startDigit: TEN, endRow: n + 2, endDigit: TEN}
            ]
        });
    }
    return results;
}


// ========== M46 LOGIC ==========
// Each group uses Rows N, N+1, and N+2. The next group starts 2 rows later.
// A = Row N Ten + Row N+2 Hundred.
// Compare A % 10 with Row N+1 Ten.
function analyzeM46(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(
        numbers,
        calcM46(numbers, 0),
        'odd',
        'M46 Table - Odd (Rows 1–3, 3–5, 5–7, 7–9...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += renderWithArrows(
        numbers,
        calcM46(numbers, 1),
        'even',
        'M46 Table - Even (Rows 2–4, 4–6, 6–8, 8–10...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += '</div>';
    m46Container.innerHTML = html;
}

function calcM46(all, startIdx) {
    const HUNDRED = 0, TEN = 1;
    const results = [];

    for (let n = startIdx; n + 2 < all.length; n += 2) {
        const aDigits = [all[n][TEN], all[n + 2][HUNDRED]];
        const aSum = aDigits.reduce((total, digit) => total + parseInt(digit, 10), 0);
        const aResult = aSum % 10;
        const targetDigit = parseInt(all[n + 1][TEN], 10);
        const isMatch = aResult === targetDigit;

        results.push({
            isMatch,
            calculation: {
                groupLabel: 'Rows ' + (n + 1) + ', ' + (n + 2) + ' & ' + (n + 3),
                detailLines: [
                    'A: Row ' + (n + 1) + ' Ten ' + aDigits[0] +
                        ' + Row ' + (n + 3) + ' Hundred ' + aDigits[1] +
                        ' = ' + aSum + ' → ' + aResult,
                    'Target: Row ' + (n + 2) + ' Ten ' + targetDigit,
                    aResult + (isMatch ? ' = ' : ' ≠ ') + targetDigit +
                        ' → ' + (isMatch ? 'MATCH' : 'No match')
                ],
                leftLabel: 'A',
                leftDigits: aDigits,
                leftSum: aSum,
                leftResult: aResult,
                rightLabel: 'Target',
                rightDigits: [all[n + 1][TEN]],
                rightSum: targetDigit,
                rightResult: targetDigit
            },
            highlights: [
                {row: n, digit: TEN},
                {row: n + 1, digit: TEN},
                {row: n + 2, digit: HUNDRED}
            ],
            arrows: [
                {startRow: n, startDigit: TEN, endRow: n + 2, endDigit: HUNDRED}
            ]
        });
    }
    return results;
}


// ========== M47 LOGIC ==========
// Each group uses Rows N, N+1, and N+2. The next group starts 3 rows later.
// A = Row N Hundred + Row N+1 Ten + Row N+2 Hundred.
// B = Row N Ten + Row N+1 Hundred + Row N+2 Ten.
// Compare the final digits of A and B.
function analyzeM47(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(
        numbers,
        calcM47(numbers, 0),
        'odd',
        'M47 Table - Odd (Rows 1–3, 4–6, 7–9, 10–12...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += renderWithArrows(
        numbers,
        calcM47(numbers, 1),
        'even',
        'M47 Table - Even (Rows 2–4, 5–7, 8–10, 11–13...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += '</div>';
    m47Container.innerHTML = html;
}

function calcM47(all, startIdx) {
    const HUNDRED = 0, TEN = 1;
    const results = [];

    for (let n = startIdx; n + 2 < all.length; n += 3) {
        const aDigits = [all[n][HUNDRED], all[n + 1][TEN], all[n + 2][HUNDRED]];
        const bDigits = [all[n][TEN], all[n + 1][HUNDRED], all[n + 2][TEN]];
        const aSum = aDigits.reduce((total, digit) => total + parseInt(digit, 10), 0);
        const bSum = bDigits.reduce((total, digit) => total + parseInt(digit, 10), 0);
        const aResult = aSum % 10;
        const bResult = bSum % 10;
        const isMatch = aResult === bResult;

        results.push({
            isMatch,
            calculation: {
                groupLabel: 'Rows ' + (n + 1) + '–' + (n + 3),
                detailLines: [
                    'A: Row ' + (n + 1) + ' Hundred ' + aDigits[0] +
                        ' + Row ' + (n + 2) + ' Ten ' + aDigits[1] +
                        ' + Row ' + (n + 3) + ' Hundred ' + aDigits[2] +
                        ' = ' + aSum + ' → ' + aResult,
                    'B: Row ' + (n + 1) + ' Ten ' + bDigits[0] +
                        ' + Row ' + (n + 2) + ' Hundred ' + bDigits[1] +
                        ' + Row ' + (n + 3) + ' Ten ' + bDigits[2] +
                        ' = ' + bSum + ' → ' + bResult,
                    'A ' + aResult + (isMatch ? ' = ' : ' ≠ ') + 'B ' + bResult +
                        ' → ' + (isMatch ? 'MATCH' : 'No match')
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
                {row: n, digit: HUNDRED},
                {row: n + 1, digit: TEN},
                {row: n + 2, digit: HUNDRED},
                {row: n, digit: TEN},
                {row: n + 1, digit: HUNDRED},
                {row: n + 2, digit: TEN}
            ],
            arrows: [
                // A group: three pairwise connections between its three digits.
                {startRow: n, startDigit: HUNDRED, endRow: n + 1, endDigit: TEN},
                {startRow: n + 1, startDigit: TEN, endRow: n + 2, endDigit: HUNDRED},
                // B group: three pairwise connections between its three digits.
                {startRow: n, startDigit: TEN, endRow: n + 1, endDigit: HUNDRED},
                {startRow: n + 1, startDigit: HUNDRED, endRow: n + 2, endDigit: TEN}
            ]
        });
    }
    return results;
}


// ========== M48 LOGIC ==========
// For each 3-row block, add the starting row's Ten and Unit digits.
// Compare that final digit with the next row's Unit digit.
// The third row is skipped for calculation.
function analyzeM48(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(
        numbers,
        calcM48(numbers, 0),
        'odd',
        'M48 Table - Odd (Rows 1–3, 4–6, 7–9, 10–12...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += renderWithArrows(
        numbers,
        calcM48(numbers, 1),
        'even',
        'M48 Table - Even (Rows 2–4, 5–7, 8–10, 11–13...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += '</div>';
    m48Container.innerHTML = html;
}

function calcM48(all, startIdx) {
    const TEN = 1, UNIT = 2;
    const results = [];

    // Only the start row and comparison row are used; the third row is skipped.
    // The final group is valid as soon as Row N and Row N+1 exist.
    for (let n = startIdx; n + 1 < all.length; n += 3) {
        const pairDigits = [all[n][TEN], all[n][UNIT]];
        const compareDigit = all[n + 1][UNIT];
        const sum = pairDigits.reduce((total, digit) => total + parseInt(digit, 10), 0);
        const resultDigit = sum % 10;
        const compareValue = parseInt(compareDigit, 10);
        const isMatch = resultDigit === compareValue;

        results.push({
            isMatch,
            calculation: {
                groupLabel: 'Rows ' + (n + 1) + '–' + (n + 3),
                detailLines: [
                    'ပေါင်းအုပ်စု: Row ' + (n + 1) + ' Ten ' + pairDigits[0] +
                        ' + Row ' + (n + 1) + ' Unit ' + pairDigits[1] +
                        ' = ' + sum + ' → ' + resultDigit,
                    'နှိုင်းယှဉ်အုပ်စု: Row ' + (n + 2) + ' Unit ' + compareDigit,
                    resultDigit + (isMatch ? ' = ' : ' ≠ ') + compareValue +
                        ' → ' + (isMatch ? 'MATCH' : 'No match')
                ],
                leftLabel: 'ပေါင်း',
                leftDigits: pairDigits,
                leftSum: sum,
                leftResult: resultDigit,
                rightLabel: 'နှိုင်းယှဉ်',
                rightDigits: [compareDigit],
                rightSum: compareValue,
                rightResult: compareValue
            },
            highlights: [
                {row: n, digit: TEN},
                {row: n, digit: UNIT},
                {row: n + 1, digit: UNIT}
            ],
            arrows: [
                {startRow: n, startDigit: TEN, endRow: n, endDigit: UNIT}
            ]
        });
    }
    return results;
}


// ========== M49 LOGIC ==========
// Each M49 group uses five rows.
// A = Row N Hundred + Row N Unit + Row N+1 Hundred.
// B = Row N+2 Ten + Row N+3 Ten + Row N+4 Hundred.
// Compare the final digits of A and B (sum % 10).
// Odd starts at Rows 1, 6, 11...; Even starts at Rows 2, 7, 12...
function analyzeM49(numbers) {
    let html = '<div class="split-tables">';
    html += renderWithArrows(
        numbers,
        calcM49(numbers, 0),
        'odd',
        'M49 Table - Odd (Rows 1–5, 6–10, 11–15, 16–20...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += renderWithArrows(
        numbers,
        calcM49(numbers, 1),
        'even',
        'M49 Table - Even (Rows 2–6, 7–11, 12–16, 17–21...)',
        { eachMatchIsGroup: true, showCalculations: true, multiColorHighlights: true }
    );
    html += '</div>';
    m49Container.innerHTML = html;
}

function calcM49(all, startIdx) {
    const HUNDRED = 0, TEN = 1, UNIT = 2;
    const results = [];

    // Advance five rows per group; only complete five-row groups are calculated.
    for (let n = startIdx; n + 4 < all.length; n += 5) {
        const aDigits = [all[n][HUNDRED], all[n][UNIT], all[n + 1][HUNDRED]];
        const bDigits = [all[n + 2][TEN], all[n + 3][TEN], all[n + 4][HUNDRED]];
        const aSum = aDigits.reduce((total, digit) => total + parseInt(digit, 10), 0);
        const bSum = bDigits.reduce((total, digit) => total + parseInt(digit, 10), 0);
        const aResult = aSum % 10;
        const bResult = bSum % 10;
        const isMatch = aResult === bResult;

        results.push({
            isMatch,
            calculation: {
                groupLabel: 'Rows ' + (n + 1) + '–' + (n + 5),
                detailLines: [
                    'A အုပ်စု: Row ' + (n + 1) + ' Hundred ' + aDigits[0] +
                        ' + Row ' + (n + 1) + ' Unit ' + aDigits[1] +
                        ' + Row ' + (n + 2) + ' Hundred ' + aDigits[2] +
                        ' = ' + aSum + ' → ' + aResult,
                    'B အုပ်စု: Row ' + (n + 3) + ' Ten ' + bDigits[0] +
                        ' + Row ' + (n + 4) + ' Ten ' + bDigits[1] +
                        ' + Row ' + (n + 5) + ' Hundred ' + bDigits[2] +
                        ' = ' + bSum + ' → ' + bResult,
                    'A ' + aResult + (isMatch ? ' = ' : ' ≠ ') + 'B ' + bResult +
                        ' → ' + (isMatch ? 'MATCH' : 'No match')
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
                {row: n, digit: HUNDRED},
                {row: n, digit: UNIT},
                {row: n + 1, digit: HUNDRED},
                {row: n + 2, digit: TEN},
                {row: n + 3, digit: TEN},
                {row: n + 4, digit: HUNDRED}
            ],
            arrows: [
                // A group: connect all three digits with three lines.
                {startRow: n, startDigit: HUNDRED, endRow: n, endDigit: UNIT},
                {startRow: n, startDigit: HUNDRED, endRow: n + 1, endDigit: HUNDRED},
                {startRow: n, startDigit: UNIT, endRow: n + 1, endDigit: HUNDRED},
                // B group: connect all three digits with three lines.
                {startRow: n + 2, startDigit: TEN, endRow: n + 3, endDigit: TEN},
                {startRow: n + 2, startDigit: TEN, endRow: n + 4, endDigit: HUNDRED},
                {startRow: n + 3, startDigit: TEN, endRow: n + 4, endDigit: HUNDRED}
            ]
        });
    }
    return results;
}
