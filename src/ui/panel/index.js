import React from 'react';
import panelStyles from './panel.sass';

type ChildrenType = [ReactElement] | ReactElement;
type PanelProps = {
  children: ChildrenType
};

console.log('panelStyles', panelStyles);

export const Panel = ({ children }: PanelProps) => (
  <div className={panelStyles.panel}>
    {children}
  </div>
);

export const PanelHeading = ({ children }: PanelProps) => (
  <p className={panelStyles['panel-heading']}>
    {children}
  </p>
);

export const PanelBlock = ({ children }: PanelProps) => (
  <div className={panelStyles['panel-block']}>
    {children}
  </div>
);
