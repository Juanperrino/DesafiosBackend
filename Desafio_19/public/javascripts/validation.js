const d = document,
      emailUser = d.getElementById('emailUser'),
      btnMessage = d.getElementById('btnMessage'),
      enterEmail = d.getElementById('enterEmail');

function validEmail() {
      const regexEmail = /\S+@\S+\.\S+/;
      if (emailUser.value === '' || !regexEmail.test(emailUser.value)) {
            emailUser.classList.add('error');
            btnMessage.classList.add('hidden');
            enterEmail.classList.remove('hidden');
            return false;
      } else {
            emailUser.classList.remove('error');
            btnMessage.classList.remove('hidden');
            enterEmail.classList.add('hidden');

            return true;
      }
}

export { validEmail };
