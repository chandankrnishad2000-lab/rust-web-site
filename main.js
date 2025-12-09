// Dark mode toggle
document.addEventListener('DOMContentLoaded', function() {
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    // Load theme
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark');
      themeBtn.textContent = "☀️ Light Mode";
    }
    themeBtn.addEventListener('click', function() {
      document.body.classList.toggle('dark');
      if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        themeBtn.textContent = "☀️ Light Mode";
      } else {
        localStorage.setItem('theme', 'light');
        themeBtn.textContent = "🌙 Dark Mode";
      }
    });
  }

  // Resource search (resources.html)
  const rSearch = document.getElementById('resource-search');
  if (rSearch) {
    rSearch.addEventListener('input', function() {
      const query = rSearch.value.toLowerCase();
      document.querySelectorAll('.resources-list li').forEach(function(li) {
        li.style.display = li.textContent.toLowerCase().includes(query) ? '' : 'none';
      });
    });
  }

  // Notes functionality (notes.html)
  if (window.location.pathname.endsWith('notes.html')) {
    const notesKey = 'rust_notes_list';
    const notesListEl = document.getElementById('notes-list');
    const noteForm = document.getElementById('note-form');
    const noteDate = document.getElementById('note-date');
    const noteText = document.getElementById('note-text');
    const noteSearch = document.getElementById('note-search');

    function loadNotes(searchTxt = '') {
      notesListEl.innerHTML = '';
      const notes = JSON.parse(localStorage.getItem(notesKey) || '[]');
      notes
        .filter(note => note.text.toLowerCase().includes(searchTxt.toLowerCase()))
        .forEach((note, idx) => {
          const li = document.createElement('li');
          li.textContent = `${note.date}: ${note.text}`;
          // Delete button
          const delBtn = document.createElement('button');
          delBtn.textContent = 'Delete';
          delBtn.className = 'delete-btn';
          delBtn.onclick = () => {
            notes.splice(idx, 1);
            localStorage.setItem(notesKey, JSON.stringify(notes));
            loadNotes(noteSearch.value);
          };
          li.appendChild(delBtn);
          notesListEl.appendChild(li);
        });
    }
    noteForm.onsubmit = function(e) {
      e.preventDefault();
      const date = noteDate.value;
      const text = noteText.value;
      if (date && text) {
        const notes = JSON.parse(localStorage.getItem(notesKey) || '[]');
        notes.unshift({date, text});
        localStorage.setItem(notesKey, JSON.stringify(notes));
        loadNotes(noteSearch.value);
        noteForm.reset();
      }
    };
    noteSearch.oninput = function() {
      loadNotes(noteSearch.value);
    };
    loadNotes();
  }
});