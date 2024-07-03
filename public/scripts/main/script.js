const url = "http://88.85.211.234:"
const WebPort = "4212"
const WebUrl = url+WebPort
const ServerPort = "5085"
const ServerUrl = url+ServerPort

function checkAuthData() {
  // Проверяем, есть ли данные об авторизации в кэше
  const authData = localStorage.getItem('authData');
	
  // Если данных нет, перенаправляем на страницу авторизации
  if (!authData) {
    // Проверяем, на какой странице находится пользователь
    const currentPath = window.location.pathname;

    // Если пользователь уже находится на странице авторизации, ничего не делаем
    if (currentPath !== '/pages/auth.html') {
      window.location.href = `${WebUrl}/pages/auth.html`;
    }
  } else {
		protected
		console.log('У вас все есть!')
	}
}

// Вызываем функцию при загрузке страницы
window.addEventListener('load', checkAuthData)




async function protected() {
  try {
    const authData = JSON.parse(localStorage.getItem('authData'));
    if (!authData) {
      const currentPath = window.location.pathname;
      if (currentPath !== '/pages/auth.html') {
        window.location.href = `${WebUrl}/pages/auth.html`;
      }
      return;
    }

    const url = `${ServerUrl}/protected`;
    const headers = {
      'Authorization': `Bearer ${authData.protectedToken}`
    };
    const response = await fetch(url, {
      method: 'GET',
      headers: headers
    });

    if (response.status === 200) {
      const data = await response.text();
      if (data.includes('Hello, $username with role $role')) {
        window.location.href = `${WebUrl}/pages/auth.html`;
        return;
      }
      return data;
    } else {
      const errorData = await response.json();
      console.error('Error:', errorData);
      throw new Error(errorData.message);
    }
  } catch (error) {
    console.error('Error:', error);
    window.location.href = `${WebUrl}/pages/auth.html`;
    throw error;
  }
}




var $dateButton = $('#dropdownDate');
var $timePicker = $('#time-picker');
var selectedDateTime = null;

// Создаем массив времени от 00:00 до 23:00 с шагом 1 час
var timeOptions = [];
for (var i = 0; i < 24; i++) {
  var hour = ('0' + i).slice(-2);
  timeOptions.push('<option value="' + hour + ':00">' + hour + ':00</option>');
}

// Добавляем опции времени в выпадающий список
$timePicker.html(timeOptions.join(''));

$('#datepicker').datepicker({
  format: 'dd.mm.yy',
  autoclose: true
})
.on('changeDate', function(e) {
  var selectedDate = e.format('dd.mm.yy');
  selectedDateTime = selectedDate + ', 00:00';
  $dateButton.text(selectedDateTime);
});

$timePicker.on('change', function() {
  var selectedTime = $(this).val();
  selectedDateTime = selectedDateTime.split(' ')[0] + ' ' + selectedTime;
  $dateButton.text(selectedDateTime);
});
const timePath = "../../assets/icons/time.svg";
const commentsPath = "../../assets/icons/comments.svg";
const attachmentPath = "../../assets/icons/attachments.svg";

const timeImages = document.querySelectorAll(".time");
const commentsImages = document.querySelectorAll(".comments");
const attachmentImages = document.querySelectorAll(".attachment");

timeImages.forEach((timeImage) => {
	timeImage.src = timePath;
});

commentsImages.forEach((commentsImage) => {
	commentsImage.src = commentsPath;
});

attachmentImages.forEach((attachmentImage) => {
	attachmentImage.src = attachmentPath;
});



function checkAuthentication() {
	const authData = JSON.parse(localStorage.getItem('authData'));
	if (!authData) {
		window.location.href = `${WebUrl}/pages/auth.html`;
		return false;
	}
	return true;
}

window.addEventListener('load', function () {
  fetchEvents();
	getUserCount();
});

window.onload = function() {
if (checkAuthentication()) {
		document.querySelector('.content').style.display = 'block';
	}
};



