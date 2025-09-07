// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const navLinks = document.querySelector(".nav-links")

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active")
      this.classList.toggle("active")
    })
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(0, 0, 0, 0.95)"
      navbar.style.boxShadow = "0 2px 20px rgba(0, 255, 255, 0.3)"
      navbar.style.borderBottom = "1px solid rgba(0, 255, 255, 0.5)"
    } else {
      navbar.style.background = "rgba(0, 0, 0, 0.9)"
      navbar.style.boxShadow = "none"
      navbar.style.borderBottom = "1px solid rgba(0, 255, 255, 0.3)"
    }
  })

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  document.querySelectorAll(".about-card, .timeline-item, .social-card, .feature-card").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  // Counter animation for stats
  function animateCounter(element, target, duration = 2000) {
    let start = 0
    const increment = target / (duration / 16)

    function updateCounter() {
      start += increment
      if (start < target) {
        element.textContent = Math.floor(start).toLocaleString()
        requestAnimationFrame(updateCounter)
      } else {
        element.textContent = target.toLocaleString()
      }
    }
    updateCounter()
  }

  // Animate stats when they come into view
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statNumber = entry.target.querySelector(".stat-number")
          if (statNumber && !statNumber.classList.contains("animated")) {
            statNumber.classList.add("animated")
            const text = statNumber.textContent
            if (text.includes("1B")) {
              animateCounter(statNumber, 1000000000)
              setTimeout(() => {
                statNumber.textContent = "1B"
              }, 2000)
            } else if (text.includes("5")) {
              animateCounter(statNumber, 5)
            }
          }
        }
      })
    },
    { threshold: 0.5 },
  )

  document.querySelectorAll(".stat").forEach((stat) => {
    statsObserver.observe(stat)
  })

  function animateLiveTicker() {
    const marketCapElement = document.getElementById("marketCap")
    const holdersElement = document.getElementById("holders")
    const volumeElement = document.getElementById("volume")

    if (marketCapElement && holdersElement && volumeElement) {
      setInterval(() => {
        // Simulate realistic market data fluctuations
        const baseMarketCap = 1200000
        const marketCapVariation = (Math.random() - 0.5) * 100000
        const newMarketCap = Math.max(baseMarketCap + marketCapVariation, 500000)
        marketCapElement.textContent = `$${(newMarketCap / 1000000).toFixed(2)}M`

        const baseHolders = 2847
        const holdersVariation = Math.floor((Math.random() - 0.3) * 20)
        const newHolders = Math.max(baseHolders + holdersVariation, 2000)
        holdersElement.textContent = newHolders.toLocaleString()

        const baseVolume = 156000
        const volumeVariation = (Math.random() - 0.5) * 50000
        const newVolume = Math.max(baseVolume + volumeVariation, 50000)
        volumeElement.textContent = `$${(newVolume / 1000).toFixed(0)}K`
        
        // Add flash effect on update
        [marketCapElement, holdersElement, volumeElement].forEach((el) => {
          el.style.color = "#ffff00"
          el.style.textShadow = "0 0 15px #ffff00"
          setTimeout(() => {
            el.style.color = "var(--primary-neon)"
            el.style.textShadow = "var(--glow-primary)"
          }, 200)
        })
      }, 8000) // Update every 8 seconds
    }
  }

  // Start ticker animation after page load
  setTimeout(animateLiveTicker, 3000)

  // Add hover effects to timeline items
  document.querySelectorAll(".timeline-item").forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(10px)"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0)"
    })
  })

  // Floating elements animation enhancement
  const floatingElements = document.querySelectorAll(".floating-element")
  floatingElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.5}s`

    // Add random movement
    setInterval(
      () => {
        const randomX = Math.random() * 20 - 10
        const randomY = Math.random() * 20 - 10
        element.style.transform += ` translate(${randomX}px, ${randomY}px)`
      },
      3000 + index * 1000,
    )
  })

  // Add click effect to buttons
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.classList.add("ripple")

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })

  // Add ripple effect styles
  const style = document.createElement("style")
  style.textContent = `
    .btn {
      position: relative;
      overflow: hidden;
    }
    
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(0, 255, 255, 0.4);
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      pointer-events: none;
      box-shadow: 0 0 20px rgba(0, 255, 255, 0.6);
    }
    
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    .mobile-menu-toggle {
      display: none;
      flex-direction: column;
      cursor: pointer;
      padding: 0.5rem;
    }
    
    .mobile-menu-toggle span {
      width: 25px;
      height: 3px;
      background: var(--primary-neon);
      margin: 3px 0;
      transition: 0.3s;
      box-shadow: 0 0 5px var(--primary-neon);
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
      transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
      opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
      transform: rotate(45deg) translate(-5px, -6px);
    }
    
    @media (max-width: 768px) {
      .mobile-menu-toggle {
        display: flex;
      }
      
      .nav-links {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.95);
        flex-direction: column;
        padding: 2rem 0;
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        border-top: 1px solid var(--border-neon);
        backdrop-filter: blur(20px);
      }
      
      .nav-links.active {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }
      
      .nav-links a {
        padding: 1rem 2rem;
        border-bottom: 1px solid rgba(0, 255, 255, 0.1);
      }
    }
  `
  document.head.appendChild(style)

  // Add glitch effect to title
  function addGlitchEffect() {
    const glitchElement = document.querySelector(".glitch")
    if (glitchElement) {
      setInterval(
        () => {
          glitchElement.style.animation = "none"
          setTimeout(() => {
            glitchElement.style.animation = ""
          }, 100)
        },
        5000 + Math.random() * 10000,
      ) // Random glitch every 5-15 seconds
    }
  }

  addGlitchEffect()

  // Enhance matrix rain with random characters
  function enhanceMatrixRain() {
    const matrixColumns = document.querySelectorAll(".matrix-column")
    matrixColumns.forEach((column, index) => {
      // Add random characters
      const chars = "01NARC$₿Ξ◊⟐"
      setInterval(
        () => {
          const randomChar = chars[Math.floor(Math.random() * chars.length)]
          column.textContent = randomChar
          column.style.color = `hsl(${180 + Math.random() * 60}, 100%, ${50 + Math.random() * 50}%)`
        },
        200 + index * 100,
      )
    })
  }

  enhanceMatrixRain()

  // Initialize meme gallery swiper
  function initMemeSwiper() {
    if (document.querySelector('.memeSwiper')) {
      const memeSwiper = new Swiper('.memeSwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        },
      });
    }
  }

  // Initialize meme swiper
  initMemeSwiper();

  // Handle meme form submission
  const memeForm = document.getElementById('memeForm');
  if (memeForm) {
    memeForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Here you would typically handle the form submission to a server
      alert('Meme submitted! (This would connect to a backend in production)');
      closeMemeSubmission();
      memeForm.reset();
    });
  }
})

// Contract address copy function
function copyContract() {
  const contractText = "0x1234567890abcdef1234567890abcdef12345678" // Replace with actual contract

  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(contractText)
      .then(() => {
        showCopyNotification("Contract address copied!")
      })
      .catch(() => {
        fallbackCopyTextToClipboard(contractText)
      })
  } else {
    fallbackCopyTextToClipboard(contractText)
  }
}

// Fallback for older browsers
function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea")
  textArea.value = text
  textArea.style.top = "0"
  textArea.style.left = "0"
  textArea.style.position = "fixed"
  textArea.style.opacity = "0"

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    document.execCommand("copy")
    showCopyNotification("Contract address copied!")
  } catch (err) {
    showCopyNotification("Failed to copy address")
  }

  document.body.removeChild(textArea)
}

// Show copy notification
function showCopyNotification(message) {
  const notification = document.createElement("div")
  notification.textContent = message
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(45deg, var(--primary-neon), var(--secondary-neon));
    color: var(--background-dark);
    padding: 1rem 2rem;
    border-radius: 10px;
    font-weight: 700;
    z-index: 10000;
    animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2.7s;
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
  `

  document.body.appendChild(notification)

  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification)
    }
  }, 3000)
}

