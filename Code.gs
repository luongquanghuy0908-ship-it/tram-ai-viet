const TZ = 'Asia/Ho_Chi_Minh';
const BANK = { bin: 'MB', account: '0338102653', name: 'LUONG QUANG HUY' };
const SHOP = { name: 'Trạm AI Việt', zalo: 'https://zalo.me/0338102653', gift: 'https://luongquanghuy0908-ship-it.github.io/qua-tang-ai/' };
const PREFIX = 'TAV';
const TOPUP_PREFIX = 'NAP';
const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const MIN_TOPUP = 10000;
const MAX_TOPUP = 20000000;

const SH = {
  products: { name: 'SanPham', header: ['ID', 'Nhóm', 'Tên sản phẩm', 'Thời hạn', 'Giá (đ) — 0 = Liên hệ', 'Bảo hành', 'Khách cần gửi thêm', 'Hiện trên web (TRUE/FALSE)', 'Mã combo (nhiều dòng cùng mã này gộp thành 1 thẻ chọn gói, để trống nếu bán riêng)', 'Số Gmail cần nhập (chỉ cho sản phẩm combo)', 'Danh sách lựa chọn (cách nhau bởi dấu phẩy — để trống thì khách tự gõ tay)', 'Số lượng còn (0 = hết hàng, sản phẩm Liên hệ để 1)'] },
  stock: { name: 'Kho', header: ['ID sản phẩm', 'Nội dung giao cho khách (acc | mk | hướng dẫn)', 'Mã đơn đã giao', 'Ngày giao'] },
  orders: { name: 'DonHang', header: ['Mã đơn', 'Token', 'Thời gian đặt', 'ID sản phẩm', 'Tên sản phẩm', 'Số tiền', 'Zalo/SĐT khách', 'Khách gửi thêm', 'Trạng thái', 'Nội dung giao cho khách', 'Thời gian nhận tiền', 'Mã GD ngân hàng', 'Họ tên', 'Gmail'] },
  customers: { name: 'KhachHang', header: ['SĐT/Zalo', 'Họ tên', 'Gmail', 'Lần đầu vào', 'Lần cuối vào', 'Số đơn đã đặt', 'Mật khẩu (đã mã hoá, xoá ô này = cho khách đặt lại)', 'Salt', 'Số dư ví (đ)', 'Vai trò (admin/staff, để trống = khách thường)'] },
  sessions: { name: 'PhienDangNhap', header: ['Mã phiên (đã mã hoá)', 'SĐT', 'Tạo lúc', 'Hết hạn (ms)'] },
  deposits: { name: 'NapTien', header: ['Mã nạp', 'Token', 'Thời gian tạo', 'SĐT', 'Số tiền', 'Trạng thái', 'Mã GD ngân hàng', 'Thời gian cộng ví'] },
  tx: { name: 'GiaoDich', header: ['SePay ID', 'Thời gian', 'Số tiền', 'Nội dung CK', 'Mã đơn khớp', 'Kết quả'] },
};

const ST = { PENDING: 'Chờ thanh toán', PAID: 'Đã thanh toán - chờ giao', DONE: 'Đã giao', SHORT: 'Chuyển thiếu' };
const DS = { PENDING: 'Chờ thanh toán', DONE: 'Đã cộng ví', SHORT: 'Chuyển thiếu' };

// Cột DonHang (0-based)
const O = { code: 0, token: 1, time: 2, pid: 3, pname: 4, amount: 5, contact: 6, extra: 7, status: 8, content: 9, paidAt: 10, bankRef: 11, name: 12, email: 13 };
// Cột NapTien (0-based)
const D = { code: 0, token: 1, time: 2, phone: 3, amount: 4, status: 5, bankRef: 6, paidAt: 7 };

const SEED_PRODUCTS = [
  ['gpt-rieng', 'AI & Công cụ', 'ChatGPT Plus (dùng riêng)', '1 tháng', 349000, 'BHF', ''],
  ['gpt-chung', 'AI & Công cụ', 'ChatGPT Plus (dùng chung)', '1 tháng', 0, '', ''],
  ['gemini-canhan', 'AI & Công cụ', 'Gemini Pro cá nhân', '12 tháng', 349000, 'BHF', ''],
  ['gemini-add5', 'AI & Công cụ', 'Gemini Pro chính chủ add 5 người', '12 tháng', 149000, 'KBH (số lượng có hạn)', 'Gmail cần nâng cấp'],
  ['gemini-ultra', 'AI & Công cụ', 'Gemini Ultra', '1 tháng', 649000, 'BHF', ''],
  ['canva-1t', 'Thiết kế', 'Canva Pro', '1 tháng', 35000, 'BHF', 'Email tài khoản Canva cần nâng cấp'],
  ['canva-1n', 'Thiết kế', 'Canva Pro', '1 năm', 199000, 'BHF', 'Email tài khoản Canva cần nâng cấp'],
  ['capcut-7n', 'Chỉnh sửa video', 'CapCut Pro', '7 ngày', 35000, 'FBH', ''],
  ['capcut-1t', 'Chỉnh sửa video', 'CapCut Pro', '1 tháng', 150000, 'FBH', ''],
  ['capcut-6t', 'Chỉnh sửa video', 'CapCut Pro', '6 tháng', 649000, 'FBH', ''],
  ['capcut-1n', 'Chỉnh sửa video', 'CapCut Pro', '1 năm', 849000, 'FBH', ''],
  ['proxy-1t', 'Tiện ích', 'Proxy dân cư tĩnh (18 nước: Mỹ, Anh, Nhật, Hàn, Singapore, Đức, Pháp...)', '1 tháng', 50000, 'Xài riêng, lỗi 1 đổi 1', 'Nước muốn dùng'],
  ['hotmail', 'Tiện ích', 'Hotmail / Outlook', '1 tài khoản', 7000, '', ''],
  ['tiktok-1k', 'Tăng tương tác', 'Follow TikTok 1000', '-', 250000, '', 'Link kênh TikTok'],
  ['youtube-1k', 'Tăng tương tác', 'Subscribe YouTube 1000', '-', 300000, '', 'Link kênh YouTube'],
  ['zalo-mem', 'Tăng tương tác', 'Thêm thành viên nhóm Zalo', '-', 0, '', ''],
  ['mxh-khac', 'Tăng tương tác', 'Tương tác MXH khác (TikTok, Facebook...)', '-', 0, 'Inbox shop để được hỗ trợ', ''],
];

