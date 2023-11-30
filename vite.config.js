import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});

// import ViteSassPlugin from 'vite-plugin-sass';

// export default {
//   plugins: [
//     ViteSassPlugin(),
//   ],
// };
