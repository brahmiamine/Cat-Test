"use client";
import React, { useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import styles from "./vote.module.css";
import { fetchCats, voteForCat, Cat } from "../../services/CatService";
import RankingPopup from "../../components/RankingPopup";
import CatCard from "../../components/vote/CatCard";
import { useRouter } from "next/navigation";

const VotePage: React.FC = () => {
  const router = useRouter();
  const [cats, setCats] = useState<Cat[]>([]);
  const [currentCats, setCurrentCats] = useState<{ left: Cat; right: Cat } | null>(null);
  const [voterId, setVoterId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isRankingVisible, setIsRankingVisible] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const toggleRankingPopup = () => {
    setIsRankingVisible(!isRankingVisible);
  };

  useEffect(() => {
    const initFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setVoterId(result.visitorId);
    };

    initFingerprint();

    const loadCats = async () => {
      try {
        const data = await fetchCats();
        setCats(data);

        if (data.length >= 2) {
          setCurrentCats({ left: data[0], right: data[1] });
        }
      } catch (error) {
        console.error("Error loading cats:", error);
      }
    };

    loadCats();
  }, []);

  const handleVote = async (selectedCatId: string, side: "left" | "right") => {
    if (!voterId || !currentCats) return;

    try {
      await voteForCat(selectedCatId, voterId);
      setClickCount((prevCount) => prevCount + 1);

      const newIndex = currentIndex + 1;
      if (newIndex < cats.length) {
        if (side === "left") {
          setCurrentCats({ left: currentCats.left, right: cats[newIndex] });
        } else {
          setCurrentCats({ left: cats[newIndex], right: currentCats.right });
        }
        setCurrentIndex(newIndex);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error voting for cat:", error);
    }
  };

  if (!currentCats) return <p>Chargement...</p>;

  return (
    <div>
      <div className={styles.catsContainer}>
        <CatCard cat={currentCats.left} side="left" onVote={handleVote} />
        <div className={styles.divider}></div>
        <CatCard cat={currentCats.right} side="right" onVote={handleVote} />
      </div>

      <div>
        <RankingPopup
          href="/score"
          title="Voir le classement des chats"
          matchesCount={clickCount}
          isRankingVisible={isRankingVisible}
          onToggle={toggleRankingPopup}
        />
      </div>
    </div>
  );
};

export default VotePage;
