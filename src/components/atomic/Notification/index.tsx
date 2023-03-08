import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';

import { INotificationProps } from './notification.props';
import CrossIcon from './assets/cross.svg';
import SuccessIcon from './assets/success.svg';
import DeleteIcon from './assets/delete.svg';
import { Card } from '../Card';

import styles from './notification.module.scss';

export const Notification: FC<INotificationProps> = ({
  status = 'success',
  time = 5_000,
  isVisible = false,
  className,
  children,
  ...props
}) => {
  const [visible, setVisible] = useState<boolean>(isVisible);

  const hideNotification = () => {
    setVisible(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, time);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Card
      className={cn(styles.notification, className, {
        [styles.notification_visible]: visible,
      })}
      {...props}
    >
      <DeleteIcon onClick={hideNotification} className={styles.delete} />
      {status === 'success' && <SuccessIcon className={styles.icon} />}
      {status === 'failed' && <CrossIcon className={styles.icon} />}
      <p className={styles.text}>{children}</p>
    </Card>
  );
};
