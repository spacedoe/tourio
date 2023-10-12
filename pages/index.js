import styled from "styled-components";
import Card from "../components/Card.js";
import useSWR from "swr";
import { StyledLink } from "../components/StyledLink.js";

const List = styled.ul`
  max-width: 600px;
  width: 100vw;
  margin: 0 auto;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-left: 0;
`;

const ListItem = styled.li`
  position: relative;
  width: 100%;
  padding: 0 1rem;
`;

const StickyLink = styled(StyledLink)`
  position: sticky;
  top: 1rem;
  margin: 0 2rem 0 auto;
  z-index: 1;
  width: 7rem;
`;
export default function Home() {
  const { data } = useSWR("/api/places", { fallbackData: [] });

  return (
    <>
      <StickyLink href="/create" passHref legacyBehavior>
        + place
      </StickyLink>
      <List role="list">
        {data.map((place) => {
          return (
            <ListItem key={place._id}>
              <Card
                name={place.name}
                image={place.image}
                location={place.location}
                id={`${place._id.$oid ?? place._id}`}
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
