import React, { RefAttributes } from 'react';

export interface LogoProps extends RefAttributes<HTMLAnchorElement> {
  className?: string;
  isLink?: boolean;
}
