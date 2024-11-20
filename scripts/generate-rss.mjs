import { generateRssFeed } from '../src/lib/rss.js';

try {
  await generateRssFeed();
  console.log('RSS feed generated successfully!');
} catch (error) {
  console.error('Failed to generate RSS feed:', error);
  process.exit(1);
}
