export const theme = {
    name: 'custom-theme',
    overrides: [
      {
        colorMode: 'dark',
        tokens: {
          components: {
            authenticator: {
              modal: {
                background: {
                  color: 'rgba(28,25,23,1)',
                }
              }
            },
            tabs: {
              item: {
                active: {
                  color: '{colors.black}',
                  border: {
                    color: '{colors.black}',
                  }
                }
              }
            },
            button: {
              primary: {
                background: {
                  color: '{colors.black}',
                }
              }
            }
          },
        },
      },
    ],
  };
