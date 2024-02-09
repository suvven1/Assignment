// 영화 리스트
import { movie_list } from './movieList.js';

// 스크롤 위치에 따른 해더 CSS 속성 변경
window.addEventListener('scroll', function () {
    let header = document.getElementsByClassName("header");
    if (window.scrollY === 0) {
        header[0].style.backgroundColor = ""
        header[0].style.border = ""
        header[0].style.boxShadow = ""
    } else {
        header[0].style.backgroundColor = "#212121FF"
        header[0].style.borderBottom = "2px solid #4D4D4D"
        header[0].style.boxShadow = "0px 10px 25px black"
    }
});

// 메뉴 클릭시 해당 부분으로 스크롤 이동
let menus = document.getElementsByClassName('menu');
let titles = document.getElementsByClassName('posters_title');
menus[0].addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
})

// 넷플릭스 오리지널 이동
menus[1].addEventListener('click', function () {
    window.scrollTo({
        top: titles[0].offsetTop - 100,
        behavior: 'smooth'
    })
})

// 인기항목 이동
menus[2].addEventListener('click', function () {
    window.scrollTo({
        top: titles[1].offsetTop - 100,
        behavior: 'smooth'
    })
})

//화면 크기에 따라 그림자 범위 지정
let shadowBox = document.getElementsByClassName("shadow_box"); // 그림자 박스
const changeShadow = () => {
    if (window.innerWidth < 1000) {
        shadowBox[0].style.boxShadow = `inset ${window.innerWidth * 0.6}px -80px 2000px #181818`;
    } else {
        shadowBox[0].style.boxShadow = `inset ${window.innerWidth * 0.4}px -80px 2000px #181818`;
    }
}
window.addEventListener('resize', changeShadow);

// 선택된 포스터 웹 페이지에 출력하기
const setSelectedPosterHTML = (alt) => {
    const index = parseInt(alt)
    sessionStorage.setItem("index", index);
    let overview = movie_list[index].overview
    if (overview.length > 100) {
        overview = overview.slice(0, 100) + '...';
    }
    let selectedPosetHTML =
        `
        <img class="selected_poster_img" src=" ${movie_list[index].backdrop}" alt="${movie_list[index].title_kr}">
            <div class="movie_info_box">                        
            <div class="movie_title_kr">${movie_list[index].title_kr}</div>
            <div class="movie_title_en">${movie_list[index].title_en}</div>
            <div class="movie_overview">${overview}</div>
        </div>
        `

    document.getElementsByClassName("selected_poster_info")[0].innerHTML = selectedPosetHTML;

    changeShadow();

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })

}

// 포스터 리스트 웹 페이지에 출력하기
const setPostersHTML = () => {
    let postersOriginalHTML = ''
    let postersTrendingHTML = ''

    for (let i = 0; i < movie_list.length / 2; i++) {
        postersOriginalHTML += `
        <div class="img_box">
            <img class="poster_img" src="${movie_list[i].poster}" alt="${i}"">
        </div>`
        postersTrendingHTML += `
        <div class="img_box">
            <img class="poster_img" src="${movie_list[i + movie_list.length / 2].poster}" alt="${i + movie_list.length / 2}">
        </div>`
    }

    document.getElementsByClassName("posters_original")[0].innerHTML = postersOriginalHTML;
    document.getElementsByClassName("posters_trending")[0].innerHTML = postersTrendingHTML;

    let posterImages = document.querySelectorAll('.poster_img');
    posterImages.forEach((posterImg, index) => {
        posterImg.addEventListener('click', () => {
            setSelectedPosterHTML(index);
        });
    });
}

// 컨텐츠 세부 정보 HTML 생성
const setInfoDetailHTML = (type) => {
    const index = sessionStorage.getItem("index")
    let infoDetailHTML = `
                <div class="detail_content">
                    <div class="detail_shadow"></div>
                    <button class="detail_close">X</button>
                    <img class="detail_img" src=" ${movie_list[index].backdrop}" alt=${index}/>
                    <div class="detail_title_kr">
                        ${movie_list[index].title_kr}
                    </div>
                    <div class="detail_title_en">
                        ${movie_list[index].title_en}
                    </div>
                    <div class="detail_info">
                        ${movie_list[index].overview}
                    </div>
                </div>
    `
    let playHTML = `
                <div class="detail_content">
                    <div class="detail_shadow"></div>
                    <button class="detail_close">X</button>
                    <iframe class="detail_video" src="https://www.youtube.com/embed/${movie_list[index].video_id}?autoplay=1&mute=1" frameborder="0"
        allowfullscreen></iframe>
                </div>
    `
    if (type) {

        document.getElementsByClassName("info_detail")[0].innerHTML = infoDetailHTML;
    } else {
        document.getElementsByClassName("info_detail")[0].innerHTML = playHTML;
    }

    let detail_close = document.getElementsByClassName('detail_close')[0]
    detail_close.addEventListener('click', function () {
        showInfoDetail();
    })

    const iframe = document.querySelector('.detail_video');

    // 유튜브 영상의 재생을 시작하는 함수 정의
    const playYoutubeVideo = () => {
        console.log(iframe);
        // iframe 요소의 contentWindow를 통해 내부 window에 접근하여 재생 명령을 전달
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    };
    setTimeout(playYoutubeVideo, 2000)

}

// 클릭 시 세부 정보 창 웹페이지 출력
const showInfoDetail = (type) => {
    let infoDetail = document.getElementsByClassName("info_detail");
    if (infoDetail[0].style.zIndex == -1 || infoDetail[0].style.zIndex == "") {
        setInfoDetailHTML(type);
        infoDetail[0].style.zIndex = 100
    } else {
        infoDetail[0].style.zIndex = -1
    }
    document.addEventListener('keydown', function (event) {
        if (event.key === "Escape") {
            infoDetail[0].style.zIndex = -1
        }
    });
}

let info_button = document.getElementsByClassName('info_button')[0]
let play_button = document.getElementsByClassName('play_button')[0]

info_button.addEventListener('click', function () {
    showInfoDetail(true);
})
play_button.addEventListener('click', function () {
    showInfoDetail(false);
})


// 화면 로드시 실행될 초기 함수
document.addEventListener("DOMContentLoaded", function () {
    setPostersHTML()
    setSelectedPosterHTML(0)
});
