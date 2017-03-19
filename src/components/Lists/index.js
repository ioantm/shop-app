import React from 'react';
import { LinkToList } from './ListsStyles';
import {
  LayoutHorizontal,
  Flex1,
  LayoutVertical,
  ListItem,
  Button
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
  <LinkToList to={`${pathname}/${list.id}`}>
    <ListItem {...rest}>
      {children}
    </ListItem>
  </LinkToList>
);

export default ({ deleteList, lists, pathname }: ListsProps) => (
  <LayoutVertical alignSelf="stretch">
    {lists.map((list, index) => (
      <ListItemView
        pathname={pathname}
        list={list}
        isFirst={index === 0}
        isLast={index === list.length - 1}
        key={list.id}
      >
        <LayoutHorizontal flex={1}>
          {list.name}
          <Flex1 />
          <Button icon="remove" label="Add this" primary />

          {/*<Button
            onClick={e => {
              deleteList(list.id);
              e.stopPropagation();
            }}
          >
            Delete
          </Button>*/}
        </LayoutHorizontal>
      </ListItemView>
    ))}
  </LayoutVertical>
);
