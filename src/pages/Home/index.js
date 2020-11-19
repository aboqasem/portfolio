import React from "react";
import MyHero from "./MyHero";
import MyNavbar from "../../components/MyNavbar";
import MyAbout from "./MyAbout";
import MyEducation from "./MyEducation";
import MyAchievements from "./MyAchievements";
import MyProjects from "./MyProjects";
import MyContact from "./MyContact";

const MyHome = () => {
  return (
      <>
        {/*<MyNavbar/>*/}
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
