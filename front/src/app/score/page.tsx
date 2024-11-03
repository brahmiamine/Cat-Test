"use client";
import React, { useEffect, useState } from "react";
import styles from "./score.module.css";
import { fetchCatScores, Cat } from "../../services/VoteService";
import RankingPopup from "../../components/RankingPopup";
import RankingItem from "../../components/score/RankingItem";
import Image from "next/image";

const ScoresPage: React.FC = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadScores = async () => {
      try {
        const rankedCats = await fetchCatScores();
        setCats(rankedCats);
      } catch (error) {
        console.error("Error fetching scores:", error);
        setError("Failed to load scores. Please try again later.");
      }
    };

    loadScores();
  }, []);

  if (error) return <div className={styles.errorMessage}>{error}</div>;

  return (
    <div>
      <div className={styles.catsContainer}>
        <div className={styles.ranking}>
          {cats[1] && <RankingItem rank={2} cat={cats[1]} />}
          {cats[0] && <RankingItem rank={1} cat={cats[0]} />}
          {cats[2] && <RankingItem rank={3} cat={cats[2]} />}
        </div>
      </div>

      <div className={styles.grid}>
        {cats.slice(3).map((cat: Cat) => (
          <div key={cat.rank} className={styles.gridItem}>
            <div className={styles.rankNumber}>{cat.rank}</div>
            <Image src={cat.url} alt={cat.name} width={80} height={80} className={styles.catImage} />
            <p>{cat.name}</p>
            <span className={styles.score}>Score: {cat.score} pts</span>
          </div>
        ))}
      </div>

      <RankingPopup href="/" title="Revenir au vote" matchesCount="X" />
    </div>
  );
};

export default ScoresPage;
