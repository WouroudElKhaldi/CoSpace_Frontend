"use client";

import { useState } from "react";
import SpaceCard from "../spaceCard/spaceCard";
import styles from "./spacesPage.module.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import WorkIcon from "@mui/icons-material/Work";
import ChairIcon from "@mui/icons-material/Chair";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function SpacesPage() {
  const businessAmenities = [
    { amenityName: "Wifi", amenityId: "12314weedas12eq" },
    { amenityName: "Wifi", amenityId: "12314weedas12eq" },
    { amenityName: "Wifi", amenityId: "12314weedas12eq" },
    { amenityName: "Wifi", amenityId: "12314weedas12eq" },
  ];

  const [expanded, setExpanded] = useState(new Array(5).fill(false));
  const [collapsed, setCollapsed] = useState(false);

  const handleExpandClick = (index) => {
    const newExpanded = expanded.map((value, i) =>
      i === index ? !value : value
    );
    setExpanded(newExpanded);
  };

  return (
    <section className={styles.space_Container}>
      <aside
        className={`${styles.filter__Container} ${
          collapsed ? styles.filter_displayed : styles.filter_hidden
        }`}
      >
        <span
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "700",
            fontSize: "1.5rem",
            alignItems: "center",
            color: "#b4602d",
          }}
        >
          Filters
          <span onClick={() => setCollapsed(false)}>
            <CloseIcon className={styles.filter_icon1} />
          </span>
        </span>
        <div className={styles.filter_holder}>
          <div
            className={styles.filter_title}
            onClick={() => handleExpandClick(0)}
          >
            <span className={styles.filter_title_name}>
              <span className={styles.filter_icon}>
                <PriceChangeIcon />
              </span>
              Budget ($)
            </span>
            <span className={styles.filter_icon}>
              {expanded[0] ? <ExpandMoreIcon /> : <KeyboardArrowRightIcon />}
            </span>
          </div>
          <div
            className={`${styles.filter_card} ${
              expanded[0] ? styles.shown : styles.hidden
            }`}
          >
            <div className={styles.input_holder}>
              <span className={styles.single_input}>
                <input type="number" className={styles.input_Number} />
                <span className={styles.dolar_Input}>$</span>
              </span>
              -
              <span className={styles.single_input}>
                <input type="number" className={styles.input_Number} />
                <span className={styles.dolar_Input}>$</span>
              </span>
            </div>
          </div>
        </div>
        <div className={styles.filter_holder}>
          <div
            className={styles.filter_title}
            onClick={() => handleExpandClick(1)}
          >
            <span className={styles.filter_title_name}>
              <span className={styles.filter_icon}>
                <WorkIcon />
              </span>
              Workkspace
            </span>
            <span className={styles.filter_icon}>
              {expanded[1] ? <ExpandMoreIcon /> : <KeyboardArrowRightIcon />}
            </span>
          </div>
          <div
            className={`${styles.filter_card} ${
              expanded[1] ? styles.shown : styles.hidden
            }`}
          >
            <div className={styles.input_holder}>
              <span className={styles.single_input}>
                <input type="number" className={styles.input_Number} />
                <span className={styles.dolar_Input}>$</span>
              </span>
              -
              <span className={styles.single_input}>
                <input type="number" className={styles.input_Number} />
                <span className={styles.dolar_Input}>$</span>
              </span>
            </div>
          </div>
        </div>
        <div className={styles.filter_holder}>
          <div
            className={styles.filter_title}
            onClick={() => handleExpandClick(2)}
          >
            <span className={styles.filter_title_name}>
              <span className={styles.filter_icon}>
                <ChairIcon />
              </span>
              Amenities
            </span>
            <span className={styles.filter_icon}>
              {expanded[2] ? <ExpandMoreIcon /> : <KeyboardArrowRightIcon />}
            </span>
          </div>
          <div className={`${expanded[2] ? styles.shown : styles.hidden}`}>
            <div className={styles.filter_holder2}>
              <div
                className={styles.filter_title}
                onClick={() => handleExpandClick(3)}
              >
                <span className={styles.filter_title_name_2}>
                  Business Facilities
                </span>
                <span className={styles.filter_icon}>
                  {expanded[3] ? (
                    <ExpandMoreIcon />
                  ) : (
                    <KeyboardArrowRightIcon />
                  )}
                </span>
              </div>
              <div
                className={`${styles.filter_card} ${
                  expanded[3] ? styles.shown : styles.hidden
                }`}
              >
                <ul className={styles.checkbox_holder}>
                  <li>
                    {" "}
                    <label className={styles.checkbox_label}>
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className={styles.checkbox}
                      />
                      Wifi
                    </label>
                  </li>
                  <li>
                    {" "}
                    <label className={styles.checkbox_label}>
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className={styles.checkbox}
                      />
                      Wifi
                    </label>
                  </li>
                  <li>
                    {" "}
                    <label className={styles.checkbox_label}>
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className={styles.checkbox}
                      />
                      Wifi
                    </label>
                  </li>
                  <li>
                    {" "}
                    <label className={styles.checkbox_label}>
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className={styles.checkbox}
                      />
                      Wifi
                    </label>
                  </li>
                  <li>
                    {" "}
                    <label className={styles.checkbox_label}>
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className={styles.checkbox}
                      />
                      Wifi
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div className={styles.card_main}>
        <button
          className={styles.filter_collapse}
          onClick={() => setCollapsed(true)}
        >
          Filters
          <FilterListIcon className={styles.filter_icon1} />
        </button>
        <span className={styles.search_holder}>
          <span
            style={{
              height: "100%",
            }}
          >
            <SearchIcon className={styles.search_icon} />
            <input type="text" className={styles.search_input} />
          </span>
          <p>17 results</p>
        </span>
        <div className={styles.card__Container}>
          <SpaceCard />
          <SpaceCard />
          <SpaceCard />
          <SpaceCard />
          <SpaceCard />
          <SpaceCard />
          <SpaceCard />
          <SpaceCard />
          <SpaceCard />
          <SpaceCard />
          <SpaceCard />
          <SpaceCard />
          <SpaceCard />
        </div>
      </div>
    </section>
  );
}
