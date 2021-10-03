
const form = document.getElementById('form')
const list = document.getElementById('list')
const template = document.getElementById('template').content
const fragment = document.createDocumentFragment()
let tasks = {}

document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    showTask()
})

list.addEventListener('click', e => {
    btnAction(e)
})

form.addEventListener('submit', e => {
    e.preventDefault()
    setTask()
})

const setTask = e => {
    //Form validation
    if(input.value.trim() === '') {
        console.log('It is empty')
        return
    }

    const task = {
        id: Date.now(),
        text: input.value,
        status: false
    }

    tasks[task.id] = task
    form.reset()
    input.focus()
    showTask()

}
    const showTask = () => {

        localStorage.setItem('tasks',JSON.stringify(tasks))

        if(Object.values(tasks).length === 0){
            list.innerHTML =
            `<div class="alert alert-dark text-center">
                No pending tasks! 🤠
            </div>`
            return
        }

        list.innerHTML = ''
        Object.values(tasks).forEach(tarea => {
            const clone = template.cloneNode(true)
            if(tarea.status) {
                clone.querySelector('.alert').classList.replace('alert-light','alert-secondary')
                clone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle','fa-undo-alt')
                clone.querySelector('p').style.textDecoration = 'line-through'
            }
                clone.querySelector('p').textContent = tarea.text
                clone.querySelectorAll('.fas')[0].dataset.id = tarea.id
                clone.querySelectorAll('.fas')[1].dataset.id = tarea.id
                fragment.appendChild(clone)
        })
    
        list.appendChild(fragment)
    }

    const btnAction = e => {

        if(e.target.classList.contains('fa-check-circle')){
            tasks[e.target.dataset.id].status = true
            showTask()
        }

        if(e.target.classList.contains('fa-minus-circle')) {
            delete tasks[e.target.dataset.id]
            showTask()
        }

        if(e.target.classList.contains('fa-undo-alt')) {
            tasks[e.target.dataset.id].status = false
            showTask()
        }

        e.stopPropagation()

    }