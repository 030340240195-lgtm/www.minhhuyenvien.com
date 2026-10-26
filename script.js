/* ===== CẤU HÌNH – chỉnh tại đây ===== */
const CFG={ship:30000,freeFrom:300000,
  products:[{id:"bbp",name:"BIO-BUFFER POD",price:120000,stock:250,weight:"200 gam"}]};
const P=CFG.products[0];
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const money=n=>n.toLocaleString("vi-VN")+"đ";
const esc=s=>s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const pod=()=>`<svg viewBox="0 0 200 200" role="img" aria-label="Viên phân bón BIO-BUFFER POD"><ellipse cx="100" cy="176" rx="64" ry="9" fill="#0002"/><rect x="48" y="78" width="104" height="92" rx="26" fill="#6d4c41"/><rect x="48" y="78" width="104" height="30" rx="15" fill="#8d6e63"/><circle cx="78" cy="132" r="5" fill="#4e342e"/><circle cx="118" cy="146" r="4" fill="#4e342e"/><circle cx="104" cy="122" r="3" fill="#a1887f"/><path d="M100 80c0-26 8-42 30-50 2 24-8 42-30 50z" fill="#43a047"/><path d="M100 80c0-18-8-30-26-36-1 18 8 30 26 36z" fill="#81c784"/></svg>`;
/* ===== Lưu trữ ===== */
const store={get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
let cart=store.get("mhv_cart",[]);
const save=()=>{store.set("mhv_cart",cart);badge()};
const count=()=>cart.reduce((a,i)=>a+i.qty,0);
const badge=()=>$("#bd").textContent=count();
function addToCart(q){const it=cart.find(i=>i.id===P.id);const n=Math.min(P.stock,(it?it.qty:0)+q);it?it.qty=n:cart.push({id:P.id,qty:n});save()}
/* ===== Điều hướng ===== */
const hashes={cart:"gio-hang",checkout:"thanh-toan",contact:"lien-he"};
function show(v,to){$$(".view").forEach(e=>e.classList.toggle("on",e.id==="v-"+v));
  if(v==="cart")drawCart();if(v==="checkout")drawSum();
  $("#menu").classList.remove("on");
  const t=to&&document.getElementById(to);t?t.scrollIntoView({behavior:"smooth"}):window.scrollTo({top:0});}
function go(v,to){show(v,to);try{history.replaceState(null,"",hashes[v]?"#"+hashes[v]:location.pathname+location.search)}catch(e){}}
document.addEventListener("click",e=>{const a=e.target.closest("[data-go]");if(a){e.preventDefault();go(a.dataset.go,a.dataset.to)}});
addEventListener("hashchange",()=>{const k=Object.keys(hashes).find(k=>"#"+hashes[k]===location.hash);show(k||"home")});
$("#bg").onclick=()=>$("#menu").classList.toggle("on");
$("#sbt").onclick=()=>{$("#sb").classList.toggle("on");$("#si").focus()};
$("#si").addEventListener("keydown",e=>{if(e.key==="Enter"){const v=e.target.value.toLowerCase();if(!v||"bio-buffer pod phân bón hữu cơ viên nén".includes(v)){go("home","sp");$("#sb").classList.remove("on")}else toast("🔍","Không tìm thấy sản phẩm phù hợp.")}});
/* ===== Modal ===== */
function toast(i,t,btns=""){$("#mb").innerHTML=`<div class="big">${i}</div><p>${t}</p><div class="row" style="justify-content:center">${btns||'<button class="btn" data-x>Đóng</button>'}</div>`;$("#modal").classList.add("on")}
$("#modal").onclick=e=>{if(e.target.id==="modal"||e.target.closest("[data-x]"))$("#modal").classList.remove("on")};
/* ===== Sản phẩm ===== */
const bag=()=>`<svg viewBox='0 0 200 220' role='img' aria-label='Sản phẩm BIO-BUFFER POD'><path d='M78 52c0-22 44-22 44 0' fill='none' stroke='#5b3a23' stroke-width='8'/><path d='M50 52h100l14 150a8 8 0 0 1-8 9H44a8 8 0 0 1-8-9z' fill='#7a4b2f'/><path d='M50 52h100l3 30H47z' fill='#5b3a23'/><rect x='64' y='98' width='72' height='76' rx='12' fill='#faf6f0'/><path d='M78 154c-2-20 8-32 22-34 0 18-8 32-22 34z' fill='#2a6b3c'/><path d='M102 152c-2-14 6-28 22-30 2 14-6 26-22 30z' fill='#66b36f'/></svg>`;$$("[data-pod]").forEach(e=>e.innerHTML=pod());$$("[data-bag]").forEach(e=>e.innerHTML=bag());
const pp = $("#pp");
const pw = $("#pw");
const ps = $("#ps");

if(pp) pp.textContent = money(P.price);
if(pw) pw.textContent = P.weight;
if(ps) ps.textContent = P.stock;
const qi=$("#qi"),getQ=()=>Math.max(1,Math.min(P.stock,parseInt(qi.value)||1));
$$("[data-q]").forEach(b=>b.onclick=()=>qi.value=Math.max(1,Math.min(P.stock,getQ()+ +b.dataset.q)));
qi.onchange=()=>qi.value=getQ();
$("#add").onclick=()=>{addToCart(getQ());toast("✅",`Đã thêm <b>${getQ()} × ${P.name}</b> vào giỏ hàng.`,'<button class="btn o" data-x>Tiếp tục mua</button><button class="btn" data-x data-go="cart">Xem giỏ hàng</button>')};
$("#buy").onclick=()=>{addToCart(getQ());go("checkout")};
$("#ben").innerHTML =[["💰","Tiết kiệm chi phí","Một viên thay nhiều loại phân, giảm chi phí chăm sóc."],["👌","Dễ sử dụng","Đặt viên lên đất, tưới nước – chỉ vậy thôi."],["🛡️","An toàn cho cây","Nguyên liệu hữu cơ, dịu nhẹ với bộ rễ."],["🌍","Cải tạo đất","Tăng độ tơi xốp, giữ nước và dinh dưỡng."],["🪨","Không gây chai đất","Không tích tụ hóa chất, đất luôn khỏe."],["🌳","Phù hợp nhiều loại cây","Cây cảnh, rau, hoa, cây ăn trái trồng chậu."]].map(b=>`<div class="card"><div class="e">${b[0]}</div><h3>${b[1]}</h3><p>${b[2]}</p></div>`).join("");
/* ===== Đánh giá ===== */
const seed=[{n:"Lan Anh",s:5,t:"Cây ra rễ mới nhanh, dùng rất tiện.",d:"Đánh giá mẫu"},{n:"Quốc Bảo",s:5,t:"Đóng gói gọn, bón một viên là xong.",d:"Đánh giá mẫu"},{n:"Thu Hà",s:4,t:"Đất chậu tơi xốp hơn sau vài tuần.",d:"Đánh giá mẫu"}];
let reviews=store.get("mhv_reviews",[]),rate=5;
const stars=n=>"★".repeat(n)+"☆".repeat(5-n);
function drawRev(){const all=[...reviews,...seed];$("#rc").textContent=all.length;$("#ra").textContent=(all.reduce((a,r)=>a+r.s,0)/all.length).toFixed(1).replace('.',',');$("#rl").innerHTML=all.map(r=>`<div class="rvi"><b>${esc(r.n)}</b><span class="st">${stars(r.s)}</span><p style="margin:6px 0 0">${esc(r.t)}</p><span class="mu">${esc(r.d)}</span></div>`).join("")}
function drawStars(){$("#stars").innerHTML=[1,2,3,4,5].map(i=>`<button type="button" class="${i<=rate?"on":""}" data-s="${i}" aria-label="${i} sao">★</button>`).join("")}
$("#stars").onclick=e=>{const b=e.target.closest("[data-s]");if(b){rate=+b.dataset.s;drawStars()}};
$("#rf").onsubmit=e=>{e.preventDefault();reviews.unshift({n:$("#rn").value.trim(),s:rate,t:$("#rt").value.trim(),d:new Date().toLocaleDateString("vi-VN")});store.set("mhv_reviews",reviews);e.target.reset();drawRev();toast("⭐","Cảm ơn bạn đã đánh giá!")};
/* ===== Giỏ hàng ===== */
function totals(){const sub=cart.reduce((a,i)=>a+i.qty*P.price,0);const ship=!sub||sub>=CFG.freeFrom?0:CFG.ship;return{sub,ship,tot:sub+ship}}
function sumHTML(){const t=totals();return `<div><span>Tạm tính</span><span>${money(t.sub)}</span></div><div><span>Phí vận chuyển</span><span>${t.ship?money(t.ship):"Miễn phí"}</span></div><div class="mu" style="font-size:.82rem;display:block">Miễn phí vận chuyển cho đơn từ ${money(CFG.freeFrom)}</div><div class="tot"><span>Tổng thanh toán</span><span>${money(t.tot)}</span></div>`}
function drawCart(){const box=$("#cartbox");
  if(!cart.length){box.innerHTML=`<div class="empty">🛒<p>Giỏ hàng đang trống.</p><a class="btn" href="#" data-go="home" data-to="sp">Mua sắm ngay</a></div>`;return}
  box.innerHTML=`<div class="cart"><div class="card">${cart.map(i=>`<div class="ci">${bag()}<div><b>${P.name}</b><div class="mu">${money(P.price)}</div><button class="x" data-rm="${i.id}">🗑 Xóa</button></div><div><div class="q" style="margin:0"><button data-c="-1">−</button><input value="${i.qty}" readonly><button data-c="1">+</button></div><div style="text-align:right;font-weight:700;margin-top:6px">${money(i.qty*P.price)}</div></div></div>`).join("")}</div><aside class="sum">${sumHTML()}<br><button class="btn" style="width:100%" data-go="checkout">Tiến hành thanh toán</button></aside></div>`}
$("#cartbox").onclick=e=>{const c=e.target.closest("[data-c]"),r=e.target.closest("[data-rm]");
  if(c){const it=cart[0];it.qty=Math.max(1,Math.min(P.stock,it.qty+ +c.dataset.c));save();drawCart()}
  if(r){cart=cart.filter(i=>i.id!==r.dataset.rm);save();drawCart()}};
/* ===== Thanh toán ===== */
function drawSum(){$("#cosum").innerHTML=`<h3>Đơn hàng (${count()} sản phẩm)</h3>`+sumHTML()}
$$('input[name="m"]').forEach(r=>r.onchange=()=>$("#bank").style.display=r.value==="bank"&&r.checked?"block":"none");
$("#cf").onsubmit=e=>{e.preventDefault();
  if(!cart.length){toast("🛒","Giỏ hàng đang trống.");return}
  const d=new Date(),code="MHV"+d.getFullYear().toString().slice(2)+String(d.getMonth()+1).padStart(2,"0")+String(d.getDate()).padStart(2,"0")+"-"+Math.random().toString(36).slice(2,7).toUpperCase();
  const f=new FormData(e.target),order={code,cust:Object.fromEntries(f),items:cart,total:totals().tot,at:d.toISOString()};
  const orders=store.get("mhv_orders",[]);orders.push(order);store.set("mhv_orders",orders);
  cart=[];save();e.target.reset();$("#bank").style.display="none";
  toast("🎉",`<b>Đặt hàng thành công!</b><br>Mã đơn hàng: <b>${code}</b><br>Tổng thanh toán: ${money(order.total)}<br>Chúng tôi sẽ liên hệ xác nhận sớm nhất.`,'<button class="btn" data-x data-go="home">Về trang chủ</button>')};
$("#ctf").onsubmit=e=>{e.preventDefault();e.target.reset();toast("✉️","Đã gửi liên hệ. Cảm ơn bạn!")};
/* ===== Khởi tạo ===== */
badge();drawRev();drawStars();{const a=$$('#guide .card'),cs=[a[0],a[1],a[2],a[4],a[3]],bar=document.createElement('div');bar.className='tabs';cs.forEach((c,i)=>{c.classList.add('tabp');const b=document.createElement('button');b.textContent=c.querySelector('h3').textContent;b.onclick=()=>{cs.forEach((x,j)=>x.classList.toggle('on',i===j));[...bar.children].forEach((x,j)=>x.classList.toggle('on',i===j))};bar.append(b)});$('#guide .grid').before(bar);bar.children[0].click()}
{const k=Object.keys(hashes).find(k=>"#"+hashes[k]===location.hash);if(k)show(k)}
