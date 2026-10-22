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
    const headerUsername = document.getElementById("headerUsername");

    if (profileName || profileTag || profileBio || headerUsername) {
        const savedName = localStorage.getItem("koneat_name") || "";
        const rawUsername = localStorage.getItem("koneat_username") || "";
        const cleanUsername = rawUsername.replace("@", "").trim().toLowerCase(); // Forçar letras minúsculas
        const savedBio = localStorage.getItem("koneat_bio") || "";

        if (headerUsername) headerUsername.textContent = cleanUsername; // Nome de usuário no topo esquerdo
        if (profileName) profileName.textContent = savedName;
        if (profileTag) profileTag.textContent = cleanUsername ? `@${cleanUsername}` : "";
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
        editUsername.value = (localStorage.getItem("kone_username") || localStorage.getItem("koneat_username") || "").toLowerCase();
        editBio.value = localStorage.getItem("koneat_bio") || "";
        if (editBirth) editBirth.value = localStorage.getItem("koneat_birth") || "";
        if (editGender) editGender.value = localStorage.getItem("koneat_gender") || "";
    }

    if (saveBtn) {
        saveBtn.addEventListener("click", (e) => {
            e.preventDefault();

            const newName = editName.value.trim();
            const newUsername = editUsername.value.trim().replace("@", "").toLowerCase(); // Salva sempre em minúsculas
            const newBio = editBio.value.trim();

            localStorage.setItem("koneat_name", newName);
            localStorage.setItem("koneat_username", newUsername);
            localStorage.setItem("koneat_bio", newBio);
            if (editBirth) localStorage.setItem("koneat_birth", editBirth.value.trim());
            if (editGender) localStorage.setItem("koneat_gender", editGender.value.trim());

            window.location.href = "passo1.html";
        });
    }

    // 6. Controle das 4 Opções do Rodapé (Contato, Link, Localização e Configurações)
    const modalContato = document.getElementById("modalContato");
    const modalLink = document.getElementById("modalLink");
    const modalLocal = document.getElementById("modalLocal");

    const countContato = document.getElementById("countContato");
    const countLink = document.getElementById("countLink");
    const countLocal = document.getElementById("countLocal");

    // Atualizar Contadores Iniciais baseados no localStorage
    const updateCounts = () => {
        const hasContato = (localStorage.getItem("koneat_whatsapp") || localStorage.getItem("koneat_email_contato"));
        const hasLink = localStorage.getItem("koneat_url_link");
        const hasLocal = localStorage.getItem("koneat_localizacao");

        if (countContato) countContato.textContent = hasContato ? "1" : "0";
        if (countLink) countLink.textContent = hasLink ? "1" : "0";
        if (countLocal) countLocal.textContent = hasLocal ? "1" : "0";
    };

    updateCounts();

    // Abrir Modal Contato
    document.getElementById("btnOpenContato")?.addEventListener("click", () => {
        const inputWp = document.getElementById("inputWhatsapp");
        const inputEmail = document.getElementById("inputEmailContato");
        if (inputWp) inputWp.value = localStorage.getItem("koneat_whatsapp") || "";
        if (inputEmail) inputEmail.value = localStorage.getItem("koneat_email_contato") || "";
        modalContato?.classList.add("show");
    });

    // Abrir Modal Link
    document.getElementById("btnOpenLink")?.addEventListener("click", () => {
        const inputUrl = document.getElementById("inputUrlLink");
        const inputTitle = document.getElementById("inputTitleLink");
        if (inputUrl) inputUrl.value = localStorage.getItem("koneat_url_link") || "";
        if (inputTitle) inputTitle.value = localStorage.getItem("koneat_title_link") || "";
        modalLink?.classList.add("show");
    });

    // Abrir Modal Localização
    document.getElementById("btnOpenLocal")?.addEventListener("click", () => {
        const inputLoc = document.getElementById("inputLocalizacao");
        if (inputLoc) inputLoc.value = localStorage.getItem("koneat_localizacao") || "";
        modalLocal?.classList.add("show");
    });

    // Abrir Configurações de informações pessoais
    document.getElementById("btnOpenConfig")?.addEventListener("click", () => {
        window.location.href = "configuracoes.html";
    });

    // Fechar Modais (ao clicar no X ou fora da janela deslizante)
    document.querySelectorAll(".close-modal, .modal-overlay").forEach(el => {
        el.addEventListener("click", (e) => {
            if (e.target === el || el.classList.contains("close-modal")) {
                document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("show"));
            }
        });
    });

    // Salvar Contato (Permite limpar e salvar em branco)
    document.getElementById("btnSaveContato")?.addEventListener("click", () => {
        const inputWp = document.getElementById("inputWhatsapp");
        const inputEmail = document.getElementById("inputEmailContato");
        localStorage.setItem("koneat_whatsapp", inputWp ? inputWp.value.trim() : "");
        localStorage.setItem("koneat_email_contato", inputEmail ? inputEmail.value.trim() : "");
        modalContato?.classList.remove("show");
        updateCounts();
    });

    // Salvar Link (Permite limpar e salvar em branco)
    document.getElementById("btnSaveLink")?.addEventListener("click", () => {
        const inputUrl = document.getElementById("inputUrlLink");
        const inputTitle = document.getElementById("inputTitleLink");
        localStorage.setItem("koneat_url_link", inputUrl ? inputUrl.value.trim() : "");
        localStorage.setItem("koneat_title_link", inputTitle ? inputTitle.value.trim() : "");
        modalLink?.classList.remove("show");
        updateCounts();
    });

    // Salvar Localização (Permite limpar e salvar em branco)
    document.getElementById("btnSaveLocal")?.addEventListener("click", () => {
        const inputLoc = document.getElementById("inputLocalizacao");
        localStorage.setItem("koneat_localizacao", inputLoc ? inputLoc.value.trim() : "");
        modalLocal?.classList.remove("show");
        updateCounts();
    });
});
                                 
