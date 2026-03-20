
let cart = JSON.parse(localStorage.getItem("cart")) || [];


function toggleMenu() {
    const nav = document.getElementById('nav-menu');
    nav.classList.toggle('active');
}


function add(name, price) {

  
  let existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    
    existingItem.qty += 1;
  } else {
    
    cart.push({ name, price, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  update();
}

function update() {
 
  let totalCount = 0;

  cart.forEach(item => {
    totalCount += item.qty;
  });

  document.getElementById("count").innerText = totalCount;
}

function goToCart() {
  window.location.href = "cart.html";
}

update();



function toggleChat(){
  let chat = document.getElementById("chatPopup");
  let overlay = document.getElementById("overlay");

  chat.classList.toggle("active");
  overlay.classList.toggle("active");

  
  if(chat.classList.contains("active")){
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

  let reply = getResponse(msg);

  let chatBody = document.getElementById("chatBody");

  chatBody.innerHTML += `<p><b>You:</b> ${msg}</p>`;
  chatBody.innerHTML += `<p><b>Bot:</b> ${reply}</p>`;

  inputBox.value = "";
}

function openChat(){
  document.getElementById("chatBox").classList.add("active");
  document.getElementById("overlay").classList.add("active");

  
  document.body.style.overflow = "hidden";
}

function closeChat(){
  document.getElementById("chatBox").classList.remove("active");
  document.getElementById("overlay").classList.remove("active");

  
  document.body.style.overflow = "auto";
}

