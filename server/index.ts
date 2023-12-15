import express, { Request, Response } from 'express';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 3000;

// Проксирующий запрос к API для получения курсов валют
app.get('/rates', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      'https://api.nbp.pl/api/exchangerates/tables/A/',
    );
    res.json(response.data);
  } catch (error: any) {
    // Обработка ошибок запроса
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
