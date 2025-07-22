const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const loginScreen = document.getElementById('login-screen');
const loginBtn = document.getElementById('login-btn');
const usernameInput = document.getElementById('username-input');
const chatContainer = document.getElementById('chat-container');

let username = "";

loginBtn.addEventListener('click', () => {
  username = usernameInput.value.trim();
  if (username) {
    loginScreen.classList.add('hidden');
    chatContainer.classList.remove('hidden');
    socket.emit('join', username);
  }
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', { user: username, text: input.value });
    input.value = '';
  }
});

socket.on('chat message', function(data) {
  const item = document.createElement('li');
  item.textContent = `${data.user}: ${data.text}`;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});

socket.on('system message', function(msg) {
  const item = document.createElement('li');
  item.textContent = msg;
  item.classList.add('system');
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});
