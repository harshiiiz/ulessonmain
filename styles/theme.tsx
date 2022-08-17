import React from "react";
import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
  colors: {
    brand: {
      purple: "#301446",
      orange: "#EA7052",
      brown: "#F9AD6D",
      green: "#68BC98",
      white: "#FFF",
      grey: "#F4F4F4",
      greybg:"#F2F2FB"
    },
  },
  fonts: {
    font: {
      heading: "Montserrat, sans-serif",
      body: "Mulish, sans-serif",
    },
  },
   breakpoints : {
    sm: '320px',
    xsm:'375px',
    lg:'62em',
    tab:'768px',
    xl:'1440px',
    
    
  }
});
