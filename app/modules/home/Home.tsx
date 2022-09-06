import * as React from "react";
import { Accent, Layers, Stack, Text, Theme, ThemeProvider, useThemeClass } from "gdq-design";

import PublicHelmet from "../core/PublicHelmet";

import styles from "./Home.mod.css";

import logoBase from "../../res/logo_base.png";
import backgroundVideo from "../../res/schedule_background.webm";
import backgroundPoster from "../../res/schedule_background.png";

import "gdq-design/dist/style.css";
import "@app/.design_system/tokens/styles.css";

function HomeContent() {
  return (
    <Stack className={styles.content} spacing="space-xl">
      <Stack className={styles.section}>
        <img className={styles.logo} src={logoBase} alt="Spyrothon logo" />
        <Text className={styles.introText} variant="header-xl/normal">
          The Spyro speedrunning community marathon.
        </Text>
      </Stack>
      <Stack direction="horizontal" spacing="space-lg" className={styles.section}>
        <div className={styles.properties}>
          <Text variant="header-md/normal">Annual community marathons and other events</Text>
        </div>
        <div className={styles.properties}>
          <Text variant="header-md/normal">Interviews and newsletters with community members</Text>
        </div>
        <div className={styles.properties}>
          <Text variant="header-md/normal">Nearly a decade of archives for Spyro speedrunning</Text>
        </div>
      </Stack>
      <Stack className={styles.section}>
        <Text variant="header-md/normal">
          Spyrothon started in 2015 as a response to Spyro speedruns being largely left out of major
          marathons. After a few years, the event transformed into an annual marathon and a staple
          of the community, showcasing runs from across the entire series and dozens of runners
          every year.
          <br />
          <br />
          With 8 full events under it's belt, Spyrothon has become a mainstay in the community and
          established itself as the place to celebrate Spyro speedrunning every year.
          <br />
          <br />
          The goal of Spyrothon is to present the largest variety of Spyro speedrunning content
          possible, both with runs of the games themselves and with various members of the community
          getting a chance in the spotlight.
        </Text>
      </Stack>
    </Stack>
  );
}

export default function Home() {
  const theme = Theme.LIGHT;
  const accent = Accent.PURPLE;

  return (
    <ThemeProvider theme={theme} accent={accent}>
      <div className={useThemeClass()}>
        <PublicHelmet className={styles.body} />
        <video className={styles.background} autoPlay muted loop poster={backgroundPoster}>
          <source src={backgroundVideo} type='video/webm;codecs="vp8, vorbis"' />
        </video>
        <main className={styles.main}>
          <HomeContent />
        </main>
        <Layers />
      </div>
    </ThemeProvider>
  );
}
