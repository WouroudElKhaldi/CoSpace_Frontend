"use client";

import React, { useState, useEffect } from "react";
import styles from "./navbar.module.css";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import { AuthContext } from "@/context/authContext";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [nav, setNav] = useState(false);
  const pathname = usePathname();

  return (
    // Header Container
    <header className={`${styles.headerContainer}`}>
      <div className={styles.navbar}>
        <Link href="/">
          <div>
            <p>CoWork</p>
          </div>
        </Link>
        <div className={styles.whatever}>
          <nav style={{ display: "flex", gap: "2rem" }}>
            <ul
              className={
                nav ? [styles.menu, styles.active].join(" ") : [styles.menu]
              }
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {nav ? (
                <span
                  className={`${styles.closeMenu}`}
                  onClick={() => setNav(!nav)}
                >
                  <AiOutlineClose size={25} />
                </span>
              ) : (
                ""
              )}
              <li>
                <Link
                  href="/"
                  activeclassname={styles.activeLink}
                  className={`${styles.menuItem} ${
                    ["/", "/login", "/signup", "/spaces"].includes(pathname)
                      ? styles.white
                      : styles.black
                  } ${["/"].includes(pathname) ? styles.activeNavItem : ""}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/spaces"
                  activeclassname={styles.activeLink}
                  className={`${styles.menuItem} ${
                    ["/", "/login", "/signup", "/spaces"].includes(pathname)
                      ? styles.white
                      : styles.black
                  } ${
                    ["/spaces"].includes(pathname) ? styles.activeNavItem : ""
                  }`}
                >
                  Spaces
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  activeclassname={styles.activeLink}
                  className={`${styles.menuItem} ${
                    ["/", "/login", "/signup", "/spaces"].includes(pathname)
                      ? styles.white
                      : styles.black
                  } ${
                    ["/events"].includes(pathname) ? styles.activeNavItem : ""
                  }`}
                >
                  Events
                </Link>
              </li>

              {/* Link for About Us */}
              <li>
                <Link
                  href="/contactus"
                  activeclassname={styles.activeLink}
                  className={`${styles.menuItem} ${
                    ["/", "/login", "/signup", "/spaces"].includes(pathname)
                      ? styles.white
                      : styles.black
                  } ${
                    ["/contactus"].includes(pathname)
                      ? styles.activeNavItem
                      : ""
                  } `}
                >
                  Contact Us
                </Link>
              </li>

              {/* Link for Contact Us */}
              <li>
                <Link
                  href="/aboutus"
                  activeclassname={styles.activeLink}
                  className={`${styles.menuItem} ${
                    ["/", "/login", "/signup", "/spaces"].includes(pathname)
                      ? styles.white
                      : styles.black
                  } ${
                    ["/aboutus"].includes(pathname) ? styles.activeNavItem : ""
                  }`}
                >
                  About Us
                </Link>
              </li>

              {user ? (
                user.role === "admin" ? (
                  <li>
                    <Link
                      href="/dashboard"
                      activeclassname={styles.activeLink}
                      className={`${styles.menuItem} ${
                        ["/", "/login", "/signup", "/spaces"].includes(pathname)
                          ? styles.white
                          : styles.black
                      }`}
                    >
                      Dashboard
                    </Link>
                  </li>
                ) : (
                  <button onClick={() => logout} className={styles.button}>
                    Logout
                  </button>
                )
              ) : (
                <>
                  <li>
                    <Link className={styles.button} href="/login">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link className={styles.button} href="/signup">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>

          <div
            onClick={() => setNav(!nav)}
            className={`${styles.mobile_btn} ${
              ["/", "/login", "/signup", "/spaces"].includes(pathname)
                ? styles.white
                : styles.black
            }`}
          >
            {!nav ? <AiOutlineMenu size={25} /> : ""}
          </div>

          {user && (
            <Link href="/profile">
              <Avatar
                alt={user.name}
                src={user}
                sx={{
                  cursor: "pointer",
                  backgroundColor: "lightGrey",
                  color: "#163357",
                  height: "2.2rem",
                  width: "2.2rem",
                }}
              />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
