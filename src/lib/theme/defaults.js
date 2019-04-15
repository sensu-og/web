// Overrides defaults provided by Material-UI (material-ui/src/styles)
const defaults = {
  direction: "ltr",
  palette: {
    success: { main: "rgb(151, 198, 115)", secondary: "rgb(151, 198, 115)" },
    warning: { main: "rgb(213, 171, 59)", secondary: "rgb(255,160,0)" },
    critical: { main: "rgb(204, 62, 100)" },
    unknown: { main: "rgb(211, 97, 53)" },
  },
  typography: () => {
    // Prefer 'Display' for larger fonts
    // https://developer.apple.com/ios/human-interface-guidelines/visual-design/typography/
    const title = `"SF Pro Display", "Segoe UI Light", "Roboto", "Helvetica", "Arial", sans-serif`;
    const body = `"SF Pro Text", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif`;
    const mono = `"SFMono-Regular", Consolas, "Liberation Mono", Menlo,Courier, monospace`;

    return {
      fontFamily: title,
      body1: {
        fontFamily: body,
      },
      body2: {
        fontFamily: body,
      },
      button: {
        fontFamily: title,
        fontWeight: "bold",
      },
      monospace: {
        fontFamily: mono,
      },

      // https://material-ui.com/style/typography/#migration-to-typography-v2
      useNextVariants: true,
    };
  },
  overrides: {
    MuiDialog: {
      root: {
        backdropFilter: "blur(3px)",
        transition: "backdropFilter 300ms ease-in-out",
      },
    },
  },
};

export default defaults;
