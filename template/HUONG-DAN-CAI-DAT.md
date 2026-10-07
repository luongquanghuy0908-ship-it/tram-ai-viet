# Hướng dẫn mở shop trong 20 phút

Bạn chỉ cần một tài khoản Google. Không cần biết code, không cần thuê hosting hay tên miền.

Khi xong bạn sẽ có:

- **Web shop**: khách xem sản phẩm, quét mã QR chuyển khoản, nhận hàng tự động.
- **Trang quản trị**: xem đơn, giao hàng, sửa sản phẩm, cộng/trừ ví khách.
- **Google Sheet**: nơi lưu toàn bộ dữ liệu, tự sao lưu mỗi đêm.

---

## Bước 1. Tạo bản sao shop (1 phút)

1. Mở link **"Tạo bản sao"** mà người bán gửi cho bạn.
2. Bấm **Tạo bản sao**. Google sẽ mở ra file Sheet mới của riêng bạn.

> Không có link tạo bản sao? Xem mục **Cách cài thủ công** ở cuối trang.

## Bước 2. Chạy cài đặt (3 phút)

1. Trong Sheet, bấm menu **Tiện ích mở rộng → Apps Script**.
2. Ở thanh trên cùng, chọn hàm **setup** rồi bấm **▷ Chạy**.
3. Google hỏi quyền: bấm **Xem xét quyền** → chọn tài khoản Google của bạn.
4. Nếu hiện **"Google chưa xác minh ứng dụng này"**: bấm **Nâng cao** → **Đi tới ... (không an toàn)** → **Cho phép**.
   Đây là bình thường: ứng dụng là của chính bạn, chạy trong tài khoản của bạn.

5. Chờ dòng **"XONG"** hiện ở khung nhật ký bên dưới.

## Bước 3. Điền thông tin shop (5 phút)

Quay lại Sheet, mở tab **CauHinh** (tab đầu tiên). Chỉ điền **cột B (ô màu vàng)**:

