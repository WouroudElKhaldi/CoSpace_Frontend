import Image from "next/image";
import styles from "./aboutPage.module.css";
import ChecklistIcon from "@mui/icons-material/Checklist";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import FilterListIcon from "@mui/icons-material/FilterList";

import { Box } from "@mui/material";

export default function AboutUsPage() {
  const data = [
    {
      title: "Listing All Lebanon's Spaces",
      description:
        "Our platform provides a comprehensive directory of all coworking spaces in Lebanon, making it easy for individuals and businesses to find and compare options in one convenient location. From Tripoli, to Beirut, an, users can explore a diverse range of coworking spaces with detailed information on amenities, pricing, and location",
      icon: <ChecklistIcon />,
    },
    {
      title: "Effortless Booking Requests",
      description:
        "Say goodbye to tedious booking processes. Our website streamlines the booking request process, allowing users to submit inquiries or reservation requests directly to coworking spaces with just a few clicks. Whether you need a desk for a day or a dedicated office for a month, booking your ideal workspace has never been easier",
      icon: <ImportContactsIcon />,
    },
    {
      title: "Personalized Filter",
      description:
        "Discover the perfect workspace tailored to your needs. Our platform leverages intelligent algorithms to provide personalized recommendations based on your preferences, such as location, amenities, budget, and more. Say goodbye to endless scrolling and let us match you with the ideal coworking space in Lebanon",
      icon: <FilterListIcon />,
    },
  ];
  return (
    <Box
      sx={{
        ".MuiSvgIcon-root": {
          width: "1.6rem",
          height: "1.6rem",
          color: "#6f84ae",
        },
      }}
    >
      <section className={styles.hero_Container}>
        <div className={styles.img}></div> {/* Background container */}
        <div className={styles.content}>
          <div className={styles.slogan__container}>
            <p className={styles.slogan}>About Us</p>
          </div>
        </div>
      </section>
      <section className={styles.about}>
        <div className={styles.mission}>
          <span className={styles.title_holder}>
            <h2 className={styles.h2}>Our Mission</h2>
            <Image
              src="/title.svg"
              width={100}
              height={100}
              alt="image"
              className={styles.svg1}
            />
          </span>
          <p className={styles.p}>
            {`At CoSpace, we're dedicated to simplifying the search
            for coworking spaces in Lebanon. Our mission is to provide accurate,
            detailed listings that empower individuals and businesses to find
            the perfect workspace. We're committed to fostering inclusivity,
            community, and sustainability within Lebanon's coworking ecosystem`}
          </p>
        </div>
        <article className={styles.service_holder}>
          <span className={styles.title_holder}>
            <h2 className={styles.h2}>CoSpace Features</h2>
            <Image
              src="/title.svg"
              width={100}
              height={100}
              alt="image"
              className={styles.svg2}
            />
          </span>
          {data.map((service, index) => {
            const middle = index === 1 ? styles.middle : styles.topBottom;
            return (
              <section key={index} className={`${styles.service} ${middle}`}>
                <span className={styles.left}>
                  <Image
                    src="/service.svg"
                    width={100}
                    height={100}
                    alt={service.title}
                    className={styles.image}
                  />
                  <span className={styles.icon}>{index + 1}</span>
                </span>
                <span className={styles.right}>
                  <p className={styles.service_title}>
                    {service.icon} {service.title}
                  </p>

                  <p className={styles.description}>{service.description}</p>
                </span>
              </section>
            );
          })}
        </article>
      </section>
    </Box>
  );
}
