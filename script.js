let person = {
	name: 'Wladimir Roor', // string 
	dateOfBirth: new Date(1984, 9, 12), // date 
//	age, // number 
	isHuman: true,  // boolean
	hasWork: true, // boolean
//	hobbies, // array
}; // object

window.addEventListener('scroll', doScrollFunctions);

function doScrollFunctions() {
	showElements();
	hideAfterScroll();
}

function showElements() {
	const elements = document.querySelectorAll('.hide-animation');
	elements.forEach(el => {
		const rect = el.getBoundingClientRect();
		if (rect.top < window.innerHeight) {
			el.classList.add('fade-slide-in-from-left-to-right');
		}
	})
}

window.onload = function () {

	console.log('website is geladen')
	person.age = calculateAge(person.dateOfBirth);
	setHobbies();
	writeHobbiesInConsole(person.hobbies);
	document.getElementById("year").innerText = new Date().getFullYear();
	checkLastVisit();
}



function calculateAge(dateOfBirth) {
	const currentDate = new Date();
	let age = currentDate.getFullYear() - dateOfBirth.getFullYear();
	const monthDiff = currentDate.getMonth() - dateOfBirth.getMonth();
	const dayDiff = currentDate.getDate() - dateOfBirth.getDate();

	if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
		age--;
	}
	return age;
}


function setHobbies() {
	person.hobbies = ['Gitaar leren spelen', 'Lezen', 'Programmeren'];
}

function writeHobbiesInConsole (hobbies) {
	if (hobbies === undefined) {
		console.log('Geen hobbies gevonden.');
		return;
	}

	for (let i = 0; i < person.hobbies.length; i++) {
		console.log(hobbies[i]);
	}
}


function validateForm() {

	const form = document.getElementById('form');
	const result = document.getElementById('result');


	form.addEventListener('submit', function(e) {
		e.preventDefault();

	if (hasElementError('name') || hasElementError('email') || hasElementError('message')) {
		result.innerText = 'Er is een fout opgetreden met het invullen van het formulier';
		result.className = 'form-error';
		return;
	} 
		const formData = new FormData(form);
		const object = Object.fromEntries(formData);
		const json = JSON.stringify(object);
		result.innerHTML = "Please wait...";

			fetch('https://api.web3forms.com/submit', {
							method: 'POST',
							headers: {
									'Content-Type': 'application/json',
									'Accept': 'application/json'
							},
							body: json
					})
					.then(async (response) => {
							let json = await response.json();
							if (response.status == 200) {
		const name = document.getElementById('name').value;
		result.innerText = 'Best ' +  name + ', uw bericht is verzonden';
		result.className = 'success-message';

							} else {
									console.log(response);
									result.innerHTML = json.message;
							}
					})
					.catch(error => {
							console.log(error);
							result.innerHTML = "Something went wrong!";
					})
					.then(function() {
							form.reset();
							setTimeout(() => {
									result.innerText = "";
							}, 3000);
					});
});


	
}

function hasElementError(elementId) {
	const element = document.getElementById(elementId).value;

	if (element === '' || element.lenght < 2) {
		return true;
	}
	return false;
}



function setLocalStorage(key, value) {
	localStorage.setItem(key, value);
}

function getLocalStorage(key) {
	localStorage.getItem(key);
}

function checkLastVisit() {


		const lastVisit = getLocalStorage('lastVisit');
		if ( lastVisit === null || lastVisit === undefined ) {
			setLocalStorage('lastVisit', new Date());
			return;
		} 
				


	const formattedLastVisit = new Date(lastVisit).toLocaleString('nl-NL', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	});

	document.getElementById('last-visit').innerHTML = 'Uw laatste bezoek was op ' + formattedLastVisit;
	setLocalStorage('lastVisit', new Date());
}
function hideAfterScroll () {
	if (window.scrollY > 0) {
		document.getElementById('header').classList.add('header-colored');
	} else {
		document.getElementById('header').classList.remove('header-colored');
	}
}
