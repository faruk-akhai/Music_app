// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/Lahore_song.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
let total_duration = Array.from(document.getElementsByClassName('timestamp'));
let ini_time = document.getElementById("initial_time");
let fin_time = document.getElementById("final_duration");
let previous = document.getElementById('previous');
let next = document.getElementById('next');

let songs = [
    {songName: "Lahore - Guru Randhawa", filePath: "songs/Lahore_song.mp3", coverPath: "covers/lahore.jpeg"},
    {songName: "High Rated Gabru", filePath: "songs/High Rated Gabru.mp3", coverPath: "covers/High_Rated_Gabru.jpeg"},
    {songName: "Nira Ishq", filePath: "songs/Nira-Ishq-Tu.mp3", coverPath: "covers/nira_ishq.jpg"},
    {songName: "Khaab", filePath: "songs/Khaab.mp3", coverPath: "covers/khaab.jpeg"},
    {songName: "Kya Baat Ay", filePath: "songs/Kya Baat Ay.mp3", coverPath: "covers/kya baat ay.jpg"},
    {songName: "Yaar Tera Superstar", filePath: "songs/Yaar-Tera-Superstar.mp3", coverPath: "covers/Yaar-Tera-Superstar.jpg"},
    {songName: "Love Dose", filePath: "songs/Love-Dose.mp3", coverPath: "covers/Love_dose_img.jpg"},
    {songName: "Kesriya Tera Ishq he Piya", filePath: "songs/Kesariya.mp3", coverPath: "covers/kesriya.jpg"},
    {songName: "Thoda Feeling gana rakhde", filePath: "songs/Yaari.mp3", coverPath: "covers/yaari.jpg"},
    {songName: "Me kisi aur ka hu filhal", filePath: "songs/Filhal.mp3", coverPath: "covers/filhal.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 

    console.log(element);

    let audioforduration = new Audio(songs[i].filePath);
    audioforduration.addEventListener("loadedmetadata", ()=>{
        const t_duration = audioforduration.duration;
        let songduration = formatTime(t_duration);
        element.getElementsByClassName("timestamp")[0].innerText = songduration;
    })
})
 
const formatTime = (time)=>{

    let ini_min_duration = Math.floor(time / 60) ;
    let ini_sec_duration = Math.floor(time % 60) ;

    if(ini_min_duration < 10)
    {
        ini_min_duration = `0${ini_min_duration}`;
    }

    if(ini_sec_duration < 10)
    {
        ini_sec_duration = `0${ini_sec_duration}`;
    }

    return `${ini_min_duration}:${ini_sec_duration}`;
}

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        songItemPlay[songIndex].classList.remove('fa-play-circle');
        songItemPlay[songIndex].classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        songItemPlay[songIndex].classList.remove('fa-pause-circle');
        songItemPlay[songIndex].classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    if(progress)
    myProgressBar.value = progress;

    let min_duration = Math.floor(audioElement.duration / 60) ;
    let sec_duration = Math.floor(audioElement.duration % 60) ;

    if(min_duration < 10)
    {
        min_duration = `0${min_duration}`;
    }

    if(sec_duration < 10)
    {
        sec_duration = `0${sec_duration}`;
    }

    if(audioElement.duration)
    {
    fin_time.textContent = `${min_duration}:${sec_duration}`;
    }

    let min_current = Math.floor(audioElement.currentTime / 60) ;
    let sec_current = Math.floor(audioElement.currentTime % 60) ;

    if(min_current < 10)
    {
        min_current = `0${min_current}`;
    }

    if(sec_current < 10)
    {
        sec_current = `0${sec_current}`;
    }

    ini_time.textContent = `${min_current}:${sec_current}`;

})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    songItemPlay.forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

songItemPlay.forEach((element)=>{
   // console.log(element);
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        let songIndexOrig = songIndex;
        songIndex = parseInt(e.target.id);
        if(audioElement.paused || audioElement.currentTime<=0)
        {
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            if(songIndex != songIndexOrig)
            {
            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            }
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
        else if(songIndexOrig != songIndex)
        {
            audioElement.pause();
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
        }
        else
        {
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            audioElement.pause();
            gif.style.opacity = 0;
            
        }
    })
})

const playNextSong = () => {

    myProgressBar.value = "0";

    songItemPlay[songIndex].classList.remove('fa-pause-circle');
    songItemPlay[songIndex].classList.add('fa-play-circle');

    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    songItemPlay[songIndex].classList.remove('fa-play-circle');
    songItemPlay[songIndex].classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}

const playPreviousSong = () =>{
    
    myProgressBar.value = "0";
    songItemPlay[songIndex].classList.remove('fa-pause-circle');
    songItemPlay[songIndex].classList.add('fa-play-circle');

    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    songItemPlay[songIndex].classList.remove('fa-play-circle');
    songItemPlay[songIndex].classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}

audioElement.addEventListener("ended",playNextSong);
next.addEventListener('click', playNextSong);
previous.addEventListener('click', playPreviousSong);