document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".fade-up");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0 });

  elements.forEach(el => {
    observer.observe(el);


    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add("show");
    }
  });
});




document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".auto-video");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 尝试播放
        const playPromise = video.play();

        if (playPromise !== undefined) {
          playPromise.catch(() => {
            console.log("Autoplay was prevented");

            // 如果被拦截，添加一次用户交互监听
            document.addEventListener("click", () => {
              video.play();
            }, { once: true });
          });
        }

      } else {
        video.pause();
      }
    });
  }, {
    threshold: 0.5  // 50%进入画面才播放
  });

  observer.observe(video);
});