let nav = document.getElementById('nav');
let scrollBtn = document.getElementById('scroll-btn');
let coreFeatures = document.getElementById('core-features');
let sendBtn = document.getElementById('send-mail');
let notifyText = document.getElementById('plateaumed-notify');
let emailInput = document.getElementById('email');
let url = 'https://dev.plateaumed.com/send-email/'
document.addEventListener('scroll', () => {
    if(window.scrollY > 150){
        nav.style.boxShadow = '.1rem .2rem .3rem rgba(0, 0, 0, .08)'
    }else{
        nav.style.background = '#FFF';
        nav.style.boxShadow = 'none';
    }
});

scrollBtn.addEventListener('click', () => {
    let offset = 100;
    let elementPosition = coreFeatures.getBoundingClientRect().top;
    let offsetPosition = elementPosition - offset;
    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
   });
});

sendBtn.addEventListener('click', async () => {
    let email = emailInput.value.trim();
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email === ""){
        notifyText.innerHTML = "please input an email address";
        notifyText.style.color = "red";
    } else if(!email.match(mailformat)){
        notifyText.innerHTML = "please input a valid email address";
        notifyText.style.color = "red";
    }
    else{
            const response = await fetch(`${url}${email}`);
    
            const result = await response.json();
            if (!response.ok){
                notifyText.innerHTML = "An error occured, please try again";
                notifyText.style.color = "red";
            }
            else {
                notifyText.innerHTML = result.message;
                notifyText.style.color = '#02c22c';
                emailInput.value = "";
            }
    }
    notifyText.style.display = 'block';
    setTimeout(() => {
        notifyText.style.display = 'none';
    }, 3000);
})