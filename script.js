// Import EmailJS library


// EmailJS Configuration - Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
  // Initialize EmailJS with your public key
  emailjs.init("rjxBuDenSV9Qi1Ino") // Replace with your actual public key from EmailJS dashboard
  console.log("EmailJS initialized!")

  // Mobile Navigation Toggle
  const navToggle = document.getElementById("mobile-menu-btn")
  const navMenu = document.getElementById("mobile-menu")

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("hidden")
      navToggle.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu) {
        navMenu.classList.add("hidden")
      }
      if (navToggle) {
        navToggle.classList.remove("active")
      }
    })
  })

  // Contact form handling with EmailJS
  const contactForm = document.getElementById("contact-form")
  const submitBtn = document.getElementById("submit-btn")
  const submitText = document.querySelector(".submit-text")
  const loadingSpinner = document.querySelector(".loading-spinner")

  if (contactForm && submitBtn && submitText && loadingSpinner) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      // Show loading state
      submitBtn.disabled = true
      submitText.textContent = "Sending..."
      loadingSpinner.classList.remove("hidden")

      try {
        // Send email using EmailJS (global object from CDN)
        const result = await emailjs.sendForm(
          "service_7gju8tb", // Replace with your service ID from EmailJS
          "template_w887yst", // Replace with your template ID from EmailJS
          contactForm,
        )

        console.log("Email sent successfully:", result)

        // Show success message
        showNotification("✅ Message sent successfully! I'll get back to you soon. 🎉", "success")
        contactForm.reset()

        // Add success animation
        submitBtn.style.background = "linear-gradient(45deg, #10b981, #059669)"
        submitText.textContent = "Message Sent! ✅"

        setTimeout(() => {
          submitBtn.style.background = ""
          submitText.textContent = "Send Message"
        }, 3000)
      } catch (error) {
        console.error("Error sending email:", error)

        // Show detailed error message
        let errorMessage =
          "❌ Failed to send message. Please try again or contact me directly at sonineeraj0405@gmail.com"

        if (error.text) {
          errorMessage = `❌ Error: ${error.text}. Please check your EmailJS configuration.`
        }

        showNotification(errorMessage, "error")
      } finally {
        // Reset loading state
        submitBtn.disabled = false
        if (submitText.textContent === "Sending...") {
          submitText.textContent = "Send Message"
        }
        loadingSpinner.classList.add("hidden")
      }
    })
  }

  // Initialize other features
  initializeAnimations()
  initializeScrollEffects()
  initializeTypingAnimation()
})

// Notification system
function showNotification(message, type) {
  console.log("Showing notification:", message, type)

  // Remove existing notifications
  const existingNotification = document.querySelector(".notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification fixed top-4 right-4 z-[9999] px-6 py-4 rounded-xl font-semibold transform translate-x-full transition-all duration-300 max-w-md ${
    type === "success"
      ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
      : "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg"
  }`

  notification.innerHTML = `
    <div class="flex items-center gap-3">
      <i class="fas ${type === "success" ? "fa-check-circle" : "fa-exclamation-circle"} text-xl"></i>
      <span class="flex-1">${message}</span>
      <button class="notification-close ml-2 text-xl hover:opacity-70 transition-opacity">&times;</button>
    </div>
  `

  // Add to document
  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close")
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove()
        }
      }, 300)
    })
  }

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove()
        }
      }, 300)
    }
  }, 5000)
}

// Initialize animations
function initializeAnimations() {
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Counter animation
        if (entry.target.hasAttribute("data-count")) {
          const target = Number.parseInt(entry.target.getAttribute("data-count"))
          animateCounter(entry.target, target)
          observer.unobserve(entry.target)
        }

        // Add visible class for other animations
        entry.target.classList.add("animate-slide-up")
      }
    })
  }, observerOptions)

  // Observe counter elements
  document.querySelectorAll("[data-count]").forEach((counter) => {
    observer.observe(counter)
  })

  // Add stagger animation to skill cards
  const skillCards = document.querySelectorAll("#skills .glass-effect")
  skillCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`
    card.classList.add("animate-slide-up")
  })

  // Add stagger animation to project cards
  const projectCards = document.querySelectorAll("#projects .group")
  projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`
    card.classList.add("animate-fade-in")
  })
}

// Initialize scroll effects
function initializeScrollEffects() {
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
        // Close mobile menu if open
        const navMenu = document.getElementById("mobile-menu")
        if (navMenu) {
          navMenu.classList.add("hidden")
        }
      }
    })
  })

  // Active navigation link highlighting
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  window.addEventListener("scroll", () => {
    let current = ""
    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("text-neon-blue")
      link.classList.add("text-gray-300")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.remove("text-gray-300")
        link.classList.add("text-neon-blue")
      }
    })

    // Navbar background on scroll
    const navbar = document.querySelector("nav")
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.style.background = "rgba(10, 10, 10, 0.95)"
      } else {
        navbar.style.background = "rgba(255, 255, 255, 0.05)"
      }
    }
  })
}

// Counter animation
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  function updateCounter() {
    start += increment
    if (start < target) {
      element.textContent = Math.floor(start)
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = target
    }
  }

  updateCounter()
}

// Typing animation for hero title
function initializeTypingAnimation() {
  function typeWriter(element, text, speed = 100) {
    let i = 0
    element.innerHTML = ""

    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i)
        i++
        setTimeout(type, speed)
      }
    }

    type()
  }

  // Initialize typing animation when page loads
  setTimeout(() => {
    const heroTitle = document.querySelector("#typing-text")
    if (heroTitle) {
      const originalText = "Neeraj Soni"
      typeWriter(heroTitle, originalText, 80)
    }
  }, 800)
}

// Add floating particles
function createParticle() {
  const particle = document.createElement("div")
  particle.className = "particle"
  particle.style.left = Math.random() * 100 + "vw"
  particle.style.width = particle.style.height = Math.random() * 4 + 2 + "px"
  particle.style.animationDuration = Math.random() * 3 + 2 + "s"
  particle.style.opacity = Math.random() * 0.5 + 0.2

  document.body.appendChild(particle)

  setTimeout(() => {
    particle.remove()
  }, 5000)
}

// Create particles periodically
setInterval(createParticle, 2000)

// Add hover effects to project cards
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".group").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)"
    })
  })
})
