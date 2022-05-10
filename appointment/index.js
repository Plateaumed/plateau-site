const form = document.getElementById('form');
const username = document.getElementById('username');
const phonenumber = document.getElementById('phonenumber');
const hospital= document.getElementById('hospital');
const address = document.getElementById('address');

form.addEventListener('submit', e => {
	e.preventDefault();
	
	checkInputs();
});

function checkInputs() {
	// trim to remove the whitespaces
	const usernameValue = username.value.trim();
	const phoneValue = phonenumber.value.trim();
	const hospitalValue = hospital.value.trim();
	const addressValue = address.value.trim();
	
	if(usernameValue === '') {
		setErrorFor(/^[A-Za-z\s]+$/.test(username), 'username cannot be blank');
	} else {
		setSuccessFor(username);
	}
	
	if(phoneValue === '') {
		setErrorFor(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phonenumber), 'Phone number cannot be blank');
	} else if (!isPhone(phoneValue)) {
		setErrorFor(phonenumber, 'Not a valid phonenumber');
	} else {
		setSuccessFor(phonenumber);
	}
	
	if(hospitalValue === '') {
		setErrorFor(hospital, 'hospital cannot be blank');
	} else {
		setSuccessFor(hospital);
	}
	
	if(addressValue === '') {
		setErrorFor(/^[a-zA-Z0-9\s,'-]*$/.test (address), 'address cannot be blank');
	} else if(isAddress(addressValue)) {
		setErrorFor(address, 'Incorrect address');
	} else{
		setSuccessFor(address);
	}
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