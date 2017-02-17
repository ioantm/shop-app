import React from 'react';
import { Link } from 'react-router-dom';
import { ListsContainer } from './ListsStyles';
import { ListItem, Button } from '../../ui';
import { LayoutHorizontal, Flex1 } from '../../ui/layout';

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
  <Link to={`${pathname}/${list.id}`}>
    <ListItem {...rest}>
      {children}
    </ListItem>
  </Link>
);

export default ({ deleteList, lists, pathname }: ListsProps) => (
  <ListsContainer>
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
          <Button
            onClick={e => {
              deleteList(list.id);
              e.stopPropagation();
            }}
          >
            Delete
          </Button>
        </LayoutHorizontal>
      </ListItemView>
    ))}
  </ListsContainer>
);
