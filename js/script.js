document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const dateInput = document.getElementById('date-input');
    const todoList = document.getElementById('todo-list');
    const filterButtons = document.querySelector('.filter-buttons');

    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskText = todoInput.value;
        const taskDate = dateInput.value;
        const noTaskRow = todoList.querySelector('.no-task');
        if (noTaskRow) {
            noTaskRow.parentElement.remove();
        }
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${taskText}</td>
            <td>${taskDate}</td>
            <td><button class="btn btn-status">Progress</button></td>
            <td>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512" class="delete-icon">
                    <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                </svg>
            </td>
        `;

        todoList.appendChild(newRow);

        todoInput.value = '';
        dateInput.value = '';

        const statusButton = newRow.querySelector('.btn-status');
        statusButton.addEventListener('click', () => {
            const taskRow = statusButton.closest('tr');

            taskRow.classList.toggle('completed');

            if (taskRow.classList.contains('completed')) {
                statusButton.textContent = 'Completed';
                statusButton.classList.add('completed');
            } else {
                statusButton.textContent = 'Progress';
                statusButton.classList.remove('completed');
            }
        });

        const deleteButton = newRow.querySelector('.delete-icon');
        deleteButton.addEventListener('click', () => {
            const taskRow = deleteButton.closest('tr');
            taskRow.remove();

            if (todoList.children.length === 0) {
                todoList.innerHTML = '<tr><td colspan="4" class="no-task">No task found</td></tr>';
            }
        });
    });

    filterButtons.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const filterValue = event.target.dataset.filter;

            const currentActiveButton = filterButtons.querySelector('.active');
            currentActiveButton.classList.remove('active');

            event.target.classList.add('active');

            const allTasks = todoList.querySelectorAll('tr');

            allTasks.forEach(taskRow => {
                if (taskRow.querySelector('.no-task')) {
                    return;
                }

                switch (filterValue) {
                    case 'all':
                        taskRow.style.display = '';
                        break;
                    case 'active':
                        if (taskRow.classList.contains('completed')) {
                            taskRow.style.display = 'none';
                        } else {
                            taskRow.style.display = '';
                        }
                        break;
                    case 'completed':
                        if (taskRow.classList.contains('completed')) {
                            taskRow.style.display = '';
                        } else {
                            taskRow.style.display = 'none';
                        }
                        break;
                }
            });
        }
    });
});

