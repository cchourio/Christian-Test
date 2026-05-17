// Footer
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