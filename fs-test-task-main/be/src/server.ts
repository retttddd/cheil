import { app } from './app.ts';
import { connectToDatabase } from './database.ts';

async function start(): Promise<void> {
  await connectToDatabase();

  const port = Number(process.env.PORT ?? 3000);
  app.listen(port, '0.0.0.0', (error) => {
    if (error) {
      console.error('Failed to start:', error);
      process.exit(1);
    }
    console.log(`Express running on port ${port}`);
  });
}

start().catch((error) => {
  console.error('Failed to start:', error);
  process.exit(1);
});
