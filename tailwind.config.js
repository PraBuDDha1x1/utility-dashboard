module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", "sans-serif"],
      },
      colors: {
        dark: {
          background: "#0F172A",
          surface: "#1E293B",
          primary: "#38BDF8",
          text: "#F8FAFC"
        },
        light: {
          background: "#F8FAFC",
          surface: "#FFFFFF",
          primary: "#0EA5E9",
          text: "#0F172A"
        }
      }
    },
  },
  plugins: [],
}