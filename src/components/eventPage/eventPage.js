"use client";

import { getAllEvents } from "@/fetchData/event";
import styles from "./eventPage.module.css";
import useEventStore from "@/zustand/eventsStore";
import Loading from "../loading/loading";
import { EventComp } from "../eventComp/eventComp";
import { useState, useEffect } from "react";

export default function EventPage() {
  const [loading, setLoading] = useState(false);
  const { eventsData, setEventsData } = useEventStore();
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);

      const res = await getAllEvents();
      setEventsData(res.data);
      setLoading(false);
    };

    fetchEvents();
  }, [setEventsData]);
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
      <div className={styles.space_holder}>
        {loading ? (
          <Loading height={"40vh"} width={"100vw"} />
        ) : (
          <>
            {eventsData &&
              eventsData.map((event, index) => {
                return <EventComp key={index} data={event} />;
              })}
          </>
        )}
      </div>
    </div>
  );
}
