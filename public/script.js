document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('todo-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const newTask = document.getElementById('new-task').value;
        if (newTask) {
            try {
                const response = await fetch('/todos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ task: newTask })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const todo = await response.json();
                addTodoToList(todo);
                document.getElementById('new-task').value = '';
            } catch (error) {
                console.error('Error adding todo:', error);
            }
        }
    });

    async function fetchTodos() {
        try {
            const response = await fetch('/todos');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const todos = await response.json();
            todos.forEach(todo => addTodoToList(todo));
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    }

    function addTodoToList(todo) {
        const li = document.createElement('li');
        li.textContent = todo.task;
        document.getElementById('todo-list').appendChild(li);
    }

    fetchTodos();
});
