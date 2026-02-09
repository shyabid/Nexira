import { FaShieldAlt, FaRocket, FaUsers, FaHandshake } from "react-icons/fa";

const useFeaturesData = () => {
  const featuresData = [
    {
      id: "k9mP2xqR",
      icon: <FaShieldAlt className="text-2xl" />,
      title: "Verified Talent",
      description:
        "Every freelancer undergoes rigorous verification and skill assessment",
    },
    {
      id: "yT7vNw3z",
      icon: <FaRocket className="text-2xl" />,
      title: "Fast Delivery",
      description:
        "Get your projects completed quickly with our efficient matching system",
    },
    {
      id: "pL5bK8jM",
      icon: <FaUsers className="text-2xl" />,
      title: "Global Community",
      description:
        "Connect with top talent from around the world in one platform",
    },
    {
      id: "rX4fH9qC",
      icon: <FaHandshake className="text-2xl" />,
      title: "Secure Payments",
      description: "Your payments are protected until you approve the work",
    },
  ];

  return featuresData;
};

export default useFeaturesData;
