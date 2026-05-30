// Add Footer
let date = new Date()
let thisYear = date.getFullYear()

let footer = document.querySelector('footer')
let copyRight = document.createElement('p')
copyRight.innerHTML = `&copy; ${thisYear} Christian Chourio`
footer.appendChild(copyRight)

// Add Skills
let skills = ['HTML', 'CSS', 'JavaScript', 'Git', 'GitHub', 'Responsive Design', 'DOM Manipulation', 'REST APIs']
let skillsList = document.querySelector('#skills ul')

for (let i = 0; i < skills.length; i++) {
    let skill = document.createElement('li')
    skill.innerHTML = skills[i]
    skillsList.appendChild(skill)    
}

// Add Form
let form = document.querySelector('form')

form.addEventListener('submit', function (event) {
    
    event.preventDefault();

    let name = event.target.usersName.value
    let email = event.target.usersEmail.value
    let usersMessage = event.target.usersMessage.value
    
    // Display Message
    let messageList = document.querySelector('#messages ul')
    let newMessage = document.createElement('li')

    newMessage.innerHTML = `<a href="mailto:${email}">${email}</a><span> ${usersMessage} </span>`

    messageList.appendChild(newMessage)

    // Delete Message
    let removeButton = document.createElement('button')
    removeButton.innerHTML = 'Remove'

    removeButton.addEventListener('click', function (event) {
        let entry = this.parentNode
        entry.remove()
    })

    newMessage.appendChild(removeButton)

    form.reset()
})

// Async/await - Projects

async function fetchRepos() {
    try {
        let response = await fetch('https://api.github.com/users/cchourio/repos')
        
        if(!response.ok){
            throw new Error(response.status);
        }

        let data = await response.json()

        let projectList = document.querySelector('#projects ul') 

        data.forEach(element => {
            let project = document.createElement('li')
            project.innerHTML = `<a target="_black" href='${element.html_url}'>${element.name}</a>`
            projectList.appendChild(project)
        });

    } catch (error) {
        console.error('An eeror occurred',error)
    }
}

fetchRepos()
