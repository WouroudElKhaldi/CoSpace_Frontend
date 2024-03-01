"use client";

import styles from "./singleSpace.module.css";

export default function SingleSpace({ id }) {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>{id}</div>
    </div>
  );
}