// ===== Chạy 1 lần sau khi dán code =====
function setup() {
  const ss = SpreadsheetApp.getActive();
  ss.setSpreadsheetTimeZone(TZ);
  Object.values(SH).forEach(def => {
    let sh = ss.getSheetByName(def.name);
    if (!sh) sh = ss.insertSheet(def.name);
    if (sh.getLastRow() === 0) {
      sh.appendRow(def.header);
      sh.getRange(1, 1, 1, def.header.length).setFontWeight('bold').setBackground('#1e293b').setFontColor('#ffffff');
      sh.setFrozenRows(1);
    }
  });
  const p = ss.getSheetByName(SH.products.name);
  if (p.getLastRow() === 1) {
    p.getRange(2, 1, SEED_PRODUCTS.length, 10).setValues(SEED_PRODUCTS.map(r => r.concat([true, '', ''])));
  }
  // Sheet cũ thiếu cột combo mới → tự thêm tiêu đề cột vào cuối, không đụng dữ liệu đã có
  const curHeader = p.getRange(1, 1, 1, Math.max(1, p.getLastColumn())).getValues()[0];
  if (curHeader.length < SH.products.header.length) {
    p.getRange(1, curHeader.length + 1, 1, SH.products.header.length - curHeader.length)
      .setValues([SH.products.header.slice(curHeader.length)])
      .setFontWeight('bold').setBackground('#1e293b').setFontColor('#ffffff');
  }
  ss.getSheetByName(SH.orders.name).getRange('A:C').setNumberFormat('@');
  ss.getSheetByName(SH.orders.name).getRange('G:G').setNumberFormat('@');
  ss.getSheetByName(SH.orders.name).getRange('K:K').setNumberFormat('@');
  ss.getSheetByName(SH.customers.name).getRange('A:A').setNumberFormat('@');
  ss.getSheetByName(SH.customers.name).getRange('D:E').setNumberFormat('@');
  ss.getSheetByName(SH.deposits.name).getRange('C:C').setNumberFormat('@');
  ss.getSheetByName(SH.deposits.name).getRange('H:H').setNumberFormat('@');
  const props = PropertiesService.getScriptProperties();
  if (!props.getProperty('WEBHOOK_KEY')) props.setProperty('WEBHOOK_KEY', randomStr(24, 'abcdefghijkmnpqrstuvwxyz23456789'));
  Logger.log('XONG. Khoá webhook SePay: ' + props.getProperty('WEBHOOK_KEY'));
  Logger.log('URL webhook dán vào SePay = <URL web app>?key=' + props.getProperty('WEBHOOK_KEY'));
}

function onOpen() {
  SpreadsheetApp.getUi().createMenu('🛒 Shop')
    .addItem('Xác nhận ĐÃ NHẬN TIỀN cho dòng đang chọn (đơn cũ / nạp ví)', 'menuMarkPaid')
    .addItem('Xem URL webhook SePay', 'menuShowWebhook')
    .addToUi();
}

function menuMarkPaid() {
  const sh = SpreadsheetApp.getActiveSheet();
  const ui = SpreadsheetApp.getUi();
  const row = sh.getActiveRange().getRow();
  if (row < 2) return ui.alert('Chọn dòng cần duyệt (không phải dòng tiêu đề).');
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    if (sh.getName() === SH.orders.name) {
      const r = sh.getRange(row, 1, 1, SH.orders.header.length).getValues()[0];
      if (r[O.status] === ST.DONE) return ui.alert('Đơn này đã giao rồi.');
      markPaid(sh, row, r, 'Duyệt tay');
      ui.alert('Đã xác nhận đơn ' + r[O.code] + '. Trạng thái: ' + sh.getRange(row, O.status + 1).getValue());
    } else if (sh.getName() === SH.deposits.name) {
      const r = sh.getRange(row, 1, 1, SH.deposits.header.length).getValues()[0];
      if (r[D.status] === DS.DONE) return ui.alert('Lệnh nạp này đã cộng ví rồi.');
      const bal = markDepositPaid(sh, row, r, 'Duyệt tay');
      ui.alert('Đã cộng ' + fmt(r[D.amount]) + ' vào ví ' + r[D.phone] + '. Số dư mới: ' + fmt(bal));
    } else {
      ui.alert('Hãy mở tab DonHang (đơn cũ) hoặc NapTien (nạp ví) rồi bấm vào dòng cần duyệt.');
    }
  } finally { lock.releaseLock(); }
}

function menuShowWebhook() {
  const key = PropertiesService.getScriptProperties().getProperty('WEBHOOK_KEY');
  const url = ScriptApp.getService().getUrl();
  SpreadsheetApp.getUi().alert('URL webhook dán vào SePay:\n\n' + (url || '<chưa triển khai web app>') + '?key=' + key);
}

// ===== API cho trang web =====
function doGet(e) {
  const a = (e.parameter.action || '').trim();
  try {
    if (a === 'products') return json(listProducts());
    if (a === 'status') return json(orderStatus(e.parameter.code, e.parameter.token));
    if (a === 'topupstatus') return json(topupStatus(e.parameter.code, e.parameter.token));
    return json({ ok: true, shop: SHOP.name });
  } catch (err) { return json({ error: String(err.message || err) }); }
}

function doPost(e) {
  try {
    if (e.parameter.key !== undefined) return json(handleSepay(e));
    const body = JSON.parse(e.postData.contents || '{}');
    if (body.action === 'order') return json(createOrder(body));
    if (body.action === 'register') return json(register(body));
    if (body.action === 'login') return json(login(body));
    if (body.action === 'me') return json({ customer: requireSession(body.session) });
    if (body.action === 'logout') return json(logout(body.session));
    if (body.action === 'myorders') return json(myOrders(body.session));
    if (body.action === 'topup') return json(requestTopup(body));
    if (body.action === 'forgotpassword') return json(forgotPassword(body));
    if (body.action === 'resetpassword') return json(resetPassword(body));
    if (body.action === 'adminOrders') return json(adminOrders(body));
    if (body.action === 'adminPendingOrders') return json(adminPendingOrders(body));
    if (body.action === 'adminUpdateOrder') return json(adminUpdateOrder(body));
    if (body.action === 'adminAdjustBalance') return json(adminAdjustBalance(body));
    if (body.action === 'adminListCustomers') return json(adminListCustomers(body));
    if (body.action === 'adminExportCustomers') return json(adminExportCustomers(body));
    if (body.action === 'adminFindCustomer') return json(adminFindCustomer(body));
    if (body.action === 'adminBanCustomer') return json(adminBanCustomer(body));
    if (body.action === 'adminUnbanCustomer') return json(adminUnbanCustomer(body));
    if (body.action === 'adminResetPassword') return json(adminResetPassword(body));
    if (body.action === 'adminListStaff') return json(adminListStaff(body));
    if (body.action === 'adminSetStaff') return json(adminSetStaff(body));
    if (body.action === 'adminListProducts') return json(adminListProducts(body));
    if (body.action === 'adminSaveProduct') return json(adminSaveProduct(body));
    if (body.action === 'adminDeleteProduct') return json(adminDeleteProduct(body));
    return json({ error: 'Yêu cầu không hợp lệ' });
  } catch (err) { return json({ error: String(err.message || err) }); }
}

function listProducts() {
  const ss = SpreadsheetApp.getActive();
  const stockCount = {};
  ss.getSheetByName(SH.stock.name).getDataRange().getValues().slice(1).forEach(r => {
    if (r[0] && r[1] && !r[2]) stockCount[r[0]] = (stockCount[r[0]] || 0) + 1;
  });
  const products = ss.getSheetByName(SH.products.name).getDataRange().getValues().slice(1)
    .filter(r => r[0] && r[7] !== false && String(r[7]).toUpperCase() !== 'FALSE')
    .map(r => ({ id: String(r[0]), group: r[1], name: r[2], duration: r[3], price: Number(r[4]) || 0, warranty: r[5], need: r[6], stock: stockCount[r[0]] || 0, comboKey: String(r[8] || ''), comboCount: Number(r[9]) || 0, options: String(r[10] || '').split(',').map(s => s.trim()).filter(Boolean), qty: qtyOf(r[11]) }));
  return { shop: SHOP, bank: BANK, products };
}

