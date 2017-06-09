import React from 'react';
import { LinkToList, ListItem, ItemText, DeleteIcon } from './ListsStyles';
import {
  LayoutHorizontal,
  Flex1,
  LayoutVertical,
  Button,
  Icon,
  Icons
} from '../../ui';

type ListItemViewProps = {
  children: Array<any>,
  list: {},
  pathname: string
};

type ListsProps = {
  lists: Array<any>,
  deleteList(): any,
  pathname: string
};

const ListItemView = (
  { pathname, children, list, ...rest }: ListItemViewProps
) => (
  <ListItem {...rest}>
    {children}
  </ListItem>
);

export default ({ deleteList, lists, pathname }: ListsProps) => (
  <LayoutVertical alignSelf="stretch">
    {lists.map((list, index) => (
      <ListItem>
        <LayoutHorizontal flex={1} alignItems="center">
          <ItemText lvl="4">{list.name}</ItemText>
          <Flex1 />
          <DeleteIcon size="20" color="rgb(177, 177, 177)" icon={Icons.BIN2} />
          {/*<Button icon="remove" label="Add this" primary />*/}

          {/*<Button
            onClick={e => {
              deleteList(list.id);
              e.stopPropagation();
            }}
          >
            Delete
          </Button>*/}
        </LayoutHorizontal>
      </ListItem>
    ))}
  </LayoutVertical>
);
