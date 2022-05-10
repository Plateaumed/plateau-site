const form = document.getElementById('form');
const username = document.getElementById('username');
const phone = document.getElementById('phone');
const hospital= document.getElementById('hospital');
const address = document.getElementById('address');

let usernameValue, phoneValue, hospitalValue, addressValue;

form.addEventListener('submit', e => {
	e.preventDefault();
	if(!checkInputs()){
		let usernameValue = username.value
		let phoneValue = phone.value;
		let hospitalValue = hospital.value;
		let addressValue = address.value;
		location.href = `https://calendly.com/maratah7/30min?name=${usernameValue}&back=1&month=2022-05`
	}
});



function checkInputs() {
	// trim to remove the whitespaces
	const usernameValue = username.value.trim();
	const phoneValue = phone.value.trim();
	const hospitalValue = hospital.value.trim();
	const addressValue = address.value.trim();
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
	} else if (!phone(phoneValue)) {
		setErrorFor(phone, 'Not a valid phonenumber');
	} else {
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
		setErrorFor(/^[a-zA-Z0-9\s,'-]*$/.test (address), 'address cannot be blank');
	} else if(!address(addressValue)) {
		isErrored = true;
		setErrorFor(address, 'Incorrect address');
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
	formControl.className = 'form-control success';
}
	
// function isPhone(phonenumber) {
// 	return /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;(phonenumber);
// }
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