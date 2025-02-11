$(document).ready(function () {
    // 1. 헤더 로드
    $("#header-placeholder").load("header.html", function (response, status, xhr) {
        if (status !== "success") {
            console.error("헤더 로드 오류:", xhr.status, xhr.statusText);
        }
    });
});


// 2. 스크롤 시 텍스트 애니메이션 처리
document.addEventListener("DOMContentLoaded", function () {
    let section1 = document.querySelector('.section1');
    let text1 = document.querySelector('.text1');
    let text2 = document.querySelector('.text2');
    let bottom = document.querySelector('.bottom');

    let isScrolling = false;

    // PC에서 휠 스크롤을 처리
    section1.addEventListener('wheel', function (e) {
        if (isScrolling) return;

        isScrolling = true;
        let sectionHeight = section1.clientHeight;

        if (e.deltaY > 0) {
            text1.classList.remove("visible");
            text1.classList.add("hidden");
            text2.classList.add("visible");

            bottom.style.opacity = "1";
            bottom.style.visibility = "visible";

            section1.scrollTo({
                top: sectionHeight,
                behavior: 'smooth'
            });
        } else {
            text1.classList.add("visible");
            text1.classList.remove("hidden");
            text2.classList.remove("visible");

            bottom.style.opacity = "0";
            bottom.style.visibility = "hidden";

            section1.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        setTimeout(function () {
            isScrolling = false;
        }, 300);
    });

    // 767px 이하에서는 텍스트가 순차적으로 표시
    if (window.innerWidth <= 767) {
        text1.classList.add("visible");
        bottom.classList.add("hidden");

        // text1이 보이고 나서 일정 시간 후 text2 표시
        setTimeout(function () {
            text2.classList.add("visible");
            bottom.style.opacity = "1";
            bottom.style.visibility = "visible";
        }, 2000); // 2초 후에 text2가 보이게 설정 (원하는 시간으로 조절)
    }

    // 기본적으로 text1을 보이도록 설정
    text1.classList.add("visible");
    bottom.classList.add("hidden");
});



// 3. 스크롤 시 .skill 요소 처리
window.addEventListener('scroll', function () {
    var skills = document.querySelectorAll('.section2_skill .skill');
    var windowHeight = window.innerHeight;

    skills.forEach(function(skill) {
        var sectionTop = skill.getBoundingClientRect().top;
        if (sectionTop < windowHeight * 0.9 && !skill.classList.contains('visible')) {
            skill.classList.add('visible');
        }
    });
});

// 4. 섹션에 visible 클래스 추가
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll('.section2, .section3, .section4, .section5');
    window.addEventListener('scroll', function () {
        sections.forEach(section => {
            const sectionPosition = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionPosition < windowHeight * 0.75 && !section.classList.contains('visible')) {
                section.classList.add('visible');
            }
        });
    });

    sections.forEach(section => {
        const sectionPosition = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionPosition < windowHeight * 0.75 && !section.classList.contains('visible')) {
            section.classList.add('visible');
        }
    });
});

// 5. Swiper JS 초기화
var swiper = new Swiper(".mySwiper", {
    autoplay: { delay: 5000 },
    slidesPerView: 1,
    spaceBetween: 20,
    centeredSlides: true,
    speed: 1000
});

// 6. '탑으로' 버튼 표시 및 스크롤 처리
function toggleTopButton() {
    const topButton = document.querySelector('.top_button');
    const section1 = document.querySelector('.section1');

    if (window.scrollY < section1.clientHeight) {
        topButton.style.opacity = '0'; // 투명하게 설정
        topButton.style.pointerEvents = 'none'; // 클릭 방지
    } else {
        topButton.style.opacity = '1'; // 완전히 보이게 설정
        topButton.style.pointerEvents = 'auto'; // 클릭 가능하게 설정
    }
}

document.addEventListener('DOMContentLoaded', toggleTopButton);
window.addEventListener('scroll', toggleTopButton);

document.querySelector('.top_button').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

