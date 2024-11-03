import React from "react";
import styles from "./likeButton.module.css";

interface LikeButtonProps {
  onClick: () => void;
  label?: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ onClick, label = "J'aime" }) => (
  <button onClick={onClick} className={styles.likeButton}>
    {label}
  </button>
);

export default LikeButton;
