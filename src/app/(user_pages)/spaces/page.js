import SpacesPage from "@/components/spacesPage/spacesPage";
import styles from "./page.module.css";
import { getAllSpaces } from "@/fetchData/spaces";

export default async function Spaces() {
  const spaceData = await getAllSpaces();
  return (
    <main>
      <section className={styles.hero_Container}>
        <div className={styles.img}></div> {/* Background container */}
        <div className={styles.content}>
          <div className={styles.slogan__container}>
            <p className={styles.slogan}>
              Coworking spaces designed for you to
            </p>
          </div>
        </div>
      </section>
      <section className={styles.container}>
        <SpacesPage />
      </section>
    </main>
  );
}
