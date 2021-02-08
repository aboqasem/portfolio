import React from "react";
import { IconButton } from "@material-ui/core";
import { tLightTheme } from "../../styles/themes";
import HomeSection from "../../components/HomeSection";
import { CallTwoTone, GitHub, MailOutline, WhatsApp } from "@material-ui/icons";
import { sListItemIconIconStyle } from "../../styles/styles";

const myContacts = [
  {
    name: "Call me",
    icon: CallTwoTone,
    url: "tel:+60176495945",
    color: "#000",
  },
  {
    name: "Email",
    icon: MailOutline,
    url: "mailto:mb.alzouabi@gmail.com",
    color: "#E65A4D",
  },
  {
    name: "WhatsApp",
    icon: WhatsApp,
    url: "https://wa.me/60176495945",
    color: "#05E776",
  },
  {
    name: "GitHub",
    icon: GitHub,
    url: "https://github.com/aboqasem",
    color: "#24292E",
  },
];

const Contact = () => {
  return (
    <HomeSection theme={tLightTheme} title={"Get in Touch!"}>
      <div align={"center"}>
        {myContacts.map((value) => {
          return (
            <IconButton
              href={value.url}
              target={"_blank"}
              style={{
                margin: "clamp(5px, 2.5vw, 35px)",
              }}
            >
              <value.icon
                style={{ ...sListItemIconIconStyle.large, color: value.color }}
              />
            </IconButton>
          );
        })}
      </div>
    </HomeSection>
  );
};

export default Contact;