// Số lượng còn để bán — null = không giới hạn (chưa thiết lập)
function qtyOf(v) { return v === '' || v === null || v === undefined ? null : Number(v) || 0; }

function findProductRow(id) {
  const sh = SpreadsheetApp.getActive().getSheetByName(SH.products.name);
  const data = sh.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) { if (String(data[i][0]) === String(id)) return { sh, row: i + 1, data: data[i] }; }
  return { sh, row: 0, data: null };
}

// Trừ 1 vào "Số lượng còn" khi bán được 1 đơn. Bỏ qua (không trừ) nếu để trống = không giới hạn. Trả về false nếu đã hết hàng (hết hàng thì KHÔNG trừ âm).
function takeQty(id) {
  const f = findProductRow(id);
  if (!f.data) return true;
  const q = qtyOf(f.data[11]);
  if (q === null) return true;
  if (q <= 0) return false;
  f.sh.getRange(f.row, 12).setValue(q - 1);
  return true;
}

function findProduct(id) {
  const rows = SpreadsheetApp.getActive().getSheetByName(SH.products.name).getDataRange().getValues().slice(1);
  const r = rows.find(x => String(x[0]) === String(id));
  if (!r || String(r[7]).toUpperCase() === 'FALSE') return null;
  return { id: String(r[0]), name: r[2] + (r[3] && r[3] !== '-' ? ' — ' + r[3] : ''), price: Number(r[4]) || 0, need: r[6], comboCount: Number(r[9]) || 0, options: String(r[10] || '').split(',').map(s => s.trim()).filter(Boolean), qty: qtyOf(r[11]) };
}

function cleanCustomer(b) {
  const c = {
    phone: String(b.contact || '').replace(/[^0-9+]/g, ''),
    name: String(b.name || '').trim().slice(0, 60),
    email: String(b.email || '').trim().toLowerCase().slice(0, 100),
  };
  if (!/^(\+84|0)[0-9]{9,10}$/.test(c.phone)) throw new Error('Số Zalo/SĐT chưa đúng');
  if (c.name.length < 2) throw new Error('Vui lòng nhập họ tên');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)) throw new Error('Gmail chưa đúng');
  return c;
}

// Sheet hay tự đổi "0912..." thành số 912... nên so sánh sau khi chuẩn hoá
function normPhone(p) { return String(p).replace(/\D/g, '').replace(/^84/, '').replace(/^0*/, '0'); }
function textCell(s) { return "'" + s; }

// ===== Tài khoản khách =====
const K = { phone: 0, name: 1, email: 2, first: 3, last: 4, orders: 5, hash: 6, salt: 7, balance: 8, role: 9 };
const ROLE = { ADMIN: 'admin', STAFF: 'staff' };

// Tạo tab/sửa dòng tiêu đề nếu Sheet được dựng từ bản code cũ
function sheetOf(def) {
  const ss = SpreadsheetApp.getActive();
  const sh = ss.getSheetByName(def.name) || ss.insertSheet(def.name);
  const w = def.header.length;
  const cur = sh.getLastRow() ? sh.getRange(1, 1, 1, w).getValues()[0] : [];
  if (cur.join('|') !== def.header.join('|')) {
    sh.getRange(1, 1, 1, w).setValues([def.header]).setFontWeight('bold').setBackground('#1e293b').setFontColor('#ffffff');
    sh.setFrozenRows(1);
  }
  return sh;
}

function hex(bytes) { return bytes.map(b => ((b + 256) % 256).toString(16).padStart(2, '0')).join(''); }
function sha(s) { return hex(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(s), Utilities.Charset.UTF_8)); }
// Băm lặp nhiều vòng để lỡ lộ Sheet cũng khó dò ngược mật khẩu
function hashPw(pw, salt) {
  let h = salt + pw;
  for (let i = 0; i < 300; i++) h = sha(h + salt);
  return h;
}
function newToken() { return (Utilities.getUuid() + Utilities.getUuid()).replace(/-/g, ''); }

function findCustomer(phone) {
  const sh = sheetOf(SH.customers);
  const data = sh.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (normPhone(data[i][K.phone]) === normPhone(phone)) return { sh, row: i + 1, data: data[i] };
  }
  return { sh, row: 0, data: null };
}

function publicCustomer(d) { return { phone: normPhone(d[K.phone]), name: String(d[K.name]), email: String(d[K.email]), balance: Number(d[K.balance]) || 0, role: String(d[K.role] || '') }; }

// Ném lỗi nếu phiên không hợp lệ hoặc không đúng vai trò yêu cầu
function requireRole(token, roles) {
  const c = requireSession(token);
  if (!roles.includes(c.role)) throw new Error('Không có quyền truy cập');
  return c;
}

// delta > 0 = cộng ví, delta < 0 = trừ ví (mua hàng). Trả về số dư mới.
function changeBalance(phone, delta) {
  const f = findCustomer(phone);
  if (!f.data) throw new Error('Không tìm thấy khách hàng');
  const bal = Number(f.data[K.balance]) || 0;
  const next = bal + delta;
  if (next < 0) throw new Error('Số dư ví không đủ');
  f.sh.getRange(f.row, K.balance + 1).setValue(next);
  return next;
}

function checkPassword(pw) {
  pw = String(pw || '');
  if (pw.length < 6) throw new Error('Mật khẩu cần ít nhất 6 ký tự');
  if (pw.length > 64) throw new Error('Mật khẩu quá dài');
  return pw;
}

function createSession(phone, remember) {
  const token = newToken();
  const days = remember ? 30 : 1;
  sheetOf(SH.sessions).appendRow([sha(token), textCell(normPhone(phone)), now(), Date.now() + days * 864e5]);
  return token;
}

function requireSession(token) {
  if (token) {
    const h = sha(token);
    const rows = sheetOf(SH.sessions).getDataRange().getValues();
    for (let i = rows.length - 1; i >= 1; i--) {
      if (rows[i][0] === h) {
        if (Number(rows[i][3]) > Date.now()) {
          const f = findCustomer(rows[i][1]);
          if (f.data) return publicCustomer(f.data);
        }
        break;
      }
    }
  }
  throw new Error('Phiên đăng nhập đã hết, vui lòng đăng nhập lại');
}

function logout(token) {
  if (!token) return { ok: true };
  const sh = sheetOf(SH.sessions);
  const h = sha(token);
  const rows = sh.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) if (rows[i][0] === h) sh.getRange(i + 1, 4).setValue(0);
  return { ok: true };
}

