$(function () {

  const socket = io();

  //obteniendo los elementos del DOM desde la interfaz
  const $messageForm = $('#message-form');
  const $messageBox = $('#message');
  const $chat = $('#chat');

  //obteniendo los elementos del DOM desde la nicknameForm
  const $nickForm = $('#nickForm');
  const $nickError = $('#nickError');
  const $nickname = $('#nickname');

  const $users = $('#usernames');

  $nickForm.submit(e => {
    e.preventDefault();
    socket.emit('new user', $nickname.val(), data => {
      if (data) {
        $('#nickWrap ').hide();
        $('#contentWrap').show();

      } else {
        $nickError.html(`
           <div class="alert alert-danger">
              ese usuario ya existe.
           </div>
          `);
      }

      $nickname.val('');

    });

  });

  // eventos
  $messageForm.submit(e => {
    e.preventDefault();
    socket.emit('send message', $messageBox.val());
    $messageBox.val('');
  });

  socket.on('new message', function (data) {
    $chat.append(data + '<br/>');
  });

  socket.on('usernames', data => {
    let html = '';
    for (let i = 0; i < data.length; i++) {
      html += `<p><i class="fas fa-user"></i> ${data[i]}</p>`;
    }
    $users.html(html);
  });

})