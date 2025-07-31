const translations = {
  vi: {
    app_title: "📝 Trình định dạng văn bản cho ROK",
    export: "💾 Xuất mã ROK",
    output_label: "📤 Văn bản đã định dạng",
    output_placeholder: "Văn bản xuất ra sẽ hiển thị ở đây...",
    size: "Kích cỡ",
    save: "💾 Lưu file TXT",
    copy: "📋 Sao chép",
    undo: "↩️ Hoàn tác",
    redo: "↪️ Làm lại",
    language: "Ngôn ngữ"
  },
  en: {
    app_title: "📝 ROK Text Formatter",
    export: "💾 Export ROK Code",
    output_label: "📤 Formatted Output",
    output_placeholder: "Formatted text will appear here...",
    size: "Size",
    save: "💾 Save as TXT",
    copy: "📋 Copy",
    undo: "↩️ Undo",
    redo: "↪️ Redo",
    language: "Language"
  },
  fr: {
    app_title: "📝 Formateur de texte pour ROK",
    export: "💾 Exporter le code ROK",
    output_label: "📤 Résultat formaté",
    output_placeholder: "Le texte formaté apparaîtra ici...",
    size: "Taille",
    save: "💾 Enregistrer en TXT",
    copy: "📋 Copier",
    undo: "↩️ Annuler",
    redo: "↪️ Rétablir",
    language: "Langue"
  }
};

function setLanguage(lang) {
  // Đổi văn bản theo các data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Placeholder ô nhập
  const editor = document.getElementById("editor");
  if (editor) {
    if (lang === "vi") editor.placeholder = "✍️ Nhập văn bản tại đây...";
    if (lang === "en") editor.placeholder = "✍️ Enter text here...";
    if (lang === "fr") editor.placeholder = "✍️ Entrez le texte ici...";
  }

  // Placeholder khung kết quả
  const outputPre = document.getElementById("output");
  if (
    outputPre &&
    (
      outputPre.innerText.trim() === "" ||
      outputPre.innerText.includes("Văn bản xuất ra") ||
      outputPre.innerText.includes("Formatted text") ||
      outputPre.innerText.includes("Le texte")
    )
  ) {
    outputPre.innerText = translations[lang]["output_placeholder"];
  }
}

document.getElementById("languageSelector").addEventListener("change", (e) => {
  setLanguage(e.target.value);
});

document.getElementById("languageSelector").addEventListener("change", (e) => {
  const lang = e.target.value;
  localStorage.setItem("rok_language", lang);
  setLanguage(lang);
});

window.addEventListener("load", () => {
  const lang = localStorage.getItem("rok_language") || "vi";
  document.getElementById("languageSelector").value = lang;
  setLanguage(lang);
});