function register(b) {
  const c = cleanCustomer(b);
  const pw = checkPassword(b.password);
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const f = findCustomer(c.phone);
    if (f.data && f.data[K.hash]) throw new Error('Số này đã có tài khoản. Hãy bấm "Đăng nhập".');
    const salt = newToken().slice(0, 16);
    if (f.data) {
      // Hàng đã có nhưng chưa có mật khẩu (admin vừa đặt lại) → hoàn tất đăng ký lại, GIỮ NGUYÊN số dư ví/vai trò/lịch sử đơn
      f.sh.getRange(f.row, K.name + 1).setValue(c.name);
      f.sh.getRange(f.row, K.email + 1).setValue(c.email);
      f.sh.getRange(f.row, K.hash + 1, 1, 2).setValues([[hashPw(pw, salt), salt]]);
      f.sh.getRange(f.row, K.last + 1).setValue(now());
    } else {
      f.sh.appendRow([textCell(c.phone), c.name, c.email, now(), now(), 0, hashPw(pw, salt), salt, 0, '']);
    }
    const fresh = findCustomer(c.phone).data;
    return { customer: publicCustomer(fresh), session: createSession(c.phone, b.remember) };
  } finally { lock.releaseLock(); }
}

function login(b) {
  const phone = String(b.contact || '').replace(/[^0-9+]/g, '');
  if (!/^(\+84|0)[0-9]{9,10}$/.test(phone)) throw new Error('Số Zalo/SĐT chưa đúng');
  const cache = CacheService.getScriptCache();
  const failKey = 'fail_' + normPhone(phone);
  const fails = Number(cache.get(failKey)) || 0;
  if (fails >= 5) throw new Error('Sai mật khẩu quá nhiều lần. Thử lại sau 15 phút hoặc nhắn Zalo shop.');
  const f = findCustomer(phone);
  if (!f.data || !f.data[K.hash]) throw new Error('Số này chưa có tài khoản. Hãy bấm "Tạo tài khoản".');
  if (String(f.data[K.role] || '').toLowerCase() === 'banned') throw new Error('Tài khoản này đã bị khoá. Vui lòng nhắn Zalo shop để được hỗ trợ.');
  if (hashPw(String(b.password || ''), String(f.data[K.salt])) !== f.data[K.hash]) {
    cache.put(failKey, String(fails + 1), 900);
    throw new Error('Sai mật khẩu' + (fails + 1 >= 3 ? ' (còn ' + (4 - fails) + ' lần thử)' : ''));
  }
  cache.remove(failKey);
  f.sh.getRange(f.row, K.last + 1).setValue(now());
  return { customer: publicCustomer(f.data), session: createSession(phone, b.remember) };
}

function maskEmail(email) {
  const at = email.indexOf('@');
  if (at < 1) return email;
  const user = email.slice(0, at), domain = email.slice(at);
  return user.slice(0, Math.min(2, user.length)) + '***' + domain;
}

// Gửi mã 6 số vào Gmail đã đăng ký. Thay cho việc Huy phải tự vào Sheet xoá ô mật khẩu.
function forgotPassword(b) {
  const phone = String(b.contact || '').replace(/[^0-9+]/g, '');
  if (!/^(\+84|0)[0-9]{9,10}$/.test(phone)) throw new Error('Số Zalo/SĐT chưa đúng');
  const npPhone = normPhone(phone);
  const cache = CacheService.getScriptCache();
  const cooldownKey = 'resetcd_' + npPhone;
  if (cache.get(cooldownKey)) throw new Error('Vui lòng đợi 1 phút rồi bấm gửi lại mã.');
  const f = findCustomer(phone);
  if (!f.data || !f.data[K.hash]) throw new Error('Số này chưa có tài khoản. Hãy bấm "Tạo tài khoản".');
  const email = String(f.data[K.email] || '');
  if (!email) throw new Error('Tài khoản chưa có Gmail, vui lòng nhắn Zalo shop để được hỗ trợ.');
  const code = randomStr(6, '0123456789');
  cache.put('resetcode_' + npPhone, code, 600);
  cache.put(cooldownKey, '1', 60);
  cache.remove('resetfail_' + npPhone);
  MailApp.sendEmail(email, '[' + SHOP.name + '] Mã đặt lại mật khẩu',
    'Mã đặt lại mật khẩu của bạn là: ' + code + '\nMã có hiệu lực trong 10 phút.\nNếu không phải bạn yêu cầu, hãy bỏ qua email này.');
  return { ok: true, email: maskEmail(email) };
}

function resetPassword(b) {
  const phone = String(b.contact || '').replace(/[^0-9+]/g, '');
  const npPhone = normPhone(phone);
  const cache = CacheService.getScriptCache();
  const failKey = 'resetfail_' + npPhone;
  const fails = Number(cache.get(failKey)) || 0;
  if (fails >= 5) throw new Error('Nhập sai mã quá nhiều lần. Hãy bấm "Quên mật khẩu" để lấy mã mới.');
  const codeKey = 'resetcode_' + npPhone;
  const saved = cache.get(codeKey);
  if (!saved) throw new Error('Mã đã hết hạn hoặc chưa yêu cầu. Hãy bấm "Quên mật khẩu" để lấy mã mới.');
  if (String(b.code || '').trim() !== saved) {
    cache.put(failKey, String(fails + 1), 600);
    throw new Error('Mã không đúng');
  }
  const pw = checkPassword(b.password);
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const f = findCustomer(phone);
    if (!f.data) throw new Error('Không tìm thấy khách hàng');
    const salt = newToken().slice(0, 16);
    f.sh.getRange(f.row, K.hash + 1, 1, 2).setValues([[hashPw(pw, salt), salt]]);
    cache.remove(codeKey);
    cache.remove(failKey);
    cache.remove('fail_' + npPhone);
    return { customer: publicCustomer(f.data), session: createSession(phone, b.remember) };
  } finally { lock.releaseLock(); }
}

function myOrders(token) {
  const c = requireSession(token);
  const rows = SpreadsheetApp.getActive().getSheetByName(SH.orders.name).getDataRange().getValues();
  const list = [];
  for (let i = rows.length - 1; i >= 1 && list.length < 30; i--) {
    const r = rows[i];
    if (normPhone(r[O.contact]) === c.phone) list.push({ code: r[O.code], token: r[O.token], product: r[O.pname], amount: r[O.amount], status: r[O.status], time: fmtDate(r[O.time]) });
  }
  return { orders: list };
}

function bumpOrderCount(phone) {
  const f = findCustomer(phone);
  if (f.data) f.sh.getRange(f.row, K.orders + 1).setValue((Number(f.data[K.orders]) || 0) + 1);
}

function genCode(sh, prefix) {
  const used = new Set(sh.getRange(1, 1, sh.getLastRow(), 1).getValues().map(r => r[0]));
  let code;
  do { code = prefix + randomStr(6, CODE_CHARS); } while (used.has(code));
  return code;
}

