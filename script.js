const horas = document.getElementById('horas')
const minutos = document.getElementById('minutos')
const segundos = document.getElementById('segundos')

const relogio = setInterval(function time() {
    let dateToday = new Date();
    let hr = dateToday.getHours();
    let min = dateToday.getMinutes();
    let sec = dateToday.getSeconds();

    if (hr < 10) hr = '0' + hr;
    if (min < 10) min = '0' + min;
    if (sec < 10) sec = '0' + sec;

    horas.textContent = hr;
    minutos.textContent = min;
    segundos.textContent = sec;
})

const key = "74676c077f48d496208005c33abc62e6"

document.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        const btn = document.querySelector(".btn-search")
        btn.click()
    }
})

function updatescreen(dados) {
    document.querySelector(".cidade").innerHTML = "Tempo em: " + dados.name
    document.querySelector(".temp").innerHTML = "Faz: " + Math.floor(dados.main.temp) + "ºC Em " + dados.name
    document.querySelector(".txt-prev").innerHTML = dados.weather[0].description
    document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%"
    document.querySelector(".previsao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`
}

async function searchCity(cidade) {
    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`)
        .then(response => response.json())

    updatescreen(dados)
}

function search() {
    const cidade = document.querySelector(".input-search").value
    searchCity(cidade)
}

// Chama a função para buscar o tempo de Jundiaí ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    searchCity("Jundiaí")

    // Atualiza a cada 30 minutos (1800000 ms)
    setInterval(function() {
        searchCity("Jundiaí")
    }, 1800000)
})

const daysElement = document.querySelector("[data-days]");
const hoursElement = document.querySelector("[data-hours]");
const minutesElement = document.querySelector("[data-minutes]");
const secondsElement = document.querySelector("[data-seconds]");

const render = (days, hours, minutes, seconds) => {
    daysElement.innerHTML = days;
    hoursElement.innerHTML = hours;
    minutesElement.innerHTML = minutes;
    secondsElement.innerHTML = seconds;
};

const countdown = () => {
    const now = new Date();

    const vacationYear = now.getFullYear();
    const targetDate = new Date(vacationYear, 10, 21, 0, 0, 0); // 4 de janeiro às 16:00 do próximo ano

    const timeLeft = targetDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60 )) / 1000 );

    render(days, hours, minutes, seconds);
};

setInterval(countdown, 1000);

const dateDisplay = document.getElementById("date-display");

const daysOfWeek = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
const monthsOfYear = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

const updateDateDisplay = () => {
    const now = new Date();
    
    const dayOfWeek = daysOfWeek[now.getDay()];  // Obtém o dia da semana
    const day = now.getDate();                    // Obtém o dia do mês
    const month = monthsOfYear[now.getMonth()];   // Obtém o nome do mês
    const year = now.getFullYear();               // Obtém o ano
    
    // Formata a data
    const formattedDate = `${dayOfWeek}, ${day} de ${month} de ${year}`;
    
    // Exibe a data
    dateDisplay.innerHTML = formattedDate;
};

// Atualiza o mostrador assim que a página carrega
updateDateDisplay();

// Atualiza o mostrador automaticamente a cada 60 segundos (60000 ms)
setInterval(updateDateDisplay, 60000);
