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
import { getAllSpaces, filterSpaces, searchSpace } from "@/fetchData/spaces";
import useSpaceStore from "@/zustand/spaceStore";
import { getAmenities } from "@/fetchData/amenities";
import useAmenityStore from "@/zustand/amenitiesStore";
import { getCategories } from "@/fetchData/categories";
import useCategoryStore from "@/zustand/categoryStore";
import { Box } from "@mui/material";
import Image from "next/image";
import Loading from "../loading/loading";

export default function SpacesPage() {
  const { spacesData, setSpacesData } = useSpaceStore();
  const { amenitiesData, setAmenitiesData } = useAmenityStore();
  const { categoryData, setCategoryData } = useCategoryStore();

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [data, setData] = useState("");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  useEffect(() => {
    const fetchSpaceData = async () => {
      setLoading(true);
      const res = await getAllSpaces();
      setSpacesData(res.data);
      setLoading(true);
    };

    const fetchAmenityData = async () => {
      setLoading(true);
      const res = await getAmenities();
      setAmenitiesData(res);
      setLoading(true);
    };

    const fetchCategoryData = async () => {
      setLoading(true);
      const res = await getCategories();
      setCategoryData(res);
      setLoading(true);
    };

    fetchCategoryData();
    fetchAmenityData();
    fetchSpaceData();
  }, [
    minPrice,
    maxPrice,
    selectedAmenities,
    selectedCategories,
    setAmenitiesData,
    setCategoryData,
    setSpacesData,
  ]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await searchSpace({ data });
    setSpacesData(res.data);
    setSearched(true);
  };

  useEffect(() => {
    const filterData = async () => {
      const res = await filterSpaces({
        minPrice: minPrice,
        maxPrice: maxPrice,
        selectedAmenities: selectedAmenities,
        selectedCategories: selectedCategories,
      });
      // setSpacesData(res);
    };
    // Check if any amenity or category is chosen
    if (selectedAmenities.length > 0 || selectedCategories.length > 0) {
      filterData();
    }
  }, [selectedAmenities, selectedCategories, maxPrice, minPrice]);

  const [expanded, setExpanded] = useState(new Array(12).fill(false));
  const [collapsed, setCollapsed] = useState(false);

  const handleExpandClick = (index) => {
    const newExpanded = expanded.map((value, i) =>
      i === index ? !value : value
    );
    setExpanded(newExpanded);
  };

  // Group amenities by category
  const groupedAmenities = amenitiesData.reduce((acc, amenity) => {
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
                <input
                  type="number"
                  className={styles.input_Number}
                  onChange={(e) => {
                    setMinPrice(e.target.value);
                  }}
                />
                <span className={styles.dolar_Input}>$</span>
              </span>
              -
              <span className={styles.single_input}>
                <input
                  type="number"
                  className={styles.input_Number}
                  onChange={(e) => {
                    setMaxPrice(e.target.value);
                  }}
                />
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
            <div>
              <ul className={styles.checkbox_holder}>
                {categoryData.map((category, index) => {
                  return (
                    <li key={index}>
                      <label
                        htmlFor={category._id}
                        className={styles.checkbox_label}
                      >
                        <input
                          type="checkbox"
                          name={category.name}
                          value={category._id}
                          id={category._id}
                          className={styles.checkbox}
                          onChange={() => {
                            if (selectedCategories.includes(category._id)) {
                              setSelectedCategories(
                                selectedCategories.filter(
                                  (id) => id !== category._id
                                )
                              );
                            } else {
                              setSelectedCategories([
                                ...selectedCategories,
                                category._id,
                              ]);
                            }
                          }}
                        />
                        {category.name}
                      </label>
                    </li>
                  );
                })}
              </ul>
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
                            <label
                              htmlFor={amenity.name}
                              className={styles.checkbox_label}
                            >
                              <input
                                type="checkbox"
                                name={amenity.name}
                                id={amenity.name}
                                value={amenity._id}
                                className={styles.checkbox}
                                onChange={() => {
                                  if (selectedAmenities.includes(amenity._id)) {
                                    setSelectedAmenities(
                                      selectedAmenities.filter(
                                        (id) => id !== amenity._id
                                      )
                                    );
                                  } else {
                                    setSelectedAmenities([
                                      ...selectedAmenities,
                                      amenity._id,
                                    ]);
                                  }
                                }}
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
      <Box
        className={styles.card_main}
        sx={{
          ".MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input ":
            {
              maxHeight: "2.5rem",
              height: "2.5rem",
              padding: 0,
            },
          ".MuiSelect-nativeInput": {
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          ".MuiInputLabel-root": {
            top: "-7px",
            color: "#4d6188",
          },
          ".Mui-focused.MuiInputLabel-root": {
            top: 0,
          },
          ".MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input":
            {
              display: "flex",
              alignItems: "center",
              paddingLeft: "0.5rem",
              fontSize: "0.9rem",
            },
        }}
      >
        <button
          className={styles.filter_collapse}
          onClick={() => setCollapsed(true)}
        >
          Filters
          <FilterListIcon className={styles.filter_icon1} />
        </button>
        <span className={styles.search_holder}>
          <form className={styles.span} onSubmit={(e) => handleSearch(e)}>
            <SearchIcon className={styles.search_icon} />
            <input
              type="text"
              className={styles.search_input}
              placeholder="Search"
              name="search"
              id="search"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
            <input
              className={`${styles.button} ${styles.submit}`}
              type="submit"
              value={"Search"}
            />
          </form>
          <span
            className={`${styles.button} ${styles.clear}`}
            onClick={() => {
              setData("");
              fetchSpaceData();
              setSearched(false);
            }}
          >
            Clear
          </span>
        </span>
        {searched === true && (
          <p>
            {spacesData.length} Results for {`'${data}'`}
          </p>
        )}
        <div className={styles.card__Container}>
          {loading ? (
            <Loading height={"50vh"} width={"70vh"} />
          ) : (
            <>
              {spacesData.map((space, index) => (
                <SpaceCard key={index} data={space} />
              ))}
            </>
          )}
        </div>
        {!loading && spacesData.length === 0 && (
          <div className={styles.noResult}>
            <Image src="/search.png" width={300} height={300} alt="no result" />
            <p>No spaces found!!</p>
          </div>
        )}
      </Box>
    </section>
  );
}
