let todos = JSON.parse(localStorage.getItem("todos")) || [];

window.onload = () => {
    displayTodos();
}

document.getElementById("addBtn").addEventListener("click", () => {
    let task = document.getElementById("task").value.trim();
    let date = document.getElementById("date").value;
    let priority = document.getElementById("priority").value;

    if (!task || !date || !priority) {
        alert("Please Enter All Details")
        return;
    }

    let todo = { task, date, priority, completed: false };

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

    document.getElementById("task").value = "";
    document.getElementById("date").value = "";
    document.getElementById("priority").value = "";

    displayTodos();
});

function formatDate(dateStr) {
    let [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
}

function displayTodos() {
    let todayContainer = document.getElementById("todayContainer");
    let futureContainer = document.getElementById("futureContainer");
    let completedContainer = document.getElementById("completedContainer");

    todayContainer.innerHTML = "";
    futureContainer.innerHTML = "";
    completedContainer.innerHTML = "";

    let today = new Date().toISOString().split("T")[0];

    todos.forEach((todo, index) => {

        let div = document.createElement("div");
        div.classList.add("todo-item");
        if (todo.completed) div.classList.add("completed");

        const content = document.createElement("div");
        content.className = "todo-content";

        const spanTask = document.createElement("span");
        spanTask.className = "task";
        spanTask.textContent = `${index + 1}. ${todo.task}`;

        const spanDate = document.createElement("span");
        spanDate.className = "date";
        spanDate.textContent = formatDate(todo.date);

        const spanPriority = document.createElement("span");
        spanPriority.className = "priority";
        spanPriority.textContent = todo.priority;

        content.appendChild(spanTask);
        content.appendChild(spanDate);
        content.appendChild(spanPriority);

        const actions = document.createElement("div");
        actions.className = "todo-actions";

        let delBtn = document.createElement("button");
        delBtn.textContent = "🗑️";
        delBtn.onclick = () => deleteTodo(index);

        let tickBtn = document.createElement("button");
        tickBtn.textContent = "✔";
        tickBtn.onclick = () => completeTodo(index);

        if (!todo.completed) actions.appendChild(tickBtn);
        actions.appendChild(delBtn);

        div.appendChild(content);
        div.appendChild(actions);

        if (!todo.completed) {
            div.appendChild(tickBtn);
        }

        if (todo.completed) {
            completedContainer.appendChild(div);
        } else if (todo.date === today) {
            todayContainer.appendChild(div);
        } else if (todo.date > today) {
            futureContainer.appendChild(div);
        }
    });
}

function deleteTodo(index) {
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    displayTodos();
}

function completeTodo(index) {
    todos[index].completed = true;
    localStorage.setItem("todos", JSON.stringify(todos));
    displayTodos();
}