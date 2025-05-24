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
              .map((task) => {
                return `
                  <div data-task-id='${task.Task_id}' class="mb-4">
                    <div class="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition duration-300 task-display" data-task-id='${task.Task_id}'>
                      <div class="flex flex-row w-full justify-between gap-3">
                        <div class="flex flex-col w-full">
                          <div class="flex justify-between items-start">
                            <h2 class="task-title text-lg font-semibold text-gray-800 break-words max-w-[75%]">
                              ${task.Title}
                            </h2>
                            ${
                              task.DueDate
                                ? `
                                <span class="text-xs font-medium whitespace-nowrap px-2 py-0.5 rounded bg-gray-100 ${(() => {
                                  const due = new Date(task.DueDate);
                                  const now = new Date();
                                  due.setHours(0, 0, 0, 0);
                                  now.setHours(0, 0, 0, 0);
                                  return due < now
                                    ? 'text-red-600'
                                    : 'text-blue-600';
                                })()}">
                                  Due: ${new Date(task.DueDate).toLocaleDateString()}
                                </span>
                              `
                                : ''
                            }
                          </div>

                          <span class="task-desc text-sm text-gray-600 mt-1 break-words min-h-[1rem] block">
                            ${task.Description || ''}
                          </span>
                          <div class="flex">
                            ${
                              task.Priority !== 'NONE'
                                ? `
                                  <span class="task-priority text-xs mt-2 italic inline-block px-2 py-0.5 rounded-full bg-gray-100 w-fit ${
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
                        </div>
                        <div class="flex justify-end">
                          <button
                            class="delete-task-button text-red-500 text-center hover:text-red-700 transition duration-200"
                            data-task-id='${task.Task_id}'
                            aria-label="Delete task"
                          >🗑️</button>
                        </div>
                      </div>
                    </div>

                    <form
                      class="task-edit-form mt-2 hidden bg-gray-50 flex flex-col gap-4 p-4 rounded-lg shadow-inner"
                      data-task-id='${task.Task_id}'
                      method='POST'
                      action='/tasks-collection/tasks/${task.Task_id}?_method=PATCH'
                    >
                      <div class="flex flex-wrap gap-4">
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
                        <input
                          type="date"
                          name="DueDate"
                          value="${task.DueDate ? task.DueDate.split('T')[0] : null}"
                          class="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div class="flex justify-end space-x-2 mt-3">
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
                `;
              })
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
