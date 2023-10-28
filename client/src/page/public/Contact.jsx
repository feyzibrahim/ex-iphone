import React from "react";
import SocialMedia from "../../components/SocialMedia";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

const Contact = () => {
  return (
    <div className="bg-gray-100 px-10 pt-24 lg:px-20 pb-20 lg:py-32">
      <div className="lg:flex lg:gap-1 p-2 bg-white rounded-lg shadow-xl">
        <div className="relative lg:w-2/5 bg-black text-white p-10 rounded-lg overflow-clip">
          <h1 className="text-xl lg:text-3xl font-semibold">
            Contact Information
          </h1>
          <p className="lg:text-xl lg:mb-20 text-gray-400">
            Say something to start a live chat!
          </p>
          <p className="contact-li items-center">
            <FaPhoneAlt />
            +91 73569 83827
          </p>
          <p className="contact-li items-center">
            <IoMdMail />
            chat@ex.iphones.com
          </p>
          <p className="contact-li pb-20">
            <FaMapMarkerAlt />
            7th Avenue, <br></br> ex.iphones. park, Calicut, KL
          </p>
          <SocialMedia />
          <div className="bg-white w-32 h-32 rounded-full opacity-25 absolute bottom-12 right-12"></div>
          <div className="bg-white w-52 h-52 rounded-full opacity-25 absolute -bottom-16 -right-16"></div>
        </div>
        <form className=" lg:w-3/5 text-gray-500 p-5 lg:p-12">
          <div className="lg:grid lg:grid-cols-2 lg:gap-5 ">
            <div>
              <p>
                <label htmlFor="firstName">First Name</label>
              </p>
              <input
                className="contact-input"
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter your First name"
              />
            </div>
            <div>
              <p>
                <label htmlFor="secondName">Second Name</label>
              </p>
              <input
                className="contact-input"
                type="text"
                name="secondName"
                id="secondName"
                placeholder="Enter your Second Name"
              />
            </div>
            <div>
              <p>
                <label htmlFor="email">Email</label>
              </p>
              <input
                className="contact-input"
                type="email"
                name="email"
                id="email"
                placeholder="Enter your Email"
              />
            </div>
            <div>
              <p>
                <label htmlFor="phoneNumber">Phone Number</label>
              </p>
              <input
                className="contact-input"
                type="phone"
                name="phone"
                id="phone"
                placeholder="Enter your Phone Number"
              />
            </div>
          </div>
          <p>
            <label htmlFor="subject">Select Subject?</label>
          </p>
          <div className="lg:flex gap-4">
            <p>
              <input type="radio" name="general" id="general" /> General Inquiry
            </p>
            <p>
              <input type="radio" name="general" id="general" /> General Inquiry
            </p>
            <p>
              <input type="radio" name="general" id="general" /> General Inquiry
            </p>
            <p>
              <input type="radio" name="general" id="general" /> General Inquiry
            </p>
          </div>
          <p className="mt-8">
            <label htmlFor="message">Message</label>
          </p>
          <input
            className="contact-input"
            type="text"
            name="message"
            id="message"
            placeholder="Enter your Message"
          />
          <input
            type="submit"
            value="Send Message"
            className="btn-blue mt-5 lg:mt-0 text-white font-semibold"
          />
        </form>
      </div>
    </div>
  );
};

export default Contact;
