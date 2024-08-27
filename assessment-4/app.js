document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let tasks = [];

    const renderTasks = (filter = 'all') => {
        taskList.innerHTML = '';
        const filteredTasks = tasks.filter(task => {
            if (filter === 'all') return true;
            if (filter === 'completed') return task.completed;
            if (filter === 'pending') return !task.completed;
        });

        filteredTasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
            taskItem.innerHTML = `
                <span>${task.name}</span>
                <div class="task-actions">
                    <button onclick="toggleTask(${index})">${task.completed ? 'Unmark' : 'Complete'}</button>
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    };

    addTaskBtn.addEventListener('click', () => {
        const taskName = taskInput.value.trim();
        if (taskName) {
            tasks.push({ name: taskName, completed: false });
            taskInput.value = '';
            renderTasks();
        }
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            renderTasks(btn.dataset.filter);
        });
    });

    window.toggleTask = (index) => {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    };

    window.editTask = (index) => {
        const newTaskName = prompt('Edit Task', tasks[index].name);
        if (newTaskName) {
            tasks[index].name = newTaskName;
            renderTasks();
        }
    };

    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        renderTasks();
    };

    renderTasks();
});
