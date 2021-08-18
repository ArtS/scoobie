import 'braid-design-system/reset';
import 'loki/configure-react';

import { Stack, Text } from 'braid-design-system';
import React from 'react';
import { storiesOf } from 'sku/@storybook/react';

import { withDecorator } from '../storybook/decorator';
import Headings from '../storybook/markdown/headings.mdx';

import { SmartTextLink } from './SmartTextLink';
import { TocRenderer } from './TocRenderer';

storiesOf('TocRenderer', module)
  .addDecorator(withDecorator)
  .add('Example', () => (
    <Stack space="medium">
      <TocRenderer document={Headings}>
        {(toc) => (
          <Text>
            <Stack space="small">
              {toc.map((item) => (
                <SmartTextLink href={`#${item.id}`} key={item.id}>
                  {'|'.repeat(item.level)} {item.children}
                </SmartTextLink>
              ))}
            </Stack>
          </Text>
        )}
      </TocRenderer>
    </Stack>
  ));