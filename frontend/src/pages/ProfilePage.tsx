import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid, Box } from "@mui/material";

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Nguyen Van A",
    role: "Full-Stack Developer",
    bio: "Expert in building scalable web applications using React and Node.js.",
    photoUrl: "https://via.placeholder.com/150",
  },
  {
    name: "Tran Thi B",
    role: "UI/UX Designer",
    bio: "Passionate about creating intuitive and beautiful user experiences.",
    photoUrl: "https://via.placeholder.com/150",
  },
  {
    name: "Le Van C",
    role: "Backend Developer",
    bio: "Specialist in APIs, databases, and server architecture.",
    photoUrl: "https://via.placeholder.com/150",
  },
  {
    name: "Hoang Minh D",
    role: "DevOps Engineer",
    bio: "Ensures seamless deployment and infrastructure management.",
    photoUrl: "https://via.placeholder.com/150",
  },
];

const ProfilePage = () => {
  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h3" align="center" gutterBottom>
        Meet Our Development Team
      </Typography>
      <Grid container spacing={4}>
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card sx={{ maxWidth: 345, margin: "auto" }}>
              <CardMedia
                component="img"
                height="150"
                image={member.photoUrl}
                alt={`${member.name}'s photo`}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {member.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {member.role}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {member.bio}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProfilePage;
