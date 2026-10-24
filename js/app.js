document.addEventListener('DOMContentLoaded', () => {
    // 1. Mostrar/Ocultar Senha (Login) - Com proteção contra travamento
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

        if (userDetailsBlock) {
            let elLink = document.getElementById("profileLinkDisplay");
            let elWp = document.getElementById("profileWpDisplay");
            let elLoc = document.getElementById("profileLocDisplay");

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

    // 5. Renderização Automática do Perfil ao Abrir
    const postsGrid = document.getElementById('userPostsGrid');
    const emptyState = document.getElementById('emptyState');
    if (postsGrid || emptyState) {
        renderUserPosts();
    }
});

// Função Global para Renderizar o Grid de Posts do Perfil
function renderUserPosts() {
    const userPosts = JSON.parse(localStorage.getItem('koneat_user_posts') || '[]');
    const postsGrid = document.getElementById('userPostsGrid');
    const emptyState = document.getElementById('emptyState');
    const postsCount = document.getElementById('postsCount');
    const createPostBtn = document.getElementById('createPostBtn');

    if (postsCount) postsCount.textContent = userPosts.length;

    if (createPostBtn) {
        if (userPosts.length === 0) {
            createPostBtn.textContent = 'Crie seu primeiro post';
        } else {
            createPostBtn.textContent = 'Criar outro post';
        }
    }

    if (!postsGrid || !emptyState) return;

    if (userPosts.length === 0) {
        emptyState.style.display = 'flex';
        postsGrid.style.display = 'none';
        postsGrid.innerHTML = '';
    } else {
        emptyState.style.display = 'none';
        postsGrid.style.display = 'grid';

        postsGrid.innerHTML = userPosts.map(post => {
            const isVideo = post.type === 'video';
            return `
                <div class="post-grid-item" data-id="${post.id}">
                    <button type="button" class="btn-delete-post" onclick="deletePost('${post.id}')" title="Excluir publicação">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>

                    ${isVideo ? 
                        `<video src="${post.url}"></video>
                         <div class="badge-video">
                             <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                         </div>` 
                        : `<img src="${post.url}" alt="Post">`
                    }
                </div>`;
        }).join('');
    }
}

// Função Global para Deletar Post via Lixeira (🗑️)
function deletePost(postId) {
    if (!confirm('Deseja realmente excluir esta publicação?')) return;

    let userPosts = JSON.parse(localStorage.getItem('koneat_user_posts') || '[]');
    userPosts = userPosts.filter(p => p.id !== postId);
    localStorage.setItem('koneat_user_posts', JSON.stringify(userPosts));

    let viraisFeed = JSON.parse(localStorage.getItem('koneat_virais_feed') || '[]');
    viraisFeed = viraisFeed.filter(v => v.id !== postId);
    localStorage.setItem('koneat_virais_feed', JSON.stringify(viraisFeed));

    renderUserPosts();
}
