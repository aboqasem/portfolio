import React from "react";
import MyHero from "./MyHero";
import MyAbout from "./MyAbout";
import MyEducation from "./MyEducation";
import MyAchievements from "./MyAchievements";
import MyProjects from "./MyProjects";
import MyContact from "./MyContact";

const MyHome = () => {
  return (
      <>
        <MyHero/>
        <MyAbout/>
        <MyEducation/>
        <MyAchievements/>
        <MyProjects/>
        <MyContact/>
      </>
  );
};

export default MyHome;
