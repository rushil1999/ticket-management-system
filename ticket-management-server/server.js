
import app from './index';

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });