document.addEventListener("DOMContentLoaded", function () {
    const phrases = [
      "Bez kompromisů.",
      "Bez problémů.",
      "Bez starostí.",
      "Bez hranic."
    ];
  
    const el = document.getElementById("changing-text");
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
  
    function type() {
      const currentPhrase = phrases[phraseIndex];
      const displayedText = currentPhrase.substring(0, charIndex);
      el.textContent = displayedText;
  
      if (!isDeleting) {
        if (charIndex < currentPhrase.length) {
          charIndex++;
          setTimeout(type, 100); // rychlost psaní
        } else {
          isDeleting = true;
          setTimeout(type, 3000); // pauza po dopsání
        }
      } else {
        if (charIndex > 0) {
          charIndex--;
          setTimeout(type, 50); // rychlost mazání
        } else {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(type, 300); // pauza před psaním další fráze
        }
      }
    }
  
    type(); //
  });

  //Mobile menu

  const btn = document.getElementById('menu-btn');
  const menu = document.getElementById('mobile-menu');

  btn.addEventListener('click', () => {
    btn.classList.toggle('open'); // Přepíná animaci hamburgeru
    menu.classList.toggle('show');      // přepínání opacity animace
  });

  // SVG hide
  document.addEventListener("DOMContentLoaded", function () {
    const svg = document.getElementById("hand-icon");
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // SVG in viewport
          setTimeout(() => {
            svg.style.opacity = "0";
  
            // Počkej, až přechod skončí (trvá 1s), pak skryj
            setTimeout(() => {
              svg.style.visibility = "hidden";
            }, 1000); // stejné jako transition duration
          }, 6000);
  
          observer.unobserve(svg);
        }
      });
    });
  
    observer.observe(svg);
  });
  

  // SWIPER
  const swiper = new Swiper('.mySwiper', {
    loop: true,
    preloadImages: false,
    lazy: {
      loadPrevNext: true,        // Načítá i předchozí a další slide
      loadPrevNextAmount: 1      // Počet slide navíc (volitelné)
    },
    spaceBetween: 20,
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 1,
      },
    },
  });

  const form = document.getElementById('contact_form');
  const status = document.getElementById('status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = "Odesílám...";

    const formData = new FormData(form);
    // Převést FormData na JSON
    const jsonData = {};
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(jsonData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        status.style.color = 'lightgreen';
        status.textContent = 'Odesláno! Brzy se ozvu.';
        form.reset();
      } else {
        throw new Error(result.message || 'Něco se pokazilo.');
      }
    } catch (error) {
      status.style.color = 'tomato';
      status.textContent = `Chyba při odesílání: ${error.message}`;
    }
  });

  function toggleVisibility(container) {
    const front = container.querySelector('.front-layer');
    const back = container.querySelector('.back-layer');

    // Pokud je již otevřené, zavři
    const isVisible = back.classList.contains('opacity-100');

    if (isVisible) {
      front.classList.remove('opacity-0');
      front.classList.add('opacity-100');
      back.classList.remove('opacity-100');
      back.classList.add('opacity-0');
    } else {
      front.classList.remove('opacity-100');
      front.classList.add('opacity-0');
      back.classList.remove('opacity-0');
      back.classList.add('opacity-100');
    }
  }


  const icon = document.getElementById('hand-icon');
if (window.innerWidth < 640) {
  icon.classList.add('animate-click');
} else {
  icon.classList.add('animate-moveRight');
}