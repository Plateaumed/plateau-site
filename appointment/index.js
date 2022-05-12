const form = document.getElementById('form');
const usernameElement = document.getElementById('username');
const phoneElement = document.getElementById('phone');
const hospitalElement= document.getElementById('hospital');
const addressElement = document.getElementById('address');
const calendlyName = "maratah7";
const calendlyMeetingName = "30min";

let usernameValue, phoneValue, hospitalValue, addressValue;

form.addEventListener('submit', e => {
	e.preventDefault();

	if(!checkInputs()){
		let usernameValue = usernameElement.value
		let phoneValue = phoneElement.value?.charAt(0) == 0 ? "234"+ phoneElement.value?.substr(1):phoneElement.value ;
		let hospitalValue = hospitalElement.value;
		let addressValue = addressElement.value;
		const d = new Date();
		let month = d.getMonth()+1;
		let year = d.getFullYear()
		location.href = `https://calendly.com/${calendlyName}/${calendlyMeetingName}?name=${usernameValue}&a3=${phoneValue}&a1=${hospitalValue}&a2=${addressValue}&back=1&month=${year}-${month}`
	}
});



document.addEventListener("DOMContentLoaded", function(event) {
	let url = new URL(location.href);
	let params = new  URLSearchParams(url.search);
	if(params.get("success") === 'true'){
		const modal = document.getElementById("modal")
		openModal(modal)
	}

});

function checkInputs() {
	// trim to remove the whitespaces
	const username = usernameElement.value.trim();
	const phone = phoneElement.value.trim();
	const hospital = hospitalElement.value.trim();
	const address = addressElement.value.trim();
	let isErrored= false;
	if(usernameValue === '') {
		isErrored = true;
		setErrorFor(/^[A-Za-z\s]+$/.test(username), 'username cannot be blank');
	} else {
		setSuccessFor(username);
	}
	
	if(phoneValue === '') {
		isErrored = true;

		setErrorFor(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phone), 'Phone number cannot be blank');
	}else {
		setSuccessFor(phone);
	}
	
	if(hospitalValue === '') {
		isErrored = true;

		setErrorFor(/^[A-Za-z\s]+$/.test(hospital), 'hospital cannot be blank');
	} else {
		setSuccessFor(hospital);
	}
	
	if(addressValue === '') {
		isErrored = true;
		setErrorFor(/^[a-zA-Z0-9\s,'-]*$/.test(address), 'address cannot be blank');
	} else{
		setSuccessFor(address);
	}
	return isErrored;
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	console.log(input, "input")
	// formControl.className = 'form-control success';
}
	
function isPhone(phonenumber) {
	console.log(phonenumber.match(/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/),"match");
	return phonenumber?.match(/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/);;
}
// function isAddress(address) {
// 	return /^[a-zA-Z0-9\s,.'-]{3,}$/ ;(address);
// }

// button
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}