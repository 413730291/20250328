let seaweeds = []; // 儲存水草屬性的陣列
let colors = ['#cdb4db', '#ffc8dd', '#ffafcc', '#bde0fe', '#a2d2ff']; // 顏色系列

function setup() {
  // 建立畫布，使用透明背景
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('position', 'absolute'); // 確保畫布與 iframe 重疊
  canvas.style('z-index', '1'); // 設定畫布的 z-index 為 1
  canvas.style('background', 'transparent'); // 設定畫布背景為透明
  canvas.style('pointer-events', 'none'); // 讓滑鼠事件穿透畫布

  initializeSeaweeds(); // 初始化水草屬性

  // 建立 iframe
  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  iframe.style('position', 'absolute');
  iframe.style('top', '15%'); // 調整 top，讓 iframe 垂直居中
  iframe.style('left', '10%');
  iframe.style('width', '80%');
  iframe.style('height', '70%'); // 將高度改為 70%
  iframe.style('border', 'none');
  iframe.style('z-index', '-1'); // 設定 iframe 的 z-index 為 -1，讓它在畫布後面
}

function draw() {
  clear(); // 清除畫布，保留透明背景

  blendMode(BLEND); // 設定混合模式為 BLEND，讓顏色重疊時產生透明效果

  let numSeaweeds = seaweeds.length;

  for (let j = 0; j < numSeaweeds; j++) {
    let seaweed = seaweeds[j]; // 取得每條水草的屬性

    // 每條水草的參數
    let baseX = (j + 0.5) * (width / numSeaweeds); // 水草的基底位置，均勻分布
    let baseY = height; // 水草的底部位置
    let segments = 10; // 分段數量
    let segmentHeight = seaweed.height / segments; // 每段的高度

    stroke(seaweed.color); // 設定水草顏色
    strokeWeight(seaweed.thickness); // 設定水草粗細
    noFill();

    beginShape();
    for (let i = 0; i <= segments; i++) {
      let y = baseY - i * segmentHeight; // 固定每段的高度
      // 每段的搖晃幅度隨高度改變，讓整條水草扭動
      let sway = sin(frameCount * seaweed.frequency + j + i * 0.5) * 10; // 減小搖晃幅度
      let x = baseX + sway; // 每段的 x 位置根據搖晃幅度改變
      vertex(x, y);
    }
    endShape();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initializeSeaweeds(); // 重新初始化水草屬性
}

function initializeSeaweeds() {
  seaweeds = []; // 清空舊的水草屬性
  let numSeaweeds = 80; // 水草數量
  for (let i = 0; i < numSeaweeds; i++) {
    let baseColor = color(random(colors)); // 從顏色系列中隨機選擇顏色
    baseColor.setAlpha(200); // 設定透明度為 200（更不透明）
    seaweeds.push({
      height: random(80, 200), // 隨機高度
      color: baseColor, // 設定顏色
      thickness: random(20, 40), // 隨機粗細，範圍變大
      frequency: random(0.02, 0.08), // 隨機搖晃頻率
    });
  }
}

