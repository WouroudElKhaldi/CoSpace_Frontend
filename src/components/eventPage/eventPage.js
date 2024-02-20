import styles from "./eventPage.module.css";

export default function EventPage() {
  return (
    <div>
      <section className={styles.hero_Container}>
        <div className={styles.img}></div> {/* Background container */}
        <div className={styles.content}>
          <div className={styles.slogan__container}>
            <p className={styles.slogan}>Our Latest Events</p>
          </div>
        </div>
      </section>
    </div>
  );
}
