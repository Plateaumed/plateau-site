let nav = document.getElementById('nav');
let scrollBtn = document.getElementById('scroll-btn');
let coreFeatures = document.getElementById('core-features');
let sendBtn = document.getElementById('send-mail');
let notifyText = document.getElementById('plateaumed-notify');
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

sendBtn.addEventListener('click', () => {
    notifyText.style.display = 'block';
    setTimeout(() => {
        notifyText.style.display = 'none';
    }, 3000);
})