import { LinkProps } from 'react-router-dom';

export type ICustomLinkProps = LinkProps & {
  type: 'header' | 'footer' | 'button';
};
