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

// ========== EXPORT FUNCTION ==========
function convertToROKTags(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent;
  }

  let result = "";

  node.childNodes.forEach(child => {
    if (child.nodeName === "BR") {
      result += "\n";
    } else {
      let childText = convertToROKTags(child);

      // Nếu là DIV hoặc P, luôn thêm xuống dòng sau
      if (["DIV", "P"].includes(child.nodeName)) {
        if (childText.trim() === "") {
          result += "\n"; // dòng trống
        } else {
          result += childText + "\n"; // dòng có nội dung
        }
      } else {
        result += childText;
      }
    }
  });

  let text = result;
  const style = node.style;

  // Nếu toàn bộ node rỗng và không phải block thì bỏ qua
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
function convertToROKTags(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent;
  }

  let result = "";

  node.childNodes.forEach(child => {
    if (child.nodeName === "BR") {
      result += "\n";
    } else {
      let childText = convertToROKTags(child);

      // Nếu là DIV hoặc P, luôn thêm xuống dòng sau
      if (["DIV", "P"].includes(child.nodeName)) {
        if (childText.trim() === "") {
          result += "\n"; // dòng trống
        } else {
          result += childText + "\n"; // dòng có nội dung
        }
      } else {
        result += childText;
      }
    }
  });

  let text = result;
  const style = node.style;

  // Nếu toàn bộ node rỗng và không phải block thì bỏ qua
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
  return (
    "#" +
    result
      .map(x => {
        const hex = parseInt(x).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

document.getElementById("exportBtn").addEventListener("click", () => {
  const editor = document.getElementById("editor");
  const outputText = convertToROKTags(editor);
  document.getElementById("output").textContent = outputText || "";
});

// ========== COPY ==========
document.getElementById("copyBtn").addEventListener("click", () => {
  const text = document.getElementById("output").textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert("📋 Đã sao chép thành công!");
  });
});

// ========== PLACEHOLDER ==========
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
