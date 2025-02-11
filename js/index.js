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
    let section2 = document.querySelector('.section2');
    let text1 = document.querySelector('.text1');
    let text2 = document.querySelector('.text2');
    let bottom = document.querySelector('.bottom');
    
    let isScrolling = false;

    // 모바일 화면 (767px 이하)에서는 section1 내부 스크롤을 막고, 바로 section2로 이동
    if (window.innerWidth <= 767) {
        // text1과 text2 애니메이션 처리
        text1.classList.add("visible");
        text2.classList.add("visible");  // 바로 text2도 보이게 설정
        setTimeout(function () {
            text2.classList.remove("hidden");
        }, 2000);  // 2초 뒤에 text2 표시

        // section1에서 스크롤 이벤트 막기
        section1.addEventListener('wheel', function (e) {
            e.preventDefault();  // 스크롤 이벤트 기본 동작 막기
            section2.scrollIntoView({
                behavior: 'smooth',  // 부드럽게 스크롤
            });
        });
    } else {
        // 데스크탑 화면에서는 기존 스크롤 이벤트 처리
        section1.addEventListener('wheel', function (e) {
            if (isScrolling) return;

            isScrolling = true;
            let sectionHeight = section1.clientHeight;

            if (e.deltaY > 0) {  // 아래로 스크롤
                text1.classList.remove("visible");
                text1.classList.add("hidden");
                text2.classList.add("visible");

                bottom.style.opacity = "1";
                bottom.style.visibility = "visible";

                section1.scrollTo({
                    top: sectionHeight,
                    behavior: 'smooth'
                });
            } else {  // 위로 스크롤
                text1.classList.add("visible");
                text1.classList.remove("hidden");

                // text2는 계속 visible 상태로 유지
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

        // 페이지 로드 시 text1, text2 초기 설정
        text1.classList.add("visible");
        text2.classList.add("hidden");
        bottom.classList.add("hidden");
    }
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

