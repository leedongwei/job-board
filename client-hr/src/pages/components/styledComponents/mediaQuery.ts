import { css } from 'styled-components';

const sizes = {
  desktop: 1000,
  tablet: 700,
}

// Iterate through the sizes and create a media template
const mediaQuery = Object.keys(sizes)
  .reduce((acc, label) => {
    acc[label] = (args: any) => css`
      @media (min-width: ${sizes[label] / 16}em) {
        ${css(args)}
      }
    `;

    return acc
  }, {} as {
    desktop: any;
    tablet: any;
  });

export default mediaQuery;
