import React from 'react';
import theme from 'prism-react-renderer/themes/duotoneDark';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { getBem } from '$lib/utils';

let bem = getBem('mdx');

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
  const language = className.replace(/language-/, '') as Language;
  if (live) {
    return (
      <LiveProvider code={children.trim()} theme={theme}>
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
      theme={theme}
    >
      {({
        className: childClass,
        style,
        tokens,
        getLineProps,
        getTokenProps,
      }) => (
        <pre className={bem({ el: 'pre' }, childClass)} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default Code;
