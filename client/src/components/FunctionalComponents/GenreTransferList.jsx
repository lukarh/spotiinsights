import { useState } from 'react';
import genres from '../../data/genres';
import { Card, CardHeader, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Checkbox, Button, Stack, Typography } from '@mui/material';

const GenreTransferList = ({ right, setRight }) => {
    function not(a, b) {
        return a.filter((value) => b.indexOf(value) === -1)
      }
      
    function intersection(a, b) {
        return a.filter((value) => b.indexOf(value) !== -1)
    }

    const [errorGenreMessage, setErrorGenreMessage] = useState('')
    const [checked, setChecked] = useState([])
    const [left, setLeft] = useState(genres)

    const leftChecked = intersection(checked, left)
    const rightChecked = intersection(checked, right)

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]
    
        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }
    
        setChecked(newChecked)
    }

    const handleCheckedRight = () => {
        setErrorGenreMessage('')
        console.log(right, leftChecked, left)
        if (right.length + leftChecked.length <= 5) {
            setRight(right.concat(leftChecked))
            setLeft(not(left, leftChecked))
            setChecked(not(checked, leftChecked))
        } else {
            setErrorGenreMessage("You can only select up to 5 genres at once.")
        }
    }

    const handleCheckedLeft = () => {
        setErrorGenreMessage('')
        setLeft(left.concat(rightChecked))
        setRight(not(right, rightChecked))
        setChecked(not(checked, rightChecked))
    }

    const customList = (title, items) => (
        <Card className="genre-card">
            <CardHeader
                className="genre-card"
                sx={{ px: 2, py: 1 }}
                title={<Typography fontFamily="DM Sans">{title}</Typography>}
            />
            <Divider />
            <List
                sx={{
                    width: 200,
                    height: 230,
                    bgcolor: '#5358C3',
                    overflow: 'auto',
                }}
                dense
                component="div"
                role="list"
            >
                {
                    items.map((value) => {
                        const labelId = `transfer-list-all-item-${value}-label`;
            
                        return (
                            <ListItem
                            key={value}
                            role="listitem"
                            onClick={handleToggle(value)}
                            >
                            <ListItemIcon>
                                <Checkbox
                                checked={checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{
                                    'aria-labelledby': labelId,
                                }}
                                style={{ color: 'white' }}
                                />
                            </ListItemIcon>
                                <ListItemText id={labelId}>
                                    <Typography fontFamily="DM Sans">{value}</Typography>
                                </ListItemText>
                            </ListItem>
                        )
                    })
                }
            </List>
        </Card>
      )

    return (
        <Grid container className="padding-1-rem" spacing={2} justifyContent="center" alignItems="center" >
            <Stack justifyContent="center" alignItems="center">
                <h1 className="padding-2-rem">Select up to 5 genres</h1>
                <Stack direction="row" spacing={1.5} justifyContent="center" alignItems="center">
                    <Grid item>{customList('Genre Choices', left)}</Grid>
                    <Grid item>
                        <Grid container direction="column" alignItems="center">
                            <Button
                                sx={{ my: 0.5 }}
                                variant="contained"
                                size="small"
                                onClick={handleCheckedRight}
                                disabled={leftChecked.length === 0}
                                aria-label="move selected right"
                                style={{ fontFamily: "DM Sans" }}
                            >
                                &gt;
                            </Button>
                            <Button
                                sx={{ my: 0.5 }}
                                variant="contained"
                                size="small"
                                onClick={handleCheckedLeft}
                                disabled={rightChecked.length === 0}
                                aria-label="move selected left"
                                style={{ fontFamily: "DM Sans" }}
                            >
                                &lt;
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item>{customList('Selected Genres', right)}</Grid>
                </Stack>
                <small className="error-text padding-1-rem">{errorGenreMessage}</small>
            </Stack>
        </Grid>
    )
}

export default GenreTransferList;