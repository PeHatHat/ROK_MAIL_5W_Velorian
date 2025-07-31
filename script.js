// ========== FORMAT BUTTONS ==========
function toggleFormat(command) {
  document.execCommand(command, false, null);
}

document.getElementById("boldBtn").addEventListener("click", () => toggleFormat("bold"));
document.getElementById("italicBtn").addEventListener("click", () => toggleFormat("italic"));

// ========== FONT SIZE ==========
document.getElementById("fontSize").addEventListener("change", function () {
  const size = this.value + "px";
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const span = document.createElement("span");
  span.style.fontSize = size;
  span.textContent = selection.toString();

  range.deleteContents();
  range.insertNode(span);
});

// ========== PICKR COLOR ==========
let currentColor = "#000000";

const pickr = Pickr.create({
  el: '#color-picker-btn',
  theme: 'classic',
  default: currentColor,
  components: {
    preview: true,
    opacity: false,
    hue: true,
    interaction: {
      save: true,
      cancel: true,
      input: false,
      hex: false
    }
  }
});

pickr.on('save', (color) => {
  currentColor = color.toHEXA().toString();
  document.execCommand("styleWithCSS", false, true);
  document.execCommand("foreColor", false, currentColor);
  pickr.hide();
});

// ========== EXPORT TO ROK TAGS ==========
function convertToROKTags(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent.trim();
    const placeholders = [
      "✍️ Nhập văn bản tại đây...",
      "✍️ Enter text here...",
      "✍️ Entrez le texte ici..."
    ];
    if (placeholders.includes(text)) return ""; // Bỏ qua placeholder
    return text;
  }

  let result = "";

  node.childNodes.forEach(child => {
    if (child.nodeName === "BR") {
      result += "\n";
    } else {
      let childText = convertToROKTags(child);

      if (["DIV", "P"].includes(child.nodeName)) {
        result += (childText.trim() === "") ? "\n" : childText + "\n";
      } else {
        result += childText;
      }
    }
  });

  let text = result;
  const style = node.style;

  if (text.trim() === "" && !["DIV", "P"].includes(node.nodeName)) {
    return "";
  }

  if (node.nodeType === Node.ELEMENT_NODE) {
    const tag = node.nodeName.toLowerCase();

    if (tag === "b" || style.fontWeight === "bold" || style.fontWeight >= 600) {
      text = `<b>${text}</b>`;
    }

    if (tag === "i" || style.fontStyle === "italic") {
      text = `<i>${text}</i>`;
    }

    if (style.textDecoration && style.textDecoration.includes("underline")) {
      text = `<u>${text}</u>`;
    }

    if (style.fontSize && style.fontSize !== "16px") {
      const size = parseInt(style.fontSize);
      text = `<size=${size}>${text}</size>`;
    }

    if (style.color && style.color !== "rgb(0, 0, 0)") {
      const hex = rgbToHex(style.color);
      text = `<color=${hex}>${text}</color>`;
    }
  }

  return text;
}

function rgbToHex(rgb) {
  const result = rgb.match(/\d+/g);
  if (!result) return "#000000";
  return "#" + result.map(x => {
    const hex = parseInt(x).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
}

// ========== EXPORT BUTTON ==========
document.getElementById("exportBtn").addEventListener("click", () => {
  const editor = document.getElementById("editor");
  const rawOutput = convertToROKTags(editor).trim();

  const output = document.getElementById("output");

  if (!rawOutput) {
    // Nếu rỗng, hiển thị lại placeholder ngôn ngữ hiện tại
    const currentLang = document.getElementById("languageSelector").value;
    const translations = window.translations || {}; // Từ lang.js
    output.textContent = translations[currentLang]?.output_placeholder || "📤 Output is empty.";
    alert("⚠️ Không có nội dung để xuất!");
    return;
  }

  output.textContent = rawOutput;
});

// ========== COPY BUTTON ==========
document.getElementById("copyBtn").addEventListener("click", () => {
  const text = document.getElementById("output").textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert("📋 Đã sao chép thành công!");
  });
});

