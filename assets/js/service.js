document.addEventListener("DOMContentLoaded", function() {
  
  function showContent(id) {
    // Hide all contents
    document.querySelectorAll(".program-content, .program-feature-content").forEach(function(e) {
      e.classList.add("d-none");
    });
    
    // Remove active class from all service list links
    document.querySelectorAll(".services-list a").forEach(function(e) {
      e.classList.remove("active");
    });

    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.classList.remove("d-none");
      targetElement.scrollIntoView({ behavior: "smooth" });

      // Find the link that corresponds to this id and make it active
      // We search in both lists, but only apply active class if it's in .services-list (as per original logic)
      const selector = `.services-list a[data-program="${id}"], .download-catalog a[data-feature="${id}"]`;
      const activeLink = document.querySelector(selector);
      
      if (activeLink && activeLink.closest(".services-list")) {
          activeLink.classList.add("active");
      }
    }
  }

  // Handle clicks
  document.querySelectorAll(".services-list a, .download-catalog a").forEach(function(e) {
    e.addEventListener("click", function(t) {
      t.preventDefault();
      const programId = this.getAttribute("data-program");
      const featureId = this.getAttribute("data-feature");
      const targetId = programId || featureId;
      
      if (targetId) {
        showContent(targetId);
      }
    });
  });

  // Handle initial load based on hash
  const hash = window.location.hash.substring(1); // remove #
  if (hash) {
      // Check if the hash corresponds to a known program or feature
      if (document.getElementById(hash) && (hash.startsWith('program') || hash.startsWith('feature'))) {
          showContent(hash);
      }
  }
});
