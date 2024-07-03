const express = require('express');
const app = express();
const cors = require('cors');
const port = 4212;

app.use(cors({
	origin: 'http://192.168.0.102:4212',
	methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
// Настройка статических файлов
app.use(express.static(__dirname + '/public'));

// Запуск сервера
app.listen(port, '192.168.0.102', () => {
  console.log(`Сервер запущен на http://192.168.0.102:${port}`);
});


