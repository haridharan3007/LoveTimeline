document
        .getElementById("grievanceForm")
        .addEventListener("submit", function (e) {
          e.preventDefault();

          // Reset error messages
          document
            .querySelectorAll(".error")
            .forEach((el) => (el.style.display = "none"));

          // Validate form
          let isValid = true;

          // Name validation
          const name = document.getElementById("name").value.trim();
          if (name === "") {
            document.getElementById("nameError").style.display = "block";
            isValid = false;
          }

          // Email validation (optional but if provided should be valid)
          const email = document.getElementById("email").value.trim();
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (email === "" || (email !== "" && !emailRegex.test(email))) {
            document.getElementById("emailError").style.display = "block";
            isValid = false;
          }
          const subject = document.getElementById("subject").value.trim();
          if (subject === "") {
            document.getElementById("subjectError").style.display = "block";
            isValid = false;
          }

          // Description validation
          const description = document
            .getElementById("description")
            .value.trim();
          if (description === "") {
            document.getElementById("descriptionError").style.display = "block";
            isValid = false;
          }

          if (isValid) {
            // Hide form and show success message
            document.getElementById("grievanceForm").style.display = "none";
            document.getElementById("successMessage").style.display = "block";

            let params = {
          name: name,
          email: email,
          message: description,
          subject: subject,
          resolution: document.getElementById("resolution").value.trim()
        };
        emailjs
          .send("service_jrw181m", "template_z8u0igm", params);
          }
        });