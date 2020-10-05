module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: ["./src/**/*.svelte", "./src/**/*.html"],
    options: {
      whitelist: ["text-red-500", "text-orange-500", "text-green-500", "text-green-800", "text-black"],
    }
  },
  theme: {
    extend: {
      colors: {
        infer: "#2e85ff",
        "infer-action": "#2174ea",
      },
      fontSize: {
        base: ["20px", "28px"],
      },
      maxHeight: {
        modal: "600px"
      }
    },
  },
  variants: {},
  plugins: [],
};
