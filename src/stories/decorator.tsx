import { BraidProvider, ContentBlock, Card } from 'braid-design-system';
import seekAnz from 'braid-design-system/themes/seekAnz';
import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter } from 'react-router-dom';
import { addDecorator } from 'sku/@storybook/react';
import { MdxProvider } from 'src';
import { robotoHref, robotoMonoHref } from 'typography';

type DecoratorFunction = Parameters<typeof addDecorator>[0];

export const withBraid: DecoratorFunction = (story) => (
  <BraidProvider theme={seekAnz}>
    <MdxProvider graphqlPlayground="https://graphql.seek.com/graphql">
      <BrowserRouter>
        <Helmet>
          <link href={robotoHref} rel="stylesheet" />
          <link href={robotoMonoHref} rel="stylesheet" />
        </Helmet>
        <ContentBlock>
          <Card>{story()} </Card>
        </ContentBlock>
      </BrowserRouter>
    </MdxProvider>
  </BraidProvider>
);