// Global variable to hold the current editing project
let currentEditProject = null;

// Event listener for form submission
document.getElementById('projectForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const projectName = document.getElementById('projectName').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const description = document.getElementById('description').value;
    const imageFile = document.getElementById('image').files[0];

    // Get selected technologies
    const technologies = [];
    if (document.getElementById('nodejs').checked) technologies.push('Node Js');
    if (document.getElementById('nextjs').checked) technologies.push('Next Js');
    if (document.getElementById('reactjs').checked) technologies.push('React Js');
    if (document.getElementById('typescript').checked) technologies.push('TypeScript');

    const reader = new FileReader();

    reader.onload = function (e) {
        const imageSrc = e.target.result; // Get the image source

        if (currentEditProject) {
            // If we are editing an existing project, update it
            updateProjectInDOM(currentEditProject, projectName, startDate, endDate, description, technologies, imageSrc);
            currentEditProject = null; // Reset the editing project
        } else {
            // Otherwise, add a new project
            addProjectToDOM(projectName, startDate, endDate, description, technologies, imageSrc);
        }

        // Reset the form
        document.getElementById('projectForm').reset();
        document.getElementById('imagePreview').style.display = 'none'; // Hide the image preview
    };

    // If a new image file is selected, read it
    if (imageFile) {
        reader.readAsDataURL(imageFile);
    } else if (currentEditProject) {
        // If no new image is selected, keep the existing image
        const existingImgSrc = currentEditProject.querySelector('img').src;
        updateProjectInDOM(currentEditProject, projectName, startDate, endDate, description, technologies, existingImgSrc);
        currentEditProject = null; // Reset after editing
    }
});

// Function to add project card to DOM
function addProjectToDOM(name, start, end, desc, techs, imgSrc) {
    const projectsContainer = document.getElementById('projectsContainer');
    const duration = calculateDuration(start, end);

    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');

    const techString = techs.map(tech => `<span class="tech">${tech}</span>`).join(' | ');

    projectCard.innerHTML = `
        <img src="${imgSrc}" alt="${name}">
        <h3>${name} - ${new Date(start).getFullYear()}</h3>
        <p class="project-duration">Duration: ${duration}</p>
        <p class="project-description">${desc}</p>
        <p class="project-techs"><strong>Technologies Used:</strong> ${techString}</p>
        <div class="actions">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>
    `;

    projectsContainer.appendChild(projectCard);

    // Add delete functionality
    projectCard.querySelector('.delete').addEventListener('click', () => {
        projectsContainer.removeChild(projectCard);
    });

    // Add edit functionality
    projectCard.querySelector('.edit').addEventListener('click', () => {
        enterEditMode(projectCard, name, start, end, desc, techs, imgSrc);
    });
}

// Function to enter edit mode for a project
function enterEditMode(projectCard, name, start, end, desc, techs, imgSrc) {
    currentEditProject = projectCard; // Set the current project being edited

    // Populate the form with the existing project details
    document.getElementById('projectName').value = name;
    document.getElementById('startDate').value = start;
    document.getElementById('endDate').value = end;
    document.getElementById('description').value = desc; // Populate with the current description

    // Uncheck all technologies
    document.getElementById('nodejs').checked = techs.includes('Node Js');
    document.getElementById('nextjs').checked = techs.includes('Next Js');
    document.getElementById('reactjs').checked = techs.includes('React Js');
    document.getElementById('typescript').checked = techs.includes('TypeScript');

    // Set the image preview
    document.getElementById('imagePreview').src = imgSrc;
    document.getElementById('imagePreview').style.display = 'block'; // Show the image preview
}

// Function to update project in DOM
function updateProjectInDOM(projectCard, name, start, end, desc, techs, imgSrc) {
    const duration = calculateDuration(start, end);

    // Update the project card details
    projectCard.querySelector('h3').innerText = `${name} - ${new Date(start).getFullYear()}`;
    projectCard.querySelector('.project-duration').innerText = `Duration: ${duration}`;
    
    // Update the project description and technologies used
    projectCard.querySelector('.project-description').innerText = desc; // Updated description
    projectCard.querySelector('.project-techs').innerHTML = `<strong>Technologies Used:</strong> ${techs.map(tech => `<span class="tech">${tech}</span>`).join(' | ')}`; // Update technologies used
    projectCard.querySelector('img').src = imgSrc; // Update the image
}

// Function to calculate duration
function calculateDuration(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const duration = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)); // in days
    const months = Math.floor(duration / 30);
    const days = duration % 30;
    return `${months} month(s) and ${days} day(s)`; // Adjust to show months and days
}

// Event listener for file input to show image preview
document.getElementById('image').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('imagePreview').src = e.target.result;
            document.getElementById('imagePreview').style.display = 'block'; // Show the image preview
        };
        reader.readAsDataURL(file);
    } else {
        // If no file is selected, hide the image preview
        document.getElementById('imagePreview').style.display = 'none';
    }
});