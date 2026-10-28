
document.addEventListener("DOMContentLoaded", () => {
    // 1. Ambil elemen DOM
    const todoForm = document.querySelector("#todoForm");
    const taskInput = document.querySelector("#taskInput");
    const inputError = document.querySelector("#inputError");
    const todoList = document.querySelector("#todoList");
    const taskCounter = document.querySelector("#taskCounter");
    const clearCompletedBtn = document.querySelector("#clearCompletedBtn"); // Ambil elemen Fitur 2

    // 2. Fungsi membaca dan menyimpan ke LocalStorage
    const getTasks = () => JSON.parse(localStorage.getItem("todo_tasks")) || [];
    const saveTasks = (tasks) => localStorage.setItem("todo_tasks", JSON.stringify(tasks));

    // 3. Fungsi menampilkan daftar tugas dan mengupdate Task Counter
    const renderTasks = () => {
        const tasks = getTasks();

        // Fitur 1: Hitung statistik tugas & perbarui teks counter
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;
        const activeTasks = totalTasks - completedTasks;

        if (taskCounter) {
            taskCounter.textContent = `Total: ${totalTasks} Tugas | Selesai: ${completedTasks} | Belum Selesai: ${activeTasks}`;
        }

        todoList.innerHTML = "";

        if (tasks.length === 0) {
            todoList.innerHTML = "<p style='text-align:center; color:#64748b; font-size:13px; padding:10px;'>Belum ada tugas tersimpan.</p>";
            return;
        }

        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = `todo-item ${task.completed ? 'completed' : ''}`;

            li.innerHTML = `
                <span class="todo-text">${task.text}</span>
                <div class="todo-actions">
                    <button class="action-btn complete-btn" data-index="${index}">
                        ${task.completed ? 'Batal' : 'Selesai'}
                    </button>
                    <button class="action-btn delete-btn" data-index="${index}">Hapus</button>
                </div>
            `;
            todoList.appendChild(li);
        });
    };

    
    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        const tasks = getTasks();

        if (tasks.length >= 5) {
            taskInput.classList.add("error");
            inputError.textContent = "Tugas maksimal 5";
            inputError.style.display = "block";
            return;
        }

        // Validasi input sederhana (kurang dari 3 karakter)
        if (taskText.length < 3) {
            taskInput.classList.add("error");
            inputError.textContent = "Tugas tidak boleh kosong atau kurang dari 3 karakter!";
            inputError.style.display = "block";
            return;
        }

        // Jika valid, hilangkan pesan error
        taskInput.classList.remove("error");
        inputError.style.display = "none";

        // Simpan tugas baru ke array LocalStorage
        tasks.push({ text: taskText, completed: false });
        saveTasks(tasks);

        taskInput.value = "";
        renderTasks();
    });

    // 5. Tangani klik tombol Selesai dan Hapus pada todoList
    todoList.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        if (index === undefined) return;

        const tasks = getTasks();

        if (e.target.classList.contains("complete-btn")) {
            tasks[index].completed = !tasks[index].completed;
            saveTasks(tasks);
            renderTasks();
        } else if (e.target.classList.contains("delete-btn")) {
            // Fitur 3: Konfirmasi Sebelum Menghapus (Confirm Dialog)
            const isConfirmed = confirm("Apakah Anda yakin ingin menghapus tugas ini?");
            if (isConfirmed) {
                tasks.splice(index, 1);
                saveTasks(tasks);
                renderTasks();
            }
        }
    });

    // Fitur 2: Bersihkan Tugas Selesai
    clearCompletedBtn.addEventListener("click", () => {
        const tasks = getTasks();
        // Hanya menyaring dan menyisakan tugas yang belum selesai (completed === false)
        const activeTasks = tasks.filter(task => !task.completed);
        saveTasks(activeTasks);
        renderTasks();
    });

    // Render pertama kali saat halaman dimuat
    renderTasks();
});