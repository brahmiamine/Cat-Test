import React from "react";
import Image from "next/image";
import styles from "./rankingItem.module.css";
import { Cat } from "../../services/VoteService";

interface RankingItemProps {
  rank: number;
  cat: Cat;
}

const RankingItem: React.FC<RankingItemProps> = ({ rank, cat }) => (
  <div className={`${styles.rankingItem} ${rank === 1 ? styles.first : rank === 2 ? styles.second : styles.third}`}>
    <div className={styles.rankNumber}>{rank}</div>
    <Image src={cat.url} alt={cat.name} width={rank === 1 ? 120 : 100} height={rank === 1 ? 120 : 100} className={styles.catImage} />
    <p>{cat.name}</p>
    <span className={styles.scoreRank}>Score: {cat.score} pts</span>
  </div>
);

export default RankingItem;
