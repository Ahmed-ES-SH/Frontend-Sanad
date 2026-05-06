"use client";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappButton() {
  const phoneNumber = "+201017539419"; // رقم الهاتف الخاص بك بدون + أو -

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="z-999999 flex group  size-10 lg:size-12 hover items-center justify-center gap-2  bg-green-500 text-white  rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
    >
      <FaWhatsapp className="size-6 " />
    </button>
  );
}