| Mục | Ví dụ | Bắt buộc |
| --- | --- | --- |
| ten_shop | Shop Khoá Học Minh Anh | Có |
| ngan_hang | MB, VCB, TCB, ACB, BIDV... | Có |
| so_tai_khoan | 0123456789 | Có |
| chu_tai_khoan | NGUYEN MINH ANH | Có |
| zalo | 0912345678 | Có |
| khau_hieu, khau_hieu_2, gioi_thieu | Dòng chữ ở đầu trang | Nên sửa |
| mau_chu_dao | #e11d48 | Không |
| logo | Link ảnh logo (https://...) | Không |
| facebook, link_qua_tang | Link fanpage, link quà tặng | Không |
| ma_don, ma_nap | DH, NAP | Không |

Sửa xong là web tự cập nhật, không phải làm gì thêm.

## Bước 4. Đưa web lên mạng (3 phút)

1. Trong Apps Script, bấm nút xanh **Triển khai → Tùy chọn triển khai mới**.
2. Bấm biểu tượng bánh răng ⚙ cạnh "Chọn loại" → chọn **Ứng dụng web**.
3. Điền:
   - **Thực thi dưới dạng**: Tôi
   - **Người có quyền truy cập**: **Bất kỳ ai**
4. Bấm **Triển khai** → cho phép quyền nếu được hỏi.
5. Quay lại Sheet, tải lại trang (F5), bấm menu **🛒 Shop → 🚀 Xem link web shop**.

Bạn sẽ thấy 3 link: **web shop** (gửi cho khách), **trang quản trị**, và **webhook SePay**.

## Bước 5. Tự động xác nhận chuyển khoản bằng SePay (5 phút)

SePay đọc biến động số dư ngân hàng và báo cho shop, nhờ vậy tiền về là đơn tự giao, kể cả nửa đêm.

1. Đăng ký miễn phí tại [sepay.vn](https://sepay.vn) và liên kết tài khoản ngân hàng ở Bước 3.
2. Vào **Tích hợp WebHooks → Thêm webhook**:
   - **Gọi đến URL**: dán link **webhook SePay** ở Bước 4.
   - **Sự kiện**: Có tiền vào.
   - **Kiểu chứng thực**: Không cần.
   - **Bỏ qua nếu nội dung không có mã thanh toán**: Không.
3. Lưu lại.

> Chưa dùng SePay vẫn bán được: khi khách chuyển khoản, bạn mở tab **NapTien**, bấm vào dòng đó rồi chọn menu **🛒 Shop → Xác nhận ĐÃ NHẬN TIỀN**.

## Bước 6. Tạo tài khoản quản trị (2 phút)

1. Mở **link web shop**, bấm **Đăng nhập → Tạo tài khoản** bằng số điện thoại của bạn.
2. Quay lại Sheet, bấm menu **🛒 Shop → 👑 Cấp quyền quản trị** và nhập số điện thoại đó.
3. Mở **link trang quản trị**, đăng nhập. Xong!

## Bước 7. Thêm sản phẩm và mua thử

1. Trong trang quản trị, tab **Sản phẩm**: sửa hoặc xoá 4 sản phẩm mẫu, thêm sản phẩm của bạn.
   - **Giá 0đ** = hiện nút "Liên hệ Zalo" thay vì nút mua.
   - **Nội dung tự giao**: điền link khoá học/file để khách nhận ngay khi mua.
   - Hàng mỗi khách một mã riêng (tài khoản, mã thẻ...): nhập từng dòng vào tab **Kho** của Sheet.
2. Mua thử: tạo sản phẩm 2.000đ, nạp ví 10.000đ bằng chính tài khoản ngân hàng khác của bạn, bấm mua. Đơn chuyển sang **Đã giao** là shop đã chạy đúng.

## Tuỳ chọn: báo đơn qua Telegram

Menu **🛒 Shop → 📲 Cài thông báo Telegram**, làm theo 2 bước hiện trên màn hình. Không cài thì thông báo gửi về Gmail của bạn.

---

## Lỗi hay gặp

| Hiện tượng | Cách sửa |
| --- | --- |
| Web báo "Không tải được sản phẩm" | Kiểm tra Bước 4 đã chọn **Bất kỳ ai** chưa |
| Sửa code/tab mà web không đổi | Thông tin ở tab CauHinh tự cập nhật. Nếu sửa **code**: Triển khai → Quản lý các lần triển khai → ✏ → Phiên bản: **Phiên bản mới** → Triển khai |
| Tiền về mà đơn không tự giao | Khách ghi sai nội dung chuyển khoản, hoặc webhook SePay sai link. Xem tab **GiaoDich** để biết lý do |
| Trên đầu web có dòng chữ xám của Google | Google hiện dòng này với web chạy trên Apps Script miễn phí, không ảnh hưởng mua bán |
| Khách không nhận được email | Gmail thường gửi tối đa khoảng 100 email/ngày. Khách vẫn xem hàng ở "Đơn của tôi" |
| Quên mật khẩu quản trị | Trong tab **KhachHang**, xoá ô mật khẩu của bạn rồi tạo lại trên web |

Dữ liệu được sao lưu tự động mỗi đêm vào file **"... — BACKUP tự động"** trong Google Drive của bạn (giữ 14 ngày).

---

## Cách cài thủ công (khi không có link tạo bản sao)

1. Tạo một Google Sheet trống mới.
2. **Tiện ích mở rộng → Apps Script**. Xoá hết chữ trong file `Mã.gs`, dán toàn bộ nội dung file **Code.gs**.
3. Bấm **＋ → HTML**, đặt tên đúng là `index`, dán nội dung file **index.html**.
4. Bấm **＋ → HTML**, đặt tên đúng là `admin`, dán nội dung file **admin.html**.
5. Bấm 💾 Lưu, rồi làm tiếp từ **Bước 2** ở trên.
