import React from "react";
import {
  ErrorContainerStyled,
  ErrorImg,
  ErrorTypography,
} from "./ErrorContainer.styled";
import { ErrorContainerProps } from "./ErrorContainer.types";

const ErrorContainer: React.FC<ErrorContainerProps> = ({ error }) => {
  return (
    <ErrorContainerStyled>
      <ErrorImg src="/img/search.svg" alt="Search Icon" />
      <ErrorTypography>{error}</ErrorTypography>
    </ErrorContainerStyled>
  );
};

export default ErrorContainer;
