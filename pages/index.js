import styled from "styled-components";
import Card from "../components/Card.js";
import useSWR from "swr";
import Link from "next/link.js";
import { StyledLink } from "../components/StyledLink.js";

const List = styled.ul`
  max-width: 600px;
  width: 100vw;
  padding: 0 20px;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const ListItem = styled.li`
  position: relative;
  width: 100%;
`;

export default function Home() {
  const { data } = useSWR("/api/places", { fallbackData: [] });

  return (
    <>
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
