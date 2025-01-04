// DOM Elements
const gpaCalculatorSection = document.getElementById("gpa-calculator");
const gpaPlannerSection = document.getElementById("gpa-planner");
const homeSection = document.getElementById("home");
const gpaForm = document.getElementById("gpaForm");
const plannerForm = document.getElementById("plannerForm");
const courseInputs = document.getElementById("courseInputs");
const addCourseBtn = document.getElementById("addCourse");
const calculatedGPA = document.getElementById("calculatedGPA");
const requiredGPA = document.getElementById("requiredGPA");

// Page titles for each section
const pageTitles = {
  home: "GPA Calculator",
  "gpa-calculator": "Calculate Your GPA",
  "gpa-planner": "GPA Target Calculator",
};

// Initialize history state
const initialSection = window.location.hash.substring(1) || "home";
navigateToSection(initialSection, false);

// Common navigation function
function navigateToSection(targetId, addToHistory = true) {
  // Default to home if targetId is empty or invalid
  if (!targetId || !document.getElementById(targetId)) {
    targetId = "home";
  }

  // Remove active class from all sections and links
  document.querySelectorAll(".calculator-section").forEach((section) => {
    section.classList.remove("active");
  });
  document.querySelectorAll(".nav-links a").forEach((navLink) => {
    navLink.classList.remove("active");
  });

  // Add active class to target section and corresponding nav link
  document.getElementById(targetId).classList.add("active");
  document
    .querySelector(`.nav-links a[href="#${targetId}"]`)
    .classList.add("active");

  // Update page title
  document.title = pageTitles[targetId] || "GPA Calculator";

  // Update URL and history state
  if (addToHistory) {
    history.pushState({ section: targetId }, "", `#${targetId}`);
  }
}

// Handle browser back/forward buttons
window.addEventListener("popstate", (event) => {
  const section = event.state?.section || "home";
  navigateToSection(section, false);
});

// Navigation - Navbar links
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute("href").substring(1);
    navigateToSection(targetId);
  });
});

// Navigation - Feature card links
document.querySelectorAll(".feature-card .btn").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute("href").substring(1);
    navigateToSection(targetId);
  });
});

// Add Course Row
function createCourseRow() {
  const div = document.createElement("div");
  div.className = "course-row";
  div.innerHTML = `
        <input type="text" placeholder="Course Name (optional)" class="course-name">
        <input type="number" placeholder="Credit Hours" class="credit-hours" required min="0" step="0.5">
        <select class="grade" required>
            <option value="">Select Grade</option>
            <option value="4.0">A</option>
            <option value="3.7">A-</option>
            <option value="3.3">B+</option>
            <option value="3.0">B</option>
            <option value="2.7">B-</option>
            <option value="2.3">C+</option>
            <option value="2.0">C</option>
            <option value="1.7">C-</option>
            <option value="1.3">D+</option>
            <option value="1.0">D</option>
            <option value="0.0">F</option>
        </select>
        <button type="button" class="remove-course">×</button>
    `;
  return div;
}

addCourseBtn.addEventListener("click", () => {
  courseInputs.appendChild(createCourseRow());
});

// Remove Course Row
courseInputs.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-course")) {
    e.target.closest(".course-row").remove();
  }
});

// Calculate GPA
gpaForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let totalPoints = 0;
  let totalCredits = 0;

  document.querySelectorAll(".course-row").forEach((row) => {
    const credits = parseFloat(row.querySelector(".credit-hours").value) || 0;
    const grade = parseFloat(row.querySelector(".grade").value) || 0;

    if (credits > 0 && grade >= 0) {
      totalPoints += credits * grade;
      totalCredits += credits;
    }
  });

  const gpa =
    totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  calculatedGPA.textContent = gpa;
});

// Calculate Required GPA
plannerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const currentGPA = parseFloat(document.getElementById("currentGPA").value);
  const targetGPA = parseFloat(document.getElementById("targetGPA").value);
  const currentCredits = parseFloat(
    document.getElementById("currentCredits").value
  );
  const additionalCredits = parseFloat(
    document.getElementById("additionalCredits").value
  );

  if (
    currentGPA >= 0 &&
    targetGPA >= 0 &&
    currentCredits >= 0 &&
    additionalCredits > 0
  ) {
    const requiredPoints =
      targetGPA * (currentCredits + additionalCredits) -
      currentGPA * currentCredits;
    const requiredGPAValue = requiredPoints / additionalCredits;
    requiredGPA.textContent = requiredGPAValue.toFixed(2);
  } else {
    requiredGPA.textContent = "Invalid Input";
  }
});

// Form Validation
function validateNumberInput(input) {
  input.addEventListener("input", () => {
    const value = parseFloat(input.value);
    if (input.hasAttribute("max")) {
      const max = parseFloat(input.getAttribute("max"));
      if (value > max) input.value = max;
    }
    if (input.hasAttribute("min")) {
      const min = parseFloat(input.getAttribute("min"));
      if (value < min) input.value = min;
    }
  });
}

// Apply validation to number inputs
document.querySelectorAll('input[type="number"]').forEach(validateNumberInput);
