
const navbar = document.querySelector(".nav-bar");

window.addEventListener("scroll", () => {

  if(window.scrollY > 50){
    navbar.classList.add("scrolled");
  } 
  else{
    navbar.classList.remove("scrolled");
  }

});


const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-list");

hamburger.addEventListener("click", () => {

  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");

});


// ALL REVEAL ELEMENTS
const reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

// OBSERVER
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting){
      entry.target.classList.add("active");
    } else {
      entry.target.classList.remove("active"); // remove when out of view
    }
  });
}, { threshold: 0.2 });

// OBSERVE SECTIONS
reveals.forEach(el => observer.observe(el));

// STAGGER CHILD ELEMENTS (skills and project cards)
const staggerItems = document.querySelectorAll(".skills-expertise ul li, .projects .card");

staggerItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 0.1}s`;
  observer.observe(item);
});




 const animatedTextSentences =[
      "Strategic graphic designer.",
      "Where strategy meets stunning design.",
      "I build visual identities.",
    ];

    const animatedText = document.getElementById("animated-text");

    let currentSentenceNumber = 0;
    let wordTrackerIndex = 0;
    let isdeleting = false;
    let animationSpeed = 150; // milliseconds per character
    let deletingSpeed = 200; // milliseconds per character when deleting
    let pauseDuration = 1000; // milliseconds to pause after typing a sentence

    function animationEffect() {
     const currentSentence = animatedTextSentences[currentSentenceNumber];
     if(!isdeleting){
      // typing
      animatedText.textContent = currentSentence.substring(0, wordTrackerIndex + 1);
      wordTrackerIndex++;
      if (wordTrackerIndex === currentSentence.length) {
        setTimeout(() => {
          isdeleting = true;
        }, pauseDuration);
     }  
   }
     else{
      // deleting
      animatedText.textContent = currentSentence.substring(0, wordTrackerIndex - 1);
      wordTrackerIndex--;
      if (wordTrackerIndex === 0) {
        isdeleting = false;
        currentSentenceNumber = (currentSentenceNumber + 1) % animatedTextSentences.length;
      }
    }
      setTimeout(animationEffect, isdeleting ? 80 : 120);
  }
  animationEffect();


  //------------------------------------------------------------------------------------
const counters = document.querySelectorAll(".counter");
const skillsSection = document.querySelector(".skills-expertise");

function startCounter(){

  counters.forEach(counter => {

    counter.innerText = "0";

    const target = +counter.dataset.target;
    let count = 0;
    const speed = target / 120;

    function update(){

      count += speed;

      if(count < target){
        counter.innerText = Math.ceil(count);
        requestAnimationFrame(update);
      } else {
        counter.innerText = target + "+";
      }

    }

    update();

  });

}

const counterObserver = new IntersectionObserver((entries)=>{

  entries.forEach(entry => {

    if(entry.isIntersecting){
      startCounter();
    }

  });

},{
  threshold:0.5
});

counterObserver.observe(skillsSection);

//---------------------------------------------------------------------------------------------------------------------------------------

  //the contact js settings comes here


const contactFunction = document.getElementById("contact-form");
const button = contactFunction.querySelector("button");
const status = contactFunction.querySelector(".form-status");

contactFunction.addEventListener("submit", function(event){

  event.preventDefault();

  /* loading animation */
  button.classList.add("loading");
  button.textContent = "Sending...";

  emailjs.sendForm(
    "service_g7v9n0a",
    "template_amoh1ms",
    this
  )
  .then(function(){

    status.textContent = "✓ Message sent successfully!";
    status.className = "form-status success";

    document.getElementById("contact-form").reset();

    /* reset button */
    button.classList.remove("loading");
    button.textContent = "Send Message";

  }, function(error){

    status.textContent = "⚠ Failed to send message.";
    status.className = "form-status error";

    /* reset button if error */
    button.classList.remove("loading");
    button.textContent = "Send Message";

  });

});

