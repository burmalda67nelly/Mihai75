// ============================================================
// 💻 MIHAI 75.0 — SCRIPT.JS
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    // ========================================================
    // 🔗 ЭЛЕМЕНТЫ
    // ========================================================

    const cover = document.getElementById("cover");
    const lockScreen = document.getElementById("lockScreen");
    const answerInput = document.getElementById("answerInput");
    const unlockBtn = document.getElementById("unlockBtn");
    const errorMessage = document.getElementById("errorMessage");

    const successScreen = document.getElementById("successScreen");
    const loadingProgress = document.getElementById("loadingProgress");
    const loadingText = document.getElementById("loadingText");

    const book = document.getElementById("book");

    const spreads = document.querySelectorAll(".spread");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");

    const music = document.getElementById("music");
    const musicToggle = document.getElementById("musicToggle");

    const canvas = document.getElementById("confetti");
    const heartsContainer = document.getElementById("hearts");

    const cake = document.getElementById("cake");
    const finalMessage = document.getElementById("finalMessage");

    // ========================================================
    // 🎊 CONFETTI
    // ========================================================

    const ctx = canvas ? canvas.getContext("2d") : null;

    let confetti = [];
    let confettiAnimation = null;
    let confettiActive = false;

    function resizeCanvas() {
        if (!canvas) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    function createConfetti() {

        if (!canvas) return;

        confetti = [];

        for (let i = 0; i < 140; i++) {

            confetti.push({
                x: Math.random() * canvas.width,
                y: Math.random() * -canvas.height,

                size: Math.random() * 7 + 3,

                speed: Math.random() * 3 + 2,

                rotation: Math.random() * 360,

                rotationSpeed: Math.random() * 6 - 3,

                color: `hsl(${Math.random() * 360}, 85%, 65%)`
            });
        }
    }

    function drawConfetti() {

        if (!canvas || !ctx) return;

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        if (!confettiActive) return;

        confetti.forEach(piece => {

            ctx.save();

            ctx.translate(
                piece.x,
                piece.y
            );

            ctx.rotate(
                piece.rotation * Math.PI / 180
            );

            ctx.fillStyle = piece.color;

            ctx.fillRect(
                -piece.size / 2,
                -piece.size / 2,
                piece.size,
                piece.size
            );

            ctx.restore();

            piece.y += piece.speed;
            piece.rotation += piece.rotationSpeed;

            if (piece.y > canvas.height + 20) {

                piece.y = -20;

                piece.x =
                    Math.random() * canvas.width;
            }
        });

        confettiAnimation =
            requestAnimationFrame(drawConfetti);
    }

    function startConfetti() {

        if (!canvas) return;

        confettiActive = true;

        if (confettiAnimation) {
            cancelAnimationFrame(confettiAnimation);
        }

        createConfetti();
        drawConfetti();
    }

    function stopConfetti() {

        confettiActive = false;

        if (confettiAnimation) {

            cancelAnimationFrame(
                confettiAnimation
            );

            confettiAnimation = null;
        }

        if (ctx && canvas) {

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );
        }
    }


    // ========================================================
    // ❤️ ЛЕТЯЩИЕ СЕРДЕЧКИ
    // ========================================================

    let heartsInterval = null;

    function startHearts() {

        if (!heartsContainer) return;

        if (heartsInterval) return;

        heartsInterval = setInterval(() => {

            const heart =
                document.createElement("div");

            heart.className = "heart";

            const hearts = [
                "❤️",
                "💖",
                "💗",
                "💕",
                "💝",
                "✨"
            ];

            heart.textContent =
                hearts[
                    Math.floor(
                        Math.random() * hearts.length
                    )
                ];

            heart.style.left =
                Math.random() * 100 + "vw";

            heart.style.top = "-60px";

            heart.style.fontSize =
                Math.random() * 20 + 20 + "px";

            heart.style.animationDuration =
                Math.random() * 4 + 5 + "s";

            heartsContainer.appendChild(heart);

            setTimeout(() => {

                if (heart.parentNode) {
                    heart.remove();
                }

            }, 9000);

        }, 350);
    }


    function stopHearts() {

        if (heartsInterval) {

            clearInterval(
                heartsInterval
            );

            heartsInterval = null;
        }
    }


    function clearHearts() {

        if (!heartsContainer) return;

        heartsContainer
            .querySelectorAll(".heart")
            .forEach(heart => heart.remove());
    }


    // ========================================================
    // 🔐 РАЗБЛОКИРОВКА
    // ========================================================

    let unlocking = false;

    function unlockComputer() {

        if (unlocking) return;

        const answer =
            answerInput.value.trim();

        // Если ничего не введено
        if (answer === "") {

            errorMessage.textContent =
                "Introdu un număr.";

            answerInput.focus();

            return;
        }

        // Правильный ответ
        if (answer === "75") {

            unlocking = true;

            errorMessage.textContent = "";

            // Убираем экран блокировки
            lockScreen.classList.add("hidden");

            // Показываем экран успеха
            successScreen.classList.remove("hidden");

            // Музыка
            if (music) {

                music.play().catch(() => {});
            }

            // Запускаем прогресс
            startLoading();

        } else {

            // Неправильный ответ
            errorMessage.textContent =
                "❌ Răspuns greșit. Încearcă din nou.";

            answerInput.classList.add("shake");

            setTimeout(() => {

                answerInput.classList.remove(
                    "shake"
                );

            }, 500);

            answerInput.value = "";
            answerInput.focus();
        }
    }


    // ========================================================
    // ⏳ ЗАГРУЗКА
    // ========================================================

    function startLoading() {

        let progress = 0;

        if (loadingProgress) {
            loadingProgress.style.width = "0%";
        }

        const loadingMessages = [
            "Loading memories...",
            "Preparing photos...",
            "Starting family memories...",
            "Almost ready...",
            "Welcome, Mihai!"
        ];

        let messageIndex = 0;

        const interval =
            setInterval(() => {

                progress += 2;

                if (loadingProgress) {

                    loadingProgress.style.width =
                        progress + "%";
                }

                if (
                    progress % 20 === 0 &&
                    messageIndex <
                    loadingMessages.length
                ) {

                    if (loadingText) {

                        loadingText.textContent =
                            loadingMessages[
                                messageIndex
                            ];
                    }

                    messageIndex++;
                }

                if (progress >= 100) {

                    clearInterval(interval);

                    setTimeout(() => {

                        openBook();

                    }, 700);
                }

            }, 50);
    }


    // ========================================================
    // 📖 ОТКРЫВАЕМ КНИГУ
    // ========================================================

    function openBook() {

        stopConfetti();
        stopHearts();
        clearHearts();

        cover.classList.add("hidden");

        book.classList.remove("hidden");

        currentSpread = 0;

        showSpread(currentSpread);

        // Красивый переход
        setTimeout(() => {

            book.classList.add("book-open");

        }, 100);
    }


    // ========================================================
    // 🎯 КНОПКА UNLOCK
    // ========================================================

    if (unlockBtn) {

        unlockBtn.addEventListener(
            "click",
            unlockComputer
        );
    }


    // Можно нажать Enter
    if (answerInput) {

        answerInput.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {

                    event.preventDefault();

                    unlockComputer();
                }
            }
        );
    }


    // ========================================================
    // 📖 ПЕРЕЛИСТЫВАНИЕ
    // ========================================================

    let currentSpread = 0;


    function showSpread(index) {

        if (!spreads.length) return;

        if (index < 0) {
            index = 0;
        }

        if (index >= spreads.length) {
            index = spreads.length - 1;
        }

        currentSpread = index;

        spreads.forEach(
            (spread, i) => {

                spread.classList.remove(
                    "active"
                );

                if (i === index) {

                    spread.classList.add(
                        "active"
                    );
                }
            }
        );


        // Последняя страница
        if (index === spreads.length - 1) {

            stopHearts();

            clearHearts();

            startConfetti();

        } else {

            stopConfetti();

            startHearts();
        }


        // Кнопки
        if (prevBtn) {

            prevBtn.disabled =
                index === 0;
        }

        if (nextBtn) {

            nextBtn.disabled =
                index === spreads.length - 1;
        }
    }


    if (nextBtn) {

        nextBtn.addEventListener(
            "click",
            () => {

                if (
                    currentSpread <
                    spreads.length - 1
                ) {

                    showSpread(
                        currentSpread + 1
                    );
                }
            }
        );
    }


    if (prevBtn) {

        prevBtn.addEventListener(
            "click",
            () => {

                if (currentSpread > 0) {

                    showSpread(
                        currentSpread - 1
                    );
                }
            }
        );
    }


    // ========================================================
    // 🎵 МУЗЫКА
    // ========================================================

    let musicOn = true;


    if (musicToggle) {

        musicToggle.addEventListener(
            "click",
            () => {

                if (!music) return;

                if (musicOn) {

                    music.pause();

                    musicToggle.textContent =
                        "🔇";

                } else {

                    music.play().catch(
                        () => {}
                    );

                    musicToggle.textContent =
                        "🔊";
                }

                musicOn = !musicOn;
            }
        );
    }


    // ========================================================
    // 🎂 ТОРТ
    // ========================================================

    let cakeFinished = false;


    if (cake) {

        cake.addEventListener(
            "click",
            () => {

                if (cakeFinished) return;

                cakeFinished = true;

                const candles =
                    document.querySelectorAll(
                        ".candle"
                    );


                // Гасим свечи по очереди
                candles.forEach(
                    (candle, index) => {

                        setTimeout(
                            () => {

                                candle.classList.add(
                                    "out"
                                );

                                if (
                                    navigator.vibrate
                                ) {

                                    navigator.vibrate(
                                        60
                                    );
                                }

                            },
                            index * 500
                        );
                    }
                );


                // Сердечки убираем
                setTimeout(() => {

                    stopHearts();
                    clearHearts();

                }, 1200);


                // Конфетти
                setTimeout(() => {

                    startConfetti();

                }, 1500);


                // Финальное сообщение
                setTimeout(() => {

                    if (finalMessage) {

                        finalMessage.classList.add(
                            "show"
                        );
                    }

                }, 2000);


                // Меняем надпись
                setTimeout(() => {

                    const cakeText =
                        document.querySelector(
                            ".cake-text"
                        );

                    if (cakeText) {

                        cakeText.textContent =
                            "✨ Cartea se încheie aici, dar povestea noastră merge mai departe ✨";

                        cakeText.style.fontWeight =
                            "bold";
                    }

                }, 2500);
            }
        );
    }


    // ========================================================
    // ✨ СТАРТОВОЕ СОСТОЯНИЕ
    // ========================================================

    // Книга скрыта
    if (book) {

        book.classList.add("hidden");
    }

    // Успешный экран скрыт
    if (successScreen) {

        successScreen.classList.add(
            "hidden"
        );
    }

    // Экран блокировки виден
    if (lockScreen) {

        lockScreen.classList.remove(
            "hidden"
        );
    }

    // Конфетти пока не запускаем
    stopConfetti();

});