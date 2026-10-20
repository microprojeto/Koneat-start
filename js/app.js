document.addEventListener('DOMContentLoaded', () => {
    // 1. Mostrar/Ocultar Senha (Login)
    const togglePasswordBtn = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');

    if (togglePasswordBtn && passwordInput && eyeIcon) {
        togglePasswordBtn.addEventListener('click', () => {
            const isPassword = passwordInput.getAttribute('type') === 'password';
            passwordInput.setAttribute('type', isPassword ? 'text' : 'password');

            if (isPassword) {
                eyeIcon.innerHTML = `
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                `;
            } else {
                eyeIcon.innerHTML = `
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                `;
            }
        });
    }

    // 2. Menu de 3 Pontinhos (Perfil)
    const menuBtn = document.getElementById('menuBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');

    if (menuBtn && dropdownMenu) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });

        document.addEventListener('click', () => {
            dropdownMenu.classList.remove('show');
        });
    }

    // 3. Alternar linha preta entre as abas do perfil (Todos / Reposts / Marcações)
    const tabBtns = document.querySelectorAll('.tab-btn');
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    // 4. Carregar Dados de Perfil Dinâmicos no passo1.html (localStorage)
    const profileName = document.getElementById("profileName");
    const profileTag = document.getElementById("profileTag");
    const profileBio = document.getElementById("profileBio");

    if (profileName || profileTag || profileBio) {
        const savedName = localStorage.getItem("koneat_name") || "";
        const savedUsername = localStorage.getItem("koneat_username") || "";
        const savedBio = localStorage.getItem("koneat_bio") || "";

        if (profileName) profileName.textContent = savedName;
        if (profileTag) profileTag.textContent = savedUsername ? `@${savedUsername.replace("@", "")}` : "";
        if (profileBio) profileBio.textContent = savedBio;
    }

    // 5. Lógica da Tela de Editar Perfil (editar-perfil.html)
    const editName = document.getElementById("editName");
    const editUsername = document.getElementById("editUsername");
    const editBio = document.getElementById("editBio");
    const editBirth = document.getElementById("editBirth");
    const editGender = document.getElementById("editGender");
    const saveBtn = document.getElementById("saveProfileBtn");

    if (editName && editUsername && editBio) {
        editName.value = localStorage.getItem("koneat_name") || "";
        editUsername.value = localStorage.getItem("kone_username") || localStorage.getItem("koneat_username") || "";
        editBio.value = localStorage.getItem("koneat_bio") || "";
        if (editBirth) editBirth.value = localStorage.getItem("koneat_birth") || "";
        if (editGender) editGender.value = localStorage.getItem("koneat_gender") || "";
    }

    if (saveBtn) {
        saveBtn.addEventListener("click", (e) => {
            e.preventDefault();

            const newName = editName.value.trim();
            const newUsername = editUsername.value.trim().replace("@", "");
            const newBio = editBio.value.trim();

            // Trava removida com sucesso! Agora salva mesmo se estiver vazio.

            localStorage.setItem("koneat_name", newName);
            localStorage.setItem("koneat_username", newUsername);
            localStorage.setItem("koneat_bio", newBio);
            if (editBirth) localStorage.setItem("koneat_birth", editBirth.value.trim());
            if (editGender) localStorage.setItem("koneat_gender", editGender.value.trim());

            window.location.href = "passo1.html";
        });
    }
});