// Mua hàng trừ thẳng vào ví — khách nạp tiền trước (requestTopup), mua lúc nào cũng được, không cần chờ chuyển khoản riêng từng đơn
function createOrder(b) {
  const p = findProduct(b.productId);
  if (!p) throw new Error('Sản phẩm không tồn tại hoặc đã ngừng bán');
  if (p.price <= 0) throw new Error('Sản phẩm này vui lòng liên hệ Zalo shop');
  const c = requireSession(b.session);
  const extra = String(b.extra || '').trim().slice(0, 600);
  if (p.need && !extra) throw new Error('Vui lòng nhập: ' + p.need);
  // options áp dụng cho trường đầu tiên — chỉ ép so khớp chặt khi sản phẩm chỉ có đúng 1 trường (extra = cả chuỗi)
  const needFieldCount = p.need ? p.need.split('|').filter(s => s.trim()).length : 0;
  if (p.comboCount === 0 && needFieldCount === 1 && p.options.length && !p.options.includes(extra)) throw new Error('Vui lòng chọn 1 lựa chọn hợp lệ trong danh sách.');
  if (p.comboCount > 0) {
    const nLines = extra.split('\n').map(s => s.trim()).filter(Boolean).length;
    if (nLines !== p.comboCount) throw new Error('Vui lòng nhập đúng ' + p.comboCount + ' Gmail, mỗi dòng 1 Gmail.');
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    if (c.balance < p.price) {
      throw new Error('Số dư ví (' + fmt(c.balance) + ') không đủ. Vui lòng nạp thêm ít nhất ' + fmt(p.price - c.balance) + '.');
    }
    if (!takeQty(p.id)) throw new Error('Sản phẩm này vừa hết hàng, vui lòng chọn sản phẩm khác hoặc nhắn Zalo shop.');
    const newBalance = changeBalance(c.phone, -p.price);
    bumpOrderCount(c.phone);
    const sh = SpreadsheetApp.getActive().getSheetByName(SH.orders.name);
    const code = genCode(sh, PREFIX);
    const token = newToken().slice(0, 24);
    const item = takeStock(p.id, code);
    const status = item ? ST.DONE : ST.PAID;
    sh.appendRow([code, token, now(), p.id, p.name, p.price, textCell(c.phone), extra, status, item || '', now(), 'Ví', c.name, c.email]);
    if (item) {
      notifyOwner('✅ Đơn ' + code + ' trả bằng VÍ ' + fmt(p.price) + ' — ĐÃ TỰ GIAO\n' + p.name + '\nKhách: ' + c.name + ' — ' + c.phone + ' — ' + c.email);
      notifyCustomerDelivered(c.email, c.name, p.name, item);
    } else {
      notifyOwner('🔔 Đơn ' + code + ' trả bằng VÍ ' + fmt(p.price) + ' — CẦN GIAO TAY\n' + p.name +
        '\nKhách: ' + c.name + ' — ' + c.phone + ' — ' + c.email + (extra ? '\nKhách gửi: ' + extra : '') +
        '\n→ Mở tab DonHang, điền cột "Nội dung giao cho khách" rồi đổi trạng thái thành "' + ST.DONE + '"');
    }
    return { code, token, amount: p.price, product: p.name, status, content: item || '', balance: newBalance, bank: BANK };
  } finally { lock.releaseLock(); }
}

function findDepositRow(sh, code) {
  if (!code) return null;
  const data = sh.getDataRange().getValues();
  for (let i = data.length - 1; i >= 1; i--) {
    if (data[i][D.code] === code) return { row: i + 1, data: data[i] };
  }
  return null;
}

function requestTopup(b) {
  const c = requireSession(b.session);
  const amount = Math.round(Number(b.amount));
  if (!amount || amount < MIN_TOPUP) throw new Error('Số tiền nạp tối thiểu ' + fmt(MIN_TOPUP));
  if (amount > MAX_TOPUP) throw new Error('Số tiền nạp tối đa ' + fmt(MAX_TOPUP) + ' mỗi lần, cần nạp nhiều hơn thì nhắn Zalo shop');

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sh = sheetOf(SH.deposits);
    const code = genCode(sh, TOPUP_PREFIX);
    const token = newToken().slice(0, 24);
    sh.appendRow([code, token, now(), textCell(c.phone), amount, DS.PENDING, '', '']);
    return { code, token, amount, status: DS.PENDING, bank: BANK };
  } finally { lock.releaseLock(); }
}

function topupStatus(code, token) {
  const sh = sheetOf(SH.deposits);
  const found = findDepositRow(sh, code);
  if (!found || found.data[D.token] !== token) throw new Error('Không tìm thấy lệnh nạp');
  const r = found.data;
  const result = { code: r[D.code], amount: r[D.amount], status: r[D.status], bank: BANK };
  if (r[D.status] === DS.DONE) {
    const f = findCustomer(r[D.phone]);
    if (f.data) result.balance = Number(f.data[K.balance]) || 0;
  }
  return result;
}

// actualAmount = số tiền THỰC NHẬN qua SePay (nếu có) — khách chuyển dư thì cộng đúng số thực nhận, không cộng cứng theo số đã đặt lúc tạo lệnh nạp.
// Duyệt tay qua menu Sheet không có actualAmount → vẫn cộng theo số đã đặt như trước (không đổi hành vi cũ).
function markDepositPaid(sh, row, r, bankRef, actualAmount) {
  sh.getRange(row, D.bankRef + 1).setValue(bankRef);
  sh.getRange(row, D.paidAt + 1).setValue(now());
  sh.getRange(row, D.status + 1).setValue(DS.DONE);
  const requested = Number(r[D.amount]);
  const credit = Math.max(requested, Number(actualAmount) || 0);
  const newBalance = changeBalance(r[D.phone], credit);
  const extra = credit > requested ? ' (khách chuyển dư ' + fmt(credit - requested) + ', đã cộng đủ)' : '';
  notifyOwner('✅ Nạp ví ' + r[D.code] + ' — cộng ' + fmt(credit) + extra + ' cho ' + r[D.phone] + '. Số dư mới: ' + fmt(newBalance));
  return newBalance;
}

function orderStatus(code, token) {
  const sh = SpreadsheetApp.getActive().getSheetByName(SH.orders.name);
  const found = findOrderRow(sh, code);
  if (!found || found.data[O.token] !== token) throw new Error('Không tìm thấy đơn');
  const r = found.data;
  return {
    code: r[O.code], product: r[O.pname], amount: r[O.amount], status: r[O.status],
    content: r[O.status] === ST.DONE ? String(r[O.content]) : '', bank: BANK,
  };
}

function findOrderRow(sh, code) {
  if (!code) return null;
  const data = sh.getDataRange().getValues();
  for (let i = data.length - 1; i >= 1; i--) {
    if (data[i][O.code] === code) return { row: i + 1, data: data[i] };
  }
  return null;
}