async function fetchEvents() {
  try {
    const url = `${ServerUrl}/web/search`;
    const headers = {
      'Bearer-Authorization': 'bf8487ae-7d47-11ec-90d6-0242ac120003'
    };

    const response = await fetch(url, {
			method: 'GET',
      headers: headers
    });

    if (response.status === 200) {
      const data = await response.text();
      const eventsContainer = document.querySelector('.events');
      eventsContainer.innerHTML = data;
			const timePath = "../../assets/icons/time.svg";
			const commentsPath = "../../assets/icons/comments.svg";
			const attachmentPath = "../../assets/icons/attachments.svg";
			const eventmore = document.querySelector("#eventmore")
			const timeImages = document.querySelectorAll(".time");
			const commentsImages = document.querySelectorAll(".comments");
			const attachmentImages = document.querySelectorAll(".attachment");
			timeImages.forEach((timeImage) => {
				timeImage.src = timePath;
			});
			
			commentsImages.forEach((commentsImage) => {
				commentsImage.src = commentsPath;
			});
			
			attachmentImages.forEach((attachmentImage) => {
				attachmentImage.src = attachmentPath;
			});
			const scenarios = document.querySelectorAll(".scenario")
			scenarios.forEach(scenario => {
				scenario.addEventListener('click', (event) => handleScenarioClick(event, fetchScenario, showModal));
			});
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

function handleScenarioClick(event, fetchScenario, showModal) {
  let targetElement = event.target;
  while (targetElement && !targetElement.classList.contains('scenario')) {
    targetElement = targetElement.parentElement;
  }
  if (targetElement) {
    const scenarioId = targetElement.id;
    console.log('Был нажат сценарий с ID:', scenarioId);
		showChoose()
		.then(result => {
			if (result === 'reports') {
				showReports(scenarioId)
				fetchReports(scenarioId)
				console.log('Просмотр отчетов сценария');
			} else if (result === 'edit') {
				fetchScenario(scenarioId);
				showModal()
				console.log('Редактирование сценария');
			}
		})
		.catch(error => {
			if (error === 'close') {
				// Действия, если модальное окно было закрыто без выбора действия
				console.log('Модальное окно было закрыто');
			}
		});

  } else {
    console.log('Клик произошел не на элементе сценария');
  }
}





async function fetchScenario(searchQuery) {
  try {
    const url = `${ServerUrl}/web/scenario/search`;
    const headers = {
      'Bearer-Authorization': 'bf8487ae-7d47-11ec-90d6-0242ac120003',
			'Content-Type': 'application/json'
    };
    const requestBody = {
      searchQuery: searchQuery
    };
		console.log(requestBody)
    const response = await fetch(url, {
			method: 'POST',
      headers: headers,
			body: JSON.stringify(requestBody)
    });
    if (response.status === 200) {
      const data = await response.json();
      console.log('Это дата fetchScenario: ',data)
			const users = document.querySelector(".users")
			const date = document.querySelector("#dropdownDate")
			const title = document.querySelector("#scenariotitle")
			const type = document.querySelector("#dropdownType")
			const description = document.querySelector("#scenariodescription")
			const steps = document.querySelector(".steps")
			var geoplaceArray = data.scenario.location.split(",");
			var geoplaceX = parseFloat(geoplaceArray[1])
			var geoplaceY = parseFloat(geoplaceArray[0])
			description.textContent = data.scenario.description;
			date.textContent = data.scenario.date
			title.textContent = data.scenario.title
			users.val = data.scenario
			steps.innerHTML = '';
			data.steps.forEach(step => {
				steps.innerHTML += step.html;
			});
			initMap(geoplaceX, geoplaceY)
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

async function fetchReports(scenarioId) {
  try {
    // Fetch user data
    const url = `${ServerUrl}/userdata/get`;
    const headers = {
      'Bearer-Authorization': 'bf8487ae-7d47-11ec-90d6-0242ac120003',
      'Content-Type': 'application/json'
    };
    const requestBody = { scenarioId };
    const userDataResponse = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody)
    });

    if (userDataResponse.status === 200) {
      const userData = await userDataResponse.json();
      handleUserDataStepsResponse(userData);
      const userComment = document.querySelector('.commentText');
      userComment.textContent = userData[0].userComment;
      console.log('Successful user data response:', userData);

      // Update the steps report
      updateStepsReport(userData.dataSteps);

      // Fetch step data
      const webModelData = {
        userId: Array.from(new Set(userData.dataSteps.map(step => step.userId))),
        stepsId: Array.from(new Set(userData.dataSteps.map(step => step.stepId)))
      };
      const webModelUrl = `${ServerUrl}/web/getsteps`;
      const webModelResponse = await fetch(webModelUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(webModelData)
      });

      if (webModelResponse.status === 200) {
        const webData = await webModelResponse.json();
        console.log('Successful web model response:', webData);

        // Update the content of the selected elements
        const stepsNames = document.querySelectorAll(".stepsNames");
        const stepTitles = document.querySelectorAll(".stepTitle");
        const usersReport = document.querySelectorAll(".userreport");

        stepsNames.forEach((element, index) => {
          element.textContent = webData.steps[index].title;
        });

        stepTitles.forEach((element, index) => {
          element.textContent = "Шаг № " + webData.steps[index].number;
        });

        usersReport.forEach((element, index) => {
          element.textContent = webData.userName[index];
        });

        // Заполнить модальное окно данными
        fillReportsModal(webData.scenarioTitle, webData.userName[0], userData.dataSteps);

        return { userData, webData };
      } else {
        const errorData = await webModelResponse.json();
        console.error('Web model error:', errorData);
        throw new Error(errorData.message);
      }
    } else {
      const errorData = await userDataResponse.json();
      console.error('User data error:', errorData);
      throw new Error(errorData.message);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

function handleUserDataStepsResponse(data) {
  const userDataSteps = data.dataSteps;
  const photosContainer = document.getElementById('photos');
  const videoContainer = document.getElementById('videos');

  userDataSteps.forEach((step) => {
    if (step.photoData.length > 0) {
      step.photoData.forEach((photo, index) => {
        const photoUrl = createPhotoUrl(photo);
        displayPhoto(photoUrl, `Photo ${index + 1}`, photosContainer);
      });
    }

    if (step.videoData) {
      const videoUrl = createVideoUrl(step.videoData);
      displayVideo(videoUrl, videoContainer);
    }
  });

  // Add event listeners for modal
  const photos = document.querySelectorAll('.photo-container img');
  const modal = document.getElementById('photo-modal');
  const modalPhoto = document.getElementById('modal-photo');

  photos.forEach((photo) => {
    photo.addEventListener('click', () => {

      modalPhoto.src = photo.src;
      $(modal).modal('show');
    });
  });
}

function createStepReportElement(stepData) {
  const stepElement = document.createElement('div');
  stepElement.classList.add('col-md-6', 'mt-3', 'step');

  const cardElement = document.createElement('div');
  cardElement.classList.add('card');
  cardElement.id = `step-${stepData.id}`;

  const cardBodyElement = document.createElement('div');
  cardBodyElement.classList.add('card-body');

  const cardTitleElement = document.createElement('h5');
  cardTitleElement.classList.add('card-title', 'stepTitle');
  cardTitleElement.textContent = `Шаг № ${stepData.number}`;

  const cardSubtitleElement = document.createElement('h6');
  cardSubtitleElement.classList.add('card-subtitle', 'mb-2', 'text-muted', 'stepsNames');
  cardSubtitleElement.textContent = stepData.title;

  const photosContainerElement = document.createElement('div');
  photosContainerElement.classList.add('row', 'mb-3');
  photosContainerElement.id = `photos-${stepData.id}`;

  const videosContainerElement = document.createElement('div');
  videosContainerElement.classList.add('row');
  videosContainerElement.id = `videos-${stepData.id}`;

  const commentContainerElement = document.createElement('div');
  commentContainerElement.classList.add('card-footer', 'd-flex');

  const commentLabelElement = document.createElement('h6');
  commentLabelElement.classList.add('me-3');
  commentLabelElement.textContent = 'Комментарий:';

  const commentTextElement = document.createElement('h5');
  commentTextElement.classList.add('commentText');
  commentTextElement.textContent = stepData.userComment;

  commentContainerElement.appendChild(commentLabelElement);
  commentContainerElement.appendChild(commentTextElement);

  cardBodyElement.appendChild(cardTitleElement);
  cardBodyElement.appendChild(cardSubtitleElement);
  cardBodyElement.appendChild(photosContainerElement);
  cardBodyElement.appendChild(videosContainerElement);

  cardElement.appendChild(cardBodyElement);
  cardElement.appendChild(commentContainerElement);

  stepElement.appendChild(cardElement);

  return stepElement;
}

function updateStepsReport(stepsData) {
  const stepsReportContainer = document.getElementById('steps-report');
  stepsReportContainer.innerHTML = '';

  if (stepsData.length > 0) {
    stepsData.forEach((step) => {
      const stepElement = createStepReportElement(step);
      stepsReportContainer.appendChild(stepElement);
    });
  } else {
    const noStepsMessage = document.createElement('p');
    noStepsMessage.textContent = 'Нет данных по шагам';
    stepsReportContainer.appendChild(noStepsMessage);
  }
}

function fillReportsModal(scenarioTitle, userName, stepsData) {
  const reportTitleElement = document.getElementById('reportTitle');
  const scenarioRepTitleElement = document.getElementById('scenarioRepTitle');
  const userReportElement = document.querySelector('.userreport');
  const stepsReportContainer = document.querySelector('.stepsReport');

  reportTitleElement.textContent = 'Отчеты по сценарию:';
  scenarioRepTitleElement.textContent = scenarioTitle;
  userReportElement.textContent = userName;

  stepsReportContainer.innerHTML = '';

  stepsData.forEach((step) => {
    const stepElement = createStepReportElement(step);
    stepsReportContainer.appendChild(stepElement);
  });
}

function createPhotoUrl(photoData) {
  const byteArray = new Uint8Array(photoData);
  const blob = new Blob([byteArray], { type: 'image/jpeg' });
  return URL.createObjectURL(blob);
}

function displayPhoto(photoUrl, caption, container) {
  const photoContainerElement = document.createElement('div');
  photoContainerElement.classList.add('photo-container', 'col-md-4', 'mb-3');

  const photoElement = document.createElement('img');
  photoElement.src = photoUrl;
  photoElement.alt = caption;
  photoElement.classList.add('img-fluid', 'rounded');

  const captionElement = document.createElement('p');
  captionElement.textContent = caption;

  photoContainerElement.appendChild(photoElement);
  photoContainerElement.appendChild(captionElement);

  container.appendChild(photoContainerElement);
}
function createVideoUrl(videoData) {
  const byteArray = new Uint8Array(videoData);
  const blob = new Blob([byteArray], { type: 'video/mp4' });

  return URL.createObjectURL(blob);
}

function displayVideo(videoUrl, container) {
  const videoElement = document.createElement('video');
  videoElement.src = videoUrl;
  videoElement.controls = true;
  videoElement.style.maxWidth = '300px';
  videoElement.style.height = 'auto';
  container.appendChild(videoElement);
}


const userNicknameInput = document.getElementById('userNickname');
const userNicknameBtn = document.getElementById('userNicknameBtn');
const userListElement = document.getElementById('userList');
const createEventBtn = document.getElementById('createEventBtn');

userNicknameBtn.addEventListener('click', showUserList);
createEventBtn.addEventListener('click', createEvent);

async function showUserList() {
  try {
    const users = await fetchUsers();
    userListElement.innerHTML = '';
    users.forEach((user) => {
      const userItem = document.createElement('a');
      userItem.classList.add('list-group-item', 'list-group-item-action', 'user-item');
      userItem.textContent = user.userNickname;
      userItem.addEventListener('click', () => {
        userNicknameInput.value = user.userNickname;
        userNicknameInput.dataset.userId = user.id;
        userListElement.classList.remove('show');
      });
      userListElement.appendChild(userItem);
    });
    userListElement.classList.add('show');
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}



async function showUserListModal3() {
  console.log('НАЖАЛ!!');
  try {
    const users = await fetchUsers();
    const userListContent = document.getElementById('userListContent');
    userListContent.innerHTML = '';
    users.forEach((user) => {
      const userItem = document.createElement('a');
      userItem.classList.add('list-group-item', 'list-group-item-action', 'user-item');
      userItem.textContent = user.userNickname;
      userItem.addEventListener('click', () => {
        // Находим существующий элемент с id равным id пользователя
        const existingUserElement = document.getElementById(`user-${user.id}`);

        // Если существующий элемент есть, обновляем его, иначе создаем новый
        if (existingUserElement) {
          existingUserElement.querySelector('.useravatitle').textContent = user.userNickname.slice(0, 2).toUpperCase();
        } else {
          const newUserElement = document.createElement('div');
          newUserElement.classList.add('useravatars', 'me-2', 'd-flex', 'justify-content-center', 'align-items-center', 'userIdBro');
          newUserElement.id = `${user.id}`;
          const newUserAvatarTitle = document.createElement('span');
          newUserAvatarTitle.classList.add('useravatitle', 'scenariousers');
          newUserAvatarTitle.textContent = user.userNickname.slice(0, 2).toUpperCase();
          newUserElement.appendChild(newUserAvatarTitle);

          // Создаем кнопку для удаления пользователя
          const removeButton = document.createElement('button');
          removeButton.classList.add('userdelete', 'ms-2');
          removeButton.innerHTML = '<img src="../assets/icons/cancel.svg" id="cancelsvg">';
          removeButton.addEventListener('click', () => {
            newUserElement.remove();
            // Проверяем, есть ли другие элементы в контейнере
            const usersScenarioAdd = document.getElementById('usersScenarioAdd');
            if (!usersScenarioAdd.firstElementChild) {
              // Если нет, добавляем кнопку "Добавить пользователя"
              const addUserButton = document.createElement('button');
              addUserButton.classList.add('useravatars', 'me-2', 'd-flex', 'justify-content-center', 'align-items-center');
              addUserButton.id = 'adduserintoscenario';
              addUserButton.setAttribute('onclick', 'showUserListModal3()');
              const addUserIcon = document.createElement('img');
              addUserIcon.src = '../assets/icons/add.svg';
              addUserButton.appendChild(addUserIcon);
              usersScenarioAdd.appendChild(addUserButton);
            }
          });
          newUserElement.appendChild(removeButton);

          // Добавляем или обновляем элемент в контейнере с id 'usersScenarioAdd'
          const usersScenarioAdd = document.getElementById('usersScenarioAdd');
          if (usersScenarioAdd.firstElementChild) {
            usersScenarioAdd.firstElementChild.remove();
          }
          usersScenarioAdd.appendChild(newUserElement);
        }

        userNicknameInput.value = user.userNickname;
        userNicknameInput.dataset.userId = user.id;

        // Закрываем модальное окно
        const userListModal = bootstrap.Modal.getInstance(document.getElementById('userListModal'));
        userListModal.hide();
      });
      userListContent.appendChild(userItem);
    });

    const userListModal = new bootstrap.Modal(document.getElementById('userListModal'), {
      keyboard: true
    });
    userListModal.show();
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}



async function createEvent() {
  try {
    const eventName = document.getElementById('eventName').value;
    const userId = userNicknameInput.dataset.userId;
    await createEventOnServer(eventName, userId);
    // Reset the form
    document.getElementById('eventName').value = '';
    userNicknameInput.value = '';
    userNicknameInput.dataset.userId = '';
    // Close the modal
    const modal = document.getElementById('addEvent');
    const modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();
  } catch (error) {
    console.error('Error creating event:', error);
  }
}


async function createScenario(scenarioData){
	try {
		const newScenario = {
			title: scenarioData.scenarioTitle,
			description: scenarioData.scenarioDescription,
			date: scenarioData.dropdownDateText,
			location: "54,65"
		}
		const response = await fetch(`${ServerUrl}/scenarios/add`, {
      method: 'POST',
      headers: {
        'Bearer-Authorization': 'bf8487ae-7d47-11ec-90d6-0242ac120003',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newScenario)
    });
		if (response.ok) {
      const createdScenario = await response.json();
      console.log('New scenario created!', createdScenario);
			await eventAddUser(scenarioData.eventId, scenarioData.userId)
			await createSteps(scenarioData, createdScenario.id);
			await linkEventScenarios(scenarioData.eventId, createdScenario.id)
    } else {
      const error = await response.json();
      console.error(error);
      alert(error.message);
    }
	} catch(error){
		console.log(error)
	}
}


async function createUserGroup() {
  try {
    const groupNameInput = document.querySelectorAll('#groupname');
    const groupName = groupNameInput.value;
    const userIds = selectedUsers.map((user) => user.id);

    const newGroup = {
      groupName: groupName,
      userIds: userIds
    };

    const response = await fetch(`${ServerUrl}/userdata/creategroup`, {
      method: 'POST',
      headers: {
        'Bearer-Authorization': 'bf8487ae-7d47-11ec-90d6-0242ac120003',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newGroup)
    });

    if (response.ok) {
      const createdGroup = await response.json();
      console.log('New group created:', createdGroup);
      alert('Group created successfully!');
      groupNameInput.value = '';
      selectedUsers = [];
      updateSelectedUsers();
    } else {
      const error = await response.json();
      console.error('Error creating group:', error);
      alert(`Error creating group: ${error.message}`);
    }
  } catch (error) {
    console.error('Error creating group:', error);
    alert('An error occurred while creating the group. Please try again later.');
  }
}
async function linkEventScenarios(scenarioData, scenarioid) {
  try {
		const linkScenarios = {
			eventId: scenarioData,
			scenarioIds: [scenarioid]
		};

    const response = await fetch(`${ServerUrl}/events/link-scenarios`, {
      method: 'POST',
      headers: {
        'Bearer-Authorization': 'bf8487ae-7d47-11ec-90d6-0242ac120003',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(linkScenarios)
    });

    if (response.ok) {
      const createdGroup = await response.json();
      console.log('All created!', createdGroup);
    } else {
      const error = await response.json();
      console.error('Error creating group:', error);
      alert(`Error creating group: ${error.message}`);
    }
  } catch (error) {
    console.error('Error creating group:', error);
    alert('An error occurred while creating the group. Please try again later.');
  }
}
async function linkScenariosSteps(scenarioData, stepId) {
  try {
		const linkScenarios = {
			scenarioId: scenarioData,
			stepIds: [stepId]
		};

    const response = await fetch(`${ServerUrl}/scenarios/link-steps`, {
      method: 'POST',
      headers: {
        'Bearer-Authorization': 'bf8487ae-7d47-11ec-90d6-0242ac120003',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(linkScenarios)
    });

    if (response.ok) {
      const createdGroup = await response.json();
      console.log('All created!', createdGroup);
    } else {
      const error = await response.json();
      console.error('Error creating group:', error);
      alert(`Error creating group: ${error.message}`);
    }
  } catch (error) {
    console.error('Error creating group:', error);
    alert('An error occurred while creating the group. Please try again later.');
  }
}

async function eventAddUser(eventId, userId) {
	console.log('ЕВЕНТ АЙДИ',eventId,"ЮЗЕР АЙДИ",userId)
  try {
		const linkScenarios = {
			searchQuery: eventId,
			userId: userId
		};

    const response = await fetch(`${ServerUrl}/events/addUser`, {
      method: 'POST',
      headers: {
        'Bearer-Authorization': 'bf8487ae-7d47-11ec-90d6-0242ac120003',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(linkScenarios)
    });

    if (response.ok) {
      const createdGroup = await response.json();
      console.log('USER GOOD', createdGroup);
    } else {
    }
  } catch (error) {
    console.error('Error creating group:', error);
    alert('An error occurred while creating the group. Please try again later.');
  }
}


async function saveEditScenario() {
  try {
    // Получение значения из #scenariotitle-input
    const scenarioTitle = document.getElementById('scenariotitle-input').value;

    // Получение id из .useravatars

    const userId = authData.userId

    // Получение текста из #dropdownDate
    const dropdownDateElement = document.getElementById('dropdownDate');
    const dropdownDateText = dropdownDateElement.textContent;

    // Получение текста из #scenariodescription-textarea
    const scenarioDescriptionElement = document.getElementById('scenariodescription-textarea');
    const scenarioDescription = scenarioDescriptionElement.value;

    // Получение количества элементов с классом .steps
    const stepsElement = document.querySelector('.steps');
    const stepsElements = stepsElement.querySelectorAll('.step');
    const stepsCount = stepsElements.length;

    // Получение значений card-subtitle и card-title
    const cardSubtitleElements = document.querySelectorAll('.card-subtitle');
    const cardTitleElements = document.querySelectorAll('.card-title');
    const cardSubtitleValues = Array.from(cardSubtitleElements).slice(0, -1).map(element => element.textContent);
    const cardTitleValues = Array.from(cardTitleElements).slice(0, -1).map(element => element.textContent);

    // Получение состояния чекбоксов фото и видео
    const photoElements = document.querySelectorAll('.photo');
    const videoElements = document.querySelectorAll('.video');

    // Проверка состояния clicked для фото и видео элементов
    const statesPairs = [];

    for (let i = 0; i < photoElements.length; i++) {
      const photoElement = photoElements[i];
      const videoElement = videoElements[i];

      const photoClicked = photoElement.classList.contains('clicked');
      const videoClicked = videoElement.classList.contains('clicked');

      statesPairs.push([photoClicked, videoClicked]);
    }

    // Теперь вы можете использовать эти данные для сохранения изменений
    const editedScenarioData = {
      eventId,
      scenarioTitle,
      userId,
      dropdownDateText,
      scenarioDescription,
      stepsCount,
      cardSubtitleValues,
      cardTitleValues,
      statesPairs
    };

    // Сохраняем изменения на сервер
    await createScenario(editedScenarioData);

    console.log('Сценарий успешно сохранен:', editedScenarioData);
  } catch (error) {
    console.error('Ошибка при сохранении сценария:', error);
    alert('Произошла ошибка при сохранении сценария. Пожалуйста, попробуйте еще раз.');
  }
}

async function createSteps(scenarioData, scenarioId) {
	console.log(scenarioData, scenarioId)
  for (let i = 0; i < scenarioData.stepsCount; i++) {
    const stepNumber = i + 1;
    const stepTitle = scenarioData.cardSubtitleValues[i];
    const [photoClicked, videoClicked] = scenarioData.statesPairs[i];

    let action;
    if (photoClicked && videoClicked) {
      action = 'photo,video';
    } else if (photoClicked) {
      action = 'photo';
    } else if (videoClicked) {
      action = 'video';
    } else {
      action = '';
    }

    const stepRequest = {
      title: stepTitle,
      action: action,
      number: stepNumber
    };

    const response = await fetch(`${ServerUrl}/steps/add`, {
      method: 'POST',
      headers: {
        'Bearer-Authorization': 'bf8487ae-7d47-11ec-90d6-0242ac120003',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stepRequest)
    });

    if (response.ok) {
			const step = await response.json();
      console.log(`Step "${stepTitle}" created successfully`);
			await linkScenariosSteps(scenarioId,step.id)
    } else {
    }
  }
}

async function fetchUsers() {
  try {
    const url = `${ServerUrl}/web/users`;
    const headers = {
      'Bearer-Authorization': 'bf8487ae-7d47-11ec-90d6-0242ac120003',
      'Content-Type': 'application/json'
    };

    const response = await fetch(url, {
      method: 'GET',

      headers: headers
    });

    if (response.status === 200) {
      const data = await response.json();
      return data.map(({ userNickname, id }) => ({ userNickname, id }));
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}



let selectedUsers = [];
async function showUserListModal() {
  try {
    const users = await fetchUsers();
    const userListContent = document.getElementById('userListContent');
    userListContent.innerHTML = '';
    users.forEach((user) => {
      const userItem = document.createElement('a');
      userItem.classList.add('list-group-item', 'list-group-item-action', 'user-item');
      userItem.textContent = user.userNickname;
      userItem.addEventListener('click', () => {
        userNicknameInput.value = user.userNickname;
        userNicknameInput.dataset.userId = user.id;
        const userListModal = document.getElementById('userListModal');
        const modalInstance = bootstrap.Modal.getInstance(userListModal);
        modalInstance.hide();
      });
      userListContent.appendChild(userItem);
    });

    const userListModal = new bootstrap.Modal(document.getElementById('userListModal'), {
      keyboard: true
    });
    userListModal.show();
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}


async function showUserListModal2() {
	console.log('НАЖАЛ!!')
  try {
    const users = await fetchUsers();
    const userListContent = document.getElementById('userListContent');
    userListContent.innerHTML = '';
    users.forEach((user) => {
      const userItem = document.createElement('a');
      userItem.classList.add('list-group-item', 'list-group-item-action', 'user-item');
      userItem.textContent = user.userNickname;
      userItem.addEventListener('click', () => {
        toggleUserSelection(user);
      });
      userListContent.appendChild(userItem);
    });

    const userListModal = new bootstrap.Modal(document.getElementById('userListModal'), {
      keyboard: true
    });
    userListModal.show();
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

function toggleUserSelection(user) {
  const userIndex = selectedUsers.findIndex((u) => u.id === user.id);
  if (userIndex === -1) {
    selectedUsers.push(user);
  } else {
    selectedUsers.splice(userIndex, 1);
  }
  updateSelectedUsers();
}

function updateSelectedUsers() {
  const selectedUsersElement = document.getElementById('selectedUsers');
  selectedUsersElement.innerHTML = '';
  selectedUsers.forEach((user) => {
    const userItem = document.createElement('li');
    userItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    userItem.textContent = user.userNickname;
    const removeButton = document.createElement('button');
    removeButton.classList.add('btn', 'btn-sm', 'btn-danger', 'remove-user');
    removeButton.dataset.userId = user.id;
    removeButton.innerHTML = '<i class="bi bi-trash"></i>';
    removeButton.addEventListener('click', () => {
      removeUserFromSelection(user);
    });
    userItem.appendChild(removeButton);
    selectedUsersElement.appendChild(userItem);
  });
}

function removeUserFromSelection(user) {
  const userIndex = selectedUsers.findIndex((u) => u.id === user.id);
  if (userIndex !== -1) {
    selectedUsers.splice(userIndex, 1);
    updateSelectedUsers();
  }
}

async function createEventOnServer(title, userId) {
  try {
    const url = `${ServerUrl}/events/add`;
    const headers = {
      'Bearer-Authorization': 'bf8487ae-7d47-11ec-90d6-0242ac120003',
      'Content-Type': 'application/json'
    };
    const requestBody = {
      title,
      userId,
      date: '00.00.00'
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody)
    });

    if (response.status === 200) {
			fetchEvents();
      console.log('Event created successfully');
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
}



async function getUserCount() {
  try {
		const headers = {
      'Bearer-Authorization': 'bf8487ae-7d47-11ec-90d6-0242ac120003'
    };
    const response = await fetch(`${ServerUrl}/userdata/getcount`, {
			method: 'GET',
      headers: headers
    });
    if (response.status === 200) {
      const data = await response.text();
			const userdata = document.querySelector("#usercount")
			userdata.textContent = data.toString()
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



async function initMap(geoplaceX, geoplaceY) {
	await ymaps3.ready;
	const {       YMap,
		YMapDefaultSchemeLayer,
		YMapControls,
		YMapDefaultFeaturesLayer,
		YMapMarker} = ymaps3;

	// Проверяем, есть ли уже элемент с id 'map'
	const mapElement = document.getElementById('map');
	if (mapElement) {
			// Если элемент есть, проверяем, есть ли на нем уже инстанс YMap
			if (mapElement.YMapInstance) {
					// Если есть, то ничего не делаем
					return;
			}
	}
	const {
		YMapZoomControl,
		YMapGeolocationControl
	} = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');

	const map = new YMap(
			document.getElementById('map'),
			{
					location: {
							center: [geoplaceX, geoplaceY],
							zoom: 18
					}
			}
	);

	const MARKER_COORDINATES = [geoplaceX, geoplaceY];
	map.addChild(scheme = new YMapDefaultSchemeLayer());
	map.addChild(new YMapDefaultFeaturesLayer());
	// Добавление элементов управления на карту
	map.addChild(new YMapControls({position: 'right'})
		.addChild(new YMapZoomControl({}))
	);
	map.addChild(new YMapControls({position: 'top right'})
		.addChild(new YMapGeolocationControl({}))
	);

	const el = document.createElement('img');
	el.className = 'my-marker';	
	el.src = '../../assets/icons/geolocation.svg';
	el.title = 'Маркер';
	// При клике на маркер меняем центр карты на LOCATION с заданным duration
	el.onclick = () => map.update({location: {...LOCATION, duration: 400}});

	// Создание заголовка маркера
	const markerTitle = document.createElement('div');
	markerTitle.className = 'marker-title';
	markerTitle.innerHTML = '';

	// Контейнер для элементов маркера
	const imgContainer = document.createElement('div');
	imgContainer.appendChild(el);
	imgContainer.appendChild(markerTitle);
	map.addChild(new YMapMarker({coordinates: MARKER_COORDINATES}, imgContainer));
	// Сохраняем инстанс YMap в элементе
	mapElement.YMapInstance = map;
}


window.addEventListener('load', async () => {
  try {
    await fetchEvents();
  } catch (error) {
    console.error('Error:', error);
  }
});



const authData = JSON.parse(localStorage.getItem('authData'));
if (authData) {
	const profileNameElement = document.getElementById('profile-name');
	profileNameElement.textContent = authData.username;
	const profileNameAvatarElement = document.getElementById('profile-name-avatar');
	const nameInitials = authData.username.split(' ').slice(0, 2).map(word => word.charAt(0)).join('');
	profileNameAvatarElement.textContent = nameInitials;
  console.log('Saved auth data:', authData);
  // Теперь вы можете использовать данные, например:
  console.log('Username:', authData.username);
  console.log('User ID:', authData.userId);
} else {
  console.log('No auth data found');
}


function toggleDarkTheme() {
	// Функция для переключения темной темы
	// Пока что будет просто показывать модальное окно с уведомлением
	$('#darkThemeModal').modal('show');
}

// Модальное окно для уведомления о темной теме
$('body').append(`
	<div class="modal fade" id="darkThemeModal" tabindex="-1" aria-labelledby="darkThemeModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">

				<div class="modal-header">
					<h5 class="modal-title" id="darkThemeModalLabel">Work In Progress</h5>
					<button type="button	" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					Функция еще в разработке.
				</div>
			</div>
		</div>
	</div>
`);




let eventId
function showModal(event) {
  // Получение ID кнопки
  eventId = event.currentTarget.id;
  console.log('Event ID:', eventId);
	X = 56.834492
	Y = 60.598148
	initMap(Y,X)
	$('#myModal .steps').html('');
	$('#myModal').modal('show');
	$('#myModal').on('hidden.bs.modal', function () {
    // Clear the content inside the .modal-body element
		$('#myModal #scenariotitle').text('Название сценария');
    $('#myModal #dropdownDate').innerHTML('Дата и время');
    $('#myModal #scenariodescription').html('Описание сценария');
    $('#myModal .steps').innerHTML('');
  });
}

function showChoose() {
  return new Promise((resolve, reject) => {
    $('#chooseModal').modal('show');
    const viewReportsButton = $('#chooseModal .btn-secondary:first-child');
    const editScenarioButton = $('#chooseModal .btn-secondary:last-child');
    viewReportsButton.click(function() {
      $('#chooseModal').modal('hide');
      resolve('reports');
    });

    editScenarioButton.click(function() {
      $('#chooseModal').modal('hide');
      resolve('edit');
    });

    $('#chooseModal').on('hidden.bs.modal', function() {
      reject('close');
    });
  });
}

function editScenarioTitle() {
  // Получаем ссылку на элемент заголовка
  var scenarioTitleElement = document.getElementById('scenariotitle');

  // Проверяем, если элемент не найден, то выходим из функции
  if (!scenarioTitleElement) {
    return;
  }

  // Проверяем, есть ли уже input в родителе
  if (scenarioTitleElement.tagName.toLowerCase() === 'input') {
    // Если есть input, то обновляем значение заголовка и возвращаем div
    if (scenarioTitleElement.parentNode) {
      scenarioTitleElement.parentNode.replaceChild(
        createScenarioTitleElement(scenarioTitleElement.value),
        scenarioTitleElement
      );
    }
    return;
  }

  // Сохраняем текущее значение заголовка
  var currentTitle = scenarioTitleElement.textContent;

  // Создаем элемент input, чтобы заменить заголовок
  var input = document.createElement('input');
  input.id = 'scenariotitle-input'; // добавлен id для input
  input.value = currentTitle;
  input.classList.add('h5', 'me-3');
  input.addEventListener('keyup', function(event) {
    // Проверяем, была ли нажата клавиша Enter
    if (event.key === 'Enter') {
      // Обновляем значение заголовка
      if (scenarioTitleElement.parentNode) {
        scenarioTitleElement.parentNode.replaceChild(
          createScenarioTitleElement(this.value),
          scenarioTitleElement
        );
      }
    }
  });

  // Заменяем div на input
  if (scenarioTitleElement.parentNode) {
    scenarioTitleElement.parentNode.replaceChild(input, scenarioTitleElement);
  }

  // Переносим фокус на input
  input.focus();
  input.select();
}

function createScenarioTitleElement(text) {
  // Создаем новый div с классом h5 и меняем текст
  var newScenarioTitleElement = document.createElement('div');
  newScenarioTitleElement.id = 'scenariotitle';
  newScenarioTitleElement.classList.add('h5', 'me-3');
  newScenarioTitleElement.textContent = text;
  return newScenarioTitleElement;
}


function editScenarioDescription() {
  // Получаем ссылку на элемент описания
  var scenarioDescriptionElement = document.getElementById('scenariodescription');

  // Проверяем, если элемент не найден, то выходим из функции
  if (!scenarioDescriptionElement) {
    return;
  }

  // Проверяем, есть ли уже textarea в родителе
  if (scenarioDescriptionElement.tagName.toLowerCase() === 'textarea') {
    // Если есть textarea, то обновляем значение описания и возвращаем p
    if (scenarioDescriptionElement.parentNode) {
      scenarioDescriptionElement.parentNode.replaceChild(
        createScenarioDescriptionElement(scenarioDescriptionElement.value),
        scenarioDescriptionElement
      );
    }
    return;
  }

  // Сохраняем текущее значение описания
  var currentDescription = scenarioDescriptionElement.textContent;

  // Создаем элемент textarea, чтобы заменить описание
  var textarea = document.createElement('textarea');
  textarea.id = 'scenariodescription-textarea'; // добавлен id для textarea
  textarea.value = currentDescription;
  textarea.classList.add('form-control', 'me-3');
  textarea.addEventListener('keyup', function(event) {
    // Проверяем, была ли нажата клавиша Enter
    if (event.key === 'Enter') {
      // Обновляем значение описания
      if (scenarioDescriptionElement.parentNode) {
        scenarioDescriptionElement.parentNode.replaceChild(
          createScenarioDescriptionElement(this.value),
          scenarioDescriptionElement
        );
      }
    }
  });

  // Заменяем p на textarea
  if (scenarioDescriptionElement.parentNode) {
    scenarioDescriptionElement.parentNode.replaceChild(textarea, scenarioDescriptionElement);
  }

  // Переносим фокус на textarea
  textarea.focus();
  textarea.select();
}

function createScenarioDescriptionElement(text) {
  // Создаем новый p с классом form-control и меняем текст
  var newScenarioDescriptionElement = document.createElement('p');
  newScenarioDescriptionElement.id = 'scenariodescription';
  newScenarioDescriptionElement.classList.add('form-control', 'me-3');
  newScenarioDescriptionElement.textContent = text;
  return newScenarioDescriptionElement;
}


let stepCounter = 1;

function createStep() {
  // Создаем новый div для шага
  const stepElement = document.createElement('div');
  stepElement.classList.add('col-md-6', 'mt-3', 'step');

  // Создаем card для шага
  const cardElement = document.createElement('div');
  cardElement.classList.add('card');
  cardElement.id = `step${stepCounter}`;

  // Создаем body для card
  const cardBodyElement = document.createElement('div');
  cardBodyElement.classList.add('card-body');

  // Добавляем заголовок шага
  const stepTitleElement = document.createElement('h5');
  stepTitleElement.classList.add('card-title');
  stepTitleElement.textContent = `Шаг № ${stepCounter}`;

  // Добавляем подзаголовок шага
  const stepSubtitleElement = document.createElement('h6');
  stepSubtitleElement.classList.add('card-subtitle', 'mb-2', 'text-muted');
  stepSubtitleElement.textContent = 'Название шага';

  // Добавляем описание шага
  const stepDescriptionElement = document.createElement('p');
  stepDescriptionElement.classList.add('card-text');
  stepDescriptionElement.textContent = 'Тип отчетности';

  // Добавляем переключатели для фото и видео
  const switchesElement = document.createElement('div');
  switchesElement.classList.add('d-flex', 'justify-content-between', 'align-items-center');
  const photoElement = document.createElement('div');
  photoElement.classList.add('d-flex', 'align-items-center','photo');

  const photoIconElement = document.createElement('img');
  photoIconElement.src = '../assets/icons/photo.svg';
  photoIconElement.style.width = '20px';
  photoIconElement.style.height = '20px';
  photoIconElement.classList.add('me-2');

  const photoTextElement = document.createElement('span');
  photoTextElement.textContent = 'Фото';

  const photoSwitchElement = document.createElement('div');
  photoSwitchElement.classList.add('form-check', 'form-switch', 'ms-3');

  const photoInputElement = document.createElement('input');
  photoInputElement.classList.add('form-check-input');
  photoInputElement.type = 'checkbox';
	photoInputElement.onclick = function() {
		if (photoElement.classList.contains('clicked')) {
			photoElement.classList.remove('clicked');
		} else {
			photoElement.classList.add('clicked');
		}
	};
  photoInputElement.classList.add = `photo`;

  photoSwitchElement.appendChild(photoInputElement);
  photoElement.appendChild(photoIconElement);
  photoElement.appendChild(photoTextElement);
  photoElement.appendChild(photoSwitchElement);

  const videoElement = document.createElement('div');
  videoElement.classList.add('d-flex', 'align-items-center', 'ms-3', 'video');

  const videoIconElement = document.createElement('img');
  videoIconElement.src = '../assets/icons/video.svg';
  videoIconElement.style.width = '20px';
  videoIconElement.style.height = '20px';
  videoIconElement.classList.add('ms-3', 'me-2');

  const videoTextElement = document.createElement('span');
  videoTextElement.textContent = 'Видео';

  const videoSwitchElement = document.createElement('div');
  videoSwitchElement.classList.add('form-check', 'form-switch', 'ms-3');

  const videoInputElement = document.createElement('input');
  videoInputElement.classList.add('form-check-input');
  videoInputElement.type = 'checkbox';
  videoInputElement.classList.add = `video`;
	videoInputElement.onclick = function() {
		if (videoElement.classList.contains('clicked')) {
			videoElement.classList.remove('clicked');
		} else {
			videoElement.classList.add('clicked');
		}
	};
  videoSwitchElement.appendChild(videoInputElement);
  videoElement.appendChild(videoIconElement);
  videoElement.appendChild(videoTextElement);
  videoElement.appendChild(videoSwitchElement);

  switchesElement.appendChild(photoElement);
  switchesElement.appendChild(videoElement);

  // Добавляем footer для card
  const cardFooterElement = document.createElement('div');
  cardFooterElement.classList.add('card-footer', 'd-flex');

  const editButtonElement = document.createElement('button');
  editButtonElement.classList.add('btn', 'btn-primary', 'btn-sm', 'me-3');
  editButtonElement.textContent = 'Изменить';

  const deleteButtonElement = document.createElement('button');
  deleteButtonElement.classList.add('btn', 'btn-danger', 'btn-sm');
  deleteButtonElement.textContent = 'Удалить';
  deleteButtonElement.addEventListener('click', () => {
    stepElement.remove();
  });

  cardFooterElement.appendChild(editButtonElement);
  cardFooterElement.appendChild(deleteButtonElement);

  // Собираем все элементы в card
  cardBodyElement.appendChild(stepTitleElement);
  cardBodyElement.appendChild(stepSubtitleElement);
  cardBodyElement.appendChild(stepDescriptionElement);
  cardBodyElement.appendChild(switchesElement);
  cardElement.appendChild(cardBodyElement);
  cardElement.appendChild(cardFooterElement);

  // Добавляем card в блок steps
  stepElement.appendChild(cardElement);
  document.querySelector('.steps').appendChild(stepElement);
  // Обработчик для кнопки "Изменить"
  editButtonElement.addEventListener('click', () => {
    editStep(cardElement.id);
  });

  // Обработчик для кнопки "Удалить"
  deleteButtonElement.addEventListener('click', () => {
    deleteStep(cardElement.id);
  });

  // Добавляем card в блок steps
  stepElement.appendChild(cardElement);
  document.querySelector('.steps').appendChild(stepElement);

  stepCounter++;
}

function editStep(stepId) {
  // Находим элемент card по ID
  const cardElement = document.getElementById(stepId);

  // Находим элемент card-subtitle
  const stepSubtitleElement = cardElement.querySelector('.card-subtitle');

  // Создаем input для редактирования названия
  const stepNameInput = document.createElement('input');
  stepNameInput.classList.add('form-control', 'me-3');
  stepNameInput.value = stepSubtitleElement.textContent;

  // Заменяем card-subtitle на input
  stepSubtitleElement.parentNode.replaceChild(stepNameInput, stepSubtitleElement);

  // Добавляем обработчик события keyup для сохранения изменений
  stepNameInput.addEventListener('keyup', (event) => {
    // Проверяем, была ли нажата клавиша Enter
    if (event.key === 'Enter') {
      // Обновляем название шага
      const newStepName = stepNameInput.value;
      const newStepSubtitleElement = document.createElement('h6');
      newStepSubtitleElement.classList.add('card-subtitle', 'mb-2', 'text-muted');
      newStepSubtitleElement.textContent = newStepName;
      stepNameInput.parentNode.replaceChild(newStepSubtitleElement, stepNameInput);
    }
  });

  // Переносим фокус на input
  stepNameInput.focus();
  stepNameInput.select();
}

function deleteStep(stepId) {
	      stepCounter--;
  // Находим элемент шага по ID
  const stepElement = document.getElementById(stepId);
  if (stepElement) {
    stepElement.remove();

    // Уменьшаем счетчик stepCounter
    const deletedStepNumber = parseInt(stepId.replace('step', ''));
    if (deletedStepNumber === stepCounter) {
      // Если был удален последний шаг, уменьшаем stepCounter на 1
      stepCounter--;
    } else {
      // Если был удален не последний шаг, нужно перенумеровать оставшиеся шаги
      const stepsElements = document.querySelectorAll('.step');
      for (let i = deletedStepNumber - 1; i < stepsElements.length; i++) {
        const stepElement = stepsElements[i];
        const stepId = `step${i + 1}`;
        stepElement.querySelector('.card').id = stepId;
        stepElement.querySelector('.card-title').textContent = `Шаг № ${i + 1}`;
      }
      stepCounter--;
    }
  }
}





function showReports() {
  // Show the modal
  $('#repotsModal').modal('show');

  // Add an event listener for the modal hide event
  $('#repotsModal').on('hidden.bs.modal', function () {
    // Clear the content inside the .modal-body element
    $('#repotsModal .userreport').text('');
    $('#repotsModal #photos').html('');
    $('#repotsModal #videos').html('');
    $('#repotsModal .commentText').text('');
  });
}

function showAddEvent(title, message) { 
	$('#addEvent').modal('show');
}

function showAddUser(title, message) { 
	$('#addUser').modal('show');
}
function showAddGroup(title, message) { 
	$('#addGroup').modal('show');
}


document.querySelectorAll('.dropdown-item').forEach(item => {
  item.addEventListener('click', function() {
    const dropdownButton = this.closest('.dropdown').querySelector('.dropdown-toggle');
    dropdownButton.textContent = this.dataset.value;
  });
});

async function createUser() {
  const fio = document.getElementById('fio');
  const nickname = document.getElementById('nickname');
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  let selectedValue = 'Исполнитель';

  dropdownItems.forEach(item => {
    item.addEventListener('click', function() {
      const dropdownButton = this.closest('.dropdown').querySelector('.dropdown-toggle');
      dropdownButton.textContent = this.dataset.value;
      selectedValue = this.dataset.value;
    });
  });

  let roleId;
  if (selectedValue === 'Исполнитель') {
    roleId = 4;
  } else if (selectedValue === 'Админ') {
    roleId = 1;
  }

  const formData = {
    username: fio.value,
    userNickname: `@${nickname.value}`,
    roleId: roleId
  };

  const headers = {
    'Content-Type': 'application/json',
    'Bearer-Authorization': 'bf8487ae-7d47-11ec-90d6-0242ac120003'
  };

  try {
    const response = await fetch(`${ServerUrl}/register`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      getUserCount();
      console.log('User created successfully');
      const data = await response.text();
      alert(data);
    }  else {
      console.error('Error creating user');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

const form = document.getElementById('myForm');
const fio = document.getElementById('fio');
const nickname = document.getElementById('nickname');
const dropdownItems = document.querySelectorAll('.dropdown-item');
let selectedValue = 'Исполнитель';

dropdownItems.forEach(item => {
	item.addEventListener('click', function() {
		const dropdownButton = this.closest('.dropdown').querySelector('.dropdown-toggle');
		dropdownButton.textContent = this.dataset.value;
		selectedValue = this.dataset.value;
	});
});

