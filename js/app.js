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
        if (profileTag) profileTag.textContent = cleanUsername ? `@${cleanUsername}` : "";
        if (profileBio) profileBio.textContent = savedBio;

        // Renderizar Link, WhatsApp e Localização dinamicamente no perfil
        if (userDetailsBlock) {
            let elLink = document.getElementById("profileLinkDisplay");
            let elWp = document.getElementById("profileWpDisplay");
            let elLoc = document.getElementById("profileLocDisplay");

            // Exibir Link do Site
            if (savedUrlLink) {
                if (!elLink) {
                    elLink = document.createElement("a");
                    elLink.id = "profileLinkDisplay";
                    elLink.target = "_blank";
                    elLink.style.cssText = "display: block; color: #0066ff; text-decoration: none; font-size: 14px; font-weight: 600; margin-top: 4px;";
                    userDetailsBlock.appendChild(elLink);
                }
                const fullUrl = savedUrlLink.startsWith("http") ? savedUrlLink : `https://${savedUrlLink}`;
                elLink.href = fullUrl;
                elLink.textContent = `🔗 ${savedTitleLink || savedUrlLink}`;
            } else if (elLink) {
                elLink.remove();
            }

            // Exibir WhatsApp Clicável
            if (savedWhatsapp) {
                if (!elWp) {
                    elWp = document.createElement("a");
                    elWp.id = "profileWpDisplay";
                    elWp.target = "_blank";
                    elWp.style.cssText = "display: block; color: #0066ff; text-decoration: none; font-size: 14px; font-weight: 600; margin-top: 4px;";
                    userDetailsBlock.appendChild(elWp);
                }
                const cleanWp = savedWhatsapp.replace(/\D/g, "");
                elWp.href = `https://wa.me/55${cleanWp}`;
                elWp.textContent = `💬 ${savedWhatsapp}`;
            } else if (elWp) {
                elWp.remove();
            }

            // Exibir Localização
            if (savedLocalizacao) {
                if (!elLoc) {
                    elLoc = document.createElement("p");
                    elLoc.id = "profileLocDisplay";
                    elLoc.style.cssText = "color: #8e8e93; font-size: 13px; margin-top: 2px;";
                    userDetailsBlock.appendChild(elLoc);
                }
                elLoc.textContent = `📍 ${savedLocalizacao}`;
            } else if (elLoc) {
                elLoc.remove();
            }
        }
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
            const newUsername = editUsername.value.trim().replace("@", "").toLowerCase();
            const newBio = editBio.value.trim();

            localStorage.setItem("koneat_name", newName);
            localStorage.setItem("koneat_username", newUsername);
            localStorage.setItem("koneat_bio", newBio);
            if (editBirth) localStorage.setItem("koneat_birth", editBirth.value.trim());
            if (editGender) localStorage.setItem("koneat_gender", editGender.value.trim());

            window.location.href = "./passo1.html";
        });
    }

    // 6. Controle das Opções do Rodapé (Contato, Link, Localização)
    const modalContato = document.getElementById("modalContato");
    const modalLink = document.getElementById("modalLink");
    const modalLocal = document.getElementById("modalLocal");

    const updateCounts = () => {
        const hasContato = localStorage.getItem("koneat_whatsapp");
        const hasLink = localStorage.getItem("koneat_url_link");
        const hasLocal = localStorage.getItem("koneat_localizacao");

        const countContato = document.getElementById("countContato");
        const countLink = document.getElementById("countLink");
        const countLocal = document.getElementById("countLocal");

        if (countContato) countContato.textContent = hasContato ? "1" : "0";
        if (countLink) countLink.textContent = hasLink ? "1" : "0";
        if (countLocal) countLocal.textContent = hasLocal ? "1" : "0";
    };

    updateCounts();

    document.getElementById("btnOpenContato")?.addEventListener("click", () => {
        const inputWp = document.getElementById("inputWhatsapp");
        if (inputWp) inputWp.value = localStorage.getItem("koneat_whatsapp") || "";
        modalContato?.classList.add("show");
    });

    document.getElementById("btnOpenLink")?.addEventListener("click", () => {
        const inputUrl = document.getElementById("inputUrlLink");
        const inputTitle = document.getElementById("inputTitleLink");
        if (inputUrl) inputUrl.value = localStorage.getItem("koneat_url_link") || "";
        if (inputTitle) inputTitle.value = localStorage.getItem("koneat_title_link") || "";
        modalLink?.classList.add("show");
    });

    document.getElementById("btnOpenLocal")?.addEventListener("click", () => {
        const inputLoc = document.getElementById("inputLocalizacao");
        if (inputLoc) inputLoc.value = localStorage.getItem("koneat_localizacao") || "";
        modalLocal?.classList.add("show");
    });

    document.getElementById("btnOpenConfig")?.addEventListener("click", () => {
        window.location.href = "./configuracoes.html";
    });

    document.querySelectorAll(".close-modal, .modal-overlay").forEach(el => {
        el.addEventListener("click", (e) => {
            if (e.target === el || el.classList.contains("close-modal")) {
                document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("show"));
            }
        });
    });

    document.getElementById("btnSaveContato")?.addEventListener("click", () => {
        const inputWp = document.getElementById("inputWhatsapp");
        localStorage.setItem("koneat_whatsapp", inputWp ? inputWp.value.trim() : "");
        modalContato?.classList.remove("show");
        updateCounts();
    });

    document.getElementById("btnSaveLink")?.addEventListener("click", () => {
        const inputUrl = document.getElementById("inputUrlLink");
        const inputTitle = document.getElementById("inputTitleLink");
        localStorage.setItem("koneat_url_link", inputUrl ? inputUrl.value.trim() : "");
        localStorage.setItem("koneat_title_link", inputTitle ? inputTitle.value.trim() : "");
        modalLink?.classList.remove("show");
        updateCounts();
    });

    document.getElementById("btnSaveLocal")?.addEventListener("click", () => {
        const inputLoc = document.getElementById("inputLocalizacao");
        localStorage.setItem("koneat_localizacao", inputLoc ? inputLoc.value.trim() : "");
        modalLocal?.classList.remove("show");
        updateCounts();
    });

    // 7. Lógica da Tela de Configurações (Notificações, Conta Privada e Idioma)
    const toggleNotif = document.getElementById("toggleNotif");
    const togglePrivate = document.getElementById("togglePrivate");
    const subtitlePrivate = document.getElementById("subtitlePrivate");
    const saveConfigBtn = document.getElementById("saveConfigBtn");

    // Elementos do Modal de Idioma
    const btnOpenIdioma = document.getElementById("btnOpenIdioma");
    const modalIdioma = document.getElementById("modalIdioma");
    const subtitleIdioma = document.getElementById("subtitleIdioma");
    const langRadios = document.querySelectorAll('input[name="app_language"]');

    if (toggleNotif && togglePrivate) {
        const savedNotif = localStorage.getItem("koneat_notif_enabled");
        toggleNotif.checked = savedNotif === null ? true : (savedNotif === "true");

        const savedPrivate = localStorage.getItem("koneat_private_account");
        const isPrivate = savedPrivate === "true";
        togglePrivate.checked = isPrivate;
        
        if (subtitlePrivate) {
            subtitlePrivate.textContent = isPrivate ? "Privada" : "Pública";
        }

        togglePrivate.addEventListener("change", () => {
            if (subtitlePrivate) {
                subtitlePrivate.textContent = togglePrivate.checked ? "Privada" : "Pública";
            }
        });
    }

    // Carregar idioma salvo
    const savedLang = localStorage.getItem("koneat_language") || "Português (Brasil)";
    if (subtitleIdioma) subtitleIdioma.textContent = savedLang;
    langRadios.forEach(radio => {
        if (radio.value === savedLang) radio.checked = true;
    });

    // Abrir Modal de Idioma ao clicar no card
    btnOpenIdioma?.addEventListener("click", () => {
        modalIdioma?.classList.add("show");
    });

    // Fechar modal ao clicar fora dele
    modalIdioma?.addEventListener("click", (e) => {
        if (e.target === modalIdioma) {
            modalIdioma.classList.remove("show");
        }
    });

    // Selecionar idioma
    langRadios.forEach(radio => {
        radio.addEventListener("change", (e) => {
            const chosenLang = e.target.value;
            localStorage.setItem("koneat_language", chosenLang);
            if (subtitleIdioma) subtitleIdioma.textContent = chosenLang;
            setTimeout(() => {
                modalIdioma?.classList.remove("show");
            }, 250);
        });
    });

    if (saveConfigBtn) {
        saveConfigBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (toggleNotif) {
                localStorage.setItem("koneat_notif_enabled", toggleNotif.checked);
            }
            if (togglePrivate) {
                localStorage.setItem("koneat_private_account", togglePrivate.checked);
            }
            window.location.href = "./passo1.html";
        });
    }
});
