
// localStorage.clear();

let myTodoList = localStorage.getItem('todolist') != null ? JSON.parse(localStorage.getItem('todolist')) : []
const addBtn = document.querySelector('.add-todo');
const todoListBox = document.querySelector('.todo-list');
let todoItems;

document.addEventListener('DOMContentLoaded', function () {
    setTodoList();
});

addBtn.addEventListener('click', () => {
    myTodoList = [...myTodoList, { text: "", complete: false }]
    localStorage.setItem('todolist', JSON.stringify(myTodoList))
    setTodoList();
    setNewTodoFocus();
});

function setTodoList() {
    todoListBox.innerHTML = myTodoList?.map((todo, index) => {
        return (
            `<div class="todo-item">
            <input type="checkbox" class="todo-check"/>
            <input type="text" class="todo-input" />
            <div class="todo-text">${todo.text}</div>
            <button class="material-icons edit-btn">edit</button>
            <button class="material-icons remove-btn">remove_circle</button>
        </div>`
        )
    }).join(' ')
    todoItems = document.querySelectorAll('.todo-item');
    setTodoItems();
}

function setTodoItems() {
    todoItems.forEach((todoItem, index) => {
        const checkbox = todoItem.querySelector('.todo-check')
        const todoInput = todoItem.querySelector('.todo-input');
        const todoText = todoItem.querySelector('.todo-text');
        const editBtns = todoItem.querySelector('.edit-btn');
        const removeBtns = todoItem.querySelector('.remove-btn');

        setComplite(todoItem, checkbox, todoText, todoInput)
        setTodoItemBorder(todoInput, todoItem)
        setTodoInputDisplay(editBtns, todoInput, todoText);
        deleteTodoList(removeBtns, index)
    })
}

function setNewTodoFocus() {
    const newTodoInput = todoItems[todoItems.length - 1].querySelector('.todo-input')
    const newTodoText = todoItems[todoItems.length - 1].querySelector('.todo-text')
    setDisplay(true, newTodoInput, newTodoText)
    newTodoInput.focus()
}

function setComplite(todoItem, checkbox, todoText, todoInput) {
    checkbox.addEventListener('click', (e) => {
        if (e.target.checked) {
            todoItem.classList.add('complete-item')
            setDisplay(false, todoInput, todoText)
        } else {
            todoItem.classList.remove('complete-item')
        }
    })
}

function setTodoItemBorder(todoInput, todoItem) {
    todoInput.addEventListener('focus', () => {
        todoItem.classList.add('focus-item')
    });
    todoInput.addEventListener('blur', () => {
        todoItem.classList.remove('focus-item')
    });
}

function setTodoInputDisplay(editBtns, todoInput, todoText) {
    let editState = true;

    editBtns.addEventListener('click', () => {
        editState = true;
        setDisplay(editState, todoInput, todoText)
        todoInput.value = todoText.textContent;
        todoInput.focus()
    })

    todoInput.addEventListener('blur', () => {
        editState = !editState;
        setDisplay(editState, todoInput, todoText)

        setTodoText(todoText, todoInput)
    })
}

function setDisplay(state, todoInput, todoText) {
    todoInput.style.display = state ? 'block' : 'none';
    todoText.style.display = state ? 'none' : 'block';
}

function setTodoText(todoText, todoInput) {
    myTodoList = [];
    todoText.textContent = todoInput.value;
    todoItems.forEach((todoItem) => {
        const text = todoItem.querySelector('.todo-text').textContent
        myTodoList = [...myTodoList, { text: text, complete: false }]
    })
    localStorage.setItem('todolist', JSON.stringify(myTodoList))
}


function deleteTodoList(removeBtns, index) {

    removeBtns.addEventListener('click', () => {
        myTodoList.splice(index, 1);
        localStorage.setItem('todolist', JSON.stringify(myTodoList))
        setTodoList();
    })
}