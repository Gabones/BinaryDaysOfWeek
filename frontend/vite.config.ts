import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        // Define a URL base como uma variável global
        "import.meta.env.__API_BASE_URL__": JSON.stringify(
            "https://localhost:7262"
        )
    }
});
