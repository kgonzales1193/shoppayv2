import styles from './styles.module.scss';
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  TwitterShareButton,
} from 'react-share';

import { FacebookIcon, FacebookMessengerIcon, TwitterIcon } from 'react-share';

export default function Share() {
  return (
    <div className={styles.share}>
      <FacebookShareButton url={window?.location.href}>
        <FacebookIcon size={38} />
      </FacebookShareButton>
      <FacebookMessengerShareButton url={window?.location.href}>
        <FacebookMessengerIcon size={38} />
      </FacebookMessengerShareButton>
      <TwitterShareButton url={window?.location.href}>
        <TwitterIcon size={38} />
      </TwitterShareButton>
    </div>
  );
}
