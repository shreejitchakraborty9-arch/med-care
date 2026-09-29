import fs from 'fs';

const config = `window.ENV = {
  FIREBASE_API_KEY: "${process.env.FIREBASE_API_KEY}",
  GEMINI_API_KEY: "${process.env.GEMINI_API_KEY}",
  MAPS_API_KEY: "${process.env.MAPS_API_KEY}",
  GEMINI_MODEL: "gemini-3.5-flash-lite"
};`;

fs.writeFileSync('env-config.js', config);
console.log('env-config.js created successfully');