// ========== PLACEHOLDER XỬ LÝ ==========
const editor = document.getElementById("editor");

editor.addEventListener("focus", () => {
  if (editor.innerText.trim() === editor.dataset.placeholder) {
    editor.innerHTML = "";
  }
});

editor.addEventListener("blur", () => {
  if (editor.innerText.trim() === "") {
    editor.innerHTML = editor.dataset.placeholder;
  }
});

window.addEventListener("load", () => {
  editor.innerHTML = editor.dataset.placeholder;
});

// ========== SAVE TO FILE ==========
document.getElementById("saveBtn").addEventListener("click", () => {
  const content = document.getElementById("output").textContent.trim();

  if (!content) {
    alert("⚠️ Không có nội dung để lưu!");
    return;
  }

  const filename = prompt("📄 Nhập tên file (không cần đuôi .txt):", "vanban_rok");
  if (filename === null) return;

  const safeName = filename.trim() || "vanban_rok";
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = safeName + ".txt";
  a.click();

  URL.revokeObjectURL(a.href);
});

// ========== UNDO/REDO ==========
document.getElementById("undoBtn").addEventListener("click", () => {
  document.execCommand("undo");
});

document.getElementById("redoBtn").addEventListener("click", () => {
  document.execCommand("redo");
});
// ========== Current number of characters ==========
function updateCharCountLive() {
  const editor = document.getElementById("editor");
  const outputText = convertToROKTags(editor);
  const charCountEl = document.getElementById("charCount");

  const length = outputText.length;
  charCountEl.textContent = `Số ký tự: ${length}/2000`;

  if (length > 2000) {
    charCountEl.style.color = "red";
    charCountEl.textContent += " ⚠️ Vượt quá giới hạn!";
  } else {
    charCountEl.style.color = "#555";
  }
}

// Gọi khi người dùng gõ hoặc dán
editor.addEventListener("input", updateCharCountLive);

// Gọi khi người dùng định dạng bằng nút toolbar (bấm nút in đậm, nghiêng...)
document.querySelectorAll(".toolbar button, select").forEach(btn => {
  btn.addEventListener("click", () => {
    setTimeout(updateCharCountLive, 0); // Delay để lấy nội dung sau khi định dạng
  });
});

// ========== KÝ TỰ ĐẶC BIỆT ==========
const specialCharacters = [
  '→','←','↑','↓','↔','↕','⇨','⇦','⇧','⇩','➤','➠','➥','➔','➜','➲',
  '✔','✘','✗','✓','✕','✖','☑','☒',
  '✿','❀','✾','✽','✼','❁','❃','❋','✧','✦','✩','✰','✪','✫','✬','✭','✮','✯','✱',
  '※','‼','⁉','❗','❕','❓','❔','✎','✏','✐','✍','✄','✂','✃','✆','✉','☎',
  '♠','♣','♥','♦','♤','♧','♡','♢','⚀','⚁','⚂','⚃','⚄','⚅',
  '∞','≠','≈','≤','≥','±','×','÷','∑','√','∫','∆','∇','∂','π','Ω','∅',
  '©','®','™','°','‰','′','″','‡','†','§','¶','¤','¢','£','¥','€'
];

const specialCharsContainer = document.getElementById("specialChars");

specialCharacters.forEach(char => {
  const btn = document.createElement("button");
  btn.textContent = char;
  btn.className = "char-btn";
  btn.style.margin = "4px";
  btn.style.fontSize = "20px";
  btn.style.cursor = "pointer";
  btn.title = "Chèn ký tự";
  btn.addEventListener("click", () => {
    insertCharAtCursor(char);
  });
  specialCharsContainer.appendChild(btn);
});

function insertCharAtCursor(char) {
  const editor = document.getElementById("editor");
  editor.focus();

  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  range.deleteContents();

  const textNode = document.createTextNode(char);
  range.insertNode(textNode);

  // Di chuyển con trỏ sau ký tự mới chèn
  range.setStartAfter(textNode);
  range.setEndAfter(textNode);
  selection.removeAllRanges();
  selection.addRange(range);
}

