import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const Tags = props => {

    const {tags} = props;
    return (
        <Stack direction="row" spacing={1}>
            {tags.map((tag) => (
                <Chip label={tag} />
            )
            )}
        </Stack>
    );
}

export default Tags