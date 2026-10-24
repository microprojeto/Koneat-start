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

    // 3. Alternar linha entre as abas do perfil (Todos / Reposts / Marcações)
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
    const userDetailsBlock = document.querySelector(".user-details-block");

    if (profileName || profileTag || profileBio || headerUsername) {
        const savedName = localStorage.getItem("koneat_name") || "";
        const rawUsername = localStorage.getItem("koneat_username") || "";
        const cleanUsername = rawUsername.replace("@", "").trim().toLowerCase();
        const savedBio = localStorage.getItem("koneat_bio") || "";
        const savedUrlLink = localStorage.getItem("koneat_url_link") || "";
        const savedTitleLink = localStorage.getItem("koneat_title_link") || "";
        const savedLocalizacao = localStorage.getItem("koneat_localizacao") || "";
        const savedWhatsapp = localStorage.getItem("koneat_whatsapp") || "";
        const isPrivateAccount = localStorage.getItem("koneat_private_account") === "true";

        if (headerUsername) {
            headerUsername.textContent = cleanUsername + (isPrivateAccount ? " 🔒" : "");
        }
        if (profileName) profileName.textContent = savedName;
        if (profileTag) profi
