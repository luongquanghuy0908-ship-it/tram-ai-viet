# Bản mẫu: Shop sản phẩm số tự động

Bản đóng gói của shop Trạm AI Việt để bán cho người khác mở shop riêng.
Khách quét QR chuyển khoản, tiền về là hệ thống tự giao hàng. Chạy miễn phí trên Google Sheets + Apps Script, không cần hosting hay GitHub.

| File | Dùng để |
| --- | --- |
| `Code.gs` | Máy chủ (Apps Script): đơn hàng, ví, webhook SePay, phục vụ luôn 2 trang web |
| `index.html` | Trang shop cho khách (trong Apps Script đặt tên `index`) |
| `admin.html` | Trang quản trị (trong Apps Script đặt tên `admin`) |
| `HUONG-DAN-CAI-DAT.md` | Hướng dẫn gửi kèm cho người mua |
| `CHO-NGUOI-BAN.md` | Cách tạo link "Tạo bản sao" và bán bản mẫu |

Khác với shop đang chạy:

- Không còn thông tin riêng (tài khoản ngân hàng, Zalo, link API). Mọi thứ điền ở tab **CauHinh** trong Sheet.
- Web chạy thẳng trên link Apps Script (`/exec`), trang quản trị ở `/exec?trang=admin`.
- Có menu **🛒 Shop → Xem link** và **Cấp quyền quản trị**, setup tự bật sao lưu hằng đêm.
- Sản phẩm mẫu là khoá học/ebook/dịch vụ trung tính.
