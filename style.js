const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

        const heading = $('header h3');
        const cdimg =   $('.cd__img');
        const audio = $('#audio');
        const cd = $('.cd');
        const playbtn =$('.btn-toggle-play');
        const playing = $('.player');
        const progress = $('#song');
        const btnprev = $('.btn-prev');
        const btnnext = $('.btn-next');
        const btnrandom = $('.btn-random');
        const btnrepeat = $('.btn-repeat');
        const playlist = $('.list');
        const volume = $('.volume1');
        const volumeinput = $('.volume2');
        const timestar = $('.progress-start-time');
        const timeend = $('.progress-start-end');
        const songvalue1 = $('#song::-webkit-slider-thumb')

        const PLAY_STORAGE_KEY = 'Dong_Anh'
const app = {

    //tự động set bài hát đầu tiên
    defineProperties: function(){
        Object.defineProperty(this,'currentSong',{
            get: function(){
                return this.songs[this.currentIndex];
            }
        })
    },
    currentIndex: 0,
    isPlaying: false ,
    isRandom: false,
    isRepeat: false,
    isVolume: false,
    config:JSON.parse(localStorage.getItem(PLAY_STORAGE_KEY)) || {}, 
    
    setconfig: function(key,value){
        this.config[key] = value;
        localStorage.setItem(PLAY_STORAGE_KEY, JSON.stringify(this.config));


    },
    //tự động set bài hát đầu tiên
    songs:[
        {
            name:"Tháng tư lời nói dối của em",
            singer:'Hà Anh Tuấn',
            path:'img/image1.jpg',
            music:'./music/music1.mp3'
        },
        {
            name:"Sao cũng được",
            singer:'Thành Đạt',
            path:'img/image2.jpg',
            music:'./music/music2.mp3'
        },
        {
            name:"Gió",
            singer:'JanK, N2',
            path:'img/image3.jpg',
            music:'./music/music3.mp3'
        },
        {
            name:"Thất Tình",
            singer:'Trịnh Đình Quang',
            path:'img/image4.jpg',
            music:'./music/music4.mp3'
        },
        {
            name:"Tình yêu chắp vá",
            singer:'Mr.Siro',
            path:'img/image5.jpg',
            music:'./music/music5.mp3'
        },
        {
            name:"Là Anh",
            singer:'Phạm lịch',
            path:'img/image6.jpg',
            music:'./music/music6.mp3'
        },
        {
            name:"Vì sao thế",
            singer:'Khải Đăng',
            path:'img/image7.jpg',
            music:'./music/music7.mp3'
        },
        {
            name:"Tìm lại bầu trời",
            singer:'Tuấn Hưng',
            path:'img/image8.jpg',
            music:'./music/music8.mp3'
        },
        {
            name:"Xin đừng chạm vào anh",
            singer:'Duy Mạnh',
            path:'img/image9.jpg',
            music:'./music/music9.mp3'
        },
        {
            name:"Tha Thứ Lỗi Lầm",
            singer:'Tuấn Hưng',
            path:'img/image10.jpg',
            music:'./music/music10.mp3'
        } 
    ],
   
    //Thêm bài hát vào danh sách list
    render: function(){
        const html = this.songs.map((song,index)=>{
            return `
            <div class="logo ${index === this.currentIndex?'active' : ''}"data-index="${index}">
            <img src="${song.path}" alt="">
            <div class="item">
                <h3>${song.name}</h3>
                <span> ${song.singer}</span>
            </div>
            <div class="icon1">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>
        `
        })
        playlist.innerHTML = html.join('');
    },
    
    loadConfig: function(){
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    }
    ,
    //tải bài nhạc đầu tiên
    loadcurrentSong: function(){
        
        heading.textContent = this.currentSong.name;
        cdimg.style.backgroundImage = `url("${this.currentSong.path}")`;
        audio.src = this.currentSong.music;

    }
    ,

    netxtSong: function(){
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0;
        };
        this.loadcurrentSong();
    },
    prevSong: function(){
        this.currentIndex--;
        if(this.currentIndex <0){
            this.currentIndex = this.songs.length
        };
        this.loadcurrentSong();
    },
    playrandomsong: function(){
        let newindex 
    do{
        newindex = Math.floor(Math.random() * app.songs.length);
    }
    while(newindex === this.currentIndex)  
        this.currentIndex = newindex;
        this.loadcurrentSong();
    },
    scrollTOActiveSong: function(){
        setTimeout(() =>{
            $('.list .active').scrollIntoView({
                behavior:'smooth',
                block :'nearest',
            });
        },200)

        },
        volumes: function(){
            volumeinput.addEventListener('input', () => {
                audio.volume = volumeinput.value/100;
              });
        },
    //scroll cuộn mất ảnh
    handleEvents: function(){
        const _this = this;
        const cdWidth = cd.offsetWidth;
        //xử lý cd quay tròn
        const cdpause  = cdimg.animate([
            // { transform: "rotate(1deg)" },
            { transform: 'rotate(360deg)' }
        ], {
                duration: 20000,
                iterations:Infinity,
            })
        cdpause.pause();
       playbtn.onclick = function(){
        if(_this.isPlaying ){
            audio.pause();      
        }
        else{
            audio.play();              
        }
        }
        progress.addEventListener('input', () => {
            const percent = (progress.value - progress.min) / (progress.max - progress.min);
            songvalue1.style.backgroundColor = `hsl(${percent}, 50%, 50%)`;
          });
        volume.onclick = function(){
            if(_this.isVolume){
                _this.isVolume = false;
                volumeinput.classList.remove('active');
                volume.classList.remove('active');
            }
            else{
                _this.isVolume = true;
                volumeinput.classList.add('active');
                volume.classList.add('active');
       }
        };
        audio.onplay = function(){
            _this.isPlaying = true;
            cdpause.play();
            playing.classList.add('playing');
       }
       audio.onpause = function(){
        _this.isPlaying = false;
        playing.classList.remove('playing');
        cdpause.pause();
        }
        audio.addEventListener('loadedmetadata',function donganh(){
            const startTime = audio.currentTime;
            const endTime = audio.duration;
            
            const timestart1 = `${Math.floor(startTime/60)}`;
            const timestart2 = `${Math.floor(startTime%60)}`;
            const timeend1 = `${Math.floor(endTime/60)}`;
            const timeend2 = `${Math.floor(endTime%60)}`;
            timeend.innerText = `${timeend1}:${timeend2}`;
            timestar.innerHTML = `${timestart1}:${timestart2}`;

            audio.addEventListener('timeupdate', updateTimeDisplay)
        })
        function  updateTimeDisplay(){
            const startTime1 = audio.currentTime;
            const minutes = `${Math.floor(startTime1 / 60)}`;
            const seconds = `${Math.floor(startTime1 % 60)}`;

            const formattedCurrentTime = `${minutes}:${seconds}`;
           
            timestar.innerHTML = formattedCurrentTime;

        }
       
        //Tiến độ bài hát thay đổi
        audio.addEventListener('timeupdate',donganh);
        audio.ontimeupdate = donganh();
        function donganh(){
            if(audio.duration){
              const currentpt = Math.floor(audio.currentTime/audio.duration*100);
              progress.value=currentpt;
            }
            //Sử lý tua bài hát
            progress.onchange = function(e){
             const seektime = audio.duration /100 * e.target.value;
             audio.currentTime = seektime;
            }
        }
        //khi next bài hát
        btnnext.onclick = function(){
            if(_this.isRandom){
            _this.playrandomsong();
            }
           else{
            _this.netxtSong();
            }
             audio.play();
             _this.render();
             _this.scrollTOActiveSong();
        }
        //khi prev bài hát
        btnprev.onclick = function(){
            if(_this.isRandom){
                _this.playrandomsong();
                }
                else{
                _this.prevSong();
                 } 
                 audio.play();
                 _this.render();
                 
        }
        //xử lý end bài hát
        audio.onended = function(){
            btnnext.click();
        };
        //xử lý chọn bài hát
        playlist.onclick = function(e){
            // Sử lý chọn bài hát
            const SongNote = e.target.closest('.logo:not(.active)');
            if(SongNote||e.target.closest('.icon1')){
                if(SongNote){
                    console.log(SongNote.getAttribute('data-index'));
                    _this.currentIndex = Number(SongNote.dataset.index);
                    _this.loadcurrentSong();
                    audio.play();
                    _this.render();
                }
                else{

                }
            }
        };

        //Sử lý lặp lại bài repeat;
        btnrepeat.onclick=function(){
            if(_this.isRepeat){
                _this.isRepeat = false;
                btnrepeat.classList.remove("active");         
            }
            else{
                _this.isRepeat = true;
                btnrepeat.classList.add("active");
            }
        }
        audio.onended = function(){
            if(_this.isRepeat){
                audio.play();
            }
            else{
                btnnext.click();
            }
            _this.setconfig('isRepeat', _this.isRepeat);
        }
        // sử lý random
        btnrandom.onclick=function(){
            if(_this.isRandom){
                _this.isRandom = false;
                btnrandom.classList.remove("active");         
            }
            else{
                _this.isRandom = true;
                btnrandom.classList.add("active");
            }
            _this.setconfig('isRepeat', _this.isRepeat);
        }
        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const  newcdWidth = cdWidth - scrollTop;
            
            cd.style.width = newcdWidth>0 ?newcdWidth + 'px':0;
            cd.style.opacity=newcdWidth / cdWidth;
        }
    },
    
    start: function (){
        // định nghĩa các thuộc tính cho Object
        this.defineProperties();
        //lắng nghe /sử lý các sự kiện domEvenr;
        this.handleEvents();
        //Tải thông tin bài đầu tiên khi chạy ứng dụng;
        this.loadcurrentSong();
        //render playlist
        this.render();
        this.playrandomsong();
        //tăng giảm volumed
        this.volumes();
        this.loadConfig();

        //Hiển thị trạng thái ban đầu của button repeat và random
        // btnrandom.classList.add("active",this.isRandom);
        // btnrepeat.classList.add("active",this.isRepeat);
    }

}
app.start();