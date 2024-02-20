"use client";

import { useEffect, useState } from "react";
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
import { getAllSpaces } from "@/fetchData/spaces";
import useSpaceStore from "@/zustand/spaceStore";
import { getAmenities } from "@/fetchData/amenities";
import useAmenityStore from "@/zustand/amenitiesStore";

export default function SpacesPage() {
  const { spacesData, setSpacesData } = useSpaceStore();
  const { amenitiesData, setAmenitiesData } = useAmenityStore();

  useEffect(() => {
    const fetchSpaceData = async () => {
      const res = await getAllSpaces();
      setSpacesData(res);
    };

    const fetchAmenityData = async () => {
      const res = await getAmenities();
      setAmenitiesData(res);
    };

    fetchAmenityData();
    fetchSpaceData();
  }, []);

  const filterData = async () => {};
  const amenities = [
    {
      name: "Amnity1",
      _id: "12314weedas12eq",
      category: "Business Facilities",
    },
    {
      name: "Amnity2",
      _id: "12314weedas12eq",
      category: "Additional Facilities",
    },
    {
      name: "Amnity3",
      _id: "12314weedas12eq",
      category: "Additional Facilities",
    },
    {
      name: "Amnity4",
      _id: "12314weedas12eq",
      category: "Additional Facilities",
    },
    { name: "Amnity5", _id: "12314weedas12eq", category: "Freebies" },
    { name: "Amnity5", _id: "12314weedas12eq", category: "Freebies" },
    { name: "Amnity5", _id: "12314weedas12eq", category: "Freebies" },
    { name: "Amnity6", _id: "12314weedas12eq", category: "Freebies" },
    { name: "Amnity7", _id: "12314weedas12eq", category: "Freebies" },
    { name: "Amnity8", _id: "12314weedas12eq", category: "Parking/Storage" },
    { name: "Amnity9", _id: "12314weedas12eq", category: "Parking/Storage" },
    { name: "Amnity0", _id: "12314weedas12eq", category: "Parking/Storage" },
  ];

  const [expanded, setExpanded] = useState(new Array(12).fill(false));
  const [collapsed, setCollapsed] = useState(false);

  const handleExpandClick = (index) => {
    const newExpanded = expanded.map((value, i) =>
      i === index ? !value : value
    );
    setExpanded(newExpanded);
  };

  // Group amenities by category
  const groupedAmenities = amenities.reduce((acc, amenity) => {
    if (!acc[amenity.category]) {
      acc[amenity.category] = [];
    }
    acc[amenity.category].push(amenity);
    return acc;
  }, {});

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
          <span
            className={styles.filter_icon1}
            onClick={() => setCollapsed(false)}
          >
            <CloseIcon />
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
              {Object.keys(groupedAmenities).map((category, index) => (
                <div className={styles.whatever} key={index + 4}>
                  <div
                    className={styles.filter_title}
                    onClick={() => handleExpandClick(index + 4)}
                  >
                    <span className={styles.filter_title_name_2}>
                      {category}
                    </span>
                    <span className={styles.filter_icon}>
                      {expanded[index + 4] ? (
                        <ExpandMoreIcon />
                      ) : (
                        <KeyboardArrowRightIcon />
                      )}
                    </span>
                  </div>
                  <div
                    className={`${styles.filter_card2} ${
                      expanded[index + 4] ? styles.shown : styles.hidden
                    }`}
                  >
                    <div>
                      <ul className={styles.checkbox_holder}>
                        {groupedAmenities[category].map((amenity, idx) => (
                          <li key={idx}>
                            <label className={styles.checkbox_label}>
                              <input
                                type="checkbox"
                                name={amenity.name}
                                id={amenity.name}
                                value={amenity._id}
                                className={styles.checkbox}
                              />
                              {amenity.name}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
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
          <p>{spacesData.length} results</p>
        </span>
        <div className={styles.card__Container}>
          {spacesData.map((space, index) => (
            <SpaceCard key={index} data={space} />
          ))}
        </div>
      </div>
    </section>
  );
}
