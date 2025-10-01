
// script.js - upgraded interactivity
document.addEventListener('DOMContentLoaded', ()=>{
  // Mobile menu toggle
  const menuBtn = document.getElementById('menuToggle');
  const menu = document.getElementById('mainMenu');
  if(menuBtn){
    menuBtn.style.display='none';
    // basic responsive: show button if small
    const mq = window.matchMedia('(max-width:900px)');
    function handle(m){ if(m.matches){ menuBtn.style.display='block'; menu.classList.add('closed'); } else { menuBtn.style.display='none'; menu.classList.remove('closed'); } }
    handle(mq); mq.addListener(handle);
    menuBtn.addEventListener('click', ()=> menu.classList.toggle('open'));
  }

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, {threshold:0.15});
  reveals.forEach(r=>obs.observe(r));

  // Events filter
  const events = Array.from(document.querySelectorAll('.event'));
  const filterSelect = document.getElementById('eventFilter');
  function applyFilter(){
    const val = filterSelect.value;
    events.forEach(ev=>{
      const status = ev.getAttribute('data-status');
      ev.style.display = (val === 'all' || val === status) ? 'flex' : 'none';
    });
  }
  if(filterSelect){ filterSelect.addEventListener('change', applyFilter); applyFilter(); }

  // Contact/Booking form (Netlify compatible) - client-side
  const contactForm = document.getElementById('bookingForm');
  if(contactForm){
    contactForm.addEventListener('submit',(e)=>{
      // For demo, prevent actual submit to show success message when JS active
      // Remove e.preventDefault() to allow real submission (e.g., Netlify form)
      // e.preventDefault();
      contactForm.querySelector('.status')?.remove();
      const status = document.createElement('div');
      status.className='status card';
      status.innerHTML = '<h3>Thanks! Your request was submitted.</h3><p>We received your message and files (if any). We will review and get back to you.</p>';
      contactForm.insertAdjacentElement('afterend', status);
      contactForm.reset();
    });
  }

  // Lightbox gallery
  const lightbox = document.getElementById('lightbox');
  const lbImg = lightbox && lightbox.querySelector('img');
  document.querySelectorAll('.gallery-grid img').forEach(img=>{
    img.addEventListener('click', ()=>{
      lbImg.src = img.dataset.large || img.src;
      lightbox.classList.add('open');
    });
  });
  lightbox && lightbox.addEventListener('click', (e)=>{
    if(e.target === lightbox || e.target.tagName === 'BUTTON') lightbox.classList.remove('open');
  });

  // Artist "More" toggle
  document.querySelectorAll('.artist .moreBtn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const box = btn.closest('.artist');
      box.querySelector('.more').classList.toggle('hidden');
      btn.textContent = box.querySelector('.more').classList.contains('hidden') ? 'More' : 'Less';
    });
  });
});


// Scroll reveal effect
window.addEventListener("scroll", () => {
    const reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
});


// Hamburger menu toggle
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector("nav");
    if (hamburger) {
        hamburger.addEventListener("click", () => {
            nav.classList.toggle("active");
        });
    }
});
