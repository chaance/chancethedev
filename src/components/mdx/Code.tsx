import React from 'react';
import cx from 'classnames';
import themeDark from 'prism-react-renderer/themes/nightOwl';
import themeLight from 'prism-react-renderer/themes/nightOwlLight';
import useDarkMode from 'use-dark-mode';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

const styles = require('./mdx.module.scss');

interface CodeProps {
  children: string;
  className: string;
  //language: Language;
  'react-live'?: boolean;
}

const Code: React.FC<CodeProps> = ({
  children,
  className,
  'react-live': live,
  ...props
}) => {
  const darkMode = useDarkMode(false);
  const codeTheme = darkMode.value ? themeDark : themeLight;
  const language = className.replace(/language-/, '') as Language;
  if (live) {
    return (
      <LiveProvider code={children.trim()} theme={codeTheme}>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    );
  }
  return (
    <Highlight
      {...defaultProps}
      code={children.trim()}
      language={language}
      theme={{
        ...codeTheme,
        plain: {
          ...codeTheme.plain,
          backgroundColor: 'var(--color-body-bg)',
        },
      }}
    >
      {({
        className: childClass,
        style,
        tokens,
        getLineProps,
        getTokenProps,
      }) => (
        <div className={cx(childClass, styles.code)} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </div>
      )}
    </Highlight>
  );
};

export default Code;
