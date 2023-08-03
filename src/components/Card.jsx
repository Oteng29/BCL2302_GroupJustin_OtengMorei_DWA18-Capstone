import React, { useState } from "react"
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Season from './Season';
import Preview from './Season'


export default function Card(props) {
    const [showFullDescription, setShowFullDescription] = React.useState(false);
    const [showPreview, setShowPreview] = useState(false);

    const toggleMoreInfo = () => {
        setShowFullDescription(!showFullDescription);
    }

    const handleOpenPreview = () => {
        setShowPreview(true);
    };

    const handleClosePreview = () => {
        setShowPreview(false);
    };

    return (

        <Grid item xs={4} className="card">

            <img src={props.images} className='card--image' alt={props.titles} onClick={handleOpenPreview} style={{ cursor: 'pointer' }} />
            <p>{props.id}</p>
            <Box
                sx={{
                    '& > legend': { mt: 2 },
                }}
            >
                <Typography component="legend"></Typography>
                <Rating name="customized-10" defaultValue={2} max={5} />

            </Box>
            {showPreview && <Preview id={id} onClose={handleClosePreview} />}
            <h2 className="text--color" >{props.titles}</h2>
            <h4 className="text--color">Season {props.seasons}</h4>
            <h4 className="genre--title">{props.genres}</h4>
            <h4 className="text--color">Updated: {new Date(props.updated).toLocaleDateString("en-ZA", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
            })}</h4>

            {showFullDescription ? (
                <h5 className="text--color">{props.descriptions}</h5>
            ) : (
                <h5 className="text--color">{props.descriptions.substring(0, 150)}</h5>


            )}


            <Button variant="outlined" onClick={toggleMoreInfo}>
                {showFullDescription ? 'Less info' : 'More info'}

            </Button>



        </Grid>

    )
}

