const d = document,
      isWriting = d.getElementById('isWriting'),
      messageContainer = d.getElementById('messageContainer'),
      emailUser = d.getElementById('emailUser'),
      nombreUser = d.getElementById('nombreUser'),
      apellidoUser = d.getElementById('apellidoUser'),
      edadUser = d.getElementById('edadUser'),
      aliasUser = d.getElementById('aliasUser'),
      avatarUser = d.getElementById('avatarUser'),
      listMessage = d.getElementById('listMessage');
/*funcion para mostrar mensajes en el DOM */
const showMessage = (data) => {
      const li = d.createElement('li');
      li.innerHTML = `<span class="email">${data.author.email}</span> <span  class="date">[${data.date}]</span><span  class="message">:${data.text}</span><span  class="message">  <img src="${data.author.avatar}"/></span>`;
      listMessage.appendChild(li);
      scrollToBottom();
};
{
}

/*funcion para que el scroll del chat siempre este en el ultimo mensaje */
const scrollToBottom = () => {
      messageContainer.scrollTop =
            messageContainer.scrollHeight - messageContainer.clientHeight;
};

/*funcion para mostrar quien esta escribiendo */
const showIsWriting = (data) => {
      isWriting.innerText = '. ';
      isWriting.innerText = `${data} esta escribiendo`;
      setTimeout(() => {
            isWriting.innerText = '. ';
      }, 2000);
};
const dataMensaje = () => {
      const data1 = {
            author: {
                  email: emailUser.value,
                  nombre: nombreUser.value,
                  apellido: apellidoUser.value,
                  edad: edadUser.value,
                  alias: aliasUser.value,
                  avatar: avatarUser.value,
            },
            text: inputMessage.value,
            date: new Date().toLocaleString(),
      };
      return data1;
};
export { showMessage, showIsWriting, dataMensaje };