// Parallax effect on scroll
let ticking = false

function updateParallax() {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".floating-element, .cartel-element")

  parallaxElements.forEach((element, index) => {
    const speed = 0.3 + index * 0.05
    const yPos = -(scrolled * speed)
    element.style.transform = `translate3d(0, ${yPos}px, 0)`
  })

  ticking = false
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateParallax)
    ticking = true
  }
})

// Add notification animation styles
const notificationStyles = document.createElement("style")
notificationStyles.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`
document.head.appendChild(notificationStyles)

// Close menu with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const activeMenu = document.querySelector(".nav-links.active")
    const activeToggle = document.querySelector(".mobile-menu-toggle.active")

    if (activeMenu && activeToggle) {
      activeMenu.classList.remove("active")
      activeToggle.classList.remove("active")
    }
  }
})

// Typing effect for hero title (optional)
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.textContent = ""

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }
  type()
}

// Uncomment to enable typing effect
// window.addEventListener('load', function() {
//     const titleMain = document.querySelector('.title-main');
//     if (titleMain) {
//         typeWriter(titleMain, '$NARC', 150);
//     }
// });

// Meme submission modal functions
function openMemeSubmission() {
  document.getElementById('memeModal').style.display = 'flex';
}

function closeMemeSubmission() {
  document.getElementById('memeModal').style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
  const modal = document.getElementById('memeModal');
  if (event.target === modal) {
    closeMemeSubmission();
  }
});

// Add meme like functionality
document.querySelectorAll('.meme-like').forEach(button => {
  button.addEventListener('click', function() {
    const currentLikes = parseInt(this.textContent.match(/\d+/) || 0);
    this.textContent = `❤️ ${currentLikes + 1}`;
    
    // Add a quick animation
    this.style.transform = 'scale(1.2)';
    setTimeout(() => {
      this.style.transform = 'scale(1)';
    }, 300);
  });
});

// Add meme share functionality
document.querySelectorAll('.meme-share').forEach(button => {
  button.addEventListener('click', function() {
    alert('Share functionality would be implemented here!');
  });
});

// Add a fun Easter egg for memecoin vibe
document.addEventListener('keydown', function(e) {
  // Easter egg: Press "M" for a surprise meme effect
  if (e.key === 'm' || e.key === 'M') {
    document.body.classList.add('meme-mode');
    setTimeout(() => {
      document.body.classList.remove('meme-mode');
    }, 2000);
  }
});

// Add meme mode styles
const memeModeStyles = document.createElement('style');
memeModeStyles.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
  
  .meme-mode {
    animation: rainbow 1s linear infinite;
  }
  
  .meme-mode .floating-element {
    animation-duration: 0.5s !important;
  }
`;
document.head.appendChild(memeModeStyles);