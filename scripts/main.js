const namesField = document.querySelector('textarea#people');
const teamsCountField = document.querySelector('input#team-count');
const teamsNamesField = document.querySelector('textarea#team-names');
const generateButton = document.querySelector('.btn.generate-teams');
const menuIcons = document.querySelectorAll('.left-menu .menu-item');
const messageContainer = document.querySelector('.message-container');

const settingsInfo = {
	formingTeams: {
		oddMembersAllow: 'true',
	},
	teamBoardShow: {
		teamsSorted: 'false',
		membersSorted: 'false',
	},
};

namesField.value = `Атанас
Весела
Владимир Костадинов
Владимир Страхилов 
Габриела Иванова 
Габриела Петрова 
Даниел 
Даниела 
Деница 
Джулиана 
Димитър
Здравко
Иван
Любомир
Ростислав 
Теодора
Христина
Христо Цветков
Христо Добриков`;
teamsCountField.value = '2';
teamsNamesField.value = `a
b`;

const getMembers = () => namesField.value.split('\n').filter(Boolean);
const getRandomNum = (min, max) => Math.floor(Math.random() * max) + min;

function generateTeams() {
	const members = getMembers();
	const teamCount = Number(teamsCountField.value);
	const teamNames = teamsNamesField.value.split('\n').filter(Boolean);
	const allowOdd = settingsInfo.formingTeams.oddMembersAllow;
	const teamsInfo = createTeams({
		members,
		teamCount,
		teamNames,
		allowOdd,
	});
	console.log(teamsInfo);
	addToBoard(teamsInfo);
}

function setPeopleCount() {
	const count_html = document.querySelector('.app-wrapper .people-count');
	setTimeout(() => {
		const peopleCount = getMembers().length;
		count_html.textContent = peopleCount;
	});
}

function addToBoard(info) {
	modalContent.innerHTML = ''; // I do this to clear the message that says they are no teams
	const [teams, excludedMembers] = info;
	if (!teams) {
		modalContent.innerHTML = noResults();
		showMessage(false);
		return;
	}

	Object.keys(teams).forEach((team, i) => {
		const members = teams[team];
		let heading = team + ':';

		modalContent.innerHTML += `<div class="team team-${
			i + 1
		}"><i class="far fa-edit title-edit-icon i-${i + 1}"></i><h2 class="t${
			i + 1
		}">${heading}</h2> <ol class="team-members"></ol></div>`;
		// add all the members of the tea
		const list = document.querySelector(`.team.team-${i + 1} .team-members`);
		members.forEach(member => {
			list.innerHTML += `<li class="member${i + 1}">${member}</li>`;
		});
	});

	if (excludedMembers.length) addExcludedMembers(excludedMembers);

	showMessage(true);
}

function addExcludedMembers(members) {
	const excludedDiv = document.createElement('div');
	const heading = document.createElement('h2');
	const paragraph = document.createElement('p');
	excludedDiv.classList.add('excluded');
	heading.innerHTML = 'Players that are not included in any team:';
	paragraph.innerHTML = members.join(', ');
	excludedDiv.appendChild(heading);
	excludedDiv.appendChild(paragraph);
	modal.appendChild(excludedDiv);
}

function showMessage(status) {
	const heading = document.querySelector('.message-container .status-heading');
	const info = document.querySelector('.message-container .status-info');
	messageContainer.classList.remove('hidden');
	messageContainer.classList.remove('d-none');

	if (status) {
		messageContainer.dataset.status = 'success';
		messageContainer.classList.add('success');
		heading.textContent = 'The teams are ready';
		info.textContent = 'Click to see them';
	} else {
		messageContainer.dataset.status = 'fail';
		messageContainer.classList.add('fail');
		heading.textContent = 'Something went wrong';
		info.textContent = 'Please check your input';
	}

	setTimeout(() => startFadingAway(messageContainer));
}

function startFadingAway(container) {
	console.log(container);
	container.style.transition = '5s';
	container.classList.add('hidden');

	const disappearTimeout = setTimeout(
		() => container.classList.add('d-none'),
		5000
	);

	container.dataset.timeout = disappearTimeout;
}

const mouseoverHandler = function () {
	this.style.transition = '0s';
	this.classList.remove('hidden');
	clearTimeout(this.dataset.timeout);
};

messageContainer.addEventListener('mouseover', mouseoverHandler);
messageContainer.addEventListener('mouseleave', () =>
	startFadingAway(messageContainer)
);

const noResults = () => `<p class="no-teams">No teams formed yet.</p>`;

generateButton.addEventListener('click', generateTeams);
menuIcons.forEach(icon => {
	icon.addEventListener('click', openModal);
});
namesField.addEventListener('keydown', setPeopleCount);

messageContainer.addEventListener('click', () => {
	messageContainer.dataset.status === 'success' && openModal();
});

setPeopleCount();