// ===== Webhook SePay =====
function handleSepay(e) {
  const props = PropertiesService.getScriptProperties();
  if (e.parameter.key !== props.getProperty('WEBHOOK_KEY')) return { success: false, error: 'bad key' };
  const t = JSON.parse(e.postData.contents || '{}');
  if (t.transferType && t.transferType !== 'in') return { success: true };

  const ss = SpreadsheetApp.getActive();
  const lock = LockService.getScriptLock();
  lock.waitLock(25000);
  try {
    const txSh = ss.getSheetByName(SH.tx.name);
    const txId = String(t.id || t.referenceCode || '');
    // SePay gửi lại nếu không nhận được phản hồi → bỏ qua giao dịch đã xử lý
    if (txId && txSh.getRange(1, 1, txSh.getLastRow(), 1).getValues().some(r => String(r[0]) === txId)) return { success: true };

    const amount = Number(t.transferAmount) || 0;
    const content = String(t.content || t.description || '').toUpperCase();
    const m = content.replace(/[^A-Z0-9]/g, ' ').match(new RegExp('(?:' + PREFIX + '|' + TOPUP_PREFIX + ')[' + CODE_CHARS + ']{6}'));
    let result = 'Không có mã';
    let code = m ? m[0] : '';
    if (code && code.indexOf(TOPUP_PREFIX) === 0) {
      const sh = sheetOf(SH.deposits);
      const found = findDepositRow(sh, code);
      if (!found) result = 'Mã nạp không tồn tại';
      else if (found.data[D.status] !== DS.PENDING && found.data[D.status] !== DS.SHORT) result = 'Lệnh nạp đã xử lý trước đó';
      else if (amount < Number(found.data[D.amount])) {
        sh.getRange(found.row, D.status + 1).setValue(DS.SHORT);
        sh.getRange(found.row, D.bankRef + 1).setValue(t.referenceCode || txId);
        result = 'Nạp thiếu';
        notifyOwner('⚠️ Nạp ví ' + code + ' chuyển THIẾU: nhận ' + fmt(amount) + ' / cần ' + fmt(found.data[D.amount]) + '\nSĐT: ' + found.data[D.phone]);
      } else {
        markDepositPaid(sh, found.row, found.data, t.referenceCode || txId, amount);
        result = 'Đã cộng ví';
      }
    } else if (code) {
      const sh = ss.getSheetByName(SH.orders.name);
      const found = findOrderRow(sh, code);
      if (!found) result = 'Mã đơn không tồn tại';
      else if (found.data[O.status] !== ST.PENDING && found.data[O.status] !== ST.SHORT) result = 'Đơn đã xử lý trước đó';
      else if (amount < Number(found.data[O.amount])) {
        sh.getRange(found.row, O.status + 1).setValue(ST.SHORT);
        sh.getRange(found.row, O.bankRef + 1).setValue(t.referenceCode || txId);
        result = 'Chuyển thiếu';
        notifyOwner('⚠️ Đơn ' + code + ' chuyển THIẾU: nhận ' + fmt(amount) + ' / cần ' + fmt(found.data[O.amount]) + '\nKhách: ' + found.data[O.contact]);
      } else {
        markPaid(sh, found.row, found.data, t.referenceCode || txId);
        result = 'Khớp đơn';
      }
    }
    txSh.appendRow([txId, now(), amount, content, code, result]);
    if (result === 'Không có mã' || result === 'Mã đơn không tồn tại' || result === 'Mã nạp không tồn tại') {
      notifyOwner('💰 Tiền về ' + fmt(amount) + ' nhưng không khớp mã nào.\nNội dung: ' + content);
    }
    return { success: true };
  } finally { lock.releaseLock(); }
}

function markPaid(sh, row, r, bankRef) {
  sh.getRange(row, O.paidAt + 1).setValue(now());
  sh.getRange(row, O.bankRef + 1).setValue(bankRef);
  const item = takeStock(r[O.pid], r[O.code]);
  if (item) {
    sh.getRange(row, O.status + 1).setValue(ST.DONE);
    sh.getRange(row, O.content + 1).setValue(item);
    notifyOwner('✅ Đơn ' + r[O.code] + ' đã trả ' + fmt(r[O.amount]) + ' — ĐÃ TỰ GIAO\n' + r[O.pname] + '\nKhách: ' + r[O.name] + ' — ' + r[O.contact] + ' — ' + r[O.email]);
    notifyCustomerDelivered(r[O.email], r[O.name], r[O.pname], item);
  } else {
    sh.getRange(row, O.status + 1).setValue(ST.PAID);
    notifyOwner('🔔 Đơn ' + r[O.code] + ' đã trả ' + fmt(r[O.amount]) + ' — CẦN GIAO TAY\n' + r[O.pname] +
      '\nKhách: ' + r[O.name] + ' — ' + r[O.contact] + ' — ' + r[O.email] + (r[O.extra] ? '\nKhách gửi: ' + r[O.extra] : '') +
      '\n→ Mở tab DonHang, điền cột "Nội dung giao cho khách" rồi đổi trạng thái thành "' + ST.DONE + '"');
  }
}

function takeStock(pid, code) {
  const sh = SpreadsheetApp.getActive().getSheetByName(SH.stock.name);
  const data = sh.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(pid) && data[i][1] && !data[i][2]) {
      sh.getRange(i + 1, 3, 1, 2).setValues([[code, now()]]);
      return String(data[i][1]);
    }
  }
  return null;
}

// Gửi bản sao thông tin đã giao vào Gmail khách đã đăng ký, phòng khi khách lỡ đóng trang web
function notifyCustomerDelivered(email, name, product, content) {
  if (!email) return;
  try {
    MailApp.sendEmail(email, '[' + SHOP.name + '] Thông tin đơn hàng: ' + product,
      'Xin chào ' + name + ',\n\nCảm ơn bạn đã mua hàng tại ' + SHOP.name + '.\n\nSản phẩm: ' + product + '\n\n' + content +
      '\n\nLưu lại thông tin này. Cần hỗ trợ, nhắn Zalo: ' + SHOP.zalo);
  } catch (err) { console.error(err); }
}

// ===== Báo chủ shop: Gmail + Telegram (nếu đã điền TELEGRAM_TOKEN, TELEGRAM_CHAT_ID) =====
function notifyOwner(msg) {
  try { MailApp.sendEmail(Session.getEffectiveUser().getEmail(), '[Shop] ' + msg.split('\n')[0], msg); } catch (err) { console.error(err); }
  const props = PropertiesService.getScriptProperties();
  const tk = props.getProperty('TELEGRAM_TOKEN');
  const chat = props.getProperty('TELEGRAM_CHAT_ID');
  if (tk && chat) {
    try {
      UrlFetchApp.fetch('https://api.telegram.org/bot' + tk + '/sendMessage', {
        method: 'post', payload: { chat_id: chat, text: msg }, muteHttpExceptions: true,
      });
    } catch (err) { console.error(err); }
  }
}

// ===== Admin =====
// role admin = toàn quyền (đơn hàng, ví, quản lý nhân viên). role staff = chỉ xử lý đơn hàng.
function adminPendingOrders(b) {
  requireRole(b.session, [ROLE.ADMIN, ROLE.STAFF]);
  const rows = SpreadsheetApp.getActive().getSheetByName(SH.orders.name).getDataRange().getValues();
  const list = [];
  for (let i = rows.length - 1; i >= 1 && list.length < 300; i--) {
    const r = rows[i];
    if (!r[O.code] || r[O.status] === ST.DONE) continue;
    list.push({
      code: r[O.code], time: fmtDate(r[O.time]), product: r[O.pname], amount: r[O.amount],
      contact: r[O.contact], status: r[O.status], name: r[O.name], email: r[O.email],
    });
  }
  return { orders: list };
}

function adminListCustomers(b) {
  requireRole(b.session, [ROLE.ADMIN]);
  const rows = sheetOf(SH.customers).getDataRange().getValues();
  const list = [];
  for (let i = 1; i < rows.length; i++) {
    if (!rows[i][K.phone]) continue;
    list.push({
      phone: normPhone(rows[i][K.phone]),
      name: String(rows[i][K.name]),
      email: String(rows[i][K.email]),
      balance: Number(rows[i][K.balance]) || 0,
      orders: Number(rows[i][K.orders]) || 0,
      lastSeen: String(fmtDate(rows[i][K.last]) || ''),
      role: String(rows[i][K.role] || ''),
      isBanned: String(rows[i][K.role] || '').toLowerCase() === 'banned'
    });
  }
  return { customers: list };
}

