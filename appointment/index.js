const form = document.getElementById('real-form');
const usernameElement = document.getElementById('username');
const emailElement = document.getElementById('email');
const phoneElement = document.getElementById('phone');
const hospitalElement= document.getElementById('hospital');
const addressElement = document.getElementById('address');
const calendlyPopUp = document.getElementById('calendly-popup');
const calendlyName = "plateaumed";
const calendlyMeetingName = "1hr";
const calendlyEvents = {
	booked: "calendly.event_scheduled"
}

let usernameValue, phoneValue, hospitalValue, addressValue;


function isCalendlyEvent(e) {
	return e.origin === "https://calendly.com" && e.data.event && e.data.event.indexOf("calendly.") === 0;
}

function removeAllChildNodes(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}



form.addEventListener('submit', function (e)  {
	e.preventDefault();
	const calendlyPopUp = document.getElementById('calendly-popup');

	if(!checkInputs()){
		let usernameValue = usernameElement.value
		let emailValue = emailElement.value
		let phoneValue = phoneElement.value?.charAt(0) == 0 ? "234"+ phoneElement.value?.substr(1):phoneElement.value ;
		let hospitalValue = hospitalElement.value;
		let addressValue = addressElement.value;
		const d = new Date();
		let month = d.getMonth()+1;
		let year = d.getFullYear();
		const overlay = document.getElementById('overlay');
		overlay.classList.add("active");
		calendlyPopUp.hidden =false;
		removeAllChildNodes(calendlyPopUp);

		Calendly.initInlineWidget({
			url: `https://calendly.com/${calendlyName}/${calendlyMeetingName}?hide_landing_page_details=1&hide_event_type_details=1&hide_gdpr_banner=1`,
			parentElement:calendlyPopUp,
			prefill: {
				name:usernameValue,
				email:emailValue,
				customAnswers:
					{
						a1:hospitalValue,
						a2:addressValue,
						a3:phoneValue
					}
			}
		});
		window.addEventListener("message", function(e) {
			if(isCalendlyEvent(e)) {
				if (e.data.event === calendlyEvents.booked){
					const modal = document.getElementById("modal")
					openModal(modal);
					calendlyPopUp.hidden = true;
					removeAllChildNodes(calendlyPopUp);
					form.reset();
				}
			}
		});
		// location.href = `https://calendly.com/${calendlyName}/${calendlyMeetingName}?name=${usernameValue}&a3=${phoneValue}&a1=${hospitalValue}&a2=${addressValue}&back=1&month=${year}-${month}`

	}
});


document.addEventListener("DOMContentLoaded", function(event) {
	window.postMessage("holla","*")



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
const closeModalButtons = document.getElementById('close-modal');
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
});

closeModalButtons.addEventListener('click', () => {
	const modals = document.querySelectorAll('.modal-container')
	modals.forEach(modal => {
		closeModal(modal)
	})
});

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal-container')
  modals.forEach(modal => {
    closeModal(modal)
  })
})



function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active');
  modal.hidden = false;
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active');
  modal.hidden = true;
  overlay.classList.remove('active')
}