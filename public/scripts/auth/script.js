const url = "http://88.85.211.234:"
const WebPort = "4212"
const WebUrl = url+WebPort
const ServerPort = "5085"
const ServerUrl = url+ServerPort




async function sendLoginRequest(login, password) {
  try {
    const response = await fetch(`${ServerUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ login, password })
    });

    if (response.status === 200) {
      const data = await response.json();
      // Сохраняем данные в localStorage
      localStorage.setItem('authData', JSON.stringify(data));
      window.location.href = `${WebUrl}/pages/main.html`;
      return data;
    } else {
      const errorData = await response.json();
      console.error('Error:', errorData);
      throw new Error(errorData.message);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}



const authButton = document.querySelector('.auth');
const authSpinner = document.querySelector('.auth-spinner');
const spinner = document.querySelector('.spinner-border');
const successGif = document.querySelector('.auth-success-gif');
const login = document.querySelector('#loginInput')
const password = document.querySelector('#passwordInput')


let isAnimationInProgress = false;
authButton.addEventListener('click', () => {
	loginText = login.value
	passwordText = password.value
	sendLoginRequest(loginText, passwordText)
	if (isAnimationInProgress) return;
	isAnimationInProgress = true;

	authButton.disabled = true;
	spinner.classList.remove('spinnerhide')
	authSpinner.classList.remove('hide')
	authButton.classList.add('disabled');
	authSpinner.classList.add('show');

	setTimeout(() => {
		authSpinner.classList.add('expanded');
	}, 2000);

	setTimeout(() => {
		playSuccessSound()
		authSpinner.classList.add('show-gif');
	}, 2500);

	setTimeout(() => {
		authSpinner.classList.add('hide');
		authButton.disabled = false;
		authButton.classList.remove('disabled');
		isAnimationInProgress = false;
		spinner.classList.add('spinnerhide')
		authSpinner.classList.remove('show')
		authSpinner.classList.remove('expanded')
		authSpinner.classList.remove('show-gif')
	}, 4000);
});


function playSuccessSound() {
	const audio = new Audio('../../assets/audio/auth_error.mp3');
	audio.play();
}