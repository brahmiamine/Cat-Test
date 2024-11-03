import React from "react";
import Image from "next/image";
import styles from "./catCard.module.css";
import { Cat } from "../../services/catService";
import LikeButton from "../ui/LikeButton";

interface CatCardProps {
  cat: Cat;
  side: "left" | "right";
  onVote: (catId: string, side: "left" | "right") => void;
}

const CatCard: React.FC<CatCardProps> = ({ cat, side, onVote }) => (
  <div className={styles.catCard}>
    <Image src={cat.url} alt={`Chat ${side}`} width={250} height={250} className={styles.catImage} />
    <p>Chat {side === "left" ? "1" : "2"}</p>
    <LikeButton onClick={() => onVote(cat.catId, side)} /> {/* Utilisation de LikeButton */}
  </div>
);

export default CatCard;
