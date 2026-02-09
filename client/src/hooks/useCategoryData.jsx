import aiImage from "../assets/ai_and_machine_learning.jpg";
import graphicsImage from "../assets/graphics_design.jpg";
import uxImage from "../assets/ui_ux_design.jpg";
import gameImage from "../assets/game_design.jpg";
import modelingImage from "../assets/3d_modeling.jpg";
import webImage from "../assets/web_design.jpg";
import {
  FaRobot,
  FaPalette,
  FaLaptop,
  FaGamepad,
  FaCube,
  FaDesktop,
} from "react-icons/fa";

const useCategoryData = () => {
  const categories = [
    {
      id: "aB3xY7pQr",
      name: "AI & Machine Learning",
      icon: <FaRobot className="text-2xl" />,
      image: aiImage,
      jobs: "8,432",
      description: "AI development, ML models, and automation",
      color: "bg-purple-500",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      id: "mK9tW2zLn",
      name: "Graphics Design",
      icon: <FaPalette className="text-2xl" />,
      image: graphicsImage,
      jobs: "15,678",
      description: "Logos, branding, and visual design",
      color: "bg-pink-500",
      gradient: "from-pink-500 to-pink-600",
    },
    {
      id: "qP5rS8vXy",
      name: "UI/UX Design",
      icon: <FaLaptop className="text-2xl" />,
      image: uxImage,
      jobs: "18,901",
      description: "User interface and experience design",
      color: "bg-blue-500",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      id: "dF4hJ6bNc",
      name: "Game Design",
      icon: <FaGamepad className="text-2xl" />,
      image: gameImage,
      jobs: "6,789",
      description: "Game development and design",
      color: "bg-orange-500",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      id: "tM7gK9wRq",
      name: "3D Modeling",
      icon: <FaCube className="text-2xl" />,
      image: modelingImage,
      jobs: "7,654",
      description: "3D assets, animation, and rendering",
      color: "bg-indigo-500",
      gradient: "from-indigo-500 to-indigo-600",
    },
    {
      id: "sV2nB8mLp",
      name: "Web Design",
      icon: <FaDesktop className="text-2xl" />,
      image: webImage,
      jobs: "22,123",
      description: "Website design and development",
      color: "bg-cyan-500",
      gradient: "from-cyan-500 to-cyan-600",
    },
  ];

  return categories;
};

export default useCategoryData;
