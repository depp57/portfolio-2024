"use client";

import { useHomeStore } from "@/stores/homeStore";
import styles from "./HomeOverlay.module.css";
import SoundSettings from "@/components/SoundSettings";
import ScrollHint from "@/components/ScrollHint";
import background from "@static/loading-bg-dark.jpg";
import ExperienceLoader from "@/components/3d/ExperienceLoader";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function HomeOverlay() {
  const isOverlayDisplayed = useHomeStore((state) => state.isOverlayDisplayed);
  const [isExperienceLoaded, setIsExperienceLoaded] = useState(false);

  return (
    <>
      {isOverlayDisplayed && (
        <div className={styles.overlay} style={{ backgroundImage: `url(${background.src})` }}>
          <span style={{ height: "110px" }} />

          <div className="w-1/6 self-center">
            <AnimatePresence>
              {isExperienceLoaded ? (
                <motion.div
                  key="soundSettings"
                  initial={{ opacity: 0, position: "absolute" }}
                  animate={{ opacity: 1, position: "unset" }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <SoundSettings />
                </motion.div>
              ) : (
                <motion.div key="loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
                  <ExperienceLoader onLoaded={() => setIsExperienceLoaded(true)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div style={{ position: "relative", display: "flex", height: "80px" }}>
            <ScrollHint />
          </div>
        </div>
      )}
    </>
  );
}
