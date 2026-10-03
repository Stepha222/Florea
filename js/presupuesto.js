document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("#budget-form");

    if (!form) return;

    const totalElement = document.querySelector("#total-price");
    const feedback = document.querySelector("#form-feedback");

    const deadline = document.querySelector("#deadline");

    const nameField = document.querySelector("#name");
    const surnameField = document.querySelector("#surname");
    const phoneField = document.querySelector("#phone");
    const emailField = document.querySelector("#email");
    const privacyField = document.querySelector("#privacy");


    /* =========================================
       DESCUENTOS
       ========================================= */

    function getDiscount(days) {

        if (days >= 14) return 0.15;

        if (days >= 10) return 0.10;

        if (days >= 7) return 0.05;

        return 0;
    }


    /* =========================================
       CALCULAR PRECIO
       ========================================= */

    function updateTotal() {

        const product = Number(
            form.querySelector(
                'input[name="product"]:checked'
            )?.value || 0
        );


        const extras = [
            ...form.querySelectorAll(
                'input[name="extra"]:checked'
            )
        ].reduce(
            (sum, checkbox) =>
                sum + Number(checkbox.value),
            0
        );


        const days =
            Math.max(
                0,
                Number(deadline.value) || 0
            );


        const subtotal =
            product + extras;


        const discount =
            subtotal * getDiscount(days);


        const total =
            Math.max(
                0,
                Math.round(subtotal - discount)
            );


        totalElement.textContent =
            `${total} €`;
    }


    /* =========================================
       MOSTRAR ERRORES
       ========================================= */

    function setError(id, message) {

        const element =
            document.querySelector(
                `#${id}-error`
            );


        if (element) {

            element.textContent =
                message;

        }
    }


    /* =========================================
       VALIDAR NOMBRE
       ========================================= */

    function validateName() {

        const value =
            nameField.value.trim();


        const valid =
            /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:[ '-][A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/.test(value)
            &&
            value.length >= 3
            &&
            value.length <= 15;


        setError(
            "name",
            valid
                ? ""
                : "Introduce un nombre de 3 a 15 letras."
        );


        return valid;
    }


    /* =========================================
       VALIDAR APELLIDOS
       ========================================= */

    function validateSurname() {

        const value =
            surnameField.value.trim();


        const valid =
            /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:[ '-][A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/.test(value)
            &&
            value.length >= 4
            &&
            value.length <= 40;


        setError(
            "surname",
            valid
                ? ""
                : "Introduce apellidos de 4 a 40 letras."
        );


        return valid;
    }


    /* =========================================
       VALIDAR TELÉFONO
       ========================================= */

    function validatePhone() {

        const valid =
            /^\d{9}$/.test(
                phoneField.value.trim()
            );


        setError(
            "phone",
            valid
                ? ""
                : "El teléfono debe contener exactamente 9 números."
        );


        return valid;
    }


    /* =========================================
       VALIDAR EMAIL
       ========================================= */

    function validateEmail() {

        const valid =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                emailField.value.trim()
            );


        setError(
            "email",
            valid
                ? ""
                : "Introduce un correo electrónico válido."
        );


        return valid;
    }


    /* =========================================
       VALIDAR PLAZO
       ========================================= */

    function validateDeadline() {

        const value =
            Number(deadline.value);


        const valid =
            Number.isInteger(value)
            &&
            value >= 0;


        setError(
            "deadline",
            valid
                ? ""
                : "El plazo debe ser un número entero igual o superior a 0."
        );


        return valid;
    }


    /* =========================================
       VALIDAR PRIVACIDAD
       ========================================= */

    function validatePrivacy() {

        const valid =
            privacyField.checked;


        setError(
            "privacy",
            valid
                ? ""
                : "Debes aceptar las condiciones de privacidad."
        );


        return valid;
    }


    /* =========================================
       EVENTOS DE LOS CAMPOS
       ========================================= */

    nameField.addEventListener(
        "input",
        validateName
    );


    surnameField.addEventListener(
        "input",
        validateSurname
    );


    phoneField.addEventListener(
        "input",
        validatePhone
    );


    emailField.addEventListener(
        "input",
        validateEmail
    );


    deadline.addEventListener(
        "input",
        () => {

            validateDeadline();

            updateTotal();

        }
    );


    privacyField.addEventListener(
        "change",
        validatePrivacy
    );


    /* =========================================
       PRODUCTOS Y EXTRAS
       ========================================= */

    form.querySelectorAll(
        'input[name="product"], input[name="extra"]'
    ).forEach((input) => {

        input.addEventListener(
            "change",
            updateTotal
        );

    });


    /* =========================================
       ENVIAR FORMULARIO
       ========================================= */

    form.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const valid = [

                validateName(),

                validateSurname(),

                validatePhone(),

                validateEmail(),

                validateDeadline(),

                validatePrivacy()

            ].every(Boolean);


            if (!valid) {

                feedback.textContent =
                    "Revisa los campos marcados antes de enviar.";

                feedback.className =
                    "form-feedback error-message";

                return;
            }


            feedback.textContent =
                "¡Gracias! Tu solicitud de presupuesto ha sido preparada correctamente.";

            feedback.className =
                "form-feedback success";

        }
    );


    /* =========================================
       REINICIAR FORMULARIO
       ========================================= */

    form.addEventListener(
        "reset",
        () => {

            window.setTimeout(
                () => {

                    document
                        .querySelectorAll(".error")
                        .forEach((element) => {

                            element.textContent = "";

                        });


                    feedback.textContent = "";

                    feedback.className =
                        "form-feedback";


                    updateTotal();

                },
                0
            );

        }
    );


    /* =========================================
       PRECIO INICIAL
       ========================================= */

    updateTotal();

});
