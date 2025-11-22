import app , { start } from './src/app';
import env from './src/config/env';

const PORT = env.PORT || 3000;

app.listen(PORT, async () => {
    await start();
    console.log('sunucu yayına geçti');
});