// Xuất danh sách khách ra 1 Google Sheet riêng (không kèm mật khẩu/salt) để xem/chia sẻ dễ hơn Sheet gốc.
// Dùng lại đúng 1 file cho mỗi lần xuất (lưu ID trong Script Properties) — bấm nhiều lần không tạo file rác.
function adminExportCustomers(b) {
  requireRole(b.session, [ROLE.ADMIN]);
  const props = PropertiesService.getScriptProperties();
  let ss = null;
  const savedId = props.getProperty('CUSTOMER_EXPORT_ID');
  if (savedId) { try { ss = SpreadsheetApp.openById(savedId); } catch (e) { ss = null; } }
  if (!ss) {
    ss = SpreadsheetApp.create('Danh sách khách hàng - ' + SHOP.name);
    props.setProperty('CUSTOMER_EXPORT_ID', ss.getId());
  }
  const sh = ss.getSheets()[0];
  sh.clear();
  const header = ['SĐT/Zalo', 'Họ tên', 'Gmail', 'Số dư ví (đ)', 'Số đơn đã đặt', 'Lần cuối vào', 'Trạng thái'];
  sh.getRange('A:A').setNumberFormat('@');
  const rows = sheetOf(SH.customers).getDataRange().getValues().slice(1)
    .filter(r => r[0])
    .map(r => [
      textCell(normPhone(r[K.phone])), String(r[K.name]), String(r[K.email]), Number(r[K.balance]) || 0,
      Number(r[K.orders]) || 0, fmtDate(r[K.last]) || '', String(r[K.role] || '').toLowerCase() === 'banned' ? 'Đã khoá' : 'Bình thường',
    ]);
  sh.getRange(1, 1, 1, header.length).setValues([header]).setFontWeight('bold').setBackground('#1e293b').setFontColor('#ffffff');
  if (rows.length) sh.getRange(2, 1, rows.length, header.length).setValues(rows);
  sh.autoResizeColumns(1, header.length);
  return { url: ss.getUrl() };
}

function adminBanCustomer(b) {
  requireRole(b.session, [ROLE.ADMIN]);
  const phone = String(b.phone || '').replace(/[^0-9+]/g, '');
  if (!phone) throw new Error('Thiếu số điện thoại');
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const f = findCustomer(phone);
    if (!f.data) throw new Error('Không tìm thấy khách hàng');
    f.sh.getRange(f.row, K.role + 1).setValue('banned');
    notifyOwner('🚫 Admin khoá tài khoản khách hàng: ' + phone + ' (' + f.data[K.name] + ')');
    return { ok: true };
  } finally { lock.releaseLock(); }
}

function adminUnbanCustomer(b) {
  requireRole(b.session, [ROLE.ADMIN]);
  const phone = String(b.phone || '').replace(/[^0-9+]/g, '');
  if (!phone) throw new Error('Thiếu số điện thoại');
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const f = findCustomer(phone);
    if (!f.data) throw new Error('Không tìm thấy khách hàng');
    f.sh.getRange(f.row, K.role + 1).setValue('');
    notifyOwner('✅ Admin mở khoá tài khoản khách hàng: ' + phone + ' (' + f.data[K.name] + ')');
    return { ok: true };
  } finally { lock.releaseLock(); }
}

// Xoá mật khẩu (KHÔNG thể xem lại mật khẩu cũ vì đã băm 1 chiều, không lưu chữ thường) — khách tự vào web bấm
// "Tạo tài khoản" với đúng SĐT này để đặt mật khẩu mới; số dư ví/vai trò/lịch sử đơn được giữ nguyên.
function adminResetPassword(b) {
  requireRole(b.session, [ROLE.ADMIN, ROLE.STAFF]);
  const phone = String(b.phone || '').replace(/[^0-9+]/g, '');
  if (!phone) throw new Error('Thiếu số điện thoại');
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const f = findCustomer(phone);
    if (!f.data) throw new Error('Không tìm thấy khách hàng');
    f.sh.getRange(f.row, K.hash + 1, 1, 2).setValues([['', '']]);
    notifyOwner('🔑 Admin đã xoá mật khẩu tài khoản: ' + phone + ' (' + f.data[K.name] + ') để khách đặt lại');
    return { ok: true };
  } finally { lock.releaseLock(); }
}

function adminOrders(b) {
  requireRole(b.session, [ROLE.ADMIN, ROLE.STAFF]);
  const status = String(b.status || '').trim();
  const rows = SpreadsheetApp.getActive().getSheetByName(SH.orders.name).getDataRange().getValues();
  const list = [];
  for (let i = rows.length - 1; i >= 1 && list.length < 300; i--) {
    const r = rows[i];
    if (!r[O.code]) continue;
    if (status && r[O.status] !== status) continue;
    list.push({
      code: r[O.code], time: fmtDate(r[O.time]), pid: r[O.pid], product: r[O.pname], amount: r[O.amount],
      contact: r[O.contact], extra: r[O.extra], status: r[O.status], content: r[O.content],
      paidAt: fmtDate(r[O.paidAt]), bankRef: r[O.bankRef], name: r[O.name], email: r[O.email],
    });
  }
  return { orders: list };
}

function adminUpdateOrder(b) {
  requireRole(b.session, [ROLE.ADMIN, ROLE.STAFF]);
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sh = SpreadsheetApp.getActive().getSheetByName(SH.orders.name);
    const found = findOrderRow(sh, String(b.code || ''));
    if (!found) throw new Error('Không tìm thấy đơn');
    if (found.data[O.status] === ST.DONE) throw new Error('Đơn này đã giao rồi');
    const content = String(b.content || '').trim().slice(0, 4000);
    if (content) sh.getRange(found.row, O.content + 1).setValue(content);
    if (b.markDone) {
      const finalContent = content || String(found.data[O.content] || '');
      if (!finalContent) throw new Error('Cần nhập nội dung giao trước khi đánh dấu đã giao');
      sh.getRange(found.row, O.status + 1).setValue(ST.DONE);
      notifyCustomerDelivered(found.data[O.email], found.data[O.name], found.data[O.pname], finalContent);
    }
    return { ok: true };
  } finally { lock.releaseLock(); }
}

function adminFindCustomer(b) {
  requireRole(b.session, [ROLE.ADMIN, ROLE.STAFF]);
  const phone = String(b.phone || '').replace(/[^0-9+]/g, '');
  if (!phone) throw new Error('Thiếu số điện thoại');
  const f = findCustomer(phone);
  if (!f.data) throw new Error('Không tìm thấy khách hàng với số này');
  return { customer: publicCustomer(f.data) };
}

