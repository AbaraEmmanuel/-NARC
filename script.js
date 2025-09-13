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

  // Navbar background on scroll
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(10, 10, 10, 0.98)"
      navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.3)"
    } else {
      navbar.style.background = "rgba(10, 10, 10, 0.95)"
      navbar.style.boxShadow = "none"
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

  // Observe elements for animation
  document.querySelectorAll(".about-card, .feature-card, .timeline-item, .social-card").forEach((el) => {
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
    { threshold: 0.5 }
  )

  document.querySelectorAll(".stat-card").forEach((stat) => {
    statsObserver.observe(stat)
  })

  // Add hover effects to timeline items
  document.querySelectorAll(".timeline-item").forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(5px)"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0)"
    })
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
      background: rgba(255, 255, 255, 0.3);
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      pointer-events: none;
    }
    
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
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
  `
  document.head.appendChild(style)

  // Parallax effect on scroll
  let ticking = false

  function updateParallax() {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".bg-element, .gradient-orb")

    parallaxElements.forEach((element, index) => {
      const speed = 0.2 + index * 0.05
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
    background: linear-gradient(135deg, #6366f1, #06b6d4);
    color: white;
    padding: 1rem 2rem;
    border-radius: 12px;
    font-weight: 600;
    z-index: 10000;
    animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2.7s;
    box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
  `

  document.body.appendChild(notification)

  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification)
    }
  }, 3000)
}

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
