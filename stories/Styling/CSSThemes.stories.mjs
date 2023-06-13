import Source from '@idesigncode/storybook-tools/Source.mjs';
import ThemeDarkRaw from '../../src/_theme.dark.vars.scss?raw';
import ThemeRaw from '../../src/theme.scss?raw';

export default {
  title: 'Styling/CSS (themes)',
  component: Source,
};

export const CombinedImport = {
  args: {
    code: `import '../../theme.css';`,
  },
};

export const CombinedImportThemeToggling = {
  args: {
    code: `${ThemeRaw}`
      // Split each line to array
      .split('\n')
      // Remove the @use lines
      .filter((line) => !line.startsWith('@use'))
      // Format the @include lines to comments
      .map((line) => {
        return line
          .replace('@include ', '// ...')
          .replace('.vars;', ' CSS variables (see below)');
      })
      // Rejoin as multiline string
      .join('\n'),
  },
};

export const SeparateImport = {
  args: {
    code: [
      `import '../../theme.dark.css';`,
      `import '../../theme.light.css';`,
    ].join('\r\n'),
  },
};

export const SeparateImportVars = {
  args: {
    code: `${ThemeDarkRaw}`
      // Split each line to array
      .split('\n')
      // Keep only lines with CSS variables
      .filter((line) => {
        return !line.startsWith('@use');
      })
      .map((line) => {
        // Remove CSS variables values
        if (line.trim().startsWith('--')) {
          const [cssVarDeclaration] = line.split(':');
          return cssVarDeclaration;
        }
        // Indicate the CSS variables are set on the `body`
        return line.replace('@mixin vars', 'body');
      })
      // Rejoin as multiline string
      .join('\n'),
  },
};
