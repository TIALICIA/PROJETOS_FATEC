const btnSearch = document.getElementById('btnSearch');
const cityInput = document.getElementById('cityInput');
const resultContainer = document.getElementById('weatherResult');
const errorMessage = document.getElementById('errorMessage');

// Função principal de busca
async function fetchWeather() {
    const city = cityInput.value.trim();

    // 1. Validação para evitar buscas vazias 
    if (!city) {
        showError("Por favor, digite o nome de uma cidade.");
        return;
    }

    try {
        // Faz a chamada para a rota do seu servidor Express
        const response = await fetch(`/weather?city=${city}`);
        const data = await response.json();

        // 2. Tratamento de erro: Cidade não encontrada [cite: 47]
        if (!response.ok) {
            throw new Error(data.error || "Erro ao buscar dados");
        }

        // 3. Exibição das informações se houver sucesso [cite: 35]
        displayWeather(data);

    } catch (error) {
        showError(error.message);
    }
}

function displayWeather(data) {
    // Esconde erros e mostra o container de resultados
    errorMessage.classList.add('hidden');
    resultContainer.classList.remove('hidden');

    // Preenche os dados conforme o roteiro [cite: 36, 38, 39, 40, 41, 44]
    document.getElementById('cityName').textContent = `${data.city}, ${data.country}`;
    document.getElementById('temperature').textContent = `${Math.round(data.temp)}°C`;
    document.getElementById('feelsLike').textContent = `${Math.round(data.feels_like)}°C`;
    document.getElementById('humidity').textContent = `${data.humidity}%`;
    document.getElementById('description').textContent = data.description;
    
    // Ícone representando a condição climática [cite: 44]
    const iconCode = data.icon;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function showError(message) {
    resultContainer.classList.add('hidden');
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

// Evento de clique no botão
btnSearch.addEventListener('click', fetchWeather);

// Permitir busca ao apertar "Enter"
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') fetchWeather();
});