import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


const Tags = props => {

    const {tags, viewType} = props;
    return (
        <>
        {tags.length > 0 ? (
            <Stack 
                style={{justifyContent: (viewType=='list') ? 'right' : 'left'}}
                direction="row" 
                spacing={1}
            >
            {tags.map((tag) => (
                <Chip label={tag} />
            )
            )}
        </Stack>
        ): (
            <Typography variant="caption" style={{color:'red'}}display="block" gutterBottom>
                No tags associated to this ticket
            </Typography>
        )}
        </>
        
    );
}

export default Tags