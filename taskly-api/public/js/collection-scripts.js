// ===========================
// Collection: Create New
// ===========================
document.querySelector('.newCollectionButton').addEventListener('click', () => {
  document.getElementById('newCollectionFormContainer').style.display = 'block';
  document.getElementById('newCollectionTitle').focus();
});

document.getElementById('cancelNewCollection').addEventListener('click', () => {
  document.getElementById('newCollectionFormContainer').style.display = 'none';
  document.getElementById('newCollectionTitle').value = '';
});

document.getElementById('newCollectionForm').addEventListener('submit', (e) => {
  const title = document.getElementById('newCollectionTitle').value.trim();
  if (!title) {
    e.preventDefault();
    alert('Please enter a valid collection name.');
  }
});

// ===========================
// Collection: Toggle Tasks
// ===========================
document.querySelectorAll('.toggle-tasks-button').forEach((button) => {
  button.addEventListener('click', async function () {
    const collectionId = this.dataset.id;
    const taskList = document.querySelector(
      `.tasks-list[data-id="${collectionId}"]`,
    );
    const isVisible = taskList.style.display === 'block';

    if (isVisible) {
      taskList.style.display = 'none';
      this.textContent = 'Show';
      return;
    }

    if (taskList.children.length === 0) {
      try {
        const response = await fetch(`/tasks-collection/${collectionId}/tasks`);
        const text = await response.text();
        const tasks = JSON.parse(text || '[]');

        taskList.innerHTML = tasks.length
          ? tasks
              .map(
                (task) => `
                  <div data-task-id='${task.Task_id}' class="mb-4">
                    <div class="task-display flex items-start justify-between bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition duration-300" data-task-id='${task.Task_id}'>
                      <div class="flex flex-col flex-grow max-w-[calc(100%-2.5rem)]">
                        <h2 class="task-title text-lg font-semibold text-gray-800 break-words">${task.Title}</h2>
                        <span class="task-desc text-sm text-gray-600 mt-1 break-words min-h-[1rem]">
                          ${task.Description || ''}
                        </span>
                        ${
                          task.Priority !== 'NONE'
                            ? `
                              <span class="task-priority text-xs mt-1 italic inline-block px-2 py-0.5 rounded-full bg-gray-100 mr-4 ${
                                task.Priority === 'LOW'
                                  ? 'text-gray-600'
                                  : task.Priority === 'NORMAL'
                                    ? 'text-blue-600'
                                    : task.Priority === 'HIGH'
                                      ? 'text-red-600'
                                      : ''
                              }">
                                Priority: ${task.Priority.charAt(0) + task.Priority.slice(1).toLowerCase()}
                              </span>
                            `
                            : ''
                        }
                      </div>
                      <button
                        class="delete-task-button text-red-500 text-center self-center hover:text-red-700 transition duration-200 mr-2 mt-1 shrink-0"
                        data-task-id='${task.Task_id}'
                        aria-label="Delete task"
                      >🗑️</button>
                    </div>

                    <form
                      class="task-edit-form mt-2 hidden bg-gray-50 flex flex-col gap-4 p-4 rounded-lg shadow-inner"
                      data-task-id='${task.Task_id}'
                      method='POST'
                      action='/tasks-collection/tasks/${task.Task_id}?_method=PATCH'
                    >
                      <div class="flex gap-4">
                        <input
                          type='text'
                          name='Title'
                          value='${task.Title}'
                          required
                          class="w-80 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          placeholder="Task title"
                        />
                        <input
                          type='text'
                          name='Description'
                          value="${task.Description || ''}"
                          class="w-80 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          placeholder="Description (optional)"
                        />
                        <select
                          name="Priority"
                          class="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                          <option value="NONE" ${task.Priority === 'NONE' ? 'selected' : ''}>None</option>
                          <option value="LOW" ${task.Priority === 'LOW' ? 'selected' : ''}>Low</option>
                          <option value="NORMAL" ${task.Priority === 'NORMAL' ? 'selected' : ''}>Normal</option>
                          <option value="HIGH" ${task.Priority === 'HIGH' ? 'selected' : ''}>High</option>
                        </select>
                      </div>
                      <div class="flex justify-end space-x-2">
                        <button
                          type='submit'
                          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                        >
                          Save
                        </button>
                        <button
                          type='button'
                          class='cancel-task-edit text-gray-600 hover:text-gray-800 px-4 py-2'
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                `,
              )
              .join('')
          : `<span>There aren't any tasks.</span>`;
      } catch (error) {
        console.error('Failed to load tasks:', error);
        taskList.innerHTML = '<span>Error loading tasks</span>';
      }
    }

    taskList.style.display = 'block';
    this.textContent = 'Hide';
  });
});

// ===========================
// Collection: Edit & Cancel
// ===========================
document.querySelectorAll('.collection-display').forEach((el) => {
  el.addEventListener('dblclick', function () {
    const id = this.dataset.id;
    const container = document
      .querySelector(`.collection-display[data-id="${id}"]`)
      .closest('.collection');
    console.log(container);
    const editForm = container.querySelector('.edit-form');
    const display = container.querySelector('.collection-display');

    console.log(display);

    display.style.display = 'none';
    editForm.style.display = 'block';
    editForm.querySelector('input[name="Title"]').focus();
  });
});

document.querySelectorAll('.edit-button').forEach((btn) => {
  btn.addEventListener('click', function () {
    const id = this.dataset.id;
    const container = document
      .querySelector(`.collection-display[data-id="${id}"]`)
      .closest('.collection');
    const editForm = container.querySelector('.edit-form');
    const display = container.querySelector('.collection-display');

    display.style.display = 'none';
    editForm.style.display = 'block';
    editForm.querySelector('input[name="Title"]').focus();
  });
});

document.querySelectorAll('.cancel-edit-button').forEach((button) => {
  button.addEventListener('click', function () {
    const form = this.closest('.edit-form');
    const container = form.closest('.collection');
    const display = container.querySelector('.collection-display');

    form.reset();
    form.style.display = 'none';
    display.style.display = 'flex';
  });
});

// ===========================
// Collection: Delete
// ===========================
document.querySelectorAll('.delete-button').forEach((button) => {
  button.addEventListener('click', async function () {
    const collectionId = this.getAttribute('data-id');

    try {
      const response = await fetch(`/tasks-collection/${collectionId}`, {
        method: 'DELETE',
      });
      if (response.ok) this.closest('.collection').remove();
      else alert('Failed to delete collection');
    } catch (error) {
      console.error('Error deleting collection:', error);
      alert('Something went wrong');
    }
  });
});

// ===========================
// Collection: Options Menu
// ===========================
document.querySelectorAll('.options-button').forEach((button) => {
  button.addEventListener('click', (e) => {
    const menu = e.target.nextElementSibling;
    console.log(e.target);
    console.log(menu);
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  });
});

document.addEventListener('click', (e) => {
  if (
    !e.target.closest('.options-button') &&
    !e.target.closest('.options-menu')
  ) {
    document.querySelectorAll('.options-menu').forEach((menu) => {
      menu.style.display = 'none';
    });
  }
});
