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
  applyStyleToSelection('color', currentColor);
  pickr.hide();
});

// ========== FORMAT BUTTONS ==========
function applyStyleToSelection(style, value) {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  if (range.collapsed) return;

  const span = document.createElement("span");
  span.style[style] = value;
  span.appendChild(range.extractContents());
  range.deleteContents();
  range.insertNode(span);
}

function toggleStyle(style, value) {
  applyStyleToSelection(style, value);
}

document.getElementById("boldBtn").addEventListener("click", () => {
  toggleStyle("fontWeight", "bold");
});

document.getElementById("italicBtn").addEventListener("click", () => {
  toggleStyle("fontStyle", "italic");
});

document.getElementById("underlineBtn").addEventListener("click", () => {
  toggleStyle("textDecoration", "underline");
});

document.getElementById("fontSize").addEventListener("change", () => {
  const size = document.getElementById("fontSize").value;
  applyStyleToSelection("fontSize", `${size}px`);
});

// ========== LANG INIT ==========
document.addEventListener("DOMContentLoaded", () => {
  const lang = document.getElementById("languageSelector").value;
  setLanguage(lang);
});

// ========== EXPORT ROK CODE ==========

function rgbToHex(rgb) {
  const result = rgb.match(/\d+/g);
  if (!result) return '000000';
  return result.map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
}

function convertNodeToROK(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent;
  }

  if (node.nodeType !== Node.ELEMENT_NODE) return '';

  let content = '';
  for (let child of node.childNodes) {
    content += convertNodeToROK(child);
  }

  let tags = [];
  const style = node.style;

  // Kiểm tra các định dạng áp dụng
  if (style.fontWeight === 'bold' || node.tagName === 'B') tags.push(['<b>', '</b>']);
  if (style.fontStyle === 'italic' || node.tagName === 'I') tags.push(['<i>', '</i>']);
  if (style.textDecoration.includes('underline') || node.tagName === 'U') tags.push(['<u>', '</u>']);

  // Màu
  if (style.color && style.color !== 'rgb(0, 0, 0)' && style.color !== '#000000') {
    const hex = rgbToHex(style.color);
    tags.push([`<color=#${hex}>`, `</color>`]);
  }

  // Kích cỡ
  if (style.fontSize && style.fontSize !== '16px') {
    const size = parseInt(style.fontSize);
    tags.push([`<size=${size}>`, `</size>`]);
  }

  // Lồng thẻ
  for (let i = tags.length - 1; i >= 0; i--) {
    content = tags[i][0] + content + tags[i][1];
  }

  return content;
}

document.getElementById("exportBtn").addEventListener("click", () => {
  const editor = document.getElementById("editor");
  let result = '';
  editor.childNodes.forEach(node => {
    result += convertNodeToROK(node);
  });

  const output = document.getElementById("output");
  output.textContent = result || "Văn bản xuất ra sẽ hiển thị ở đây...";
});
