
/* ==========================================================
   UNIVERSO PARA MI VIEJITO 💙✨
   Archivo: script.js

   FOTOS: cambia sus rutas en el objeto IMAGES.
   ESTRELLAS: modifica totalStars en createBackgroundStars().
   TEXTOS: edita el objeto PLANETS.
   ========================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => [...document.querySelectorAll(selector)];

    const starField = $("#starField");
    const overlay = $("#detailOverlay");
    const title = $("#detailTitle");
    const eyebrow = $("#detailEyebrow");
    const content = $("#detailContent");
    const closeButton = $("#closeDetail");
    const returnButton = $("#returnButton");
    const tooltip = $("#planetTooltip");
    const toast = $("#toastMessage");

    const audio = $("#mainAudio");
    const playButton = $("#playPauseButton");
    const playIcon = $("#playPauseIcon");
    const volume = $("#volumeControl");
    const musicStatus = $("#musicStatus");

    let previousFocus = null;
    let toastTimer;
    let tooltipTimer;
    const discovered = new Set();

    // ------------------------------------------------------
    // 1. RUTAS DE TUS FOTOGRAFÍAS
    // ------------------------------------------------------

    const IMAGES = {
        viejito: "viejo.jpeg",
        vualaUno:"vuala-1.jpeg",
        vualaDos: "vuala-2.jpeg",
        mensajeApoyo: "mensaje.jpeg"
    };

    // ------------------------------------------------------
    // 2. CONTENIDO DE CADA PLANETA
    // ------------------------------------------------------

    const PLANETS = {
        hogar: {
            title: "Hogar",
            eyebrow: "Lo que este universo significa",
            words: ["Hogar", "Confianza", "Cuidado", "Apoyo"],
            lines: [
                ["Hogar, lugar seguro, confianza, cuidado y apoyo.", "emphasis blue"],
                ["Cinco palabras que elegi para explicar lo que significa para mi este vínculo."],
                ["Para este universo, el hogar no necesita parecerse a un lugar. También puede ser esa sensación de poder hablar, confiar y sentir cariño."],
                ["Y eso es lo que quise guardar aquí: algo que tenga el significado que yo le doy.", "emphasis"]
            ]
        },

        tienda: {
            title: "Donde nos conocimos",
            eyebrow: "Un recuerdo del comienzo",
            lines: [
                ["Me acuerdo de aquella tienda.", "emphasis blue"],
                ["Tú estabas recargado en el mostrador y yo estaba por los estantes de la entrada."],
                ["Empezaste la conversación y me contaste que hablabas hasta por los codos. Fuiste guiando la plática, preguntando cosas y hablando de personas que conocíamos."],
                ["Y entre todo eso, yo me quedé con tu sonrisa.", "emphasis"],
                ["Qué curioso que un momento tan cotidiano se volviera un recuerdo que todavía quiero conservar."]
            ]
        },

        carino: {
            title: "Mi cariño",
            eyebrow: "Un rincón para ti",
            lines: [
                ["Eres muy lindo, viejito.", "emphasis blue"],
                ["A veces me cuesta encontrar las palabras para explicar todo lo que veo en ti. Por eso termino diciéndote lo lindo que eres."],
                ["Me gusta tu carisma, tu forma de ser, tu risa, tu manera de hablar y tu carácter."],
                ["Y también esos pequeños detalles que quizá para ti pasan desapercibidos, pero que yo sí noto."],
                ["Este espacio no necesita decirlo todo de una sola vez. Es simplemente un pedacito del cariño que te tengo.", "emphasis"]
            ]
        },

        viejito: {
            title: "Viejito 💙✨",
            eyebrow: "Un apodo que guarda recuerdos",
            images: [
                { src: IMAGES.viejito, alt: "Fotografía de Rodrigo con su bastón" }
            ],
            lines: [
                ["Mi viejito 💙✨", "emphasis blue"],
                ["El apodo empezó entre mensajes después del trabajo, cuando bromeábamos con que te tronaba la rodilla o te costaba levantarte."],
                ["Después llegó aquella ocasión en la que estabas adolorido y usabas bastón. Y el apodo se quedó conmigo."],
                ["Te digo viejito por esa historia, por la confianza y por la ternura con la que se fue quedando en mi manera de hablarte."],
                ["Y sí, también porque eres bien terco.", "emphasis"]
            ]
        },

        vuala: {
            title: "Vualá",
            eyebrow: "Un pequeño recuerdo de la tienda",
            images: [
                { src: IMAGES.vualaUno, alt: "Primera fotografía de la figura Vualá" },
                { src: IMAGES.vualaDos, alt: "Segunda fotografía de la figura Vualá" }
            ],
            lines: [
                ["El Señor Barriga.", "emphasis gold"],
                ["Aquella figurita del Vualá que dejaste en el estante de la papelería."],
                ["Pasó el tiempo, tú te fuiste, yo también me fui y, cuando regresé, la figura seguía ahí."],
                ["Me quedó la ilusión de volver algún día contigo y encontrarla todavía en su lugar."],
                ["Por eso esta figurita tiene su propio planeta. Porque hay detalles pequeños que se vuelven recuerdos especiales."]
            ]
        },

        acompanamiento: {
            title: "Ya no estás solito",
            eyebrow: "Cuidado y acompañamiento",
            lines: [
                ["Quiero que sepas que hay alguien que se fija en ti, que escucha lo que cuentas y que se interesa por cómo estás.", "emphasis blue"],
                ["Quiero acompañarte, verte crecer como persona y alegrarme por las cosas que vas consiguiendo."],
                ["No tienes que estar bien todo el tiempo ni fingir que nada te pesa para merecer cariño."],
                ["Y aunque cada quien tenga su propio camino y sus propias cosas que afrontar, deseo que también puedas reconocer el apoyo y el cariño que existen a tu alrededor."],
                ["Tú échale ganas, yo te apoyo desde acá.", "quote"]
            ]
        },

        orgullo: {
            title: "Mi orgullo",
            eyebrow: "Todo lo que veo en ti",
            lines: [
                ["Estoy orgullosa de ti.", "emphasis gold"],
                ["De todo el esfuerzo que has hecho para conseguir lo que tienes, de tu valentía y de esa forma de seguir adelante aunque las cosas se pongan difíciles."],
                ["Veo tu liderazgo, tu inteligencia y la dedicación que le pones a lo que te importa."],
                ["Me gusta que tengas tus propios gustos, que te entusiasmen tus pasatiempos y que busques seguir avanzando."],
                ["Quizá no siempre te detengas a mirar todo lo que has hecho, pero yo sí quería reservar un espacio para reconocerlo."]
            ]
        },

        eqytqat: {
            title: "EQYTQAT ❤️‍🩹",
            eyebrow: "Una canción y lo que significa para mí",
            lines: [
                ["Es Que Yo Te Quiero A Ti.", "emphasis blue"],
                ["Para mí, estas letras representan que mi cariño está puesto en ti."],
                ["Por eso este rincón tiene esa pequeña señal de corazón que intenta sanar: ❤️‍🩹."],
                ["No hacen falta muchas palabras aquí. Quería que el nombre estuviera, que conservara su significado y que tuviera un lugar dentro de este universo."]
            ]
        },

        abrazo: {
            title: "Dos estrellas juntas",
            eyebrow: "El recuerdo de nuestro primer abrazo",
            lines: [
                ["Me acuerdo de aquel abrazo en la tienda.", "emphasis blue"],
                ["Estabas frente al mueble de madera, mirando hacia afuera. Me acerqué y te abracé; tú me abrazaste de vuelta."],
                ["En ese momento quizá no me puse a pensar en todo lo que significaba. Fue después cuando entendí lo mucho que guardaba ese recuerdo."],
                ["También recuerdo cuando me sentaba junto a ti y me recargaba en tu brazo, cuando te tomaba la mano o cuando nos abrazábamos."],
                ["Amo estar en tus brazos, es la sensación más linda del mundo.", "emphasis"],
                ["Dos estrellas juntas, a pocos sentimientos de distancia.", "emphasis blue"]
            ]
        },

        "como-te-veo": {
            title: "Como yo te veo",
            eyebrow: "Una estrella especial",
            lines: [
                ["Ojalá pudieras verte como yo te veo…", "emphasis gold"],
                ["Y vieras la gran persona que eres."],
                ["Veo a un hombre maravilloso. Veo tu carisma, tu risa, tu forma de hablar y tu carácter."],
                ["Veo tu inteligencia, tu dedicación, el cariño que les tienes a tus pasatiempos y el empeño que pones en seguir adelante."],
                ["No significa que tengas que ser perfecto. Solo quería dejar aquí algunas de las cosas buenas que reconozco en ti."],
                ["Eres muy lindo, viejito.", "emphasis blue"]
            ]
        },

        "mensaje-apoyo": {
            title: "Una frase para guardar",
            eyebrow: "Un mensaje que recuerdo",
            images: [
                { src: IMAGES.mensajeApoyo, alt: "Captura del mensaje de apoyo" }
            ],
            lines: [
                ["Tú échale ganas, yo te apoyo desde acá.", "quote"],
                ["Esas palabras se me quedaron guardadas. Me hicieron sentir acompañada y me dio gusto recibirlas."],
                ["Por eso quería que tuvieran una estrella propia dentro de este universo."]
            ]
        }
    };

    // ------------------------------------------------------
    // 3. FRASES SECRETAS
    // ------------------------------------------------------

    const SECRET_PHRASES = [
        "Mi viejito 💙✨",
        "Ojalá pudieras verte como yo te veo…",
        "Eres muy lindo, viejito."
    ];

    // ------------------------------------------------------
    // 4. ESTRELLAS DE FONDO
    // ------------------------------------------------------

    function createBackgroundStars() {
        if (!starField) return;

        // Cambia este número si quieres más o menos estrellas.
        const totalStars = 220;
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < totalStars; i++) {
            const star = document.createElement("span");
            star.className = "background-star";

            const size = Math.random() < 0.12
                ? Math.random() * 2.2 + 1.4
                : Math.random() * 1.3 + 0.6;

            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.setProperty("--duration", `${2 + Math.random() * 4}s`);
            star.style.setProperty("--delay", `${-Math.random() * 5}s`);

            if (Math.random() < 0.13) star.classList.add("large");
            if (Math.random() < 0.04) star.classList.add("cross");

            fragment.appendChild(star);
        }

        starField.replaceChildren(fragment);
    }

    createBackgroundStars();

    // ------------------------------------------------------
    // 5. AVISOS
    // ------------------------------------------------------

    function showToast(message) {
        if (!toast) return;

        clearTimeout(toastTimer);
        toast.textContent = message;
        toast.classList.add("visible");

        toastTimer = setTimeout(() => {
            toast.classList.remove("visible");
        }, 2800);
    }

    function showPlanetName(name) {
        if (!tooltip) return;

        clearTimeout(tooltipTimer);
        tooltip.textContent = name;
        tooltip.classList.add("visible");

        tooltipTimer = setTimeout(() => {
            tooltip.classList.remove("visible");
        }, 1700);
    }

    // ------------------------------------------------------
    // 6. CONSTRUIR EL TEXTO Y LAS IMÁGENES
    // ------------------------------------------------------

    function addParagraph(text, style = "", index = 0) {
        const p = document.createElement("p");
        p.className = "revealed-line";
        p.style.setProperty("--reveal-delay", `${Math.min(index * 0.38, 3.8)}s`);

        if (style === "emphasis") p.classList.add("emphasis");
        if (style === "blue") p.classList.add("emphasis", "blue-emphasis");
        if (style === "gold") p.classList.add("emphasis", "gold-emphasis");

        if (style === "quote") {
            p.classList.add("quote-card");
        }

        p.textContent = text;
        content.appendChild(p);
    }

    function addImage(info, index) {
        const wrapper = document.createElement("div");
        wrapper.className = "revealed-line";
        wrapper.style.setProperty("--reveal-delay", `${index * 0.25}s`);

        const img = document.createElement("img");
        img.className = "memory-image";
        img.src = info.src;
        img.alt = info.alt;
        img.loading = "lazy";

        img.addEventListener("error", () => {
            if (!wrapper.isConnected) return;

            const placeholder = document.createElement("div");
            placeholder.className = "image-placeholder";
            placeholder.textContent = `Espacio reservado para tu foto: ${info.alt}`;
            wrapper.replaceChildren(placeholder);
        }, { once: true });

        wrapper.appendChild(img);
        content.appendChild(wrapper);
    }

    function addWords(words) {
        const cloud = document.createElement("div");
        cloud.className = "word-cloud revealed-line";
        cloud.style.setProperty("--reveal-delay", "1s");

        words.forEach((word) => {
            const span = document.createElement("span");
            span.textContent = word;
            cloud.appendChild(span);
        });

        content.appendChild(cloud);
    }

    function renderPlanet(key) {
        const planet = PLANETS[key];
        if (!planet) {
            showToast("No se encontró este contenido.");
            return false;
        }

        title.textContent = planet.title;
        eyebrow.textContent = planet.eyebrow;
        content.replaceChildren();

        (planet.images || []).forEach(addImage);

        (planet.lines || []).forEach((line, index) => {
            addParagraph(line[0], line[1] || "", index);
        });

        if (planet.words) addWords(planet.words);

        content.scrollTop = 0;
        return true;
    }

    // ------------------------------------------------------
    // 7. ABRIR Y CERRAR PLANETAS
    // ------------------------------------------------------

    function openPlanet(key, trigger) {
        if (!renderPlanet(key)) return;

        previousFocus = trigger || document.activeElement;
        overlay.classList.add("open");
        overlay.setAttribute("aria-hidden", "false");
        document.body.classList.add("detail-is-open");

        if (tooltip) tooltip.classList.remove("visible");

        closeButton.focus({ preventScroll: true });
    }

    function closePlanet() {
        overlay.classList.remove("open");
        overlay.setAttribute("aria-hidden", "true");
        document.body.classList.remove("detail-is-open");

        if (previousFocus && typeof previousFocus.focus === "function") {
            previousFocus.focus({ preventScroll: true });
        }
    }

    $$("[data-planet]").forEach((button) => {
        button.addEventListener("click", () => {
            const key = button.dataset.planet;
            const planet = PLANETS[key];

            if (planet) {
                showPlanetName(planet.title);
                openPlanet(key, button);
            }
        });
    });

    closeButton.addEventListener("click", closePlanet);
    returnButton.addEventListener("click", closePlanet);

    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) closePlanet();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && overlay.classList.contains("open")) {
            closePlanet();
        }
    });

    // ------------------------------------------------------
    // 8. ESTRELLAS SECRETAS
    // ------------------------------------------------------

    $$("[data-secret]").forEach((star) => {
        star.addEventListener("click", () => {
            const index = Number(star.dataset.secret);
            const phrase = SECRET_PHRASES[index];

            if (!phrase) return;

            discovered.add(index);
            star.classList.add("secret-discovered");
            showToast(phrase);

            if (discovered.size === SECRET_PHRASES.length) {
                setTimeout(() => {
                    showToast("Todavía quedan rincones por explorar ✨");
                }, 950);
            }
        });
    });

    // ------------------------------------------------------
    // 9. NAVEGACIÓN LATERAL
    // ------------------------------------------------------

    $$(".nav-button").forEach((button) => {
        button.addEventListener("click", () => {
            $$(".nav-button").forEach((item) => item.classList.remove("active"));
            button.classList.add("active");

            const action = button.dataset.action;

            if (action === "home") {
                closePlanet();
                showToast("Todo el universo está aquí 💙");
            }

            if (action === "discover") {
                closePlanet();

                const undiscovered = $$("[data-secret]").filter(
                    (star) => !discovered.has(Number(star.dataset.secret))
                );

                if (undiscovered.length) {
                    const nextStar = undiscovered[0];
                    nextStar.classList.add("hint-glow");
                    showToast("Hay una estrella esperando que la descubras ✨");

                    setTimeout(() => nextStar.classList.remove("hint-glow"), 2200);
                } else {
                    showToast("Ya descubriste todas las frases secretas ✨");
                }
            }

            if (action === "memories") {
                closePlanet();
                showToast("Busca las estrellas y los planetas de los recuerdos.");
            }
        });
    });

    // ------------------------------------------------------
    // 10. MÚSICA
    // ------------------------------------------------------

    if (audio && volume) audio.volume = Number(volume.value);

    function updateAudioControls() {
        if (!audio || !playIcon || !playButton) return;

        playIcon.textContent = audio.paused ? "▶" : "Ⅱ";
        playButton.setAttribute(
            "aria-label",
            audio.paused ? "Reproducir música" : "Pausar música"
        );
    }

    playButton.addEventListener("click", async () => {
        if (audio.paused) {
            try {
                await audio.play();
                musicStatus.textContent = "Reproduciendo";
            } catch (error) {
                musicStatus.textContent = "No se pudo reproducir el archivo";
                showToast("Revisa el nombre y la ubicación del MP3.");
            }
        } else {
            audio.pause();
            musicStatus.textContent = "En pausa";
        }

        updateAudioControls();
    });

    volume.addEventListener("input", () => {
        audio.volume = Number(volume.value);
    });

    audio.addEventListener("play", updateAudioControls);
    audio.addEventListener("pause", updateAudioControls);

    audio.addEventListener("error", () => {
        musicStatus.textContent = "Audio no disponible";
    });

    updateAudioControls();
});
