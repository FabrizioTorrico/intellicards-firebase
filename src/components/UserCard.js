import { Text, Avatar, Stack, Box, Grid, GridItem } from "@chakra-ui/react";
export default function UserCard({ user }) {
  console.log(user);
  return (
    <Stack
      spacing={{ base: 8, md: 24 }}
      direction={{ base: "column", md: "row" }}
      alignItems={"center"}
    >
      <Avatar size={"2xl"} name={user.name} src={user.photo_URL} />
      <Grid
        position="relative"
        columns={2}
        color="gray.700"
        fontSize={"xl"}
        gap={[2, 6]}
      >
        <Text>{user.deck_count} decks</Text>
        <Text>{user.connection_count} connections</Text>
        <GridItem colSpan={2}>
          <Text color="gray.500">{user.bio}</Text>
        </GridItem>
      </Grid>
    </Stack>
  );
}
