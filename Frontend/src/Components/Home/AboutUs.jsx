import React from 'react';
import './AboutUs.css'; 
import Navbar from './NavBar';

const AboutUs = () => {
  return (
    <>
    <Navbar/>
    <section className="about-us">
      <div className="about-us-container">
        <h2 className="about-us-title">About Us</h2>
        <p className="about-us-description">
          Welcome to <strong>Travel Budget Planning</strong>, Your Smart Travel Companion for planning
          trips effortlessly without overspending. 
           Our platform helps you track expenses, set budgets, and discover cost-friendly destinations to make every journey stress-free.
            Whether you're traveling solo, as a couple, or with a group, we've got the tools to keep your finances in check.
        </p>
        <p className="about-us-mission">
        We believe that traveling the world should be exciting, 
        not financially overwhelming. With <strong>Travel Budget Planning</strong>, 
        you can focus on creating unforgettable memories while we take care of the budgeting.
        </p>
        <p className="about-us-goal">
        Let’s make travel affordable, efficient, and stress-free—together!
        </p>
      </div>
    </section>
    </>
  );
};

export default AboutUs;
