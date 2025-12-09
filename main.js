document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------------------------
  // 1. USER DROPDOWN SCRIPT
  // ------------------------------------------------
  const userAvatar = document.getElementById("userAvatar");
  const dropdownMenu = document.getElementById("dropdownMenu");

  if (userAvatar && dropdownMenu) {
    userAvatar.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (!userAvatar.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove("show");
      }
    });
  }

  // ------------------------------------------------
  // 2. THEME TOGGLE SCRIPT
  // ------------------------------------------------
  const htmlElement = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");

  // Function to set theme and update local storage/UI
  const setTheme = (theme) => {
    if (!themeToggle) return; // Exit if the toggle button is missing

    const icon = themeToggle.querySelector("i");
    const label = themeToggle.querySelector("span");

    htmlElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    if (theme === "light") {
      // Switch to Moon icon and show "Dark Mode" label
      icon.classList.replace("fa-sun", "fa-moon");
      label.textContent = "Dark Mode";
    } else {
      // Switch to Sun icon and show "Light Mode" label
      icon.classList.replace("fa-moon", "fa-sun");
      label.textContent = "Light Mode";
    }
  };

  // Initialization: Check local storage for saved theme
  const savedTheme = localStorage.getItem("theme") || "dark";
  setTheme(savedTheme);

  // Toggle logic on click
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      setTheme(newTheme);
    });
  }

  // ------------------------------------------------
  // 3. DASHBOARD INTERACTION SCRIPTS
  // ------------------------------------------------

  // --- SIDEBAR MENU INTERACTION ---
  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      menuItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
    });
  });

  // --- CALENDAR DATE INTERACTION ---
  const dates = document.querySelectorAll(".date");

  dates.forEach((date) => {
    date.addEventListener("click", () => {
      dates.forEach((d) => {
        // Only remove 'active' if it's not the special orange date
        if (!d.classList.contains("active-orange")) {
          d.classList.remove("active");
        }
      });

      if (!date.classList.contains("active-orange")) {
        date.classList.add("active");
      }
    });
  });

  // --- TABS INTERACTION (Today Tasks) ---
  const tabs = document.querySelectorAll(".tab");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        t.classList.remove("active");
        t.classList.add("inactive"); // The inactive class is optional but helps in clear state management
      });
      tab.classList.remove("inactive");
      tab.classList.add("active");
    });
  });
});
