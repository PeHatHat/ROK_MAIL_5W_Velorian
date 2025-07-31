# 🛠️ ROK Text Formatter Web

**ROK Text Formatter Web** là một trình soạn thảo văn bản trực quan (WYSIWYG) được thiết kế dành riêng cho trò chơi **Rise of Kingdoms**, hỗ trợ người dùng định dạng văn bản với các thẻ đặc biệt như `<b>`, `<i>`, `<color=#HEX>`, và `<size=...>`. Ứng dụng giúp bạn tạo nội dung đẹp mắt, dễ đọc để sử dụng trong in-game mail, mô tả liên minh, hoặc ghi chú cá nhân.

---

## 🎯 Tính năng

- ✅ In đậm (`<b>...</b>`)
- ✅ In nghiêng (`<i>...</i>`)
- ✅ Gạch chân (`<u>...</u>`)
- ✅ Đổi màu văn bản (`<color=#HEX>...</color>`)
- ✅ Thay đổi kích thước chữ (`<size=...>...</size>`)
- ✅ Giao diện trực quan, định dạng WYSIWYG trực tiếp khi soạn thảo
- ✅ Xuất nội dung sang định dạng thẻ chuẩn của **Rise of Kingdoms**
- ✅ Hiển thị và đếm số ký tự sau khi xuất
- ✅ Cảnh báo khi vượt giới hạn 2000 ký tự của trò chơi
- ✅ Undo / Redo (Hoàn tác / Làm lại)
- ✅ Lưu nội dung đã xuất ra file `.txt` với tên tùy chọn
- ✅ Copy nhanh mã kết quả
- ✅ Hỗ trợ đa ngôn ngữ: 🇻🇳 Tiếng Việt, 🇺🇸 English, 🇫🇷 Français
- ✅ Hoạt động hoàn toàn trên trình duyệt, không cần cài đặt

---

## 🚀 Cách sử dụng

1. Mở file `index.html` trong trình duyệt bất kỳ
2. Nhập hoặc dán nội dung vào khung soạn thảo
3. Sử dụng các nút định dạng:
   - 🅑 để **in đậm**
   - 🅘 để **in nghiêng**
   - 🎨 để **chọn màu văn bản**
   - 🔠 để **đổi cỡ chữ**
4. Xem trước nội dung đã định dạng trực tiếp
5. Nhấn nút 💾 **"Xuất mã ROK"** để tạo ra chuỗi mã định dạng
6. Kiểm tra số ký tự đã dùng và đảm bảo không vượt quá giới hạn
7. Sao chép hoặc lưu lại nội dung định dạng để dán vào trò chơi **Rise of Kingdoms**

---

## 🧪 Demo

Bạn có thể chạy thử trực tiếp qua GitHub Pages hoặc local:

```bash
git clone https://github.com/PeHatHat/ROK_MAIL_5W_Velorian
cd ROK_MAIL_5W_Velorian
open index.html
```

## 📁 ROK_MAIL_5W_Velorian

├── index.html         # Giao diện chính

├── style.css          # Giao diện và bố cục

├── script.js          # Toàn bộ logic xử lý định dạng và xuất mã

└── lang.js            # Hệ thống đa ngôn ngữ (Việt / Anh / Pháp)
