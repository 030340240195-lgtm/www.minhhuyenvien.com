# Minh Huyền Viên – Website bán hàng BIO-BUFFER POD

Website thương mại điện tử một trang (HTML5, CSS3, JavaScript thuần) cho **Công ty cổ phần phân bón Minh Huyền Viên**.
Không cần build, không phụ thuộc thư viện ngoài (chỉ dùng Google Fonts).

- Website: https://www.minhhuyenvien.com
- Hotline: 0868 686 868 · Email: contact@minhhuyenvien.com
- Địa chỉ: 286 Phạm Văn Đồng, Phường Hạnh Thông, TP Hồ Chí Minh

## Tính năng

- Trang chủ: banner, thẻ sản phẩm, lợi ích, về chúng tôi, chi tiết sản phẩm (tab), đánh giá khách hàng
- Giỏ hàng lưu bằng `localStorage`, tự cập nhật tổng tiền và phí vận chuyển
- Thanh toán: COD / chuyển khoản, sinh mã đơn hàng sau khi đặt
- Trang liên hệ, responsive (máy tính, tablet, điện thoại), hỗ trợ chế độ tối
- SEO: title, meta description, Open Graph, canonical, JSON-LD Product, `robots.txt`, `sitemap.xml`

## Cấu trúc

```
├── index.html        # Cấu trúc trang và nội dung
├── css/style.css     # Giao diện (biến màu ở :root)
├── js/main.js        # Giỏ hàng, thanh toán, đánh giá, điều hướng
├── assets/logo.png   # Logo công ty
├── CNAME             # Tên miền cho GitHub Pages
├── robots.txt
└── sitemap.xml
```

## Chạy thử trên máy

Mở `index.html` bằng trình duyệt, hoặc chạy máy chủ tĩnh:

```bash
python3 -m http.server 8000
# mở http://localhost:8000
```

## Chỉnh sửa nhanh

Cấu hình giá, tồn kho, khối lượng, phí vận chuyển nằm ở đầu `js/main.js`:

```js
const CFG = { ship: 30000, freeFrom: 300000,
  products: [{ id: "bbp", name: "BIO-BUFFER POD", price: 120000, stock: 250, weight: "Đang cập nhật" }] };
```

Nhớ cập nhật thêm giá trong khối JSON-LD ở `index.html` cho khớp.

## Triển khai

**GitHub Pages:** Settings → Pages → Deploy from branch → `main` / root. Tệp `CNAME` đã khai báo www.minhhuyenvien.com; trỏ bản ghi DNS `CNAME` của `www` về `<tên-tài-khoản>.github.io`.
Cũng có thể đưa cả thư mục lên Netlify, Cloudflare Pages hoặc hosting thường.

## Lưu ý

- Đơn hàng, giỏ hàng và đánh giá hiện chỉ lưu trong trình duyệt của người dùng (`localStorage`). Để nhận đơn thật cần nối backend hoặc dịch vụ nhận form.
- Đánh giá mẫu, giá, tồn kho, khối lượng và thông tin chuyển khoản là dữ liệu tạm, cần thay bằng số liệu thật.
- Chưa có tệp `LICENSE`; hãy chọn giấy phép phù hợp trước khi công khai repository.
