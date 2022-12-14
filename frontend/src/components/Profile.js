import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Navigate } from "react-router-dom";
import { Line } from "react-chartjs-2";

import Navbar from "./Navbar";
import Deck from "./Deck";
import AddDeck from "./AddDeck";

import { userProfile, verifyuser } from "../api/apiUsers";

import * as Mui from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const data = {
  labels: ["Aug", "Sept", "Oct", "Nov"],
  datasets: [
    {
      id: 1,
      label: "Flashcards memorized",
      data: [10, 14, 12, 16],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
    },
  ],
};
const drawerWidth = 300;

const theme = createTheme();

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 70px;
`;
const ButtonDiv = styled.button`
  border-radius: 10px;
  color: white;
  background-color: #7390fb;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 18px;
  padding: 20px;
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin-right: 10px;
  outline: none;
  border: none;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  position: relative;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  padding: 40px;
`;

const UserInfo = styled.div`
  font-size: 20px;
`;
const DeckContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const DeckBox = styled.div`
  flex-basis: 25%;
  width: 200px;
  height: 150px;
  background-color: #455964;
  border-radius: 10px;
  justify-content: center;
  display: flex;
  font-weight: 600;
  align-items: center;
  margin: 20px 20px;
  font-size: 20px;
`;

const Profile = ({}) => {
  const [profile, setProfile] = useState();
  const [id, setId] = useState();
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await userProfile();
      console.log("r", response);
      setProfile(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => setShowCreateModal(false);
  const handleShowModal = () => setShowCreateModal(true);

  return (
    <div>
      <Navbar />

      {profile && (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="lg">
            <CssBaseline />

            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{
                  width: 130,
                  height: 130,
                  bgcolor: "#7390FB",
                  fontSize: "4em",
                }}
              >
                {profile.user.name[0]}
              </Avatar>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    marginTop: 2,
                    display: "flex",
                    justifyContent: "center",
                  }}
                  component="h5"
                  variant="h4"
                >
                  {profile.user.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    color: "gray",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ marginRight: 1 }} variant="p" component="p">
                    {profile.user.username}
                  </Typography>
                  <Typography sx={{ marginRight: 1 }} component="p" variant="p">
                    {profile.user.rank}
                  </Typography>
                  <Typography sx={{ marginRight: 1 }} component="p" variant="p">
                    {profile.user.points}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <ButtonContainer>
              <ButtonDiv onClick={handleShowModal}>Create Deck</ButtonDiv>
              {showCreateModal && (
                <AddDeck
                  show={showCreateModal}
                  closeHandler={handleCloseModal}
                />
              )}
            </ButtonContainer>
            <Divider>
              <Typography variant="p" component="p">
                My Decks
              </Typography>
            </Divider>
            <DeckContainer>
              {profile.user.decks.map((deck) => (
                <Deck id={deck._id} name={deck.name} />
              ))}
            </DeckContainer>

            <Divider>My Progress</Divider>
            <Box sx={{ width: "50%" }}>
              <Line datasetIdKey="id" data={data} />
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </div>
  );
};

export default Profile;
