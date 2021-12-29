import {
  Flex,
  Box,
  Stack,
  Text,
  Button,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import FeatureCard from "./FeatureCard";

export default function Features({ title, text }) {
  return (
    <Box
      position={"relative"}
      _before={{
        content: "''",
        position: "absolute",
        top: "-80px",
        left: 0,
        width: "100%",
        height: "150%",
        backgroundColor: "rgba(255,184,63,.28)",
        clipPath: "polygon(0% 0%,100% 480px,100% 100%,0% calc(100% - 480px))",
        zIndex: "-1",
      }}
    >
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 16 }}
        mx={{ base: 8, md: 40 }}
        py={{ base: 20, md: 24 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            Optimized <br />
            <Text as={"span"} color={"main.purple"}>
              Features
            </Text>
          </Heading>
          <Text fontSize={"2xl"} as="h3" color={"gray.500"}>
            We dispose of a lot of useful features you can opt to get your
            results faster!
          </Text>
          <Stack direction={{ base: "column", sm: "row" }}>
            <Spacer />
            {/* aca va una imagen o carita qsy */}
          </Stack>
        </Stack>
        <Stack flex={1} spacing={{ base: 4 }}>
          <FeatureCard text="Create and Edit Cards" />
          <FeatureCard text="Share and download resumes" />
          <FeatureCard text="Pomodoro technique for concentration" />
          <FeatureCard text="Communities for your subjects" />
          <FeatureCard text="Blog and comments for decks" />
        </Stack>
      </Stack>
    </Box>
  );
}
