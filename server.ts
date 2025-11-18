import app from './src/app';
import env from './src/config/env';

const PORT = env.PORT || 3000;

app.listen(PORT, ():void => {
    console.log('sunucu yayına geçti')
})
