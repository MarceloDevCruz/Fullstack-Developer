import React from "react";
import { styled } from "styled-components";
import Header from "../Header";

const Container = styled.div`
  min-height: 100vh;
  color: #e5e7eb;
  background-image:
    linear-gradient(rgba(46,16,101,0.78), rgba(19, 12, 32, 0.78)),
    url("/background.svg"),
    radial-gradient(800px 600px at 10% -10%, rgba(61, 27, 87, 0.1), transparent 40%),
    radial-gradient(700px 500px at 110% 120%, rgba(44, 23, 59, 0.08), transparent 45%),
    linear-gradient(180deg, #0d0718 0%, #0a0611 50%, #07010f 100%);
  background-repeat: no-repeat, repeat, no-repeat, no-repeat, no-repeat;
  background-size: 100% 100%, 800px 800px, auto, auto, auto;
  background-position: center, center, center, center, center;
  background-attachment: fixed, scroll, fixed, fixed, fixed;
`;

export function Main({ user, children }) {

  return <><Header user={user} /><Container>{children}</Container></>;
}