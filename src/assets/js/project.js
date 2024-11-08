
let currentEditProject = null;


document.getElementById('projectForm').addEventListener('submit', function (e) {
    e.preventDefault();

 
    const projectName = document.getElementById('projectName').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const description = document.getElementById('description').value;
    const imageFile = document.getElementById('image').files[0];

    const technologies = [];
    if (document.getElementById('nodejs').checked) technologies.push('Node Js');
    if (document.getElementById('nextjs').checked) technologies.push('Next Js');
    if (document.getElementById('reactjs').checked) technologies.push('React Js');
    if (document.getElementById('typescript').checked) technologies.push('TypeScript');

    const reader = new FileReader();

    reader.onload = function (e) {
        const imageSrc = e.target.result; 
        if (currentEditProject) {
           
            updateProjectInDOM(currentEditProject, projectName, startDate, endDate, description, technologies, imageSrc);
            currentEditProject = null; 
        } else {
        
            addProjectToDOM(projectName, startDate, endDate, description, technologies, imageSrc);
        }

      
        document.getElementById('projectForm').reset();
        document.getElementById('imagePreview').style.display = 'none'; 
    };


    if (imageFile) {
        reader.readAsDataURL(imageFile);
    } else if (currentEditProject) {
      
        const existingImgSrc = currentEditProject.querySelector('img').src;
        updateProjectInDOM(currentEditProject, projectName, startDate, endDate, description, technologies, existingImgSrc);
        currentEditProject = null;
    }
});


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

  
    projectCard.querySelector('.delete').addEventListener('click', () => {
        projectsContainer.removeChild(projectCard);
    });

   
    projectCard.querySelector('.edit').addEventListener('click', () => {
        enterEditMode(projectCard, name, start, end, desc, techs, imgSrc);
    });
}


function enterEditMode(projectCard, name, start, end, desc, techs, imgSrc) {
    currentEditProject = projectCard; 

   
    document.getElementById('projectName').value = name;
    document.getElementById('startDate').value = start;
    document.getElementById('endDate').value = end;
    document.getElementById('description').value = desc;

    document.getElementById('nodejs').checked = techs.includes('Node Js');
    document.getElementById('nextjs').checked = techs.includes('Next Js');
    document.getElementById('reactjs').checked = techs.includes('React Js');
    document.getElementById('typescript').checked = techs.includes('TypeScript');

   
    document.getElementById('imagePreview').src = imgSrc;
    document.getElementById('imagePreview').style.display = 'block'; 
}


function updateProjectInDOM(projectCard, name, start, end, desc, techs, imgSrc) {
    const duration = calculateDuration(start, end);

   
    projectCard.querySelector('h3').innerText = `${name} - ${new Date(start).getFullYear()}`;
    projectCard.querySelector('.project-duration').innerText = `Duration: ${duration}`;
    
    
    projectCard.querySelector('.project-description').innerText = desc; 
    projectCard.querySelector('.project-techs').innerHTML = `<strong>Technologies Used:</strong> ${techs.map(tech => `<span class="tech">${tech}</span>`).join(' | ')}`; // Update technologies used
    projectCard.querySelector('img').src = imgSrc; 
}


function calculateDuration(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const duration = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)); 
    const months = Math.floor(duration / 30);
    const days = duration % 30;
    return `${months} month(s) and ${days} day(s)`; 
}


document.getElementById('image').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('imagePreview').src = e.target.result;
            document.getElementById('imagePreview').style.display = 'block'; 
        };
        reader.readAsDataURL(file);
    } else {
       
        document.getElementById('imagePreview').style.display = 'none';
    }
});