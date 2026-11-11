(() => {
  const WHATSAPP_NUMBER = "5513981143431";
  const EMAIL_DESTINO = "carmen.licere@yahoo.com.br";

  // 1. Menu mobile acessível + cabeçalho com sombra ao rolar
  const header = document.getElementById("header");
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");

  if (toggle && nav) {
    const setMenu = (open) => {
      nav.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    };

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.contains("open");
      setMenu(!isOpen);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("open")) {
        setMenu(false);
        toggle.focus();
      }
    });

    document.addEventListener("click", (event) => {
      if (nav.classList.contains("open") && !nav.contains(event.target) && !toggle.contains(event.target)) {
        setMenu(false);
      }
    });
  }

  const syncHeaderScroll = () => {
    if (!header) return;
    const isScrolled = header.classList.contains("scrolled");
    if (!isScrolled && window.scrollY > 24) {
      header.classList.add("scrolled");
    } else if (isScrolled && window.scrollY < 6) {
      header.classList.remove("scrolled");
    }
  };
  syncHeaderScroll();
  window.addEventListener("scroll", syncHeaderScroll, { passive: true });

  // 2. Sistema reutilizável de Abas (Tabs)
  const tabContainers = document.querySelectorAll("[data-tabs]");
  tabContainers.forEach((container) => {
    const buttons = Array.from(container.querySelectorAll("[role='tab']"));
    const panels = Array.from(container.querySelectorAll("[role='tabpanel']"));

    const activateTab = (targetName) => {
      buttons.forEach((btn) => {
        const match = btn.dataset.tab === targetName;
        btn.classList.toggle("active", match);
        btn.setAttribute("aria-selected", match ? "true" : "false");
      });
      panels.forEach((panel) => {
        const match = panel.dataset.panel === targetName;
        panel.hidden = !match;
      });
    };

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        activateTab(btn.dataset.tab);
      });
    });

    // Suporte para abrir aba via URL (?aba=trabalhe ou #trabalhe)
    if (container.id === "contactTabs") {
      const params = new URLSearchParams(window.location.search);
      const urlTab = params.get("aba") || window.location.hash.replace("#", "");
      if (urlTab === "trabalhe") {
        activateTab("trabalhe");
      }
    }
  });

  // 3. Filtro de categorias na Galeria
  const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
  const galleryCards = Array.from(document.querySelectorAll(".gallery-card[data-category]"));
  const galleryCount = document.getElementById("galleryCount");

  if (filterButtons.length && galleryCards.length) {
    const updateCount = (visibleCount, totalCount) => {
      if (!galleryCount) return;
      galleryCount.textContent = `Exibindo ${visibleCount} de ${totalCount} fotos reais dos eventos e treinamentos da Licere`;
    };

    const applyFilter = (category) => {
      let visible = 0;
      galleryCards.forEach((card) => {
        const show = category === "todos" || card.dataset.category === category;
        card.hidden = !show;
        if (show) visible += 1;
      });
      filterButtons.forEach((btn) => {
        const active = btn.dataset.filter === category;
        btn.classList.toggle("active", active);
        btn.setAttribute("aria-pressed", active ? "true" : "false");
      });
      updateCount(visible, galleryCards.length);
    };

    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => applyFilter(btn.dataset.filter));
    });

    const params = new URLSearchParams(window.location.search);
    const initialCat = params.get("categoria");
    if (initialCat && filterButtons.some((b) => b.dataset.filter === initialCat)) {
      applyFilter(initialCat);
    } else {
      updateCount(galleryCards.length, galleryCards.length);
    }
  }

  // 4. Lightbox acessível para visualização ampliada de fotos
  const lightbox = document.getElementById("lightbox");
  const triggers = Array.from(document.querySelectorAll("[data-lightbox]"));

  if (lightbox && triggers.length) {
    const lbImg = document.getElementById("lightboxImg");
    const lbCaption = document.getElementById("lightboxCaption");
    const lbCat = document.getElementById("lightboxCategory");
    const lbClose = document.getElementById("lightboxClose");
    const lbPrev = document.getElementById("lightboxPrev");
    const lbNext = document.getElementById("lightboxNext");
    let currentList = [];
    let currentIndex = 0;
    let lastFocused = null;

    const getVisibleTriggers = () =>
      triggers.filter((btn) => {
        const parentCard = btn.closest(".gallery-card");
        return !parentCard || !parentCard.hidden;
      });

    const renderLightbox = () => {
      const item = currentList[currentIndex];
      if (!item) return;
      const imgEl = item.querySelector("img");
      lbImg.src = item.dataset.src || (imgEl ? imgEl.src : "");
      lbImg.alt = item.dataset.alt || (imgEl ? imgEl.alt : "");
      lbCaption.textContent = item.dataset.caption || lbImg.alt;
      if (lbCat) {
        lbCat.textContent = item.dataset.catLabel || "Licere Recreação e Lazer";
      }
    };

    const openLightbox = (trigger) => {
      lastFocused = trigger;
      currentList = getVisibleTriggers();
      currentIndex = Math.max(0, currentList.indexOf(trigger));
      renderLightbox();
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
      if (lbClose) lbClose.focus();
    };

    const closeLightbox = () => {
      lightbox.hidden = true;
      lbImg.removeAttribute("src");
      lbImg.alt = "";
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    };

    const step = (delta) => {
      if (!currentList.length) return;
      currentIndex = (currentIndex + delta + currentList.length) % currentList.length;
      renderLightbox();
    };

    triggers.forEach((btn) => {
      btn.addEventListener("click", () => openLightbox(btn));
    });

    if (lbClose) lbClose.addEventListener("click", closeLightbox);
    if (lbPrev) lbPrev.addEventListener("click", () => step(-1));
    if (lbNext) lbNext.addEventListener("click", () => step(1));

    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (event) => {
      if (lightbox.hidden) return;
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "ArrowRight") step(1);
    });
  }

  // 5. Formulário de Orçamento / Inscrição em Cursos
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(contactForm);
      const nome = (data.get("nome") || "").toString().trim();
      const email = (data.get("email") || "").toString().trim();
      const telefone = (data.get("telefone") || "").toString().trim();
      const tipo = (data.get("tipo") || "").toString().trim();
      const cidade = (data.get("cidade") || "").toString().trim();
      const dataPrevista = (data.get("data") || "").toString().trim();
      const publico = (data.get("publico") || "").toString().trim();
      const mensagem = (data.get("mensagem") || "").toString().trim();

      const texto = [
        "Olá Carmen! Solicitação enviada pelo site da Licere Recreação:",
        `• Nome: ${nome}`,
        `• E-mail: ${email}`,
        `• Telefone/WhatsApp: ${telefone}`,
        `• Interesse: ${tipo}`,
        cidade ? `• Cidade/Local: ${cidade}` : "",
        dataPrevista ? `• Data prevista: ${dataPrevista}` : "",
        publico ? `• Público estimado: ${publico}` : "",
        mensagem ? `• Detalhes: ${mensagem}` : ""
      ].filter(Boolean).join("\n");

      const okBox = document.getElementById("formOk");
      const summary = document.getElementById("formSummary");
      const waLink = document.getElementById("formWaLink");
      const mailLink = document.getElementById("formMailLink");

      if (summary) {
        summary.textContent = `Tudo pronto, ${nome}! Clique abaixo para encaminhar seu pedido diretamente para Carmen L. Menezes no WhatsApp ou por e-mail.`;
      }
      if (waLink) {
        waLink.href = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(texto)}`;
      }
      if (mailLink) {
        mailLink.href = `mailto:${EMAIL_DESTINO}?subject=${encodeURIComponent(`Orçamento Licere - ${tipo}`)}&body=${encodeURIComponent(texto)}`;
      }
      if (okBox) {
        okBox.hidden = false;
        okBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  }

  // 6. Formulário "Trabalhe na Licere" (Banco de Talentos)
  const talentForm = document.getElementById("talentForm");
  if (talentForm) {
    talentForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(talentForm);
      const disp = data.getAll("disponibilidade").join(", ");
      const nome = (data.get("nome") || "").toString().trim();
      const idade = (data.get("idade") || "").toString().trim();
      const cidade = (data.get("cidade") || "").toString().trim();
      const whatsapp = (data.get("whatsapp") || "").toString().trim();
      const email = (data.get("email") || "").toString().trim();
      const formacao = (data.get("formacao") || "").toString().trim();
      const viajar = (data.get("viajar") || "").toString().trim();
      const nadar = (data.get("nadar") || "").toString().trim();
      const pintura = (data.get("pintura") || "").toString().trim();
      const baloes = (data.get("baloes") || "").toString().trim();
      const experiencia = (data.get("experiencia") || "").toString().trim();

      const texto = [
        "Olá Carmen! Cadastro no Trabalhe na Licere:",
        `• Nome: ${nome}${idade ? ` (${idade} anos)` : ""}`,
        `• Cidade/Bairro: ${cidade}`,
        `• WhatsApp: ${whatsapp} | E-mail: ${email}`,
        `• Formação / Curso: ${formacao}`,
        disp ? `• Disponibilidade: ${disp}` : "",
        `• Disponibilidade para viajar: ${viajar}`,
        `• Sabe nadar: ${nadar} | Pintura facial: ${pintura} | Escultura c/ balões: ${baloes}`,
        experiencia ? `• Experiência / Idiomas: ${experiencia}` : ""
      ].filter(Boolean).join("\n");

      const okBox = document.getElementById("talentOk");
      const summary = document.getElementById("talentSummary");
      const waLink = document.getElementById("talentWaLink");
      const mailLink = document.getElementById("talentMailLink");

      if (summary) {
        summary.textContent = `Cadastro preenchido com sucesso, ${nome}! Envie agora seus dados para a seleção da equipe Licere via WhatsApp ou E-mail.`;
      }
      if (waLink) {
        waLink.href = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(texto)}`;
      }
      if (mailLink) {
        mailLink.href = `mailto:${EMAIL_DESTINO}?subject=${encodeURIComponent(`Trabalhe na Licere - ${nome}`)}&body=${encodeURIComponent(texto)}`;
      }
      if (okBox) {
        okBox.hidden = false;
        okBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  }
})();
