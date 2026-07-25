import app , { start } from './app';
import env from './config/env';

const PORT = env.PORT || 3000;

app.listen(PORT, async () => {
    await start();
    console.log('sunucu yayına geçti');
});
