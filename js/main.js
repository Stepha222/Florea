document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MENÚ MÓVIL
       ========================================= */

    const menuButton = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".main-nav");

    if (menuButton && nav) {

        menuButton.addEventListener("click", () => {

            const isOpen = nav.classList.toggle("is-open");

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });


        nav.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                nav.classList.remove("is-open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =========================================
       NOTICIAS
       ========================================= */

    loadNews();


    /* =========================================
       GALERÍA
       ========================================= */

    initGallery();

});



/* =========================================
   CARGAR NOTICIAS
   ========================================= */

async function loadNews() {

    const list = document.querySelector("#news-list");

    const status = document.querySelector("#news-status");

    if (!list) return;


    try {

        const response = await fetch("data/noticias.json");

        if (!response.ok) {

            throw new Error(
                "No se pudieron cargar las noticias."
            );

        }


        const news = await response.json();


        list.innerHTML = news.map((item) => `

            <article class="news-card">

                <div
                    class="news-image"
                    aria-hidden="true"
                >
                    ${item.icon}
                </div>

                <div class="news-content">

                    <span class="news-date">
                        ${item.date}
                    </span>

                    <h3>
                        ${item.title}
                    </h3>

                    <p>
                        ${item.excerpt}
                    </p>

                </div>

            </article>

        `).join("");


        if (status) {

            status.textContent =
                `${news.length} novedades`;

        }


    } catch (error) {

        list.innerHTML = `

            <article class="news-card">

                <div class="news-content">

                    <h3>
                        Un pequeño jardín digital
                    </h3>

                    <p>
                        No hemos podido cargar las novedades
                        en este momento. Inténtalo de nuevo
                        más tarde.
                    </p>

                </div>

            </article>

        `;


        if (status) {

            status.textContent =
                "Novedades no disponibles";

        }


        console.error(error);

    }

}



/* =========================================
   GALERÍA
   ========================================= */

function initGallery() {

    const galleryItems =
        document.querySelectorAll(".gallery-item");

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const modal =
        document.querySelector("#gallery-modal");

    const modalImage =
        document.querySelector(".modal-image");

    const modalCaption =
        document.querySelector(".modal-caption");

    const closeButton =
        document.querySelector(".modal-close");

    const previousButton =
        document.querySelector(".modal-prev");

    const nextButton =
        document.querySelector(".modal-next");


    /*
       Si no estamos en la página de galería,
       simplemente salimos.
    */

    if (!galleryItems.length || !modal) {
        return;
    }


    let currentIndex = 0;

    let visibleItems = Array.from(galleryItems);



    /* =========================================
       FILTROS
       ========================================= */

    filterButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const filter =
                button.dataset.filter;


            filterButtons.forEach((btn) => {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            visibleItems = [];


            galleryItems.forEach((item) => {

                const category =
                    item.dataset.category;


                if (
                    filter === "all" ||
                    category === filter
                ) {

                    item.style.display = "";

                    visibleItems.push(item);

                } else {

                    item.style.display = "none";

                }

            });

        });

    });



    /* =========================================
       ABRIR IMAGEN
       ========================================= */

    galleryItems.forEach((item) => {

        item.addEventListener("click", () => {

            visibleItems =
                Array.from(galleryItems)
                    .filter(
                        (galleryItem) =>
                            galleryItem.style.display !== "none"
                    );


            currentIndex =
                visibleItems.indexOf(item);


            openModal(item);

        });

    });



    /* =========================================
       FUNCIÓN PARA ABRIR MODAL
       ========================================= */

    function openModal(item) {

        const image =
            item.querySelector("img");


        modalImage.src =
            image.src;


        modalImage.alt =
            image.alt;


        const title =
            item.dataset.title;


        const description =
            item.dataset.description;


        modalCaption.innerHTML = `

            <strong>${title}</strong>

            <br>

            <span>${description}</span>

        `;


        modal.classList.add("is-open");


        document.body.style.overflow =
            "hidden";


        closeButton.focus();

    }



    /* =========================================
       CERRAR MODAL
       ========================================= */

    function closeModal() {

        modal.classList.remove("is-open");

        document.body.style.overflow =
            "";


        modalImage.src = "";

    }


    closeButton.addEventListener(
        "click",
        closeModal
    );



    /* =========================================
       RAMO ANTERIOR
       ========================================= */

    previousButton.addEventListener(
        "click",
        () => {

            if (!visibleItems.length) {
                return;
            }


            currentIndex--;

            if (currentIndex < 0) {

                currentIndex =
                    visibleItems.length - 1;

            }


            openModal(
                visibleItems[currentIndex]
            );

        }
    );



    /* =========================================
       RAMO SIGUIENTE
       ========================================= */

    nextButton.addEventListener(
        "click",
        () => {

            if (!visibleItems.length) {
                return;
            }


            currentIndex++;

            if (
                currentIndex >=
                visibleItems.length
            ) {

                currentIndex = 0;

            }


            openModal(
                visibleItems[currentIndex]
            );

        }
    );



    /* =========================================
       CERRAR AL PULSAR FUERA
       ========================================= */

    modal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === modal
            ) {

                closeModal();

            }

        }
    );



    /* =========================================
       TECLADO
       ========================================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                !modal.classList.contains(
                    "is-open"
                )
            ) {

                return;

            }


            if (event.key === "Escape") {

                closeModal();

            }


            if (
                event.key === "ArrowLeft"
            ) {

                previousButton.click();

            }


            if (
                event.key === "ArrowRight"
            ) {

                nextButton.click();

            }

        }
    );

}

