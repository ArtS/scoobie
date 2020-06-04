import {
  Box,
  Column,
  Columns,
  IconCopy,
  IconTick,
  IconNewWindow,
  Inline,
  Text,
} from 'braid-design-system';
import React, { ReactChild, ReactNodeArray, useState } from 'react';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { ghcolors } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useStyles } from 'sku/react-treat';

import { codeCommentColor, monospaceFontFamily } from '../styles';

import * as styleRefs from './CodeBlock.treat';

const CODE_LANGUAGE_REPLACEMENTS: Record<string, string> = {
  js: 'javascript',
  jsonc: 'json',
  sh: 'bash',
  shell: 'bash',
  splunk: 'splunk-spl',
  ts: 'typescript',
};

const Code = ({ children }: { children: ReactChild }) => {
  const styles = useStyles(styleRefs);

  return (
    <Box className={styles.codeTag} component="code">
      {children}
    </Box>
  );
};

const CopyButton = ({ children }: { children: string }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const styles = useStyles(styleRefs);

  const copyText = () => {
    if (copied) {
      return;
    }

    setCopied(true);

    const textarea = document.createElement('textarea');
    textarea.readOnly = true;
    textarea.style.height = '0';
    textarea.style.opacity = '0.01';
    textarea.style.position = 'absolute';
    textarea.style.zIndex = '-1';
    textarea.value = children;

    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand('copy');
    textarea.remove();

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box
      background={copied ? 'positiveLight' : 'card'}
      borderRadius="standard"
      className={styles.buttonOuter}
      onClick={copyText}
      padding="xxsmall"
      transition="touchable"
      title="Copy to Clipboard"
    >
      <Box className={styles.buttonInner} transition="touchable">
        {copied ? (
          <IconTick size="xsmall" tone="positive" />
        ) : (
          <IconCopy size="xsmall" tone="link" />
        )}
      </Box>
    </Box>
  );
};

const GraphQLPlaygroundButton = ({
  graphqlPlayground,
  children,
}: {
  graphqlPlayground: string;
  children: string;
}) => {
  const styles = useStyles(styleRefs);

  const tryInPlayground = () => {
    const graphqlPlaygroundUrl = new URL(graphqlPlayground);
    graphqlPlaygroundUrl.searchParams.set('query', children);

    window.open(graphqlPlaygroundUrl.toString(), '_blank');
  };

  return (
    <Box
      background="card"
      borderRadius="standard"
      className={styles.buttonOuter}
      onClick={tryInPlayground}
      padding="xxsmall"
      transition="touchable"
      title="Try in Playground"
    >
      <Box className={styles.buttonInner} transition="touchable">
        <IconNewWindow size="xsmall" tone="link" />
      </Box>
    </Box>
  );
};

const Pre = ({ children: [numbers, lines] }: { children: ReactNodeArray }) => {
  const styles = useStyles(styleRefs);

  return (
    <Box className={styles.preTag} component="pre">
      <Columns space="none">
        <Column width="content">
          <Box background="neutralLight" padding="medium">
            <Text size="small">{numbers}</Text>
          </Box>
        </Column>
        <Column>
          <Box padding="medium">
            <Text size="small">{lines}</Text>
          </Box>
        </Column>
      </Columns>
    </Box>
  );
};

export const CodeBlock = ({
  children,
  language = 'text',
  graphqlPlayground,
}: {
  children: string;
  language: string;
  graphqlPlayground?: string;
}) => {
  const styles = useStyles(styleRefs);

  const codeValue = children.trim();

  const graphqlPlaygroundButton =
    language === 'graphql' && graphqlPlayground ? (
      <GraphQLPlaygroundButton graphqlPlayground={graphqlPlayground}>
        {codeValue}
      </GraphQLPlaygroundButton>
    ) : undefined;

  return (
    <Box className={styles.codeBlock} position="relative">
      <SyntaxHighlighter
        CodeTag={Code}
        PreTag={Pre}
        language={CODE_LANGUAGE_REPLACEMENTS[language] ?? language}
        lineNumberContainerProps={{
          style: {
            color: codeCommentColor,
            fontFamily: monospaceFontFamily,
            fontSize: 'inherit',
            lineHeight: 'inherit',
            userSelect: 'none',
          },
        }}
        showLineNumbers
        style={ghcolors}
      >
        {codeValue}
      </SyntaxHighlighter>

      <Box marginRight="small" position="absolute" right={0} top={0}>
        <Inline space="xsmall">
          <CopyButton>{codeValue}</CopyButton>
          {graphqlPlaygroundButton}
        </Inline>
      </Box>
    </Box>
  );
};
