import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('views'));

// Rota principal para buscar o clima [cite: 34]
app.get('/weather', async (req: Request, res: Response) => {
    const city = req.query.city as string;


    // Validação para evitar buscas vazias [cite: 48]
if (!city) {
    return res.status(400).json({ error: "Cidade é obrigatória" }); 
}

try {
    const apiKey = process.env.API_KEY; // Lendo do arquivo .env [cite: 53, 54]
    
    // Integração com API pública (Open WeatherMap) [cite: 19, 23]
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${apiKey}`;
    
    const response = await axios.get(url);
    const data = response.data; // Manipular dados em formato JSON [cite: 12]

    // Retornando os dados conforme as funcionalidades do sistema [cite: 33]
    res.json({
        city: data.name,           // Nome da cidade [cite: 36]
        country: data.sys.country, // País [cite: 36]
        temp: data.main.temp,      // Temperatura atual [cite: 38]
        feels_like: data.main.feels_like, // Sensação térmica [cite: 39]
        humidity: data.main.humidity,    // Umidade [cite: 40]
        description: data.weather[0].description, // Condição do tempo [cite: 41]
        icon: data.weather[0].icon // Ícone correspondente [cite: 44]
    });
} catch (error) {
    // Tratar erros: Mensagem quando a cidade não é encontrada [cite: 14, 45, 47]
    res.status(404).json({ error: "Cidade não encontrada" }); 
}});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});