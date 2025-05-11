// ===========================
// Task: Show/Cancel New Task Form
// ===========================
document.querySelectorAll('.show-task-form-button').forEach((button) => {
  button.addEventListener('click', function () {
    const id = this.dataset.id;
    const form = document.querySelector(`.new-task-form[data-id="${id}"]`);
    form.style.display = 'block';
    this.style.display = 'none';
    form.querySelector('input[name="Title"]').focus();
  });
});

document.querySelectorAll('.cancel-task-button').forEach((button) => {
  button.addEventListener('click', function () {
    const form = this.closest('.new-task-form');
    const id = form.dataset.id;
    const showBtn = document.querySelector(
      `.show-task-form-button[data-id="${id}"]`,
    );

    form.reset();
    form.style.display = 'none';
    showBtn.style.display = 'inline';
  });
});

document.querySelectorAll('.new-task-form').forEach((form) => {
  form.addEventListener('submit', function (e) {
    const title = this.querySelector('input[name="Title"]').value.trim();
    if (!title) {
      e.preventDefault();
      alert('Please fill in title.');
    }
  });
});

// ===========================
// Task: Edit & Cancel
// ===========================
document.addEventListener('dblclick', function (e) {
  const taskDisplay = e.target.closest('.task-display');
  if (taskDisplay) {
    const taskId = taskDisplay.dataset.taskId;
    const div = document.querySelector(`div[data-task-id="${taskId}"]`);
    const form = div.querySelector('.task-edit-form');
    taskDisplay.style.display = 'none';
    form.style.display = 'block';
    form.querySelector('input[name="Title"]').focus();
  }
});

document.addEventListener('click', function (e) {
  if (e.target.classList.contains('cancel-task-edit')) {
    const form = e.target.closest('.task-edit-form');
    const taskId = form.dataset.taskId;
    const taskDisplay = document.querySelector(
      `.task-display[data-task-id="${taskId}"]`,
    );
    form.style.display = 'none';
    taskDisplay.style.display = 'flex';
  }
});

// ===========================
// Task: Delete
// ===========================
document.addEventListener('click', async function (e) {
  if (e.target.classList.contains('delete-task-button')) {
    const taskId = e.target.getAttribute('data-task-id');
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      const response = await fetch(`/tasks-collection/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (response.ok) e.target.closest('div[data-task-id]').remove();
      else alert('Failed to delete task.');
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Something went wrong.');
    }
  }
});
