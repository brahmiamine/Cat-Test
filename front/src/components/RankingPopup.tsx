import React from "react";
import styles from "./rankingPopup.module.css";
import Link from "next/link";

interface RankingPopupProps {
  href: string;
  title: string;
  matchesCount: number | string;
  isRankingVisible?: boolean;
  onToggle?: () => void;
}

const RankingPopup: React.FC<RankingPopupProps> = ({ href, title, matchesCount, isRankingVisible, onToggle }) => {
  return (
    <div className={styles.popupTrigger} onClick={onToggle}>
      <div className={`${styles.rankingFooter} ${isRankingVisible ? styles.active : ""}`}>
        <div className={styles.rankingArrow}>&#x25B2;</div>
        <Link href={href}>
          <p className={styles.rankingTitle}>{title}</p>
          <p className={styles.rankingMatches}>{matchesCount} matchs joués</p>
        </Link>
      </div>
    </div>
  );
};

export default RankingPopup;
