/* BOTON GO TOP */

window.onscroll = function(){
    if (document.documentElement.scrollTop > 100){
        document.querySelector(".go-top-container").classList.add("showButtom");
    } else {
        document.querySelector(".go-top-container").classList.remove("showButtom");
    }
}

document.querySelector(".go-top-container").addEventListener("click", ()=>{
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    })
});

/* TOAST DE BOOTSTRAP */

const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastTrigger.addEventListener('click', () => {
        toastBootstrap.show()
    })
}

const toastFormTrigger = document.getElementById('oradorToastBtn')
const toastLiveForm = document.getElementById('oradorToast')

if (toastFormTrigger) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveForm)
    toastFormTrigger.addEventListener('click', () => {
        toastBootstrap.show()
    })
}

/* INICIAL GLIDER JS */

window.addEventListener('load', function(){
    new Glider(document.querySelector('.glider'), {
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
        dots: '.dots',
        arrows: {
            prev: '.glider-prev',
            next: '.glider-next'
        }
    });
})