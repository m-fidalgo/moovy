import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import {
  HeaderAppBar,
  HeaderToolbar,
  HeaderLogo,
  HeaderTypography,
  HeaderDropdown,
} from "./Header.styled";
import MenuIcon from "@mui/icons-material/Menu";
import { HeaderProps } from "./Header.types";

const Header: React.FC<HeaderProps> = ({
  isLibrarySelected,
  onSearchSelect,
  onLibrarySelect,
}) => {
  const hasWindow = typeof window !== "undefined";
  const [width, setWidth] = useState(hasWindow ? window.innerWidth : null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleWindowResize() {
      setWidth(hasWindow ? window.innerWidth : null);
    }

    if (hasWindow) {
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }
  }, []);

  return (
    <HeaderAppBar position="sticky">
      <HeaderToolbar>
        <HeaderLogo src="/img/moovy.png" alt="Moovy" />

        {width === null || width > 600 ? (
          <>
            <HeaderTypography
              className={!isLibrarySelected ? "selected" : ""}
              onClick={() => onSearchSelect()}
            >
              Search
            </HeaderTypography>
            <HeaderTypography
              className={isLibrarySelected ? "selected" : ""}
              onClick={() => onLibrarySelect()}
            >
              My Library
            </HeaderTypography>
          </>
        ) : (
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            <MenuIcon />
          </IconButton>
        )}
      </HeaderToolbar>
      {width !== null && width <= 600 && isOpen ? (
        <HeaderDropdown>
          <HeaderTypography
            className={!isLibrarySelected ? "selected" : ""}
            onClick={() => onSearchSelect()}
          >
            Search
          </HeaderTypography>
          <HeaderTypography
            className={isLibrarySelected ? "selected" : ""}
            onClick={() => onLibrarySelect()}
          >
            My Library
          </HeaderTypography>
        </HeaderDropdown>
      ) : null}
    </HeaderAppBar>
  );
};

export default Header;
