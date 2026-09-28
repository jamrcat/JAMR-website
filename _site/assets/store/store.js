(() => {
  const PRODUCTS = {
    'short-sleeve': {name:'Short Sleeve Performance Shirt', price:35},
    'long-sleeve': {name:'Long Sleeve Performance Shirt', price:45},
    'hoodie': {name:'Sleeveless Hoodie', price:54},
    'training-shorts': {name:'Training Shorts', price:34}
  };
  const BUNDLES = {
    'curvilinear-ability': {name:'Curvilinear Ability Set', price:66, items:['short-sleeve','training-shorts']},
    'linear-curvilinear': {name:'Linear–Curvilinear Set', price:75, items:['long-sleeve','training-shorts']},
    'inside-outside': {name:'Inside–Outside Mechanics Set', price:84, items:['hoodie','training-shorts']},
    'need-for-speed': {name:'The Need for Speed Set', price:76, items:['short-sleeve','long-sleeve']},
    'gps-diagnostics': {name:'GPS Diagnostics Set', price:85, items:['short-sleeve','hoodie']},
    'imu-foot-pod': {name:'IMU Foot-Pod Set', price:94, items:['long-sleeve','hoodie']},
    'segment-specific': {name:'Segment-Specific Analysis Set', price:105, items:['short-sleeve','long-sleeve','training-shorts']},
    'functional-asymmetry': {name:'Functional Asymmetry Set', price:114, items:['short-sleeve','hoodie','training-shorts']},
    'velocity-time': {name:'Velocity–Time Profile Set', price:123, items:['long-sleeve','hoodie','training-shorts']},
    'new-perspectives': {name:'New Perspectives Set', price:124, items:['short-sleeve','long-sleeve','hoodie']},
    'training-curve': {name:'Training the Curve Complete Set', price:152, items:['short-sleeve','long-sleeve','hoodie','training-shorts']}
  };

  let cart = JSON.parse(localStorage.getItem('brs-cart-v1') || '[]');
  const q = s => document.querySelector(s);
  const qa = s => [...document.querySelectorAll(s)];
  const money = n => '$' + Number(n).toFixed(2);

  function save(){ localStorage.setItem('brs-cart-v1', JSON.stringify(cart)); render(); }
  function addProduct(btn){
    const id = btn.dataset.product;
    const card = btn.closest('.store-card');
    const size = card.querySelector('[data-size]').value;
    const qty = Math.max(1, parseInt(card.querySelector('[data-qty]').value || '1',10));
    const p = PRODUCTS[id];
    cart.push({type:'product', id, name:p.name, price:p.price, qty, size});
    save();
  }
  function addBundle(btn){
    const id = btn.dataset.bundle, b = BUNDLES[id];
    cart.push({type:'bundle', id, name:b.name, price:b.price, qty:1, size:'Select sizes after order'});
    save();
  }
  function remove(i){ cart.splice(i,1); save(); }
  function subtotal(){ return cart.reduce((s,x)=>s+x.price*x.qty,0); }
  function render(){
    const count = cart.reduce((s,x)=>s+x.qty,0);
    qa('.store-cart-count').forEach(el => el.textContent = count);
    const lines = q('#cart-lines');
    if(!lines) return;
    if(!cart.length){ lines.innerHTML='<div class="cart-empty">Your cart is empty.</div>'; }
    else lines.innerHTML = cart.map((x,i)=>`<div class="cart-line"><div><div class="cart-line-title">${x.name}</div><div class="cart-line-meta">${x.size} · Qty ${x.qty} · ${money(x.price*x.qty)}</div></div><button type="button" data-remove="${i}">Remove</button></div>`).join('');
    q('#cart-subtotal').textContent = money(subtotal());
    q('#cart-total').textContent = money(subtotal());
    q('#order-subtotal').textContent = money(subtotal());
    q('#order-cart-json').value = JSON.stringify(cart);
    q('#order-summary-text').value = cart.map(x=>`${x.name} | ${x.size} | Qty ${x.qty} | ${money(x.price*x.qty)}`).join('\n');
    qa('[data-remove]').forEach(b=>b.addEventListener('click',()=>remove(+b.dataset.remove)));
  }

  function updatePayment(){
    const method = q('#payment-method')?.value || '';
    const box = q('#payment-info');
    if(!box) return;
    const copy = {
      'ATH Móvil':'Your order will be submitted first. Complete payment through the business ATH Móvil account after receiving the payment instructions. Do not enter banking information on this website.',
      'PayPal':'Your order will be submitted first. You will then complete payment through PayPal using the merchant payment link. No card information is stored on this website.',
      'Cash / Local Pickup':'Use this only for an agreed local pickup. Payment is collected directly; no online processing fee is added.'
    };
    box.textContent = copy[method] || 'Choose a payment method to see the checkout instructions.';
  }

  document.addEventListener('DOMContentLoaded', () => {
    qa('.store-add').forEach(b=>b.addEventListener('click',()=>addProduct(b)));
    qa('.bundle-add').forEach(b=>b.addEventListener('click',()=>addBundle(b)));
    qa('[data-cart-toggle]').forEach(b=>b.addEventListener('click',()=>q('#store-cart')?.classList.toggle('open')));
    q('#cart-close')?.addEventListener('click',()=>q('#store-cart')?.classList.remove('open'));
    q('#checkout-open')?.addEventListener('click',()=>{
      if(!cart.length) return;
      q('#checkout')?.classList.add('open');
      q('#store-cart')?.classList.remove('open');
      q('#checkout')?.scrollIntoView({behavior:'smooth', block:'start'});
    });
    q('#payment-method')?.addEventListener('change', updatePayment);
    updatePayment();
    render();

    const form = q('#brs-order-form');
    form?.addEventListener('submit', (e)=>{
      if(!cart.length){ e.preventDefault(); alert('Your cart is empty.'); return; }
      q('#order-total-field').value = subtotal().toFixed(2);
      q('#order-id').value = 'BRS-' + Date.now().toString().slice(-9);
    });
  });
})();
