
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let box = document.getElementById("items");
let totalBox = document.getElementById("totalBox");

function toggleMenu() {
  const nav = document.getElementById('nav-menu');
  nav.classList.toggle('active');
}

// 🛒 SHOW CART
function show() {
  box.innerHTML = "";

  if (cart.length === 0) {
    box.innerHTML = "<h1 id='heading'>Your Cart is empty...😔</h1>";
    totalBox.innerText = "";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * (item.qty || 1);
    box.innerHTML += `
      <div class="item">
        <h3>${item.name}</h3>
        <p>Price: ₹${item.price}</p>
        <p>Qty: ${item.qty || 1}</p>
        <p>Total: ₹${item.price * (item.qty || 1)}</p>

        <div class="btns">
          <button class="plus" onclick="increaseQty(${index})">+</button>
          <button class="minus" onclick="decreaseQty(${index})">-</button>
          <button class="delete" onclick="removeItem(${index})">Delete</button>
        </div>
      </div>
    `;
  });

  
}


function increaseQty(index) {
  cart[index].qty += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  show();
}


function decreaseQty(index) {
  if (cart[index].qty > 1) {
    cart[index].qty -= 1;
  } else {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  show();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  show();
}


async function delivery(loc) {
  const apiKey = "f64f84d8b076da24ee3658daeba6c05d";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");

    const data = await res.json();
    const weather = data.weather[0].main.toLowerCase();
    const temp = data.main.temp;

    let baseCharge;

    if (loc.toLowerCase().includes("delhi")) baseCharge = 40;
    else if (loc.toLowerCase().includes("noida")) baseCharge = 30;
    else if (loc.toLowerCase().includes("ghaziabad")) baseCharge = 20;
    else baseCharge = 50;

    // 🌧 rain
    if (weather.includes("rain")) baseCharge += 50;

    // ❄ snow
    if (weather.includes("snow")) baseCharge += 70;

    // 🔥 heat (garmi)
    if (temp > 40) baseCharge += 30;

    // winter
    if (temp < 0) baseCharge += 40;

    return baseCharge;

  } catch (err) {
    alert(err.message);
    return null;
  }
}



async function order() {

 let loc = document.getElementById("loc").value.trim();
  if (!loc) {
    alert("Please enter location");
    return;
  }


  const d = await delivery(loc);
  if (d === null) return;

  let total = 0;
  cart.forEach((i) => total += i.price * i.qty);

  const final = total + d;

  document.getElementById("result").innerHTML = `
    <div class="order-card">
      <h2>🧾 Order Summary</h2>
      <p>Food: ₹${total}</p>
      <p>Delivery: ₹${d}</p>
      <hr>
      <h3>Total: ₹${final}</h3>
    </div>
  `;
document.getElementById("msg").innerText="Order Placed Successfully...🎉🎉";
msg.classList.add("jump")
}




show();


function toggleChat() {
  let chat = document.getElementById("chatPopup");
  let overlay = document.getElementById("overlay");

  chat.classList.toggle("active");
  overlay.classList.toggle("active");

  if (chat.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}


function getResponse(message) {
  message = message.toLowerCase();

  
  if (
    message.includes("order") &&
    (message.includes("where") || message.includes("status") || message.includes("kaha"))
  ) {
    return "Your order is on the way 🚚";
  }

  if (
    message.includes("time") ||
    message.includes("kitna time") ||
    message.includes("delivery kab") ||
    message.includes("when")
  ) {
    return "Delivery takes around 30-40 minutes ⏱️";
  }

  
  if (
    message.includes("late") ||
    message.includes("delay")
  ) {
    return "Sorry for the delay 😔. Your order will reach soon.";
  }

  return "Sorry, I didn't understand 😅 Connecting you to an agent...";
}
function sendMessage() {
  let inputBox = document.getElementById("userInput");
  let msg = inputBox.value;

  if (!msg) return;

  let reply = getResponse(msg);
  let chatBody = document.getElementById("chatBody");

  chatBody.innerHTML += `<p><b>You:</b> ${msg}</p>`;
  chatBody.innerHTML += `<p><b>Bot:</b> ${reply}</p>`;

  inputBox.value = "";
}