function adminAdjustBalance(b) {
  requireRole(b.session, [ROLE.ADMIN]);
  const phone = String(b.phone || '').replace(/[^0-9+]/g, '');
  const delta = Math.round(Number(b.delta));
  if (!phone) throw new Error('Thiếu số điện thoại');
  if (!delta) throw new Error('Số tiền không hợp lệ');
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const newBalance = changeBalance(phone, delta);
    notifyOwner('🛠️ Admin ' + (delta > 0 ? 'cộng' : 'trừ') + ' ' + fmt(Math.abs(delta)) + ' ví ' + phone + '. Số dư mới: ' + fmt(newBalance) + (b.reason ? '\nLý do: ' + b.reason : ''));
    return { ok: true, balance: newBalance };
  } finally { lock.releaseLock(); }
}

function adminListStaff(b) {
  requireRole(b.session, [ROLE.ADMIN]);
  const rows = sheetOf(SH.customers).getDataRange().getValues();
  const list = [];
  for (let i = 1; i < rows.length; i++) {
    const role = String(rows[i][K.role] || '');
    if (role) list.push({ phone: normPhone(rows[i][K.phone]), name: String(rows[i][K.name]), email: String(rows[i][K.email]), role });
  }
  return { staff: list };
}

function adminSetStaff(b) {
  requireRole(b.session, [ROLE.ADMIN]);
  const phone = String(b.phone || '').replace(/[^0-9+]/g, '');
  const role = String(b.role || '');
  if (role && role !== ROLE.ADMIN && role !== ROLE.STAFF) throw new Error('Vai trò không hợp lệ');
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const f = findCustomer(phone);
    if (!f.data) throw new Error('Số này chưa có tài khoản. Nhờ người đó vào web tạo tài khoản trước, rồi cấp quyền sau.');
    f.sh.getRange(f.row, K.role + 1).setValue(role);
    return { ok: true };
  } finally { lock.releaseLock(); }
}

// Trả về TOÀN BỘ sản phẩm kể cả đang ẩn — chỉ dùng cho admin sửa, khách hàng dùng listProducts() (đã lọc)
function adminListProducts(b) {
  requireRole(b.session, [ROLE.ADMIN]);
  const rows = SpreadsheetApp.getActive().getSheetByName(SH.products.name).getDataRange().getValues().slice(1);
  const products = rows.filter(r => r[0]).map(r => ({
    id: String(r[0]), group: r[1], name: r[2], duration: r[3], price: Number(r[4]) || 0,
    warranty: r[5], need: r[6], visible: String(r[7]).toUpperCase() !== 'FALSE',
    comboKey: String(r[8] || ''), comboCount: Number(r[9]) || 0, optionsText: String(r[10] || ''), qty: qtyOf(r[11]),
  }));
  return { products };
}

// Cho phép gõ tắt kiểu "149k" (=149000) hoặc "1.5tr" (=1500000) ngoài số thường
function parseMoney(v) {
  const s = String(v).trim().toLowerCase().replace(/,/g, '.');
  const m = s.match(/^([\d.]+)\s*(tr|triệu|k)?$/);
  if (!m) return NaN;
  let n = parseFloat(m[1]);
  if (isNaN(n)) return NaN;
  if (m[2] === 'k') n *= 1000;
  else if (m[2] === 'tr' || m[2] === 'triệu') n *= 1000000;
  return Math.round(n);
}

// Thêm mới (id chưa có dòng nào) hoặc sửa (id đã có).
function adminSaveProduct(b) {
  requireRole(b.session, [ROLE.ADMIN]);
  const id = String(b.id || '').trim();
  if (!/^[a-z0-9][a-z0-9-]{1,40}$/.test(id)) throw new Error('ID sản phẩm chỉ gồm chữ thường/số/gạch ngang, 2-41 ký tự (vd: proxy-1t)');
  const name = String(b.name || '').trim().slice(0, 200);
  if (!name) throw new Error('Vui lòng nhập tên sản phẩm');
  const price = parseMoney(b.price);
  if (!(price >= 0)) throw new Error('Giá không hợp lệ — chỉ nhập số (vd: 149000 hoặc 149k)');
  const qty = String(b.qty).trim() === '' ? '' : Math.max(0, Math.round(Number(b.qty)) || 0);
  const row = [
    id, String(b.group || '').trim().slice(0, 60), name, String(b.duration || '-').trim().slice(0, 30), price,
    String(b.warranty || '').trim().slice(0, 100), String(b.need || '').trim().slice(0, 150),
    b.visible ? true : false, String(b.comboKey || '').trim().slice(0, 40), Math.max(0, Math.round(Number(b.comboCount)) || 0),
    String(b.optionsText || '').trim().slice(0, 600), qty,
  ];
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sh = SpreadsheetApp.getActive().getSheetByName(SH.products.name);
    const data = sh.getDataRange().getValues();
    let foundRow = 0;
    for (let i = 1; i < data.length; i++) { if (String(data[i][0]) === id) { foundRow = i + 1; break; } }
    if (foundRow) sh.getRange(foundRow, 1, 1, row.length).setValues([row]);
    else sh.appendRow(row);
    return { ok: true, created: !foundRow };
  } finally { lock.releaseLock(); }
}

// Xoá hẳn 1 sản phẩm khỏi danh mục. An toàn để xoá thật vì đơn hàng cũ (DonHang) tự lưu sẵn tên/giá lúc mua,
// không tra cứu ngược về SanPham — xoá sản phẩm không làm mất/hỏng lịch sử đơn hàng.
function adminDeleteProduct(b) {
  requireRole(b.session, [ROLE.ADMIN]);
  const id = String(b.id || '').trim();
  if (!id) throw new Error('Thiếu ID sản phẩm');
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sh = SpreadsheetApp.getActive().getSheetByName(SH.products.name);
    const data = sh.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][0]) === id) { sh.deleteRow(i + 1); return { ok: true }; }
    }
    throw new Error('Không tìm thấy sản phẩm');
  } finally { lock.releaseLock(); }
}

// ===== Tiện ích =====
function json(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function now() { return Utilities.formatDate(new Date(), TZ, 'dd/MM/yyyy HH:mm:ss'); }
// Sheet đôi khi tự chuyển ô "giờ dạng chữ" thành ô Ngày giờ thật (đọc ra là object Date) → ép về đúng chữ hiển thị trước khi trả cho web.
function fmtDate(v) { return v instanceof Date ? Utilities.formatDate(v, TZ, 'dd/MM/yyyy HH:mm:ss') : v; }
function fmt(n) { return Number(n).toLocaleString('vi-VN') + 'đ'; }
function randomStr(len, chars) {
  let s = '';
  for (let i = 0; i < len; i++) s += chars.charAt(Math.floor(Math.random() * chars.length));
  return s;
}

// Chạy thử luồng webhook mà không cần SePay: đổi MA_DON rồi bấm Chạy
function testWebhookGia() {
  const MA_DON = 'TAVXXXXXX';
  const sh = SpreadsheetApp.getActive().getSheetByName(SH.orders.name);
  const f = findOrderRow(sh, MA_DON);
  if (!f) throw new Error('Không thấy đơn ' + MA_DON);
  const key = PropertiesService.getScriptProperties().getProperty('WEBHOOK_KEY');
  Logger.log(handleSepay({
    parameter: { key },
    postData: { contents: JSON.stringify({ id: 'TEST' + Date.now(), transferType: 'in', transferAmount: f.data[O.amount], content: 'CK ' + MA_DON, referenceCode: 'TEST' }) },
  }));
}
