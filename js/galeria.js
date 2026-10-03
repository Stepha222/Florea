document.addEventListener("DOMContentLoaded", () => {
    const galleryItems = [...document.querySelectorAll(".gallery-item")];
    const filterButtons = [...document.querySelectorAll(".filter-btn")];

    const modal = document.querySelector("#gallery-modal");
    const modalImage = document.querySelector(".modal-image");
    const modalCaption = document.querySelector(".modal-caption");
    const modalClose = document.querySelector(".modal-close");
    const modalPrev = document.querySelector(".modal-prev");
    const modalNext = document.querySelector(".modal-next");

    let visibleItems = [...galleryItems];
    let currentIndex = 0;

    // ==============================
    // FILTROS
    // ==============================

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            filterButtons.forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            const filter = button.dataset.filter;

            visibleItems = galleryItems.filter((item) => {
                return filter === "all" || item.dataset.category === filter;
            });

            galleryItems.forEach((item) => {
                const shouldShow =
                    filter === "all" ||
                    item.dataset.category === filter;

                item.style.display = shouldShow ? "" : "none";
            });
        });
    });

    // ==============================
    // ABRIR MODAL
    // ==============================

    galleryItems.forEach((item) => {
        item.addEventListener("click", () => {
            visibleItems = galleryItems.filter(
                (galleryItem) => galleryItem.style.display !== "none"
            );

            currentIndex = visibleItems.indexOf(item);

            if (currentIndex === -1) {
                currentIndex = 0;
            }

            openModal();
        });
    });

    function openModal() {
        const item = visibleItems[currentIndex];

        if (!item) return;

        const image = item.querySelector("img");

        modalImage.src = image.src;
        modalImage.alt = image.alt;

        modalCaption.innerHTML = `
            <strong>${item.dataset.title}</strong>
            <br>
            <span>${item.dataset.description}</span>
        `;

        modal.classList.add("is-open");
        document.body.style.overflow = "hidden";

        modalClose.focus();
    }

    // ==============================
    // CERRAR MODAL
    // ==============================

    function closeModal() {
        modal.classList.remove("is-open");
        document.body.style.overflow = "";
    }

    modalClose.addEventListener("click", closeModal);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // ==============================
    // SIGUIENTE RAMO
    // ==============================

    modalNext.addEventListener("click", () => {
        if (visibleItems.length === 0) return;

        currentIndex =
            (currentIndex + 1) % visibleItems.length;

        openModal();
    });

    // ==============================
    // RAMO ANTERIOR
    // ==============================

    modalPrev.addEventListener("click", () => {
        if (visibleItems.length === 0) return;

        currentIndex =
            (currentIndex - 1 + visibleItems.length) %
            visibleItems.length;

        openModal();
    });

    // ==============================
    // TECLADO
    // ==============================

    document.addEventListener("keydown", (event) => {
        if (!modal.classList.contains("is-open")) return;

        if (event.key === "Escape") {
            closeModal();
        }

        if (event.key === "ArrowRight") {
            modalNext.click();
        }

        if (event.key === "ArrowLeft") {
            modalPrev.click();
        }
    });
});