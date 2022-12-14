import React, { FC } from 'react';
import cn from 'classnames';

import { Link } from 'react-router-dom';
import { useTypedSelector } from '../../../hooks';
import { IAvatarProps } from './avatar.props';
import { BACKEND_URL } from '../../../config/backend.config';
import userImg from '../../../assets/images/user.png';

import styles from './avatar.module.scss';

export const Avatar: FC<IAvatarProps> = ({ className, ...props }) => {
  const { user } = useTypedSelector((state) => state.user);

  return (
    user && (
      <Link className={cn(styles.avatar, className)} {...props}>
        <img
          className={styles.img}
          src={user.photo ? `${BACKEND_URL.base}${user.photo}` : userImg}
          alt={`${user.first_name} ${user.last_name}`}
        />
        <span className={styles.caption}>{`${user.first_name} ${user.last_name}`}</span>
      </Link>
    )
  );
};
