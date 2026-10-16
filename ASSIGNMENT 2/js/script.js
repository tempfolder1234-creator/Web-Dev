// ==========================================
// PORTFOLIO JAVASCRIPT
// ==========================================


document.addEventListener(
    "DOMContentLoaded",
    function () {


        // ==================================
        // CONTACT FORM
        // ==================================

        const form =
            document.getElementById(
                "contactForm"
            );


        const message =
            document.getElementById(
                "formMessage"
            );


        if (form) {

            form.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    message.classList.remove(
                        "d-none"
                    );


                    form.reset();


                    setTimeout(
                        function () {

                            message.classList.add(
                                "d-none"
                            );

                        },
                        4000
                    );

                }
            );

        }


        // ==================================
        // CLOSE MOBILE NAVBAR
        // AFTER CLICKING LINK
        // ==================================

        const navLinks =
            document.querySelectorAll(
                ".navbar-nav .nav-link"
            );


        const navbar =
            document.querySelector(
                ".navbar-collapse"
            );


        navLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        if (
                            navbar.classList.contains(
                                "show"
                            )
                        ) {

                            const bsCollapse =
                                bootstrap.Collapse
                                    .getInstance(navbar);

                            if (bsCollapse) {

                                bsCollapse.hide();

                            }

                        }

                    }
                );

            }
        );


    }
);