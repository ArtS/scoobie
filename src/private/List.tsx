import { Box, Stack, Text } from 'braid-design-system';
import React, { ComponentProps, createContext, useContext } from 'react';
import { useStyles } from 'sku/react-treat';

import { DEFAULT_SIZE, SIZE_TO_PADDING, SIZE_TO_SPACE, Size } from './size';

import * as styleRefs from './List.treat';

interface ListContextValue {
  size: Size;
  type: ListType;
}

type ListType = 'ordered' | 'unordered';

const DEFAULT_TYPE: ListType = 'unordered';

const ListContext = createContext<ListContextValue>({
  size: DEFAULT_SIZE,
  type: DEFAULT_TYPE,
});

type Props = Pick<ComponentProps<typeof Stack>, 'children'> & {
  size?: Size;
};

export const ListItem = ({ children }: Props) => {
  const { size, type } = useContext(ListContext);

  const styles = useStyles(styleRefs);

  const space = SIZE_TO_SPACE[size];

  return type === 'ordered' ? (
    <Box component="li" className={styles.propagateGrid}>
      <Text aria-hidden size={size}>
        <Box className={styles.numbering} />
      </Text>

      <Stack space={space}>{children}</Stack>
    </Box>
  ) : (
    <Box display="flex">
      <Text aria-hidden size={size}>
        <Box
          alignItems="center"
          className={styles.bulletLineHeight[size]}
          display="flex"
          paddingRight={SIZE_TO_PADDING[size]}
        >
          <Box
            borderRadius="full"
            className={[styles.bulletColor, styles.bulletSize[size]]}
          />
        </Box>
      </Text>

      <Stack space={space}>{children}</Stack>
    </Box>
  );
};

export const OrderedList = ({ children, size = DEFAULT_SIZE }: Props) => {
  const styles = useStyles(styleRefs);

  return (
    <ListContext.Provider
      value={{
        size,
        type: 'ordered',
      }}
    >
      <Box
        className={[styles.listGrid[size], styles.orderedList]}
        component="ol"
      >
        {children}
      </Box>
    </ListContext.Provider>
  );
};

export const UnorderedList = ({ children, size = DEFAULT_SIZE }: Props) => (
  <ListContext.Provider
    value={{
      size,
      type: 'unordered',
    }}
  >
    <Stack component="ul" space={SIZE_TO_SPACE[size]}>
      {children}
    </Stack>
  </ListContext.Provider>
);
